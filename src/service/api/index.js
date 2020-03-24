import request from '../request'
/**
 * 加载中医特色调理封面内容。
 * @param {String} code 测评编码
 */
export const apiHomeData = (code) => request('/ego-gw/v3/tcm/nurse/brief/index.do',{ code })
/**
 * 获取中医特色调理配置信息
 * @param {String} code 测评编码
 * @param {String} userId 
 */
export const apiConfig = (code, userId) => request('/ego-gw/v3/tcm/nurse/config/load.do',{ code, userId })
/**
 * 保存中医特色调理配置信息
 * @param {String} code 测评编码
 * @param {String} userId 
 * @param {String} resultCode 测评结果 
 * @param {String} startDate  计划开始日期 yyyyMMdd
 * @param {String} weekPlanDate  每周调理日期列表
 * @param {String} nurseList 选择的调理方法
 */
export const apiSaveConfig = (code, userId, resultCode, startDate, weekPlanDate, nurseList) => request('/ego-gw/v3/tcm/nurse/config/save.do',{ code, userId, resultCode, startDate, weekPlanDate, nurseList })
/**
 * 获取中医特色调理计划首页
 * @param {String} code 测评编码
 * @param {String} userId 
 */
export const apiPlan = (code, userId) => request('/ego-gw/v3/tcm/nurse/plan/index.do',{ code, userId })
/**
 * 获取中医特色调理疗法详情
 * @param {String} methodId 疗法ID
 */
export const apiTherapyDetail = (methodId) => request('/ego-gw/v3/tcm/nurse/method/detail.do',{ methodId })
/**
 * 获取中医特色调理穴位详情
 * @param {String} acupointName 穴位名称
 */
export const apiAcupointDetail = (acupointName) => request('/ego-gw/v3/tcm/nurse/acupoint/detail.do',{ acupointName })