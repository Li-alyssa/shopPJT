<template>
  <div class="swiper-container" ref="mySwiper">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(Carsousel, index) in list"
        :key="Carsousel.id"
      >
        <img :src="Carsousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
//引入Swiper
import Swiper from "swiper";
export default {
  name: "Carsousel",
  props: ["list"],
  watch: {
    //监听bannerlist数据的变化
    bannerList: {
      //立即监听
      immediate: true,
      handler(newValue, oldValue) {
        //通过watch箭头bannerList属性的属性值变化
        //如果执行handler方法，代表组件实例身上的属性已经存在即发生了变化
        // 当前函数执行，只能保证bannerList数据已经存在，但无法保证v-for结束
        //只有当v-for执行完毕，才能有结构，才能执行swiper实例
        //nextTick：在下次DOM更新循环结束之后执行延迟回调，在修改数据之后立即使用这个方法，获取更新后的dom
        //$nextTick可以抱着页面中的结构一定是有的，会与许多插件一起使用
        this.$nextTick(() => {
          var mySwiper = new Swiper(this.$refs.mySwiper, {
            // direction: "vertical", // 垂直切换选项
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },
            autoplay: {
              delay: 1000, //1秒切换一次
              pauseOnMouseEnter: true, //悬停停止切换
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },

            // 如果需要滚动条
            scrollbar: {
              el: ".swiper-scrollbar",
            },
          });
        });
      },
    },
  },
};
</script>

<style>
</style>