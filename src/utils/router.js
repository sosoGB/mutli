/*
 * @Author: your name
 * @Date: 2021-09-27 09:39:26
 * @LastEditTime: 2022-02-08 15:44:29
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \mutli\src\utils\router.js
 */
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('../pages/login')
  },
  {
    path: '/main',
    component: () => import('../pages/main/index'),
    children: [
      {
        path: '',
        redirect: 'customerManage/customerList'
      },
      {
        path: 'customerManage',
        redirect: 'customerManage/customerList'
      },
      {
        path: 'customerManage/customerList',
        meta: {
          keepAlive: true
        },
        component: () => import('../pages/customerManage/customerList.vue')
      },
      {
        path: 'customerManage/programRosterList',
        meta: {
          keepAlive: true
        },
        component: () => import('../pages/customerManage/programRosterList.vue')
      },
      {
        path: 'customerManage/programManageList',
        component: () => import('../pages/customerManage/programManageList.vue')
      },
      {
        path: 'customerManage/createTask',
        component: () => import('../pages/customerManage/createTask.vue')
      },
      {
        path: 'callManage/callstrategy',
        meta: {
          keepAlive: true
        },
        component: () => import('../pages/callManage/callStrategy.vue')
      },
      {
        path: 'callManage/createStrategy',
        component: () => import('../pages/callManage/createStrategy.vue')
      },

      {
        path: 'callManage/callTask',
        meta: {
          keepAlive: true
        },
        component: () => import('../pages/callManage/callTask.vue')
      },
      {
        path: 'callManage/createTask',
        component: () => import('../pages/callManage/createTask.vue')
      }
    ]
  },
  {
    path: '/*',
    redirect: '/login'
  }
]

const router = new Router({
  routes
})
router.beforeEach((to, from, next) => {
  const userInfo = localStorage.getItem('user');
  if (!userInfo && to.path!== '/login') {
    next({
      path: '/login'
    })
  }
  next();
})

export default router