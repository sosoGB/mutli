import axios from 'axios';
import { Message } from 'element-ui'
import i18n from '@/locales'

export default class requestClass {
  constructor(noAuthCallback) {
    const request = axios.create();
    
    request.defaults.timeout = 10000;
    
    let pending = []; // 请求标识
    let cancelToken = axios.CancelToken; // 请求取消函数
    
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
    request.interceptors.request.use(
      config => {
        removePending(config);
        config.cancelToken = new cancelToken(c => {
          pending.push({ u: config.url + '&' + config.method, f: c });
        });
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );
    // response拦截器
    request.interceptors.response.use(
      response => {
        removePending(response.config);
        return response.data;
      },
      error => {
        if (!error.response) return Promise.reject({ code: '-1' });
        if (error.response.status == 302) {
          localStorage.removeItem("useInfo");
          Message.error(i18n.t('login.pleaseLogin'));

          if(noAuthCallback) {
            noAuthCallback().then(() => {
              window.location.href = '/platform.html#/login';
            })
          } else {
            window.location.href = '/platform.html#/login';
          }
        } else {
          Message.error(error.response.data.message || i18n.t('login.systemError'));
        }
        return Promise.reject(error)
      }
    )

    this.request = request;
  }
}
