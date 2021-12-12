import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CreateAppointment from '../views/CreateAppointment.vue'
import Appointments from '../views/Appointments.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/CreateAppointment',
    name: 'CreateAppointment',
    component: CreateAppointment
  },
  {
    path: '/UpdateAppointment',
    name: 'UpdateAppointment',
    component: CreateAppointment,
    beforeEnter: (to, from, next) => {
      if (from.name === 'Appointments') {
        next()
      } else {
        next('/Appointments')
      }
    }
  },
  {
    path: '/Appointments',
    name: 'Appointments',
    component: Appointments
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
