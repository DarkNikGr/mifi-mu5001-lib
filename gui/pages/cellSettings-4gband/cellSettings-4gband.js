const { ipcRenderer } = require('electron')

function saveSettings(event) {
    let bands = [];
    $("input.lte4gBands:checkbox:checked").each(function(){ bands.push($(this).val()); })
    let n = 0;
    for (var l = 0; l < bands.length; l++) n += Math.pow(2, parseInt(bands[l]) - 1);
    n = "0x" + n.toString(16)
    ipcRenderer.send('set4GBands', n);
}

function retsetToAuto(event) {
    ipcRenderer.send('set4GBands', '0xA3E2AB0908DF');
}