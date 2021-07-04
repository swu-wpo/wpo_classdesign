<template>
  <div>
    <div class="kanban-block">
      <el-row :gutter="40">
        <el-col :span="6">
          <div class="kanban-background">
            <div class="kanban-line0">累计用户数</div>
            <div class="kanban-txt-align kanban-line1"><b>{{kanbanHead.total===undefined?0:kanbanHead.total}}</b></div>
            <div class="kanban-txt-align kanban-line2">截止:{{kanbanHead.deadline}}</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="kanban-background">
            <div class="kanban-line0">新增用户数(本月)</div>
            <div class="kanban-txt-align kanban-line1"><b>{{kanbanHead.monthlyAddedNumber===undefined?0:kanbanHead.monthlyAddedNumber}}</b></div>
            <div class="kanban-txt-align kanban-line2">{{kanbanHead.chainRelativeRatioOfMonthlyAdded===undefined?0:kanbanHead.chainRelativeRatioOfMonthlyAdded}}% 环比增长</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="kanban-background">
            <div class="kanban-line0">DAU</div>
            <div class="kanban-txt-align kanban-line1"><b>{{kanbanHead.dailyActiveNumber===undefined?0:kanbanHead.dailyActiveNumber}}</b></div>
            <div class="kanban-txt-align kanban-line2">{{kanbanHead.chainRelativeRatioOfDailyActive===undefined?0:kanbanHead.chainRelativeRatioOfDailyActive}}% 环比增长</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="kanban-background">
            <div class="kanban-line0">MAU</div>
            <div class="kanban-txt-align kanban-line1"><b>{{kanbanHead.monthlyActiveNumber===undefined?0:kanbanHead.monthlyActiveNumber}}</b></div>
            <div class="kanban-txt-align kanban-line2">{{kanbanHead.chainRelativeRatioOfMonthlyActive===undefined?0:kanbanHead.chainRelativeRatioOfMonthlyActive}}% 环比增长</div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="kanban-block">
      <el-row type="flex" justify="space-between">
        <div class="titile">用户增量趋势</div>
        <div>
          <el-radio-group v-model="addedUserChartForm.type" v-on:change="submitUserAddedStatistics">
            <el-radio-button label="day">日</el-radio-button>
            <el-radio-button label="week">周</el-radio-button>
            <el-radio-button label="month">月</el-radio-button>
          </el-radio-group>
          <el-date-picker
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            v-model="addedUserChartTimeRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :unlink-panels=true
            v-on:change = "submitUserAddedStatistics">
          </el-date-picker>
        </div>
      </el-row>
      <div>
        <div id = "addedUserChart" style="width:100%; height:400px;"></div>
      </div>
    </div>
    <div class="kanban-block">
      <div>
          <el-row :gutter="40">
            <el-col :span="12">
              <el-row type="flex" justify="space-between">
                <div class="titile">用户DAU趋势</div>
                <div>
                  <el-date-picker
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      v-model="DAUUserChartTimeRange"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      :unlink-panels=true
                      v-on:change = "submitDAUUserChart">
                  </el-date-picker>
                </div>
              </el-row>
              <div id = "DAUUserChart" style="width:100%; height:400px;">{{kanbanHead.monthlyActiveNumber===undefined?0:kanbanHead.monthlyActiveNumber}}</div>
            </el-col>
            <el-col :span="12">
              <el-row type="flex" justify="space-between">
                <div class="titile">用户MAU趋势</div>
                <div>
                  <el-date-picker
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      v-model="MAUUserChartTimeRange"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      :unlink-panels=true
                      v-on:change = "submitMAUUserChart">
                  </el-date-picker>
                </div>
              </el-row>
              <div id = "MAUUserChart" style="width:100%; height:400px;">{{kanbanHead.chainRelativeRatioOfMonthlyActive===undefined?0:kanbanHead.chainRelativeRatioOfMonthlyActive}}</div>
            </el-col>
          </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import operationAnalysisApi from '@/apis/operationAnalysis'
export default {
  data () {
    return {
      kanbanHead: {
        deadline: '',
        total: 0,
        monthlyAddedNumber: 0,
        chainRelativeRatioOfMonthlyAdded: 0,
        dailyActiveNumber: 0,
        chainRelativeRatioOfDailyActive: 0,
        monthlyActiveNumber: 0,
        chainRelativeRatioOfMonthlyActive: 0
      },
      addedUserChart: undefined,
      isInitAddedUserChartOk: false,
      addedUserChartForm: {
        type: 'day',
        startTime: '',
        endTime: ''
      },
      addedUserChartTimeRange: [],
      DAUUserChart: undefined,
      isInitDAUUserChartOk: false,
      DAUUserChartForm: {
        startTime: '',
        endTime: '',
        type: 'day'
      },
      DAUUserChartTimeRange: [],
      MAUUserChart: undefined,
      isInitMAUUserChartOk: false,
      MAUUserChartForm: {
        startTime: '',
        endTime: '',
        type: 'month'
      },
      MAUUserChartTimeRange: []

    }
  },
  created () {
    operationAnalysisApi.getTotalActiveAddedNumbers()
      .then((res) => {
        this.kanbanHead = res.data
        console.log(this.kanbanHead)
      })
  },
  mounted () {
    this.initAddedUserChart()
    this.initDAUUserChart()
    this.initMAUUserChart()
  },
  methods: {
    initAddedUserChart () {
      this.addedUserChart = this.$echarts.init(
        document.getElementById('addedUserChart')
      )
      const addedUserChartOption = {
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

      this.addedUserChart.setOption(addedUserChartOption)
      this.isInitAddedUserChartOk = true
    },
    submitUserAddedStatistics () {
      if (this.addedUserChartTimeRange !== null && this.addedUserChartTimeRange.length !== 0) {
        this.addedUserChartForm.startTime = this.addedUserChartTimeRange[0]
        this.addedUserChartForm.endTime = this.addedUserChartTimeRange[1]
      }
      operationAnalysisApi.getUserAddedStatistics(this.addedUserChartForm)
        .then((res) => {
          const xAxisData = []
          const seriesData = []
          res.data.forEach(function (item) {
            xAxisData.unshift(item.time)
            seriesData.unshift(item.num)
          })
          this.addedUserChart.setOption({
            xAxis: {
              data: xAxisData
            },
            series: [{
              data: seriesData
            }]
          })
        })
    },
    initDAUUserChart () {
      this.DAUUserChart = this.$echarts.init(
        document.getElementById('DAUUserChart')
      )
      const DAUUserChartOption = {
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

      this.DAUUserChart.setOption(DAUUserChartOption)
      this.isInitDAUUserChartOk = true
    },
    submitDAUUserChart () {
      if (this.DAUUserChartTimeRange !== null && this.DAUUserChartTimeRange.length !== 0) {
        this.DAUUserChartForm.startTime = this.DAUUserChartTimeRange[0]
        this.DAUUserChartForm.endTime = this.DAUUserChartTimeRange[1]
      }
      operationAnalysisApi.getUserActiveStatistics(this.DAUUserChartForm)
        .then((res) => {
          const xAxisData = []
          const seriesData = []
          res.data.forEach(function (item) {
            xAxisData.unshift(item.time)
            seriesData.unshift(item.num)
          })
          this.DAUUserChart.setOption({
            xAxis: {
              data: xAxisData
            },
            series: [{
              data: seriesData
            }]
          })
        })
    },
    initMAUUserChart () {
      this.MAUUserChart = this.$echarts.init(
        document.getElementById('MAUUserChart')
      )
      const MAUUserChartOption = {
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

      this.MAUUserChart.setOption(MAUUserChartOption)
      this.isInitMAUUserChartOk = true
    },
    submitMAUUserChart () {
      if (this.MAUUserChartTimeRange !== null && this.MAUUserChartTimeRange.length !== 0) {
        this.MAUUserChartForm.startTime = this.MAUUserChartTimeRange[0]
        this.MAUUserChartForm.endTime = this.MAUUserChartTimeRange[1]
      }
      operationAnalysisApi.getUserActiveStatistics(this.MAUUserChartForm)
        .then((res) => {
          const xAxisData = []
          const seriesData = []
          res.data.forEach(function (item) {
            xAxisData.unshift(item.time)
            seriesData.unshift(item.num)
          })
          this.MAUUserChart.setOption({
            xAxis: {
              data: xAxisData
            },
            series: [{
              data: seriesData
            }]
          })
        })
    }

  },
  watch: {
    isInitAddedUserChartOk (newVal, oldVal) {
      if (newVal) {
        this.submitUserAddedStatistics()
      }
    },
    isInitDAUUserChartOk (newVal, oldVale) {
      if (newVal) {
        this.submitDAUUserChart()
      }
    },
    isInitMAUUserChartOk (newVal, oldVal) {
      if (newVal) {
        this.submitMAUUserChart()
      }
    }
  }
}
</script>

<style>
.kanban-background{
  height: 150px;
  background:white
}
.kanban-txt-align{
  margin-top:10px;
  text-align: center
}
.kanban-line0{
  margin-left: 10px;
  padding-top: 10px;
  font-size: 20px;
}
.kanban-line1{
  font-size: 30px;
}
.kanban-line2{
  font-size: 20px;
}
.kanban-block{
  padding-bottom:20px;
  margin-top: 20px;
  box-shadow: 10px 10px 5px #888888
}
.titile{
  margin-left: 10px;
  font-size: 20px;
}
</style>
