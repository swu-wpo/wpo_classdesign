import Vue from "vue";
import VueRouter from "vue-router";
// import Layout from "../views/components/Layout.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/Login",
    // component: Login,
    // meta: {
    //   // id: '01',
    //   title: '首页',
    //   isMenu: false
    // },
    // children: [
    //   {
    //     path: '/Home',
    //     name: 'Home',
    //     component: () => import('@/views/users/test')

    //   }
    // ]
  },
  {
    path: "/Login",
    name: "Login",
    component: Login,
  },
  {
    path: "/Register",
    name: "Register",
    component: Register,
  },
  {
    path: "/Home",
    name: "Home",
    // redirect:"/Home",
    component:()=> import('@/views/components/Layout'),
  },
];

const router = new VueRouter({
  routes,
  mode:'history'
});

export default router;
