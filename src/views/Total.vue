<template>
  <div>
    <!-- 面包屑导航区域 -->
    <breadcrumb title="数据总览"></breadcrumb>
    <el-card>
      <!-- 搜索区域 -->
      <search @getDataList="getSearchData" @showDialog="showSeleceDialog" inputText="请输入案例编号"></search>
      <!-- 表格 -->
      <el-table :data="allCaseList" stripe border style="width: 100%" max-height="450" v-loading="tableLoading">
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
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)" :disabled="checkEdit(scope.row.userId)"></el-button>
            </el-tooltip>
            <el-tooltip content="删除案例" placement="top" :enterable="false" effect="dark">
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteCase(scope.row.caseNumber)" :disabled="checkDelete(scope.row.userId)"></el-button>
            </el-tooltip>
            <el-tooltip content="提交案例" placement="top" :enterable="false" effect="dark">
              <el-button type="success" icon="el-icon-check" @click="submitCase(scope.row.id)" :disabled="checkSubmit(scope.row.userId)" size="mini"></el-button>
            </el-tooltip>
          </template>
        </el-table-column> 
      </el-table>
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pageNo" :page-sizes="[5, 10, 15, 20]" :page-size="queryInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
      </el-pagination>
    </el-card>

    <!-- 组合筛选对话框 -->
    <el-dialog title="组合筛选" :visible.sync="selectDialogVisible" width="80%" append-to-body>
      <div class="el-dialog-div" v-if="isShow1">
        <el-collapse v-model="activeName" accordion>
          <el-collapse-item title="总体信息" name="1">
            <el-checkbox-group v-model="total_value" @change="sendTotal">
              <el-checkbox v-for="(item,index) in total" :key="index" :label="item.label" boder :name="item.name" :value="item.label" border></el-checkbox>
            </el-checkbox-group>
          </el-collapse-item>
          <el-collapse-item title="环境信息" name="2">
            <el-checkbox-group v-model="env_value" @change="sendEnv">
              <el-checkbox v-for="(item,index) in env" :key="index" :label="item.label" border :name="item.name"></el-checkbox>
            </el-checkbox-group>
          </el-collapse-item>
          <el-collapse-item title="道路信息" name="3">
            <el-checkbox-group v-model="road_value" @change="sendRoad">
              <el-checkbox v-for="(item,index) in road" :key="index" :label="item.label" border :name="item.name"></el-checkbox>
            </el-checkbox-group>
          </el-collapse-item>
          <el-collapse-item title="参与方信息(车)" name="4">
            <el-checkbox-group v-model="car_value" @change="sendCar">
              <el-checkbox v-for="(item,index) in car" :key="index" :label="item.label" border :name="item.name"></el-checkbox>
            </el-checkbox-group>
          </el-collapse-item>
          <el-collapse-item title="参与方信息(二轮车)" name="5">
            <el-checkbox-group v-model="twoWheel_value" @change="sendTwowheel">
              <el-checkbox v-for="(item,index) in twoWheel" :key="index" :label="item.label" border :name="item.name"></el-checkbox>
            </el-checkbox-group>
          </el-collapse-item>
          <el-collapse-item title="参与方信息(人)" name="6">
            <el-checkbox-group v-model="person_value" @change="sendPerson">
              <el-checkbox v-for="(item,index) in person" :key="index" :label="item.label" border :name="item.name"></el-checkbox>
            </el-checkbox-group>
          </el-collapse-item>
        </el-collapse>
      </div>

      <div class="el-dialog-div" v-if="isShow2">
        <el-form ref="filterFormRef" :model="filterForm" label-width="120px">
          <el-row type="flex" class="row-bg">
            <el-col :span="12">
              <el-form-item :label="item + ''" v-for="(item,index) in allFilterVal" :key="index">
                <el-input v-model="filterForm.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelDialog">取 消</el-button>
        <el-button type="primary" @click="submitDialog">确 定</el-button>
      </span>
    </el-dialog>

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
import Breadcrumb from '../components/common/Breadcrumb.vue'
import Search from '../components/common/Search.vue'
import DetailForm from '../components/dialog/DetailForm'
import dataExport from '../components/export/export'
import EditForm from '../components/dialog/EditDialog'
export default {
  components: {
    Breadcrumb,
    Search,
    EditForm,
    DetailForm,
  },
  data() {
    return {
      allCaseList: [],
      query: '',
      check_value: [],
      // 搜索
      queryInfo: {
        caseNumber: '',
        pageNo: 1,
        pageSize: 5,
      },
      totalCount: 0,
      // 组合筛选
      selectDialogVisible: false,
      activeName: '1',
      total: [],
      total_value: [],
      env: [],
      env_value: [],
      road: [],
      road_value: [],
      car: [],
      car_value: [],
      twoWheel: [],
      twoWheel_value: [],
      person: [],
      person_value: [],
      // 多选框筛选值
      allFilterVal: [],

      filterForm: {
        name: '',
      },
      isShow1: true,
      isShow2: false,
      // 案例详情对话框
      detailsDialogVisible: false,
      editDialogVisible: false,

      //永久删除对话框
      permanentDelDialogVisible: false,
      // 个人信息
      roleType: '',
      roleId: '',
      // 案例

      // 加载
      tableLoading: true,
    }
  },
  created() {
    this.getCaseList()
    this.init()
    this.getUerInfo()
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
    checkEdit(id) {
      if (this.roleType == 'ADMIN') {
        return false
      } else if (this.roleId == id && this.roleType == 'COLLECTOR') {
        return false
      } else if (this.roleId == id && this.roleType == 'AUDITOR') {
        return false
      } else {
        return true
      }
    },
    checkDelete(opt) {
      if (this.roleType == 'ADMIN') {
        return false
      } else if (this.roleId == opt.userId && this.roleType == 'COLLECTOR') {
        return false
      } else if (this.roleId == opt.userId && this.roleType == 'AUDITOR') {
        return false
      } else if (this.roleId == opt.checkUserId && this.roleType == 'AUDITOR') {
        return false
      } else {
        return true
      }
    },
    checkSubmit(opt) {
      if (this.roleType == 'ADMIN') {
        return false
      } else if (this.roleId == opt.userId && this.roleType == 'COLLECTOR') {
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
      this.tableLoading = false
    },
    // 搜索
    async getSearchData(str) {
      this.queryInfo.caseNumber = str
      const { data: res } = await this.$http.get('total/search', {
        params: this.queryInfo,
      })
      console.log(res)
      this.allCaseList = res.data.data
    },
    showSeleceDialog() {
      this.selectDialogVisible = true
    },
    // 详情对话框
    showDetailDialog(id) {
      this.$refs.DetailFormRef.getDetailList(id)
    },
    /**
     * 修改
     */
    showEditDialog(id) {
      console.log(id);
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
      this.getCaseList()
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
      this.getCaseList()
      this.permanentDelDialogVisible = false
    },
    // 提交案例
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
    init() {
      this.total = dataExport.total
      this.env = dataExport.env
      this.road = dataExport.road
      this.car = dataExport.car
      this.twoWheel = dataExport.twoWheel
      this.person = dataExport.person
    },
    // 导出excel
    showderValDialog() {
      this.derValDialogVisible = true
    },
    // 组合筛选对话框
    cancelDialog() {
      if (this.isShow1) {
        this.selectDialogVisible = false
        this.allFilterVal = []
      } else {
        this.allFilterVal = []
        this.isShow1 = true
        this.isShow2 = false
      }
    },
    submitDialog() {
      // this.selectDialogVisible = false
      if (this.isShow1) {
        this.isShow2 = true
        this.isShow1 = false
        this.allFilterVal.push(...this.total_value)
        this.allFilterVal.push(...this.env_value)
        this.allFilterVal.push(...this.road_value)
        this.allFilterVal.push(...this.car_value)
        this.allFilterVal.push(...this.twoWheel_value)
        this.allFilterVal.push(...this.person_value)
        console.log(this.allFilterVal)
      } else {
        this.selectDialogVisible = false
        // 延迟1s重置
        setTimeout(() => {
          this.isShow1 = true
          this.isShow2 = false
        }, 1000)
      }
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
      console.log(arr)
      this.total_value = arr
    },
    sendEnv(arr) {
      console.log(arr)
      this.env_value = arr
    },
    sendRoad(arr) {
      console.log(arr)
      this.road_value
    },
    sendCar(arr) {
      console.log(arr)
      this.car_value = arr
    },
    sendTwowheel(arr) {
      console.log(arr)
      this.twoWheel_value = arr
    },
    sendPerson(arr) {
      console.log(arr)
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
.el-checkbox-group {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.el-checkbox {
  width: 300px;
  margin-top: 10px;
}
.el-dialog-div {
  height: 400px;
  overflow: auto;
}
</style>