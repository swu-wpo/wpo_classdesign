<template>
  <div>
    <el-row>
      <el-table :data="logData"
                style="width: 100%"
                :stripe="true"
                :border="true"
                v-loading="loading">
        <el-table-column prop="username"
                         align="center"
                         label="操作人"></el-table-column>
        <el-table-column prop="operation"
                         align="center"
                         label="操作事项"></el-table-column>
        <el-table-column prop="method"
                         align="center"
                         label="方法"></el-table-column>
        <el-table-column prop="params"
                         align="center"
                         label="参数"></el-table-column>
        <el-table-column prop="time"
                         align="center"
                         label="请求时间（ms）"></el-table-column>
        <el-table-column prop="ip"
                         align="center"
                         label="IP"></el-table-column>
        <el-table-column label="创建时间"
                         align="center">
          <template slot-scope="scope">
            <span>{{scope.row.createDate | formatDate}}</span>
          </template>
        </el-table-column>
      </el-table>
      <UucPagination :total="total"
                     @pagination="getLogs" />
    </el-row>
  </div>

</template>

<script>
import settingApi from '@/apis/setting'
export default {
  data () {
    return {
      loading: false,
      logData: [],
      total: 0,
      pageIndex: 1,
      pageSize: 10
    }
  },
  methods: {
    getLogs ({ pageIndex = 1, pageSize = 10, refresh = false }) {
      this.pageIndex = pageIndex
      this.pageSize = pageSize
      const reqParams = {}
      reqParams.page = this.pageIndex
      reqParams.rows = this.pageSize
      settingApi.getLogs(reqParams)
        .then((res) => {
          console.log(res)
          this.loading = false
          this.logData = res.page.rows
          this.total = res.page.total
        })
        .catch(() => {
          this.loading = false
        })
    }
  },
  mounted () {
  },
  created () {
    this.getLogs({ pageIndex: this.pageIndex, pageSize: this.pageSize })
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
    }
  }
}
</script>
