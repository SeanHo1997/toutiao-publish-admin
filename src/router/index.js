import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/layout' },
  { path: '/login', name: 'login', component: () => import('../views/login/index.vue') },
  {
    path: '/layout',
    redirect: '/layout/index',
    component: () => import('../views/layout/index.vue'),
    children: [
      { path: 'index', name: 'index', component: () => import('../views/index/index.vue') },
      { path: 'content', name: 'content', component: () => import('../views/content/index.vue') },
      { path: 'material', name: 'material', component: () => import('../views/material/') },
      { path: 'publish', name: 'publish', component: () => import('../views/publish/index.vue') },
      { path: 'comments', name: 'comments', component: () => import('../views/comment/index.vue') },
      {
        path: 'fans',
        name: 'fans',
        component: () => import('../views/fans/index.vue')
      },
      { path: 'profile', name: 'profile', component: () => import('../views/profile/index.vue') }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 设置导航守卫
router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    if (!store.state.user) {
      router.replace('/login')
      // router.push和next('/login') 都可以
    } else {
      next()
    }
  } else {
    // 非登录页面正常通行
    next()
  }
})

export default router
