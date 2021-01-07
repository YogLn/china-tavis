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
Vue.prototype.$http = axios
Vue.config.productionTip = false

axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 固定写法，在最后return config
  return config 
},error => {
  console.log(error);
})

axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  console.log(error);
  // window.alert('登录失效，请重新登录')
  // router.push('/login')
  return Promise.reject(error);
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
