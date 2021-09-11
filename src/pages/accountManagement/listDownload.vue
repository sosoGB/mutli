<template>
  <div class="list-download tablePage">
    <div class="nav">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/main/accountManagement' }">账户权益</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/main/accountManagement/accountList' }">账户管理</el-breadcrumb-item>
        <el-breadcrumb-item>名单下载</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="table">
      <el-table :data="tableData" ref="table" border height="100%">
        <el-table-column
          align="center"
          prop="show_name"
          label="数据名称">
        </el-table-column>
        <el-table-column
          align="center"
          prop="file_size"
          label="数据量">
        </el-table-column>
        <el-table-column
          prop="created_time"
          align="center"
          label="上传时间">
        </el-table-column>
        <el-table-column
          align="center"
          label="操作">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="下载" placement="top">
              <el-button @click="downLoad(scope.row)" size="mini"><img src="@/assets/image/list_download.png"></el-button>
            </el-tooltip>
        </template>
        </el-table-column>
        
      </el-table>
      <!-- <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table> -->
    </div>
    <div class="pagination">
      <el-pagination
        @size-change="getList"
        @current-change="getList"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[10,15,20]"
        :page-size.sync="page.size"
        :current-page.sync="page.current"
        :total="page.total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
// import { mobileValidator, passwordValidator } from '../../utils/validator'
// import { getCustomerType } from '@/utils/mixins/getCustomerType'
export default {
  data() {
    return {
      page: {
        size: 10,
        current: +this.$route.query.page || 1,
        total: 0
      },
      tableData:[]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      const res = await this.$request.formGet('/names/list',{
        page: this.page.current,
        pageSize: this.page.size,
        userId: this.$route.query.id
      })
      this.tableData = res.data.list
      this.page.total = res.data.count
    },
    async downLoad(rowData) {
      const res = await this.$request.instance(rowData.file_path)
      const a = document.createElement('a');
      a.download = rowData.show_name + '.xlsx';
      a.href= URL.createObjectURL(res);
      a.click()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/tablePage.scss';
.tablePage {
  height: 100%;
  display: flex;
  flex-direction: column;
  .nav {
    margin: 30px;
  }
  .table {
    flex: 1;
  }
  .pagination {
    margin: 20px;
  }
  .table {
    padding: 0 20px;
  }
}
</style>