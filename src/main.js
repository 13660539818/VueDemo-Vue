import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import vueResource from 'vue-resource';
Vue.use(vueResource);


// 导入mui
import './lib/mui/css/mui.css';
import './lib/mui/css/icons-extra.css';
import './lib/mui/fonts/mui-icons-extra.ttf';

// 导入mint-ui
import { Header, Swipe, SwipeItem } from 'mint-ui';
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

import router from './router';

import app from './App.vue';

var vm = new Vue({
    el: '#app',
    render: c => c(app),
    router
});