module.exports = [{
    label: 'Info',
    click(menuItem, browserWindow, event) {
        browserWindow.loadFile('./gui/pages/index/index.html')
    }
},{
    label: 'Cell Settings',
    submenu: [{
        label: '5G Bands Lock',
        click(menuItem, browserWindow, event) {
            browserWindow.loadFile('./gui/pages/cellSettings-5gband/cellSettings-5gband.html')
        }
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