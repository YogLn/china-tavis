<template>
  <div class="">
    <el-dialog :visible.sync="visible" title="该型案例编号" width="60%">
      <el-tag class="tag" v-for="item in cases" :key="item" type="info" effect="plain">
        {{ item }}
      </el-tag>
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
    return {
      visible: false,
      cases: [],
    }
  },
  mounted() {
    bus.$on('showCase', (msg) => {
      this.visible = msg
    })
    bus.$on('queryInfo', async (msg) => {
      const { data: res } = await this.$http.post('statistics/detail', msg)
      if (res.code !== 200) {
        return this.$message.error('获取该类型案例列表失败')
      }
      this.cases = res.data
    })
  },
}
</script>

<style lang="less" scoped>
.tag {
  margin: 10px;
}
</style>