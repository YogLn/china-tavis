<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>新建案例数据</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-form :model="addCaseForm" :rules="addCaseFormRules" ref="addCaseFormRef" label-width="200px" label-position="right">
        <!-- 第一行 -->
        <el-row>
          <el-col :span="8">
            <el-form-item label="目标与主车形式方向的关系" prop="verify">
              <el-input v-model="addCaseForm.id"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="委托编号" prop="verify">
              <el-input v-model="addCaseForm.id"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="事故具体类型" prop="verify">
              <el-input v-model="addCaseForm.id"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 第二行 -->
        <el-row>
          <el-col :span="8">
            <el-form-item label="参与方总数" prop="verify">
              <el-input v-model="addCaseForm.id"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="事故形态" prop="verify">
              <el-input v-model="addCaseForm.id"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="障碍物类型" prop="verify">
              <el-input v-model="addCaseForm.id"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 第三行 -->
        <el-row>
          <el-col :span="8">
            <el-form-item label="天网及其他视频" prop="verify">
              <el-input v-model="addCaseForm.id"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="事故分类" prop="verify">
              <el-input v-model="addCaseForm.id"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="参与方类别" prop="verify">
              <el-input v-model="addCaseForm.id"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 第四行 -->
        <el-row>
          <el-col :span="8">
            <el-form-item label="目标与主车形式方向的关系" prop="verify">
              <el-input v-model="addCaseForm.id"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <!-- 按钮区域 -->
      <div class="btn">
        <el-button type="primary" icon="el-icon-arrow-left">上一步</el-button>
        <el-button type="primary" icon="el-icon-arrow-save">保存信息</el-button>
        <el-button type="primary" icon="el-icon-arrow-right">下一步</el-button>
      </div>
    </el-card>

    <el-steps class="steps" :active="0" finish-status="success" simple>
      <el-step title="总体信息"></el-step>
      <el-step title="环境信息"></el-step>
      <el-step title="道路信息"></el-step>
      <el-step title="参与方信息"></el-step>
    </el-steps>
  </div>

</template>

<script>
export default {
  data() {
    return {
      addCaseForm: {
        id: '',
      },
      addCaseFormRules: {
        verify: [
          { required: true, message: '必填信息不得为空', trigger: 'blur' },
        ],
      },
    }
  },
  created() {},
  methods: {},
}
</script>

<style lang="less" scoped>
.steps {
  width: 68%;
  position: fixed;
  // left: 50%;
  // transform: translateX(-50%);
  bottom: 20px;
}
.el-card {
  height: 540px;
  position: relative;
}
.el-input {
  width: 100%;
}
.btn {
  left: 50%;
  transform: translateX(-50%);
  position: absolute;
  bottom: 20px;
}
</style>