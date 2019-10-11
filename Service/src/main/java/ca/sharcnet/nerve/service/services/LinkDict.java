package ca.sharcnet.nerve.service.services;
import ca.sharcnet.nerve.scriber.encoder.servicemodules.EncoderDictLink;
import ca.sharcnet.nerve.scriber.encoder.EncoderManager;
import java.io.IOException;
import java.sql.SQLException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.parsers.ParserConfigurationException;
import org.json.JSONObject;

@WebServlet(name = "dict-link", urlPatterns = {"/dict-link"})
public class LinkDict extends ServiceBase {
    
    @Override
    public JSONObject run(JSONObject jsonRequest, HttpServletRequest request, HttpServletResponse response) throws IOException, ClassNotFoundException, InstantiationException, IllegalAccessException, SQLException, ParserConfigurationException {
        EncoderManager manager = this.createManager(jsonRequest, request);       
        manager.addProcess(new EncoderDictLink());
        manager.run();
        
        JSONObject json = new JSONObject();
        json.put("document", manager.getQuery().select(":doc").toString());
        json.put("context", manager.getContext().getSourceString());
        json.put("schemaURL", manager.getSchemaUrl().toString());        
        return json;
    }    
}