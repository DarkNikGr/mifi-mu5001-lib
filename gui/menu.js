module.exports = [{
    label: 'Info',
    click(menuItem, browserWindow, event) {
        browserWindow.loadFile('./gui/pages/index/index.html')
    }
},{
    label: 'Network Settings',
    submenu: [{
        label: 'Mode',
    },{
        label: 'Network',
    }]
},{
    label: 'Cell Settings',
    submenu: [{
        label: 'Cell Lock',
    },{
        label: '5G Bands Lock',
    },{
        label: '4G Bands Lock',
    }]
},{
    label: 'Config',
    submenu: [{
        label: 'Modem',
        click(menuItem, browserWindow, event) {
            browserWindow.loadFile('./gui/pages/config-modem/config-modem.html')
        }
    }]
}];