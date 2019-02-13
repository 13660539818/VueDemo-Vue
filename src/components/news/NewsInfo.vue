<template>
    <div class="newsinfo-container">
        <!-- 标题 -->
        <h3 class="title">{{newsinfo.title}}</h3>
        <p class="subtitle">
            <span>发表时间：{{newsinfo.add_time | dataFormat}}</span>
            <span>点击：{{newsinfo.click}}次</span>
        </p>
        <hr>
        <!-- 内容 -->
        <div class="content" v-html="newsinfo.content"></div>
        <!-- 评论 -->
        <comment-box :id="this.id"></comment-box>
    </div>
</template>

<script>
import {Toast} from 'mint-ui';
import comment from '../subcomponents/Comment';

export default {
    data() {
        return {
            id: $route.params.id,
            newsinfo: []
        }
    },
    created() {
        this.getNewsInfo();
    },
    methods: {
        getNewsInfo() {
            this.$http.get('' + this.id).then(result => {
                if(result.body.status === 0) {
                    this.newsinfo = result.body.message;
                } else {
                    Toast('获取数据失败');
                }
            });
        }
    },
    components: {
        'comment-box': comment
    }
}
</script>

<style lang="scss">
.newsinfo-container {
    padding: 0 4px;

    .title {
        font-size: 16px;
        text-align: center;
        margin: 15px 0;
        color: #f00;
    }
    .subtitle {
        font-size: 12px;
        color: #226adf;
        display: flex;
        justify-content: space-between;
    }
    .content {
        img {
            width: 100%;
        }
    }
}
</style>


