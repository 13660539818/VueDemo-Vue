<template>
    <div class="photoinfo-container">
        <h3>{{photoinfo.title}}</h3>
        <p class="subtitle">
            <span>发表时间:{{photoinfo.add_time | dataFormat}}</span>
            <span>点击：{{photoinfo.click}}次</span>
        </p>
        <hr>
        <!-- 缩略图 -->
        
        <!-- 图片内容 -->
        <div class="content" v-html="photoinfo.content"></div>
        <!-- 评论子组件 -->
        <cmt-box :id="id"></cmt-box>
    </div>
</template>

<script>
import {Toast} from 'mint-ui';
import comment from '../components/subcomponents/Comment.vue'
export default {
    data() {
        return {
            id: this.$route.params.id,
            photoinfo: []
        }
    },
    created() {
        this.getPhotoInfo();
    },
    methods: {
        getPhotoInfo() {
            this.$http.get('' + this.id).then(result => {
                if(result.body.status === 0) {
                    this.photoinfo = result.body.message;
                } else {
                    Toast('获取数据失败');
                }
            });
        }
    },
    components: {
        'cmt-box': comment
    }
}
</script>

<style lang="scss" scoped>
.photoinfo-container {
    padding: 3px;
    h3 {
        color: #26a2ff;
        font-size: 14px;
        text-align: center;
        margin: 15px 0;
    }
    .subtitle {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
    }
    .content {
        font-size: 12px;
        line-height: 30px;
    }
}
</style>


