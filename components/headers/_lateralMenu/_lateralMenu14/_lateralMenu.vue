<template>
  <el-drawer
    :visible.sync="openMenuLeft"
    :before-close="closed"
    direction="rtl"
    size="370px"
    :with-header="false"
    :modal-append-to-body="false"
  >
    <div
      class="content-left my-20 flex w-full flex-col items-start justify-between px-15"
      :style="[settingByTemplate]"
    >
      <div class="flex w-full items-center justify-between pb-10">
        <p
          class="w-auto cursor-pointer text-16 font-semibold uppercase text-gray-800"
          @click="clearFilters"
        >
          {{ $t('header_buscar_limpiar') }}
        </p>
        <button @click="closed">
          <close-icon class="text-25 text-gray-800" />
        </button>
      </div>
      <el-collapse v-model="activeNames">
        <el-collapse-item :title="$t('header_buscar_producto')" name="1">
          <input
            v-model="query.name"
            class="input-slide"
            type="search"
            :placeholder="$t('header_buscar_producto')"
            @change="setToQueryFilter('search')"
            @keyup.enter="setToQueryFilter('search')"
          />
        </el-collapse-item>
        <el-collapse-item
          v-if="categorias?.length > 0"
          :title="$t('productdetail_categoria')"
          name="2"
        >
          <div
            class="grid w-full grid-cols-1 items-center justify-start gap-4 transition-all duration-0.2 ease-in"
          >
            <div v-for="(category, index) in categorias" :key="index">
              <div @click="setToQueryFilter('category', category)">
                <p
                  class="txt-categorys"
                  :class="
                    category.id == categorySelect ? 'text-categoria-active' : ''
                  "
                >
                  {{ category.nombreCategoriaProducto }}
                </p>
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item
          v-if="selectedSubcategories?.length"
          :title="$t('home_subcategory')"
          name="3"
        >
          <div
            class="grid w-full grid-cols-1 items-center justify-start gap-4 transition-all duration-0.2 ease-in"
          >
            <div
              v-for="(subcategory, index) in selectedSubcategories"
              :key="index"
            >
              <div @click="setToQueryFilter('subcategories', subcategory)">
                <p
                  class="txt-categorys"
                  :class="
                    subcategory.id == subCategorySelect
                      ? 'text-subcategoria-active'
                      : ''
                  "
                >
                  {{ subcategory.nombreSubcategoria }}
                </p>
              </div>
            </div>
          </div>
        </el-collapse-item>
        <div
          v-for="(itemsTags, index) in allTags"
          v-show="allTags?.length > 0"
          :key="index"
        >
          <el-collapse-item
            v-if="
              itemsTags &&
              itemsTags.status === 1 &&
              itemsTags.tagProperties.length > 0
            "
            :title="itemsTags.name"
            :name="6 + index"
          >
            <div
              class="grid w-full grid-cols-1 items-center justify-start gap-4"
            >
              <button
                v-for="itemsProperties in itemsTags.tagProperties"
                v-show="itemsProperties.status === 1"
                :key="itemsProperties.id"
                class="txt-Filter"
                :class="
                  itemsProperties.name == tagSelect
                    ? 'text-subcategoria-active'
                    : ''
                "
                @click="setToQueryFilter('tag', itemsProperties)"
              >
                {{ itemsProperties.name }}
              </button>
            </div>
          </el-collapse-item>
        </div>
      </el-collapse>
    </div>
  </el-drawer>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'KoMenuLeft1456',
  props: {
    dataStore: {
      type: Object,
      required: true,
    },
    settingByTemplate: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      categorySelect: '',
      subCategorySelect: '',
      tagSelect: '',
      selectedSubcategories: [],
      activeNames: ['1', '2', '3', '4', '5'],
      query: {
        page: 1,
        name: null,
        category: null,
        subcategory: null,
        tag: null,
      },
    }
  },
  computed: {
    ...mapState(['categorias']),
    ...mapState({
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
  },
  methods: {
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
        this.selectedSubcategories = this.subcategories.filter(
          (item) => item.categoria === value.id,
        )
        this.$store.commit(
          'products/SET_CATEGORY_PRODUCTO',
          value.nombreCategoriaProducto,
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
          this.query.category,
        )
        this.$store.commit(
          'products/SET_SUBCATEGORY_PRODUCTO',
          value.nombreSubcategoria || null,
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
      this.$store.commit('SET_OPEN_ORDER_MENU_LEFT', false)
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
  },
}
</script>

<style scoped>
.content-left >>> .el-collapse {
  background: var(--background_color_1);
  border-top: 1px solid var(--color_icon);
  border-bottom: 1px solid var(--color_icon);
  width: 100%;
}
.content-left >>> .el-collapse-item__wrap {
  will-change: height;
  background-color: transparent;
  border-bottom: 1px solid var(--color_icon);
}
.content-left >>> .el-collapse-item__header {
  font-size: 15px;
  color: var(--color_subCategories);
  background-color: transparent;
  border-bottom: 1px solid var(--color_icon);
  @apply font-semibold;
}
.content-left >>> .el-collapse-item__header.is-active {
  border-bottom: none;
}
.content-left >>> .el-collapse-item__arrow {
  color: var(--color_icon);
}

.txt-Filter {
  color: var(--color_categories);
  font-size: 15px;
  line-height: 1.3;
  @apply flex w-full cursor-pointer flex-row items-center justify-start pr-1 font-normal transition-all duration-0.2 ease-in;
}
.txt-Filter:hover {
  color: #eb7025;
}
.txt-categorys {
  color: var(--color_categories);
  font-size: 15px;
  line-height: 1.3;
  @apply flex w-full cursor-pointer flex-row items-center justify-start pr-1 font-normal transition-all duration-0.2 ease-in;
}
.txt-categorys:hover {
  color: #eb7025;
}
.input-slide {
  font-size: 15px;
  color: var(--color_categories);
  background: transparent;
  @apply h-30 w-full cursor-pointer border-none;
}
</style>
