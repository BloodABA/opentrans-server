const JEnum = require('../enum');
const JFunc = require('../components/user');
var crypto = require('crypto'),

App = {};

App.password = function(password) {
    const key = "JTJISGOD"
    var hash = crypto.createHmac('sha512', key)
    hash.update(password)
    return hash.digest('hex')
}

module.exports = App;