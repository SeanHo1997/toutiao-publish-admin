import request from '@/utils/index.js'
// 登录请求
export const login = data => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/authorizations',
    data
  })
}

// 获取用户信息
export const userInfo = () => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/profile'
  })
}

// 获取用户信息
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/profile'
  })
}

// 修改用户头像
export const updateAvator = params => {
  return request({
    method: 'PATCH',
    url: '/mp/v1_0/user/photo',
    params
  })
}

// 编辑用户个人资料
export const updateProfile = data => {
  return request({
    method: 'PATCH',
    url: '/mp/v1_0/user/profile',
    data
  })
}

// 获取用户粉丝列表
export const getFansList = () => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/followers'
  })
}
