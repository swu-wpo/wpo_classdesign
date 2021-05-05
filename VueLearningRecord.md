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

##  VUE的相关理解

### 核心思想

数据驱动、组件化

**一、数据驱动**

传统的前端数据交互是用Ajax从服务端获取数据，然后操作DOM来改变视图；或者前端交互要改变数据时，又要再来一次上述步骤，而手动操作DOM是一个繁琐的过程且易出错。
Vue.js 是一个提供了 **MVVM** 风格的双向数据绑定的 Javascript 库，专注于View 层。它让开发者**省去了操作DOM的过程，只需要改变数据**。Vue会通过Dircetives指令，对DOM做一层封装，**当数据发生改变会通知指令去修改对应的DOM，**数据驱动DOM变化，DOM是数据的一种自然映射。
Vue是一种MVVM框架。而DOM是数据的一种自然映射。传统的模式是通过Ajax请求从model请求数据，然后手动的触发DOM传入数据修改页面。Vue中，Directives对view进行了封装，当model里的数据发生变化是，Vue就会通过Directives指令去修改DOM。同时也通过DOM Listener实现对视图view的监听，当DOM改变时，就会被监听到，实现model的改变，实现数据的双向绑定。

**二、组件化**

扩展HTML元素，**封装可重用的代码**。**每一个组件都对应一个ViewModel**。页面上每个独立的可视/可交互区域都可以视为一个组件。每个组件对应一个工程目录，组件所需要的各种资源在这个目录下就进维护。页面是组件的容器，组件可以嵌套自由组合形成完整的页面。


### 数据的双向绑定实现原理

https://www.wpmee.com/8101.html#:~:text=Vue%E6%95%B0%E6%8D%AE%E5%8F%8C%E5%90%91%E7%BB%91,%E5%87%BD%E6%95%B0%E4%BB%8E%E8%80%8C%E6%9B%B4%E6%96%B0%E8%A7%86%E5%9B%BE

![image-20210427182535225](C:\Users\12876\AppData\Roaming\Typora\typora-user-images\image-20210427182535225.png)

通过**数据劫持**结合**发布者-订阅者模式**的方式来实现的，首先是（Observer 数据监听器）对数据进行监听，然后当监听的属性发生比变化时则告诉订阅者（Watcher）是否要更新，若更新就会执行对应的更新函数从而更新

![image-20210427183709501](C:\Users\12876\AppData\Roaming\Typora\typora-user-images\image-20210427183709501.png)

![image-20210427202246770](C:\Users\12876\AppData\Roaming\Typora\typora-user-images\image-20210427202246770.png)

![image-20210427202322145](C:\Users\12876\AppData\Roaming\Typora\typora-user-images\image-20210427202322145.png)

### MVVM

![img](https://www.runoob.com/wp-content/uploads/2017/01/20151109171527_549.png)

vm层（视图模型层）通过接口从后台m层（model层）请求数据，vm层继而和v（view层）实现数据的双向绑定。

双向数据绑定中的两向分别为 view和viewmodel

MVVM 的出现**促进了 GUI 前端开发与后端业务逻辑的分离**，极大地提高了前端开发效率。MVVM 的核心是 ViewModel 层，它就像是一个中转站（value converter），负责转换 Model 中的数据对象来让数据变得更容易管理和使用，该层向上与视图层进行双向数据绑定，向下与 Model 层通过接口请求进行数据交互，起呈上启下作用。如下图所示：

![img](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pbWFnZXMyMDE3LmNuYmxvZ3MuY29tL2Jsb2cvODgyOTI2LzIwMTcxMS84ODI5MjYtMjAxNzExMTUxNzU5NDI5MjEtNzc1OTQxMjYzLnBuZw?x-oss-process=image/format,png)

组成部分

![img](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pbWFnZXMyMDE3LmNuYmxvZ3MuY29tL2Jsb2cvODgyOTI2LzIwMTcxMS84ODI5MjYtMjAxNzExMTUxNzU5NTg2NzEtMTk1NTcxMDg0NS5wbmc?x-oss-process=image/format,png)

作用简介

\# View 层

View 是视图层，也就是用户界面。前端主要由 **HTML 和 CSS** 来构建，为了更方便地展现 ViewModel 或者 Model 层的数据，已经产生了各种各样的前后端模板语言，比如 FreeMarker、Marko、Pug、Jinja2等等，各大 MVVM 框架如 KnockoutJS，Vue，Angular 等也都有自己用来构建用户界面的内置模板语言。

\# Model 层

Model 是指数据模型，泛指后端进行的各种**业务逻辑处理和数据操控**，主要围绕**数据库系统**展开。后端的处理通常会非常复杂：

\# ViewModel 层

ViewModel 是由前端开发人员组织生成和维护的视图数据层。在这一层，前端开发者对从后端获取的 Model 数据进行转换处理，做**二次封装，以生成符合 View 层使用预期的视图数据模型**。需要注意的是 ViewModel 所封装出来的数据模型包括**视图的状态和行为**两部分，而 Model 层的数据模型是只包含状态的，比如页面的这一块展示什么，那一块展示什么这些都属于视图状态（展示），而页面加载进来时发生什么，点击这一块发生什么，这一块滚动时发生什么这些都属于视图行为（交互），视图状态和行为都封装在了 ViewModel 里。这样的封装使得 ViewModel 可以完整地去描述 View 层。由于实现了双向绑定，ViewModel 的内容会实时展现在 View 层，这是激动人心的，因为前端开发者再也不必低效又麻烦地通过操纵 DOM 去更新视图，MVVM 框架已经把最脏最累的一块做好了，我们开发者只需要处理和维护 ViewModel，更新数据视图就会自动得到相应更新，真正实现数据驱动开发。看到了吧，View 层展现的不是 Model 层的数据，而是 ViewModel 的数据，由 ViewModel 负责与 Model 层交互，这就完全解耦了 View 层和 Model 层，这个解耦是至关重要的，它是前后端分离方案实施的重要一环。





### 渐进式

由浅入深，由简单到复杂的使用



### VDOM

![image-20210427120132299](C:\Users\12876\AppData\Roaming\Typora\typora-user-images\image-20210427120132299.png)

#### **什么是vdom**

vdom是一种使用**js对象来描述**真实DOM的技术，通过这种技术,我们能精确知道哪些真实DOM改变了，从而尽量减少DOM操作的性能开销。

![2970344abbd3fd62dc5ae6a89739e2b2.png](https://img-blog.csdnimg.cn/img_convert/2970344abbd3fd62dc5ae6a89739e2b2.png)

#### snabbdom.js

vdom是通过snabbdom.js库实现的,大概过程有以下三步：

1. compile（把真实DOM编译成Vnode）
2. **diff**（利用diff算法，比较oldVnode和newVnode之间有什么变化）
3. patch（把这些变化用打补丁的方式更新到真实dom上去）



![5943c3bf3ffc3e2a14630f9b46aded43.png](https://img-blog.csdnimg.cn/img_convert/5943c3bf3ffc3e2a14630f9b46aded43.png)

*接下来为大家详细介绍snabbdom的两个**核心函数h()、patch()***

##### snabbdom - h 函数

h( ) 函数主要根据传进来的参数，**返回一个 vnode（虚拟节点） 对象**



![b5ea7bca50e632570403a42a1119b791.png](https://img-blog.csdnimg.cn/img_convert/b5ea7bca50e632570403a42a1119b791.png)

h(‘<标签名>’, {…属性…}, ‘值’)，如果值为子元素，则可以在h()函数中嵌套h(‘<标签名>’, {…属性…}, […子元素…])。

##### snabbdom - patch 函数



![28f2296c7aed5d106bc6541a633bae1b.png](https://img-blog.csdnimg.cn/img_convert/28f2296c7aed5d106bc6541a633bae1b.png)

patch()函数的两种使用

- **patch(container, vnode) //将虚拟dom渲染成真实的dom**



![c9983a2639a2062cba65e976a6bf8845.png](https://img-blog.csdnimg.cn/img_convert/c9983a2639a2062cba65e976a6bf8845.png)

简易的实现原理



![1af614177ce698adb91477e01791ec8d.png](https://img-blog.csdnimg.cn/img_convert/1af614177ce698adb91477e01791ec8d.png)

- **patch(vnode, newVnode) //利用diff算法比较新旧vnode之间的差异**

简易的实现原理



![de6ce2344a2f5f354bceaf0dd83921a2.png](https://img-blog.csdnimg.cn/img_convert/de6ce2344a2f5f354bceaf0dd83921a2.png)

#### diff算法

> 什么是diff算法？

diff算法很早就存在了，一开始diff算法是用来**计算出两个文本的差异**。所以大家一定要明确，diff算法并不是react或者vue原创的，它们只是用diff算法来比较两个vnode的差异，并只针对该部分进行原生DOM操作，而非重新渲染整个页面。

*vdom中是在**patch(vnode, newVnode)**比较新旧函数时会用到diff*

以下是patch（）函数的核心代码分析

```
function 
```

这个函数做了以下事情：

1. 找到对应的真实dom，称为el
2. 判断Vnode和oldVnode是否完全相同，如果是，那么直接return
3. 如果他们都有文本节点并且不相等，则更新el的文本节点
4. 如果oldVnode有子节点而Vnode没有，则删除el的子节点
5. 如果oldVnode没有子节点而Vnode有，则将Vnode的子节点真实化之后添加到el
6. 如果两者都有子节点，则执行updateChildren函数比较子节点

updateChildren 函数比较复杂，感兴趣的同学可以去了解下源码。**需要vue源码解析的电子书及视频的可以留言，我发给大家**

#### vue的整体流程

1. 解析模板成 render 函数
2. 响应式开始监听**
3. 首次渲染，显示页面，且绑定依赖
4. data 属性变化，触发 rerender



### 响应式原理

Vue 具有一套非侵入式的响应式系统，这使得用户可以完全通过**直接改变数据来驱动界面显示从而快速实现自己的业务逻辑**，在以前，用户改变数据后，是需要自己编写dom操作逻辑来控制view显示的。响应式系统内在的处理逻辑对用户都是透明的，用户可以把大量的精力都用来维护好数据的状态。

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190908165932602.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTI3NTI5NQ==,size_16,color_FFFFFF,t_70)

1. 组件render函数生成虚拟dom
2. render过程变量获取触发getter
3. getter 执行的同时收集了当前订阅者
4. 数据修改操作触发setter
5. setter触发getter的时候收集的订阅者组件们重新render



响应式流程总结：

1. Vue会初始化组件内的data属性，通过Object.defineProperty 来绑定上get set。get包含了当前watcher的订阅操作，set包含了所有订阅的watcher的更新操作
2. 每一个组件，在执行mount 方法的时候，vue最终都把它会生成一个观察者，watcher的表达式是组件的渲染函数，更新方法。
3.  Vue 组件watcher 在执行表达式获取组件更新内容的时候，比如获取下面表达式里的key1的值得时候会触发get，在get的钩子里，会把当前的watcher push到该get的值所对应的订阅者数组里，这样就实现了精准的将数据和观察者关联起来，当数据变动的时候就能精准的知道哪些组件是需要更新的。而不相关的就会被忽略更新
4. 当数据更新的时候，会触发之前预先绑定好的set方法，set方法会把观察者数组里的观察者都取出来，通知他们进行更新，更新其实是调用watcher对象的一个预先定义好的update函数。



### export与export default

1. export与export default均可用于导出常量、函数、文件、模块等，可以在其它文件或模块中通过import+(常量 | 函数 | 文件 | 模块)名的方式，将其导入，以便能够对其进行使用。
2. 在一个文件或模块中，**export、import可以有多个，export default仅有一个**，且引入的时候可以给这个模块取任意名字

3. 使用export default命令，为模块指定默认输出，这样就不需要知道所要加载模块的变量名

4. 通过export方式导出，在导入时要加{ }，export default则不需要

```js
1.export
//a.js
export const str = "blablabla~";
export function log(sth) { 
  return sth;
}
//对应的导入方式： 
//b.js
import { str, log } from 'a'; //也可以分开写两次，导入的时候带花括号
 
2.export default
//a.js
const str = "blablabla~";
export default str;
//对应的导入方式： 
//b.js
import str from 'a'; //导入的时候没有花括号
```



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

1. **请求拦截器**（interceptors.request）是指可以拦截每次或指定HTTP请求，并可修改配置项。
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



2021.4.27

## Vuex

### 简介

vuex是专门用来管理vue.js应用程序中状态的一个插件。他的作用是将应用中的所有状态都放在一起，集中式来管理。需要声明的是，这里所说的状态指的是vue组件中data里面的属性。



### 结构示意

![img](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9tbWJpei5xcGljLmNuL21tYml6L2lidVdCSmM2bUdWNm8yQ2liZzRZY2pONTdpYVpIVkMwSFM2ckp6aWJoOGRHNXU3Y0h5TGJReHRzT2h3MUI2VGxPaWJjTkQ5QWtzZzRUUDhKamRDSXVNaWNtSEVRLzY0MD93eF9mbXQ9b3RoZXI)

vuex的特点是**把数据单独隔离**，形成一棵树状图。单独隔离就意味着它有自己的生态系统。

输入和输出，其中**action作为数据的输入，state作为数据的输出。**

vuex里有这么一个规则：

**只能在mutations里修改state，actions不能直接修改state**。mutations即变化，修改state的数据，而且只能是同步的，**不能存在异步的操作**。

如果需要异步怎么办呢？把**异步操作放在actions里**，拿到数据**再通过mutations同步处理**。



### 核心概念

#### store
vuex 中最关键的是store对象，这是vuex的核心。可以说**，vuex这个插件其实就是一个store对象，每个vue应用仅且仅有一个store对象。**

创建store 

```js
 const store = new Vuex.Store({...});
```


可见，store是Vuex.Store这个构造函数new出来的实例。在构造函数中可以传一个对象参数。这个参数中可以包含5个对象：

1.state – 存放状态

2.getters – state的计算属性

3.mutations – 更改状态的逻辑，同步操作

4.actions – 提交mutation，异步操作

5.mudules – 将store模块化

关于store，需要先记住两点：

1. store 中存储的状态是响应式的，当组件从store中读取状态时，如果store中的状态发生了改变，那么相应的组件也会得到更新；
2. 不能直接改变store中的状态。**改变store中的状态的唯一途径是提交(commit)mutations**。这样使得我们可以方便地跟踪每一个状态的变化。

```js
//一个完整的store的结构是这样的
const store = new Vuex.Store({
  state: {
    // 存放状态
  },
  getters: {
    // state的计算属性
  },
  mutations: {
    // 更改state中状态的逻辑，同步操作
  },
  actions: {
    // 提交mutation，异步操作
  },
  // 如果将store分成一个个的模块的话，则需要用到modules。
   //然后在每一个module中写state, getters, mutations, actions等。
  modules: {
    a: moduleA,
    b: moduleB,
    // ...
  }
});
```



#### state

state上存放的，说的简单一些就是变量，也就是所谓的状态。没有使用 state 的时候，我们都是直接在 data 中进行初始化的，但是有了 state 之后，我们就把 data 上的数据转移到 state 上去了。另外有些状态是组件私有的状态，称为组件的局部状态，我们不需要把这部分状态放在store中去。

**mapState** 函数返回的是一个对象，为了将它里面的计算属性与组件本身的局部计算属性组合起来，需要用到对象扩展运算符。



#### getters

有时候我们需要从 store 中的 state 中派生出一些状态，例如对列表进行过滤并计数。此时可以用到getters，getters可以看作是store的计算属性，其参数为state。

可使用**mapGetter**s获取getters里面的状态

```js

const store = new Vuex.Store({
  state: {
    todos: [
      {id: 1, text: 'reading', done: true},
      {id: 2, text: 'playBastketball', done: false}
    ]
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done);
    }
  }
})
computed: {
...mapState(['increment']),
...mapGetters(['doneTodos'])
}
```



#### mutations

mutations里面是如何更改state中状态的逻辑。更改Vuex中的state的唯一方法是，提交mutation，即store.commit(‘increment’)

必须是同步函数而不能是异步函数

**提交载荷(payload)**

可以向commit传入额外的参数，即mutation的载荷。

```javascript
mutations: {
  increment(state, n){
    state.count += n;
  }
}
store.commit('increment', 10);
```

**在组件中提交mutations**

方法1: 在组件的methods中提交

```js
methods: {
  increment(){
    this.$store.commit('increment');
  }
}
```


方法2: 使用mapMutaions

用 **mapMutations** 辅助函数将组件中的 methods 映射为 store.commit 调用。

```js
import { mapMutaions } from 'vuex';
export default {
  // ...
  methods: {
    ...mapMutaions([
    'increment' // 映射 this.increment() 为 this.$store.commit('increment')
  ]),
  ...mapMutaions([
      add: 'increment' // 映射 this.add() 为 this.$store.commit('increment')
    ])
    }
}
// 因为mutation相当于一个method，所以在组件中，可以这样来使用
<button @click="increment">+</button>
```



#### actions

因为mutations中只能是同步操作，但是在实际的项目中，会有异步操作，那么**actions就是为了异步操作而设置的**。这样，就变成了在action中去提交mutation，然后在组件的methods中去提交action。只是**提交actions的时候使用的是dispatch函数，而mutations则是用commit函数。**


```js
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment(state){
      state.count++;
    }
  },
  actions: {
    increment(context){
      context.commit('increment');
    }
    /* 可以用参数结构的方法来写action
     increment({commit}){
     commit('increment');
     }
     */
  }
});
 
// action函数接受一个context参数，这个context具有与store实例相同的方法和属性。
// 分发action
store.dispatch('increment');
```

**在组件中分发action**
方法1: 在组件的methods中，使用**this.$store.dispatch(‘increment’)。**

方法2: 使用mapActions，跟mapMutations是类似的。

```js
import { mapActions } from 'vuex'
export default {
  // ...
  methods: {
    ...mapActions([
    'increment' // 映射 this.increment() 为 this.$store.dispatch('increment')
  ]),
  ...mapActions({
  add: 'increment' // 映射 this.add() 为 this.$store.dispatch('increment')
})
}
}
```

**组合actions**
因为action是异步的，那么我们需要知道这个异步函数什么时候结束，以及等到其执行后，会**利用某个action的结果**。这个可以使用promise来实现。在一个action中返回一个promise，然后使用then()回调函数来处理这个action返回的结果。

```js
actions:{
  actionA({commit}){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('someMutation');
        resolve();
      },1000);
    })
  }
}

// 这样就可以操作actionA返回的结果了
store.dispatch('actionA').then(() => {
  // dosomething ...
});

// 也可以在另一个action中使用actionA的结果
actions: {
  // ...
  actionB({ dispatch, commit }){
    return dispatch('actionA').then(() => {
      commit('someOtherMutation');
    })
  }
}
```



#### mudules

module是为了将store拆分后的一个个**小模块**，这么做的目的是因为当store很大的时候，分成模块的话，方便管理。

**每个module拥有自己的state, getters, mutation, action**

对于模块内部的mutation和getter，接受的第一个参数是模块的局部状态state。顺便说一下，根结点的状态为**rootState。**

```js
const moduleA = {
    state: {...},
    getters: {...},
    mutations: {....},
    actions: {...}
}

const moduleB = {
    state: {...},
    getters: {...},
    mutations: {....},
    actions: {...}
} 

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
});

store.state.a // 获取moduleA的状态
store.state.b // 获取moduleB的状态
```

**模块的动态注册**
在模块创建之后，可以使用**store.registerModule**方法来注册模块。

```js
store.registerModule('myModule', {
  // ...
});
```


依然的，可以通过store.state.myModule来获取模块的状态。

可以使用**store.unregisterModule(moduleName)**来动态的卸载模块，但是这种方法对于静态模块是无效的（即在创建store时声明的模块）。



### 含有vuex的项目的结构应该遵循的规则

- 应用层级的状态都应该集中在store中
- 提交 mutation 是更改状态state的唯一方式，并且这个过程是同步的。
- 异步的操作应该都放在action里面




