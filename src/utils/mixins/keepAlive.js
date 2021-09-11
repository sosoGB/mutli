/*
  如果是进入详情页面，就缓存当前列表页，否则就不缓存
  this.detailPages为当前页面能跳转的详情页name的数组
*/
export default {
  beforeRouteLeave(to, from, next) {
    if (this.detailPages.includes(to.name)) {
      from.meta.keepAlive = true;
    } else {
      from.meta.keepAlive = false;
      this.$destroy()
    }
    next();
  }
}