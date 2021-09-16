<template>
  <div class="login">
    <div class="bar-left"></div>
    <div class="content">
      <img src="@/assets/image/logo_deep.png" class="logo">
      <div class="slogan">
        <p class="slogan-title">全球保险机器人开创者</p>
        <p class="slogan-subtitle">文本机器人 · 语音机器人 · 人机协作</p>
        <p class="slogan-primary">专业 · 快速</p>
      </div>
      <el-form :model="loginFormData" ref="loginForm" :rules="loginFormRules" :class="{active: true}" class="form-login">
        <div class="row-title">
          多服务自动外呼平台
        </div>
        <div class="row-logo">
          <img src="@/assets/image/qibao.png">
        </div>
        <el-form-item prop="username">
          <el-input v-model="loginFormData.username" placeholder="手机账号/用户名" clearable></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="loginFormData.password" placeholder="密码" clearable></el-input>
        </el-form-item>
        <el-form-item prop="captcha">
          <div class="row-captcha">
            <el-input class="captcha" v-model="loginFormData.captcha" @keyup.enter.native="handleLogin" placeholder="验证码" clearable></el-input>
            <el-tooltip effect="dark" content="点击刷新" placement="top">
              <captcha class="canvas" :identifyCode="targetCaptcha" @click.native="refreshCaptcha"></captcha>
            </el-tooltip>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleLogin">登录</el-button>
        </el-form-item>
      </el-form>
      <div class="decoration-left"></div>
      <div class="decoration-right"></div>
    </div>
    <div class="bar-right"></div>
  </div>
</template>
<script>
import captcha from "@/components/captcha";
export default {
  components: {
    captcha
  },
  data () {
    return {
      targetCaptcha: "", // 生成的验证码
      loginFormData: {
        username: "", // 用户名
        password: "", // 密码
        captcha: "" // 用户所输验证码
      },
      loginFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" }
        ],
        captcha: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 4, message: "长度在 4 个字符", trigger: "blur" }
        ]
      }
    };
  },
  created () {
    this.refreshCaptcha();
  },
  methods: {
    // 点击登录
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (!valid) {
          return
        }
        if (this.loginFormData.captcha !== this.targetCaptcha) {
          this.$message.error('验证码输入错误');
          return
        }
        this.$request.jsonLogin('sdmulti/qbzz/login', {
          mobile: this.loginFormData.username,
          password: this.loginFormData.password
        }).then(res => {
          if (res.code === '0') {
            this.$store.commit('saveUserInfo', res.data)
            this.$router.push({ path: '/main/' })
          }
        })
      })
    },
    // 刷新验证码
    refreshCaptcha () {
      let numbers = '0123456789';
      let targetCaptcha = '';
      for (let i = 0; i < 4; i++) {
        let index = Math.floor(Math.random() * 10);
        targetCaptcha += numbers[index];
      }
      this.targetCaptcha = targetCaptcha;
    }
  }
};
</script>
<style lang="scss" scoped>
$bgColor: rgba(247, 247, 247, 1);
.login {
  height: 100%;
  display: flex;
  align-items: stretch;
  .bar-left {
    flex: 1;
    background: linear-gradient(rgba(46, 0, 139, 0.08) 0%, $bgColor 33%);
  }
  .content {
    flex: 6;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: $bgColor;
    position: relative;
  }
  .logo {
    position: absolute;
    height: 25px;
    top: 50px;
    left: 50px;
  }
  .slogan {
    margin: 0 20px 90px 50px;
    .slogan-title {
      color: rgba(35, 35, 35, 1);
      font-weight: bolder;
      font-size: 30px;
      letter-spacing: 0.4ch;
    }
    .slogan-subtitle {
      margin: 10px 0 30px;
      color: rgba(126, 126, 126, 1);
      font-size: 18px;
    }
    .slogan-primary {
      color: $themeColor;
      font-weight: bold;
      font-size: 24px;
    }
  }
  .form-login {
    background: #fff;
    margin-right: -120px;
    border-radius: 12px;
    z-index: 1;
    padding: 50px 60px;
    min-height: 500px;
    &:not(.active) {
      opacity: 0;
    }
    &.active {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      z-index: 3;
      mask: url("~@/assets/image/star.svg") center no-repeat;
      mask-size: 320%;
      animation: maskStarIn 1s both;
      @keyframes maskStarIn {
        from {
          -webkit-mask-size: 0;
        }
        to {
          -webkit-mask-size: 320%;
        }
      }
    }
    .el-form-item {
      width: 320px;
    }
    .el-button {
      width: 100%;
      border-radius: 24px;
      font-size: 18px;
    }
    .row-captcha {
      display: flex;
      align-items: center;
    }
    .captcha {
      flex: 1;
    }
    .canvas {
      margin-left: 8px;
      height: 40px;
      cursor: pointer;
    }
    .row-title {
      color: #232323;
      font-weight: bold;
      font-size: 20px;
      text-align: center;
      padding-bottom: 10px;
      position: relative;
      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: calc(50% - 15px);
        width: 30px;
        height: 4px;
        background: $themeColor;
        border-radius: 2px;
      }
    }
    .row-logo {
      margin: 20px 0 30px;
      text-align: center;
      > img {
        height: 75px;
      }
    }
  }
  .decoration-left {
    position: absolute;
    top: 20px;
    left: -30px;
    height: 120px;
    width: 60px;
    background-image: radial-gradient(circle, #ececec 30%, #ffffff 30%);
    background-size: 20px 20px;
    background-repeat: repeat;
    mix-blend-mode: multiply;
  }
  .decoration-right {
    position: absolute;
    bottom: 20px;
    right: -30px;
    height: 120px;
    width: 60px;
    background-image: radial-gradient(
      circle,
      lighten($themeColor, 50%) 30%,
      #ffffff 30%
    );
    background-size: 20px 20px;
    background-repeat: repeat;
    mix-blend-mode: multiply;
  }
  .bar-right {
    flex: 3;
    background: $themeColor;
  }
}
</style>