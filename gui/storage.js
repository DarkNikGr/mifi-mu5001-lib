const Store = require('electron-store')

class Storage extends Store {
    constructor (settings = {name: 'zteManager'}) {
        super(settings)
    }

    getData(key) {
        return this.get(key)
    }

    setData(key, value) {
        this.set(key, value)
        return this;
    }
}

module.exports = Storage;