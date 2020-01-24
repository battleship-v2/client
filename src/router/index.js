import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Rooms from '../views/RoomList.vue';
import Board from '../views/Board.vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';

Vue.use(BootstrapVue);
Vue.use(VueRouter);
Vue.use(IconsPlugin);
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/board',
    name: 'board',
    component: Board
  },
  {
    path: '/rooms',
    name: 'rooms',
    component: Rooms
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
