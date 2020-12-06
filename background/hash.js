function calculateHashes(blob) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsArrayBuffer(blob);
        reader.onloadend = function () {
            var wordArray = CryptoJS.lib.WordArray.create(reader.result)
            var hashMD5 = CryptoJS.MD5(wordArray).toString().toUpperCase()
            var hashSHA256 = CryptoJS.SHA256(wordArray).toString()
            resolve({"MD5": hashMD5, "SHA256": hashSHA256, "CRC": "" })
        };
    })
}

/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
var CryptoJS = CryptoJS || function (s, p) {
    var m = {}, l = m.lib = {}, n = function () { }, r = l.Base = { extend: function (b) { n.prototype = this; var h = new n; b && h.mixIn(b); h.hasOwnProperty("init") || (h.init = function () { h.$super.init.apply(this, arguments) }); h.init.prototype = h; h.$super = this; return h }, create: function () { var b = this.extend(); b.init.apply(b, arguments); return b }, init: function () { }, mixIn: function (b) { for (var h in b) b.hasOwnProperty(h) && (this[h] = b[h]); b.hasOwnProperty("toString") && (this.toString = b.toString) }, clone: function () { return this.init.prototype.extend(this) } },
    q = l.WordArray = r.extend({
        init: function (b, h) { b = this.words = b || []; this.sigBytes = h != p ? h : 4 * b.length }, toString: function (b) { return (b || t).stringify(this) }, concat: function (b) { var h = this.words, a = b.words, j = this.sigBytes; b = b.sigBytes; this.clamp(); if (j % 4) for (var g = 0; g < b; g++)h[j + g >>> 2] |= (a[g >>> 2] >>> 24 - 8 * (g % 4) & 255) << 24 - 8 * ((j + g) % 4); else if (65535 < a.length) for (g = 0; g < b; g += 4)h[j + g >>> 2] = a[g >>> 2]; else h.push.apply(h, a); this.sigBytes += b; return this }, clamp: function () {
            var b = this.words, h = this.sigBytes; b[h >>> 2] &= 4294967295 <<
                32 - 8 * (h % 4); b.length = s.ceil(h / 4)
        }, clone: function () { var b = r.clone.call(this); b.words = this.words.slice(0); return b }, random: function (b) { for (var h = [], a = 0; a < b; a += 4)h.push(4294967296 * s.random() | 0); return new q.init(h, b) }
    }), v = m.enc = {}, t = v.Hex = {
        stringify: function (b) { var a = b.words; b = b.sigBytes; for (var g = [], j = 0; j < b; j++) { var k = a[j >>> 2] >>> 24 - 8 * (j % 4) & 255; g.push((k >>> 4).toString(16)); g.push((k & 15).toString(16)) } return g.join("") }, parse: function (b) {
            for (var a = b.length, g = [], j = 0; j < a; j += 2)g[j >>> 3] |= parseInt(b.substr(j,
                2), 16) << 24 - 4 * (j % 8); return new q.init(g, a / 2)
        }
    }, a = v.Latin1 = { stringify: function (b) { var a = b.words; b = b.sigBytes; for (var g = [], j = 0; j < b; j++)g.push(String.fromCharCode(a[j >>> 2] >>> 24 - 8 * (j % 4) & 255)); return g.join("") }, parse: function (b) { for (var a = b.length, g = [], j = 0; j < a; j++)g[j >>> 2] |= (b.charCodeAt(j) & 255) << 24 - 8 * (j % 4); return new q.init(g, a) } }, u = v.Utf8 = { stringify: function (b) { try { return decodeURIComponent(escape(a.stringify(b))) } catch (g) { throw Error("Malformed UTF-8 data"); } }, parse: function (b) { return a.parse(unescape(encodeURIComponent(b))) } },
    g = l.BufferedBlockAlgorithm = r.extend({
        reset: function () { this._data = new q.init; this._nDataBytes = 0 }, _append: function (b) { "string" == typeof b && (b = u.parse(b)); this._data.concat(b); this._nDataBytes += b.sigBytes }, _process: function (b) { var a = this._data, g = a.words, j = a.sigBytes, k = this.blockSize, m = j / (4 * k), m = b ? s.ceil(m) : s.max((m | 0) - this._minBufferSize, 0); b = m * k; j = s.min(4 * b, j); if (b) { for (var l = 0; l < b; l += k)this._doProcessBlock(g, l); l = g.splice(0, b); a.sigBytes -= j } return new q.init(l, j) }, clone: function () {
            var b = r.clone.call(this);
            b._data = this._data.clone(); return b
        }, _minBufferSize: 0
    }); l.Hasher = g.extend({
        cfg: r.extend(), init: function (b) { this.cfg = this.cfg.extend(b); this.reset() }, reset: function () { g.reset.call(this); this._doReset() }, update: function (b) { this._append(b); this._process(); return this }, finalize: function (b) { b && this._append(b); return this._doFinalize() }, blockSize: 16, _createHelper: function (b) { return function (a, g) { return (new b.init(g)).finalize(a) } }, _createHmacHelper: function (b) {
            return function (a, g) {
                return (new k.HMAC.init(b,
                    g)).finalize(a)
            }
        }
    }); var k = m.algo = {}; return m
}(Math);
(function (s) {
    function p(a, k, b, h, l, j, m) { a = a + (k & b | ~k & h) + l + m; return (a << j | a >>> 32 - j) + k } function m(a, k, b, h, l, j, m) { a = a + (k & h | b & ~h) + l + m; return (a << j | a >>> 32 - j) + k } function l(a, k, b, h, l, j, m) { a = a + (k ^ b ^ h) + l + m; return (a << j | a >>> 32 - j) + k } function n(a, k, b, h, l, j, m) { a = a + (b ^ (k | ~h)) + l + m; return (a << j | a >>> 32 - j) + k } for (var r = CryptoJS, q = r.lib, v = q.WordArray, t = q.Hasher, q = r.algo, a = [], u = 0; 64 > u; u++)a[u] = 4294967296 * s.abs(s.sin(u + 1)) | 0; q = q.MD5 = t.extend({
        _doReset: function () { this._hash = new v.init([1732584193, 4023233417, 2562383102, 271733878]) },
        _doProcessBlock: function (g, k) {
            for (var b = 0; 16 > b; b++) { var h = k + b, w = g[h]; g[h] = (w << 8 | w >>> 24) & 16711935 | (w << 24 | w >>> 8) & 4278255360 } var b = this._hash.words, h = g[k + 0], w = g[k + 1], j = g[k + 2], q = g[k + 3], r = g[k + 4], s = g[k + 5], t = g[k + 6], u = g[k + 7], v = g[k + 8], x = g[k + 9], y = g[k + 10], z = g[k + 11], A = g[k + 12], B = g[k + 13], C = g[k + 14], D = g[k + 15], c = b[0], d = b[1], e = b[2], f = b[3], c = p(c, d, e, f, h, 7, a[0]), f = p(f, c, d, e, w, 12, a[1]), e = p(e, f, c, d, j, 17, a[2]), d = p(d, e, f, c, q, 22, a[3]), c = p(c, d, e, f, r, 7, a[4]), f = p(f, c, d, e, s, 12, a[5]), e = p(e, f, c, d, t, 17, a[6]), d = p(d, e, f, c, u, 22, a[7]),
                c = p(c, d, e, f, v, 7, a[8]), f = p(f, c, d, e, x, 12, a[9]), e = p(e, f, c, d, y, 17, a[10]), d = p(d, e, f, c, z, 22, a[11]), c = p(c, d, e, f, A, 7, a[12]), f = p(f, c, d, e, B, 12, a[13]), e = p(e, f, c, d, C, 17, a[14]), d = p(d, e, f, c, D, 22, a[15]), c = m(c, d, e, f, w, 5, a[16]), f = m(f, c, d, e, t, 9, a[17]), e = m(e, f, c, d, z, 14, a[18]), d = m(d, e, f, c, h, 20, a[19]), c = m(c, d, e, f, s, 5, a[20]), f = m(f, c, d, e, y, 9, a[21]), e = m(e, f, c, d, D, 14, a[22]), d = m(d, e, f, c, r, 20, a[23]), c = m(c, d, e, f, x, 5, a[24]), f = m(f, c, d, e, C, 9, a[25]), e = m(e, f, c, d, q, 14, a[26]), d = m(d, e, f, c, v, 20, a[27]), c = m(c, d, e, f, B, 5, a[28]), f = m(f, c,
                    d, e, j, 9, a[29]), e = m(e, f, c, d, u, 14, a[30]), d = m(d, e, f, c, A, 20, a[31]), c = l(c, d, e, f, s, 4, a[32]), f = l(f, c, d, e, v, 11, a[33]), e = l(e, f, c, d, z, 16, a[34]), d = l(d, e, f, c, C, 23, a[35]), c = l(c, d, e, f, w, 4, a[36]), f = l(f, c, d, e, r, 11, a[37]), e = l(e, f, c, d, u, 16, a[38]), d = l(d, e, f, c, y, 23, a[39]), c = l(c, d, e, f, B, 4, a[40]), f = l(f, c, d, e, h, 11, a[41]), e = l(e, f, c, d, q, 16, a[42]), d = l(d, e, f, c, t, 23, a[43]), c = l(c, d, e, f, x, 4, a[44]), f = l(f, c, d, e, A, 11, a[45]), e = l(e, f, c, d, D, 16, a[46]), d = l(d, e, f, c, j, 23, a[47]), c = n(c, d, e, f, h, 6, a[48]), f = n(f, c, d, e, u, 10, a[49]), e = n(e, f, c, d,
                        C, 15, a[50]), d = n(d, e, f, c, s, 21, a[51]), c = n(c, d, e, f, A, 6, a[52]), f = n(f, c, d, e, q, 10, a[53]), e = n(e, f, c, d, y, 15, a[54]), d = n(d, e, f, c, w, 21, a[55]), c = n(c, d, e, f, v, 6, a[56]), f = n(f, c, d, e, D, 10, a[57]), e = n(e, f, c, d, t, 15, a[58]), d = n(d, e, f, c, B, 21, a[59]), c = n(c, d, e, f, r, 6, a[60]), f = n(f, c, d, e, z, 10, a[61]), e = n(e, f, c, d, j, 15, a[62]), d = n(d, e, f, c, x, 21, a[63]); b[0] = b[0] + c | 0; b[1] = b[1] + d | 0; b[2] = b[2] + e | 0; b[3] = b[3] + f | 0
        }, _doFinalize: function () {
            var a = this._data, k = a.words, b = 8 * this._nDataBytes, h = 8 * a.sigBytes; k[h >>> 5] |= 128 << 24 - h % 32; var l = s.floor(b /
                4294967296); k[(h + 64 >>> 9 << 4) + 15] = (l << 8 | l >>> 24) & 16711935 | (l << 24 | l >>> 8) & 4278255360; k[(h + 64 >>> 9 << 4) + 14] = (b << 8 | b >>> 24) & 16711935 | (b << 24 | b >>> 8) & 4278255360; a.sigBytes = 4 * (k.length + 1); this._process(); a = this._hash; k = a.words; for (b = 0; 4 > b; b++)h = k[b], k[b] = (h << 8 | h >>> 24) & 16711935 | (h << 24 | h >>> 8) & 4278255360; return a
        }, clone: function () { var a = t.clone.call(this); a._hash = this._hash.clone(); return a }
    }); r.MD5 = t._createHelper(q); r.HmacMD5 = t._createHmacHelper(q)
})(Math);

/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
var CryptoJS = CryptoJS || function (h, s) {
    var f = {}, t = f.lib = {}, g = function () { }, j = t.Base = { extend: function (a) { g.prototype = this; var c = new g; a && c.mixIn(a); c.hasOwnProperty("init") || (c.init = function () { c.$super.init.apply(this, arguments) }); c.init.prototype = c; c.$super = this; return c }, create: function () { var a = this.extend(); a.init.apply(a, arguments); return a }, init: function () { }, mixIn: function (a) { for (var c in a) a.hasOwnProperty(c) && (this[c] = a[c]); a.hasOwnProperty("toString") && (this.toString = a.toString) }, clone: function () { return this.init.prototype.extend(this) } },
    q = t.WordArray = j.extend({
        init: function (a, c) { a = this.words = a || []; this.sigBytes = c != s ? c : 4 * a.length }, toString: function (a) { return (a || u).stringify(this) }, concat: function (a) { var c = this.words, d = a.words, b = this.sigBytes; a = a.sigBytes; this.clamp(); if (b % 4) for (var e = 0; e < a; e++)c[b + e >>> 2] |= (d[e >>> 2] >>> 24 - 8 * (e % 4) & 255) << 24 - 8 * ((b + e) % 4); else if (65535 < d.length) for (e = 0; e < a; e += 4)c[b + e >>> 2] = d[e >>> 2]; else c.push.apply(c, d); this.sigBytes += a; return this }, clamp: function () {
            var a = this.words, c = this.sigBytes; a[c >>> 2] &= 4294967295 <<
                32 - 8 * (c % 4); a.length = h.ceil(c / 4)
        }, clone: function () { var a = j.clone.call(this); a.words = this.words.slice(0); return a }, random: function (a) { for (var c = [], d = 0; d < a; d += 4)c.push(4294967296 * h.random() | 0); return new q.init(c, a) }
    }), v = f.enc = {}, u = v.Hex = {
        stringify: function (a) { var c = a.words; a = a.sigBytes; for (var d = [], b = 0; b < a; b++) { var e = c[b >>> 2] >>> 24 - 8 * (b % 4) & 255; d.push((e >>> 4).toString(16)); d.push((e & 15).toString(16)) } return d.join("") }, parse: function (a) {
            for (var c = a.length, d = [], b = 0; b < c; b += 2)d[b >>> 3] |= parseInt(a.substr(b,
                2), 16) << 24 - 4 * (b % 8); return new q.init(d, c / 2)
        }
    }, k = v.Latin1 = { stringify: function (a) { var c = a.words; a = a.sigBytes; for (var d = [], b = 0; b < a; b++)d.push(String.fromCharCode(c[b >>> 2] >>> 24 - 8 * (b % 4) & 255)); return d.join("") }, parse: function (a) { for (var c = a.length, d = [], b = 0; b < c; b++)d[b >>> 2] |= (a.charCodeAt(b) & 255) << 24 - 8 * (b % 4); return new q.init(d, c) } }, l = v.Utf8 = { stringify: function (a) { try { return decodeURIComponent(escape(k.stringify(a))) } catch (c) { throw Error("Malformed UTF-8 data"); } }, parse: function (a) { return k.parse(unescape(encodeURIComponent(a))) } },
    x = t.BufferedBlockAlgorithm = j.extend({
        reset: function () { this._data = new q.init; this._nDataBytes = 0 }, _append: function (a) { "string" == typeof a && (a = l.parse(a)); this._data.concat(a); this._nDataBytes += a.sigBytes }, _process: function (a) { var c = this._data, d = c.words, b = c.sigBytes, e = this.blockSize, f = b / (4 * e), f = a ? h.ceil(f) : h.max((f | 0) - this._minBufferSize, 0); a = f * e; b = h.min(4 * a, b); if (a) { for (var m = 0; m < a; m += e)this._doProcessBlock(d, m); m = d.splice(0, a); c.sigBytes -= b } return new q.init(m, b) }, clone: function () {
            var a = j.clone.call(this);
            a._data = this._data.clone(); return a
        }, _minBufferSize: 0
    }); t.Hasher = x.extend({
        cfg: j.extend(), init: function (a) { this.cfg = this.cfg.extend(a); this.reset() }, reset: function () { x.reset.call(this); this._doReset() }, update: function (a) { this._append(a); this._process(); return this }, finalize: function (a) { a && this._append(a); return this._doFinalize() }, blockSize: 16, _createHelper: function (a) { return function (c, d) { return (new a.init(d)).finalize(c) } }, _createHmacHelper: function (a) {
            return function (c, d) {
                return (new w.HMAC.init(a,
                    d)).finalize(c)
            }
        }
    }); var w = f.algo = {}; return f
}(Math);
(function (h) {
    for (var s = CryptoJS, f = s.lib, t = f.WordArray, g = f.Hasher, f = s.algo, j = [], q = [], v = function (a) { return 4294967296 * (a - (a | 0)) | 0 }, u = 2, k = 0; 64 > k;) { var l; a: { l = u; for (var x = h.sqrt(l), w = 2; w <= x; w++)if (!(l % w)) { l = !1; break a } l = !0 } l && (8 > k && (j[k] = v(h.pow(u, 0.5))), q[k] = v(h.pow(u, 1 / 3)), k++); u++ } var a = [], f = f.SHA256 = g.extend({
        _doReset: function () { this._hash = new t.init(j.slice(0)) }, _doProcessBlock: function (c, d) {
            for (var b = this._hash.words, e = b[0], f = b[1], m = b[2], h = b[3], p = b[4], j = b[5], k = b[6], l = b[7], n = 0; 64 > n; n++) {
                if (16 > n) a[n] =
                    c[d + n] | 0; else { var r = a[n - 15], g = a[n - 2]; a[n] = ((r << 25 | r >>> 7) ^ (r << 14 | r >>> 18) ^ r >>> 3) + a[n - 7] + ((g << 15 | g >>> 17) ^ (g << 13 | g >>> 19) ^ g >>> 10) + a[n - 16] } r = l + ((p << 26 | p >>> 6) ^ (p << 21 | p >>> 11) ^ (p << 7 | p >>> 25)) + (p & j ^ ~p & k) + q[n] + a[n]; g = ((e << 30 | e >>> 2) ^ (e << 19 | e >>> 13) ^ (e << 10 | e >>> 22)) + (e & f ^ e & m ^ f & m); l = k; k = j; j = p; p = h + r | 0; h = m; m = f; f = e; e = r + g | 0
            } b[0] = b[0] + e | 0; b[1] = b[1] + f | 0; b[2] = b[2] + m | 0; b[3] = b[3] + h | 0; b[4] = b[4] + p | 0; b[5] = b[5] + j | 0; b[6] = b[6] + k | 0; b[7] = b[7] + l | 0
        }, _doFinalize: function () {
            var a = this._data, d = a.words, b = 8 * this._nDataBytes, e = 8 * a.sigBytes;
            d[e >>> 5] |= 128 << 24 - e % 32; d[(e + 64 >>> 9 << 4) + 14] = h.floor(b / 4294967296); d[(e + 64 >>> 9 << 4) + 15] = b; a.sigBytes = 4 * d.length; this._process(); return this._hash
        }, clone: function () { var a = g.clone.call(this); a._hash = this._hash.clone(); return a }
    }); s.SHA256 = g._createHelper(f); s.HmacSHA256 = g._createHmacHelper(f)
})(Math);

