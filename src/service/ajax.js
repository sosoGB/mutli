import axios from './iframe'
//登陆页面请求
export const getMessage = (params) => {
    return axios.post('http://test.chat.qb-tech.net/acs/v1.0/new_robot_answer',params)
}
//退出登陆 /merchant/v1.0/session
export const getList = (params) => {
    return axios.get('http://test.chat.qb-tech.net/acs/v1.0/new_robot_answer',params)
}