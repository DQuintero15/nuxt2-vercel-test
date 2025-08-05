<template>
  <main
    v-if="settingByTemplate9"
    :style="[
      {
        '--font-style-1':
          settingByTemplate9?.settingGeneral?.fount_1 ?? 'David Libre',
      },
      {
        '--font-style-2':
          settingByTemplate9?.settingGeneral?.fount_2 ?? 'Great Vibes',
      },
    ]"
  >
    <K09-banner
      v-if="settingByTemplate9?.banner?.visible"
      id="kBannerX"
      :key="bannerRendering"
      v-bind="componentsProps"
    />
    <K09-offers
      v-if="settingByTemplate9?.koffers?.visible"
      id="KOffersX"
      v-bind="componentsProps"
    />
    <K09-sliderHoko
      v-if="
        settingByTemplate9?.productList?.visible && dataHoko?.statehoko === 1
      "
      id="KProductListHokoX"
      v-bind="componentsProps"
    />
    <K09-productList
      v-if="settingByTemplate9?.productList?.visible"
      id="KProductListX"
      v-bind="componentsProps"
    />
    <K09-blog
      v-if="stateListBLogs && settingByTemplate9?.blog?.visible"
      id="KBlogX"
      v-bind="componentsProps"
    />
    <K09-wrapper
      v-if="settingByTemplate9?.wrapper?.visible"
      id="KWrapperX"
      v-bind="componentsProps"
    />
    <K09-newsletter
      v-if="settingByTemplate9?.newsletter?.visible"
      id="KNewsX"
      v-bind="componentsProps"
    />
  </main>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'KoTemplate9',
  components: {
    K09Banner: () => import('@/components/template9/k09-Banner.vue'),
    K09Offers: () => import('@/components/template9/k09-Offers.vue'),
    K09SliderHoko: () => import('@/components/template9/k09-SliderHoko.vue'),
    K09ProductList: () => import('@/components/template9/k09-ProductList.vue'),
    K09Blog: () => import('@/components/template9/k09-Blog.vue'),
    K09Wrapper: () => import('@/components/template9/K09-Wrapper.vue'),
    K09Newsletter: () => import('@/components/template9/k09-Newsletter.vue'),
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
      'settingByTemplate9',
      'dataHoko',
    ]),
    componentsProps() {
      return {
        dataStore: this.dataStore,
        settingGeneral: this.settingByTemplate9?.settingGeneral ?? null,
        banner: this.settingByTemplate9?.banner ?? null,
        koffers: this.settingByTemplate9?.koffers ?? null,
        productList: this.settingByTemplate9?.productList ?? null,
        productListCard: this.settingByTemplate9?.cardProduct ?? null,
        blog: this.settingByTemplate9?.blog ?? null,
        newsletter: this.settingByTemplate9?.newsletter ?? null,
        wrapper: this.settingByTemplate9?.wrapper ?? null,
      }
    },
  },
  beforeDestroy() {
    window.removeEventListener('message', this.addEventListenerTemplate09)
  },
  mounted() {
    window.parent.postMessage('message', '*')
    window.addEventListener('message', this.addEventListenerTemplate09)
  },
  methods: {
    async addEventListenerTemplate09(e) {
      if (
        e.origin.includes('https://panel.komercia.co') ||
        e.origin.includes('http://localhost:8080')
      ) {
        if (e && e.data && e.data.component && e.data.template == 9) {
          this.$store.commit('SET_CURRENTSETTING09', e.data)
          if (e.data.component == 'banner') {
            this.bannerRendering += 1
          }
        } else if (
          e &&
          e.data &&
          e.data.componentToEdit &&
          e.data.template == 9
        ) {
          switch (e.data.componentToEdit) {
            case 'settingGeneral':
              this.moverseA('kBannerX')
              break
            case 'footer':
              this.moverseA('KNewsX')
              break
            case 'banner':
              this.moverseA('kBannerX')
              break
            case 'koffers':
              this.moverseA('KOffersX')
              break
            case 'productList':
              this.moverseA('KProductListX')
              break
            case 'cardProduct':
              this.moverseA('KProductListX')
              break
            case 'blog':
              this.moverseA('KBlogX')
              break
            case 'wrapper':
              this.moverseA('KWrapperX')
              break
            case 'newsletter':
              this.moverseA('KNewsX')
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
