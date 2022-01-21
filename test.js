const Session = require('./src/session');
const Forms = require('./src/forms');

async function test () {
    const session = new Session("10.0.10.1");
    await session.login('821991');
    const forms = new Forms(session);

    const ps_no_service_restart = await forms.ps_no_service_restart('0');
    console.log('set ps_no_service_restart', ps_no_service_restart);

    const nr5g_band = await forms.nr5g_band('1,3,7,20,78');
    console.log('set nr5g_band', nr5g_band);

    // const cell_lock = await forms.cell_lock('18abf03', '25870083');
    // console.log('set cell_lock', cell_lock);

    const getInfo = await session.getInfo("ps_no_service_restart_flag,lte_band_lock,operate_mode,zte_voice_debug_ims_set,zte_voice_debug_voice_set,wifi_tputs_test_ip,wifi_tputs_test_mode,rf_mmw_status,mec_url,mec_port,mec_username,mec_password,mec_groupid,mec_alivePeriod,mec_status,mec_tls_en,mec_aes_key,mec_aes_iv,mec_enable,mec_sim_num,lte_band_lock,lte_freq_lock,lte_pci_lock,lte_earfcn_lock");
    console.log(getInfo);
}

test();