const { ipcRenderer } = require('electron')

function saveSettings(event) {
    ipcRenderer.send('set4GCell', {
        pci:  $('#pci').val(),
        earfcn: $('#earfcn').val(),
    });
}
