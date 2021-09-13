import axios from 'axios';
import qs from 'qs'
import { Message } from 'element-ui'
import store from '@/utils/store'

const instance = axios.create({
  timeout: 20000,
  baseURL: process.env.VUE_APP_BASE_API
});
let pending = []; // 请求标识
let cancelToken = axios.CancelToken; // 请求取消函数
const userInfo = store.state.userInfo
// 防止重复请求
let removePending = (ever) => {
  for (let p in pending) {
    if (pending[p].u === ever.url + '&' + ever.method) {
      pending[p].f();
      pending.splice(p, 1);
    }
  }
}

// request拦截器
instance.interceptors.request.use(
  config => {
    removePending(config);
    config.cancelToken = new cancelToken(c => {
      pending.push({
        u: config.url + '&' + config.method,
        f: c
      });
    });
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
// response拦截器
instance.interceptors.response.use(
  response => {
    removePending(response.config);
    if (response.data instanceof Blob) {
      return response.data
    }
    if (response.data.code != 0) {
      Message.error(response.data.msg)
      if (response.data.code === 403) {   //重新登录
        location.href = ''
      }
    }
    return response.data
  },
  error => {
    if (error.response.status == 302) {
      localStorage.removeItem("useInfo");
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
        'token': userInfo.token
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
        'token': userInfo.token
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
        'token': userInfo.token
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
        'token': userInfo.token
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
        'token': userInfo.token
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
        'token': userInfo.token
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
        'token': userInfo.token
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