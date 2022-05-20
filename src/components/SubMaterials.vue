<template>
  <div class="material-container">
    <el-card class="box-card">
      <!-- 按钮 -->
      <el-button-group class="btn-group" >
          <el-button :type="allOrcollect === 0 ? 'primary' : ''" @click="loadAll(false)" >全部</el-button>
          <el-button :type="allOrcollect === 1 ? 'primary' : ''" @click="loadCollect(true)" >收藏</el-button>
          <!-- <el-button type="primary" @click="upload" class="addIMG">添加素材</el-button> -->
      </el-button-group>
      <!-- 点击添加素材 弹出对话框 -->
      <!-- 布局 -->
      <el-row :gutter="5" class="grid-group">
        <el-col :span="4" :xs="12" :sm="6" :md="4" :lg="4" :xl="1" v-for="(item, i) in images.results" :key="item.id">
          <div class="grid-content">
            <el-image
            style="width: 100px; height: 100px"
            :src="item.url"
            fit="cover"
            class="img"
            @click.native="selected = i"
            ref="image"
            >
            </el-image>
            <div class="background" v-if="selected === i"></div>
            <!-- 遮罩层 -->
            <!-- <div class="mask">
              <i :class="item.is_collected ? 'el-icon-star-on':'el-icon-star-off'" @click="clickCollect(item)"></i>
              <i class="el-icon-delete" @click="clickDlete(item)"></i>
            </div> -->
            <!-- 遮罩层 -->
          </div>
        </el-col>
      </el-row>
      <!-- 分页标签 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="12"
        :total="total"
        :current-page.sync="page"
        @current-change="currentChange"
        @prev-click="prevClick"
        @next-click="nextClick"
        class="pagination">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { loadImages, collectImage, deleteImage } from '@/api/images.js'
export default {
  name: 'SubMaterials',
  data () {
    return {
      allOrcollect: 0,
      images: {},
      collect: false,
      page: 1, // 当前页码
      per_page: 10, // 每页条数
      total: 10,
      dialogVisible: false,
      headers: {
        Authorization: `Bearer ${this.$store.state.user.token}`
      },
      selected: null
    }
  },
  methods: {
    loadMaterials (collect = false) {
      loadImages({
        collect,
        page: this.page,
        per_page: this.per_page
      }).then(res => {
        this.images = res.data.data
      })
    },
    loadAll (collect) {
      this.allOrcollect = 0
      this.loadMaterials(collect)
    },
    loadCollect (collect) {
      this.allOrcollect = 1
      this.loadMaterials(collect)
    },
    upload () {
      this.dialogVisible = true
    },
    onSuccess () {
      this.dialogVisible = false
      this.$message({
        type: 'success',
        message: '上传成功'
      })
    },
    currentChange () {
      this.page += 1
      this.loadMaterials()
    },
    prevClick () {
      this.page -= 1
      this.loadMaterials()
    },
    nextClick () {
      this.page += 1
      this.loadMaterials()
    },
    clickCollect (item) {
      collectImage(item.id, !item.is_collected).then(() => {
        if (item.is_collected === true) {
          item.is_collected = false
          this.$message({
            type: 'success',
            message: '取消收藏成功'
          })
        } else {
          item.is_collected = true
          this.$message({
            type: 'success',
            message: '收藏成功'
          })
        }
      }).catch(() => {
        this.$message.error('收藏失败')
      })
    },
    clickDlete (item) {
      deleteImage(item.id).then(() => {
        // 删除成功后需要重新加载数据
        this.loadMaterials()
        this.$message({
          type: 'success',
          message: '删除成功'
        })
      })
    },
    selectMaterial () {
      // this.selected = this.$refs.image.i
    }
  },
  created () {
    this.loadMaterials()
  }
}
</script>

<style lang="less" scoped>
.material-container {
  .box-card {
    position: relative;
    .grid-group {
      margin-top: 20px;
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .el-col {
      border-radius: 4px;
      margin-bottom: 10px;
    }
    .grid-content {
      position: relative;
      border-radius: 4px;
      min-height: 36px;
      .background {
        position: absolute;
        top: 0;
        width: 100px;
        height: 100px;
        background: url('@/assets/imgs/selected.png');
        background-size: cover;
      }
        .mask {
          position: absolute;
          bottom: 0;
          display: flex;
          justify-content: space-evenly;
          align-items: center;
          width: 100px;
          height: 30px;
          background-color: rgba(204, 204, 204, 0.4);
          i {
            font-size: 15px;
          }
        }
    }
    .pagination {
      display: flex;
      justify-content: center;
    }
    .btn-group {
      .addIMG {
        position: absolute;
        right: 20px;
      }
    }
    // .dialog {
    //   .upload-demo {
    //     display: flex;
    //     flex-direction: column;
    //     align-items: center;
    //   }
    // }
  }
}
</style>
