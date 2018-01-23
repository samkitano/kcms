import App from './components/App'
import authNav from './components/AuthNav'
import axios from 'axios'
import bPagination from 'bootstrap-vue/es/components/pagination/pagination'
import bTable from 'bootstrap-vue/es/components/table/table'
import kMenu from './components/Menu'
import router from './routes';
import store from './store/store'
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueSweetalert2 from 'vue-sweetalert2'
import Vuex from 'vuex'

require('./mixins')

let vStore = store()
let token = document.head.querySelector('meta[name="csrf-token"]')

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

if (token) {
  axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content
} else {
  console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token')
}

Vue.use(VueRouter)
Vue.use(VueSweetalert2)
Vue.use(Vuex)

Vue.component('auth-nav', authNav)
Vue.component('k-menu', kMenu)
Vue.component('b-table', bTable)
Vue.component('b-pagination', bPagination)
Vue.component('app', App)

Vue.config.productionTip = false

const app = new Vue({
  router,
  store: new Vuex.Store(vStore)
}).$mount('#app')
