const { ipcRenderer } = require('electron')

ipcRenderer.send('getIndexInfo');
window.setInterval(function(){
    ipcRenderer.send('getIndexInfo');
}, 1000);


ipcRenderer.on('getIndexInfoData', (event, info) => {
    let html = ""
    for (let key in info) {
        html += `<tr><td>${key}</td><td>${JSON.stringify(info[key])}</td></tr>`;
    }
    $('#debugTable tbody').html(html);
})

function connectToModem() {
    ipcRenderer.send('connectToModem');
}