<template>
  <div class="wrap">
    <img ref="img" src="" alt="" class="cover" @click="$refs.file.click()" >
    <div class="image-wrap" @click="clickBox">
      <i class="el-icon-picture-outline"></i>
    </div>
    <!-- 弹出层 -->
    <el-dialog
      class="dialog"
      :visible.sync="dialogVisible"
      width="70%"
      :append-to-body="true"
      :show-close="false"
      >
      <!-- 选项卡 -->
      <el-tabs v-model="activeName" type="card">
        <!-- 选项1 -->
        <el-tab-pane label="素材库" name="first">
          <SubMaterials ref="subMaterials"></SubMaterials>
        </el-tab-pane>
        <!-- 选项2 -->
        <el-tab-pane label="上传图片" name="second">
          <!-- 图片预览 -->
          <input type="file" ref="file" @change="selectPhoto" hidden>
          <el-button size="mini" class="select" @click="$refs.file.click()">选择图片</el-button>
          <img ref="preview" alt="" class="preview" style="width: 100%">
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelPhoto">取 消</el-button>
        <el-button type="primary" @click="confirmPhoto">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import SubMaterials from '@/components/SubMaterials.vue'
export default {
  name: 'UploadIMG',
  components: {
    SubMaterials
  },
  data () {
    return {
      dialogVisible: false,
      activeName: 'first'
    }
  },
  methods: {
    clickBox () {
      this.dialogVisible = true
    },
    selectPhoto () {
      const file = this.$refs.file.files[0]
      const blob = window.URL.createObjectURL(file)
      this.$refs.preview.src = blob
    },
    confirmPhoto () {
      // 如果是素材库选择图片
      if (this.activeName === 'first') {
        if (this.$refs.subMaterials.selected === null) {
          this.$message.error('请选择图片')
        } else {
          const src = this.$refs.subMaterials.images.results[this.$refs.subMaterials.selected].url
          this.$emit('sendPhoto', src)
          this.dialogVisible = false
        }
        // 如果是手动上传图片
      } else {
        if (this.$refs.file.files[0]) {
          const file = this.$refs.file.files[0]
          const blob = window.URL.createObjectURL(file)
          this.$refs.img.src = blob
          this.$emit('sendPhoto', this.$refs.img.src)
          this.dialogVisible = false
        } else {
          this.$message.error('请上传图片')
        }
        this.$refs.file.value = ''
      }
    },
    cancelPhoto () {
      this.$refs.file.value = ''
      this.$refs.preview.src = ''
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
.wrap {
  position: relative;
  width: 150px;
  height: 150px;
  border: 1px solid #eee;
  line-height: 150px;
  .cover {
    position: absolute;
    width: 100%;
    object-fit: contain;
  }
  /deep/.image-wrap {
    text-align: center;
    i {
      font-size: 35px;
    }
  }
  .dialog {
    /deep/.el-dialog__body {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
