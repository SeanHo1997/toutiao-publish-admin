<template>
  <div class="wrap" ref="wrap" @click="clickBox">
    <img ref="img" :src="src" alt="" class="cover" @click="$refs.file.click()">
    <div class="image-wrap">
      <i class="el-icon-picture-outline"></i>
    </div>
    <!-- 弹出层 -->
    <el-dialog
      class="dialog"
      v-if="dialogVisible"
      :visible.sync="dialogVisible"
      width="70%"
      :append-to-body="true"
      :show-close="false"
      >
      <!-- 选项卡 -->
      <el-tabs v-model="activeName" type="card">
        <!-- 选项卡1 素材库 -->
        <el-tab-pane label="素材库" name="first">
          <SubMaterials ref="subMaterials" @selectedPhoto="selectedPhoto"></SubMaterials>
        </el-tab-pane>
        <!-- 选项2 上传图片 -->
        <el-tab-pane label="上传图片" name="second">
          <!-- 图片预览 -->
          <input type="file" ref="file" @change="selectPhoto" hidden>
          <el-button size="mini" class="select" @click="$refs.file.click()">选择图片</el-button>
          <!-- <el-dialog
            v-if="SecdialogVisible"
            :visible.sync="SecdialogVisible"
            width="50%"
            :append-to-body="true"
            :show-close="false"
            > -->
            <img ref="preview" alt="" style="width: 100px; height: 100px; display: block">
          <!-- </el-dialog> -->
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
  props: {
    editImg: {
      type: String
    }
  },
  components: {
    SubMaterials
  },
  data () {
    return {
      dialogVisible: false,
      SecdialogVisible: false,
      activeName: 'first',
      src: this.editImg
    }
  },
  methods: {
    clickBox () {
      this.dialogVisible = true
    },
    // 通过手动上传选择图片封面
    selectPhoto () {
      const file = this.$refs.file.files[0]
      const blob = window.URL.createObjectURL(file)
      this.$refs.preview.src = blob
      // this.SecdialogVisible = true
    },
    confirmPhoto () {
      // 如果是素材库选择图片
      if (this.activeName === 'first') {
        if (this.$refs.subMaterials.selected === null) {
          this.$message.error('请选择图片')
        } else {
          this.$emit('sendPhoto', this.src)
          this.dialogVisible = false
        }
        // 不然就是本地上传
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
    },
    // 通过素材库选择图片封面
    selectedPhoto (url) {
      this.src = url
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
    width: 150px;
    height: 150px;
    position: absolute;
    left: 0;
    top: 0;
    object-fit: contain;
  }
  /deep/.image-wrap {
    text-align: center;
    line-height: 200px;
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
