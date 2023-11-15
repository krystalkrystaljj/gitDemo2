import { createApp } from 'vue'
import { globalRegister } from './global'
import 'normalize.css'
import './assets/css/index.less'

// import './service/axios_demo'
import tjRequest from './service'

import App from './App.vue'

import router from './router'
import store from './store'

const app = createApp(App)

app.use(globalRegister)

app.use(router)
app.use(store)
app.mount('#app')

interface DataType {
  data: any
  returnCode: string
  success: boolean
}

tjRequest
  .get<DataType>({
    url: '/home/multidata',
    interceptors: {
      requestInterceptor: (config) => {
        console.log('单独请求的拦截器')
        return config
      }
    },
    showLoading: false
  })
  .then((res) => {
    console.log(res.data)
    console.log(res.returnCode)
    console.log(res.success)
  })
