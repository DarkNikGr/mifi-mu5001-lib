module.exports = [{
    label: 'Info',
    click(menuItem, browserWindow, event) {
        browserWindow.loadFile('./gui/pages/index/index.html')
    }
},{
    label: 'Network Settings',
    submenu: [{
        label: 'Change Mode',
        click(menuItem, browserWindow, event) {
            browserWindow.loadFile('./gui/pages/networkSettings-opmode/networkSettings-opmode.html')
        }
    }]
},{
    label: 'Cell Settings',
    submenu: [{
        label: 'LTE Bands Lock',
        click(menuItem, browserWindow, event) {
            browserWindow.loadFile('./gui/pages/cellSettings-4gband/cellSettings-4gband.html')
        }
    },{
        label: '5G Bands Lock',
        click(menuItem, browserWindow, event) {
            browserWindow.loadFile('./gui/pages/cellSettings-5gband/cellSettings-5gband.html')
        }
    },{
        label: 'LTE Cell Lock',
        click(menuItem, browserWindow, event) {
            browserWindow.loadFile('./gui/pages/cellSettings-4gcell/cellSettings-4gcell.html')
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
},{
    label: 'Debug',
    click(menuItem, browserWindow, event) {
        browserWindow.loadFile('./gui/pages/debug/debug.html')
    }
}];