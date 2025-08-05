<template>
  <div>
    <div v-if="dataStore && !storeError">
      <div
        v-if="stateModalPwd"
        class="flex min-h-screen flex-col justify-between"
      >
        <KoOrder :data-store="dataStore" />
        <component :is="headerTemplate" v-bind="componentsProps" />
        <nuxt class="flex-auto" />
        <div>
          <component :is="footerTemplate" v-bind="componentsProps" />
          <KoFooterCountry
            v-if="dataStore.template != 99"
            :data-store="dataStore"
            :value-wa="false"
          />
        </div>
        <div
          v-if="dataStore?.redes?.whatsapp"
          class="wrapper-whatsapp"
          @click="redirectWhatsApp()"
        >
          <koWhatsApp class="button-whatsapp" />
          <span>
            WhatsApp
            <br />
            <small>
              {{ dataStore.redes.whatsapp }}
            </small>
          </span>
        </div>
        <div
          v-if="
            dataStore.estado === 0 || !expiredDate(dataStore.fechaExpiracion)
          "
          id="modalNotificacion"
          class="fixed top-0 z-100 flex h-screen w-full items-center justify-center"
        >
          <div
            class="absolute top-0 h-screen w-full backdrop-blur"
            style="background-color: rgba(0, 0, 0, 0.767)"
          ></div>
          <div
            class="z-100 flex w-full flex-col items-center justify-center rounded-10 bg-white-white px-30 py-20 shadow-md"
            style="max-width: 250px"
          >
            <koTiendaCerrada />
            <p
              class="mt-15 text-center text-base text-gray-500"
              style="max-width: 220px"
            >
              Disculpa, no podrá realizar compras por el momento,
            </p>
            <p
              v-if="expiredDate(dataStore.fechaExpiracion)"
              class="mt-15 text-17 font-bold"
              style="color: #ff314d"
            >
              ¿Deseas continuar?
            </p>
            <button
              v-if="expiredDate(dataStore.fechaExpiracion)"
              class="mt-15 w-full rounded-10 bg-black py-4 text-base text-white-white transition delay-75 ease-in-out hover:bg-slate-300 hover:text-black"
              @click="acceptClose()"
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
      <koModalSecurity v-else :data-store="dataStore" />
    </div>
    <div v-else>
      <koTiendaError />
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import expiredDate from '@/mixins/expiredDate'
import mobileCheck from '@/mixins/mobileCheck'
export default {
  name: 'LayoutDefault',
  components: {
    // Order
    KoOrder: () => import('@/components/headers/_order1/order1.vue'),
    // HEADER
    KoHeader1: () => import('@/components/headers/k05_header/Ko-Header-1.vue'),
    KoHeader4: () => import('@/components/headers/k07_header/Ko-Header-4.vue'),
    KoHeader5: () => import('@/components/headers/k09_header/Ko-Header-5.vue'),
    KoHeader6: () => import('@/components/headers/k10_header/Ko-Header-6.vue'),
    KoHeader7: () => import('@/components/headers/k11_header/Ko-Header-7.vue'),
    KoHeader8: () => import('@/components/headers/k13_header/Ko-Header-8.vue'),
    KoHeader9: () => import('@/components/headers/k14_header/Ko-Header-9.vue'),
    KoHeader10: () =>
      import('@/components/headers/k15_header/Ko-Header-10.vue'),
    KoHeader11: () =>
      import('@/components/headers/k16_header/Ko-Header-11.vue'),
    KoHeader12: () =>
      import('@/components/headers/k06_header/Ko06-Header-12.vue'),
    KoHeader13: () =>
      import('@/components/headers/k17_header/Ko-Header-13.vue'),
    // FOOTER
    KoFooter1: () => import('@/components/footers/k05_footer/Ko-Footer-1.vue'),
    // KoFooter2: () => import('@/components/footers/footer2/Ko-Footer-2.vue'),
    KoFooter4: () => import('@/components/footers/k07_footer/Ko-Footer-4.vue'),
    KoFooter5: () => import('@/components/footers/k09_footer/Ko-Footer-5.vue'),
    KoFooter6: () => import('@/components/footers/k10_footer/Ko-Footer-6.vue'),
    KoFooter7: () => import('@/components/footers/k11_footer/Ko-Footer-7.vue'),
    KoFooter8: () => import('@/components/footers/k13_footer/Ko-Footer-8.vue'),
    KoFooter9: () => import('@/components/footers/k14_footer/Ko-Footer-9.vue'),
    KoFooter10: () =>
      import('@/components/footers/k15_footer/Ko-Footer-10.vue'),
    KoFooter11: () =>
      import('@/components/footers/k16_footer/Ko-Footer-11.vue'),
    KoFooter12: () =>
      import('@/components/footers/k06_footer/Ko06-Footer-12.vue'),
    KoFooter13: () =>
      import('@/components/footers/k17_footer/Ko-Footer-13.vue'),
    // OTROS
    KoFooterCountry: () =>
      import('@/components/footers/k_country/Ko-Footer-Country.vue'),
    koTiendaCerrada: () => import('@/assets/img/tiendaCerrada.vue'),
    koTiendaError: () => import('@/components/Ko-errorStore.vue'),
    koModalSecurity: () => import('@/components/modal/Ko-modal-security.vue'),
    koWhatsApp: () => import('@/assets/Ko-whatsApp.vue'),
  },
  mixins: [expiredDate, mobileCheck],
  data() {
    return {
      headerComponentMap: {
        3: 'KoHeader1',
        5: 'KoHeader1',
        6: 'KoHeader12',
        7: 'KoHeader4',
        // 8: 'KoHeader1',
        9: 'KoHeader5',
        10: 'KoHeader6',
        11: 'KoHeader7',
        13: 'KoHeader8',
        14: 'KoHeader9',
        15: 'KoHeader10',
        16: 'KoHeader11',
        17: 'KoHeader13',
      },
      footerComponentMap: {
        3: 'KoFooter1',
        5: 'KoFooter1',
        6: 'KoFooter12',
        7: 'KoFooter4',
        // 8: 'KoFooter1',
        9: 'KoFooter5',
        10: 'KoFooter6',
        11: 'KoFooter7',
        13: 'KoFooter8',
        14: 'KoFooter9',
        15: 'KoFooter10',
        16: 'KoFooter11',
        17: 'KoFooter13',
      },
    }
  },
  head() {
    let tienda = this.dataStore ?? ''
    let tidio = this.analytics_tagmanager?.tidio_user ?? ''
    let addiSlug = this.analytics_tagmanager?.addiAllySlug ?? ''
    let FacebookPixel1 =
      this.analytics_tagmanager?.facebook_pixel_metatag_1 ?? ''
    let googleMerchants = this.analytics_tagmanager?.google_merchant ?? ''
    let geolocation = this.geolocalizacion ?? ''
    let description =
      tienda?.tiendasInfo?.descripcion?.replace(/<[^>]*>?/g, '') ?? ''
    let tipo_letra, tipo_letra2, tipo_letra3

    // Mapeo de las opciones de tipo de letra para cada template
    const tipoLetraPorTemplate = {
      5: this.settingByTemplate?.settings?.tipo_letra ?? 'Roboto',
      6: this.settingByTemplate6?.settings?.tipo_letra ?? 'Poppins',
      7: {
        1: this.settingByTemplate7?.settingGeneral?.fount_1 ?? 'David Libre',
        2: this.settingByTemplate7?.settingGeneral?.fount_2 ?? 'Great Vibes',
        3: this.settingByTemplate7?.settingGeneral?.fount_3 ?? 'Lora',
      },
      9: {
        1: this.settingByTemplate9?.settingGeneral?.fount_1 ?? 'Poppins',
        2: this.settingByTemplate9?.settingGeneral?.fount_2 ?? 'Roboto',
      },
      10: this.settingByTemplate10?.settingGeneral?.fount_1 ?? 'Roboto',
      11: this.settingByTemplate11?.settingGeneral?.fount_1 ?? 'Roboto',
      99: 'Poppins',
      12: this.settingByTemplate12?.fontFamily ?? 'Poppins',
      13: this.settingByTemplate13?.settingGeneral?.fount_1 ?? 'Roboto',
      14: this.settingByTemplate14?.settingsGeneral?.fount_1 ?? 'Poppins',
      15: this.settingByTemplate15?.settingGeneral?.font ?? 'Poppins',
      16: this.settingByTemplate16?.settingsGeneral?.font ?? 'Poppins',
      17: this.settingByTemplate17?.settingsGeneral?.font ?? 'Poppins',
    }

    // Verifica si el valor para el template actual es un objeto
    const valor = tipoLetraPorTemplate[this.template]

    if (typeof valor === 'object') {
      tipo_letra = valor[1]
      tipo_letra2 = valor[2]
      tipo_letra3 = valor[3]
    } else {
      tipo_letra = valor
    }

    return {
      title: tienda?.nombre ?? 'Tienda Online',
      htmlAttrs: {
        lang: 'es',
      },
      meta: [
        { hid: 'utf-8', charset: 'utf-8' },
        {
          hid: 'x-ua-compatible',
          'http-equiv': 'x-ua-compatible',
          content: 'ie=edge',
        },
        {
          hid: 'viewport',
          name: 'viewport',
          content:
            'width=device-width, initial-scale=1.0, maximum-scale=3.0, minimum-scale=1.0',
        },
        {
          hid: 'description',
          name: 'description',
          content: description ?? 'Tienda Online',
        },
        { hid: 'subject', name: 'subject', content: 'Tienda Online' },
        {
          hid: 'summary',
          name: 'summary',
          content: description ?? 'Tienda Online',
        },
        {
          hid: 'url',
          name: 'url',
          content:
            tienda?.dominio ??
            `https://${tienda?.subdominio ?? ''}.komercia.co`,
        },
        { hid: 'language', name: 'language', content: 'ES' },
        { hid: 'author', name: 'author', content: 'Komercia' },
        { hid: 'robots', name: 'robots', content: 'index,follow' },
        {
          hid: 'keywords',
          name: 'keywords',
          content:
            'tienda, store, shop, shopping, tienda online, online, Komercia, producto, articulo',
        },
        { hid: 'distribution', name: 'distribution', content: 'global' },
        {
          hid: 'Content-Language',
          'http-equiv': 'Content-Language',
          content: 'es',
        },
        //openGraph meta
        {
          hid: 'og:title',
          name: 'og:title',
          content: tienda?.nombre ?? 'Tienda Komercia',
        },
        {
          hid: 'og:type',
          name: 'og:type',
          content: `Tienda online ${tienda?.nombre ?? 'Tienda Komercia'}`,
        },
        {
          hid: 'og:url',
          name: 'og:url',
          content:
            tienda?.dominio ??
            `https://${tienda?.subdominio ?? ''}.komercia.co`,
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content: `${this.$store.state.urlKomercia}/logos/${tienda?.logo}`,
        },
        {
          hid: 'og:site_name',
          name: 'og:site_name',
          content: tienda?.nombre ?? 'Tienda',
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: description ? description : 'Tienda Online',
        },
        {
          hid: 'og:email',
          name: 'og:email',
          content: tienda?.tiendasInfo?.emailTienda ?? '',
        },
        {
          hid: 'og:phone_number',
          name: 'og:phone_number',
          content: tienda?.tiendasInfo?.telefono ?? '',
        },
        {
          hid: 'og:latitude',
          name: 'og:latitude',
          content: geolocation[0]?.latitud ?? '',
        },
        {
          hid: 'og:longitude',
          name: 'og:longitude',
          content: geolocation[0]?.longitud ?? '',
        },
        {
          hid: 'og:street-address',
          name: 'og:street-address',
          content: geolocation[0]?.direccion ?? '',
        },
        {
          name: 'facebook-domain-verification',
          content: FacebookPixel1 ?? '',
        },
        {
          name: 'google-site-verification',
          content:
            googleMerchants ?? 'ce4pJPC3AEQoDU6jNkAEqV-Dwa1OUU8GxtRTR0d_MM8',
        },
        {
          name: 'Content-Security-Policy',
          content: "script-src 'none'",
        },
        {
          name: 'Cache-control',
          content: 'no-cache, no-store, must-revalidate',
        },
        {
          name: 'Pragma',
          content: 'no-cache',
        },
      ],
      script: [
        {
          src: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyByh33xchBmphNi10U-eB3oCX9sVVT4fiY',
        },
        {
          src: tidio ? `https://code.tidio.co/${tidio}.js` : '',
        },
        {
          src: addiSlug
            ? 'https://s3.amazonaws.com/widgets.addi.com/bundle.min.js'
            : '',
        },
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: `${this.$store.state.urlKomercia}/logos/${tienda?.logo}`,
        },
        {
          href:
            this.template == 5 ||
            this.template == 6 ||
            this.template == 7 ||
            this.template == 9 ||
            this.template == 10 ||
            this.template == 11 ||
            this.template == 13 ||
            this.template == 12 ||
            this.template == 14 ||
            this.template == 15 ||
            this.template == 16 ||
            this.template == 17 ||
            this.template == 99
              ? `https://fonts.googleapis.com/css2?family=${tipo_letra}&display=swap`
              : '',
          rel: 'stylesheet',
        },
        {
          href:
            this.template == 7 || this.template == 9
              ? `https://fonts.googleapis.com/css2?family=${tipo_letra2}&display=swap`
              : '',
          rel: 'stylesheet',
        },
        {
          href:
            this.template == 7
              ? `https://fonts.googleapis.com/css2?family=${tipo_letra3}&display=swap`
              : '',
          rel: 'stylesheet',
        },
      ],
    }
  },
  computed: {
    ...mapState([
      'template',
      'logoStore',
      'dataStore',
      'storeError',
      // 'dataCookies',
      'settingBase',
      'geolocalizacion',
      'settingByTemplate',
      'settingByTemplate6',
      'settingByTemplate7',
      'settingByTemplate9',
      'settingByTemplate10',
      'settingByTemplate11',
      'settingByTemplate12',
      'settingByTemplate13',
      'settingByTemplate14',
      'settingByTemplate15',
      'settingByTemplate16',
      'analytics_tagmanager',
    ]),
    headerTemplate() {
      const headerComponent =
        this.headerComponentMap[parseInt(this.template)] || ''
      return headerComponent
    },
    footerTemplate() {
      const footerComponent =
        this.footerComponentMap[parseInt(this.template)] || ''
      return footerComponent
    },
    componentsProps() {
      return {
        dataStore: this.dataStore,
        logoStore: this.logoStore,
        settingByTemplate: this.settingByTemplate?.settings ?? this.settingBase,
        settingByTemplate6: this.settingByTemplate6
          ? [
              {
                setting6Header: this.settingByTemplate6?.header ?? null,
                setting6Footer: this.settingByTemplate6?.footer ?? null,
                setting6General:
                  this.settingByTemplate6?.settingsGeneral ?? null,
              },
            ]
          : null,
        settingByTemplate7: this.settingByTemplate7
          ? [
              {
                setting7Header: this.settingByTemplate7?.header ?? null,
                setting7Footer: this.settingByTemplate7?.footer ?? null,
                setting7General:
                  this.settingByTemplate7?.settingGeneral ?? null,
                settingKProdutCard: this.settingByTemplate7?.card ?? null,
              },
            ]
          : null,
        settingByTemplate9: this.settingByTemplate9
          ? [
              {
                setting9Header: this.settingByTemplate9?.header ?? null,
                setting9Footer: this.settingByTemplate9?.footer ?? null,
                setting9General:
                  this.settingByTemplate9?.settingGeneral ?? null,
              },
            ]
          : null,
        settingByTemplate10: this.settingByTemplate10
          ? [
              {
                setting10Header: this.settingByTemplate10?.header ?? null,
                setting10Footer: this.settingByTemplate10?.footer ?? null,
                setting10General:
                  this.settingByTemplate10?.settingGeneral ?? null,
                pages: this.settingByTemplate10?.pages ?? null,
              },
            ]
          : null,
        settingByTemplate11: this.settingByTemplate11
          ? [
              {
                setting11Header: this.settingByTemplate11?.header ?? null,
                setting11Footer: this.settingByTemplate11?.footer ?? null,
                setting11General:
                  this.settingByTemplate11?.settingGeneral ?? null,
                newsletter: this.settingByTemplate11?.newsletter ?? null,
                pages: this.settingByTemplate11?.pages ?? null,
              },
            ]
          : null,
        settingByTemplate13: this.settingByTemplate13
          ? [
              {
                setting13Header: this.settingByTemplate13?.header ?? null,
                setting13Footer: this.settingByTemplate13?.footer ?? null,
                setting13General:
                  this.settingByTemplate13?.settingGeneral ?? null,
                pages: this.settingByTemplate13?.pages ?? null,
              },
            ]
          : null,
        settingByTemplate14: this.settingByTemplate14
          ? [
              {
                setting14Header: this.settingByTemplate14?.header ?? null,
                setting14Footer: this.settingByTemplate14?.footer ?? null,
                setting14General:
                  this.settingByTemplate14?.settingsGeneral ?? null,
                pages: this.settingByTemplate14?.pages ?? null,
                listProductsFilter:
                  this.settingByTemplate14?.listProductsFilter ?? null,
              },
            ]
          : null,
        settingByTemplate15: this.settingByTemplate15
          ? [
              {
                header: this.settingByTemplate15?.header ?? null,
                footer: this.settingByTemplate15?.footer ?? null,
                newsletter: this.settingByTemplate15?.newsLetter ?? null,
                settingGeneral:
                  this.settingByTemplate15?.settingGeneral ?? null,
                pages: this.settingByTemplate15?.pageHeader ?? null,
                listProductsFilter:
                  this.settingByTemplate15?.listProductsFilter ?? null,
              },
            ]
          : null,
        settingByTemplate16: this.settingByTemplate16
          ? [
              {
                header: this.settingByTemplate16?.header ?? null,
                footer: this.settingByTemplate16?.footer ?? null,
                newsletter: this.settingByTemplate16?.newsletter ?? null,
                settingGeneral:
                  this.settingByTemplate16?.settingsGeneral ?? null,
                pages: this.settingByTemplate16?.pageHeader ?? null,
                listProductsFilter:
                  this.settingByTemplate16?.listProductsFilter ?? null,
              },
            ]
          : null,
      }
    },
    stateModalPwd: {
      get() {
        return this.$store.state.stateModalPwd
      },
      set(value) {
        this.$store.commit('SET_STATE_MODAL_PWD', value)
      },
    },
  },
  beforeMount() {
    // if (this.dataStore?.tiendasInfo?.dominio) {
    //   caches.keys().then(function (names) {
    //     for (let name of names) caches.delete(name)
    //   })
    // }
  },
  async mounted() {
    // Configura y habilita el seguimiento de Facebook Pixel si está disponible
    if (this.analytics_tagmanager?.pixel_facebook != null) {
      this.$fb.setPixelId(this.analytics_tagmanager.pixel_facebook)
      this.$fb.track('PageView')
      this.$fb.enable()
    }

    // Ejecuta las dos dispatches de manera concurrente
    await Promise.all([
      this.$store.dispatch('GET_COOKIES'),
      this.$store.dispatch('GET_COOKIES_PWD'),
      // this.$store.dispatch('GET_SHOPPING_CART'),
    ])
    if (this.$route.query?.clearCart != 'true') {
      this.$store.dispatch('GET_SHOPPING_CART')
    }

    // Borra todos los elementos del carrito y actualiza el contenido si la query 'clearCart' es 'true'
    if (this.$route.query?.clearCart === 'true') {
      this.$store.commit('DELETE_ALL_ITEMS_CART')
      this.$store.commit('UPDATE_CONTENT_CART')
    }

    // Establece 'SET_OPEN_ORDER' en true si la query 'openCart' es 'true'
    if (this.$route.query?.openCart === 'true') {
      this.$store.commit('SET_OPEN_ORDER', true)
    }
    // Envía datos para registrar vistas en la pagina
    this.sendAnalyticsStore()
    // Agrega un listener de mensajes
    window.parent.postMessage('message', '*')
    window.addEventListener('message', this.addEventListenerTemplate)
  },
  beforeDestroy() {
    window.removeEventListener('message', this.addEventListenerTemplate)
  },
  methods: {
    redirectWhatsApp() {
      let phone_number_whatsapp = this.dataStore.redes.whatsapp
      if (phone_number_whatsapp.charAt(0) === '+') {
        phone_number_whatsapp = phone_number_whatsapp.slice(1)
      } else {
        phone_number_whatsapp = `57${phone_number_whatsapp}`
      }

      const baseUrl = 'https://wa.me/'
      const text = this.constructMessageText()

      const whatsappUrl = this.mobileCheck()
        ? `${baseUrl}${phone_number_whatsapp}/?text=${text}`
        : `https://web.whatsapp.com/send?phone=${phone_number_whatsapp}&text=${text}`

      window.open(whatsappUrl, '_blank')
    },
    constructMessageText() {
      const nombre = encodeURIComponent(this.dataStore.nombre)
      const url = encodeURIComponent(window.location)

      switch (this.dataStore.tiendasInfo.lenguaje) {
        case 'en':
          return `Hi%2C%20I%20came%20from%20your%20online%20store%20${nombre}%20and%20I%20would%20like%20to%20receive%20more%20information.%20%0AURL%3A%20${url}`
        case 'pt':
          return `Ol%C3%A1%2C%20vim%20de%20sua%20loja%20virtual%20${nombre}%20e%20gostaria%20de%20receber%20mais%20informa%C3%A7%C3%B5es.%20%0AURL%3A%20${url}`
        default:
          return `Hola%20vengo%20de%20tu%20tienda%20online%20${nombre}%20y%20me%20gustar%C3%ADa%20recibir%20mas%20informaci%C3%B3n%20%0AURL%3A%20${url}`
      }
    },
    acceptCookies() {
      document.getElementById('modalCookies').style.bottom = '-135px'
      document.cookie =
        'authCookies = 1; path=/; expires=Thu, 01 Dec 2050 00:00:00 UTC;'
    },
    acceptClose() {
      document.getElementById('modalNotificacion').style.zIndex = '-2'
      document.getElementById('modalNotificacion').style.opacity = '0'
    },
    addEventListenerTemplate(e) {
      if (
        e.origin.includes('https://panel.komercia.co') ||
        e.origin.includes('http://localhost:8080')
      ) {
        if (e && e.data) {
          if (e.data.type == 'settingModal') {
            this.$store.commit('SET_CURRENT_SETTING_MODAL', e.data)
            if (
              e.data.data &&
              e.data.data.stateModal &&
              e.data.data.stateModal == 1
            ) {
              this.stateModalPwd = false
            } else {
              this.stateModalPwd = true
            }
          }
        }
      }
    },
    async sendAnalyticsStore() {
      await this.$store.dispatch('SEND_ANALYTICS_STORE', {
        storeId: this.dataStore.id,
        event: 'VISITED_PAGE',
      })
    },
  },
}
</script>

<style>
:root {
  --purple: #4429b4;
  --green: #00dd8d;
  --magenta: #c52675;
  --yellow: #f2b931;
  --color_hover_text: #e64956;
  --btnhover: #929292;
  --radius_btn: 5px;
}
html {
  scroll-behavior: smooth;
}
* {
  scroll-behavior: smooth;
  margin: 0px;
  padding: 0px;
  outline: none;
  text-decoration: none;
  box-sizing: border-box;
  outline: none !important;
  /* font-family: var(--font-style); */
  /* overflow-x: hidden; */
}
.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}
.layout-enter-active,
.layout-leave-active {
  transition: opacity 0.5s;
}
.layout-enter,
.layout-leave-to {
  opacity: 0;
}
::-webkit-scrollbar {
  -webkit-appearance: none;
}
::-webkit-scrollbar:vertical {
  width: 11px;
}
::-webkit-scrollbar-button:increment,
::-webkit-scrollbar-button {
  display: none;
}
::-webkit-scrollbar:horizontal {
  height: 10px;
}
::-webkit-scrollbar-thumb {
  background-color: #797979;
  border-radius: 20px;
  border: 2px solid #f1f2f3;
}
.el-popover {
  display: none;
}
.wrapper-whatsapp {
  position: fixed;
  transform: translate(108px, 0px);
  top: 50%;
  right: 0px;
  width: 155px;
  color: white;
  overflow: hidden;
  background-color: #25d366;
  border-radius: 10px 0 0 10px;
  z-index: 50;
  transition: all 0.5s ease-in-out;
  vertical-align: middle;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  max-height: 51px;
}
.wrapper-whatsapp:hover {
  transform: translate(0px, 0px);
}
.wrapper-whatsapp span {
  font-size: 15px;
  padding-top: 8px;
  padding-bottom: 10px;
  position: relative;
  line-height: 16px;
  font-weight: bolder;
  margin-left: 5px;
  color: white;
}
.button-whatsapp {
  width: 50px;
  fill: white;
  line-height: 30px;
  padding: 8px;
  font-weight: bold;
  transform: rotate(0deg);
  transition: all 0.5s ease-in-out;
  text-align: center;
}
.button-whatsapp:hover {
  transform: rotate(360deg);
}
</style>
