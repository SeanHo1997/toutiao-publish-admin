// 基于axios封装请求模块
import axios from 'axios'
import store from '@/store/'
// import JSONbig from 'json-bigint'

const request = axios.create({
  // 请求基础地址
  baseURL: 'http://api-toutiao-web.itheima.net'
  // 后端返回的数据处理API, data是后端返回的数据
  // transformResponse: [
  //   function (data) {
  //     try {
  //       return JSONbig.parse(data)
  //     } catch {
  //       return data
  //     }
  //   }
  // ]
})

// 请求拦截器
request.interceptors.request.use(config => {
  if (store.state.user) {
    config.headers.Authorization = `Bearer ${store.state.user.token}`
    return config
  } else return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器
// request.interceptors.response.use(response => {
//   return response
// }, error => {
//   const status = error.response.status
//   if (status === 400) {
//     this.$message.error('请求参数错误')
//   } else if (status === 403) {
//     this.$message.error('refresh_token未携带或已过期')
//   } else if (status === 507) {
//     this.$message.error('服务器数据库异常')
//   }
// })
export default request
