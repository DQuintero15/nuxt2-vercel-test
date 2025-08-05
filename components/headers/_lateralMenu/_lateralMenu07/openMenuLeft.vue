<template>
  <el-drawer
    :visible.sync="openMenuLeft"
    :before-close="closed"
    direction="ltr"
    :with-header="false"
    :modal-append-to-body="false"
    class="width-drawer"
    size="370px"
  >
    <div class="order_content">
      <div class="order_header">
        <div class="empty"></div>
        <div class="header-content-logo">
          <nuxt-link id="tamaño-img" to="/" class="wrapper-logo">
            <img
              loading="lazy"
              :src="imageUrl"
              class="header-logo"
              alt="Logo Img"
              @error="setDefaultImage"
            />
          </nuxt-link>
        </div>
        <div class="close-container" @click="closed">
          <div class="leftright"></div>
          <div class="rightleft"></div>
        </div>
      </div>
      <div class="search-content">
        <div class="search-input-content">
          <input
            v-model="query.name"
            type="text"
            :placeholder="$t('header_buscar_producto')"
            class="input-search"
            @change="setToQueryFilter('search')"
            @keyup.enter="setToQueryFilter('search')"
          />
        </div>
        <div
          class="search-icon-content"
          @click="setToQueryFilter('search', search)"
        >
          <svg
            class="icon-search"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="{2}"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
      <div class="content-lateral-menu">
        <div class="content-btns-lateral-menu">
          <button
            id="btnfocus"
            class="btn-lateral-menu-left"
            :class="selectTag == 1 ? 'show-select-active' : ''"
            @click="selectTag1"
          >
            {{ $t('header_menu') }}
          </button>
          <button
            v-if="
              (categorias && categorias.length > 0) ||
              (allTags && allTags.length > 0)
            "
            class="btn-lateral-menu-right"
            :class="selectTag == 2 ? 'show-select-active' : ''"
            @click="selectTag2"
          >
            {{ $t('header_categorias') }}
          </button>
        </div>

        <div v-if="!focusBtn" class="conten-Menu">
          <div class="header-content-buttons">
            <div
              v-for="(item, index) in secciones"
              :key="`${index}${item.name}`"
              @click="closed"
            >
              <nuxt-link
                v-if="item.path && item.state"
                :to="item.path"
                class="btn"
              >
                {{ $t(`${item.name}`) }}
              </nuxt-link>
              <nuxt-link
                v-else-if="item.href && stateListBLogs && item.state"
                :to="item.href"
                class="btn"
              >
                {{ $t(`${item.name}`) }}
              </nuxt-link>
            </div>
          </div>
        </div>
        <div v-if="focusBtn" class="content-Categorys">
          <div class="wrapper-category-all">
            <li @click="clearFilters">
              <p class="btn-category-all">{{ $t('header_allProduct') }}</p>
            </li>
            <div v-for="category in categorias" :key="category.id">
              <BaseAccordion>
                <template v-slot:categorias>
                  <li
                    class="btn-category"
                    :class="
                      category.id == categorySelect
                        ? 'text-categoria-active'
                        : ''
                    "
                    @click="setToQueryFilter('category', category)"
                  >
                    <p>
                      {{ category.nombreCategoriaProducto }}
                    </p>
                  </li>
                </template>
                <template v-slot:subcategorias>
                  <div v-for="(subcategory, key) in subcategories" :key="key">
                    <li
                      v-if="subcategory.categoria == category.id"
                      class="btn-category"
                      :class="
                        subcategory.id == subCategorySelect
                          ? 'text-subcategoria-active'
                          : ''
                      "
                      @click="setToQueryFilter('subcategories', subcategory)"
                    >
                      {{ subcategory.nombreSubcategoria }}
                    </li>
                  </div>
                </template>
              </BaseAccordion>
            </div>
            <div
              v-for="(itemsTags, index) in allTags"
              v-show="allTags?.length > 0"
              :key="index"
            >
              <BaseAccordion
                v-if="
                  itemsTags &&
                  itemsTags.status === 1 &&
                  itemsTags.tagProperties.length > 0
                "
              >
                <template v-slot:categorias>
                  <li class="btn-category">
                    {{ itemsTags.name }}
                  </li>
                </template>
                <template v-slot:subcategorias>
                  <div
                    v-for="itemsProperties in itemsTags.tagProperties"
                    v-show="itemsProperties.status === 1"
                    :key="itemsProperties.id"
                  >
                    <li
                      class="btn-category"
                      :class="
                        itemsProperties.name == tagSelect
                          ? 'text-subcategoria-active'
                          : ''
                      "
                      @click="setToQueryFilter('tag', itemsProperties)"
                    >
                      <p class="txt-sub-li">
                        {{ itemsProperties.name }}
                      </p>
                    </li>
                  </div>
                </template>
              </BaseAccordion>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-drawer>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'KoMenuLeft7',
  components: {
    BaseAccordion: () => import('../_BaseAccordion.vue'),
  },
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
      selectTag: 1,
      search: '',
      categorySelect: '',
      subCategorySelect: '',
      tagSelect: '',
      focusBtn: false,
      secciones: [
        {
          name: 'header_inicio',
          path: '/',
          state: true,
          //icon: 'menu-icon',
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
          //icon: 'account-icon',
        },
        {
          name: 'header_blog',
          href: '/blog',
          state: true,
          //icon: 'account-icon',
        },
        {
          name: 'header_carrito',
          path: '/cart',
          state: true,
          //icon: 'cart-icon',
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
      showModal: (state) => state.modalpolitics05,
      openMenuLeft: (state) => state.openMenuLateralLeft,
      facebookPixel: (state) => state.analytics_tagmanager,
      subcategories: (state) => state.subcategorias,
    }),
    allTags() {
      return this.dataStore.tags
    },
    searchProduct: {
      get() {
        return this.$store.state.products.search_product
      },
      set(newValue) {
        this.$store.commit('products/SET_SEARCH_PRODUCT', newValue)
      },
    },
    imageUrl() {
      if (this.fallbackImage) {
        return this.fallbackImage
      }
      if (this.logoStore?.logoMigrated === 1) {
        return this.logoStore.logo
      } else {
        return `${this.$store.state.urlKomercia}/logos/${this.logoStore?.identifier}`
      }
    },
  },
  watch: {
    dataHoko() {
      this.setHoko()
    },
  },
  mounted() {
    this.setHoko()
  },
  methods: {
    setHoko() {
      this.secciones[2].state =
        this.dataHoko && this.dataHoko.statehoko === 1 ? true : false
    },
    selectTag1() {
      this.selectTag = 1
      this.focusBtn = false
    },
    selectTag2() {
      this.selectTag = 2
      this.focusBtn = true
    },
    closed() {
      this.$store.commit('SET_OPEN_ORDER_MENU_LEFT', false)
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
      }

      this.closed()
      this.setInformationFromQuery(this.query)
    },
    async setInformationFromQuery({ page, name, category, subcategory, tag }) {
      const query = {}

      if (page !== null && page !== undefined) query.page = page
      if (category !== null) query.category = category
      if (name !== null) query.name = name
      if (subcategory !== null) query.subcategory = subcategory
      if (tag !== null) query.tag = tag

      try {
        await this.$router.push({ path: '/productos', query })
      } catch (error) {
        console.error('Error navigating:', error)
      }
    },
    clearFilters() {
      this.query = {
        page: 1,
        name: null,
        category: null,
        subcategory: null,
        tag: null,
      }
      this.searchProduct = null
      this.categorySelect = ''
      this.subCategorySelect = ''
      this.$router.push({ path: '/productos', query: '' })
      this.$store.commit('products/SET_CATEGORY_PRODUCTO', null)
      this.$store.commit('products/SET_SUBCATEGORY_PRODUCTO', null)
      this.$store.commit('products/SET_TAG_PRODUCT', null)
    },
    getSearch(value) {
      if (value) {
        if (this.facebookPixel?.pixel_facebook != null) {
          window.fbq('track', 'Search', { search_string: value })
        }
      }
    },
    async sendAnalyticsStore(value) {
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
.order_content {
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: none;
  overflow: auto;
  box-sizing: border-box;
  padding-bottom: 10px;
  overflow: hidden;
}
.order_content > div {
  width: 100%;
  box-sizing: border-box;
  list-style: none;
}
.order_header {
  padding: 5px 0px;
  @apply grid grid-cols-3 gap-4;
  justify-content: start;
  align-items: center;
  border-bottom: 1px solid rgba(129, 129, 129, 0.2);
}
.header-content-logo {
  display: flex;
  justify-content: center;
  align-items: center;
}
.wrapper-logo {
  width: 100%;
}
.header-logo {
  max-height: 60px;
  object-fit: contain;
  object-position: left;
}
.order_header_close {
  font-size: 30px;
  color: var(--color_icon);
  transition: 0.3s;
  cursor: pointer;
}
.order_header_close:hover {
  color: gray;
}
.wrapper-category-all {
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-x: auto;
  /* padding: 10px 25px;
  margin-top: 10px; */
}
.name-category-all {
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 5px;
}
.text-categoria {
  width: 100%;
  font-size: 16px;
  font-weight: bold;
  color: var(--color_text);
}
.text-subcategoria-all {
  margin-left: 3px;
  margin-bottom: 5px;
  width: 100%;
  font-size: 15px;
  font-weight: bold;
  color: var(--color_text);
}
.text-subcategoria {
  margin-left: 3px;
  margin-bottom: 5px;
  width: 100%;
  font-size: 15px;
  color: var(--color_subtext);
}
.text-categoria-active {
  color: var(--color_hover_text);
}
.text-subcategoria-active {
  color: var(--color_hover_text);
}
.close-container {
  @apply relative flex h-40 cursor-pointer items-center justify-center;
}
.leftright {
  @apply absolute h-4 w-30 -rotate-45 transform rounded-2 transition-all duration-200 ease-in;
}
.rightleft {
  @apply absolute h-4 w-30 rotate-45 transform rounded-2 transition-all duration-200 ease-in;
}
.close-container:hover .leftright {
  @apply rotate-0 transform bg-red-btnhoverHeader;
}
.close-container:hover .rightleft {
  @apply rotate-0 transform bg-red-btnhoverHeader;
}
.leftright,
.rightleft {
  @apply bg-gray-textHeader;
}
.search-content {
  @apply flex w-full flex-row items-center py-14 shadow-xl;
}
.search-input-content {
  @apply w-full;
}
.input-search {
  @apply w-full px-10 py-2;
}
::-webkit-input-placeholder {
  font-family: 'Lora' !important;
  @apply text-gray-textHeader;
}
.search-icon-content {
  @apply h-auto w-auto cursor-pointer items-center justify-center px-12;
}
.icon-search {
  @apply h-24 w-24 text-gray-textHeader;
}
.content-lateral-menu {
  @apply flex w-full flex-col items-center justify-center;
}
.content-btns-lateral-menu {
  @apply flex w-full flex-row items-center justify-between;
}
.btn-lateral-menu-right:focus .conten-Menu {
  @apply hidden;
}
.btn-lateral-menu-left {
  padding: 18px 15px;
  max-width: 50%;
  width: 50%;
  color: #909090;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  font-weight: 900;
  font-size: 14px;
  cursor: pointer;
  font-family: 'Lora' !important;
  transition:
    background-color 0.25s ease,
    color 0.25s ease;
  border-bottom: 1px solid rgba(129, 129, 129, 0.2);
  border-right: 1px solid rgba(129, 129, 129, 0.2);
}
.btn-lateral-menu-right {
  padding: 18px 15px;
  max-width: 50%;
  width: 50%;
  color: #909090;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  font-weight: 900;
  font-size: 14px;
  cursor: pointer;
  font-family: 'Lora' !important;
  transition:
    background-color 0.25s ease,
    color 0.25s ease;
  border-bottom: 1px solid rgba(129, 129, 129, 0.2);
}
.show-select-active {
  background-color: rgba(0, 0, 0, 0.05);
  color: #333;
  border-bottom: 2px solid #ed2353;
}
/* .btn-lateral-menu-right:focus {
  background-color: rgba(0, 0, 0, 0.05);
  color: #333;
  border-bottom: 2px solid #ed2353;
} */
.conten-Menu,
.content-Categorys {
  @apply flex w-full flex-col items-center justify-start;
}
.content-Categorys {
  max-height: 670px;
  overflow-y: scroll;
}

@media (max-width: 768px) {
  .content-Categorys {
    max-height: calc(100vh - 250px);
  }
}
.collapse-category {
  @apply w-full;
}
.header-content-buttons {
  @apply grid w-full grid-cols-1 items-center justify-start;
}
.btn {
  @apply flex w-full py-15  pl-20 font-semibold uppercase tracking-wider;
  border-bottom: 1px solid rgba(129, 129, 129, 0.2);
  font-family: 'Lora' !important;
  color: #2d2a2a;
  font-size: 13px;
}
.btn-category {
  @apply flex w-full py-15 pl-20 font-semibold uppercase tracking-wider;
  color: #2d2a2a;
  font-size: 13px;
  font-family: 'Lora' !important;
}
.btn-category-all {
  @apply flex w-full py-15 pl-20 font-semibold uppercase tracking-wider;
  color: #2d2a2a;
  font-size: 13px;
  font-family: 'Lora' !important;
  border-bottom: 1px solid rgba(129, 129, 129, 0.2);
}
</style>
