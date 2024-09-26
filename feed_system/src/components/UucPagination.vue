<template>
  <el-pagination @size-change="handleSizeChange"
                 @current-change="handleCurrentChange"
                 background
                 :page-sizes="[10, 30, 50, 100]"
                 :page-size="10"
                 :layout="hideTotal?noTotal:allLayout"
                 :total="total"
                 :hide-on-single-page="false"
                 style="text-align: right; margin-top: 20px"></el-pagination>
</template>

<script>
export default {
  name: 'UucPagination',
  data () {
    return {
      noTotal: ' sizes, prev, pager, next, jumper',
      allLayout: 'total, sizes, prev, pager, next, jumper',
      pageSize: 10,
      pageIndex: 1
    }
  },
  props: {
    hideTotal: {
      type: Boolean,
      required: false
    },
    total: {
      type: Number,
      required: true
    }
  },
  methods: {
    handleSizeChange (val) {
      this.pageSize = val
      // 重点
      if (this.pageIndex === 1) {
        this.$emit('pagination', { pageSize: val })
      }
    },
    handleCurrentChange (val) {
      this.pageIndex = val
      this.$emit('pagination', { pageIndex: val, pageSize: this.pageSize })
    }
  }
}
</script>

<style>
</style>
