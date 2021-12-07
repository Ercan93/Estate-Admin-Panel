import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    appointment: {
      address: '',
      date: '',
      time: '',
      duration:'',
      distance:''
    },
  },
  getters: {
    appointmentGetter(state) {
      return state.appointment;
    },
  },
  mutations: {
    SET_APPOINTMENT_ADDRESS(state, payload) {
      state.appointment.address = payload;
    },
    SET_APPOINTMENT_DATE(state, payload) {
      console.log(payload);
      state.appointment.date = payload.date;
      state.appointment.time = payload.time;
    },
    SET_APPOINTMENT_DISTANCE(state, payload) {
      state.appointment.distance = payload.distance;
      state.appointment.duration = payload.duration;
    }
  },
  actions: {
    setAppointmentAddress({ commit }, payload) {
      commit("SET_APPOINTMENT_ADDRESS", payload);
    },
    setAppointmentDate({ commit }, payload) {
      commit("SET_APPOINTMENT_DATE", payload);
    },
    setAppointmentDistance({commit }, payload) {
      commit("SET_APPOINTMENT_DISTANCE", payload)
    }
  },
  modules: {},
});
