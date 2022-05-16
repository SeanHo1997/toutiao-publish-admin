<template>
  <div class="comments-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>评论管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 评论数据表格 -->
      <el-table
        :data="comments.results"
        stripe
        style="width: 100%">
        <el-table-column
          prop="title"
          label="文章标题"
          width="180">
        </el-table-column>
        <el-table-column
          prop="total_comment_count"
          label="总评论数"
          width="180">
        </el-table-column>
        <el-table-column
          prop="fans_comment_count"
          label="粉丝评论数">
        </el-table-column>
        <el-table-column
          label="状态">
          <template slot-scope="scope">
            {{ scope.row.comment_status ? '启用': '禁用' }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.comment_status"
              @change="switchChange(scope.row)"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        class="pagiantion"
        background
        layout="prev, pager, next"
        :page-size="20"
        :current-page="1"
        :total="total"
        @current-change="currenChange">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import { changeCommentStatus } from '@/api/commnets'
export default {
  name: 'CommentsManagement',
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      comments: [],
      switchValue: false,
      total: 0
    }
  },
  methods: {
    onGetComments (page) {
      getArticles({
        page,
        response_type: 'comment'
      }).then(res => {
        this.comments = res.data.data
        // 数据加载完成之后显示
        this.total = this.comments.total_count
      })
    },
    onChangeCommentStatus (articleID, allowComment) {
      changeCommentStatus(articleID, allowComment).then(() => {
        this.$message({
          type: 'success',
          message: allowComment ? '已启用' : '已禁用'
        })
      })
    },
    switchChange (scoperow) {
      this.onChangeCommentStatus(scoperow.id.toString(), scoperow.comment_status)
    },
    currenChange (val) {
      this.onGetComments(val)
    }
  },
  created () {
    this.onGetComments(1)
  }
}
</script>

<style lang="less" scoped>
.comments-container {
  .pagiantion {
    display: flex;
    justify-content: space-around;
    margin-top: 35px;
    width: 100%;
  }
}
</style>
