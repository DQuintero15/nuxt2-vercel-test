<template>
  <main v-if="settingByTemplate11">
    <K011-carousel
      v-if="settingByTemplate11?.banner?.visible"
      id="kCarouselX"
      :key="bannerRendering"
      v-bind="componentsProps"
    />
    <K011-section
      v-if="settingByTemplate11?.section?.visible"
      id="kSectionX"
      v-bind="componentsProps"
    />
    <K011-trendingProductHoko
      v-if="settingByTemplate11?.trending?.visible && dataHoko?.statehoko == 1"
      id="kTredingX"
      v-bind="componentsProps"
    />
    <K011-trendingProduct
      v-if="settingByTemplate11?.trending?.visible"
      id="kTredingX"
      v-bind="componentsProps"
    />
    <K011-parallax
      v-if="settingByTemplate11?.parallax?.visible"
      id="kParallaxX"
      v-bind="componentsProps"
    />
    <K011-listTrending
      v-if="dataHoko?.length == 0 || dataHoko?.statehoko == 0"
      v-bind="componentsProps"
    />
    <K011-information
      v-if="settingByTemplate11?.information?.visible"
      id="kInformationX"
      v-bind="componentsProps"
    />
    <K011-blog
      v-if="settingByTemplate11?.blog?.visible && stateListBLogs"
      id="kBlogX"
      v-bind="componentsProps"
    />
  </main>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'KoTemplate11',
  components: {
    K011Carousel: () => import('@/components/template11/Ko11-carousel.vue'),
    K011Section: () => import('@/components/template11/Ko11-section.vue'),
    K011TrendingProduct: () =>
      import('@/components/template11/Ko11-trendingProduct.vue'),
    K011TrendingProductHoko: () =>
      import('@/components/template11/Ko11-trendingProductHoko.vue'),
    K011Parallax: () => import('@/components/template11/Ko11-parallax.vue'),
    K011ListTrending: () =>
      import('@/components/template11/Ko11-listTrending.vue'),
    K011Information: () =>
      import('@/components/template11/Ko11-information.vue'),
    K011Blog: () => import('@/components/template11/Ko11-blog.vue'),
  },
  layout: 'default',
  data() {
    return {
      bannerRendering: 0,
    }
  },
  computed: {
    ...mapState([
      'dataStore',
      'stateListBLogs',
      'settingByTemplate11',
      'dataHoko',
    ]),
    componentsProps() {
      return {
        dataStore: this.dataStore,
        settingGeneral: this.settingByTemplate11?.settingGeneral ?? null,
        settingKbanner: this.settingByTemplate11?.banner ?? null,
        settingKblog: this.settingByTemplate11?.blog ?? null,
        settingCardProduct: this.settingByTemplate11?.cardProduct ?? null,
        settingKcontact: this.settingByTemplate11?.contact ?? null,
        settingKinformation: this.settingByTemplate11?.information ?? null,
        settingKparallax: this.settingByTemplate11?.parallax ?? null,
        settingKproductList: this.settingByTemplate11?.productList ?? null,
        settingKsection: this.settingByTemplate11?.section ?? null,
        settingKtrending: this.settingByTemplate11?.trending ?? null,
      }
    },
    dataHoko() {
      return this.$store.state.dataHoko
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
        if (e && e.data && e.data.component && e.data.template == 11) {
          this.$store.commit('SET_CURRENTSETTING11', e.data)
          if (e.data.component == 'banner') {
            this.bannerRendering += 1
          }
        } else if (
          e &&
          e.data &&
          e.data.componentToEdit &&
          e.data.template == 11
        ) {
          switch (e.data.componentToEdit) {
            case 'settingGeneral':
              this.moverseA('kbannerX')
              break
            case 'header':
              this.moverseA('kbannerX')
              break
            case 'footer':
              this.moverseA('kBlogX')
              break
            case 'newsletter':
              this.moverseA('kBlogX')
              break
            case 'banner':
              this.moverseA('kCarouselX')
              break
            case 'section':
              this.moverseA('kSectionX')
              break
            case 'trending':
              this.moverseA('kTredingX')
              break
            case 'cardProduct':
              this.moverseA('kTredingX')
              break
            case 'parallax':
              this.moverseA('kParallaxX')
              break
            case 'information':
              this.moverseA('kInformationX')
              break
            case 'blog':
              this.moverseA('kBlogX')
              break
            case 'detailsProduct':
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
            case 'productList':
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
      }
    },
  },
}
</script>
