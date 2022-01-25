const { BrowserWindow, Menu } = require('electron');
const menu = require('./menu');

const defaultProps = {
    with: 800,
    height: 600,
    show: false,
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: true,
    },
}

class Window extends BrowserWindow {
    constructor({file, ...windowSettings}) {
        super({ ...defaultProps, ...windowSettings});

        this.homeFile = file;

        this.loadFile(file)

        Menu.setApplicationMenu(Menu.buildFromTemplate(menu));

        this.webContents.openDevTools();

        this.once('ready-to-show', () => {
            this.show();
        });
    }

    goToHome() {
        this.loadFile(this.homeFile);
    }
}

module.exports = Window;