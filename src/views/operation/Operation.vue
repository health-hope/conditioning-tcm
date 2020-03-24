<template>
    <div class="operation" v-if="detailData.retCode">
        <div class="ctn1">
            <OperationTitle :style="{ backgroundImage: `url(${ detailData.bgImageUrl })`}" :title="detailData.methodName" :time="`约${detailData.timeLength}分钟`"/>
            <div class="oper-ctn">
                <LayBg/>
                <BaseTitle :img="'ic_details_description.png'" :title="'疗法说明'"/>
                <div
                    class="liaofaSM vux-1px"
                >{{ detailData.methodRemark }}</div>
                <BaseTitle :img="'ic_details_recommend_time.png'" :title="'推荐时间'"/>
                <div class="liaofaSM vux-1px">
                    <template v-for="(item, i) in detailData.suitTime">
                        <div class="time-1" v-if="item.content" :key="`item${i}`">
                            <div class="blod">{{ item.subTitle }}</div>
                            <div class="hui">{{ item.content }}</div>
                        </div>
                        <div v-else class="time-1 time-2" :key="`item1${i}`">{{ item.subTitle }}</div>
                    </template>
                </div>
                <div class="zhuibeiCL" v-if="detailData.needStuff && detailData.needStuff.remark.length">
                    <BaseTitle :img="'ic_details_material.png'" :title="'准备材料'"/>
                    <BorderBox :list="detailData.needStuff.stuff" />
                    <div class="remark" v-for="(item,i) in detailData.needStuff.remark" :key="`rem${i}`">注：{{ item }}</div>
                </div>
            </div>
        </div>
        <div class="ctn2" ref="czh">
            <BaseZyTempTitle style="marginTop: .8rem" bgClass="jgy_bg_1" :tempTitle="'操作步骤'"/>
            <div :class="toggleFlag?'caozuoBZH ctn111':'caozuoBZH'" :style="{paddingTop:detailData.operatingStep && detailData.operatingStep.methodDesc.length?'1.4rem':'0.5925rem'}">
                <LayBg/>
                <div class="cz-tip-c" v-if="detailData.operatingStep && detailData.operatingStep.methodDesc.length">
                    <ul class="cz-tip">
                        <li v-for="(item, i) in detailData.operatingStep.methodDesc" :key="`methodDesc${i}`">{{ item.subTitle }}：{{ item.content }}</li>
                    </ul>
                </div>
                <div class="xuewei-c">
                    <div class="list4-bto" v-for="(item, i) in detailData.operatingStep.acupointDesc" :key="`acupointDesc${i}`">
                        <div class="list4-count">
                            <img :src="item.subTitle">
                        </div>
                        <div class="list4-pto" :ref="`gif${i}`">
                            <img
                                :src="item.show?item.remark:item.imageUrl"
                            >
                        </div>
                        <div class="list4-bto-b">{{ item.content }}</div>
                    </div>
                </div>
                <div @click="toggle('item_4')" class="toggle tap_events">
                    <div class="toggle-c">
                        <img
                            :class="toggleFlag?'select':'select1'"
                            :src="'tlfa_icon_sq.png' | PUBLIC_PATH"
                        >
                        {{ toggleFlag?'收起':'展开' }}
                    </div>

                    <img class="show" :src="'fay_bg_zksq.png' | PUBLIC_PATH">
                </div>
            </div>
        </div>
        <div class="ctn3" v-if="detailData.handNurseDesc && detailData.handNurseDesc.length">
            <BaseZyTempTitle style="marginTop: .8rem" bgClass="jgy_bg_2" :tempTitle="tempTitle1"/>
            <div class="ctn3-c">
                <LayBg/>
                <div class="list4-pto">
                    <img :src="detailData.handNurseDesc[0].imageUrl">
                </div>
                <div class="list4-bto-b">{{ detailData.handNurseDesc[0].subTitle }}</div>
            </div>
        </div>
        <div class="ctn33" v-else>
            <BaseZyTempTitle style="marginTop: .8rem" bgClass="jgy_bg_2" :tempTitle="'穴位介绍'"/>
            <div class="ctn3-c-c">
                <LayBg/>
                <div class="ctn3-c" ref="xueweiRef">
                    <!-- <div class="ctn3-cc" ref="ctn3-cc"> -->
                        <div class="list4-pto-d tap_events" v-for="(item, i) in detailData.acupointDesc" :key="`acupointDesc${i}`" @click="xueweiClick(item.subTitle)">
                        <div class="list4-pto-c">
                            <div class="list4-pto">
                                <img :src="item.imageUrl">
                            </div>
                            <div class="list4-bto-b">{{ item.subTitle }}</div>
                        </div>
                    <!-- </div> -->
                    </div>
                </div>
            </div>
        </div>
        <div class="ctn4">
            <LayBg/>
            <div class="list3-bto" v-if="detailData.attentionMatters && detailData.attentionMatters.length">
                <div class="list3-bto-c">
                    <div class="list3-bto-tit">注意事项</div>
                    <p class="ctx" v-for="(item, i) in detailData.attentionMatters" :key="`attentionMatters${i}`">
                        <img class="icon1" :src="'tlfa_icon_zysx1.png' | PUBLIC_PATH">
                        {{ item }}
                    </p>
                </div>
            </div>
            <BaseTitle style="margin-left: .25rem" :img="'ic_details_taboo.png'" :title="'禁忌人群'"/>
            <div class="list3-bto-c11">
                <div class="list3-bto-c1">
                    <p class="ctx" v-for="(item, i) in detailData.tabooCrowd" :key="`tabooCrowd${i}`">
                        <img class="icon1" :src="'tlfa_icon_zysx1.png' | PUBLIC_PATH">
                        {{ item }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import OperationTitle from '@/components/operation/OperationTitle.vue'
    import BaseTitle from '@/components/operation/BaseTitle.vue'
    import BorderBox from '@/components/operation/BorderBox.vue'
    import BaseZyTempTitle from '@/components/common/BaseZyTempTitle';
    import LayBg from '@/components/common/LayBg';
    import { apiTherapyDetail } from '@/service/api'
    import { getUrlParam } from '@/assets/js/util.js'
    export default {
        data() {
            return {
                toggleFlag: false,
                methodId: '',
                detailData: {},
                tempTitle1: ''
            }
        },
        components: {
            OperationTitle,
            BaseTitle,
            LayBg,
            BorderBox,
            BaseZyTempTitle
        },
        activated() {
            let code = getUrlParam('code')
            switch (code) {
                case '1':
                    this.tempTitle1 = '手部心反射区'
                    break;
                case '2':
                    this.tempTitle1 = '手部肝反射区'
                    break;
                case '3':
                    this.tempTitle1 = '手部肺反射区'
                    break;
                case '4':
                    this.tempTitle1 = '手部脾反射区'
                    break;
                case '5':
                    this.tempTitle1 = '手部胃反射区'
                    break;
                case '6':
                    this.tempTitle1 = '手部肾反射区'
                    break;
                case '7':
                    this.tempTitle1 = '手部小肠反射区'
                    break;
                case '8':
                    this.tempTitle1 = '手部大肠反射区'
                    break;
                case '9':
                    this.tempTitle1 = '手部胆反射区'
                    break;
            }
            this.methodId = this.$route.query.methodId
            this.getTherapyDetail()
            this.$nextTick(function () {
                //监听滚动事件
                window.addEventListener('scroll', this.handleScroll)
            })
        },
        methods: {
            async getTherapyDetail() {
                const data = await apiTherapyDetail(this.methodId)
                console.log(data)
                this.detailData = data
                this.$nextTick(() => {
                    if(this.$refs.xueweiRef) {
                        let left = window.sessionStorage.getItem('xueweiLeft')
                        this.$refs.xueweiRef.scrollLeft = left
                    }
                })
            },
            // 展开收起
            toggle(val) {
                this.toggleFlag = !this.toggleFlag
                if (!this.toggleFlag) {
                    this.$nextTick(() => {
                        this.$refs.czh.scrollIntoView()
                    })
                }
            },
            // 点击穴位
            xueweiClick(val) {
                let xueweiLeft = this.$refs.xueweiRef.scrollLeft
                window.sessionStorage.setItem('xueweiLeft', xueweiLeft)
                this.$router.push({
                    path: '/detail',
                    query: {
                        name: val
                    }
                })
            },
            handleScroll() {
                //垂直滚动的值兼容问题
                let scrollTopE = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
                //屏幕的高度　　　　　
                let screenHeight = window.screen.availHeight
                let clientWidth = document.documentElement.clientWidth
                // 可播放区域
                let biliTop1 = clientWidth/(750/100)
                let biliTop2 = clientWidth/(750/900)
                //offsetTop 属性指定的父坐标的计算顶端位置 offsetHeight获取对象的高度
                this.detailData.operatingStep && this.detailData.operatingStep.acupointDesc.forEach((item, i) => {
                    let eleY = this.$refs[`gif${i}`][0].getBoundingClientRect().top
                    let eleH = this.$refs[`gif${i}`][0].getBoundingClientRect().height
                    if(eleY > biliTop1 && eleY < (biliTop2 - eleH) ) {
                        this.$set(this.detailData.operatingStep.acupointDesc[i], 'show', true)
                    }else {
                        this.$set(this.detailData.operatingStep.acupointDesc[i], 'show', false)
                    }
                })
            }
        },
        beforeDestroy() {
            window.removeEventListener('scroll', this.handleScroll)
        }
    }
</script>
<style lang="scss" scoped>
    @import "@/assets/style/mixin.scss";
    .operation {
        min-height: 100%;
        padding: 0.8rem /* 32/40 */ 0.75rem /* 30/40 */ 1.7rem /* 68/40 */;
        box-sizing: border-box;
        @include bg_color1();
        .ctn1 {
            @include box_shodow1(0 0.3rem /* 12/40 */ 1rem /* 40/40 */ 0);
            border-radius: 0.2rem /* 8/40 */;
            overflow: hidden;
            .oper-ctn {
                background: #fff;
                position: relative;
                padding: 1.4rem /* 56/40 */ 1.05rem /* 42/40 */;
                box-sizing: border-box;
                .liaofaSM {
                    font-size: 0.75rem /* 30/40 */;
                    line-height: 1.05rem /* 42/40 */;
                    color: #666666;
                    padding: 0.8rem /* 32/40 */ 0.65rem /* 26/40 */;
                    box-sizing: border-box;
                    margin-bottom: 1.4rem /* 56/40 */;
                    &::before {
                        @include border_color3();
                    }
                    .time-1 {
                        .blod {
                            font-size: 0.8rem /* 32/40 */;
                            line-height: 1.125rem /* 45/40 */;
                            @include font_color1();
                            font-weight: bold;
                            margin-bottom: 0.3rem /* 12/40 */;
                        }
                        & + .time-1 {
                            margin-top: 0.9rem /* 36/40 */;
                        }
                        .hui {
                            font-size: 0.7rem /* 28/40 */;
                            color: #999999;
                            line-height: 1rem /* 40/40 */;
                        }
                    }
                    .time-2 {
                        font-size: 0.8rem /* 32/40 */;
                        line-height: 1.125rem /* 45/40 */;
                        @include font_color1();
                        font-weight: bold;
                    }
                }
                .zhuibeiCL {
                    .remark {
                        opacity: 0.6;
                        font-size: 0.65rem /* 26/40 */;
                        @include font_color();
                    }
                }
            }
        }
        .ctn2 {
            @include box_shodow1(0 0.3rem /* 12/40 */ 1rem /* 40/40 */ 0);
            border-radius: 0.2rem /* 8/40 */;
            overflow: hidden;
            .caozuoBZH {
                position: relative;
                background: #fff;
                padding: 1.4rem /* 56/40 */ 0.8rem /* 32/40 */ 3.5rem;
                box-sizing: border-box;
                max-height: 17.725rem /* 709/40 */;
                overflow: hidden;
                .cz-tip-c {
                    width: 15.65rem /* 626/40 */;
                    @include bg_color9();
                    font-size: 0.75rem /* 30/40 */;
                    @include font_color1();
                    padding: 0.25rem /* 10/40 */;
                    box-sizing: border-box;
                    .cz-tip {
                        width: 15.15rem /* 606/40 */;
                        @include border2(1px solid);
                        padding: 0.55rem /* 22/40 */ 0.25rem /* 10/40 */;
                        box-sizing: border-box;
                        li {
                            line-height: 1.05rem /* 42/40 */;
                            font-weight: bold;
                        }
                        li + li {
                            margin-top: 0.6rem /* 24/40 */;
                        }
                    }
                }
                .xuewei-c {
                    padding: 0 0.25rem /* 10/40 */;
                    box-sizing: border-box;
                }
                .list4-bto {
                    width: 100%;
                    .list4-count {
                        text-align: center;
                        margin: 0.8075rem /* 32.3/40 */ auto 0.4075rem /* 16.3/40 */;
                        img {
                            width: 1.5rem /* 60/40 */;
                            height: 1.5rem /* 60/40 */;
                        }
                    }
                    .list4-pto {
                        width: 100%;
                        height: 8.5rem /* 340/40 */;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin-bottom: 0.6rem /* 24/40 */;
                        @include border2(1px solid);
                        box-sizing: border-box;
                        img {
                            width: 14.85rem /* 594/40 */;
                            height: 8.2rem /* 328/40 */;
                        }
                    }
                    .list4-bto-b {
                        font-size: 0.75rem /* 30/40 */;
                        color: #333333;
                        line-height: 1.1rem /* 44/40 */;
                        font-weight: bold;
                    }
                }
            }
            .ctn111 {
                transition: all 1s !important;
                overflow: auto !important;
                max-height: initial !important;
            }
            .toggle {
                height: 2.375rem;
                position: absolute;
                bottom: 0;
                left: 50%;
                width: 100%;
                z-index: 2;
                @include bg_color6();
                width: 15.5rem /* 600/40 */;
                transform: translateX(-50%);
                .toggle-c {
                    width: 100%;
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    z-index: 1;
                    height: 3.375rem /* 135/40 */;
                    overflow: hidden;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.65rem /* 26/40 */;
                    @include font_color10();
                }
                .show {
                    width: 100%;
                    height: 1rem;
                    position: absolute;
                    bottom: 2.3rem /* 135/40 */;
                    left: 0;
                }
            }
            .select {
                transform: translateY(-50%);
                width: 0.475rem /* 19/40 */;
                height: 0.425rem /* 17/40 */;
                margin-right: 0.3rem /* 12/40 */;
                margin-top: 0.5rem;
            }
            .select1 {
                margin-top: 0.4rem;
                width: 0.475rem /* 19/40 */;
                height: 0.425rem /* 17/40 */;
                margin-right: 0.3rem /* 12/40 */;
                transform: rotate(180deg);
                transform-origin: 50% 25%;
                transition: transform 0.2s ease-in;
            }
        }
        .ctn3 {
            @include box_shodow1(0 0.3rem /* 12/40 */ 1rem /* 40/40 */ 0);
            border-radius: 0.2rem /* 8/40 */;
            overflow: hidden;
            .ctn3-c {
                position: relative;
                background: #fff;
                padding: 1.4rem /* 56/40 */ 1.05rem /* 42/40 */;
                box-sizing: border-box;
                .list4-pto {
                    width: 100%;
                    height: 8.5rem /* 340/40 */;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 0.6rem /* 24/40 */;
                    @include border2(1px solid);
                    box-sizing: border-box;
                    img {
                        width: 14.85rem /* 594/40 */;
                        height: 8.2rem /* 328/40 */;
                    }
                }
                .list4-bto-b {
                    font-size: 0.75rem /* 30/40 */;
                    color: #333333;
                    line-height: 1.1rem /* 44/40 */;
                    font-weight: bold;
                }
            }
        }
        .ctn33 {
            @include box_shodow1(0 0.3rem /* 12/40 */ 1rem /* 40/40 */ 0);
            border-radius: 0.2rem /* 8/40 */;
            overflow: hidden;
            .ctn3-c-c {
                position: relative;
                background: #fff;
                .ctn3-c {
                    display: flex;
                    justify-content: space-between;
                    white-space: nowrap;
                    overflow-x: auto;
                    &::-webkit-scrollbar {
                        display: none;
                    }
                    .list4-pto-c {
                        height: 8.1rem /* 324/40 */;
                        padding: 0.3rem /* 12/40 */ 0.3rem /* 12/40 */ 0.8rem
                            /* 32/40 */ 0.3rem /* 12/40 */;
                        box-sizing: border-box;
                        background: #ffffff;
                        @include box_shodow4(
                            0 0.2rem /* 8/40 */ 0.75rem /* 30/40 */ 0
                        );
                        border-radius: 0.2rem /* 8/40 */;
                        flex-basis: 10.175rem /* 407/40 */;
                        flex-shrink: 0;
                        margin: 1.4rem 0;
                        .list4-pto {
                            width: 9.6rem /* 384/40 */;
                            height: 5.45rem /* 218/40 */;
                            padding: 0.15rem /* 6/40 */;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            margin-bottom: 0.6rem /* 24/40 */;
                            @include border2(1px solid);
                            box-sizing: border-box;
                            img {
                                width: 9.3rem /* 372/40 */;
                                height: 5.15rem /* 206/40 */;
                            }
                        }
                        .list4-bto-b {
                            font-size: 0.75rem /* 30/40 */;
                            color: #333333;
                            line-height: 1.1rem /* 44/40 */;
                            font-weight: bold;
                            padding-left: 0.45rem /* 18/40 */;
                            box-sizing: border-box;
                        }
                        & + .list4-pto-c {
                            margin-left: 0.5rem /* 20/40 */;
                        }
                        &:first-child {
                            margin-left: 0.75rem /* 30/40 */;
                        }
                    }
                    .list4-pto-d:last-child {
                        padding-right: 0.75rem /* 30/40 */;
                    }
                }
            }
        }
        .ctn4 {
            @include box_shodow1(0 0.3rem /* 12/40 */ 1rem /* 40/40 */ 0);
            border-radius: 0.2rem /* 8/40 */;
            overflow: hidden;
            position: relative;
            background: #fff;
            padding: 1.4rem /* 56/40 */ 0.8rem /* 32/40 */;
            box-sizing: border-box;
            margin-top: 0.8rem /* 32/40 */;
            .list3-bto {
                width: 100%;
                @include bg_color9();
                padding: 0.25rem /* 10/40 */;
                box-sizing: border-box;
                margin-bottom: 1.4rem /* 56/40 */;
                .list3-bto-c {
                    padding: 0.55rem /* 22/40 */ 0.35rem /* 14/40 */;
                    @include border2(1px solid);
                    box-sizing: border-box;
                    .list3-bto-tit {
                        font-size: 0.8rem /* 32/40 */;
                        line-height: 1.125rem /* 45/40 */;
                        @include font_color1();
                        font-weight: bold;
                    }
                    .ctx {
                        font-size: 0.7rem /* 28/40 */;
                        @include font_color5();
                        line-height: 1.1rem /* 44/40 */;
                        margin-top: 0.4rem /* 16/40 */;
                        margin-left: 0.95rem /* 38/40 */;
                        position: relative;
                        .icon1 {
                            width: 0.45rem /* 18/40 */;
                            height: 0.45rem /* 18/40 */;
                            display: inline-block;
                            position: absolute;
                            top: 0.272rem;
                            left: -0.95rem;
                        }
                    }
                }
            }
            .list3-bto-c11 {
                padding: 0 0.25rem /* 10/40 */;
                box-sizing: border-box;
                .list3-bto-c1 {
                    padding: 0.4rem 0.35rem /* 14/40 */ .8rem;
                    @include border2(1px solid);
                    box-sizing: border-box;
                    &::before {
                        @include border_color2();
                    }
                    .list3-bto-tit {
                        font-size: 0.8rem /* 32/40 */;
                        line-height: 1.125rem /* 45/40 */;
                        @include font_color1();
                        font-weight: bold;
                    }
                    .ctx {
                        font-size: 0.7rem /* 28/40 */;
                        @include font_color5();
                        line-height: 1.1rem /* 44/40 */;
                        margin-top: 0.4rem /* 16/40 */;
                        margin-left: 0.95rem /* 38/40 */;
                        position: relative;
                        .icon1 {
                            width: 0.45rem /* 18/40 */;
                            height: 0.45rem /* 18/40 */;
                            display: inline-block;
                            position: absolute;
                            top: 0.299rem;
                            left: -0.95rem;
                        }
                    }
                }
            }
        }
    }
</style>

