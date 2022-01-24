const { ipcRenderer } = require('electron')

function saveSettings(event) {
    let bands = [];
    $("input.nr5gBands:checkbox:checked").each(function(){ bands.push($(this).val()); })
    ipcRenderer.send('set5GBands', bands.join(','));
}

function retsetToAuto(event) {
    ipcRenderer.send('set5GBands', '1,2,3,5,7,8,20,28,38,41,50,51,66,70,71,74,75,76,77,78,79,80,81,82,83,84,257');
}