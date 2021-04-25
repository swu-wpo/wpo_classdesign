##  VUE的相关理解

### 数据的双向绑定实现原理

https://www.wpmee.com/8101.html#:~:text=Vue%E6%95%B0%E6%8D%AE%E5%8F%8C%E5%90%91%E7%BB%91,%E5%87%BD%E6%95%B0%E4%BB%8E%E8%80%8C%E6%9B%B4%E6%96%B0%E8%A7%86%E5%9B%BE

### MVVM



### 渐进式





async function test() {

await sleep(10)

}

  function debouce(fn, ms) {

  return () => {}

}

<i>2021.3.16</i>

## VUE安装

https://blog.csdn.net/Smile_Sunny521/article/details/89714388?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522161589924816780255248521%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=161589924816780255248521&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~top_click~default-1-89714388.pc_search_result_cache&utm_term=vue%E5%AE%89%E8%A3%85

node.js环境 

npm 资源下载工具(安装好node.js后查看)

vue-cli vue脚手架

webpack 资源管理

yarn   facebook发布的一款取代npm的包管理工具。



## VUE新建项目

### 使用vue-cli 2.0

安装 npm i -g vue-cli

新建 <b>vue init webpack 项目名</b>

![image-20210316210029840](C:\Users\12876\AppData\Roaming\Typora\typora-user-images\image-20210316210029840.png)

运行 npm run dev

目录结构分析：

https://blog.csdn.net/bbsyi/article/details/77897278?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522161591196116780262514851%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=161591196116780262514851&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduend~default-1-77897278.pc_search_result_cache&utm_term=vue-cli2.0%E7%9B%AE%E5%BD%95%E7%BB%93%E6%9E%84

![image-20210317002943073](C:\Users\12876\AppData\Roaming\Typora\typora-user-images\image-20210317002943073.png)

### 使用vue-cli 3.0

安装 npm install -g @vue/cli

新建 <b>vue create 项目名</b>

运行 npm run server

![在这里插入图片描述](https://img-blog.csdnimg.cn/20191016130616116.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2FwamN1aQ==,size_16,color_FFFFFF,t_70)

目录结构分析：

https://www.cnblogs.com/coober/p/10875647.html

![image-20210317004712709](C:\Users\12876\AppData\Roaming\Typora\typora-user-images\image-20210317004712709.png)

ps: vue-cli3.0的目录比2.0的精简很多：

- public文件夹相当于2.0的static文件夹
- 默认目录没有build和config这两个文件夹
- <b>需要配置webpack则需要在项目的根目录下新建 vue.config.js 文件</b>（是根目录，不是src目录）
- /src/views 新建我们的页面组件



<i>2021.3.17</i>

vue-cli3.0全面配置 有对vue.config.js配置的说明

https://segmentfault.com/a/1190000017008697

<b>代码格式化 ：</b>

- ESLint 

   一个开源的 JavaScript 代码检查工具，它是用来进行代码的校验，检测代码中潜在的问题，比如某个变量定义了未使用、函数定义的参数重复、变量名没有按规范命名等等。
  ESLint 的初衷是为了让程序员可以创建自己的检测规则。ESLint 的所有规则都被设计成可插入的。ESLint 的默认规则与其他的插件并没有什么区别，规则本身和测试可以依赖于同样的模式。为了便于人们使用，ESLint 内置了一些规则，当然，你可以在使用过程中自定义规则。
  ESLint 使用 Node.js 编写，这样既可以有一个快速的运行环境的同时也便于安装。 (重点，使用eslint必须有package.json文件)

- Prettier
  它是代码格式化工具，用来做代码格式化，有了Prettier之后，它能去掉原始的代码风格，确保团队的代码使用统一相同的格式，修复规则可自定义。

​	配置setting.json:

```javascript
{
  "editor.fontSize": 14, //编辑器字体大小
  "[scss]": {
    "editor.defaultFormatter": "michelemelluso.code-beautifier"
  }, //scss格式化工具
  "workbench.iconTheme": "vscode-icons", //vscode文件图标主题
  "terminal.integrated.shell.windows": "C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe", //默认终端shell
  "go.formatTool": "goimports", //golang格式化工具
  "editor.defaultFormatter": "esbenp.prettier-vscode", //编辑器格式化工具
  "[javascript]": {
    "editor.defaultFormatter": "rvest.vs-code-prettier-eslint"
  }, //javascript格式化工具
  "[vue]": {
    "editor.defaultFormatter": "octref.vetur"
  }, //vue格式化工具
  "editor.insertSpaces": false,
  "workbench.editor.enablePreview": false, //打开文件不覆盖
  "search.followSymlinks": false, //关闭rg.exe进程
  "editor.minimap.enabled": false, //关闭快速预览
  "files.autoSave": "afterDelay", //编辑自动保存
  "editor.lineNumbers": "on", //开启行数提示
  "editor.quickSuggestions": {
    //开启自动显示建议
    "other": true,
    "comments": true,
    "strings": true
  },
  "editor.tabSize": 2, //制表符符号eslint
  "editor.formatOnSave": true, //每次保存自动格式化
  // "eslint.codeActionsOnSave": {
  //     "source.fixAll.eslint": true
  // },
  "prettier.eslintIntegration": true, //让prettier使用eslint的代码格式进行校验
  "prettier.semi": true, //去掉代码结尾的分号
  "prettier.singleQuote": false, //使用单引号替代双引号
  "javascript.format.insertSpaceBeforeFunctionParenthesis": false, //让函数(名)和后面的括号之间加个空格
  "vetur.format.defaultFormatter.html": "js-beautify-html", //格式化.vue中html
  "vetur.format.defaultFormatter.js": "vscode-typescript", //让vue中的js按编辑器自带的ts格式进行格式化
  "vetur.format.defaultFormatterOptions": {
    "js-beautify-html": {
      "wrap_attributes": "force-aligned" //属性强制折行对齐
    },
    "prettier": {
      "semi": false,
      "singleQuote": true
    },
    "vscode-typescript": {
      "semi": false,
      "singleQuote": true
    }
  },
  "eslint.validate": [
    "vue",
    // "javascript",
    "typescript",
    "typescriptreact",
    "html"
  ],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}

```

### warning Delete `␍` prettier/prettier（eslint配置的一些问题）

npm run lint --fix



<i>2021.3.18</i>

## VUE Router 路由

官方文档 https://router.vuejs.org/zh/installation.html

### 1 编写 ./src/router/index.js

- routes 为一数组，每个路由都是一个对象，用大括号包裹，其主要参数如下：
- path ：跳转的路径，相当于 Spring MVC 中 Controller 中 return 的路径
- name ：自定义的组件名称
- component ：引入的 Vue 组件名称

```js
import Vue from 'vue'
import VueRouter from 'vue-router'

// 组件通过export暴露接口，路由中导入组件
import Login from '../components/Login'
import Main from '../components/Main'
import Register from '../components/Register'

// 导入 vue-router 依赖
Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {
            path: '/login',   // 跳转路径
            name: 'login',    // 名称
            component: Login  // 组件
        },
        {
            path: '/main',
            name: 'main',
            component: Main
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        }
    ]
});
```



### 2 在主文件main.js 中引入路由

import router from './router'

### 3 添加 router-link 以及 router-view

router-link 相当于 a 标签， to 属性相当于 href 属性，用于配置路由中声明的路径，即对应 index.js 中路由的 path，匹配成功则进行跳转切换
router-view 用于展示视图，要通过它才能将跳转的视图展示出来

```javascript
<template>
  <div id="app">
      <router-link to="/main">Main</router-link>
      <router-link to="/login">Login</router-link>
      <router-link to="/register">Register</router-link>
      <router-view></router-view>
  </div>
</template>
```



### 4 传递参数

#### route-link 中 to

```js
//修改 App.vue 中 route-link 的 to 属性，让其携带参数：

<router-link :to="{name:'login', params:{id:1}}">Login</router-link>

// 修改 index.js 中的路由的 path 属性

{
    path: '/login/:id',   // 跳转路径
    name: 'login',    // 名称
    component: Login  // 组件
},
```



#### 路由配置增加props

```js
// 在 index.js 的路由配置中增加 “props: true” 属性

{
     path: '/login/:id',   // 跳转路径
     name: 'login',    // 名称
     component: Login,  // 组件
     props: true
 },

// 在 Login.vue 中通过 props 接受 id 参数

<script>
export default {
    props: ['id'],
    name: 'Main'
}
</script>

```



### 5 重定向

添加 redirect 属性即可

```javascript
// 修改路由中 register 的配置，删掉 Component，用 redirect 取代，路径为 “/Main”，即重定向至 Main
{
    path: '/register',
    redirect: '/main'
}
```



### 6 404跳转处理

新建组件notFound.vue

然后在index.js多添加一个路由：

```js
{
    path: '*',//匹配所有请求
    component: NotFound 
}
```

 

### 7 beforeEach()

路由拦截是我们项目中经常遇到的普遍问题，例如当你访问任何一个页面的时候需要验证该用户有没有登录等；对此，vue-router提供的beforeEach可以方便的实现路由的导航守卫；

使用 `router.beforeEach` 注册一个全局前置守卫：

```js
router.beforeEach((to, from, next) => {
  	to // 要去的路由
	from // 当前路由
	next() // 放行的意思
}
})
```

当一个导航触发时，全局前置守卫按照创建顺序调用。守卫是异步解析执行，此时导航在所有守卫 resolve 完之前一直处于 等待中。

每个守卫方法接收三个参数：

1. to: Route: 即将要进入的**目标路由对象**

2. from: Route: 当前导航**正要离开的路由**

3. next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数

   next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed (确认的)。

   next(false): 中断当前的导航。如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 from 路由对应的地址。

   next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。你可以向 next 传递任意位置对象，且允许设置诸如 replace: true、name: 'home' 之类的选项以及任何用在 router-link 的 to prop 或 router.push 中的选项。

   next(error): (2.4.0+) 如果传入 next 的参数是一个 Error 实例，则导航会被终止且该错误会被传递给 router.onError() 注册过的回调。

确保要调用 next 方法，否则钩子就不会被 resolved。
只有`next()`是放行，其他的诸如：`next('/logon') 、 next(to) 或者 next({ ...to, replace: true })`都不是放行，如果`next()`里有参数的话，`next()`就像被重载一样，就有了不同的功能：**中断当前导航，执行新的导航**

```js
beforeEach((to, from, next) => {
  next('/logon')
}
// 以上代码实际是下列代码的意思
beforeEach((to, from, next) => {
  beforeEach(('/logon', from, next) => {
  	 beforeEach(('/logon', from, next) => {
  	 	 beforeEach(('/logon', from, next) => {
  	 	 	beforeEach...  // 一直循环下去...... , 因为我们没有使用 next() 放行
 		}
 	 }
  }
}
// 如果把上面的守卫改一下，当我在地址栏输入/home时
beforeEach((to, from, next) => {
   if(to.path === '/home') {
   	next('/logon')
   } else {
    // 如果要去的地方不是 /home ， 就放行
   	next()
   }
}
/*我本来要去/home路由，因此执行了第一次 beforeEach((to, from, next)，但是这个路由守卫中判断了如果要去的地方是'/home'，就执行next('/logon')，
所以想要访问/home可以这么看*/
beforeEach((to, from, next) => {
   beforeEach(('/logon', from, next) => {
     next()  // 现在要去的地方不是 /home,因此放行
   }
}
/*注意：重点就在这，next('/logon')不是说直接去/logon路由，而是中断（不是CPU的那个中断！VUE中的中断就是此时不会执行router.afterEach(() => {}）这一次路由守卫的操作，又进入一次路由守卫，就像嵌套一样，一层路由守卫，然后又是一层路由守卫，此时路由守卫进入到第二层时，to.path已经不是/home了，这个时候才执行next()放行操作。*/
```



### 8 动态添加路由addRoutes()

- 出现问题：

  在addRoutes()之后第一次访问被添加的路由会白屏，这是因为刚刚addRoutes()就立刻访问被添加的路由，然而此时addRoutes()没有执行结束，因而找不到刚刚被添加的路由导致白屏。因此需要从新访问一次路由才行。

- 解决方法：
  此时就要使用**next({ ...to, replace: true })**来确保addRoutes()时动态添加的路由已经被完全加载上去。**replace: true只是一个设置信息**，告诉VUE本次操作后，不能通过浏览器后退按钮，返回前一个路由。因此next({ ...to, replace: true })可以写成next({ ...to })，不过你应该不希望用户在addRoutes()还没有完成的时候，可以点击浏览器回退按钮搞事情吧。

  其实next({ ...to })的执行很简单，它会判断：

  如果参数to不能找到对应的路由的话，就再执行一次beforeEach((to, from, next)直到其中的next({ ...to})能找到对应的路由为止。也就是说此时addRoutes()已经完成啦，找到对应的路由之后，接下来将执行前往对应路由的beforeEach((to, from, next) ，因此需要用代码来判断这一次是否就是前往对应路由的beforeEach((to, from, next)，如果是，就执行next()放行。

  如果守卫中没有正确的放行出口的话，会一直next({ ...to})进入死循环 !!!

  因此你还需要确保在当addRoutes()已经完成时，所执行到的这一次beforeEach((to, from, next)中有一个正确的next()方向出口。
  

## Axios

官方文档：http://www.axios-js.com/zh-cn/

### 1 简介

基于`promise`，用于浏览器和`node.js`的http客户端，本质上也是对原生XHR的封装，只不过它是Promise的实现版本，符合最新的ES规范，有以下特点：

- 从浏览器中创建 XMLHttpRequests
- 从 node.js 创建 http 请求
- 支持 Promise API
- 拦截请求和响应
- 转换请求数据和响应数据
- 取消请求
- 自动转换 JSON 数据
- 客户端支持防御 XSRF

与Ajax区别：http://www.axios-js.com/zh-cn/blogs/

axios是通过promise实现对ajax技术的一种封装，就像jQuery实现ajax封装一样。
简单来说： ajax技术实现了网页的局部数据刷新，axios实现了对ajax的封装。axios是ajax，但ajax不止axios。

代码比较：

```js
//axios：
axios({
            url: '/getUsers',
            method: 'get',
            responseType: 'json', // 默认的
            data: {
                //'a': 1,
                //'b': 2,
            }
        }).then(function (response) {
            console.log(response);
            console.log(response.data);
        }).catch(function (error) {
            console.log(error);
            }）

// ajax：
$.ajax({
            url: '/getUsers',
            type: 'get',
            dataType: 'json',
            data: {
                //'a': 1,
                //'b': 2,
            },
            success: function (response) {
                console.log(response)；
            }
        })
```



### 2 安装

npm install axios --save

在main.js中引入：

```js
import axios from 'axios'
Vue.prototype.$axios = axios
```



### 3 请求方法

- get：获取数据，请求指定的信息，返回实体对象
- post：向指定资源提交数据（例如表单提交或文件上传）
- put：更新数据，从客户端向服务器传送的数据取代指定的文档的内容
- patch：更新数据，是对put方法的补充，用来对已知资源进行局部更新
- delete：请求服务器删除指定的数据

`baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL



### 4 并发请求

同时进行多个请求，并统一处理返回值

```js
this.$axios.all([
	this.$axios.get('/goods.json'),
	this.$axios.get('/classify.json')
]).then(
	this.$axios.spread((goodsRes,classifyRes)=>{
		console.log(goodsRes.data);
		console.log(classifyRes.data);
	})
)
```

 

### 5 拦截器

写于@/utils/request.js

#### 概述

在请求或响应被 then 或 catch 处理前拦截它们。拦截器分为请求拦截器和响应拦截器:

1. **请求拦截器**（interceptors.requst）是指可以拦截每次或指定HTTP请求，并可修改配置项。
2. **响应拦截器**（interceptors.response）可以在每次HTTP请求后拦截住每次或指定HTTP请求，并可修改返回结果项。

#### 基础配置

1.请求拦截器

```js
// 请求拦截器
service.interceptors.request.use(
  config => {
    // 发送请求前做什么
    if (store.getters.token) {
      // 若是有做鉴权token,就给头部带上token
    }
    return config
  },
  error => {
    // 在此定义请求错误需要做什么
    console.log(error)
    return Promise.reject(error)
  }
)

```

2.响应拦截器

```js
// 响应拦截器
service.interceptors.response.use(
  response => {
    if(response.headers['content-disposition']) { //处理下载文件
      return response
    }
    return response.data
  },
  error => {
    const response = error.response
    //显示后台返回message
    if (!response) {
      notification.error({
        message: error || 'error'
      })
      return Promise.reject(error)
    }
    
    const { data } = response
    if (response.status === 422) {
      // 返回状态码为422则重新登录
      if (data.message === 'Signature has expired') {
        store.dispatch('user/resetToken')
        notification.error({
          message: '重新登录',
          description: 'Authorization verification failed'
        })
        setTimeout(()=>{
          if(!store.getters.token) location.reload()
        },1000)
        return Promise.reject(error)
      }
    }

    notification.error({
      message: data.message || 'error'
    })
    return Promise.reject(data.message || 'error')
  }
)
```

3.创建拦截器

```js
var myInterceptor = axios.interceptors.request.use(function () {/*...*/});
axios.interceptors.request.eject(myInterceptor);
```

4.移除拦截器

```js
var instance = axios.create();
instance.interceptors.request.use(function () {/*...*/});
```



<i>2021.3.19</i>

## SVG

https://blog.csdn.net/weixin_44356647/article/details/105361571?utm_medium=distribute.pc_relevant.none-task-blog-baidujs_utm_term-4&spm=1001.2101.3001.4242



2021.4.12

## 运用vuex封装v-snackbar

https://blog.csdn.net/weixin_39929961/article/details/110469661