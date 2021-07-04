<template>
  <div>
    <el-row type="flex" justify="space-between" align="top">
      <el-form :model="formData" :inline="true" ref="personForm">
        <el-form-item label="账户状态">
          <el-select v-model="formData.accountStatus" placeholder="全部">
            <el-option label="全部" value="-1"></el-option>
            <el-option label="正常" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="formData.keyWord" placeholder="用户姓名/userId"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" type="primary" @click="submitForm('personForm')"></el-button>
        </el-form-item>
      </el-form>
      <div>
        <el-badge is-dot class="badge-cls" v-bind:hidden="showFilterBadge">
          <el-button type="primary" @click="drawer = true">过滤</el-button>
        </el-badge>
        <el-dropdown trigger="click" v-on:command="handleCommad">
          <el-button type="primary">
            更多操作
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="1">批量注册</el-dropdown-item>
            <el-dropdown-item command="2">验证码查询</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-row>
    <el-table
      :data="tableData"
      style="width: 100%"
      :stripe="true"
      :border="true"
      v-loading="loading"
    >
      <el-table-column prop="uid" label="UserId"></el-table-column>
      <el-table-column label="用户名">
        <template slot-scope="scope">
          <el-button type="text" @click="jumpDedails(scope.row)">{{scope.row.userName}}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="手机"></el-table-column>
      <el-table-column prop="appId" label="用户来源"></el-table-column>
      <el-table-column label="冻结状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.accountStatus === 1" type="success">正常</el-tag>
            <el-tag v-if="scope.row.accountStatus === 0" type="danger">冻结</el-tag>
          </template>
      </el-table-column>
      <el-table-column label="认证状态">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.authenStatus === 1?'已认证':'未认证'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="激活状态">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.activateStatus === 1?'已激活':'未激活'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="registerTime" label="注册时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="changeAccountStatus(scope.row.userName, scope.row.accountStatus)"
          >{{scope.row.accountStatus === 1 ?'冻结': '启用' }}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <UucPagination :total="total" v-on:pagination="pageClick" />

    <el-drawer :visible.sync="drawer" class="drawer-cls">
      <el-form label-width="150px" ref="filterFormRef">
        <el-form-item label="注册手机号">
          <el-input v-model="formData.phone" autocomplete="off" class="filter-input"></el-input>
        </el-form-item>
        <el-form-item label="注册邮箱">
          <el-input v-model="formData.email" autocomplete="off" class="filter-input"></el-input>
        </el-form-item>
        <el-form-item label="用户来源">
            <el-select v-model="formData.appId" filterable placeholder="下拉选择应用" class="filter-input">
                <el-option
                  v-for="item in appChannels"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                </el-option>
            </el-select>
          </el-form-item>
        <el-form-item label="激活状态">
          <el-radio-group v-model="formData.activateStatus">
            <el-radio :label="0">已激活</el-radio>
            <el-radio :label="1">未激活</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="冻结状态">
          <el-radio-group v-model="formData.authenStatus">
            <el-radio :label="0">已认证</el-radio>
            <el-radio :label="1">未认证</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="注册时间" unlink-panels>
          <div class="block">
            <el-date-picker
              v-model="formData.registerTime"
              type="daterange"
              range-separator=","
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              unlink-panels="true"
            ></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="closeFilter">过滤</el-button>
        <el-button @click="resetFilter('filterFormRef')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>

    <el-dialog title="导入数据" :visible.sync="importExcelDialogVisible" width="30%">
      <div class="flex-center">
          <div class="dot"></div><div class="dot-txt"><b>准备数据</b></div>
      </div>
      <div class="margin-txt">所有允许导入的字段请参考模板</div>
      <div class="margin-txt">
        <el-button type="primary" icon="el-icon-download" v-on:click="excelTemplate">下载模版</el-button>
      </div>

      <div class="flex-center">
          <div class="dot"></div><div class="dot-txt"><b>导入数据</b></div>
      </div>
      <div class="margin-txt">支持的文件类型为*.xls, *.xlsx。</div>

      <div class="margin-txt"><FileUpload :uploadUrl="'/user-info/excel/import'" /></div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="importExcelDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>

  <el-dialog title="短信验证码查询" :visible.sync="getCodeByPhoneVisible" width="30%">
      <div style="height:34px">
        <label class="code-label">手机号码:</label><el-input style="width:60%;" v-model="phoneForCode" placeholder="请输入查询手机号"></el-input><el-button style="margin-left:10px" @click="getCodeByPhone" type="primary" icon="el-icon-search"></el-button>
      </div>
      <div style="height:34px; margin-top:10px">
        <label class="code-label">查询结果:</label><p style="vertical-align: middle; line-height: 34px;">{{codeResult}}</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeCodeByPhone">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import usersApi from '@/apis/users'
export default {
  data () {
    return {
      formData: {
        accountStatus: '-1',
        keyWord: '',
        phone: '',
        email: '',
        appId: '',
        activateStatus: '-1',
        authenStatus: '-1',
        registerTime: '',
        pageNum: 1,
        pageSize: 10
      },
      loading: false,
      tableData: [],
      drawer: false,
      direction: 'rtl',
      options: [
        {
          value: '1',
          label: '批量注册'
        },
        {
          value: '2',
          label: '验证码查询'
        }
      ],
      importExcelDialogVisible: false,
      getCodeByPhoneVisible: false,
      total: 0,
      freshAppIdFlag: false,
      appChannels: [],
      phoneForCode: '',
      codeResult: '------'
    }
  },
  methods: {
    getList (param) {
      const request = {}
      if (param !== '' && param.registerTime.length !== 0) {
        if (param.registerTime[0]) {
          request.startTime = param.registerTime[0]
        }
        if (param.registerTime[1]) {
          request.endTime = param.registerTime[1]
        }
      }
      request.accountStatus = param.accountStatus
      request.keyWord = param.keyWord
      request.phone = param.phone
      request.email = param.email
      request.appId = param.appId
      request.activateStatus = param.activateStatus
      request.authenStatus = param.authenStatus
      request.pageNum = param.pageNum
      request.pageSize = param.pageSize
      usersApi
        .personList(request)
        .then((res) => {
          this.loading = false
          this.tableData = res.data.list
          this.total = res.data.total
          this.freshAppIdFlag = !this.freshAppIdFlag
        })
        .catch(() => {
          this.loading = false
        })
    },
    pageClick ({ pageIndex = 1, pageSize = 10, refresh = false }) {
      this.formData.pageNum = pageIndex
      this.formData.pageSize = pageSize
      this.loading = true
      if (refresh) {
        Object.keys(this.formData).map(
          (item) => (this.formData[item] = undefined)
        )
      }
      // const jsonData = !refresh ? this.formData : null
      this.getList(this.formData)
    },
    freeze (userName) {
      this.$confirm('是否冻结用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        usersApi
          .freeze(userName)
          .then((res) => {
            if (res.code === 0) {
              this.$message({
                type: 'success',
                message: '冻结成功!'
              })
              this.getList(this.formData)
            }
          })
          .catch(() => {
            this.loading = false
          })
      })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取启用'
          })
        })
    },
    unfreeze (userName) {
      this.$confirm('是否启用用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          usersApi.unfreeze(userName).then((res) => {
            if (res.code === 0) {
              this.$message({
                type: 'success',
                message: '启用成功!'
              })
              this.getList(this.formData)
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消启用'
          })
        })
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        this.loading = true
        if (valid) {
          this.getList(this.formData)
        } else {
          return false
        }
      })
    },
    accountStatusFormatter (row, column) {
      if (row.accountStatus === 1) {
        return '正常'
      }
      return '冻结'
    },
    authenStatusFormatter (row, column) {
      if (row.authenStatus === 1) {
        return '已认证'
      }
      return '未认证'
    },
    changeAccountStatus (userName, accountStatus) {
      if (accountStatus === 1) {
        this.freeze(userName)
      } else {
        this.unfreeze(userName)
      }
    },
    resetFilter (forName) {
      this.formData.phone = ''
      this.formData.email = ''
      this.formData.appId = ''
      this.formData.activateStatus = '-1'
      this.formData.authenStatus = '-1'
      this.formData.registerTime = ''
    },
    closeFilter () {
      this.drawer = false
      this.getList(this.formData)
    },
    handleCommad: function (cmd) {
      if (cmd === '1') {
        this.importExcelDialogVisible = true
      }
      if (cmd === '2') {
        this.getCodeByPhoneVisible = true
      }
    },
    jumpDedails: function (row) {
      this.$router.push({
        path:
          '/users/personAccountDetails?uid=' +
          row.uid +
          '&accountStatus=' +
          row.accountStatus +
          '&authenStatus=' +
          row.authenStatus
      })
    },
    excelTemplate () {
      usersApi.excelTemplate()
    },
    getCodeByPhone () {
      if (this.phoneForCode === null || this.phoneForCode === undefined || this.phoneForCode.length < 11 || this.phoneForCode.length > 20) {
        this.$message({
          showClose: true,
          message: '电话号码非法',
          type: 'error'
        })
        return
      }
      usersApi.getCodeByPhone(this.phoneForCode)
        .then(res => {
          this.codeResult = res.data.authCode
        })
    },
    closeCodeByPhone () {
      this.phoneForCode = ''
      this.codeResult = '------'
      this.getCodeByPhoneVisible = false
    }
  },
  created () {
    this.getList('')
    const appChannels = []
    usersApi.appChannelsList()
      .then((res) => {
        res.data.forEach(function (item) {
          appChannels.push({
            label: item.appName,
            value: item.appId
          })
        })
      })
    this.appChannels = appChannels
  },
  computed: {
    showFilterBadge: function () {
      const flag =
        this.formData.phone === '' &&
        this.formData.email === '' &&
        this.formData.appId === '' &&
        this.formData.activateStatus === '-1' &&
        this.formData.authenStatus === '-1' &&
        this.formData.registerTime.length === 0
      return flag
    }
  },
  watch: {
    freshAppIdFlag () {
      usersApi.appChannelsMap()
        .then(res => {
          this.tableData.forEach(function (item) {
            const appName = res.data[item.appId]
            if (appName) {
              item.appId = appName
            }
          })
        })
    }
  }
}
</script>

<style>
.drawer-cls {
  position: absolute;
  top: 120px;
  overflow: auto;
  height: 600px;
}
.badge-cls {
  margin-right: 10px;
}
.flex-center{
  display: flex;
  align-items: center;
}
.dot{
  width:10px;
  height:10px;
  border-radius:50%;
  background:#888888;
}
.dot-txt{
  font-size: 15px;
  margin-left:10px
}
.margin-txt{
  margin:20px 0px 20px 20px;
}
.filter-input{
  width:60%
}
.code-label{
  line-height: 34px;
  display: inline-block;
  text-align: right;
  vertical-align: middle;
  float: left;
  font-size: 14px;
  color: #606266;
  padding: 0 12px 0 0;
}
</style>
