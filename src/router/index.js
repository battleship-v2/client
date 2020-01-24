<<<<<<< HEAD
<<<<<<< HEAD
import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Board from '../views/Board.vue';
=======
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Rooms from "../views/RoomList.vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
>>>>>>> Create Landing Page, Create Room List
=======
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Rooms from '../views/RoomList.vue'
import Area from '../views/PlayingArea.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
>>>>>>> Add features disable button

Vue.use(BootstrapVue)
Vue.use(VueRouter)
Vue.use(IconsPlugin)
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
<<<<<<< HEAD
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/board',
    name: 'board',
    component: Board
  },{
    path: "/rooms",
    name: "rooms",
=======
    path: '/rooms',
    name: 'rooms',
>>>>>>> Add features disable button
    component: Rooms
  },
  {
    path: '/area',
    name: 'area',
    component: Area
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
