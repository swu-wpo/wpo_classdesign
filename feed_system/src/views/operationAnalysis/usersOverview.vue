<template>
  <div>
    <div style="padding-bottom:20px; ">
      <el-row :gutter="20">
        <el-col :span="22">
          <font size = "5"  face="微软雅黑">用户数据概览</font>
        </el-col>
        <el-col :span="2">
          <div >
            <el-button type="text" @click="moreRegisterInfos()"><font size = "4"  face="微软雅黑">更多</font></el-button>
          </div></el-col>
      </el-row>
    </div>
    <div style="padding-bottom:20px; box-shadow: 10px 10px 5px #888888">
    <el-row :gutter="40">
      <el-col :span="8">
        <div  class="overview-1">
          <div class="line0">
            <b>累计用户统计</b>
          </div>
          <div class="line1">
             <span class="line1-title">{{userDeadlineStatics.deadline}}:</span><span class="line1-content">{{userDeadlineStatics.totalUser}}人</span>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
         <div  class="overview-2">
           <div class="line0">
            <b>新增用户数</b>
          </div>
          <div class="line1">
             <span class="line1-title">{{userDeadlineStatics.deadline}}:</span><span class="line1-content">{{userDeadlineStatics.addedUser}}人</span>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
          <div  class="overview-3">
           <div class="line0">
            <b>活跃用户数</b>
          </div>
          <div class="line1">
             <span class="line1-title">{{userDeadlineStatics.deadline}}:</span><span class="line1-content">{{userDeadlineStatics.aliveUser}}人</span>
          </div>
        </div>
      </el-col>
    </el-row>
    </div>
    <div style="margin-top:40px; margin-bottom:40px; box-shadow: 10px 10px 5px #888888">
      <el-form  :inline="true">

        <el-form-item label="开始时间">
          <el-date-picker
                v-model="formData.startTime"
                type="date"
                placeholder="选择日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                style="with:100%"
            >
          </el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间">
              <el-date-picker
                v-model="formData.endTime"
                type="date"
                placeholder="选择日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                style="with:100%"
              ></el-date-picker>
          </el-form-item>
          <el-form-item label="渠道">
            <el-select v-model="formData.appId" filterable placeholder="下拉选择应用">
                <el-option
                  v-for="item in appChannels"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="省份">
            <el-select v-model="formData.province" filterable placeholder="下拉选择省份">
                <el-option
                  v-for="item in provinces"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                </el-option>
            </el-select>
          </el-form-item>

          <el-button type="primary" v-on:click="submitUserIncrease">查询</el-button>

        </el-form>
        <div id="userIncreaseChart" style="width: 100%;height:400px;"></div>
    </div>
    <div style="margin-top:40px; margin-bottom:40px; box-shadow: 10px 10px 5px #888888">
    <el-row>
      <el-col :span="16">
        <div id="userChannelChart" style="width: 100%;height:400px;"></div>
      </el-col>
      <el-col :span="8">
        <div id="userTypeChart" style="width: 100%;height:400px;"></div>
      </el-col>
    </el-row>
    </div>
  </div>
</template>

<script>
import operationAnalysisApi from '@/apis/operationAnalysis'
import { getProvince } from '../../utils/localPosition'
export default {
  data () {
    return {
      formData: {
        startTime: '',
        endTime: '',
        appId: '',
        province: ''
      },
      userIncreaseChart: undefined,
      isInitUserIncreaseChartOk: false,
      userChannelChart: undefined,
      isInitUserChannelChartOk: false,
      userTypeChart: undefined,
      isInitUserTypeChartOk: false,
      userDeadlineStatics: {
        deadline: '',
        aliveUser: '',
        totalUser: '',
        addedUser: ''
      },
      provinces: [],
      appChannels: []
    }
  },
  methods: {
    initUserIncreaseChart () {
      this.userIncreaseChart = this.$echarts.init(
        document.getElementById('userIncreaseChart')
      )
      const userIncreaseOption = {
        xAxis: {
          type: 'category',
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [],
            type: 'line'
          }
        ]
      }

      this.userIncreaseChart.setOption(userIncreaseOption)
      this.isInitUserIncreaseChartOk = true
    },
    initUserChannelChart () {
      this.userChannelChart = this.$echarts.init(
        document.getElementById('userChannelChart')
      )
      const userChannelOption = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          type: 'scroll',
          left: 200,
          top: 20,
          bottom: 20,
          data: []
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '30',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: []
          }
        ]
      }
      this.userChannelChart.setOption(userChannelOption)
      this.isInitUserChannelChartOk = true
    },
    initUserTypeChart () {
      this.userTypeChart = this.$echarts.init(
        document.getElementById('userTypeChart')
      )
      const userTypeOption = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          type: 'scroll',
          left: 10,
          top: 20,
          bottom: 20,
          data: []
        },
        series: [
          {
            name: '用户分类',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '30',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: []
          }
        ]
      }
      this.userTypeChart.setOption(userTypeOption)
      this.isInitUserTypeChartOk = true
    },
    submitUserIncrease () {
      operationAnalysisApi
        .getUserIncrementsByTimeBucket(this.formData)
        .then((res) => {
          const xAxisData = []
          const seriesData = []
          res.data.forEach(function (item) {
            xAxisData.unshift(item.time)
            seriesData.unshift(item.num)
          })
          this.userIncreaseChart.setOption({
            xAxis: {
              data: xAxisData
            },
            series: [
              {
                data: seriesData
              }
            ]
          })
        })
        .catch(() => {
          this.loading = false
        })
    },
    moreRegisterInfos () {
      this.$router.push({
        path: '/operations/userStatisticsInfo'
      })
    }
  },
  mounted () {
    this.initUserIncreaseChart()
    this.initUserChannelChart()
    this.initUserTypeChart()
  },
  created () {
    const array = getProvince()
    const provinceOpts = []
    array.forEach(function (item) {
      provinceOpts.push({
        label: item,
        value: item
      })
    })
    this.provinces = provinceOpts
    const appChannels = []
    operationAnalysisApi.getAppChannels()
      .then((res) => {
        res.data.forEach(function (item) {
          appChannels.push({
            label: item.appName,
            value: item.appId
          })
        })
      })
    this.appChannels = appChannels

    operationAnalysisApi
      .getUserDeadlineStatics()
      .then((res) => {
        this.userDeadlineStatics = res.data
      })
      .catch(() => {})
  },
  watch: {
    isInitUserIncreaseChartOk (newVal, oldVal) {
      if (newVal) {
        this.submitUserIncrease()
      }
    },
    isInitUserChannelChartOk (newVal, oldVal) {
      if (newVal) {
        operationAnalysisApi
          .getUserChannelStatistics()
          .then((res) => {
            this.loading = false
            const userChannalLegendData = []
            const userChannalSeriesData = []
            Object.keys(res.data).forEach((key) => {
              userChannalLegendData.unshift(key)
              userChannalSeriesData.unshift({ name: key, value: res.data[key] })
            })
            this.userChannelChart.setOption({
              legend: {
                data: userChannalLegendData
              },
              series: [
                {
                  data: userChannalSeriesData
                }
              ]
            })
          })
          .catch(() => {
            this.loading = false
          })
      }
    },
    isInitUserTypeChartOk (newVal, oldVal) {
      if (newVal) {
        operationAnalysisApi
          .getUserTypeStatistics()
          .then((res) => {
            this.loading = false
            const userTypeLegendData = []
            const userTypeSeriesData = []
            Object.keys(res.data).forEach((key) => {
              userTypeLegendData.unshift(key)
              userTypeSeriesData.unshift({ name: key, value: res.data[key] })
            })
            this.userTypeChart.setOption({
              legend: {
                data: userTypeLegendData
              },
              series: [
                {
                  data: userTypeSeriesData
                }
              ]
            })
          })
          .catch(() => {
            this.loading = false
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.input-class {
  width: 30%;
}
.overview-1 {
  height: 200px;
  background: rgb(0, 195, 255);
  color: azure;
}
.overview-2 {
  height: 200px;
  background: #00ff95;
  color: azure;
}
.overview-3 {
  height: 200px;
  background: #ffee00;
  color: azure;
}
.line0{
  font-size: 40px;
  margin-left: 10px;
}
.line1{
  text-align: center;
  margin-top:20px
}
.line1-title{
  font-size: 25px;
}
.line1-content{
  font-size: 30px;
}
</style>
