<template>
  <div>
    <breadcrumb title="分配案例"></breadcrumb>
    <el-card>
      <!-- table表单 -->
      <el-table :data="allAuditorList" stripe border style="width: 100%"  max-height="450" v-loading="tableLoading">
        <el-table-column type="index" label="#">
        </el-table-column>
        <el-table-column prop="username" label="用户名">
        </el-table-column>
        <el-table-column prop="telephone" label="电话号码">
        </el-table-column>
        <el-table-column prop="site" label="站点">
        </el-table-column>
        <el-table-column prop="roles" label="角色类型">
          审核员
        </el-table-column>
        <el-table-column prop="email" label="邮箱">
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="showAssignDialog(scope.row.id)">分 配</el-button>
            <el-button type="warning" size="mini" @click="showEditAssignDialog(scope.row.id)">修 改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination @size-change="handleSizeChange" background @current-change="handleCurrentChange" :current-page="query.pageNo" :page-sizes="[5, 10, 15, 20]" :page-size="100"
        layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
      </el-pagination>
    </el-card>
    <!-- 分配案例对话框 -->
    <el-dialog title="总体信息" :visible.sync="totalDialogVisible" width="80%">
      <el-table :data="Records" stripe border style="width: 100%" @selection-change="handleSelectionChange" max-height="450" v-loading="assignTableLoading">
        <el-table-column type="index" label="#">
        </el-table-column>
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="g1001" label="案例编号">
        </el-table-column>
        <el-table-column prop="g1002" label="鉴定委托号">
        </el-table-column>
        <el-table-column prop="g1003" label="参与方总数">
        </el-table-column>
        <el-table-column prop="g1004" label="事故形态">
        </el-table-column>
        <el-table-column prop="g1005" label="事故分类">
        </el-table-column>
        <el-table-column prop="g1006" label="障碍物类型">
        </el-table-column>
        <el-table-column prop="g1007" label="视频类型">
        </el-table-column>
        <el-table-column prop="g1008" label="参与方一视角下参与方二的行驶（走）方向">
        </el-table-column>
        <el-table-column prop="g1008" label="案例状态">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.status === 0">未分配</el-tag>
            <el-tag type="warning" v-else-if="scope.row.status === 1">待审核</el-tag>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleAssignSizeChange" @current-change="handleAssignPageChange" :current-page="accidentQuery.pageNo" :page-sizes="[5, 10, 15, 20]"
        :page-size="accidentQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="accidentTotal">
      </el-pagination>
      <span slot="footer" class="dialog-footer">
        <el-button @click="totalDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="distribution">分 配</el-button>
      </span>
    </el-dialog>
    <!-- 修改案例对话框 -->
    <el-dialog title="总体信息" :visible.sync="editDialogVisible" width="80%">
      <el-table :data="Unreviewed" stripe border style="width: 100%" @selection-change="handleEditSelectionChange" max-height="450" v-loading="unReviewTableLoading">
        <el-table-column type="index" label="#">
        </el-table-column>
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="g1001" label="案例编号">
        </el-table-column>
        <el-table-column prop="g1002" label="鉴定委托号">
        </el-table-column>
        <el-table-column prop="g1003" label="参与方总数">
        </el-table-column>
        <el-table-column prop="g1004" label="事故形态">
        </el-table-column>
        <el-table-column prop="g1005" label="事故分类">
        </el-table-column>
        <el-table-column prop="g1006" label="障碍物类型">
        </el-table-column>
        <el-table-column prop="g1007" label="视频类型">
        </el-table-column>
        <el-table-column prop="g1008" label="参与方一视角下参与方二的行驶（走）方向">
        </el-table-column>
        <el-table-column prop="g1008" label="案例状态">
          <el-tag type="warning">待审核</el-tag>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleEditSizeChange" @current-change="handleEditCurrentChange" :current-page="checkUserQuery.pageNo" :page-sizes="[5, 10, 15, 20]"
        :page-size="checkUserQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="showReAssignDialog = true">重 新 分 配</el-button>
      </span>
    </el-dialog>
    <!-- 重新分配 -->
    <el-dialog title="请选择重新分配的审核员" :visible.sync="showReAssignDialog" width="30%">
      <el-form :model="ReAssignForm" :rules="ReAssignFormRules" ref="ReAssignFormRef" label-width="100px">
        <el-form-item label="审核员" prop="username">
          <el-select v-model="ReAssignForm.username" placeholder="请选择">
            <el-option v-for="item in ReAssignFormList" :key="item.id" :label="item.username" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showReAssignDialog = false">取 消</el-button>
        <el-button type="primary" @click="editConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Breadcrumb from '../components/common/Breadcrumb.vue'
export default {
  components: { Breadcrumb },
  data() {
    return {
      allAuditorList: [],
      query: {
        pageNo: 1,
        pageSize: 10,
      },
      totalCount: 0,
      totalDialogVisible: false,
      Records: [],
      accidentQuery: {
        pageNo: 1,
        pageSize: 5,
        status: 0,
      },
      accidentTotal: 0,
      // 审核员id
      checkUserId: 0,
      selectList: [],
      accidentIds: [],
      checkUserQuery: {
        pageNo: 1,
        pageSize: 10,
        userId: '',
      },
      total: 0,
      editDialogVisible: false,
      // 未审核的案例
      Unreviewed: [],
      // 未审核用户的id
      checkUnreviewedUserId: 0,
      // 重新分配
      showReAssignDialog: false,
      ReAssignForm: {
        username: '',
      },
      ReAssignFormList: [],
      ReAssignFormRules: {
        username: [{ required: true, message: '请选择', trigger: 'blur' }],
      },
      optValue: '',
      selectEditList: [],
      tableLoading: false,
      assignTableLoading: false,
      unReviewTableLoading: false
    }
  },
  created() {
    this.getAllAuditor()
  },
  methods: {
    async getAllAuditor() {
      this.tableLoading = true
      const { data: res } = await this.$http.get('manager/user/auditor', {
        params: this.query,
      })
      if (res.code !== 200) {
        return this.$message.error('获取审核员列表失败')
      }
      this.ReAssignFormList = res.data.data
      this.allAuditorList = res.data.data
      this.query.pageNo = res.data.pageNo
      this.query.pageSize = res.data.pageSize
      this.totalCount = res.data.totalCount
      this.tableLoading = false
    },
    handleSizeChange(newSize) {
      this.query.pageSize = newSize
      this.getAllAuditor()
    },
    handleCurrentChange(newPage) {
      this.query.pageNo = newPage
      this.getAllAuditor()
    },
    async getTotalCase() {
      this.assignTableLoading = true
      const { data: res } = await this.$http.get('accident', {
        params: this.accidentQuery,
      })
      this.accidentQuery.pageNo = res.data.current
      this.accidentQuery.pageSize = res.data.size
      this.accidentTotal = res.data.total

      if (res.code !== 200) {
        return this.$message.error('获取总体案例列表失败')
      }
      this.Records = res.data.records
      this.assignTableLoading = false
    },
    showAssignDialog(id) {
      this.checkUserId = id
      this.getTotalCase()
      this.totalDialogVisible = true
    },
    handleSelectionChange(arr) {
      this.selectList = arr
    },
    async distribution() {
      this.selectList.forEach((item) => {
        this.accidentIds.push(item.id)
      })
      const res = await this.$http.post('manager/case', {
        accidentIds: this.accidentIds,
        checkUserId: this.checkUserId,
      })
      if (res.data.code !== 200 || res.status !== 200) {
        return this.$message.error('分配案例成失败')
      }
      this.$message.success('分配案例成功')
      this.totalDialogVisible = false
    },
    showEditAssignDialog(id) {
      this.checkUnreviewedUserId = id
      this.editDialogVisible = true
      this.getUnreviewedCase(id)
    },
    async getUnreviewedCase(id) {
      this.unReviewTableLoading = true
      this.checkUserQuery.userId = id
      const { data: res } = await this.$http.get('accident/check_user', {
        params: this.checkUserQuery,
      })
      this.Unreviewed = res.data.records
      this.checkUserQuery.pageNo = res.data.current
      this.checkUserQuery.pageSize = res.data.size
      this.total = res.data.total
      this.unReviewTableLoading = false
    },
    handleEditSizeChange(newSize) {
      this.checkUserQuery.pageSize = newSize
      this.getUnreviewedCase(this.checkUnreviewedUserId)
    },
    handleEditCurrentChange(newPage) {
      this.checkUserQuery.pageNo = newPage
      this.getUnreviewedCase(this.checkUnreviewedUserId)
    },
    editConfirm() {
      this.$refs.ReAssignFormRef.validate(async (valid) => {
        if (!valid) return
        const accidentId = new Array()
        this.selectEditList.forEach((item) => {
          accidentId.push(item.id)
        })
        console.log(this.ReAssignForm.username)
        const res = await this.$http.post('manager/case', {
          accidentIds: accidentId,
          checkUserId: this.ReAssignForm.username,
        })
        if (res.data.code !== 200 || res.status !== 200) {
          return this.$message.error('分配案例失败')
        }
        this.$message.success('分配案例成功')
        this.editDialogVisible = false
        this.showReAssignDialog = false
      })
    },
    handleEditSelectionChange(arr) {
      this.selectEditList = arr
    },
    // 分配案例对话框分页
    handleAssignSizeChange(newSize) {
      this.accidentQuery.pageSize = newSize
      this.getTotalCase()
    },
    handleAssignPageChange(newPage) {
      this.accidentQuery.pageNo = newPage
      this.getTotalCase()
    }
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