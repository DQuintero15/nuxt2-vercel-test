<template>
  <main
    v-if="settingByTemplate13"
    :style="[
      {
        '--font-style-1':
          settingByTemplate13?.settingGeneral?.fount_1 ?? 'Poppins',
      },
    ]"
  >
    <K013-banner
      v-if="settingByTemplate13?.banner?.visible"
      id="kBannerX"
      :key="bannerRendering"
      v-bind="componentsProps"
    />
    <K013-productList
      v-if="settingByTemplate13?.productList?.visible"
      id="kListX"
      v-bind="componentsProps"
    />
    <K013-infoText
      v-if="settingByTemplate13?.infoText?.visible"
      id="kInfoTextX"
      v-bind="componentsProps"
    />
    <K013-information
      v-if="settingByTemplate13?.information?.visible"
      id="kInformationX"
      v-bind="componentsProps"
    />
    <K013-newsletter
      v-if="settingByTemplate13?.newsletter?.visible"
      id="kNewsLetterX"
      v-bind="componentsProps"
    />
  </main>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'KoTemplate13',
  components: {
    K013Banner: () => import('@/components/template13/Ko13-Banner.vue'),
    K013ProductList: () =>
      import('@/components/template13/Ko13-ProductList.vue'),
    K013InfoText: () => import('@/components/template13/Ko13-infoText.vue'),
    K013Information: () =>
      import('@/components/template13/Ko13-information.vue'),
    K013Newsletter: () => import('@/components/template13/Ko13-Newsletter.vue'),
  },
  layout: 'default',
  data() {
    return {
      bannerRendering: 0,
    }
  },
  computed: {
    ...mapState(['dataStore', 'settingByTemplate13']),
    componentsProps() {
      return {
        dataStore: this.dataStore,
        settingGeneral: this.settingByTemplate13?.settingGeneral ?? null,
        banner: this.settingByTemplate13?.banner ?? null,
        productList: this.settingByTemplate13?.productList ?? null,
        information: this.settingByTemplate13?.information ?? null,
        infoText: this.settingByTemplate13?.infoText ?? null,
        cardProduct: this.settingByTemplate13?.cardProduct ?? null,
        newsletter: this.settingByTemplate13?.newsletter ?? null,
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
        if (e && e.data && e.data.component && e.data.template == 13) {
          this.$store.commit('SET_CURRENTSETTING13', e.data)
          if (e.data.component == 'banner') {
            this.bannerRendering += 1
            // console.log(this.bannerRendering)
          }
        } else if (
          e &&
          e.data &&
          e.data.componentToEdit &&
          e.data.template == 13
        ) {
          switch (e.data.componentToEdit) {
            case 'settingGeneral':
              this.moverseA('kBannerX')
              break
            case 'header':
              this.moverseA('kBannerX')
              break
            case 'footer':
              this.moverseA('kNewsLetterX')
              break
            case 'banner':
              this.moverseA('kBannerX')
              break
            case 'cardProduct':
              this.moverseA('kListX')
              break
            case 'newsLetter':
              this.moverseA('kNewsLetterX')
              break
            case 'information':
              this.moverseA('kInformationX')
              break
            case 'infoText':
              this.moverseA('kInfoTextX')
              break
            case 'productList':
              this.moverseA('kListX')
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
