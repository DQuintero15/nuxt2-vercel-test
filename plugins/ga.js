import Vue from 'vue'
import VueGtag from 'vue-gtag'

export default ({ store }) => {
  // Obtén el ID de Google Analytics desde el estado de la tienda (Vuex Store)
  const analytics = store.state.analytics_tagmanager?.analytics

  // Verifica que haya un ID de Google Analytics y que estemos en el entorno de producción
  if (analytics && process.env.NODE_ENV === 'production') {
    Vue.use(VueGtag, {
      config: { id: analytics },
    })
  }
}
