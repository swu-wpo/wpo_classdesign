<template>
  <div style="width: auto;height: 400px"
       id="main">

  </div>
</template>

<script>
export default {
  // name: '组件名',
  data() {
    return {
      // 搜索条件
      searchTableInfo: '',
      pagesize: 6,
      currpage: 1,
      getSearchInfo: []

    }
  },
  methods: {
    handleCurrentChange(cpage) {
      this.currpage = cpage
    },
    handleSizeChange(psize) {
      this.pagesize = psize
    },
    // 操作多选
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 获取信息
    info() {
      // 这些数据视情况，是你从后端拿来的。
      const Data = [
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-03',
          name: '王二虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-04',
          name: '王二虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },
        {
          date: '2016-05-05',
          name: '王三虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-06',
          name: '王三虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
      this.getSearchInfo = Data
      console.log(this.getSearchInfo)
    },
    echartsInit() {
      // 柱形图
      // 因为初始化echarts 的时候，需要指定的容器 id='main'
      this.$echarts.init(document.getElementById('main')).setOption({
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(220, 220, 220, 0.8)'
          }
        }]
      })
    }
  },
  mounted() {
    this.echartsInit()
  }
}
</script>

<style scoped lang="stylus"></style>
