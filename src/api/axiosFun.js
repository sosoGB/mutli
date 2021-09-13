import axios from 'axios';
import { Message } from 'element-ui'
import store from '@/utils/store'

// axios.create 方法：复制一个 axios
const req = axios.create({
  baseURL: process.env.VUE_APP_BASE_API
})

// const req = (method, url, data) => {
//   const token = localStorage.getItem('user');
//   token && (axios.defaults.headers.common['token'] = token);
//   if (method === 'post') {
//     return axios.post(url, data).then(res => res.data)
//   } else if (method === 'get') {
//     return axios.get(url, { params: data }).then(res => res.data);
//   }
// };


// 请求拦截器
req.interceptors.request.use(
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
req.interceptors.response.use(
  response => {
    return response
  },
  async error => {
    if (error.response && error.response.status === 401) {
      Message.error('登录过期，请重新登录')
      location.href = '/main'
    }
    else if (error.response.status === 402) {
      Message.error('服务端异常，请稍后重试')
    }
    return Promise.reject(error)
  }
)

export default req

// 登录请求方法
// const loginreq = (method, url, data) => {
//   return axios.post(url, data).then(res => res.data)
// };
// // 通用公用方法
// const req = (method, url, data) => {
//   const token = localStorage.getItem('user');
//   console.log(token)

//   token && (axios.defaults.headers.common['token'] = token);
//   if (method === 'post') {
//     return axios.post(url, data).then(res => res.data)
//   } else if (method === 'get') {
//     return axios.get(url, { params: data }).then(res => res.data);
//   }
// };

// export {
//   loginreq,
//   req
// }