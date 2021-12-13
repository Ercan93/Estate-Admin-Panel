import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
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
      distance: '',
      leaving: '',
      arrival: ''
    }
  },
  getters: {
    timeGetter (state) {
      return state.appointment.time
    },
    appointmentGetter (state) {
      return state.appointment
    }
  },
  mutations: {
    SET_APPOINTMENT (state, payload) {
      payload = Object.assign(state.appointment, payload)
      state.appointment = payload
    }
  },
  actions: {
    setAppointment ({ commit }, payload) {
      commit('SET_APPOINTMENT', payload)
    }
  },
  modules: {}
})
