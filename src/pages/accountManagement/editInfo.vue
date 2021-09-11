<template>
  <div class="editInfo formPage">
    <div class="nav">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/main/accountManagement' }"
          >账户权益</el-breadcrumb-item
        >
        <el-breadcrumb-item
          :to="{ path: '/main/accountManagement/accountList' }"
          >账户管理</el-breadcrumb-item
        >
        <el-breadcrumb-item>资料编辑</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="form">
      <div class="section">
        <div>
          <span class="labelName">客户名称：</span>
          <el-input v-model="info.name"></el-input>
        </div>
        <div>
          <span class="labelName">手机号：</span>
          <span>{{ info.mobile }}</span>
        </div>
        <div>
          <span class="labelName">客户类型：</span>
          <span>{{ info.typeText }}</span>
        </div>
      </div>
      <!-- <div class="section">
        <div>
          <span class="labelName">附加服务：</span>
          <el-radio-group v-model="info.addService" size="medium">
            <el-radio-button label="0">无</el-radio-button>
            <el-radio-button label="1">商机线索</el-radio-button>
          </el-radio-group>
        </div>
        <div>
          <span class="labelName">号码校验：</span>
          <el-radio-group v-model="info.verify_mobile" size="medium">
            <el-radio-button :label="1">校验</el-radio-button>
            <el-radio-button :label="2">关闭</el-radio-button>
          </el-radio-group>
        </div>
        <div>
          <span class="labelName">接口数据：</span>
          <el-radio-group v-model="info.list_upload" size="medium">
            <el-radio-button :label="1">开启</el-radio-button>
            <el-radio-button :label="0">关闭</el-radio-button>
          </el-radio-group>
        </div>
      </div> -->
      <el-divider></el-divider>
      <div class="section">
        <div>
          <span class="labelName">生效时间：</span>
          <span>{{ info.effective_time }}</span>
        </div>
        <div>
          <span class="labelName">到期时间：</span>
          <span>{{ info.due_time }}</span>
        </div>
        <div>
          <span class="labelName">账户状态：</span>
          <span class="statusBasic" :class="statusClass"
            >●&nbsp;{{ info.statusText }}</span
          >
        </div>
      </div>
      <div class="renew">
        <span class="labelName">续期：</span>
        <el-radio-group v-model="due">
          <el-radio label="">不续期</el-radio>
          <el-radio label="7天">7天</el-radio>
          <el-radio label="1个月">1个月</el-radio>
          <el-radio label="1年">1年</el-radio>
          <el-radio label="2年">2年</el-radio>
          <el-radio label="自定义"
            >自定义
            <el-date-picker
              v-if="due === '自定义'"
              placeholder="请选择到期日期"
              value-format="yyyy-MM-dd"
              v-model="dueCustom"
              type="date"
              :picker-options="pickerOption"
            >
            </el-date-picker>
          </el-radio>
        </el-radio-group>
      </div>
      <el-divider></el-divider>
      <div class="section">
        <div>
          <span class="labelName">重置密码：</span>
          <el-button type="primary" plain @click="resetPassword"
            >重置密码</el-button
          >
        </div>
        <div>
          <span class="labelName">角色名称：</span>
          <el-select v-model="info.role_id" placeholder="请选择角色名称">
            <el-option
              v-for="type in roleList"
              :key="type.id"
              :label="type.role_name"
              :value="type.id"
            >
            </el-option>
          </el-select>
        </div>
      </div>
    </div>
    <div class="footer">
      <el-button type="primary" @click="submit">保存</el-button>
      <el-button
        plain
        @click="$router.push('/main/accountManagement/accountList')"
        >取消</el-button
      >
    </div>
  </div>
</template>

<script>
import util from '@/utils/filter.js'
export default {
  data() {
    return {
      roleList: [],
      info: {
        role_id: '',
        name: '',
        mobile: '',
        typeText: '',
        effective_time: '',
        due_time: '',
        statusText: ''
      },
      statusClass: '',
      statusClasses: ['status-ready', 'status-start', 'status-end'],
      due: '',
      dueCustom: null,
      isResetPass: '', // 是否重置密码，重置为yes
      pickerOption: {
        disabledDate: (current) => {
          return (
            util.formatDate(current, 'yyyy-MM-dd') <
            util.formatDate(Date.now(), 'yyyy-MM-dd')
          )
        }
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    if (
      (to.path === '/main/accountManagement/accountList' &&
        from.query.fromSearch &&
        to.query.search != from.query.fromSearch) ||
      (from.query.fromPage && to.query.page != from.query.fromPage)
    ) {
      next({
        path: to.path,
        query: {
          search: from.query.fromSearch,
          page: from.query.fromPage
        }
      })
    } else {
      next()
    }
  },
  created() {
    this.queryById()
    this.getRoleList()
  },
  methods: {
    async getRoleList() {
      // 获取角色列表
      const url = '/one/role/getRoles'
      const res = await this.$request.jsonGet(url)
      if (res.code == 0) {
        this.roleList = res.data
      }
    },
    // 根据id查询账户信息
    async queryById() {
      const res = await this.$request.formGet('/user/edit', {
        userId: this.$route.query.id
      })
      if (res.code === 0) {
        Object.keys(this.info).forEach((item) => {
          this.info[item] = res.data[item] || ''
        })
        this.statusClass = this.statusClasses[res.data.status]
      }
    },
    // 重置密码
    resetPassword() {
      this.$confirm(
        '重置密码为手机号后8位，原有密码将无法登录SaaS系统，请谨慎操作。保存后生效！',
        '确认要重置密码吗',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        this.isResetPass = 'yes'
      })
    },
    // 提交保存
    async submit() {
      const res = await this.$request.jsonPost('/user/edit', {
        userId: this.$route.query.id,
        name: this.info.name,
        due: this.due !== '自定义' ? this.due : this.dueCustom,
        isResetPass: this.isResetPass,
        role_id: this.info.role_id
      })
      if (res.code == 0) {
        this.$message.success('保存成功')
        this.$router.push({ path: '/main/accountManagement' })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/formPage.scss';
.editInfo {
  .labelName {
    font-weight: 700;
    display: inline-block;
    width: 90px;
    color: #333;
  }
  .form {
    .section {
      display: grid;
      grid-template-columns: repeat(3, 33.33%);
      align-items: center;
      margin-bottom: 40px;
    }
    .el-divider {
      margin: 50px 0;
    }
    .renew {
      display: flex;
      align-items: center;
      height: 40px;
      .el-date-editor {
        width: 160px;
        margin-left: 8px;
      }
    }
  }
  .statusBasic {
    font-size: 12px;
    letter-spacing: 2px;
    padding: 4px 16px;
    border-radius: 14px;
    line-height: 36px;
  }
  .status-ready {
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
}
</style>
