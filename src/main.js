import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'

import toast from 'components/common/toast/index'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

Vue.use(toast)

FastClick.attach(document.body)

Vue.use(VueLazyLoad)

Vue.prototype.$bus=new Vue()
new Vue({
  render:h=>h(App),
  router,
  store
}).$mount('#app')
