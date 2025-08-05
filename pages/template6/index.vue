<template>
  <main
    :style="[
      {
        '--font-style-1': settingByTemplate6?.settingGeneral?.font ?? 'Poppins',
      },
    ]"
  >
    <template v-for="(componentKey, index) in sortedComponents">
      <component
        :is="componentKey"
        v-if="settingByTemplate6[componentKey]?.visible"
        :id="`k${capitalizeFirstLetter(componentKey)}X`"
        :key="index"
        v-bind="componentsProps"
      />
    </template>
    <K06-newsletter v-bind="componentsProps" />
  </main>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'KoTemplate6',
  components: {
    banner: () => import('@/components/template6/k06-banner.vue'),
    information: () => import('@/components/template6/k06-information.vue'),
    productFeatures: () =>
      import('@/components/template6/k06-product-features.vue'),
    productOverviews: () =>
      import('@/components/template6/k06-product-overviews.vue'),
    informationLogos: () =>
      import('@/components/template6/k06-information-logos.vue'),
    K06Newsletter: () => import('@/components/template6/Ko6-Newsletter.vue'),
  },
  layout: 'default',
  computed: {
    ...mapState(['dataStore', 'settingByTemplate6']),
    componentsProps() {
      return {
        dataStore: this.dataStore,
        settingsGeneral: this.settingByTemplate6?.settingsGeneral ?? null,
        banner: this.settingByTemplate6?.banner ?? null,
        information: this.settingByTemplate6?.information ?? null,
        informationLogos: this.settingByTemplate6?.informationLogos ?? null,
        productFeatures: this.settingByTemplate6?.productFeatures ?? null,
        productOverviews: this.settingByTemplate6?.productOverviews ?? null,
        newsletter: this.settingByTemplate6?.newsletter ?? null,
      }
    },
    sortedComponents() {
      const componentsKeys = Object.keys(this.settingByTemplate6)
      return componentsKeys.sort(
        (a, b) =>
          (this.settingByTemplate6[b]?.order || 0) -
          (this.settingByTemplate6[a]?.order || 0),
      )
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
    capitalizeFirstLetter(str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    },
    async addEventListenerTemplate(e) {
      if (
        e.origin.includes('https://panel.komercia.co') ||
        e.origin.includes('http://localhost:8080')
      ) {
        if (e && e.data && e.data.component && e.data.template == 6) {
          this.$store.commit('SET_CURRENTSETTING06', e.data)
          if (e.data.component == 'banner') {
            this.bannerRendering += 1
          }
        } else if (
          e &&
          e.data &&
          e.data.componentToEdit &&
          e.data.template == 6
        ) {
          switch (e.data.componentToEdit) {
            case 'settingsGeneral':
              this.moverseA('kbannerX')
              break
            case 'header':
              this.moverseA('kbannerX')
              break
            case 'footer':
              this.moverseA('KnewsletterX')
              break
            case 'banner':
              this.moverseA('kbannerX')
              break
            case 'information':
              this.moverseA('kinformationX')
              break
            case 'productFeatures':
              this.moverseA('kproductFeaturesX')
              break
            case 'productOverviews':
              this.moverseA('kproductOverviewsX')
              break
            case 'informationLogos':
              this.moverseA('kinformationLogosX')
              break
            case 'newsletter':
              this.moverseA('knewsletterX')
              break
          }
        } else {
          if (e && e.data && e.data.returnHome) {
            this.$router.push({
              path: '/',
            })
          }
        }
      }
    },
    moverseA(idDelElemento) {
      location.hash = '#' + idDelElemento
    },
  },
}
</script>

<style scoped>
* {
  font-family: var(--font-style-1) !important;
}
</style>
