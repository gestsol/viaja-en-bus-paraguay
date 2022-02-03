// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import MultiLanguage from 'vue-multilanguage'
import VueMoment from 'vue-moment'
import ES from './translations/es'
import EN from './translations/en'
import store, {addStoreProperty} from './store/store'
import VueCarousel from 'vue-carousel';
import Notifications from 'vue-notification'
import VueCurrencyFilter from 'vue-currency-filter'
import VueTagManager from 'vue-tag-manager';

import('./assets/base.css')
import('../node_modules/vuetify/dist/vuetify.min.css')
import('swiper/dist/css/swiper.css')
import('./assets/css/font-awesome.min.css')

// GOOGLE-TAG-MANAGER
if (process.env.NODE_ENV !== 'development') {
  Vue.use(VueTagManager, {
    gtmId: 'GTM-53JT3RK'
  });
  Vue.gtm.push({ event: 'some-event' });
}
Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(VueCarousel);
Vue.use(Notifications)
Vue.use(Vuetify, {
  theme: {
    primary: '#194E8E',
    primarymedium: '#3e82cc',
    primarylight: '#7ebfe0',
    darkgrey: '#a0a0a0',
    error: '#f94343'
  }
})
Vue.use(MultiLanguage, {
  default: 'es',
  es: ES.es,
  en: EN.en
})
Vue.use(VueMoment)
Vue.use(VueAwesomeSwiper)
Vue.use(VueCurrencyFilter,
  {
    symbol : '$',
    thousandsSeparator: '.',
    fractionCount: 0,
    fractionSeparator: ',',
    symbolPosition: 'front',
    symbolSpacing: true
  })
/* eslint-disable no-new */
const app = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
addStoreProperty('$translate', app.translate)