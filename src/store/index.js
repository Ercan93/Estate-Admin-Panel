import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    records: null,
    appointment: {
      id: '',
      name: '',
      email: '',
      phone: '',
      employee: '',
      address: '',
      date: '',
      time: '',
      duration: '',
      distance: ''
    }
  },
  getters: {
    appointmentGetter (state) {
      return state.appointment
    }
  },
  mutations: {
    SET_APPOINTMENT_USER (state, payload) {
      state.appointment.name = payload.name
      state.appointment.email = payload.email
      state.appointment.employee = payload.employee
      state.appointment.phone = payload.phone
    },
    SET_APPOINTMENT_ADDRESS (state, payload) {
      state.appointment.address = payload
    },
    SET_APPOINTMENT_DATE (state, payload) {
      state.appointment.date = payload.date
      state.appointment.time = payload.time
    },
    SET_APPOINTMENT_DISTANCE (state, payload) {
      state.appointment.distance = payload.distance
      state.appointment.duration = payload.duration
    }
  },
  actions: {
    setAppointmentUser ({ commit }, payload) {
      commit('SET_APPOINTMENT_USER', payload)
    },
    setAppointmentAddress ({ commit }, payload) {
      commit('SET_APPOINTMENT_ADDRESS', payload)
    },
    setAppointmentDate ({ commit }, payload) {
      commit('SET_APPOINTMENT_DATE', payload)
    },
    setAppointmentDistance ({ commit }, payload) {
      commit('SET_APPOINTMENT_DISTANCE', payload)
    }
  },
  modules: {}
})
