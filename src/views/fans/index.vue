<template>
  <div class="fans-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>粉丝管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 选项卡切换路由 -->
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="粉丝列表" name="first">
          <FansList></FansList>
        </el-tab-pane>
        <el-tab-pane label="统计图表" name="second">
          <Chart></Chart>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import Chart from '@/views/fans/components/Chart.vue'
import FansList from '@/views/fans/components/FansList.vue'

export default {
  name: 'FansManagement',
  data () {
    return {
      activeName: 'first'
    }
  },
  components: {
    Chart,
    FansList
  },
  methods: {
    handleClick (tab, event) {
      // console.log(tab, event)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
