<template>
  <div>
    <el-dialog :visible.sync="visible" :title="selectName" width="80%">
      <ve-histogram class="charts" :settings="chartSettings" :data="chartData" :extend="chartExtend" :grid="grid"></ve-histogram>
      <span slot="footer" class="dialog-footer">
        <el-button type="info" @click="visible = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import bus from './bus'
export default {
  data() {
    this.chartSettings = {
      axisSite: { right: ['百分占比'] },
      yAxisName: ['案例数量', '百分占比%'],
    }
    this.grid = { right: 40 }
    return {
      selectName: '',
      visible: false,
      chartData: {
        columns: ['title', '案例数量', '百分占比'],
        rows: [],
      },
      chartExtend: {
        xAxis: {
          axisLabel: {
            interval: 0,
            //换行显示
            formatter: function (value) {
              let result = '' //拼接加\n返回的类目项
              let maxLength = 4 //每项显示文字个数
              let valLength = value.length //X轴类目项的文字个数
              let rowNumber = Math.ceil(valLength / maxLength) //类目项需要换行的行数
              if (rowNumber > 1) {
                //如果文字大于3,
                for (let i = 0; i < rowNumber; i++) {
                  let temp = '' //每次截取的字符串
                  let start = i * maxLength //开始截取的位置
                  let end = start + maxLength //结束截取的位置
                  temp = value.substring(start, end) + '\n'
                  result += temp //拼接生成最终的字符串
                }
                return result
              } else {
                return value
              }
            },
          },
        },
        'yAxis.0.min': 0,

        'yAxis.0.minInterval': 1, // minInterval设置间隔值，1为整数

        'yAxis.1.splitLine.show': true, // yAxis.1： y轴右侧 //不显示值标线

        'yAxis.1.minInterval': 10, // minInterval设置间隔值，1为整数
      },
    }
  },
  mounted() {
    bus.$on('view', (msg) => {
      this.visible = msg
    })
    bus.$on('vData', (msg) => {
      this.chartData.rows = msg
    })
    bus.$on('getSelectName', (msg) => {
      this.selectName = msg
    })
  },
}
</script>

<style lang="less" scoped>
.dialog {
  margin-left: 2%;
  width: 98%;
  height: 200px;
  overflow-y: auto;
}
.el-dialog__body {
  padding: 0;
}
</style>