<template>
  <div>
    <router-view />
    <el-row>
      <el-form :inline="true"
               :model="formKey"
               class="demo-form-inline">
        <el-form-item label="根据关键字筛选：">
          <el-input v-model="formKey.pigSerialNum"
                    placeholder="请输入母猪编号"
                    :clearable="true"></el-input>
        </el-form-item>
        <el-form-item prop="pigHouseName">
          <el-select v-model="formKey.pigHouseName"
                     filterable
                     :clearable="true"
                     placeholder="请选择猪舍编号">
            <el-option v-for="item in houseOptions"
                       :key="item.value"
                       :label="item.label"
                       :value="item.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-date-picker v-model="time"
                          :clearable="true"
                          type="daterange"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="submitQueryParams">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-tabs v-model="activeName"
             @tab-click="handleClick">
      <el-tab-pane label="进食异常"
                   name="first">
        <el-table :data="eatData"
                  style="width: 100%"
                  :stripe="true"
                  :border="true"
                  v-loading="loading">
          <el-table-column prop="pigSerialNum"
                           align="center"
                           label="母猪编号"></el-table-column>
          <el-table-column prop="pigHouseName"
                           align="center"
                           label="猪舍名"></el-table-column>
          <el-table-column prop="location"
                           align="center"
                           label="猪栏编号"></el-table-column>
          <el-table-column prop="totalQuality"
                           label="应进食量"
                           align="center"></el-table-column>
          <el-table-column prop="totalAppetite"
                           label="实际进食量"
                           align="center"></el-table-column>
          <el-table-column prop="differenceValue"
                           label="差异量"
                           align="center"></el-table-column>
          <el-table-column prop="executionDate"
                           label="进食日期"
                           align="center"></el-table-column>
        </el-table>
        <UucPagination :total="eatTotal"
                       @pagination="getEatAbnormalList" />
      </el-tab-pane>
      <el-tab-pane label="体温异常"
                   name="second">
        <el-table :data="tempData"
                  style="width: 100%"
                  :stripe="true"
                  :border="true"
                  v-loading="loading">
          <el-table-column prop="pigSerialNum"
                           align="center"
                           label="母猪编号"></el-table-column>
          <el-table-column prop="pigEarTag"
                           align="center"
                           label="母猪耳标号"></el-table-column>
          <el-table-column prop="pigHouseName"
                           align="center"
                           label="猪舍名"></el-table-column>
          <el-table-column prop="location"
                           align="center"
                           label="猪栏编号"></el-table-column>
          <el-table-column prop="temperature"
                           align="center"
                           label="异常温度"></el-table-column>
          <el-table-column prop="checkTime"
                           align="center"
                           label="检查时间">
            <template slot-scope="scope">
              <span>{{scope.row.checkTime | formatDate}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="tongzhi"
                           align="center"
                           label="状态"></el-table-column>
        </el-table>
        <UucPagination :total="tempTotal"
                       @pagination="getTemperatureAbnormalList" />
      </el-tab-pane>
      <el-tab-pane label="耳标异常"
                   name="third">
        <el-table :data="earData"
                  style="width: 100%"
                  :stripe="true"
                  :border="true"
                  v-loading="loading">
          <el-table-column prop="pigSerialNum"
                           align="center"
                           label="母猪编号"></el-table-column>
          <el-table-column prop="pigHouseName"
                           align="center"
                           label="所在猪舍号"></el-table-column>
          <el-table-column prop="location"
                           align="center"
                           label="猪栏编号"></el-table-column>
          <el-table-column prop="executionDate"
                           align="center"
                           label="异常日期">
          </el-table-column>
          <el-table-column label="详情"
                           align="center">耳标脱落</el-table-column>
        </el-table>
        <UucPagination :total="earTotal"
                       @pagination="getEarAbnormalList" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import pigHouseApi from '@/apis/pigfarm/pigfarmSet'
import abnormalApi from '@/apis/businesstodeal/abnormal'
export default {
  data () {
    return {
      tempData: [],
      eatData: [],
      earData: [],
      houseOptions: [],
      eatTotal: 0,
      earTotal: 0,
      tempTotal: 0,
      pageIndex: 1,
      pageSize: 10,
      loading: false,
      activeName: 'first',
      formKey: {
        pigEarTag: '',
        pigSerialNum: '',
        pigHouseName: ''
      },
      eat: {
        feedingStation: '',
        feedingStationNumber: '',
        location: '',
        pigHouseName: '',
        errorInfo: '',
        tongzhi: ''
      },
      ear: {
        feedingStation: '',
        feedingStationNumber: '',
        location: '',
        pigHouseName: '',
        errorInfo: '',
        tongzhi: ''
      },
      temp: {
        pigEarTag: '',
        temperature: '',
        checkTime: '',
        tongzhi: ''
      },
      time: {}
    }
  },
  methods: {
    submitQueryParams () {
      const reqParams = {}
      reqParams.startTime = this.time[0]
      reqParams.endTime = this.time[1]
      switch (this.activeName) {
        case 'first':
          this.getEatAbnormalList({ pageIndex: 1, pageSize: this.pageSize })
          break
        case 'second':
          this.getTemperatureAbnormalList({ pageIndex: 1, pageSize: this.pageSize })
          break
        case 'third':
          this.getEarAbnormalList({ pageIndex: 1, pageSize: this.pageSize })
          break
        default:
          break
      }
    },
    resetForm () {
      this.formKey = {}
    },
    handleClick (tab, event) {
      switch (tab.name) {
        case 'first':
          this.getEatAbnormalList({ pageIndex: 1, pageSize: this.pageSize })
          break
        case 'second':
          this.getTemperatureAbnormalList({ pageIndex: 1, pageSize: this.pageSize })
          break
        case 'third':
          this.getEarAbnormalList({ pageIndex: 1, pageSize: this.pageSize })
          break
        default:
          break
      }
    },
    getTemperatureAbnormalList ({ pageIndex = 1, pageSize = 10, refresh = false }) {
      this.pageIndex = pageIndex
      this.pageSize = pageSize
      const reqParams = {}
      reqParams.page = this.pageIndex
      reqParams.rows = this.pageSize
      reqParams.startTime = this.time[0]
      reqParams.endTime = this.time[1]
      reqParams.pigSerialNum = this.formKey.pigSerialNum
      reqParams.pigHouseName = this.formKey.pigHouseName
      abnormalApi.tempAbnormalInfoGet(reqParams)
        .then((res) => {
          this.loading = false
          this.tempData = res.page.rows
          this.tempTotal = res.page.total
        })
        .catch(() => {
          this.loading = false
        })
    },
    getEatAbnormalList ({ pageIndex = 1, pageSize = 10, refresh = false }) {
      this.pageIndex = pageIndex
      this.pageSize = pageSize
      const reqParams = {}
      reqParams.page = this.pageIndex
      reqParams.rows = this.pageSize
      reqParams.startTime = this.time[0]
      reqParams.endTime = this.time[1]
      reqParams.pigSerialNum = this.formKey.pigSerialNum
      reqParams.pigHouseName = this.formKey.pigHouseName
      abnormalApi.eatAbnormalInfoGet(reqParams)
        .then((res) => {
          this.loading = false
          this.eatData = res.page.rows
          this.eatTotal = res.page.total
        })
        .catch(() => {
          this.loading = false
        })
    },
    getEarAbnormalList ({ pageIndex = 1, pageSize = 10, refresh = false }) {
      this.pageIndex = pageIndex
      this.pageSize = pageSize
      const reqParams = {}
      reqParams.page = this.pageIndex
      reqParams.rows = this.pageSize
      reqParams.startTime = this.time[0]
      reqParams.endTime = this.time[1]
      reqParams.pigSerialNum = this.formKey.pigSerialNum
      reqParams.pigHouseName = this.formKey.pigHouseName
      abnormalApi.earAbnormalInfoGet(reqParams)
        .then((res) => {
          this.loading = false
          this.earData = res.page.rows
          this.earTotal = res.page.total
        })
        .catch(() => {
          this.loading = false
        })
    },
    getHouseSelectorAll () {
      pigHouseApi.getHouseSelector()
        .then((res) => {
          this.loading = false
          this.houseOptions = res.data
        })
        .catch(() => {
          this.loading = false
        })
    }
  },
  created () {
    this.time = this.timeDefault
    this.getHouseSelectorAll()
    this.getEatAbnormalList({ pageIndex: 1, pageSize: this.pageSize })
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
  },
  computed: {
    timeDefault () {
      const date = new Date()
      let defalutStartTime = date.getTime() - 1 * 24 * 3600 * 1000
      let defalutEndTime = date.getTime()
      const startDateNs = new Date(defalutStartTime)
      const endDateNs = new Date(defalutEndTime)
      defalutStartTime = startDateNs.getFullYear() + '-' + ((startDateNs.getMonth() + 1) >= 10 ? (startDateNs.getMonth() + 1) : '0' + (startDateNs.getMonth() + 1)) + '-' + (startDateNs.getDate() >= 10 ? startDateNs.getDate() : '0' + startDateNs.getDate())
      defalutEndTime = endDateNs.getFullYear() + '-' + ((endDateNs.getMonth() + 1) >= 10 ? (endDateNs.getMonth() + 1) : '0' + (endDateNs.getMonth() + 1)) + '-' + (endDateNs.getDate() >= 10 ? endDateNs.getDate() : '0' + endDateNs.getDate())
      return [defalutStartTime, defalutEndTime]
    }
  }
}
</script>
