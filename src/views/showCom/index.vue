<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>通用Dialog</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="dialog">操作按钮</el-button>
      </div>
      <div class="text item">通过 props $emit 将按钮封装到组件内部，就可以不用重复去写确定和取消事件的代码</div>
    </el-card>
    <ComDialog :visible.sync="visibleDialog" @cancel="cancels" @confirm="confirms">
      <div>dialog</div>
    </ComDialog>
  </div>
</template>
<script>
import ComDialog from "@/components/Dialog";
export default {
  name: "Components",
  data() {
    return {
      visibleDialog: false
    };
  },
  components: {
    ComDialog
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