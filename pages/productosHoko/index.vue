<template>
  <component :is="indexTemplate" v-bind="componentsProps" />
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ProductHokoIndex',
  components: {
    K05ProductListHoko: () =>
      import('@/components/template5/Ko5-ProductListHomeHoko.vue'),
    K09ProductListHoko: () =>
      import('@/components/template9/k09-ProductListFilterHoko.vue'),
    K11ProductListHoko: () =>
      import('@/components/template11/ko-ProductListFilterHoko.vue'),
    KoNoDisponibleHoko: () => import('@/components/Hoko/Ko-nodisponible.vue'),
  },
  data() {
    return {
      componentMapping: {
        3: 'K05ProductListHoko',
        5: 'K05ProductListHoko',
        6: 'KoNoDisponibleHoko',
        7: 'KoNoDisponibleHoko',
        9: 'K09ProductListHoko',
        10: 'KoNoDisponibleHoko',
        11: 'K11ProductListHoko',
        13: 'KoNoDisponibleHoko',
        14: 'KoNoDisponibleHoko',
      },
    }
  },
  computed: {
    ...mapState([
      'dataStore',
      'settingBase',
      'settingByTemplate',
      'settingByTemplate7',
      'settingByTemplate9',
      'settingByTemplate10',
      'settingByTemplate11',
      'template',
      'dataHoko',
    ]),
    // fullProducts() {
    //   return this.$store.getters['products/filterProducts']
    // },
    indexTemplate() {
      let productListComponent = ''
      // eslint-disable-next-line no-prototype-builtins
      if (this.componentMapping.hasOwnProperty(this.template)) {
        productListComponent = this.componentMapping[parseInt(this.template)]
      }
      return productListComponent
    },
    componentsProps() {
      return {
        dataStore: this.dataStore,
        // fullProducts: this.fullProducts,
        settingByTemplate: this.createSettingByTemplate(
          this.settingByTemplate,
          'settings',
          'tipo_letra',
          this.settingBase,
        ),
        settingByTemplate7: this.createNestedSetting(
          this.settingByTemplate7,
          ['settingGeneral', 'productListFilter', 'card'],
          null,
        ),
        settingByTemplate9: this.createNestedSetting(
          this.settingByTemplate9,
          ['cardProduct', 'productListFilter', 'settingGeneral'],
          null,
        ),
        settingByTemplate10: this.createNestedSetting(
          this.settingByTemplate10,
          ['cardProduct', 'productListFilter', 'settingGeneral'],
          null,
        ),
        settingByTemplate11: this.createNestedSetting(
          this.settingByTemplate11,
          ['productList', 'cardProduct', 'settingGeneral'],
          null,
        ),
      }
    },
  },
  beforeDestroy() {
    window.removeEventListener('message', this.addEventListenerTemplate)
  },
  mounted() {
    window.parent.postMessage('message', '*')
    window.addEventListener('message', this.addEventListenerTemplate)
  },
  methods: {
    createSettingByTemplate(
      settingByTemplate,
      property1,
      property2,
      defaultValue,
    ) {
      if (
        settingByTemplate &&
        settingByTemplate[property1] &&
        settingByTemplate[property1][property2]
      ) {
        return settingByTemplate[property1]
      }
      return defaultValue
    },
    // eslint-disable-next-line no-unused-vars
    createNestedSetting(setting, properties, defaultValue) {
      if (setting) {
        const nestedSetting = {}
        properties.forEach((property) => {
          nestedSetting[property] =
            setting && setting[property] ? setting[property] : null
        })
        return [nestedSetting]
      }
      return null
    },
    addEventListenerTemplate(e) {
      if (
        e.origin.includes('https://panel.komercia.co') ||
        e.origin.includes('http://localhost:8080')
      ) {
        if (e && e.data && e.data.component) {
          if (e.data.template == 9) {
            this.$store.commit('SET_CURRENTSETTING09', e.data)
          } else if (e.data.template == 7) {
            this.$store.commit('SET_CURRENTSETTING07', e.data)
          } else if (e.data.template == 11) {
            this.$store.commit('SET_CURRENTSETTING11', e.data)
          } else if (e.data.template == 10) {
            this.$store.commit('SET_CURRENTSETTING10', e.data)
          }
        } else if (e && e.data && e.data.returnHome) {
          this.$router.push({
            path: '/',
          })
        }
      }
    },
  },
}
</script>
