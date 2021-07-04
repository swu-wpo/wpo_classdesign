<template>
  <div class="container"
       v-if="checkLoading()">
    <el-container>
      <Slider />
      <el-container>
        <el-header height="50px">
          <Header />
        </el-header>
        <div class="main">
          <el-main>

            <Body />
          </el-main>
          <!-- <el-footer height="30px">
            <Footer />
          </el-footer>-->
        </div>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Slider from './Slider'
import Body from './Body'
import Header from './Header'
import { mapGetters } from 'vuex'
import { getToken } from '../../utils/token'

// import Footer from './Footer'
export default {
  name: 'Layout',
  components: {
    Slider,
    // Footer,
    Header,
    Body
  },
  created () {
    if (getToken()) {
      const loading = this.$loading({
        lock: true,
        text: '权限加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      if (this.checkLoading()) {
        loading.close()
      }
    }
  },
  computed: {
    ...mapGetters(['auths'])
  },
  methods: {
    checkLoading () {
      if (getToken()) {
        if (this.auths === 'none') {
          return false
        }
        return true
      }
      return true
    }
  }
}
</script>
<style>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: black;
  text-align: center;
}
.el-header {
  background: #fff !important;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}
.el-container {
  max-height: 100vh;
  overflow: auto;
}
.el-main {
  min-height: calc(100vh - 50px);
  width: 100%;
  background: rgba(240, 242, 245, 1);
  position: relative;
}
</style>
<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
}
.main {
  min-height: calc(100vh - 60px);
  overflow: auto;
}
</style>
