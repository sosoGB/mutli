<template>
  <div class="createTask page-list">
    <!-- 面包屑导航 -->
    <div class="nav">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/main/customerManage/customerList' }"
          >首页</el-breadcrumb-item
        >
        <el-breadcrumb-item :to="{ path: '/main/customerManage/customerList' }"
          >客户批次管理</el-breadcrumb-item
        >
        <el-breadcrumb-item>新建任务</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-form
      :model="createFormData"
      ref="createForm"
      :rules="createFormRule"
      label-width="150px"
    >
      <el-form-item prop="name" label="任务名称：">
        <el-input
          v-model.trim="createFormData.name"
          placeholder="请输入任务名称"
          clearable
          class="input-name"
        ></el-input>
      </el-form-item>
      <el-form-item label="外呼客户数量：" prop="customerNum">
        <span>共{{ selectCtNum }},从第</span>
        <el-input
          type="number"
          size="small"
          :min="1"
          :max="selectCtNum"
          @input="checkLastNum"
          v-model="createFormData.customerNum"
          style="width:80px;"
        ></el-input>
        <span>-第</span>
        <el-input
          type="number"
          size="small"
          :min="1"
          :max="selectCtNum"
          @input="lastNumOnInput"
          v-model="createFormData.customerNum2"
          style="width:80px;"
        ></el-input>
        <span>个进行选取</span>
      </el-form-item>
      <el-form-item prop="outCallPlatformId" label="外呼平台：">
        <div class="input-large form-item_upload">
          <el-select
            v-model="createFormData.outCallPlatformId"
            @change="handleChangePlat"
            placeholder="请选择外呼平台"
            filterable
            multiple
          >
            <el-option
              v-for="item in OutCallPlatformList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
      </el-form-item>
      <el-form-item
        prop="robotName"
        label="机器人名称："
        v-if="createFormData.outCallPlatformId.length"
      >
        <div class="input-large form-item_upload">
          <el-select
            v-model="createFormData.robotName"
            placeholder="请选择机器人名称"
            filterable
            clearable
          >
            <el-option
              v-for="item in robotList"
              :key="item.id"
              :label="item.showName"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-button
            @click="handleDownload(createFormData.robotName)"
            type="primary"
            >下载机器人变量模板</el-button
          >
        </div>
      </el-form-item>

      <el-form-item prop="importComVar" label="共用型变量：">
        <div class="input-large form-item_upload">
          <file-uploader
            class="form-uploader"
            :uploaded.sync="createFormData.importComVar"
          ></file-uploader>
          <el-button @click="handleDownloadTemplate(1)" type="primary"
            >下载模板</el-button
          >
        </div>
      </el-form-item>
      <el-form-item prop="importRelVar" label="关系型变量：">
        <div class="input-large form-item_upload">
          <file-uploader
            class="form-uploader"
            :uploaded.sync="createFormData.importRelVar"
          ></file-uploader>
          <el-button @click="handleDownloadTemplate(2)" type="primary"
            >下载模板</el-button
          >
        </div>
      </el-form-item>

      <el-form-item
        prop="importRelVar"
        label="变量校验："
        v-show="ulCom && ulRel"
      >
        <div class="input-large form-item_upload">
          <el-button
            @click="handleCheckVar()"
            type="primary"
            size="mini"
            v-show="!varResult"
            >{{ checkVar ? '校验中...' : '变量校验' }}</el-button
          >
          <el-button type="success" size="mini" v-show="varResult"
            >校验成功</el-button
          >
        </div>
      </el-form-item>
      <el-form-item prop="concurrentNum" label="总并发数量：">
        <el-input
          v-model.trim="createFormData.concurrentNum"
          placeholder=""
          clearable
          class="input-name"
        ></el-input>
      </el-form-item>
      <el-form-item prop="weeks" label="外呼周期：">
        <el-checkbox-group
          v-model="createFormData.weeks"
          style="display:inline-block;"
        >
          <el-checkbox
            v-for="item in dateList"
            :label="item.value"
            :key="item.value"
            style="width:80px;"
            >{{ item.name }}</el-checkbox
          >
        </el-checkbox-group>
      </el-form-item>
      <el-form-item prop="times" label="外呼时间段：">
        <div style="font-size:12px;color:#999;">
          请尽量避免在用户休息时间段外呼；分钟选取以10min为最小选择单位，如13h20min-16h40min。
        </div>
        <div
          v-for="(item, index) in createFormData.times"
          :key="index"
          style="margin-bottom:10px;"
        >
          <el-time-select
            placeholder="起始时间"
            v-model="item.startTime"
            :clearable="false"
            :picker-options="{
              start: '00:00',
              step: '00:10',
              end: '23:50'
            }"
          >
          </el-time-select>
          <span>-</span>
          <el-time-select
            placeholder="结束时间"
            v-model="item.endTime"
            :clearable="false"
            :picker-options="{
              start: '00:10',
              step: '00:10',
              end: '24:00',
              minTime: item.startTime
            }"
          >
          </el-time-select>
          <el-button
            v-if="index == 0"
            icon="el-icon-plus"
            type="primary"
            @click="addTimeRange"
            size="mini"
            style="margin-left:20px;"
          ></el-button>
          <el-button
            v-else
            icon="el-icon-minus"
            type="danger"
            @click="deleteTimeRange(index)"
            style="margin-left:20px;"
            size="mini"
          ></el-button>
        </div>
      </el-form-item>
      <el-form-item prop="type" label="外呼启动方式：">
        <el-radio-group v-model="createFormData.type">
          <el-radio :label="0">定时启动</el-radio>
          <el-radio :label="1">立即启动</el-radio>
          <el-radio :label="2">手动启动</el-radio>
        </el-radio-group>
        <div class="timing">
          <div v-if="createFormData.type === 0">
            <span>任务启动时间：</span>
            <div>
              <el-date-picker
                v-model="createFormData.startDate"
                value-format="yyyy-MM-dd"
                type="date"
                :editable="false"
                :picker-options="datePicker"
                placeholder="选择日期"
              >
              </el-date-picker>
              <el-time-select
                v-model="createFormData.startTime"
                popper-class="startTimer"
                :picker-options="{
                  start: '08:00',
                  step: '00:10',
                  end: '22:00'
                }"
                placeholder="选择时间"
              >
              </el-time-select>
            </div>
          </div>
          <div class="allowTime" v-for="domain in allowTime" :key="domain.key">
            <el-time-select
              v-model="domain.allowstartTime"
              popper-class="startTimer"
              :picker-options="{
                start: '08:00',
                step: '00:10',
                end: '22:00'
              }"
              placeholder="选择时间"
            >
            </el-time-select>
            <el-time-select
              v-model="domain.allowendTime"
              popper-class="startTimer"
              :picker-options="{
                start: '07:55',
                step: '00:10',
                end: '22:05'
              }"
              placeholder="选择时间"
            >
            </el-time-select>
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              @click.prevent="removeDomain(domain)"
            ></el-button>
          </div>
        </div>
      </el-form-item>
      <el-form-item prop="callSingle" label="呼叫去重：">
        <el-radio-group v-model="createFormData.callSingle">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="recallFlag" label="自动失败重呼：">
        <el-radio-group v-model="createFormData.recallFlag">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
        <div v-show="createFormData.recallFlag">
          <p>
            <span class="form-prefix">选择通话结果</span>
            <span
              class="clickable"
              @click="handleCheckAllCallResult(createFormData)"
            >
              {{
                createFormData.recallResult.length === recallResultList.length
                  ? '全部取消'
                  : '全选'
              }}
            </span>
          </p>
          <el-checkbox-group v-model="createFormData.recallResult">
            <el-checkbox
              v-for="item in recallResultList"
              :label="item.key"
              :key="item.key"
              >{{ item.label }}</el-checkbox
            >
          </el-checkbox-group>
          <el-form-item
            label-width="70px"
            prop="recallInterval"
            label="重呼间隔"
          >
            <el-input-number
              v-model="createFormData.recallInterval"
              :min="1"
              :precision="0"
              size="small"
              placeholder="请输入重呼间隔"
            ></el-input-number>
            <span class="form-suffix">分钟</span>
          </el-form-item>
          <el-form-item label-width="70px" prop="recallMaxNum" label="重呼次数">
            <el-input-number
              v-model="createFormData.recallMaxNum"
              :min="1"
              :precision="0"
              size="small"
              placeholder="请输入重呼次数"
            ></el-input-number>
            <span class="form-suffix">次</span>
          </el-form-item>
        </div>
      </el-form-item>
      <el-form-item prop="conversionFlag" label="转化失败重呼：">
        <el-radio-group v-model="createFormData.conversionFlag">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
        <div v-show="createFormData.conversionFlag">
          <div class="conversion_task">
            <span class="form-prefix">任务创建时间</span>
            <span class="form-conversion-suffix">当前任务创建后</span>
            <el-input
              v-model.trim="createFormData.name"
              placeholder=""
              clearable
              class="input-name"
            ></el-input>
            <span class="form-conversion-suffix">天</span>
            <el-time-select
              v-model="createFormData.startTime"
              popper-class="startTimer"
              :picker-options="{
                start: '08:00',
                step: '00:10',
                end: '22:00'
              }"
              placeholder="选择时间"
            >
            </el-time-select>
            <el-form-item prop="type">
              <span class="form-prefix">任务启动方式</span>
              <el-radio-group v-model="createFormData.type">
                <el-radio :label="'立即启动'">立即启动</el-radio>
                <el-radio :label="'手动启动'">手动启动</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item prop="type">
              <span class="form-prefix">接通失败重呼</span>
              <el-radio-group v-model="createFormData.jietongFlag">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <div v-show="createFormData.jietongFlag">
              <span class="form-prefix">选择通话结果</span>
              <span
                class="clickable"
                @click="handleCheckAllCallConversionResult(createFormData)"
              >
                {{
                  createFormData.recallResult.length ===
                  conversionResultList.length
                    ? '全部取消'
                    : '全选'
                }}
              </span>
              <el-checkbox-group v-model="createFormData.recallResult">
                <el-checkbox
                  v-for="item in conversionResultList"
                  :label="item.key"
                  :key="item.key"
                  >{{ item.label }}</el-checkbox
                >
              </el-checkbox-group>
              <el-form-item
                label-width="70px"
                prop="recallInterval"
                label="重呼间隔"
              >
                <el-input-number
                  v-model="createFormData.recallInterval"
                  :min="1"
                  :precision="0"
                  size="small"
                  placeholder="请输入重呼间隔"
                ></el-input-number>
                <span class="form-suffix">分钟</span>
              </el-form-item>
              <el-form-item
                label-width="70px"
                prop="recallMaxNum"
                label="重呼次数"
              >
                <el-input-number
                  v-model="createFormData.recallMaxNum"
                  :min="1"
                  :precision="0"
                  size="small"
                  placeholder="请输入重呼次数"
                ></el-input-number>
                <span class="form-suffix">次</span>
              </el-form-item>
            </div>
          </div>
        </div>
      </el-form-item>
    </el-form>
    <el-row class="bottom">
      <el-button type="primary" @click="submitCreateForm">确定</el-button>
      <el-button @click="backtrack">取消</el-button>
    </el-row>
    <progress-pop
      :close-on-click-modal="false"
      :dialog-visible.sync="dialogVisible"
      :is-finished="progerssFinish"
    ></progress-pop>
  </div>
</template>

<script>
import FileUploader from '@/components/FileUploader'
import ProgressPop from '@/components/ProgressPop'
import util from '@/service/filter'
export default {
  components: {
    FileUploader,
    ProgressPop
  },
  data() {
    return {
      selectCtNum: 0, //已选客户数量
      selectRobotName: null, //已选机器人名称
      ulCom: null,
      ulRel: null,
      checkVar: '', //是否在校验
      unionVO: null, //变量校验参数
      customerInfoVOs: null,
      varResult: null, //校验结果
      allowstartTime: '', //允许开始时间
      allowendTime: '', //允许结束时间
      errorNum: 0, //错误号码数量
      robotList: [], // 可选机器人列表
      OutCallPlatformList: [], //可选外呼平台列表
      dialogVisible: false, // 加密提示弹框是否展示
      progerssFinish: false, // 加密相关文件上传是否完成
      recallResultList: [
        { label: '正在通话中', key: '1' },
        { label: '用户忙', key: '2' },
        { label: '无应答', key: '3' },
        { label: '空号', key: '4' },
        { label: '关机', key: '5' },
        { label: '停机', key: '6' },
        { label: '号码错误', key: '8' },
        { label: '暂停服务', key: '12' },
        { label: '暂时无法接通', key: '13' },
        { label: '线路欠费', key: '17' },
        { label: '请求超时', key: '18' },
        { label: '用户未响应', key: '22' },
        { label: '其他', key: '7,11,14,15,16,19,20,21' }
      ], // 可选通话结果
      conversionResultList: [
        { label: '正在通话中', key: '1' },
        { label: '用户忙', key: '2' },
        { label: '无应答', key: '3' },
        { label: '空号', key: '4' },
        { label: '关机', key: '5' },
        { label: '停机', key: '6' },
        { label: '号码错误', key: '8' },
        { label: '暂停服务', key: '12' },
        { label: '暂时无法接通', key: '13' },
        { label: '线路欠费', key: '17' },
        { label: '请求超时', key: '18' },
        { label: '用户未响应', key: '22' },
        { label: '其他', key: '7,11,14,15,16,19,20,21' }
      ], // 可选通话结果
      dateList: [
        { name: '星期一', value: 0 },
        { name: '星期二', value: 1 },
        { name: '星期三', value: 2 },
        { name: '星期四', value: 3 },
        { name: '星期五', value: 4 },
        { name: '星期六', value: 5 },
        { name: '星期日', value: 6 }
      ],
      createFormData: {
        customerNum: 1,
        customerNum2: '',
        name: null, // 任务名称
        robotName: null, // 机器人名称
        outCallPlatformId: [], // 外呼平台名称
        concurrentNum: null, //并发数量
        activeNumber: null, // 线路
        importMethod: 'file', // 导入方式
        importComVar: [], //共用型变量导入
        importRelVar: [], //关系型变量导入
        customerList: [], // 用户列表
        callSingle: 1, // 呼叫去重
        recallFlag: 0, // 自动失败重呼
        recallResult: [], // 通话结果
        recallInterval: 1, // 重呼间隔
        recallMaxNum: 1, // 重呼次数
        type: 0, // 启动设置
        startDate: null, // 启动日期
        startTime: null, // 启动时间
        conversionFlag: 0, // 转化失败重呼
        jietongFlag: 0, // 接通失败重呼
        weeks: [0, 1, 2, 3, 4, 5, 6],
        times: [{ startTime: '08:00', endTime: '22:00' }]
      }, // 新建任务表单项
      createFormRule: {
        name: [
          { required: true, message: '请输入任务名称', trigger: 'blur' },
          { max: 40, message: '不得超过40个字符', trigger: 'blur' }
        ],
        customerNum: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error('请输入外呼客户数量'))
              } else if (value > this.selectCtNum) {
                callback(new Error('输入值不可大于最大客户数量'))
              } else {
                callback()
              }
            }
          }
        ],
        times: [
          {
            validator: (rule, value, callback) => {
              value.forEach((e, index) => {
                if (!e.startTime || !e.endTime) {
                  callback(new Error('请输入完整的外呼时段'))
                }
                if (e.startTime > e.endTime) {
                  callback(new Error('同组外呼时段结束时间不能早于开始时间'))
                }
                for (let i = index + 1; i < value.length; i++) {
                  const element = value[i]
                  let flag =
                    (element.startTime >= e.startTime &&
                      element.startTime <= e.endTime) ||
                    (element.endTime >= e.startTime &&
                      element.endTime <= e.endTime)
                  if (flag) {
                    callback(new Error('外呼时段存在重复区间，请修改'))
                  }
                }
              })
              callback()
            }
          }
        ],
        // weeks: [
        //   { required: true, message: '请选择允许的外呼周期', trigger: 'change' }
        // ],
        robotName: [
          { required: true, message: '请选择机器人名称', trigger: 'blur' }
        ],
        concurrentNum: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error('请输入总并发数量'))
              } else {
                this.$request
                  .jsonPost('/sdmulti/task/checkConcurrentNum', {
                    concurrentNum: this.createFormData.concurrentNum,
                    serviceIds: this.createFormData.outCallPlatformId
                  })
                  .then((res) => {
                    if (res.code === '0' && res.data === false) {
                      callback(new Error(res.message))
                    } else {
                      callback()
                    }
                  })
              }
            }
          }
        ],
        recallInterval: [
          {
            validator: (rule, value, callback) => {
              if (this.createFormData.recallFlag && !value) {
                callback(new Error('请输入重呼间隔'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
        recallMaxNum: [
          {
            validator: (rule, value, callback) => {
              if (this.createFormData.recallFlag && !value) {
                callback(new Error('请输入重呼次数'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
        conversionInterval: [
          {
            validator: (rule, value, callback) => {
              if (this.createFormData.conversionFlag && !value) {
                callback(new Error('请输入重呼间隔'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
        conversionMaxNum: [
          {
            validator: (rule, value, callback) => {
              if (this.createFormData.conversionFlag && !value) {
                callback(new Error('请输入重呼次数'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
        importComVar: [
          {
            validator: (rule, value, callback) => {
              if (
                this.createFormData.importMethod === 'file' &&
                !value.length
              ) {
                callback(new Error('请导入公用型变量'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
        importRelVar: [
          {
            validator: (rule, value, callback) => {
              if (
                this.createFormData.importMethod === 'file' &&
                !value.length
              ) {
                callback(new Error('请导入关系型变量'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ]
      }, // 新增任务表单项校验规则
      beginDateValidator: (search, field) => {
        return {
          disabledDate: (current) =>
            this[search][field] &&
            util.formatDate(current, 'yyyy-MM-dd') > this[search][field]
        }
      },
      endDateValidator: (search, field) => {
        return {
          disabledDate: (current) =>
            this[search][field] &&
            util.formatDate(current, 'yyyy-MM-dd') < this[search][field]
        }
      },
      datePicker: {
        disabledDate: (time) => time.getTime() < Date.now() - 8.64e7
      },
      allowTime: [],
      allowTimes: [],
      dynamicValidateForm: {
        domains: [
          {
            value: ''
          }
        ]
      }
    }
  },
  watch: {
    // 'createFormData.concurrentNum': {
    //   handler () {
    //     if (this.timer) {
    //       clearTimeout(this.timer)
    //     }
    //     this.timer = setTimeout(() => {
    //       this.checkConcurrentNum();
    //     }, 2500)
    //   },
    //   deep: true
    // },
    // 导入公用型变量
    'createFormData.importComVar'(files) {
      if (!files || !files.length) return
      if (!this.validateFile(files[0])) {
        this.createFormData.importComVar = []
        return
      }
      this.ulCom = files[0]
    },
    // 导入关系型变量
    'createFormData.importRelVar'(files) {
      if (!files || !files.length) return
      if (!this.validateFile(files[0])) {
        this.createFormData.importRelVar = []
        return
      }
      this.ulRel = files[0]
    }
  },
  created() {
    //把数组由字符串转化成数字
    const param = this.$route.query.name
    const search = this.$route.query.search
    const pagination = this.$route.query.pagination
    let distList = []
    let customerInfos = []
    param.forEach((item) => {
      distList.push(item.row.distCt)
      var obj = {}
      obj.uuid = item.row.uuid
      obj.type = item.row.type
      obj.userId = search.userId
      obj.batch = search.batch
      obj.startTime = search.startTime
      obj.endTime = search.endTime
      obj.isCall = search.isCall
      obj.isNewCus = search.isNewCus
      obj.isSuccess = search.isSuccess
      obj.isName = search.isName
      if (
        search.sex &&
        search.sex.length &&
        search.sex.includes(0) &&
        !search.sex.includes(2)
      ) {
        obj.sex = [...search.sex, 2]
      } else {
        obj.sex = search.sex
      }
      obj.minAge = search.minAge
      obj.maxAge = search.maxAge
      obj.page = pagination.currentPage
      obj.pageSize = pagination.pageSize
      customerInfos.push(obj)
    })
    let vo = {}
    this.customerInfoVOs = customerInfos
    vo.customerInfos = customerInfos
    this.unionVO = vo
    const numList = distList.map(Number)
    //计算客户总数量
    this.selectCtNum = numList.reduce(function(prev, cur) {
      return prev + cur
    })
    this.createFormData.customerNum2 = this.selectCtNum
    // this.fetchRobotList()
    this.fetchPlatFormList()
  },
  methods: {
    lastNumOnInput(e) {
      if (!isNaN(parseInt(e)) && e > this.selectCtNum) {
        this.createFormData.customerNum2 = this.selectCtNum
      }
      if (!isNaN(parseInt(e)) && e < this.createFormData.customerNum) {
        this.createFormData.customerNum2 = this.createFormData.customerNum
      }
      this.varResult = null
    },
    checkLastNum(e) {
      if (
        !isNaN(parseInt(e)) &&
        this.createFormData.customerNum2 < parseInt(e) &&
        parseInt(e) <= this.selectCtNum
      ) {
        this.createFormData.customerNum2 = parseInt(e)
      }
      if (!isNaN(parseInt(e)) && parseInt(e) < 1) {
        this.createFormData.customerNum = 1
      }
      if (!isNaN(parseInt(e)) && parseInt(e) > this.selectCtNum) {
        this.createFormData.customerNum = this.selectCtNum
      }
      this.varResult = null
    },
    addTimeRange() {
      if (this.createFormData.times.length > 3) return
      this.createFormData.times.push({
        startTime: '',
        endTime: ''
      })
    },
    deleteTimeRange(index) {
      this.createFormData.times.splice(index, 1)
    },
    removeDomain(item) {
      var index = this.allowTime.indexOf(item)
      this.allowTime.splice(index, 1)
      this.allowTimes.splice(index, 1)
    },
    addDomain() {
      if (!this.allowstartTime || !this.allowendTime) {
        this.$message.warning('请选择正确的时间添加')
        return
      }
      this.allowTimes.push(
        this.allowstartTime + ':00-' + this.allowendTime + ':00'
      )
      this.allowTime.push({
        allowstartTime: this.allowstartTime,
        allowendTime: this.allowendTime
      })
      this.allowstartTime = ''
      this.allowendTime = ''
    },
    // 选择外呼平台
    handleChangePlat(select) {
      if (select) {
        let platforms = []
        select.forEach((item) => {
          let plat = this.OutCallPlatformList.find((list) => {
            return list.id === item
          })
          let obj = {}
          obj.platformId = plat.id
          obj.userId = plat.serviceUserId
          obj.robotId = plat.robotId
          platforms.push(obj)
        })
        this.unionVO.platforms = platforms
        this.createFormData.robotName = ''
        this.fetchRobotList()
      }
    },
    // 变量校验
    handleCheckVar() {
      if (!this.createFormData.robotName) {
        this.$message.warning('请先选择机器人名称')
        return
      }
      if (this.createFormData.outCallPlatformId.length === 0) {
        this.$message.warning('请先选择外呼平台')
        return
      }
      if (!this.checkVar) {
        this.checkVar = true
        this.$message.warning('正在校验，请勿重复点击校验')
        let param = new FormData()
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        param.append('pFile', this.ulCom)
        param.append('rFile', this.ulRel)
        param.append('unionVO', JSON.stringify(this.unionVO))
        param.append('start', this.createFormData.customerNum)
        param.append('end', this.createFormData.customerNum2)
        const url = '/sdmulti/qbzz/manage/api/check/union'
        return this.$request
          .uploadPost(url, param, config)
          .then((res) => {
            if (res.code === '0') {
              this.varResult = res.data
              this.$message.success(res.message)
            } else {
              this.checkVar = false
              return Promise.reject([])
            }
          })
          .finally(() => {
            this.checkVar = false
          })
      }
    },
    // 校验并发数
    checkConcurrentNum() {
      this.$request
        .jsonPost('/sdmulti/task/checkConcurrentNum', {
          concurrentNum: this.createFormData.concurrentNum,
          serviceIds: this.createFormData.outCallPlatformId
        })
        .then((res) => {
          if (res.code === '0' && res.data === false) {
            this.$message.error(res.message)
          }
        })
    },
    // 查询机器人列表
    fetchRobotList() {
      let serviceInfos = this.OutCallPlatformList.filter((e) => {
        return this.createFormData.outCallPlatformId.includes(e.id)
      }).map((e) => {
        let a = { ...e }
        delete a.status
        return a
      })
      let fd = new FormData()
      fd.append('serviceInfos', JSON.stringify({ serviceInfos }))
      this.$request
        .uploadPost('/sdmulti/task/getRobotsByService', fd)
        .then((res) => {
          this.robotList = res.data
        })
    },
    //称查询外呼平台列表
    fetchPlatFormList() {
      this.$request.formGet('/sdmulti/service/info/all').then((res) => {
        this.OutCallPlatformList = res.data
      })
    },
    // // 切换机器人名称
    // handleChangeRobotName() {
    //   this.createFormData.outCallPlatformId = []
    //   this.fetchOutCallPlatformList()
    // },
    // 全选/取消全选通话结果
    handleCheckAllCallResult(formData) {
      if (formData.recallResult.length === this.recallResultList.length) {
        formData.recallResult = []
      } else {
        formData.recallResult = this.recallResultList.map((item) => item.key)
      }
    },
    // 全选/取消全选通话结果
    handleCheckAllCallConversionResult(formData) {
      if (formData.recallResult.length === this.conversionResultList.length) {
        formData.recallResult = []
      } else {
        formData.recallResult = this.conversionResultList.map(
          (item) => item.key
        )
      }
    },
    // 验证文件可用性
    validateFile(file) {
      if (file.size > 1024 * 1024 * 5) {
        this.$message.error('文件不得超过5M')
        return false
      }
      return true
    },
    // 点击下载机器人变量模板
    async handleDownload(robotName) {
      if (!robotName) {
        this.$message.warning('请先选择机器人名称')
        return
      }
      const res = await this.$request.xmlGet(
        `sdmulti/task/variable/down/${robotName}`
      )
      const a = document.createElement('a')
      a.download = robotName + '-机器人模板.xls'
      a.href = URL.createObjectURL(res)
      a.click()
    },

    // 点击下载模板
    async handleDownloadTemplate(id) {
      let a = document.createElement('a')
      let res = await this.$request.xmlGet(`/sdmulti/task/template/down/${id}`)
      const endStr = id === 1 ? '共用型变量.xls' : '关系型变量.xls'
      a.download = endStr
      a.href = URL.createObjectURL(res)
      a.click()
    },
    // 提交新建任务表单
    async submitCreateForm() {
      this.$refs.createForm.validate(async (isValid) => {
        if (!isValid) {
          this.$message.error('请填写必填字段')
          return
        }
        if (
          this.createFormData.type === '0' &&
          (!this.createFormData.startDate || !this.createFormData.startTime)
        ) {
          this.$message.error('请填写启动任务日期及时间')
          return
        }

        const taskTime =
          this.createFormData.startDate +
          ' ' +
          this.createFormData.startTime +
          ':00'
        const timeSeconds = new Date(taskTime).getTime()
        if (this.createFormData.type === 0 && timeSeconds < Date.now()) {
          this.$message.error('启动时间不能早于当前时间')
          return
        }
        let times = this.createFormData.times
          .map((e) => e.startTime + ':00-' + e.endTime + ':00')
          .join(',')
        // 保存参数
        const param = {
          userId: this.$store.state.userInfo.userId,
          name: this.createFormData.name,
          phoneCt: this.selectCtNum,
          robotName: this.createFormData.robotName,
          calls: this.createFormData.outCallPlatformId,
          concurrentNum: this.createFormData.concurrentNum,
          type: this.createFormData.type,
          taskTime: this.createFormData.type === 0 ? taskTime : null,
          allowTime: this.allowTimes,
          callSingle: this.createFormData.callSingle == 1 ? true : false, //呼叫去重
          connectCall: this.createFormData.recallFlag,
          platforms: this.varResult, //校验结果
          customerInfoVOs: this.customerInfoVOs,
          weeks: this.createFormData.weeks.join(','),
          times,
          start: this.createFormData.customerNum,
          end: this.createFormData.customerNum2
        }
        // 如果选了自动失败重呼，则添加通话结果
        if (param.connectCall) {
          param.connectCallResult = this.createFormData.recallResult.map(Number)
          param.timeInterval = this.createFormData.recallInterval
          param.callNum = this.createFormData.recallMaxNum
        }
        // if (param.conversionFlag) {
        //   param.connectCallResult = this.createFormData.conversionrecallResult.join(',')
        //   param.conversionrecallSpace = this.createFormData.conversionrecallInterval
        //   param.conversionrecallMaxNum = this.createFormData.conversionrecallMaxNum
        // }
        let loading,
          ltext = '正在创建，请稍候'
        loading = this.$loading({
          lock: true,
          text: ltext,
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.5)'
        })
        const url = '/sdmulti/task/save'
        return this.$request
          .jsonPost(url, param)
          .then((res) => {
            if (res.code === '0') {
              this.$message.success('新增任务成功')
              this.$router.replace('/main/callManage/callTask')
            } else {
              return Promise.reject([])
            }
          })
          .catch((err) => {
            this.$alert(err.response.data.message || '系统错误', '错误提示', {
              confirmButtonText: '确定',
              callback: () => {
                this.$router.replace('/main/callManage/callTask')
              }
            })
          })
          .finally(() => {
            loading.close()
          })
      })
    },
    // 返回任务列表页
    backtrack() {
      this.$router.replace('customerList')
    },
    // 任务启动时间focus事件
    handleStartTimeFocus() {
      this.$nextTick(() => {
        const items = document
          .querySelector('.startTimer')
          .querySelectorAll('.time-select-item')
        items.forEach((item) => {
          if (item.innerHTML >= '12:00' && item.innerHTML < '14:00') {
            item.style.display = 'none'
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/common.scss';
.createTask {
  height: 100%;
  padding: 15px 0;
  display: flex;
  flex-direction: column;
  .el-form {
    flex: 1;
    overflow: auto;
    .input-name {
      width: 217px;
    }
    .el-divider {
      margin-top: 10px;
    }
    .el-row {
      display: flex;
      flex-wrap: wrap;
    }
    /deep/ .el-badge__content {
      height: auto;
    }
    .import {
      display: flex;
      .import-label {
        min-width: 150px;
      }
      .import-content {
        flex: 1;
      }
      .import-radio /deep/ {
        display: flex;
        .el-radio__input {
          padding-top: 13px;
        }
        .el-radio__label {
          display: flex;
          .import-radio_label {
            padding-top: 13px;
            min-width: 100px;
          }
          .import-radio_content {
            flex: 1;
          }
        }
      }
    }
  }
  .allowTime {
    margin-bottom: 12px;
  }
  .conversion_task {
    color: #606266;
    .input-name {
      width: 100px;
    }
    .form-conversion-suffix {
      margin: 10px;
    }
  }
  .timing {
    margin-top: 6px;
    display: flex;
    color: #606266;
    flex-direction: column;
    .el-date-editor {
      margin-right: 10px;
    }
  }
  .form-item_upload {
    display: flex;
    align-items: center;
    .form-uploader {
      flex: 1;
      overflow: hidden;
      margin-right: 20px;
      position: relative;
    }
    .el-select {
      margin-right: 20px;
      /deep/ .el-input__inner {
        margin-right: 20px;
      }
    }
    .el-tooltip {
      position: absolute;
      right: -30px;
    }
    .el-icon-question {
      font-size: 20px;
    }
  }
  .no-high {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .bottom {
    padding: 5px 40px;
    button + button {
      margin-left: 20px;
    }
  }
  .dialog-opportunity /deep/ {
    .search-input {
      width: 170px;
    }
    .el-dialog {
      width: 85vw;
      max-width: none;
      height: 85vh;
      .toolbar {
        padding: 20px;
      }
      .el-dialog__body {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 0;
      }
    }
  }
}
</style>
