<template>
  <div>
    <div style="padding-bottom:20px; ">
      <el-row :gutter="20">
        <el-col :span="22">
          <font size = "4"  face="微软雅黑">用户数据概览</font>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-row type="flex" justify="end">
        数据统计日期：{{ getdate() }}
      </el-row>
      <el-table
        :data="tableData"
        style="width: 100%"
        :stripe="true"
        :border="true"
        v-loading="loading"
        >
        <el-table-column prop="createTimeStr" label="日期"></el-table-column>
        <el-table-column prop="registUser" label="新增用户数"></el-table-column>
        <el-table-column prop="aliveUser" label="活跃用户数"></el-table-column>
        <el-table-column prop="totalUser" label="累计注册用户数"></el-table-column>
      </el-table>
      <UucPagination :total="total" @pagination="serachByParams" />
    </div>
  </div>
</template>

<script>
import operationAnalysisApi from '@/apis/operationAnalysis'
export default {
  data () {
    return {
      loading: false,
      pageIndex: 1,
      pageSize: 10,
      tableData: []
    }
  },
  methods: {
    getUserIncrease () {
      const req = {}
      req.pageSize = this.pageSize
      req.pageNum = this.pageIndex
      operationAnalysisApi
        .getUserRegisterByPage(req)
        .then((res) => {
          console.log(res)
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
      reqParams.pageNum = this.pageIndex
      reqParams.pageSize = this.pageSize
      operationAnalysisApi
        .getUserRegisterByPage(reqParams)
        .then((res) => {
          console.log(res)
          this.tableData = res.data.list
          this.total = res.data.total
        })
        .catch(() => {
          this.loading = false
        })
    },
    getdate () {
      var date = new Date()
      var month = date.getMonth() + 1
      var year = date.getFullYear()
      var strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      var currentdate = year + '-' + month + '-' + strDate
      return currentdate
    }
  },
  mounted () {
  },
  created () {
    this.getUserIncrease()
  }
}
</script>
