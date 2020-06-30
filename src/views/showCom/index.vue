<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>通用Dialog</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="dialog">操作按钮</el-button>
      </div>
      <div class="text item">通过 props $emit 将按钮封装到组件内部，就可以不用重复去写确定和取消事件的代码</div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>通用Loading</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="loadingHandle">操作按钮</el-button>
      </div>
      <div class="box-card-content">
        <div v-loadings="loadingVisible">
          <div class="text item">Vue.extend + 单例模式去实现一个loading</div>
          <ol>
            <li>可以通过js直接调用方法来显示关闭</li>
            <li>loading可以将整个页面全部遮罩起来</li>
          </ol>
        </div>
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>极简评分组件</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <div class="box-card-content">
        <div class="text item">关键代码</div>
        <ol>
          <li>纯 css 如果用需要加入 js 进行改造</li>
          <li>
            翻转显示
            <pre>
        display: flex;
        flex-flow: row-reverse;
        </pre>
          </li>
          <li>
            相连的显示
            <pre>
      input[name="rate"] {
          &:checked,
          &:checked ~ input[name="rate"] {
            &::after {
            content: "\e73c";
            color: $main;
          }
        }
      }
    </pre>
          </li>
        </ol>
        <Rate />
      </div>
    </el-card>
    <ComDialog :visible.sync="visibleDialog" @cancel="cancels" @confirm="confirms">
      <div>dialog</div>
    </ComDialog>
  </div>
</template>
<script>
import ComDialog from '@/components/Dialog'
import Rate from '@/components/Rate'
export default {
  name: 'Components',
  components: {
    ComDialog,
    Rate
  },
  data() {
    return {
      visibleDialog: false,
      loadingVisible: false,
      text: '加载中...'
    }
  },
  methods: {
    dialog() {
      this.visibleDialog = true
    },
    cancels() {
      this.visibleDialog = false
    },
    confirms() {
      this.visibleDialog = false
    },
    loadingHandle() {
      this.loadingVisible = !this.loadingVisible
    }
  }
}
</script>
<style lang='scss' scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
  .box-card-content {
    position: relative;
  }
}
</style>
