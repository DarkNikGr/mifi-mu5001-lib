const { ipcRenderer } = require('electron')

ipcRenderer.send('getIndexInfo');
window.setInterval(function(){
    ipcRenderer.send('getIndexInfo');
}, 3000);


ipcRenderer.on('getIndexInfoData', (event, info) => {
    console.log(info);
})

function connectToModem() {
    ipcRenderer.send('connectToModem');
}