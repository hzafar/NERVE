package ca.sharcnet.nerve.docnav.query;
import ca.sharcnet.nerve.Console;
import ca.sharcnet.nerve.docnav.dom.Node;

class SelectAncestor extends SelectLink {
    private final SelectTerm term;
    private Node current;

    public SelectAncestor(String select) {
        this.term = new SelectTerm(select);
    }

    @Override
    boolean check(Node element) {
        current = element;

        while(current.hasParent()){
            current = current.getParent();
            if (term.check(current)) return true;
        }
        return false;
    }

    @Override
    Node getLast() {
        return current;
    }

//    @Override
//    public String toString(){
//        return term.toString();
//    }
}