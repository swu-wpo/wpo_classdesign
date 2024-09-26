<template>
  <el-row type="flex"
          justify="space-between">
    <div class="header-left">
      <i :class="!sidebar?'el-icon-s-fold':'el-icon-s-unfold'"
         @click="changeState" />
      <Breadcrumb />
    </div>
    <!-- <el-button type="text" @click="open">点击打开 Message Box</el-button> -->
    <span class="username">{{chName}},您好！
      <el-button type="text"
                 icon="el-icon-switch-button"
                 style="margin-right:10px; font-size=1rem;"
                 @click="Logout"><span>注销</span></el-button>
    </span>
  </el-row>
</template>

<script>
import { removeToken, setLoginStatus, getUserInfo } from '@/utils/token'
import logoutApi from '@/apis/logout'
import Breadcrumb from '@/components/Breadcrumb'
import { mapGetters } from 'vuex'
import store from '@/store'
export default {
  name: 'Header',
  data () {
    return {
      show: false,
      chName: ''
    }
  },
  components: {
    Breadcrumb
  },
  created () {
    this.getUserName()
  },
  computed: {
    ...mapGetters(['buttons', 'sidebar'])
  },
  methods: {
    getUserName () {
      const res = JSON.parse(getUserInfo())
      this.chName = res.chname
    },
    changeState () {
      store.dispatch('setCollapsed', this.sidebar)
    },
    Logout () {
      this.$confirm('此操作将退出登录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        logoutApi.logout()
          // 接口成功返回的数据,包含请求头,请求体,等信息
          .then(res => {
            console.log(res)
            setLoginStatus(false)
            removeToken()
            // 消息提醒
            this.$message({
              type: 'success',
              message: '退出登录!'
            })
            // 跳转到登录页面
            this.$router.push({
              path: '/login'
            })
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消注销！'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.header-left {
  display: flex;
  align-items: center;
  i {
    font-size: 24px;
    margin-right: 15px;
    cursor: pointer;
  }
}
.username {
  display: block;
  font-size: 1rem;
  line-height: 50px;
  color: black;
  font-weight: bold;
  float: right;
}
</style>
