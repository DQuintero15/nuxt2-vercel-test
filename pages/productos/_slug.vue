<template>
  <component :is="indexTemplate" v-bind="componentsProps" />
</template>
<script>
import { mapState } from 'vuex'
export default {
  components: {
    Ko5ProductDetail: () =>
      import('@/components/template5/Ko5-ProductDetail.vue'),
    Ko7ProductDetail: () =>
      import('@/components/template7/Ko-ProductDetail.vue'),
    Ko9ProductDetail: () =>
      import('@/components/template9/k09-ProductDetail.vue'),
    Ko10ProductDetail: () =>
      import('@/components/template10/Ko-ProductDetail.vue'),
    Ko11ProductDetail: () =>
      import('@/components/template11/ko-ProductDetail.vue'),
    Ko13ProductDetail: () =>
      import('@/components/template13/Ko-ProductDetail-1.vue'),
    Ko14ProductDetail: () =>
      import('@/components/template14/Ko-ProductDetail-1.vue'),
    Ko15ProductDetail: () =>
      import('@/components/template15/Ko-ProductDetail-1.vue'),
    Ko16ProductDetail: () =>
      import('@/components/template16/Ko16-ProductDetail.vue'),
  },

  data() {
    return {
      componentMapping: {
        3: 'Ko5ProductDetail',
        5: 'Ko5ProductDetail',
        6: 'Ko5ProductDetail',
        7: 'Ko7ProductDetail',
        9: 'Ko9ProductDetail',
        10: 'Ko10ProductDetail',
        11: 'Ko11ProductDetail',
        13: 'Ko13ProductDetail',
        14: 'Ko14ProductDetail',
        15: 'Ko15ProductDetail',
        16: 'Ko16ProductDetail',
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
      'envios',
      'dataStore',
      'settingBase',
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
        dataStore: this.dataStore,
        whatsapp: this.dataStore.redes.whatsapp,
        envios: this.envios,
        facebookPixel: this.$store.state.analytics_tagmanager,
        settingByTemplate: this.createSettingByTemplate(
          this.settingByTemplate,
          'settings',
          'tipo_letra',
          this.settingBase,
        ),
        settingByTemplate7: this.createNestedSetting(
          this.settingByTemplate7,
          ['settingGeneral', 'detailsProduct', 'card'],
          null,
        ),
        settingByTemplate9: this.createNestedSetting(
          this.settingByTemplate9,
          ['cardProduct', 'detailsProduct', 'settingGeneral'],
          null,
        ),
        settingByTemplate10: this.createNestedSetting(
          this.settingByTemplate10,
          ['cardProduct', 'detailsProduct', 'settingGeneral'],
          null,
        ),
        settingByTemplate11: this.createNestedSetting(
          this.settingByTemplate11,
          ['detailsProduct', 'cardProduct', 'settingGeneral'],
          null,
        ),
        settingByTemplate13: this.createNestedSetting(
          this.settingByTemplate13,
          ['detailsProduct', 'cardProduct', 'settingGeneral'],
          null,
        ),
        settingByTemplate14: this.createNestedSetting(
          this.settingByTemplate14,
          ['detailsProducts', 'cardProducts', 'settingsGeneral'],
          null,
        ),
        settingByTemplate15: this.createNestedSetting(
          this.settingByTemplate15,
          ['detailsProducts', 'cardProducts', 'settingGeneral'],
          null,
        ),
        settingByTemplate16: this.createNestedSetting(
          this.settingByTemplate16,
          ['detailsProducts', 'cardProducts', 'settingsGeneral'],
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
  },
}
</script>
