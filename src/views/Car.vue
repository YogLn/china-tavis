<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>车辆信息管理</el-breadcrumb-item>
    </el-breadcrumb>

  </div>
</template>

<script>
export default {
  data() {
    return {
      queryInfo: {
        current: 1,
        size: 5,
      },
      carList: [],
    }
  },
  created() {
    this.getCarList()
  },
  methods: {
    async getCarList() {
      const res = await this.$http.get(`car/list`,{params: this.queryInfo})
      // const res = await this.$http.get('two_wheeler/list')
      console.log(res)
    },
  },
}
</script>

<style lang="less" scoped>
</style>