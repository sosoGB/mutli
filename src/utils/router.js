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

export default new Router({
  routes
})