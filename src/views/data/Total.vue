<template>
  <div>
    <!-- 面包屑导航区域 -->
    <breadcrumb title="数据总览"></breadcrumb>
    <el-card>
      <!-- 搜索区域 -->
      <search @getDataList="getSearchData" @showDialog="showDialog" @getAllCase="getAllCase" inputText="请输入案例编号">
      </search>
      <!-- 表格 -->
      <el-table :data="allCaseList" stripe border style="width: 100%" max-height="480" v-loading="loading">
        <el-table-column type="index" label="#">
        </el-table-column>
        <el-table-column prop="caseNumber" label="案例编号" width="120px">
        </el-table-column>
        <el-table-column prop="status" label="案例状态">
          <template slot-scope="scope">
            <el-tag type="info" v-if="scope.row.status ==0">待分配</el-tag>
            <el-tag type="warning" v-if="scope.row.status==1">待审核</el-tag>
            <el-tag type="danger" v-if="scope.row.status==2">未通过</el-tag>
            <el-tag type="success" v-if="scope.row.status==3">通过</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="total" label="参与方总数" width="100px">
        </el-table-column>
        <el-table-column prop="accidentPattern" label="事故形态" width="200px">
        </el-table-column>
        <el-table-column prop="typeOfObstacle" label="障碍物类型" width="200px">
        </el-table-column>
        <el-table-column prop="videoType" label="视频类型" width="200px">
        </el-table-column>
        <el-table-column prop="roadSection" label="路段" width="100px">
        </el-table-column>
        <el-table-column prop="weather" label="天气">
        </el-table-column>
        <el-table-column prop="lightingCondition" label="照明情况" width="250px">
        </el-table-column>
        <el-table-column label="操作" width="250px" fixed="right">
          <template slot-scope="scope">
            <el-tooltip content="案例详情" placement="top" :enterable="false" effect="dark">
              <el-button type="info" icon="el-icon-more" size="mini" @click="showDetailDialog(scope.row.id)" :disabled="checkInfo(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip content="修改案例" placement="top" :enterable="false" effect="dark">
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)" :disabled="checkEdit(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip content="删除案例" placement="top" :enterable="false" effect="dark">
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteCase(scope.row.caseNumber)" :disabled="checkDelete(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip content="提交案例" placement="top" :enterable="false" effect="dark">
              <el-button type="success" icon="el-icon-check" @click="submitCase(scope.row.id)" :disabled="checkSubmit(scope.row)" size="mini"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pageNo" :page-sizes="[5, 10, 15, 20]" :page-size="queryInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
      </el-pagination>
    </el-card>

    <!-- 组合筛选对话框 -->
    <total-dialog v-if="show" ref="dialogRef"></total-dialog>
    <!-- 案例详情对话框 -->
    <detail-form :visible="detailsDialogVisible" ref="DetailFormRef"></detail-form>

    <!-- 修改案例对话框 -->
    <edit-form :visible="editDialogVisible" ref="editFormRef"></edit-form>

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
import Breadcrumb from '../../components/common/Breadcrumb.vue'
import Search from '../../components/common/Search.vue'
import DetailForm from '../../components/dialog/DetailForm'
import EditForm from '../../components/dialog/EditDialog'

import bus from './bus'
import Choose from './Choose.vue'
import TotalDialog from './TotalDialog.vue'
export default {
  components: {
    Breadcrumb,
    Search,
    EditForm,
    DetailForm,
    Choose,
    TotalDialog,
  },
  data() {
    return {
      // 组合筛选
      show: false,
      allCaseList: [],
      query: '',
      check_value: [],
      // 搜索
      queryInfo: {
        caseNumber: '',
        pageNo: 1,
        pageSize: 10,
      },
      totalCount: 0,

      filterForm: {
        name: '',
      },
      // 案例详情对话框
      detailsDialogVisible: false,
      editDialogVisible: false,

      //永久删除对话框
      permanentDelDialogVisible: false,
      // 个人信息
      roleType: '',
      roleId: '',
      // 加载
      loading: true,

      // 组合筛选
      filter: {
        pageNo: 1,
        pageSize: 5,
      },
      accident: {},
      environment: {},
      road: {},
      pedestrian: {},
      car: {},
      twoWheeler: {},
    }
  },
  created() {
    this.getCaseList()
    this.getUerInfo()
    bus.$on('getResult', (msg) => {
      this.closeDialog()
      this.filter = {
        pageNo: 1,
        pageSize: 5,
      }
      for (let key in msg) {
        if (key.indexOf('g') === 0) {
          this.accident[key] = msg[key]
        }
        if (key.indexOf('e') === 0) {
          this.environment[key] = msg[key]
        }
        if (key.indexOf('r') === 0) {
          this.road[key] = msg[key]
        }
        if (key.indexOf('p') === 0) {
          this.pedestrian[key] = msg[key]
        }
        if (key.indexOf('v') === 0) {
          this.car[key] = msg[key]
        }
        if (key.indexOf('t') === 0) {
          this.twoWheeler[key] = msg[key]
        }
      }
      /**/
      if (this.accident != null) {
        for (let key in this.accident) {
          this.filter['accident'] = this.accident
        }
      }
      if (this.environment != null) {
        for (let key in this.environment) {
          this.filter['environment'] = this.environment
        }
      }
      if (this.road != null) {
        for (let key in this.road) {
          this.filter['road'] = this.road
        }
      }
      if (this.pedestrian != null) {
        for (let key in this.pedestrian) {
          this.filter['pedestrian'] = this.pedestrian
        }
      }
      if (this.car != null) {
        for (let key in this.car) {
          this.filter['car'] = this.car
        }
      }
      if (this.twoWheeler != null) {
        for (let key in this.twoWheeler) {
          this.filter['twoWheeler'] = this.twoWheeler
        }
      }
      this.getFilter()
    })
  },
  mounted() {
    bus.$on('editSuccess', () => {
      this.getCaseList()
    })
  },
  methods: {
    checkInfo(opt) {
      if (this.roleType == 'ADMIN') {
        return false
      } else if (this.roleId == opt.userId && this.roleType == 'COLLECTOR') {
        return false
      } else if (this.roleId == opt.userId && this.roleType == 'AUDITOR') {
        return false
      } else if (
        this.roleId == opt.userId &&
        this.roleType == 'AUDITOR' &&
        opt.status == '2'
      ) {
        return false
      } else {
        return true
      }
    },
    checkEdit(opt) {
      if (this.roleType == 'ADMIN') {
        return false
      } else if (
        this.roleId == opt.id &&
        this.roleType == 'COLLECTOR' &&
        opt.status == 2
      ) {
        return false
      } else if (this.roleId == opt.userId && this.roleType == 'AUDITOR') {
        return false
      } else if (opt.status == '2' && this.roleId == opt.userId) {
        return false
      } else {
        return true
      }
    },
    checkDelete(opt) {
      if (this.roleType == 'ADMIN') {
        return false
      } else if (opt.status == '1' && this.roleType == 'COLLECTOR') {
        return true
      }else if (this.roleId == opt.userId && this.roleType == 'COLLECTOR') {
        return false
      } else if (this.roleId == opt.userId && this.roleType == 'AUDITOR') {
        return false
      }  else {
        return true
      }
    },
    checkSubmit(opt) {
      if (this.roleType == 'ADMIN') {
        return false
      } else if (
        this.roleId == opt.userId &&
        this.roleType == 'COLLECTOR' &&
        opt.status == 2
      ) {
        return false
      } else if (this.roleId == opt.userId && this.roleType == 'AUDITOR') {
        return false
      } else {
        return true
      }
    },
    async getUerInfo() {
      const { data: res } = await this.$http.get('user')
      this.roleType = res.data.roles[0].name
      this.roleId = res.data.id
    },
    async getAllCase() {
      const res = await this.$http.get('total/search', {
        params: {
          caseNumber: '',
          pageNo: 1,
          pageSize: 10,
        },
      })
      if (res.data.code !== 200 || res.status !== 200) {
        return this.$message.error('获取案例列表失败')
      }
      this.allCaseList = res.data.data.data
      this.queryInfo.pageNo = res.data.data.pageNo
      this.queryInfo.pageSize = res.data.data.pageSize
      this.totalCount = res.data.data.totalCount
      this.loading = false
    },
    async getCaseList() {
      const res = await this.$http.get('total/search', {
        params: this.queryInfo,
      })
      if (res.data.code !== 200 || res.status !== 200) {
        return this.$message.error('获取案例列表失败')
      }
      this.allCaseList = res.data.data.data
      this.queryInfo.pageNo = res.data.data.pageNo
      this.queryInfo.pageSize = res.data.data.pageSize
      this.totalCount = res.data.data.totalCount
      this.loading = false
    },
    // 搜索
    async getSearchData(str) {
      this.queryInfo.caseNumber = str
      const { data: res } = await this.$http.get('total/search', {
        params: this.queryInfo,
      })
      this.allCaseList = res.data.data
    },
    /**
     * 组合筛选对话框
     */
    showDialog() {
      this.show = true
      this.$nextTick(() => {
        this.$refs.dialogRef.show()
      })
    },
    closeDialog() {
      this.show = false
      bus.$emit('close')
    },
    async getFilter() {
      const { data: res } = await this.$http.post('total/filter', this.filter)
      if (res.code !== 200) {
        return this.$message.error('组合筛选查找案例失败')
      }
      if (res.data != null) {
        this.allCaseList = res.data.data
      } else {
        this.allCaseList = []
      }
      this.accident = {}
      this.environment = {}
      this.road = {}
      this.pedestrian = {}
      this.car = {}
      this.twoWheeler = {}
    },
    // 详情对话框
    showDetailDialog(id) {
      this.$refs.DetailFormRef.getDetailList(id)
    },
    /**
     * 修改
     */
    showEditDialog(id) {
      this.$refs.editFormRef.showDialog(id)
    },
    /**
     * 删除
     */
    async deleteCase(id) {
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
      this.getCaseList()
      this.permanentDelDialogVisible = false
    },
    // 暂时删除
    async unPermanentDel() {
      const arr = []
      arr.push(this.caseNum)
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
      this.getCaseList()
      this.permanentDelDialogVisible = false
    },
    // 提交案例id
    async submitCase(id) {
      const res = await this.$http.put(`total/submit/${id}`)
      if (res.status !== 200 || res.data.code !== 200) {
        return this.$message.error('提交失败')
      }
      this.$message.success('提交成功')
      this.getCaseList()
    },

    /**
     * 导出Excel相关逻辑
     */
    // 导出excel
    showderValDialog() {
      this.derValDialogVisible = true
    },
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize
      this.getCaseList()
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pageNo = newPage
      this.getCaseList()
    },

    /*选中后push对应的值进入数组*/
    sendTotal(arr) {
      this.total_value = arr
    },
    sendEnv(arr) {
      this.env_value = arr
    },
    sendRoad(arr) {
      this.road_value
    },
    sendCar(arr) {
      this.car_value = arr
    },
    sendTwowheel(arr) {
      this.twoWheel_value = arr
    },
    sendPerson(arr) {
      this.person_value = arr
    },
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