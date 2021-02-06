<template>
  <div>
    <breadcrumb title="数据导出"></breadcrumb>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入要查找的案例编号" v-model="queryInfo.caseNumber" clearable @clear="getCaseList">
            <el-button slot="append" icon="el-icon-search" @click="getCaseList"></el-button>
          </el-input>
        </el-col>
        <el-button type="primary" @click="showderValDialog">选择可导出值</el-button>
        <el-button type="success" @click="Export">导出选中案例</el-button>
        <el-button type="success" @click="allCaseExport">导出全部案例</el-button>
      </el-row>

      <!-- 表格区域 -->
      <el-table :data="allCaseList" stripe border style="width: 100%" max-height="480" @selection-change="handleSelectionChange" v-loading="tableLoading" ref="tableRef">
        <el-table-column type="selection" width="55">
        </el-table-column>
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
        <el-table-column prop="accidentPattern" label="事故形态" width="180px">
        </el-table-column>
        <el-table-column prop="typeOfObstacle" label="障碍物类型" width="120px">
        </el-table-column>
        <el-table-column prop="videoType" label="视频类型" width="150px">
        </el-table-column>
        <el-table-column prop="roadSection" label="路段" width="100px">
        </el-table-column>
        <el-table-column prop="weather" label="天气">
        </el-table-column>
        <el-table-column prop="lightingCondition" label="照明情况" width="180px">
        </el-table-column>
        <el-table-column label="操作" width="180px" fixed="right">
          <template slot-scope="scope">
            <el-button type="info" size="mini" @click="showDetails(scope.row.id)">案例详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pageNo" :page-sizes="[5, 10, 15, 20]" :page-size="queryInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
      </el-pagination>
    </el-card>

    <!-- 选择可导出的值对话框 -->
    <el-dialog title="选择可导出值" :visible.sync="derValDialogVisible" width="80%">
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item title="基本信息" name="1">
          <el-checkbox-group v-model="total_value">
            <el-checkbox label="全选" name="all" border @change="allTotal"></el-checkbox>
            <el-checkbox v-for="(item,index) in total" :key="item.name" :label="item.label" boder :name="item.name" @change="sendTotal(index)" border></el-checkbox>
          </el-checkbox-group>
        </el-collapse-item>
        <el-collapse-item title="环境信息" name="2">
          <el-checkbox-group v-model="env_value">
            <el-checkbox label="全选" name="all" border @change="allEnv"></el-checkbox>
            <el-checkbox v-for="(item,index) in env" :key="item.name" :label="item.label" border :name="item.name" @change="sendEnv(index)"></el-checkbox>
          </el-checkbox-group>
        </el-collapse-item>
        <el-collapse-item title="道路信息" name="3">
          <el-checkbox-group v-model="road_value">
            <el-checkbox label="全选" name="all" border @change="allRoad"></el-checkbox>
            <el-checkbox v-for="(item,index) in road" :key="item.name" :label="item.label" border :name="item.name" @change="sendRoad(index)"></el-checkbox>
          </el-checkbox-group>
        </el-collapse-item>
        <el-collapse-item title="参与方信息(车)" name="4">
          <el-checkbox-group v-model="car_value">
            <el-checkbox label="全选" name="all" border @change="allCar"></el-checkbox>
            <el-checkbox v-for="(item,index) in car" :key="item.name" :label="item.label" border :name="item.name" @change="sendCar(index)"></el-checkbox>
          </el-checkbox-group>
        </el-collapse-item>
        <el-collapse-item title="参与方信息(二轮车)" name="5">
          <el-checkbox-group v-model="twoWheel_value">
            <el-checkbox label="全选" name="all" border @change="allTwowheel"></el-checkbox>
            <el-checkbox v-for="(item,index) in twoWheel" :key="item.name" :label="item.label" border :name="item.name" @change="sendTwowheel(index)"></el-checkbox>
          </el-checkbox-group>
        </el-collapse-item>
        <el-collapse-item title="参与方信息(人)" name="6">
          <el-checkbox-group v-model="person_value">
            <el-checkbox label="全选" name="all" border @change="allPerson"></el-checkbox>
            <el-checkbox v-for="(item,index) in person" :key="item.name" :label="item.label" border :name="item.name" @change="sendPerson(index)"></el-checkbox>
          </el-checkbox-group>
        </el-collapse-item>
      </el-collapse>
      <span slot="footer" class="dialog-footer">
        <el-button @click="derValDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="derVal">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 详情信息对话框 -->
    <detail-form :visible="detailsDialogVisible" ref="DetailFormRef" :id="caseId"></detail-form>
  </div>
</template>

<script>
import Breadcrumb from '../components/common/Breadcrumb'
import DetailForm from '../components/dialog/DetailForm'
import dataExport from '../components/export/export'
export default {
  components: {
    Breadcrumb,
    DetailForm,
  },
  created() {
    this.init()
    this.getCaseList()
  },
  data() {
    return {
      /*显示哪一部分的筛选选项*/
      codeCol: '',
      // 案例编号数组
      caseNumbers: [],
      transArr: [],
      allSelectArr: [],
      query: '',
      derValDialogVisible: false,
      activeName: '1',
      /*每一部分对应的可选值*/
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
      /*用户选定的值*/
      final: [],
      // 获取表格数据
      allCaseList: [],
      queryInfo: {
        caseNumber: '',
        pageNo: 1,
        pageSize: 10,
      },
      totalCount: 0,
      // 查看案例详情
      detailsDialogVisible: false,
      caseId: '',
      tableLoading: false,
      changePage: false,
      tableSelect: new Set(),
    }
  },
  methods: {
    init() {
      this.total = dataExport.total
      this.env = dataExport.env
      this.road = dataExport.road
      this.car = dataExport.car
      this.twoWheel = dataExport.twoWheel
      this.person = dataExport.person
    },
    async getCaseList() {
      this.tableLoading = true
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
    // 表格选择
    handleSelectionChange(e) {
      this.transArr = e
    },
    // 详情信息
    async showDetails(id) {
      this.caseId = id
      this.detailsDialogVisible = true
      this.$refs.DetailFormRef.getDetailList(id)
    },
    // 导出
    async Export() {
      if (this.codeCol == '') {
        for (let i = 0; i < 144; i++) {
          this.codeCol += 1
        }
      }
      if (this.changePage) {
        this.allSelectArr.push(...this.transArr)
        this.allSelectArr.forEach((item) => {
          this.caseNumbers.push(item.caseNumber)
        })
        if (this.allSelectArr == '') {
          return this.$message.info('请勾选要导出的案例')
        }
        const res = await this.$http.post(
          'total/export',
          {
            caseNumbers: this.caseNumbers,
            columns: this.codeCol,
          },
          { responseType: 'arraybuffer' }
        )
        this.exprtExcel(res)
        this.allSelectArr = []
      } else {
        this.transArr.forEach((item) => {
          this.caseNumbers.push(item.caseNumber)
        })
        if (this.transArr == '') {
          return this.$message.info('请勾选要导出的案例')
        }
        const res = await this.$http.post(
          'total/export',
          {
            caseNumbers: this.caseNumbers,
            columns: this.codeCol,
          },
          { responseType: 'arraybuffer' }
        )
        this.exprtExcel(res)
      }
    },
    // 导出excel
    exprtExcel(_res) {
      let blob = new Blob([_res.data], { type: 'application/vnd.ms-excel' })
      let objUrl = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = objUrl
      link.download = 'data.xlsx'
      link.click()
      URL.revokeObjectURL(objUrl)
    },
    async allCaseExport() {
      if (this.codeCol == '') {
        for (let i = 0; i < 144; i++) {
          this.codeCol += 1
        }
      }
      const res = await this.$http.post(
        'total/export',
        {
          caseNumbers: null,
          columns: this.codeCol,
        },
        { responseType: 'arraybuffer' }
      )
      this.exprtExcel(res)
    },
    showderValDialog() {
      this.derValDialogVisible = true
    },
    derVal() {
      this.save()
      this.derValDialogVisible = false
    },
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize
      this.getCaseList()
    },
    handleCurrentChange(newPage) {
      this.changePage = true
      this.allSelectArr.push(...this.transArr)
      this.queryInfo.pageNo = newPage
      this.getCaseList()
    },
    /* 遍历用户选择的项 */
    traverse(name, code) {
      for (let i = 0; i < name.length; i++) {
        if (this.final.indexOf(name[i].name) > -1) {
          code += '1'
        } else {
          code += '0'
        }
      }
      return code
    },
    /*提交筛选项函数*/
    save() {
      let postData = {}
      let totalCode = ''
      let environmentCode = ''
      let carCode = ''
      let personCode = ''
      let twoWheelCode = ''
      let roadCode = ''
      totalCode = this.traverse(this.total, totalCode)
      environmentCode = this.traverse(this.env, environmentCode)
      carCode = this.traverse(this.car, carCode)
      personCode = this.traverse(this.person, personCode)
      twoWheelCode = this.traverse(this.twoWheel, twoWheelCode)
      roadCode = this.traverse(this.road, roadCode)
      postData['totalCode'] = totalCode
      postData['environmentCode'] = environmentCode
      postData['carCode'] = carCode
      postData['personCode'] = personCode
      postData['twoWheelCode'] = twoWheelCode
      postData['roadCode'] = roadCode
      let target =
        totalCode +
        carCode +
        environmentCode +
        personCode +
        roadCode +
        twoWheelCode
      let arr = target.split('')
      if (
        arr[0] == 1 ||
        arr[11] == 1 ||
        arr[52] == 1 ||
        arr[61] == 1 ||
        arr[82] == 1 ||
        arr[119] == 1
      ) {
        arr.splice(0, 1, 1)
        arr.splice(11, 1, 1)
        arr.splice(52, 1, 1)
        arr.splice(61, 1, 1)
        arr.splice(82, 1, 1)
        arr.splice(119, 1, 1)
      }
      this.codeCol = arr.join('')
    },
    /*清空筛选项函数*/
    reset() {
      this.total_value = []
      this.env_value = []
      this.road_value = []
      this.car_value = []
      this.twoWheel_value = []
      this.person_value = []
      this.final = []
    },
    /* 数组的push防重复*/
    pushSingle(value, name, index) {
      //先判断是否已选
      if (value.indexOf(name[index].label) > -1) {
        if (this.final.indexOf(name[index].name) === -1) {
          //再判断是否重复
          this.final.push(name[index].name)
        }
      } else {
        let index = this.final.indexOf(name[index])
        this.final.splice(index, 1)
      }
    },
    /* 全选函数*/
    allTotal() {
      if (this.total_value.length === 1) {
        this.total.forEach((item, index) => {
          this.total_value.push(item.label)
          this.pushSingle(this.total_value, this.total, index)
        })
      } else {
        this.total_value = []
        for (let i = 0; i < this.total.length; i++) {
          for (let j = 0; j < this.final.length; j++) {
            if (this.final[j] === this.total[i].name) {
              this.final.splice(j, 1)
            }
          }
        }
      }
    },
    allEnv() {
      if (this.env_value.length === 1) {
        this.env.forEach((item, index) => {
          this.env_value.push(item.label)
          this.pushSingle(this.env_value, this.env, index)
        })
      } else {
        this.env_value = []
        for (let i = 0; i < this.env.length; i++) {
          for (let j = 0; j < this.final.length; j++) {
            if (this.final[j] === this.env[i].name) {
              this.final.splice(j, 1)
            }
          }
        }
      }
    },
    allRoad() {
      if (this.road_value.length === 1) {
        this.road.forEach((item, index) => {
          this.road_value.push(item.label)
          this.pushSingle(this.road_value, this.road, index)
        })
      } else {
        this.road_value = []
        for (let i = 0; i < this.road.length; i++) {
          for (let j = 0; j < this.final.length; j++) {
            if (this.final[j] === this.road[i].name) {
              this.final.splice(j, 1)
            }
          }
        }
      }
    },
    allCar() {
      if (this.car_value.length === 1) {
        this.car.forEach((item, index) => {
          this.car_value.push(item.label)
          this.pushSingle(this.car_value, this.car, index)
        })
      } else {
        this.car_value = []
        for (let i = 0; i < this.car.length; i++) {
          for (let j = 0; j < this.final.length; j++) {
            if (this.final[j] === this.car[i].name) {
              this.final.splice(j, 1)
            }
          }
        }
      }
    },
    allTwowheel() {
      if (this.twoWheel_value.length === 1) {
        this.twoWheel.forEach((item, index) => {
          this.twoWheel_value.push(item.label)
          this.pushSingle(this.twoWheel_value, this.twoWheel, index)
        })
      } else {
        this.twoWheel_value = []
        for (let i = 0; i < this.twoWheel.length; i++) {
          for (let j = 0; j < this.final.length; j++) {
            if (this.final[j] === this.twoWheel[i].name) {
              this.final.splice(j, 1)
            }
          }
        }
      }
    },
    allPerson() {
      if (this.person_value.length === 1) {
        this.person.forEach((item, index) => {
          this.person_value.push(item.label)
          this.pushSingle(this.person_value, this.person, index)
        })
      } else {
        this.person_value = []
        for (let i = 0; i < this.person.length; i++) {
          for (let j = 0; j < this.final.length; j++) {
            if (this.final[j] === this.person[i].name) {
              this.final.splice(j, 1)
            }
          }
        }
      }
    },
    /*选中后push对应的值进入数组*/
    sendTotal(index) {
      this.pushSingle(this.total_value, this.total, index)
    },
    sendEnv(index) {
      this.pushSingle(this.env_value, this.env, index)
    },
    sendRoad(index) {
      this.pushSingle(this.road_value, this.road, index)
    },
    sendCar(index) {
      this.pushSingle(this.car_value, this.car, index)
    },
    sendTwowheel(index) {
      this.pushSingle(this.twoWheel_value, this.twoWheel, index)
    },
    sendPerson(index) {
      this.pushSingle(this.person_value, this.person, index)
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
.el-checkbox-group {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.el-checkbox {
  width: 300px;
  margin-top: 10px;
}
</style>