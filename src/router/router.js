import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import ClientView from "../views/client/ClientView";
import Login from "../views/Login";
import Dashboard from "../views/user/Dashboard";
import {loginGuard} from "./guards";
import NewClientView from "../views/client/NewClientView";
import EditClientView from "../views/client/EditClientView"
import EditInterventionView from "../views/intervention/EditInterventionView";

Vue.use(Router);

const router = new Router({
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
      path: '/client/new',
      name: 'client.new',
      component: NewClientView,
    },
    {
      path: '/client/:slug/edit',
      props: true,
      name: 'client.edit',
      component: EditClientView,
    },
    {
      path: '/client/:slug/intervention/new',
      props: true,
      name: 'intervention.new',
      component: EditInterventionView
    },
    {
      path: '/client/:slug/intervention/:id/edit',
      props: true,
      name: 'intervention.edit',
      component: EditInterventionView
    },
    {
      path: '/client/'
    },
    {
      path: '/dashboard',
      name: 'user.dashboard',
      component: Dashboard
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
  ]
});

router.beforeEach(loginGuard);

export default router;
