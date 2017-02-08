var vue = require('vue');
vue.config.devtools = true;

var vueResource = require('vue-resource');
vue.use(vueResource);

var app = require('./app.vue');
require('../lib/reset.v3.1.1.css');

new vue({
    el: '#rank',
    render: function (fn) {
        return fn(app);
    }
});
