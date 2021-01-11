<template>
  <div class="choose">
    <div class="el-dialog-div">
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item title="总体信息" name="1">
          <el-checkbox-group v-model="choose">
            <el-checkbox v-for="(item,index) in data1.total" :key="index" :label="item.label" boder :name="item.name" :value="item.name" border @change="sendTotal(index)"></el-checkbox>
          </el-checkbox-group>
        </el-collapse-item>
        <el-collapse-item title="环境信息" name="2">
          <el-checkbox-group v-model="choose">
            <el-checkbox v-for="(item,index) in data1.env" :key="index" :label="item.label" @change="sendEnv(index)" :value="item.name" border :name="item.name"></el-checkbox>
          </el-checkbox-group>
        </el-collapse-item>
        <el-collapse-item title="道路信息" name="3">
          <el-checkbox-group v-model="choose">
            <el-checkbox v-for="(item,index) in data1.road" :key="index" :label="item.label" @change="sendRoad(index)" :value="item.name" border :name="item.name"></el-checkbox>
          </el-checkbox-group>
        </el-collapse-item>
        <el-collapse-item title="参与方信息(车)" name="4">
          <el-checkbox-group v-model="choose">
            <el-checkbox v-for="(item,index) in data1.car" :key="index" :label="item.label" @change="sendCar(index)" :value="item.name" border :name="item.name"></el-checkbox>
          </el-checkbox-group>
        </el-collapse-item>
        <el-collapse-item title="参与方信息(二轮车)" name="5">
          <el-checkbox-group v-model="choose">
            <el-checkbox v-for="(item,index) in data1.twoWheel" :key="index" :value="item.name" @change="sendTwowheel(index)" :label="item.label" border :name="item.name"></el-checkbox>
          </el-checkbox-group>
        </el-collapse-item>
        <el-collapse-item title="参与方信息(人)" name="6">
          <el-checkbox-group v-model="choose">
            <el-checkbox v-for="(item,index) in data1.person" :key="index" :value="item.name" @change="sendPerson(index)" :label="item.label" border :name="item.name"></el-checkbox>
          </el-checkbox-group>
        </el-collapse-item>
      </el-collapse>
    </div>

    <div class="sureButton">
      <el-button @click="closed">关 闭</el-button>
      <el-button @click="reset" type="warning">重 选</el-button>
      <el-button type="primary" @click="save">下 一 步</el-button>
    </div>

  </div>
</template>

<script>
import bus from './bus'
import dataExport from './data'
export default {
  data() {
    return {
      visible: false,
      choose: [],
      finalSet: new Set(),
      final: [],
      activeName: '',
      data1: {},
    }
  },
  created() {
    this.data1 = dataExport
    bus.$on('showDialog', (msg) => {
      this.visible = true
    })
    bus.$on('cancel', () => {
      this.final = []
      this.choose = [] 
    })
  },
  methods: {
    /* 关闭 */
    closed() {
      bus.$emit('close')
    },
    /*清空筛选项函数*/
    reset() {
      this.choose = []
      this.final = []
      this.finalSet.clear()
    },
    save() {      
      this.final = Array.from(this.finalSet)
      bus.$emit('choose', this.final)
      bus.$emit('chooseType')
      this.finalSet.clear()
    },
    /*选中后push对应的值进入数组*/
    sendTotal(index) {
      this.finalSet.add(this.data1.total[index].name)
    },
    sendEnv(index) {
      this.finalSet.add(this.data1.env[index].name)
    },
    sendRoad(index) {
      this.finalSet.add(this.data1.road[index].name)
    },
    sendCar(index) {
      this.finalSet.add(this.data1.car[index].name)
    },
    sendTwowheel(index) {
      this.finalSet.add(this.data1.twoWheel[index].name)
    },
    sendPerson(index) {
      this.finalSet.add(this.data1.person[index].name)
    },
    mounted() {
      bus.$on('cancel', () => {
        this.final = []
        this.choose = []
        this.finalSet.clear()
      })
    },
  },
}
</script>

<style lang="less" scoped>
.choose {
  height: 440px;
  overflow: auto;
  .sureButton {
    margin-top: 100px;
    margin-left: 76%;
    width: 20%;
    display: flex;
    align-items: center;
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
}
</style>