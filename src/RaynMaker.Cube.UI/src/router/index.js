import Vue from 'vue'
import Router from 'vue-router'
import Explore from '@/components/Explore'

Vue.use(Router)

// https://router.vuejs.org/en/advanced/data-fetching.html
export default new Router({
  routes: [
    { path: '/Explore', alias: '/', component: Explore }
  ],
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})
