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
router
.get('/getData/:type/:rank/:classRange/:time/:pageNum', function *(next) {
    this.status = 200;
    var args = this.params;
    this.body = require('../controller/getData')(args.type, args.rank, args.classRange, args.time, args.pageNum);
    if (this.body.error) {
        require('../controller/spiderFile')(args.type, args.rank, args.classRange, args.time);
    }
        //require('../controller/spiderFile')(args.type, args.rank, args.classRange, args.time);
})

router.get(/^\/data(?:\/|abc$)/, function *(next) {
    this.status = 200;
    this.body = {};
    console.log(this.params);
});

router.get('/dataInit', function *(next) {
    this.status = 200;
    this.body = require('../controller/dataInit');
});


module.exports = router;
