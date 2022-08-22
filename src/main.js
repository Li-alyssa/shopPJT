import Vue from 'vue'
import App from './App.vue'

//三级联动组件/注册为全局组件
import TypeNav from '@/components/TypeNav'
import Carsousel from '@/components/Carsousel'
import Pagination from '@/components/Pagination';
//第一个参数：全局组件的名字，第二个参数：哪一个组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carsousel.name, Carsousel)
Vue.component(Pagination.name, Pagination)

//引入路由
import router from '@/router';
//引入vuex仓库
import store from '@/store'
//引入mockServe.js
import '@/mock/mockServe';
//引入swiper样式
import 'swiper'
import 'swiper/css/swiper.min.css'  // 在入口js中引入
//引入iconfont图标
import '@/assets/fonts/iconfont/iconfont.css';
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  //全局事件总线$bus配置
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
  router,
  store
}).$mount('#app')
