/* global Utility */

const AbstractModel = require("../model/AbstractModel");

class Menu extends AbstractModel {
    constructor() {
        super();

        /* file dialog event - related to menu open */
        $("#fileOpenDialog").change(async (event) => {
        });

        $("#goLink").click((event) => {
        });

        /* search events */
        $("#searchTextArea").keyup((event) => {
        });

        /* menu events key events fire these events */
        $("#menuSave").click(async (event) => {
            event.stopPropagation();
            this.notifyListeners("onMenuSave");
        });

        $("#menuOpen").click((event) => {
            event.stopPropagation();
            this.notifyListeners("onMenuOpen", "OPEN"); /* NER & dict */
        });
        
        $("#menuNER").click((event) => {
            event.stopPropagation();
            this.notifyListeners("onMenuOpen", "TAG"); /* NER only */            
        });
        
        $("#menuEdit").click((event) => {
            event.stopPropagation();
            this.notifyListeners("onMenuOpen", "EDIT"); /* open no dict, no NER */        
        });
        
        $("#menuClose").click((event) => {
        });

        $("#menuTags").click((event) => {
            this.notifyListeners("onMenuTags");
        });

        $("#menuClear").click((event) => {
        });
        $("#menuUndo").click((event) => {
        });
        $("#menuRedo").click((event) => {
        });
        $("#menuCopy").click((event) => {
        });
        $("#menuPaste").click((event) => {
        });
        $("#menuTag").click((event) => {
        });
        $("#menuUntag").click((event) => {
        });
        $("#menuMerge").click(async (event) => {
        });
        $("#menuWiki").click((event) => {
        });

        /* control delete and backspace this.events */
        document.addEventListener('keydown', function (event) {
            var d = event.srcElement || event.target;
            if (event.keyCode !== 8 && event.keyCode !== 46) return;
            if (
                    (d.tagName.toUpperCase() === 'INPUT' && d.type.toUpperCase() === 'TEXT') ||
                    (d.tagName.toUpperCase() === 'INPUT' && d.type.toUpperCase() === 'PASSWORD') ||
                    (d.tagName.toUpperCase() === 'INPUT' && d.type.toUpperCase() === 'FILE') ||
                    (d.tagName.toUpperCase() === 'INPUT' && d.type.toUpperCase() === 'SEARCH') ||
                    (d.tagName.toUpperCase() === 'INPUT' && d.type.toUpperCase() === 'EMAIL') ||
                    (d.tagName.toUpperCase() === 'INPUT' && d.type.toUpperCase() === 'NUMBER') ||
                    (d.tagName.toUpperCase() === 'INPUT' && d.type.toUpperCase() === 'DATE') ||
                    (d.tagName.toUpperCase() === 'TEXTAREA') ||
                    (d.hasAttribute("contenteditable") && d.getAttribute("contenteditable") === "true")
                    ) {
                event.stopPropagation();
                return;
            }

            event.preventDefault();
        }, true);

        /* key Press Events */
        $(document).keydown((event) => {
            var d = event.srcElement || event.target;
            if (
                    (d.tagName.toUpperCase() === 'INPUT' && d.type.toUpperCase() === 'TEXT') ||
                    (d.tagName.toUpperCase() === 'INPUT' && d.type.toUpperCase() === 'PASSWORD') ||
                    (d.tagName.toUpperCase() === 'INPUT' && d.type.toUpperCase() === 'FILE') ||
                    (d.tagName.toUpperCase() === 'INPUT' && d.type.toUpperCase() === 'SEARCH') ||
                    (d.tagName.toUpperCase() === 'INPUT' && d.type.toUpperCase() === 'EMAIL') ||
                    (d.tagName.toUpperCase() === 'INPUT' && d.type.toUpperCase() === 'NUMBER') ||
                    (d.tagName.toUpperCase() === 'INPUT' && d.type.toUpperCase() === 'DATE') ||
                    (d.tagName.toUpperCase() === 'TEXTAREA') ||
                    (d.hasAttribute("contenteditable") && d.getAttribute("contenteditable") === "true")
                    ) {
                event.stopPropagation();
                return;
            }

            if (event.ctrlKey || event.metaKey) {
                switch (event.key) {
                    case "a":
                        $("#menuSelectLemma").click();
                        break;
                    case "c":
                        $("#menuCopy").click();
                        break;
                    case "e":
                        $("#menuTag").click();
                        break;
                    case "f":
                        $("#menuFind").click();
                        break;
                    case "m":
                        $("#menuMerge").click();
                        break;
                    case "o":
                        $("#menuOpen").click();
                        break;
                    case "r":
                        $("#menuUntag").click();
                        break;
                    case "s":
                        $("#menuSave").click();
                        break;
                    case "v":
                        $("#menuPaste").click();
                        break;
                    case "y":
                        $("#menuRedo").click();
                        break;
                    case "z":
                        $("#menuUndo").click();
                        break;
                    default:
                        return;
                }
            } else { /* no ctrl/meta */
                switch (event.key) {
                    case "Backspace":
                    case "Delete":
                        $("#menuUntag").click();
                        break;
                    case "Escape":
                        $("#menuClear").click();
                        break;
                    default:
                        return;
                }
            }

            event.preventDefault();
            event.stopPropagation();
        });

        /* Default Document Click Event */
//        $("#entityPanel").click((event) => this.documentClick(event));
    }
}

module.exports = Menu;