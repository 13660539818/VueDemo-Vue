<template>
  <div>
    <!-- <h3>HomeContainer</h3> -->
    <swiper :lunbolist="lunbolist" :isfull="true"></swiper>
    <!-- 六宫格 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/newslist">
          <img src="../../img/menu1.png" alt="">
          <div class="mui-media-body">新闻资讯</div>
        </router-link></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/photolist">
          <img src="../../img/menu2.png" alt="">
          <div class="mui-media-body">图片分享</div>
        </router-link></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/goodslist">
          <img src="../../img/menu3.png" alt="">
          <div class="mui-media-body">商品购买</div>
        </router-link></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
          <img src="../../img/menu4.png" alt="">
          <div class="mui-media-body">留言反馈</div>
        </a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
          <img src="../../img/menu5.png" alt="">
          <div class="mui-media-body">视频专区</div>
        </a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
          <img src="../../img/menu6.png" alt="">
          <div class="mui-media-body">联系我们</div>
        </a></li>
    </ul>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
import swiper from '../subcomponents/Swiper.vue';
export default {
  data() {
    return {
      lunboList: [] //保存轮播图的数组
    };
  },
  created() {
    this.getLunbo();
  },
  methods: {
    getLunbo() {
      // 获取轮播图数据
      this.$http.get("").then(result => {
        // console.log(result.body);
        if (result.body.status === 0) {
          this.lunboList = result.body.message;
        } else {
          Toast("轮播图加载失败");
        }
      });
    }
  },
  components: {
    swiper
  }
}
</script>

<style lang='scss' scoped>

.mui-grid-view.mui-grid-9 {
    background-color: #fff;
    border: none;
    img {
        width: 60px;
        height: 60px;
    }
    .mui-media-body {
        font-size: 12px;
    }
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell {
    border: 0;
}
</style>
