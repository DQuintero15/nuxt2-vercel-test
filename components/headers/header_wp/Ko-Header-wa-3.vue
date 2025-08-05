<template>
  <div class="content-header">
    <div class="content-header-items">
      <div
        class="content-banner-items"
        :style="`background-image: url(${idCloudinaryBanner(
          bannerUrl,
          'bannerRes',
          900
        )});`"
      >
        <div
          class="content-data-store"
          :style="`background: ${settingByTemplate.color_icon};`"
        >
          <div class="content-logo-name">
            <nuxt-link
              :to="stateWapiME ? `/wa/${dataStore.id}/` : `/`"
              class="data-item-logo"
              :class="
                settingByTemplate.logo_cuadrado == 1
                  ? `imagen-cuadrado`
                  : `imagen-redondo`
              "
            >
              <img
                loading="lazy"
                :src="imageUrl"
                class="logo-img"
                :class="
                  settingByTemplate.logo_cuadrado == 1
                    ? `imagen-cuadrado`
                    : `imagen-redondo`
                "
                alt="logo-Store"
                @error="setDefaultImage"
              />
            </nuxt-link>
            <div class="data-item-name">
              <p class="name-store">
                {{ dataStore.nombre }}
              </p>
              <p
                v-if="settingByTemplate?.mensaje_principal"
                class="category-store"
              >
                {{ settingByTemplate.mensaje_principal }}
              </p>
            </div>
          </div>
          <div v-if="settingByTemplate?.descripcion" class="content-seeMore">
            <p
              v-if="!showInfoStore"
              class="txt-seeMore"
              @click="showInfoStore = true"
            >
              {{ $t('home_cardvermas') }}
            </p>
            <p v-else class="txt-seeMore" @click="showInfoStore = false">
              Ver menos
            </p>
            <div>
              <Flechadown-icon
                v-if="!showInfoStore"
                class="svg-arrow"
                @click="showInfoStore = true"
              />
              <FlechaUp-icon
                v-else
                class="svg-arrow"
                @click="showInfoStore = false"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showInfoStore" class="content-infoStore">
      <div v-if="settingByTemplate?.descripcion">
        <p class="txt-direccion">
          {{ settingByTemplate.descripcion }}
        </p>
      </div>
    </div>
    <KoOrderWa :data-store="dataStore" :state-order-wapi="true" />
  </div>
</template>
<script>
import idCloudinaryBanner from '@/mixins/idCloudinary'
export default {
  name: 'HeaderWa3',
  components: { KoOrderWa: () => import('../_order1/order1.vue') },
  mixins: [idCloudinaryBanner],
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
      showInfoStore: false,
      bannerUrl: '',
      fallbackImage: '',
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
  mounted() {
    if (this.settingByTemplate?.banner) {
      this.bannerUrl = this.settingByTemplate.banner
    } else {
      this.bannerUrl =
        'https://www.kellyservices.pl/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcTFlIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c649985d042e87fdb30660e80b7dd19a010450b2/banner-default.jpg'
    }
  },
  methods: {
    setDefaultImage() {
      this.fallbackImage = require('@/assets/img/logo_nuevas_tiendas.png')
    },
  },
}
</script>
<style scoped>
.content-header {
  @apply flex w-full flex-col items-center justify-center;
}
.imagen-redondo {
  border-radius: 100px;
}
.imagen-cuadrado {
  border-radius: 5px;
}
@screen sm {
  .content-header-items {
    @apply flex w-full flex-col items-center justify-center;
  }
  .content-banner-items {
    height: auto;
    @apply my-8 flex w-9/5 flex-col items-center justify-center overflow-hidden rounded-9 bg-cover bg-center bg-no-repeat;
  }
  .content-data-store {
    @apply flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-9;
  }
  .content-logo-name {
    @apply mt-20 flex w-full flex-row items-center justify-center;
  }
  .data-item-logo {
    margin-left: 20px;
    margin-right: 20px;
    background: white;
    width: 110px;
    height: 75px;
    @apply flex flex-col items-center justify-center shadow-md;
  }
  .logo-img {
    height: 100%;
    width: 100%;
    object-fit: contain;
    object-position: center;
    background: transparent;
  }
  .data-item-name {
    @apply my-10 flex w-full flex-col items-center justify-center;
  }
  .name-store {
    font-size: 15px;
    color: #fff;
    font-family: 'Poppins', sans-serif !important;
    @apply flex w-full flex-col items-start justify-center font-semibold;
  }
  .category-store {
    font-size: 12px;
    color: #fff;
    font-family: 'Poppins', sans-serif !important;
    @apply flex w-full flex-col items-start justify-center font-medium;
  }
  .content-category-data {
    @apply flex w-9/5 flex-col items-center justify-center;
  }

  .content-seeMore {
    @apply mb-10 flex w-auto cursor-pointer flex-row items-center justify-center;
  }
  .txt-seeMore {
    font-size: 13px;
    color: #fff;
    font-family: 'Poppins', sans-serif !important;
    @apply flex w-auto flex-col items-center justify-center pl-5 font-medium;
  }
  .svg-arrow {
    color: white;
    fill: white;
    bottom: 1px;
  }
  .content-infoStore {
    background-color: #eaeaea;
    @apply mb-10 flex w-9/5 flex-col items-start justify-center rounded-9 p-15;
  }
  .txt-direccion {
    font-size: 13px;
    color: #3d3d3d;
    font-family: 'Poppins', sans-serif !important;
    @apply flex w-auto items-center justify-center font-medium;
  }
}
@media (min-width: 375px) {
  .content-banner-items {
    height: 120px;
  }
}
@media (min-width: 425px) {
  .content-banner-items {
    height: 135px;
  }
  .data-item-logo {
    width: 110px;
    height: 90px;
  }
  .name-store {
    font-size: 20px;
  }
  .category-store {
    font-size: 15px;
  }
}
@screen md {
  .content-banner-items {
    height: 300px;
    @apply my-18;
  }
  .content-logo-name {
    @apply mb-20 mt-0;
  }
  .data-item-logo {
    width: 150px;
    height: 120px;
  }
  .name-store {
    font-size: 40px;
  }
  .category-store {
    font-size: 26px;
  }
  .txt-seeMore {
    font-size: 18px;
  }
  .txt-direccion {
    font-size: 17px;
  }
}
</style>
