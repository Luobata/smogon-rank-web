/**
 * @description 创建mongo数据库
 * @author luobata
 * @time 2017年2月19日19:39:37
 */
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var Promise = require('bluebird');
var curd = require('./curd');

var findDocuments = function (db, arr, callback) {
    if (!arr || !arr.length) {
        callback();
        return;
    }

    var collection = db.collection('rank');
    var insertArr = [];
    var updateArr = [];
    var findArr = [];
    var findOne = function (item) {
        return new Promise(function (resolve) {
            collection.findOne({name: item.name}, function (err, doc) {
                assert.equal(null, err);
                if (doc !== null) {
                    // TODO push 先判断是否存在
                    doc.rank.push(item.rank[0]);
                    // update
                    updateArr.push({
                        filter: {
                            name: item.name
                        },
                        update: {
                            $set: {
                                rank: doc.rank
                            }
                        }
                    });
                } else {
                    // insert
                    insertArr.push(item);
                }
                resolve();
            });
        });
    };
    arr.forEach(function (item) {
        findArr.push(findOne(item));
    });
    Promise
        .all(findArr)
        .then(function () {
            console.log('insert begin');
            return insertDocuments(db, insertArr);
        })
        .then(function () {
            console.log('update begin');
            return updateDocuments(db, updateArr);
        })
        .then(function () {
            console.log('data end');
        })
        .error(function (e) {
        });
};

var updateDocuments = function (db, arr) {
    return new Promise(function (resolve) {
        if (!arr || !arr.length) {
            resolve();
            return;
        }
        
        var collection = db.collection('rank');
        var updateArr = [];
        arr.forEach(function (item) {
            updateArr.push(curd.updateOne(collection, item));
        });

        Promise
            .all(updateArr)
            .then(function () {
                resolve();
            })
            .error(function (e) {
            });
    });
};

var insertDocuments = function (db, arr) {
    return new Promise(function (resolve) {
        if (!arr || !arr.length) {
            resolve();
            return;
        }
        var collection = db.collection('rank');

        collection.insertMany(arr, function(err, result) {
            assert.equal(err, null);
            resolve(result);
        });
    });
};

module.exports = function (data, rankTag) {
    var url = 'mongodb://localhost:27017/test';
    var arr = require('./dataFormat')(data, rankTag);
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");
        findDocuments(db, arr, function () {
            db.close();
        });
    });
};
