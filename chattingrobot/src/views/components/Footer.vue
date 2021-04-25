<!-- 页脚 -->
<template>
  <v-footer absolute
            color="#005982"
            width="100%">
    <div style="color:white;margin: 0 auto;">{{ new Date().getFullYear() }} — 西南大学蚕桑纺织与生物质科学学院 地址：重庆市北碚区天生路2号 邮编：400715</div>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
  //import引入的组件需要注入到对象中才能使用
  components: {},
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
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
</style>