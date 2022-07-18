<!--
 * @Author: your name
 * @Date: 2022-02-08 15:43:03
 * @LastEditTime: 2022-04-07 09:26:39
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \mutli\src\pages\customerManage\programManageList.vue
-->
<template>
  <div class="taskList page-list">
    <!-- 面包屑导航 -->
    <div class="nav">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item
          :to="{ path: '/main/customerManage/programRosterList' }"
          >项目批次管理</el-breadcrumb-item
        >
        <el-breadcrumb-item>项目管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="toolbar">
      <div class="tool-search">
        <el-input
          placeholder="请输入关键字"
          class="search-component search-input"
          v-model.trim="search.keyword"
          @keyup.enter.native="fetchProgramList(1)"
          clearable
        ></el-input>
        <el-select
          v-model="search.taskStatus"
          placeholder="请选择项目状态"
          clearable
          class="search-component search-input"
        >
          <el-option
            v-for="item in taskStatusList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-select
          v-model="search.type"
          placeholder="请选择名单来源"
          clearable
          class="advanced-input"
        >
          <!-- <el-option label="水滴医疗险" value="水滴医疗险"></el-option>
          <el-option label="水滴公众号吸粉" value="水滴公众号吸粉"></el-option>
          <el-option label="水滴长险意向" value="水滴长险意向"></el-option>
          <el-option label="凯森" value="凯森"></el-option>
          <el-option label="元保" value="元保"></el-option> -->
          <el-option
            v-for="item in sourceTypeList"
            :label="item"
            :value="item"
            :key="item"
          ></el-option>
        </el-select>
        <el-date-picker
          v-model="search.startTime"
          class="search-component search-input"
          type="date"
          placeholder="开始日期"
          value-format="yyyy-MM-dd"
          :picker-options="startTimeValidator('search', 'endTime')"
          clearable
        ></el-date-picker>
        <span class="search-delimiter">-</span>
        <el-date-picker
          v-model="search.endTime"
          class="search-component search-input"
          type="date"
          placeholder="结束日期"
          value-format="yyyy-MM-dd"
          :picker-options="endTimeValidator('search', 'startTime')"
          clearable
        ></el-date-picker>
        <el-button
          type="primary"
          class="search-component"
          @click="fetchProgramList(1)"
          >搜索</el-button
        >
      </div>
      <div class="tool-button">
        <el-button @click="dialogEditVisible = true" icon="el-icon-plus"
          >新增项目</el-button
        >
      </div>
    </div>

    <div class="table">
      <el-table
        :data="planList"
        height="100%"
        border
        stripe
        tooltip-effect="dark"
        v-loading="isLoadingPlanList"
        @selection-change="(val) => (checkedTableRow = val)"
      >
        <el-table-column
          type="selection"
          fixed="left"
          align="center"
          width="55"
        ></el-table-column>
        <el-table-column label="序号" align="center" type="index" width="55">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="projectName"
          label="项目名称"
          width="160"
          align="center"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="type"
          label="名单来源"
          min-width="200"
          align="center"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="product"
          label="销售产品"
          min-width="200"
          align="center"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="userMobile"
          label="所属业务账号"
          min-width="200"
          align="center"
        ></el-table-column>
        <!-- <el-table-column
          prop="weeks"
          label="外呼周期"
          width="200"
          align="center"
        >
          <template slot-scope="scope">
            <el-tooltip
              :content="'星期' + getShowWeeksInTable(scope.row.weeks)"
              placement="top"
            >
              <div v-show="scope.row.weeks">
                <span>星期</span>
                <span>{{
                  getShowWeeksInTable(
                    scope.row.weeks
                      ? scope.row.weeks.split(',').slice(0, 2).join(',')
                      : null
                  )
                }}</span>
                <span
                  v-if="
                    scope.row.weeks && scope.row.weeks.split(',').length > 2
                  "
                  >...</span
                >
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          prop="times"
          label="外呼时段"
          width="200"
          align="center"
        >
          <template slot-scope="scope">
            <el-tooltip
              :content="scope.row.times"
              placement="top"
              v-if="scope.row.times"
            >
              <div>
                <div
                  v-for="(item, index) in scope.row.times.split(',')"
                  :key="scope.row.id + index"
                  v-show="index < 3"
                >
                  <div v-show="index < 2">{{ item }}</div>
                  <span v-show="index == 2">...</span>
                </div>
              </div>
            </el-tooltip>
            <div v-else></div>
          </template>
        </el-table-column> -->
        <el-table-column label="最近一次修改时间" width="180" align="center">
          <template slot-scope="scope">
            <span>{{
              scope.row.updateTime | formatDate('yyyy-MM-dd hh:mm:ss')
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="项目状态" width="140" align="center">
          <template slot-scope="scope">
            <!-- <span class="icon-status" :class="scope.row.status">{{
              scope.row.status == 1 ? '启动' : '暂停'
            }}</span> -->
            <el-tag type="success" v-if="scope.row.status == 1">启动</el-tag>
            <el-tag type="warning" v-else>暂停</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="remark"
          label="备注"
          min-width="200"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" width="280" fixed="right" align="center">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="pagination">
      <el-pagination
        background
        @current-change="fetchProgramList"
        @size-change="fetchProgramList"
        :page-size.sync="pagination.pageSize"
        :page-sizes="[10, 20, 50]"
        :current-page.sync="pagination.currentPage"
        layout="prev, pager, next, sizes, jumper"
        :total="pagination.total"
      ></el-pagination>
    </div>

    <el-dialog
      :title="editDiaTitle"
      :visible.sync="dialogEditVisible"
      @close="$refs.editForm.resetFields()"
      class="ddd"
      v-if="dialogEditVisible"
    >
      <div style="overflow: auto; height: 666px">
        <el-form
          :model="editFormData"
          ref="editForm"
          :rules="editFormRule"
          label-width="150px"
        >
          <el-form-item prop="projectName" label="项目名称：">
            <el-input
              v-model.trim="editFormData.projectName"
              placeholder="请输入项目名称"
              class="input-large"
            ></el-input>
          </el-form-item>
          <el-form-item prop="type" label="名单来源：">
            <el-select
              v-model="editFormData.type"
              placeholder="请选择名单来源"
              clearable
              class="advanced-input"
              :disabled="!!editFormData.id"
            >
              <el-option
                v-for="item in sourceTypeList"
                :label="item"
                :value="item"
                :key="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="product" label="销售产品：">
            <el-input
              v-model.trim="editFormData.product"
              placeholder="请输入销售产品"
              class="input-large"
            ></el-input>
          </el-form-item>
          <el-form-item prop="userMobile" label="所属业务账号：">
            <el-input
              v-model.trim="editFormData.userMobile"
              placeholder="请输入所属业务账号"
              class="input-large"
              :disabled="editFormData.id"
            ></el-input>
          </el-form-item>
          <!-- <el-form-item prop="weeks" label="外呼周期：">
            <el-checkbox-group
              v-model="editFormData.weeks"
              style="display: inline-block"
            >
              <el-checkbox
                v-for="item in dateList"
                :label="item.value"
                :key="item.value"
                style="width: 80px"
                >{{ item.name }}</el-checkbox
              >
            </el-checkbox-group>
          </el-form-item> -->
          <!-- <el-form-item prop="times" label="外呼时间段：">
            <div style="font-size: 12px; color: #999">
              请尽量避免在用户休息时间段外呼；分钟选取以10min为最小选择单位，如13h20min-16h40min。
            </div>
            <div
              v-for="(item, index) in editFormData.times"
              :key="index"
              style="margin-bottom: 10px"
            >
              <el-time-select
                placeholder="起始时间"
                v-model="item.startTime"
                :clearable="false"
                :picker-options="{
                  start: '00:00',
                  step: '00:10',
                  end: '23:50',
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
                  minTime: item.startTime,
                }"
              >
              </el-time-select>
              <el-button
                v-if="index == 0"
                icon="el-icon-plus"
                type="primary"
                @click="addTimeRange"
                size="mini"
                style="margin-left: 20px"
              ></el-button>
              <el-button
                v-else
                icon="el-icon-minus"
                type="danger"
                @click="deleteTimeRange(index)"
                style="margin-left: 20px"
                size="mini"
              ></el-button>
            </div>
          </el-form-item> -->
          <el-form-item prop="status" label="项目状态：">
            <el-radio-group v-model="editFormData.status">
              <el-radio :label="1">启动</el-radio>
              <el-radio :label="0">暂停</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="备注：">
            <el-input
              type="textarea"
              v-model="editFormData.remark"
              placeholder="请输入备注"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" style="text-align: center">
          <el-button @click="dialogEditVisible = false">取消</el-button>
          <el-button type="primary" @click="submitEditForm">确定</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import util from '@/service/filter'
export default {
  data() {
    return {
      userInfo: this.$store.state.userInfo,
      errorNum: 0, //错误号码数量
      jsons: [], //文件导入之后的数据
      dialogVisible: false, // 加密提示弹框是否展示
      progerssFinish: false, // 加密相关文件上传是否完成
      search: {
        keyword: null,
        taskStatus: null,
        startTime: null,
        endTime: null,
        robotName: null,
        type: null,
      }, // 搜索条件
      sourceTypeList: [],
      taskStatusList: [
        {
          name: '启动',
          value: 1,
        },
        {
          name: '暂停',
          value: 0,
        },
      ],
      categoryList: [
        'A++类',
        'A+类',
        'A类',
        'A-类',
        'B类',
        'C类',
        'D类',
        'E类',
        'F类',
        '未分类',
      ], // 可选意向分类
      dateList: [
        { name: '星期一', value: 1 },
        { name: '星期二', value: 2 },
        { name: '星期三', value: 3 },
        { name: '星期四', value: 4 },
        { name: '星期五', value: 5 },
        { name: '星期六', value: 6 },
        { name: '星期日', value: 0 },
      ],
      activeNumberList: [], // 可选线路
      availableCallTaskTemplate: [238, 253, 283, 310], // 可选任务模板id
      planList: [], // 任务列表数据
      isLoadingPlanList: false, // 控制表格loading效果显隐
      checkedTableRow: [], // 表格已选中行
      pagination: {
        currentPage: 1,
        total: 50,
        pageSize: 10,
      }, // 分页数据
      dialogEditVisible: false, // 编辑任务弹框是否可见
      editFormData: {
        id: null, // 任务id
        projectName: null, // 项目名称
        type: null,
        product: null,
        status: 1,
        remark: null,
        userMobile: null,
        weeks: [0, 1, 2, 3, 4, 5, 6],
        times: [{ startTime: '08:00', endTime: '22:00' }],
      }, // 编辑任务表单项
      editFormRule: {
        projectName: [
          { required: true, message: '请输入项目名称', trigger: 'blur' },
        ],
        type: [
          { required: true, message: '请选择名单来源', trigger: 'change' },
        ],
        product: [
          { required: true, message: '请输入销售产品', trigger: 'blur' },
        ],
        userMobile: [
          { required: true, message: '请输入所属业务账号', trigger: 'blur' },
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
            },
          },
        ],
        status: [
          { required: true, message: '请选择项目状态', trigger: 'change' },
        ],
      },
      startTimeValidator: (search, field) => {
        return {
          disabledDate: (current) =>
            this[search][field] &&
            util.formatDate(current, 'yyyy-MM-dd') > this[search][field],
        }
      },
      endTimeValidator: (search, field) => {
        return {
          disabledDate: (current) =>
            this[search][field] &&
            util.formatDate(current, 'yyyy-MM-dd') < this[search][field],
        }
      },
    }
  },
  watch: {
    dialogEditVisible(val) {
      if (!val) {
        this.editFormData = {
          id: null, // 任务id
          keyword: null, // 任务名称
          type: null,
          product: null,
          status: 1,
          remark: null,
          userMobile: null,
          weeks: [0, 1, 2, 3, 4, 5, 6],
          times: [{ startTime: '08:00', endTime: '22:00' }],
        }
      }
    },
  },
  async created() {
    this.fetchProgramList()
    this.getSourceTypeList()
  },
  computed: {
    editDiaTitle() {
      if (this.editFormData.id) {
        return '编辑项目'
      }
      return '新增项目'
    },
  },
  methods: {
    addTimeRange() {
      if (this.editFormData.times.length > 3) return
      this.editFormData.times.push({
        startTime: '',
        endTime: '',
      })
    },
    deleteTimeRange(index) {
      this.editFormData.times.splice(index, 1)
    },
    getShowWeeksInTable(weeks) {
      if (!weeks) return ''
      return weeks
        .replaceAll('1', '一')
        .replaceAll('2', '二')
        .replaceAll('3', '三')
        .replaceAll('4', '四')
        .replaceAll('5', '五')
        .replaceAll('6', '六')
        .replaceAll('0', '日')
        .replaceAll(',', '，')
    },
    getSourceTypeList() {
      const url = '/sdmulti/qbzz/manage/api/customer/type/list'
      this.$request.jsonGet(url).then((res) => {
        if (res.code == '0') {
          this.sourceTypeList = res.data
        }
      })
    },
    beforeSelectBus() {
      if (this.userInfo.rankCode == 10 && !this.search.suserId) {
        this.$message.error('请先选择所属二级账号')
        this.$refs.busRef.blur()
      }
    },

    selectToggleDown(isShow) {
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
    // 查询任务列表
    fetchProgramList(type) {
      if (type === 1) {
        // 筛选搜索页码要重置为1
        this.pagination.currentPage = 1
      }
      this.isLoadingPlanList = true
      this.$request
        .jsonPost('/sdmulti/manage/project/list', {
          startTime: this.search.startTime
            ? this.search.startTime + ' 00:00:00'
            : null,
          endTime: this.search.endTime
            ? this.search.endTime + ' 23:59:59'
            : null,
          keyword: this.search.keyword,
          type: this.search.type,
          status: this.search.taskStatus === '' ? null : this.search.taskStatus,
          page: this.pagination.currentPage,
          pageSize: this.pagination.pageSize,
        })
        .then((res) => {
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
        .finally(() => {
          this.isLoadingPlanList = false
        })
    },
    /**
     * 点击表格行编辑按钮，唤起编辑弹窗
     * @param data 行数据
     */
    handleEdit(data) {
      if (data.lineIds && data.lineIds.length) {
        data.lineIds = data.lineIds.map((e) => parseInt(e))
      }
      this.editFormData = { ...data }
      // if (data.weeks) {
      //   let arr = data.weeks.split(',')
      //   this.editFormData.weeks = arr.map(Number)
      // }
      // if (data.times) {
      //   let arr = data.times.split(',')
      //   this.editFormData.times = arr.map((e) => {
      //     let ar = e.split('-')
      //     let startTime = ar[0].substring(0, ar[0].length - 3)
      //     let endTime = ar[1].substring(0, ar[1].length - 3)
      //     return {
      //       startTime,
      //       endTime,
      //     }
      //   })
      // }
      this.dialogEditVisible = true
    },
    // 提交编辑项目表单
    submitEditForm() {
      this.$refs.editForm.validate(async (isValid) => {
        if (!isValid) {
          this.$message.error('请填写必填字段')
          return
        }
        if (!this.editFormData.id) {
          const urlcHECK =
            '/sdmulti/manage/project/name/check?projectName=' +
            this.editFormData.projectName
          const resJu = await this.$request.jsonGet(urlcHECK)
          if (resJu.code != 0) {
            this.$message.error(resJu.message)
            return
          }
        }
        // let times = this.editFormData.times
        //   .map((e) => e.startTime + ':00-' + e.endTime + ':00')
        //   .join(',')
        const params = {
          id: this.editFormData.id,
          projectName: this.editFormData.projectName, // 项目名称
          type: this.editFormData.type,
          product: this.editFormData.product,
          status: this.editFormData.status,
          remark: this.editFormData.remark,
          userMobile: this.editFormData.userMobile,
          // weeks: this.editFormData.weeks.join(','),
          // times,
        }
        let url = '/sdmulti/manage/project'
        let res = null
        if (this.editFormData.id) {
          res = await this.$request.jsonPut(url, params)
          if (res.code === '0') {
            this.$message.success('编辑项目保存成功')
            this.fetchProgramList()
            this.dialogEditVisible = false
          } else {
            this.$message.error(res.message)
          }
        } else {
          res = await this.$request.jsonPost(url, params)
          if (res.code === '0') {
            this.$message.success('新增项目成功')
            this.fetchProgramList()
            this.dialogEditVisible = false
          } else {
            this.$message.error(res.message)
          }
        }
      })
    },
    // 验证文件可用性
    validateFile(file) {
      if (file.size > 1024 * 1024 * 5) {
        this.$message.error('文件不得超过5M')
        return false
      }
      return true
    },
    // 解析已上传文件
    transpileFile(file, robotId) {
      let param = new FormData()
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
      const loading = this.$loading({
        lock: true,
        text: '正在解析，请稍候',
        spinner: 'el-icon-loading',
        background: 'rgba(255, 255, 255, 0.3)',
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
  },
}
</script>
<style lang="scss">
/deep/ .select-multi {
  left: 0;
}
</style>
<style lang="scss" scoped>
@import '@/assets/css/common.scss';
// .ddd {
//   /deep/ .el-dialog__body {
//     overflow: hidden;
//   }
// }
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
</style>
