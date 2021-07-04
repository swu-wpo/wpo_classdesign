<template>
  <div>
    <router-view />
    <el-form :inline="true"
             :model="devTroubleInfo"
             ref="devTroubleInfo"
             class="demo-form-inline">
      <el-form-item label="根据关键字筛选："
                    prop="feedingStationNumber">
        <el-input v-model="devTroubleInfo.feedingStationNumber"
                  placeholder="请输入饲喂站编号"
                  :clearable="true"></el-input>
      </el-form-item>
      <el-form-item prop="pigHouseName">
        <el-select v-model="devTroubleInfo.pigHouseName"
                   :clearable="true"
                   placeholder="请选择猪舍编号">
          <el-option v-for="item in houseOptions"
                     :key="item.value"
                     :label="item.label"
                     :value="item.label">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="partCode">
        <el-select v-model="devTroubleInfo.partCode"
                   :clearable="true"
                   placeholder="请选择故障部件">
          <el-option v-for="item in partCodeListOptions"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="queryForm">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-row>
      <el-table :data="tableData"
                border
                stripe
                :show-overflow-tooltip="true"
                v-loading="loading"
                style="width: 100%">
        <el-table-column label="饲喂站编号"
                         align="center"
                         prop='feedingStationNumber'>
          <template slot-scope="scope">
            <span>{{scope.row.feedingStationNumber}}</span>
          </template>
        </el-table-column>
        <el-table-column label="猪舍编号"
                         align="center"
                         prop='pigHouseName'>
          <template slot-scope="scope">
            <span>{{scope.row.pigHouseName}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="饲喂站位置"
                         prop='location'>
          <template slot-scope="scope">
            <span>{{scope.row.location}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="故障部件"
                         prop='partDes'>
          <template slot-scope="scope">
            <span>{{scope.row.partDes}}</span>
          </template>
        </el-table-column>
        <el-table-column label="故障信息"
                         align="center"
                         prop='description'>
          <template slot-scope="scope">
            <span>{{scope.row.description}}</span>
          </template>
        </el-table-column>
        <el-table-column label="故障时间"
                         align="center"
                         prop='createTime'
                         width="160px">
          <template slot-scope="scope">
            <span>{{scope.row.createTime | formatDate}}</span>
          </template>
        </el-table-column>
        <el-table-column label="上报时间"
                         align="center"
                         prop='createTime'
                         width="160px">
          <template slot-scope="scope">
            <span>{{scope.row.createTime | formatDate}}</span>
          </template>
        </el-table-column>
        <el-table-column label="处理标识"
                         align="center"
                         prop='dealFlag'>
          <template slot-scope="scope">
            <span>{{scope.row.dealFlag===("1"|| 1) ? "已处理":"未处理"}}</span>
          </template>
        </el-table-column>
        <el-table-column label="通知人处理"
                         align="center"
                         prop="tongzhi">
          <template slot-scope="scope">
            <span>{{scope.row.tongzhi}}</span>
          </template>
        </el-table-column>
      </el-table>
      <UucPagination :total="devTroubleTotal"
                     @pagination="getDevTroubleList" />
    </el-row>

  </div>
</template>

<script>
import devTroubleApi from '@/apis/businesstodeal/devtrouble'
import pigHouseApi from '@/apis/pigfarm/pigfarmSet'
export default {
  data () {
    return {
      loading: false, // 加载
      stationOptions: '', // 饲喂站输入
      houseOptions: [], // 猪舍选择
      pigCircleOptions: [], // 猪圈选择
      devTroubleTotal: 0, // 记录条数
      pageIndex: 1,
      pageSize: 10,
      partCodeListOptions: [], // 部件
      devTroubleInfo: {
        feedingStationNumber: '', // 饲喂站出厂编号
        pigHouseName: '', // 所在猪舍
        location: '', // 饲喂站位置
        partCode: '', // 故障部件code
        partDes: '', // 故障部件
        description: '', // 故障信息
        creatTime: '', // 故障时间
        updateTime: '', // 上报时间
        dealFlag: '', // 处理标识
        tongzhi: '', // 通知人处理
        pigCircleId: '' // 猪圈号 未找到
      },
      tableData: []
    }
  },
  computed: {
  },
  methods: {
    // 是否为空
    isEmpty (arr) {
      if (arr.length === 0) {
        return true
      } else {
        return false
      }
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
    },
    getDevTroubleList ({ pageIndex = 1, pageSize = 10, refresh = false }) {
      this.pageIndex = pageIndex
      this.pageSize = pageSize
      const reqParams = {}
      reqParams.page = this.pageIndex
      reqParams.rows = this.pageSize
      reqParams.feedingStationNumber = this.devTroubleInfo.feedingStationNumber
      reqParams.pigHouseName = this.devTroubleInfo.pigHouseName
      reqParams.partCode = this.devTroubleInfo.partCode
      devTroubleApi.devTroubleInfo(reqParams)
        .then((res) => {
          this.loading = false
          this.tableData = res.page.rows
          this.devTroubleTotal = res.page.total
        })
        .catch(() => {
          this.loading = false
        })
    },
    resetForm () {
      this.devTroubleInfo = {}
    },
    getPartSelectorAll () {
      pigHouseApi.getPartSelector()
        .then((res) => {
          this.loading = false
          this.partCodeListOptions = res.data
        })
        .catch(() => {
          this.loading = false
        })
    },
    queryForm () {
      this.getDevTroubleList({ pageIndex: this.pageIndex, pageSize: this.pageSize })
    }
  },
  created () {
    this.getDevTroubleList({ pageIndex: this.pageIndex, pageSize: this.pageSize })
    this.getHouseSelectorAll()
    this.getPartSelectorAll()
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

<style>
</style>
