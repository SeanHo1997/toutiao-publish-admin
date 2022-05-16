<template>
  <div class="wrap">
    <img ref="img" src="" alt="" class="cover" @click="$refs.file.click()" >
    <div class="image-wrap" @click="clickBox">
      <i class="el-icon-picture-outline"></i>
    </div>
    <el-dialog
      class="dialog"
      :visible.sync="dialogVisible"
      width="30%"
      :append-to-body="true"
      :show-close="false"
      >
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="first">
          素材库
        </el-tab-pane>
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
export default {
  name: 'UploadIMG',
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
