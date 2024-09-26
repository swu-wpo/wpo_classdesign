<template>
  <div>
    <el-row type="flex" justify="space-between">
      <el-row >
        <el-col :span="13">
          <el-select style="width:150px" v-model="enterpriseQuery1.enterpriseState" placeholder="请选择状态">
            <el-option label="全部状态" value=""></el-option>
            <el-option label="正常" value="1"></el-option>
            <el-option label="禁用" value="2"></el-option>
            <el-option label="永久禁用" value="3"></el-option>
            <el-option label="注销" value="4"></el-option>
          </el-select>
        </el-col>
        <el-col :span="11">
          <el-select style="width:150px" v-model="enterpriseQuery1.auditState" placeholder="请选择认证状态">
            <el-option label="全部状态（认证）" value=""></el-option>
            <el-option label="待审核" value="1"></el-option>
            <el-option label="审核通过" value="2"></el-option>
            <el-option label="审核不通过" value="3"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-form :inline="true" >
        <el-form-item label>
          <el-input style="width:150px" v-model="enterpriseQuery1.enterpriseKey" placeholder="企业名称/企业ID" value=""></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="serachByParams"></el-button>
        </el-form-item>
        <el-form-item label>
          <el-button icon="el-icon-data-analysis" @click="drawer = true">过滤</el-button>
        </el-form-item>
        <el-form-item label>
          <el-select style="width:150px" v-model="enterpriseQuery1.enterpriseField" placeholder="显示列">
            <el-option label="显示所有列" value=""></el-option>
            <el-option label="企业ID" value="1"></el-option>
            <el-option label="企业名称" value="2"></el-option>
            <el-option label="所属应用" value="3"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-row>
    <el-table
      :data="tableData"
      style="width: 100%"
      :stripe="true"
      :border="true"
      v-loading="loading"
      >
      <el-table-column prop="id" label="企业ID"></el-table-column>
      <el-table-column label="企业名称">
         <template slot-scope="scope">
          <el-button type="text" @click="goEnterpriseDedails(scope.row)">{{scope.row.enterpriseName}}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="appId" label="所属应用ID"></el-table-column>
      <el-table-column prop="userId" label="所属长虹账号"></el-table-column>
      <el-table-column label="状态" >
        <template slot-scope="scope">
          <span >{{scope.row.enterpriseState | enterpriseStateFormat}}</span>
        </template>
      </el-table-column>
      <el-table-column label="认证状态" >
        <template slot-scope="scope">
          <span >{{scope.row.auditState | auditStateFormat}}</span>
        </template>
      </el-table-column>
      <el-table-column  label="创建时间">
        <template slot-scope="scope">
          <span >{{scope.row.createTime | formatDate}}</span>
        </template></el-table-column>
      <el-table-column prop="freez" label="操作" >
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="changeFreezStatus(scope.row.id,scope.row.freez)"
          >{{scope.row.freez === 1 ?'冻结': '解冻' }}</el-button>
        </template>
      </el-table-column>
    </el-table>
<UucPagination :total="total" @pagination="serachByParams" />

<el-drawer
  :visible.sync="drawer"
  custom-class="demo-drawer"
  size="35%"
  ref="drawer"
  class="enterprise-drawer-cls">
   <el-form label-width="80px" ref="filterFormRef">
        <el-form-item label="企业名称">
          <el-input v-model="drawer_query.enterpriseName" :style="'width:280px'" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="drawer_query.registerTel" :style="'width:280px'" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="企业类型">
          <el-radio-group v-model="drawer_query.enterpriseType" :style="'width:350px'" >
            <el-radio :label="1">企业</el-radio>
            <el-radio :label="2">行政单位</el-radio>
            <el-radio :label="3">其他</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :style="'width:100px'" label="所属应用ID">
          <el-input v-model="drawer_query.appId" :style="'width:280px'" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="认证状态" >
          <el-radio-group v-model="drawer_query.auditState" :style="'width:350px'" >
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核不通过</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :style="'height:70px'" label="状态">
          <el-radio-group v-model="drawer_query.enterpriseState" :style="'width:350px'" >
            <el-radio :label="1">正常</el-radio>
            <el-radio :label="2">禁用</el-radio>
          </el-radio-group>
          <el-radio-group v-model="drawer_query.enterpriseState" :style="'width:350px'" >
            <el-radio :label="3">永久禁用</el-radio>
            <el-radio :label="4">已注销</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="创建时间" unlink-panels :style="'width:350px'" >
          <div class="block"  :style="'width:350px'" >
            <el-date-picker
              v-model="drawer_query.createTime"
              type="daterange" style="width:80%;margin-right:5%"
              range-separator=","
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              unlink-panels="true">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="更新时间" unlink-panels :style="'width:350px'" >
          <div class="block"  :style="'width:350px'" >
            <el-date-picker
              v-model="drawer_query.updateTime"
              type="daterange" style="width:80%;margin-right:5%"
              range-separator=","
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              unlink-panels="true">
            </el-date-picker>
          </div>
        </el-form-item>
      </el-form>
    <div class="demo-drawer__footer">
        <el-button type="text" disabled></el-button>
        <el-button type="text" disabled></el-button>
        <el-button type="primary" @click="closeFilter">过滤</el-button>
        <el-button @click="resetFilter">重置</el-button>
    </div>
</el-drawer>

  </div>
</template>

<script>
import enterpriseApi from '@/apis/enterprise'
export default {
  data () {
    return {
      enterpriseQuery1: {
        enterpriseState: '',
        auditState: '',
        enterpriseKey: '',
        enterpriseField: ''
      },
      drawer_query: {
        enterpriseName: '',
        registerTel: '',
        enterpriseType: '',
        appId: '',
        auditState: '',
        enterpriseState: '',
        createTime: [],
        updateTime: []
      },
      loading: false,
      tableData: [],
      total: 0,
      pageIndex: 1,
      pageSize: 10,
      direction: 'rtl',
      drawer: false,
      formLabelWidth: '80px'
    }
  },
  methods: {
    getEnterpriseList () {
      this.loading = true
      const reqParams = {}
      reqParams.page = this.pageIndex
      reqParams.size = this.pageSize
      reqParams.enterpriseState = this.enterpriseQuery1.enterpriseState
      reqParams.auditState = this.enterpriseQuery1.auditState
      reqParams.enterpriseKey = this.enterpriseQuery1.enterpriseKey
      enterpriseApi.getEnterpriseList(reqParams)
        .then((res) => {
          this.loading = false
          this.tableData = res.data.list
          this.total = res.data.total
        })
        .catch(() => {
          this.loading = false
        })
    },
    serachByParams ({ pageIndex = 1, pageSize = 10, refresh = false }) {
      this.pageIndex = pageIndex
      this.pageSize = pageSize
      const reqParams = {}
      reqParams.page = this.pageIndex
      reqParams.size = this.pageSize
      reqParams.enterpriseState = this.enterpriseQuery1.enterpriseState
      reqParams.auditState = this.enterpriseQuery1.auditState
      reqParams.enterpriseKey = this.enterpriseQuery1.enterpriseKey
      enterpriseApi.getEnterpriseList(reqParams)
        .then((res) => {
          this.loading = false
          this.tableData = res.data.list
          this.total = res.data.total
        })
        .catch(() => {
          this.loading = false
        })
    },
    serachByAllParams () {
      const reqParams = {}
      reqParams.page = 1
      reqParams.size = 10
      reqParams.enterpriseName = this.drawer_query.enterpriseName
      reqParams.registerTel = this.drawer_query.registerTel
      reqParams.enterpriseType = this.drawer_query.enterpriseType
      reqParams.appId = this.drawer_query.appId
      reqParams.auditState = this.drawer_query.auditState
      reqParams.enterpriseState = this.drawer_query.enterpriseState
      if (this.drawer_query.createTime != null) {
        reqParams.createTimeStart = this.drawer_query.createTime[0]
        reqParams.createTimeEnd = this.drawer_query.createTime[1]
      }
      if (this.drawer_query.updateTime != null) {
        reqParams.updateTimeStart = this.drawer_query.updateTime[0]
        reqParams.updateTimeEnd = this.drawer_query.updateTime[1]
      }
      enterpriseApi.getEnterpriseList(reqParams)
        .then((res) => {
          this.loading = false
          this.tableData = res.data.list
          this.total = res.data.total
        })
        .catch(() => {
          this.loading = false
        })
    },
    changeFreezStatus (id, status) {
      var act = '冻结'
      if (status === 0) {
        act = '解冻'
        status = false
      } else {
        status = true
      }
      this.$confirm('是否' + act + '企业?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const req = {}
        req.frozen = status
        req.operator = 'mgtAdmin'
        enterpriseApi.changeFreezStatus(id, req)
          .then((res) => {
            this.loading = false
            this.getEnterpriseList()
          })
          .catch(() => {
            this.loading = false
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取启用'
        })
      })
    },
    closeFilter () {
      this.drawer = false
      this.serachByAllParams()
    },
    resetFilter () {
      this.drawer_query.enterpriseName = ''
      this.drawer_query.registerTel = ''
      this.drawer_query.enterpriseType = ''
      this.drawer_query.appId = ''
      this.drawer_query.auditState = ''
      this.drawer_query.enterpriseState = ''
      this.drawer_query.createTime = []
      this.drawer_query.updateTime = []
    },
    goEnterpriseDedails (row) {
      this.$router.push({
        path: '/enterprise/EnterpriseDetail?id=' + row.id + '&freez=' + row.freez
      })
    }
  },
  created () {
    this.getEnterpriseList()
  },
  computed: {
  },
  filters: {
    formatDate: function (value) {
      const date = new Date(value)
      const y = date.getFullYear()
      let MM = date.getMonth() + 1
      MM = MM < 10 ? ('0' + MM) : MM
      let d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      let h = date.getHours()
      h = h < 10 ? ('0' + h) : h
      let m = date.getMinutes()
      m = m < 10 ? ('0' + m) : m
      let s = date.getSeconds()
      s = s < 10 ? ('0' + s) : s
      return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s
    },
    auditStateFormat: function (val) {
      if (val === 1) {
        return '待审核'
      }
      if (val === 2) {
        return '审核通过'
      } else {
        return '审核不通过'
      }
    },
    enterpriseStateFormat: function (val) {
      if (val === 1) {
        return '正常'
      }
      if (val === 2) {
        return '禁用'
      }
      if (val === 3) {
        return '永久禁用'
      } else {
        return '已注销'
      }
    },
    tenantFreezFormat: function (val) {
      if (val === 0) {
        return '解冻'
      } else {
        return '冻结'
      }
    }
  }
}
</script>

<style>
 .enterprise-drawer-cls{
   position: absolute;
   top:70px;
   overflow: right;
   height: 700px;
   outline: 0 !important;
 }
</style>
