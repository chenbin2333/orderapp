import Vue from 'vue'
import VueRouter from 'vue-router'
import Order from '../views/nav/Order'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Order',
      component: Order
    },
    {
      path: '/rate',
      name: 'Rate',
      component: () => import('../views/nav/Rate')
    },
    {
      path: '/merchant',
      name: 'merchant',
      component: () => import('../views/nav/Merchant')
    }
  ]
})

