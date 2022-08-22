//配置路由

import Vue from 'vue';
import VueRouter from 'vue-router';

//使用插件
Vue.use(VueRouter);

//引入路由配置信息
import routes from './routes';

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



export default new VueRouter({
    //配置路由
    routes,
    scrollBehavior() {
        return { y: 0 }
    }
})

