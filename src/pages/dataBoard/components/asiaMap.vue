<template>
    <div class="asia">
      <div class="title"><span>客户亚洲区域分布</span></div>
      <div ref="asiaMap" style="width:1198px;height:560px"></div>
    </div>
</template>
 
<script>
import {getAsiaMapOption} from './option'
export default {
  mounted() {
    this.getAsiaMap()
  },
  methods: {
    async getAsiaMap() {
      const res = await this.$request.get('/board/getAsiaMapData')
      this.drawMap(res.data.asia)
    },
    drawMap(data) {
      const option = getAsiaMapOption(data)
      this.$echarts.init(this.$refs.asiaMap).setOption(option)
    }
  }
}
</script>
 
<style scoped lang="scss">
  .asia{
    border:1px solid rgba(6, 104, 186, 0.5);
    border-radius:2px;
    width: 1200px;
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