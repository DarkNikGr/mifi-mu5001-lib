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

        ipcMain.on('setNetworkMode', this.setNetworkMode.bind(this));

        ipcMain.on('set5GBands', this.set5GBands.bind(this));
        ipcMain.on('set4GBands', this.set4GBands.bind(this));
        ipcMain.on('set4GCell', this.set4GCell.bind(this));
    }

    async getIndexInfo(event) {
        if (this.session) {
            this.window.send('getIndexInfoData', {
                ...await this.session.getInfo('ethernet_port_specified,guest_switch,rscp,rssi,lte_pci,nr5g_cell_id,lte_ca_scell_info,Z5g_CELL_ID,Z5g_dlEarfcn,Z5g_snr,ecio,ZCELLINFO_band,lte_pci_lock,lte_earfcn_lock,wan_ipaddr,wan_apn,pm_sensor_mdm,pm_modem_5g,nr5g_pci,nr5g_action_channel,nr5g_action_band,Z5g_SINR,Z5g_rsrp,wan_active_band,wan_active_channel,lte_multi_ca_scell_info,cell_id,dns_mode,prefer_dns_manual,standby_dns_manual,network_type,rmcc,rmnc,lte_rsrq,lte_rssi,lte_rsrp,lte_snr,wan_lte_ca,lte_ca_pcell_band,lte_ca_pcell_bandwidth,lte_ca_scell_band,lte_ca_scell_bandwidth,lte_ca_pcell_arfcn,lte_ca_scell_arfcn,wan_ipaddr,static_wan_ipaddr'),
                ...await this.session.getInfo('modem_main_state,pin_status,opms_wan_mode,opms_wan_auto_mode,loginfo,new_version_state,current_upgrade_state,is_mandatory,wifi_dfs_status,battery_value,ppp_dial_conn_fail_counter,dhcp_wan_status,mdm_mcc,mdm_mnc,signalbar,network_type,network_provider,battery_charg_type,external_charging_flag,mode_main_state,battery_temp,ppp_status,EX_SSID1,sta_ip_status,EX_wifi_profile,m_ssid_enable,RadioOff,wifi_onoff_state,wifi_chip1_ssid1_ssid,wifi_chip2_ssid1_ssid,wifi_chip1_ssid1_access_sta_num,wifi_chip2_ssid1_access_sta_num,simcard_roam,lan_ipaddr,station_mac,wifi_access_sta_num,battery_charging,battery_vol_percent,battery_pers,spn_name_data,spn_b1_flag,spn_b2_flag,realtime_tx_bytes,realtime_rx_bytes,realtime_time,realtime_tx_thrpt,realtime_rx_thrpt,monthly_rx_bytes,monthly_tx_bytes,monthly_time,date_month,data_volume_limit_switch,data_volume_limit_size,data_volume_alert_percent,data_volume_limit_unit,roam_setting_option,upg_roam_switch,ssid,wifi_enable,wifi_5g_enable,check_web_conflict,dial_mode,ppp_dial_conn_fail_counter,wan_lte_ca,privacy_read_flag,is_night_mode,pppoe_status,dhcp_wan_status,static_wan_status,vpn_conn_status,wan_connect_status,sms_received_flag,sts_received_flag,sms_unread_num,wifi_chip1_ssid2_access_sta_num,wifi_chip2_ssid2_access_sta_num'),
                ...await this.session.getInfo('wifi_onoff_state,guest_switch,wifi_chip1_ssid2_max_access_num,m_SSID2,wifi_chip2_ssid2_max_access_num,wifi_chip1_ssid1_wifi_coverage,apn_interface_version,m_ssid_enable,imei,network_type,rssi,rscp,lte_rsrp,imsi,sim_imsi,cr_version,wa_version,hardware_version,web_version,wa_inner_version,wifi_chip1_ssid1_max_access_num,wifi_chip1_ssid1_ssid,wifi_chip1_ssid1_auth_mode,wifi_chip1_ssid1_password_encode,wifi_chip2_ssid1_ssid,wifi_chip2_ssid1_auth_mode,m_HideSSID,wifi_chip2_ssid1_password_encode,wifi_chip2_ssid1_max_access_num,lan_ipaddr,lan_ipaddr,mac_address,msisdn,LocalDomain,wan_ipaddr,static_wan_ipaddr,ipv6_wan_ipaddr,ipv6_pdp_type,ipv6_pdp_type_ui,pdp_type,pdp_type_ui,opms_wan_mode,opms_wan_auto_mode,ppp_status,Z5g_snr,Z5g_rsrp,wan_lte_ca,lte_ca_pcell_band,lte_ca_pcell_bandwidth,lte_ca_scell_band,lte_ca_scell_bandwidth,lte_ca_pcell_arfcn,lte_ca_scell_arfcn,lte_multi_ca_scell_info,wan_active_band,wifi_onoff_state,guest_switch,wifi_chip1_ssid2_max_access_num,wifi_chip2_ssid2_max_access_num,wifi_chip1_ssid1_wifi_coverage,wifi_chip1_ssid1_max_access_num,wifi_chip1_ssid1_ssid,wifi_chip1_ssid1_auth_mode,wifi_chip1_ssid1_password_encode,wifi_chip2_ssid1_ssid,wifi_chip2_ssid1_auth_mode,wifi_chip2_ssid1_password_encode,wifi_chip2_ssid1_max_access_num,wifi_chip1_ssid2_ssid,wifi_chip2_ssid2_ssid,wifi_chip1_ssid1_switch_onoff,wifi_chip2_ssid1_switch_onoff,wifi_chip1_ssid2_switch_onoff,wifi_chip2_ssid2_switch_onoff,Z5g_SINR,station_ip_addr'),
                ...await this.session.getInfo('wifi_chip_temp,therm_pa_level,therm_pa_frl_level,therm_tj_level,pm_sensor_pa1,pm_sensor_mdm,pm_modem_5g,wifi_temp_level_1,wifi_temp_level_2'),
                ...await this.session.getInfoSingle('sms_capacity_info'),
                ...await this.session.getInfoSingle('lan_station_list'),
            });
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

    async set4GBands(event, bands) {
        if (this.session && this.forms) {
            const setBands = await this.forms.lte_band(bands);
            if (setBands?.result === 'success') {
                new Notification({ title: 'Set LTE Bands', body: 'Success' }).show()
                this.window.goToHome();
            } else {
                new Notification({ title: 'Set LTE Bands', body: 'Failure' }).show()
            }
        } else {
            new Notification({ title: 'Modem Connection', body: 'Connect to modem first' }).show()
        }
    }

    async set4GCell(event, cell) {
        if (this.session && this.forms) {
            const setCell = await this.forms.cell_lock(cell.pci, cell.earfcn);
            if (setCell?.result === 'success') {
                new Notification({ title: 'Set LTE Cell', body: 'Success' }).show()
                this.window.goToHome();
            } else {
                new Notification({ title: 'Set LTE Cell', body: 'Failure' }).show()
            }
        } else {
            new Notification({ title: 'Modem Connection', body: 'Connect to modem first' }).show()
        }
    }

    async setNetworkMode(event, mode) {
        if (this.session && this.forms) {
            const changeMode = await this.forms.change_mode(mode);
            if (changeMode?.result === 'success') {
                new Notification({ title: 'Set Network Mode', body: 'Success' }).show()
                this.window.goToHome();
            } else {
                new Notification({ title: 'Set Network Mode', body: 'Failure' }).show()
            }
        } else {
            new Notification({ title: 'Modem Connection', body: 'Connect to modem first' }).show()
        }
    }
}

module.exports = Actions;