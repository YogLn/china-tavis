<template>
  <el-form :inline="true" :model="value" label-position="right" :label-width="formConfig.labelWidth" :rules="rules" size='mini'>
    <slot name="formItem" />
    <el-form-item v-for="(item,index) in formConfig.formItemList" :key="index" :label="item.label" :prop="item.prop">
      <el-input v-if="item.type=='input'" v-model="value[item.prop]" :disabled="item.disabled" :clearable="true" :placeholder="item.placeholder"></el-input>
      <el-select :clearable="true" v-else-if="item.type=='select'" v-model="value[item.prop]" :disabled="item.disabled" :placeholder="item.placeholder">
        <el-option v-for="(optItem,index) in item.optList" :key="index" :label="optItem.label" :value="optItem.value"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  components: {},
  props: {
    formConfig: {
      type: Object,
      required: true,
    },
    value: {
      type: Object,
      required: true,
    },
    rules: {
      type: Object,
    },
  },
  computed: {},
  methods: {
    setDefaultValue() {
      const formData = { ...this.value }
      // 设置默认值
      this.formConfig.formItemList.forEach(({ key, value }) => {
        if (formData[key] === undefined || formData[key] === null) {
          formData[key] = value
        }
      })
      this.$emit('input', formData)
    },
  },
  mounted() {
    this.setDefaultValue()
  },
}
</script>