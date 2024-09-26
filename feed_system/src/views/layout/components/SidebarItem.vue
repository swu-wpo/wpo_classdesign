<template>
  <div v-if="isMenu"
       class="container">
    <template v-if="isMenuItem(item)">
      <router-link :to="item.path"
                   :key="item.children[0].meta.id"
                   style="text-decoration: none">
        <el-menu-item :key="item.children[0].meta.id"
                      :index="item.children[0].meta.id">
          <i :class="item.meta.icon"></i>
          <span slot="title">{{ item.children[0].meta.title }}</span>
        </el-menu-item>
      </router-link>
    </template>
    <template v-else-if="isSubmenuOneChild(item)">
      <router-link :to="item.path"
                   :key="item.meta.id"
                   style="text-decoration: none">
        <el-menu-item :key="item.meta.id"
                      :index="item.meta.id">{{ item.meta.title }}</el-menu-item>
      </router-link>
    </template>
    <!-- 真正起作用的 -->
    <el-submenu v-else
                :index="item.meta.id">
      <template slot="title"
                class="menu-container">
        <i :class="item.meta.icon"></i>
        <span slot="title">{{item.meta.title}}</span>
      </template>
      <sidebar-item v-for="route in item.children"
                    :key="route.meta.id"
                    :item="route" />
    </el-submenu>
  </div>
</template>

<script>
export default {
  name: 'SidebarItem',
  data () {
    return {
      isMenu: this.item?.meta?.isMenu
    }
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    isMenuItem (menu) {
      if (menu?.meta && menu?.meta?.isMenu && menu?.meta?.isMenuItem) {
        return true
      }
      return false
    },
    isSubmenuOneChild (menu) {
      if (!menu?.children || menu?.children.length === 0) {
        return true
      }
      return false
    }
  }
}
</script>

<style lang="scss" scoped>
i {
  font-size: 200px;
}
</style>
