function paswordAlgorithmsCookie(e) {
    return SHA256(e)
}

function SHA256(e) {
    function t(e, t) {
        var n = (65535 & e) + (65535 & t);
        return (e >> 16) + (t >> 16) + (n >> 16) << 16 | 65535 & n
    }

    function n(e, t) {
        return e >>> t | e << 32 - t
    }

    function r(e, t) {
        return e >>> t
    }

    function o(e, t, n) {
        return e & t ^ ~e & n
    }

    function i(e, t, n) {
        return e & t ^ e & n ^ t & n
    }

    function a(e) {
        return n(e, 2) ^ n(e, 13) ^ n(e, 22)
    }

    function s(e) {
        return n(e, 6) ^ n(e, 11) ^ n(e, 25)
    }

    function c(e) {
        return n(e, 7) ^ n(e, 18) ^ r(e, 3)
    }

    function u(e) {
        return n(e, 17) ^ n(e, 19) ^ r(e, 10)
    }
    var l = 8,
        d = 1;
    return e = function(e) {
            e = e.replace(/\r\n/g, "\n");
            for (var t = "", n = 0; n < e.length; n++) {
                var r = e.charCodeAt(n);
                r < 128 ? t += String.fromCharCode(r) : r > 127 && r < 2048 ? (t += String.fromCharCode(r >> 6 | 192), t += String.fromCharCode(63 & r | 128)) : (t += String.fromCharCode(r >> 12 | 224), t += String.fromCharCode(r >> 6 & 63 | 128), t += String.fromCharCode(63 & r | 128))
            }
            return t
        }(e),
        function(e) {
            for (var t = d ? "0123456789ABCDEF" : "0123456789abcdef", n = "", r = 0; r < 4 * e.length; r++) n += t.charAt(e[r >> 2] >> 8 * (3 - r % 4) + 4 & 15) + t.charAt(e[r >> 2] >> 8 * (3 - r % 4) & 15);
            return n
        }(function(e, n) {
            var r, l, d, p, h, f, m, g, _, b, v, $, y = new Array(1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298),
                S = new Array(1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225),
                C = new Array(64);
            e[n >> 5] |= 128 << 24 - n % 32, e[15 + (n + 64 >> 9 << 4)] = n;
            for (var _ = 0; _ < e.length; _ += 16) {
                r = S[0], l = S[1], d = S[2], p = S[3], h = S[4], f = S[5], m = S[6], g = S[7];
                for (var b = 0; b < 64; b++) C[b] = b < 16 ? e[b + _] : t(t(t(u(C[b - 2]), C[b - 7]), c(C[b - 15])), C[b - 16]), v = t(t(t(t(g, s(h)), o(h, f, m)), y[b]), C[b]), $ = t(a(r), i(r, l, d)), g = m, m = f, f = h, h = t(p, v), p = d, d = l, l = r, r = t(v, $);
                S[0] = t(r, S[0]), S[1] = t(l, S[1]), S[2] = t(d, S[2]), S[3] = t(p, S[3]), S[4] = t(h, S[4]), S[5] = t(f, S[5]), S[6] = t(m, S[6]), S[7] = t(g, S[7])
            }
            return S
        }(function(e) {
            for (var t = Array(), n = (1 << l) - 1, r = 0; r < e.length * l; r += l) t[r >> 5] |= (e.charCodeAt(r / l) & n) << 24 - r % 32;
            return t
        }(e), e.length * l))
}

module.exports = {
    paswordAlgorithmsCookie
}