import TJRequest from './request'
import { BASE_URL } from './request/config'

// 导入的一个axios，其实就是一个axios的实例对象
// 如果发送的两次请求的baseurl不一样，那么应该创建两个实例

const tjRequest = new TJRequest({
  baseURL: BASE_URL,
  interceptors: {
    requestInterceptor: (res) => {
      console.log('请求成功的拦截')
      return res
    },
    requestInterceptorCatch(err) {
      console.log('请求失败的拦截')
      return err
    },
    responseInterceptor: (res) => {
      console.log('响应成功的拦截')
      return res
    },
    responseInterceptorCatch: (err) => {
      console.log('响应失败的拦截')
      return err
    }
  }
})

// export const tjRequest2 = new TJRequest({
//   baseURL: '地址'
// })
export default tjRequest
