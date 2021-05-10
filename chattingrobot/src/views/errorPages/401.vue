<template>
  <div class="container">
    <!-- <el-button type="primary" icon="el-icon-arrow-left" @click="goBack">返回</el-button>
    <el-row :gutter="24">
      <el-col :span="12">
        <h2>你没有权限访问此页面</h2>
        <h3>你可以：</h3>
        <ul class="list-unstyled">
          <li class="link-type">
            <router-link to="/dashboard">回首页</router-link>
          </li>
          <li class="link-type">联系管理员</li>
        </ul>
      </el-col>
      <el-col :span="12">
        <i class="el-icon-circle-close" style="font-size: 200px"/>
      </el-col>
    </el-row> -->
  </div>
</template>

<script>
export default {
  name: 'Page401',
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 800px;
  margin: 100px auto;
  max-width: 100%;
}
.list-unstyled {
  font-size: 14px;
  li {
    padding-bottom: 5px;
  }
  a {
    color: #008489;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
