<template>
  <div>
    <p>粉丝分布数据图(Echarts)</p>
    <p>// 由于接口文档没有此数据接口，故模拟了数据。</p>
    <EChart></EChart>
  </div>
</template>

<script>
import EChart from '@/views/index/components/charts.vue'

export default {
  name: 'IndexCom',
  components: {
    EChart
  }
}
</script>

<style lang="less" scoped>
</style>
