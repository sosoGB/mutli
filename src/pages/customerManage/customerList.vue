<template>
  <div class="customerList page-list">
    <!-- 面包屑导航 -->
    <div class="nav">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/main/customerManage/customerList' }"
          >首页</el-breadcrumb-item
        >
        <el-breadcrumb-item>客户批次管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="toolbar">
      <div class="tool-search">
        <el-input
          placeholder="客户批次"
          class="search-component search-input"
          v-model.trim="search.batch"
          clearable
        ></el-input>
        <el-date-picker
          v-model="search.startTime"
          class="search-component search-input"
          type="date"
          placeholder="开始时间"
          value-format="yyyy-MM-dd"
          :picker-options="beginUpdateValidator"
          clearable
        ></el-date-picker>
        <span class="search-delimiter">-</span>
        <el-date-picker
          v-model="search.endTime"
          class="search-component search-input"
          type="date"
          placeholder="结束时间"
          value-format="yyyy-MM-dd"
          :picker-options="endUpdateValidator"
          clearable
        ></el-date-picker>
        <el-button
          type="primary"
          class="search-component"
          @click="
            () => {
              pagination.currentPage = 1
              queryList()
            }
          "
          >搜索</el-button
        >
        <span
          class="toggle-advanced"
          @click="showMoreSearch = !showMoreSearch"
          >{{ showMoreSearch ? '取消' : '高级搜索' }}</span
        >
      </div>
      <div class="tool-button">
        <el-button @click="toCreateTask" icon="el-icon-plus"
          >新建任务</el-button
        >
        <el-button @click="toListPullSet" icon="el-icon-setting"
          >名单拉取</el-button
        >
      </div>
    </div>
    <div v-show="showMoreSearch" class="toolbar-advanced">
      <div class="advanced-item">
        <span class="advanced-label">客户种类：</span>
        <el-select
          v-model="search.customerType"
          placeholder="请选择客户类型"
          clearable
          class="advanced-input"
        >
          <el-option label="水滴医疗险" value="水滴医疗险"></el-option>
          <el-option label="水滴公众号吸粉" value="水滴公众号吸粉"></el-option>
          <el-option label="水滴长险意向" value="水滴长险意向"></el-option>
        </el-select>
      </div>
      <div class="advanced-item">
        <span class="advanced-label">是否已创建外呼任务：</span>
        <el-select
          v-model="search.isCall"
          placeholder="请选择"
          clearable
          class="advanced-input"
        >
          <el-option label="是" :value="1"></el-option>
          <el-option label="否" :value="0"></el-option>
        </el-select>
      </div>
      <div class="advanced-item">
        <span class="advanced-label">当批是否为新客户：</span>
        <el-select
          placeholder="请选择"
          clearable
          v-model="search.isNewCus"
          class="advanced-input"
        >
          <el-option label="是" :value="0"></el-option>
          <el-option label="否" :value="1"></el-option>
        </el-select>
      </div>
      <div class="advanced-item">
        <span class="advanced-label">性别：</span>
        <el-select
          v-model="search.sex"
          placeholder="请选择性别"
          clearable
          class="advanced-input"
          multiple
        >
          <el-option label="男" :value="1"></el-option>
          <el-option label="女" :value="0"></el-option>
          <el-option label="未知" :value="-1"></el-option>
        </el-select>
      </div>
      <div class="advanced-item">
        <span class="advanced-label">年龄：</span>
        <el-input
          v-number
          placeholder="最小值(含)"
          v-model="search.minAge"
          class="advanced-input input_small"
          @keyup.enter.native="
            () => {
              pagination.currentPage = 1
              queryList()
            }
          "
          clearable
        ></el-input>
        <span class="delimiter">-</span>
        <el-input
          v-number
          placeholder="最大值(含)"
          v-model="search.maxAge"
          class="advanced-input input_small"
          @keyup.enter.native="
            () => {
              pagination.currentPage = 1
              queryList()
            }
          "
          clearable
        ></el-input>
      </div>
      <div class="advanced-item">
        <span class="advanced-label">是否已成功转化：</span>
        <el-select
          v-model="search.isSuccess"
          placeholder="请选择"
          clearable
          class="advanced-input"
        >
          <el-option label="是" :value="2"></el-option>
          <el-option label="否" :value="1"></el-option>
        </el-select>
      </div>
      <div class="advanced-item">
        <span class="advanced-label">姓名是否为空：</span>
        <el-select
          v-model="search.isName"
          placeholder="请选择"
          clearable
          class="advanced-input"
        >
          <el-option label="是" :value="1"></el-option>
          <el-option label="否" :value="0"></el-option>
        </el-select>
      </div>
      <div class="advanced-item">
        <span class="advanced-label">意向分级标签：</span>
        <el-input
          placeholder="请输入意向分级标签，用逗号隔开"
          v-model="search.tag"
          class="advanced-input large-input"
          @keyup.enter.native="
            () => {
              pagination.currentPage = 1
              queryList()
            }
          "
          clearable
        ></el-input>
      </div>
      <div class="advanced-item">
        <span class="advanced-label">历史最高通话时长/s：</span>
        <el-input
          v-number
          placeholder="最小值(含)"
          v-model="search.startMaxTalkTime"
          class="advanced-input input_small"
          @keyup.enter.native="
            () => {
              pagination.currentPage = 1
              queryList()
            }
          "
          clearable
        ></el-input>
        <span class="delimiter">-</span>
        <el-input
          v-number
          placeholder="最大值(含)"
          v-model="search.endMaxTalkTime"
          class="advanced-input input_small"
          @keyup.enter.native="
            () => {
              pagination.currentPage = 1
              queryList()
            }
          "
          clearable
        ></el-input>
      </div>
      <div class="advanced-item">
        <span class="advanced-label">最近通话时长/s：</span>
        <el-input
          v-number
          placeholder="最小值(含)"
          v-model="search.startTalkTime"
          class="advanced-input input_small"
          @keyup.enter.native="
            () => {
              pagination.currentPage = 1
              queryList()
            }
          "
          clearable
        ></el-input>
        <span class="delimiter">-</span>
        <el-input
          v-number
          placeholder="最大值(含)"
          v-model="search.endTalkTime"
          class="advanced-input input_small"
          @keyup.enter.native="
            () => {
              pagination.currentPage = 1
              queryList()
            }
          "
          clearable
        ></el-input>
      </div>
      <div class="advanced-item">
        <span class="advanced-label">意向分级等级：</span>
        <el-checkbox-group
          v-model="selectIntentTags"
          style="display:inline-block;"
        >
          <el-checkbox
            v-for="range in intentTags"
            :label="range"
            :key="range"
            style="width:80px;"
          ></el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
    <div class="table">
      <el-table
        :data="customerList"
        ref="table"
        stripe
        height="100%"
        border
        tooltip-effect="dark"
        v-loading="isLoading"
        @select="handleSingleSelect"
        @select-all="handleAllSelect"
      >
        <el-table-column
          type="selection"
          fixed="left"
          align="center"
          width="55"
        ></el-table-column>
        <el-table-column
          label="序号"
          align="center"
          type="index"
          :resizable="false"
          width="70"
        >
        </el-table-column>
        <el-table-column
          :resizable="false"
          prop="batch"
          label="客户批次"
          width="120"
          align="center"
        ></el-table-column>
        <el-table-column
          :resizable="false"
          prop="type"
          label="客户种类"
          width="120"
          align="center"
        >
        </el-table-column>
        <el-table-column
          :resizable="false"
          label="录入时间"
          width="110"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{
              scope.row.createTime | formatDate('yyyy-MM-dd hh:mm:ss')
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :resizable="false"
          prop="initCt"
          label="入库前获取的客户总数量"
          width="180"
          align="center"
        >
        </el-table-column>
        <el-table-column
          :resizable="false"
          prop="distCt"
          label="实际入库的客户总数量"
          width="180"
          align="center"
        >
        </el-table-column>
        <el-table-column
          :resizable="false"
          prop="newCt"
          label="实际入库的新客户数量"
          width="180"
          align="center"
        ></el-table-column>
        <el-table-column
          :resizable="false"
          prop="callCt"
          label="已创建呼叫任务的客户数量"
          width="190"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          :resizable="false"
          prop="successCt"
          label="已成功转化的客户数量"
          width="180"
          align="center"
        ></el-table-column>
        <el-table-column
          :resizable="false"
          prop="cancel"
          label="转化后取消的客户数量"
          width="180"
          align="center"
        >
          <template slot-scope="">
            <span>0</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="finishCt"
          label="已完成呼叫任务的接通数量"
          width="180"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="successPercent"
          label="接通转化率"
          width="180"
          align="center"
        >
          <template slot-scope="scope">
            <div>
              {{ scope.row.successPercent * 100 + '%' }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :resizable="false"
          label="操作"
          min-width="240"
          fixed="right"
          align="center"
        >
          <template slot-scope="scope">
            <el-button @click="ctDownload(scope.row)" :disabled="isDownLoad">{{
              scope.row.isDownLoad ? '正在下载' : '客户下载'
            }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <!-- <el-checkbox v-model="isSelectAll" @change="toggleSelectAll"
        >结果页全选</el-checkbox
      > -->
      <el-pagination
        background
        @current-change="queryList"
        @size-change="queryList"
        :page-size.sync="pagination.pageSize"
        :page-sizes="[10, 20, 50]"
        :current-page.sync="pagination.currentPage"
        layout="prev, pager, next, sizes, jumper"
        :total="pagination.total"
      ></el-pagination>
    </div>
    <el-dialog
      title="名单自动拉取设置"
      :visible.sync="listPullDialogVisible"
      v-if="listPullDialogVisible"
    >
      <el-form
        :model="pullForm"
        label-width="170px"
        label-position="right"
        :rules="rules"
        ref="pullForm"
      >
        <el-form-item label="名单拉取方式：" prop="type">
          <el-radio-group v-model="pullForm.type">
            <el-radio :label="1">定时拉取</el-radio>
            <el-radio :label="2">立即拉取</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="最大拉取名单数目/条：" prop="number">
          <el-input type="number" v-model="pullForm.number"></el-input>
        </el-form-item>
        <el-form-item
          label="自动拉取名单时间："
          v-if="pullForm.type == 1"
          prop="autoPullTime"
        >
          <el-time-select
            v-model="pullForm.autoPullTime"
            :picker-options="{
              start: '00:00',
              step: '00:30',
              end: '23:30'
            }"
            placeholder="选择时间"
          >
          </el-time-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closePullDialog">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
// import util from '@/service/util'
import filter from '@/service/filter.js'
import keepAlive from '@/utils/mixins/keepAlive.js' //用于从详情页返回列表页仍然返回之前页面
export default {
  mixins: [keepAlive],
  data() {
    return {
      isDownLoad: false, //是否在下载
      authExport: false,
      userInfo: this.$store.state.userInfo,
      detailPages: ['customerInfo', 'followRecords'], //当前页面能跳转的子页面的name数组
      tableShow: [], //控制表格列显示
      searchShow: [], //控制筛选显示
      isSelectAll: false, //是否全选列表结果
      ifCheckAll: false, //是否选中所有
      showMoreSearch: false, //是否显示高级搜索
      intentTags: ['A', 'B', 'C', 'D', 'E', 'F'],
      selectIntentTags: [],
      pullForm: {
        type: '',
        number: '',
        autoPullTime: ''
      },
      rules: {
        type: [
          { required: true, message: '请选择名单拉取方式', trigger: 'change' }
        ],
        number: [
          { required: true, message: '请输入最大拉取条数', trigger: 'blur' }
        ],
        autoPullTime: [
          {
            required: true,
            message: '请选择自动拉取名单时间',
            trigger: 'change'
          }
        ]
      },
      search: {
        //查询筛选字段
        userId: this.$store.state.userInfo.id,
        batch: null, //客户批次
        endTime: '', //开始时间
        startTime: '', //结束时间
        customerType: null, //客户种类
        isCall: null, //是否已创建外呼任务
        isNewCus: null, //是否为新客户
        sex: null, //性别
        minAge: null, //年龄最小值
        maxAge: null, //年龄最大值
        isSuccess: null, //是否已成功转化
        isName: null, //名字是否为空
        tag: '', //
        startMaxTalkTime: null,
        endMaxTalkTime: null,
        startTalkTime: null,
        endTalkTime: null
      },
      listPullDialogVisible: false,
      pagination: {
        pageSize: 10,
        currentPage: 1,
        total: 0
      },
      robotList: [], // 可选机器人列表
      customerList: [], //表格填充数据
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
      beginUpdateValidator: {
        disabledDate: (current) => Date.now() < current
      },
      endUpdateValidator: {
        disabledDate: (current) => {
          return (
            this.search.startTime &&
            filter.formatDate(current, 'yyyy-MM-dd') < this.search.startTime
          )
        }
      }
    }
  },
  created() {
    this.queryList()
  },
  activated() {
    //重新进入缓存页面的钩子
    this.queryList()
  },
  methods: {
    closePullDialog() {
      for (const key in this.pullForm) {
        this.pullForm[key] = ''
      }
      this.listPullDialogVisible = false
    },
    handleDialogConfirm() {
      this.$refs.pullForm.validate(async (valid) => {
        if (!valid) return
        if (this.pullForm.type == 1) {
          let url = '/sdmulti/fetch/setCron'
          this.$request
            .formPost(url, {
              timeStr: this.pullForm.autoPullTime + ':00',
              batchSize: this.pullForm.number
            })
            .then((res) => {
              if (res.code == '0') {
                this.$message.success('名单自动拉取设置成功')
              } else {
                this.$message.error(res.message)
              }
            })
        } else {
          let url = '/sdmulti/fetch/pullNow'
          this.$request
            .formPost(url, {
              batchSize: this.pullForm.number
            })
            .then((res) => {
              if (res.code == '0') {
                // this.$message.success('自动拉取')
                if (res.data == 0) {
                  this.$message.error('名单拉取数量为0，请确认是否已下发名单')
                } else {
                  this.$message.success(
                    '名单拉取成功，拉取数目为' + res.data + '条'
                  )
                }
              } else {
                this.$message.error(res.message)
              }
            })
        }

        for (const key in this.pullForm) {
          this.pullForm[key] = ''
        }
        this.listPullDialogVisible = false
      })
    },
    toListPullSet() {
      this.listPullDialogVisible = true
    },
    // 表格单个行状态切换
    handleSingleSelect(selection, row) {
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
    handleAllSelect(selection) {
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
    toggleSelectAll(val) {
      this.checkedTableRow = []
      this.$refs.table.clearSelection()
      if (val) {
        this.$refs.table.toggleAllSelection()
      }
    },
    // 查询结果下载
    async ctDownload(row) {
      const { userId, uuid, type } = row
      row.isDownLoad = true
      if (!this.isDownLoad) {
        this.isDownLoad = true
        this.$message.warning('客户信息包含内容较多，下载时间较长，请见谅！')
        let sex = null
        if (this.search.sex && this.search.sex.length) {
          sex = this.search.sex.map(Number)
          if (sex.includes(0)) {
            sex.push(2)
          }
        }
        const res = await this.$request.xml(
          '/sdmulti/qbzz/manage/api/download',
          {
            userId,
            uuid,
            type,
            batch: this.search.batch,
            startTime: this.search.startTime
              ? this.search.startTime + ' 00:00:00'
              : null,
            endTime: this.search.endTime
              ? this.search.endTime + ' 23:59:59'
              : null,
            isCall: this.search.isCall,
            isNewCus: this.search.isNewCus,
            sex: sex,
            minAge: this.search.minAge,
            maxAge: this.search.maxAge,
            isSuccess: this.search.isSuccess,
            isName: this.search.isName,
            tag: this.search.tag,
            aiCategory: this.selectIntentTags.join(','),
            startMaxTalkTime: this.search.startMaxTalkTime,
            endMaxTalkTime: this.search.endMaxTalkTime,
            startTalkTime: this.search.startTalkTime,
            endTalkTime: this.search.endTalkTime

            //   userId: this.$store.state.userInfo.id,
            // batch: this.search.batch || null,
            // startTime: this.search.startTime
            //   ? this.search.startTime + ' 00:00:00'
            //   : null,
            // endTime: this.search.endTime
            //   ? this.search.endTime + ' 23:59:59'
            //   : null,
            // type: this.search.customerType,
            // isCall: this.search.isCall,
            // isNewCus: this.search.isNewCus,
            // sex: sex,
            // minAge: this.search.minAge,
            // maxAge: this.search.maxAge,
            // isSuccess: this.search.isSuccess,
            // isName: this.search.isName,
            // page: this.pagination.currentPage,
            // pageSize: this.pagination.pageSize
          }
        )
        const a = document.createElement('a')
        a.download = '客户批次查询结果.xls'
        a.href = URL.createObjectURL(res)
        a.click()
        this.isDownLoad = false
        row.isDownLoad = false
      }
    },
    //跳转新建任务
    toCreateTask() {
      if (!this.isSelectAll) {
        if (!this.isSelectAll && this.checkedTableRow.length === 0) {
          this.$message.warning('请选择客户批次')
          return
        }
      }
      // 判断勾选的类型是否相同
      const result = this.checkedTableRow.every(
        (el) => el.row.type === this.checkedTableRow[0].row.type
      )
      if (!result) {
        this.$message.warning('只可针对同一客户种类新建外呼任务，请重新选择！')
        return
      }
      const pagination = this.pagination
      const search = { ...this.search }
      if (!search.sex.length) {
        search.sex = null
      }
      this.$router.push({
        path: 'createTask',
        query: { name: this.checkedTableRow, search, pagination }
      })
    },
    // 查询列表
    queryList() {
      if (
        new Date(this.search.endTime) - new Date(this.search.startTime) >
        31 * 24 * 3600 * 1000
      ) {
        this.$message.warning('日期跨度不得超过31天')
        return
      }
      this.isLoading = true
      this.checkedTableRow = []
      let sex = null
      if (this.search.sex && this.search.sex.length) {
        sex = this.search.sex.map(Number)
        if (sex.includes(0)) {
          sex.push(2)
        }
      }
      this.$request
        .jsonPost('/sdmulti/qbzz/manage/api/queryCus', {
          userId: this.$store.state.userInfo.id,
          batch: this.search.batch || null,
          startTime: this.search.startTime
            ? this.search.startTime + ' 00:00:00'
            : null,
          endTime: this.search.endTime
            ? this.search.endTime + ' 23:59:59'
            : null,
          type: this.search.customerType,
          isCall: this.search.isCall,
          isNewCus: this.search.isNewCus,
          sex: sex,
          minAge: this.search.minAge,
          maxAge: this.search.maxAge,
          isSuccess: this.search.isSuccess,
          isName: this.search.isName,
          page: this.pagination.currentPage,
          pageSize: this.pagination.pageSize,
          tag: this.search.tag,
          aiCategory: this.selectIntentTags.join(','),
          startMaxTalkTime: this.search.startMaxTalkTime,
          endMaxTalkTime: this.search.endMaxTalkTime,
          startTalkTime: this.search.startTalkTime,
          endTalkTime: this.search.endTalkTime
        })
        .then((res) => {
          this.isLoading = false
          this.showMoreSearch = false
          if (res.code == 0) {
            this.customerList = res.data ? res.data.list : []
            this.pagination.total = res.data ? res.data.total : 0
            // if (this.checkedTableRow.length !== 0) {
            //   this.$nextTick(() => {
            //     const checkedRow = this.checkedTableRow.filter((item) => {
            //       return item.page === this.pagination.currentPage
            //     })
            //     if (this.isSelectAll) {
            //       this.customerList.forEach((item) => {
            //         this.$refs.table.toggleRowSelection(item)
            //       })
            //     }
            //     checkedRow.forEach((item) => {
            //       this.$refs.table.toggleRowSelection(
            //         this.customerList[item.index]
            //       )
            //     })
            //   })
            // if (this.isSelectAll) {
            //   this.$nextTick(() => {
            //     this.$refs.table.toggleAllSelection(true)
            //   })
            // }
          }
        })
        .finally(() => {
          this.isLoading = false
        })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/css/common.scss';
.customerList {
  .tool-search {
    flex: 1;
  }
  .pagination {
    display: flex;
    justify-content: flex-end;
    flex-direction: row;
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
      &.large-input {
        width: 600px;
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
}
</style>
