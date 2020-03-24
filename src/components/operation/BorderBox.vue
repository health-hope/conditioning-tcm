<template>
    <div class="borderBox-con">
        <div class="borderBox-c" v-for="(item, i) in list" :key="`list${i}`">
            <div class="borderBox">{{ item }}</div>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            list: {
                type: Array
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "@/assets/style/mixin.scss";
    .borderBox-con {
        display: flex;
        flex-wrap: wrap;
        margin-top: 0.6rem;
        .borderBox-c {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 0.6rem;
            margin-right: 0.5rem; /* 20/40 */
            .borderBox {
                padding: 0 0.65rem;
                margin: 0 0.07rem;
                height: 1.25rem;
                display: flex;
                flex: 1;
                justify-content: center;
                align-items: center;
                font-size: 0.8rem;
                @include font_color1();
                @include border3(.075rem /* 3/40 */ solid);
                font-weight: bold;
                @include _box_shodow(0 0 0 .05rem /* 2/40 */ #fff, 0 0 0 .075rem /* 3/40 */);
            }
        }
    }
</style>
