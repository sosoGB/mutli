<template>
    <div class="map">
      <div class="title"><span>客户中国区域分布</span></div>
      <div ref="ChinaMap" style="width:620px;height:450px"></div>
    </div>
</template>
 
<script>
import 'echarts/map/js/china'
import {getChinaMapOption} from './option'
export default {
  mounted() {
    this.getChinaMap()
  },
  methods: {
    async getChinaMap() {
      const res = await this.$request.get('/board/getChinaMapData')
      this.drawMap(res.data.china)
    },
    drawMap(data) {
      const option = getChinaMapOption(data)
      this.$echarts.init(this.$refs.ChinaMap).setOption(option)
    }
  }
}
</script>
 
<style scoped lang="scss">
  .map{
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
  }
</style>