var assert = require('assert');

module.exports = {
    updateOne: function (collection, item) {
        return new Promise(function (resolve, reject) {
            collection.updateOne(item.filter, item.update, function (err) {
                assets.equal(null, err);
                resolve();
            });
        });
    }
};
