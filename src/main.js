import Vue from 'vue'
import Vuelidate from 'vuelidate'
import Paginate from 'vuejs-paginate'
import VueMeta from 'vue-meta'
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from '@/filters/date.filter'
import currencyFilter from '@/filters/currency.filter'
import localizeFilter from '@/filters/localize.filter'
import tooltipDirective from '@/directives/tooltip.directive'
import messagePlugin from '@/utils/message.plugin'
import titlePlugin from '@/utils/title.plugin'
import Loader from '@/components/app/Loader'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false
Vue.use(Vuelidate)
Vue.use(messagePlugin)
Vue.use(VueMeta)
Vue.use(titlePlugin)
Vue.filter('dateFilter', dateFilter)
Vue.filter('localize', localizeFilter)
Vue.filter('currencyFilter', currencyFilter)
Vue.directive('tooltip', tooltipDirective)
Vue.component('Loader', Loader)
Vue.component('Paginate', Paginate)

firebase.initializeApp({
  apiKey: 'AIzaSyBAEyMzT0nWsV_2-4yaIa06f56m5_GDssk',
  authDomain: 'cash-accounting.firebaseapp.com',
  databaseURL: 'https://cash-accounting.firebaseio.com',
  projectId: 'cash-accounting',
  storageBucket: 'cash-accounting.appspot.com',
  messagingSenderId: '1057403021147',
  appId: '1:1057403021147:web:ff3d2d071b4706bf105c7e',
  measurementId: 'G-DSGSPM0M1E'
})

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
