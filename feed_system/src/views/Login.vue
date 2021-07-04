<template>
  <div class="container">
    <header class="header">
      <div class="img-container">
        <img src="@/assets/loginLogo.png"
             alt="logonLogo"
             width="210px"
             height="85px" />
      </div>
      <span class="header-title">母猪饲喂系统</span>
    </header>
    <div class="content">
      <svg-icon icon-class="login"></svg-icon>
      <div class="login-container">
        <div class="login-header">登录</div>
        <el-form ref="loginForm"
                 :model="loginForm"
                 class="form-container"
                 :rules="rules">
          <el-form-item prop="userName">
            <el-input v-model="loginForm.userName"
                      prefix-icon="el-icon-user-solid"
                      placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password"
                      placeholder="密码"
                      prefix-icon="el-icon-lock"
                      type="password"
                      @keyup.enter.native="submitForm('loginForm')"></el-input>
          </el-form-item>
          <el-button :loading="loading"
                     type="primary"
                     style="width:100%;margin-bottom:30px;"
                     @click="submitForm('loginForm')">登录</el-button>
          <!-- <div class="bottom">
            <el-link type="primary">忘记密码？</el-link>
            <el-link type="primary"
                     style="margin-left: 15px">免费注册</el-link>
          </div> -->
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { setToken, setLoginStatus, setUserInfo } from '@/utils/token'
import loginApi from '@/apis/login'
import { Message } from 'element-ui'
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        userName: '',
        password: ''
      },
      rules: {
        userName: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, trigger: 'blur', message: '请输入密码' }]
      },
      loading: false
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          loginApi
            .login({
              username: this.loginForm.userName,
              password: this.loginForm.password
            })
            .then(res => {
              // console.log(res)
              if (res.code === 500) {
                Message.error('账户密码错误')
                setLoginStatus(false)
              } else {
                setLoginStatus(true)
                setToken(res.token)
                setUserInfo(res.user)
                // console.log(getToken())
                this.$message({
                  type: 'success',
                  message: '登录成功!'
                })
                this.$router.push({
                  path: '/'
                })
              }
            })
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  height: 100vh;
  // width: 100vw;
  margin: 0 auto;
  width: 100%;
  overflow: hidden;
  .header {
    display: flex;
    height: 78px;
    line-height: 78px;
    padding: 0 20px;
    background: rgba(215, 215, 215, 1);
    .img-container {
      &::after {
        content: '';
        background: #797575;
        position: absolute;
        height: 53px;
        width: 2px;
        top: 11px;
      }
    }
    .header-title {
      margin-left: 30px;
      font-weight: 400;
      font-size: 20px;
    }
  }
  .content {
    display: flex;
    padding: 60px 20px;
    height: 600px;
    background: url('~@/assets/loginBg.jpg');
    background-size: contain;
    svg {
      width: 690px;
      height: 460px;
    }
    .login-container {
      margin-top: 130px;
      margin-left: 220px;
      width: 420px;
      height: 300px;
      max-width: 100%;
      // text-align: center;
      background-color: rgba(255, 255, 255, 0.847058823529412);
      .login-header {
        background-color: rgba(144, 148, 152, 0.149019607843137);
        padding: 10px;
        font-weight: 600;
      }
      .form-container {
        padding: 40px 40px;
        .bottom {
          float: right;
        }
      }
    }
  }

  // css穿透
  // /deep/.el-input {
  //   display: inline-block;
  //   height: 47px;
  //   input {
  //     height: 47px;
  //     line-height: 47px;
  //   }
  // }
}
</style>
