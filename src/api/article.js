import request from '@/utils/index'

// 获取所有文章列表
export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/articles',
    params
  })
}

// 获取频道
export const getChannels = () => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/channels'
  })
}

// 删除文章
export const deleteArticle = target => {
  return request({
    method: 'DELETE',
    url: `/mp/v1_0/articles/${target}`
  })
}
