import axios from 'axios';
import qs from 'qs'
import { Message } from 'element-ui'
import store from '@/utils/store'
// const userInfo = store.state.userInfo
const instance = axios.create({
  // timeout: 20000,
  baseURL: process.env.VUE_APP_BASE_API
});
// 请求拦截器
instance.interceptors.request.use(
  function (config) {
    const user = store.state.userInfo
    if (user) {
      config.headers.token = `${user.token}`
    }
    // Do something before request is sent
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  response => {
    if (response.data instanceof Blob) {
      return response.data
    }
    if (response.data.code != '0') {
      Message.error(response.data.message)
      if (response.data.code === '403') {   //重新登录
        location.href = ''
      }
    }
    return response.data
  },
  async error => {
    if (error.response.status === '302') {
      localStorage.removeItem("user");
      Message.error('请先登录');
      location.href = ''
    } else {
      Message.error(error.response.data.message || '系统错误');
    }
    return Promise.reject(error)
  }
)

export default {
  post (url, data) {
    const userInfo = store.state.userInfo
    return axios({
      method: 'post',
      url,
      data: JSON.stringify(data),
      withCredentials: true,
      timeout: 100000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
        'token': userInfo.token
      }
    }).then(
      (response) => {
        return response.data
      }
    )
  },
  formPost (url, data = {}) {
    return instance({
      method: 'post',
      url,
      data: qs.stringify(data),
      withCredentials: true,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    })
  },
  formGet (url, params = {}) {
    return instance({
      method: 'get',
      url,
      withCredentials: true,
      params,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      }
    })
  },
  formHardGet (url, params = {}) {
    return instance({
      method: 'get',
      url,
      withCredentials: true,
      params,
      paramsSerializer: params => {
        return qs.stringify(params, { indices: false })
      },
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      }
    })
  },
  instance (url, params = {}) {
    return instance({
      method: 'get',
      url,
      params,
      timeout: 10000000,
      responseType: 'blob',
    })
  },
  xml (url, data = {}) {
    return instance({
      method: 'post',
      url,
      data: JSON.stringify(data),
      timeout: 10000000,
      responseType: 'blob',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
      }
    })
  },
  xmlGet (url, data = {}) {
    return instance({
      method: 'get',
      url,
      data,
      timeout: 10000000,
      responseType: 'blob',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
      }
    })
  },
  formPut (url, data = {}) {
    return instance({
      method: 'put',
      url,
      data: qs.stringify(data),
      withCredentials: true,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    })
  },
  formDelete (url, data = {}) {
    return instance({
      method: 'delete',
      url,
      data: qs.stringify(data),
      withCredentials: true,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    })
  },
  jsonGets (url, params) {
    return instance({
      method: 'get',
      url,
      withCredentials: true,
      params,
      paramsSerializer: params => {
        qs.stringify(params, { arrayFormat: 'repeat' })
      },
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
      }
    })
  },
  jsonLogin (url, data = {}) {
    return instance({
      method: 'post',
      url,
      data: JSON.stringify(data),
      withCredentials: true,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
      }
    })
  },
  jsonGet (url, data = {}) {
    return instance({
      method: 'get',
      url,
      data: JSON.stringify(data),
      withCredentials: true,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
      }
    })
  },
  jsonPost (url, data = {}) {
    return instance({
      method: 'post',
      url,
      data: JSON.stringify(data),
      withCredentials: true,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
      }
    })
  },
  uploadPost (url, data = {}) {
    return instance({
      method: 'post',
      url,
      data: data,
      withCredentials: true,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'multipart/form-data',
      }
    })
  },
  jsonPut (url, data = {}) {
    return instance({
      method: 'put',
      url,
      data: JSON.stringify(data),
      withCredentials: true,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json'
      }
    })
  },
  jsonDelete (url, data = {}) {
    return instance({
      method: 'delete',
      url,
      data: JSON.stringify(data),
      withCredentials: true,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json'
      }
    })
  },
}