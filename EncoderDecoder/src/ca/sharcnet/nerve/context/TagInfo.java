package ca.sharcnet.nerve.context;
import org.json.JSONObject;

public class TagInfo {
    private String linkAttribute;
    private String idAttribute;
    private boolean caseSensative = false;
    private String name = "";
    private String lemmaAttribute = "";
    private String dictionaryName = "";
    private String nerMap = "";

    TagInfo(JSONObject json, String linkAttribute, String idAttribute, String lemmaAttribute) {
        this.name = json.getString("name");
        this.lemmaAttribute = json.optString("lemmaAttribute", lemmaAttribute);
        this.linkAttribute = json.optString("linkAttribute", linkAttribute);
        this.idAttribute = json.optString("idAttribute", idAttribute);
        this.dictionaryName = name;

        if (json.has("nerMap")) {
            this.nerMap = json.getString("nerMap");
        }

        if (json.has("dictionary")) {
            this.dictionaryName = json.getString("dictionary");
        }
    }

    @Override
    public String toString(){
        StringBuilder builder = new StringBuilder();
        builder.append("TagInfo\n");
        builder.append("- linkAttribute: ").append(linkAttribute).append("\n");
        builder.append("- idAttribute: ").append(idAttribute).append("\n");
        builder.append("- caseSensative: ").append(caseSensative).append("\n");
        builder.append("- name: ").append(name).append("\n");
        builder.append("- lemmaAttribute: ").append(lemmaAttribute).append("\n");
        builder.append("- dictionaryName: ").append(dictionaryName).append("\n");
        builder.append("- nerMap: ").append(nerMap).append("\n");
        return builder.toString();
    }

    public boolean isNerMap(String string) {
        if (this.nerMap.isEmpty()) return false;
        if (caseSensative) {
            return string.equals(this.nerMap);
        } else {
            return string.toLowerCase().equals(this.nerMap.toLowerCase());
        }
    }

    public String getNerMap() {
        return this.nerMap;
    }

    public String getDictionaryMap() {
        return dictionaryName;
    }

    boolean isDictionaryMap(String string) {
        if (this.dictionaryName.isEmpty()) return false;
        if (caseSensative) {
            return string.equals(this.dictionaryName);
        } else {
            return string.toLowerCase().equals(this.dictionaryName.toLowerCase());
        }
    }

    public boolean isName(String string) {
        if (this.name.isEmpty()) return false;

        if (caseSensative) {
            return string.equals(this.name);
        } else {
            return string.toLowerCase().equals(this.name.toLowerCase());
        }
    }

    public String getName() {
        return this.name;
    }

    public String getLemmaAttribute() {
        return lemmaAttribute;
    }

    public String getLinkAttribute() {
        return this.linkAttribute;
    }

    public void setIDAttribute(String idAttribute) {
        this.idAttribute = idAttribute;
    }

    public String getIDAttribute() {
        return this.idAttribute;
    }

    public boolean isCaseSensative() {
        return caseSensative;
    }

    public void setDictionary(String dictionary) {
        this.dictionaryName = dictionary;
    }

    public String getWriteDictionary() {
        return dictionaryName;
    }
}
