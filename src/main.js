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

// 引入v-charts
import VCharts from 'v-charts'
Vue.use(VCharts)

axios.defaults.baseURL = 'http://localhost:8080/api/'
// axios.defaults.baseURL = 'http://china-tavis.com:8081/api/'
axios.defaults.headers = {
  'Content-Type': 'application/json', //如果写成contentType会报错
}
Vue.prototype.$http = axios
Vue.config.productionTip = false

axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  config.headers.Captcha = window.sessionStorage.getItem('captcha')
  // 固定写法，在最后return config
  return config
}, error => {
  console.log(error);
})

axios.interceptors.response.use(function (response) {
  window.sessionStorage.setItem('captcha', response.headers.captcha)
  return response;
}, function (error) {
  if (window.location.href == 'http://china-tavis.com/login')
    return
  if (error.response.data.status == 401) {
    window.alert('登录失效，请重新登录')
    return router.push('/login')
  }
  if (error.response.data.status == 403) {
    window.alert('无权访问')
  }
  return Promise.reject(error);
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
