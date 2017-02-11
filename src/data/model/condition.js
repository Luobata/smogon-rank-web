var $$model = require('../../lib/model.js');
var under = require('../../lib/underscore.v1.4.4.min.js');
var request = require('../../lib/request.js');

var _ = under;
var model = new $$model({});

_.extend(model, {
    getConditionList: function (fn) {
        request.get('/condition', {}, function (data) {
            model.trigger('getConditionList');
            fn && fn(data);
        });
    }
});

module.exports = model;
