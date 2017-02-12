var $$model = require('../../lib/model.js');
var under = require('../../lib/underscore.v1.4.4.min.js');
var request = require('../../lib/request.js');

var _ = under;
var model = new $$model({});

var condition = {
    query: {
    },
    pageInfo: {
        pageNum: 1,
        pageSize: 10
    }
};

_.extend(model, {
    getConditionList: function (fn) {
        request.get('/condition', {}, function (data) {
            model.trigger('getConditionList');
            fn && fn(data);
        });
    },
    setRankQuery: function (params, fn) {
        condition.query = params;
        condition.pageInfo.pageNum = params.pageNum;
    },
    getRankData: function (params, fn) {
        if (params.type) {
            condition.query = params;
            condition.pageInfo.pageNum = params.pageNum;
        } else {
            condition.query.pageNum = params.pageNum;
            params = condition.query;
        }
        var url = '/getData';
        url += '/' + 
            params.type + '/' + 
            params.rank + '/' +
            params.classRange + '/' +
            params.time + '/' +
            params.pageNum;
        request.get(url, {}, function (data) {
            model.trigger('getRankData', data);
            fn && fn (data);
        });
    }
});

module.exports = model;
