var temp = require('./pokemon.json');

module.exports = function (data, month, type) {
    var arr = [];
    var i;
    var j;
    var key;
    
    for (i in data) {
        key = JSON.parse(JSON.stringify(temp));
        key['name'] = i.trim();
        key['rank'] = [{
            type: type,
            month: month,
            rank: data[i].rank,
            usage: data[i].usage
        }]
        arr.push(key);
    }

    return arr;
};
