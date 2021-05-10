<!-- 全局布局 -->
<template>
  <div class="container1">
    <Header></Header>

    <div class="main1">
      <div class="nav">
        <Navigation></Navigation>
      </div>
      <div class='content'>

      </div>

      <Body></Body>

    </div>
    <Footer style="position:absolute;"></Footer>
  </div>
</template>

<script>
import Footer from './Footer'
import Navigation from './Navigation'
import Header from './Header'
import Body from './Body'

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    Header,
    Footer,
    Navigation,
    Body
  },
  data() {
    //这里存放数据
    return {

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
.container1 {
  width: 100vw;
  height: 100vh;
  background: #f2f2f2;
}
.main1 {
  max-width: calc(100vw-100px);
  min-height: calc(100vh - 84px);
  margin: 20px 50px 0px 40px;
  overflow: auto;
  background: chartreuse;
  display: flex;
  flex-direction: row;
}
.nav {
  margin-right: 15px;
}
.content {
  min-height: 100%;
  width: 100%;
  background: skyblue;
}
</style>