//detail模块的仓库
import { reqGetItemInfo } from '@/api';
import { reqAddOrUpdateShopCart } from '@/api';
//封装游客身份模块uuid---申城一个随机字符串（不变）
import { getUUID } from '@/utils/uuid_token';
const state = {
    itemInfo: {},
    //游客的临时身份
    uuid_token: getUUID()
}
const mutations = {
    GETITEMINFO(state, itemInfo) {
        state.itemInfo = itemInfo
    }
}
const actions = {
    //这里书写业务逻辑
    async getItemInfo({ commit }, skuId) {
        let result = await reqGetItemInfo(skuId);
        if (result.code == 200) {
            commit("GETITEMINFO", result.data)
        }
    },
    //产品添加到购物车中
    //服务器写入数据成功，服务器返回code==200 代表操作成功
    //由于没有数据返回，所以不需要三连环在vuex中存储数据
    async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
        //加入购物车返回结果
        let result = await reqAddOrUpdateShopCart(skuId, skuNum);
        // console.log(result);
        if (result.code == 200) {
            return "success"
        } else {
            return Promise.reject(new Error('fail'))
        }
    }
}
const getters = {
    //简化数据
    categoryView(state) {
        return state.itemInfo.categoryView || {}
    },
    skuInfo(state) {
        return state.itemInfo.skuInfo || {}
    }
}
//对外暴露store类的实例
export default ({
    state,
    mutations,
    actions,
    getters
})
