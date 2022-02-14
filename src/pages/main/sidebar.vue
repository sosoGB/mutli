<template>
  <div class="menu-wrap">
    <div
      class="menu-logo"
      :class="{ expand: isMenuExpand, collapse: !isMenuExpand }"
      @click="$router.push('/main')"
    ></div>
    <el-menu
      router
      unique-opened
      class="menu"
      :default-active="$route.path"
      :collapse="!isMenuExpand"
    >
      <template v-for="menu in menuList">
        <el-submenu
          :index="menu.route"
          v-if="!menu.hidden && menu.children && menu.children.length"
          :key="menu.name"
          popper-class="submenu-popup"
        >
          <template slot="title" class="menu-item">
            <img
              :src="menu.actived ? menu.activeIcon : menu.inactiveIcon"
              alt="icon"
              class="menu-icon"
            />
            <span>{{ menu.name }}</span>
          </template>
          <el-menu-item
            :index="child.route"
            v-for="child in menu.children"
            :key="child.name"
          >
            <span slot="title">{{ child.name }}</span>
          </el-menu-item>
        </el-submenu>
        <el-menu-item
          :index="menu.route"
          v-if="!menu.hidden && !menu.children"
          :key="menu.name"
        >
          <template slot="title" class="menu-item">
            <img
              :src="menu.actived ? menu.activeIcon : menu.inactiveIcon"
              alt="icon"
              class="menu-icon"
            />
            <span>{{ menu.name }}</span>
          </template>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>
<script>
export default {
  data() {
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
              name: '名单批次管理',
              route: '/main/customerManage/customerList'
            },
            {
              name: '项目批次管理',
              route: '/main/customerManage/programRosterList'
            }
          ]
        },
        {
          name: '呼叫管理',
          route: '/main/callManage',
          activeIcon: require('@/assets/image/sidebar_opportunity.png'),
          inactiveIcon: require('@/assets/image/sidebar_opportunity.png'),
          hidden: isPartial,
          children: [
            // {
            //   name: '呼叫策略管理',
            //   route: '/main/callManage/callStrategy',
            // },
            {
              name: '呼叫任务管理',
              route: '/main/callManage/callTask'
            }
          ]
        }
      ]
    }
  },
  computed: {
    isMenuExpand() {
      return this.$store.state.isMenuExpand
    }
  },
  created() {
    this.isPartial && this.$router.replace('/main/operationReport/reportList')
    if (this.$store.state.userInfo.id === 3) {
      this.menuList.splice(1, 3)
    }
    require('@/assets/css/qibao-sidebar.scss')
  }
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
