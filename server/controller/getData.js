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

var getData = function (type, rank, classRange, time) {
    var fileName = enumType[type] + '-'
        + enumRank[rank] + '-'
        + enumClass[classRange] + '-'
        + time;
    var dist = './server/data/source/' + fileName + '.json';
    console.log(dist);
    if (fs.existsSync(dist)) {
        return JSON.parse(fs.readFileSync(dist));
    } else {
        return {
            error: '无筛选数据'
        };
    }
};

module.exports = getData;
