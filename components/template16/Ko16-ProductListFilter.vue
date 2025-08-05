<template>
  <div
    v-if="settingByTemplate16"
    class="product-content"
    :style="[
      settingByTemplate16[0].settingsGeneral,
      settingByTemplate16[0].listProductsFilter,
      {
        '--font-style-1':
          settingByTemplate16[0]?.settingsGeneral?.fount ?? 'Poppins',
      },
    ]"
  >
    <div
      class="flex w-full flex-col items-center py-10"
      :style="`background-color: ${settingByTemplate16[0].listProductsFilter['--background_color_2']}`"
    >
      <div
        class="flex w-full max-w-[1300px] flex-row items-center justify-start sm:px-10 md:px-20"
        :style="`color: ${settingByTemplate16[0].listProductsFilter.color_breadCrumbs};`"
      >
        <nuxt-link
          to="/"
          class="text-14"
          :style="`color: ${settingByTemplate16[0].listProductsFilter.color_breadCrumbs}`"
        >
          {{ $t('header_inicio') }}
        </nuxt-link>
        <p
          class="px-10 text-14 font-bold"
          :style="`color: ${settingByTemplate16[0].listProductsFilter.color_breadCrumbs}`"
        >
          >
        </p>
        <button
          class="text-14 font-bold"
          :style="`color: ${settingByTemplate16[0].listProductsFilter.color_breadCrumbs2}`"
          @click="clearFilters"
        >
          {{ $t('header_productos') }}
        </button>
      </div>
    </div>
    <div class="container-product-max-w">
      <div class="content-shop-items">
        <div
          class="content-left"
          :style="`background-color: ${settingByTemplate16[0].listProductsFilter['--background_color_2']}`"
        >
          <button class="content-home" @click="clearFilters">
            <span class="txt-content-home">
              {{ $t('header_buscar_limpiar') }}
            </span>
          </button>
          <el-collapse v-model="activeNames">
            <el-collapse-item :title="$t('header_buscar_producto')" name="1">
              <input
                v-model="searchProduct"
                class="input-slide"
                type="search"
                :placeholder="$t('header_search')"
                @change="sendFilter"
                @keyup.enter="sendFilter"
              />
            </el-collapse-item>
            <el-collapse-item
              v-if="categorias.length > 0"
              :title="$t('productdetail_categoria')"
              name="2"
            >
              <div class="categorys-list">
                <div v-for="(category, index) in categorias" :key="index">
                  <div @click="sendCategory(category)">
                    <p
                      class="txt-categorys"
                      :class="
                        category.nombreCategoriaProducto == filters.category
                          ? 'txt-categorys-active'
                          : ''
                      "
                    >
                      {{ category.nombreCategoriaProducto }}
                    </p>
                  </div>
                </div>
              </div>
            </el-collapse-item>
            <el-collapse-item
              v-show="selectedSubcategories?.length"
              :title="$t('home_subcategory')"
              name="3"
            >
              <div class="subcategory-list">
                <div
                  v-for="(subcategory, index) in selectedSubcategories"
                  :key="index"
                >
                  <div @click="sendSubCategory(subcategory)">
                    <p
                      class="txt-categorys"
                      :class="
                        subcategory.id == filters.subcategory
                          ? 'txt-categorys-active'
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
              v-for="(itemsTags, index) in tags"
              v-show="tags?.length > 0"
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
                <div class="categorys-list">
                  <button
                    v-for="itemsProperties in itemsTags.tagProperties"
                    v-show="itemsProperties.status === 1"
                    :key="itemsProperties.id"
                    class="txt-Filter"
                    :class="
                      itemsProperties.id == filters.tag
                        ? 'txt-categorys-active'
                        : ''
                    "
                    @click="sendTag(itemsProperties)"
                  >
                    {{ itemsProperties.name }}
                  </button>
                </div>
              </el-collapse-item>
            </div>
            <el-collapse-item
              v-show="!stateShipping"
              :title="$t('home_fenvio')"
              name="4"
            >
              <div class="flex w-full flex-row items-center justify-between">
                <input
                  v-model="filters.minPrice"
                  :min="minPrice"
                  :max="maxPrice"
                  placeholder="Mínimo"
                  class="block w-full rounded-4 border border-[#DCDFE6] px-4 py-4 text-gray-900 shadow-sm placeholder:text-gray-400"
                  onkeypress="return (event.charCode>47 && event.charCode<58) || (event.charCode>96 && event.charCode<105)"
                  @keyup.enter="sendFilter"
                  @change="sendFilter"
                />
                <span class="icon-price px-5 text-16">-</span>
                <input
                  v-model="filters.maxPrice"
                  :min="minPrice"
                  :max="maxPrice"
                  placeholder="Máximo"
                  class="block w-full rounded-4 border border-[#DCDFE6] px-4 py-4 text-gray-900 shadow-sm placeholder:text-gray-400"
                  onkeypress="return (event.charCode>47 && event.charCode<58) || (event.charCode>96 && event.charCode<105)"
                  @keyup.enter="sendFilter"
                  @change="sendFilter"
                />
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
        <div
          class="mt-20 flex w-full flex-col items-center justify-center md:mt-0"
        >
          <div class="flex w-full flex-row items-start justify-between pb-25">
            <div class="flex w-full flex-col items-start justify-start">
              <button
                class="items-start justify-start font-semibold uppercase"
                :style="`color: ${settingByTemplate16[0].listProductsFilter['--color_subCategories']};`"
                @click="clearFilters"
              >
                {{ $t('header_productos') }}
              </button>
              <button
                v-if="nameCategory"
                :style="`color: ${settingByTemplate16[0].listProductsFilter['--color_subCategories']};`"
                @click="breadcrumbsClear(1)"
              >
                {{ nameCategory }}
              </button>
              <button
                v-if="nameSubCategory"
                :style="`color: ${settingByTemplate16[0].listProductsFilter['--color_subCategories']};`"
                @click="breadcrumbsClear(2)"
              >
                <span class="pr-4 font-normal">/</span>{{ nameSubCategory }}
              </button>
              <p
                v-if="tagProduct"
                :style="`color: ${settingByTemplate16[0].listProductsFilter['--color_subCategories']};`"
              >
                <span class="pr-4 font-normal">/</span>{{ tagProduct }}
              </p>
            </div>
            <div class="flex w-full items-start justify-end gap-x-2">
              <el-dropdown
                class="flex w-full items-center justify-end"
                @command="sendOrder"
                trigger="click"
              >
                <span
                  class="el-dropdown-link txt-color items-center justify-center"
                >
                  Ordenar por:
                  <span
                    v-if="sortingFilter?.label"
                    class="ml-5 text-11 font-normal"
                    :style="`color: ${settingByTemplate16[0].listProductsFilter['--color_subCategories']};`"
                    @click="clearOrder"
                  >
                    {{ $t(sortingFilter.label) }}
                  </span>
                  <i class="el-icon-arrow-down el-icon--right leading-21"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    v-for="items in listOrderFilter"
                    v-show="!stateShipping"
                    :key="items.id"
                    :command="items"
                    :class="
                      sortingFilter?.id === items.id
                        ? 'bg-black text-white-white'
                        : ''
                    "
                  >
                    {{ $t(items.label) }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <!-- <button class="flex md:hidden">
                <filterOutLine-icon
                  class="text-25"
                  :style="`color: ${settingByTemplate16[0].listProductsFilter['--color_icon']};`"
                  @click="openMenuLateral"
                />
              </button> -->
            </div>
          </div>
          <div class="flex h-full w-full flex-col items-center justify-center">
            <div
              class="grid w-full grid-cols-1 items-center justify-center gap-4 text-center sm:grid-cols-2 md:grid-cols-3"
            >
              <div
                v-for="product in listProducts"
                :key="product.id"
                class="flex h-full w-full flex-col items-center justify-center"
              >
                <Ko15ProductCard
                  :product="product"
                  :setting-card-products="settingByTemplate16[0].cardProducts"
                  :setting-general="settingByTemplate16[0].settingsGeneral"
                  class="h-full w-full"
                />
              </div>
            </div>
            <div
              v-if="listProducts.length == 0"
              class="flex h-full w-full flex-col items-center justify-center text-center"
            >
              <nuxt-link to="/productos">
                <img
                  loading="lazy"
                  :src="imageUrl"
                  width="150"
                  class="max-h-[150px] max-w-[150px]"
                  alt="LogoStore img"
                  @click="clearFilters"
                  @error="setDefaultImage"
                />
              </nuxt-link>
              <p class="my-15 text-20 font-semibold text-gray-600">
                {{ $t('home_msgCatalogo') }}
              </p>
            </div>
            <div
              v-if="totalProducts > filters.limit"
              class="wrapper_pagination mt-20 flex w-full items-center justify-center"
            >
              <el-pagination
                background
                layout="prev, pager, next"
                class="pagination bg-transparent"
                :total="totalProducts"
                :page-size="filters.limit"
                :current-page.sync="previousPage"
                @current-change="changePage"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mobileCheck from '@/mixins/mobileCheck'
import filters from '@/mixins/filterProducts'
import idCloudinaryBanner from '@/mixins/idCloudinary'
export default {
  name: 'Ko16ProductListFilter',
  components: {
    Ko15ProductCard: () => import('./_cardProduct/ProductCard.vue'),
  },
  mixins: [mobileCheck, filters, idCloudinaryBanner],
  props: {
    settingByTemplate16: {
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
      activeNames: ['1', '2', '3', '4', '5'],
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
  watch: {
    previousPage() {
      let scrollTimeout = null

      if (scrollTimeout !== null) {
        clearTimeout(scrollTimeout)
      }

      scrollTimeout = setTimeout(() => {
        scrollTimeout = null
        window.scrollTo({
          top: 0,
        })
      }, 250)
    },
  },
  methods: {
    openMenuLateral() {
      this.$store.commit('SET_OPEN_ORDER_MENU_LEFT', true)
    },
    setDefaultImage() {
      this.fallbackImage = require('@/assets/img/logo_nuevas_tiendas.png')
    },
  },
}
</script>

<style scoped>
.container-product-max-w {
  max-width: 1300px;
  @apply flex w-full flex-col items-center justify-center;
}
.product-content {
  background: var(--background_color_1);
  @apply flex w-full flex-col items-center justify-start pb-80;
}
.content-left >>> .el-collapse {
  border-top: 1px solid var(--color_border);
  border-bottom: 1px solid var(--color_border);
  @apply w-full;
}

.content-left >>> .el-collapse-item__wrap {
  will-change: height;
  background-color: transparent;
  border-bottom: 1px solid var(--color_border);
}
.content-left >>> .el-collapse-item__header {
  font-size: 15px;
  font-family: var(--font-style-1) !important;
  color: var(--color_subCategories);
  background-color: transparent;
  border-bottom: 1px solid var(--color_border);
  @apply font-semibold;
}
.content-left >>> .el-collapse-item__header.is-active {
  border-bottom: none;
}
.content-left >>> .el-collapse-item__arrow {
  color: var(--color_icon);
}
.input-slide {
  font-size: 15px;
  color: var(--color_categories);
  font-family: var(--font-style-1) !important;
  background: transparent;
  @apply h-30 w-full cursor-pointer border-none;
}
.categorys-list {
  @apply grid w-full grid-cols-1 items-center justify-start gap-4;
}
.subcategory-list {
  @apply grid w-full grid-cols-1 items-center justify-start gap-4 transition-all duration-0.2 ease-in;
}
.txt-Filter {
  color: var(--color_categories);
  font-size: 15px;
  line-height: 1.3;
  font-family: var(--font-style-1) !important;
  @apply flex w-full cursor-pointer flex-row items-center justify-start pr-1 font-normal transition-all duration-0.2 ease-in;
}
.txt-Filter:hover {
  color: #eb7025;
}
.txt-categorys {
  color: var(--color_categories);
  font-size: 15px;
  line-height: 1.3;
  font-family: var(--font-style-1) !important;
  @apply flex w-full cursor-pointer flex-row items-center justify-start pr-1 font-normal transition-all duration-0.2 ease-in;
}
.txt-categorys:hover {
  color: #eb7025;
}
.txt-categorys-active {
  color: #eb7025;
  font-size: 14px;
  @apply flex w-full cursor-pointer flex-row items-center justify-start pr-1 font-semibold transition-all duration-0.2 ease-in;
}
.txt-categorys:hover .rounded-list {
  background-color: #eb7025;
  @apply transition-all duration-0.2 ease-in;
}
.rounded-list {
  background-color: #e5e5e5;
  @apply mr-10 h-10 w-10 rounded-full transition-all duration-0.2 ease-in;
}
.txt-rounded-list-active {
  background-color: #eb7025;
  @apply transition-all duration-0.2 ease-in;
}
.product-stock {
  color: #333;
  font-size: 14px;
  font-family: var(--font-style-1) !important;
  @apply mr-6 cursor-pointer font-semibold transition-all duration-0.2 ease-in;
}
.show {
  @apply mt-4 w-full cursor-pointer;
}
.show-icon {
  fill: var(--color_icon);
  @apply p-3;
}
.show-icon-active {
  fill: var(--color_icon);
  background-color: transparent;
}
.show-icon:hover {
  fill: #000;
  background-color: #f8f8f8;
}
.show:focus .show-icon {
  fill: #000;
}

.pagination {
  font-size: 18px;
  color: var(--color_pagination);
  background: transparent;
}
.wrapper_pagination >>> .el-pagination.is-background .btn-next {
  color: var(--color_pagination);
  background-color: transparent;
}
.wrapper_pagination >>> .el-pagination.is-background .btn-prev {
  color: var(--color_pagination);
  background-color: transparent;
}
.wrapper_pagination >>> .el-pagination.is-background .el-pager li {
  color: var(--color_pagination);
  background-color: transparent;
}
.wrapper_pagination >>> .el-pagination.is-background .btn-next:hover {
  color: var(--color_pagination);
}
.wrapper_pagination >>> .el-pagination.is-background .btn-prev:hover {
  color: var(--color_pagination);
}
.wrapper_pagination
  >>> .el-pagination.is-background
  .el-pager
  li:not(.disabled):hover {
  color: var(--color_pagination);
}
.wrapper_pagination
  >>> .el-pagination.is-background
  .el-pager
  li:not(.disabled).active {
  background-color: var(--color_pagination);
  color: #fff;
}
@screen sm {
  .content-shop-items {
    @apply flex w-full flex-row items-start justify-start px-10;
  }
  .content-left {
    @apply hidden;
  }
  .content-home {
    @apply flex w-full flex-col items-start justify-start;
  }
  .txt-content-home {
    font-family: var(--font-style-1) !important;
    color: var(--color_subCategories);
    font-size: 16px;
    line-height: 1.1;
    @apply w-auto cursor-pointer py-20 font-semibold uppercase;
  }
  .txt-content-home:hover {
    color: #000;
  }
}
@media (min-width: 440px) {
  .product-content-items {
    @apply grid grid-cols-2;
  }
}
@screen md {
  .content-shop-items {
    @apply w-full px-20;
  }
}
@screen lg {
  .content-left {
    width: 300px;
    top: 163px;
    border-color: var(--color_border);
    @apply sticky mr-20 flex flex-col items-start justify-between border px-10;
  }
  .content-shop-items {
    @apply mt-40 flex w-full flex-row items-start justify-start;
  }
}
@screen mlg {
  .product-content {
    @apply mt-0;
  }
  .content-left {
    width: 400px;
  }
}
</style>
