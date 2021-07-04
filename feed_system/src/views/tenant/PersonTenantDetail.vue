<template>
<div>
  <h3> 租户id：
    <span type="">{{tenantInfo.tenantId}}</span>
    <el-button class="button-align-right" style="float:right"
            @click="changeTenantFreezStatus"
          >{{tenantInfo.freez|tenantFreezFormat}}</el-button>
  </h3>
<el-row   class="el-row">
  <el-col :span="8"><div>租户名称:{{tenantInfo.tenantName}}</div></el-col>
  <el-col :span="8"><div>所属应用:{{tenantInfo.appId}}</div></el-col>
  <el-col :span="8"><div>租户类型:{{tenantInfo.tenantType | typeFormat}}</div></el-col>
</el-row>
<el-row   class="el-row">
  <el-col :span="8"><div>所属长虹账号:{{tenantInfo.owner}}</div></el-col>
  <el-col :span="8"><div>租户拥有者:{{tenantInfo.owner}}</div></el-col>
  <el-col :span="8"><div>租户创建人:{{tenantInfo.createUserId}}</div></el-col>
</el-row>
<el-row   class="el-row">
  <el-col :span="8"><div>状态:{{tenantInfo.status | statusFormat}}</div></el-col>
  <el-col :span="8"><div>创建时间:{{tenantInfo.createTime | formatDate}}</div></el-col>
  <el-col :span="8"><div></div></el-col>
</el-row >
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="租户详情" name='first'>
      <div>
        <h5>用户信息</h5>
        <el-row>
          <el-col :span="8"><div>姓名:{{userDetail.userName}}</div></el-col>
          <el-col :span="8"><div>性别:{{userDetail.sex}}</div></el-col>
          <el-col :span="8"><div>生日:{{userDetail.birthday}}</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="8"><div>学历:</div></el-col>
          <el-col :span="8"><div>毕业学校:{{userDetail.university}}</div></el-col>
          <el-col :span="8"><div>所学专业:{{userDetail.major}}</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="8"><div>QQ:{{userDetail.qq}}</div></el-col>
          <el-col :span="8"><div>微信:{{userDetail.weixin}}</div></el-col>
          <el-col :span="8"><div>微博:{{userDetail.sinaweibo}}</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="8"><div>淘宝:{{userDetail.taobao}}</div></el-col>
          <el-col :span="8"><div>支付宝:{{userDetail.alipay}}</div></el-col>
          <el-col :span="8"><div>血型:{{userDetail.bloodType}}</div></el-col>
        </el-row>
         <el-row>
          <el-col :span="8"><div>兴趣:{{userDetail.interests}}</div></el-col>
          <el-col :span="8"><div>个人介绍:{{userDetail.userDetail}}</div></el-col>
          <el-col :span="8"><div></div></el-col>
        </el-row>
        <el-divider></el-divider>
      </div>
    </el-tab-pane>
    <el-tab-pane label="租户用户" name="second">
      <h5>租户用户列表</h5>
      <el-input style="width:300px" v-model="userQuery.userName" placeholder="姓名" value="adsas"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="getTenantUserByName()"></el-button>
      <el-table
      :data="tableData"
      style="width: 100%"
      :stripe="true"
      :border="true"
      v-loading="loading"
      >
      <el-table-column label="姓名">
         <template slot-scope="scope">
          <el-button type="text">{{scope.row.nameCn}}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="mobilePhone" label="电话号码"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="userId" label="所属长虹账号" >
      </el-table-column>
      <el-table-column prop="role" label="角色"></el-table-column>
      <el-table-column prop="status" label="状态" :formatter="tenantUserStatusFormatter"></el-table-column>
      <el-table-column prop="enable" label="操作" >
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="changeFreezStatus(scope.row.tenantId,scope.row.freez)"
          >{{scope.row.enable === 1 ?'禁用': '启用' }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    </el-tab-pane>
  </el-tabs>

</div>
</template>

<script>

import usersApi from '@/apis/users'
import tenantApi from '@/apis/tenant'

export default {
  data () {
    return {
      activeName: 'first',
      tableData: [],
      loading: false,
      userDetail: {
        uid: '',
        userName: '',
        phone: '',
        registerTime: '',
        updateTime: '',
        emailVerified: '',
        realName: '',
        province: '',
        city: '',
        county: '',
        email: '',
        alipay: '',
        birthday: '',
        bloodType: '',
        changeTimes: '',
        deviceSn: '',
        deviceType: '',
        fingerPrint: '',
        fingerURL: '',
        iconURL: '',
        interests: '',
        ipAddress: '',
        lastLoginIp: '',
        location: '',
        loginTime: '',
        macAddress: '',
        major: '',
        nickName: '',
        openId: '',
        passwordStrength: '',
        personalInfo: '',
        pkgName: '',
        qq: '',
        sex: '',
        sinaweibo: '',
        taobao: '',
        university: '',
        weixin: '',
        authenStatus: '',
        accountStatus: ''
      },
      tenantInfo: {
        appId: '',
        tenantName: '',
        tenantId: '',
        freez: '',
        createUserId: '',
        status: '',
        createTime: '',
        owner: '',
        tenantType: ''
      },
      userQuery: {
        userName: ''
      }
    }
  },
  methods: {
    tenantUserStatusFormatter (row) {
      if (row.status === 1) {
        return '正常'
      }
      if (row.status === 2) {
        return '禁用'
      }
      if (row.status === 4) {
        return '待确认'
      } else {
        return '已注销'
      }
    },
    handleClick (tab, event) {
      console.log(tab, event)
    },
    getDetails (uid) {
      usersApi.personDetails(uid).then((res) => {
        this.loading = false
        this.userDetail = res.data
        console.log(res)
      })
        .catch(() => {
          this.loading = false
        })
    },
    getTenantUsers (tenantId) {
      const requestParam = {}
      requestParam.tenantId = tenantId
      requestParam.userName = this.userQuery.userName
      requestParam.page = 1
      requestParam.size = 100
      tenantApi.getTenantUsers(requestParam)
        .then((res) => {
          this.tableData = res.data.list
          this.total = res.data.total
        })
        .catch(() => {
          this.loading = false
        })
    },
    getTenantUserByName () {
      const requestParam = {}
      requestParam.tenantId = this.$route.query.tenantId
      requestParam.userName = this.userQuery.userName
      requestParam.page = 1
      requestParam.size = 100
      tenantApi.getTenantUsers(requestParam)
        .then((res) => {
          this.tableData = res.data.list
          this.total = res.data.total
        })
        .catch(() => {
          this.loading = false
        })
    },
    getTenantInfo (tenantId) {
      tenantApi.getTenantInfo(tenantId)
        .then((res) => {
          this.tenantInfo = res.data
          /** 此处增加逻辑调用养殖中心接口进行格式化 */
          usersApi.personDetails(this.tenantInfo.owner).then((res) => {
            this.loading = false
            this.userDetail = res.data
            console.log(res)
          })
            .catch(() => {
              this.loading = false
            })
        })
        .catch(() => {
          this.loading = false
        })
    },
    changeTenantFreezStatus () {
      var tenantId = this.tenantInfo.tenantId
      var status = this.tenantInfo.freez
      console.log('sss>>' + status)
      var act = '冻结'
      if (status === 1) {
        status = 0
      } else {
        status = 1
        act = '解冻'
      }
      this.$confirm('是否' + act + '用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        tenantApi.changeFreezStatus(tenantId, status)
          .then((res) => {
            this.loading = false
            this.tenantInfo.freez = status
            console.log(status)
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
    }
  },
  created () {
    /** this.getDetails(this.$route.query.owner) */
    this.tenantInfo.freez = this.$route.query.freez
    this.tenantInfo.tenantId = this.$route.query.tenantId
    this.getTenantUsers(this.$route.query.tenantId)
    this.getTenantInfo(this.$route.query.tenantId)
    console.log(this.$route.query.freez)
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
    typeFormat: function (val) {
      if (val === 1) {
        return '个人租户'
      } else {
        return '企业租户'
      }
    },
    statusFormat: function (val) {
      if (val === 1) {
        return '正常'
      }
      if (val === 2) {
        return '禁用'
      }
      if (val === 4) {
        return '永久禁用'
      } else {
        return '已注销'
      }
    },
    tenantFreezFormat: function (val) {
      if (val === 1) {
        return '冻结'
      } else {
        return '解冻'
      }
    }
  }
}
</script>
<style>
.el-row {
    margin-bottom: 20px;
    display: flex;
    flex-wrap: wrap
  }
</style>
