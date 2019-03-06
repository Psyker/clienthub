import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import Feather from 'vue-icon'
import vueHeadful from "vue-headful"
import Toasted from 'vue-toasted'
import store from "./store"
import { createProvider } from './vue-apollo'

import "./assets/scss/app.scss"

export const EventBus = new Vue();

Vue.config.productionTip = false;

Vue.component("vue-headful", vueHeadful);
Vue.use(Feather);
Vue.use(Toasted);

new Vue({
  router,
  apolloProvider: createProvider(),
  store,
  render: h => h(App)
}).$mount('#app');
