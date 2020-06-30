import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from '@/filters/date.filter'
import messagePlugin from '@/utils/message.plugin'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false
Vue.use(Vuelidate)
Vue.use(messagePlugin)
Vue.filter('dateFilter', dateFilter)

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
