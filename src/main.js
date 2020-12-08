import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import 'element-ui/lib/theme-chalk/index.css';
// 导入字体图标
import './assets/fonts/iconfont.css'
// 导入全局样式表
import './assets/css/gloabl.css'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8080/api/'
axios.defaults.headers = {
  'Content-Type': 'application/json', //如果写成contentType会报错
}
// const instance = axios.create({
//   baseURL: "http://localhost:8080/api/",
//   headers: {
//     // 与后端约定的
//     'Content-Type': 'application/json;charset=UTF-8',
//   },
// })
// Vue.prototype.$http = instance
Vue.prototype.$http = axios

Vue.config.productionTip = false

axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 固定写法，在最后return config
  return config 
})
// axios.interceptors.request.use(config => {
//   console.log(config);
//   config.headers.Authorization = window.sessionStorage.getItem('token')
//   console.log(config);
//   return config
// })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
