<template>
  <div class="customerList page-list">
    <div class="toolbar">
      <div class="tool-search">
      </div>
      <div class="tool-button">
        <el-button @click="$router.push('createStrategy')" icon="el-icon-plus">新建策略</el-button>
      </div>
    </div>
    <div v-show="showMoreSearch" class="toolbar-advanced">
      <div class="advanced-item">
        <span class="advanced-label">客户种类：</span>
        <el-select v-model="search.customerType" placeholder="请选择客户类型" clearable class="advanced-input">
          <el-option label="普通客户" value="0"></el-option>
          <el-option label="商机客户" value="1"></el-option>
        </el-select>
      </div>
      <div class="advanced-item">
        <span class="advanced-label">是否已创建外呼任务：</span>
        <el-select v-model="search.customerType" placeholder="请选择" clearable class="advanced-input">
          <el-option label="是" value="0"></el-option>
          <el-option label="否" value="1"></el-option>
        </el-select>
      </div>
      <div class="advanced-item">
        <span class="advanced-label">当批是否为新客户：</span>
        <el-select multiple placeholder="请选择机器人名称" v-model="search.robotIds" class="advanced-input">
          <el-option label="是" value="0"></el-option>
          <el-option label="否" value="1"></el-option>
        </el-select>
      </div>
      <div class="advanced-item">
        <span class="advanced-label">性别：</span>
        <el-select v-model="search.sex" placeholder="请选择性别" clearable class="advanced-input">
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </div>
      <div class="advanced-item">
        <span class="advanced-label">年龄：</span>
        <el-input v-number placeholder="最小值(含)" v-model="search.minAge" class="advanced-input input_small" @keyup.enter.native="
            () => {
              pagination.currentPage = 1
              queryList()
            }
          " @change="(val) => changeBirthday(val, 'birthEndTime')" clearable></el-input>
        <span class="delimiter">-</span>
        <el-input v-number placeholder="最大值(含)" v-model="search.maxAge" class="advanced-input input_small" @keyup.enter.native="
            () => {
              pagination.currentPage = 1
              queryList()
            }
          " @change="(val) => changeBirthday(val, 'birthBeginTime')" clearable></el-input>
      </div>
      <div class="advanced-item">
        <span class="advanced-label">是否已成功转化：</span>
        <el-select v-model="search.customerType" placeholder="请选择" clearable class="advanced-input">
          <el-option label="是" value="0"></el-option>
          <el-option label="否" value="1"></el-option>
        </el-select>
      </div>
    </div>
    <div class="table">
      <el-table :data="customerList" ref="table" stripe height="100%" border tooltip-effect="dark" v-loading="isLoading" @select="handleSingleSelect" @select-all="handleAllSelect">
        <el-table-column type="selection" fixed="left" align="center" width="55"></el-table-column>
        <el-table-column label="序号" align="center" type="index" :resizable="false" width="70">
        </el-table-column>
        <el-table-column :resizable="false" prop="followUp" label="呼叫策略名称" width="120" align="center"></el-table-column>
        <el-table-column :resizable="false" prop="type" label="状态" width="120" align="center">
          <template slot-scope="scope">
            <span v-show="scope.row.type === '0'">已开启</span>
            <span v-show="scope.row.type === '1'">已关闭</span>
          </template>
        </el-table-column>
        <el-table-column :resizable="false" prop="followUp" label="客户种类" width="120" align="center"></el-table-column>
        <el-table-column :resizable="false" prop="followUp" label="客户范围" width="120" align="center"></el-table-column>
        <el-table-column :resizable="false" prop="followUp" label="机器人名称" width="120" align="center"></el-table-column>
        <el-table-column :resizable="false" prop="followUp" label="并发数量" width="120" align="center"></el-table-column>
        <el-table-column :resizable="false" prop="followUp" label="外呼平台" width="120" align="center"></el-table-column>
        <el-table-column :resizable="false" prop="followUp" label="任务启动频次" width="120" align="center"></el-table-column>
        <el-table-column :resizable="false" label="启动日期范围" width="110" align="center">
          <template slot-scope="scope">
            <span>{{
              scope.row.lastFollowBeginTime | formatDate('yyyy-MM-dd hh:mm:ss')
            }}</span>
          </template>
        </el-table-column>
        <el-table-column :resizable="false" label="启动日期时间" width="110" align="center">
          <template slot-scope="scope">
            <span>{{
              scope.row.lastFollowBeginTime | formatDate('hh:mm:ss')
            }}</span>
          </template>
        </el-table-column>
        >
        <el-table-column :resizable="false" label="操作" min-width="240" fixed="right" align="center">
          <template slot-scope="scope">
            <el-button @click="toDetail(scope.row)">关闭</el-button>
            <el-button @click="toFollow(scope.row)">编辑</el-button>
            <el-button @click="toFollow(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-checkbox v-model="isSelectAll" @change="toggleSelectAll">结果页全选</el-checkbox>
      <el-pagination background @current-change="queryList" @size-change="queryList" :page-size.sync="pagination.pageSize" :page-sizes="[10, 20, 50]" :current-page.sync="pagination.currentPage" layout="prev, pager, next, sizes, jumper" :total="pagination.total"></el-pagination>
    </div>
    <el-dialog title="提示" :visible.sync="exportVisible" width="30%">
      <p class="exportTip">客户信息包含内容较多，导出时间会有影响，请见谅！</p>
      <span style="font-size: 16px">导出全部信息：</span>
      <el-switch v-model="allSwitch" active-color="#13ce66" inactive-color="#909399">
      </el-switch>
      <span slot="footer" class="dialog-footer">
        <el-button @click="exportVisible = false">取 消</el-button>
        <el-button type="primary" @click="exportList">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import filter from '@/service/filter.js'
import util from '@/service/util'
import keepAlive from '@/utils/mixins/keepAlive.js' //用于从详情页返回列表页仍然返回之前页面
// import { optionTable } from './customerOptionList'
export default {
  mixins: [keepAlive],
  data () {
    const now = filter.formatDate(Date.now(), 'yyyy-MM-dd')
    const oneMonthAgo = filter.formatDate(
      Date.now() - 31 * 24 * 3600 * 1000,
      'yyyy-MM-dd'
    )
    return {
      authDelete: false,
      authExport: false,
      userInfo: this.$store.state.userInfo,
      detailPages: ['customerInfo', 'followRecords'], //当前页面能跳转的子页面的name数组
      // optionTable: [], //客户管理设置表格
      tableShow: [], //控制表格列显示
      searchShow: [], //控制筛选显示
      exportVisible: false, //导出确认框是否显示
      allSwitch: false, //是否导出全部客户信息
      isSelectAll: false, //是否全选列表结果
      ifCheckAll: false, //是否选中所有
      showMoreSearch: false, //是否显示高级搜索
      lastUpdates: '', // 更新日期范围选择
      search: {
        //查询筛选字段
        category: [],
        robotIds: [],
        lastUpdateBeginTime: oneMonthAgo,
        lastUpdateEndTime: now,
        followUps: [],
        customerStage: null,
        name: null,
        mobile: null,
        sex: null,
        max: null, //最小外呼次数
        min: null, //最大外呼次数
        remark: null,
        customerType: null,
        minCallTimes: null, //最小通话次数
        maxCallTimes: null, //最大通话次数
        minTimeCost: null, //最小通话时长
        maxTimeCost: null, //最大通话时长
        minAge: null,
        maxAge: null,
        mobileHome: null, //号码归属地
        lastFollowBeginTime: null, //最新跟进开始时间
        lastFollowEndTime: null, //最新跟进结束时间
        birthBeginTime: null, //出生日期开始时间
        birthEndTime: null //出生日期结束时间
      },
      pagination: {
        pageSize: 10,
        currentPage: 1,
        total: 0
      },
      robotList: [], // 可选机器人列表
      searchCategoryList: ['A类', 'B类', 'C类', 'D类', 'E类', 'F类', '未分类'], // 可选通话分类
      customerList: [], //表格填充数据
      followUpArr: ['AI初选', '人工跟进', '未呼叫', '被遗忘'], //跟进情况选项
      isLoading: false,
      checkedTableRow: [], //表格已选中或取消行
      beginDateValidator: {
        disabledDate: (current) => Date.now() < current
      },
      endDateValidator: {
        disabledDate: (current) => {
          return (
            (this.search.lastFollowBeginTime &&
              filter.formatDate(current, 'yyyy-MM-dd') <
              this.search.lastFollowBeginTime) ||
            Date.now() < current
          )
        }
      },
      beginBirthValidator: {
        disabledDate: (current) =>
          (this.search.birthEndTime &&
            filter.formatDate(current, 'yyyy-MM-dd') >
            this.search.birthEndTime) ||
          Date.now() < current
      },
      endBirthValidator: {
        disabledDate: (current) =>
          (this.search.birthBeginTime &&
            filter.formatDate(current, 'yyyy-MM-dd') <
            this.search.birthBeginTime) ||
          Date.now() < current
      },
      beginUpdateValidator: {
        disabledDate: (current) => Date.now() < current
      },
      endUpdateValidator: {
        disabledDate: (current) =>
          (this.search.lastUpdateBeginTime &&
            filter.formatDate(current, 'yyyy-MM-dd') <
            this.search.lastUpdateBeginTime) ||
          Date.now() < current
      }
    }
  },
  created () {
    this.queryList()
    this.fetchRobotList()
    this.getCustomerOption()
    this.checkAuth()
  },
  activated () {
    //重新进入缓存页面的钩子
    this.queryList()
  },
  methods: {
    checkAuth () {
      if (this.userInfo.userAuthList.some((e) => e.autCode === 'auth06014')) {
        this.authExport = true
      }
      if (this.userInfo.userAuthList.some((e) => e.autCode === 'auth06015')) {
        this.authDelete = true
      }
    },
    getShowMobile (s) {
      return this.$store.state.userInfo.encMobile
        ? filter.encMobile(atob(s))
        : s
    },
    // 更新开始时间选择变化时，结束时间需要重新选择
    checkEndDate (startVal) {
      const startMilltimes = new Date(startVal).getTime()
      const targetEndMillTimes = Math.min(
        startMilltimes + 31 * 24 * 3600 * 1000,
        Date.now()
      )
      this.search.lastUpdateEndTime = filter.formatDate(
        new Date(targetEndMillTimes),
        'yyyy-MM-dd'
      )
    },
    checkStartDate (endVal) {
      const endMilltimes = new Date(endVal).getTime()
      const targetStartMillTimes = Math.max(
        endMilltimes - 31 * 24 * 3600 * 1000,
        new Date(this.search.lastUpdateBeginTime).getTime()
      )
      this.search.lastUpdateBeginTime = filter.formatDate(
        new Date(targetStartMillTimes),
        'yyyy-MM-dd'
      )
    },
    // 跟进开始时间变化，结束时间需要重新选择
    checkFollowEndDate (startVal) {
      const startMilltimes = new Date(startVal).getTime()
      const targetEndMillTimes = Math.min(
        startMilltimes + 31 * 24 * 3600 * 1000,
        Date.now()
      )
      this.search.lastFollowEndTime = filter.formatDate(
        new Date(targetEndMillTimes),
        'yyyy-MM-dd'
      )
    },
    checkFollowStartDate (endVal) {
      const endMilltimes = new Date(endVal).getTime()
      const targetStartMillTimes = Math.max(
        endMilltimes - 31 * 24 * 3600 * 1000,
        new Date(this.search.lastFollowBeginTime).getTime()
      )
      this.search.lastFollowBeginTime = filter.formatDate(
        new Date(targetStartMillTimes),
        'yyyy-MM-dd'
      )
    },
    // 出生日期改变，年龄跟着改变
    changeAge (val, age) {
      this.search[age] = 2020 - val.substring(0, 4)
    },
    // 年龄筛选改变，出生日期筛选跟着改变
    changeBirthday (val, time) {
      this.search[time] = new Date().getFullYear() - val + '-01-01'
    },
    // 获取客户管理设置
    async getCustomerOption () {
      const url =
        '/userConfig/getConfig?userId=' + this.$store.state.userInfo.userId
      const res = await this.$request.get(url)
      if (res.code === '0') {
        this._saveOptionTable(res.data)
      } else {
        this.$message.error(res.message)
      }
    },
    // 打开筛选，默认打开列表展示
    handleSearchShowChange (row, val) {
      if (val) {
        row.tableShow = true
      }
    },
    // 关闭列表展示，默认关闭筛选
    handleTableShowChange (row, val) {
      if (!val) {
        row.searchShow = false
      }
    },
    // 客户管理设置对话框关闭前的回调
    beforeClose (done) {
      this._resetOptionTable()
      done()
    },
    // 表格单个行状态切换
    handleSingleSelect (selection, row) {
      const repeatIndex = this.checkedTableRow.findIndex((item) => {
        return item.row.id === row.id
      })
      if (repeatIndex !== -1) {
        this.checkedTableRow.splice(repeatIndex, 1)
        return
      }
      const index = this.customerList.findIndex((item) => {
        return item.id === row.id
      })
      this.checkedTableRow.push({
        page: this.pagination.currentPage,
        index,
        row
      })
    },
    // 手动勾选全选
    handleAllSelect (selection) {
      if (this.isSelectAll && selection.length !== 0) {
        selection.forEach((item) => {
          const repeatIndex = this.checkedTableRow.findIndex((repeatItem) => {
            return item.id === repeatItem.row.id
          })
          repeatIndex !== -1 && this.checkedTableRow.splice(repeatIndex, 1)
        })
      }
      if (this.isSelectAll && selection.length === 0) {
        this.checkedTableRow = this.customerList
          .map((item, index) => {
            return {
              page: this.pagination.currentPage,
              index,
              row: item
            }
          })
          .concat(this.checkedTableRow)
      }
      if (!this.isSelectAll && selection.length !== 0) {
        this.checkedTableRow = selection
          .map((item, index) => {
            return {
              page: this.pagination.currentPage,
              index,
              row: item
            }
          })
          .concat(this.checkedTableRow)
      }
      if (!this.isSelectAll && selection.length === 0) {
        this.customerList.forEach((item) => {
          const repeatIndex = this.checkedTableRow.findIndex((repeatItem) => {
            return item.id === repeatItem.row.id
          })
          repeatIndex !== -1 && this.checkedTableRow.splice(repeatIndex, 1)
        })
      }
    },
    // 结果页全选事件
    toggleSelectAll (val) {
      this.checkedTableRow = []
      this.$refs.table.clearSelection()
      if (val) {
        this.$refs.table.toggleAllSelection()
      }
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
    // 切换选择的通话分类
    toggleSelectedCat (val) {
      const flag = this.search.category.includes(val)
      if (flag) {
        const index = this.search.category.indexOf(val)
        this.search.category.splice(index, 1)
      } else {
        this.search.category.push(val)
      }
      this.ifCheckAll =
        this.search.category.length === this.searchCategoryList.length
          ? true
          : false
    },
    // 根据全选状态奇幻通话分类
    checkAll (val) {
      if (val) {
        this.searchCategoryList.forEach((item) => {
          this.search.category.push(item)
        })
      } else {
        this.search.category = []
      }
    },
    //跳转客户详情
    toDetail ({ mobile, userId }) {
      const params = {
        mobile,
        userId
      }
      this.$router.push({ path: '/customerManage/callStrategy', query: params })
    },
    //跳转跟进记录
    toFollow ({ mobile, userId }) {
      const params = {
        mobile,
        userId
      }
      this.$router.push({
        path: '/customerManage/followRecords',
        query: params
      })
    },
    queryList () {
      if (this.search.mobile && this.search.mobile.length < 3) {
        this.$message.warning('电话号码请输入三位以上')
        return
      }
      if (this.search.mobileHome && this.search.mobileHome.length < 2) {
        this.$message.warning('号码归属地请输入两字以上')
        return
      }
      if (
        new Date(this.search.lastUpdateEndTime) -
        new Date(this.search.lastUpdateBeginTime) >
        31 * 24 * 3600 * 1000
      ) {
        this.$message.warning('日期跨度不得超过31天')
        return
      }
      this.isLoading = false
      this.$request
        .post('/customer/customer/list', {
          userId: this.$store.state.userInfo.userId,
          robotIds: this.search.robotIds,
          lastCategory: this.search.category,
          num: this.pagination.currentPage,
          size: this.pagination.pageSize,
          lastFollowBeginTime: this.search.lastFollowBeginTime || null,
          lastFollowEndTime: this.search.lastFollowEndTime || null,
          followUps: this.search.followUps,
          name: this.search.name || null,
          mobile: this.search.mobile || null,
          sex: this.search.sex || null,
          max:
            this.search.max === 0 || this.search.max ? this.search.max : null,
          min:
            this.search.min === 0 || this.search.min ? this.search.min : null,
          callMax:
            this.search.maxCallTimes === 0 || this.search.maxCallTimes
              ? this.search.maxCallTimes
              : null,
          callMin:
            this.search.minCallTimes === 0 || this.search.minCallTimes
              ? this.search.minCallTimes
              : null,
          callTimeMax:
            this.search.maxTimeCost === 0 || this.search.maxTimeCost
              ? this.search.maxTimeCost
              : null,
          callTimeMin:
            this.search.minTimeCost === 0 || this.search.minTimeCost
              ? this.search.minTimeCost
              : null,
          lastUpdateBeginTime: this.search.lastUpdateBeginTime || null,
          lastUpdateEndTime: this.search.lastUpdateEndTime || null,
          mobileHome: this.search.mobileHome || null,
          birthdayBeginData: this.search.birthBeginTime || null,
          birthdayEndData: this.search.birthEndTime || null,
          customerComments: this.search.remark,
          type: this.search.customerType
        })
        .then((res) => {
          this.isLoading = false
          this.showMoreSearch = false
          if (res.code == 0) {
            this.customerList = res.data ? res.data.list : []
            this.pagination.total = res.data ? res.data.total : 0
            this.customerList.forEach((item) => {
              item.age = item.birthday
                ? new Date().getFullYear() - item.birthday.substring(0, 4)
                : null
            })
            if (this.checkedTableRow.length !== 0) {
              this.$nextTick(() => {
                const checkedRow = this.checkedTableRow.filter((item) => {
                  return item.page === this.pagination.currentPage
                })
                if (this.isSelectAll) {
                  this.customerList.forEach((item) => {
                    this.$refs.table.toggleRowSelection(item)
                  })
                }
                checkedRow.forEach((item) => {
                  this.$refs.table.toggleRowSelection(
                    this.customerList[item.index]
                  )
                })
              })
            } else if (this.isSelectAll) {
              this.$nextTick(() => {
                this.$refs.table.toggleAllSelection(true)
              })
            }
          }
        })
    },
    // 点击删除客户
    deleteCustomer () {
      if (this.isSelectAll) {
        this.$message.warning('建议不要全量删除')
        return
      }
      if (this.checkedTableRow.length === 0) {
        this.$message.warning('请选择数据')
        return
      }
      this.$confirm('数据一旦删除将不可恢复，请谨慎操作', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const res = await this.$request.post(
            '/customer/delete',
            this.checkedTableRow.map((item) => item.row.id)
          )
          if (res.code === '0') {
            this.checkedTableRow = []
            this.queryList()
            this.$message.success('客户删除成功')
          } else {
            this.$message.error(res.message || '删除失败')
          }
        })
        .catch(() => {
          return false
        })
    },
    //确认导出客户数据
    confirmExport () {
      if (!this.isSelectAll && this.checkedTableRow.length === 0) {
        this.$message.warning('请选择导出客户')
        return
      }
      this.allSwitch = false
      this.exportVisible = true
    },
    //导出客户数据
    async exportList () {
      const wsId = util.idGenerator()
      localStorage.setItem('cusListId', wsId)
      this.$store.dispatch('getExportListState', {
        wsId,
        mutation: 'saveCusListState'
      })
      const data = {
        userId: this.$store.state.userInfo.userId,
        robotIds: this.search.robotIds,
        lastCategory: this.search.category,
        num: this.pagination.currentPage,
        size: this.pagination.pageSize,
        lastFollowBeginTime: this.search.lastFollowBeginTime || null,
        lastFollowEndTime: this.search.lastFollowEndTime || null,
        followUps: this.search.followUps,
        name: this.search.name || null,
        mobile: this.search.mobile || null,
        sex: this.search.sex || null,
        max: this.search.max === 0 || this.search.max ? this.search.max : null,
        min: this.search.min === 0 || this.search.min ? this.search.min : null,
        callMax:
          this.search.maxCallTimes === 0 || this.search.maxCallTimes
            ? this.search.maxCallTimes
            : null,
        callMin:
          this.search.minCallTimes === 0 || this.search.minCallTimes
            ? this.search.minCallTimes
            : null,
        callTimeMax:
          this.search.maxTimeCost === 0 || this.search.maxTimeCost
            ? this.search.maxTimeCost
            : null,
        callTimeMin:
          this.search.minTimeCost === 0 || this.search.minTimeCost
            ? this.search.minTimeCost
            : null,
        lastUpdateBeginTime: this.search.lastUpdateBeginTime || null,
        lastUpdateEndTime: this.search.lastUpdateEndTime || null,
        customerComments: this.search.remark,
        mobileHome: this.search.mobileHome || null,
        type: this.search.customerType,
        birthdayBeginData: this.search.birthBeginTime || null,
        birthdayEndData: this.search.birthEndTime || null,
        ids: this.isSelectAll
          ? []
          : this.checkedTableRow.map((item) => item.row.id),
        exceptIds: this.isSelectAll
          ? this.checkedTableRow.map((item) => item.row.id)
          : [],
        attrType: this.allSwitch ? ['0'] : [],
        wsId
      }
      await this.$request({
        method: 'post',
        responseType: 'blob',
        url: 'customer/exportCus/ready',
        timeout: '3600000',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/json'
        },
        data: JSON.stringify(data)
      })
      this.$message.warning('正在下载中，无需重复提交')
      this.exportVisible = false
      this.$refs.table.clearSelection()
      this.isSelectAll = false
      this.checkedTableRow = []
    },
    //重置客户管理设置列表
    _resetOptionTable () {
      this.optionTable.forEach((item, index) => {
        item.tableShow = this.tableShow[index]
        item.searchShow = this.searchShow[index]
      })
    },
    //保存客户管理设置列表
    // _saveOptionTable (data) {
    //   const cloneOptionTable = JSON.parse(JSON.stringify(optionTable))
    //   // 找到显示所属账号的字段index
    //   const index = cloneOptionTable.findIndex((e) => e.index == 8)
    //   if (this.userInfo.rankCode == 30) {
    //     cloneOptionTable.splice(index, 2)
    //   } else if (this.userInfo.rankCode == 20) {
    //     cloneOptionTable.splice(index, 1)
    //   }
    //   data.customerTitle.split(',').forEach((item) => {
    //     const index = cloneOptionTable.findIndex((option) => {
    //       return option.name === item
    //     })
    //     cloneOptionTable[index].tableShow = true
    //   })
    //   data.filterColumn.split(',').forEach((item) => {
    //     const index = cloneOptionTable.findIndex((option) => {
    //       return option.name === item
    //     })
    //     cloneOptionTable[index].searchShow = true
    //   })
    //   this.optionTable = cloneOptionTable
    //   this.tableShow = cloneOptionTable.map((item) => item.tableShow)
    //   this.searchShow = cloneOptionTable.map((item) => item.searchShow)
    //   this.$nextTick(() => {
    //     this.$refs.table.doLayout()
    //   })
    // }
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/css/common.scss";
.customerList {
  .tool-search {
    flex: 1;
  }
  .pagination {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .toolbar-advanced {
    margin-top: -10px;
    padding-bottom: 10px;
    overflow-x: auto;
    overflow-y: hidden;
    $labelWidth: 100px;
    .advanced-item {
      display: inline-block;
      margin: 5px 20px;
      white-space: nowrap;
    }
    .advanced-label {
      display: inline-block;
      width: 140px;
      color: rgba(0, 0, 0, 0.65);
    }
    .advanced-input {
      width: 320px;
      &.input_small {
        width: 147px;
      }
    }
    .delimiter {
      padding: 0 10px;
    }
    .advanced-item_category {
      margin: 5px 20px;
      $line-height: 27px;
      .advanced-label {
        float: left;
        line-height: $line-height;
      }
      .advanced-category-container {
        margin-left: $labelWidth;
        .toggle {
          margin-right: 15px;
          color: $themeColor;
          cursor: pointer;
        }
      }
      .advanced-category {
        display: inline-block;
        width: 92.5px;
        line-height: $line-height;
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
  }
  .toggle-advanced {
    margin-left: 20px;
    color: $themeColor;
    cursor: pointer;
    white-space: nowrap;
    &:hover {
      color: lighten($themeColor, 15%);
    }
  }
  .el-dialog {
    .tip {
      margin: 6px 0;
      color: rgba(110, 110, 110, 0.5);
    }
    .exportTip {
      margin-bottom: 20px;
      font-size: 16px;
    }
    .tableTitle {
      color: $themeColor;
      border: 1px solid $themeColor;
      padding: 8px 18px;
      border-radius: 4px;
    }
  }
  /deep/.optionTable {
    margin-top: 30px;
    thead {
      color: #252525;
      th {
        background-color: #fafafa;
        font-weight: 600;
      }
    }
  }
}
</style>
