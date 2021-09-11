<template>
    <div id="app">
      <div class="container">
        <div class="dateTime">
          <span>{{date}}</span>
          <span>{{day}}</span>
          <span>{{time}}</span>
        </div>
        <div class="title">AI大数据看板</div>
        <Big-Data class="section"></Big-Data>
        <Chart class="section"></Chart>
        <div class="lastRow">
          <Map class="section"></Map>
          <Real-Time class="section"></Real-Time>
        </div>
        <Asia-Map class="section"></Asia-Map>
      </div>
    </div>
</template>
 
<script>
import BigData from './components/bigData'
import Chart from './components/chart.vue'
import Map from './components/map'
import AsiaMap from './components/asiaMap'
import RealTime from './components/realTime'
export default {
  components: {
    BigData,
    Chart,
    Map,
    RealTime,
    AsiaMap
  },
  data() {
    return {
      date: '',
      day: '',
      time: ''
    }
  },
  created() {
    this.getRealTime()
  },
  methods: {
    getRealTime() {
      let dateObj = new Date()
      let year = dateObj.getFullYear()
      let month = dateObj.getMonth() + 1
      let date = dateObj.getDate()
      let day = dateObj.getDay()
      let weeks = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
      let week = weeks[day]
      let hour = dateObj.getHours()
      let minute = dateObj.getMinutes()
      let second = dateObj.getSeconds()
      month = month<10?'0'+month:month
      date = date<10?'0'+date:date
      hour = hour<10?'0'+hour:hour
      minute = minute<10?'0'+minute:minute
      second = second<10?'0'+second:second
      this.date = year + "年" + month + "月" + date + "日"
      this.day = week
      this.time = hour + ":" + minute + ":" + second
      setTimeout(this.getRealTime, 1000);     
    }
  }
}
</script>
 
<style scoped lang="scss">
  #app{
    background-color: #06011E;
    background: #06011E center url('./image/background.jpg');
    display: flex;
    justify-content: center;
    color: white;
    .container{
      width: 1200px;
      box-sizing: content-box;
      .dateTime{
        position: relative;
        top: 45px;
        font-size: 14px;
        color: rgba(255, 255, 255, 0.8);
        span{
          margin-right: 15px;
          letter-spacing: 1px;
        }
      }
      .title{
        display: flex;
        justify-content: center;
        font-size: 42px;
        font-weight: 400;
        margin-bottom: 20px;
        letter-spacing: 3px;
      }
      .section{
        margin-bottom: 20px
      }
      .lastRow{
        display: flex;
        justify-content: space-between
      }
    }
  }
</style>