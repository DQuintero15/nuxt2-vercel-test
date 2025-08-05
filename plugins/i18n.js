import Vue from 'vue'
import VueI18n from 'vue-i18n'
import index from '../i18n/index'

Vue.use(VueI18n)

const en = [index.en]
const es = [index.es]
const pt = [index.pt]
const fr = [index.fr]

export default ({ app, store }) => {
  let lenguaje =
    store.state.dataStore &&
    store.state.dataStore.tienda &&
    store.state.dataStore.tienda.lenguaje
      ? store.state.dataStore.tienda.lenguaje
      : 'es'
  app.i18n = new VueI18n({
    locale: lenguaje.toLowerCase(),
    messages: {
      es: Object.assign({}, ...es),
      en: Object.assign({}, ...en),
      pt: Object.assign({}, ...pt),
      fr: Object.assign({}, ...fr),
    },
  })
}
