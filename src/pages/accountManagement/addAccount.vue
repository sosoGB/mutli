<template>
  <div class="addAccount formPage" v-loading="loading">
    <div class="nav">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/main/accountManagement' }">账户权益</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/main/accountManagement/accountList' }">账户管理</el-breadcrumb-item>
        <el-breadcrumb-item>新增账户</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="form">
      <el-form :model="formData" :rules="rules" ref="accountForm" label-width="100px" label-position="left">
        <el-form-item label="客户名称：" prop="name">
          <el-input v-model="formData.name" placeholder="请输入客户名称"></el-input>
        </el-form-item>
        <el-form-item label="手机号：" prop="mobile">
          <el-input v-model="formData.mobile" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item label="客户类型：" prop="type">
          <el-select v-model="formData.type" placeholder="请选择客户类型">
            <el-option v-for="type in customerTypes" :key="type.value" :label="type.label" :value="type.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色名称" prop="role_id">
          <el-select v-model="formData.role_id" placeholder="请选择角色名称">
            <el-option v-for="type in roleList" :key="type.id" :label="type.role_name" :value="type.id">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="附加服务：" prop="addService">
          <el-radio-group v-model="formData.addService" size="medium">
            <el-radio-button label="0">无</el-radio-button>
            <el-radio-button label="1">商机线索</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="号码校验：" prop="verify_mobile">
          <el-radio-group v-model="formData.verify_mobile" size="medium">
            <el-radio-button :label="1">开启</el-radio-button>
            <el-radio-button :label="2">关闭</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="接口数据：" prop="list_upload">
          <el-radio-group v-model="formData.list_upload" size="medium">
            <el-radio-button :label="1">开启</el-radio-button>
            <el-radio-button :label="0">关闭</el-radio-button>
          </el-radio-group>
        </el-form-item> -->
        <el-divider></el-divider>
        <el-form-item label="生效时间：" prop="effective_time">
          <el-radio-group v-model="effectiveType">
            <el-radio label="0">立即生效</el-radio>
            <el-radio label="1">定时生效</el-radio>
          </el-radio-group>
          <el-date-picker style="margin-left:20px" v-model="formData.effective_time" :disabled="effectiveType === '0'" type="datetime" :picker-options="pickerOptions" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="有效时长：" prop="due">
          <el-select v-model="formData.due">
            <el-option label="7天" value="7天"></el-option>
            <el-option label="1个月" value="1个月"></el-option>
            <el-option label="1年" value="1年"></el-option>
            <el-option label="2年" value="2年"></el-option>
          </el-select>
        </el-form-item>
        <el-divider></el-divider>
        <el-form-item label="密码设置：" prop="password" class="codeset">
          <el-radio-group v-model="passwordType">
            <el-radio label="0">手机尾号（后八位）</el-radio>
            <el-radio label="1">自定义密码</el-radio>
          </el-radio-group>
          <el-input style="margin-left:20px" show-password v-model="formData.password" :disabled="passwordType === '0'" placeholder="8位或以上字母加数字">
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="footer">
      <el-button type="primary" @click="submitAdd">保存</el-button>
      <el-button plain @click="goback">取消</el-button>
    </div>
  </div>
</template>

<script>
import { mobileValidator, passwordValidator } from '../../utils/validator'
import { getCustomerType } from '@/utils/mixins/getCustomerType'
export default {
  mixins: [getCustomerType],
  data () {
    return {
      roleList: [],
      loading: false,
      rules: {
        name: [{ required: true, message: '请输入客户名称', trigger: 'blur' }],
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: mobileValidator, trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择客户类型', trigger: 'change' }
        ],
        due: [{ required: true, message: '请选择有效时长', trigger: 'change' }],
        password: [{ validator: passwordValidator, trigger: 'blur' }],
        role_id: [
          { required: true, message: '请选择角色名称', trigger: 'change' }
        ]
      },
      effectiveType: '0', // 0立即生效 1定时生效
      passwordType: '0', // 0手机尾号 1自定义
      formData: {
        name: '',
        mobile: '',
        type: '',
        effective_time: '',
        role_id: '',
        // verify_mobile: 1, //号码校验 1校验 2不校验
        due: '',
        password: ''
      },
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      }
    }
  },
  created () {
    this.getRoleList()
  },
  watch: {
    passwordType (val) {
      if (val === '0') {
        this.formData.password = ''
        this.$refs.accountForm.clearValidate()
      }
    },
    effectiveType (val) {
      if (val === '0') {
        this.$refs.accountForm.clearValidate()
      }
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
  methods: {
    goback () {
      // $router.push('/main/accountManagement/accountList')
      this.$router.push({
        path: '/main/accountManagement/accountList',
        query: {
          search: this.$route.query.fromSearch,
          page: this.$route.query.fromPage
        }
      })
    },
    async getRoleList () {
      // 获取角色列表
      const url = '/one/role/getRoles'
      const res = await this.$request.jsonGet(url)
      if (res.code == 0) {
        this.roleList = res.data
      }
    },
    // 提交新增
    submitAdd () {
      this.$refs.accountForm.validate(async (valid) => {
        const validRes = this.beforeSubmit()
        if (!valid || !validRes) {
          return
        }
        this.loading = true
        let res = await this.$request.jsonPost('/user/create', {
          name: this.formData.name,
          mobile: this.formData.mobile,
          type: this.formData.type,
          effective_time:
            this.effectiveType == '0' ? '' : this.formData.effective_time,
          due: this.formData.due,
          password: this.password == '0' ? '' : this.formData.password,
          role_id: this.formData.role_id
        })
        this.loading = false
        if (res.code == 0) {
          this.$message.success('新增成功')
          this.$router.push({ path: '/main/accountManagement' })
        }
      })
    },
    // 校验生效时间和密码
    beforeSubmit () {
      if (this.effectiveType == 1 && !this.formData.effective_time) {
        this.$message.error('请选择生效时间')
        return false
      }
      if (this.passwordType == 1 && !this.formData.password) {
        this.$message.error('请输入自定义密码')
        return false
      }
      return true
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/formPage.scss";
.codeset {
  /deep/.el-form-item__error {
    left: 260px;
  }
}
</style>
