import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import VueTheMask from 'vue-the-mask'
import VueCompositionAPI from '@vue/composition-api'

Vue.config.productionTip = false
Vue.use(VueTheMask)
Vue.use(VueCompositionAPI)

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
