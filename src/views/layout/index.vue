<template>
  <el-container class="container">
    <!-- 左侧边栏 -->
    <el-aside class="aside" width="auto">
      <SideBar class="sideBar"/>
    </el-aside>
    <!-- /左侧边栏 -->
    <!-- 上方导航 -->
    <el-container>
      <el-header class="header">
        <NavBar class="navBar"/>
      <!-- /上方导航 -->
      </el-header>
      <!-- 内容区 -->
      <el-main class="main">
        <!-- 路由入口 -->
        <router-view></router-view>
      </el-main>
      <!-- /内容区 -->
    </el-container>
  </el-container>
</template>

<script>
import SideBar from '@/views/layout/components/SideBar.vue'
import NavBar from '@/views/layout/components/NavBar.vue'
export default {
  name: 'layoutCom',
  components: {
    SideBar,
    NavBar
  }
}
</script>

<style lang="less" scoped>
.container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .aside {
    background-color: #002033;
    .sideBar {
      height: 100%;
    }
  }
  .header {
    background-color: #B3C0D1;
    .navBar {
      height: 100%;
    }
  }
  .main {
    background-color: #E9EEF3;
  }
}
</style>
