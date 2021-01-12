import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import('../views/Login.vue')
const Home = () => import('../views/Home.vue')
const Welcome = () => import('../views/Welcome.vue')
const NewCase = () => import('../views/NewCase.vue')
const Manager = () => import('../views/manage/Manager.vue')
const Site = () => import('../views/manage/Site.vue')
const Total = () => import('../views/data/Total.vue')
const Assign = () => import('../views/Assign.vue')
const Export = () => import('../views/Export.vue')
const Review = () => import('../views/Review.vue')
const Statistic = () => import('../views/statistics/Statistic.vue')

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
