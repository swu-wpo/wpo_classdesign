import Vue from "vue";
import VueRouter from "vue-router";
// import Layout from "../views/components/Layout.vue";
import Login from "../views/Login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    // redirect:"/Home",
    component: Login,
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
    path: "/Home",
    name: "Home",
    // redirect:"/Home",
    component: Login,
  },
];

const router = new VueRouter({
  routes,
  mode:'history'
});

export default router;
