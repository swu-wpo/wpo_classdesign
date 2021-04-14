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
      <v-card max-width="400px"
              class="login">
        <v-card-title class="headline">
          <span>登录</span>
        </v-card-title>
        <div class="form">
          <v-text-field v-model="userName"
                        :error-messages="nameErrors"
                        :counter="16"
                        label="用户名"
                        required
                        clearable
                        prepend-icon="mdi-account-outline"
                        @input="$v.userName.$touch()"
                        @blur="$v.userName.$touch()"></v-text-field>
          <v-text-field v-model="passWord"
                        :error-messages="pwdErrors"
                        label="密码"
                        prepend-icon="mdi-lock-outline"
                        :append-icon="pwdShow ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="pwdShow ? 'text' : 'password'"
                        @click:append="pwdShow = !pwdShow"
                        clearable
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
          <v-btn @click="submitLogin"
                 color="#009DFF">
            <span>Login</span>
          </v-btn>
        </div>
        <router-link to="/Register">
          <v-btn text
                 depressed
                 style="margin-left:10px;color:#009DFF;">
            立即注册
          </v-btn>
        </router-link>
        <br>
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
  },
  data() {
    return {
      // 表单
      userName: '',
      passWord: '',
      pwdShow: false,
      formHasErrors: false,

      //测试登录
      u: '1234',
      pwd: '123456',
    }
  },

  computed: {
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
  },
  //方法集合
  methods: {
    submitLogin() {
      this.$v.$touch()
      let flag = this.$v.$dirty

      // refresh图标的显示
      if (flag) {
        this.formHasErrors = true
      } else {
        this.formHasErrors = false
      }
      // 验证状态
      if (this.$v.$invalid) {
        this.$store.dispatch('snackbar/openSnackbar', {
          msg: '请检查用户名和密码',
          color: 'warning'
        })
      } else {
        if (this.userName === this.u && this.passWord === this.pwd) {
          setTimeout(() => {
            this.$store.dispatch('snackbar/openSnackbar', {
              msg: '登录成功',
              color: 'success'
            })
            this.$router.push({ path: '/Home' })
          }, 1000)
        } else {
          this.$store.dispatch('snackbar/openSnackbar', {
            msg: '用户名或密码不正确',
            color: 'warning'
          })
        }
      }
    },
    clear() {
      this.$v.$reset()
      this.formHasErrors = false
      this.userName = ''
      this.passWord = ''
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {

  },
}
</script>
<style scoped>
@import url('../styles/login.css');
.main svg {
  width: 590px;
  height: 480px;
}
</style>