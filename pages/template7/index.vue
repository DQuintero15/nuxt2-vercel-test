<template>
  <main
    v-if="settingByTemplate7"
    :style="[
      {
        '--font-style-1':
          settingByTemplate7?.settingGeneral?.fount_1 ?? 'David Libre',
      },
      {
        '--font-style-2':
          settingByTemplate7?.settingGeneral?.fount_2 ?? 'Great Vibes',
      },
      {
        '--font-style-3': settingByTemplate7?.settingGeneral?.fount_3 ?? 'Lora',
      },
    ]"
  >
    <K07-carousel
      v-if="settingByTemplate7?.banner?.visible"
      id="kBannerX"
      :key="bannerRendering"
      v-bind="componentsProps"
    />
    <K07-bannerPromo
      v-if="settingByTemplate7?.content?.visible"
      id="KOffersX"
      v-bind="componentsProps"
    />
    <K07-productList
      v-if="settingByTemplate7?.productList?.visible"
      id="KProductListX"
      v-bind="componentsProps"
    />
    <K07-advertising
      v-if="settingByTemplate7?.advertising?.visible"
      id="KAdvertisingX"
      v-bind="componentsProps"
    />
    <K07-gify
      v-if="settingByTemplate7?.ProductFavorite?.visible"
      id="KGifyX"
      v-bind="componentsProps"
    />
    <K07-howWeWork
      v-if="settingByTemplate7?.howWork?.visible"
      id="KHowWork"
      v-bind="componentsProps"
    />
    <K07-blog
      v-if="stateListBLogs && settingByTemplate7?.blog?.visible"
      id="KBlogX"
      v-bind="componentsProps"
    />
    <K07-newsletter
      v-if="settingByTemplate7?.newsletter?.visible"
      id="KNewsX"
      v-bind="componentsProps"
    />
    <K07-wrapper
      v-if="settingByTemplate7?.contentImg?.visible"
      id="KWrapperX"
      v-bind="componentsProps"
    />
  </main>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'KoTemplate7',
  components: {
    K07Carousel: () =>
      import('@/components/template7/_carouselBanner/K07-BannerCarousel.vue'),
    K07BannerPromo: () => import('@/components/template7/K07-BannerPromo.vue'),
    K07ProductList: () =>
      import('@/components/template7/K07-ProductListHome.vue'),
    K07Advertising: () => import('@/components/template7/K07-Advertising.vue'),
    K07Gify: () => import('@/components/template7/K07-Gify.vue'),
    K07HowWeWork: () => import('@/components/template7/K07-HowWeWork.vue'),
    K07Blog: () => import('@/components/template7/K07-Blog.vue'),
    K07Newsletter: () => import('@/components/template7/K07-Newsletter.vue'),
    K07Wrapper: () => import('@/components/template7/K07-Wrapper.vue'),
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
      'logoStore',
      'stateListBLogs',
      'settingByTemplate7',
    ]),
    componentsProps() {
      return {
        dataStore: this.dataStore,
        logoStore: this.logoStore,
        settingGeneral: this.settingByTemplate7?.settingGeneral ?? null,
        settingKCarousel: this.settingByTemplate7?.banner ?? null,
        settingKPromo: this.settingByTemplate7?.content ?? null,
        settingKProductList: this.settingByTemplate7?.productList ?? null,
        settingCardProducts: this.settingByTemplate7?.card ?? null,
        settingKGify: this.settingByTemplate7?.ProductFavorite ?? null,
        settingKHowwork: this.settingByTemplate7?.howWork ?? null,
        settingKNews: this.settingByTemplate7?.newsletter ?? null,
        settingKWrapper: this.settingByTemplate7?.contentImg ?? null,
        settingKAdvertising: this.settingByTemplate7?.advertising ?? null,
        settingKBlog: this.settingByTemplate7?.blog ?? null,
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
        if (e && e.data && e.data.component && e.data.template == 7) {
          this.$store.commit('SET_CURRENTSETTING07', e.data)
          if (e.data.component == 'banner') {
            this.bannerRendering += 1
          }
        } else if (
          e &&
          e.data &&
          e.data.componentToEdit &&
          e.data.template == 7
        ) {
          switch (e.data.componentToEdit) {
            case 'settingGeneral':
              this.moverseA('kBannerX')
              break
            case 'header':
              this.moverseA('kBannerX')
              break
            case 'footer':
              this.moverseA('KWrapperX')
              break
            case 'banner':
              this.moverseA('kBannerX')
              break
            case 'content':
              this.moverseA('KOffersX')
              break
            case 'productList':
              this.moverseA('KProductListX')
              break
            case 'card':
              this.moverseA('KProductListX')
              break
            case 'advertising':
              this.moverseA('KAdvertisingX')
              break
            case 'ProductFavorite':
              this.moverseA('KGifyX')
              break
            case 'howWork':
              this.moverseA('KHowWork')
              break
            case 'blog':
              this.moverseA('KBlogX')
              break
            case 'newsletter':
              this.moverseA('KNewsX')
              break
            case 'contentImg':
              this.moverseA('KWrapperX')
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
        }
      )
      if (success) {
        return { success: true, data: data.publicProductList }
      }
    },
  },
}
</script>
