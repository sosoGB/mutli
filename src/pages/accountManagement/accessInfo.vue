<template>
  <div class="access-info tablePage">
    <div class="nav">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/main/accountManagement' }"
          >账户权益</el-breadcrumb-item
        >
        <el-breadcrumb-item
          :to="{ path: '/main/accountManagement/accountList' }"
          >账户管理</el-breadcrumb-item
        >
        <el-breadcrumb-item>查看权限</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="form">
      <div class="config-t">
        <div class="header">
          <span class="divide"></span>
          <span>一账通</span>
        </div>
        <div class="table">
          <el-table border :data="crossData" :span-method="arraySpanMethod">
            <el-table-column label="模块" prop="module" width="200px">
              <template slot-scope="scope">
                <div>
                  <el-checkbox v-model="scope.row.moduleChecked" disabled>{{
                    scope.row.module
                  }}</el-checkbox>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="导航" prop="navigation" width="200px">
              <template slot-scope="scope">
                <div>
                  <el-checkbox v-model="scope.row.naviChecked" disabled>{{
                    scope.row.navigation
                  }}</el-checkbox>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="功能" prop="func" min-width="200px">
              <template slot-scope="scope">
                <el-checkbox
                  v-for="(item, index) in scope.row.func"
                  v-model="item.checked"
                  :key="index"
                  disabled
                >
                  {{ item.name }}
                </el-checkbox>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="config-t t2" v-show="voiceShow">
        <div class="header">
          <span class="divide"></span>
          <span>语音机器人</span>
        </div>
        <div class="table">
          <el-table border :data="voiceData" :span-method="objectSpanMethod">
            <el-table-column label="模块" prop="module" width="200px">
              <template slot-scope="scope">
                <div>
                  <el-checkbox v-model="scope.row.moduleChecked" disabled>{{
                    scope.row.module
                  }}</el-checkbox>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="导航" prop="navigation" width="200px">
              <template slot-scope="scope">
                <div>
                  <el-checkbox v-model="scope.row.naviChecked" disabled>{{
                    scope.row.navigation
                  }}</el-checkbox>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="功能" prop="func" min-width="200px">
              <template slot-scope="scope">
                <el-checkbox
                  v-for="(item, index) in scope.row.func"
                  v-model="item.checked"
                  :key="index"
                  disabled
                >
                  {{ item.name }}
                </el-checkbox>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div class="back-bar">
      <el-button size="small" type="primary" @click="goback">返回</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      firstIndex: 0,
      secondIndex: 0,
      id: this.$route.query.id,
      crossData: [
        // {
        //   module: '平台首页',
        //   navigation: '智能服务',
        //   moduleChecked: false,
        //   naviChecked: true,
        //   func: [
        //     {
        //       name: '文本机器人',
        //       checked: true
        //     },
        //     {
        //       name: '语音机器人',
        //       checked: true
        //     },
        //     {
        //       name: '车险机器人',
        //       checked: false
        //     },
        //     {
        //       name: '保单单证识别',
        //       checked: false
        //     }
        //   ]
        // },
        // {
        //   module: '用户中心',
        //   navigation: '企业账户管理',
        //   moduleChecked: false,
        //   naviChecked: true,
        //   func: []
        // },
        // {
        //   module: '用户中心',
        //   navigation: '个人信息设置',
        //   moduleChecked: false,
        //   naviChecked: true,
        //   func: []
        // },
        // {
        //   module: '用户中心',
        //   navigation: '余额管理',
        //   moduleChecked: false,
        //   naviChecked: true,
        //   func: []
        // },
        // {
        //   module: '服务订购',
        //   navigation: '服务订购',
        //   moduleChecked: false,
        //   naviChecked: true,
        //   func: [
        //     {
        //       name: '文本机器人',
        //       checked: true
        //     },
        //     {
        //       name: '语音机器人',
        //       checked: true
        //     },
        //     {
        //       name: '车险机器人',
        //       checked: false
        //     },
        //     {
        //       name: '保单单证识别',
        //       checked: false
        //     }
        //   ]
        // },
        // {
        //   module: '服务订购',
        //   navigation: '订购记录',
        //   moduleChecked: false,
        //   naviChecked: true,
        //   func: []
        // }
      ],
      voiceData: [
        // {
        //   module: '其他功能',
        //   navigation: '商机线索',
        //   moduleChecked: true,
        //   naviChecked: true,
        //   func: []
        // },
        // {
        //   module: '其他功能',
        //   navigation: '号码校验',
        //   moduleChecked: true,
        //   naviChecked: true,
        //   func: []
        // },
        // {
        //   module: '其他功能',
        //   navigation: '号码加密提示',
        //   moduleChecked: true,
        //   naviChecked: true,
        //   func: []
        // },
        // {
        //   module: '呼叫管理',
        //   navigation: '任务列表',
        //   moduleChecked: true,
        //   naviChecked: true,
        //   func: [{ name: '任务导出', checked: false }]
        // },
        // {
        //   module: '呼叫管理',
        //   navigation: '任务分析',
        //   moduleChecked: true,
        //   naviChecked: true,
        //   func: [
        //     { name: '任务导出', checked: false },
        //     { name: '热门话题导出', checked: false }
        //   ]
        // },
        // {
        //   module: '数据中心',
        //   navigation: '通话流水',
        //   moduleChecked: true,
        //   naviChecked: true,
        //   func: [
        //     { name: '流水导出', checked: false },
        //     { name: '批量录音下载', checked: false }
        //   ]
        // },
        // {
        //   module: '客户管理',
        //   navigation: '新增客户',
        //   moduleChecked: true,
        //   naviChecked: true,
        //   func: [
        //     { name: '单个导入', checked: false },
        //     { name: '批量导入', checked: false },
        //     { name: '接口数据', checked: false }
        //   ]
        // },
        // {
        //   module: '客户管理',
        //   navigation: '客户管理',
        //   moduleChecked: true,
        //   naviChecked: true,
        //   func: [
        //     { name: '导出客户', checked: false },
        //     { name: '删除客户', checked: false }
        //   ]
        // },
        // {
        //   module: '客户管理',
        //   navigation: '客户分析',
        //   moduleChecked: true,
        //   naviChecked: true,
        //   func: []
        // },
        // {
        //   module: '机器人管理',
        //   navigation: '机器人模板',
        //   moduleChecked: true,
        //   naviChecked: true,
        //   func: [
        //     { name: '机器人编辑', checked: false },
        //     { name: '机器人设置', checked: false }
        //   ]
        // },
        // {
        //   module: '线路管理',
        //   navigation: '线路管理',
        //   moduleChecked: true,
        //   naviChecked: true,
        //   func: []
        // },
        // {
        //   module: '线路管理',
        //   navigation: '呼叫路由',
        //   moduleChecked: true,
        //   naviChecked: true,
        //   func: [
        //     { name: '新增路由', checked: false },
        //     { name: '编辑路由', checked: false },
        //     { name: '删除路由', checked: false }
        //   ]
        // },
        // {
        //   module: '用户管理',
        //   navigation: '账号管理',
        //   moduleChecked: true,
        //   naviChecked: true,
        //   func: [
        //     { name: '新增账号', checked: false },
        //     { name: '账号编辑', checked: false },
        //     { name: '资源分配', checked: false },
        //     { name: '查看权限', checked: false },
        //     { name: '重置密码', checked: false }
        //   ]
        // },
        // {
        //   module: '用户管理',
        //   navigation: '角色管理',
        //   moduleChecked: true,
        //   naviChecked: true,
        //   func: [
        //     { name: '新增角色', checked: false },
        //     { name: '编辑角色', checked: false },
        //     { name: '权限分配', checked: false },
        //     { name: '查看权限', checked: false },
        //     { name: '删除角色', checked: false }
        //   ]
        // },
        // {
        //   module: '用户管理',
        //   navigation: '信息设置',
        //   moduleChecked: true,
        //   naviChecked: true,
        //   func: []
        // }
      ]
    }
  },
  computed: {
    voiceShow() {
      if (this.crossData && this.crossData.length) {
        return this.crossData[this.firstIndex].func[this.secondIndex].checked
      }
      return false
    },
    voiceId() {
      if (this.crossData && this.crossData.length) {
        return this.crossData[this.firstIndex].func[this.secondIndex].id
      }
      return ''
    }
  },
  // beforeRouteLeave(to, from, next) {
  //   if (
  //     (to.path === '/main/accountManagement/accountList' &&
  //       from.query.fromSearch &&
  //       to.query.search != from.query.fromSearch) ||
  //     (from.query.fromPage && to.query.page != from.query.fromPage)
  //   ) {
  //     next({
  //       path: to.path,
  //       query: {
  //         search: from.query.fromSearch,
  //         page: from.query.fromPage
  //       }
  //     })
  //   } else {
  //     next()
  //   }
  // },
  async created() {
    await this.getAllAccess()
    this.getRoleAccess()
  },
  methods: {
    goback() {
      this.$router.push({
        path: '/main/accountManagement/accountList',
        query: {
          search: this.$route.query.fromSearch,
          page: this.$route.query.fromPage
        }
      })
    },
    async getAllAccess() {
      const url = '/one/permission/getAll'
      const res = await this.$request.jsonGet(url)
      if (res.code == 0) {
        this.crossData = this.getFilterData(res.data)
      }
    },
    async getRoleAccess() {
      const url = `/one/role/rolePermissions?id=${this.id}`
      if (!this.id) return
      const res = await this.$request.jsonGet(url)
      if (res.code == 0) {
        let ids = res.data
        this.crossData.forEach((e) => {
          let index0 = ids.indexOf(e.moduleId)
          if (index0 !== -1) {
            e.moduleChecked = true
            let index1 = ids.indexOf(e.navId)
            if (index1 !== -1) {
              e.naviChecked = true
              ids.splice(index1, 1)
              e.func.map((el) => {
                if (ids.includes(el.id)) {
                  el.checked = true
                  ids.splice(ids.indexOf(el.id), 1)
                }
              })
            }
          }
        })
        if (this.voiceShow) {
          this.voiceData.forEach((e) => {
            if (ids.includes(e.moduleId)) {
              e.moduleChecked = true
              if (ids.includes(e.navId)) {
                e.naviChecked = true
                e.func.map((el) => {
                  if (ids.includes(el.id)) {
                    el.checked = true
                  }
                })
              }
            }
          })
        }
      }
    },
    getFilterData(data) {
      const reData = []
      data.forEach((e) => {
        e.children.forEach((i, index) => {
          let func = [],
            hasV = false
          if (i.children && i.children.length) {
            func = i.children.map((f, idx) => {
              if (f.children) {
                hasV = true
                this.secondIndex = idx
                f.children = this.getFilterData(f.children)
                this.voiceData = f.children
              }
              return {
                ...f,
                checked: false
              }
            })
          }
          if (hasV) {
            this.firstIndex = index
          }
          reData.push({
            module: e.name,
            moduleId: e.id,
            navId: i.id,
            navigation: i.name,
            moduleChecked: false,
            naviChecked: false,
            func
          })
        })
      })
      return reData
    },
    getSpanNums(tableData) {
      let currentModuleId = tableData[0].moduleId,
        currentIndex = 0,
        indexArr = [0],
        spanNumsArr = []
      tableData.forEach((e, index) => {
        if (e.moduleId !== currentModuleId) {
          indexArr.push(index)
          spanNumsArr.push(index - currentIndex)
          currentIndex = index
          currentModuleId = e.moduleId
        }
        if (index === tableData.length - 1) {
          spanNumsArr.push(index - currentIndex + 1)
        }
      })
      return { indexArr, spanNumsArr }
    },
    arraySpanMethod({ rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        const { indexArr, spanNumsArr } = this.getSpanNums(this.crossData)
        let index = indexArr.indexOf(rowIndex)
        if (index !== -1) {
          return [spanNumsArr[index], 1]
        } else {
          return [0, 0]
        }
      }
    },
    objectSpanMethod({ rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        const { indexArr, spanNumsArr } = this.getSpanNums(this.voiceData)
        let index = indexArr.indexOf(rowIndex)
        if (index !== -1) {
          return [spanNumsArr[index], 1]
        } else {
          return [0, 0]
        }
      }
    }
  }
}
</script>
<style lang="scss">
// @import '@/assets/css/formPage.scss';
// @import '@/assets/css/tablePage.scss';
.el-checkbox__input.is-disabled + span.el-checkbox__label {
  color: #666;
}
.el-checkbox__input.is-disabled.is-checked .el-checkbox__inner::after {
  border-color: #999;
}
.access-info {
  padding: 0 20px 40px;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  .back-bar {
    position: absolute;
    bottom: 0px;
    left: 0;
    height: 40px;
    padding-left: 20px;
  }
}
.nav {
  margin: 20px 0;
}
.form {
  flex: 1;
  overflow: auto;
  display: flex;
  flex-direction: column;
  .config-t {
    display: flex;
    flex-direction: column;
    &.t2 {
      flex: 1;
    }
    .header {
      line-height: 40px;
      font-size: 14px;
      display: flex;
      flex-direction: row;
      align-items: center;
      .divide {
        height: 16px;
        width: 4px;
        margin-right: 8px;
        background-color: #2e008b;
      }
    }
    .table {
      height: auto;
      // height: calc(100% - 40px);
      // overflow: hidden;
      // flex: 1;
      // /deep/.el-table {
      //   height: 100%;
      //   /deep/ .el-table__body {
      //     overflow: scroll;
      //   }
      // }
    }
  }
}
</style>
