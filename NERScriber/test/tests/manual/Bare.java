package tests.manual;

import ca.sharcnet.dh.scriber.dictionary.Dictionary;
import ca.sharcnet.dh.scriber.encoder.EncoderDictionary;
import ca.sharcnet.dh.scriber.encoder.EncoderLink;
import ca.sharcnet.dh.scriber.encoder.EncoderManager;
import ca.sharcnet.dh.scriber.encoder.EncoderNER;
import ca.sharcnet.dh.sql.SQL;
import ca.sharcnet.nerve.docnav.DocumentLoader;
import ca.sharcnet.nerve.docnav.dom.Document;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.sql.SQLException;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.script.ScriptException;
import javax.xml.parsers.ParserConfigurationException;
import org.apache.logging.log4j.LogManager;

public class Bare {

    final static org.apache.logging.log4j.Logger LOGGER = LogManager.getLogger(Bare.class);

    public static void main(String... args) throws IOException, ClassNotFoundException, InstantiationException, InstantiationException, InstantiationException, IllegalAccessException, SQLException, ParserConfigurationException, IllegalArgumentException, ScriptException, NoSuchMethodException {
        try {
            InputStream configStream = ClassLoader.getSystemResourceAsStream("config.txt");
            Properties configProperties = new Properties();
            configProperties.load(configStream);
            SQL sql = new SQL(configProperties);
            Dictionary dictionary = new Dictionary(sql);
            dictionary.verifySQL();

            File file = new File("./test/tests/documents/bare.xml");
            FileInputStream fileInputStream = new FileInputStream(file);
            Document document = DocumentLoader.documentFromStream(fileInputStream);

            EncoderManager manager = new EncoderManager();
            manager.document(document);
            manager.schema("default.rng");
            manager.context("default.context.json");
            manager.dictionary(dictionary);
            manager.classifier();
//            manager.setup(new EncoderNER());            
//            manager.setup(new EncoderDictionary());
            manager.setup(new EncoderLink());
            manager.run();

            System.out.print(document);

        } catch (IOException ex) {
            Logger.getLogger(Bare.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}
