<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 标题区 -->
      <div class="title">
        <div class="name">
          欢迎使用Road Traffic-ASD系统
        </div>
        <div class="description">
          请登录
        </div>
      </div>
      <!-- 登录表单区 -->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" class="login_form">
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
          <el-input v-model="loginForm.code"></el-input>
          <div class="imgCode">
            <img src="" alt="">
          </div>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="loginFooter">
      <span class="copyright">Copyright © 2019|蜀ICP备19013333号</span>
    </div>
  </div>
</template>

<script>
// import qs from 'qs'
export default {
  data() {
    // 验证手机号的校验规则
    var checkMobile = (rule, value, cb) => {
      // 验证手机号的正则表达式
      const regMobile = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
      if (regMobile.test(value)) {
        return cb()
      }
      cb(new Error('请输入合法的手机号'))
    }
    return {
      // 这是表单的数据绑定对象
      loginForm: {
        telephone: '18067078082',
        password: '123456',
        rememberMe: false,
        //code: '',
      },
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
      },
    }
  },
  methods: {
    // 点击重置表单
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields()
    },
    login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return
        //const { data: res } = await this.$http.post('login', this.loginForm)
        const res = await this.$http.post('auth/login', this.loginForm)
        if (res.status !== 200 || res.data.code !== 200) return this.$message.error('登录失败')
        this.$message.success('登录成功')
        window.sessionStorage.setItem('token', res.data.data)
        console.log(res.data);
        this.$router.push('/home')
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
  width: 380px;
  height: 450px;
  background-color: #beceda;
  border-radius: 3px;
  position: absolute;
  left: calc(80% - 200px);
  top: calc(50% - 225px);
  .title {
    width: 100%;
    height: 15%;
    margin-top: 5%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    border-bottom: 1.6px solid #818679;
  }
  .name {
    font-size: 1.3em;
    font-family: 微软雅黑, serif;
    color: #818679;
  }
  .description {
    color: grey;
    font-family: 微软雅黑, serif;
    letter-spacing: 2.5px;
  }
}
.login_form {
  width: 100%;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  margin-top: 40px;
}
.loginCode {
  width: 60%;
  height: 60px;
}
.loginCode {
  width: 60%;
  height: 50px;
  margin-top: 8px;
}
.imgCode {
  width: 105px;
  height: 45px;
  position: absolute;
  margin-left: 110%;
  margin-top: -50px;
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
  margin: 40px 0;
}
.loginFooter {
  width: 100%;
  height: 30px;
  position: fixed;
  display: flex;
  background-color: #e8eaed;
  bottom: 0;
  justify-content: center;
  align-items: center;
  .copyright {
    color: gray;
  }
}
</style>
