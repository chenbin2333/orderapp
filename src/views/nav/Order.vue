<template>
  <div class="order-box">
    <div class="order-left">
      <div>
        <div
          v-for="(i, index) in goodslist"
          :key="i.name"
          :class="{order_left_box: true , selected: curtabindex == index}"
          @click="clickTab(index)"
        >{{ i.name }}</div>
      </div>
    </div>

    <div class="order-right">
      <div>
        <div v-for="(i,index) in goodslist" :key="i.name" :id="index">
          <!-- 标题 -->
          <h4>{{ i.name }}</h4>
          <!-- 儿子 -->
          <div v-for="child in i.foods" :key="child.name">
            <img style="width: 80px" :src="child.imgUrl" />
            <label>{{ child.name }}</label>
          </div>
        </div>
      </div>
    </div>

    <!-- 弹出来的板子 -->
    <transition name="slide-fade1">
      <div class="shopcar-board" v-show="isshow">
        <Shopcar></Shopcar>
      </div>
    </transition>
    <div id="mydiv" class="bottom-box" @click="isshow = !isshow"></div>
  </div>
</template>

<script>
import { getgoodslist } from "@/api/apis";
import BScroll from "better-scroll";
import Shopcar from "./Shopcar";

export default {
  data() {
    return {
      goodslist: [], //商品列表
      curtabindex: 0, //当前选中的索引
      isshow: false //是否显示
    };
  },
  async created() {
    let res = await getgoodslist();
    console.log(res);

    this.goodslist = res.data.goodsList;
  },
  mounted() {
    // 3. 使用  new Scroll(要滚动的DOM容器)
    // 它只是优化滚屏！！！所以你的容器必须原来就有滚动条！！！！容器必须固定高度， overflow: scroll || auto
    // 参数1： DOM容器 || DOM选择器（如果传入字符串，则会自动转换为querySelector）
    // 参数2： 配置对象
    new BScroll(".order-left", {
      click: true //允许滚动面板点击
    });
    this.rightScroll = new BScroll(document.querySelector(".order-right"), {
      click: true, //允许滚动面板点击
      probeType: 3 //实时派发滚动事件
    });

    this.rightScroll.on("scroll", obj => {
      // _y当前滚动距离
      let _y = Math.abs(obj.y);

      // 循环判断区间值， 设置选项卡选中索引
      for (let obj of this.getdivarr) {
        if (_y >= obj.startY && _y < obj.endY) {
          this.curtabindex = obj.index;
          break;
        }
      }
    });
  },
  methods: {
    clickTab(index) {
      // 保存点击的索引
      this.curtabindex = index;

      //点击某个选项卡,则让右侧滚动到对应的div上s
      this.rightScroll.scrollToElement(document.getElementById(index), 600);
    }
  },
  computed: {
    //获取所有div高度数组并拿到区间段值
    getdivarr() {
      console.log("计算属性被运行了！！！！！！！！");
      // [189, 105, 525, 315, 525, 315, 567, 609, 882, 357]
      // 0-189   0
      // 189-294 1
      // 294-819 2

      // 之前div高度总和 -  (之前div高度总和+自己的高度)   当前div索引
      // {startY:  endY:  index:  }

      // 获取div高度?
      let arr = [];
      let total = 0; //累加的高度总和

      for (let i = 0; i < this.goodslist.length; i++) {
        //计算高度和区间段内
        let curDivHeight = document.getElementById(i).offsetHeight;
        arr.push({ startY: total, endY: total + curDivHeight, index: i });
        total += curDivHeight;
      }

      return arr;
    }
  },
  components: {
    Shopcar
  }
};
</script>

<style lang="less" scoped>
@base: #2e2f3b;

/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade1-enter-active {
  transition: all 0.6s ease;
}
.slide-fade1-leave-active {
  transition: all 0.6s ease;
}
.slide-fade1-enter, .slide-fade1-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(300px);
  opacity: 0;
}

.selected {
  background-color: #fff;
}

.order-box {
  flex: 1;
  display: flex;
  overflow: hidden;

  .order-left {
    width: 80px;
    // height: 300px;
    background: #f5f5f5;
    height: 100%;
    overflow: scroll;

    .order_left_box {
      font-size: 14px;
      padding: 10px 10px 20px 10px;
    }
  }
  .order-right {
    flex: 1;
    // background: darkseagreen;
    overflow: scroll;
  }

  //购物车弹出来的面板
  .shopcar-board {
    width: 100%;
    height: 300px;
    background-color: darksalmon;
    position: fixed;
    bottom: 40px;
  }
  .bottom-box {
    width: 100%;
    height: 60px;
    background-color: @base;
    position: fixed;
    bottom: 10px;
    border-radius: 30px;
  }
}
</style>