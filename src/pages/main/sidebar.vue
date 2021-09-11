<template>
  <div class="menu-wrap">
    <div class="menu-logo" :class="{ expand: isMenuExpand, collapse: !isMenuExpand }" @click="$router.push('/main')"></div>
    <el-menu router unique-opened class="menu" :default-active="$route.path" :collapse="!isMenuExpand" @select="handleSelect">
      <template v-for="menu in menuList">
        <el-submenu :index="menu.route" v-if="!menu.hidden && menu.children && menu.children.length" :key="menu.name" popper-class="submenu-popup">
          <template slot="title" class="menu-item">
            <img :src="menu.actived ? menu.activeIcon : menu.inactiveIcon" alt="icon" class="menu-icon" />
            <span>{{ menu.name }}</span>
          </template>
          <el-menu-item :index="child.route" v-for="child in menu.children" :key="child.name">
            <span slot="title">{{ child.name }}</span>
          </el-menu-item>
        </el-submenu>
        <el-menu-item :index="menu.route" v-if="!menu.hidden && !menu.children" :key="menu.name">
          <template slot="title" class="menu-item">
            <img :src="menu.actived ? menu.activeIcon : menu.inactiveIcon" alt="icon" class="menu-icon" />
            <span>{{ menu.name }}</span>
          </template>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>
<script>
export default {
  data () {
    const isPartial = this.$store.state.userInfo.username === 'report'
    return {
      isPartial,
      menuList: [
        {
          name: '客户管理',
          route: '/main/customerManage',
          actived: true,
          activeIcon: require('@/assets/image/sidebar_account.png'),
          inactiveIcon: require('@/assets/image/sidebar_account.png'),
          hidden: isPartial,
          children: [
            {
              name: '客户批次管理',
              route: '/main/customerManage/customerList'
            },
            // {
            //   name: '账号管理',
            //   route: '/main/accountManagement/accountList'
            // },
            // {
            //   name: '角色管理',
            //   route: '/main/roleManagement/roleList'
            // }
          ]
        },
        {
          name: '呼叫管理',
          route: '/main/callManage',
          activeIcon: require('@/assets/image/sidebar_opportunity.png'),
          inactiveIcon: require('@/assets/image/sidebar_opportunity.png'),
          hidden: isPartial,
          children: [
            {
              name: '呼叫策略管理',
              route: '/main/callManage/callStrategy',
            },
            {
              name: '呼叫任务管理',
              route: '/main/callManage/callTask',
            },
          ],
        },
        // {
        //   name: '商机线索',
        //   route: '/main/opportunity',
        //   actived: true,
        //   activeIcon: require('@/assets/image/sidebar_opportunity.png'),
        //   inactiveIcon: require('@/assets/image/sidebar_opportunity.png'),
        //   hidden: isPartial,
        //   children: [
        //     {
        //       name: '商机线索客户',
        //       route: '/main/opportunity/customer',
        //     },
        //     {
        //       name: '商机名单',
        //       route: '/main/opportunity/sheet',
        //     },
        //   ],
        // },
        // {
        //   name: '运营报表',
        //   route: '/main/operationReport',
        //   actived: true,
        //   activeIcon: require('@/assets/image/sidebar_operationReport.png'),
        //   inactiveIcon: require('@/assets/image/sidebar_operationReport.png'),
        //   children: [
        //     {
        //       name: '运营报表',
        //       route: '/main/operationReport/reportList',
        //     },
        //   ],
        // },
        // {
        //   name: '话术管理',
        //   route: '/main/trick',
        //   actived: true,
        //   activeIcon: require('@/assets/image/sidebar_trick.png'),
        //   inactiveIcon: require('@/assets/image/sidebar_trick.png'),
        //   children: [
        //     {
        //       name: '产品类话术',
        //       route: '/main/trick/product',
        //     },
        //     {
        //       name: '公司服务咨询类话术',
        //       route: '/main/trick/company',
        //     },
        //   ],
        // },
      ],
    }
  },
  computed: {
    isMenuExpand () {
      return this.$store.state.isMenuExpand
    },
  },
  created () {
    this.isPartial && this.$router.replace('/main/operationReport/reportList')
    if (this.$store.state.userInfo.id === 3) {
      this.menuList.splice(1, 3)
      // this.menuList[0].children.push(
      //   {
      //     name: '交易统计',
      //     route: '/main/accountManagement/deal'
      //   },
      //   {
      //     name: '历史流量统计',
      //     route: '/main/operationReport/flowQuota'
      //   },
      //   {
      //     name: '当前流量统计',
      //     route: '/main/operationReport/curFlowQuota'
      //   }
      // )
      // this.menuList[0].children = [
      //   {
      //     name: '历史流量统计',
      //     route: '/main/operationReport/flowQuota',
      //   },
      //   {
      //     name: '当前流量统计',
      //     route: '/main/operationReport/curFlowQuota',
      //   },
      // ]
    }
    // if (this.$store.state.userInfo.id === 21) {
    //   //易宝临时项目特殊处理
    //   // require('@/assets/css/yibao/index.css')
    //   // require('@/assets/css/yibao-sidebar.scss')
    //   import('@/assets/css/yibao/index.css')
    //   import('@/assets/css/yibao-sidebar.scss')
    //   document.title = '易宝支付商户管理后台'
    //   document.querySelector('link').href = '/yee.jpg'

    //   this.menuList = [
    //     {
    //       name: '商户管理后台',
    //       route: '/main/merchant',
    //       actived: true,
    //       activeIcon: require('@/assets/image/sidebar_merchant.png'),
    //       inactiveIcon: require('@/assets/image/sidebar_merchant.png'),
    //       children: [
    //         {
    //           name: '订单中心',
    //           route: '/main/merchant/orderList',
    //         },
    //         {
    //           name: '对账中心',
    //           route: '/main/merchant/accountList',
    //         },
    //         {
    //           name: '结算中心',
    //           route: '/main/merchant/balanceCenter',
    //         },
    //       ],
    //     },
    //   ]
    // } else {
    //   require('@/assets/css/qibao-sidebar.scss')
    // }
    require('@/assets/css/qibao-sidebar.scss')
  },
  
  methods: {
    handleSelect (key) {
      if (!key) {
        window.open('/dataBoard.html', '_blank')
      }
    },
  },
}
</script>
<style lang="scss" scoped></style>
<style lang="scss">
.submenu-popup {
  .el-menu-item {
    padding-left: 70px !important;
    background: #000c17;
    color: #fff;
    &.is-active {
      background: $themeColor;
    }
    &:hover,
    &:focus {
      background: $themeColor;
    }
  }
}
.menu {
  .el-menu-item {
    background-color: #000c17;
    color: rgba(255, 255, 255, 0.7);
  }
  .el-menu-item:hover,
  .el-menu-item:focus {
    background-color: #2e008b !important;
  }
  .el-submenu__title {
    font-size: 16px;
    color: rgba(255, 255, 255, 0.7);
    &:hover {
      background-color: #2e008b;
    }
    .menu-icon {
      width: 18px;
      height: 18px;
      margin-right: 25px;
      vertical-align: middle;
    }
  }
}
</style>
