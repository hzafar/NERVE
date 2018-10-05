package tests.manual;
import ca.frar.utility.console.Console;
import ca.sharcnet.dh.scriber.HasStreams;
import ca.sharcnet.dh.scriber.ProgressListener;
import ca.sharcnet.dh.scriber.ProgressPacket;
import ca.sharcnet.dh.scriber.decode.Decoder;
import ca.sharcnet.nerve.docnav.DocumentLoader;
import ca.sharcnet.nerve.docnav.dom.Document;
import ca.sharcnet.dh.scriber.encoder.EncodeOptions;
import ca.sharcnet.dh.scriber.encoder.EncodeProcess;
import ca.sharcnet.dh.scriber.encoder.EncodedDocument;
import ca.sharcnet.dh.scriber.encoder.Encoder;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.script.ScriptException;
import javax.xml.parsers.ParserConfigurationException;

public class Main implements HasStreams, ProgressListener {
    private final EncodeOptions encodeOptions;
    private final Document doc;
    private EncodedDocument encoded;
    private Document decoded;
    
    public Main(String filename) throws IOException{
        this.doc = DocumentLoader.documentFromStream(this.getFileStream(filename));
        this.encodeOptions = new EncodeOptions();                
    }
    
    public EncodedDocument encode(EncodeProcess ... encodeProcesses) throws IOException, ClassNotFoundException, InstantiationException, IllegalAccessException, SQLException, ParserConfigurationException{
        encodeOptions.addProcess(encodeProcesses);
        this.encoded = Encoder.encode(this.doc, this, this.encodeOptions, this);
        return this.encoded;
    }

    public Document decode() throws IllegalArgumentException, IOException, ClassNotFoundException, InstantiationException, IllegalAccessException, SQLException, ParserConfigurationException, ScriptException, NoSuchMethodException{
        this.decoded = Decoder.decode(this.encoded, this, this);
        return decoded;
    }
    
    @Override
    public final InputStream getResourceStream(String path) {
        try {
            File file = new File("./src/res/" + path);
            return new FileInputStream(file);
        } catch (IOException ex) {
            Logger.getLogger(Main.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }

    public final InputStream getFileStream(String path) {
        try {
            File file = new File("./test/tests/documents/" + path);
            return new FileInputStream(file);
        } catch (IOException ex) {
            Logger.getLogger(Main.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }    
    
    @Override
    public void notifyProgress(ProgressPacket packet) {
        Console.log(packet);
    }
}