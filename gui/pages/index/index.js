const { ipcRenderer } = require('electron')

ipcRenderer.send('getIndexInfo');
window.setInterval(function(){
    ipcRenderer.send('getIndexInfo');
}, 1000);


ipcRenderer.on('getIndexInfoData', (event, info) => {
    console.log(info);
    let cell_id = parseInt(info.cell_id, 16);
    let enbid = Math.trunc(cell_id / 256);
    
    $('#val_network_type').html(info.network_type);
    $('#val_cell_id').html(cell_id);
    $('#val_enbid').html(enbid);
    $('#val_wan_active_band').html(info.wan_active_band);
    $('#val_lte_ca_pcell_band').html(info.lte_ca_pcell_band);
    $('#val_lte_ca_pcell_bandwidth').html(info.lte_ca_pcell_bandwidth);
    $('#val_pci').html(parseInt(info.lte_pci, 16));
    $('#val_wan_active_channel').html(info.wan_active_channel);
    $('#val_ca_table').html(info?.lte_multi_ca_scell_info?.slice(0, -1).split(";").map(x=> {
        let ca = x.split(',');
        return `<div>(B${ca[3]})${ca[4]}@${ca[5]}MHZ</div>`
    }).join('') || '');
    $('#val_nr5g_pci').html(parseInt(info.nr5g_pci, 16));
    $('#val_nr5g_action_band').html(info.nr5g_action_band);
    $('#val_nr5g_action_channel').html(info.nr5g_action_channel);

    $('#val_lte_rsrp').html(info.lte_rsrp + ' dBm');
    $("#val_lte_rsrp").css('background', calccolor(info.lte_rsrp, -128, -115, -105, -95, -85, -75));

    $('#val_lte_rsrq').html(info.lte_rsrq + ' db');
    $("#val_lte_rsrq").css('background', calccolor(info.lte_rsrq, -30, -20, -15, -10, -6, 0));

    $('#val_lte_rssi').html(info.lte_rssi + ' dBm');
    $("#val_lte_rssi").css('background', calccolor(info.lte_rssi, -90, -80, -70, -67, -30, 0));

    $('#val_lte_sinr').html(info.lte_snr + ' db');
    $('#val_lte_sinr').css('background', calccolor(info.lte_snr, -15, 3, 10, 15, 22, 30));

    $('#val_5g_rsrp').html(info.Z5g_rsrp + ' dBm');
    $("#val_5g_rsrp").css('background', calccolor(info.Z5g_rsrp, -128, -115, -105, -95, -85, -75));

    $('#val_5g_sinr').html(info.Z5g_SINR + ' db');
    $('#val_5g_sinr').css('background', calccolor(info.Z5g_SINR, -15, 3, 10, 15, 22, 30));
})

function connectToModem() {
    ipcRenderer.send('connectToModem');
}