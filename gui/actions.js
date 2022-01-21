const { ipcMain, Notification } = require('electron')
const Storage = require('./storage');

class Actions {
    constructor() {
        this.window = null;
        this.session = null;
        this.storage = new Storage();
    }

    init(window) {
        this.window = window;
        ipcMain.on('connectToModem', this.connectToModem.bind(this));
        ipcMain.on('modemConfigSaveSettings', this.modemConfigSaveSettings.bind(this));

        ipcMain.on('getIndexInfo', this.getIndexInfo.bind(this));
    }

    async getIndexInfo(event) {
        this.window.send('getIndexInfoData', {'data': 'test'});
    }

    async connectToModem(event) {
        const config = this.storage.getData('modem-config');
        if (config?.modemIp && config?.modemPassword) {
            this.session = new Session(config.modemIp);
            const login = await this.session.login(config.modemPassword);
            if (login?.result === '0') {
                new Notification({ title: 'Modem Status', body: 'Modem Connecting' }).show()
            } else {
                new Notification({ title: 'Modem Status', body: 'Faild to connect modem' }).show()
            }
        } else {
            new Notification({ title: 'Modem Status', body: 'Faild to connect modem' }).show()
        }
    }

    modemConfigSaveSettings(event, config) {
        
    }
}

module.exports = Actions;