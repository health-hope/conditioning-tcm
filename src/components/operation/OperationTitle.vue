<template>
    <div class="operationTit">
        <div class="tit">{{ title }}</div>
        <div class="time">
            <img :src="'ic_details_time.png' | PUBLIC_PATH">
            <span>{{ time }}</span>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        title: {
            type: String,
            default: ''
        },
        time: {
            type: String,
            default: ''
        },
    }
}
</script>
<style lang="scss" scoped>
 @import "@/assets/style/mixin.scss";
.operationTit {
    width: 100%;
    height: 5.5rem /* 220/40 */;
    border-radius: .2rem /* 8/40 */ .2rem /* 8/40 */ 0 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    .tit {
        font-size: 1.05rem /* 42/40 */;
        color: #333333;
        line-height: 1.475rem /* 59/40 */;
        margin-bottom: .3rem /* 12/40 */;
        font-weight: bold;
    }
    .time {
        height: .925rem /* 37/40 */;
        display: flex;
        align-items: center;
        img {
            width: .9rem /* 36/40 */;
            height: .9rem /* 36/40 */;
        }
        span {
            font-size: .65rem /* 26/40 */;
            color: rgba(51,51,51,0.50);
            font-weight: bold;
            line-height: 0;
            margin-left: .325rem /* 13/40 */;
        }
    }
}
</style>


