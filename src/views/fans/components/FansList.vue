<template>
  <div class="fanslist">
    <el-row>
      <el-col :span="4" v-for="(item, i) in fansData.results" :key="i">
        <div class="grid-content">
          <el-avatar src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" alt=""/>
          <span>{{item.name}}</span>
          <el-button ref="followBtn" size="small" @click="followFollower">关注</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getFansList } from '@/api/user.js'

export default {
  name: 'FansList',
  data () {
    return {
      fansData: {}
    }
  },
  methods: {
    onGetFansList () {
      getFansList().then(res => {
        this.fansData = res.data.data
      })
    },
    followFollower () {
      // 接口无效404
      this.$message('功能暂未开放')
      this.$refs.followBtn.disabled = true
    }
  },
  created () {
    this.onGetFansList()
  }
}
</script>

<style lang="less" scoped>
.fanslist {
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
    .el-col {
      border-radius: 4px;
      background-color: whitesmoke;
      display: flex;
      justify-content: center;
      /deep/.grid-content {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        border-radius: 4px;
        width: 100px;
        height: 140px;
        el-avatar {
          max-width: 100%;
        }
        el-button {
          width: 50px;
          height: 50px;
        }
      }
    }
  }
}

</style>
