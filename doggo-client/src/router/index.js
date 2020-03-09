import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AllBreeds from '../views/AllBreeds.vue'
import BreedInfo from '../views/BreedInfo.vue'
// import Login from '../views/Login.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/allbreeds',
    name: 'allbreeds',
    component: AllBreeds
  },

  {
    path: '/breedinfo/:index',
    name: 'pets',
    component: BreedInfo
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
