const { ipcRenderer } = require('electron')

ipcRenderer.send('getIndexInfo');
window.setInterval(function(){
    ipcRenderer.send('getIndexInfo');
}, 1000);


ipcRenderer.on('getIndexInfoData', (event, info) => {
    console.log(info);
    $('#val_lte_rsrp').html(info.lte_rsrp || '');
    $('#val_lte_sinr').html(info.lte_snr || '');

    $('#val_5g_rsrp').html(info.Z5g_rsrp || '');
    $('#val_5g_sinr').html(info.Z5g_SINR || '');
})

function connectToModem() {
    ipcRenderer.send('connectToModem');
}