//登录与注册的仓库
import { reqGetCode, reqUserRegister, reqUserLogin, reqGetUserInfo, reqLogout } from '@/api';
import { setToken, getToken, removeToken } from '@/utils/token';
const state = {
    code: '',
    token: getToken(),
    userInfo: {}
};

const mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    USERLOGIN(state, token) {
        state.token = token
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    //清除数据
    CLEAR(state) {
        //仓库用户信息清空
        state.token = '';
        state.userInfo = {};
        //本地存储数据清空
        removeToken()
    }
};

const actions = {
    //获取验证码
    async getCode({ commit }, phone) {
        let result = await reqGetCode(phone)
        if (result.code == 200) {
            commit('GETCODE', result.data)
            return "ok"
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    //用户注册
    async userRegister({ commit }, user) {
        let result = await reqUserRegister(user)
        if (result.code == 200) {

            commit('GETCODE', result.data)
            return "ok"
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    //登录业务token
    async userLogin({ commit }, data) {
        let result = await reqUserLogin(data)
        // console.log(result);
        //服务器下发的token是用户的唯一标识符
        if (result.code == 200) {
            commit('USERLOGIN', result.data.token)
            //持久化存储token
            setToken(result.data.token)
            return "ok"
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    //获取用户信息
    async getUserInfo({ commit }) {
        let result = await reqGetUserInfo();
        if (result.code == 200) {
            //此时已成功获取到token
            commit('GETUSERINFO', result.data);

            return "ok"
        } else {
            return Promise.reject(new Error('fail'))
        }
    },

    //退出登录
    async userLogout({ commit }) {
        //通知服务器清除token
        let result = await reqLogout();
        if (result.code == 200) {
            //action中无法操作state。需要提交mutation修改state
            commit('CLEAR');
            return "ok"
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
};

const getters = {

}

export default {
    state, mutations, actions, getters
}

