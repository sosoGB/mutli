<template>
  <div class="taskList page-list">
    <!-- 面包屑导航 -->
    <div class="nav">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>呼叫任务管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="toolbar">
      <div class="tool-search">
        <el-input placeholder="请输入任务名称" class="search-component search-input" v-model.trim="search.planName" @keyup.enter.native="fetchTaskList(1)" clearable></el-input>
        <el-select v-model="search.taskStatus" placeholder="请选择任务状态" clearable class="search-component search-input">
          <el-option v-for="(value, key) in taskStatusList" :key="key" :label="value.statusName" :value="key"></el-option>
        </el-select>
        <el-date-picker v-model="search.beginDate" class="search-component search-input" type="date" placeholder="开始日期" value-format="yyyy-MM-dd" :picker-options="beginDateValidator('search', 'endDate')" clearable></el-date-picker>
        <span class="search-delimiter">-</span>
        <el-date-picker v-model="search.endDate" class="search-component search-input" type="date" placeholder="结束日期" value-format="yyyy-MM-dd" :picker-options="endDateValidator('search', 'beginDate')" clearable></el-date-picker>
        <el-select v-model="search.robotName" placeholder="请选择机器人名称" clearable class="search-component search-input">
          <el-option v-for="(item,index) in robotList" :key="index" :label="item" :value="item"></el-option>
        </el-select>
        <el-button type="primary" class="search-component" @click="fetchTaskList(1)">搜索</el-button>
      </div>
      <div class="tool-button">
        <el-button @click="$router.push('createTask')" icon="el-icon-plus">新建任务</el-button>
      </div>
    </div>

    <div class="table">
      <el-table :data="planList" height="100%" border stripe tooltip-effect="dark" v-loading="isLoadingPlanList" @selection-change="(val) => (checkedTableRow = val)">
        <el-table-column type="selection" fixed="left" align="center" width="55"></el-table-column>
        <el-table-column label="序号" align="center" type="index" width="55">
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="name" label="任务名称" width="160" align="center"></el-table-column>
        <el-table-column show-overflow-tooltip prop="robotName" label="机器人名称" min-width="200" align="center"></el-table-column>
        <el-table-column show-overflow-tooltip prop="concurrentNum" label="并发数量" min-width="200" align="center"></el-table-column>
        <el-table-column show-overflow-tooltip prop="calls" label="外呼平台" min-width="200" align="center"></el-table-column>
        <el-table-column label="任务状态" width="140" align="center">
          <template slot-scope="scope">
            <span class="icon-status" :class="scope.row.statusClass">{{
              scope.row.statusName
            }}</span>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="phoneCt" label="号码总数" width="160" align="center"></el-table-column>
        <el-table-column show-overflow-tooltip prop="finishNum" label="已呼数量" width="160" align="center"></el-table-column>
        <el-table-column show-overflow-tooltip prop="successNum" label="接通数量" width="160" align="center"></el-table-column>
        <el-table-column label="接通率" width="100" align="center">
          <template slot-scope="scope">
            <span>{{
              scope.row.finishNum
                ? ((scope.row.successNum * 100) / scope.row.finishNum).toFixed(
                    2
                  ) + '%'
                : '0.00%'
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="定时启动时间" width="180" align="center">
          <template slot-scope="scope">
            <span>{{
              scope.row.taskTime | formatDate('yyyy-MM-dd hh:mm:ss')
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="开始时间" width="180" align="center">
          <template slot-scope="scope">
            <span>{{
              scope.row.beginTime | formatDate('yyyy-MM-dd hh:mm:ss')
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="结束时间" width="180" align="center">
          <template slot-scope="scope">
            <span>{{
              scope.row.endTime | formatDate('yyyy-MM-dd hh:mm:ss')
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="280" fixed="right" align="center">
          <template slot-scope="scope">
            <el-button v-if="
                  scope.row.status === 0 ||
                  scope.row.status === 3 ||
                  scope.row.status === 4
              " @click="handleRun(scope.row.id,scope.row.status)">启动</el-button>
            <el-button v-else-if="scope.row.status === 1" @click="handlePause(scope.row.id,scope.row.status)">暂停</el-button>
            <el-button v-else-if="scope.row.status === 2" disabled>完成</el-button>
            <el-button @click="handleExport(scope.row.id)">下载</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="pagination">
      <el-pagination background @current-change="fetchTaskList" @size-change="fetchTaskList" :page-size.sync="pagination.pageSize" :page-sizes="[10, 20, 50]" :current-page.sync="pagination.currentPage" layout="prev, pager, next, sizes, jumper" :total="pagination.total"></el-pagination>
    </div>

    <el-dialog title="编辑任务" :visible.sync="dialogEditVisible" @close="$refs.editForm.resetFields()" class="ddd">
      <el-form :model="editFormData" ref="editForm" :rules="editFormRule" label-width="150px">
        <el-form-item prop="planName" label="任务名称：">
          <el-input disabled v-model.trim="editFormData.planName" placeholder="请输入任务名称" class="input-large"></el-input>
        </el-form-item>
        <el-form-item prop="robotName" label="机器人名称：">
          <el-select disabled v-model="editFormData.robotName" placeholder="请选择机器人名称" class="input-large">
            <el-option v-for="(item,index) in robotList" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="activeNumber" label="线路选取：">
          <flow-select :options="activeNumberList" popperClass="selectmulti" labelField="lineId" placeholder="请选择线路" v-model="editFormData.activeNumber" class="flow-sel" width="420" @visibleChange="selectToggleDown"></flow-select>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="dialogEditVisible = false">取消</el-button>
        <el-button type="primary" @click="submitEditForm">确定</el-button>
      </span>
    </el-dialog>
    <progress-pop :close-on-click-modal="false" :dialog-visible.sync="dialogVisible" :is-finished="progerssFinish"></progress-pop>
  </div>
</template>
<script>
import util from '@/service/filter'
import ProgressPop from '@/components/ProgressPop'
import FlowSelect from '@/components/FlowSelect'
export default {
  components: {
    FlowSelect,
    ProgressPop
  },
  data () {
    return {
      authCreate: false,
      authRecall: false,
      authDelete: false,
      authExport: false,
      authCatchcall: false,
      authEdit: false,
      userInfo: this.$store.state.userInfo,
      ifCheckAllCat: false, // 是否选择所有分类
      ifCheckAllRes: false, // 是否选择所有失败结果
      errorNum: 0, //错误号码数量
      jsons: [], //文件导入之后的数据
      dialogVisible: false, // 加密提示弹框是否展示
      progerssFinish: false, // 加密相关文件上传是否完成
      search: {
        planName: null,
        taskStatus: null,
        beginDate: null,
        endDate: null,
        robotName: null,
        suserId: '',
        tuserId: ''
      }, // 搜索条件
      suserIdList: [],
      tuserIdList: [],
      taskStatusList: {
        '0': {
          statusName: '待启动',
          statusClass: 'status-ready'
        },
        '1': {
          statusName: '运行中',
          statusClass: 'status-running'
        },
        '2': {
          statusName: '已完成',
          statusClass: 'status-completed'
        },
        '3': {
          statusName: '已暂停',
          statusClass: 'status-paused'
        },
        '4': {
          statusName: '定时暂停',
          statusClass: 'status-timeout'
        }
        // '5': {
        //   statusName: '定时启动',
        //   statusClass: 'status-timein'
        // },
        // '6': {
        //   statusName: '重呼准备中',
        //   statusClass: 'status-recall'
        // }
      },
      robotList: [], // 可选机器人列表
      categoryList: ['A类', 'B类', 'C类', 'D类', 'E类', 'F类', '未分类'], // 可选意向分类
      activeNumberList: [], // 可选线路
      availableCallTaskTemplate: [238, 253, 283, 310], // 可选任务模板id
      planList: [], // 任务列表数据
      isLoadingPlanList: false, // 控制表格loading效果显隐
      checkedTableRow: [], // 表格已选中行
      pagination: {
        currentPage: 1,
        total: 50,
        pageSize: 10
      }, // 分页数据
      dialogEditVisible: false, // 编辑任务弹框是否可见
      recallForm: {
        name: null,
        robotName: null,
        robotId: null,
        planType: null,
        planTypeName: null,
        activeNumber: null,
        recallResult: [], // 已选择的呼叫结果
        selectedCat: [], // 已选择的分类
        callSingle: true,
        startWay: '自动启动',
        maxCallTime: null,
        minCallTime: null,
        maxAllCallNum: null,
        minAllCallNum: null
      },
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
      editFormData: {
        id: null, // 任务id
        planName: null, // 任务名称
        robotId: null, // 机器人名称
        activeNumber: null // 线路
      }, // 编辑任务表单项
      editFormRule: {
        robotId: [
          { required: true, message: '请选择机器人名称', trigger: 'blur' }
        ],
        activeNumber: [
          { required: true, message: '请选择线路', trigger: 'blur' }
        ]
      }, // 编辑任务表单项校验规则
      chaseFormData: {
        planName: '', // 任务名称
        importMethod: 'file', // 导入方式
        importFile: [], // 文件导入
        customerList: [], // 用户列表
        importNumber: null, // 输入号码
        callSingle: 1 //呼叫去重，默认为1
      }, // 追拨任务表单项
      chaseFormRule: {
        importFile: [
          {
            validator: (rule, value, callback) => {
              if (this.chaseFormData.importMethod === 'file' && !value.length) {
                callback(new Error('请选择导入文件'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
        importNumber: [
          {
            validator: (rule, value, callback) => {
              if (this.chaseFormData.importMethod === 'manual') {
                if (!value) {
                  callback(new Error('请输入号码'))
                } else if (!/^1[3-9]\d{9}(,1[3-9]\d{9})*$/.test(value)) {
                  callback(new Error('请输入正确手机号'))
                } else {
                  callback()
                }
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ]
      }, // 追拨任务表单项校验规则
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
      }
    }
  },
  watch: {
    'chaseFormData.importFile' (files) {
      if (!files || !files.length) return
      if (!this.validateFile(files[0])) {
        this.chaseFormData.importFile = []
        return
      }
      this.transpileFile(files[0], this.chaseFormData.robotId).then(
        (res) => {
          // this.chaseFormData.customerList = res[0];
          this.jsons = res.dataList
          this.errorNum = res.errorNum
          if (res.reminderText) {
            this.$message({
              message: res.reminderText,
              type: 'warning',
              duration: 6000
            })
          }
        },
        () => {
          this.chaseFormData.importFile = []
        }
      )
    }
  },
  async created () {
    this.fetchTaskList()
    this.fetchRobotList()
  },
  methods: {
    beforeSelectBus () {
      if (this.userInfo.rankCode == 10 && !this.search.suserId) {
        this.$message.error('请先选择所属二级账号')
        this.$refs.busRef.blur()
      }
    },

    selectToggleDown (isShow) {
      this.$nextTick(() => {
        if (isShow) {
          const el = this.$el.querySelector('.selectmulti')
          el.style.position = 'static'
          const el2 = this.$el.querySelector('.flow-sel .el-select__tags')
          el2.style.top = '20px'
          const el3 = el.querySelector('.popper__arrow')
          el3.style.top = '46px'
        }
      })
    },
    // 根据全选状态切换呼叫结果
    checkAllRes () {
      this.ifCheckAllRes = !this.ifCheckAllRes
      if (this.ifCheckAllRes) {
        this.recallForm.recallResult = this.recallResultList.map(
          (item) => item.key
        )
      } else {
        this.recallForm.recallResult = []
      }
    },
    // 根据全选状态切换意向分类
    checkAllCat () {
      this.ifCheckAllCat = !this.ifCheckAllCat
      if (this.ifCheckAllCat) {
        this.categoryList.forEach((item) => {
          this.recallForm.selectedCat.push(item)
        })
      } else {
        this.recallForm.selectedCat = []
      }
    },
    // 根据选择的呼叫结果切换全选状态
    toggleCheckAllRes () {
      this.ifCheckAllRes =
        this.recallForm.recallResult.length === this.recallResultList.length
          ? true
          : false
    },
    // 切换选择的通话分类
    toggleSelectedCat (val) {
      const flag = this.recallForm.selectedCat.includes(val)
      if (flag) {
        const index = this.recallForm.selectedCat.indexOf(val)
        this.recallForm.selectedCat.splice(index, 1)
      } else {
        this.recallForm.selectedCat.push(val)
      }
      this.ifCheckAllCat =
        this.recallForm.selectedCat.length === this.categoryList.length
          ? true
          : false
    },
    // 查询任务列表
    fetchTaskList (type) {
      if (type === 1) {
        // 筛选搜索页码要重置为1
        this.pagination.currentPage = 1
      }
      this.isLoadingPlanList = true

      this.$request
        .jsonPost('/sdmulti/task/getTaskInfoList', {
          userId: this.$store.state.userInfo.userId,
          startTime: this.search.beginDate ? this.search.beginDate + ' 23:59:59' : null,
          endTime: this.search.endDate ? this.search.endDate + ' 23:59:59' : null,
          name: this.search.planName,
          robotName: this.search.robotName ? this.search.robotName : null,
          status: this.search.taskStatus === '' ? null : this.search.taskStatus,
          page: this.pagination.currentPage,
          size: this.pagination.pageSize,
          taskId: this.search.taskId
        })
        .then((res) => {
          this.isLoadingPlanList = false
          if (!res.data) {
            if (res.message) {
              this.$message.error('获取任务列表失败-' + res.message)
            }
            return
          }
          this.planList = res.data.list.map((item) => {
            // 根据状态id映射状态名与样式类
            return Object.assign(item, this.taskStatusList[item.status])
          })
          this.planList.forEach((item) => {
            item.overSixMon =
              Date.now() - new Date(item.beginTime).getTime() >
                6 * 30 * 24 * 3600 * 1000
                ? true
                : false
          })
          this.pagination.total = res.data.total
        })
    },
    // 查询机器人列表
    fetchRobotList () {
      this.$request
        .jsonGet('/sdmulti/task/getRobotNames')
        .then((res) => {
          this.robotList = res.data
        })
    },
    // 点击启动按钮
    handleRun (taskId) {
      this.isLoadingPlanList = true
      this.$request
        .jsonPost('/sdmulti/task/updateStatus', {
          status: 1,
          taskId,
          userId: this.$store.state.userInfo.id,
        })
        .then((res) => {
          if (res.code === '0') {
            this.$message.success('启动成功')
            this.fetchTaskList()
          } else {
            this.$message.error(res.message)
          }
        })
        .finally(() => {
          this.isLoadingPlanList = false
        })
    },
    // 点击暂停按钮
    handlePause (taskId) {
      this.$request
        .jsonPost('/sdmulti/task/updateStatus', {
          status: 3,
          taskId,
          userId: this.$store.state.userInfo.id,
        })
        .then((res) => {
          if (res.code === '0') {
            this.$message.success('暂停成功')
            this.fetchTaskList()
          } else {
            this.$message.error(res.message)
          }
        })
    },
    // 点击下载按钮
    async handleExport (taskId) {
      const res = await this.$request.xml('/sdmulti/task/export', { taskId })
      const a = document.createElement('a')
      a.download = '未呼号码+失败号码.xls'
      a.href = URL.createObjectURL(res)
      a.click()
    },
    /**
     * 点击表格行编辑按钮，唤起编辑弹窗
     * @param data 行数据
     */
    handleEdit (data) {
      if (data.lineIds && data.lineIds.length) {
        data.lineIds = data.lineIds.map((e) => parseInt(e))
      }
      this.editFormData = {
        id: data.id,
        planName: data.planName,
        robotId: data.robotId,
        activeNumber: data.lineIds
      }
      this.dialogEditVisible = true
    },
    // 提交编辑任务表单
    submitEditForm () {
      this.$refs.editForm.validate((isValid) => {
        if (!isValid) {
          this.$message.error('请填写必填字段')
          return
        }

        const param = {
          id: this.editFormData.id,
          userId: this.$store.state.userInfo.userId,
          robotId: this.editFormData.robotId,
          activeNums: this.editFormData.activeNumber.join(',')
        }
        this.$request.post('/sdmulti/plan/update', param).then((res) => {
          if (res.code === '0') {
            this.$message.success('编辑任务成功')
            this.fetchTaskList()
            this.dialogEditVisible = false
          } else {
            this.$message.error(res.message)
          }
        })
      })
    },
    // 验证文件可用性
    validateFile (file) {
      if (file.size > 1024 * 1024 * 5) {
        this.$message.error('文件不得超过5M')
        return false
      }
      return true
    },
    // 解析已上传文件
    transpileFile (file, robotId) {
      let param = new FormData()
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      const loading = this.$loading({
        lock: true,
        text: '正在解析，请稍候',
        spinner: 'el-icon-loading',
        background: 'rgba(255, 255, 255, 0.3)'
      })
      param.append('file', file)
      param.append('code', robotId)
      param.append('userId', this.$store.state.userInfo.userId)
      return this.$request
        .post('/sdmulti/customer/file', param, config)
        .then((res) => {
          if (res.code === '0') {
            return Promise.resolve(res.data)
          } else {
            this.$message.warning(res.message)
            return Promise.reject([])
          }
        })
        .finally(() => {
          loading.close()
        })
    },
    // 点击下载模板
    async handleDownloadTemplate (robotId) {
      if (!robotId) {
        this.$message.warning('请先选择机器人名称')
        return
      }
      const robotItem = this.robotList.find((item) => {
        return item.id == robotId
      })
      let a = document.createElement('a')
      let res = await this.$request({
        method: 'get',
        responseType: 'blob',
        url: '/sdmulti/variable/down/' + robotId + '/false'
      })
      a.download = robotItem.showName + '-文件导入模板.xls'
      a.href = URL.createObjectURL(res)
      a.click()
    }
  }
}
</script>
<style lang="scss">
/deep/ .select-multi {
  left: 0;
}
</style>
<style lang="scss" scoped>
@import "@/assets/css/common.scss";
.ddd {
  /deep/ .el-dialog__body {
    overflow: hidden;
  }
}
.form-item_upload {
  display: flex;
  align-items: center;
  .form-uploader {
    flex: 1;
    overflow: hidden;
    margin-right: 20px;
  }
}
.recallTitle {
  font-size: 14px;
  font-weight: 600;
  color: #2e008b;
}
.recallForm {
  margin-top: 30px;
  max-height: 500px;
  overflow: auto;
  padding-right: 10px;
  .input-short {
    width: 100px;
  }
  .input-long {
    width: 400px;
  }
  .el-checkbox {
    width: 96px;
    margin-bottom: 10px;
  }
  /deep/.el-form-item__label {
    font-weight: 600;
  }
  .formLabel {
    margin-bottom: 20px;
    font-weight: 600;
  }
  .check-all {
    margin-left: 10px;
    color: $themeColor;
    /* font-weight: 500; */
    cursor: pointer;
  }
  .advanced-category-container {
    margin-bottom: 20px;
  }
  .advanced-category {
    display: inline-block;
    width: 92.5px;
    line-height: 27px;
    text-align: center;
    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    cursor: pointer;
    margin: 0 15px 10px 0;
    color: rgba(0, 0, 0, 0.65);
    transition: all 0.3s;
    &.selected {
      color: #fff;
      border-color: $themeColor;
      background: $themeColor;
    }
  }
}
</style>
