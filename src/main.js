import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import VCalendar from 'v-calendar';
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.use(VCalendar, {
  componentPrefix: 'vc'
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
