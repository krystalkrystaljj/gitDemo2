import axios from 'axios'
import type { AxiosInstance } from 'axios'

import type { TJRequestInterceptors, TJRequestConfig } from './type'

import { ElLoading } from 'element-plus'
import { LoadingInstance } from 'element-plus/es/components/loading/src/loading'

// 定义可以传入哪些hooks
// 别人将拦截器传进来，然后在将这个放到实例instance上面

// 采用类封装，比函数封装的封装性更强，导出之后只需调用类的不同方法即可
// 若采用函数封装，那么有多少个方法就需要导出多少次

const DEAFULT_LOADING = true

class TJRequest {
  instance: AxiosInstance
  interceptors?: TJRequestInterceptors
  loading?: LoadingInstance
  showLoading: boolean

  constructor(config: TJRequestConfig) {
    this.instance = axios.create(config)

    // 将传入的拦截器hooks保存到interceptors中
    this.showLoading = config.showLoading ?? DEAFULT_LOADING

    this.interceptors = config.interceptors

    // 从config中取出的拦截器是对应的实例拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptor
    )

    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 添加所有的实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        console.log('所有实例都有的拦截器：请求成功拦截')
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据....',
            background: 'rgba(0, 0, 0, 0.5)'
          })
        }
        return config
      },
      (err) => {
        console.log('所有实例都有的拦截器：请求失败拦截')
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        console.log('所有实例都有的拦截器：响应成功拦截')
        this.loading?.close()

        const data = res.data
        if (data.returnCode === '-1001') {
          console.log('请求失败')
        } else {
          return data
        }
      },
      (err) => {
        console.log('所有实例都有的拦截器：响应失败拦截')
        if (err.response.status === 404) {
          console.log('404的错误')
        }
        this.loading?.close()
        return err
      }
    )
  }

  request<T>(config: TJRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 1.单个请求对config的处理
      if (config.interceptors?.requestInterceptor) {
        // 如果内部config传入的有一个requestInterceptor函数那么就会执行这个函数
        config = config.interceptors.requestInterceptor(config)
      }

      // 2.判断是否显示Loading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 单个请求对数据的处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          // 不能在这里获取值
          // console.log(res)
          resolve(res)

          // 将默认值设置回来
          this.showLoading = DEAFULT_LOADING
        })
        .catch((err) => {
          this.showLoading = DEAFULT_LOADING
          reject(err)
        })
    })
  }

  get<T>(config: TJRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T>(config: TJRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T>(config: TJRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  path<T>(config: TJRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}
export default TJRequest
