/* Loads the no-DOM parts of Biologie-Bobins into Node for the logic tests. */
global.window = global;
var store = {};
global.localStorage = { getItem: function (k) { return k in store ? store[k] : null; }, setItem: function (k, v) { store[k] = String(v); }, removeItem: function (k) { delete store[k]; }, _clear: function () { store = {}; } };
var path = require('path'), root = path.join(__dirname, '..');
['data/curriculum.js', 'data/mod-a.js', 'data/mod-b.js', 'data/mod-c.js', 'data/mod-d.js', 'data/mod-e.js', 'data/mod-f.js', 'data/mod-g.js', 'data/mod-h.js',
  'js/check.js', 'js/progress.js', 'js/figs.js', 'js/session.js'].forEach(function (f) { require(path.join(root, f)); });
module.exports = global.BIO;
