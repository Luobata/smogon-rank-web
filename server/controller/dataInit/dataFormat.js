var temp = require('./pokemon.json');

module.exports = function (data, rankTag) {
    var arr = [];
    var i;
    var j;
    var key;
    
    for (i in data) {
        key = JSON.parse(JSON.stringify(temp));
        key['name'] = i.trim();
        key['rank'] = [{
            time: rankTag.time,
            class: rankTag.classRange,
            scope: rankTag.scope,
            type: rankTag.type,
            rank: data[i].rank,
            usage: data[i].usage,
            rankChange: data[i].rankChange,
            usageChange: data[i].change
        }]
        arr.push(key);
    }

    return arr;
};
