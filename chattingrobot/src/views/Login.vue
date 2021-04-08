<!-- 登陆页面 -->
<template>
  <div class="container">
    <header class="header">
      <div class="header1">
        <div class="header2"></div>
        <div class="logo"><img src="..\assets\logo.png"
               width="300px"
               height="300px"></div>
      </div>
    </header>
    <v-main class="main">
      <svg-icon iconClass="login"></svg-icon>
      <v-divider vertical></v-divider>
      <v-card width="400px"
              class="login">
        <v-tabs v-model="tab"
                background-color="#009DFF"
                centered
                dark
                icons-and-text>
          <v-tabs-slider></v-tabs-slider>

          <v-tab>
            登录
            <v-icon>mdi-login-variant</v-icon>
          </v-tab>
          <v-divider class="mx-4"
                     vertical></v-divider>
          <v-tab>
            注册
            <v-icon>mdi-account-plus-outline</v-icon>
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item>
            <form ref="login">
              <div class="form">
                <v-text-field v-model="userName"
                              :error-messages="nameErrors"
                              :counter="16"
                              label="用户名"
                              required
                              @input="$v.userName.$touch()"
                              @blur="$v.userName.$touch()"></v-text-field>
                <v-text-field v-model="passWord"
                              :error-messages="pwdErrors"
                              label="密码"
                              required
                              @input="$v.passWord.$touch()"
                              @blur="$v.passWord.$touch()"></v-text-field>
              </div>
              <div class="btn">
                <v-tooltip v-if="formHasErrors"
                           left>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon
                           class="my-0"
                           v-bind="attrs"
                           @click="clear"
                           v-on="on">
                      <v-icon>mdi-refresh</v-icon>
                    </v-btn>
                  </template>
                  <span>Refresh form</span>
                </v-tooltip>
                <v-btn @click="submit"
                       color="#009DFF"><span>Login</span></v-btn>
              </div>

              <br>
            </form>
          </v-tab-item>
          <v-tab-item>
            <form>
              <div class="form">
                <v-text-field v-model="userName"
                              :error-messages="nameErrors"
                              :counter="16"
                              label="用户名"
                              required
                              @input="$v.userName.$touch()"
                              @blur="$v.userName.$touch()"></v-text-field>
                <v-text-field v-model="passWord"
                              :error-messages="pwdErrors"
                              label="密码"
                              required
                              @input="$v.passWord.$touch()"
                              @blur="$v.passWord.$touch()"></v-text-field>
                <v-text-field v-model="passWord1"
                              :error-messages="pwd1Errors"
                              label="再输一次密码"
                              required
                              @input="$v.passWord1.$touch()"
                              @blur="$v.passWord1.$touch()"></v-text-field>
                <v-checkbox v-model="checkbox"
                            :error-messages="checkboxErrors"
                            label="同意协议"
                            required
                            @change="$v.checkbox.$touch()"
                            @blur="$v.checkbox.$touch()"></v-checkbox>
              </div>
              <div class="btn">
                <v-tooltip v-if="formHasErrors"
                           left>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon
                           class="my-0"
                           v-bind="attrs"
                           @click="clear"
                           v-on="on">
                      <v-icon>mdi-refresh</v-icon>
                    </v-btn>
                  </template>
                  <span>Refresh form</span>
                </v-tooltip>
                <v-btn @click="submit"
                       color="#009DFF"><span>Register</span></v-btn>
              </div>
              <br>
            </form>
          </v-tab-item>
        </v-tabs-items>
      </v-card>

    </v-main>
    <v-footer absolute
              color="#005982"
              width="100%">
      <div style="color:white;margin: 0 auto;">{{ new Date().getFullYear() }} — 西南大学蚕桑纺织与生物质科学学院 地址：重庆市北碚区天生路2号 邮编：400715</div>
    </v-footer>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { validationMixin } from 'vuelidate'
import { required, maxLength, minLength } from 'vuelidate/lib/validators'
export default {
  //import引入的组件需要注入到对象中才能使用
  name: 'Login',
  mixins: [validationMixin],

  validations: {
    userName: { required, maxLength: maxLength(16), minLength: minLength(4) },
    passWord: { required, minLength: minLength(6) },
    passWord1: { required, minLength: minLength(6) },
    checkbox: {
      checked(val) {
        return val
      },
    },
  },
  data() {
    return {
      //选项卡
      tab: null,

      // 表单
      userName: '',
      passWord: '',
      passWord1: '',

      checkbox: false,
      formHasErrors: false,
    }
  },

  computed: {
    checkboxErrors() {
      const errors = []
      if (!this.$v.checkbox.$dirty) return errors
      !this.$v.checkbox.checked && errors.push('请勾选同意')
      return errors
    },
    nameErrors() {
      const errors = []
      if (!this.$v.userName.$dirty) return errors
      !this.$v.userName.maxLength && errors.push('用户名最多16位')
      !this.$v.userName.minLength && errors.push('用户名最少4位')
      !this.$v.userName.required && errors.push('请输入用户名')
      return errors
    },
    pwdErrors() {
      const errors = []
      if (!this.$v.passWord.$dirty) return errors
      !this.$v.passWord.minLength && errors.push('密码至少6位')
      !this.$v.passWord.required && errors.push('请输入密码')
      return errors
    },
    pwd1Errors() {
      const errors = []
      if (!this.$v.passWord1.$dirty) return errors
      !this.$v.passWord1.minLength && errors.push('密码至少6位')
      !this.$v.passWord1.required && errors.push('再输一次密码')
      this.passWord !== this.passWord1 && errors.push('两次输入密码不一致')
      return errors
    },
  },
  //方法集合
  methods: {
    submit() {
      this.$v.$touch()
      let flag = this.$v.$dirty
      console.log(flag)

      if (flag) {
        this.formHasErrors = true
      } else {
        this.formHasErrors = false
      }

      alert(this.userName + '\n' + this.passWord)
    },
    clear() {
      this.$v.$reset()
      this.formHasErrors = false
      this.userName = ''
      this.passWord = ''
      this.passWord1 = ''
      this.checkbox = false
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {

  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {

  },
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
* {
  padding: 0;
  margin: 0;
}
.container {
  background-color: #f2f2f2;
  width: 100%;
  overflow: hidden;
}
.header {
  width: 100%;
  height: 200px;
  background: url('../assets/Login/header_bg.png') center center no-repeat;
}
.header .header1 {
  margin: 0 auto;
  height: 200px;
  background: url('../assets/Login/header_bg1.png') center center no-repeat;
}
.header .header1 .header2 {
  display: inline-block;
  width: 696px;
  height: 68px;
  background: url('../assets/Login/swulogo.png') left 0 no-repeat;
  margin: 50px 180px;
}
.logo {
  position: absolute;
  top: 10px;
  left: 480px;
}
.main {
  background-color: rgba(0, 217, 255, 0.18);
  height: 500px;
  width: 79%;
  margin: 0 auto;
}
.main .login {
  position: absolute;
  left: 700px;
  top: 60px;
}
.main svg {
  width: 590px;
  height: 480px;
}
.form {
  width: 350px;
  margin: 0 auto;
}
.btn {
  width: 400px;
  text-align: center;
}
span {
  color: white;
}
</style>