import VueRouter from 'vue-router';

import HomeCantainer from './components/tabbar/HomeContainer.vue';
import MemberContainer from './components/tabbar/MemberContainer.vue';
import ShopcartContainer from './components/tabbar/ShopcartContainer.vue';
import SearchContainer from './components/tabbar/SearchContainer.vue';
import NewsList from './components/news/NewsList.vue';
import NewsInfo from './components/news/NewsInfo.vue'

var router = new VueRouter({
    routes: [
        {
            path: '/',
            component: HomeCantainer
        },
        {
            path: '/home',
            component: HomeCantainer
        },
        {
            path: '/member',
            component: MemberContainer
        },
        {
            path: '/shopcart',
            component: SearchContainer
        },
        {
            path: '/search',
            component: ShopcartContainer
        },
        {
            path: '/home/newslist',
            component: NewsList
        },
        {
            path: '/home/newsinfo/:id',
            component: NewsInfo
        }
    ],
    linkActiveClass: 'mui-active' // 覆盖默认路由高亮类，默认为router-link-active
});

export default router;