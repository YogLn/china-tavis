<template>
  <div>
    <breadcrumb title="系统数据统计"></breadcrumb>
    <el-card>
      <el-row class="nav-bar">
        <el-form ref="form" label-width="10px" v-loading="loading" class="dataForm">
          <el-form-item v-for="(item,index) in form" :key="item.name" :prop="item.name">
            <el-select :name="item.name" v-model="item.value" @change="changes" :placeholder="item.label" clearable>
              <el-option v-for="it in item.options" :key="it.value" :label="it.label" :value="it.label"></el-option>
            </el-select>
            <i class="el-icon-delete-solid delDisplay" @click="delDisplay(index)" title="移除本项"></i>
          </el-form-item>
        </el-form>
        <div class="button-group">
          <el-button type="success" icon="el-icon-plus" @click="showDialog" :disabled="disable"></el-button>
          <el-button type="warning" @click="resetting">重 置</el-button>
          <el-button type="primary" @click="view">查看统计图</el-button>
        </div>
      </el-row>

      <el-table border stripe :data="tableData" style="width: 100%" max-height="450" v-loading="loading">
        <el-table-column prop="title" label="案例所属类型">
        </el-table-column>
        <el-table-column prop="countNum" label="对应案例数量">
        </el-table-column>
        <el-table-column label="案例百分比">
          <template slot-scope="scope">
            {{((scope.row.countNum / allCount) * 100).toFixed(2) + '%'}}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <el-button type="primary" @click="showCase">该型案例编号</el-button>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 该型案例编对话框 -->
    <case-number></case-number>
    <!-- 添加对话框 -->
    <data-dialog :Visible="addDialogVisible"></data-dialog>
    <!-- 统计图 -->
    <charts></charts>
  </div>
</template>

<script>
import Breadcrumb from '../../components/common/Breadcrumb.vue'
import DataDialog from './dataDialog.vue'
import bus from './bus'
import data1 from '../../components/statistics/findData'
import Charts from './Charts.vue'
import CaseNumber from './CaseNumber.vue'
export default {
  components: { Breadcrumb, DataDialog, Charts, CaseNumber },
  data() {
    return {
      addDialogVisible: false,
      code: '',
      opt: '',
      form: [],
      loading: false,
      disable: false,
      query: {},
      // 表格数据
      tableData: [],
      allCount: 0,
    }
  },
  created() {},
  mounted() {
    bus.$on('filedCode', (msg) => {
      this.code = msg
    })
    /*设置用户选定的值*/
    bus.$on('sendData', (msg) => {
      this.opt = msg
      data1.forEach((item, index) => {
        if (msg === item.name) {
          if (item.value !== '') {
            item.value = ''
          }
          this.form.push(item)
        }
      })
      this.disable = true
      this.getTable()
    })
  },
  methods: {
    showAddDialog() {},
    showDialog() {
      bus.$emit('chooseData', true)
    },
    delDisplay(index) {
      // 当删除之前满足条件为三个选满且删除的是最后一个时，加号不禁用
      if (this.form.length === 3 && index === 2) {
        this.disable = false
      } else if (this.form.length === 2 && index === 1) {
        this.disable = false
      }
      // 当选择项只有一个时也放开加号的权限
      else if (this.form.length === 1) {
        this.disable = false
        this.tableData = []
      }
      this.form.splice(index, 1)
    },
    /*下拉框的值改变时*/
    changes(val) {
      this.loading = true
      if (this.form.length === 3) {
        this.disable = true
      } else {
        this.disable = false
      }
      this.query = {}
      this.query[this.opt.toString()] = val
      this.getTable()
    },
    /*重置所有的选择项重新进行选择*/
    resetting() {
      this.disable = false
      this.form = []
      this.tableData = []
      this.allCount = 0
    },
    /** 获取表格数据 */
    async getTable() {
      this.query['code'] = this.code
      try {
        const { data: res } = await this.$http.post('statistics', this.query)
        let arr = []
        this.allCount = 0
        console.log(res);
        res.data.forEach((item) => {
          this.allCount += item.countNum
        })
        this.loading = false
        res.data.forEach((item) => {
          arr.push({
            title: item.title,
            案例数量: item.countNum,
            百分占比: (item.countNum / this.allCount) * 100,
          })
        })
        bus.$emit('vData', arr)
        this.tableData = res.data
      } catch (err) {
        console.log(err)
      }
    },

    /**
     * 该型案例编号
     */
    showCase() {
      bus.$emit('showCase', true)
      bus.$emit('queryInfo', this.query)
    },

    /**
     * 统计图
     */
    view() {
      bus.$emit('view', true)
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
.nav-bar {
  background-color: #eaedf1;
  height: 60px;
  display: flex;
  padding: 8px 0;
  width: 100%;
  align-items: center;
  position: relative;
  .dataForm {
    display: flex;
    height: 100%;
    .delDisplay {
      cursor: pointer;
      opacity: 0.3;
      margin: 0 2px;
    }
    .delDisplay:hover {
      opacity: 1;
    }
  }
  .button-group {
    position: absolute;
    right: 10px;
  }
}
</style>