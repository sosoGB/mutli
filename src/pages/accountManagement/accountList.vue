<template>
  <div class="accountList tablePage">
    <div class="toolbar">
      <div class="tool-button">
        <el-button type="primary" plain @click="toAddPage">新增账户</el-button>
      </div>
      <div class="tool-search">
        <el-select
          v-model="search.status"
          clearable
          placeholder="请选择账户状态"
        >
          <el-option
            v-for="type in statusList"
            :key="type.value"
            :label="type.label"
            :value="type.value"
          >
          </el-option>
        </el-select>
        <el-select v-model="search.type" clearable placeholder="请选择客户类型">
          <el-option
            v-for="type in customerTypes"
            :key="type.value"
            :label="type.label"
            :value="type.value"
          >
          </el-option>
        </el-select>
        <el-input
          v-model.trim="search.keyword"
          suffix-icon="el-icon-search"
          @keyup.enter.native="getList"
          placeholder="请输入ID或名称或手机号"
        >
        </el-input>
        <el-button type="primary" @click="getList(1)">查询</el-button>
      </div>
    </div>
    <div class="table">
      <el-table :data="tableData" border height="100%">
        <el-table-column label="序号" type="index" align="center" width="50">
        </el-table-column>
        <el-table-column align="center" prop="id" width="80" label="客户ID">
        </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          width="180"
          label="客户名称"
        >
        </el-table-column>
        <el-table-column
          prop="mobile"
          align="center"
          width="140"
          label="手机号"
        >
        </el-table-column>
        <el-table-column
          prop="typeText"
          align="center"
          width="140"
          label="客户类型"
        >
        </el-table-column>
        <!-- <el-table-column
          prop="addService"
          align="center"
          width="140"
          label="附加服务"
        >
        </el-table-column> -->
        <el-table-column
          prop="role_name"
          align="center"
          width="140"
          label="角色名称"
        >
        </el-table-column>
        <el-table-column
          prop="create_time"
          align="center"
          width="210"
          label="创建时间"
        >
        </el-table-column>
        <el-table-column
          prop="effective_time"
          align="center"
          width="210"
          label="生效时间"
        >
        </el-table-column>
        <el-table-column
          prop="due_time"
          align="center"
          width="210"
          label="到期时间"
        >
        </el-table-column>
        <el-table-column width="140" align="center" label="账户状态">
          <template slot-scope="scope">
            <span
              class="statusBasic"
              :class="{
                'status-start': scope.row.status == 1,
                'status-end': scope.row.status == 2,
                'status-due': scope.row.status == 3
              }"
              >●&nbsp;{{ scope.row.statusText }}</span
            >
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          fixed="right"
          min-width="250"
          label="操作"
        >
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              content="资料编辑"
              placement="top"
            >
              <el-button size="small" @click="toEditPage(scope.row)"
                ><img src="@/assets/image/data-edit.png"
              /></el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="权益管理"
              placement="top"
            >
              <el-button size="small" @click="toPermissionPage(scope.row)"
                ><img src="@/assets/image/rights_management.png"
              /></el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="名单下载"
              placement="top"
              v-show="scope.row.list_upload"
            >
              <el-button size="small" @click="toListDownload(scope.row)"
                ><img src="@/assets/image/list_download.png"
              /></el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="查看权限"
              placement="top"
            >
              <el-button size="small" @click="toSeeAccess(scope.row)">
                <img src="@/assets/image/access.svg" />
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        @size-change="getList"
        @current-change="getList"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[10, 15, 20]"
        :page-size.sync="page.size"
        :current-page.sync="page.current"
        :total="page.total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { getCustomerType } from '@/utils/mixins/getCustomerType'
export default {
  mixins: [getCustomerType],
  data() {
    return {
      search: this.$route.query.search
        ? JSON.parse(this.$route.query.search)
        : {
            status: null,
            type: '',
            keyword: ''
          },
      statusList: [
        {
          label: '启用',
          value: 1
        },
        {
          label: '停用',
          value: 2
        },
        {
          label: '即将到期',
          value: 3
        }
      ],
      tableData: [],
      page: {
        size: 10,
        current: +this.$route.query.page || 1,
        total: 9
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 获取账户列表
    async getList(type) {
      if (type === 1) {
        // 1表示点击查询按钮，需要重置页码为第一页
        this.page.current = 1
      }
      const res = await this.$request.formGet('/user/list', {
        page: this.page.current,
        pageSize: this.page.size,
        status: this.search.status,
        type: this.search.type,
        keyword: this.search.keyword
      })
      this.tableData = res.data.list
      this.page.total = res.data.count
    },
    // 进入新增账户页面
    toAddPage() {
      this.$router.push({
        path: '/main/accountManagement/addAccount',
        query: {
          fromSearch: JSON.stringify(this.search),
          fromPage: this.page.current
        }
      })
    },
    // 进入资料编辑页面
    toEditPage(info) {
      this.$router.push({
        path: '/main/accountManagement/editInfo',
        query: {
          fromSearch: JSON.stringify(this.search),
          fromPage: this.page.current,
          id: info.id
        }
      })
    },
    // 进入权益管理页面
    toPermissionPage(info) {
      this.$router.push({
        path: '/main/accountManagement/permissionManagement',
        query: {
          fromSearch: JSON.stringify(this.search),
          fromPage: this.page.current,
          id: info.id
        }
      })
    },
    toListDownload(info) {
      this.$router.push({
        path: '/main/accountManagement/listDownLoad',
        query: {
          fromSearch: JSON.stringify(this.search),
          fromPage: this.page.current,
          id: info.id
        }
      })
    },
    toSeeAccess(info) {
      this.$router.push({
        path: '/main/accountManagement/seeAccess',
        query: {
          fromSearch: JSON.stringify(this.search),
          fromPage: this.page.current,
          id: info.role_id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/tablePage.scss';
.statusBasic {
  font-size: 12px;
  letter-spacing: 2px;
  padding: 4px 16px;
  border-radius: 14px;
  line-height: 36px;
}
.status-due {
  background: rgba(212, 107, 8, 0.1);
  color: #d46b08;
}
.status-start {
  background: rgba(82, 196, 26, 0.1);
  color: #52c41a;
}
.status-end {
  background: rgba(245, 34, 45, 0.1);
  color: #cf1322;
}
</style>
