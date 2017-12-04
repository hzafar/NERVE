/* global Utility */

class EntityDialogWidget{

    constructor(controller){
        this.controller = controller;
        this.entityValues = new EntityValues();
        this.update = false;

        $("#txtEntity").on("input", () => {
            this.entityValues.entity = $("#txtEntity").val();
            this.update = true;
        });
        $("#txtLemma").on("input", () => {
            this.entityValues.lemma = $("#txtLemma").val();
            this.update = true;
        });
        $("#txtLink").on("input", () => {
            this.entityValues.link = $("#txtLink").val();
            this.update = true;
        });

        $(".entityDialogTB").blur(() => {
            if (this.update) this.controller.updateAllSelected(this.entityValues);
            this.update = false;
            this.entityValues = new EntityValues();
        });

        $(".entityDialogTB").keyup((event) => {
            if (event.keyCode !== 13) return;
            this.controller.updateAllSelected(this.entityValues);
            this.entityValues = new EntityValues();
            event.stopPropagation();
        });
    }
}

class Listeners {
    constructor(view, controller) {
        Utility.log(Listeners, "constructor");
        Utility.enforceTypes(arguments, View, Controller);

        this.view = view;
        this.controller = controller;

        $(window).resize(() => this.view.tagnameManager.pollDocument());
        new EntityDialogWidget(controller);

        $("#selectTagName").on("input", (event) => {
            let values = new EntityValues("", "", "", $("#selectTagName").val() , "");
            this.controller.updateAllSelected(values);
        });

        $("#goLink").click((event) => this.controller.goLink());

        /* search events */
        $("#searchDialog").click((event) => {
            event.stopPropagation();
            this.controller.showSearchDialog();
        });
        $("#epsNext").click((event) => {
            event.stopPropagation();
            this.controller.search($("#epsTextArea").val(), "next");
        });
        $("#epsPrev").click((event) => {
            event.stopPropagation();
            this.controller.search($("#epsTextArea").val(), "prev");
        });

        $("#epsTextArea").keyup((event) => {
            if (event.keyCode !== 13) return;
            event.stopPropagation();
            this.controller.search($("#epsTextArea").val(), "next");
        });

        /* menu events key events fire these events */
        $("#menuSave").click((event) => {
            event.stopPropagation();
            this.controller.saveContents();
        });

        $("#menuOpen").click((event) => {
            event.stopPropagation();
            $("#fileOpenDialog").click();
        });

        var reader = new FileReader();
        reader.onload = function (event) {
            controller.loadDocument(this.filename, event.target.result);
            $("#fileOpenDialog").detach();
            var fileSelector = document.createElement("input");
            fileSelector.type = "file";
            $(fileSelector).attr("id", "fileOpenDialog");
            $("body").append(fileSelector);

            $("#fileOpenDialog")[0].onchange = function (event) {
                event.preventDefault();
                reader.filename = this.files[0].name;
                reader.readAsText(this.files[0]);
            };
        }.bind(reader);

        /* file dialog event - related to menu open */
        $("#fileOpenDialog")[0].onchange = function (event) {
            event.preventDefault();
            reader.filename = this.files[0].name;
            reader.readAsText(this.files[0]);
        };

        $("#menuClose").click((event) => {
            event.stopPropagation();
            this.controller.closeDocument();
        });

        $("#menuTags").click((event) => {
            event.stopPropagation();
            this.menuShowTags();
        });
        $("#menuReset").click((event) => {
            event.stopPropagation();
            localStorage.clear();
            location.reload(true);
        });
        $("#menuClear").click((event) => {
            event.stopPropagation();
            this.controller.unselectAll();
            this.view.clearThrobber();
        });
        $("#menuUndo").click((event) => {
            event.stopPropagation();
            this.controller.revertState();
        });
        $("#menuRedo").click((event) => {
            event.stopPropagation();
            this.controller.advanceState();
        });
        $("#menuCopy").click((event) => {
            event.stopPropagation();
            this.controller.copyInfo();
        });
        $("#menuPaste").click((event) => {
            event.stopPropagation();
            this.controller.pasteInfo();
        });
        $("#menuSelectLemma").click((event) => {
            event.stopPropagation();
            this.controller.selectLikeEntitiesByLemma();
        });

        $("#menuTag").click((event) => {
            event.stopPropagation();
            this.controller.tagSelectedRange();
        });
        $("#menuUntag").click((event) => {
            event.stopPropagation();
            this.controller.untagAll();
        });
        $("#menuFind").click((event) => {
            event.stopPropagation();
            this.controller.fillFind();
        });
        $("#menuMerge").click(async (event) => {
            event.stopPropagation();
            await this.controller.mergeSelectedEntities();
        });

        $("#dictAdd").click(async (event) => {
            event.stopPropagation();
            await this.controller.dictAdd();
        });

        $("#dictRemove").click(async (event) => {
            event.stopPropagation();
            await this.controller.dictRemove();
        });
        $("#dictUpdate").click(async (event) => {
            event.stopPropagation();
            await this.controller.dictAdd();
        });

        $("#menuWiki").click((event) => {
            var win = window.open("https://github.com/cwrc/NERVE/wiki", '_blank');
            win.focus();
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
        $("#entityPanel").click((event) => this.documentClick(event));
        $("#entityPanel").dblclick((event) => this.documentDblClick(event));
        $("#tagnamePanel").click((event) => {
            if (event.altKey) {
                window.lastTarget = event.target;
                return;
            }
            let srcElement = event.originalEvent.srcElement;
            if ($(srcElement).hasClass("tagname")) {
                let sourceEntity = $(srcElement).data("source");
                if (!event.ctrlKey && !event.metaKey) {
                    this.controller.setSelected(sourceEntity);
                } else {
                    this.controller.toggleSelect(sourceEntity);
                }
            }
        });
    }
    documentClick(event) {
        let srcElement = event.originalEvent.srcElement;

        /* strictly for debugging */
        if (event.altKey) {
            console.log(event.target);
            window.lastTarget = event.target;
            return;
        }

        if (!window.getSelection().isCollapsed) return;

        if ($(srcElement).hasClass("taggedentity")) {
            if (!event.ctrlKey && !event.metaKey) {
                this.controller.setSelected(srcElement);
            } else {
                this.controller.toggleSelect(srcElement);
            }
            event.stopPropagation();
        } else if (!event.ctrlKey) {
            this.controller.unselectAll();
            event.stopPropagation();
        }
    }
    documentDblClick(event) {
        let srcElement = event.originalEvent.srcElement;
        if ($(srcElement).hasClass("taggedentity")) {
            window.getSelection().removeAllRanges();
            this.controller.selectLikeEntitiesByLemma();
            event.stopPropagation();
        }
    }
    menuShowTags() {
        if ($("#menuTags").data("value") === false) {
            $("#menuTags").data("value", true);
            $("#menuTags").text("Overlay Mode");
            this.view.tagMode();
        } else {
            $("#menuTags").data("value", false);
            $("#menuTags").text("Tag Mode");
            this.view.overlayMode();
        }
    }
}