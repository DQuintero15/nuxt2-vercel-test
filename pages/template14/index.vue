<template>
  <main
    v-if="settingByTemplate14"
    :style="[
      {
        '--font-style-1':
          settingByTemplate14?.settingsGeneral?.fount_1 ?? 'Poppins',
      },
    ]"
  >
    <K014-information
      v-if="settingByTemplate14?.information?.visible"
      id="kInformationX"
      v-bind="componentsProps"
    />
    <K014-banner
      v-if="settingByTemplate14?.banner?.visible"
      id="kBannerX"
      :key="bannerRendering"
      v-bind="componentsProps"
    />
    <K014-offers
      v-if="settingByTemplate14?.offers?.visible"
      id="kOffersX"
      v-bind="componentsProps"
    />
    <K014-productListHome
      v-if="settingByTemplate14?.listProductsHome?.visible"
      id="kListProductX"
      v-bind="componentsProps"
    />
    <K014-offersProduct
      v-if="settingByTemplate14?.offersProduct?.visible"
      id="kOffersProductX"
      v-bind="componentsProps"
    />
    <K014-listBlogHome
      v-if="settingByTemplate14?.listBlogHome?.visible && stateListBLogs"
      id="kListBlogX"
      v-bind="componentsProps"
    />
    <K014-newsletter
      v-if="settingByTemplate14?.newsletter?.visible"
      id="kNewsletterX"
      v-bind="componentsProps"
    />
    <K014-logos
      v-if="settingByTemplate14?.logos?.visible"
      id="kLogosX"
      v-bind="componentsProps"
    />
  </main>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'KoTemplate14',
  components: {
    K014Information: () =>
      import('@/components/template14/ko14-information.vue'),
    K014Banner: () => import('@/components/template14/ko14-Banner.vue'),
    K014Offers: () => import('@/components/template14/ko14-offers.vue'),
    K014ProductListHome: () =>
      import('@/components/template14/ko14-productListHome.vue'),
    K014OffersProduct: () =>
      import('@/components/template14/ko14-offersProduct.vue'),
    K014ListBlogHome: () =>
      import('@/components/template14/ko14-listBlogHome.vue'),
    K014Newsletter: () => import('@/components/template14/ko14-Newsletter.vue'),
    K014Logos: () => import('@/components/template14/ko14-logos.vue'),
  },
  layout: 'default',
  data() {
    return {
      bannerRendering: 0,
    }
  },
  computed: {
    ...mapState(['dataStore', 'settingByTemplate14', 'stateListBLogs']),
    componentsProps() {
      return {
        dataStore: this.dataStore,
        settingGeneral: this.settingByTemplate14?.settingsGeneral ?? null,
        information: this.settingByTemplate14?.information ?? null,
        banner: this.settingByTemplate14?.banner ?? null,
        offers: this.settingByTemplate14?.offers ?? null,
        listProductsHome: this.settingByTemplate14?.listProductsHome ?? null,
        cardProducts: this.settingByTemplate14?.cardProducts ?? null,
        offersProduct: this.settingByTemplate14?.offersProduct ?? null,
        newsletter: this.settingByTemplate14?.newsletter ?? null,
        listBlogHome: this.settingByTemplate14?.listBlogHome ?? null,
        cardBlog: this.settingByTemplate14?.cardBlog ?? null,
        logos: this.settingByTemplate14?.logos ?? null,
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
    async addEventListenerTemplate(e) {
      if (
        e.origin.includes('https://panel.komercia.co') ||
        e.origin.includes('http://localhost:8080')
      ) {
        if (e && e.data && e.data.component && e.data.template == 14) {
          this.$store.commit('SET_CURRENTSETTING14', e.data)
          if (e.data.component == 'banner') {
            this.bannerRendering += 1
          } else if (e.data.component == 'logos') {
            this.bannerRendering += 1
          }
        } else if (
          e &&
          e.data &&
          e.data.componentToEdit &&
          e.data.template == 14
        ) {
          switch (e.data.componentToEdit) {
            case 'banner':
              this.moverseA('kBannerX')
              break
            // case 'information':
            //   this.moverseA('kInformationX')
            //   break
            case 'offers':
              this.moverseA('kOffersX')
              break
            case 'listProductsHome':
              this.moverseA('kListProductX')
              break
            case 'cardProducts':
              this.moverseA('kListProductX')
              break
            case 'offersProduct':
              this.moverseA('kOffersProductX')
              break
            case 'newsletter':
              this.moverseA('kNewsletterX')
              break
            case 'listBlogHome':
              this.moverseA('kListBlogX')
              break
            case 'cardBlog':
              this.moverseA('kListBlogX')
              break
            case 'logos':
              this.moverseA('kLogosX')
              break
            case 'settingsGeneral':
              this.moverseA('kInformationX')
              break
            case 'header':
              this.moverseA('kInformationX')
              break
            case 'footer':
              this.moverseA('kLogosX')
              break
            case 'detailsProducts':
              // eslint-disable-next-line no-case-declarations
              const { success, data } = await this.currentChange()
              if (success && data.length > 0) {
                this.$router.push({
                  path: '/productos/' + data[0].slug,
                })
              } else {
                this.$router.push({
                  path: '/productos',
                })
              }
              break
            case 'listProductsFilter':
              this.$router.push({
                path: '/productos',
              })
              break
            case 'contact':
              this.$router.push({
                path: '/contacto',
              })
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
    async currentChange() {
      const { success, data } = await this.$store.dispatch(
        'products/GET_ALL_PRODUCTS',
        {
          id_tienda: this.dataStore.id,
          limit: 1,
          page: 1,
        },
      )
      if (success) {
        return { success: true, data: data.publicProductList }
      } else {
        return { success: false, data: null }
      }
    },
  },
}
</script>
<style scoped>
* {
  font-family: var(--font-style-1) !important;
}
</style>
