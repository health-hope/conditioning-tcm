<template>
    <div class="xwDetail">
        <div class="detail">
            <div class="img">
                <img :src="detailData.imageUrl">
                <div class="border vux-1px"></div>
            </div>
            <div class="ctn">
                <LayBg/>
                <BaseTitle :img="'ic_acupoint_meridian.png'" :title="'所属经络'"/>
                <div class="item1 vux-1px" v-for="(item, i) in detailData.meridian" :key="`meridian${i}`">{{ item }}</div>
                <BaseTitle :img="'ic_acupoint_position.png'" :title="'取穴位置'"/>
                <div class="item1 vux-1px" v-for="(item, i) in detailData.location" :key="`location${i}`">{{ item }}</div>
                <BaseTitle :img="'ic_acupoint_illness.png'" :title="'主调病症'"/>
                <BorderBox :list="detailData.referSymptom"/>
            </div>
        </div>
    </div>
</template>
<script>
    import BaseTitle from '@/components/operation/BaseTitle.vue'
    import LayBg from '@/components/common/LayBg';
    import BorderBox from '@/components/operation/BorderBox.vue'
    import { apiAcupointDetail } from '@/service/api'
    export default {
        data() {
            return {
                acupointName: '',
                detailData: {}
            }
        },
        components: {
            BaseTitle,
            LayBg,
            BorderBox
        },
        created() {
            this.acupointName = this.$route.query.name
            this.getAcupointDetail()
        },
        methods: {
            async getAcupointDetail() {
                const data = await apiAcupointDetail(this.acupointName)
                this.detailData = data
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "@/assets/style/mixin.scss";
    .xwDetail {
        min-height: 100%;
        padding: 0.8rem /* 32/40 */ 0.75rem /* 30/40 */ 1.7rem /* 68/40 */;
        box-sizing: border-box;
        @include box_shodow1(0 0.3rem /* 12/40 */ 1rem /* 40/40 */ 0);
        border-radius: 0.2rem /* 8/40 */;
        overflow: hidden;
        @include bg_color1();
        .detail {
            @include box_shodow1(0 .3rem /* 12/40 */ 1rem /* 40/40 */ 0);
            border-radius: 0.2rem;
            overflow: hidden;
            .img {
                font-size: 0;
                position: relative;
                img {
                    width: 100%;
                    height: 9rem /* 360/40 */;
                    border-radius: 0.2rem 0.2rem 0 0;
                }
                .border {
                    position: absolute;
                    top: .25rem /* 10/40 */;
                    left: .25rem /* 10/40 */;
                    right: .25rem /* 10/40 */;
                    bottom:.25rem /* 10/40 */;
                    &::before {
                        border-color: rgba(255,255,255,0.50);
                    }
                }
            }
            .ctn {
                background: #fff;
                position: relative;
                padding: 1.4rem /* 56/40 */ 1.05rem /* 42/40 */ .8rem;
                box-sizing: border-box;
                .item1 {
                    line-height: 1.05rem /* 42/40 */;
                    padding: .8rem /* 32/40 */ .65rem /* 26/40 */;
                    box-sizing: border-box;
                    font-size: .75rem /* 30/40 */;
                    color: #666666;
                    display: flex;
                    align-items: center;
                    margin-bottom: 1.4rem /* 56/40 */;
                    &::before {
                        @include border_color3();
                    }
                }
            }
        }
    }
</style>
