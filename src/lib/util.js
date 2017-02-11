var util = {
    formatData: function (data) {
        // data的属性可能是obj
        var str = '';
        for (var k in data) {
            if (typeof data[k] === 'object') {
                str += '&' + k + '=' + this.formate(data[k]);
            } else {
                str += '&' + k + '=' + data[k];
            }
        }
        str = str.substr(1);
        return str;
    }
};

module.exports = util;
