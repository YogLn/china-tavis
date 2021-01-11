<template>
  <div>
    <el-dialog title="组合筛选查找" width="80%" :visible.sync="visible">
      <choose v-show="type === '1'"></choose>
      <total-form v-show="type === '2'"></total-form>
    </el-dialog>
  </div>
</template>

<script>
import bus from './bus'
import Choose from './Choose.vue'
import TotalForm from './TotalForm.vue'

export default {
  components: { Choose, TotalForm },
  created() {
    /*打开弹窗*/
    bus.$on('filterFind', () => {
      this.visible = true
    })
    /*选择完毕之后*/
    bus.$on('chooseType', () => {
      this.type = '2'
    })
    /*取消选择*/
    bus.$on('cancel', () => {
      this.type = '1'
    })
    /*获取到数据后关闭弹出框*/
    bus.$on('show', (msg) => {
      this.visible = true
    })
    bus.$on('close', () => {
      this.visible = false
    })
  },
  data() {
    return {
      /*控制开关*/
      visible: false,
      /*控制显示内容*/
      type: '1',
    }
  },
  methods: {
    show() {
      this.visible = true
    },
  },
}
</script>
<style scoped>
</style>
