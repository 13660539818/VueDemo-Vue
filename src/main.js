import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import moment from 'moment';
// 定义全局过滤器
Vue.filter('dataFormat', function(dataStr, pattern = 'YYYY-MM-DD hh:mm:ss') {
    return moment(dataStr).format(pattern);
})

import vueResource from 'vue-resource';
Vue.use(vueResource);
Vue.http.options.root = '';


// 导入mui
import './lib/mui/css/mui.css';
import './lib/mui/css/icons-extra.css';
import './lib/mui/fonts/mui-icons-extra.ttf';

// 导入mint-ui
import { Header, Swipe, SwipeItem, Button, Toast } from 'mint-ui';
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);

import router from './router';

import app from './App.vue';

var vm = new Vue({
    el: '#app',
    render: c => c(app),
    router
});