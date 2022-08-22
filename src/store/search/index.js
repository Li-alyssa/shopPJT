//Search模块的仓库

import { reqGetSearchInfo } from '@/api';
const state = {
    //仓库初始状态
    searchList: {}
}
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList;
    }
}
const actions = {
    //这里书写业务逻辑
    //获取search模块数据
    async getSearchList({ commit }, params = {}) {
        //当这个reqGetSearchInfo函数在调用获取服务器数据时，至少传递一个参数（空对象）
        //params形参：是当用户派发action时，第二个参数传递过来的。至少是一个空对象
        let result = await reqGetSearchInfo(params)
        // console.log(result)
        if (result.code == 200) {
            commit('GETSEARCHLIST', result.data)
        }
    }
}

//getters计算属性：在项目中，为简化数据而生
//可以把我们在组件中需要用的数据简化，将来在组件获取数据的时候就方便了
const getters = {
    //该形参state，为当前仓库的state 并非大仓库的state
    goodsList(state) {
        // console.log(state);
        return state.searchList.goodsList || [];
    },
    trademarkList(state) {
        // console.log(state);
        return state.searchList.trademarkList || [];
    },
    attrsList(state) {
        // console.log(state);
        return state.searchList.attrsList || [];
    }
}
//对外暴露store类的实例
export default ({
    state,
    mutations,
    actions,
    getters
})

