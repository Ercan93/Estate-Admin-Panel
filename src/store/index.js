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
    },
    recordGetter: (state) => (id) => {
      return state.records.find(record => record.id === id)
    }
  },
  mutations: {
    SET_APPOINTMENT (state, payload) {
      payload = Object.assign(state.appointment, payload)
      state.appointment = payload
    },
    SET_RECORDS (state, payload) {
      state.records = payload
    }
  },
  actions: {
    setAppointment ({ commit }, payload) {
      commit('SET_APPOINTMENT', payload)
    },
    setRecords ({ commit }, payload) {
      commit('SET_RECORDS', payload)
    }
  },
  modules: {}
})
