/**
 * @description 获取smogon使用率数据并分析接口
 * @output 对应的文件名
 * @auth luobata(batayao@sohu-inc.com)
 * @time 2017年2月11日16:52:24
 */

var fs = require('fs');
var util = require('../lib/util');
var config = require('../lib/config.json').select;

var enumType = util.arrToObject(config.type, 'value', 'label');
var enumRank = util.arrToObject(config.rank, 'value', 'label');
var enumClass = util.arrToObject(config.class, 'value', 'label');

var splice = function (data, pageNum) {
    var arr = [];
    var pageSize = 10;
    for (var k in data) {
        data[k].name = k;
        if (parseFloat(data[k].rankChange) > 0) {
            data[k].rankChange = '+' + data[k].rankChange;
        }
        if (parseFloat(data[k].change) > 0) {
            data[k].change = '+' + data[k].change;
        }
        arr.push(data[k]);
    }
    return {
        list: arr.slice((pageNum - 1) * pageSize, pageNum * pageSize),
        total: arr.length
    }
};

var getData = function (type, rank, classRange, time, pageNum) {
    var fileName = enumType[type] + '-'
        + enumRank[rank] + '-'
        + enumClass[classRange] + '-'
        + time;
    var dist = './server/data/source/' + fileName + '.json';
    if (fs.existsSync(dist)) {
        return splice(JSON.parse(fs.readFileSync(dist)), pageNum);
    } else {
        return {
            error: '无筛选数据'
        };
    }
};

module.exports = getData;
