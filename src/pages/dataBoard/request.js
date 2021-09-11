import axios from 'axios';
import { Message } from 'element-ui'

const instance = axios.create({
  timeout: 10000,
  baseURL: process.env.VUE_APP_BASE_API
});

// response拦截器
instance.interceptors.response.use(
  response => {
    if(response.data.errcode && response.data.errcode !== 0){
      Message.error(response.data.errmsg)
    }
    if(response.data.code && response.data.code === 403){   //重新登录
      Message.error(response.data.msg)
      location.href = '/'
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

export default instance