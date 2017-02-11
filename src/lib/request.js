var util = require('./util');

var request = {
    get: function (url, data, fn) {
        var arg = util.formatData(data);
        if (url.indexOf('?')) {
            url += arg;
        } else {
            url += '?' + arg;
        }
        fetch(url, {
            method: 'GET',
            headers: {
                "content-type": "application/x-www-form-urlencoded"
            }
        }).then(function (res) {
            res.json().then(function (obj) {
                fn && fn(obj);
            });
        });
    }
};

module.exports = request;
