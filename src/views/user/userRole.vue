<template>
<div>
  <div class="table-top">
    <el-button class="item" @click="handleAddClick" type="primary" size="mini" icon="el-icon-circle-plus">新增角色</el-button>
  </div>
  <div>
    <div class="table-container">
      <el-table v-loading="listLoading" element-loading-text="Loading" :data="tableLists" border style="width: 100%">
        <el-table-column type="index" label="序号" center width='120'>
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
            <el-button @click="getTreeData(scope.row)" type="primary" size="mini">编辑</el-button>
            <el-button v-if="scope.row.username!=='admin'" @click="handleDeleteClick(scope.row)" type="danger" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- <pagination class="pagination" @update:page='pagination.currentPage = $event' @update:limit='pagination.pageSize=$event' :page='pagination.currentPage' :limit='pagination.pageSize' :total='pageCount' /> -->
      <pagination class="pagination" :page.sync='pagination.currentPage' :limit.sync='pagination.pageSize' :total='pageCount' />
    </div>
  </div>
  <el-dialog title="新增角色" :visible.sync="centerDialogVisible">
    <el-form ref="form" :model="form" :rules="addUserRules">
      <el-form-item label="角色名称：" prop="rolename">
        <el-input v-model="form.rolename" type="text"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="centerDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="addUser" :loading="addUserBtnLoading">确 定</el-button>
    </span>
  </el-dialog>
  <el-dialog title="权限管理" :visible.sync="authDialogVisible">
    <el-tree ref='tree' :data="treeData"  show-checkbox node-key="path" :default-expanded-keys="[2, 3]" :default-checked-keys="[5]">
    </el-tree>
    <span slot="footer" class="dialog-footer">
      <el-button @click="authDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="addRoles" :loading="addUserBtnLoading">确 定</el-button>
    </span>
  </el-dialog>
</div>
</template>

<script>
import {
  roleAdd,addAuthLists,
  getRoleLists
} from '@/api/user'
import {
  constantRoutes
} from '@/router'
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
      authDialogVisible: false,
      currentRole:null,// 需要配置权限的角色
      treeData: [],
      pagination: {
        pageSize: 5,
        currentPage: 1,
      },
      form: {
        rolename: '',
      },
      addUserRules: {
        rolename: [{
          required: true,
          trigger: 'blur',
          validator: validateUsername
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
    },
  },
  methods: {
    async getUserList() {
      const {
        data
      } = await getRoleLists()
      this.list = data
      this.listLoading = false
    },
    handleEditClick(rowData) {
      console.log(rowData)
    },
    handleAddClick() {
      this.centerDialogVisible = true
    },
    addUser() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.addUserBtnLoading = true
          roleAdd({
            roleName: this.form.rolename
          }).then(res => {
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
    },
    getTreeData(role) {
      this.currentRole = role
      this.authDialogVisible = true
      const treeData = this.filterTreeData(constantRoutes)
      this.treeData = treeData.filter(item => {
        if (item) {
          return item
        }
      })
    },
    filterTreeData(arr) {
      return arr.map(item => {
        if (item.hidden) return
        // item.label = item.meta.title?item.meta.title:item.redirect
        item.label = item.redirect
        if (item.children) {
          this.filterTreeData(item.children)
        }
        return item
      })
    },
    async addRoles() {
      this.currentRole.menus = this.$refs.tree.getCheckedNodes()
      this.currentRole.auth_name = this.currentRole.name
      const res = await addAuthLists(this.currentRole)
      this.authDialogVisible = false
    },
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
    margin: 0 4px;
  }
}

.table-container {
  @include clearfix;

  .pagination {
    float: right;
  }
}
</style>
