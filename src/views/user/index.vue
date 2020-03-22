<template>
<div>
  <div class="table-top">
    <el-button class="item" @click="handleAddClick" type="primary" size="mini" icon="el-icon-circle-plus">新增</el-button>
  </div>
  <div>
    <div class="table-container">
      <el-table :data="tableLists" border style="width: 100%">
        <el-table-column prop="username" label="用户名">
        </el-table-column>
        <el-table-column prop="name" label="角色">
        </el-table-column>
        <el-table-column label="创建日期">
          <template slot-scope="scope">
            {{ scope.row.create_time | parseTime('{y}-{m}-{d}') }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="230">
          <template slot-scope="scope">
            <el-button type="primary" size="mini">查看</el-button>
            <el-button @click="handleEditClick(scope.row)" type="primary" size="mini">编辑</el-button>
            <el-button v-if="scope.row.username!=='admin'" @click="handleDeleteClick(scope.row)" type="danger" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination class="pagination" @update:page='pagination.currentPage=$event' @update:limit='pagination.pageSize=$event' :page='pagination.currentPage' :limit='pagination.pageSize' :total='pageCount' />
    </div>
  </div>
  <el-dialog title="新增用户" :visible.sync="centerDialogVisible">
    <el-form ref="form" :model="form" :rules="addUserRules">
      <el-form-item label="用户名：" prop="username">
        <el-input v-model="form.username" type="text" ref="username"></el-input>
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input v-model="form.password" type="password" ref="password"></el-input>
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
  getUsers,
  addUser,
  deleteUser
} from '@/api/user'
import Pagination from '@/components/Pagination'
export default {
  name: 'userManage',
  components: {
    Pagination
  },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value.length) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (!value.length) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      list: [],
      listLoading: true,
      addUserBtnLoading: false,
      centerDialogVisible: false,
      pagination: {
        pageSize: 5,
        currentPage: 1,
      },
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
  computed: {
    pageCount() {
      return this.list.length
    },
    tableLists() {
      return this.renderTableLists()
    }
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
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.addUserBtnLoading = true
          addUser(this.form).then(res => {
            this.addUserBtnLoading = false
            if (res.status !== 1) {
              this.centerDialogVisible = false
              this.$refs.form.resetFields()
              this.getUserList()
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    async handleDeleteClick(data) {
      const res = await deleteUser({
        _id: data._id
      })
      this.getUserList()
    },
    renderTableLists() {
      const {
        currentPage,
        pageSize
      } = this.pagination
      return this.list.slice((currentPage - 1) * pageSize, currentPage * pageSize)
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

.table-container {
  @include clearfix;

  .pagination {
    float: right;
  }
}
</style>
