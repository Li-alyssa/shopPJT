<template>
  <div>
    <!-- 三级联动全局组件 -->
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor
      v-for="(floor, index) in floorList"
      :key="floor.id"
      :list="floor"
    ></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
import ListContainer from "@/pages/Home/ListContainer/index.vue";
import Recommend from "@/pages/Home/Recommend/index.vue";
import Rank from "@/pages/Home/Rank/index.vue";
import Like from "@/pages/Home/Like/index";
import Floor from "@/pages/Home/Floor/index";
import Brand from "@/pages/Home/Brand/index";
import { mapState } from "vuex";

export default {
  name: "",
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  mounted() {
    //派发action:通过vuex发起ajax请求,将数据存储在仓库中
    this.$store.dispatch("getFloorList");
    //派发action 获取用户信息在首页展示
    this.$store.dispatch("getUserInfo");
  },
  computed: {
    ...mapState({
      //右侧需要一个函数，当使用该计算属性的时候，右侧函数会立即执行一次
      //参数为state 为大仓库中的数据
      floorList: (state) => state.home.floorList,
    }),
  },
  methods: {},
};
</script>

<style>
</style>