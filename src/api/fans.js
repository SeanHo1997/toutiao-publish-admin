import request from '@/utils/index.js'

export const getFollowerData = () => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/statistics/followers'
  })
}
