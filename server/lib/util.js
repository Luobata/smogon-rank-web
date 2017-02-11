var util = {
    arrToObject: function (arr, keyName, valName) {
        var obj = {};
        arr.forEach(function (item, i) {
            if (item instanceof Object && item.hasOwnProperty(keyName) && item.hasOwnProperty(keyName)) {
                obj[item[keyName]] = item[valName];
            }
        });
        return obj;
    },
    lasteMonth: function (time) {
        var date = time.split('-');
        var year = date[0];
        var month = date[1];
        if (parseInt(month, 1) > 0) {
            return year + '-0' + (parseInt(month, 10) -1);
        } else {
            return (parseInt(year, 10) - 1) + '-12';
        }
    }
};

module.exports = util;
