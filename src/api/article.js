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

// 发布文章
export const publishArticle = (data, draft = false) => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/articles',
    params: {
      draft
    },
    data
  })
}

// 获取文章
export const getArticle = target => {
  return request({
    method: 'GET',
    url: `/mp/v1_0/articles/${target}`
  })
}

// 修改文章
export const amendArticle = (target, data, draft = false) => {
  return request({
    method: 'PUT',
    url: `/mp/v1_0/articles/${target}`,
    params: {
      draft
    },
    data
  })
}

// 上传图片
export const uploadImage = data => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/user/images',
    // headers中的content-type参数为multipart/form-data时，需要给data一个 new FormData()
    data
  })
}
