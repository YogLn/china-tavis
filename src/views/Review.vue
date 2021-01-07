<template>
  <div class="">
    <breadcrumb title="案例审核"></breadcrumb>
    <el-card>
      <el-table :data="allCaseList" stripe border style="width: 100%" max-height="450" v-loading="tableLoading">
        <el-table-column type="index" label="#">
        </el-table-column>
        <el-table-column prop="g1001" label="案例编号">
        </el-table-column>
        <el-table-column prop="g1002" label="鉴定委托号" width="130px">
        </el-table-column>
        <el-table-column prop="g1003" label="参与方总数" width="130px">
        </el-table-column>
        <el-table-column prop="g1004" label="事故形态" width="180px">
        </el-table-column>
        <el-table-column prop="g1006" label="障碍物类型" width="130px">
        </el-table-column>
        <el-table-column prop="g1007" label="视频类型" width="220px">
        </el-table-column>
        <el-table-column prop="siteId" label="添加用户的站点" width="130px">
        </el-table-column>
        <el-table-column prop="checkInfo" label="审核反馈信息" width="220px">
        </el-table-column>
        <el-table-column prop="status" label="案例状态">
          <template slot-scope="scope">
            <el-tag type="info" v-if="scope.row.status ==0">待分配</el-tag>
            <el-tag type="warning" v-if="scope.row.status==1">待审核</el-tag>
            <el-tag type="danger" v-if="scope.row.status==2">未通过</el-tag>
            <el-tag type="success" v-if="scope.row.status==3">通过</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px" fixed="right">
          <template slot-scope="scope">
            <el-button type="info" icon="el-icon-more" size="mini" @click="showDetailDialog(scope.row.id)"></el-button>
            <el-tooltip content="审核该案例" placement="top" :enterable="false" effect="dark">
              <el-button type="warning" icon="el-icon-s-check" size="mini" @click="showAuditInfoDialog(scope.row.id)"></el-button>
            </el-tooltip>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteAuditInfo(scope.row.g1001)"></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pageNo" :page-sizes="[5, 10, 15, 20]" :page-size="queryInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>

    <!-- 案例详情对话框 -->
    <detail-form :visible="detailsDialogVisible" ref="DetailFormRef"></detail-form>

    <!-- 审核案例对话框 -->
    <el-dialog title="审核案例" :visible.sync="auditInfoDialogVisible" width="30%">
      <el-form ref="auditInfoRef" :model="auditInfo" label-width="120px">
        <el-form-item label="审核反馈信息">
          <el-input type="textarea" :rows="4" v-model="auditInfo.checkInfo"></el-input>
        </el-form-item>
        <el-form-item label="审核状态">
          <el-select v-model="auditInfo.status" placeholder="请选择">
            <el-option v-for="item in auditOpt" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="auditInfoDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAudit">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 永久删除对话框 -->
    <el-dialog title="提示" :visible.sync="permanentDelDialogVisible" width="30%">
      <span style="font-size: 24px">是否永久删除?</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="warning" @click="unPermanentDel">暂时删除</el-button>
        <el-button type="danger" @click="permanentDel">永久删除</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Breadcrumb from '../components/common/Breadcrumb.vue'
import DetailForm from '../components/dialog/DetailForm.vue'
export default {
  components: { Breadcrumb, DetailForm },
  created() {
    this.getAccident()
  },
  data() {
    return {
      queryInfo: {
        pageNo: 1,
        pageSize: 5,
      },
      total: 0,
      allCaseList: [],
      // 审核案例
      auditInfoDialogVisible: false,
      auditInfo: {
        accidentIds: [],
        checkInfo: '',
        status: 3,
      },
      auditOpt: [
        {
          label: '通过',
          value: 3,
        },
        {
          label: '不通过',
          value: 2,
        },
      ],
      permanentDelDialogVisible: false,
      // 案例编号
      caseNum: '',
      // 详情
      detailsDialogVisible: false,
      tableLoading: false,
    }
  },
  methods: {
    async getAccident() {
      this.tableLoading = true
      const { data: res } = await this.$http.get('accident/check_info', {
        params: this.queryInfo,
      })
      console.log(res)
      this.queryInfo.pageNo = res.data.current
      this.queryInfo.pageSize = res.data.size
      this.total = res.data.total
      this.allCaseList = res.data.records
      this.tableLoading = false
    },
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize
      this.getAccident()
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pageNo = newPage
      this.getAccident()
    },
    // 提交案例审核
    showAuditInfoDialog(id) {
      this.auditInfo.accidentIds = []
      this.auditInfo.accidentIds.push(id)
      console.log(this.auditInfo)
      this.auditInfoDialogVisible = true
      console.log(id)
    },
    async submitAudit() {
      console.log(this.auditInfo)
      const res = await this.$http.put('accident/check', this.auditInfo)
      console.log(res)
      if (res.status !== 200 || res.data.code !== 200) {
        return this.$message.error('提交审核失败')
      }
      this.$message.success('提交审核成功')
      this.getAccident()
      this.auditInfoDialogVisible = false
    },
    // 删除
    async deleteAuditInfo(id) {
      const confirmResult = await this.$confirm('确认删除该案例?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).catch((err) => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }
      this.caseNum = id
      this.permanentDelDialogVisible = true
    },
    // 永久删除
    async permanentDel() {
      const arr = []
      arr.push(this.caseNum)
      console.log(arr)
      const res = await this.$http.delete('total/delete', {
        data: {
          accidentIds: arr,
          permanent: true,
        },
      })
      if (res.status !== 200 || res.data.code !== 200) {
        return this.$message.error('删除失败')
      }
      this.$message.success('删除成功')
      this.getAccident()
      this.permanentDelDialogVisible = false
    },
    // 暂时删除
    async unPermanentDel() {
      const arr = []
      arr.push(this.caseNum)
      console.log(arr)
      const res = await this.$http.delete('total/delete', {
        data: {
          accidentIds: arr,
          permanent: false,
        },
      })
      if (res.status !== 200 || res.data.code !== 200) {
        return this.$message.error('删除失败')
      }
      this.$message.success('删除成功')
      this.getAccident()
      this.permanentDelDialogVisible = false
    },
    showDetailDialog(id) {
      this.$refs.DetailFormRef.getDetailList(id)
    }
  },
}
</script>

<style scoped lang="less">
/deep/.el-table th > .cell {
  text-align: center;
}
/deep/.el-table .cell {
  text-align: center;
}
</style>