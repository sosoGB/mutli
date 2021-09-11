/* eslint-disable */
import axios from 'axios'
import { Message } from 'element-ui'
import qs from 'qs'
import {showFullScreenLoading,tryHideFullScreenLoading} from './initLoading'
import i18n from '@/locales'
axios.interceptors.request.use(config => {
    if(config.url.indexOf('order_pay') != -1
        || (config.url.indexOf('balance_recharge') !=-1 && config.method=='put')
        || config.url.indexOf('sessions') !=-1 
        || config.url.indexOf('mockTest') !=-1 
        || config.url.indexOf('queryNeo4jOption') !=-1 
        || config.url.indexOf('queryTwoOption') !=-1 
        || config.url.indexOf('queryOneOption') !=-1 
        || config.url.indexOf('queryNeo4jPFOption') !=-1
        || config.url.indexOf('isCanExcel') !=-1
        || config.url.indexOf('/file/exportTemplate') !=-1
        || config.url.indexOf('/file/delete') !=-1
        || config.url.indexOf('/file/download') !=-1
        || config.url.indexOf('/qa/selectExcelResult') !=-1
        || config.url.indexOf('/qa/batchQaDelete') !=-1
        || config.url.indexOf('/qa/batchQaExport') !=-1
        || config.url.indexOf('/qa/batchQaImport') !=-1
    ){
        
    }else{
        showFullScreenLoading()
    }
    return config
}, error => {
    return Promise.reject(error)
})

axios.interceptors.response.use(response => {
    tryHideFullScreenLoading()
    if(response.status == 200){
        return response
    }
}, err => {
    if(err.response.status == 302){
        Message.warning(i18n.t('login.pleaseLogin'))
        location.href = '/platform.html'
    }else if(err.response.status == 400){
        Message.error({
            message:err.response.data.message,
            center:true
        })
    }else if(err.response.status == 500){
        Message.error({
            message:'系统异常',
            center:true
        })
    }else{
        Message.error({
            message:err.response.data.message,
            center:true
        })
    }
    tryHideFullScreenLoading()

})

export default {
    post (url, data,path= process.env.VUE_APP_BASE_API) {
        return axios({
            method: 'post',
            baseURL: path,
            url,
            data: qs.stringify(data),
            withCredentials: true,
            timeout: 100000,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then(
            (response) => {
                return response.data
            }
        )
    },
    get (url, params) {
        return axios({
            method: 'get',
            baseURL: process.env.VUE_APP_BASE_API,
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
                return response.data
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
                return response.data
            }
        )
    },
    xml(url ,params){
        return axios({
            method: 'post',
            baseURL: process.env.VUE_APP_BASE_API,
            url,
            params, // get 请求时带的参数
            timeout: 10000000,
            responseType:'document',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then(
            (response) => {
                return response.data
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
            timeout: 40000,
            headers: {
                 'X-Requested-With': 'XMLHttpRequest',
                 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then(
            (response) => {
                return response.data
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
            timeout: 40000,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then(
            (response) => {
                return response.data
            }
        )
    },
    jsonGet(url, params) {
        return axios({
            method: 'get',
            baseURL: process.env.VUE_APP_BASE_API,
            url,
            withCredentials: true,
            params, // get 请求时带的参数
            timeout: 40000,
            paramsSerializer: function(params) {
                return qs.stringify(params, {arrayFormat: 'repeat'})
            },
            headers: {
                 'X-Requested-With': 'XMLHttpRequest',
                 'Content-Type': 'application/json'
            }
        }).then(
            (response) => {
                return response.data
            }
        )
    },
    jsonPost (url, data) {
        return axios({
            method: 'post',
            baseURL: process.env.VUE_APP_BASE_API,
            url,
            data: JSON.stringify(data),
            withCredentials: true,
            timeout: 10000,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json'
            }
        }).then(
            (response) => {
                return response.data
            }
        )
    },
    uploadPost (url, data) {
        return axios({
            method: 'post',
            baseURL: process.env.VUE_APP_BASE_API,
            url,
            data: data,
            withCredentials: true,
            timeout: 10000,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'multipart/form-data'
            }
        }).then(
            (response) => {
                return response.data
            }
        )
    },
    jsonPut (url, data) {
        return axios({
            method: 'put',
            baseURL: process.env.VUE_APP_BASE_API,
            url,
            data: JSON.stringify(data),
            withCredentials: true,
            timeout: 10000,
            headers: {
                 'X-Requested-With': 'XMLHttpRequest',
                 'Content-Type': 'application/json'
            }
        }).then(
            (response) => {
                return response.data
            }
        )
    },
    jsonDelete (url, data) {
        return axios({
            method: 'delete',
            baseURL: process.env.VUE_APP_BASE_API,
            url,
            data: JSON.stringify(data),
            withCredentials: true,
            timeout: 10000,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json'
            }
        }).then(
            (response) => {
                return response.data
            }
        )
    },
}