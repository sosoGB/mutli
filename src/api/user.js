/**
 * 公共的请求模块
 */
import { req } from './axiosFun';
// 登录接口 
export const login = (params) => { return req("post", "sdmulti/qbzz/login", params) };

// 查询客户列表
export const queryCus = (params) => { return req("post", "/sdmulti/qbzz/manage/api/queryCus", params) };



// 获取当前用户权限
export const menu = () => { return req("get", "/api/lutumanager/sys/resource/get/menus") };

export const calldata = () => { return req("get", "/api/QbMonitor/call_statistics?days=7") };



/**
 * 下拉框
 **/
// 获取所有教练车下拉框
export const teacherCarBox = () => { return req("post", "/api/lutumanager/teacherCar/teacherCarBox") };
// 获取所有场地下拉框
export const trainingBox = () => { return req("post", "/api/lutumanager/training/trainingBox") };
// 项目组下拉框
export const projectsBox = (params) => { return req("post", "/api/lutumanager/projectmanager/projectBox", params) };
// 角色下拉框
export const roleBox = (params) => { return req("post", "/api/lutumanager/manage/role/roleBox", params) };
// 获取所有教练下拉框
export const teacherBox = () => { return req("post", "/api/lutumanager/teacher/teacherBox") };
// 客服下拉框
export const serviceBox = (params) => { return req("post", "/api/lutumanager/signBill/serviceBox", params) };
// 班型下拉框
export const classBoxList = (params) => { return req("post", "/api/lutumanager/signBill/classBoxList", params) };
// 门店下拉框
export const outletsListBox = (params) => { return req("post", "/api/lutumanager/signBill/outletsListBox", params) };
// 来源下拉框
export const sourceBox = (params) => { return req("post", "/api/lutumanager/signBill/sourceBox", params) };
// 业务员下拉框
export const businessBox = (params) => { return req("post", "/api/lutumanager/signBill/businessBox", params) };



/**
 * 菜单权限
 **/
// 获取菜单
export const ResourceList = () => { return req("get", "/api/lutumanager/sys/resource/tree") };

