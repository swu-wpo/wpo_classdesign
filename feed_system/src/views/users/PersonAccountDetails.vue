<template>
<div>
 <el-row>
  <el-col :span="24"><div class="grid-content bg-purple-dark">用户id:{{userDetail.uid}}</div></el-col>
</el-row>
<el-row>
  <el-col :span="8"><div>用户名:{{userDetail.userName}}</div></el-col>
  <el-col :span="8"><div>注册邮箱:{{userDetail.email}}</div></el-col>
  <el-col :span="8"><div>注册手机号:{{userDetail.phone}}</div></el-col>
</el-row>
<el-row>
  <el-col :span="8"><div>帐号类型:{{}}</div></el-col>
  <el-col :span="8"><div>帐号状态:{{accountStatus===1?'正常':'异常'}}</div></el-col>
  <el-col :span="8"><div>认证状态:{{authenStatus===1?'已认证':'未认证'}}</div></el-col>
</el-row>
<el-row>
  <el-col :span="8"><div>注册时间:{{userDetail.registerTime}}</div></el-col>
  <el-col :span="8"><div>更新时间:{{userDetail.updateTime}}</div></el-col>
  <el-col :span="8"><div></div></el-col>
</el-row>

  <el-tabs v-model="activeName">
    <el-tab-pane label="用户管理" name='first'>
      <div>
        <el-row>
          <el-col :span="24">用户信息</el-col>
        </el-row>
        <el-row>
          <el-col :span="8"><div>用户名:{{userDetail.userName}}</div></el-col>
          <el-col :span="8"><div>性别:{{userDetail.sex}}</div></el-col>
          <el-col :span="8"><div>生日:{{userDetail.birthday}}</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="8"><div>学历:{{}}</div></el-col>
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
        <el-row>
          <el-col :span="24">收货地址</el-col>
        </el-row>
        <el-table :data="deliveryAddress" style="width: 100%">
          <el-table-column
            label="默认地址"
            width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.isDefault === 1?'默认地址':''}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="linkmanName"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            label="所在地区">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.lprovince + scope.row.lcity + scope.row.larea}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="addrDetail"
            label="详细地址">
          </el-table-column>
          <el-table-column
            prop="lPostcode"
            label="邮编">
          </el-table-column>
          <el-table-column
            prop="linkmanTel"
            label="电话号码">
          </el-table-column>
          <el-table-column
            prop="email"
            label="邮箱">
          </el-table-column>
        </el-table>
      </div>
    </el-tab-pane>
  </el-tabs>

</div>
</template>

<script>

import usersApi from '@/apis/users'

export default {
  data () {
    return {
      activeName: 'first',
      deliveryAddress: [],
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
    getDetails (uid) {
      usersApi.personDetails(uid).then((res) => {
        this.loading = false
        this.userDetail = res.data
      })
        .catch(() => {
          this.loading = false
        })
    },
    listDeliveryAddress (uid) {
      usersApi.listDeliveryAddress(uid).then((res) => {
        this.loading = false
        this.deliveryAddress = res.data
      })
        .catch(() => {
          this.loading = false
        })
    }
  },
  created () {
    this.getDetails(this.$route.query.uid)
    this.listDeliveryAddress(this.$route.query.uid)
    this.authenStatus = this.$route.query.authenStatus
    this.accountStatus = this.$route.query.accountStatus
  }
}
</script>
<style>

</style>
