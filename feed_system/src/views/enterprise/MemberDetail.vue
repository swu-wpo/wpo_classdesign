<template>
<div>
  <h3> 用户openId：
    <span type="">{{enterpriseUser.openId}}</span>
    <el-button class="button-align-right" style="float:right"
            @click="changeUserFreezStatus"
          >{{enterpriseUser.freez|userFreezFormat}}</el-button>
  </h3>
<el-row   class="el-row">
  <el-col :span="8"><div>用户名：{{userDetail.userName}}</div></el-col>
  <el-col :span="8"><div>注册邮箱：{{userDetail.email}}</div></el-col>
  <el-col :span="8"><div>注册手机号：{{userDetail.phone}}</div></el-col>
</el-row>
<el-row   class="el-row">
  <el-col :span="8"><div>省份：{{userDetail.province}}</div></el-col>
  <el-col :span="8"><div>城市：{{userDetail.city}}</div></el-col>
  <el-col :span="8"><div>账号状态：{{userDetail.accountStatus}}</div></el-col>
</el-row>
<el-row   class="el-row">
  <el-col :span="8"><div>认证：{{userDetail.authenStatus}}</div></el-col>
  <el-col :span="8"><div>注册时间：{{userDetail.registerTime | formatDate}}</div></el-col>
  <el-col :span="8"><div>更新时间：{{userDetail.updateTime | formatDate}}</div></el-col>
</el-row >
  <el-tabs v-model="activeName" >
    <el-tab-pane label="用户详情" name='first'>
      <div>
        <el-row>
          <el-col :span="8"><div>中文名：{{enterpriseUser.nameCn}}</div></el-col>
          <el-col :span="8"><div>手机号：{{enterpriseUser.sex}}</div></el-col>
          <el-col :span="8"><div>生日：{{enterpriseUser.birthday}}</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="8"><div>民族：{{enterpriseUser.nation}}</div></el-col>
          <el-col :span="8"><div>国籍：{{enterpriseUser.nationality}}</div></el-col>
          <el-col :span="8"><div>邮箱：{{enterpriseUser.chMail}}</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="8"><div>组织机构代码：{{enterpriseUser.organizationInternalCode}}</div></el-col>
          <el-col :span="8"><div>组织机构名称：{{enterpriseUser.organizationName}}</div></el-col>
          <el-col :span="8"><div>职务:{{enterpriseUser.postName}}</div></el-col>
        </el-row>
         <el-row>
          <el-col :span="8"><div>身份证号：{{enterpriseUser.idNumber}}</div></el-col>
          <el-col :span="8"><div>政治面貌：{{enterpriseUser.politicalStatus}}</div></el-col>
          <el-col :span="8"><div>性别：{{enterpriseUser.sex}}</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="8"><div>企业用户状态：{{enterpriseUser.status  | formatStatus}}</div></el-col>
          <el-col :span="8"><div>家庭地址：{{enterpriseUser.nowAddr}}</div></el-col>
          <el-col :span="8"><div>入职时间：{{enterpriseUser.createTime}}</div></el-col>
        </el-row>
      </div>
    </el-tab-pane>
  </el-tabs>

</div>
</template>

<script>

import enterpriseApi from '@/apis/enterprise'

export default {
  data () {
    return {
      activeName: 'first',
      loading: false,
      enterpriseUser: {
        openId: '',
        chMail: '',
        createTime: '',
        mobilePhone: '',
        nameCn: '',
        organizationInternalCode: '',
        organizationName: '',
        status: '',
        updateTime: '',
        nation: '',
        nationality: '',
        birthday: '',
        sex: '',
        politicalStatus: '',
        postName: '',
        freez: ''
      },
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
      }
    }
  },
  methods: {
    changeUserFreezStatus () {
      const reqParam = {}
      reqParam.systemId = 'superAdmin'
      reqParam.operator = 'mgtUser'
      reqParam.id = this.enterpriseUser.openId
      var act = '冻结'
      if (this.enterpriseUser.freez === 1) {
        reqParam.frozen = true
      } else {
        reqParam.frozen = false
        act = '解冻'
      }
      this.$confirm('是否' + act + '用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        enterpriseApi.changeUserFreezStatus(reqParam)
          .then((res) => {
            this.loading = false
            this.getEnterpriseUserInfo(this.$route.query.openId)
          })
          .catch(() => {
            this.loading = false
          })
      }).catch(() => {
      })
    },
    getCenterUserInfo (openId) {
      enterpriseApi.getCenterUserInfoByOpenId(openId)
        .then((res) => {
          this.loading = false
          this.userDetail = res.data
        })
        .catch(() => {
          this.loading = false
        })
    },
    getEnterpriseUserInfo (openId) {
      enterpriseApi.getEnterpriseUserInfoByopenId(openId)
        .then((res) => {
          this.loading = false
          this.enterpriseUser = res.data
          this.enterpriseUser.openId = this.$route.query.openId
        })
        .catch(() => {
          this.loading = false
        })
    }
  },
  created () {
    /** this.getDetails(this.$route.query.owner) */
    this.enterpriseUser.freez = this.$route.query.freez
    this.enterpriseUser.openId = this.$route.query.openId
    this.getCenterUserInfo(this.$route.query.openId)
    this.getEnterpriseUserInfo(this.$route.query.openId)
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
    formatStatus: function (val) {
      if (val === 1) {
        return '正常'
      }
      if (val === 2) {
        return '禁用'
      }
      if (val === 4) {
        return '待确认'
      } else {
        return '已注销'
      }
    },
    userFreezFormat: function (val) {
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
