import Vue from 'vue'
import Router from 'vue-router'
import Customers from './views/Customers.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'customers',
      component: Customers
    },
    {
      path: '/history',
      name: 'history',
      component: () => import('./views/History.vue')
    }
  ]
})
