<template>
  <div class="goodsinfo-cantainer">
      <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
          <div class="ball" v-show="ballFlag"></div>
      </transition>
    <!-- 商品轮播图区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper :lunbolist="lunbotu" :isfull="false"></swiper>
        </div>
      </div>
    </div>

    <!-- 商品购买区域 -->
    <div class="mui-card">
      <div class="mui-card-header">{{goodsinfo.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
              市场价： <del>{{goodsinfo.market_price}}</del>&nbsp;&nbsp;销售价：<span class="now_price">{{goodsinfo.sell_price}}</span>
          </p>ge
          <p>购买数量：<numbox @getCount="getSelectedCount" :max="goodsinfo.stock_quantity"></numbox></p>
          <p>
              <mt-button type="primary" size="small">立即购买</mt-button>
              <mt-button type="danger" size="small" @click="addToShopCart">加入购物车</mt-button>
          </p>
        </div>
      </div>
    </div>

    <!-- 商品参数区域 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{goodsinfo.goods_no}}</p>
          <p>库存情况：{{goodsinfo.stock_quantity}}</p>
          <p>上架时间：{{goodsinfo.add_time}}</p>
        </div>
      </div>
      <div class="mui-card-footer">
          <mt-button type="primary" size="large" plain @click="doDesc(id)">图文介绍</mt-button>
          <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import {Toast} from 'mint-ui';
import swiper from '../subcomponents/Swiper.vue';
import numbox from '../subcomponents/Goodsinfo_numberbox.vue';
export default {
  data() {
    return {
      id: this.$route.params.id,
      lunbotu: '',
      goodsinfo: [],
      ballFlag: flase,
      selectedCount: 1 //用户选中的商品数量
    };
  },
  created() {
      this.getLunbotu();
      this.getGoodsInfo();
  },
  methods: {
    getLunbotu() {
      this.$http.get('').then(result => {
        if(result.body.status === 0) {
            //   循环轮播图数组的每一项，为item添加img属性
            result.body.message.forEach(item => {
                item.img = item.src;
            });
            this.lunbotu = result.body.message;
          } else {
            Toast('获取数据失败');
        }
      });
    },
    getGoodsInfo() {
        this.$http.get(''+ this.id).then(result => {
            if(result.body.status === 0) {
                this.goodsinfo = result.body.message[0];
            } else {
                Toast('获取数据失败');
            }
        })
    },
    goDesc(id) {
        this.$router.push({name: "goodsdesc", params: {id}});
    },
    goComment(id) {
        this.$router.push({name: "goodcomment", params: {id}});
    },
    addToShopCart() {
        this.ballFlag = !this.ballFlag;
    },
    beforeEnter(el) {
        el.style.transform = "translate(0, 0)";
    },
    enter(el, done) {
        // 获取小球的位置
        // getBoundingClientRect()返回一个矩形对象，包括left、right、top、bottom属性
        const ballPosition = this.$refs.ball.getBoundingClientRect();
        const badgePosition = document.getElementById("badge").getBoundingClientRect();
        const xDist = badgePosition.left - ballPosition.left;
        const yDist = badgePosition.top - ballPosition.top;

        el.offsetWidth;
        el.style.transform = `translate(${xDist}px, ${yDist}px)`;
        el.style.transition = "all 0.5s cublic-bezier(0.4,-0.3,1, 0.68)";
        done();
    },
    afterEnter(el) {
        this.ballFlag = !this.ballFlag;
    },
    getSelectedCount(count) {
        // 当子组件把选中的数量传递给父组件时，把选中的值保存到data上
        this.selectedCount = count;
    }
  },
  components: {
      swiper,
      numbox
  }
}
</script>

<style lang="scss" scoped>
.goodsinfo-cantainer {
  background-color: #eee;
  overflow: hidden;
  .now_price {
      color: #f00;
      font-size: 16px;
      font-weight: bold;
  }
  .mui-card-footer {
      display: block;
      button {
          margin: 15px 0;
      }
  }
  .ball {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: #f00;
      position: absolute;
      z-index: 99;
      top: 390px;
      left: 146px;
  }
}
</style>


