<template>
  <div class="dialog">
    <el-dialog :visible.sync="addDialogVisible" width="80%">
      <div class="choose">
        <el-collapse v-model="activeName" accordion>
          <el-collapse-item title="基本信息" name="1">
            <el-radio v-model="chooseValue" border v-for="(item) in total " :key="item.name" :label="item.name" @change="change(item.label)">{{item.label}}</el-radio>
          </el-collapse-item>
          <el-collapse-item title="环境信息" name="2">
            <el-radio v-model="chooseValue" border v-for="(item) in env " :key="item.name" :label="item.name" @change="change(item.label)">{{item.label}}</el-radio>
          </el-collapse-item>
          <el-collapse-item title="道路信息" name="3">
            <el-radio v-model="chooseValue" border v-for="(item) in road " :key="item.name" :label="item.name" @change="change(item.label)">{{item.label}}</el-radio>
          </el-collapse-item>
          <el-collapse-item title="参与方信息(车)" name="4">
            <el-radio v-model="chooseValue" border v-for="(item) in car " :key="item.name" :label="item.name" @change="change(item.label)">{{item.label}}</el-radio>
          </el-collapse-item>
          <el-collapse-item title="参与方信息(二轮车)" name="5">
            <el-radio v-model="chooseValue" border v-for="(item) in twoWheel" :key="item.name" :label="item.name" @change="change(item.label)">{{item.label}}</el-radio>
          </el-collapse-item>
          <el-collapse-item title="参与方信息(人)" name="6">
            <el-radio v-model="chooseValue" border v-for="(item) in person " :key="item.name" :label="item.name" @change="change(item.label)">{{item.label}}</el-radio>
          </el-collapse-item>
        </el-collapse>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveSelect" :disabled="disabled">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import bus from './bus'
export default {
  data() {
    return {
      addDialogVisible: false,
      /*显示哪一部分的筛选选项*/
      activeName: '1',
      /*是否显示*/
      visible: false,
      /*限制提交*/
      disabled: true,
      /*单选框最后的值*/
      chooseValue: '',
      /*每一部分对应的可选值*/
      total: [
        { label: '参与方总数', name: 'g1003' },
        { label: '事故形态', name: 'g1004' },
        { label: '事故分类', name: 'g1005' },
        { label: '障碍物类型', name: 'g1006' },
        { label: '视频类型', name: 'g1007' },
        {
          label: '参与方一视角下参与方二的行驶（走）方向',
          name: 'g1008',
        },
      ],
      env: [
        { label: '路段信息', name: 'e2002' },
        { label: '天气', name: 'e2003' },
        { label: '日间太阳光线', name: 'e2005' },
        { label: '雾天的能见度', name: 'e2006' },
        { label: '照明情况', name: 'e2008' },
      ],
      road: [
        { label: '总体机动车道数', name: 'r6004' },
        { label: '参与方行驶方向机动车道数', name: 'r6005' },
        { label: '参与方行驶方向对向机动车道数', name: 'r6006' },
        { label: '非机动车道', name: 'r6007' },
        { label: '道路横截面的轮廓', name: 'r6008' },
        { label: '对向机动车道隔离形式', name: 'r6009' },
        {
          label: '本侧机非车道隔离形式',
          name: 'r6010',
        },
        { label: '对向机动车道侧机非车道隔离形式', name: 'r6011' },
        { label: '现场有何种交通警告标志', name: 'r6015' },
        { label: '现场有何种交通禁令标志', name: 'r6016' },
        { label: '道路的线形', name: 'r6017' },
        { label: '沿道路方向的趋势', name: 'r6018' },
        { label: '路面材料', name: 'r6019' },
        { label: '道路表面污染', name: 'r6020' },
        { label: '路表潮湿度', name: 'r6021' },
        { label: '路面状况', name: 'r6022' },
        { label: '交通标志是否被阻挡不可见', name: 'r6023' },
        { label: '路口信号灯', name: 'r6024' },
        { label: '路灯是否开启', name: 'r6025' },
        { label: '路灯的密度 ', name: 'r6026' },
        { label: '是否有轨道', name: 'r6027' },
        { label: '影响视线的障碍物', name: 'r6028' },
        { label: '道路状况评估', name: 'r6029' },
        { label: '是否有建筑设施', name: 'r6030' },
        { label: '交通限速设施', name: 'r6031' },
        { label: '车辆是否冲到相应路边', name: 'r6032' },
        { label: '是否为变宽路段', name: 'r6033' },
        { label: '是否有为变窄路段', name: 'r6034' },
        { label: '是否有隧道', name: 'r6035' },
        { label: '是否为匝道口', name: 'r6036' },
      ],
      car: [
        { label: '车辆类型', name: 'v3003' },
        { label: '是否有EDR报告', name: 'v3004' },
        { label: '车辆损坏情况', name: 'v3007' },
        { label: '车内人员伤亡情况', name: 'v3008' },
        { label: '车辆颜色', name: 'v3009' },
        { label: '主要过错1', name: 'v3017' },
        { label: '主要过错2', name: 'v3018' },
        { label: '是否有优先权', name: 'v3019' },
        { label: '所在道路方向', name: 'v3020' },
        { label: '事故前车辆要避撞的对向', name: 'v3021' },
        { label: '事故前车辆的避撞行为', name: 'v3022' },
        {
          label: '是否有视野盲区)',
          name: 'v3023',
        },
        { label: '事故发生前车辆运动类型', name: 'v3026' },
         { label: '开始反应到碰撞前是否采取转向措施', name: 'v3027' },
        { label: '是否使用安全带', name: 'v3028' },
        { label: '安全气囊是否展开', name: 'v3029' },
        { label: '是否有行人主动保护装置', name: 'v3030' },
        { label: '是否有ABS防抱死系统', name: 'v3031' },
        { label: '是否有EBD制动力分配系统系统', name: 'v3032' },
        { label: '是否有ESP/VSC车身电子稳定系统', name: 'v3033' },
        { label: '是否有ASR/TCS/TRC/ATC牵引力控制系统', name: 'v3034' },
        {
          label: '是否有EBA/BAS刹车辅助系统',
          name: 'v3035',
        },
        { label: '胎压监测装置', name: 'v3036' },
        { label: '并线辅助/盲点监测', name: 'v3037' },
        { label: '车道偏离预警LDW', name: 'v3038' },
        { label: '车道保持系统LKA', name: 'v3039' },
        { label: '自动紧急制动系统', name: 'v3040' },
        { label: '预碰撞安全系统AWS', name: 'v3041' },
      ],
      twoWheel: [
        { label: '二/三轮车种类', name: 't5002' },
        { label: '二/三轮车颜色', name: 't5003' },
        { label: '主要过错1', name: 't5008' },
        { label: '主要过错2', name: 't5009' },
        { label: '二轮车运动方向', name: 't5010' },
        { label: '二轮车第一碰撞位置相对自身方位 ', name: 't5012' },
        { label: '骑车人性别 ', name: 't5013' },
        { label: '衣着颜色', name: 't5014' },
        { label: '骑车人伤亡情况', name: 't5015' },
        {
          label: '是否佩戴头盔',
          name: 't5016',
        },
        { label: '头盔颜色', name: 't5017' },
        { label: '在黑暗处或夜间衣物可见性', name: 't5018' },
        { label: '事故时转向避让反应', name: 't5019' },
        { label: '事故时二轮车转向灯是否开启', name: 't5020' },
        { label: '是否有优先权', name: 't5021' },
        { label: '开始反应到碰撞前是否采取转向措施', name: 't5022' },
        { label: '事故发生前车辆运动类型', name: 't5023' },
        { label: '事故发生前车辆运动类型', name: 't5024' },
        { label: '乘员伤亡情况', name: 't5025' },
      ],
      person: [
        { label: '性别', name: 'p4002' },
        { label: '人员伤亡情况', name: 'p4003' },
        { label: '衣着颜色', name: 'p4005' },
        { label: '黑暗处或夜间衣物可见性', name: 'p4006' },
        {
          label: '事故发生地点',
          name: 'p4007',
        },
        { label: '行人穿越机动车道位置', name: 'p4008' },
        { label: '行人行走方向', name: 'p4009' },
        {
          label: '行人运动状态',
          name: 'p4010',
        },
        {
          label: '行人被撞部位',
          name: 'p4012',
        },
        {
          label: '碰撞前行人相对于车辆的位置',
          name: 'p4013',
        },
        {
          label: '穿越机动车道时能否被看到',
          name: 'p4014',
        },
        { label: '是否因为视野盲区造成事故', name: 'p4015' },
        {
          label: '是否由停靠车辆造成行人的视野盲区',
          name: 'p4016',
        },
        {
          label: '是否有其他造成行人视线盲区的物体',
          name: 'p4017',
        },
        {
          label: '开始反应到碰撞前是否有应急姿态',
          name: 'p4018',
        },
        {
          label: '行人是否从障碍物后穿出',
          name: 'p4019',
        },
        {
          label: '行人意识到危险之前是否加速',
          name: 'p4020',
        },
        {
          label: '事故前行人行走方向是否改变',
          name: 'p4021',
        },
      ],
      disabled: true,
      selectName: ''
    }
  },
  mounted() {
    bus.$on('chooseData', (msg) => {
      this.addDialogVisible = msg
    })
  },
  methods: {
    //
    saveSelect() {
      this.addDialogVisible = false
      this.save()
    },
    /*选择了值才能下一步*/
    change(name) {
      this.selectName = name
      this.disabled = false
    },
    /*保存*/
    save() {
      /*对应值和对应表格的01码*/
      let filedCode = ''
      let tableCode = 1000000
      this.total.forEach((item, index) => {
        if (this.chooseValue === item.name) {
          filedCode += '1'
          tableCode += 100000
        } else {
          filedCode += '0'
        }
      })
      this.env.forEach((item, index) => {
        if (this.chooseValue === item.name) {
          filedCode += '1'
          tableCode += 10000
        } else {
          filedCode += '0'
        }
      })
      this.road.forEach((item, index) => {
        if (this.chooseValue === item.name) {
          filedCode += '1'
          tableCode += 1000
        } else {
          filedCode += '0'
        }
      })
      this.car.forEach((item, index) => {
        if (this.chooseValue === item.name) {
          filedCode += '1'
          tableCode += 100
        } else {
          filedCode += '0'
        }
      })
      this.person.forEach((item, index) => {
        if (this.chooseValue === item.name) {
          filedCode += '1'
          tableCode += 10
        } else {
          filedCode += '0'
        }
      })
      this.twoWheel.forEach((item, index) => {
        if (this.chooseValue === item.name) {
          filedCode += '1'
          tableCode += 1
        } else {
          filedCode += '0'
        }
      })
      /*对应表格的01码*/
      //将数据转换为字符串
      tableCode = String(tableCode)
      //截取掉第一位
      tableCode = tableCode.slice(1, 7)
      bus.$emit('filedCode', filedCode)
      bus.$emit('tableCode', tableCode)
      bus.$emit('sendData', this.chooseValue)
      bus.$emit('getSelectName', this.selectName)
      this.chooseValue = ''
      this.visible = false
    },
    beforeDestroy() {
      bus.$off('chooseData')
      bus.$off('sendData')
    },
  },
}
</script>

<style lang="less" scoped>
.choose {
  margin-left: 2%;
  width: 98%;
  height: 400px;
  overflow-y: auto;
}
.sureButton {
  margin-left: 70%;
  margin-top: 2%;
  width: 20%;
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.el-collapse-item__content {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.el-radio {
  width: 320px;
  margin-top: 10px;
  margin-left: 10px;
}
</style>