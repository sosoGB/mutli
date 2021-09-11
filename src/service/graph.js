import axios from './requist'

// GET /merchant/v2.0/graph/knowledge/node 知识图谱列表查询
export const getNodeList = params =>{
    return axios.get('/merchant/v2.0/graph/knowledge/node',params)
}
// DELETE /merchant/v2.0/graph/knowledge/class 删除分类
export const deleteClass = params=>{
    return axios.jsonDelete('/merchant/v2.0/graph/knowledge/class',params)
}
export const getClass = params=>{
    return axios.get('/merchant/v2.0/graph/knowledge/class',params)
}
export const postClass = params=>{
    return axios.jsonPost('/merchant/v2.0/graph/knowledge/class',params)
}
export const putClass = params=>{
    return axios.jsonPut('/merchant/v2.0/graph/knowledge/class',params)
}
// GET /merchant/v2.0/graph/knowledge/list? 获取查询列表接口
export const getList = params=>{
    return axios.get('/merchant/v2.0/graph/knowledge/list',params)
}
// POST /merchant/v2.0/graph/knowledge/node
export const postNode = params=>{
    return axios.jsonPost('/merchant/v2.0/graph/knowledge/node',params)
}
// POST /merchant/v2.0/graph/knowledge/node
export const delectGraphNode = params=>{
    return axios.jsonDelete('/merchant/v2.0/graph/knowledge/node',params)
}
// GET /merchant/v2.0/graph/getKnowledge/entity
export const getGraphNode = params=>{
    return axios.get('/merchant/v2.0/graph/getKnowledge/entity',params)
}
// PUT /merchant/v2.0/graph/knowledge/node 
export const putGraphNode = params=>{
    return axios.jsonPut('/merchant/v2.0/graph/knowledge/node',params)
}
// GET /merchant/v2.0/graph/knowledge
export const getGraphknowledge = params=>{
    return axios.get('/merchant/v2.0/graph/knowledge',params)
}