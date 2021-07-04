<template>
<div>
  <h3> 企业id：
    <span type="">{{enterpriseId}}</span>
    <el-button class="button-align-right" style="float:right"
            @click="changeEnterpriseFreezStatus"
          >{{enterpriseInfo.base.freez|enterpriseFreezFormat}}</el-button>
  </h3>
<el-row   class="el-row">
  <el-col :span="8"><div>企业简称：{{enterpriseInfo.detail.abbreviation}}</div></el-col>
  <el-col :span="8"><div>所属账号：{{enterpriseInfo.base.userId}}</div></el-col>
  <el-col :span="8"><div>所属应用：{{enterpriseInfo.base.appId}}</div></el-col>
</el-row>
<el-row   class="el-row">
  <el-col :span="8"><div>企业类型：{{enterpriseInfo.owner}}</div></el-col>
  <el-col :span="8"><div>认证状态：{{enterpriseInfo.base.auditState | auditStateFormat}}</div></el-col>
  <el-col :span="8"><div>企业状态：{{enterpriseInfo.base.enterpriseState |enterpriseStateFormat}}</div></el-col>
</el-row>
<el-row   class="el-row">
  <el-col :span="8"><div>创建时间：{{enterpriseInfo.base.createTime | formatDate}}</div></el-col>
  <el-col :span="8"><div></div></el-col>
  <el-col :span="8"><div></div></el-col>
</el-row >
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="企业详情" name='first'>
      <div>
        <h5>企业信息</h5>
        <el-row>
          <el-col :span="8"><div>企业全称：{{enterpriseInfo.base.enterpriseName}}</div></el-col>
          <el-col :span="8"><div>所属行业：{{enterpriseInfo.detail.industryType}}</div></el-col>
          <el-col :span="8"><div>企业规模：{{enterpriseInfo.detail.scaleMember | scaleMemberFormat}}</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="8"><div>公司性质：{{enterpriseInfo.base.enterpriseType}}</div></el-col>
          <el-col :span="8"><div>所属官网：{{enterpriseInfo.gw}}</div></el-col>
          <el-col :span="8"><div>所在地：{{enterpriseInfo.detail.regAddress}}</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="8"><div>钉钉：{{enterpriseInfo.qq}}</div></el-col>
          <el-col :span="8"><div>企业微信：{{enterpriseInfo.weixin}}</div></el-col>
          <el-col :span="8"><div>传真：{{enterpriseInfo.sinaweibo}}</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="8"><div>企业介绍：{{enterpriseInfo.taobao}}</div></el-col>
          <el-col :span="8"><div></div></el-col>
          <el-col :span="8"><div></div></el-col>
        </el-row>
        <el-divider></el-divider>
        <h5>管理员信息</h5>
        <el-row>
          <el-col :span="8"><div>姓名：{{centerUser.userName}}</div></el-col>
          <el-col :span="8"><div>身份证号码：{{centerUser.idNumber}}</div></el-col>
          <el-col :span="8"><div>电话号码：{{centerUser.phone}}</div></el-col>
        </el-row>
      </div>
    </el-tab-pane>
    <el-tab-pane label="认证信息" name="second">
      <h5>企业资质信息</h5>
      <el-row>
        <el-col :span="8"><div>企业全称：{{enterpriseInfo.base.enterpriseName}}</div></el-col>
        <el-col :span="8"><div>统一社会信用代码：{{enterpriseInfo.base.creditCode}}</div></el-col>
        <el-col :span="8"><div>认证状态：{{enterpriseInfo.base.auditState |auditStateFormat}}</div></el-col>
      </el-row>
      <el-row>
        <el-col :span="8"><div>住址：{{enterpriseInfo.detail.regAddress}}</div></el-col>
        <el-col :span="8"></el-col>
        <el-col :span="8"></el-col>
      </el-row>
      <el-row class="pic_row">
        <el-col :span="4"><div>资质认证照片：</div></el-col>
        <el-col :span="10"><img :src="enterpriseInfo.base.license"  style="width:400px; height:260px"></el-col>
        <el-col :span="10"><img :src="enterpriseInfo.base.license"  style="width:400px; height:260px"></el-col>
      </el-row>
      <el-divider></el-divider>
      <h5>法定代表人信息</h5>
      <el-row>
        <el-col :span="8"><div>姓名：{{enterpriseInfo.detail.legalName}}</div></el-col>
        <el-col :span="8"><div>身份证代码：{{enterpriseInfo.detail.legalCertificateCode}}</div></el-col>
        <el-col :span="8"><div>认证状态：{{enterpriseInfo.base.auditState | auditStateFormat}}</div></el-col>
      </el-row>
      <el-row>
        <el-col :span="8"><div>住址：{{enterpriseInfo.detail.regAddress}}</div></el-col>
        <el-col :span="8"></el-col>
        <el-col :span="8"></el-col>
      </el-row>
      <el-row class="pic_row">
        <el-col :span="4"><div>身份证照片：</div></el-col>
        <el-col :span="10"><img :src="enterpriseInfo.base.legalManPhoto"  style="width:400px; height:260px"></el-col>
        <el-col :span="10"><img :src="enterpriseInfo.base.legalManPhotoBack"  style="width:400px; height:260px"></el-col>
      </el-row>
      <el-divider></el-divider>
      <h5>对公账户信息</h5>
      <el-row>
        <el-col :span="8"><div>开户行名称：{{enterpriseInfo.detail.bankName}}</div></el-col>
        <el-col :span="8"><div>开户银行：{{enterpriseInfo.detail.acctSvcr}}</div></el-col>
        <el-col :span="8"><div>认证状态：{{enterpriseInfo.base.auditState | auditStateFormat}}</div></el-col>
      </el-row>
      <el-row>
        <el-col :span="8"><div>银行账户：{{enterpriseInfo.detail.bankCard}}</div></el-col>
        <el-col :span="8"></el-col>
        <el-col :span="8"></el-col>
      </el-row>
    </el-tab-pane>
    <el-tab-pane label="企业成员" name="third">
      <h5>企业成员列表</h5>
      <el-row :gutter="20">
        <el-col :span="6" style="height=300px">
          <el-row>
            <div class="grid-content bg-purple" style="width:100%">
              <el-tree :data="orgTreeData"  @node-click="handleNodeClick" default-expand-all>
              </el-tree>
            </div>
          </el-row>
        </el-col>
        <el-col :span="18"><div class="grid-content bg-purple-light"><el-input style="width:300px" v-model="userQuery.userName" placeholder="姓名" value="adsas"></el-input>
            <el-button type="primary" icon="el-icon-search" @click="serachByOrgCode(1,10,false)"></el-button>
            <el-table
            :data="enterpriseUsersTable"
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
              <el-table-column prop="chMail" label="邮箱"></el-table-column>
              <el-table-column prop="organizationName" label="企业/部门" ></el-table-column>
              <el-table-column label="状态" >
                  <template slot-scope="scope">
                  <span >{{scope.row.status | statusFormat}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="postName" label="职务"></el-table-column>
              <el-table-column prop="enable" label="操作" >
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    @click="changeUserFreezStatus(scope.row.uuid,scope.row.freez)"
                  >{{scope.row.freez === 1 ?'冻结': '解冻' }}</el-button>
                </template>
              </el-table-column>
            </el-table></div>
            <UucPagination :total="total"  @pagination="serachByOrgCode"/>
        </el-col>
      </el-row>

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
      enterpriseId: '',
      orgCode: '',
      loading: false,
      enterpriseUsersTable: [],
      orgTreeData: [],
      centerUser: {
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
      enterpriseInfo: {
        base: {
          id: '',
          enterpriseName: '',
          userId: '',
          creditCode: '',
          registerTel: '',
          tenantId: '',
          enterpriseType: '',
          isTenantUserSync: '',
          isTenantUserConfirm: '',
          orgCode: '',
          freez: '',
          license: '',
          legalManPhoto: '',
          legalManPhotoBack: '',
          orderNum: '',
          appId: '',
          auditState: '',
          enterpriseState: '',
          createTime: ''
        },
        detail: {
          abbreviation: '',
          industryType: '',
          scaleMember: '',
          assets: '',
          scaleType: '',
          businessTime: '',
          legalName: '',
          legalCertificateType: '',
          legalCertificateCode: '',
          regAddress: '',
          scaleBusiness: '',
          bankName: '',
          bankCard: '',
          acctSvcr: '',
          taxCertificateType: '',
          taxCertificateCode: '',
          stateTaxCode: '',
          localTaxCode: '',
          stateTax: '',
          localTax: ''
        }
      },
      userQuery: {
        userName: ''
      },
      total: 0,
      pageIndex: 1,
      pageSize: 5,
      queryOrgCode: ''
    }
  },
  methods: {
    getCenterByOpenId (openId) {
    },
    getEnterpriseInfo () {
      enterpriseApi.getEnterpriseById(this.enterpriseId)
        .then((res) => {
          this.enterpriseInfo = res.data
          this.orgCode = this.enterpriseInfo.base.orgCode
          // 加载当前企业信息完毕后，加载其他信息
          this.getOrganizations()
          this.getCenterUserInfo()
        })
        .catch(() => {
          this.loading = false
        })
    },
    treeDataFormat: function (data) {
      const treeDataF = []
      const obj = {}
      obj.id = data.code
      obj.label = data.name
      obj.children = this.childOrgInfo(data.children)
      treeDataF.push(obj)
      this.orgTreeData = treeDataF
    },
    childOrgInfo (childs) {
      const reChilds = []
      for (let index = 0; index < childs.length; index++) {
        const obj = {}
        obj.id = childs[index].code
        obj.label = childs[index].name
        reChilds.push(obj)
        if (childs[index].children != null) {
          obj.children = this.childOrgInfo(childs[index].children)
        }
      }
      return reChilds
    },
    changeUserFreezStatus (uuid, freez) {
      const reqParam = {}
      reqParam.systemId = 'superAdmin'
      reqParam.operator = 'mgtUser'
      reqParam.id = uuid
      var act = '冻结'
      if (freez === 1) {
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
            this.getEnterprisesUserByOrgCode()
          })
          .catch(() => {
            this.loading = false
          })
      }).catch(() => {
      })
    },
    getEnterprisesUserByOrgCode ({ pageIndex = 1, pageSize = 10, refresh = false }) {
      this.pageIndex = pageIndex
      this.pageSize = pageSize
      const req = {}
      req.organizationInternalCode = this.enterpriseInfo.base.orgCode
      req.enterpriseId = ''
      req.keyword = ''
      req.page = this.pageIndex
      req.pageSize = this.pageSize
      req.keyword = this.userQuery.userName
      enterpriseApi.getEnterprisesUserByOrgCode(req)
        .then((res) => {
          this.loading = false
          this.enterpriseUsersTable = res.data.detail
          this.total = res.data.total
        })
        .catch(() => {
          this.loading = false
        })
    },
    handleClick (tab) {
      if (tab.name === 'third') {
        // 点击进行，组织机构及组织机构的成员列表
        this.getEnterprisesUserByOrgCode(1, 10, false)
      }
    },
    handleNodeClick (node, data, value) {
      this.queryOrgCode = node.id
      this.serachByOrgCode(this.pageIndex, this.pageSize, false)
    },
    changeEnterpriseFreezStatus () {
      const id = this.enterpriseId
      let status = this.enterpriseInfo.base.freez
      var act = '冻结'
      if (status === 0) {
        act = '解冻'
        status = false
      } else {
        status = true
      }
      this.$confirm('是否' + act + '企业?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const req = {}
        req.frozen = status
        req.operator = 'mgtAdmin'
        enterpriseApi.changeFreezStatus(id, req)
          .then((res) => {
            this.loading = false
            this.getEnterpriseInfo()
          })
          .catch(() => {
            this.loading = false
          })
      }).catch(() => {
      })
    },
    getOrganizations () {
      const reqParam = {}
      reqParam.code = this.orgCode
      reqParam.systemId = 'superAdmin'
      enterpriseApi.getOrgs(reqParam)
        .then((res) => {
          // 解析返回数据 重新定义格式
          this.treeDataFormat(res.data)
        })
        .catch(() => {
          this.loading = false
        })
    },
    serachByOrgCode ({ pageIndex = 1, pageSize = 10, refresh = false }) {
      this.pageIndex = pageIndex
      this.pageSize = pageSize
      const req = {}
      if (this.queryOrgCode === '') {
        req.organizationInternalCode = this.enterpriseInfo.base.orgCode
      } else {
        req.organizationInternalCode = this.queryOrgCode
      }
      req.enterpriseId = ''
      req.keyword = ''
      req.page = this.pageIndex
      req.pageSize = this.pageSize
      req.keyword = this.userQuery.userName
      enterpriseApi.getEnterprisesUserByOrgCode(req)
        .then((res) => {
          this.loading = false
          this.enterpriseUsersTable = res.data.detail
          this.total = res.data.total
        })
        .catch(() => {
          this.loading = false
        })
    },
    getCenterUserInfo () {
      enterpriseApi.getCenterUserInfoByUid(this.enterpriseInfo.base.userId)
        .then((res) => {
          this.loading = false
          this.centerUser = res.data
        })
        .catch(() => {
          this.loading = false
        })
    }
  },
  created () {
    /** this.getDetails(this.$route.query.owner) */
    this.enterpriseInfo.freez = this.$route.query.freez
    this.enterpriseId = this.$route.query.id
    this.getEnterpriseInfo()
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
    statusFormat: function (val) {
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
    enterpriseFreezFormat: function (val) {
      if (val === 0) {
        return '解冻'
      } else {
        return '冻结'
      }
    },
    scaleMemberFormat: function (val) {
      if (val === 1) {
        return '1-1000'
      }
      if (val === 2) {
        return '1001-5000'
      } else {
        return '5000以上'
      }
    },
    auditStateFormat: function (val) {
      if (val === 1) {
        return '待审核'
      }
      if (val === 2) {
        return '审核通过'
      } else {
        return '审核不通过'
      }
    },
    enterpriseStateFormat: function (val) {
      if (val === 1) {
        return '正常'
      }
      if (val === 2) {
        return '禁用'
      }
      if (val === 3) {
        return '永久禁用'
      } else {
        return '注销'
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
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
</style>
