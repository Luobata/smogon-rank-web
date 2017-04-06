/**
 * @description 爬去smogon页面上的数据
 * @output dist文件
 * @auth luobata(batayao@sohu-inc.com)
 * @time 2017年2月11日18:10:59
 */

var fs = require('fs');
var Promise = require('bluebird');
var util = require('../lib/util.js');
var config = require('../lib/config.json').select;
var spider = require('./fetchFile.js');

var enumType = util.arrToObject(config.type, 'value', 'label');
var enumRank = util.arrToObject(config.rank, 'value', 'label');
var enumClass = util.arrToObject(config.class, 'value', 'label');

var spiderFile = function (month, fileName) {
    return spider(month, fileName, './server/data/');
};

module.exports = spiderFile;
