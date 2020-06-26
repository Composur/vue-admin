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
      <div class="text item">Vue.extend + 单例模式去实现一个loading</div>
      <div class="text item">
        <Loading :visible="loadingVisible" text="加载中" />
      </div>
    </el-card>
    <ComDialog :visible.sync="visibleDialog" @cancel="cancels" @confirm="confirms">
      <div>dialog</div>
    </ComDialog>
  </div>
</template>
<script>
import ComDialog from "@/components/Dialog";
import Loading from '@/components/Loaing'
export default {
  name: "Components",
  data() {
    return {
      visibleDialog: false,
      loadingVisible:false
    };
  },
  components: {
    ComDialog,
    Loading
  },
  methods: {
    dialog() {
      this.visibleDialog = true;
    },
    cancels() {
      this.visibleDialog = false;
    },
    confirms() {
      this.visibleDialog = false;
    },
    loadingHandle() {
      this.loadingVisible = !this.loadingVisible
    }
  }
};
</script>
<style>
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
}
</style>