<template>
  <div class="content-container">
    <el-card class="box-card box-card1">
      <div slot="header" class="clearfix">
        <!-- 面包屑组件 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 表单 -->
      <el-form ref="form"  label-width="80px">
        <el-form-item label="状态">
          <el-radio-group v-model="status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道选择">
          <el-select v-model="channel_id" placeholder="请选择频道">
            <el-option label="全部" value="null"></el-option>
            <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="日期" class="dataPicker">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="开始日期" v-model="date.begin_pubdate" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-date-picker type="date" placeholder="结束日期" v-model="date.end_pubdate" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
          </el-col>
        </el-form-item> -->
        <el-form-item label="日期选择" class="block">
          <el-date-picker
            v-model="date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 查询结果 -->
    <el-card class="box-card box-card2">
      <div slot="header" class="clearfix">
        查询到{{Articles.total_count}}条结果
      </div>
      <!-- 结果表格 -->
      <el-table
        :data="Articles.results"
        stripe
        style="width: 100%">
        <el-table-column
          prop="cover.type"
          label="封面"
          >
          <template slot-scope="scope">
            <el-image
            v-if="scope.row.cover.images"
            :src="scope.row.cover.images[0]"
            class="cover"
            lazy
            >
            </el-image>
            <el-image
            v-else
            src="/src/assets/imgs/pic_bg.png"
            class="cover"
            lazy
            >
            </el-image>
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          >
        </el-table-column>
        <el-table-column
          label="状态"
          >
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 0">草稿</el-tag>
            <el-tag type="success" v-if="scope.row.status === 1">待审核</el-tag>
            <el-tag type="info" v-if="scope.row.status === 2">审核通过</el-tag>
            <el-tag type="warning" v-if="scope.row.status === 3">审核失败</el-tag>
            <el-tag type="danger" v-if="scope.row.status === 4">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="pubdate"
          label="发布日期"
          >
        </el-table-column>
        <el-table-column
          label="操作"
          >
          <template slot-scope="scope">
            <!-- 编辑文章按钮 -->
            <el-button type="primary" icon="el-icon-edit" circle disabled ></el-button>
            <!-- 删除文章按钮 -->
            <el-button type="danger" icon="el-icon-delete" circle @click="deleteArticle(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 页码 -->
      <el-pagination
      class="pagiantion"
      layout="prev, pager, next"
      :total="Math.ceil(Articles.total_count/20)"
      @prev-click="prevPage"
      @next-click="nextPage"
      @current-change="handleCurrentChange"
      >
      </el-pagination>
    </el-card>
    <!-- /查询结果 -->
  </div>
</template>

<script>
import { getArticles, getChannels, deleteArticle } from '@/api/article'

export default {
  name: 'ContentManagement',
  data () {
    return {
      Articles: {},
      page: 1,
      per_page: 20,
      status: null,
      channels: null,
      channel_id: null,
      date: null
    }
  },
  methods: {
    async onGetArticles () {
      try {
        const { data } = await getArticles({
          page: this.page,
          per_page: this.per_page,
          status: this.status,
          channel_id: this.channel_id,
          begin_pubdate: this.date ? this.date[0] : null,
          end_pubdate: this.date ? this.date[1] : null
        })
        this.Articles = data.data
      } catch (error) {
        console.log(error)
      }
    },
    async prevPage () {
      this.page -= 1
      this.onGetArticles()
    },
    async nextPage () {
      this.page += 1
      this.onGetArticles()
    },
    handleCurrentChange (val) {
      this.page = val
      this.onGetArticles()
    },
    onSubmit () {
      this.onGetArticles()
      this.$message({
        type: 'success',
        message: '查询成功！'
      })
    },
    async onGetChannels () {
      try {
        const { data } = await getChannels()
        this.channels = data.data.channels
      } catch (error) {
        console.log(error)
      }
    },
    deleteArticle (id) {
      this.$confirm('确认删除文章？', {
        type: 'warning'
      }).then(() => {
        deleteArticle(id)
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        this.onGetArticles()
      })
    }
  },
  created () {
    this.onGetArticles()
    this.onGetChannels()
  }
}
</script>

<style lang="less" scoped>
.content-container {
  .box-card1 {
    margin-bottom: 15px;
    .line {
      text-align: center;
    }
  }
  .box-card2 {
    .cover {
      width: 60px;
    }
    .pagiantion {
      display: flex;
      justify-content: space-around;
      margin-top: 35px;
      width: 100%;
    }
  }
}
</style>
