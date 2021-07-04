<template>
  <div>
    <el-row type="flex" justify="space-between" align="top">
      <el-form :model="formData" :inline="true">
        <el-form-item label="状态">
          <el-select v-model="formData.status" placeholder="全部">
            <el-option label="全部" value></el-option>
            <el-option label="正常" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="formData.keyWord" placeholder="姓名/电话"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" type="primary" @click="submit"></el-button>
        </el-form-item>
      </el-form>
      <div style="display: flex">
        <AddOperationComponent @refreshPage="getList" v-on:listenChildEvent="operateSuccessDo" />
      </div>
    </el-row>
    <div v-loading="loading">
      <el-table :data="tableData" style="width: 100%" :stripe="true" :border="true">
        <el-table-column type="index" width="50" label="序号"></el-table-column>
        <el-table-column prop="username" label="账号"></el-table-column>
        <el-table-column prop="chname" label="姓名"></el-table-column>
        <el-table-column prop="mobile" label="手机号码"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status === 0 ? 'success' : 'danger'" disable-transitions>
              {{scope.row.status === 1 ? '正常':'禁用'}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="changeLockedStatus(scope.row.userId, scope.row.status)">
              {{scope.row.status === 1? '禁用':'启用'}}
            </el-button>
            <UpdateOperationComponent :adminId="scope.row.userId + ''" @refreshPage="operateSuccessDo" />
            <el-button type="text" @click="deleteAmdin(scope.row.userId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <UucPagination :total="total" @pagination="getList" />
    </div>
  </div>
</template>

<script>
import settingApi from '@/apis/setting'
import AddOperationComponent from './components/AddOperation'
import UpdateOperationComponent from './components/UpdateOperation'
export default {
  name: 'Operation',
  components: {
    AddOperationComponent,
    UpdateOperationComponent
  },
  data () {
    return {
      formData: {
        status: undefined,
        keyWord: undefined
      },
      tableData: [],
      total: 0,
      pageIndex: 1,
      pageSize: 10,
      loading: false
    }
  },
  methods: {
    operateSuccessDo (msg) {
      console.log(msg)
      this.getList({ pageIndex: this.pageIndex, pageSize: this.pageSize })
    },
    getList ({ pageIndex = 1, pageSize = 10, refresh = false }) {
      this.pageIndex = pageIndex
      this.pageSize = pageSize
      this.loading = true
      if (refresh) {
        Object.keys(this.formData).map(
          item => (this.formData[item] = undefined)
        )
      }
      // const jsonData = !refresh ? this.formData : null
      settingApi
        .getAdminList({ ...this.formData, page: pageIndex, rows: pageSize })
        .then(res => {
          this.tableData = res.rows
          this.total = res.total
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    submit () {
      this.getList({ pageIndex: this.pageIndex, pageSize: this.pageSize })
    },
    changeLockedStatus (id, status) {
      if (status === 0) {
        // 禁用 所以提示 启用
        this.unstatusAdmin(id)
      } else {
        // 启用  所以提示 禁用
        this.statusAdmin(id)
      }
    },
    statusAdmin (id) {
      this.$confirm('是否禁用管理员?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        settingApi
          .lockedAdmin({ userId: id, status: 0 })
          .then((res) => {
            if (res.code === 0) {
              this.$message({
                type: 'success',
                message: '禁用成功!'
              })
              this.getList(this.formData)
            }
          })
          .catch(() => {
            this.loading = false
          })
      })
    },
    unstatusAdmin (id) {
      this.$confirm('是否启用管理员?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        settingApi
          .lockedAdmin({ userId: id, status: 1 })
          .then((res) => {
            if (res.code === 0) {
              this.$message({
                type: 'success',
                message: '启用成功!'
              })
              this.getList(this.formData)
            }
          })
          .catch(() => {
            this.loading = false
          })
      })
    },
    deleteAmdin (userId) {
      this.$confirm('是否启用管理员?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        settingApi
          .deleteAdmin([userId])
          .then((res) => {
            if (res.code === 0) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.getList(this.formData)
            }
          })
      })
    }
  },
  created () {
    this.getList({})
  }
}
</script>

<style>
</style>
