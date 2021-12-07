import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/bootstrap-vue'
import './plugins/axios'
import VCalendar from 'v-calendar';
import 'mutationobserver-shim'
import '@babel/polyfill'

Vue.config.productionTip = false

Vue.use(VCalendar, {
  componentPrefix: 'vc'
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
