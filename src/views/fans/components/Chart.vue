<template>
  <div>
    <div ref="main" id="main" style="width: 600px;height:400px;"></div>
  </div>
</template>

<script>
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts'

export default {
  name: 'ChartCom',
  // 初始化DOM要写在mounted函数中
  mounted () {
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(this.$refs.main)
    // 指定图表的配置项和数据
    const option = {
      title: {
        text: '粉丝数据统计'
      },
      tooltip: {},
      legend: {},
      xAxis: {
        type: 'category',
        data: ['性别', '年龄', '系统']
      },
      yAxis: {},
      series: [
        {
          name: '性别',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        },
        {
          name: '年龄',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        },
        {
          name: '系统',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    }
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option)
  }
}
</script>

<style lang="less" scoped></style>
