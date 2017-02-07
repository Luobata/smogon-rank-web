var vue = require('vue');
vue.config.devtools = true;

var vueResource = require('vue-resource');
vue.use(vueResource);

var app = require('./app.vue');
