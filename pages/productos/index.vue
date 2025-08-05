<template>
  <component :is="indexTemplate" v-bind="componentsProps" />
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'ProductIndex',
  components: {
    K05ProductList: () =>
      import('@/components/template5/Ko5-ProductListHome.vue'),
    K07ProductList: () =>
      import('@/components/template7/Ko-ProductListFilter.vue'),
    K09ProductList: () =>
      import('@/components/template9/k09-ProductListFilter.vue'),
    K10ProductList: () =>
      import('@/components/template10/Ko-ProductListFilter.vue'),
    K11ProductList: () =>
      import('@/components/template11/ko-ProductListFilter.vue'),
    K13ProductList: () =>
      import('@/components/template13/Ko-ProductListFilter.vue'),
    K14ProductList: () =>
      import('@/components/template14/Ko-ProductListFilter.vue'),
    K15ProductList: () =>
      import('@/components/template15/Ko15-ProductListFilter.vue'),
    K16ProductList: () =>
      import('@/components/template16/Ko16-ProductListFilter.vue'),
  },

  data() {
    return {
      componentMapping: {
        3: 'K05ProductList',
        5: 'K05ProductList',
        6: 'K05ProductList',
        7: 'K07ProductList',
        9: 'K09ProductList',
        10: 'K10ProductList',
        11: 'K11ProductList',
        13: 'K13ProductList',
        14: 'K14ProductList',
        15: 'K15ProductList',
        16: 'K16ProductList',
      },
      templateMapping: {
        9: 'SET_CURRENTSETTING09',
        7: 'SET_CURRENTSETTING07',
        11: 'SET_CURRENTSETTING11',
        10: 'SET_CURRENTSETTING10',
        13: 'SET_CURRENTSETTING13',
        14: 'SET_CURRENTSETTING14',
        15: 'SET_CURRENTSETTING15',
        16: 'SET_CURRENTSETTING16',
      },
    }
  },
  computed: {
    ...mapState([
      'settingBase',
      'logoStore',
      'settingByTemplate',
      'settingByTemplate7',
      'settingByTemplate9',
      'settingByTemplate10',
      'settingByTemplate11',
      'settingByTemplate13',
      'settingByTemplate14',
      'settingByTemplate15',
      'settingByTemplate16',
      'template',
    ]),
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
        logoStore: this.logoStore,
        settingByTemplate: this.createSettingByTemplate(
          this.settingByTemplate,
          'settings',
          'tipo_letra',
          this.settingBase
        ),
        settingByTemplate7: this.createNestedSetting(
          this.settingByTemplate7,
          ['settingGeneral', 'productListFilter', 'card'],
          null
        ),
        settingByTemplate9: this.createNestedSetting(
          this.settingByTemplate9,
          ['cardProduct', 'productListFilter', 'settingGeneral'],
          null
        ),
        settingByTemplate10: this.createNestedSetting(
          this.settingByTemplate10,
          ['cardProduct', 'productListFilter', 'settingGeneral'],
          null
        ),
        settingByTemplate11: this.createNestedSetting(
          this.settingByTemplate11,
          ['productList', 'cardProduct', 'settingGeneral'],
          null
        ),
        settingByTemplate13: this.createNestedSetting(
          this.settingByTemplate13,
          ['productListFilter', 'cardProduct', 'settingGeneral'],
          null
        ),
        settingByTemplate14: this.createNestedSetting(
          this.settingByTemplate14,
          ['listProductsFilter', 'cardProducts', 'settingsGeneral'],
          null
        ),
        settingByTemplate15: this.createNestedSetting(
          this.settingByTemplate15,
          ['listProductsFilter', 'cardProducts', 'settingGeneral'],
          null
        ),
        settingByTemplate16: this.createNestedSetting(
          this.settingByTemplate16,
          ['listProductsFilter', 'cardProducts', 'settingsGeneral'],
          null
        ),
      }
    },
  },
  beforeDestroy() {
    window.removeEventListener('message', this.addEventListenerTemplate)
  },
  mounted() {
    this.sendAnalyticsStore()
    window.parent.postMessage('message', '*')
    window.addEventListener('message', this.addEventListenerTemplate)
  },
  methods: {
    createSettingByTemplate(
      settingByTemplate,
      property1,
      property2,
      defaultValue
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
          const template = e.data.template
          // eslint-disable-next-line no-prototype-builtins
          if (this.templateMapping.hasOwnProperty(template)) {
            const commitAction = this.templateMapping[template]
            this.$store.commit(commitAction, e.data)
          }
        } else if (e && e.data && e.data.returnHome) {
          this.$router.push({
            path: '/',
          })
        }
      }
    },
    async sendAnalyticsStore() {
      await this.$store.dispatch('SEND_ANALYTICS_STORE', {
        storeId: this.$store.state.dataStore.id,
        event: 'VISITED_PRODUCTS_PAGE',
      })
    },
  },
}
</script>
