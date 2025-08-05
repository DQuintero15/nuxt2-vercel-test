<template>
  <header
    v-if="settingByTemplate7 && settingByTemplate7[0].setting7Header"
    id="navbar"
    class="header-container"
    :style="[
      settingByTemplate7[0].setting7Header,
      settingByTemplate7[0].setting7General,
      {
        '--font-style-1':
          settingByTemplate7[0]?.setting7General?.fount_1 ?? 'David libre',
      },
      {
        '--font-style-3':
          settingByTemplate7[0]?.setting7General?.fount_3 ?? 'Lora',
      },
    ]"
  >
    <KoMenu :logo-store="logoStore" :data-store="dataStore" />
    <KoSearch
      :logo-store="logoStore"
      :data-store="dataStore"
      :setting-card-products="settingByTemplate7[0].settingKProdutCard"
      :setting-general="settingByTemplate7[0].setting7General"
    />

    <div id="headbg" class="wrapper-header">
      <div id="headerid" class="header">
        <div class="header-item-menu" @click="openMenuLateral">
          <menu-icon class="header-icon-menu nav-bar" />
          <span class="header-text-menu">{{ $t('header_menu') }}</span>
        </div>
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
          <!-- @error="setFallbackImage" -->
        </div>
        <div class="header-content-buttons">
          <div v-for="(item, index) in secciones" :key="`${index}${item.name}`">
            <nuxt-link
              v-if="item.path"
              :to="item.path"
              class="btn"
              :class="btnSelect == item.path ? 'btn-active' : ''"
              @click="btnActivate(item.path)"
            >
              {{ $t(`${item.name}`) }}
            </nuxt-link>
            <nuxt-link
              v-else-if="item.href && stateListBLogs"
              :to="item.href"
              class="btn"
              :class="btnSelect == item.href ? 'btn-active' : ''"
              @click="btnActivate(item.href)"
            >
              {{ $t(`${item.name}`) }}
            </nuxt-link>
          </div>
        </div>
        <div class="header-content-items">
          <div v-if="showSearch">
            <div class="search" @click="openSearch">
              <form class="header-search-icon">
                <svg
                  class="search-header"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </form>
            </div>
          </div>
          <div v-if="showSearch" class="empty"></div>
          <div class="header-content-icon">
            <div class="header-content-cart" @click="openOrder">
              <svg
                class="icon-shop"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <div class="border-num-items">
              <span class="num-items">{{ productsCart }}</span>
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
  name: 'KoHeader4',
  components: {
    KoSearch: () => import('../_lateralMenu/_lateralMenu07/search-up.vue'),
    KoMenu: () => import('../_lateralMenu/_lateralMenu07/openMenuLeft.vue'),
  },
  props: {
    dataStore: {
      type: Object,
      required: true,
    },
    settingByTemplate7: {
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
      errorAttempts: 0,
      showSearch: false,
      btnSelect: '',
      secciones: [
        {
          name: 'header_inicio',
          path: '/',
        },
        {
          name: 'header_productos',
          path: '/productos',
        },
        {
          name: 'header_contacto',
          path: '/contacto',
        },
        {
          name: 'header_blog',
          href: '/blog',
        },
      ],
      fallbackImage: '',
    }
  },
  computed: {
    ...mapState(['stateListBLogs']),
    ...mapState({
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
      this.showIconSearch()
    },
    settingByTemplate7() {
      this.setColorBG()
    },
  },
  mounted() {
    this.setMenu()
    this.showIconSearch()
    this.setColorBG()
  },
  methods: {
    showIconSearch() {
      this.showSearch = this.btnSelect !== '/productos'
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
    },
    setColorBG() {
      const defaultColor = '#ffffff'
      const settings = this.settingByTemplate7[0]?.setting7Header || {}
      const isTransparent = settings.transparente || false
      const colorBg = settings['--background_color_1'] || defaultColor

      const navbar = document.getElementById('navbar')
      const header = document.getElementById('headerid')
      const bghead = document.getElementById('headbg')

      const applyStyles = (transparent, scrollPos) => {
        const atTop = scrollPos === 0
        const screenWidth = screen.width

        if (transparent) {
          header.style.backgroundColor = 'transparent'
          bghead.style.backgroundColor = 'transparent'
          bghead.style.boxShadow = 'transparent'
          header.style.boxShadow = 'transparent'
        } else {
          header.style.backgroundColor = colorBg
          bghead.style.backgroundColor = atTop ? 'transparent' : colorBg
          header.style.boxShadow = atTop
            ? '0px 0px 22px 2px rgba(145, 145, 145, 0.57)'
            : '0px 0px 0px 0px'
          bghead.style.boxShadow = atTop
            ? '0px 0px 0px 0px'
            : '0px 0px 10px 4px rgba(145,145,145,0.10)'
        }

        header.style.width = screenWidth >= 1280 ? '93%' : '100%'
        navbar.style.zIndex = '20'
        navbar.style.top = atTop && screenWidth >= 1280 ? '30px' : '0px'
      }

      const onScroll = () => {
        const currentScrollPos = window.pageYOffset
        applyStyles(isTransparent, currentScrollPos)
      }

      applyStyles(isTransparent, window.pageYOffset)

      window.onscroll = onScroll
    },
    setDefaultImage() {
      this.fallbackImage = require('@/assets/img/logo_nuevas_tiendas.png')
    },
  },
}
</script>

<style scoped>
.header-container {
  transition: all 0.5s ease-in-out;
  @apply fixed top-30 z-100 flex w-full flex-col items-center justify-center;
}
.wrapper-header {
  @apply flex w-full flex-col items-center justify-between transition-all ease-in-out;
}
.header {
  @apply flex w-full justify-between;
  background: var(--background_color_1);
}
.header-item-menu {
  @apply hidden;
}
.header-icon-menu {
  font-size: 30px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: var(--color_icon);
}
.header-icon-menu > .material-design-icon__svg {
  bottom: 0em;
}
.nav-bar {
  width: 24px;
  height: 24px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: var(--color_icon);
}
.nav-bar > .material-design-icon__svg {
  bottom: 0px;
  width: 24px;
  height: 24px;
}
.header-text-menu {
  color: var(--color_text);
  font-family: var(--font-style-3) !important;
}
.header-content-logo {
  @apply flex items-center justify-center py-4;
}
.wrapper-logo {
  @apply w-full;
}
.header-logo {
  @apply object-contain object-left;
  width: 100%;
  max-width: var(--with_logo);
}
.header-content-buttons {
  @apply flex w-auto flex-wrap items-center justify-center gap-6;
}
.btn-active {
  color: var(--hover_text) !important ;
}
.btn {
  @apply mx-16 font-semibold uppercase tracking-wider;
  transition: all 0.25s ease;
  font-family: var(--font-style-1) !important ;
  font-size: 14px;
  color: var(--color_text);
}
.btn:hover {
  color: var(--hover_text);
  transition: all 0.25s ease;
}
.header-content-items {
  @apply flex flex-row items-center justify-between;
}
.header-search-icon {
  @apply h-24 w-24;
}
.search-header {
  cursor: pointer;
  color: var(--color_icon);
  transition: all 0.25s ease;
}
.search-header:hover {
  color: var(--hover_text);
  transition: all 0.25s ease;
}
.empty {
  @apply mx-8;
}
.header-content-icon {
  @apply flex flex-row justify-between;
}
.header-content-cart {
  @apply relative ml-5 box-border flex h-9 w-9 cursor-pointer items-center justify-center pb-1;
}
.icon-shop {
  @apply h-24 w-24;
  color: var(--color_icon);
  transition: all 0.25s ease;
}
.icon-shop:hover {
  color: var(--hover_text);
  transition: all 0.25s ease;
}
.border-num-items {
  @apply -ml-12 -mt-12 flex h-16 w-auto items-center justify-center rounded-full text-center;
  background: var(--color_badge_cart);
}
.num-items {
  @apply p-5 text-xs;
  color: white;
}

/* ***** */
@screen sm {
  .header {
    padding-bottom: var(--padding);
    padding-top: var(--padding);
    @apply w-full px-16;
  }
  .header-container {
    @apply w-full;
  }
  .header-content-buttons {
    @apply sr-only;
  }
  .header-content-cart {
    @apply ml-0 pb-0;
  }
  .header-text-menu {
    @apply sr-only;
  }
  .search-header {
    @apply sr-only;
  }
  .header-item-menu {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    /* margin-left: 20px; */
  }
}
@screen md {
  .header-text-menu {
    @apply not-sr-only pl-8 text-xs font-semibold uppercase tracking-widest;
  }
}
@media (max-width: 768px) {
  .search {
    display: none;
  }
  /* .header-logo {
    max-width: 230px;
  } */
}
@screen lg {
  .header {
    @apply w-full;
  }
}
@screen mlg {
  .header {
    @apply w-9/3;
  }
  .header-content-buttons {
    @apply not-sr-only;
  }
  .header-text-menu {
    @apply sr-only;
  }
  .search-header {
    @apply not-sr-only;
  }
  .header-item-menu {
    @apply sr-only;
  }
}
@media (min-width: 1192px) {
  .header {
    width: 100%;
    max-width: 1192px;
  }
  .header-content-page {
    width: 1192px;
  }
}
</style>
