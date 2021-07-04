<template>
  <el-menu :default-active="currentMenu"
           background-color="#304156"
           text-color="#fff"
           active-text-color="#ffd04b"
           :collapse="sidebar">
    <sidebar-item v-for="route in addRouters"
                  :key="route.id"
                  :item="route" />
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './components/SidebarItem'
export default {
  name: 'Slider',
  components: {
    SidebarItem
  },
  computed: {
    ...mapGetters(['addRouters', 'sidebar']),
    currentMenu () {
      const route = this.$route
      const { meta } = route
      if (meta.title === '首页') {
        return -1
      }
      return meta.id
    }
  }
}
</script>

<style lang="scss">
.el-aside {
  background-color: #304156;
  color: #545c64;
  text-align: left;
  font-size: 1rem;
  height: 100vh;
}
.el-menu {
  border-right: none !important;
  font-size: 1rem;
  width: 200px;
  // height: 100vh;
  overflow-y: auto;
}
.el-menu--collapse {
  .el-submenu {
    & > .el-submenu__title {
      & > span {
        height: 0;
        width: 0;
        overflow: hidden;
        visibility: hidden;
        display: inline-block;
      }
      & > .el-submenu__icon-arrow {
        visibility: hidden;
      }
    }
  }
}
</style>
