<!-- 注册页面 -->
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
          <span>注册</span>
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
          <v-text-field v-model="repeatPwd"
                        :error-messages="repeatErrors"
                        label="再输一次密码"
                        prepend-icon="mdi-lock-outline"
                        :append-icon="rPwdShow ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="pwdShow ? 'text' : 'password'"
                        @click:append="rPwdShow = !rPwdShow"
                        clearable
                        required
                        @input="$v.repeatPwd.$touch()"
                        @blur="$v.repeatPwd.$touch()"></v-text-field>
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
          <v-btn @click="submitReg"
                 color="#009DFF">
            <span class="white_span">Register</span>
          </v-btn>
        </div>
        <router-link to="/Login">
          <v-btn text
                 depressed
                 style="margin-left:10px; color: #009DFF;">
            返回登录
          </v-btn>
        </router-link>
        <br>
      </v-card>

    </v-main>
    <Footer></Footer>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { validationMixin } from 'vuelidate'
import { required, maxLength, minLength, sameAs } from 'vuelidate/lib/validators'
import Footer from '../views/components/Footer.vue'
export default {
  //import引入的组件需要注入到对象中才能使用
  name: 'Register',
  mixins: [validationMixin],
  components: {
    Footer
  },
  validations: {
    userName: { required, maxLength: maxLength(16), minLength: minLength(4) },
    passWord: { required, minLength: minLength(6) },
    repeatPwd: { required, minLength: minLength(6), sameAs: sameAs('passWord') },
  },
  data() {
    return {
      // 表单
      userName: '',
      passWord: '',
      repeatPwd: '',
      pwdShow: false,
      rPwdShow: false,
      formHasErrors: false,
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
    repeatErrors() {
      const errors = []
      if (!this.$v.repeatPwd.$dirty) return errors
      !this.$v.repeatPwd.minLength && errors.push('密码至少6位')
      !this.$v.repeatPwd.required && errors.push('请再次输入密码')
      !this.$v.repeatPwd.sameAs && errors.push('两次密码不一致')
      return errors
    },
  },
  //方法集合
  methods: {
    submitReg() {
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
          msg: '注册失败',
          color: 'warning'
        })
      } else {
        setTimeout(() => {
          this.$store.dispatch('snackbar/openSnackbar', {
            msg: '注册成功',
            color: 'success'
          })
          this.$router.push({ path: '/Login' })
        }, 1000)
      }
    },
    clear() {
      this.$v.$reset()
      this.formHasErrors = false
      this.userName = ''
      this.passWord = ''
      this.repeatPwd = ''
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