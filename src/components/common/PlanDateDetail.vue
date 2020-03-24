<template>
    <div class="planDateDetail" style="">
        <img :src="img | PUBLIC_PATH">
        <span>{{ title }}</span>
    </div>
</template>
<script>
export default {
    props: {
        title: {
            type: String,
            default: ''
        },
        img: {
            type: String,
            default: ''
        }
    }
}
</script>
<style lang="scss" scoped>
.planDateDetail {
    width: 100%;
    height: 4rem /* 160/40 */;
    box-shadow: 0 .15rem /* 6/40 */ .5rem /* 20/40 */ 0 rgba(185,198,135,0.20);
    border-radius: .1rem /* 4/40 */;
    padding-left: .4rem /* 16/40 */;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    img {
        width: 1.3rem /* 52/40 */;
        height: 1.3rem /* 52/40 */;
        margin-right: .2rem /* 8/40 */;
        margin-top: -.1rem;
    }
    span {
        font-size: .85rem /* 34/40 */;
        color: #333333;
        font-weight: bold;
    }
}
</style>
