// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import PerfectScrollbar from 'vue2-perfect-scrollbar'
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'

Vue.use(PerfectScrollbar)

import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css';
Vue.use(VueSweetalert2);

import {firebase, firestore} from './firebase'
import {firestorePlugin} from 'vuefire'

Vue.use(firestorePlugin);

Vue.config.productionTip = false

/* eslint-disable no-new */
firebase.auth().onAuthStateChanged(function(user) {
  if (!user || user == null) {
    router.push('/login');      
  }
});

const app = new Vue({
  el: '#app',
  vuetify,
  router,
  store,
  components: { App },
  template: '<App/>'
});
