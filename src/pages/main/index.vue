<template>
  <div class="main">
    <Sidebar class="sidebar"></Sidebar>
    <div class="mainContent">
      <Header class="header"></Header>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import Header from './header'
import Sidebar from './sidebar'
export default {
  components: {
    Header,
    Sidebar
  }
}
</script>
<style lang="scss" scoped>
.main {
  height: 100vh;
  display: flex;
  .mainContent {
    background: rgba(240, 242, 245, 1);
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .content {
      margin: 24px;
      border-radius: 2px;
      background: #fff;
      flex: 1;
      overflow: hidden;
       position: relative;
    }
  }
}
</style>