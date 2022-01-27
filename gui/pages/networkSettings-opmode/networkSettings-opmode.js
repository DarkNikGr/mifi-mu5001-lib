const { ipcRenderer } = require('electron')

function saveSettings(event) {
    ipcRenderer.send('setNetworkMode', $('#mode').val());
}
