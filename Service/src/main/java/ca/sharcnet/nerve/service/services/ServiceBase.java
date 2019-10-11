package ca.sharcnet.nerve.service.services;

import ca.sharcnet.nerve.service.services.exceptions.GetRequestNotSupported;
import ca.sharcnet.nerve.service.services.exceptions.MalformedSchemaURL;
import ca.sharcnet.nerve.service.services.exceptions.MissingDocumentException;
import static ca.sharcnet.nerve.scriber.Constants.SCHEMA_NODE_ATTR;
import static ca.sharcnet.nerve.scriber.Constants.SCHEMA_NODE_NAME;
import ca.sharcnet.nerve.scriber.dictionary.Dictionary;
import ca.sharcnet.nerve.scriber.encoder.EncoderManager;
import ca.sharcnet.nerve.scriber.context.Context;
import ca.sharcnet.nerve.scriber.context.ContextLoader;
import ca.sharcnet.nerve.scriber.encoder.IClassifier;
import ca.sharcnet.nerve.scriber.query.Query;
import ca.sharcnet.nerve.scriber.schema.RelaxNGSchema;
import ca.sharcnet.nerve.scriber.schema.RelaxNGSchemaLoader;
import ca.sharcnet.nerve.scriber.sql.SQL;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.sql.SQLException;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.stream.Collectors;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.parsers.ParserConfigurationException;
import org.json.JSONArray;
import org.json.JSONObject;
import org.xml.sax.SAXException;

/**
 * Process incoming http post requests into service requests with json input.
 *
 * @author Ed Armstrong
 */
public abstract class ServiceBase extends HttpServlet {

    final static org.apache.logging.log4j.Logger LOGGER = org.apache.logging.log4j.LogManager.getLogger(ServiceBase.class);
    static SQL sql = null;
    static IClassifier classifier = null;
    final static String CONTEXT_PATH = "/WEB-INF/";
    final static String DEFAULT_SCHEMA = "/NerveService/schema/default.rng";
    final static String CONFIG_PATH = "/WEB-INF/config.properties";
    private Properties properties;

    @Override
    public void init() {
        LOGGER.debug("ServiceBase.init() ... ");
        try {
            this.initConfig();
            this.initSQL();
            this.initClassifier();
            LOGGER.debug("exiting ServiceBase.init()");
        } catch (Exception ex) {
            LOGGER.catching(ex);
            if (ex.getCause() != null) {
                LOGGER.error("cause");
                LOGGER.catching(ex.getCause());
            } else {
                LOGGER.error("no cause");
            }
        }
    }

    private void initClassifier() throws IOException, ClassCastException, ClassNotFoundException {
        if (ServiceBase.classifier != null) {
            return;
        }
        String port = this.properties.getProperty("ner.port");

        if (port == null || port.isEmpty()) {
            this.initLocalClassifier();
        } else {
            try {
                ServiceBase.classifier = new RemoteClassifier(Integer.parseInt(port));
            } catch (IOException ex) {
                LOGGER.info(ex.getClass().getSimpleName() + " : " + ex.getMessage());
                LOGGER.info("Remote classifier not found, starting local classifier");
                this.initLocalClassifier();
            }
        }
    }

    private void initLocalClassifier() throws IOException, ClassCastException, ClassNotFoundException {
        if (ServiceBase.classifier != null) {
            return;
        }
        LOGGER.debug("loading classifier ...");
        String classifierPath = "/WEB-INF/english.all.3class.distsim.crf.ser.gz";
        InputStream in = this.getServletContext().getResourceAsStream(classifierPath);
        ServiceBase.classifier = new LocalClassifier(in);
        in.close();
        LOGGER.debug("... classifier loaded");
    }

    private void initConfig() throws FileNotFoundException, IOException {
        InputStream configStream = this.getServletContext().getResourceAsStream(CONFIG_PATH);
        LOGGER.debug("configuration file: " + this.getServletContext().getContextPath());

        if (configStream == null) {
            throw new FileNotFoundException(this.getServletContext().getRealPath(CONFIG_PATH));
        }

        LOGGER.debug("loading configuration ...");
        this.properties = new Properties();
        this.properties.load(configStream);
        configStream.close();
        LOGGER.debug("configuration loaded");
    }

    private void initSQL() throws FileNotFoundException, IOException, ClassNotFoundException, IllegalAccessException, SQLException, InstantiationException {
        LOGGER.debug("initializing sql ...");
        if (ServiceBase.sql != null) {
            return;
        }

        String dbURL = this.properties.getProperty("databaseURL");
        String dbPath = this.properties.getProperty("databasePath");
        String realPath = this.getServletContext().getRealPath(dbPath);
        String dbDriver = this.properties.getProperty("databaseDriver");

        LOGGER.debug("loading sql ...");
        ServiceBase.sql = new SQL(dbDriver, dbURL + realPath);
        LOGGER.debug("SQL loaded");

        LOGGER.debug("... initializing sql");
    }

    /**
     * Create a new manager object from JSON information. It is this method that
     * verifies the contents of the incoming JSON object and parses out the
     * relevant context and schema information. This is a utility method that
     * the service endpoints will call if they are tagging documents.<br>
     * The document field is required in the JSON input object. The context and
     * schemaURL fields are optional. If the document is not provided then an
     * exception will be thrown. If the 'context' is not provided then the
     * document type will be determined from the 'schema' is available. If no
     * context is available, a default empty schema will be used. If a schema
     * URL is provided then it will be used, otherwise the url will be parsed
     * from the document. If the schema URL return a 302 (redirect) then that
     * url will be used. All other non-200 return codes will throw an exception.
     * <br><br>
     * <img src="https://drive.google.com/uc?id=1X5ZRc624Joq9JHfH5g-avjV0Ep_flfpF"/>
     *
     * @param jsonRequest
     * @return
     * @throws IOException
     * @throws ClassNotFoundException
     * @throws InstantiationException
     * @throws IllegalAccessException
     * @throws SQLException
     * @throws ParserConfigurationException
     * @throws DocumentParseException
     */
    EncoderManager createManager(JSONObject jsonRequest, HttpServletRequest request) throws IOException, ClassNotFoundException, InstantiationException, IllegalAccessException, SQLException, ParserConfigurationException, SAXException {
        EncoderManager manager = new EncoderManager();

        /* Document Retrieval */
        if (!jsonRequest.has("document")) {
            throw new MissingDocumentException();
        }
        String documentSource = jsonRequest.getString("document");
        Query document = new Query(documentSource);
        manager.setQuery(document);

        /* Context Retrieval */
        Context context;
        if (jsonRequest.has("context")) {
            /* use provided context */
            JSONObject jsonObject = jsonRequest.getJSONObject("context");
            context = new Context(jsonObject);
            manager.setContext(new Context(jsonObject));
        } else {
            /* set the default context from the document - can be overridden by calling service */
            context = this.retrieveContext(document);
            manager.setContext(context);
        }

        /* setup dictionaries according to the context */
        for (String dictionaryName : context.getDictionaries()) {
            Dictionary dictionary = new Dictionary(ServiceBase.sql);
            dictionary.setTable(dictionaryName);
            dictionary.addTable(dictionaryName);
            manager.addDictionary(dictionary);
        }

        Query model = document.select(":inst").filter(SCHEMA_NODE_NAME);
        String schemaAttrValue = model.attribute(SCHEMA_NODE_ATTR);

        if (schemaAttrValue.isEmpty() && context.hasSchemaName()) {
            /* if no schema is specified by the document, use any provided by the context. */
            schemaAttrValue = context.getSchemaName();
        } else {
            /* if no schema is specified by the document or the context use the default (empty) schema */
            schemaAttrValue = DEFAULT_SCHEMA;
        }

        StringBuffer url = request.getRequestURL();
        String uri = request.getRequestURI();
        String host = url.substring(0, url.indexOf(uri)); //result

        if (schemaAttrValue.startsWith("/")) {
            schemaAttrValue = host + schemaAttrValue;
        }

        LOGGER.debug("schema " + schemaAttrValue);
        LOGGER.debug("url " + url);
        LOGGER.debug("uri " + uri);
        LOGGER.debug("host " + host);
        LOGGER.debug("context path " + request.getContextPath());

        RelaxNGSchema schema = this.retrieveSchema(schemaAttrValue);
        if (schema == null) {
            throw new MalformedSchemaURL(schemaAttrValue);
        }
        manager.setSchema(schema, schemaAttrValue);

        return manager;
    }

    private RelaxNGSchema retrieveSchema(String schemaURL) throws MalformedURLException, IOException, ParserConfigurationException, SAXException {
        LOGGER.debug("retrieve schema " + schemaURL);
        URL url = new URL(schemaURL);
        RelaxNGSchema schema = null;

        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        if (connection.getResponseCode() == 302) {
            String locationField = connection.getHeaderField("Location");
            schema = this.retrieveSchema(locationField);
        } else {
            try (final InputStream resourceAsStream = url.openStream()) {
                if (resourceAsStream == null) {
                    throw new MalformedSchemaURL(schemaURL);
                }
                schema = RelaxNGSchemaLoader.schemaFromStream(resourceAsStream);
            }
        }
        return schema;
    }

    public Context retrieveContext(Query document) throws IllegalArgumentException, IOException {
        /* retrieve the schema url to set the context */
        Query model = document.select(":inst").filter(SCHEMA_NODE_NAME);
        String schemaAttrValue = model.attribute(SCHEMA_NODE_ATTR);

        if (!schemaAttrValue.isEmpty()) {
            int index = schemaAttrValue.lastIndexOf('/');
            schemaAttrValue = schemaAttrValue.substring(index);
        }

        /* Choose the context based on the schema delcared in the xml document */
        String path;
        switch (schemaAttrValue) {
            case "/orlando_biography_v2.rng":
                path = CONTEXT_PATH + "orlando.context.json";
                break;
            case "/cwrc_entry.rng":
                path = CONTEXT_PATH + "cwrc.context.json";
                break;
            case "/cwrc_tei_lite.rng":
                path = CONTEXT_PATH + "tei.context.json";
                break;
            default:
                path = CONTEXT_PATH + "default.context.json";
                break;
        }

        InputStream resourceAsStream = this.getServletContext().getResourceAsStream(path);
        return ContextLoader.load(resourceAsStream);
    }

// <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method. This method is not supported
     * and will return an exception.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.returnException(response, new GetRequestNotSupported());
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "";
    }// </editor-fold>   

    protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            response.setContentType("application/json;charset=UTF-8");

            String input = request.getReader().lines().collect(Collectors.joining());

            JSONObject jsonRequest;
            LOGGER.debug(input);
            if (input != null && !input.isEmpty()) {
                jsonRequest = new JSONObject(input);
            } else {
                jsonRequest = new JSONObject();
            }

            JSONObject jsonResponse = this.run(jsonRequest, request, response);
            if (jsonResponse == null) {
                jsonResponse = new JSONObject();
            }

            if (jsonResponse.has("http-response-status")) {
                response.setStatus(jsonResponse.getInt("http-response-status"));
            }

            try (PrintWriter out = response.getWriter()) {
                out.print(jsonResponse.toString());
            }
        } catch (MalformedSchemaURL ex) {
            JSONObject jsonResponse = this.badRequest(ex.getMessage());
            response.setStatus(jsonResponse.getInt("http-response-status"));
            try (PrintWriter out = response.getWriter()) {
                out.print(jsonResponse.toString());
            }
        } catch (Exception ex) {
            returnException(response, ex);
        }
    }

    /**
     * Used when an incoming JSON object is missing a parameter.
     *
     * @param message
     * @return
     */
    public final JSONObject badRequest(String message) {
        JSONObject json = new JSONObject();
        json.put("http-response-status", 400);
        json.put("message", message);
        return json;
    }

    /**
     * Format a JSON object with exception details and write out response.
     *
     * @param response
     * @param exception
     * @throws IOException
     */
    public final void returnException(HttpServletResponse response, Exception exception) throws IOException {
        Logger.getLogger(NER.class.getName()).log(Level.SEVERE, null, exception);
        response.setStatus(500);
        JSONObject jsonException = new JSONObject();
        jsonException.put("exception", exception.getClass().getCanonicalName());
        jsonException.put("message", exception.getMessage());

        JSONArray jsonArray = new JSONArray();
        StackTraceElement[] stackTrace = exception.getStackTrace();
        for (StackTraceElement element : stackTrace) {
            jsonArray.put(element.toString());
        }

        jsonException.put("stacktrace", jsonArray);

        try (PrintWriter out = response.getWriter()) {
            out.print(jsonException.toString());
        }
    }

    /**
     * Service endpoints must override this method. This method is called when
     * the json object is created
     *
     * @param json
     * @return
     * @throws IOException
     * @throws ClassNotFoundException
     * @throws InstantiationException
     * @throws IllegalAccessException
     * @throws SQLException
     * @throws ParserConfigurationException
     * @throws DocumentParseException
     */
    protected JSONObject run(JSONObject json) throws IOException, ClassNotFoundException, InstantiationException, IllegalAccessException, SQLException, ParserConfigurationException {
        return new JSONObject();
    }

    protected JSONObject run(JSONObject json, HttpServletRequest request, HttpServletResponse response) throws IOException, ClassNotFoundException, InstantiationException, IllegalAccessException, SQLException, ParserConfigurationException {
        return run(json);
    }
}