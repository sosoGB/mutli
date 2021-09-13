<template>
  <div class="header">
    <div class="toggle" :class="{'expand': !isMenuExpand, 'collapse': isMenuExpand}" @click="toggleMenuExpand"></div>
    <div></div>
    <div class="userInfo">
      <div class="avatar">
        <!-- <img :src="$store.state.userInfo.avatar" alt="avatar"> -->
        <img src="../../assets/image/qibao.png" alt="avatar" v-show="$store.state.userInfo.id !== 21">
      </div>
      <span class="username">{{$store.state.userInfo.mobile}}</span>
      <span class="logoout" @click="handleLogoutClick">退出登录</span>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    // 当前菜单是否展开
    isMenuExpand () {
      return this.$store.state.isMenuExpand
    }
  },
  methods: {
    // 切换导航栏展开与收起
    toggleMenuExpand () {
      this.$store.commit('toggleMenuExpand', !this.isMenuExpand)
    },
    // 点击退出登录
    async handleLogoutClick () {
      // const res = await this.$request.jsonPost('/qbzz/logout')
      // if (res.code === 0)
      this.$store.commit('saveUserInfo', null)
      localStorage.removeItem("useInfo")
      window.location.href = ''
    }
  }
};
</script>
<style lang="scss" scoped>
.header {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.15);
  padding: 0 60px 0 24px;
  .toggle {
    width: 20px;
    height: 20px;
    cursor: pointer;
    background: url("~@/assets/image/expand.png") no-repeat center;
    &.expand {
      transform: rotate(180deg);
    }
  }
  .userInfo {
    font-size: 14px;
    cursor: pointer;
    display: flex;
    align-items: center;
    color: rgba(115, 115, 115, 1);
    .avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      overflow: hidden;
      > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .username {
      margin-left: 14px;
    }
    .logoout {
      margin-left: 20px;
    }
  }
}
</style>