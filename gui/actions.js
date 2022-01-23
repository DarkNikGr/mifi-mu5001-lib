const { ipcMain, Notification } = require('electron')
const Storage = require('./storage');
const Session = require('../lib/session');

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
        ipcMain.on('modemConfigGetSettings', this.modemConfigGetSettings.bind(this));

        ipcMain.on('getIndexInfo', this.getIndexInfo.bind(this));
    }

    async getIndexInfo(event) {
        if (this.session) {
            const info = await this.session.getInfo('network_type,rssi,rscp,lte_rsrp,Z5g_snr,Z5g_rsrp,ZCELLINFO_band,Z5g_dlEarfcn,lte_ca_pcell_arfcn,lte_ca_pcell_band,lte_ca_scell_band,lte_ca_pcell_bandwidth,lte_ca_scell_info,lte_ca_scell_bandwidth,wan_lte_ca,lte_pci,Z5g_CELL_ID,Z5g_SINR,cell_id,wan_lte_ca,lte_ca_pcell_band,lte_ca_pcell_bandwidth,lte_ca_scell_band,lte_ca_scell_bandwidth,lte_ca_pcell_arfcn,lte_ca_scell_arfcn,lte_multi_ca_scell_info,wan_active_band,nr5g_pci,nr5g_action_band,nr5g_cell_id,lte_snr,ecio,wan_active_channel,nr5g_action_channel')
            this.window.send('getIndexInfoData', info);
        }
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

    modemConfigGetSettings(event) {
        this.window.send('modemConfigGetSettingsData', this.storage.getData('modem-config'));
    }

    modemConfigSaveSettings(event, config) {
        if (config?.modemIp && config?.modemPassword) {
            this.storage.setData('modem-config', config);
            new Notification({ title: 'Modem Config', body: 'Save successful' }).show()
        } else {
            new Notification({ title: 'Modem Config', body: 'Save failed' }).show()
        }
    }
}

module.exports = Actions;