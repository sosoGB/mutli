<template>
    <div class="chart">
      <div class="chartItem">
        <div class="statistics">
          <div class="title"><span>客户数量统计</span></div>
          <div style="width:320px;height:250px" ref="pie_0"></div>
        </div>
        <div class="trend">
          <div class="title">
            <span>客户增长趋势</span>
            <select class="trendType" @change="changeType(0)" v-model="type[0]">
              <option value="1">近一年</option>
              <option value="2">全部</option>
            </select>
          </div>
          <div style="width:870px;height:250px" ref="bar_0"></div>
        </div>
      </div>
      <div class="chartItem">
        <div class="statistics">
          <div class="title"><span>机器人数量统计</span></div>
          <div style="width:320px;height:250px" ref="pie_1"></div>
        </div>
        <div class="trend">
          <div class="title">
            <span>机器人增长趋势</span>
            <select class="trendType" @change="changeType(1)" v-model="type[1]">
              <option value="1">近一年</option>
              <option value="2">全部</option>
            </select>
          </div>
          <div style="width:870px;height:250px" ref="bar_1"></div>
        </div>
      </div>
      <div class="chartItem">
        <div class="statistics">
          <div class="title"><span>服务调用量统计</span></div>
          <div style="width:320px;height:250px" ref="pie_2"></div>
        </div>
        <div class="trend">
          <div class="title">
            <span>服务调用量趋势</span>
            <select class="trendType" @change="changeType(2)" v-model="type[2]">
              <option value="1">近一年</option>
              <option value="2">全部</option>
            </select>
          </div>
          <div style="width:870px;height:250px" ref="bar_2"></div>
        </div>
      </div>
      <div class="chartItem">
        <div class="statistics">
          <div class="title"><span>订单金额统计</span></div>
          <div style="width:320px;height:250px" ref="pie_3"></div>
        </div>
        <div class="trend">
          <div class="title">
            <span>订单金额趋势</span>
            <select class="trendType" @change="changeType(3)" v-model="type[3]">
              <option value="1">近一年</option>
              <option value="2">全部</option>
            </select>
          </div>
          <div style="width:870px;height:250px" ref="bar_3"></div>
        </div>
      </div>
    </div>
</template>
 
<script>
import {getPieOption, getBarOption} from './option'
export default {
  data () {
    return {
      //type键: 0用户 1机器人 2服务调用 3订单金额; type值: 1近一年 2全部
      type: [1,1,1,1]
    }
  },
  mounted() {
    this.getUserBarData()
    this.getUserPieData()
    this.getRobotPieData()
    this.getRobotBarData()
    this.getServicePieData()
    this.getServiceBarData()
    this.getOrderPieData()
    this.getOrderBarData()
  },
  methods: {
    changeType(index) {
      switch(index) {
        case 0:
          this.getUserBarData(this.type[index])
          break;
        case 1:
          this.getRobotBarData(this.type[index])
          break;
        case 2:
          this.getServiceBarData(this.type[index])
          break;
        case 3:
          this.getOrderBarData(this.type[index])
          break;
      } 
    },
    async getUserPieData() {
      let res = await this.$request.get('/board/getUserPieCount')
      let pieOption = getPieOption(res.data)
      this.$echarts.init(this.$refs.pie_0).setOption(pieOption)
    },
    async getUserBarData(type=1) {
      let res = await this.$request.get('/board/getUserGraphCount',{type})
      let barOption = getBarOption(res.data)
      this.$echarts.init(this.$refs.bar_0).setOption(barOption)
    },
    async getRobotPieData() {
      let res = await this.$request.get('/board/getRobotPieCount')
      let pieOption = getPieOption(res.data)
      this.$echarts.init(this.$refs.pie_1).setOption(pieOption)
    },
    async getRobotBarData(type=1) {
      let res = await this.$request.get('/board/getRobotGraphCount',{type})
      let barOption = getBarOption(res.data)
      this.$echarts.init(this.$refs.bar_1).setOption(barOption)
    },
    async getServicePieData() {
      let res = await this.$request.get('/board/getServicePieCount')
      let pieOption = getPieOption(res.data)
      this.$echarts.init(this.$refs.pie_2).setOption(pieOption)
    },
    async getServiceBarData(type=1) {
      let res = await this.$request.get('/board/getServiceGraphCount',{type})
      let barOption = getBarOption(res.data)
      this.$echarts.init(this.$refs.bar_2).setOption(barOption)
    },
    async getOrderPieData() {
      let res = await this.$request.get('/board/getOrderPieCount')
      let pieOption = getPieOption(res.data)
      this.$echarts.init(this.$refs.pie_3).setOption(pieOption)
    },
    async getOrderBarData(type=1) {
      let res = await this.$request.get('/board/getOrderGraphCount',{type})
      let barOption = getBarOption(res.data)
      this.$echarts.init(this.$refs.bar_3).setOption(barOption)
    },
  }
}
</script>
 
<style scoped lang="scss">
  .chart{
    .chartItem{
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
      .title{
        background:linear-gradient(90deg,rgba(32,156,255,0.49),rgba(1,5,20,0));
        font-size: 10px;
        line-height: 30px;
        height: 30px;
        span{
          margin-left: 10px
        }
      }
      .statistics{
        /* width: 320px;
        height: 280px; */
        border:1px solid rgba(6, 104, 186, 0.5);
        border-radius:2px;
      }
      .trend{
        /* height: 280px;
        width: 870px; */
        border:1px solid rgba(6, 104, 186, 0.5);
        border-radius:2px;
        .title{
          display: flex;
          justify-content: space-between;
          align-items: center;
          .trendType{
            background:rgba(0,0,0,0.2);
            border:1px solid rgba(46,117,216,1);
            color: white;
            height: 22px;
            width: 66px;
            margin-right: 10px;
          }
        }
      }
    }
  }
</style>