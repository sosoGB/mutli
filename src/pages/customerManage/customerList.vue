<template>
  <div class="customerList page-list">
    <!-- 面包屑导航 -->
    <div class="nav">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/main/customerManage/customerList' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>客户批次管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="toolbar">
      <div class="tool-search">
        <el-input placeholder="客户批次" class="search-component search-input" v-model.trim="search.batch" @keyup.enter.native="fetchTaskList(1)" clearable></el-input>
        <el-date-picker v-model="search.startTime" class="search-component search-input" type="date" placeholder="开始时间" value-format="yyyy-MM-dd" :picker-options="beginUpdateValidator" :clearable="false"></el-date-picker>
        <span class="search-delimiter">-</span>
        <el-date-picker v-model="search.endTime" class="search-component search-input" type="date" placeholder="结束时间" value-format="yyyy-MM-dd" :picker-options="endUpdateValidator" :clearable="false"></el-date-picker>
        <el-button type="primary" class="search-component" @click="
            () => {
              pagination.currentPage = 1
              queryList()
            }
          ">搜索</el-button>
        <span class="toggle-advanced" @click="showMoreSearch = !showMoreSearch">{{ showMoreSearch ? '取消' : '高级搜索' }}</span>
      </div>
      <div class="tool-button">
        <el-button @click="toCreateTask" icon="el-icon-plus">新建任务</el-button>
      </div>
    </div>
    <div v-show="showMoreSearch" class="toolbar-advanced">
      <div class="advanced-item">
        <span class="advanced-label">客户种类：</span>
        <el-select v-model="search.customerType" placeholder="请选择客户类型" clearable class="advanced-input">
          <el-option label="水滴医疗险" value="水滴医疗险"></el-option>
          <el-option label="水滴公众号吸粉" value="水滴公众号吸粉"></el-option>
        </el-select>
      </div>
      <div class="advanced-item">
        <span class="advanced-label">是否已创建外呼任务：</span>
        <el-select v-model="search.isCall" placeholder="请选择" clearable class="advanced-input">
          <el-option label="是" value="0"></el-option>
          <el-option label="否" value="1"></el-option>
        </el-select>
      </div>
      <div class="advanced-item">
        <span class="advanced-label">当批是否为新客户：</span>
        <el-select placeholder="请选择机器人名称" v-model="search.isNewCus" class="advanced-input">
          <el-option label="是" value="0"></el-option>
          <el-option label="否" value="1"></el-option>
        </el-select>
      </div>
      <div class="advanced-item">
        <span class="advanced-label">性别：</span>
        <el-select v-model="search.sex" placeholder="请选择性别" clearable class="advanced-input">
          <el-option label="男" value="1"></el-option>
          <el-option label="女" value="0"></el-option>
        </el-select>
      </div>
      <div class="advanced-item">
        <span class="advanced-label">年龄：</span>
        <el-input v-number placeholder="最小值(含)" v-model="search.minAge" class="advanced-input input_small" @keyup.enter.native="
            () => {
              pagination.currentPage = 1
              queryList()
            }
          " clearable></el-input>
        <span class="delimiter">-</span>
        <el-input v-number placeholder="最大值(含)" v-model="search.maxAge" class="advanced-input input_small" @keyup.enter.native="
            () => {
              pagination.currentPage = 1
              queryList()
            }
          " clearable></el-input>
      </div>
      <div class="advanced-item">
        <span class="advanced-label">是否已成功转化：</span>
        <el-select v-model="search.isSuccess" placeholder="请选择" clearable class="advanced-input">
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
        <el-table-column :resizable="false" prop="batch" label="客户批次" width="120" align="center"></el-table-column>
        <el-table-column :resizable="false" prop="type" label="客户种类" width="120" align="center">
        </el-table-column>
        <el-table-column :resizable="false" label="录入时间" width="110" align="center">
          <template slot-scope="scope">
            <span>{{
              scope.row.createTime | formatDate('yyyy-MM-dd hh:mm:ss')
            }}</span>
          </template>
        </el-table-column>
        <el-table-column :resizable="false" prop="initCt" label="入库前获取的客户总数量" width="180" align="center">
        </el-table-column>
        <el-table-column :resizable="false" prop="distCt" label="实际入库的客户总数量" width="180" align="center">
        </el-table-column>
        <el-table-column :resizable="false" prop="newCt" label="实际入库的新客户数量" width="180" align="center"></el-table-column>
        <el-table-column :resizable="false" prop="callCt" label="已创建呼叫任务的客户数量" width="190" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column :resizable="false" prop="successCt" label="已成功转化的客户数量" width="180" align="center"></el-table-column>
        <el-table-column :resizable="false" prop="successCt" label="转化后取消的客户数量" width="180" align="center"></el-table-column>
        <el-table-column :resizable="false" label="操作" min-width="240" fixed="right" align="center">
          <template slot-scope="scope">
            <el-button @click="ctDownload(scope.row)" :disabled="$store.state.cusListState === 'loading'">{{$store.state.cusListState === 'loading' ? '正在下载' : '客户下载'}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-checkbox v-model="isSelectAll" @change="toggleSelectAll">结果页全选</el-checkbox>
      <el-pagination background @current-change="queryList" @size-change="queryList" :page-size.sync="pagination.pageSize" :page-sizes="[10, 20, 50]" :current-page.sync="pagination.currentPage" layout="prev, pager, next, sizes, jumper" :total="pagination.total"></el-pagination>
    </div>
  </div>
</template>
<script>
import util from '@/service/util'
import filter from '@/service/filter.js'
import keepAlive from '@/utils/mixins/keepAlive.js' //用于从详情页返回列表页仍然返回之前页面
export default {
  mixins: [keepAlive],
  data () {
    return {
      authDelete: false,
      authExport: false,
      userInfo: this.$store.state.userInfo,
      detailPages: ['customerInfo', 'followRecords'], //当前页面能跳转的子页面的name数组
      tableShow: [], //控制表格列显示
      searchShow: [], //控制筛选显示
      isSelectAll: false, //是否全选列表结果
      ifCheckAll: false, //是否选中所有
      showMoreSearch: false, //是否显示高级搜索
      search: {
        //查询筛选字段
        userId: this.$store.state.userInfo.id,
        batch: '', //客户批次
        endTime: '', //开始时间
        startTime: '', //结束时间
        customerType: '', //客户种类
        isCall: '', //是否已创建外呼任务
        isNewCus: '', //是否为新客户
        sex: null, //性别
        minAge: '', //年龄最小值
        maxAge: '', //年龄最大值
        isSuccess: '',//是否已成功转化
      },
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
        disabledDate: (current) =>
          (this.search.startTime &&
            filter.formatDate(current, 'yyyy-MM-dd') <
            this.search.startTime) ||
          Date.now() < current
      }
    }
  },
  created () {
    this.queryList()
  },
  activated () {
    //重新进入缓存页面的钩子
    this.queryList()
  },
  methods: {
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
    // 查询结果下载 
    async ctDownload ({ userId, uuid, type }) {
      console.log(userId, uuid, type)
      this.$message.warning('客户信息包含内容较多，导出时间会有影响，请见谅！')
      const wsId = util.idGenerator()
      localStorage.setItem('cusListId', wsId)
      this.$store.dispatch('getExportListState', {
        wsId,
        mutation: 'saveCusListState'
      })
      const res = await this.$request.xml('/sdmulti/qbzz/manage/api/download', {
        userId,
        uuid,
        type,
        batch: this.search.batch,
        startTime: this.search.startTime || null,
        endTime: this.search.endTime || null,
        isCall: Number(this.search.isCall) || null,
        isNewCus: Number(this.search.isNewCus) || null,
        sex: Number(this.search.sex) || null,
        minAge: Number(this.search.minAge) || null,
        maxAge: Number(this.search.maxAge) || null,
        isSuccess: Number(this.search.isSuccess) || null,
      })
      const a = document.createElement("a");
      a.download = '客户批次查询结果.xls';
      a.href = URL.createObjectURL(res);
      a.click();
    },
    //跳转新建任务
    toCreateTask () {
      if (!this.isSelectAll) {
        if (!this.isSelectAll && this.checkedTableRow.length === 0) {
          this.$message.warning('请选择客户批次')
          return
        }
      }
      // 判断勾选的类型是否相同
      const result = this.checkedTableRow.every(el => el.row.type === this.checkedTableRow[0].row.type)
      if (!result) {
        this.$message.warning('只可针对同一客户种类新建外呼任务，请重新选择！')
        return
      }
      const search = this.search
      this.$router.push({
        path: 'createTask',
        query: { name: this.checkedTableRow, search: search }
      })
    },
    // 查询列表
    queryList () {
      if (
        new Date(this.search.endTime) -
        new Date(this.search.startTime) >
        31 * 24 * 3600 * 1000
      ) {
        this.$message.warning('日期跨度不得超过31天')
        return
      }
      this.isLoading = true
      this.$request.jsonPost('/sdmulti/qbzz/manage/api/queryCus', {
        userId: this.$store.state.userInfo.id,
        batch: this.search.batch || null,
        startTime: this.search.startTime || null,
        endTime: this.search.endTime || null,
        type: this.search.customerType,
        isCall: Number(this.search.isCall) || null,
        isNewCus: Number(this.search.isNewCus) || null,
        sex: Number(this.search.sex) || null,
        minAge: Number(this.search.minAge) || null,
        maxAge: Number(this.search.maxAge) || null,
        isSuccess: Number(this.search.isSuccess) || null,
        page: this.pagination.currentPage,
        pageSize: this.pagination.pageSize
      })
        .then((res) => {
          this.isLoading = false
          this.showMoreSearch = false
          if (res.code == 0) {
            this.customerList = res.data ? res.data.list : []
            this.pagination.total = res.data ? res.data.total : 0
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
    }
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
}
</style>
