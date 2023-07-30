<template>
  <div class="selectRecords page-list">
    <!-- 面包屑导航 -->
    <div class="nav">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/main/customerManage/selectRecords' }"
          >首页</el-breadcrumb-item
        >
        <el-breadcrumb-item>名单筛选记录</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="toolbar">
      <div class="tool-search">
        <el-input
          placeholder="筛选条件关键词"
          style="width: 260px"
          class="search-component search-input"
          v-model.trim="search.queryRemark"
          clearable
        ></el-input>
        <el-date-picker
          v-model="search.createTime"
          class="search-component search-input"
          type="date"
          placeholder="开始时间"
          value-format="yyyy-MM-dd"
          :picker-options="beginUpdateValidator"
          @change="changeCreateTime"
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
        <el-select
          v-model="search.state"
          placeholder="请选择状态"
          clearable
          class="search-component search-input"
        >
          <el-option label="查询中" :value="0"></el-option>
          <el-option label="查询成功" :value="1"></el-option>
          <el-option label="查询失败" :value="2"></el-option>
        </el-select>
        <el-button
          type="primary"
          class="search-component"
          @click="
            () => {
              pagination.currentPage = 1
              clickedSle = true
              queryList()
            }
          "
          >查询</el-button
        >
      </div>
    </div>
    <div class="table">
      <el-table
        :data="selectRecords"
        ref="table"
        stripe
        height="100%"
        border
        tooltip-effect="dark"
        v-loading="isLoading"
      >
        <!-- <el-table-column
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
        </el-table-column> -->
        <el-table-column
          :resizable="false"
          prop="queryRemark"
          label="筛选条件描述"
          min-width="180"
          align="center"
        >
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              :content="scope.row.queryRemark"
              placement="top"
            >
              <div style="max-height: 90px; font-size: 12px">
                {{ scope.row.queryRemark }}
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          :resizable="false"
          prop="createTime"
          label="筛选时间"
          min-width="120"
          align="center"
        >
        </el-table-column>
        <el-table-column
          :resizable="false"
          label="筛选时长（秒）"
          min-width="100"
          align="center"
          prop="queryTime"
        >
        </el-table-column>
        <el-table-column
          :resizable="false"
          prop="queryNumber"
          label="筛选后数据量"
          min-width="120"
          align="center"
        >
        </el-table-column>
        <el-table-column
          :resizable="false"
          prop="batch"
          label="批次号"
          min-width="160"
          align="center"
        >
          <template slot-scope="scope">
            <div>
              {{ scope.row.batch || '-' }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="state" label="状态" width="120" align="center">
          <template slot-scope="scope">
            <div :class="'state-' + scope.row.state">
              {{
                scope.row.state == 0
                  ? '查询中'
                  : scope.row.state == 1
                  ? '查询成功'
                  : '查询失败'
              }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :resizable="false"
          label="操作"
          min-width="160"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.state == 1"
              @click="toCreate(scope.row)"
              type="primary"
              size="small"
              >新建任务</el-button
            >
            <el-button
              v-if="scope.row.state == 1"
              @click="reSelect(scope.row)"
              size="small"
              >重新筛选</el-button
            >
            <el-button
              v-if="scope.row.state == 2"
              @click="seeFailReason(scope.row)"
              size="small"
              >查看失败原因</el-button
            >
            <el-button
              @click="deleteOne(scope.row)"
              size="small"
              v-if="scope.row.state != 0"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
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
      title="新建任务"
      :visible.sync="createVisible"
      v-if="createVisible"
    >
      <div>
        <label>请选择项目名称：</label>
        <el-select v-model="selectPro" placeholder="请选择项目名称">
          <el-option
            v-for="item in projectList"
            :label="item.projectName"
            :value="item.id"
            :key="item.id"
          ></el-option>
        </el-select>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeCreateDialog">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="失败原因"
      width="400px"
      :visible.sync="failVisible"
      v-if="failVisible"
    >
      <div>
        {{ remark }}
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="failVisible = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
// import util from '@/service/util'
import filter from '@/service/filter.js'
export default {
  data() {
    const now = filter.formatDate(Date.now(), 'yyyy-MM-dd')
    const oneMonthAgo = filter.formatDate(
      Date.now() - 31 * 24 * 3600 * 1000,
      'yyyy-MM-dd'
    )
    return {
      diaVisible: false,
      clickedSle: false,
      isDownLoad: false, //是否在下载
      userInfo: this.$store.state.userInfo,
      remark: '',
      failVisible: false,
      createVisible: false,
      selectPro: '',
      projectList: [],
      selRow: {},
      rules: {
        type: [
          { required: true, message: '请选择名单拉取方式', trigger: 'change' },
        ],
        number: [
          { required: true, message: '请输入最大拉取条数', trigger: 'blur' },
        ],
        autoPullTime: [
          {
            required: true,
            message: '请选择自动拉取名单时间',
            trigger: 'change',
          },
        ],
      },
      oldSearch: {
        //查询筛选字段
        userId: this.$store.state.userInfo.id,
        queryRemark: null,
        endTime: oneMonthAgo, //开始时间
        createTime: now, //结束时间
        state: null,
      },
      search: {
        //查询筛选字段
        userId: this.$store.state.userInfo.id,
        queryRemark: null,
        endTime: now, //开始时间
        createTime: oneMonthAgo, //结束时间
        state: null,
      },
      pagination: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      selectRecords: [], //表格填充数据
      isLoading: false,
      beginUpdateValidator: {
        disabledDate: (current) => Date.now() < current,
      },
      endUpdateValidator: {
        disabledDate: (current) => {
          return (
            this.search.createTime &&
            filter.formatDate(current, 'yyyy-MM-dd') < this.search.createTime
          )
        },
      },
    }
  },
  created() {
    this.queryList()
  },
  methods: {
    closeCreateDialog() {
      this.createVisible = false
    },
    handleDialogConfirm() {
      if (!this.selectPro) {
        this.$message.error('请选择项目名称')
        return
      }
      this.$router.push({
        path: 'createTask',
        query: {
          search: {
            ...JSON.parse(this.selRow.queryInfo),
            queryNumber: this.selRow.queryNumber,
            projectId: this.selectPro,
            projectName: this.projectList.find((e) => e.id == this.selectPro)
              .projectName,
          },
        },
      })
    },
    seeFailReason(row) {
      this.failVisible = true
      this.remark = row.remark
    },
    estimateRegistrationTime(beginDate, endDate) {
      var begin = new Date(beginDate).getTime()
      var end = new Date(endDate).getTime()
      var day = (end - begin) / (24 * 60 * 60 * 1000)
      if (day > 365) {
        return true
      } else {
        return false
      }
    },
    changeCreateTime(val) {
      let isMorethenOneYear = this.estimateRegistrationTime(
        val,
        this.search.endTime
      )
      if (isMorethenOneYear) {
        this.search.endTime = filter.formatDate(
          new Date(new Date(val).getTime() + 365 * 24 * 60 * 60 * 1000 - 1),
          'yyyy-MM-dd'
        )
      }
    },
    deleteOne(row) {
      //http://sdmanage.qibot-ai.com/sdmulti/qbzz/manage/api/customer/batch/delete?batch=数鸣20220831第4批建模名单
      this.$confirm('是否确认删除').then(() => {
        this.$request
          .jsonGet('/sdmulti/cs/query/del?id=' + row.id)
          .then((res) => {
            if (res.code == 0) {
              this.$message.success('删除成功')
              this.queryList()
            }
          })
      })
    },
    toCreate(row) {
      this.createVisible = true
      this.selRow = row
      this.getProjectList(row)
    },
    reSelect(row) {
      this.$router.push({
        path: '/main/customerManage/programRosterList',
        query: {
          search: row.queryInfo,
        },
      })
    },
    getProjectList(row) {
      const url = '/sdmulti/manage/project/list/type'
      const params = {
        status: 1, // 只有启动的项目才查出来
        batchOrigin: row.batchOrigin,
      }
      this.$request.formGet(url, params).then((res) => {
        if (res.code == 0) {
          this.projectList = res.data
        }
      })
    },
    //跳转新建任务
    toCreateTask() {
      const pagination = this.pagination
      const search = { ...this.oldSearch }
      this.$router.push({
        path: 'createTask',
        query: {
          name: JSON.stringify(this.checkedTableRow),
          search: JSON.stringify(search),
          pagination: JSON.stringify(pagination),
        },
      })
    },
    // 查询列表
    queryList() {
      Object.assign(this.oldSearch, this.search)
      this.isLoading = true
      this.checkedTableRow = []
      this.$request
        .jsonPost('/sdmulti/cs/query/list', {
          userId: this.$store.state.userInfo.id,
          queryRemark: this.search.queryRemark,
          createTime: this.search.createTime
            ? this.search.createTime + ' 00:00:00'
            : null,
          endTime: this.search.endTime
            ? this.search.endTime + ' 23:59:59'
            : null,
          state: this.search.state,
          page: this.pagination.currentPage,
          pageSize: this.pagination.pageSize,
        })
        .then((res) => {
          this.isLoading = false
          if (res.code == 0) {
            this.selectRecords = res.data ? res.data.list : []
            this.pagination.total = res.data ? res.data.total : 0
          }
        })
        .finally(() => {
          this.isLoading = false
        })
    },
  },
}
</script>
<style lang="scss" scoped>
@import '@/assets/css/common.scss';
.el-button.el-button--primary {
  color: #fff !important;
}
.selectRecords {
  .tool-search {
    flex: 1;
  }
  .pagination {
    display: flex;
    flex-direction: flex-end;
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
  td.first {
    width: 60px;
  }
  td {
    min-height: 30px;
    line-height: 30px;
    text-align: center;
  }
  tr.outer-tr {
    border-bottom: 1px solid #ccc;
  }
  tr {
    width: 100%;
  }
  tr {
    display: flex;
    flex-direction: row;
    td {
      flex: 1;
    }
  }
  td tr td {
    min-width: 100px;
    width: auto;
    border-bottom: 1px solid #ccc;
  }
  .state-0 {
    color: #f6aa48;
  }
  .state-1 {
    color: #b6d97f;
  }
  .state-2 {
    color: #e34357;
  }
}
</style>
