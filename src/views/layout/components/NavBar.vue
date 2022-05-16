<template>
  <div class="navBar-container">
    <div class="left">
      <!-- 折叠图标 -->
      <i class="el-icon-s-fold" v-if="isCollapse === false" @click="fold"></i>
      <i class="el-icon-s-unfold" v-else  @click="unfold"></i>
      <span>火星专用高压锅有限公司后台管理系统</span>
    </div>
    <div class="right">
      <el-dropdown>
        <div class="userInfo">
          <img :src="user.photo" alt="">
          <span class="el-dropdown-link">{{user.name}}</span>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="$router.push('/layout/profile')">设置</el-dropdown-item>
          <el-dropdown-item @click.native="handleClose">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import bus from '@/utils/bus'

export default {
  name: 'NavBar',
  data () {
    return {
      dialogVisible: false,
      user: null,
      isCollapse: false
    }
  },
  methods: {
    afterLogout () {
      this.dialogVisible = false
      // // 本地存储清空
      this.$store.state.user = null
      // // vuex的用户数据清空
      this.$store.commit('clearUser')
      this.$router.push('/login')
    },
    fold () {
      this.isCollapse = true
      bus.$emit('changeCollapse', this.isCollapse)
    },
    unfold () {
      this.isCollapse = false
      bus.$emit('changeCollapse', this.isCollapse)
    },
    handleClose (done) {
      this.$confirm('是否确认退出登录?')
        .then(() => {
          this.afterLogout()
          this.$message({
            message: '退出成功',
            type: 'success'
          })
        })
        .catch(() => {
        })
    }
  },
  created () {
    // 初始化加载用户数据
    const user = JSON.parse(window.localStorage.getItem('user'))
    this.user = user
    // 同步更新来自个人资料组件中的用户图像和昵称
    bus.$on('update-avator', user => {
      this.user = user
    })
  }
}
</script>

<style lang="less" scoped>
.navBar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  .el-dropdown-link {
    cursor: pointer;
    color: #333333;
  }
  .right {
    .userInfo {
      width: 120px;
      display: flex;
      align-items: center;
      img {
        width: 40px;
        height: 40px;
        padding-right: 10px;
        border-radius: 50%;
      }
    }
  }
}
</style>
