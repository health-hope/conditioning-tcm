<template>
    <div class="configure">
        <!-- 心系证候类型 -->
        <div class="type">
            <BaseZyTempTitle bgClass="jgy_bg_5" :tempTitle="tempTitle1"/>
            <div class="ctn">
                <LayBg/>
                <Cell
                    class="tap_events"
                    @click.native="cellClick('1')"
                    :leftVal="'类型'"
                    :rightVal="rightVal1"
                />
            </div>
        </div>
        <!-- 特色调理偏好 -->
        <div class="type">
            <BaseZyTempTitle bgClass="jgy_bg_1" :tempTitle="'特色调理偏好'"/>
            <div class="ctn">
                <LayBg/>
                <Cell
                    class="tap_events"
                    @click.native="cellClick('2')"
                    :leftVal="'调理开始日期'"
                    :rightVal="rightVal2"
                />
                <Cell
                    class="tap_events"
                    @click.native="cellClick('3')"
                    :leftVal="'每周调理日'"
                    :rightVal="rightVal3"
                />
                <Cell
                    class="tap_events"
                    @click.native="cellClick('4')"
                    :leftVal="'调理方法'"
                    :rightVal="rightVal4"
                />
            </div>
        </div>
        <!-- 选择类型dialog -->
        <div v-transfer-dom>
            <x-dialog :hide-on-blur="true" v-model="showToast1" class="dialog1">
                <div class="single-c">
                    <LayBg/>
                    <Single class="tap_events" :single="configData.evaluationResList" @itemClick="itemClick"/>
                </div>
            </x-dialog>
        </div>
        <!-- 选择调理日期dialog -->
        <div v-transfer-dom>
            <x-dialog :hide-on-blur="true" v-model="showToast2" class="dialog2">
                <div class="dataTime-c">
                    <LayBg/>
                    <datetime-view
                        class="datetime"
                        :startDate="startDate"
                        :endDate="endDate"
                        v-model="datetime"
                        ref="datetime"
                        :format="format"
                    ></datetime-view>
                    <div
                        class="btn111 tap_events"
                        :style="{backgroundImage: 'url(btn_bg_Evaluation_yellow_activation.png)'} | PUBLIC_PATH"
                        @click="dateTimeSure"
                    >确定</div>
                </div>
            </x-dialog>
        </div>
        <!-- 调理日dialog -->
        <div v-transfer-dom>
            <x-dialog :hide-on-blur="true" v-model="showToast3" class="dialog3">
                <div class="multiple-c">
                    <LayBg/>
                    <Multiple
                        @multipleClick="multipleClick"
                        @multipleSure="multipleSure"
                        :multiple="multiple"
                    />
                    <div class="multipleIcon">至少选择5天</div>
                </div>
            </x-dialog>
        </div>
        <!-- 调理方法dialog -->
        <div v-transfer-dom>
            <x-dialog :hide-on-blur="true" v-model="showToast4" class="dialog4">
                <div class="multiple-c">
                    <LayBg/>
                    <Multiple
                        types="method"
                        @multipleClick1="multipleClick1"
                        @multipleSure1="multipleSure1"
                        :multiple="nurseListData"
                    />
                    <div class="multipleIcon" style="width: 3.4rem">多选</div>
                </div>
            </x-dialog>
        </div>
        <!-- 保存按钮 -->
        <div 
            @click="saveClick"
            :class="saveFlag?'save tap_events':'save saveSelect tap_events'"
            :style="{backgroundImage: saveFlag?'url(btn_bg_condition_yellow_program.png)':'url(btn_bg_condition_yellow_program_enabled.png)'} | PUBLIC_PATH">
            保存
        </div>
    </div>
</template>
<script>
    import { mapState, mapMutations } from 'vuex'
    import LayBg from '@/components/common/LayBg';
    import BaseZyTempTitle from '@/components/common/BaseZyTempTitle';
    import Cell from '@/components/common/Cell';
    import Single from '@/components/common/SingleElection.vue'
    import Multiple from '@/components/common/MultipleSelection.vue'
    import { TransferDomDirective as TransferDom, XDialog, DatetimeView, Picker } from 'vux'
    import { apiConfig, apiSaveConfig } from '@/service/api'
    import { getUrlParam } from '@/assets/js/util.js';
    export default {
        data() {
            return {
                tempTitle1:'',
                showToast1: false,
                showToast2: false,
                showToast3: false,
                showToast4: false,
                configData: {},
                resultCode: '',
                format: 'YYYY-MM-DD',
                datetime: '',
                startDate: '',
                endDate: '',
                multiple: [{ name: "周一", id: "1" }, { name: "周二", id: "2" }, { name: "周三", id: "3" }, { name: "周四", id: "4" }, { name: "周五", id: "5" }, { name: "周六", id: "6" }, { name: "周日", id: "7" }],
                nurseListData: [{ name: "按摩", id: "1" }, { name: "手反射区疗法", id: "2" }, { name: "艾灸", id: "3" }, { name: "拔罐", id: "4" }, { name: "刮痧", id: "5" }],
                nurseList: [],
                weekPlanDate: [],
                rightVal1: '请选择',
                rightVal2: '请选择',
                rightVal3: '请选择',
                rightVal4: '请选择',
                resultCodeFlag: false
            }
        },
        components: {
            LayBg,
            BaseZyTempTitle,
            Cell,
            XDialog,
            Single,
            DatetimeView,
            Picker,
            Multiple
        },
        directives: {
            TransferDom
        },
        watch: {
            resultCode(val) {
                if(val!=="" && this.resultCodeFlag) {
                    this.nurseListData = [{ name: "按摩", id: "1", check: false }, { name: "手反射区疗法", id: "2", check: false }, { name: "艾灸", id: "3", check: false }, { name: "拔罐", id: "4", check: false }, { name: "刮痧", id: "5", check: false }]
                    this.rightVal4 = "请选择"
                    let arr = []
                    this.configData.evaluationResList.map((item, i)=>{
                        if(item.code == val) {
                            this.nurseListData.forEach(ls => {
                                item.methods.forEach(meth => {
                                    if(meth == ls.id) {
                                        arr.push(ls)
                                    }
                                })
                            })
                        }
                    })
                    this.nurseListData = arr
                    this.nurseListData.forEach((item, i) => {
                        this.$set(this.nurseListData[i], 'check', false)
                    })
                }
            }
        },
        computed: {
            ...mapState(['code', 'userInfo']),
            saveFlag() {
                let val = '请选择'
                if(this.rightVal1.indexOf(val) < 0 && this.rightVal2.indexOf(val) < 0 && this.rightVal3.indexOf(val) < 0 && this.rightVal4.indexOf(val) < 0){
                    return true
                }else {
                    return false
                }
            }
        },
        created() {
            let code = getUrlParam('code')
            switch (code) {
                case '1':
                    this.tempTitle1 = '心系证候类型'
                    break;
                case '2':
                    this.tempTitle1 = '肝系证候类型'
                    break;
                case '3':
                    this.tempTitle1 = '肺系证候类型'
                    break;
                case '4':
                    this.tempTitle1 = '脾系证候类型'
                    break;
                case '5':
                    this.tempTitle1 = '胃系证候类型'
                    break;
                case '6':
                    this.tempTitle1 = '肾系证候类型'
                    break;
                case '7':
                    this.tempTitle1 = '小肠系证候类型'
                    break;
                case '8':
                    this.tempTitle1 = '大肠系证候类型'
                    break;
                case '9':
                    this.tempTitle1 = '胆系证候类型'
                    break;
            }
            this.getConfig()
        },
        methods: {
            ...mapMutations(['setCheck']),
            // 请求配置信息
            async getConfig() {
                const data = await apiConfig(this.code, this.userInfo.userId)
                console.log(data)
                // 设置选择时间范围
                this.startDate = `${data.minDate.substr(0,4)}-${data.minDate.substr(4,2)}-${data.minDate.substr(6,2)}`
                this.endDate = `${data.maxDate.substr(0,4)}-${data.maxDate.substr(4,2)}-${data.maxDate.substr(6,2)}`
                this.resultCode = data.resultCode
                if(this.resultCode) {
                    let arrNew = []
                    // 筛选调理方法的数组
                    data.evaluationResList.forEach((item, i) => {
                        if(item.code == this.resultCode) {
                            item.check = true
                            this.rightVal1 = item.name
                            item.methods.forEach((item1) => {
                                this.nurseListData.forEach((item2) => {
                                    if(item1 == item2.id) {
                                        arrNew.push(item2)
                                    }
                                })
                            })
                        }
                    })
                    this.nurseListData = arrNew
                }
                // 回显调理开始时间
                if(data.startDate) {
                    let datetime = `${data.startDate.substr(0,4)}-${data.startDate.substr(4,2)}-${data.startDate.substr(6,2)}`
                    this.rightVal2 = datetime
                    this.datetime = datetime
                    this.$refs.datetime.render()
                }
                // 回显 每周调理日
                if(data.weekPlanDate && data.weekPlanDate.length) {
                    let val = ''
                    this.multiple.forEach((item, i) => {
                        data.weekPlanDate.forEach(date => {
                            if(date == item.id) {
                                this.$set(this.multiple[i], 'check', true)
                                if (val.length == '9') {
                                    val += `${item.name}`
                                } else {
                                    val += `${item.name}、`
                                }
                            }
                        })
                    })
                    val = val.substring(0, val.length - 1)
                    this.rightVal3 = val
                }
                // 回显 每周调理方法
                if(data.nurseList && data.nurseList.length) {
                    let val = ''
                    

                    this.nurseListData.forEach((item, i)=>{
                        data.nurseList.forEach(list=>{
                            if(list == item.id) {
                                this.$set(this.nurseListData[i], 'check', true)
                                val += `${item.name}、`
                            }
                        })
                    })
                    val = val.substring(0, val.length - 1)
                    this.rightVal4 = val
                }
                this.nurseList = data.nurseList
                this.weekPlanDate = data.weekPlanDate
                this.configData = data
                this.$nextTick(() => {
                    this.resultCodeFlag = true
                })
            },
            // 保存配置
            async setApiSaveConfig() {
                this.setCheck('no')
                let datetime = this.rightVal2.replace(/\-/g, '')
                await apiSaveConfig(this.code, this.userInfo.userId, this.resultCode, datetime, this.weekPlanDate, this.nurseList)
                this.$router.push('/conditioning')
            },
            dateTimeSure() {
                if(!this.datetime) this.datetime = this.startDate
                this.rightVal2 = this.datetime
                this.showToast2 = false
            },
            // 开始日期选择
            cellClick(val) {
                if (val == 3) {
                    // 每周调理日回显示
                    this.multiple = [{ name: "周一", id: "1" }, { name: "周二", id: "2" }, { name: "周三", id: "3" }, { name: "周四", id: "4" }, { name: "周五", id: "5" }, { name: "周六", id: "6" }, { name: "周日", id: "7" }]
                    if (this.weekPlanDate.length) {
                        this.multiple.forEach((item, i) => {
                            this.weekPlanDate.forEach(ele => {
                                if (item.id == ele) {
                                    this.$set(this.multiple[i], 'check', true)
                                }
                            })
                        })
                    }else if(this.configData.weekPlanDate && this.configData.weekPlanDate.length) {
                        this.multiple.forEach((item, i) => {
                            this.configData.weekPlanDate.forEach(date => {
                                if(date == item.id) {
                                    this.$set(this.multiple[i], 'check', true)
                                }
                            })
                        })
                    }
                }else if (val == 4) {
                    this.nurseListData.forEach((item, i) => {
                        this.$set(this.nurseListData[i], 'check', false)
                    })
                    if (this.nurseList.length && this.rightVal4 != "请选择") {
                        this.nurseListData.forEach((item, i) => {
                            this.nurseList.forEach(ele => {
                                if (item.id == ele) {
                                    this.$set(this.nurseListData[i], 'check', true)
                                }
                            })
                        })
                    }else if(this.configData.nurseList && this.configData.nurseList.length && this.rightVal4 != "请选择") {
                        this.nurseListData.forEach((item, i)=>{
                            this.configData.nurseList.forEach(list=>{
                                if(list == item.id) {
                                    this.$set(this.nurseListData[i], 'check', true)
                                }
                            })
                        })
                    }
                }
                if(val == 2) {
                    if(this.rightVal2.indexOf('-') >= 0) {
                        this.datetime = this.rightVal2
                        this.$refs.datetime.render()
                    }else {
                        this.datetime = this.startDate
                        this.$refs.datetime.render()
                    }
                }
                this[`showToast${val}`] = true;
            },
            // 单选点击
            itemClick(index) {
                this.configData.evaluationResList.map((item, i) => {
                    if (i == index) {
                        this.$set(this.configData.evaluationResList[i], 'check', true)
                        this.rightVal1 = item.name
                        this.resultCode = item.code
                    } else {
                        this.$set(this.configData.evaluationResList[i], 'check', false)
                    }
                })
                this.showToast1 = false
            },
            // 多选点击
            multipleClick(index) {
                this.$set(this.multiple[index], 'check', !this.multiple[index].check)
            },
            multipleClick1(index) {
                this.$set(this.nurseListData[index], 'check', !this.nurseListData[index].check)
            },
            // 多选点击确定
            multipleSure(val, arr) {
                this.rightVal3 = val
                this.showToast3 = false
                this.weekPlanDate = arr
            },
            multipleSure1(val, arr) {
                this.rightVal4 = val
                this.showToast4 = false
                this.nurseList = arr
            },
            // 保存按钮
            saveClick() {
                if(this.saveFlag) {
                    this.setApiSaveConfig()
                }
            }
        }
    }
</script>
<style lang="scss">
    .datetime .dp-item:nth-child(1) .scroller-indicator::after {
        content: "年";
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        font-size: 16px;
        height: 34px;
        line-height: 34px;
        color: #999999;
        margin-left: 30px;
    }
    .datetime .dp-item:nth-child(2) .scroller-indicator::after {
        content: "月";
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        font-size: 16px;
        height: 34px;
        line-height: 34px;
        color: #999999;
        margin-left: 20px;
    }
    .datetime .dp-item:nth-child(3) .scroller-indicator::after {
        content: "日";
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        font-size: 16px;
        height: 34px;
        line-height: 34px;
        color: #999999;
        margin-left: 20px;
    }
</style>
<style lang="scss" scoped>
    @import "@/assets/style/mixin.scss";
    .configure {
        width: 100%;
        min-height: 100%;
        padding: 0.8rem /* 32/40 */ 0.75rem /* 30/40 */ 1rem /* 40/40 */;
        box-sizing: border-box;
        @include bg_color1();
        .type {
            @include bg_color6();
            @include box_shodow1(0 0.3rem /* 12/40 */ 1rem /* 40/40 */ 0);
            border-radius: 0.2rem /* 8/40 */;
            & + .type {
                margin-top: 0.8rem /* 32/40 */;
            }
            .ctn {
                position: relative;
                padding: 1.3rem /* 52/40 */ 1.05rem /* 42/40 */;
                box-sizing: border-box;
            }
        }
    }
    .dialog1,
    .dialog2,
    .dialog3,
    .dialog4 {
        /deep/ .weui-dialog {
            width: 17.25rem /* 690/40 */;
            max-width: 100%;
            border-radius: 0.2rem /* 8/40 */;
            overflow: auto;
        }
        .single-c,
        .dataTime-c,
        .multiple-c {
            padding: 1rem /* 40/40 */ 1.05rem /* 42/40 */;
            box-sizing: border-box;
            position: relative;
            .multipleIcon {
                position: absolute;
                left: -0.75rem /* 30/40 */;
                top: -1.2rem /* 48/40 */;
                width: 5.925rem /* 237/40 */;
                height: 1.7rem /* 68/40 */;
                @include bg_color();
                @include box_shodow2(0 0.3rem 0.75rem 0);
                border-radius: 0 0.85rem 0.85rem 0;
                font-size: 0.7rem /* 28/40 */;
                @include font_color6();
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                z-index: 99999999;
            }
        }
    }
    .save {
        width: 10.25rem /* 410/40 */;
        height: 2.5rem /* 100/40 */;
        @include bg_color();
        @include box_shodow(0 .3rem /* 12/40 */ .75rem /* 30/40 */ 0);
        border-radius: 1.25rem /* 50/40 */;
        position: fixed;
        left: 50%;
        transform: translateX(-50%);
        bottom: 1rem /* 40/40 */;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 9.7275rem /* 389.1/40 */ 2rem /* 80/40 */;
    }
    .saveSelect {
        transition: all 0.3s;
        @include bg_color8();
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 9.7275rem /* 389.1/40 */  2rem;
    }
    .btn111 {
        width: 100%;
        height: 2.4rem;
        @include box_shodow2(0 0.3rem 0.75rem 0);
        border-radius: 1.25rem;
        font-size: 0.9rem;
        @include font_color6();
        @include bg_color();
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 14.6275rem 1.9rem;
        margin: auto;
        margin-top: 0.7rem;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s;
        font-weight: bold;
    }
</style>

