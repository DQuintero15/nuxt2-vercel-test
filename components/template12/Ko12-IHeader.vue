<template>
  <div>
    <header
      class="wrapper-header"
      :class="isVariantLogo ? 'bg-white-white shadow' : ''"
    >
      <div class="header-content-logo">
        <nuxt-link
          to="/"
          class="wrapper-logo"
          :style="`max-width:${settingByTemplate12.logoSize};`"
        >
          <img
            loading="lazy"
            :src="imageUrl"
            class="header-logo"
            alt="Logo Img"
            @error="setDefaultImage"
          />
        </nuxt-link>
      </div>
      <div class="content_car">
        <button
          id="OpenCartTag"
          style="margin-right: 20px"
          class="btn-cart content_car"
          :class="isVariantLogo ? 'text-1' : 'text-2'"
          @click="openSearch"
        >
          <search-icon class="icon" />
          <p style="font-size: 18px; margin-left: 2px">
            {{ $t('home_buscar') }}
          </p>
        </button>
        <button
          id="OpenCartTag"
          class="btn-cart content_car"
          :class="isVariantLogo ? 'text-1' : 'text-2'"
          @click="openOrder"
        >
          <cart-icon class="icon" />
          <p style="font-size: 18px; margin-left: 2px">
            {{ $t('footer_carrito') }}
          </p>
        </button>
      </div>
    </header>
    <KoOrder :data-store="dataStore" />
    <KoSearch />
  </div>
</template>

<script>
import settingsProps from './mixins/ComponentProps'

export default {
  name: 'Ko12IHeader',
  components: {
    KoOrder: () => import('../headers/_order1/order1.vue'),
    KoSearch: () => import('../headers/k05_header/search.vue'),
  },
  mixins: [settingsProps],
  props: {
    dataStore: {
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
      isVariantLogo: false,
      fallbackImage: '',
    }
  },
  computed: {
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
  async mounted() {
    window.addEventListener('scroll', await this.handleToggleLogo)
  },
  async beforeDestroy() {
    window.removeEventListener('scroll', await this.handleToggleLogo)
  },

  methods: {
    async handleToggleLogo() {
      await (this.isVariantLogo = !!(window.scrollY >= 120))
    },
    openOrder() {
      this.$gtm.push({
        event: 'OpenCart',
        action: 'click',
      })
      this.showMenu = false
      this.$store.commit('SET_OPEN_ORDER', true)
    },
    openSearch() {
      this.$store.commit('SET_OPEN_SEARCH', true)
    },
    setDefaultImage() {
      this.fallbackImage = require('@/assets/img/logo_nuevas_tiendas.png')
    },
  },
}
</script>
<style scoped>
.wrapper-header {
  padding: 0 20px;
  transition: all 200ms ease-in-out;
  @apply fixed left-0 top-0 z-10 flex w-full transform-gpu items-center justify-between;
}
.header-content-logo {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px 0px;
}
.wrapper-logo {
  width: 100%;
}
.header-logo {
  object-fit: contain;
  object-position: left;
}
.btn-cart {
  font-weight: normal;
  margin-right: 10px;
  cursor: pointer;
}
.content_car {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.icon {
  bottom: 0.125em;
  font-size: 19px;
}
.text-1 {
  color: black;
}
.text-2 {
  color: white;
}
.text-1:hover,
.text-2:hover {
  color: gray;
}
</style>
