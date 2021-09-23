/**
 * 公共的请求模块
 */
import { req } from './axiosFun';
// 登录接口 
export const login = (params) => { return req("post", "sdmulti/qbzz/login", params) };

// 查询客户列表
export const queryCus = (params) => { return req("post", "/sdmulti/qbzz/manage/api/queryCus", params) };