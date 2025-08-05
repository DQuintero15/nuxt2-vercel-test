<template>
  <header
    v-if="settingByTemplate13"
    id="navbar"
    class="header-container"
    :style="[
      settingByTemplate13[0].setting13Header,
      settingByTemplate13[0].setting13General,
      {
        '--font-style-1':
          settingByTemplate13[0]?.setting13General?.fount_1 ?? 'Poppins',
      },
    ]"
  >
    <KoSearch :data-store="dataStore" />
    <KoMenu
      :logo-store="logoStore"
      :data-store="dataStore"
      :setting-by-template="settingByTemplate13"
    />
    <div class="wrapper-header">
      <div class="header">
        <div class="header-content-logo">
          <nuxt-link to="/" class="wrapper-logo">
            <img
              loading="lazy"
              :src="imageUrl"
              class="header-logo"
              alt="Logo Img"
              @click="clear"
              @error="setDefaultImage"
            />
          </nuxt-link>
        </div>
        <div class="header-content">
          <div class="flex w-full flex-row justify-end">
            <button class="header-item-menu" @click="openMenuLateral">
              <menu-icon class="header-icon-menu" />
            </button>
            <div class="mr-20 flex flex-row">
              <div
                v-if="settingByTemplate13[0].pages.values.length > 6"
                class="btn-scroll"
                @click="scrollLeft()"
              >
                <FlechaLeft-icon class="btn-scroll-icon" />
              </div>
              <div
                v-if="settingByTemplate13[0].pages.values"
                id="swiper-slide-categories"
                class="header-content-buttons"
              >
                <div
                  v-for="(item, index) in settingByTemplate13[0].pages.values"
                  :key="`${index}${item.displayName}`"
                >
                  <nuxt-link
                    v-if="!item.isExternalLink"
                    :to="item.url"
                    class="content-button"
                  >
                    <p
                      class="btn"
                      :class="btnSelect == item.url ? 'btn-active' : ''"
                      @click="btnActivate(item.url)"
                    >
                      {{ item.displayName }}
                    </p>
                  </nuxt-link>
                  <a
                    v-else
                    :href="item.url"
                    target="_blank"
                    rel="noreferrer noopener"
                    class="content-button"
                  >
                    <p class="btn">
                      {{ item.displayName }}
                    </p>
                  </a>
                </div>
              </div>
              <div
                v-if="settingByTemplate13[0].pages.values.length > 6"
                class="btn-scroll"
                @click="scrollRight()"
              >
                <FlechaRight-icon class="btn-scroll-icon" />
              </div>
            </div>
            <div class="header-content-items">
              <div v-if="!openSearch && showSearch" class="search">
                <i class="header-search-icon" @click="stateSearch(true)">
                  <svg
                    class="search-header"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    xmlns:svgjs="http://svgjs.com/svgjs"
                    version="1.1"
                    width="20"
                    height="20"
                    x="0"
                    y="0"
                    viewBox="0 0 512 512"
                    style="enable-background: new 0 0 512 512"
                    xml:space="preserve"
                  >
                    <title>Search</title>
                    <g
                      transform="matrix(-1.8369701987210297e-16,-1,1,-1.8369701987210297e-16,9.536744585147972e-7,511.99998569488525)"
                    >
                      <path
                        d="M447.615,64.386C406.095,22.866,350.892,0,292.175,0s-113.92,22.866-155.439,64.386    C95.217,105.905,72.35,161.108,72.35,219.824c0,53.683,19.124,104.421,54.132,144.458L4.399,486.366    c-5.864,5.864-5.864,15.371,0,21.236C7.331,510.533,11.174,512,15.016,512s7.686-1.466,10.617-4.399l122.084-122.083    c40.037,35.007,90.775,54.132,144.458,54.132c58.718,0,113.919-22.866,155.439-64.386c41.519-41.519,64.385-96.722,64.385-155.439    S489.134,105.905,447.615,64.386z M426.379,354.029c-74.001,74-194.406,74-268.407,0c-74-74-74-194.407,0-268.407    c37.004-37.004,85.596-55.5,134.204-55.5c48.596,0,97.208,18.505,134.204,55.5C500.378,159.621,500.378,280.028,426.379,354.029z"
                      />
                    </g>
                  </svg>
                </i>
              </div>
              <div class="empty"></div>
              <div class="header-content-icon" @click="openOrder">
                <i class="header-content-cart">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="23"
                    height="23"
                    fill="currentColor"
                    class="icon-shop"
                    viewBox="0 0 16 16"
                  >
                    <title>Cart</title>
                    <path
                      d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"
                    />
                  </svg>
                </i>
                <div class="border-num-items">
                  <span class="num-items">{{ productsCart }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'KoHeader8',
  components: {
    KoMenu: () => import('../_lateralMenu/_lateralMenu11/openMenuLeft.vue'),
    KoSearch: () => import('../_lateralMenu/_lateralMenu/search.vue'),
  },
  props: {
    dataStore: {
      type: Object,
      required: true,
    },
    settingByTemplate13: {
      type: Array,
      required: true,
    },
    logoStore: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      btnSelect: '',
      search: '',
      showSearch: true,
      fallbackImage: '',
    }
  },
  computed: {
    ...mapState(['openSearch']),
    ...mapState({
      FacebookPixel: (state) => state.analytics_tagmanager,
      productsCart: (state) => state.productsCart.length,
    }),
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
      this.stateViewSearch()
    },
  },
  mounted() {
    this.setMenu()
    this.stateViewSearch()
  },
  methods: {
    btnActivate(value) {
      this.btnSelect = value
    },
    stateSearch(value) {
      this.$store.commit('SET_OPEN_SEARCH', value)
    },
    openOrder() {
      this.$store.commit('SET_OPEN_ORDER', true)
    },
    openMenuLateral() {
      this.$store.commit('SET_OPEN_ORDER_MENU_LEFT', true)
    },
    closed() {
      this.$store.commit('SET_OPEN_ORDER_MENU_LEFT', false)
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
    },
    stateViewSearch() {
      this.showSearch = this.btnSelect !== '/productos'
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
.btn-scroll {
  display: flex;
  justify-content: center;
  align-items: center;
  top: 50%;
  min-height: 50px;
  padding: 0px 6px;
  background: transparent;
  cursor: pointer;
}
.btn-scroll-icon {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: var(--color_tex);
  bottom: 0.125em;
}
.btn-scroll-icon:hover {
  color: var(--hover_text);
}
.item-btns {
  max-width: 850px;
}
.header-container {
  @apply sticky top-0 z-100 flex w-full flex-col items-center justify-center transition-all duration-0.5 ease-in-out;
}
.wrapper-header {
  padding-top: var(--padding_logo);
  padding-bottom: var(--padding_logo);
  background-color: var(--background_color_1);
  @apply z-10 flex w-full flex-col items-center justify-between;
}
.header {
  background-color: var(--background_color_1);
  @apply flex w-full justify-between;
}
.header-item-menu {
  @apply hidden;
}
.header-icon-menu {
  color: var(--color_icon);
  fill: var(--color_icon);
  @apply h-30 w-auto font-normal;
}
.header-content-logo {
  @apply flex items-center justify-center py-1;
}
.wrapper-logo {
  max-width: var(--with_logo);
  @apply flex w-full items-center justify-center;
}
.header-logo {
  @apply w-full object-contain object-left;
}
.header-content {
  @apply flex w-full flex-row items-center justify-center;
}
.header-content-buttons {
  max-width: 850px !important;
  box-sizing: border-box;
  z-index: 1;
  overflow-x: auto;
  overflow-y: hidden;
  @apply flex flex-row items-center justify-start;
}
.header-content-buttons::-webkit-scrollbar {
  width: 0 !important;
  display: none;
}
.btn-active {
  box-shadow: inset 0px -48px 0px -44px var(--color_border);
}
.btn {
  color: var(--color_tex);
  font-size: 16px;
  font-family: var(--font-style-1) !important;
  @apply mr-20 px-8 font-semibold leading-22 transition-all duration-0.3 ease-in;
}
.btn:hover {
  color: var(--hover_text);
  box-shadow: inset 0px -48px 0px -44px var(--color_border);
  @apply transition-all duration-0.3 ease-in;
}
.header-content-items {
  z-index: 3;
  background-color: var(--background_color_1);
  @apply flex flex-row items-center justify-between;
}
.header-search-icon {
  @apply flex h-auto w-36 items-center justify-center;
}
.search-header {
  /* color: var(--color_icon); */
  fill: var(--color_icon) !important;
  @apply cursor-pointer transition-all duration-0.2 ease-in;
}
.search-header:hover {
  color: var(--color_border);
  @apply transition-all duration-0.2 ease-in;
}
.empty {
  @apply mx-2;
}
.header-content-icon {
  @apply flex cursor-pointer flex-row items-center justify-center;
}
.header-content-cart {
  @apply relative flex h-auto w-36 cursor-pointer items-center justify-center;
}
.icon-shop {
  fill: var(--color_icon);
  @apply transition-all duration-0.2 ease-in;
}
.header-content-icon:hover .icon-shop {
  fill: var(--color_border);
  @apply transition-all duration-0.2 ease-in;
}
.border-num-items {
  background: var(--color_border);
  @apply -ml-8 -mt-20 flex h-15 w-auto items-center justify-center rounded-full;
}
.num-items {
  color: var(--background_color_1);
  font-size: 10px;
  font-family: var(--font-style-1) !important;
  @apply px-4 pt-1 font-semibold leading-12 tracking-0;
}
/* ***** */
@screen sm {
  .header {
    @apply flex w-full flex-row items-center justify-center px-10;
  }
  .header-container {
    @apply w-full;
  }
  .header-content {
    @apply flex w-9/0 flex-row items-center justify-between;
  }
  .header-content-buttons,
  .btn-scroll {
    @apply hidden;
  }
  .header-content-cart {
    @apply ml-0 pb-0;
  }
  .header-item-menu {
    @apply mr-20 flex items-center justify-center;
  }
  .header-icon-menu {
    @apply text-35;
  }
  .search-header {
    @apply flex;
  }
}
@screen lg {
  .header-content-buttons,
  .btn-scroll {
    @apply flex;
  }
  .header-item-menu {
    @apply hidden;
  }
}
@screen mlg {
  .header {
    @apply flex w-9/5 flex-row justify-between px-20;
  }
  .header-container,
  .wrapper-header {
    /* @apply h-100; */
  }
  .header-content {
    @apply flex h-auto w-auto flex-row items-center justify-between;
  }
}
@media (max-width: 768px) {
  .header-logo {
    max-width: 230px;
  }
}
@media (min-width: 1400px) {
  .header {
    @apply w-full;
    padding: 0px 20px;
    max-width: 1300px;
  }
}
</style>
