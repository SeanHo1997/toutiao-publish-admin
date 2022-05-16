import request from '@/utils/index'

// 加载图片素材
export const loadImages = params => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/images',
    params
  })
}

// 上传图片素材
export const uploadImages = data => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/user/images',
    data
  })
}

// 收藏图片素材
export const collectImage = (target, collect) => {
  return request({
    method: 'PUT',
    url: `/mp/v1_0/user/images/${target}`,
    data: {
      collect
    }
  })
}

// 删除图片素材
export const deleteImage = target => {
  return request({
    method: 'DELETE',
    url: `/mp/v1_0/user/images/${target}`
  })
}
