<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-input :placeholder="inputText" v-model="query" clearable @clear="getDataList">
          <el-button slot="append" icon="el-icon-search" @click="getDataList"></el-button>
        </el-input>
      </el-col>
      <el-col :span="2.5">
        <el-button type="primary" @click="showDialog">组合筛选查找</el-button>
      </el-col>
      <el-col :span="1">
        <el-button type="primary" @click="getAllCase">查找所有案例</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: ['inputText'],
  data() {
    return {
      query: ''
    }
  },
  methods: {
    getDataList() {
      this.$emit('getDataList',this.query)
    },
    showDialog() {
      this.$emit('showDialog')
    },
    getAllCase() {
      this.$emit('getAllCase')
    }
  },
}
</script>

<style>
</style>