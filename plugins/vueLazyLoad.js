import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
import loading from '../assets/img/imagen-cargando.gif'
import error from '../assets/img/lazyloadError.jpg'

Vue.use(VueLazyload, {
  preLoad: 1.3,
  attempt: 2,
  error: error,
  loading: loading,
})
