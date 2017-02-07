var router = require('koa-router')();

router.get('/123', function *(next) {
    this.status = 200;
    this.body = {"Welcome": "Hello1"};
});

router.get('/rank', function *(next) {
    this.status = 200;
    this.body = require('../controller/rank');
});


module.exports = router;
