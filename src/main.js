import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import Feather from 'vue-icon'
import vueHeadful from "vue-headful"
import Toasted from 'vue-toasted'
import store from "./store"
import { createProvider } from './vue-apollo'
import VueMoment from 'vue-moment'
import BootstrapVue from 'bootstrap-vue'
import "./assets/scss/app.scss"
import 'vue-tel-input/dist/vue-tel-input.css';
import VModal from "vue-js-modal";

export const EventBus = new Vue();

Vue.config.productionTip = false;

Vue.component("vue-headful", vueHeadful);
Vue.use(VModal, {dialog: true});
Vue.use(Feather);
Vue.use(Toasted);
Vue.use(VueMoment);
Vue.use(BootstrapVue);

new Vue({
  router,
  apolloProvider: createProvider(),
  store,
  render: h => h(App)
}).$mount('#app');
