import axios from 'axios'
// 创建一个instance实例，设置不同的baseURL
const instance = axios.create({
  timeout: 1000,
  baseURL: 'http://ttapi.research.itcast.cn'
})
// 请求拦截器
instance.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})
// 响应拦截器
instance.interceptors.response.use(function (response) {
  return response
}, function (error) {
  return Promise.reject(error)
})

export default instance
