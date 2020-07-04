import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 解决路由访问重复时报错问题：
const originalPush = Router.prototype.push
Router.prototype.push = function replace(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/rank',
      name: 'rank',
      component: () => import('../components/search/search.vue')
    },
    {
      path: '/singer',
      name: 'singer',
      component: () => import('../components/singer/singer.vue'),
      children: [
        {
          path: ':id',
          component: () => import('../components/singer-detail/singer-detail')
        }
      ]
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: () => import('../components/recommend/recommend.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../components/search/search.vue')
    }
  ]
})
