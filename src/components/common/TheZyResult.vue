<template>
    <div class="result-temp">
        <div class="pt-top-desc" :style="{ backgroundImage: `url(${ tempData.imageUrl })`}">
            <div class="sub">{{tempData.resultDesc}}</div>
            <div class="siyuan">{{ tempData.resultName }}</div>
        </div>
        <div class="condition-desciption">
            <LayBg/>
            <div class="content">{{tempData.nurseRemark}}</div>
        </div>
    </div>
</template>

<script>
import LayBg from "@/components/common/LayBg";
export default {
    props: {
        tempData: {
            type: Object,
            default: {},
        }
    },
    data(){
        return{
        }
    },
    mounted() {
    },
    components: {
        LayBg,
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/style/mixin.scss";
.result-temp {
    @include box_shodow1(0 .3rem /* 12/40 */ 1rem /* 40/40 */ 0);
    border-radius: 0.2rem;
    overflow: hidden;
    .pt-top-desc {
        height: 5.5rem;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 100% 100%;
        padding: 1rem /* 40/40 */ 1.05rem /* 42/40 */;
        box-sizing: border-box;
        .sub {
            font-size: 0.7rem;
            line-height: 1rem /* 40/40 */;
            margin-bottom: .3rem /* 12/40 */;
            @include font_color9();
            opacity: 0.6;
        }
        .siyuan {
            font-size: 1.6rem /* 64/40 */;
            @include font_color1();
            line-height: 1.8rem /* 72/40 */;
            font-family: "SourceHanSerifCN-Bold";
        }
    }
    .condition-desciption {
        position: relative;
        @include bg_color6();
        .content {
            padding: 1.4rem /* 56/40 */ 1.05rem;
            font-size: 0.75rem;
            text-align: justify;
            @include font_color8();
            line-height: 1.05rem;
        }
    }
}
</style>