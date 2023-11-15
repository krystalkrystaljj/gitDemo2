import { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface TJRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: any) => any
  requestInterceptorCatch?: (err: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (err: any) => any
}

export interface TJRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: TJRequestInterceptors<T>
  showLoading?: boolean
}
