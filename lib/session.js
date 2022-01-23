const axios = require('axios');
const querystring = require('querystring');

const md5 = require('./md5');
const { paswordAlgorithmsCookie } = require('./util');

class Session {
    constructor(modemIp) {
        this._stok = '';
        this._modem_ip = modemIp;
        this._url_prefix = "http://";
        this._referer = "/index.html";
        this._url_set = "/goform/goform_set_cmd_process";
        this._url_get = "/goform/goform_get_cmd_process";
        this._wa_inner_version = '';
        this._cr_version = '';
    }

    async get_versions() {
        const versions = this.getInfo('wa_inner_version,cr_version');
        if (versions?.wa_inner_version) this._wa_inner_version = versions.wa_inner_version || '';
        if (versions?.cr_version) this._cr_version = versions.cr_version || '';
    }

    async login(password) {
        const ldReq = await this.get({
            isTest: false,
            cmd: 'LD',
            _: new Date().getTime(),
        }, false);
        const getParams = new URLSearchParams(querystring.stringify({
            isTest: false,
            goformId: "LOGIN",
            password: paswordAlgorithmsCookie(paswordAlgorithmsCookie(password) + ldReq.LD),
        }));
        return axios.post(`${this._url_prefix}${this._modem_ip}${this._url_set}`, getParams, {
            headers: {
                'Cookie': `stok="${this._stok}"`,
                'Referer': `${this._url_prefix}${this._modem_ip}${this._referer}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
            .then(res => {
                if (res.request.res.headers['set-cookie']) {
                    const cookies = res.request.res.headers['set-cookie'][0].split(';')
                        .map(v => v.split('='))
                        .reduce((acc, v) => {
                            acc[v[0]] = v[1] ? v[1].replace('"',''): null
                            return acc;
                        }, {});
                    if (cookies.stok) {
                        this._stok = cookies.stok;
                        this.get_versions();
                    }
                }
                return res.data;
            })
            .catch(err => {
                return {
                    error: err.message
                }
            });
    }

    async logout() {
        await this.post({
            isTest: false,
            goformId: "LOGOUT",
        }, false);
    }

    getInfo(cmd) {
        return this.get({
            isTest: false,
            cmd,
            multi_data: 1
        })
    }

    get(params) {
        const getParams = new URLSearchParams(querystring.stringify(params));
        // console.log('get -> ', params)
        return axios.get(`${this._url_prefix}${this._modem_ip}${this._url_get}?${getParams}`, {
            headers: {
                'Cookie': `stok="${this._stok}"`,
                'Referer': `${this._url_prefix}${this._modem_ip}${this._referer}`,
            },
        })
            .then(res => res.data)
            .catch(err => {
                return {
                    error: err.message
                }
            });
    }

    async post(params, ad = true) {
        if (ad) params.AD = await this._generateAD();
        // console.log('post -> ', params)
        const getParams = new URLSearchParams(querystring.stringify(params));
        return axios.post(`${this._url_prefix}${this._modem_ip}${this._url_set}`, getParams, {
            headers: {
                'Cookie': `stok="${this._stok}"`,
                'Referer': `${this._url_prefix}${this._modem_ip}${this._referer}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
            .then(res => res.data)
            .catch(err => {
                return {
                    error: err.message
                }
            });
    }

    async _generateAD() {
        var a = md5.hex_md5(this._wa_inner_version + this._cr_version),
        u = await this.get({
            isTest: false,
            cmd: 'RD',
            _: new Date().getTime(),
        }, false);
        return md5.hex_md5(a + u.RD);
    }
    
}

module.exports = Session;