import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Feather from 'vue-icon'
import { createProvider } from './vue-apollo'

import "./assets/scss/app.scss"

Vue.config.productionTip = false
Vue.use(Feather)

new Vue({
  router,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app')
