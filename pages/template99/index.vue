<template>
  <div class="flex w-full flex-col items-center justify-center bg-slate-100">
    <div
      v-loading="loading"
      class="container-home w-full max-w-[900px] bg-white-white shadow-md"
    >
      <component :is="indexTema" id="KHeaderX" v-bind="componentsProps" />
      <component
        :is="indexCategory"
        v-if="categorias?.length > 0"
        id="KHeaderX"
        v-bind="componentsProps"
      />
      <!-- <KProductFavoritos
        v-if="stateBanner"
        v-bind="componentsProps"
        style="margin-bottom: 10px"
      /> -->
      <component :is="indexList" id="KListX" v-bind="componentsProps" />
      <KFooterWaLogo id="KfooterX" v-bind="componentsProps" />
      <KFooterWa id="KfooterX" v-bind="componentsProps" />
      <WCountry :data-store="dataStore" :value-wa="true" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'TemplateWhatsApp',
  components: {
    // header
    KoHeaderWp1: () =>
      import('@/components/headers/header_wp/Ko-Header-wa-1.vue'),
    KoHeaderWp2: () =>
      import('@/components/headers/header_wp/Ko-Header-wa-2.vue'),
    KoHeaderWp3: () =>
      // Categories
      import('@/components/headers/header_wp/Ko-Header-wa-3.vue'),
    KCategory01: () =>
      import('@/components/whatsapp/template1/Ko-Categories-wa.vue'),
    KCategory02: () =>
      import('@/components/whatsapp/template2/ko-slide-categorys.vue'),
    KCategory03: () =>
      import('@/components/whatsapp/template3/ko-slide-categorys.vue'),
    KCategory04: () =>
      import('@/components/whatsapp/categorys_img/ko-categorys-img.vue'),
    // Product list
    // KProductFavoritos: () =>
    //   import('@/components/whatsapp/Ko99-ProductFavoritos.vue'),
    KProductList: () =>
      import('@/components/whatsapp/template1/Ko-ProductList-wa.vue'),
    KProductList2: () =>
      import('@/components/whatsapp/template2/ko-productList.vue'),
    KProductList3: () =>
      import('@/components/whatsapp/template3/ko-productList.vue'),
    // Footer
    KFooterWaLogo: () =>
      import('@/components/footers/footer_wa/ko-Footer-wa-logo'),
    KFooterWa: () => import('@/components/footers/footer_wa/ko-Footer-wa.vue'),
    WCountry: () =>
      import('@/components/footers/k_country/Ko-Footer-Country.vue'),
  },
  layout: 'wa',
  computed: {
    ...mapState([
      'dataStore',
      'logoStore',
      'stateBanner',
      'settingByTemplate',
      'settingBaseWapi',
      'categorias',
    ]),
    indexTema() {
      let componentTemplate = ''
      if (this.settingByTemplate?.tema) {
        switch (this.settingByTemplate.tema) {
          case 1:
            componentTemplate = 'KoHeaderWp1'
            break
          case 2:
            componentTemplate = 'KoHeaderWp2'
            break
          case 3:
            componentTemplate = 'KoHeaderWp3'
            break
        }
      } else {
        return (componentTemplate = 'KoHeaderWp1')
      }
      return componentTemplate
    },
    indexCategory() {
      let componentTemplate = ''
      if (this.settingByTemplate && this.settingByTemplate.estilo_categorias) {
        switch (this.settingByTemplate.estilo_categorias) {
          case 1:
            componentTemplate = 'KCategory01'
            break
          case 2:
            componentTemplate = 'KCategory02'
            break
          case 3:
            componentTemplate = 'KCategory03'
            break
          case 4:
            componentTemplate = 'KCategory04'
            break
        }
      } else {
        return (componentTemplate = 'KCategory01')
      }
      return componentTemplate
    },
    indexList() {
      let componentTemplate = ''
      if (this.settingByTemplate && this.settingByTemplate.estilo_productos) {
        switch (this.settingByTemplate.estilo_productos) {
          case 3:
            componentTemplate = 'KProductList'
            break
          case 2:
            componentTemplate = 'KProductList2'
            break
          case 1:
            componentTemplate = 'KProductList3'
            break
        }
      } else {
        return (componentTemplate = 'KProductList3')
      }
      return componentTemplate
    },
    loading() {
      if (this.dataStore.length) {
        return true
      } else {
        return false
      }
    },
    componentsProps() {
      return {
        dataStore: this.dataStore,
        logoStore: this.logoStore,
        settingByTemplate:
          this.settingByTemplate &&
          this.settingByTemplate.tema &&
          this.settingByTemplate.estilo_categorias
            ? this.settingByTemplate
            : this.settingBaseWapi,
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
    addEventListenerTemplate(e) {
      if (
        e.origin.includes('https://panel.komercia.co') ||
        e.origin.includes('http://localhost:8080')
      ) {
        if (e && e.data && e.data.component) {
          this.$store.commit('SET_CURRENTSETTING99', e.data)
          switch (e.data.component) {
            case 'Banner':
              this.moverseA('KHeaderX')
              this.$store.commit('SET_OPEN_ORDER', false)
              break
            case 'Logo':
              this.moverseA('KHeaderX')
              this.$store.commit('SET_OPEN_ORDER', false)
              break
            case 'mensaje_principal':
              this.moverseA('KHeaderX')
              this.$store.commit('SET_OPEN_ORDER', false)
              break
            case 'descripcion':
              this.moverseA('KHeaderX')
              this.$store.commit('SET_OPEN_ORDER', false)
              break
            case 'tema':
              this.moverseA('KHeaderX')
              this.$store.commit('SET_OPEN_ORDER', false)
              break
            case 'estilo_categorias':
              this.moverseA('KHeaderX')
              this.$store.commit('SET_OPEN_ORDER', false)
              break
            case 'estilo_productos':
              this.moverseA('KListX')
              this.$store.commit('SET_OPEN_ORDER', false)
              break
            case 'pago_online':
              this.moverseA('KHeaderX')
              if (e.data.setting.pago_online == 1) {
                this.$store.commit('SET_OPEN_ORDER', true)
              } else {
                this.$store.commit('SET_OPEN_ORDER', false)
              }
              break
            case 'color_primario':
              this.moverseA('KListX')
              this.$store.commit('SET_OPEN_ORDER', false)
              break
            case 'color_secundario':
              this.moverseA('KListX')
              this.$store.commit('SET_OPEN_ORDER', false)
              break
            case 'color_icon':
              this.moverseA('KListX')
              this.$store.commit('SET_OPEN_ORDER', false)
              break
            case 'footer':
              this.moverseA('KfooterX')
              this.$store.commit('SET_OPEN_ORDER', false)
              break
          }
        }
        if (e && e.data && e.data.checkout) {
          if (e.data.setting) {
            this.$store.state.checkoutWhatsApp.configuration = e.data.setting
          }
          this.$store.commit('SET_OPEN_ORDER', true)
          this.$store.commit('SET_STATE_FORM_MODAL_WHATS_APP', true)
        }
      }
    },
    moverseA(idDelElemento) {
      location.hash = '#' + idDelElemento
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
<style scoped>
* {
  font-family: 'Poppins', sans-serif !important;
}
.container-home {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
</style>
