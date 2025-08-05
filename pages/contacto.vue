<template>
  <component :is="indexTemplate" v-bind="componentsProps" />
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'KoContact',
  components: {
    K05Contact: () => import('@/components/template5/Ko5-Contact.vue'),
    K07Contact: () => import('@/components/template7/Ko-Contact.vue'),
    K09Contact: () => import('@/components/template9/k09-Contact.vue'),
    K10Contact: () => import('@/components/template10/ko-Contact.vue'),
    K11Contact: () => import('@/components/template11/ko-Contact.vue'),
    K12Contact: () => import('@/components/template12/K012-Contact.vue'),
    K13Contact: () => import('@/components/template13/Ko-Contact-1.vue'),
    K14Contact: () => import('@/components/template14/Ko-Contact-1.vue'),
    K15Contact: () => import('@/components/template15/Ko15-Contact.vue'),
    K16Contact: () => import('@/components/template16/Ko16-Contact.vue'),
  },
  layout: 'default',
  data() {
    return {
      componentMapping: {
        3: 'K05Contact',
        5: 'K05Contact',
        6: 'K05Contact',
        7: 'K07Contact',
        9: 'K09Contact',
        10: 'K10Contact',
        11: 'K11Contact',
        12: 'K12Contact',
        13: 'K13Contact',
        14: 'K14Contact',
        15: 'K15Contact',
        16: 'K16Contact',
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
      'dataStore',
      'logoStore',
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
        logoStore: this.logoStore,
        settingK05Contact: this.settingByTemplate?.settings ?? this.settingBase,
        settingByTemplate7: this.createSettingByTemplate(
          this.settingByTemplate7,
          'contact',
          'settingGeneral'
        ),
        settingByTemplate9: this.createSettingByTemplate(
          this.settingByTemplate9,
          'contact',
          'settingGeneral'
        ),
        settingByTemplate10: this.createSettingByTemplate(
          this.settingByTemplate10,
          'contact',
          'settingGeneral'
        ),
        settingByTemplate11: this.createSettingByTemplate(
          this.settingByTemplate11,
          'contact',
          'settingGeneral'
        ),
        settingByTemplate13: this.createSettingByTemplate(
          this.settingByTemplate13,
          'contact',
          'settingGeneral'
        ),
        settingByTemplate14: this.createSettingByTemplate(
          this.settingByTemplate14,
          'contact',
          'settingsGeneral'
        ),
        settingByTemplate15: this.createSettingByTemplate(
          this.settingByTemplate15,
          'contact',
          'settingGeneral'
        ),
        settingByTemplate16: this.createSettingByTemplate(
          this.settingByTemplate16,
          'contact',
          'settingsGeneral'
        ),
      }
    },
  },
  mounted() {
    window.parent.postMessage('message', '*')
    window.addEventListener('message', this.addEventListenerTemplate)
  },

  beforeDestroy() {
    window.removeEventListener('message', this.addEventListenerTemplate)
  },
  methods: {
    createSettingByTemplate(settingByTemplate, contactKey, settingGeneralKey) {
      if (settingByTemplate) {
        return [
          {
            [contactKey]: settingByTemplate[contactKey] ?? null,
            [settingGeneralKey]: settingByTemplate[settingGeneralKey] ?? null,
          },
        ]
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
