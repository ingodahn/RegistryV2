import Vue from 'vue'

import '../imports/ui/plugins'
//import '@mdi/font/css/materialdesignicons.css'

import Vuetify  from 'vuetify';
Vue.use(Vuetify);
import 'vuetify/dist/vuetify.min.css';
Vue.use(Vuetify); // this is all you need for Vuetify 1.x

import App from '../imports/ui/App.vue'

getUserLanguage = function () {
  var userLang = navigator.language || navigator.userLanguage;
  alert('Got language '+ userLang)
  return userLang;
}

// for Vuetify 2.x you also need:
const vuetify = new Vuetify({
});

Meteor.startup(() => {
  new Vue({
    el: '#app',
    vuetify, // this bit is also needed for Vuetify 2.x
    ...App,
  })
})
