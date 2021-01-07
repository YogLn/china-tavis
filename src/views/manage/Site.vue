<template>
  <div>
    <!-- 面包屑导航区域 -->
    <breadcrumb title="管理站点"></breadcrumb>

    <el-card>
      <el-row :gutter="20">
        <el-col :span="4">
          <el-button type="primary" @click="addSiteDialogVisible = true">添加站点</el-button>
        </el-col>
      </el-row>

      <el-table :data="siteList" style="width: 100%" :default-sort="{prop: 'siteList.id', order: 'ascending'}" stripe border>
        <el-table-column prop="id" label="站点id" sortable width="100px">
        </el-table-column>
        <el-table-column prop="name" label="站点名称" sortable>
        </el-table-column>
        <el-table-column prop="description" label="站点描述">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="getSiteInfo(scope.row.id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteSite(scope.row.id)"></el-button>
            <el-button type="success" size="mini" @click="getUser(scope.row.id)">所有用户</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 修改站点对话框 -->
    <el-dialog title="修改站点" :visible.sync="editSiteDialogVisible" width="30%">
      <el-form ref="editSiteFormRef" :model="editSiteForm" label-width="80px">
        <el-form-item label="站点id">
          <el-input v-model="editSiteForm.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="站点名称">
          <el-input v-model="editSiteForm.name"></el-input>
        </el-form-item>
        <el-form-item label="站点描述">
          <el-input v-model="editSiteForm.description"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editSiteDialogClose">取 消</el-button>
        <el-button type="primary" @click="editSite">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 添加站点对话框 -->
    <el-dialog title="添加站点" :visible.sync="addSiteDialogVisible" width="30%">
      <el-form ref="addSiteFormRef" :rules="addSiteFormRules" :model="addSiteForm" label-width="100px">
        <el-form-item prop="name" label="站点名称">
          <el-input v-model="addSiteForm.name"></el-input>
        </el-form-item>
        <el-form-item label="站点描述">
          <el-input v-model="addSiteForm.description"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addSiteDialogClosed()">取 消</el-button>
        <el-button type="primary" @click="addSite()">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 所有用户对话框 -->
    <el-dialog title="所有用户信息" :visible.sync="allUserDialogVisible" width="80%">

      <el-table :data="userList" border stripe style="width: 100%" v-if="userList">
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
      </el-table>

      <!-- 分页区域 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="this.queryInfo.pageNo" :page-sizes="[1, 2, 5, 10]" :page-size="this.queryInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper" :total="totalCount" background>
      </el-pagination>
      <span slot="footer" class="dialog-footer">
        <el-button type="info" @click="allUserDialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Breadcrumb from '../../components/common/Breadcrumb.vue'
export default {
  components: {
    Breadcrumb,
  },
  data() {
    return {
      siteList: [],
      editSiteDialogVisible: false,
      editSiteForm: {
        description: '',
        id: 0,
        name: '',
      },
      userList: [],
      queryInfo: {
        pageNo: 0,
        pageSize: 0,
      },
      totalCount: 0,
      addSiteDialogVisible: false,
      addSiteForm: {
        description: '',
        name: '',
      },
      addSiteFormRules: {
        name: [{ required: true, message: '站点名不能为空', trigger: 'blur' }],
      },
      allUserDialogVisible: false,
      siteId: '',
    }
  },
  created() {
    this.getSiteList()
  },
  methods: {
    async getSiteList() {
      const res = await this.$http.get('site/list')
      this.siteList = res.data.data
    },
    async getSiteInfo(id) {
      const res = await this.$http.get(`site/${id}`)
      this.editSiteForm = res.data.data
      this.editSiteDialogVisible = true
    },
    editSiteDialogClose() {
      this.$refs.editSiteFormRef.resetFields()
      this.editSiteDialogVisible = false
    },
    async editSite() {
      const res = await this.$http.put('site', this.editSiteForm)
      if (res.status !== 200 || res.data.code !== 200) {
        this.$message.error('修改站点信息失败')
      }
      this.$message.success('修改站点信息成功')
      this.editSiteDialogVisible = false
      this.getSiteList()
    },
    async deleteSite(id) {
      const confirmResult = await this.$confirm('永久删除该站点?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).catch((err) => err)
      // 如果用户确认删除，返回字符串 confirm
      // 如果用户取消删除，返回字符串 cancle
      //console.log(confirmResult)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }
      const res = await this.$http.delete(`site/${id}`)
      console.log(res)
      if (res.status !== 200 || res.data.code !== 200) {
        this.$message.error('删除站点失败')
      }
      this.$message.success('删除站点成功')
      this.getSiteList()
    },
    async getUser(id) {
      this.siteId = id
      const res = await this.$http.get(`site/user/${id}`, {
        params: this.queryInfo,
      })
      if (res.data.code !== 200 || res.status !== 200) {
        this.$message.error('获取所有用户失败')
      }
      this.userList = res.data.data.data
      this.queryInfo.pageNo = res.data.data.pageNo
      this.queryInfo.pageSize = res.data.data.pageSize
      this.totalCount = res.data.data.totalCount
      this.allUserDialogVisible = true
    },
    showAddSiteDialog() {},
    addSiteDialogClosed() {
      this.$refs.addSiteFormRef.resetFields()
      this.addSiteDialogVisible = false
    },
    addSite() {
      this.$refs.addSiteFormRef.validate(async (valid) => {
        if (!valid) {
          return
        }
        const res = await this.$http.post('site', this.addSiteForm)
        console.log(res)
        if (res.data.code !== 200 || res.status !== 200) {
          this.$message.error('添加站点失败')
        }
        this.$message.success('添加站点成功')
        this.getSiteList()
        this.addSiteDialogVisible = false
      })
    },
    async handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize
      this.getUser(this.siteId)
    },
    async handleCurrentChange(newPageNo) {
      this.queryInfo.pageNo = newPageNo
      this.getUser(this.siteId)
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
</style>