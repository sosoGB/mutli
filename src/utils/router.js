import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const accessInfo = () => import(/* webpackChunkName: "accessInfo" */ '../pages/accountManagement/accessInfo.vue')
const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ '../pages/login')
  },
  {
    path: '/main',
    component: () => import(/* webpackChunkName: "main" */ '../pages/main/index'),
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
        component: () => import(/* webpackChunkName: "accountList" */ '../pages/customerManage/customerList.vue')
      },
      {
        path: 'customerManage/createTask',
        component: () => import(/* webpackChunkName: "accountList" */ '../pages/customerManage/createTask.vue')
      },
      {
        path: 'callManage/callstrategy',
        meta: {
          keepAlive: true
        },
        component: () => import(/* webpackChunkName: "accountList" */ '../pages/callManage/callStrategy.vue')
      },
      {
        path: 'callManage/createStrategy',
        component: () => import(/* webpackChunkName: "accountList" */ '../pages/callManage/createStrategy.vue')
      },

      {
        path: 'callManage/callTask',
        meta: {
          keepAlive: true
        },
        component: () => import(/* webpackChunkName: "accountList" */ '../pages/callManage/callTask.vue')
      },
      {
        path: 'callManage/createTask',
        component: () => import(/* webpackChunkName: "accountList" */ '../pages/callManage/createTask.vue')
      },

      {
        path: 'accountManagement/seeAccess',
        component: accessInfo
      },
      {
        path: 'accountManagement/accountList',
        component: () => import(/* webpackChunkName: "accountList" */ '../pages/accountManagement/accountList.vue')
      },
      {
        path: 'accountManagement/deal',
        component: () => import(/* webpackChunkName: "deal" */ '../pages/accountManagement/deal.vue')
      },
      {
        path: 'accountManagement/addAccount',
        component: () => import(/* webpackChunkName: "addAccount" */ '../pages/accountManagement/addAccount.vue')
      },
      {
        path: 'accountManagement/editInfo',
        component: () => import(/* webpackChunkName: "editInfo" */ '../pages/accountManagement/editInfo.vue')
      },
      {
        path: 'accountManagement/permissionManagement',
        component: () => import(/* webpackChunkName: "permissionManagement" */ '../pages/accountManagement/permissionManagement.vue')
      },
      {
        path: 'accountManagement/listDownLoad',
        component: () => import(/* webpackChunkName: "listDownLoad" */ '../pages/accountManagement/listDownload.vue')
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