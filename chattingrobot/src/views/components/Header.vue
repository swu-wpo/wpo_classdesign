<!-- 顶部导航 -->
<template>
  <div class=''>
    <v-app-bar color="blue"
               dark
               class="bar">
      <v-toolbar-title>ChattingRobot</v-toolbar-title>
      <!-- 顶部导航条 -->
      <v-tabs v-model="tab"
              centered
              dark>
        <v-tab v-for="item in tabs"
               :key="item.tab">
          {{ item.tab }}
        </v-tab>
      </v-tabs>
      <span style="font-size:1rem;">xxx,您好！</span>
      <!-- 用户下拉菜单 -->
      <v-menu offset-y
              bottom
              transition="slide-y-transition">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon
                 v-bind="attrs"
                 v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="(item, i) in list"
                       :key="i"
                       @click="toPage(item.link)">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  name: 'Header',
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
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    toPage(link) {
      if (link === '/Login') {
        confirm("确定退出登陆吗？")
      }
      this.$router.push({ path: link })
    }
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
.bar {
  padding: 0 50px 0 50px;
}
.v-tabs {
  width: 70%;
  margin: 0 20px 0 20px;
}
</style>