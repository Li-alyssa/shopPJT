<template>
  <div>
    <Header></Header>
    <!-- 路由组件出口 -->
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header/index.vue";
import Footer from "./components/Footer/index.vue";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  mounted() {
    //派发一个action 获取商品分类的三级列表的数据
    //通知Vuex发请求，获取数据，存储于仓库之中
    this.$store.dispatch("categoryList");
  },
};
</script>

<style>
/* // 模块开发步骤
// 1.静态页面+静态组件拆分
// 2.发请求 API
// 3.VUEX三连环
// 4.组件获取仓库数据，动态展示数据 */
</style>
