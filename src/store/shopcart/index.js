//shopcart模块的仓库
import { reqCartList, reqDeleteCartById, reqUpdateCheckedById } from '@/api';
const state = {
    cartList: []
}
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList
    }
}
const actions = {
    //这里书写业务逻辑
    //获取购物车列表
    async getCartList({ commit }) {
        let result = await reqCartList();
        // console.log(result);
        commit('GETCARTLIST', result.data)
    },
    //删除商品
    async deleteCartListBySkuId({ commit }, skuId) {
        let result = await reqDeleteCartById(skuId);
        if (result.code == 200) {
            return "ok"
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    //修改选中状态
    async updateCheckedById({ commit }, { skuId, isChecked }) {
        let result = await reqUpdateCheckedById(skuId, isChecked);
        if (result.code == 200) {
            return "ok"
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    //删除全部勾选的产品 context 小仓库
    deleteAllCheckedCart({ dispatch, getters }) {
        //获取购物车中全部的产品
        let PromiseAll = [];
        getters.cartList.cartInfoList.forEach(item => {
            let promise = item.isChecked == 1 ? dispatch('deleteCartListBySkuId', item.skuId) : ''
            PromiseAll.push(promise)
        })
        return PromiseAll.push(PromiseAll)
    },
    //修改全部产品的状态
    updateAllCartChecked({ dispatch, state }, isChecked) {
        let PromiseAll = [];
        state.cartList[0].cartInfoList.forEach(item => {
            let promise = dispatch('updateCheckedById', { skuId: item.skuId, isChecked })
            PromiseAll.push(promise)
        })
        return Promise.all(PromiseAll)
    }
}
const getters = {
    //简化数据
    cartList(state) {
        return state.cartList[0] || {}
    },

}
//对外暴露store类的实例
export default ({
    state,
    mutations,
    actions,
    getters
})
