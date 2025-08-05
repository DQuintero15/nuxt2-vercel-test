<template>
  <header
    class="header-container"
    :style="[
      settingByTemplate,
      {
        '--font-style-1': settingByTemplate?.tipo_letra ?? 'Roboto',
      },
    ]"
  >
    <KoSearch />
    <KoMenu
      :logo-store="logoStore"
      :data-store="dataStore"
      class="responsive"
    />
    <div class="wrapper-header" @click="closeMenuCategory">
      <div class="header">
        <!-- <KoOrder :data-store="dataStore" /> -->
        <div class="header-content-logo">
          <nuxt-link to="/" class="wrapper-logo">
            <img
              loading="lazy"
              width="120"
              :src="imageUrl"
              class="header-logo"
              alt="Logo Img"
              @click="clearFilters"
              @error="setDefaultImage"
            />
          </nuxt-link>
        </div>
        <div class="header-content-items">
          <div
            v-for="(item, index) in secciones"
            :key="`${index}${item.name}`"
            class="header-buttons"
          >
            <div @click="openMenu(item.name)">
              <nuxt-link
                v-if="item.path && item.state"
                :to="item.path"
                class="header-text-center"
                :class="btnSelect == item.path ? 'btn-active' : ''"
                @click="btnActivate(item.path)"
              >
                {{ $t(`${item.name}`) }}
              </nuxt-link>
              <nuxt-link
                v-else-if="item.href && stateListBLogs && item.state"
                :to="item.href"
                class="header-text-center"
                :class="btnSelect == item.path ? 'btn-active' : ''"
                @click="btnActivate(item.path)"
              >
                {{ $t(`${item.name}`) }}
              </nuxt-link>
              <div v-else>
                <div
                  v-if="categorias.length > 0 && item.ref"
                  style="margin-right: 20px; display: flex; flex-direction: row"
                >
                  <p class="header-text-center-icon">
                    {{ $t(`${item.name}`) }}
                  </p>
                  <div
                    :is="item.iconOpen"
                    v-if="!showMenu"
                    class="header-text-center-icon"
                  />
                  <div
                    :is="item.iconClose"
                    v-if="showMenu"
                    class="header-text-center-icon"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="search">
          <div id="demo-2" class="relative">
            <search-icon class="icon-s" @click="focusInput" />
            <input
              id="SearchHeader"
              v-model="query.name"
              type="search"
              :placeholder="$t('header_search')"
              @change="setToQueryFilter('search')"
              @keyup.enter="setToQueryFilter('search')"
            />
          </div>
        </div>
        <div class="search_res">
          <div id="OpenCartTag" class="header-content-cart" @click="openSearch">
            <search-icon class="header-icon-cart" />
          </div>
        </div>
        <div class="header-content-icon">
          <div id="OpenCartTag" class="header-content-cart" @click="openOrder">
            <cart-icon class="header-icon-cart" />
            <span class="num-items">{{ productsCart }}</span>
          </div>
        </div>
        <div class="header-item-menu" @click="openMenuLateral">
          <menu-icon class="header-icon-menu nav-bar" />
        </div>
      </div>
    </div>
    <div class="menu-container" :class="showMenu ? 'animated' : 'hidden'">
      <div id="menu-collapse">
        <div class="wrapper-meni-grid">
          <li @click="clearFilters">
            <p class="name-category-all">
              {{ $t('header_allProduct') }}
            </p>
          </li>
          <div class="menu-grid">
            <div v-for="category in categorias" :key="category.id">
              <ul
                class="name-category"
                :class="
                  category.nombreCategoriaProducto == query.category
                    ? 'name-category-active'
                    : ''
                "
              >
                <li @click="setToQueryFilter('category', category)">
                  <p>
                    {{ category.nombreCategoriaProducto }}
                  </p>
                </li>
                <ul class="subcategoria">
                  <div v-for="(subcategory, key) in subcategories" :key="key">
                    <li
                      v-if="subcategory.categoria == category.id"
                      class="text-subcategoria"
                      :class="
                        subcategory.id == query.subcategory
                          ? 'text-subcategoria-active'
                          : ''
                      "
                      @click="setToQueryFilter('subcategories', subcategory)"
                    >
                      {{ subcategory.nombreSubcategoria }}
                    </li>
                  </div>
                </ul>
              </ul>
            </div>
          </div>
        </div>
        <div v-if="product.length" class="product-img-container">
          <div class="card-container">
            <div v-if="product[0]" class="img-logo">
              <img
                v-lazy="idCloudinary(product[0].foto_cloudinary, 400, 400)"
                class="logo"
                alt="Product img"
              />
            </div>
            <div class="btn-container">
              <button class="btn" @click="closeMenu">Comprar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'
import idCloudinary from '@/mixins/idCloudinary'
export default {
  name: 'KoHeader1',
  components: {
    // KoOrder: () => import('../_order1/order1'),
    KoMenu: () => import('../_lateralMenu/_lateralMenu/openMenuRight'),
    KoSearch: () => import('./search.vue'),
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
      btnSelect: '',
      direction: 'rtl',
      showMenu: false,
      product: [],
      selectedSubcategories: [],
      idCategory: '',
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
      secciones: [
        {
          name: 'header_inicio',
          path: '/',
          state: true,
        },
        {
          name: 'header_categorias',
          iconOpen: 'Flechadown-icon',
          iconClose: 'FlechaUp-icon',
          ref: 'categorias',
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
      query: {
        page: 1,
        name: null,
        category: null,
        subcategory: null,
        tag: null,
      },
      fallbackImage: '',
    }
  },
  computed: {
    ...mapState(['stateListBLogs', 'dataHoko', 'categorias']),
    ...mapState({
      facebookPixel: (state) => state.analytics_tagmanager,
      productsCart: (state) => state.productsCart.length,
      subcategories: (state) => state.subcategorias,
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
    'dataStore.redes'() {
      this.updateSocialLinks()
    },
    $route() {
      this.setMenu()
    },
  },
  mounted() {
    this.setMenu()
    this.getProducts()
    this.setHoko()
    this.getInformationFromQuery()
  },
  methods: {
    setHoko() {
      this.secciones[2].state = this.dataHoko && this.dataHoko.statehoko === 1
    },
    openSearch() {
      this.$store.commit('SET_OPEN_SEARCH', true)
    },
    openOrder() {
      this.$gtm.push({
        event: 'OpenCart',
        action: 'click',
      })
      this.showMenu = false
      this.$store.commit('SET_OPEN_ORDER', true)
    },
    openMenuLateral() {
      this.showMenu = false
      this.$store.state.openMenuLateralRight = true
    },
    openMenu(name) {
      var intro = document.getElementById('menu-collapse')
      if (name == 'header_categorias') {
        this.showMenu = !this.showMenu
      }
      if (!this.showMenu) {
        intro.style.display = 'none'
      } else {
        intro.style.display = 'flex'
      }
      if (name == 'header_inicio') {
        this.clearFilters()
      }
      if (name == 'header_contacto') {
        this.showMenu = false
      }
    },
    closeMenuCategory() {
      var intro = document.getElementById('menu-collapse')
      const element = event.target.className
      if (
        element === 'wrapper-header' ||
        element === 'header' ||
        element === 'header-content-items' ||
        element === 'header-content-logo' ||
        element === 'header-logo'
      ) {
        this.showMenu = false
      }
      if (!this.showMenu) {
        intro.style.display = 'none'
      } else {
        intro.style.display = 'flex'
      }
    },
    closeMenu() {
      this.showMenu = false
      this.$router.push({
        path: '/productos/' + this.product[0].slug,
      })
    },
    focusInput() {
      document.getElementById('SearchHeader').focus()
    },
    async getProducts() {
      const { success, data } = await this.$store.dispatch(
        'products/GET_ALL_PRODUCTS',
        {
          id_tienda: this.dataStore.id,
          page: 1,
          limit: 1,
        }
      )
      if (success) {
        this.product = data.publicProductList
      } else {
        this.product = []
      }
    },
    setToQueryFilter(type, value) {
      if (type === 'search') {
        this.query.name = this.query.name || null
        this.getSearch(this.query.name)
      } else if (type === 'category') {
        this.sendAnalyticsStore(value.id)
        this.query.subcategory = null
        this.subCategorySelect = null
        this.query.tag = null
        this.query.category = value.nombreCategoriaProducto || null
        this.categorySelect = value.id
        this.$store.commit(
          'products/SET_CATEGORY_PRODUCTO',
          value.nombreCategoriaProducto
        )
        this.$store.commit('products/SET_SUBCATEGORY_PRODUCTO', null)
      } else if (type === 'subcategories') {
        this.categorias.filter((item) => {
          if (item.id === value.categoria) {
            this.query.category = item.nombreCategoriaProducto
          }
        })
        this.$store.commit(
          'products/SET_CATEGORY_PRODUCTO',
          this.query.category
        )
        this.$store.commit(
          'products/SET_SUBCATEGORY_PRODUCTO',
          value.nombreSubcategoria || null
        )
        this.query.subcategory = value.id || null
        this.subCategorySelect = value.id
        
      } else {
        this.query.tag = value.id || null
        this.$store.commit('products/SET_TAG_PRODUCT', value.name || null)
      }

      this.$store.commit('SET_STATE_BANNER', false)
      this.setInformationFromQuery(this.query)
      this.showMenu = false
    },
    async setInformationFromQuery({ page, name, category, subcategory, tag }) {
      const query = {}

      if (page !== null && page !== undefined) query.page = page
      if (category !== null) query.category = category
      if (name !== null) query.name = name
      if (subcategory !== null) query.subcategory = subcategory
      if (tag !== null) query.tag = tag

      try {
        await this.$router.push({ path: '/', query })
      } catch (error) {
        console.error('Error navigating:', error)
      }
    },
    async getInformationFromQuery() {
      const query = this.$route.query

      this.query.name = query.name || null
      this.query.category = query.category || null
      this.query.subcategory = query.subcategory || null

      if (this.query.category || this.query.subcategory || this.query.name) {
        this.setData(this.query)
      }
    },
    setData(value) {
      if (value.category) {
        this.categorias.filter((item) => {
          if (item.nombreCategoriaProducto === value.category) {
            this.categorySelect = item.id
            this.idCategory = item.id
          }
        })
        this.selectedSubcategories = this.subcategories.filter(
          (item) => item.categoria === this.idCategory
        )
      }

      this.subCategorySelect = value.subcategory ?? ''

      this.$store.commit('SET_STATE_BANNER', false)
    },
    clearFilters() {
      this.query = {
        page: 1,
        name: null,
        category: null,
        subcategory: null,
        tag: null,
      }
      this.categorySelect = ''
      this.subCategorySelect = ''
      this.$store.commit('SET_STATE_BANNER', true)
      this.$store.commit('products/SET_CATEGORY_PRODUCTO', null)
      this.$store.commit('products/SET_SUBCATEGORY_PRODUCTO', null)
      this.$store.commit('products/SET_TAG_PRODUCT', null)
      this.$router.push({ path: '', query: '' })
      this.showMenu = false
    },
    getSearch(value) {
      if (value) {
        if (this.facebookPixel?.pixel_facebook != null) {
          window.fbq('track', 'Search', { search_string: value })
        }
      }
    },
    updateSocialLinks() {
      this.links.forEach((link, index) => {
        this.links[index].link = this.dataStore.redes[link.nombre.toLowerCase()]
      })
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
    async sendAnalyticsStore(value) {
      console.log('yes', value)
      await this.$store.dispatch('SEND_ANALYTICS_STORE', {
        storeId: this.dataStore.id,
        event: 'CLICKED_CATEGORY',
        categoryId: value,
      })
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
.header-container {
  width: 100%;
  height: 88px;
  overflow: hidden;
  background: var(--background_color_1);
}
.menu-container {
  width: 100%;
  background: var(--background_color_2);
  top: 88px;
  display: flex;
  transition: all ease 0.6s;
  position: fixed;
  height: auto;
  z-index: 4;
}
.hidden {
  display: none;
}
.animated {
  opacity: 1;
}
.wrapper-header {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: var(--background_color_1);
  flex-direction: column;
  transition: all ease 1s;
  position: fixed;
  top: 0px;
  z-index: 4;
}
.header {
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  max-width: 1300px;
  padding: 10px 30px 0;
}
#menu-collapse {
  display: none;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  max-width: 1300px;
  padding: 10px 30px 10px 20px;
  border-top: 1px solid #aba4a466;
  margin: 0 auto;
  list-style: none;
}
.wrapper-meni-grid {
  flex: 2;
  width: 100%;
  max-width: 1000px;
  max-height: 560px;
  overflow-y: auto;
}
.wrapper-meni-grid::-webkit-scrollbar {
  border: 1px solid rgba(202, 202, 202, 0.322);
  background: transparent;
  width: 6px;
}
.wrapper-meni-grid::-webkit-scrollbar-track {
  border-radius: 10px;
}
.wrapper-meni-grid::-webkit-scrollbar-thumb {
  background: rgb(44, 44, 44);
}
.wrapper-meni-grid::-webkit-scrollbar-thumb:hover {
  background: rgb(102, 102, 102);
  border-radius: 10px;
}
.menu-grid {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: stretch;
  align-content: stretch;
}
.name-category-all {
  font-size: 16px;
  font-weight: bold;
  color: var(--color_text);
  cursor: pointer;
  padding: 10px 0px;
}
.name-category-all-active {
  font-size: 16px;
  font-weight: bold;
  color: red;
  cursor: pointer;
  padding: 10px 0px;
}
.name-category-all:hover {
  color: var(--btnhover);
}
.name-category {
  color: var(--color_text);
  cursor: pointer;
  margin-right: 32px;
  list-style: none;
}
.name-category-active {
  color: red;
  cursor: pointer;
}
.name-category li {
  font-weight: bold;
  padding: 10px 0px;
  font-size: 16px;
}
.name-category li:hover {
  color: var(--color_hover_text);
}
.subcategoria li {
  padding: 0px;
  margin-bottom: 8px;
  margin-left: 7px;
  font-size: 14px;
  font-weight: 300;
  list-style: none;
}
.text-subcategoria {
  color: var(--color_subtext);
}
.text-subcategoria-active {
  color: red;
}
.text-subcategoria:hover {
  color: var(--color_hover_text);
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
  /* width: 100%; */
  max-height: 74px;
  object-fit: contain;
  object-position: left;
}
.header-content-items {
  display: flex;
  flex: 1;
  margin-left: 10px;
  align-self: center;
  justify-content: flex-end;
  position: relative;
  top: 3px;
}
.header-buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.header-text-center {
  font-size: 16px;
  font-weight: normal;
  color: var(--color_text);
  margin-right: 20px;
  cursor: pointer;
}
.header-text-center:hover,
.btn-active {
  color: var(--color_hover_text);
}
.header-text-center-icon {
  font-size: 16px;
  font-weight: normal;
  color: var(--color_text);
  cursor: pointer;
  bottom: 2px;
}
.header-text-center-icon:hover {
  color: var(--color_hover_text);
}
.header-content-icon {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.header-items-icons {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-self: center;
}
.header-icon {
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: var(--color_icon);
  margin-left: 7px;
  cursor: pointer;
}
.header-icon:hover {
  color: var(--color_hover_text);
}
.header-content-cart {
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 35px;
  height: 35px;
  border: var(--color_icon) 2px solid;
  border-radius: 50%;
  padding-bottom: 3px;
  margin-left: 20px;
  position: relative;
  cursor: pointer;
}
.num-items {
  font-size: 11px;
  position: absolute;
  right: -5px;
  top: -5px;
  color: var(--background_color_1);
  background-color: var(--color_icon);
  border: var(--color_icon) 1px;
  border-radius: 10px;
  line-height: 1;
  display: flex;
  padding: 3px;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}
.header-icon-cart {
  font-size: 20px;
  color: var(--color_icon);
}
.header-icon-cart:hover {
  color: var(--btnhover);
}
.header-item-menu {
  display: none;
}
.responsive {
  display: none;
}
.product-img-container {
  flex: 1;
  max-width: 250px;
}
.card-container {
  width: 100%;
  height: 265px;
  border-radius: 10px;
  box-shadow: 0 0 22px 3px #efeeeeb3;
  margin: 0 auto;
  position: relative;
}
.img-logo {
  height: 265px;
  max-width: 250px;
  width: 100%;
  position: relative;
}
.logo {
  height: 100%;
  border-radius: 10px;
  max-width: 250px;
  width: 100%;
  object-fit: cover;
}
.btn-container {
  position: absolute;
  bottom: 12px;
  width: 100%;
  display: flex;
  justify-content: center;
}
.btn {
  color: var(--color_text_btn);
  border-radius: var(--radius_btn);
  border: solid 1px var(--color_background_btn);
  background-color: var(--color_background_btn);
  color: white;
  padding: 8px 14px;
  font-size: 14px;
  width: 120px;
  height: 40px;
  font-weight: bold;
  cursor: pointer;
  transition: all 200ms ease-in;
  text-decoration: none;
  text-align: center;
}
.btn:hover {
  color: white;
  background-color: var(--btnhover);
  border: solid 1px var(--btnhover);
}
.card-container:hover,
.content-products:focus {
  box-shadow: 0px 0px 2px 1px var(--color_border);
}
.icon-s {
  font-size: 25px;
  color: var(--color_icon);
  position: absolute;
  top: 3px;
  left: 5px;
  cursor: pointer;
}
.icon-s:hover {
  color: var(--btnhover);
}
input[type='search']:focus {
  background: transparent;
  border: var(--color_icon) 2px solid;
}
input:-moz-placeholder {
  color: var(--color_text);
}
input::-webkit-input-placeholder {
  color: var(--color_text);
}
#demo-2 input[type='search'] {
  width: 35px;
  height: 35px;
  padding-left: 10px;
  color: transparent;
  cursor: pointer;
  box-sizing: border-box;
  background: transparent;
  border: var(--color_icon) 2px solid;
  border-radius: 50px;
  transition: all 200ms ease-in;
}
#demo-2 input[type='search']:hover {
  background: transparent;
}
#demo-2 input[type='search']:focus {
  width: 160px;
  padding-left: 32px;
  color: var(--color_text);
  background: transparent;
  cursor: auto;
}
#demo-2 input:-moz-placeholder {
  color: transparent;
}
#demo-2 input::-webkit-input-placeholder {
  color: transparent;
}
.search_res {
  display: none;
}
@media (max-width: 1024px) {
  .wrapper-meni-grid {
    max-height: 540px;
  }
}
@media (max-height: 700px) {
  .wrapper-meni-grid {
    max-height: 500px;
  }
}
@media (max-height: 580px) {
  .wrapper-meni-grid {
    max-height: 480px;
  }
}

@media (max-width: 900px) {
  .header {
    padding: 10px 20px 0;
  }
  .product-img-container {
    display: none;
  }
}
@media (max-width: 700px) {
  .header-buttons {
    display: none;
  }
  .header-items-icons {
    display: none;
  }
  .header-item-menu {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    margin-left: 20px;
  }
  .header-icon-menu {
    font-size: 30px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: var(--color_text);
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
    color: var(--color_text);
  }
  .nav-bar > .material-design-icon__svg {
    bottom: 0px;
    width: 24px;
    height: 24px;
  }
  .responsive {
    display: initial;
  }
  .menu-container {
    display: none;
  }
}
@media (max-width: 500px) {
  .search {
    display: none;
  }
  .search_res {
    display: flex;
  }
  .header {
    padding: 10px 15px 0;
  }
  .header-logo {
    max-width: 180px;
  }
}
</style>
