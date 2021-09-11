<template>
    <div class="realTime">
      <div class="title"><span>实时监控</span></div>
      <div class="listTitle">
        <ul class="listType">
          <li class="customer">客户</li>
          <li class="service">产品服务</li>
          <li class="time">交易时间</li>
          <!-- <li class="number">数量</li>
          <li class="money">交易金额（元）</li> -->
        </ul>
      </div>
      <div class="content">
        <div class="listContent" :class="{marquee_top:animate}">
          <ul class="list" v-for="(item, index) in customerList" :key="index">
            <li class="customer">{{item.mobile}}</li>
            <li class="service">{{item.ftype}}</li>
            <li class="time">{{item.orderTime}}</li>
            <!-- <li class="number">{{item.num}}</li>
            <li class="money">{{item.price}}</li> -->
          </ul>
        </div>
      </div>
    </div>
</template>
 
<script>
export default {
  data() {
    return {
      animate: false,
      customerList: []
    }
  },
  created() {
    this.getRealTime()
    setInterval(this.showMarquee, 1000)
  },
  methods: {
    async getRealTime() {
      const res = await this.$request.get('/board/getRealTimeData')
      this.customerList = res.data
    },
    showMarquee: function () {
        this.animate = true;
        setTimeout(()=>{
            this.customerList.push(this.customerList[0]);
        this.customerList.shift();
        this.animate = false;
    },500)},
  }
}
</script>
 
<style scoped lang="scss">
  .realTime{
    width: 570px;
    border:1px solid rgba(6, 104, 186, 0.5);
    border-radius:2px;
    .title{
      background:linear-gradient(90deg,rgba(32,156,255,0.49),rgba(1,5,20,0));
      font-size: 10px;
      line-height: 30px;
      height: 30px;
      span{
        margin-left: 10px
      }
    }
    .listTitle{
      height: 60px;
      display: flex;
      align-items: center;
      .listType{
        width: 100%;
        justify-content: space-around;
      }
    }
    ul{
        font-size: 13px;
        text-align: center;
        display: flex;
        justify-content: space-around;
        .customer{
          width: 120px;
        }
        .service{
          width: 90px
        }
        .time{
          width: 150px;
        }
        /* .number{
          width: 70px
        }
        .money{
          width: 100px;
        } */
      }
    .list{
      margin: 15px 0;
    }
    .content{
      box-sizing: content-box;
      /* padding-top: 20px;
      padding-bottom: 10px; */
      height: 360px;
      overflow: hidden;
      position: relative;
      display: flex;
      justify-content: center;
      .marquee_top {
        transition: all 0.5s;
        margin-top: -40px
      }
      .listContent{
        /* margin-top: 12px; */
        /* display: block; */
        position: absolute;
        width: 570px;
        //height: 380px;
        //overflow-y: scroll;
        //&::-webkit-scrollbar {/*滚动条整体样式*/
        //width: 8px;     /*高宽分别对应横竖滚动条的尺寸*/
        //}
        //&::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
        //  border-radius: 10px;
        //  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        //  background: rgba(255,255,255,0.1);
        //}
        //&::-webkit-scrollbar-track {/*滚动条里面轨道*/
        //  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        //  border-radius: 10px;
        //  background: rgba(32,156,255,0.2);
        //}
        ul{
          height: 25px;
        }
      }
    }
  }
</style>