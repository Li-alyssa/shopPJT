//API进行统一管理
//引入二次封装的axios(带有响应请求拦截器)
import requests from './request';
import mockRequests from './mockAjax';

//三级联动接口
///api/product/getBaseCategoryList get 无参
export const reqCategoryList = () => {
    //发请求
    return requests({
        url: '/product/getBaseCategoryList',
        method: 'get'
    })
}

//获取banner接口
export const reqGetBannerList = () => {
    return mockRequests({
        url: '/banner',
        method: 'get'
    })
}

//获取floor接口
export const reqGetFloorList = () => {
    return mockRequests({
        url: '/floor',
        method: 'get'
    })
}

//获取Search接口
export const reqGetSearchInfo = (params) => {
    return requests({
        url: '/list',
        method: 'post',
        data: params
    })
}

//获取商品详情信息detail接口
export const reqGetItemInfo = (skuId) => {
    return requests({
        url: `/item/${skuId}`,
        method: 'get'
    })
}

//产品添加购物车接口（获取更新购物车）
export const reqAddOrUpdateShopCart = (skuId, skuNum) => {
    return requests({
        url: `/cart/addToCart/${skuId}/${skuNum}`,
        method: 'post'
    })
}


//购物车接口
export const reqCartList = () => {
    return requests({
        url: "/cart/cartList",
        method: 'get'
    })
}

//删除购物车商品接口
export const reqDeleteCartById = (skuId) => {
    return requests({
        url: `/cart/deleteCart/${skuId}`,
        method: 'delete'
    })
}

//切换商品选中状态接口
export const reqUpdateCheckedById = (skuId, isChecked) => {
    return requests({
        url: `/cart/checkCart/${skuId}/${isChecked}`,
        method: 'get'
    })
}

//获取验证码接口
export const reqGetCode = (phone) => {
    return requests({
        url: `/user/passport/sendCode/${phone}`,
        method: 'get'
    })
}

//注册接口
export const reqUserRegister = (data) => {
    return requests({
        url: '/user/passport/register',
        method: 'post',
        data
    })
}

//登录接口
export const reqUserLogin = (data) => {
    return requests({
        url: '/user/passport/login',
        method: 'post',
        data
    })
}


//获取用户信息接口：携带token向服务器要用户信息
export const reqGetUserInfo = () => {
    return requests({
        url: '/user/passport/auth/getUserInfo',
        method: 'get',
    })
}

//退出登录接口
export const reqLogout = () => {
    return requests({
        url: '/user/passport/logout',
        method: 'get',
    })
}
