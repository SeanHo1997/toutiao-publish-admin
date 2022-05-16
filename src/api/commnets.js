import request from '@/utils/index'

// 获取评论
export const getComments = params => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/comments',
    params
  })
}

// 修改评论状态
export const changeCommentStatus = (articleID, allowComment) => {
  return request({
    method: 'PUT',
    url: '/mp/v1_0/comments/status',
    params: {
      article_id: articleID
    },
    data: {
      allow_comment: allowComment
    }
  })
}
