//配置路由

import Vue from 'vue';
import VueRouter from 'vue-router';

//使用插件
Vue.use(VueRouter);

//引入路由配置信息
import routes from './routes';

//引入store
import store from '@/store';

//重写push|replace
//先保存VueRouter原型对象中的push
let originPush = VueRouter.prototype.push;
//先保存VueRouter原型对象中的push
let originReplace = VueRouter.prototype.replace;
//第一个参数：告诉原来的push/replace方法，你往哪里跳转（传递哪些参数）
// 第二个参数：成功的回调
//第三个参数：失败的回调
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}



let router = new VueRouter({
    //配置路由
    routes,
    scrollBehavior() {
        return { y: 0 }
    }
})

//全局守卫：前置守卫 在路由跳转之间进行判断
router.beforeEach(async (to, from, next) => {
    // to:要跳转到哪个路由的信息
    // from：从哪个路由开始跳
    // next：放行函数
    // next()
    //next(path) 放行到指定路由
    //next(false) 中断当前的导航
    let token = store.state.user.token;
    let name = store.state.user.userInfo.name;
    if (token) {
        //用户已经登陆 要去login
        if (to.path == '/login') {
            //如果要去的路由为login 跳转至home
            next('/home')
            console.log(1);
        } else {
            // 用户登录 去的地方不是login
            //判断是否存在用户名
            if (name) {
                //存在用户信息 放行
                next();
                console.log(2);

            } else {
                //没有用户信息 派发action 让仓库存储用户信息在跳转
                try {
                    await store.dispatch('getUserInfo')
                    //放行
                    next()
                    console.log(3);
                } catch (error) {
                    //token失效无法获取用户信息 清除token重新登陆
                    store.dispatch('userLogout')
                    next('/login')
                }
            }
        }
    } else {
        //未登录   还未完善
        // next('/login')
        next()
        console.log(4);

    }
})

export default router;
