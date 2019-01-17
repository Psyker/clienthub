import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import ClientView from "./views/client/ClientView";

Vue.use(Router);

export default new Router({
  linkActiveClass: 'active-link',
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/client/:slug',
      name: 'client.view',
      component: ClientView,
      props: true,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
