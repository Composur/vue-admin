import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  // timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      // config.headers["X-Token"] = getToken();
      // config.headers.authorization = getToken();
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
   * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
   */
  response => {
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 20000) {
      if (res.status === 1) {
        return res
      }
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm(
          'You have been logged out, you can cancel to stay on this page, or log in again',
          'Confirm logout',
          {
            confirmButtonText: 'Re-Login',
            cancelButtonText: 'Cancel',
            type: 'warning'
          }
        ).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default function(url, type = 'GET', data = {}) {
  // axios.defaults.headers.common['Authorization'] = store.get('token')
  type = type.toLocaleUpperCase() || 'GET'
  let promise
  // url=config.baseURl+url
  // 返回一个promise，统一处理错误
  return new Promise((resolve, reject) => {
    // 1.执行异步请求
    if (type === 'GET') {
      let paramStr = ''
      Object.keys(data).forEach(key => {
        paramStr += `${key}=${data[key]}&`
      })
      if (paramStr) {
        paramStr = paramStr.substring(0, paramStr.length - 1)
      }
      // promise = service.get(url+'?'+paramStr+'&t='+new Date())
      if (paramStr) {
        promise = service.get(url + '?' + paramStr + '&t=' + new Date())
      } else {
        promise = service.get(url + '?' + 't=' + new Date())
      }
    } else {
      promise = service.post(url, data)
      // promise = service.post('',data)
    }
    promise
      .then(res => {
        // 2.成功调用resolve
        if (res.msg) {
          Message({
            message: res.msg,
            type: 'success',
            duration: 1 * 1000
          })
        }
        resolve(res)
      })
      .catch(err => {
        // 这里的错误处理和上面拦截器重复了 不要也可以
        debugger
        return err
        // const {data}= err
        // if(data&&data.msg){
        //   // message.error('请求出错'+data.msg)
        //   return
        // }
        // Message.error(err)
        // 3.失败调用reject，但是不能调用，调用就进入外层catch里了，为了不在外层用try...catch这里显式的返回error
        // message.error('请求出错'+err.message)
      })
  })
}
