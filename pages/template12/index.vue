<template>
  <div
    v-if="settingByTemplate12"
    :style="[
      {
        '--font-style-1': settingByTemplate12?.fontFamily ?? 'Poppins',
      },
    ]"
  >
    <div class="main-wrapper overflow-hidden">
      <K012-iHeader id="KHeaderX" v-bind="componentsProps" />
      <K012-i-hero-image v-bind="componentsProps" />
      <div class="main-section_container">
        <K012-i-main-section id="KProductX" v-bind="componentsProps" />
      </div>
      <K012-i-footer id="KFooterX" v-bind="componentsProps" />
      <K010-button-car />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'KoTemplate12',
  components: {
    K012IHeader: () => import('@/components/template12/Ko12-IHeader.vue'),
    K012IHeroImage: () => import('@/components/template12/Ko12-IHeroImage.vue'),
    K012IMainSection: () =>
      import('@/components/template12/Ko12-IMainSection.vue'),
    K012IFooter: () => import('@/components/template12/Ko12-IFooter.vue'),
    K010ButtonCar: () => import('@/components/template10/Ko10-buttonCar.vue'),
  },
  layout: 'default',
  computed: {
    ...mapState(['dataStore', 'logoStore', 'settingByTemplate12']),
    componentsProps() {
      return {
        logoStore: this.logoStore,
        dataStore: this.dataStore,
        settingByTemplate12: this.settingByTemplate12
          ? this.settingByTemplate12
          : null,
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
    addEventListenerTemplate(e) {
      if (
        e.origin.includes('https://panel.komercia.co') ||
        e.origin.includes('http://localhost:8080')
      ) {
        if (e && e.data && e.data.componentToEdit) {
          this.$store.commit('SET_CURRENTSETTING12', e.data)
          switch (e.data.componentToEdit) {
            case 'header':
              this.moverseA('KHeaderX')
              break
            case 'product':
              this.moverseA('KProductX')
              break
            case 'footer':
              this.moverseA('KFooterX')
              break
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
.product_container:last-child .product_divider {
  display: none;
}
main section:last-child .section-with-title_container .border-transparent {
  display: none;
}
.h-inherit {
  height: inherit;
}
.main-section_container {
  box-shadow: 0 20px 12px 2px rgb(0 0 0 / 9%);
  /* padding-bottom: 2.2rem; */
}
</style>
