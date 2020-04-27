import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

var routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomePage/HomePage')
  }
];

var router = new VueRouter({
  mode: 'history',
  routes
});

export default router
