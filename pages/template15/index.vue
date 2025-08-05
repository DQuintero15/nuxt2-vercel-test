<template>
  <main
    v-if="settingByTemplate15"
    :style="[
      {
        '--font-style-1':
          settingByTemplate15?.settingGeneral?.font ?? 'Poppins',
      },
    ]"
  >
    <K015-banner
      v-if="settingByTemplate15?.banner?.visible"
      id="kBannerX"
      :key="bannerRendering"
      v-bind="componentsProps"
    />
    <K015-categories
      v-if="settingByTemplate15?.categories?.visible"
      id="kCategoriesX"
      v-bind="componentsProps"
    />
    <K015-content
      v-if="settingByTemplate15?.content?.visible"
      id="kContentX"
      v-bind="componentsProps"
    />
    <K015-productListHome
      v-if="settingByTemplate15?.listProductsHome?.visible"
      id="kListProductsHomeX"
      v-bind="componentsProps"
    />
    <K015-information
      v-if="settingByTemplate15?.information?.visible"
      id="kInformationX"
      v-bind="componentsProps"
    />
    <K015-informationLogos
      v-if="settingByTemplate15?.informationLogos?.visible"
      id="kInformationLogosX"
      v-bind="componentsProps"
    />
    <K015-information2
      v-if="settingByTemplate15?.information2?.visible"
      id="kInformation2X"
      v-bind="componentsProps"
    />
    <K015-listProductsOffers
      v-if="settingByTemplate15?.listProductsOffers?.visible"
      id="kListProductsOffersX"
      v-bind="componentsProps"
    />
    <K015-banner2
      v-if="settingByTemplate15?.banner2?.visible"
      id="kBanner2X"
      v-bind="componentsProps"
    />
    <K015-logos
      v-if="settingByTemplate15?.logos?.visible"
      id="kLogosX"
      v-bind="componentsProps"
    />
  </main>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'KoTemplate15',
  components: {
    K015Banner: () => import('@/components/template15/ko15-Banner.vue'),
    K015Categories: () => import('@/components/template15/ko15-Categories.vue'),
    K015Content: () => import('@/components/template15/ko15-Content.vue'),
    K015ProductListHome: () =>
      import('@/components/template15/ko15-productListHome.vue'),
    K015Information: () =>
      import('@/components/template15/ko15-information.vue'),
    K015InformationLogos: () =>
      import('@/components/template15/ko15-informationLogos.vue'),
    K015Information2: () =>
      import('@/components/template15/ko15-information2.vue'),
    K015ListProductsOffers: () =>
      import('@/components/template15/ko15-listProductsOffers.vue'),
    K015Banner2: () => import('@/components/template15/ko15-Banner2.vue'),
    K015Logos: () => import('@/components/template15/ko15-logos.vue'),
  },
  layout: 'default',
  data() {
    return {
      bannerRendering: 0,
    }
  },
  computed: {
    ...mapState(['dataStore', 'settingByTemplate15']),
    componentsProps() {
      return {
        dataStore: this.dataStore,
        settingGeneral: this.settingByTemplate15?.settingGeneral ?? null,
        banner: this.settingByTemplate15?.banner ?? null,
        categories: this.settingByTemplate15?.categories ?? null,
        content: this.settingByTemplate15?.content ?? null,
        listProductsHome: this.settingByTemplate15?.listProductsHome ?? null,
        cardProducts: this.settingByTemplate15?.cardProducts ?? null,
        information: this.settingByTemplate15?.information ?? null,
        informationLogos: this.settingByTemplate15?.informationLogos ?? null,
        information2: this.settingByTemplate15?.information2 ?? null,
        listProductsOffers:
          this.settingByTemplate15?.listProductsOffers ?? null,
        banner2: this.settingByTemplate15?.banner2 ?? null,
        logos: this.settingByTemplate15?.logos ?? null,
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
    async addEventListenerTemplate(e) {
      if (
        e.origin.includes('https://panel.komercia.co') ||
        e.origin.includes('http://localhost:8080')
      ) {
        if (e && e.data && e.data.component && e.data.template == 15) {
          this.$store.commit('SET_CURRENTSETTING15', e.data)
          if (e.data.component == 'banner') {
            this.bannerRendering += 1
          }
        } else if (
          e &&
          e.data &&
          e.data.componentToEdit &&
          e.data.template == 15
        ) {
          switch (e.data.componentToEdit) {
            case 'banner':
              this.moverseA('kBannerX')
              break
            case 'categories':
              this.moverseA('kCategoriesX')
              break
            case 'content':
              this.moverseA('kContentX')
              break
            case 'listProductsHome':
              this.moverseA('kListProductsHomeX')
              break
            case 'information':
              this.moverseA('kInformationX')
              break
            case 'informationLogos':
              this.moverseA('kInformationLogosX')
              break
            case 'information2':
              this.moverseA('kInformation2X')
              break
            case 'listProductsOffers':
              this.moverseA('kListProductsOffersX')
              break
            case 'banner2':
              this.moverseA('kBanner2X')
              break
            case 'logos':
              this.moverseA('kLogosX')
              break
            case 'cardProducts':
              this.moverseA('kListProductsHomeX')
              break
            case 'settingsGeneral':
              this.moverseA('kInformationX')
              break
            case 'header':
              this.moverseA('kBannerX')
              break
            case 'footer':
              this.moverseA('kLogosX')
              break
            case 'newsLetter':
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
            case 'listBlogHome':
              this.$router.push({
                path: '/blog',
              })
              break
            case 'cardBlog':
              this.$router.push({
                path: '/blog',
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
