<template>
  <div>
    <div
      v-if="dataStore && !storeError"
      class="flex w-full items-center justify-center bg-slate-100"
    >
      <div v-if="stateModalPwd">
        <nuxt />
      </div>
      <koModalSecurity v-else :data-store="dataStore" />
      <div
        v-if="dataStore.redes.whatsapp && dataStore.id != 16436"
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
    </div>
    <div v-else>
      <koTiendaError />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import mobileCheck from '@/mixins/mobileCheck'
import koTiendaError from '../components/Ko-errorStore'
import koModalSecurity from '../components/modal/Ko-modal-security.vue'
export default {
  name: 'LayoutsWhatsApp',
  components: {
    koTiendaError,
    koModalSecurity,
    koWhatsApp: () => import('../assets/Ko-whatsApp.vue'),
  },
  mixins: [mobileCheck],
  head() {
    let tienda = this.dataStore ?? ''
    let geolocation = this.geolocalizacion ?? ''
    let addiSlug = this.analytics_tagmanager?.addiAllySlug ?? ''
    let description =
      tienda?.tiendasInfo.descripcion?.replace(/<[^>]*>?/g, '') ?? ''
    let FacebookPixel1 =
      this.analytics_tagmanager?.facebook_pixel_metatag_1 ?? ''
    let googleMerchants = this.analytics_tagmanager?.google_merchant ?? ''
    return {
      title: tienda.nombre ? tienda.nombre : 'Tienda',
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
          content: tienda?.nombre ?? 'Tienda',
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
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Poppins&display=swap',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Roboto&display=swap',
        },
      ],
    }
  },
  computed: {
    ...mapState([
      'storeError',
      'dataStore',
      'stateModalPwd',
      'geolocalizacion',
      'analytics_tagmanager',
    ]),
  },
  // beforeMount() {
  //   if (this.dataStore?.tiendasInfo?.dominio) {
  //     caches.keys().then(function (names) {
  //       for (let name of names) caches.delete(name)
  //     })
  //   }
  // },
  async mounted() {
    // Configura y habilita el seguimiento de Facebook Pixel si está disponible
    if (this.analytics_tagmanager?.pixel_facebook != null) {
      this.$fb.setPixelId(this.analytics_tagmanager.pixel_facebook)
      this.$fb.track('PageView')
      this.$fb.enable()
    }

    // Ejecuta las acciones de forma concurrente usando Promise.all
    await Promise.all([
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
* {
  font-family: 'Poppins', sans-serif !important;
  scroll-behavior: smooth;
  margin: 0px;
  padding: 0px;
  outline: none;
  text-decoration: none;
  box-sizing: border-box;
  outline: none !important;
}
html {
  scroll-behavior: smooth;
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
