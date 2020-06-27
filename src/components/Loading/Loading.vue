<template>
  <transition name="custom-loading-fade">
    <!--loading蒙版-->
    <div v-show="visible" class="custom-loading-mask">
      <!--loading中间的图标-->
      <div class="custom-loading-spinner">
        <i class="custom-spinner-icon" />
        <div class="lds-ring">
          <div />
          <div />
          <div />
          <div />
        </div>
        <!--loading上面显示的文字-->
        <p class="custom-loading-text">{{ text }}</p>
      </div>
    </div>
  </transition>
</template>
<script>
/**
 * @description 使用 Vue.extend 避免有多个 loading 的时候关闭一个 导致全都关闭
 * @description 可以通过js直接调用方法来显示关闭
 * @description loading可以将整个页面全部遮罩起来
 */
export default {
  // props: {
  //   // 是否显示loading
  //   visible: {
  //     type: Boolean,
  //     default: false
  //   },
  //   // loading上面的显示文字
  //   text: {
  //     type: String,
  //     default: ""
  //   }
  // }
  // 改写成 构造函数的方式使用
  data() {
    return {
      text: '加载中...',
      visible: false
    }
  }
}
</script>
<style lang="scss">
.custom-loading-mask {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 2000;
  background-color: rgba(255, 255, 255, 0.9);
  margin: 0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  -webkit-transition: opacity 0.3s;
  transition: opacity 0.3s;

  .lds-ring {
    display: inline-block;
    position: relative;
    width: 40px;
    height: 40px;
  }
  .lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 34px;
    height: 34px;
    margin: 4px;
    border: 2px solid #fff;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #409eff transparent transparent transparent;
  }
  .lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
  }
  .lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
  }
  .lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
