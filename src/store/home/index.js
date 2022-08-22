//Home模块的仓库
import { reqCategoryList } from '@/api';
import { reqGetBannerList } from '@/api';
import { reqGetFloorList } from '@/api';

const state = {
    //state中的数据默认初始值不乱写
    //三级菜单数据
    categoryList: [],
    //轮播图数据
    bannerList: [],
    floorList: []
}
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList
    },
    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList
    },
    GETFLOORLIST(state, floorList) {
        state.floorList = floorList
    }
}
const actions = {
    //这里书写业务逻辑
    async categoryList({ commit }) {
        let result = await reqCategoryList();
        if (result.code == 200) {
            commit("CATEGORYLIST", result.data)
        }
    },
    //获取首页轮播图数据
    async getBannerList({ commit }) {
        let result = await reqGetBannerList();

        if (result.code == 200) {
            commit("GETBANNERLIST", result.data)
        }
    },
    //获取首页楼层数据
    async getFloorList({ commit }) {
        let result = await reqGetFloorList();
        if (result.code == 200) {
            commit("GETFLOORLIST", result.data)
        }
    },

}
const getters = {}
//对外暴露store类的实例
export default ({
    state,
    mutations,
    actions,
    getters
})
