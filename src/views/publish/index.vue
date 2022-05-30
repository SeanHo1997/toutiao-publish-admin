<template>
  <div class="publish-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>发布文章</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 表单 -->
      <el-form ref="form" :model="article" :rules="rules" label-width="80px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="article.title"
          maxlength="10"
          show-word-limit>
          </el-input>
        </el-form-item>
        <el-form-item prop="content">
          <!-- <el-input
            type="textarea"
            :rows="10"
            placeholder="请输入内容"
            v-model="article.content">
          </el-input> -->
          <el-tiptap
          lang='zh'
          :height="500"
          v-model="article.content"
          :extensions="extensions"
          placeholder="请输入内容"
          ></el-tiptap>
        </el-form-item>
        <el-form-item label="图片数量" prop="cover">
          <el-radio-group v-model="article.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item class="uploadIMG-wrap">
          <template v-if="article.cover.type > 0">
            <UploadIMG
            class="updateIMG"
            ref="uploadIMG"
            v-for="(item, i) in article.cover.type"
            :key="i"
            @sendPhoto="recievePhoto"
            >
            </UploadIMG>
          </template>
        </el-form-item>
        <el-form-item label="频道选择" prop="channel_id">
          <el-select v-model="article.channel_id" placeholder="请选择频道">
            <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onPublish(false)">发布</el-button>
          <el-button @click="onPublish(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getChannels, publishArticle, getArticle, amendArticle, uploadImage } from '@/api/article'
import 'element-tiptap/lib/index.css'
import UploadIMG from '@/views/publish/components/UploadIMG.vue'
import {
  // 需要的 extensions
  ElementTiptap,
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
  Link,
  Image
} from 'element-tiptap'

export default {
  name: 'PublishArticle',
  components: {
    UploadIMG,
    'el-tiptap': ElementTiptap
  },
  data () {
    return {
      article: {
        title: '',
        content: '',
        cover: {
          type: null,
          images: []
        },
        channel_id: null
      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 3, max: 15, message: '标题必须在5-10个字数之间', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入内容', trigger: 'blur' },
          { min: 5, max: 300, message: '内容字数必须在15-50之间', trigger: 'blur' }
        ],
        cover: [
          { required: true, message: '请选择封面类型', trigger: 'blur' }
        ],
        channel_id: [
          { required: true, message: '请选择频道分类', trigger: 'blur' }
        ]
      },
      channels: [],
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 5 }),
        new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮
        new Underline({ bubble: true, menubar: false }), // 在气泡菜单而不在菜单栏中渲染菜单按钮
        new Italic(),
        new Strike(),
        new ListItem(),
        new BulletList(),
        new OrderedList(),
        new Link(),
        new Image({
          uploadRequest (file) {
            const formdata = new FormData()
            formdata.append('image', file)
            return uploadImage(formdata).then(res => {
              return res.data.data.url
            })
          }
        })
      ],
      content: `
        <h1>Heading</h1>
        <p>This Editor is awesome!</p>
      `
    }
  },
  methods: {
    onPublish (draft) {
      // 表单验证
      this.$refs.form.validate((valid) => {
        // 如果验证通过
        if (valid) {
          // 判断是修改文章还是发布文章
          // 如果是修改文章
          if (this.$route.query.id) {
            amendArticle(this.$route.query.id, this.article, draft).then(res => {
              this.$message({
                type: 'success',
                message: `${draft ? '存入草稿成功' : '发布成功'}`
              })
            })
            // 不然就是发布文章
          } else {
            publishArticle(this.article, draft).then(res => {
              this.$message({
                type: 'success',
                message: `${draft ? '存入草稿成功' : '发布成功'}`
              })
            })
          }
          this.$router.push('/layout/content')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    selectIMG () {
      this.$refs.photo.click()
    },
    onGetChannels () {
      getChannels().then(({ data }) => {
        this.channels = data.data.channels
      }).catch(error => {
        console.log(error)
      })
    },
    recievePhoto (url) {
      const newVal = url.replace('blob:', '')
      this.article.cover.images.push(newVal)
    }
  },
  created () {
    this.onGetChannels()
    // 判断url中有无id，选择是否拿取文章内容渲染到页面上
    if (this.$route.query.id) {
      getArticle(this.$route.query.id).then(res => {
        this.article = res.data.data
      })
    }
  }
}
</script>

<style lang="less" scoped>
.updateIMG {
  display: inline-block;
  width: 180px;
  height: 180px;
  border: 1px solid gray;
  margin: 0 20px;
  text-align: center;
  line-height: 240px;
  .el-icon-picture-outline {
    font-size: 100px;
  }
  .image-slot {
    height: 180px !important;
  }
}
.uploadIMG-wrap {
  display: flex;
  justify-content: space-evenly;
}
</style>
