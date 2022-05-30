<template>
  <div class="comments-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>个人资料</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 用户资料显示区域 -->
      <el-form ref="form" :model="user" :rules="rules" label-width="100px" class="form">
        <el-form-item class="avator-container">
          <p slot="label">头像 : </p>
          <el-avatar class="avator" :size="100" :src="user.photo" @click.native="clickAvator"></el-avatar>
          <input type="file" ref="file" hidden @change="selectAvator">
        </el-form-item>
        <el-form-item label="用户ID : ">{{ user.id }}</el-form-item>
        <el-form-item label="手机号码 :">
          {{ user.mobile }}
        </el-form-item>
        <el-form-item label="用户昵称 : " prop="name">
          <el-input v-model="user.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱 : " prop="email">
          <el-input v-model="user.email"></el-input>
        </el-form-item>
        <el-form-item label="简介 : " prop="intro">
          <el-input type="textarea" v-model="user.intro"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSave">保 存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 对话框弹出 -->
    <el-dialog
      title="编辑头像"
      :visible.sync="dialogVisible"
      width="30%"
      append-to-body
      class="dialog"
      @opened="openDialog"
      @closed="closedDialog"
      >
      <div class="img-wrap" style="width=auto">
        <img :src="blob" class="img" ref="cropIMG" style="display: block;max-width: 100%;height: 200px;"/>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onUpdateAvator">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getUserInfo, updateAvator, updateProfile } from '@/api/user.js'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import bus from '@/utils/bus'

export default {
  name: 'ProfileSetting',
  data () {
    return {
      user: {},
      dialogVisible: false,
      blob: '',
      cropper: null,
      rules: {
        name: [
          { required: true, message: '昵称不能为空', trigger: 'blur' },
          { min: 1, max: 10, meessage: '昵称长度必须在1-10位之间', trigger: 'blur' }
        ],
        email: [
          // 网上复制的正则表达式
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { pattern: /^\w+@([\da-z-]+)\.([a-z]+|[\u2E80-\u9FFF]+)$/, message: '请输入正确的邮箱格式', trigger: 'blur' }
        ],
        intro: [
          { required: true, message: '简介不能为空', trigger: 'blur' },
          { min: 0, max: 30, message: '简介内容长度必须在1-30之间', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    getUser () {
      getUserInfo().then(res => {
        this.user = res.data.data
      })
    },
    clickAvator () {
      // 点击图片"移花接木"
      this.$refs.file.click()
    },
    selectAvator () {
      // 选取完图片，拿到blob
      const file = this.$refs.file.files[0]
      const blob = window.URL.createObjectURL(file)
      this.blob = blob
      // 对话框弹出
      this.dialogVisible = true
      // 防止change事件在两次选择同一个图片时不触发
      this.$refs.value = ''
    },
    openDialog () {
      // 裁切器初始化的前提是选定的img标签必须为可见状态
      // 所以要在对话框完全打开后(opened事件)才去初始化cropper
      // 准备裁切功能
      const image = this.$refs.cropIMG
      const cropper = new Cropper(image, {
        aspectRatio: 1, // 裁切框比例
        viewMode: 'none',
        dragMode: 'none',
        cropBoxResizable: false
        // 当移动裁切器的时候会调用crop方法
        // crop (event) {
        //   console.log(event.detail.x)
        //   console.log(event.detail.y)
        //   console.log(event.detail.width)
        //   console.log(event.detail.height)
        //   console.log(event.detail.rotate)
        //   console.log(event.detail.scaleX)
        //   console.log(event.detail.scaleY)
        // }
      })
      this.cropper = cropper
    },
    // 关闭Dialog,销毁cropper
    closedDialog () {
      // 裁切器使用完需要销毁
      // 方式一: cropper.replace()
      // 方式二: cropper.destroy()
      this.cropper.destroy()
    },
    onUpdateAvator () {
      // 获取裁切的图片blob数据
      this.cropper.getCroppedCanvas().toBlob(blob => {
        const formdata = new FormData()
        formdata.append('photo', blob)
        // 上传至服务端
        updateAvator(formdata).then(res => {
          // 更新视图
          this.user.photo = res.data.data.photo
          this.$message({
            type: 'success',
            message: '头像上传成功'
          })
          // 同步更新navbar组件的头像视图
          bus.$emit('update-avator', this.user)
        })
      })
      this.dialogVisible = false
    },
    onSave () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          updateProfile(this.user).then(res => {
            // 同步更新navbar的数据
            bus.$emit('update-avator', this.user)
            this.$message({
              type: 'success',
              message: '保存成功'
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  created () {
    this.getUser()
  }
}
</script>

<style lang="less" scoped>
.comments-container {
  .box-card {
    .form {
      .avator-container {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin: 0;
        /deep/.el-form-item__content {
          margin-left: 0 !important;
        }
      }
    }
  }
}
</style>
