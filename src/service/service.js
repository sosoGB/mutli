import axios from './requist'

//登陆页面请求
export const login = (params) => {
    return axios.post('/merchant/v1.0/sessions',params,process.env.VUE_APP_PLATFORM_API)
}
//退出登陆 /merchant/v1.0/session
export const delLogin = (params) => {
    return axios.delete('/merchant/v1.0/session',params)
}
//获取用户信息 merchant/v1.0/user/info
export const getInfo = params =>{
    return axios.get('/merchant/v1.0/user/info',params)
}
//宝付支付POST /merchant/v2.0/payindex
export const payIndex = params =>{
    return axios.post('/merchant/v2.0/order/payindex',params)
}
//宝付支付POST /merchant/v2.0/payindex
export const rechargeIndex = params =>{
    return axios.post('/merchant/v2.0/recharge/payindex',params)
}

//获取手机验证码 /merchant/v1.0/sms_codes/"+$('.phone').val()
export const getCheckCode = params =>{
    return axios.get("/merchant/v1.0/sms_codes",params)
}
//重置登录信息 merchant/v1.0/reset_password
export const resetPassWord = params =>{
    return axios.post("/merchant/v1.0/reset_password", params)
}
//获取热词  /merchant/v1.0/record/hot_words
export const hotWords = (params) => {
    return axios.get('/merchant/v1.0/record/hot_words',params)
}
//智能呼叫中心
export const smartCall = params => {
    return axios.get('/merchant/v2.0/robot/user_bind',params)
}
//新增机器人校验
export const checkAddNewRobot = params =>{
    return axios.get('/robot/checkAddNew',params)
}
//机器人管理 merchant/v2.0/robot/robot_manage
export const robotManage = params => {
    return axios.get('/merchant/v2.0/robot/robot_manage',params)
}
// 删除机器人
export const deleteRobot = params => {
    return axios.get('/robot/delete',params)
}
//下载批量导入模版/merchant/v2.0/robot/volume_increase
export const downLoad = params => {
    return axios.instance('/merchant/v2.0/robot/volume_increase',params)
}
// 模版上传 merchant/v2.0/robot/volume_increase
export const exportFile = params =>{
    return axios.post('/merchant/v2.0/robot/volume_increase',params)
}
//判断是否能够导出  /merchant/v1.0/record/checkIsCanExcel
export const checkIsCanExcel = params => {
    return axios.post('/merchant/v1.0/robot/checkIsCanExcel',params)
}
//导出机器人列表  /merchant/v1.0/record/csv
export const Csv = params => {
    return axios.instance('/merchant/v1.0/record/csv',params)
}
//导出历史客服统计列表 /merchant/v2.0/service/service_account_excel
export const getServiceExcel = params => {
    return axios.instance('/merchant/v2.0/service/service_account_excel',params)
}
//导出当日客服统计列表 /merchant/v2.0/service/daily_account_excel
export const getDailyExcel = params => {
    return axios.instance('/merchant/v2.0/service/daily_account_excel',params)
}
//余额充值  merchant/v2.0/recharge_order_create
export const rechargeOrderCreate = params =>{
    return axios.post('/merchant/v2.0/recharge_order_create',params)
}
//个性化列表 merchant/v2.0/robot/robot_personal
export const robotPersonal = params =>{
    return axios.get('/merchant/v2.0/robot/robot_personal',params)
}
//个性化修改 ，新增 merchant/v2.0/robot/robot_personal
export const newRobotPersonal = params =>{
    return axios.post('/merchant/v2.0/robot/robot_personal',params)
}
//删除个性化设置
export const delOrRepireRobot = params =>{
    return axios.put('/merchant/v2.0/robot/robot_personal',params)
}
// 机器人数据
export const getRobot = params => {
    return axios.get('/merchant/v1.0/record/dialogs',params)
}
// 机器人数据分析
export const getAnalysis = params => {
    return axios.get('/merchant/v1.0/robot/analysisInfo',params)
}
//robot_detail 机器人详情
export const robotDetail = params =>{
    return axios.get('merchant/v2.0/robot/robot_detail',params)
}
//机器人数据选项
export const robotNumber = params => {
    return axios.get('/merchant/v2.0/robot/robot_number',params)
}
//机器人数据编辑
export const robotEdit = params => {
    return axios.post('/merchant/v2.0/robot/robot_detail',params)
}
//机器人导出数据
export const recordCsv = params => {
    return axios.get('/merchant/v1.0/record/csv',params)
}
//是否可以下载机器人数据
export const isCanExcel = params => {
    return axios.get('/merchant/v1.0/isCanExcel',params)
}
//是否可以下载机器人数据
export const fileDelete = params => {
    return axios.post('/file/delete',params)
}
//点赞点踩
export const solveChange = params => {
    return axios.post('/merchant/v2.0/robot/solve_change',params)
}
//客服数据  merchant/v2.0/service/service_record
export const getCustomer = params => {
    return axios.get('merchant/v2.0/service/service_record',params)
}
//热门问题数据 
export const queryChatList = params => {
    return axios.get('merchant/v2.0/queryChatList',params)
}
//热门问题详情 
export const queryChatDetail = params => {
    return axios.get('merchant/v2.0/queryChatDetail',params)
}
//客服统计数据
export const getAnalysisInfo = params => {
    return axios.get('merchant/v1.0/customer/analysisInfo',params)
}
//客服管理列表 merchant/v2.0/service/service_manage
export const serviceManage = params => {
    return axios.get('merchant/v2.0/service/service_manage',params)
}
//余额订单管理 merchant/v2.0/balance_recharge
export const balanceRecharge = params =>{
    return axios.get('merchant/v2.0/balance_recharge',params)
}
//余额订单管理 merchant/v2.0/balance_recharge
export const balanceRechargePay = params =>{
    return axios.put('merchant/v2.0/balance_recharge',params)
}
//余额充值 merchant/v2.0/balance_recharge
export const rechargeOrder = params =>{
    return axios.post('merchant/v2.0/balance_recharge',params)
}
//余额购买 merchant/v2.0/balance_recharge
export const rechargePay = params =>{
    return axios.put('merchant/v2.0/recharge_pay',params)
}
//流量订单 未完成  merchant/v2.0/unfinish_order
export const unfinishOrder = params =>{
    return axios.get('merchant/v2.0/unfinish_order',params)
}
//流量订单 已完成 merchant/v2.0/finish_order
export const finishOrder = params =>{
    return axios.get('merchant/v2.0/finish_order',params)
}
//流量订单 已取消 merchant/v2.0/cancell_order
export const cancelOrder = params =>{
    return axios.get('merchant/v2.0/cancell_order',params)
}
//历史客服工作统计  merchant/v2.0/service/service_account
export const serviceAccount = params =>{
    return axios.get('merchant/v2.0/service/service_account',params)
}//当天客服工作统计 merchant/v2.0/service/daily_account
export const dailyAccount = params =>{
    return axios.get('merchant/v2.0/service/daily_account',params)
}
//客服详情 merchant/v2.0/service/service_record
export const customerDetail = params =>{
    return axios.post('merchant/v2.0/service/service_record',params)
}
//销售漏斗  merchant/v2.0/robot/robot_level
export const robotLevel = params =>{
    return axios.get('merchant/v2.0/robot/robot_level',params)
}
//套餐管理  merchant/v2.0/robot/robot_level
export const dataType = params =>{
    return axios.get('merchant/v2.0/data_type',params)
}
export const planBalance = params =>{
    return axios.get('merchant/v2.0/plan_balance',params)
}
// 套餐提交订单生成订单 /merchant/v2.0/order_list
export const newOrder = params =>{
    return axios.post('/merchant/v2.0/order_list',params)
}
//微信支付接口
export const pay = params =>{
    return axios.put('/merchant/v2.0/order_list',params)
}
//微信支付检测/merchant/v2.0/order_pay
export const weiXinPay =params =>{
    return axios.put('/merchant/v2.0/order_pay',params)
}
//转账支付 merchant/v2.0/order_online_pay
export const transferPay =params =>{
    return axios.post('merchant/v2.0/order_online_pay',params)
}
//余额充值 /merchant/v2.0/balance_online_pay
export const balanceOrderPay =params =>{
    return axios.post('merchant/v2.0/balance_online_pay',params)
}
//客服管理 新增客服  merchant/v2.0/service/service_manage
export const pServiceManage = params =>{
    return axios.post('merchant/v2.0/service/service_manage',params)
}
//客服管理 删除客服  merchant/v2.0/service/service_manage
export const dServiceManage = params =>{
    return axios.delete('merchant/v2.0/service/service_manage',params)
}
//客服管理 编辑客服  merchant/v2.0/service/service_manage
export const eServiceManage = params =>{
    return axios.put('merchant/v2.0/service/service_manage',params)
}
//qa配置 知识库 merchant/v1.0/robot/qa_settings
export const qaSetting = params =>{
    return axios.get('merchant/v1.0/robot/qa_settings',params)
}
//qa批量上传 merchant/v2.0/robot/volume_increase
export const qaImport = params => {
    return axios.post('merchant/v2.0/robot/volume_increase',params)
}
//QA 对删除
export const delQA = params =>{
    return axios.delete('merchant/v1.0/robot/qa_settings',params)
}
//QA对修改 merchant/v1.0/robot/single_qa_settings
export const repQA = params =>{
    return axios.get('merchant/v1.0/robot/single_qa_settings',params)
}
//新增qa关联问题
export const queSetting =params =>{
    return axios.post('merchant/v1.0/robot/qa_settings',params)
}
//添加编辑qa
export const repSetting =params =>{
    return axios.put('merchant/v1.0/robot/qa_settings',params)
}
// 获取机器人答案
export const getNewRobotAnswer = params =>{
    return axios.get('http://test.chat.qb-tech.net/acs/v1.0/new_robot_answer',params)
}

//  机器人管理模块 json格式请求调用
// 获取机器人答案
export const roborModify = params =>{
    return axios.jsonPut('robot/update',params)
}

// /product/list
export const  productList= params =>{
    return axios.jsonGet('platform/platformList/userId',params)
}
// /product/list
export const  platformList= params =>{
    return axios.jsonGet('product/productInfo/userId',params)
}
// /robot/setting/save
export const robotSetSaveAndRepair= params =>{
    return axios.jsonPost('robot/setting/save',params)
}
// /robot/save 机器人新增
export const robotSave = params =>{
    return axios.jsonPost('robot/save',params)
}
// 获取热门产品列表
export const  hotSaleProductList= params =>{
    return axios.jsonGet('/merchant/v2.0/hot_sale/products',params)
}
export const addHotSaleProduct = params => axios.jsonPost('/merchant/v2.0/hot_sale/product',params)
export const updateHotSaleProduct = params => axios.jsonPut('/merchant/v2.0/hot_sale/product',params)
export const uploadHotSaleProductImg = params => axios.uploadPost('/merchant/v2.0hot_sale/product-picture-upload',params)
//热销产品列表向上向下移动
export const moveHotSaleProduct = params => axios.put('/merchant/v2.0/hot_sale/product/move',params)
//删除热销产品
export const deleteHotSaleProduct = id => axios.delete(`/merchant/v2.0/hot_sale/product/${id}`)
// 获取保险公司列表
export const getInsuranceCompanyList = params =>{
    return axios.get('/product/productCompany/simpleList',params)
}
// 获取平台列表
export const getPlatformList = params =>{
    return axios.get('/platform/list',params)
}
// 检查可否新增平台
export const checkAddPlatform = () => {
    return axios.get('/platform/checkAddNew')
}
// 新增平台
export const addPlatform = params =>{
    return axios.jsonPut('/platform/add',params)
}
// 删除平台
export const deletePlatform = params =>{
    return axios.get('/platform/delete',params)
}
// 查询平台数据
export const queryPlatformInfo = params =>{
    return axios.get('/platform/platformIdNew',params)
}
// 修改平台数据
export const editPlatform = params =>{
    return axios.jsonPut('/platform/edit',params)
}
// 获取产品列表
export const getProductList = params =>{
    return axios.get('/product/list',params)
}
// 删除产品
export const deleteProduct = params =>{
    return axios.get('/product/delete',params)
}
// 新增产品
export const addProduct = params =>{
    return axios.jsonPost('/product/save',params)
}
// 查询产品数据
export const queryProductInfo = params =>{
    return axios.get('/product/productId/productInfo',params)
}
// 修改产品数据
export const editProduct = params =>{
    return axios.jsonPut('/product/update',params)
}
// 余额订单管理跳转支付
export const getBalanceRechargeOrder = params =>{
    return axios.get('/merchant/v2.0/getBalanceRechargeOrder',params)
}
//流量订单跳转支付
export const getFluxOrder = params =>{
    return axios.get('/merchant/v2.0/getFluxOrder',params)
}
//获取数据概况
export const getStatisticalData = params =>{
    return axios.get('/merchant/v2.0/getStatisticalData',params)
}
//获取数据趋势
export const customerTotalData = params =>{
    return axios.get('/merchant/v2.0/customerTotalData',params)
}
//获取热门问题
export const hotIssue = params =>{
    return axios.get('/merchant/v2.0/hotIssue',params)
}
//获取客户分类标签列表
export const customerLabel = params =>{
    return axios.get('/merchant/v2.0/customerLabel/list',params)
}
//获取客户意图标签列表
export const intentionLabel = params =>{
    return axios.get('/merchant/v2.0/intentionLabel/list',params)
}
//获取客户列表
export const customerList = params =>{
    return axios.jsonGet('/merchant/v2.0/customer/list',params)
}
//用户画像导出
export const personas = params =>{
    return axios.instance('/merchant/v2.0/personas',params)
}
//启用停用客户意图标签
export const updateIntentionFlag = params =>{
    return axios.jsonPut('/merchant/v2.0/intentionLabel/updateFlag',params)
}
//启用停用客户分类标签
export const updateCategoryFlag = params =>{
    return axios.jsonPut('/merchant/v2.0/customerLabel/updateFlag',params)
}
//添加客户分类标签
export const addCustomerLabel = params =>{
    return axios.jsonPost('/merchant/v2.0/customerLabel/insert',params)
}
//编辑客户分类标签
export const updateCustomerLabel = params =>{
    return axios.jsonPut('/merchant/v2.0/customerLabel/update',params)
}
//获取身份筛选
export const getIdentityList = params =>{
    return axios.get('/merchant/v2.0/customer/identityList',params)
}
//获取意图筛选
export const getIntentionList = params =>{
    return axios.get('/merchant/v2.0/customer/intentionList',params)
}
//查看详情
export const getDetailInfo = params =>{
    return axios.get('/merchant/v2.0/customer/find',params)
}
//录入客户
export const insertCustomer = params =>{
    return axios.jsonPost('/merchant/v2.0/customer/insert',params)
}
//数据概况列表导出
export const exportDataProfile = params =>{
    return axios.instance('/merchant/v2.0/data/excel',params)
}
//上传机器人头像
export const uploadIcon = params =>{
    return axios.uploadPost('/merchant/v2.0/avatar',params)
}
///merchant/v1.0/news 获取新闻    /merchant/v1.0/insurance获取保险产品
export const getInsuranceList = params =>{
    return axios.get('/merchant/v1.0/insurance',params)
}
export const getNewsList = params =>{
    return axios.get('/merchant/v1.0/news',params)
}
//查看产品是否重复命名 
export const wheatherRepeat = params =>{
    return axios.jsonGet('/product/repeat/product',params)
}

//新增分组管理  /merchant/v2.0/groupInfo
export const newGroup = params =>{
    return axios.jsonPost('/merchant/v2.0/groupInfo',params)
}
//修改分组管理  /merchant/v2.0/groupInfo
export const putGroup = params =>{
    return axios.jsonPut('/merchant/v2.0/groupInfo',params)
}
//查询分组管理
export const searchGroup = params =>{
    return axios.get('/merchant/v2.0/groupInfo',params)
}
//删除分组管理
export const delectGroup = params =>{
    return axios.jsonDelete('/merchant/v2.0/groupInfo',params)
}
//获取下拉分组 GET /merchant/v2.0/groupList
export const getGroupList = params =>{
    return axios.get('/merchant/v2.0/groupList',params)
}
// 校验QA问题是否重复
export const validateQa = params => {
    return axios.post('/merchant/v1.0/robot/checkQaSettings',params)
}
//获取关联问题
export const getRelatedQaList = params =>{
    return axios.get('/merchant/v1.0/robot/relatedQaList',params)
}
//获取qa对下拉列表 GET /merchant/v2.0/qaList
export const getQAList =params =>{
    return axios.get('/merchant/v2.0/qaList',params)
}
//图片列表 GET /merchant/v2.0/initImg
export const getImgList =params =>{
    return axios.get('/merchant/v2.0/initImg',params)
}
// 精准控制开关 GET /merchant/v2.0/robotSwitchs
export const switchButton =params =>{
    return axios.get('/merchant/v2.0/robotSwitch',params)
}
//PUT /merchant/v2.0/robotSwitch
export const switchPut = params =>{
    return axios.jsonPut('/merchant/v2.0/robotSwitch',params)
}
// GET /merchant/v2.0/productFileList 获取关联产品列表
export const getRelatedList = params =>{
    return axios.get('/merchant/v2.0/productFileList',params)
}
// GET /merchant/v2.0/productList 关联产品下拉列表
export const getRelatedProductList = params =>{
    return axios.get('/merchant/v2.0/productList',params)
}
// POST /merchant/v2.0/productFile
export const uploadfile =params=>{
    return axios.jsonPost('/merchant/v2.0/productFile',params)
}
// DELETE /merchant/v2.0/productFile 删除文件上传项
export const delectRelactFile = params =>{
    return axios.jsonDelete('/merchant/v2.0/productFile',params)
}
// GET /merchant/v2.0/productFile 下载关联模块
export const loadRelactFile = params =>{
    return axios.instance('/merchant/v2.0/productFile',params)
}
// GET /merchant/v2.0/productFile/template 模块化开关模版下载
export const loadSwitchFile = params =>{
    return axios.get('/merchant/v2.0/productFile/template',params)
}
// 车险信息获取列表
export const getVehicleInsureList = params => {
    return axios.get('http://test.open.qb-tech.net/car/task/list', params)
}
// //嵌入页客户资料保存
// export const customerMaterial = params =>{
//     return axios.jsonPost('/api/v1.0/customer/insertMaterial',params)
// }
// //嵌入页分类标签查询
// export const identityList = params =>{
//     return axios.get('/api/v1.0/customer/identityList',params)
// }
// //嵌入页加入黑名单
// export const updateBlacklist = params =>{
//     return axios.jsonPut('/api/v1.0/customer/updateBlacklist',params)
// }


//登出
// export const relogin = (params) => {
//     return axios.post(url,params)
// }

//上传PDF条款
export const uploadClause = params =>{
    return axios.uploadPost('/merchant/v2.0/pdfUpload',params)
}
//删除PDF条款
export const deleteClause = params =>{
    return axios.delete('/merchant/v2.0/deleteFile',params)
}
//新增赔偿项目返回
export const getProject = params =>{
    return axios.jsonPost('/merchant/v2.0/getProject',params)
}
//PDF条款解析数据返回
export const pdfAnalysis = params =>{
    return axios.post('/merchant/v2.0/pdfAnalysis',params)
}
//查询产品列表
export const queryCpData = params =>{
    return axios.get('/merchant/v2.0/queryCpData',params)
}
//查询产品数据
export const queryCpDataById = params =>{
    return axios.get('/merchant/v2.0/queryCpDataById',params)
}
//保存产品临时数据
export const updateRedisDataById = params =>{
    return axios.jsonPost('/merchant/v2.0/updateRedisDataById',params)
}
//保存数据到图谱
export const insertCpData = params =>{
    return axios.jsonPost('/merchant/v2.0/insertCpData',params)
}
//远程搜索险种，保险公司，国内地名，国际地名选项
export const queryOneOption = params =>{
    return axios.get('/merchant/v2.0/queryOneOption',params)
}
//远程搜索承保风险，赔偿项目
export const queryTwoOption = params =>{
    return axios.jsonPost('/merchant/v2.0/queryTwoOption',params)
}
//导入疾病、健康告知、职业表
export const importData = params =>{
    return axios.uploadPost('/merchant/v2.0/importData',params)
}
//导出表格模板
export const loadTemplate = params =>{
    return axios.instance('/merchant/v2.0/loadTemplate',params)
}
//跳过新增数据
export const insertNewData = params =>{
    return axios.get('/merchant/v2.0/insertNewData',params)
}
//产品数量校验
export const checkProductNum = params =>{
    return axios.get('/merchant/v2.0/checkProductNum',params)
}
//kg模块查询保险类型
export const getInsureTypeList = params =>{
    return axios.get('/product/insureTypeList',params)
}
//kg模块修改保险类型
export const updateInsureType = params =>{
    return axios.get('/product/updateInsureTypeKG',params)
}
//kg模块查询 GET /merchant/v2.0/kg/product
export const getKgList = params =>{
    return axios.get('/merchant/v2.0/kg/product',params)
}
//kg模版修改  PUT /merchant/v2.0/kg/product
export const editKgList = params =>{
    return axios.jsonPut('/merchant/v2.0/kg/product',params)
}
//kg答案预览  POST /merchant/v2.0/kg/product/preview
export const KgPreview = params =>{
    return axios.jsonPost('/merchant/v2.0/kg/product/preview',params)
}
//产品字段查询  GET /merchant/v2.0/kg/product/field
export const productKwSearch = params =>{
    return axios.get('/merchant/v2.0/kg/product/field',params)
}
//kg查询  GET /merchant/v2.0/kg/template
export const kgTemplate = params =>{
    return axios.get('/merchant/v2.0/kg/template',params)
}

//数量合计统计
export const getAllCount = params =>{
    return axios.get('/merchant/v2.0/getAllCount',params)
}
//数量合计统计
export const getRealTimeData = params =>{
    return axios.get('/merchant/v2.0/getRealTimeData',params)
}
//中国地图数据
export const getChinaMapData = params =>{
    return axios.get('/merchant/v2.0/getChinaMapData',params)
}
//亚洲地图数据
export const getAsiaMapData = params =>{
    return axios.get('/merchant/v2.0/getAsiaMapData',params)
}
//客户数量统计饼图
export const getUserPieCount = params =>{
    return axios.get('/merchant/v2.0/getUserPieCount',params)
}
//客户数量统计柱状图
export const getUserGraphCount = params =>{
    return axios.get('/merchant/v2.0/getUserGraphCount',params)
}
//机器人数量统计饼图
export const getRobotPieCount = params =>{
    return axios.get('/merchant/v2.0/getRobotPieCount',params)
}
//机器人数量统计柱状图
export const getRobotGraphCount = params =>{
    return axios.get('/merchant/v2.0/getRobotGraphCount',params)
}
//服务调用量统计饼图
export const getServicePieCount = params =>{
    return axios.get('/merchant/v2.0/getServicePieCount',params)
}
//服务调用量统计柱状图
export const getServiceGraphCount = params =>{
    return axios.get('/merchant/v2.0/getServiceGraphCount',params)
}
//订单金额统计饼图
export const getOrderPieCount = params =>{
    return axios.get('/merchant/v2.0/getOrderPieCount',params)
}
//订单金额统计柱状图
export const getOrderGraphCount = params =>{
    return axios.get('/merchant/v2.0/getOrderGraphCount',params)
}

//保险产品管理获取实体关系
export const queryNeo4jOption = params =>{
    return axios.jsonPost('/merchant/v2.0/queryNeo4jOption',params)
}
//保险产品管理获取实体关系
export const queryNeo4jPFOption = params =>{
    return axios.jsonPost('/merchant/v2.0/queryNeo4jPFOption',params)
}
//特定用户运维数据查询（数据表）
export const queryRobotAccountTable = params => {
    return axios.post('/file/queryRobotAccountTable',params)
}
//特定用户运维数据查询（数据总览）
export const queryRobotAccountData = params => {
    return axios.post('/file/queryRobotAccountData',params)
}
//特定用户访问问题类别统计
export const queryRobotQuestionTypeAccount = params => {
    return axios.post('/file/queryRobotQuestionTypeAccount',params)
}
