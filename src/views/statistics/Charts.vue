<template>
  <div>
    <el-dialog :visible.sync="visible" title="图表数据" width="60%">
      <ve-histogram :settings="chartSettings" :data="chartData"></ve-histogram>
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
      stack: { 案例: ['案例数量', '百分占比'] },
    }
    return {
      visible: false,
      chartData: {
        columns: ['title', '案例数量', '百分占比'],
        rows: [],
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
  },
}
</script>

<style lang="less" scoped>
</style>