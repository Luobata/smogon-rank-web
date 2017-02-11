var router = require('koa-router')();
var config = require('../lib/config.json');

router.get('/123', function *(next) {
    this.status = 200;
    this.body = {"Welcome": "Hello1"};
});

router.get('/rank', function *(next) {
    this.status = 200;
    this.body = require('../controller/rank');
});
router.redirect('/a', '/rank.html');
router.get('/condition', function *(next) {
    this.status = 200;
    this.body = require('../controller/condition');
});
router.get('/getData/:type/:rank/:classRange/:time/:update', function *(next) {
    this.status = 200;
    var args = this.params;
    this.body = require('../controller/getData')(args.type, args.rank, args.classRange, args.time);
    if (this.body.error) yield next;
}, function *(next) {
    var args = this.params;
    if (args.update === 'true') {
        require('../controller/spiderFile')(args.type, args.rank, args.classRange, args.time);
    }
});


module.exports = router;
