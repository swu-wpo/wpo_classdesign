import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/layout/Layout'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)

/**
 * 不用登陆就能看到的路由
 * 没有权限
*/
export const constantRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login')
  },
  {
    path: '/page401',
    name: '401',
    component: () => import('@/views/errorPages/401')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/errorPages/404')
  },
  {
    path: '/',
    redirect: '/dashboard',
    component: Layout,
    meta: {
      // id: '01',
      title: '首页',
      isMenu: false
    },
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard/index')

      }
    ]
  }
]
/**
 * 需要登陆后才能看到的路由，有权限管理
*/
export const asyncRoutes = [
  {
    path: '/business',
    name: 'business',
    component: Layout,
    meta: {
      id: '00',
      title: '需要处理事务',
      isMenu: true,
      icon: 'el-icon-finished',
      cache: false
    },
    children: [
      {
        path: '/business/devtrouble',
        name: 'devtrouble',
        component: () => import('@/views/businesstodeal/DevTrouble'),
        meta: {
          id: '0000',
          title: '设备故障检查',
          isMenu: true,
          cache: false
        }
      },
      {
        path: '/business/abnormal',
        name: 'abnormal',
        component: () => import('@/views/businesstodeal/AbnormalCheck'),
        meta: {
          id: '0001',
          title: '母猪异常检查',
          isMenu: true,
          cache: false
        }
      },
      {
        path: '/business/production',
        name: 'operationBoard',
        component: () => import('@/views/businesstodeal/Production'),
        meta: {
          id: '0002',
          title: '母猪生产状态',
          isMenu: true,
          cache: false
        }
      },
      {
        path: '/business/pigTrans',
        name: 'pigTrans',
        component: () => import('@/views/businesstodeal/PigTrans'),
        meta: {
          id: '0003',
          title: '母猪转栏处理',
          isMenu: true,
          cache: false
        }
      },
      {
        path: '/business/health',
        name: 'operationBoard',
        component: () => import('@/views/businesstodeal/HealthDeal'),
        meta: {
          id: '0004',
          title: '母猪健康处理',
          isMenu: true,
          cache: false
        }
      }
    ]
  },
  {
    path: '/pigfarm',
    name: 'pigfarm',
    component: Layout,
    meta: {
      id: '01',
      title: '养猪场设置',
      isMenu: true,
      icon: 'el-icon-setting',
      cache: false
    },
    children: [
      {
        path: '/pigfarm/pigfarmSet',
        name: 'pigfarmSet',
        component: () => import('@/views/pigfarm/PigfarmSet'),
        meta: {
          id: '0100',
          title: '猪舍设置',
          isMenu: true,
          cache: false
        }
      },
      {
        path: '/pigfarm/pigVariety',
        name: 'pigVariety',
        component: () => import('@/views/pigfarm/PigVariety'),
        meta: {
          id: '0101',
          title: '猪品种添加',
          isMenu: true,
          cache: false
        }
      },
      {
        path: '/pigfarm/feedStationSet',
        name: 'feedStationSet',
        component: () => import('@/views/pigfarm/FeedStationSet'),
        meta: {
          id: '0102',
          title: '饲喂站设置',
          isMenu: true,
          cache: false
        }
      },
      {
        path: '/pigfarm/productionPlan',
        name: 'pigfarmSet',
        component: () => import('@/views/pigfarm/ProductionPlan'),
        meta: {
          id: '0103',
          title: '生产计划设置',
          isMenu: true,
          cache: false
        }
      }
    ]
  },
  {
    path: '/newpigreg',
    name: 'newpigreg',
    component: Layout,
    meta: {
      id: '02',
      title: '新猪注册管理',
      isMenu: true,
      icon: 'el-icon-edit-outline',
      cache: false
    },
    children: [
      {
        path: '/newpigreg/sowReg',
        name: 'sowRe',
        component: () => import('@/views/newpigreg/sowReg'),
        meta: {
          id: '0200',
          title: '母猪信息注册',
          isMenu: true,
          cache: false
        }
      },
      {
        path: '/newpigreg/boarReg',
        name: 'boarReg',
        component: () => import('@/views/newpigreg/boarReg'),
        meta: {
          id: '0201',
          title: '公猪信息注册',
          isMenu: true,
          cache: false
        }
      },
      {
        path: '/newpigreg/babyReg',
        name: 'babyReg',
        component: () => import('@/views/newpigreg/babyReg'),
        meta: {
          id: '0202',
          title: '产仔信息注册',
          isMenu: true,
          cache: false
        }
      }
    ]
  },
  {
    path: '/statistics',
    name: 'statistics',
    component: Layout,
    meta: {
      id: '03',
      title: '统计信息报表',
      isMenu: true,
      icon: 'el-icon-document',
      cache: false
    },
    children: [
      {
        path: '/statistics/sowinfo',
        name: 'sowinfo',
        component: () => import('@/views/statistics/sowinfo'),
        meta: {
          id: '0300',
          title: '母猪基本信息',
          isMenu: true,
          cache: false
        }
      },
      {
        path: '/statistics/eatrecord',
        name: 'eatrecord',
        component: () => import('@/views/statistics/eatrecord'),
        meta: {
          id: '0301',
          title: '进食记录统计',
          isMenu: true,
          cache: false
        }
      },
      {
        path: '/statistics/pigfarmstat',
        name: 'pigfarm',
        component: () => import('@/views/statistics/pigfarmstat'),
        meta: {
          id: '0302',
          title: '养猪场数据统计',
          isMenu: true,
          cache: false
        }
      },
      {
        path: '/statistics/sowstat',
        name: 'sowstat',
        component: () => import('@/views/statistics/sowstat'),
        meta: {
          id: '0303',
          title: '母猪数据统计',
          isMenu: true,
          cache: false
        }
      },
      {
        path: '/statistics/stationstat',
        name: 'stationstat',
        component: () => import('@/views/statistics/stationstat'),
        meta: {
          id: '0304',
          title: '饲喂站统计',
          isMenu: true,
          cache: false
        }
      }
    ]
  },
  {
    path: '/enterprise',
    name: 'enterprise',
    component: Layout,
    meta: {
      id: '04',
      title: '实时状态监测',
      isMenu: true,
      icon: 'el-icon-monitor',
      cache: false
    },
    children: [
      {
        path: '/application/list',
        name: 'applicationList',
        component: () => import('@/views/tenant/List'),
        meta: {
          id: '0400',
          title: '运营人员管理',
          isMenu: true,
          cache: false
        }
      }
    ]
  },
  {
    path: '/chStaff',
    name: 'chStaff',
    component: Layout,
    meta: {
      id: '05',
      title: '饲喂计划设置',
      isMenu: true,
      icon: 'el-icon-setting',
      cache: false
    },
    children: [
      {
        path: '/chStaff/list',
        name: 'chStaffList',
        component: () => import('@/views/tenant/have'),
        meta: {
          id: '0500',
          title: '已有饲喂计划',
          isMenu: true,
          cache: false
        }
      },
      {
        path: '/chStaff/add',
        name: 'chStaffList',
        component: () => import('@/views/tenant/List'),
        meta: {
          id: '0501',
          title: '添加饲喂计划',
          isMenu: true,
          cache: false
        }
      }
    ]
  },
  {
    path: '/settings',
    name: 'settings',
    component: Layout,
    meta: {
      id: '06',
      title: '系统管理',
      isMenu: true,
      icon: 'el-icon-s-tools',
      cache: false
    },
    children: [
      {
        path: '/settings/operators',
        name: 'op',
        component: () => import('@/views/settings/Operation'),
        meta: {
          id: '0600',
          title: '运营人员管理',
          isMenu: true,
          cache: false
        }
      },
      {
        path: '/settings/auth',
        name: 'settingAuth',
        component: () => import('@/views/settings/Roles'),
        meta: {
          id: '0601',
          title: '角色权限',
          isMenu: true,
          cache: false
        }
      },
      {
        path: '/settings/dictionary',
        name: 'supenUser',
        component: () => import('@/views/settings/Dictionary'),
        meta: {
          id: '0602',
          title: '字典管理',
          isMenu: true,
          cache: false
        }
      },
      {
        path: '/settings/logs',
        name: 'settingLogs',
        component: () => import('@/views/settings/Logs'),
        meta: {
          id: '0603',
          title: '操作日志',
          isMenu: true,
          cache: false
        }
      }
    ]
  },
  // {
  //   path: '/manager',
  //   name: 'manager',
  //   component: Layout,
  //   meta: {
  //     id: '02',
  //     title: '系统管理',
  //     isMenu: true,
  //     icon: 'el-icon-s-tools',
  //     cache: false
  //   },
  //   children: [
  //     {
  //       path: '/manager/all',
  //       name: 'all',
  //       component: () => import('@/views/manager/index'),
  //       redirect: '/manager/all/list',
  //       meta: {
  //         id: '021',
  //         title: '管理员列表',
  //         isMenu: true,
  //         cache: false
  //       },
  //       children: [
  //         {
  //           path: '/manager/all/list',
  //           name: 'list',
  //           component: () => import('@/views/manager/AllManager'),
  //           meta: {
  //             id: '0211',
  //             title: '所有管理员列表',
  //             isMenu: true,
  //             cache: false
  //           }
  //         }
  //       ]
  //     },
  //     {
  //       path: '/manager/other',
  //       name: 'other',
  //       component: () => import('@/views/manager/Ohter'),
  //       meta: {
  //         id: '022',
  //         title: '其他列表',
  //         isMenu: true,
  //         cache: false
  //       }
  //     }
  //   ]
  // },
  // {
  //   path: '/data',
  //   name: 'data',
  //   component: Layout,
  //   redirect: '/data/index',
  //   meta: {
  //     isMenu: true,
  //     isMenuItem: true,
  //     icon: 'el-icon-s-tools',
  //     id: '03'
  //   },
  //   children: [
  //     {
  //       path: '/data/index',
  //       name: 'index',
  //       component: () => import('@/views/data/index'),
  //       meta: {
  //         id: '03',
  //         title: '数据列表',
  //         isMenu: true,
  //         cache: false
  //       }
  //     }
  //   ]
  // },
  // {
  //   path: '/role',
  //   name: 'role',
  //   component: Layout,
  //   redirect: '/role/index',
  //   meta: {
  //     isMenu: true,
  //     isMenuItem: true,
  //     icon: 'el-icon-user',
  //     id: '04'
  //   },
  //   children: [
  //     {
  //       path: '/role/index',
  //       name: 'roleIndex',
  //       component: () => import('@/views/data/index'),
  //       meta: {
  //         id: '04',
  //         title: '角色列表',
  //         isMenu: true,
  //         cache: false
  //       }
  //     }
  //   ]
  // },

  { path: '*', redirect: '/404' }
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: constantRoutes
})

export default router
