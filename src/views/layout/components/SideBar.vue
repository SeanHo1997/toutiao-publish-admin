<template>
  <div class="sidebar-container">
    <!-- <div class="bgi" v-show="!isCollapse"></div> -->
    <el-menu
      default-active="/layout/index"
      background-color="#002033"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
      :collapse="isCollapse">
      <el-menu-item index="/layout/index">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/layout/content">
        <i class="el-icon-menu"></i>
        <span slot="title">内容管理</span>
      </el-menu-item>
      <el-menu-item index="/layout/material">
        <i class="el-icon-picture"></i>
        <span slot="title">素材管理</span>
      </el-menu-item>
      <el-menu-item index="/layout/articles">
        <i class="el-icon-s-promotion"></i>
        <span slot="title">发布文章</span>
      </el-menu-item>
      <el-menu-item index="/layout/comments">
        <i class="el-icon-s-comment"></i>
        <span slot="title">评论管理</span>
      </el-menu-item>
      <el-menu-item index="/layout/fans">
        <i class="el-icon-s-check"></i>
        <span slot="title">粉丝管理</span>
      </el-menu-item>
      <el-menu-item index="/layout/profile">
        <i class="el-icon-user-solid"></i>
        <span slot="title">个人设置</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import bus from './EventBus.js'
export default {
  name: 'SideBar',
  data () {
    return {
      isCollapse: false
    }
  },
  created () {
    bus.$on('changeCollapse', val => {
      this.isCollapse = val
    })
  }
}
</script>

<style lang="less" scoped>
.sidebar-container {
  .bgi {
    width: 100%;
    height: 80px;
    background: url('@/assets/imgs/logo_admin.png') no-repeat center;
  }
}
</style>
