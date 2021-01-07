<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/img/car.png" alt="" style="filter:brightness(150%);">
        <span class="title">国家车辆事故视频信息数据库</span>
      </div>
      <el-dropdown>
        <span class="el-dropdown-link">
          {{this.userInfoList.username}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="showProFileDialog">账户信息</el-dropdown-item>
          <el-dropdown-item @click.native="changPwdDialogVisible = true">修改密码</el-dropdown-item>
          <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse? '64px' : '200px'">
        <div class="toggle-button" style="color:#fff" @click="toggleCollapse">|||</div>
        <!-- 侧边栏菜单区 -->
        <el-menu background-color="#324157" text-color="#BFCBC0" active-text-color="#349beb" :collapse="isCollapse" :collapse-transition="false" router :default-active="activePath">
          <!-- 一级菜单 -->
          <el-menu-item v-for="(item,index) in menulist" :key="index" :index="'/' + item.path">
            <!-- 图标 -->
            <i :class="item.icon" style="color:#fff"></i>
            <!-- 文本 -->
            <span slot="title" class="menuName">{{item.menuName}}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 右侧主体 -->
      <el-main>
        <router-view>
        </router-view>
      </el-main>
    </el-container>
    <!-- 底部区域 -->
    <foot-bar></foot-bar>

    <!-- 个人信息对话框 -->
    <el-dialog title="账户信息" :visible.sync="profileDialogVisible" width="30%">
      <el-form ref="userInfoRef" :model="userInfoList" label-width="80px" v-if="Object.keys(userInfoList).length !== 0">
        <el-form-item label="用户名">
          <el-input v-model="userInfoList.username"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="userInfoList.telephone" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="userInfoList.email"></el-input>
        </el-form-item>
        <el-form-item label="站点">
          <el-input v-model="userInfoList.site.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="账户类型">
          <el-input v-model="userInfoList.roles[0].description" disabled></el-input>
        </el-form-item>
        <el-form-item label="个人简介">
          <el-input v-model="userInfoList.description"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="profileDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeUserInfo">修 改</el-button>
      </span>
    </el-dialog>

    <!-- 修改密码对话框 -->
    <el-dialog title="修改密码" :visible.sync="changPwdDialogVisible" width="30%">
      <el-form :model="pwdForm" status-icon :rules="pwdFormRules" ref="pwdFormRef" label-width="100px">
        <el-form-item label="旧密码" prop="oldpass">
          <el-input type="password" v-model="pwdForm.oldpass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="pwdForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="pwdForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="changePwdDialogCancel">取 消</el-button>
        <el-button type="primary" @click="changUserPwd">确 定</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>

<script>
import FootBar from '../components/common/FootBar.vue'
export default {
  components: { FootBar },
  data() {
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
        // password 是表单上绑定的字段
      } else if (value !== this.pwdForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      // 左侧菜单数据
      menulist: [
        {
          id: 1,
          menuName: '新建案例数据',
          icon: 'iconfont iconxinjian',
          path: 'newcase',
        },
        { id: 2, menuName: '系统数据统计', icon: 'iconfont iconshujuzonglan', path: 'statistic' },
        {
          id: 3,
          menuName: '数据总览',
          icon: 'iconfont iconxitongguanli',
          path: 'total',
        },
        {
          id: 5,
          menuName: '管理用户',
          icon: 'iconfont iconguanliyonghuguanli',
          path: 'manager',
        },
        {
          id: 6,
          menuName: '管理站点',
          icon: 'iconfont iconchuangjianyonghu',
          path: 'site',
        },
        {
          id: 7,
          menuName: '分配权限',
          icon: 'iconfont iconxinjian',
          path: 'assign',
        },
        {
          id: 8,
          menuName: '数据导出',
          icon: 'iconfont iconxinjian',
          path: 'export',
        },
        {
          id: 9,
          menuName: '案例审核',
          icon: 'iconfont iconmulu',
          path: 'review',
        },
      ],
      isCollapse: false,
      // 被激活的链接地址
      activePath: '',
      profileDialogVisible: false,
      userInfoList: [],
      changPwdDialogVisible: false,
      pwdForm: {
        oldpass: '',
        pass: '',
        checkPass: '',
      },

      pwdFormRules: {
        oldpass: [
          { required: true, message: '请输入旧密码', trigger: 'blur' },
          { min: 6, message: '密码长度至少6位', trigger: 'blur' },
        ],
        pass: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 6, message: '密码长度至少6位', trigger: 'blur' },
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: 'blur' },
        ],
      },
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    async logout() {
      const res = await this.$http.post('auth/logout')
      if (res.status !== 200 || res.data.code !== 200) {
        this.$message.error('退出失败')
      }
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // 菜单折叠与展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    //保存链接的激活状态
    saveNavState(activePath) {
      window.sessionStorage.setItem('activePath', activePath),
        (this.activePath = activePath)
    },
    showProFileDialog() {
      this.profileDialogVisible = true
    },
    /*
     **
     */
    async getUserInfo() {
      const { data: res } = await this.$http.get('user')
      if (res.code !== 200) {
        this.$message.error('获取用户信息失败res.data')
      }
      this.userInfoList = res.data
    },
    async changeUserInfo() {
      const res = await this.$http.put('user', {
        description: this.userInfoList.description,
        email: this.userInfoList.email,
        username: this.userInfoList.username,
      })
      if (res.status !== 200 || res.data.code !== 200) {
        this.$message.error('修改信息失败')
      }
      this.$message.success('修改信息成功')
      this.getUserInfo()
      this.profileDialogVisible = false
    },
    changePwdDialogCancel() {
      this.$refs.pwdFormRef.resetFields()
      this.changPwdDialogVisible = false
    },
    changUserPwd() {
      this.$refs.pwdFormRef.validate(async (valid) => {
        if (!valid) return
        const res = await this.$http.put('user/password', {
          newPassword: this.pwdForm.pass,
          oldPassword: this.pwdForm.oldpass,
        })
        console.log(this.pwdForm.oldpass)
        console.log(res)
        if (res.status !== 200 || res.data.code !== 200) {
          return this.$message.error('修改密码失败')
        }
        this.logout()
        this.$message.success('修改成功，请重新登录')
        this.changPwdDialogVisible = false
      })
    },
  },
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-left: 10px;
    background-color: #273144;
  }
  background-color: #273144;
  display: flex;
  justify-content: space-between;
  padding: 0;
  align-items: center;
  color: #fff;
  font-size: 16px;
  height: 50px !important;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #fff;
    padding-right: 20px;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
}
.el-aside {
  background-color: #324157;
  .el-menu {
    border-right: none;
  }
}
.el-main {
  background-color: #eaedf1;
  padding-bottom: 0;
}

.iconfont {
  margin-right: 10px;
}
.toggle-button {
  background-color: #324157;
  font-size: 10px;
  line-height: 24px;
  color: #000000;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
.title {
  font-size: 18px;
}
.menuName {
  font-size: 16px;
}
</style>