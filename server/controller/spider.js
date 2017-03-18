/**
 * @description 爬虫
 * @auth luobata(batayao@sohu-inc.com)
 * @time 2017年2月11日18:31:08
 */

/**
 * @file 统计smogon统计概率
 * @auth luobata(batayao@sohu-inc.com)
 */

var fs = require('fs');
var path = require('path');
var http = require('http');
var url = require('url');
var Promise = require('bluebird');
var console = require('better-console');
var util = require('../lib/util');
var download = require('../lib/download');
var dataInit = require('./dataInit/dataInit');

var smogonRoot = 'http://www.smogon.com/stats/';

var logFormate = function (root, fileName) {
    var log = fs.readFileSync(root + fileName, 'utf-8');
    var pokemons = log.split('\n').splice(3);
    var head = pokemons.shift();
    // 去除头尾分隔符
    pokemons.shift();
    pokemons.pop();
    pokemons.pop();
    var typeLen = {
        name: 0,
        rank: 0,
        usage: 0
    };
    var str = {
        rank: 'Rank',
        name: 'Pokemon',
        usage: 'Usage'
    };
    var rank = {};
    var headFormate = function (head) {
        head.split('|').forEach(function (item) {
            if (item.indexOf(str.rank) !== -1) {
                typeLen.rank = item.length;
            } else if (item.indexOf(str.name) !== -1) {
                typeLen.name = item.length;
            } else if (item.indexOf(str.usage) !== -1) {
                typeLen.usage = item.length;
            }
        });
    }
    var rankFormate = function (pokemons) {
        pokemons.forEach(function (item) {
            var pm = item.trim().split('|');
            pm = pm.slice(1, pm.length - 1);
            var id = pm[0];
            var name = pm[1];
            var usage = pm[2];
            rank[name] = {
                rank: id,
                usage: usage
            };
        });
    }
    headFormate(head);
    rankFormate(pokemons);
    return rank;
};

var generateFile = function (root, dist, fileName, con) {
    var log = fs.readFileSync(root + fileName, 'utf-8');
    var logs = log.split('\n');
    var title = logs.slice(0, 5);
    //fileName = fileName.replace(/json$/, 'txt');
    for (var i = 0; i < title.length; i++) {
        title[i] = title[i] + '\r\n';
        console.log(title[i]);
    }
    fs.writeFileSync(root + fileName, title,'utf-8');
    var pokemons = logs.splice(0, 5);
    for (var k in con) {
        var pok = logs.shift() + con[k].rankChange + '\r\n';
        fs.appendFileSync(root + fileName, pok, 'utf-8');
    }
    if (logs) {
        fs.appendFileSync(root + fileName, logs, 'utf-8');
    }
};

var ubgenerateFile = function (root, fileName, con) {
    var log = fs.readFileSync(root + fileName, 'utf-8');
    var logs = log.split('\n');
    var title = logs.slice(0, 5);
    for (var i = 0; i < title.length; i++) {
        title[i] = title[i] + '\r\n';
        console.log(title[i]);
    }
    fs.writeFileSync(root + 'file.txt', title,'utf-8');
    var pokemons = logs.splice(0, 5);
    for (var k in con) {
        var pok = logs.shift() + con[k].rankChange + ' ' + con[k].change + '\r\n';
        fs.appendFileSync(root + 'file.txt', pok, 'utf-8');
    }
    if (logs) {
        fs.appendFileSync(root + 'file.txt', logs, 'utf-8');
    }
};

var rankFormate = function (rankA, rankB) {
    for (var k in rankB) {
        var change;
        var rankChange;
        if (rankA[k]) {
            change = parseFloat(rankB[k].usage, 10) - parseFloat(rankA[k].usage, 10) + '%';
            rankChange = parseInt(rankA[k].rank, 10) - parseInt(rankB[k].rank, 10);

        } else {
            change = parseFloat(rankB[k].usage, 10) + '%';
            rankChange = parseInt(rankB[k].rank, 10);
        }
        rankB[k].change = change;
        rankB[k].rankChange = rankChange;
    }
    return rankB;
};

var ubFormate = function (rankA, rankB, rankC) {
    for (var k in rankB) {
        var change;
        var rankChange;
        if (rankA[k]) {
            change = parseFloat(rankB[k].usage, 10) + parseFloat(rankA[k].usage, 10) + '%';
            rankChange = parseInt(rankA[k].rank, 10) + parseInt(rankB[k].rank, 10);

        } else {
            change = parseFloat(rankB[k].usage, 10) + '%';
            rankChange = parseInt(rankB[k].rank, 10);
        }
        if (rankC[k]) {
            change = parseFloat(change, 10) + parseFloat(rankC[k].usage, 10) + '%';
            rankChange = parseInt(rankC[k].rank, 10) + parseInt(rankChange, 10);

        } else {
            change = parseFloat(change, 10) + '%';
            rankChange = parseInt(rankChange, 10);
        }
        rankB[k].change = change;
        rankB[k].rankChange = rankChange;
    }
    return rankB;
};

var uber = function () {
    var month = 'http://www.smogon.com/stats/2016-09/ubers-1630.txt';
    var secmonth = 'http://www.smogon.com/stats/2016-08/ubers-1630.txt';
    var thimonth = 'http://www.smogon.com/stats/2016-07/ubers-1630.txt';
    var rankA = '';
    var rankB = '';
    var rankC = '';
    var files;
    Promise.all([download(month, root, 'uber01.txt'), download(secmonth, root, 'uber02.txt'), download(thimonth, root, 'uber03.txt')])
        .then(function () {
            console.log('all over');
            //logFormate(root, '01.txt');
            rankA = logFormate(root, 'uber01.txt');
            rankB = logFormate(root, 'uber02.txt');
            rankC = logFormate(root, 'uber03.txt');
        })
        .then (function () {
            files = ubFormate(rankA, rankB, rankC);
            ubgenerateFile(root, 'uber01.txt', files);
            fs.writeFileSync(root + '1.txt', JSON.stringify(files), 'utf-8');
        })
        .error(function (e) {
            console.error('an error happened:' + e.message);
        });

};

var main = function (type, rank, classRange, time, fileRoot, name) {
    var config = require('../lib/config.json').select;
    var enumType = util.arrToObject(config.type, 'label', 'tag');
    var enumRank = util.arrToObject(config.rank, 'label', 'tag');
    var enumClass = util.arrToObject(config.class, 'label', 'tag');
    var fileName = classRange + '-' + rank + '.txt';
    var month = time + '-' + classRange + '-' + rank + '-' + type + '.txt';
    var lastmonth = util.lasteMonth(time) + '-' + classRange + '-' + rank + '-' + type + '.txt';
    var dist = fileRoot + '/dist/';
    var source = fileRoot + '/source/';
    var txt = fileRoot + '/txt/';
    var rankA = '';
    var rankB = '';
    var files;
    var downloadArr = [];
    var rankTag = {
        time: time,
        classRange: classRange,
        scope: rank,
        type: type
    };
    if (!fs.existsSync(dist + month)) {
        downloadArr.push(download(smogonRoot + '/' + time + '/' + enumType[type] + enumClass[classRange] + '-' + enumRank[rank][classRange] + '.txt', dist, month));
    }
    if (!fs.existsSync(dist + lastmonth)) {
        downloadArr.push(download(smogonRoot + '/' + util.lasteMonth(time) + '/' + enumType[type] + enumClass[classRange] + '-' + enumRank[rank][classRange] + '.txt', dist, lastmonth));
    }
    Promise.all(downloadArr)
        .then(function () {
            console.log('all over');
            rankA = logFormate(dist, lastmonth);
            rankB = logFormate(dist, month);
        }, function () {
            console.log('download file');
        })
        .then (function () {
            // files json 对象
            files = rankFormate(rankA, rankB);
            //dataInit(files, rankTag);
            generateFile(dist, txt, month, files);
            fs.writeFileSync(source + name, JSON.stringify(files), 'utf-8');
        })
        .error(function (e) {
            console.error('an error happened:' + e.message);
        });

};

module.exports = main;
