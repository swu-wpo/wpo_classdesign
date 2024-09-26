<!-- 侧边导航 -->
<template>
  <div>
    <!-- 侧边导航 -->
    <v-navigation-drawer>
      <v-list nav
              dense>
        <v-list-item-group v-for="(item, i) in navlist"
                           :key="i"
                           active-class="deep-blue--text text--accent-4">
          <router-link :to="item.link">
            <v-list-item>
              <v-list-item-icon>
                <v-icon color="blue">{{item.icon}}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </router-link>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  name: 'Navigation',
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      tab: null,
      tabs: [
        { tab: 'One', content: 'Tab 1 Content' },
        { tab: 'Two', content: 'Tab 2 Content' },
        { tab: 'Three', content: 'Tab 3 Content' },
        { tab: 'Four', content: 'Tab 4 Content' },
        { tab: 'Five', content: 'Tab 5 Content' },
        { tab: 'Six', content: 'Tab 6 Content' },
        { tab: 'Seven', content: 'Tab 7 Content' },
        { tab: 'Eight', content: 'Tab 8 Content' },
        { tab: 'Nine', content: 'Tab 9 Content' },
        { tab: 'Ten', content: 'Tab 10 Content' },
      ],
      list: [
        { title: '个人中心', link: '/Home', icon: 'mdi-user' },
        { title: '退出登录', link: '/Login', icon: 'mdi-home' },
      ],
      navlist: [
        { title: '首页', link: '/Dashboard', icon: 'mdi-home' },
        { title: '首页', link: '/Dashboard', icon: 'mdi-home' },
        { title: '首页', link: '/Dashboard', icon: 'mdi-home' },
        { title: '首页', link: '/Dashboard', icon: 'mdi-home' },
      ],
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {

  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {

  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {

  },
  beforeCreate() { }, //生命周期 - 创建之前
  beforeMount() { }, //生命周期 - 挂载之前
  beforeUpdate() { }, //生命周期 - 更新之前
  updated() { }, //生命周期 - 更新之后
  beforeDestroy() { }, //生命周期 - 销毁之前
  destroyed() { }, //生命周期 - 销毁完成
  activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
// .v-navigation-drawer {

// }
</style>