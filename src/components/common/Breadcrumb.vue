<template>
  <!-- 面包屑导航区域 -->
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
    <slot name="restore"></slot>
    <slot name="reset"></slot>
  </el-breadcrumb>
</template>

<script>
export default {
  props: ['title'],
}
</script>

<style>
</style>