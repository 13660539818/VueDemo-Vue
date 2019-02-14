<template>
  <div class="goods-list">
    <!-- 在网页中有两种跳转方式 -->
    <!-- 方式1：使用a标签的形式叫做标签跳转 -->
    <!-- <router-link class="goods-item" v-for="item in goodslist" :key="item.id" :to="'/home/goodsinfo/:' + item.id" >
            <img :src="item.img_url" alt="">
            <h1 class="title">{{item.title}}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{item.sell_price}}</span>
                    <span class="old">￥{{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{item.stock_quantity}}件</span>
                </p>
            </div>
        </router-link> -->

    <!-- 方式2：使用window.location.href的形式，叫做编程式跳转 -->
    <div class="goods-item" v-for="item in goodslist" :key="item.id" @click="goDetail(item.id)">
      <img :src="item.img_url" alt="">
      <h1 class="title">{{item.title}}</h1>
      <div class="info">
        <p class="price">
          <span class="now">￥{{item.sell_price}}</span>
          <span class="old">￥{{item.market_price}}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩{{item.stock_quantity}}件</span>
        </p>
      </div>
      </router-link>
      <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      pageIndex: 1,
      goodslist: []
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      this.$http.get("" + this.pageIndex).then(resullt => {
        if (result.body.status === 0) {
          // this.goodslist = resullt.body.message;
          this.goodslist = this.goodslist.concat(resullt.body.message);
        } else {
          Toast("获取数据失败");
        }
      });
    },
    getMore() {
      this.pageIndex++;
      this.getGoodsList();
    },
    goDetail(id) {
      // 使用js的形式进行路由导航
      // 区分$route和$router这两个对象
      // 1.最简单的
      // this.$router.push("/home/godsinfo/" + id);
      // 2.传递对象
      // this.$router.push({path:'/home/goodslist/' + id});
      // 3.传递命名路由
      this.$router.push({name: 'goodsinfo', params: {id}});
    }
  }
};
</script>

<style lang="scss" scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  padding: 8px;
  justify-content: space-between;
  .goods-item {
    width: 49%;
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #ccc;
    margin: 3px 0;
    padding: 2px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 293px;
    img {
      width: 100%;
    }
    .title {
      font-size: 14px;
    }
    .info {
      background-color: #eee;
      p {
        margin: 0;
        padding: 5px;
      }
      .price {
        .now {
          color: #f00;
          font-weight: bold;
          font-size: 16px;
        }
        .old {
          text-decoration: line-through;
          font-size: 12px;
          margin-left: 10px;
        }
      }
      .sell {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
      }
    }
  }
}
</style>


