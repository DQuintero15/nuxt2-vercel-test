<template>
  <div class="header-container">
    <div class="wrapper-header">
      <KoOrderWa :data-store="dataStore" :state-order-wapi="true" />
      <div v-if="settingByTemplate && settingByTemplate.banner">
        <div v-if="settingByTemplate.banner" class="wrapper-banner-img">
          <img
            :src="
              idCloudinaryBanner(settingByTemplate.banner, 'bannerRes', 900)
            "
            class="banner"
            alt="Banner-wapi"
          />
        </div>
      </div>
      <div v-else>
        <div class="wrapper-banner-img">
          <img
            src="https://www.kellyservices.pl/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcTFlIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c649985d042e87fdb30660e80b7dd19a010450b2/banner-default.jpg"
            class="banner"
            alt="Banner-wapi"
          />
        </div>
      </div>
      <div class="header">
        <nuxt-link
          :to="stateWapiME ? `/wa/${dataStore.id}/` : `/`"
          class="containt-image"
          :class="
            settingByTemplate.logo_cuadrado == 1
              ? `imagen-cuadrado`
              : `imagen-redondo`
          "
        >
          <img
            loading="lazy"
            :src="imageUrl"
            class="header-logo"
            alt="Logo Img"
            @error="setDefaultImage"
          />
        </nuxt-link>
        <div class="header-content-text">
          <p class="header-title">
            {{ dataStore.nombre }}
          </p>
          <p
            v-if="settingByTemplate?.mensaje_principal"
            class="header-subtitle"
          >
            {{ settingByTemplate.mensaje_principal }}
          </p>
          <div v-if="settingByTemplate?.descripcion">
            <p class="header-description">
              {{ settingByTemplate.descripcion }}
            </p>
          </div>
        </div>
        <div class="container-tienda-wp">
          <p><whatsapp-icon class="wp-icon" /> {{ $t('header_tiendaWa') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import idCloudinary from '@/mixins/idCloudinary'
export default {
  name: 'KoHeaderWa',
  components: {
    KoOrderWa: () => import('../_order1/order1.vue'),
  },
  mixins: [idCloudinary],
  props: {
    dataStore: {
      type: Object,
      required: true,
    },
    settingByTemplate: {
      type: Object,
      required: true,
    },
    logoStore: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      links: [
        {
          nombre: 'Facebook',
          icon: 'facebook-icon',
          link: this.dataStore.redes.facebook,
        },
        {
          nombre: 'Twitter',
          icon: 'twitter-icon',
          link: this.dataStore.redes.twitter,
        },
        {
          nombre: 'Instagram',
          icon: 'instagram-icon',
          link: this.dataStore.redes.instagram,
        },
        {
          nombre: 'Youtube',
          icon: 'youtube-icon',
          link: this.dataStore.redes.youtube,
        },
        {
          nombre: 'Tiktok',
          icon: 'tiktok-icon',
          link: this.dataStore.redes.tiktok,
        },
      ],
      fallbackImage: '',
    }
  },
  computed: {
    productsCart() {
      return this.$store.state.productsCart.length
    },
    stateWapiME() {
      return this.$store.state.stateWapiME
    },
    imageUrl() {
      if (this.fallbackImage) {
        return this.fallbackImage
      }
      if (this.logoStore?.logoMigrated === 1) {
        return this.logoStore.logo
      } else {
        return `${this.$store.state.urlKomercia}/logos/${this.logoStore.identifier}`
      }
    },
  },
  watch: {
    'dataStore.tienda'() {
      this.links[0].link = this.dataStore.redes.facebook
      this.links[1].link = this.dataStore.redes.twitter
      this.links[2].link = this.dataStore.redes.instagram
      this.links[3].link = this.dataStore.redes.youtube
      this.links[4].link = this.dataStore.redes.tiktok
    },
  },
  methods: {
    openOrder() {
      this.$store.commit('SET_OPEN_ORDER', true)
    },
    setDefaultImage() {
      this.fallbackImage = require('@/assets/img/logo_nuevas_tiendas.png')
    },
  },
}
</script>

<style scoped>
.header-container {
  width: 100%;
  display: flex;
  justify-content: center;
  overflow: hidden;
  background: white;
}
.wrapper-header {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: white;
  flex-direction: column;
  transition: all ease 1s;
}
.wrapper-banner-img {
  width: 100%;
  max-height: 300px;
  overflow: hidden;
}
.banner {
  max-height: 300px;
  width: 100%;
  object-fit: cover;
  overflow: hidden;
}
.header {
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 15px 15px;
  position: relative;
}
.containt-image {
  display: flex;
  width: 105px;
  height: 105px;
  left: 20px;
  top: -50px;
  /* top: 165px; */
  background-color: white;
  position: absolute;
  overflow: hidden;
  border: solid 1px white;
  padding: 5px;
  align-items: center;
  box-shadow:
    0 0 2px rgba(92, 100, 111, 0.1),
    0 5px 10px rgba(134, 143, 155, 0.08),
    0 15px 35px rgba(52, 58, 67, 0.08);
  /* box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 2px inset, white 0px 0px 0px 3px; */
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  /* border: solid 1px #201d1d; */
}
.imagen-redondo {
  border-radius: 100px;
}
.imagen-cuadrado {
  border-radius: 5px;
}
.header-logo {
  height: 100%;
  width: 100%;
  object-fit: contain;
  object-position: center;
  /* border-radius: 50%; */
}
.header-content-text {
  margin-left: 130px;
}
.header-title {
  font-size: 20px;
  font-weight: bold;
  color: black;
}
.header-subtitle {
  font-size: 16px;
  /* font-weight: 500; */
  color: black;
}
.header-description {
  margin-top: 10px;
  font-size: 13px;
  font-weight: normal;
  color: #4e4e4e;
  max-width: 500px;
}
.container-tienda-wp {
  display: initial;
  background-color: white;
  position: absolute;
  top: 10px;
  right: 25px;
  border-radius: 15px;
  padding: 4px 8px;
  box-shadow: 0 0 2px rgba(92, 100, 111, 0.1);
  box-shadow: 0 2px 5px rgba(131, 130, 131, 0.276);
}
.container-tienda-wp p {
  color: #4c4c4c;
  font-size: 12px;
}
.wp-icon {
  font-size: 15px;
  color: #075e54;
  margin-right: 3px;
}
@media (max-width: 530px) {
  .header {
    padding: 50px 20px 1px 20px;
  }
  .header-content-text {
    margin-left: 0px;
  }
  .containt-image {
    width: 90px;
    height: 90px;
  }
  .wrapper-banner-img {
    max-height: 160px;
  }
  .banner {
    max-height: 160px;
  }
  .container-tienda-wp {
    top: 10px;
    right: 25px;
  }
}
</style>
