<template>
  <!-- v-if="settingByTemplate16" -->
  <!-- :style="[
      settingByTemplate16[0].header,
      settingByTemplate16[0].settingGeneral,
      {
        '--font-style-1':
          settingByTemplate16[0]?.settingGeneral?.font ?? 'Poppins',
      },
    ]" -->
  <header
    id="navbar"
    class="sticky top-0 z-100 flex w-full items-center justify-center bg-transparent px-10"
    :style="[
      {
        '--font-style-1': 'Poppins',
      },
    ]"
  >
    <!-- <KoSearch :data-store="dataStore" />
    <KoMenu
      :data-store="dataStore"
      :setting-by-template="settingByTemplate16[0]?.listProductsFilter"
      :page-template="settingByTemplate16[0]?.pages"
    /> -->
    <div class="flex w-full max-w-5xl items-center justify-center bg-red-400">
      <p class="py-5 text-base text-white-white">
        Envíos gratis a todo el país
      </p>
    </div>
  </header>
</template>

<script>
export default {
  name: 'KoHeader13',
  components: {
    // KoMenu: () => import('../_lateralMenu/_lateralMenu14/openMenuLeft.vue'),
    // KoSearch: () => import('../_lateralMenu/_lateralMenu/search.vue'),
  },
  props: {
    // settingByTemplate17: {
    //   type: Array,
    //   required: true,
    // },
    dataStore: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showSearch: true,
      btnSelect: '',
    }
  },
  computed: {
    productsCart() {
      return this.$store.state.productsCart.length
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
  },
}
</script>

<style scoped>
* {
  font-family: var(--font-style-1) !important;
}
</style>
