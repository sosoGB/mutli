import axios from 'axios'
import qs from 'qs'
// console.log(process.env.NODE_ENV)
// console.log(process.env.VUE_APP_BASE_API)
axios.interceptors.request.use(config => {
    // loading
    // const headers = response.headers
    // if (headers['content-type'] === 'application/octet-stream;charset=utf-8') {
    //   return response.data
    // }
   

    return config
}, error => {
    return Promise.reject(error)
})

axios.interceptors.response.use(response => {
    return response
}, error => {
    return Promise.resolve(error.response)
})

function checkStatus (response) {
    // console.log(response)
    // loading
    // 如果http状态码正常，则直接返回数据
    // if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    //     return response.data
    //     // 如果不需要除了data之外的数据，可以直接 return response.data
    // }
    // if(response && response.status === 302){
    //     location.href = '/platform.html'
    // }
    
    // 异常状态下，把错误信息返回去
    return {
        status:response.status,
        msg: '网络异常'
    }
    // Message.error({
    //     message:response.status,
    //     center:true
    // })
}
function checkCode (res) {
    if(res &&  Object.keys(res).includes('status') && Object.keys(res).includes('msg') && res.status !=('200' || '0')){
        Message.error({
            message:res.msg,
            center:true
        })
    }
    if(res && Object.keys(res).includes('errcode') && Object.keys(res).includes('errmsg') && res.errcode != '200' && res.errcode != '0'){
        Message.error({  
            message:res.errmsg,
            center:true
        })
    }
    return res
}

export default {
    post (url, data) {
        return axios({
            method: 'post',
            // baseURL: process.env.VUE_APP_BASE_API,
            url,
            data: qs.stringify(data),
            withCredentials: true,
            timeout: 10000,
            // paramsSerializer: function(params) {
            //     return qs.stringify(params, {arrayFormat: 'brackets'})
            // },
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then(
            (response) => {
                return response
            }
        ).then(
        (res) => {
            return res
        }
        )
    },
    // pay (url, data) {
    //     return axios({
    //         method: 'post',
    //         baseURL: '/payOrder',
    //         url,
    //         data: qs.stringify(data),
    //         withCredentials: true,
    //         timeout: 10000,
    //         // paramsSerializer: function(params) {
    //         //     return qs.stringify(params, {arrayFormat: 'brackets'})
    //         // },
    //         headers: {
    //             'X-Requested-With': 'XMLHttpRequest',
    //             'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    //         }
    //     }).then(
    //         (response) => {
    //             return checkStatus(response)
    //         }
    //     ).then(
    //     (res) => {
    //         return checkCode(res)
    //     }
    //     )
    // },
    get (url, params) {
        return axios({
            method: 'get',
            url,
            withCredentials: true,
            params, // get 请求时带的参数
            timeout: 40000,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then(
            (response) => {
                // console.log(response)
                return response
            }
        ).then(
            (res) => {
                return res
            }
        )
    },
    instance(url ,params){
        return axios({
            method: 'get',
            baseURL: process.env.VUE_APP_BASE_API,
            url,
            params, // get 请求时带的参数
            timeout: 10000000,
            responseType:'blob',
            // headers: {
            //     'Content-Type': 'application/octet-stream;charset=utf-8'
            // }
        }).then(
            (response) => {
                // console.log(response)
                return checkStatus(response)
            }
        ).then(
            (res) => {
                return checkCode(res)
            }
        )
    },
    put (url, data) {
        return axios({
            method: 'put',
            baseURL: process.env.VUE_APP_BASE_API,
            url,
            data: qs.stringify(data),
            withCredentials: true,
            timeout: 10000,
            headers: {
                 'X-Requested-With': 'XMLHttpRequest',
                 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then(
            (response) => {
                return checkStatus(response)
            }
        ).then(
        (res) => {
            return checkCode(res)
        }
        )
    },
    delete (url, data) {
        return axios({
            method: 'delete',
            baseURL: process.env.VUE_APP_BASE_API,
            url,
            data: qs.stringify(data),
            withCredentials: true,
            timeout: 10000,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then(
            (response) => {
                return checkStatus(response)
            }
        ).then(
        (res) => {
            return checkCode(res)
        }
        )
    },
}