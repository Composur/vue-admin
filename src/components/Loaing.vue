<template>
  <transition name="custom-loading-fade">
    <!--loading蒙版-->
    <div v-show="visible" class="custom-loading-mask">
      <!--loading中间的图标-->
      <div class="custom-loading-spinner">
        <i class="custom-spinner-icon"></i>
        <!--loading上面显示的文字-->
        <p class="custom-loading-text">{{ text }}</p>
      </div>
    </div>
  </transition>
</template>
<script>
/**
 * @description 使用 Vue.extend 避免有多个 loading 的时候关闭一个 导致全都关闭
 */
export default {
  props: {
    // 是否显示loading
    visible: {
      type: Boolean,
      default: false
    },
    // loading上面的显示文字
    text: {
      type: String,
      default: ""
    }
  }
};
</script>
