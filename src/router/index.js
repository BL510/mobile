import Vue from 'vue'
import Router from 'vue-router'
import Tabbar from '@/views/Tabbar.vue'
import Home from '@/views/home/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      // name: 'tabbar',
      path: '/',
      component: Tabbar,
      children: [
        {
          name: 'home',
          path: '',
          component: Home
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
    }
  ]
})
