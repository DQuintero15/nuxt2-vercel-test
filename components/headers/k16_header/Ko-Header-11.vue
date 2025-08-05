<template>
  <header
    v-if="settingByTemplate16"
    id="navbar"
    class="wrapper-header sticky top-0 z-100 flex w-full items-center justify-center px-10"
    :style="[
      settingByTemplate16[0].header,
      settingByTemplate16[0].settingGeneral,
      {
        '--font-style-1':
          settingByTemplate16[0]?.settingGeneral?.font ?? 'Poppins',
      },
    ]"
  >
    <KoSearch :data-store="dataStore" />
    <KoMenu
      :logo-store="logoStore"
      :data-store="dataStore"
      :setting-by-template="settingByTemplate16[0]?.listProductsFilter"
      :page-template="settingByTemplate16[0]?.pages"
    />
    <div class="flex w-full max-w-7xl items-center justify-between">
      <div class="flex max-h-[120px] items-center justify-center md:max-h-10/0">
        <nuxt-link
          to="/"
          class="flex w-full items-center justify-center"
          style="max-width: var(--with_logo)"
        >
          <img
            loading="lazy"
            :src="imageUrl"
            class="max-h-[120px] w-full object-contain object-left"
            alt="LogoStore"
            @click="clear"
            @error="setDefaultImage"
          />
        </nuxt-link>
      </div>
      <div
        v-if="settingByTemplate16[0].pages.values"
        id="swiper-slide-categories"
        class="box-border hidden flex-row items-center justify-start lg:flex"
      >
        <div
          v-for="(item, index) in settingByTemplate16[0].pages.values"
          :key="`${index}${item.displayName}`"
        >
          <nuxt-link v-if="!item.isExternalLink" :to="item.url">
            <p
              class="btn mr-20 px-8 text-16 font-semibold leading-22 transition-all duration-0.3 ease-in"
              :class="btnSelect == item.url ? 'btn-active' : ''"
              @click="btnActivate(item.url)"
            >
              {{ item.displayName }}
            </p>
          </nuxt-link>
          <a
            v-else
            :href="item.url"
            rel="noreferrer noopener"
            class="btn mr-20 px-8 text-16 font-semibold leading-22 transition-all duration-0.3 ease-in"
            target="_blank"
          >
            {{ item.displayName }}
          </a>
        </div>
      </div>
      <div class="flex items-center justify-center">
        <div v-if="showSearch" class="mr-10" @click="openSearch">
          <search-icon
            class="text-25"
            :style="`color: ${settingByTemplate16[0].header['--color_icon']} ;`"
          />
        </div>
        <div
          class="flex cursor-pointer flex-row items-center justify-center transition-all duration-0.3 ease-in"
          @click="openOrder"
        >
          <i
            class="relative flex h-auto w-36 cursor-pointer items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              height="23"
              :fill="settingByTemplate16[0].header['--color_icon']"
              class="icon-shop transition-all duration-0.2 ease-in"
              viewBox="0 0 16 16"
            >
              <title>Cart</title>
              <path
                d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"
              />
            </svg>
          </i>
          <div
            class="-ml-8 -mt-20 flex h-15 w-auto items-center justify-center rounded-full"
            style="background-color: var(--color_border)"
          >
            <span
              class="num-items px-4 pt-1 text-10 font-semibold leading-12 tracking-0 text-white-white"
            >
              {{ productsCart }}
            </span>
          </div>
        </div>
        <button class="ml-10 flex lg:hidden" @click="openMenuLateral">
          <menu-icon
            class="text-25"
            :style="`color: ${settingByTemplate16[0].header['--color_icon']} ;`"
          />
        </button>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'KoHeader11',
  components: {
    KoMenu: () => import('../_lateralMenu/_lateralMenu14/openMenuLeft.vue'),
    KoSearch: () => import('../_lateralMenu/_lateralMenu/search.vue'),
  },
  props: {
    settingByTemplate16: {
      type: Array,
      required: true,
    },
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
      showSearch: true,
      btnSelect: '',
      stateMenu: false,
      fallbackImage: '',
    }
  },
  computed: {
    productsCart() {
      return this.$store.state.productsCart.length
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
    $route() {
      this.setMenu()
    },
  },
  mounted() {
    this.setMenu()
  },
  methods: {
    showIconSearch() {
      this.showSearch = this.btnSelect !== '/productos'
    },
    btnActivate(value) {
      this.btnSelect = value
    },
    openSearch() {
      this.$store.commit('SET_OPEN_SEARCH', true)
    },
    openOrder() {
      this.$store.commit('SET_OPEN_ORDER', true)
    },
    openMenuLateral() {
      this.$store.commit('SET_OPEN_ORDER_MENU_LEFT', true)
    },
    clear() {
      this.$router.push({
        path: '/',
      })
      this.$store.commit('SET_STATE_BANNER', true)
    },
    setMenu() {
      const routeMappings = {
        index: '/',
        productos: '/productos',
        contacto: '/contacto',
        micompra: '/micompra',
        blog: '/blog',
        cart: '/cart',
      }
      const currentRouteName = this.$route.name
      this.btnSelect = routeMappings[currentRouteName] || '/'

      this.showIconSearch()
    },
    scrollLeft() {
      document.getElementById('swiper-slide-categories').scrollLeft -= 300
    },
    scrollRight() {
      document.getElementById('swiper-slide-categories').scrollLeft += 300
    },
    setDefaultImage() {
      this.fallbackImage = require('@/assets/img/logo_nuevas_tiendas.png')
    },
  },
}
</script>

<style scoped>
* {
  font-family: var(--font-style-1) !important;
}
.wrapper-header {
  padding-top: var(--padding_logo);
  padding-bottom: var(--padding_logo);
  background-color: var(--background_color_1);
}

.btn-active {
  box-shadow: inset 0px -48px 0px -44px var(--color_border);
}
.btn {
  color: var(--color_text);
}
.btn:hover {
  color: var(--hover_text);
  box-shadow: inset 0px -48px 0px -44px var(--color_border);
}
</style>
