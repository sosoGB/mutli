<template>
  <div class="createTask page-list">
    <el-form :model="createFormData" ref="createForm" :rules="createFormRule" label-width="150px">
        <el-form-item prop="" label="呼叫策略名称：">
          <el-input v-model.trim="createFormData.planName" placeholder="请输入呼叫策略名称" clearable class="input-name"></el-input>
        </el-form-item>
        <el-form-item prop="" label="客户种类：">
          <div class="input-large form-item_upload">
            <el-select v-model="createFormData.robotId" @change="handleChangeRobotId" placeholder="请选择客户种类" filterable>
            <el-option v-for="item in robotList" :key="item.id" :label="item.showName" :value="item.id"></el-option>
          </el-select>
          </div>
        </el-form-item>
        <el-form-item prop="" label="机器人名称：">
          <div class="input-large form-item_upload">
                 <el-select v-model="createFormData.robotId" @change="handleChangeRobotId" placeholder="请选择机器人名称" filterable>
            <el-option v-for="item in robotList" :key="item.id" :label="item.showName" :value="item.id"></el-option>
          </el-select>
                  <el-button @click="handleDownloadTemplate(createFormData.robotId)" type="primary">下载机器人变量模板</el-button>
                </div>
        </el-form-item>
         <el-form-item  prop="importFile" label="共用型变量：">
                <div class="input-large form-item_upload">
                  <file-uploader class="form-uploader" :uploaded.sync="createFormData"></file-uploader>
                  <el-button @click="handleDownloadTemplate(createFormData.robotId)" type="primary">下载模板</el-button>
                </div>
              </el-form-item>
                  <el-form-item  prop="importFile" label="关系型变量：">
                <div class="input-large form-item_upload">
                  <file-uploader class="form-uploader" :uploaded.sync="createFormData"></file-uploader>
                  <el-button @click="handleDownloadTemplate(createFormData.robotId)" type="primary">下载模板</el-button>
                </div>
              </el-form-item>
              <el-form-item prop="" label="总并发数量：">
          <el-input v-model.trim="createFormData.planName" placeholder="" clearable class="input-name"></el-input>
        </el-form-item>
             <el-form-item prop="" label="外呼平台：">
          <div class="input-large form-item_upload">
                 <el-select v-model="createFormData.robotId" @change="handleChangeRobotId" placeholder="请选择外呼平台" filterable>
            <el-option v-for="item in robotList" :key="item.id" :label="item.showName" :value="item.id"></el-option>
          </el-select>
                </div>
         
        </el-form-item>
              <el-form-item prop="frequency" label="任务创建频次：">
        <el-radio-group v-model="createFormData.frequency">
          <el-radio :label="'仅一次'">仅一次</el-radio>
          <el-radio :label="'工作日'">工作日</el-radio>
          <el-radio :label="'每日'">每日</el-radio>
          <el-radio :label="'自定义'">自定义</el-radio>
        </el-radio-group>
        <div v-if="createFormData.frequency === '自定义'">
          <el-checkbox-group v-model="createFormData.recallResult">
            <el-checkbox v-for="item in weekList" :label="item.key" :key="item.key">{{ item.label }}</el-checkbox>
          </el-checkbox-group>
        </div>
      </el-form-item>
         <el-form-item prop="" label="创建日期范围：">
          <el-time-select v-model="createFormData.startTime" popper-class="startTimer" @focus="handleStartTimeFocus" :picker-options="{
                start: '08:00',
                step: '00:10',
                end: '20:50'
              }" placeholder="选择时间">
            </el-time-select>
        </el-form-item>
         <el-form-item prop="" label="任务创建时间：">
          <el-time-select v-model="createFormData.startTime" popper-class="startTimer" @focus="handleStartTimeFocus" :picker-options="{
                start: '08:00',
                step: '00:10',
                end: '20:50'
              }" placeholder="选择时间">
            </el-time-select>
        </el-form-item>
           <el-form-item prop="startWay" label="外呼启动方式：">
        <el-radio-group v-model="createFormData.startWay">
          <el-radio :label="'立即启动'">立即启动</el-radio>
          <el-radio :label="'手动启动'">手动启动</el-radio>
        </el-radio-group>
        <div v-if="createFormData.startWay === '立即启动'" class="timing">
          <!-- <span>任务启动时间：</span>
          <div>
            <el-date-picker v-model="createFormData.startDate" value-format="yyyy-MM-dd" type="date" :editable="false" :picker-options="datePicker" placeholder="选择日期">
            </el-date-picker>
            <el-time-select v-model="createFormData.startTime" popper-class="startTimer" @focus="handleStartTimeFocus" :picker-options="{
                start: '08:00',
                step: '00:10',
                end: '20:50'
              }" placeholder="选择时间">
            </el-time-select>
          </div> -->

          <span>允许呼叫时段时段：</span>
            <div class="allowTime">
            <el-time-select v-model="createFormData.startTime" popper-class="startTimer" @focus="handleStartTimeFocus" :picker-options="{
                start: '08:00',
                step: '00:10',
                end: '20:50'
              }" placeholder="选择时间">
            </el-time-select>
            <el-time-select v-model="createFormData.startTime" popper-class="startTimer" @focus="handleStartTimeFocus" :picker-options="{
                start: '08:00',
                step: '00:10',
                end: '20:50'
              }" placeholder="选择时间">
            </el-time-select>
            <el-button type="primary" size="mini" icon="el-icon-plus" @click.prevent="addDomain"></el-button>
          </div> 
          <div class="allowTime" v-for="domain in allowTime"
    :key="domain.key"
   >
  <!-- <el-form-item
    v-for="(domain, index) in allowTime"
    :key="domain.key"
    :prop="'allowTime.' + index + '.start'"
  >
    <el-input v-model="domain.start"></el-input><el-button @click.prevent="removeDomain(domain)">删除</el-button>
  </el-form-item> -->
  <!-- <el-form-item>
    <el-button @click="addDomain">新增域名</el-button>
  </el-form-item> -->

           <el-time-select v-model="domain.startTime" popper-class="startTimer" @focus="handleStartTimeFocus" :picker-options="{
                start: '08:00',
                step: '00:10',
                end: '20:50'
              }" placeholder="选择时间">
            </el-time-select>
            <el-time-select v-model="domain.endTime" popper-class="startTimer" @focus="handleStartTimeFocus" :picker-options="{
                start: '08:00',
                step: '00:10',
                end: '20:50'
              }" placeholder="选择时间">
            </el-time-select>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click.prevent="removeDomain(domain)"></el-button>
          </div>
                     

          <span>为避免打扰用户休息，系统强制默认外呼时间为08:00-12:00,14:00-21:00，请在该时间段内设置</span>
        </div>
      </el-form-item>
      <!-- <el-divider class="divider-basic"></el-divider> -->
      <!-- <div class="import">
        <span class="import-label el-form-item__label">机器人名称：</span>
        <el-form-item prop="robotId">
          <el-select v-model="createFormData.robotId" @change="handleChangeRobotId" placeholder="请选择机器人名称" filterable>
            <el-option v-for="item in robotList" :key="item.id" :label="item.showName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-radio-group class="import-content" v-model="createFormData.importMethod">
          <el-radio :label="'file'" class="import-radio">
            <span class="import-radio_label">文件导入</span>
            <div class="import-radio_content">
              <el-form-item label-width="130px" prop="importFile" label="选择文件导入：">
                <div class="input-large form-item_upload">
                  <file-uploader class="form-uploader" :uploaded.sync="createFormData.importFile"></file-uploader>
                  <el-button @click="handleDownloadTemplate(createFormData.robotId)" type="primary">下载模板</el-button>
                  <el-tooltip effect="dark" content="一次最多可导入10000条数据" placement="top">
                    <i class="el-icon-question"></i>
                  </el-tooltip>
                </div>
              </el-form-item>
            </div>
          </el-radio>
          <el-radio :label="'manual'" class="import-radio">
            <span class="import-radio_label">手动输入</span>
            <div class="import-radio_content">
              <el-form-item label-width="130px" prop="importNumber" label="输入号码：">
                <el-input @focus="createFormData.importMethod = 'manual'" v-model.trim="createFormData.importNumber" placeholder="多个号码用,隔开" class="input-large"></el-input>
              </el-form-item>
            </div>
          </el-radio>
          <el-radio v-show="createFormData.opportunityAvailable" :label="'opportunity'" class="import-radio">
            <span class="import-radio_label">企保商机名单</span>
            <div class="import-radio_content">
              <el-form-item label-width="130px" label="选择文件导入：" prop="importOpportunityFile">
                <div class="input-large form-item_upload">
                  <file-uploader class="form-uploader" :uploaded.sync="createFormData.importOpportunityFile"></file-uploader>
                  <el-button @click="
                      handleDownloadTemplate(createFormData.robotId, true)
                    " type="primary">下载模板</el-button>
                </div>
              </el-form-item>
              <el-form-item label-width="130px" prop="importOpportunityList">
                <el-badge :value="createFormData.importOpportunityList.length">
                  <el-button @click="
                      createFormData.importMethod = 'opportunity'
                      handleImportOpportunityList()
                    ">
                    选择已有名单
                  </el-button>
                </el-badge>
              </el-form-item>
            </div>
          </el-radio>
        </el-radio-group>
      </div> -->
      <!-- <el-divider></el-divider> -->
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
            <span class="clickable" @click="handleCheckAllCallResult(createFormData)">
              {{
                createFormData.recallResult.length === recallResultList.length
                  ? '全部取消'
                  : '全选'
              }}
            </span>
          </p>
          <el-checkbox-group v-model="createFormData.recallResult">
            <el-checkbox v-for="item in recallResultList" :label="item.key" :key="item.key">{{ item.label }}</el-checkbox>
          </el-checkbox-group>
          <el-form-item label-width="70px" prop="recallInterval" label="重呼间隔">
            <el-input-number v-model="createFormData.recallInterval" :min="1" :precision="0" size="small" placeholder="请输入重呼间隔"></el-input-number>
            <span class="form-suffix">分钟</span>
          </el-form-item>
          <el-form-item label-width="70px" prop="recallMaxNum" label="重呼次数">
            <el-input-number v-model="createFormData.recallMaxNum" :min="1" :precision="0" size="small" placeholder="请输入重呼次数"></el-input-number>
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
            <el-input v-model.trim="createFormData.planName" placeholder="" clearable class="input-name"></el-input>
            <span class="form-conversion-suffix">天</span>
             <el-time-select v-model="createFormData.startTime" popper-class="startTimer" @focus="handleStartTimeFocus" :picker-options="{
                start: '08:00',
                step: '00:10',
                end: '20:50'
              }" placeholder="选择时间">
            </el-time-select>
             <el-form-item prop="startWay">
               <span class="form-prefix">任务启动方式</span>
        <el-radio-group v-model="createFormData.startWay">
          <el-radio :label="'立即启动'">立即启动</el-radio>
          <el-radio :label="'手动启动'">手动启动</el-radio>
        </el-radio-group>
      </el-form-item>
       <el-form-item prop="startWay">
               <span class="form-prefix">接通失败重呼</span>
        <el-radio-group v-model="createFormData.jietongFlag">
         <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <div v-show="createFormData.jietongFlag"><span class="form-prefix">选择通话结果</span>
            <span class="clickable" @click="handleCheckAllCallConversionResult(createFormData)">
              {{
                createFormData.recallResult.length === conversionResultList.length
                  ? '全部取消'
                  : '全选'
              }}
            </span>
             <el-checkbox-group v-model="createFormData.recallResult">
            <el-checkbox v-for="item in conversionResultList" :label="item.key" :key="item.key">{{ item.label }}</el-checkbox>
          </el-checkbox-group>
          <el-form-item label-width="70px" prop="recallInterval" label="重呼间隔">
            <el-input-number v-model="createFormData.recallInterval" :min="1" :precision="0" size="small" placeholder="请输入重呼间隔"></el-input-number>
            <span class="form-suffix">分钟</span>
          </el-form-item>
          <el-form-item label-width="70px" prop="recallMaxNum" label="重呼次数">
            <el-input-number v-model="createFormData.recallMaxNum" :min="1" :precision="0" size="small" placeholder="请输入重呼次数"></el-input-number>
            <span class="form-suffix">次</span>
          </el-form-item>
            </div>
            
          </div>
         
        </div>
      </el-form-item>
      <!-- <el-form-item prop="startWay" label="启动设置：">
        <el-radio-group v-model="createFormData.startWay">
          <el-radio :label="'自动启动'">自动启动</el-radio>
          <el-radio :label="'手动启动'">手动启动</el-radio>
          <el-radio :label="'定时启动'">定时启动</el-radio>
        </el-radio-group>
        <div v-if="createFormData.startWay === '定时启动'" class="timing">
          <span>启动任务日期及时间：</span>
          <div>
            <el-date-picker v-model="createFormData.startDate" value-format="yyyy-MM-dd" type="date" :editable="false" :picker-options="datePicker" placeholder="选择日期">
            </el-date-picker>
            <el-time-select v-model="createFormData.startTime" popper-class="startTimer" @focus="handleStartTimeFocus" :picker-options="{
                start: '08:00',
                step: '00:10',
                end: '20:50'
              }" placeholder="选择时间">
            </el-time-select>
          </div>
          <span>为避免打扰用户休息，系统强制默认外呼时间为08:00-12:00,14:00-21:00，请在该时间段内设置</span>
        </div>
      </el-form-item> -->
    </el-form>
    <el-row class="bottom">
      <el-button type="primary" @click="submitCreateForm">确定</el-button>
      <el-button @click="backtrack">取消</el-button>
    </el-row>

    <el-dialog title="名单选择" class="dialog-opportunity" :visible.sync="dialogOpportunityVisible" v-loading="isLoadingOpportunityList">
      <div class="toolbar">
        <div class="tool-search">
          <el-select size="mini" v-model="opportunitySearch.tag" placeholder="请选择意向分级" clearable class="search-component search-input" @change="fetchOpportunityList">
            <el-option v-for="item in opportunityTagList" :key="item" :label="item" :value="item"></el-option>
          </el-select>
          <el-select size="mini" v-model="opportunitySearch.status" placeholder="请选择机器人执行状态" clearable class="search-component search-input" @change="fetchOpportunityList">
            <el-option v-for="item in opportunityStatusList" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <el-date-picker size="mini" v-model="opportunitySearch.beginTime" class="search-component search-input" type="date" placeholder="开始日期" value-format="yyyy-MM-dd" :picker-options="beginDateValidator('opportunitySearch', 'endTime')" @change="fetchOpportunityList" clearable></el-date-picker>
          <span class="search-delimiter">-</span>
          <el-date-picker size="mini" v-model="opportunitySearch.endTime" class="search-component search-input" type="date" placeholder="结束日期" value-format="yyyy-MM-dd" :picker-options="endDateValidator('opportunitySearch', 'beginTime')" @change="fetchOpportunityList" clearable></el-date-picker>
        </div>
        <div>
          <el-input type="number" size="mini" ref="opportunityNum" @focus="() => this.$refs.opportunityNum.select()" :controls="false" :min="0" :max="opportunityPagination.total" placeholder="请输入名单数量" class="search-component search-input" v-model.trim="opportunitySearch.number" clearable></el-input>
          <el-button type="primary" size="mini" class="search-component" @click="handleConfirmChooseOpportunity">确认选择</el-button>
        </div>
      </div>
      <div class="table">
        <el-table :data="opportunityList" height="100%" border tooltip-effect="dark">
          <el-table-column label="序号" align="center" type="index" width="60">
          </el-table-column>
          <el-table-column align="center" prop="mobile" label="虚拟号码">
          </el-table-column>
          <el-table-column align="center" label="更新时间">
            <template slot-scope="scope">
              <span>{{
                scope.row.updated_at | formatDate('yyyy-MM-dd hh:mm:ss')
              }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="机器人执行状态">
            <template slot-scope="scope">
              <span class="statusBasic" :class="
                  scope.row.status === '已呼叫' ? 'status-start' : 'status-end'
                ">●&nbsp;{{ scope.row.status }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="intentionTag" label="意向分级">
          </el-table-column>
        </el-table>
      </div>

      <div class="pagination">
        <el-pagination background @current-change="fetchOpportunityList" @size-change="fetchOpportunityList" :page-size.sync="opportunityPagination.pageSize" :page-sizes="[5, 8, 10, 15, 20]" :current-page.sync="opportunityPagination.currentPage" layout="prev, pager, next, sizes, jumper" :total="opportunityPagination.total"></el-pagination>
      </div>
    </el-dialog>
    <progress-pop :close-on-click-modal="false" :dialog-visible.sync="dialogVisible" :is-finished="progerssFinish"></progress-pop>
  </div>
</template>

<script>
import FileUploader from '@/components/FileUploader'
// import FlowSelect from '@/components/FlowSelect'
import ProgressPop from '@/components/ProgressPop'
import util from '@/service/filter'
export default {
  components: {
    FileUploader,
    // FlowSelect,
    ProgressPop
  },
  data () {
    return {
      errorNum: 0, //错误号码数量
      jsons: [], //文件导入之后的数据
      robotList: [], // 可选机器人列表
      activeNumberList: [], // 可选线路
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
          weekList: [
        { label: '每周一', key: '1' },
        { label: '每周二', key: '2' },
        { label: '每周三', key: '3' },
        { label: '每周四', key: '4' },
        { label: '每周五', key: '5' },
        { label: '每周六', key: '6' },
        { label: '每周日', key: '7' },
      ], 
      createFormData: {
        planName: null, // 任务名称
        robotId: null, // 机器人名称
        activeNumber: null, // 线路
        importMethod: 'file', // 导入方式
        importFile: [], // 文件导入
        customerList: [], // 用户列表
        importNumber: null, // 输入号码
        opportunityAvailable: true, // 是否可导入商机名单
        importOpportunityList: [], // 所选商机名单
        importOpportunityFile: [], // 文件方式导入商机名单
        variableMap: null, // 商机名单变量表
        callSingle: 1, // 呼叫去重
        recallFlag: 0, // 自动失败重呼
        recallResult: [], // 通话结果
        weekResult: [], // 星期结果
        recallInterval: 1, // 重呼间隔
        recallMaxNum: 1, // 重呼次数
        startWay: '立即启动', // 启动设置
        frequency: '仅一次', // 创建频率
        startDate: null, // 启动日期
        startTime: null, // 启动时间

        conversionFlag: 0, // 转化失败重呼
        jietongFlag: 0, // 接通失败重呼
      }, // 新建任务表单项
      createFormRule: {
        planName: [
          { required: true, message: '请输入任务名称', trigger: 'blur' },
          { max: 20, message: '不得超过20个字符', trigger: 'blur' }
        ],
        robotId: [
          { required: true, message: '请选择机器人名称', trigger: 'blur' }
        ],
        activeNumber: [
          { required: true, message: '请选择线路', trigger: 'blur' }
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
        importFile: [
          {
            validator: (rule, value, callback) => {
              if (
                this.createFormData.importMethod === 'file' &&
                !value.length
              ) {
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
              if (this.createFormData.importMethod === 'manual') {
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
            }
          }
        ],
        importOpportunityList: [
          {
            validator: (rule, value, callback) => {
              if (
                this.createFormData.importMethod === 'opportunity' &&
                !value.length
              ) {
                callback(new Error('请选择商机名单'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
        importOpportunityFile: [
          {
            validator: (rule, value, callback) => {
              if (
                this.createFormData.importMethod === 'opportunity' &&
                !value.length
              ) {
                callback(new Error('请选择导入文件'))
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
      dialogOpportunityVisible: false, // 导入商机名单弹窗可见性
      opportunityTagList: ['A类', 'B类', 'C类', 'D类', 'E类', 'F类', '未分类'],
      opportunityStatusList: [
        {
          label: '未呼叫',
          value: 0
        },
        {
          label: '已呼叫',
          value: 1
        }
      ],
      opportunitySearch: {
        tag: null,
        status: null,
        number: null,
        beginTime: null,
        endTime: null
      },
      opportunityPagination: {
        currentPage: 1,
        total: 1,
        pageSize: 10
      },
      opportunityList: [], // 商机名单
      isLoadingOpportunityList: false, // 商机名单表格loading效果
      isCheckDown: false,
      allowTime: 
      [
        {startTime: '',endTime: ''}
      ],
  
      dynamicValidateForm: {
          domains: [{
            value: ''
          }]
        }
    }
  },
  watch: {
    // 上传文件后，提交解析
    'createFormData.importFile' (files) {
      if (!files || !files.length) return
      if (!this.createFormData.robotId) {
        this.$message.warning('请先选择机器人名称')
        this.createFormData.importFile = []
        return
      }
      if (!this.validateFile(files[0])) {
        this.createFormData.importFile = []
        return
      }
      this.transpileFile(files[0], this.createFormData.robotId).then(
        (res) => {
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
          this.createFormData.customerList = []
          this.createFormData.importFile = []
        }
      )
    },
    'createFormData.importOpportunityFile' (files) {
      if (!files || !files.length) return
      if (!this.createFormData.robotId) {
        this.$message.warning('请先选择机器人名称')
        this.createFormData.importOpportunityFile = []
        return
      }
      if (!this.validateFile(files[0])) {
        this.createFormData.importOpportunityFile = []
        return
      }
      this.transpileFile(files[0], this.createFormData.robotId, true).then(
        (res) => {
          this.createFormData.variableMap = res
        },
        () => {
          this.createFormData.variableMap = null
          this.createFormData.importOpportunityFile = []
        }
      )
    }
  },
  created () {
    this.fetchRobotList()
    this.fetchActiveNumberList()
  },
  methods: {
      removeDomain(item) {
        var index = this.allowTime.indexOf(item)
        if (index !== -1) {
          this.allowTime.splice(index, 1)
        }
      },
      addDomain() {
        this.allowTime.push({
          startTime: '',
          endTime:'',
        });
      },
  
    onCheckDown (event) {
      this.isCheckDown = true
      // else {
      //   this.createFormData.activeNumber.splice(index, 1)
      // }
      event.preventDefault() // 阻止默认行为
      event.stopPropagation() // 阻止事件冒泡
    },
    onMoveOn (event, id) {
      const index = this.createFormData.activeNumber.indexOf(id)
      if (index == -1) {
        this.createFormData.activeNumber.push(id)
      }
      event.preventDefault() // 阻止默认行为
      event.stopPropagation() // 阻止事件冒泡
    },
    // 查询机器人列表
    fetchRobotList () {
      this.$request
        .get('/robotInfo/queryRobotList', {
          params: {
            userId: this.$store.state.userInfo.userId
          }
        })
        .then((res) => {
          this.robotList = res.data
        })
    },
    // 查询线路列表
    fetchActiveNumberList () {
      this.$request
        .get('/line/queryLineAll', {
          params: {
            userId: this.$store.state.userInfo.userId,
            isUsable: true,
            childType: false
          }
        })
        .then((res) => {
          this.activeNumberList = res.data
        })
    },
    // 切换机器人名称
    handleChangeRobotId (id) {
      let item = this.robotList.find((item) => {
        return item.id === id
      })
      this.createFormData.opportunityAvailable = item.businessUsable
      !item.businessUsable && (this.createFormData.importMethod = 'file')
    },
    // 切换多选框全选按钮
    toggleSelectAll (target, list, field) {
      let newTarget = [],
        length = target.length
      if (!target || length !== list.length) {
        newTarget = list.map((item) => item[field] + '')
      }
      target.splice(0, length, ...newTarget)
    },
    // 全选/取消全选通话结果
    handleCheckAllCallResult (formData) {
      if (formData.recallResult.length === this.recallResultList.length) {
        formData.recallResult = []
      } else {
        formData.recallResult = this.recallResultList.map((item) => item.key)
      }
    },
    // 全选/取消全选通话结果
    handleCheckAllCallConversionResult (formData) {
      if (formData.recallResult.length === this.conversionResultList.length) {
        formData.recallResult = []
      } else {
        formData.recallResult = this.conversionResultList.map((item) => item.key)
      }
    },
    // 验证文件可用性
    validateFile (file) {
      if (file.size > 1024 * 1024 * 5) {
        this.$message.error('文件不得超过5M')
        return false
      }
      return true
    },
    // 解析已上传文件 -- isOpportunity：是否商机名单
    transpileFile (file, robotId, isOpportunity) {
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
      if (isOpportunity) {
        param.append('variableType', 'true')
        param.append('robotId', robotId)
      } else {
        param.append('userId', this.$store.state.userInfo.userId)
        param.append('code', robotId)
      }
      const url = isOpportunity
        ? '/businessChance/uploadFile'
        : '/customer/file'
      return this.$request
        .post(url, param, config)
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
    // 依据不同导入号码方式解析客户信息
    formatCustomerInfo (data) {
      if (data.importMethod === 'file') {
        return data.customerList
      } else if (data.importMethod === 'opportunity') {
        return data.importOpportunityList
      } else if (data.importMethod === 'manual') {
        const customerList = []
        const numberList = data.importNumber.split(/[,，]/) // 多个号码以逗号分隔
        numberList.forEach((number) => {
          customerList.push({
            号码: number
          })
        })
        return customerList
      }
      return []
    },
    // 点击下载模板 --isOpportunity：是否商机名单
    async handleDownloadTemplate (robotId, isOpportunity) {
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
        url: `variable/down/${robotId}${isOpportunity ? '/true' : '/false'}`
      })
      const endStr = isOpportunity
        ? '-商机名单变量导入模板.xls'
        : '-文件导入模板.xls'
      a.download = robotItem.showName + endStr
      a.href = URL.createObjectURL(res)
      a.click()
    },
    // 点击选择导入商机名单
    handleImportOpportunityList () {
      this.dialogOpportunityVisible = true
      this.fetchOpportunityList()
    },
    // 查询商机列表
    fetchOpportunityList () {
      this.isLoadingOpportunityList = true
      this.$request
        .get('/businessChance/getBusinessChanceList', {
          params: {
            userId: this.$store.state.userInfo.userId,
            tag: this.opportunitySearch.tag,
            status: this.opportunitySearch.status,
            beginTime: this.opportunitySearch.beginTime,
            endTime: this.opportunitySearch.endTime,
            num: this.opportunityPagination.currentPage,
            size: this.opportunityPagination.pageSize
          }
        })
        .then((res) => {
          this.opportunityList = res.data.list
          this.opportunityPagination.total = res.data.count
          this.opportunitySearch.number = null
        })
        .finally(() => {
          this.isLoadingOpportunityList = false
        })
    },
    // 确认选择商机名单
    handleConfirmChooseOpportunity () {
      if (!this.opportunitySearch.number) {
        this.$message.error('请输入名单数量')
        return
      }
      this.$request
        .get('/businessChance/getUseBusinessChanceList', {
          params: {
            userId: this.$store.state.userInfo.userId,
            tag: this.opportunitySearch.tag,
            status: this.opportunitySearch.status,
            beginTime: this.opportunitySearch.beginTime,
            endTime: this.opportunitySearch.endTime,
            number: this.opportunitySearch.number
          }
        })
        .then((res) => {
          if (res.code !== '0') {
            this.$message.error(res.message)
            return
          }
          this.createFormData.importOpportunityList = res.data.map((item) => {
            return {
              号码: item.mobile,
              真实号码: item.realMobile
            }
          })
          this.dialogOpportunityVisible = false
        })
    },
    // 提交新建任务表单
    async submitCreateForm () {
      this.$refs.createForm.validate(async (isValid) => {
        if (!isValid) {
          this.$message.error('请填写必填字段')
          return
        }

        if (
          this.createFormData.startWay === '立即启动' &&
          (!this.createFormData.startDate || !this.createFormData.startTime)
        ) {
          this.$message.error('请填写启动任务日期及时间')
          return
        }

        const startTime =
          this.createFormData.startDate +
          ' ' +
          this.createFormData.startTime +
          ':00'
        const timeSeconds = new Date(startTime).getTime()
        if (
          this.createFormData.startWay === '定时启动' &&
          timeSeconds < Date.now()
        ) {
          this.$message.error('启动时间不能早于当前时间')
          return
        }

        const param = {
          userId: this.$store.state.userInfo.userId,
          planName: this.createFormData.planName,
          robotId: this.createFormData.robotId,
          activeNums: this.createFormData.activeNumber.join(','),
          callSingle: this.createFormData.callSingle,
          recallFlag: this.createFormData.recallFlag,
          conversionFlag: this.createFormData.conversionFlag,
          startWay: this.createFormData.startWay,
          startTime:
            this.createFormData.startWay === '立即启动' ? startTime : null,
          customerList: this.formatCustomerInfo(this.createFormData),
          variableMap: this.createFormData.variableMap,
          planType: this.createFormData.importMethod === 'opportunity' ? 1 : 0,
          jsons:
            this.createFormData.importMethod === 'opportunity'
              ? null
              : this.jsons
        }

        if (param.recallFlag) {
          param.recallResults = this.createFormData.recallResult.join(',')
          param.recallSpace = this.createFormData.recallInterval
          param.recallMaxNum = this.createFormData.recallMaxNum
        }
         if (param.conversionFlag) {
          param.conversionrecallResults = this.createFormData.conversionrecallResult.join(',')
          param.conversionrecallSpace = this.createFormData.conversionrecallInterval
          param.conversionrecallMaxNum = this.createFormData.conversionrecallMaxNum
        }
        let loading,
          ltext = '正在解析，请稍候'
        if (this.$store.state.userInfo.encMobile) {
          this.dialogVisible = true
          ltext = ''
        }
        loading = this.$loading({
          lock: true,
          text: ltext,
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        const url =
          this.createFormData.importMethod === 'opportunity'
            ? '/plan/saveBusiness'
            : '/plan/save'
        let res = await this.$request.post(url, param, { timeout: 60000 })
        loading && loading.close()
        this.progerssFinish = true
        const now = Date.now()
        if (res.code === '0') {
          if (
            now - window._mtimestamp < 5000 &&
            this.$store.state.userInfo.encMobile
          ) {
            setTimeout(async () => {
              this.dialogVisible = false
              if (this.createFormData.importMethod === 'file') {
                const infos = Object.keys(res.data.info)
                const h = this.$createElement
                this.$message({
                  message: h('div', null, [
                    h('p', null, [
                      h('span', null, `${infos[0]}：`),
                      h(
                        'span',
                        { style: 'color: #F56C6C' },
                        res.data.info[infos[0]]
                      )
                    ]),
                    h('p', null, [
                      h('span', null, '错误数量：'),
                      h('span', { style: 'color: #F56C6C' }, this.errorNum)
                    ]),
                    h('p', null, [
                      h('span', null, `${infos[1]}：`),
                      h(
                        'span',
                        { style: 'color: #F56C6C' },
                        res.data.info[infos[1]]
                      )
                    ])
                  ]),
                  type: 'success',
                  duration: 8000
                })
              } else {
                this.$message.success('新增任务成功')
              }
              if (param.startWay === '自动启动') {
                await this.handleRun(res.data.data.id)
              }
              this.backtrack()
            }, 5000 + window._mtimestamp - now)
          } else {
            this.dialogVisible = false
            if (this.createFormData.importMethod === 'file') {
              const infos = Object.keys(res.data.info)
              const h = this.$createElement
              this.$message({
                message: h('div', null, [
                  h('p', null, [
                    h('span', null, `${infos[0]}：`),
                    h(
                      'span',
                      { style: 'color: #F56C6C' },
                      res.data.info[infos[0]]
                    )
                  ]),
                  h('p', null, [
                    h('span', null, '错误数量：'),
                    h('span', { style: 'color: #F56C6C' }, this.errorNum)
                  ]),
                  h('p', null, [
                    h('span', null, `${infos[1]}：`),
                    h(
                      'span',
                      { style: 'color: #F56C6C' },
                      res.data.info[infos[1]]
                    )
                  ])
                ]),
                type: 'success',
                duration: 8000
              })
            } else {
              this.$message.success('新增任务成功')
            }
            if (param.startWay === '自动启动') {
              await this.handleRun(res.data.data.id)
            }
            this.backtrack()
          }
        } else {
          if (
            now - window._mtimestamp < 2000 &&
            this.$store.state.userInfo.encMobile
          ) {
            setTimeout(() => {
              this.dialogVisible = false
              this.$message.error(res.message)
            }, 1000)
          } else {
            this.dialogVisible = false
            this.$message.error(res.message)
          }
        }
      })
    },
    // 启动任务
    async handleRun (planId) {
      const loading = this.$loading({
        lock: true,
        text: '正在启动任务，请稍候',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      let res = await this.$request.get('/plan/startup', {
        params: {
          planId
        },
        timeout: 1200000
      })
      loading.close()
      if (res.code === '0') {
        this.$message.success('任务启动成功')
      } else {
        this.$message.error(res.message)
      }
    },
    // 返回任务列表页
    backtrack () {
      this.$router.replace('callStrategy')
    },
    // 任务启动时间focus事件
    handleStartTimeFocus () {
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
@import "@/assets/css/common.scss";
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
  .allowTime{
    margin-bottom: 12px;
  }
  .conversion_task{
    color:#606266;
    .input-name{
      width: 100px;
    }
    .form-conversion-suffix{
      margin:10px
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
    .el-select{
      margin-right: 20px;
     /deep/ .el-input__inner{
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
