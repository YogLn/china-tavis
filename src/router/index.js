import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Welcome from '../views/Welcome.vue'
import NewCase from '../views/NewCase.vue'
import Car from '../views/Car.vue'
import Manager from '../views/Manager.vue'
import Site from '../views/Site.vue'
import Total from '../views/Total.vue'
import Assign from '../views/Assign.vue'
import Export from '../views/Export.vue'
import Review from '../views/Review.vue'
import Statistic from '../views/Statistic.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '',
		redirect: '/login',
	},
	{
		path: '/login',
		component: Login,
	},
	{
		path: '/home',
		component: Home,
		redirect: '/welcome',
		children: [
      { path: '/welcome', component: Welcome },
      { path: '/newcase', component: NewCase },
      { path: '/car', component: Car },
      { path: '/manager', component: Manager },
      { path: '/site', component: Site },
      { path: '/total', component: Total },
      { path: '/assign', component: Assign },
      { path: '/export', component: Export },
      { path: '/statistic', component: Statistic },
      { path: '/review', component: Review },
    ]
	},
]

const router = new VueRouter({
	routes,
	mode: 'history',
})
// 挂载路由导航守卫
router.beforeEach((to,from,next) => {
  if(to.path === '/login') next()
  // 获取 token
  const tokenStr = window.sessionStorage.getItem('token')
  if(!tokenStr) return next('/login')
  next()
})
export default router
