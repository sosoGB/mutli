import axios from './requist'

// 新增产品
export const processInfo = params =>{
    return axios.jsonGet('/merchant/v2.0/getprocesstemplateinfo',params)
}
//获取模版详情信息
export const templateInfo = params =>{
    return axios.jsonGet('/merchant/v2.0/get/templateinfo',params)
}
//保存模版信息
export const saveTemplateInfo = params =>{
    return axios.jsonPut('/merchant/v2.0/update/templateinfo',params)
}
//1开始 2结束 3putong 4转人工
//新增node节点 /merchant/v2.0/tasknode/save
export const saveNode = params => {
    return axios.jsonPost('/merchant/v2.0/tasknode/save',params)
}
//节点信息删除 /merchant/v2.0/tasknode/delete
export const delectNode = params =>{
    return axios.jsonDelete('/merchant/v2.0/tasknode/delete',params)
}
//节点信息删除 /merchant/v2.0/tasknode/updata
export const updataNode = params =>{
    return axios.jsonPut('/merchant/v2.0/tasknode/update',params)
}
//新增跳转逻辑
export const addJumpInfo = params =>{
    return axios.jsonPost('/merchant/v2.0/jumpinfo',params)
}
//更新跳转逻辑
export const upDateJumpInfo = params =>{
    return axios.jsonPut('/merchant/v2.0/jumpinfo',params)
}
//获取跳转逻辑
export const getJumpInfo = params =>{
    return axios.jsonGet('/merchant/v2.0/jumpinfo',params)
}
//删除跳转逻辑
export const deleteJumpInfo = params =>{
    return axios.jsonDelete('/merchant/v2.0/jumpinfo',params)
}
///merchant/v2.0/template/status
//模版启用停用
export const templateStatus = params =>{
    return axios.jsonPut('merchant/v2.0/template/status',params)
}
//关联意图模版/merchant/v2.0/intenttemplate
export const masterplate = params =>{
    return axios.jsonGet('merchant/v2.0/intenttemplate',params)
}
//新增话术模版 /merchant/v2.0/template/save
export const newTeplate = params =>{
    return axios.jsonPost('merchant/v2.0/template/save',params)
}
//查询关联实体 GET /merchant/v2.0/relatedEntity
export const getRelatedEntry = params =>{
    return axios.jsonGet('/merchant/v2.0/relatedEntity',params)
}
//查询关联机器人 GET /merchant/v2.0/robotintro
export const getRelatedRobot = params =>{
    return axios.jsonGet('/merchant/v2.0/robotintro',params)
}
//更新模版信息 PUT /merchant/v2.0/processtemplateinfo
export const updateInfo = params =>{
    return axios.jsonPut('/merchant/v2.0/processtemplateinfo',params)
}
//等待学习问题 GET /merchant/v2.0/unlearnedProblem
export const waitToLearn = params =>{
    return axios.jsonGet('/merchant/v2.0/unlearnedProblem',params)
}
//删除待学习问题  /merchant/v2.0/unlearnedProblem
export const delectToLearn = params =>{
    return axios.jsonDelete('/merchant/v2.0/unlearnedProblem',params)
}
//模拟测试/robot/factory/answer
export const testRobot = params =>{
    return axios.jsonPost('/merchant/v2.0/mockTest',params)
}
//产品数量校验
export const checkMasterplateNum = params =>{
    return axios.get('/merchant/v2.0/checkAddNew',params)
}
