/* global FileOperations */

class HostInfo {
    constructor() {
        let prequel = "ws://";
        let host = window.location.host;
        if (host === "beta.cwrc.ca") host = "dh.sharcnet.ca";
        if (window.location.protocol === "https:") prequel = "wss://";
        this.dictionarySocketAddress = `${prequel}${host}/nerve/Dictionary`;
        this.scriberSocketAddress = `${prequel}${host}/nerve/Scriber`;
    }
}

class Main {
    constructor() {
        this.model = null;
        this.controller = null;
        this.view = null;
        this.listener = null;
    }
    async initialize() {
        window.setupCwrcDialogs();
        window.cwrcSetup();

        this.controller = new Controller();
        this.controller.getView().setThrobberMessage("Loading...");
        await this.controller.start();

        this.listener = new Listeners(this.controller.getView(), this.controller);

        this.controller.getView().showThrobber(false);
        $("#container").show();
    }
}