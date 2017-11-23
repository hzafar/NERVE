package ca.sharcnet.nerve.encoder;
import static ca.sharcnet.nerve.Constants.*;
import ca.sharcnet.nerve.context.*;
import ca.sharcnet.nerve.docnav.*;
import ca.sharcnet.nerve.docnav.dom.*;
import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import javax.xml.parsers.ParserConfigurationException;
import ca.sharcnet.nerve.HasStreams;
import ca.sharcnet.nerve.IsMonitor;
import static ca.sharcnet.nerve.context.NameSource.*;
import ca.sharcnet.nerve.docnav.query.Query;
import ca.sharcnet.nerve.docnav.schema.Schema;
import ca.sharcnet.nerve.docnav.schema.relaxng.RelaxNGSchemaLoader;
import ca.fa.SQL.SQL;
import ca.fa.SQL.SQLRecord;
import ca.fa.SQL.SQLResult;
import java.io.BufferedInputStream;
import java.io.InputStream;
import java.net.URL;
import java.util.Properties;
import java.util.zip.GZIPInputStream;
import org.json.JSONObject;

public class Encoder {
    private final Context context;
    private final SQL sql;
    private final Classifier classifier;
    private Schema schema = null;
    private EncodedDocument document = null;
    private IsMonitor monitor = IsMonitor.nullMonitor;

    public static EncodedDocument encode(Document document, HasStreams hasStreams, IsMonitor monitor) throws IOException, ClassNotFoundException, InstantiationException, IllegalAccessException, SQLException, ParserConfigurationException {
        if (document == null) throw new NullPointerException();
        if (hasStreams == null) throw new NullPointerException();
        if (monitor == null) monitor = IsMonitor.nullMonitor;

        /* connect to SQL */
        monitor.phase("loading SQL", 1, 7);
        Properties config = new Properties();
        InputStream cfgStream = hasStreams.getResourceStream("config.txt");
        config.load(cfgStream);
        SQL sql = new SQL(config);

        /* build classifier */
        monitor.phase("building classifier", 2, 7);
        InputStream cStream = hasStreams.getResourceStream("english.all.3class.distsim.crf.ser.gz");
        BufferedInputStream bis = new BufferedInputStream(new GZIPInputStream(cStream));
        Classifier classifier = new Classifier(bis);
        cStream.close();

        /* retrieve the schema url to set the context (or use context instruction node) */
        monitor.phase("loading Context", 3, 7);
        Context context = null;
        Query model = document.query(NodeType.INSTRUCTION).filter(SCHEMA_NODE_NAME);
        String schemaURL = model.attr(SCHEMA_NODE_ATTR);

        String schema = model.attr(SCHEMA_NODE_ATTR);
        int index = schema.lastIndexOf('/');
        schema = schema.substring(index);

        switch (schema) {
            case "/orlando_biography_v2.rng":
                context = ContextLoader.load(hasStreams.getResourceStream("contexts/orlando.context.json"));
                break;
            case "/cwrc_entry.rng":
                context = ContextLoader.load(hasStreams.getResourceStream("contexts/cwrc.context.json"));
                break;
            case "/cwrc_tei_lite.rng":
                context = ContextLoader.load(hasStreams.getResourceStream("contexts/tei.context.json"));
                break;
            default:
                /* if there is no schema node, look for a context node (mostly for debugging/testing) */
                Query qContext = document.query(NodeType.INSTRUCTION).filterf("%s[%s]", CONTEXT_NODE_NAME, CONTEXT_NODE_ATTR);
                if (qContext.isEmpty()) throw new RuntimeException("Context/Schema node not found.");
                String path = "contexts/" + qContext.attr("name");
                context = ContextLoader.load(hasStreams.getResourceStream(path));
                break;
        }

        Encoder encoder = new Encoder(document, context, sql, classifier, monitor);

        /** add the schema, the schema url in the context takes precedence **/
        monitor.phase("loading schema: " + context.getSchemaName(), 4, 7);
        if (!context.getSchemaName().isEmpty()) schemaURL = context.getSchemaName();

        InputStream schemaStream = null;
        if (schemaURL.startsWith("http:")){
            schemaStream = new URL(schemaURL).openStream();
        } else if (schemaURL.startsWith("file:")){
            schemaStream = hasStreams.getResourceStream(schemaURL.substring(5));
        }
        Schema schemaFromStream = RelaxNGSchemaLoader.schemaFromStream(schemaStream);
        encoder.setSchema(schemaFromStream);

        EncodedDocument encoded = encoder.encode();
        encoded.setSchema(schemaURL);
        return encoded;
    }

    private Encoder(Document document, Context context, SQL sql, Classifier classifier, IsMonitor monitor) throws ClassNotFoundException, InstantiationException, IllegalAccessException, IOException, SQLException {
        if (document == null) throw new NullPointerException();
        if (context == null) throw new NullPointerException();
        if (monitor != null) this.monitor = monitor;

        this.sql = sql;
        this.context = context;
        this.document = new EncodedDocument(document, context);
        this.classifier = classifier;
    }

    private EncodedDocument encode() throws IOException, ClassNotFoundException, InstantiationException, IllegalAccessException, SQLException, ParserConfigurationException {
        monitor.phase("dictionary", 5, 7);
        if (this.sql != null) lookupTag();
        monitor.phase("ner", 6, 7);
        if (this.classifier != null) processNER(document);
        monitor.phase("encoding", 7, 7);
        wrapTags(document);

        /* put the context name into the schema(xml-model) node, or the context node */
        Query query = document.queryf("[%1$s='%2$s'], [%1$s='%3$s']", ORG_TAGNAME, SCHEMA_NODE_NAME, CONTEXT_NODE_NAME);
        query.first().attr(CONTEXT_ATTRIBUTE, context.getName());
        return document;
    }

    private void setSchema(Schema schema) {
        this.schema = schema;
    }

    private void lookupTag() throws SQLException {
        List<String> dictionaries = context.readFromDictionary();

        StringBuilder builder = new StringBuilder();
        if (dictionaries.size() > 0) {
            builder.append("collection = \"").append(dictionaries.get(0)).append("\" ");
            for (int i = 1; i < dictionaries.size(); i++) {
                builder.append(" OR collection = \"").append(dictionaries.get(i)).append("\" ");
            }
        }

        String query = "select * from dictionary";
        if (builder.length() > 0) query = String.format("select * from dictionary where %s", builder.toString());

        StringMatch knownEntities = new StringMatch();
        SQLResult sqlResult = sql.query(query);

        for (int i = 0; i < sqlResult.size(); i++) {
            SQLRecord row = sqlResult.get(i);
            knownEntities.addCandidate(row.getEntry("entity").getValue(), row);
        }

        lookupTag(document, knownEntities);
    }

    private void lookupTag(Document doc, StringMatch knownEntities) {
        Query textNodes = doc.query(NodeType.TEXT);

        int n = 0;
        int N = textNodes.size();

        for (Node node : textNodes) {
            this.monitor.step(n++, N);
            if (context.isTagName(node.getParent().name(), NAME)) continue; /* skip already tagged nodes */
            lookupTag((TextNode)node, knownEntities);
        }
        this.monitor.step(1, 1);
    }

    private void lookupTag(TextNode child, StringMatch knownEntities) {
        String innerText = child.getText();
        final NodeList newNodes = new NodeList();

        /* choose the largest matching known entity */
        OnAccept onAccept = (string, row) -> {
            TagInfo tagInfo = context.getTagInfo(row.getEntry("tag").getValue(), DICTIONARY);

            if (schema != null && !schema.isValid(child.getParent(), tagInfo.getName(NAME))) {
                newNodes.add(new TextNode(string));
            } else {
                Node elementNode = new ElementNode(tagInfo.getName(NAME), string);
                String lemmaAttribute = context.getTagInfo(row.getEntry("tag").getValue(), DICTIONARY).getLemmaAttribute();
                if (!lemmaAttribute.isEmpty()) elementNode.attr(lemmaAttribute, row.getEntry("lemma").getValue());

                String linkAttribute = context.getTagInfo(row.getEntry("tag").getValue(), DICTIONARY).getLinkAttribute();
                if (!linkAttribute.isEmpty()) elementNode.attr(linkAttribute, row.getEntry("link").getValue());
                newNodes.add(elementNode);
            }
        };

        OnReject onReject = (string) -> {
            newNodes.add(new TextNode(string));
        };

        knownEntities.seekLine(innerText, onAccept, onReject);
        child.replaceWith(newNodes);
    }

    /**
     * @param node the node to wrap
     * @param allowEntities if false wrap all child tags as if they are
     * non-entity tags
     * @throws ClassNotFoundException
     * @throws InstantiationException
     * @throws IllegalAccessException
     * @throws IOException
     * @throws SQLException
     */
    private void wrapTags(Node node) throws ClassNotFoundException, InstantiationException, IllegalAccessException, IOException, SQLException {
        if (node.isType(NodeType.DOCTYPE)) {
            Node eNode = new ElementNode(HTML_TAGNAME);
            eNode.attr("class", HTML_DOCTYPE);
            DoctypeNode dNode = (DoctypeNode) node;
            eNode.attr(new Attribute(DOCTYPE_INNERTEXT, dNode.toString()));
            node.replaceWith(eNode);
            return;
        }

        JSONObject jsonObj = new JSONObject();
        for (Attribute attr : node.getAttributes()) {
            jsonObj.put(attr.getKey(), attr.getValue());
        }
        node.clearAttributes();

        Node eNode = node;

        if (node.isType(NodeType.INSTRUCTION)) {
            eNode = new ElementNode(HTML_TAGNAME);
            node.replaceWith(eNode);
            eNode.attr("class", HTML_PROLOG);
        } else if (context.isTagName(node.name(), NAME)) {
            node.attr("class", HTML_ENTITY);
        } else {
            node.attr("class", HTML_NONENTITY);
            for (Node child : eNode.childNodes()) {
                wrapTags(child);
            }
        }

        eNode.attr(XML_ATTR_LIST, jsonObj.toString());
        eNode.attr(ORG_TAGNAME, node.name());
        eNode.name(HTML_TAGNAME);
    }

    private void processNER(Document doc) throws IOException, ClassNotFoundException, InstantiationException, IllegalAccessException, SQLException, ParserConfigurationException {
        Query textNodes = doc.query(NodeType.TEXT);

        int n = 0;
        int N = textNodes.size();

        for (Node node : textNodes) {
            this.monitor.step(n++, N);
            if (node.text().trim().isEmpty()) continue;

            /* skip nodes that are already tagged */
            NodeList ancestorNodes = node.ancestorNodes(NodeType.ELEMENT);
            if (ancestorNodes.testAny(nd->!context.isTagName(nd.name(), NAME))) continue;

            NodeList nerList = applyNamedEntityRecognizer(node.text());

            /* for each element node in the list ensure the path is valid, otherwise convert it to a text node */
            for (int i = 0; i < nerList.size(); i++) {
                Node nerNode = nerList.get(i);
                if (!nerNode.isType(NodeType.ELEMENT)) continue;
                if (schema != null && !schema.isValid(node.getParent(), nerNode.name())) {
                    TextNode textNode = new TextNode(nerNode.text());
                    nerList.set(i, textNode);
                }
            }

            /* Go through the nodes in the node list and change the names from ner to context taginfo name. */
            for (Node nerNode : nerList) {
                String nodeName = nerNode.name();
                if (nerNode.getType() == NodeType.ELEMENT && context.isTagName(nodeName, NERMAP)) {
                    Node nerElementNode = nerNode;
                    TagInfo tagInfo = context.getTagInfo(nodeName, NERMAP);
                    nerElementNode.name(tagInfo.getName(NAME));
                }
            }

            /* replace the current node with the node list */
            if (nerList.size() > 0) node.replaceWith(nerList);
        };
        this.monitor.step(1, 1);
    }

    private NodeList applyNamedEntityRecognizer(String text) throws ParserConfigurationException, IOException, ClassNotFoundException, InstantiationException, IllegalAccessException, SQLException {
        /* at least one alphabet character upper or lower case */
        String matchRegex = "([^a-zA-z]*[a-zA-z]+[^a-zA-z]*)+";

        /* if there is not at least one alphabet character, retuern an empty list */
        if (text == null || text.isEmpty() || !text.matches(matchRegex)) return new NodeList();

        /* classify the text and put it in a fragment tag */
        text = classifier.classify("<fragment>" + text + "</fragment>");
        if (text.isEmpty()) return new NodeList();

        /* create a document out of the text */
        Document localDoc = DocumentLoader.documentFromString(text);
        NodeList nodes = localDoc.query("*");

        /* for each node in the document (from above) if it's an NER node     */
        /* change it's tagname to a valid tag name occording to the context   */
        /* and set it's lemma if it doesn't already have one.                 */
        /* ensure that the node has the default attributes                    */
        for (Node node : nodes) {
            /* if node name is an NER tag name */
            if (context.isTagName(node.name(), NERMAP)) {
                TagInfo tagInfo = context.getTagInfo(node.name(), NERMAP);
                node.name(tagInfo.getName(NAME));
                if (!tagInfo.getLemmaAttribute().isEmpty()) {
                    Node eNode = (Node) node;
                    eNode.attr(new Attribute(tagInfo.getLemmaAttribute(), eNode.text()));
                }
            }
        }

        Node eNode = localDoc.childNodes().get(0);
        NodeList childNodes = eNode.childNodes();
        return childNodes;
    }
}
