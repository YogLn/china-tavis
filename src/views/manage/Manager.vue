<template>
  <div>
    <!-- 面包屑导航区域 -->
    <breadcrumb title="管理用户"></breadcrumb>
    <el-card>

      <!-- 搜索区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.searchString" clearable @clear="getUserList">
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="showUserDialogVisable">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 表格区域 -->
      <el-table :data="userList" border stripe style="width: 100%" v-if="userList" max-height="480" v-loading="tableLoading">
        <el-table-column type="index" label="#">
        </el-table-column>
        <el-table-column prop="username" label="用户名">
        </el-table-column>
        <el-table-column prop="telephone" label="账号">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="180px">
        </el-table-column>
        <el-table-column prop="site" label="站点">
          <template slot-scope="scope">
            <div v-if="scope.row.site">
              {{scope.row.site.name}}
            </div>
            <div v-else>
              无
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="description" label="账户描述" width="150px">
        </el-table-column>
        <el-table-column prop="description" label="角色类型" width="100px">
          <template slot-scope="scope" v-if="scope.row.roles[0]">
            <div v-if="scope.row.roles[0].name==='ADMIN'">
              超级管理员
            </div>
            <div v-else-if="scope.row.roles[0].name==='AUDITOR'">
              审核员
            </div>
            <div v-else>
              采集员
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope" v-if="scope.row.roles[0]">
            <el-button :disabled="judge(scope.row)" type="primary" size="mini" icon="el-icon-edit" @click="showEditDialog(scope.row.id)"></el-button>
            <el-button :disabled="scope.row.roles[0].name==='ADMIN' ? true : false" type="danger" size="mini" icon="el-icon-delete" @click="deleteUser(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="this.queryInfo.pageNo" :page-sizes="[5, 10, 15, 20]" :page-size="this.queryInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper" :total="totalCount" background>
      </el-pagination>
      <!-- 注册新用户对话框 -->
      <el-dialog title="创建用户" :visible.sync="addUserDialogVisable" width="30%" @close="addUserClosed">
        <el-form ref="addUserRef" :model="addUserForm" label-width="100px" :rules="addUserFormRules">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="addUserForm.username"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="telephone">
            <el-input v-model="addUserForm.telephone"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="addUserForm.email"></el-input>
          </el-form-item>
          <el-form-item label="站点">
            <!-- 站点选择器 -->
            <el-select v-model="siteValue" :popper-append-to-body="false" placeholder="请选择" @change="getSelectSiteType">
              <el-option v-for="item in siteType" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用户角色" prop="roleId">
            <!-- 用户角色选择器 -->
            <el-select v-model="roleValue" :popper-append-to-body="false" placeholder="请选择" @change="getSelectRoleType">
              <el-option v-for="item in roleType" :key="item.id" :label="item.description" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="个人简介">
            <el-input v-model="addUserForm.description"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addUserDialogVisable=false">取 消</el-button>
          <el-button type="primary" @click="addUser">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 修改用户对话框 -->
      <el-dialog title="修改用户" :visible.sync="editUserDialogVisable" width="40%" @close="editUserClosed">
        <el-form ref="editUserRef" :model="editUserForm" label-width="100px" :rules="addUserFormRules" v-loading="editLoading">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="editUserForm.username"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="telephone">
            <el-input v-model="editUserForm.telephone"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="editUserForm.email"></el-input>
          </el-form-item>
          <el-form-item label="站点">
            <!-- 站点选择器 -->
            <el-select v-model="editSiteId" placeholder="请选择" @change="getSelectSiteType">
              <el-option v-for="item in siteType" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用户角色" prop="roleId">
            <!-- 用户角色选择器 -->
            <el-select v-model="editRoleValue" placeholder="请选择" @change="getSelectRoleType">
              <el-option v-for="item in roleType" :key="item.id" :label="item.description" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="个人简介">
            <el-input v-model="editUserForm.description"></el-input>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button type="warning" @click="resetPwd(resetPwdId)">重 置 密 码</el-button>
          <el-button @click="editUserClosed">取 消</el-button>
          <el-button type="primary" @click="editUser">修 改</el-button>
        </span>

      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import Breadcrumb from '../../components/common/Breadcrumb.vue'
export default {
  components: {
    Breadcrumb,
  },
  created() {
    this.getMyInfo()
    this.getUserList()
    this.getSiteList()
    this.getRoleList()
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
    var checkEmail = (rule, value, cb) => {
      // 验证邮箱的正则表达式
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
      if (regEmail.test(value)) {
        return cb()
      }
      cb(new Error('请输入合法的邮箱'))
    }
    return {
      myId: '',
      addUserDialogVisable: false,
      addUserForm: {
        description: '',
        email: '',
        roleId: 1,
        siteId: 0,
        telephone: '',
        username: '',
      },
      addUserFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 2,
            max: 10,
            message: '用户名的长度在2~10字符之间',
            trigger: 'blur',
          },
        ],
        telephone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' },
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' },
        ],
        roleId: [{ required: true, message: '请选角色类型', trigger: 'blur' }],
      },
      queryInfo: {
        pageNo: 1,
        pageSize: 10,
        searchString: '',
      },
      totalCount: 0,
      userList: [],
      siteType: [],
      siteValue: '无',
      roleType: [],
      roleValue: '超级管理员',
      editUserDialogVisable: false,
      editSiteId: '',
      editUserForm: {
        description: '',
        email: '',
        id: 0,
        roleId: 0,
        siteId: 0,
        telephone: '',
        username: '',
      },
      editSiteValue: '',
      editRoleValue: '',
      resetPwdId: 0,
      tableLoading: false,
      editLoading: false,
    }
  },
  methods: {
    async getMyInfo() {
      const { data: res } = await this.$http.get('user')
      if (res.code !== 200) {
        this.$message.error('获取用户信息失败')
      }
      this.myId = res.data.id
    },
    resetAddUserForm() {
      this.$refs.addUserRef.resetFields()
    },
    async getUserList() {
      this.tableLoading = true
      const { data: res } = await this.$http.get('manager/user/list', {
        params: this.queryInfo,
      })
      if (res.code !== 200) {
        return this.$message.error('获取用户列表失败')
      }
      this.queryInfo.pageNo = res.data.pageNo
      this.queryInfo.pageSize = res.data.pageSize
      this.totalCount = res.data.totalCount
      this.userList = res.data.data
      this.tableLoading = false
    },
    judge(obj) {
      if (obj.roles[0].name === 'ADMIN') {
        if (this.myId === obj.id) {
          return false
        }
        return true
      }
      return false
    },
    showUserDialogVisable() {
      this.addUserDialogVisable = true
    },
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize
      this.getUserList()
    },
    handleCurrentChange(newPageNo) {
      this.queryInfo.pageNo = newPageNo
      this.getUserList()
    },
    addUserClosed() {
      this.$refs.addUserRef.resetFields()
      this.addUserDialogVisable = false
    },
    getSelectRoleType(roleValue) {
      this.addUserForm.roleId = roleValue
      this.editUserForm.roleId = roleValue
    },
    getSelectSiteType(siteValue) {
      this.addUserForm.siteId = siteValue
      this.editUserForm.siteId = siteValue
    },
    addUser() {
      this.$refs.addUserRef.validate(async (valid) => {
        if (!valid) {
          return
        }
        if (this.addUserForm.siteId == 0) {
          this.addUserForm.siteId = ''
        }
        const res = await this.$http.post(
          'manager/user/register',
          this.addUserForm
        )
        if (res.status !== 200 || res.data.code !== 200) {
          return this.$message.error(res.data.message)
        }
        this.addUserDialogVisable = false
        this.$message.success('添加成功')
        this.getUserList()
      })
    },
    async getSiteList() {
      const res = await this.$http.get('site/list')
      this.siteType.push(...res.data.data)
    },
    async getRoleList() {
      const res = await this.$http.get('manager/role/list')
      this.roleType = res.data.data
    },
    async deleteUser(id) {
      const confirmResult = await this.$confirm('永久删除该用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).catch((err) => err)
      // 如果用户确认删除，返回字符串 confirm
      // 如果用户取消删除，返回字符串 cancle
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }
      const res = await this.$http.delete(`manager/user/${id}`)
      if (res.status !== 200 || res.data.code !== 200) {
        this.$message.error('删除失败')
      }
      this.$message.success('删除成功')
      this.getUserList()
    },
    async showEditDialog(id) {
      this.editLoading = true
      const res = await this.$http.get(`manager/user/${id}`)
      this.resetPwdId = res.data.data.id
      this.editRoleValue = res.data.data.roles[0].description
      if (res.data.data.site) {
        this.editSiteValue = res.data.data.site.name
        this.editSiteId = res.data.data.site.name
      } else {
        this.editSiteValue = '无'
      }
      this.editUserForm.id = res.data.data.id
      this.editUserForm.description = res.data.data.description
      this.editUserForm.email = res.data.data.email
      this.editUserForm.roleId = res.data.data.roles[0].id
      if(res.data.data.site) {
        this.editUserForm.siteId = res.data.data.site.id
      }
      this.editUserForm.telephone = res.data.data.telephone
      this.editUserForm.username = res.data.data.username
      this.editUserDialogVisable = true
      this.editLoading = false
    },
    editUserClosed() {
      this.$refs.editUserRef.resetFields()
      this.editUserDialogVisable = false
    },
    async resetPwd(id) {
      const confirmResult = await this.$confirm('确认重置该用户密码?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).catch((err) => err)
      // 如果用户确认删除，返回字符串 confirm
      // 如果用户取消删除，返回字符串 cancle
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消重置')
      }
      const res = await this.$http.put(`manager/user/reset/${id}`)
      if (res.data.code !== 200 || res.status !== 200) {
        this.$message.error('重置密码失败')
      }
      this.editUserDialogVisable = false
      this.$message.success('重置密码成功')
    },
    async editUser() {
      const res = await this.$http.put('manager/user', this.editUserForm)
      if (res.status !== 200 || res.data.code !== 200) {
        return this.$message.error('修改失败')
      }
      
      this.getMyInfo()
      this.editUserDialogVisable = false
      this.getUserList()
      this.$message.success('修改成功')
    },
  },
}
</script>

<style lang="less" scoped>
/deep/.el-table th > .cell {
  text-align: center;
}
/deep/.el-table .cell {
  text-align: center;
}
// css
.selectinfo {
  .el-scrollbar {
    .el-scrollbar__wrap {
      .el-select-dropdown__list {
        margin-bottom: 12px;
        .el-select-dropdown__item {
          margin-bottom: 12px;
        }
      }
    }
  }
}
</style>