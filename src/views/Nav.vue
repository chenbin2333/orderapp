<template>
  <div class="nav-box">
    <div class="top-box">
      <img style="width:100px" :src="merchantData.avatar" />
      <p>{{ merchantData.name }}</p>
    </div>
    <div class="center-box">
      <router-link to="/">点餐</router-link>
      <router-link to="/rate">评论</router-link>
      <router-link to="/merchant">商家</router-link>
    </div>

    <transition name="slide-fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { getmerchant } from "@/api/apis";

export default {
  data() {
    return {
      merchantData: {} //商家数据
    };
  },
  async created() {
    // await async并不会改变异步语句的执行顺序, await后面的所有代码还是会放到线程的最后(异步区域去执行)
    let res = await getmerchant();
    this.merchantData = res.data.data;
  },
  mounted() {
    //   console.log(document.getElementById('mydiv'))
  }
};
</script>

<style lang="less" scoped>
@base: #2e2f3b;

/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0 ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(50px);
  opacity: 0;
}

.nav-box {
  height: 100%;
  display: flex;
  flex-direction: column;

  .top-box {
    height: 160px;
    background-color: @base;
  }

  .center-box {
    display: flex;
    justify-content: space-around;
    padding: 10px;
  }
}
</style>