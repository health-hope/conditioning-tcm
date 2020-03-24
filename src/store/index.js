import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import createPersistedState from "vuex-persistedstate"
const store = new Vuex.Store({
    state: {
        code: '',
        userInfo: {},
        check: 'no',
        scrollLeft: 0,
    },
    mutations: {
        setCode(state, paylod) {
            state.code = paylod
        },
        setUserId(state, paylod) {
            state.userInfo.userId = paylod
        },
        setCheck(state, paylod) {
            state.check = paylod
        },
        setScrollLeft(state, paylod) {
            state.scrollLeft = paylod
        },
    },
    modules: {
    },
    plugins: [createPersistedState({
        storage: window.sessionStorage
    })]
})
export default store
