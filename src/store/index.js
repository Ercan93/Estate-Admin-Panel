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
    },
    SET_RECORDS (state, payload) {
      state.records = payload
    }
  },
  actions: {
    setAppointment ({ commit }, payload) {
      commit('SET_APPOINTMENT', payload)
    },
    setAppointmentAddress ({ commit }, payload) {
      commit('SET_APPOINTMENT_ADDRESS', payload)
    },
    setAppointmentDate ({ commit }, payload) {
      commit('SET_APPOINTMENT_DATE', payload)
    },
    setAppointmentDistance ({ commit }, payload) {
      commit('SET_APPOINTMENT_DISTANCE', payload)
    },
    setRecords ({ commit }, payload) {
      commit('SET_RECORDS', payload)
    }
  },
  modules: {}
})
