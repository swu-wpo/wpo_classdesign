<template>
<div>
  <el-row :gutter="10">
    <el-col :span="10" style="height=300px">
      <span>企业名称：</span>
        <el-select
            v-model="enterpriseKey"
            filterable
            remote
            reserve-keyword
            placeholder="请输入关键词"
            :remote-method="queryQiyeByKeyword"
            :loading="loading"
            @change="selectUserByNameCn"
            suffix-icon="el-icon-search"
            >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
    </el-col>
    <el-col :span="8" style="height=300px;align-self: end;"  >
      <el-input style="width:300px" v-model="userQuery.userName" placeholder="姓名"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="selectUserByNameCn"></el-button>
    </el-col>
  </el-row>
  <el-row >
    <el-table
      :data="tableData"
      style="width: 100%"
      :stripe="true"
      :border="true"
      v-loading="loading"
      >
      <el-table-column prop="nameCn" label="姓名">
         <template slot-scope="scope">
          <el-button type="text" @click="goMemberDedails(scope.row)">{{scope.row.nameCn}}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="所属企业" :formatter="enterpriseNameFormat">
      </el-table-column>
      <el-table-column prop="uuid" label="绑定长虹账号"></el-table-column>
      <el-table-column prop="status" label="状态" ></el-table-column>
      <el-table-column prop="mobilePhone" label="手机号"></el-table-column>
      <el-table-column prop="chMail" label="邮箱"></el-table-column>
    </el-table>
  </el-row>
  <UucPagination :total="total" @pagination="selectUserByNameCn" />
</div>
</template>

<script>
import enterpriseApi from '@/apis/enterprise'
export default {
  data () {
    return {
      activeName: 'first',
      tableData: [],
      loading: false,
      options: [],
      enterpriseKey: '',
      enterpriseName: '',
      list: [],
      enterpriseNames: [],
      total: 0,
      pageIndex: 1,
      pageSize: 10,
      userDetail: {
      },
      userQuery: {
        userName: ''
      }
    }
  },
  methods: {
    queryQiyeByKeyword (query) {
      if (query !== '') {
        this.loading = true
        /** 根据关键字获取企业名列表 */
        const reqParams = {}
        reqParams.keyword = query
        enterpriseApi.getEnterpriseNamesByKey(reqParams)
          .then((res) => {
            this.loading = false
            this.options = res.data.map(item => {
              return { value: `${item.id}`, label: `${item.enterprise_name}` }
            })
          })
          .catch(() => {
            this.loading = false
          })
      } else {
        this.options = []
      }
    },
    selectUserByNameCn ({ pageIndex = 1, pageSize = 10, refresh = false }) {
      this.pageIndex = pageIndex
      this.pageSize = pageSize
      const reqParams = {}
      reqParams.page = this.pageIndex
      reqParams.pageSize = this.pageSize
      reqParams.enterpriseId = this.enterpriseKey
      reqParams.nameCn = this.userQuery.userName
      enterpriseApi.getUsersByEnterpriseId(reqParams)
        .then((res) => {
          this.loading = false
          this.tableData = res.data.detail
          this.total = res.data.total
        })
        .catch(() => {
          this.loading = false
        })
    },
    enterpriseNameFormat () {
      var selectItem = {}
      selectItem = this.options.find(item => {
        return item.value === this.enterpriseKey
      })
      return selectItem.label
    },
    goMemberDedails (row) {
      this.$router.push({
        path: '/enterprise/MemberDetail?openId=' + row.uuid
      })
    }
  },
  mounted () {
  },
  created () {
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
