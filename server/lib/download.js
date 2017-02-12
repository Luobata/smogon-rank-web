var Promise = require('bluebird');
var url = require('url');
var fs = require('fs');
var http = require('http');

var download = function (downloadUrl, filePath, name) {
    return new Promise (function (resolve) {
        var options = {
            host: url.parse(downloadUrl).hostname,
            port: url.parse(downloadUrl).port || 80,
            path: url.parse(downloadUrl).pathname
        };

        var fileName = url.parse(downloadUrl).pathname.split('/').pop();
        //var file = fs.createWriteStream(filePath + name);
        var file = fs.writeFileSync(filePath + name);
        console.log(filePath + name);

        http.get(options, function(res) {
            res.on('data', function(data) {
                fs.appendFileSync(filePath + name, data, 'utf-8');
                //file.write(data, 'utf-8')
            });
            res.on('end', function() {
                //file.end();
                resolve(res.statusCode);
                console.log('downloaded');
            });
        });
    });
};

module.exports = download;
