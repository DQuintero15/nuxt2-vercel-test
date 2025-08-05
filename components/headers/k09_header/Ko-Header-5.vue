<template>
  <header
    v-if="settingByTemplate9"
    id="navbar"
    class="header-container sticky top-0 z-100 flex w-full flex-col items-center justify-center transition-all duration-0.5 ease-in-out"
    :style="[
      settingByTemplate9[0].setting9Header,
      settingByTemplate9[0].setting9General,
      {
        '--font-style-1':
          settingByTemplate9[0]?.setting9General?.fount_1 ?? 'Poppins',
      },
    ]"
  >
    <KoSearch
      :data-store="dataStore"
      :setting-by-template="settingByTemplate9"
    />
    <KoMenu :logo-store="logoStore" :data-store="dataStore" />
    <div class="wrapper-header">
      <div class="header">
        <div class="header-item-menu">
          <menu-icon
            class="header-icon-menu nav-bar"
            @click="openMenuLateral"
          />
          <svg
            class="search-header-left"
            data-name="search-icon-small 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 15 15"
            width="15"
            height="15"
            @click="openSearch"
          >
            <rect
              x="11.73223"
              y="10.52513"
              width="2"
              height="4.41421"
              transform="translate(-5.27386 12.73223) rotate(-45)"
            ></rect>
            <path
              d="M7,0a7,7,0,1,0,7,7A7,7,0,0,0,7,0ZM7,12a5,5,0,1,1,5-5A5,5,0,0,1,7,12Z"
            ></path>
          </svg>
        </div>
        <div class="header-content-buttons">
          <div v-for="(item, index) in secciones" :key="`${index}${item.name}`">
            <button
              v-if="item.path && item.state"
              class="btn"
              :class="btnSelect == item.path ? 'btn-active' : ''"
              @click="btnActivate(item.path)"
            >
              {{ $t(`${item.name}`) }}
            </button>
            <nuxt-link
              v-else-if="item.href && stateListBLogs && item.state"
              :to="item.href"
              class="btn"
            >
              {{ $t(`${item.name}`) }}
            </nuxt-link>
          </div>
        </div>
        <div class="header-content-logo">
          <nuxt-link to="/" class="wrapper-logo">
            <img
              loading="lazy"
              :src="imageUrl"
              class="header-logo"
              alt="Logo Img"
              @error="setDefaultImage"
            />
          </nuxt-link>
        </div>
        <div class="header-content-items">
          <div v-if="showSearch">
            <div class="search" @click="openSearch">
              <form class="header-search-icon">
                <svg
                  class="search-header"
                  data-name="search-icon-small 1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 15 15"
                  width="15"
                  height="15"
                >
                  <rect
                    x="11.73223"
                    y="10.52513"
                    width="2"
                    height="4.41421"
                    transform="translate(-5.27386 12.73223) rotate(-45)"
                  ></rect>
                  <path
                    d="M7,0a7,7,0,1,0,7,7A7,7,0,0,0,7,0ZM7,12a5,5,0,1,1,5-5A5,5,0,0,1,7,12Z"
                  ></path>
                </svg>
              </form>
            </div>
          </div>
          <div v-if="showSearch" class="empty"></div>
          <div class="header-content-icon" @click="openOrder">
            <div class="header-content-cart">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon-shop"
                width="14"
                height="16"
                viewBox="0 0 14 16"
              >
                <path
                  d="M11,3V0H3V3H0V16H14V3H11ZM5,2H9V3H5V2Zm7,12H2V5H3V7H5V5H9V7h2V5h1v9Z"
                ></path>
              </svg>
            </div>
            <div class="border-num-items-up">
              <span an class="num-items-up">{{ productsCart }}</span>
            </div>
            <div class="txt-bag">
              <p class="btn-bag">Carrito</p>
            </div>
            <div class="border-num-items">
              <span an class="num-items">{{ productsCart }}</span>
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
  name: 'KoHeader5',
  components: {
    KoMenu: () => import('../_lateralMenu/_lateralMenu/openMenuLeft.vue'),
    KoSearch: () => import('../_lateralMenu/_lateralMenu/searchDown09.vue'),
  },
  props: {
    dataStore: {
      type: Object,
      required: true,
    },
    settingByTemplate9: {
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
      showSearch: false,
      btnSelect: '',
      secciones: [
        {
          name: 'header_inicio',
          path: '/',
          state: true,
        },
        {
          name: 'header_productos',
          path: '/productos',
          state: true,
        },
        {
          name: 'header_productos_hoko',
          path: '/productosHoko',
          state: false,
        },
        {
          name: 'header_contacto',
          path: '/contacto',
          state: true,
        },
        {
          name: 'header_blog',
          href: '/blog',
          state: true,
        },
      ],
      fallbackImage: '',
    }
  },
  computed: {
    ...mapState(['stateListBLogs', 'dataHoko']),
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
    dataHoko() {
      this.setHoko()
    },
    $route() {
      this.setMenu()
    },
  },
  mounted() {
    this.setMenu()
    this.setHoko()
  },
  methods: {
    showIconSearch() {
      this.showSearch = this.btnSelect !== '/productos'
    },
    setHoko() {
      this.secciones[2].state =
        this.dataHoko && this.dataHoko.statehoko == 1 ? true : false
    },
    btnActivate(value) {
      this.$router.push({
        path: value,
      })
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
    clear() {
      this.$router.push({
        path: '/',
      })
    },
    setDefaultImage() {
      this.fallbackImage = require('@/assets/img/logo_nuevas_tiendas.png')
    },
  },
}
</script>

<style scoped>
.header-container {
  border-bottom: 1px solid var(--background_color_1);
  background: var(--background_color_1);
}
.wrapper-header {
  background: var(--background_color_1);
  @apply z-10 flex w-full flex-col items-center justify-between shadow-lg;
}
.header {
  background: var(--background_color_1);
  @apply flex w-full justify-between;
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
  /* font-family: 'Poppins', Helvetica, Arial, sans-serif !important; */
  font-family: var(--font-style-1) !important;
}
.header-content-logo {
  margin-top: var(--padding);
  margin-bottom: var(--padding);
  @apply flex items-center justify-center;
}
.wrapper-logo {
  max-width: var(--with_logo);
  @apply w-full;
}
.header-logo {
  @apply w-full object-contain object-left;
}
.header-content-buttons {
  @apply flex w-auto flex-wrap items-center justify-center gap-0;
}
.btn {
  margin-right: 20px;
  transition: all 0.1s ease;
  /* font-family: 'Poppins', Helvetica, Arial, sans-serif !important; */
  font-family: var(--font-style-1) !important;
  font-size: 14px;
  color: var(--color_text);
  font-weight: 600;
}
.btn-active {
  color: var(--hover_text);
  transition: all 0.1s ease;
  border-bottom: 2px solid #000;
}
.btn:hover {
  color: var(--hover_text);
  transition: all 0.1s ease;
  border-bottom: 2px solid #000;
}
.header-content-items {
  @apply flex flex-row items-center justify-end;
  flex: 1;
}
.header-search-icon {
  @apply flex items-center justify-center;
}
.search-header {
  @apply cursor-pointer;
  fill: var(--color_icon);
  transition: all 0.25s ease;
}
.search-header:hover {
  fill: var(--hover_text);
  transition: all 0.25s ease;
}
.search-header-left {
  @apply cursor-pointer;
  fill: var(--color_icon);
  transition: all 0.25s ease;
}
.search-header-left:hover {
  fill: var(--hover_text);
  transition: all 0.25s ease;
}
.empty {
  @apply mx-2;
}
.btn-bag {
  margin-right: 15px;
  transition: all 0.1s ease;
  /* font-family: 'Poppins', Helvetica, Arial, sans-serif !important; */
  font-family: var(--font-style-1) !important;
  font-size: 14px;
  color: var(--color_text);
  font-weight: 600;
}
.header-content-icon:hover .btn-bag {
  color: var(--hover_text);
  transition: all 0.25s ease;
}
.header-content-icon {
  @apply flex cursor-pointer flex-row items-center justify-center;
}
.header-content-cart {
  @apply relative ml-20 box-border flex h-36 w-36 cursor-pointer items-center justify-center pb-4;
}
.icon-shop {
  fill: var(--color_icon);
  transition: all 0.25s ease;
}
.header-content-icon:hover .icon-shop {
  fill: var(--hover_text);
  transition: all 0.25s ease;
}
.border-num-items {
  @apply flex w-auto items-center justify-center text-center;
  /* background: var(--color_background_btn); */
}
.border-num-items-up {
  @apply flex w-auto items-center justify-center text-center;
  /* background: var(--color_background_btn); */
}
.num-items {
  /* font-family: 'Poppins', Helvetica, Arial, sans-serif !important; */
  font-family: var(--font-style-1) !important;
  color: var(--color_text);
  font-size: 14px;
  line-height: 12px;
  font-weight: 600;
  /* text-transform: capitalize; */
  letter-spacing: 0px;
  padding-left: 10px;
  padding-right: 15px;
  border-left: 1px solid var(--color_border);
  /* border-left-color: var(--color_border); */
}
.num-items-up {
  font-family: var(--font-style-1) !important;
  /* font-family: 'Poppins', Helvetica, Arial, sans-serif !important; */
  color: var(--color_text);
  font-size: 10px;
  font-weight: 400;
  letter-spacing: 0px;
  margin-left: -5px;
  margin-top: -30px;
}
.header-content-icon:hover .num-items {
  color: var(--hover_text);
  transition: all 0.25s ease;
}
/* ***** */
@screen sm {
  .header {
    @apply w-full px-16;
  }
  .header-content-buttons {
    @apply hidden;
  }
  .header-content-cart {
    @apply ml-0 pb-0;
  }
  .header-text-menu {
    @apply hidden;
  }
  .search-header {
    @apply hidden;
  }
  .header-item-menu {
    @apply flex flex-1 flex-row items-center justify-start;
  }
  .search-header-left {
    @apply ml-16 flex;
  }
  .txt-bag,
  .border-num-items {
    @apply hidden;
  }
}
@screen md {
  .header-text-menu {
    @apply flex pl-8 text-xs font-semibold uppercase tracking-widest;
  }
}
@media (min-width: 640px) {
  .border-num-items-up {
    @apply hidden;
  }
  .txt-bag,
  .border-num-items {
    @apply flex;
  }
  .search-header-left {
    @apply ml-32;
  }
}
@screen lg {
  .header {
    @apply w-full;
  }
  .search-header-left {
    @apply hidden;
  }
  .search-header {
    @apply flex;
  }
  .header-content-buttons {
    @apply flex flex-1 items-center justify-start;
  }
  .header-item-menu {
    @apply hidden;
  }
}
@media (max-width: 768px) {
  .search {
    display: none;
  }
  .header-logo {
    max-width: 230px;
  }
}
</style>
