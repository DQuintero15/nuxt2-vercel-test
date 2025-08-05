<template>
  <main
    v-if="settingByTemplate16"
    :style="[
      {
        '--font-style-1':
          settingByTemplate16?.settingsGeneral?.font ?? 'Poppins',
      },
    ]"
  >
    <K016-banner
      v-if="settingByTemplate16?.banner?.visible"
      id="K16_banner"
      :key="Ko16BannerRendering"
      v-bind="componentsProps"
    />
    <K016-content
      v-if="settingByTemplate16?.content?.visible"
      id="K16_content"
      v-bind="componentsProps"
    />
    <K016-offers
      v-if="settingByTemplate16?.offers?.visible"
      id="K16_offers"
      v-bind="componentsProps"
    />
    <K016-productListHome
      v-if="settingByTemplate16?.listProductsHome?.visible"
      id="K16_listProductsHome"
      v-bind="componentsProps"
    />
    <K016-information
      v-if="settingByTemplate16?.information?.visible"
      id="K16_information"
      v-bind="componentsProps"
    />
    <K016-listBlogHome
      v-if="settingByTemplate16?.listBlogHome?.visible && stateListBLogs"
      id="kListBlogHomeX"
      v-bind="componentsProps"
    />
    <K016-logos
      v-if="settingByTemplate16?.logos?.visible"
      id="K16_logos"
      v-bind="componentsProps"
    />
    <K016-categories
      v-if="settingByTemplate16?.categories?.visible"
      id="K16_categories"
      v-bind="componentsProps"
    />
    <K016-informationStore
      v-if="settingByTemplate16?.informationStore?.visible"
      id="K16_informationStore"
      v-bind="componentsProps"
    />
  </main>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'KoTemplate16',
  components: {
    K016Banner: () => import('@/components/template16/ko16-Banner.vue'),
    K016Content: () => import('@/components/template16/ko16-Content.vue'),
    K016Offers: () => import('@/components/template16/ko16-Offers.vue'),
    K016ProductListHome: () =>
      import('@/components/template16/ko16-productListHome.vue'),
    K016Information: () =>
      import('@/components/template16/ko16-Information.vue'),
    K016ListBlogHome: () =>
      import('@/components/template16/ko16-listBlogHome.vue'),
    K016Logos: () => import('@/components/template16/ko16-logos.vue'),
    K016Categories: () => import('@/components/template16/ko16-Categories.vue'),
    K016InformationStore: () =>
      import('@/components/template16/ko16-informationStore.vue'),
  },
  layout: 'default',
  data() {
    return {
      Ko16BannerRendering: 0,
    }
  },
  computed: {
    ...mapState(['dataStore', 'stateListBLogs', 'settingByTemplate16']),
    componentsProps() {
      return {
        dataStore: this.dataStore,
        settingGeneral: this.settingByTemplate16?.settingsGeneral ?? null,
        banner: this.settingByTemplate16?.banner ?? null,
        content: this.settingByTemplate16?.content ?? null,
        offers: this.settingByTemplate16?.offers ?? null,
        listProductsHome: this.settingByTemplate16?.listProductsHome ?? null,
        cardProducts: this.settingByTemplate16?.cardProducts ?? null,
        information: this.settingByTemplate16?.information ?? null,
        logos: this.settingByTemplate16?.logos ?? null,
        listBlogHome: this.settingByTemplate16?.listBlogHome ?? null,
        cardBlog: this.settingByTemplate16?.cardBlog ?? null,
        categories: this.settingByTemplate16?.categories ?? null,
        informationStore: this.settingByTemplate16?.informationStore ?? null,
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
        if (e && e.data && e.data.component && e.data.template == 16) {
          this.$store.commit('SET_CURRENTSETTING16', e.data)
          if (e.data.component == 'banner') {
            this.Ko16BannerRendering += 1
          } else if (e.data.component == 'logos') {
            this.Ko16BannerRendering += 1
          } else if (e.data.component == 'categories') {
            this.Ko16BannerRendering += 1
          }
        } else if (
          e &&
          e.data &&
          e.data.componentToEdit &&
          e.data.template == 16
        ) {
          switch (e.data.componentToEdit) {
            case 'banner':
              this.moverseA('K16_banner')
              break
            case 'categories':
              this.moverseA('K16_categories')
              break
            case 'content':
              this.moverseA('K16_content')
              break
            case 'information':
              this.moverseA('K16_information')
              break
            case 'informationStore':
              this.moverseA('K16_informationStore')
              break
            case 'listProductsHome':
              this.moverseA('K16_listProductsHome')
              break
            case 'offers':
              this.moverseA('K16_offers')
              break
            case 'logos':
              this.moverseA('K16_logos')
              break
            case 'cardProducts':
              this.moverseA('K16_listProductsHome')
              break
            case 'settingsGeneral':
              this.moverseA('K16_banner')
              break
            case 'header':
              this.moverseA('K16_banner')
              break
            case 'footer':
              this.moverseA('K16_informationStore')
              break
            case 'newsletter':
              this.moverseA('K16_informationStore')
              break
            case 'listBlogHome':
              this.moverseA('kListBlogHomeX')
              break
            case 'cardBlog':
              this.moverseA('kListBlogHomeX')
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
