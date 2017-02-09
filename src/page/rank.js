var vue = require('vue');
vue.config.devtools = true;

var vueResource = require('vue-resource');
vue.use(vueResource);

// element
var element = require('element-ui');
require('element-ui/lib/theme-default/index.css');
vue.use(element);

var app = require('../components/app.vue');

// global
require('../lib/reset.v3.1.1.css');

new vue({
    el: '#rank',
    render: function (fn) {
        return fn(app);
    }
});

// hide loading
window.document.getElementById('loading').style.display = 'none';
