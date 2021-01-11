<template>
  <div class="comboFind">
    <div class="comboForm">
      <div v-for="(item, index) in form" :key="index" v-if="formNew == '1'">
        <el-form ref="formRef" :model="item" label-width="300px" class="">
          <el-col :span="12">
            <el-form-item :label="item.label">
              <el-select v-model="optVal[index]" placeholder="请选择">
                <el-option v-for="opt in item.options" :key="opt.value" :label="opt.label" :value="opt.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form>
      </div>
    </div>

    <div class="findBottom">
      <el-button type="warning" @click="cancel">返回重选</el-button>
      <el-button type="primary" @click="search">确认查询</el-button>
    </div>
  </div>
</template>

<script>
import bus from './bus'
import arrayData from '../../components/statistics/findData'
import dataform from '../../components/form/form'

export default {
  name: 'comboFind',
  components: {
    dataform,
  },
  data() {
    return {
      /*强制刷新组件*/
      formNew: '1',
      /*用户选择的项*/
      choose: [],
      /*渲染数组*/
      form: [],
      //
      optVal: [],
    }
  },
  methods: {
    /*传入用户选择的值*/
    getData() {
      this.choose.forEach((item) => {
        arrayData.forEach((res) => {
          if (res.name === item) this.form.push(res)
        })
      })
    },
    /*取消重选*/
    cancel() {
      bus.$emit('cancel')
      this.choose = []
      this.form = []
    },
    /*强制组件刷新*/
    componentNew() {
      this.formNew = '2'
      this.$nextTick(() => {
        this.formNew = '1'
      })
    },
    /*查询函数*/
    search() {
      let postData = {}
      for (let i = 0; i < this.form.length; i++) {
        postData[this.form[i].name] = this.optVal[i]
      }
      //发送事件表示已经获取到数据
      bus.$emit('getResult', postData)
    },
  },
  created() {
    bus.$on('choose', (msg) => {
      this.choose = msg
      this.getData()
      this.componentNew()
    })
  },
}
</script>

<style scoped>
.comboFind {
  width: 100%;
}
.comboForm {
  overflow: auto;
  height: 400px;
}
.findBottom {
  bottom: 6px;
  right: 100px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
