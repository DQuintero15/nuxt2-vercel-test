<template>
  <!-- v-if="settingByTemplate16"
     -->
  <main
    :style="[
      {
        '--font-style-1':
          settingByTemplate16?.settingsGeneral?.font ?? 'Poppins',
      },
    ]"
  >
    <!-- v-if="settingByTemplate16?.banner?.visible" -->
    <!-- v-bind="componentsProps" -->

    <K017-banner id="K17_banner" :key="Ko17BannerRendering" />
    <K017-banner-2 id="K17_banner2" :key="Ko17BannerRendering" />
    <K017-info id="K17_Info" :key="Ko17BannerRendering" />
    <K017-info-2 id="K17_Info_2" :key="Ko17BannerRendering" />
    <K017-info-3 id="K17_Info_3" :key="Ko17BannerRendering" />
    <K017-info-4 id="K17_Info_4" :key="Ko17BannerRendering" />
    <K017-info-5 id="K17_Info_5" :key="Ko17BannerRendering" />
    <K017-info-6 id="K17_Info_6" :key="Ko17BannerRendering" />
    <K017-info-7 id="K17_Info_7" :key="Ko17BannerRendering" />
    <K017-info-8 id="K17_Info_8" :key="Ko17BannerRendering" />
    <K017-info-9 id="K17_Info_9" :key="Ko17BannerRendering" />
  </main>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'KoTemplate17',
  components: {
    K017Banner: () => import('@/components/template17/ko17-Banner.vue'),
    K017Banner2: () => import('@/components/template17/ko17-Banner2.vue'),
    K017Info: () => import('@/components/template17/ko17-Info.vue'),
    K017Info2: () => import('@/components/template17/ko17-Info2.vue'),
    K017Info3: () => import('@/components/template17/ko17-Info3.vue'),
    K017Info4: () => import('@/components/template17/ko17-Info4.vue'),
    K017Info5: () => import('@/components/template17/ko17-Info5.vue'),
    K017Info6: () => import('@/components/template17/ko17-Info6.vue'),
    K017Info7: () => import('@/components/template17/ko17-Info7.vue'),
    K017Info8: () => import('@/components/template17/ko17-Info8.vue'),
    K017Info9: () => import('@/components/template17/ko17-Info9.vue'),
  },
  layout: 'default',
  data() {
    return {
      Ko17BannerRendering: 0,
    }
  },
  computed: {
    ...mapState([
      'dataStore',
      // 'stateListBLogs',
      // 'settingByTemplate16',
    ]),
    // componentsProps() {
    //   return {
    //     dataStore: this.dataStore,
    //     settingGeneral: this.settingByTemplate16?.settingsGeneral ?? null,
    //     banner: this.settingByTemplate16?.banner ?? null,
    //     content: this.settingByTemplate16?.content ?? null,
    //     offers: this.settingByTemplate16?.offers ?? null,
    //     listProductsHome: this.settingByTemplate16?.listProductsHome ?? null,
    //     cardProducts: this.settingByTemplate16?.cardProducts ?? null,
    //     information: this.settingByTemplate16?.information ?? null,
    //     logos: this.settingByTemplate16?.logos ?? null,
    //     listBlogHome: this.settingByTemplate16?.listBlogHome ?? null,
    //     cardBlog: this.settingByTemplate16?.cardBlog ?? null,
    //     categories: this.settingByTemplate16?.categories ?? null,
    //     informationStore: this.settingByTemplate16?.informationStore ?? null,
    //   }
    // },
  },
  // beforeDestroy() {
  //   window.removeEventListener('message', this.addEventListenerTemplate)
  // },
  // mounted() {
  //   window.parent.postMessage('message', '*')
  //   window.addEventListener('message', this.addEventListenerTemplate)
  // },
  // methods: {
  //   async addEventListenerTemplate(e) {
  //     if (
  //       e.origin.includes('https://panel.komercia.co') ||
  //       e.origin.includes('http://localhost:8080')
  //     ) {
  //       if (e && e.data && e.data.component && e.data.template == 16) {
  //         this.$store.commit('SET_CURRENTSETTING16', e.data)
  //         if (e.data.component == 'banner') {
  //           this.Ko16BannerRendering += 1
  //         } else if (e.data.component == 'logos') {
  //           this.Ko16BannerRendering += 1
  //         } else if (e.data.component == 'categories') {
  //           this.Ko16BannerRendering += 1
  //         }
  //       } else if (
  //         e &&
  //         e.data &&
  //         e.data.componentToEdit &&
  //         e.data.template == 16
  //       ) {
  //         switch (e.data.componentToEdit) {
  //           case 'banner':
  //             this.moverseA('K16_banner')
  //             break
  //           case 'categories':
  //             this.moverseA('K16_categories')
  //             break
  //           case 'content':
  //             this.moverseA('K16_content')
  //             break
  //           case 'information':
  //             this.moverseA('K16_information')
  //             break
  //           case 'informationStore':
  //             this.moverseA('K16_informationStore')
  //             break
  //           case 'listProductsHome':
  //             this.moverseA('K16_listProductsHome')
  //             break
  //           case 'offers':
  //             this.moverseA('K16_offers')
  //             break
  //           case 'logos':
  //             this.moverseA('K16_logos')
  //             break
  //           case 'cardProducts':
  //             this.moverseA('K16_listProductsHome')
  //             break
  //           case 'settingsGeneral':
  //             this.moverseA('K16_banner')
  //             break
  //           case 'header':
  //             this.moverseA('K16_banner')
  //             break
  //           case 'footer':
  //             this.moverseA('K16_informationStore')
  //             break
  //           case 'newsletter':
  //             this.moverseA('K16_informationStore')
  //             break
  //           case 'listBlogHome':
  //             this.moverseA('kListBlogHomeX')
  //             break
  //           case 'cardBlog':
  //             this.moverseA('kListBlogHomeX')
  //             break
  //           case 'detailsProducts':
  //             // eslint-disable-next-line no-case-declarations
  //             const { success, data } = await this.currentChange()
  //             if (success && data.length > 0) {
  //               this.$router.push({
  //                 path: '/productos/' + data[0].slug,
  //               })
  //             } else {
  //               this.$router.push({
  //                 path: '/productos',
  //               })
  //             }
  //             break
  //           case 'listProductsFilter':
  //             this.$router.push({
  //               path: '/productos',
  //             })
  //             break
  //           case 'contact':
  //             this.$router.push({
  //               path: '/contacto',
  //             })
  //             break
  //         }
  //       } else {
  //         if (e && e.data && e.data.returnHome) {
  //           this.$router.push({
  //             path: '/',
  //           })
  //         }
  //       }
  //     }
  //   },
  //   moverseA(idDelElemento) {
  //     location.hash = '#' + idDelElemento
  //   },
  //   async currentChange() {
  //     const { success, data } = await this.$store.dispatch(
  //       'products/GET_ALL_PRODUCTS',
  //       {
  //         id_tienda: this.dataStore.id,
  //         limit: 1,
  //         page: 1,
  //       },
  //     )
  //     if (success) {
  //       return { success: true, data: data.publicProductList }
  //     } else {
  //       return { success: false, data: null }
  //     }
  //   },
  // },
}
</script>
<style scoped>
* {
  /* font-family: var(--font-style-1) !important; */
  font-family: var(--font-style-1) !important;
}
</style>
