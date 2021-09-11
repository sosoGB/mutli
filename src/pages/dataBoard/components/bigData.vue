<template>
    <div class="bigData">
      <div class="group">
        <p><span class="num">{{userCount}}</span>家</p>
        <p>客户数量</p>
        <p>——</p>
      </div>
      <div class="group">
        <p><span class="num">{{robotCount}}</span>个</p>
        <p>机器人个数</p>
        <p>——</p>
      </div>
      <div class="group">
        <p><span class="num">{{serviceCount}}</span>次</p>
        <p>服务调用次数</p>
        <p>——</p>
      </div>
      <div class="group">
        <p><span class="num">{{orderPrice}}</span>元</p>
        <p>订单金额</p>
        <p>——</p>
      </div>
      <div class="group">
        <p><span class="num">{{onlineTime}}</span>小时</p>
        <p>机器人总在线时长</p>
        <p>——</p>
      </div>
      <div class="group" style="border-right: none">
        <p><span class="num">{{businessCount}}</span>次</p>
        <p>机器人产生商机数量</p>
        <p>——</p>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      userCount: 0,
      robotCount: 0,
      serviceCount: 0,
      orderPrice: 0,
      onlineTime: 0,
      businessCount: 0,
    }
  },
  created() {
    this.getAllCountData()
  },
  methods: {
    async getAllCountData() {
      const res = await this.$request.get('/board/getAllCount')
      this.userCount = res.data.userCount
      this.robotCount = res.data.robotCount
      this.serviceCount = res.data.serviceCount
      this.orderPrice = res.data.orderPrice
      this.onlineTime = res.data.onlineTime
      this.businessCount = res.data.businessCount
    }
  }
}
</script>
 
<style scoped lang="scss">
  .bigData{
    width: 1200px;
    height: 180px;
    background:rgba(18,19,49,0);
    border:1px solid rgba(6, 104, 186, 0.5);
    border-radius:2px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .group{
      height: 140px;
      padding: 0 50px;
      border-right: 1px solid #0668BA;
      display: flex;
      flex-direction: column;
      justify-content: center;
      p{
        font-size: 12px;
        color: rgba(255, 255, 255, 0.8);
        &:nth-child(2){
          margin-top: 5px;
        }
        &:last-child{
          margin-top: 20px
        }
        .num{
          font-weight: bold;
          font-size: 24px;
          color: white;
          margin-right: 6px;
        }
      }
    }
  }
</style>