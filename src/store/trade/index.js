// reqUserAddressInfo

import { reqUserAddressInfo } from '@/api';

const state = {
    state: []
}

const mutations = {
    GETUSERADDRESS(state, address) {
        state.address = address
    }
}

const actions = {
    //获取用户地址信息
    async getUserAddress({ commit }) {
        let result = await reqUserAddressInfo();
        console.log(result);
        if (result.code == 200) {
            commit('GETUSERADDRESS', result.data)
        }
    }
}

const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}