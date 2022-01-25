const { ipcMain, Notification } = require('electron')
const Storage = require('./storage');
const Session = require('../lib/session');
const Forms = require('../lib/forms');

class Actions {
    constructor() {
        this.window = null;
        this.session = null;
        this.forms = null;
        this.storage = new Storage();
    }

    init(window) {
        this.window = window;
        ipcMain.on('connectToModem', this.connectToModem.bind(this));

        ipcMain.on('modemConfigSaveSettings', this.modemConfigSaveSettings.bind(this));
        ipcMain.on('modemConfigGetSettings', this.modemConfigGetSettings.bind(this));

        ipcMain.on('getIndexInfo', this.getIndexInfo.bind(this));

        ipcMain.on('set5GBands', this.set5GBands.bind(this));
    }

    async getIndexInfo(event) {
        if (this.session) {
            const info = await this.session.getInfo(
                'lte_pci,' +
                'lte_pci_lock,' +
                'lte_earfcn_lock,' +
                'wan_ipaddr,' +
                'wan_apn,' +
                'pm_sensor_mdm,' +
                'pm_modem_5g,' +
                'nr5g_pci,' +
                'nr5g_action_channel,' +
                'nr5g_action_band,' +
                'Z5g_SINR,' +
                'Z5g_rsrp,' +
                'wan_active_band,' +
                'wan_active_channel,' +
                'wan_lte_ca,' +
                'lte_multi_ca_scell_info,' +
                'cell_id,' +
                'dns_mode,' +
                'prefer_dns_manual,' +
                'standby_dns_manual,' +
                'network_type,' +
                'rmcc,' +
                'rmnc,' +
                'lte_rsrq,' +
                'lte_rssi,' +
                'lte_rsrp,' +
                'lte_snr,' +
                'wan_lte_ca,' +
                'lte_ca_pcell_band,' +
                'lte_ca_pcell_bandwidth,' +
                'lte_ca_scell_band,' +
                'lte_ca_scell_bandwidth,' +
                'lte_ca_pcell_arfcn,' +
                'lte_ca_scell_arfcn,' +
                'wan_ipaddr,' +
                'static_wan_ipaddr,' +
                'opms_wan_mode,' +
                'opms_wan_auto_mode,' +
                'ppp_status,' +
                'loginfo'
            )
            this.window.send('getIndexInfoData', info);
        }
    }

    async connectToModem(event) {
        const config = this.storage.getData('modem-config');
        if (config?.modemIp && config?.modemPassword) {
            this.session = new Session(config.modemIp);
            const login = await this.session.login(config.modemPassword);
            if (login?.result === '0') {
                this.forms = new Forms(this.session);
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
            this.window.goToHome();
        } else {
            new Notification({ title: 'Modem Config', body: 'Save failed' }).show()
        }
    }

    async set5GBands(event, bands) {
        if (this.session && this.forms) {
            const setBands = await this.forms.nr5g_band(bands);
            if (setBands?.result === 'success') {
                new Notification({ title: 'Set 5G Bands', body: 'Success' }).show()
                this.window.goToHome();
            } else {
                new Notification({ title: 'Set 5G Bands', body: 'Failure' }).show()
            }
        } else {
            new Notification({ title: 'Modem Connection', body: 'Connect to modem first' }).show()
        }
    }
}

module.exports = Actions;