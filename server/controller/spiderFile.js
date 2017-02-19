/**
 * @description 爬去smogon页面上的数据
 * @output dist文件
 * @auth luobata(batayao@sohu-inc.com)
 * @time 2017年2月11日18:10:59
 */

var fs = require('fs');
var Promise = require('bluebird');
var util = require('../lib/util');
var config = require('../lib/config.json').select;
var spider = require('./spider');

var enumType = util.arrToObject(config.type, 'value', 'label');
var enumRank = util.arrToObject(config.rank, 'value', 'label');
var enumClass = util.arrToObject(config.class, 'value', 'label');

var spiderFile = function (type, rank, classRange, time) {
    var fileName = enumType[type] + '-'
        + enumRank[rank] + '-'
        + enumClass[classRange] + '-'
        + time;
    var dist = './server/dist/' + fileName + '.json';
    var source = './server/data/source/' + fileName + '.json';
    if (!fs.existsSync(source)) {
        return false;
    } else {
        return spider(enumType[type], enumRank[rank], enumClass[classRange], time, './server/data/', fileName + '.json');
    }
};

module.exports = spiderFile;
