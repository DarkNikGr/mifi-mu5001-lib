const { app } = require('electron');
const Actions = require('./actions');
const Window = require('./window');

class App {
    constructor() {
        this.mainWindow = null;
        this.actions = new Actions();

        app.on('ready', this.ready.bind(this));
        app.on('window-all-closed', () => {
            app.quit();
        });
    }

    ready() {
        this.mainWindow = new Window({
            file: './gui/pages/index/index.html'
        });

        this.actions.init(this.mainWindow);
    }
}

module.exports = App;