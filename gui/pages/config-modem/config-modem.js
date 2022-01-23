const { ipcRenderer } = require('electron')

ipcRenderer.on('modemConfigGetSettingsData', (event, settings) => {
    $('#modemIp').val(settings.modemIp || '')
    $('#modemPassword').val(settings.modemPassword || '')
});
ipcRenderer.send('modemConfigGetSettings');


function saveSettings(event) {
    console.log('save Settings');
    ipcRenderer.send('modemConfigSaveSettings', {
        modemIp:  $('#modemIp').val(),
        modemPassword: $('#modemPassword').val(),
    });
}
