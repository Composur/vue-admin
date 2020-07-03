<template>
  <div class="rate-content">
    <input type="radio" name="rate">
    <input type="radio" name="rate">
    <input type="radio" name="rate">
    <input type="radio" name="rate">
    <input type="radio" name="rate">
  </div>
</template>
<style lang='scss' scoped>
@import url("//at.alicdn.com/t/font_1356455_c5d3d3ohlbq.css");
// 去掉默认样式
input {
  -webkit-appearance: none;
  border: none;
  outline: none;
  cursor: pointer;
}

.rate-content {
  display: flex;
  flex-flow: row-reverse;
  $main: #ffa822; // 高亮颜色
  $basic: #999; // 默认颜色

  // 单个星星
  input[name="rate"] {
    font-family: "iconfont";
    font-size: 30px;
    padding-right: 10px;

    // 默认显示的星星
    &::after {
      content: "\e645";
      color: $basic;
      // 加点颜色过渡效果
      transition: color 0.4s ease;
    }
  }

  input[name="rate"] {
    &:checked,
    &:checked ~ input[name="rate"] {
      &::after {
        content: "\e73c";
        color: $main;
      }
    }
  }
}
</style>
