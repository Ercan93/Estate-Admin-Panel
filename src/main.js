import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/bootstrap-vue'
import './plugins/axios'
import * as VueGoogleMaps from 'vue2-google-maps'
import VCalendar from 'v-calendar';
import 'mutationobserver-shim'
import '@babel/polyfill'

Vue.config.productionTip = false

Vue.use(VCalendar, {
  componentPrefix: 'vc'
});

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_MAP_API_KEY,
    libraries: 'places,drawing',
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
