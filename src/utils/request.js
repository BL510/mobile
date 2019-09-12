import axios from 'axios'
import JSONbig from 'json-bigint'
import store from '@/store'
// 创建一个instance实例，设置不同的baseURL
const instance = axios.create({
  timeout: 5000,
  baseURL: 'http://ttapi.research.itcast.cn'
})

// 获取服务器返回的数据，并且是在处理数据之前使用
instance.defaults.transformResponse = [function (data) {
  try {
    return JSONbig.parse(data)
  } catch (err) {
    return data
  }
}]
// 请求拦截器
instance.interceptors.request.use(function (config) {
  // 判断是否有登录状态
  // 注意：此处是js模块，不是组件，要导入store
  if (store.state.user) {
    // 如果有登录状态请求的时候，自动携带token
    config.headers.Authorization = `Bearer ${store.state.user.token}`
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
// 响应拦截器
instance.interceptors.response.use(function (response) {
  // 接口返回的数据都有data，在此处统一返回接口返回的data
  // 如果接口返回的数据中没有data，此时返回axios响应对象的data属性
  return response.data.data || response.data
}, function (error) {
  return Promise.reject(error)
})

export default instance
