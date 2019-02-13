import Vue from 'vue';
import app from './App.vue';

// 导入mui
import './lib/mui/css/mui.css';

// 导入mint-ui
import { Header } from 'mint-ui';
Vue.component(Header.name, Header);

var vm = new Vue({
    el: '#app',
    render: c => c(app)
});