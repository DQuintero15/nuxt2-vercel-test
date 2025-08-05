<template>
  <main
    v-if="settingByTemplate10"
    :style="[
      {
        '--font-style-1':
          settingByTemplate10?.settingGeneral?.fount_1 ?? 'Roboto',
      },
    ]"
  >
    <K010-buttonCar />
    <K010-carousel
      v-if="settingByTemplate10?.banner?.visible"
      id="kBannerX"
      :key="bannerRendering"
      v-bind="componentsProps"
    />
    <K010-section
      v-if="settingByTemplate10?.section?.visible"
      id="kSectionX"
      v-bind="componentsProps"
    />
    <K010-trending
      v-if="settingByTemplate10?.trending?.visible"
      id="kTrendingX"
      v-bind="componentsProps"
    />
    <K010-deals
      v-if="settingByTemplate10?.offers?.visible"
      id="kOffersX"
      v-bind="componentsProps"
    />
    <K010-featuredProducts
      v-if="settingByTemplate10?.productList?.visible"
      id="KProductDestacadosX"
      v-bind="componentsProps"
    />
    <K010-blog
      v-if="stateListBLogs && settingByTemplate10?.blog?.visible"
      id="KBlogX"
      v-bind="componentsProps"
    />
  </main>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'KoTemplate10',
  components: {
    K010ButtonCar: () => import('@/components/template10/Ko10-buttonCar.vue'),
    K010Carousel: () => import('@/components/template10/Ko10-carousel.vue'),
    K010Section: () => import('@/components/template10/Ko10-section.vue'),
    K010Trending: () => import('@/components/template10/Ko10-trending.vue'),
    K010Deals: () => import('@/components/template10/Ko10-deals.vue'),
    K010FeaturedProducts: () =>
      import('@/components/template10/Ko10-featuredProducts.vue'),
    K010Blog: () => import('@/components/template10/Ko10-blog.vue'),
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
      'settingByTemplate10',
      'dataHoko',
    ]),
    componentsProps() {
      return {
        dataStore: this.dataStore,
        settingGeneral: this.settingByTemplate10?.settingGeneral ?? null,
        banner: this.settingByTemplate10?.banner ?? null,
        section: this.settingByTemplate10?.section ?? null,
        trending: this.settingByTemplate10?.trending ?? null,
        offers: this.settingByTemplate10?.offers ?? null,
        productList: this.settingByTemplate10?.productList ?? null,
        cardProduct: this.settingByTemplate10?.cardProduct ?? null,
        blog: this.settingByTemplate10?.blog ?? null,
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
        if (e && e.data && e.data.component && e.data.template == 10) {
          this.$store.commit('SET_CURRENTSETTING10', e.data)
          if (e.data.component == 'banner') {
            this.bannerRendering += 1
          }
        } else if (
          e &&
          e.data &&
          e.data.componentToEdit &&
          e.data.template == 10
        ) {
          switch (e.data.componentToEdit) {
            case 'settingGeneral':
              this.moverseA('kBannerX')
              break
            case 'header':
              this.moverseA('kBannerX')
              break
            case 'footer':
              this.moverseA('KBlogX')
              break
            case 'banner':
              this.moverseA('kBannerX')
              break
            case 'section':
              this.moverseA('kSectionX')
              break
            case 'trending':
              this.moverseA('kTrendingX')
              break
            case 'cardProduct':
              this.moverseA('kTrendingX')
              break
            case 'offers':
              this.moverseA('kOffersX')
              break
            case 'productList':
              this.moverseA('KProductDestacadosX')
              break
            case 'blog':
              this.moverseA('KBlogX')
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
            case 'productListFilter':
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
