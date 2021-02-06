<template>
  <div class="">
    <el-dialog :visible.sync="visible" title="该型案例编号" width="60%">
      <el-tag class="tag" v-for="item in cases" :key="item.id" type="info" effect="plain" v-loading="caseLoading">
        <div @click="showDetail(item.id)" class="caseNum">
          {{ item.caseNumber }}
        </div>
      </el-tag>
      <span slot="footer" class="dialog-footer">
        <el-button type="info" @click="visible = false">关 闭</el-button>
      </span>
    </el-dialog>

    <detail-form :visible="detailsDialogVisible" ref="DetailFormRef"></detail-form>
  </div>
</template>

<script>
import bus from './bus'
import DetailForm from '../../components/dialog/DetailForm.vue'

export default {
  components: {
    DetailForm,
  },
  data() {
    return {
      visible: false,
      cases: [],
      detailsDialogVisible: false,
      caseLoading: false
    }
  },
  mounted() {
    bus.$on('showCase', (msg) => {
      this.visible = msg
    })
    bus.$on('queryInfo', async (msg) => {
      this.caseLoading = true
      const { data: res } = await this.$http.post('statistics/detail', msg)
      if (res.code !== 200) {
        return this.$message.error('获取该类型案例列表失败')
      }
      this.cases = res.data
      this.caseLoading = false
    })
  },
  methods: {
    showDetail(id) {
      this.$refs.DetailFormRef.getDetailList(id)
    },
  },
}
</script>

<style lang="less" scoped>
.tag {
  margin: 10px;
}
.caseNum {
  cursor: pointer;
}
</style>