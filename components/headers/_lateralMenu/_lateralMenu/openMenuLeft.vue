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
        <div class="close-container" @click="closed">
          <div class="leftright"></div>
          <div class="rightleft"></div>
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
            {{ $t('header_inicio') }}
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
                    {{ category.nombreCategoriaProducto }}
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
                      <p class="txt-sub-li">
                        {{ subcategory.nombreSubcategoria }}
                      </p>
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
                  itemsTags.tagProperties.length > 0 &&
                  itemsTags.visible === 1
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
  name: 'KoMenuLeftGeneral',
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
      fallbackImage: '',
      selectTag: 1,
      focusBtn: false,
      categorySelect: '',
      subCategorySelect: '',
      tagSelect: '',
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
        category: null,
        subcategory: null,
        tag: null,
      },
    }
  },
  computed: {
    ...mapState(['stateListBLogs', 'dataHoko', 'categorias']),
    ...mapState({
      showModal: (state) => state.modalpolitics05,
      openMenuLeft: (state) => state.openMenuLateralLeft,
      subcategories: (state) => state.subcategorias,
    }),
    allTags() {
      return this.dataStore.tags
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
    dataHoko() {
      this.setHoko()
    },
  },
  mounted() {
    this.setHoko()
  },
  methods: {
    setHoko() {
      if (this.dataHoko && this.dataHoko.statehoko == 1) {
        this.secciones[2].state = true
      } else {
        this.secciones[2].state = false
      }
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
      if (type === 'category') {
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
    async setInformationFromQuery({ page, category, subcategory, tag }) {
      const query = {}

      if (page !== null && page !== undefined) query.page = page
      if (category !== null) query.category = category
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
        category: null,
        subcategory: null,
        tag: null,
      }
      this.categorySelect = ''
      this.subCategorySelect = ''
      this.$router.push({ path: '/productos', query: '' })
      this.$store.commit('products/SET_CATEGORY_PRODUCTO', null)
      this.$store.commit('products/SET_SUBCATEGORY_PRODUCTO', null)
      this.$store.commit('products/SET_TAG_PRODUCT', null)
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
  height: 80px;
  max-height: 80px;
  @apply relative flex flex-row items-center justify-between px-10;
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
.wrapper-category-all {
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-x: auto;
}
.text-categoria {
  width: 100%;
  font-size: 16px;
  font-weight: bold;
  color: #2c2930;
}
.text-subcategoria {
  margin-left: 3px;
  margin-bottom: 5px;
  width: 100%;
  font-size: 15px;
  color: #2c2930;
}
.text-categoria-active {
  color: #2c2930;
}
.text-subcategoria-active {
  color: #2c2930;
}
.close-container {
  right: 30px;
  max-width: 50px;
  @apply absolute flex h-50 cursor-pointer items-center justify-center;
}
.leftright {
  @apply absolute h-4 w-30 -rotate-45 transform rounded-2 transition-all duration-200 ease-in;
}
.rightleft {
  @apply absolute h-4 w-30 rotate-45 transform rounded-2 transition-all duration-200 ease-in;
}
.close-container:hover .leftright {
  @apply rotate-0 transform bg-black;
}
.close-container:hover .rightleft {
  @apply rotate-0 transform bg-black;
}
.leftright,
.rightleft {
  background-color: #2c2930;
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
  color: #2c2930;
  text-align: center;
  letter-spacing: 0px;
  font-weight: 600;
  /* text-transform: capitalize; */
  font-size: 14px;
  cursor: pointer;
  font-family: 'Poppins', Helvetica, Arial, sans-serif !important;
  transition:
    background-color 0.25s ease,
    color 0.25s ease;
  border-bottom: 3px solid #2c2930;
}
.btn-lateral-menu-right {
  padding: 18px 15px;
  max-width: 50%;
  width: 50%;
  color: #2c2930;
  text-align: center;
  letter-spacing: 0px;
  font-weight: 600;
  /* text-transform: capitalize; */
  font-size: 14px;
  cursor: pointer;
  font-family: 'Poppins', Helvetica, Arial, sans-serif !important;
  transition:
    background-color 0.25s ease,
    color 0.25s ease;
  border-bottom: 3px solid #2c2930;
}
.show-select-active {
  background-color: #2c2930;
  color: #fff;
}
.conten-Menu,
.content-Categorys {
  margin-top: 20px;
  @apply flex w-full flex-col items-center justify-start;
}
.content-Categorys {
  max-height: 670px;
  overflow-y: scroll;
}
.collapse-category {
  @apply w-full;
}
.header-content-buttons {
  @apply grid w-full grid-cols-1 items-center justify-start;
}
.btn {
  @apply flex w-full px-20 py-3 font-semibold tracking-wider;
  font-family: 'Poppins', Helvetica, Arial, sans-serif !important;
  color: #333;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0px;
  text-align: start;
  border-bottom: 1px solid #e7e7e7;
}
.btn:hover {
  border-bottom: 1px solid #000;
}
.btn-category {
  @apply flex w-full px-20  py-3 font-semibold tracking-wider;
  color: #333;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0px;
  font-family: 'Poppins', Helvetica, Arial, sans-serif !important;
}
.btn-category-all {
  @apply flex w-full px-20  py-3 font-semibold tracking-wider;
  color: #333;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0px;
  font-family: 'Poppins', Helvetica, Arial, sans-serif !important;
}
.txt-sub-li {
  font-size: 14px;
  font-family: 'Poppins', Helvetica, Arial, sans-serif !important;
  font-weight: 400;
  color: #000;
}

@media (min-width: 1280px) {
  .order {
    @apply hidden;
  }
}
</style>
