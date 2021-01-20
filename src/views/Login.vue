<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 标题区 -->
      <div class="title">
        <div class="name">
          中国道路交通事故视频信息系统
        </div>
        <div class="description">
          请登录
        </div>
      </div>
      <!-- 登录表单区 -->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" class="login_form" v-loading="loading">
        <!-- 用户名 -->
        <el-form-item prop="telephone">
          <el-input v-model="loginForm.telephone" prefix-icon="iconfont iconuser" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" prefix-icon="iconfont iconpwd" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item prop="code" class="loginCode">
          <el-input v-model="loginForm.code" placeholder="验证码"></el-input>
          <div class="imgCode" @click="getCode">
            <img :src="captchaImg" alt="换一张">
          </div>
        </el-form-item>
        <!-- 按钮 -->
        <el-checkbox v-model="checked" @change="rememberMe" class="remember-me">记住我?</el-checkbox>
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <foot-bar></foot-bar>
  </div>
</template>

<script>
import FootBar from '../components/common/FootBar'
export default {
  components: {
    FootBar,
  },
  created() {
    this.getCode()
  },
  data() {
    // 验证手机号的校验规则
    var checkMobile = (rule, value, cb) => {
      // 验证手机号的正则表达式
      const regMobile = /^1[3|4|5|7|8|9][0-9]{9}$/
      if (regMobile.test(value)) {
        return cb()
      }
      cb(new Error('请输入合法的手机号'))
    }
    return {
      loading: false,
      checked: false,
      // 这是表单的数据绑定对象
      loginForm: {
        telephone: '',
        password: '',
        rememberMe: false,
        code: '',
      },
      // 验证码图片
      captchaImg: '',
      // 这是表单的验证规则对象
      loginFormRules: {
        //验证用户名是否合法
        telephone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' },
        ],
        //验证密码是否合法
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 3,
            max: 15,
            message: '长度在 3 到 15 个字符',
            trigger: 'blur',
          },
        ],
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
      },
    }
  },
  methods: {
    // 获取验证码
    async getCode() {
      let res = await this.$http.get('auth/captcha', {
        responseType: 'blob',
      })
      this.captchaImg = window.URL.createObjectURL(res.data)
    },
    rememberMe(e) {
      this.loginForm.rememberMe = e
    },
    // 点击重置表单
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields()
    },
    login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return
        this.loading = true
        try {
          const res = await this.$http.post('auth/login', this.loginForm)
          if (res.status !== 200 || res.data.code !== 200) {
            if (res.data.code === 500) {
              this.getCode()
              this.loading = false
              return this.$message.error('验证码失效或错误')
            } else {
              return this.$message.error('登录失败');
            }
          }
          this.loading = false
          this.$message.success('登录成功')
          window.sessionStorage.setItem('token', res.data.data)
          setTimeout(() => {
            this.$router.push('/home')
          }, 500)
        } catch (error) {
          console.log(error)
          this.getCode()
          this.loading = false
          return this.$message.error('账号或密码错误')
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
.login_container {
  background-image: url('../assets/img/login.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
  height: 100%;
  position: relative;
  display: flex;
}
.login_box {
  width: 290px;
  height: 350px;
  // background-color: #beceda;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 3px;
  position: absolute;
  left: calc(80% - 110px);
  top: calc(50% - 100px);
  .title {
    width: 100%;
    height: 15%;
    margin-top: 3%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    border-bottom: 1.6px solid #818679;
  }
  .name {
    font-size: 1.2em;
    font-family: 微软雅黑, serif;
    color: #818679;
  }
  .description {
    color: grey;
    font-family: 微软雅黑, serif;
    letter-spacing: 2.2px;
  }
}
.login_form {
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  margin-top: 20px;
  position: relative;
  .remember-me {
    position: absolute;
    left: 30px;
    margin-top: 8px;
    font-size: 20px;
  }
}
.loginCode {
  width: 120px;
  height: 70px;
  .el-input {
    width: 150px;
  }
}
.loginCode {
  width: 60%;
  height: 50px;
  margin-top: 8px;
}
.imgCode {
  width: 90px;
  height: 40px;
  position: absolute;
  margin-left: 110%;
  margin-top: -40px;
  cursor: pointer;
}
.imgCode img {
  width: 100%;
  height: 100%;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
.el-form-item {
  margin: 25px 0;
}
</style>
