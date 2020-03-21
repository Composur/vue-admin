<template>
<div>
  <div class="table-top">
    <el-button class="item" @click="handleAddClick" type="primary" size="mini" icon="el-icon-circle-plus">新增</el-button>
  </div>
  <div>
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="username" label="用户名">
      </el-table-column>
      <el-table-column prop="name" label="角色">
      </el-table-column>
      <el-table-column label="创建日期">
        <template slot-scope="scope">
          {{ scope.row.create_time | parseTime('{y}-{m}-{d}') }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini">查看</el-button>
          <el-button @click="handleEditClick(scope.row)" type="primary" size="mini" icon="el-icon-edit">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <el-dialog title="新增用户" :visible.sync="centerDialogVisible">
    <el-form ref="form" :model="form" :rules="addUserRules">
      <el-form-item label="用户名：" prop="username">
        <el-input v-model="form.username" type="text"  ref="username" ></el-input>
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input v-model="form.password" type="password" ref="password" ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="centerDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="addUser" :loading="addUserBtnLoading">确 定</el-button>
    </span>
  </el-dialog>
</div>
</template>

<script>
import {
  getUsers,addUser
} from '@/api/user'
export default {
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.length<6) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      list: null,
      listLoading: true,
      addUserBtnLoading:false,
      centerDialogVisible: false,
      form: {
        username: '',
        password: ''
      },
      addUserRules: {
        username: [{
          required: true,
          trigger: 'blur',
          validator: validateUsername
        }],
        password: [{
          required: true,
          trigger: 'blur',
          validator: validatePassword
        }]
      }
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      const {
        data
      } = await getUsers()
      this.list = data.users
      this.roles = data.roles
    },
    handleEditClick(rowData) {
      console.log(rowData)
    },
    handleAddClick() {
      // alert('add')
      this.centerDialogVisible = true
    },
    addUser() {
      this.$refs.form.validate( async (valid) => {
          if (valid) {
            this.addUserBtnLoading = true
           await addUser(this.form)
           this.addUserBtnLoading = true
           this.centerDialogVisible = false
           this.$refs.form.resetFields()
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

.table-top {
  border: 1px solid red;
  @include clearfix;

  .item {
    float: right;
  }
}
</style>
