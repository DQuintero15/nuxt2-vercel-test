<template>
  <div
    v-if="settingByTemplate13"
    class="product-content"
    :style="[
      settingByTemplate13[0].settingGeneral,
      settingByTemplate13[0].productListFilter,
      {
        '--font-style-1':
          settingByTemplate13[0]?.settingGeneral?.fount_1 ?? 'Poppins',
      },
    ]"
  >
    <div class="container-product-max-w">
      <div class="content-shop-items">
        <div class="content-left">
          <nuxt-link class="content-home" to="/productos">
            <p class="txt-content-home" @click="clearFilters">
              {{ $t('header_buscar_limpiar') }}
            </p>
          </nuxt-link>
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
              v-show="categorias.length > 0"
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
        <div class="flex w-full flex-col items-center justify-center">
          <div class="flex w-full items-center justify-between">
            <div class="flex w-full items-center justify-start">
              <button class="txt-content-home" @click="clearFilters">
                {{ $t('header_productos') }}
              </button>
              <button
                v-if="nameCategory"
                class="txt-color ml-4"
                @click="breadcrumbsClear(1)"
              >
                <span class="pr-4 font-normal">/</span>{{ nameCategory }}
              </button>
              <button
                v-if="nameSubCategory"
                class="txt-color"
                @click="breadcrumbsClear(2)"
              >
                <span class="pr-4 font-normal">/</span>{{ nameSubCategory }}
              </button>
              <p v-if="tagProduct" class="txt-color">
                <span class="pr-4 font-normal">/</span>{{ tagProduct }}
              </p>
            </div>
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
                  class="textSortingFilter"
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
          </div>
          <div class="flex h-full w-full flex-col items-center justify-center">
            <div
              class="grid w-full grid-cols-1 items-start justify-start gap-4 text-center sm:grid-cols-2 md:grid-cols-3"
            >
              <div
                v-for="product in listProducts"
                :key="product.id"
                class="flex w-full flex-col items-center justify-center"
              >
                <KoProductCardFilter
                  :product="product"
                  :setting-card-products="settingByTemplate13[0].cardProduct"
                  :setting-general="settingByTemplate13[0].settingGeneral"
                  class="h-full w-full"
                />
              </div>
            </div>
            <div
              v-if="listProducts.length == 0"
              class="flex min-h-[200px] w-full flex-col items-center justify-center text-center"
            >
              <img
                loading="lazy"
                :src="imageUrl"
                alt="Logo Img"
                @click="clearFilters"
                @error="setDefaultImage"
              />
              <p class="txt-products-empty">{{ $t('home_msgCatalogo') }}</p>
            </div>
            <div
              v-if="totalProducts > filters.limit"
              class="product_pagination mt-50 bg-transparent text-18"
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
export default {
  name: 'Ko13ProductListFilter',
  components: {
    KoProductCardFilter: () => import('./_productcard/Ko13-product-card.vue'),
  },
  mixins: [mobileCheck, filters],
  props: {
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
      activeNames: ['1', '2', '3', '4'],
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
  @apply flex h-full min-h-full w-full flex-col items-center justify-start;
}
.content-banner-shop {
  @apply flex w-full flex-col;
}
.content-banner-shop-r {
  @apply flex w-full flex-col items-start justify-start;
}
/* .itemLeft-range-slide {
  @apply w-full flex justify-center items-center mb-20;
} */
/* .content-input-slide {
  @apply w-full flex flex-col justify-center items-center;
} */
/* .content-left {
  position: sticky;
  top: 130px;
  transition: all 0.25s ease;
} */
.content-left >>> .el-collapse {
  border-top: 1px solid var(--color_icon);
  border-bottom: 1px solid var(--color_icon);
  @apply w-full;
}

.content-left >>> .el-collapse-item__wrap {
  will-change: height;
  background-color: transparent;
  border-bottom: 1px solid var(--color_icon);
}
.content-left >>> .el-collapse-item__header {
  font-size: 15px;
  font-family: var(--font-style-1) !important;
  color: var(--color_text);
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
.input-slide {
  font-size: 15px;
  color: var(--color_subtext);
  font-family: var(--font-style-1) !important;
  background: transparent;
  @apply h-30 w-full cursor-pointer border-none;
}
.value-range-slide {
  @apply flex w-full flex-row items-center justify-start;
}
.values-prices {
  @apply flex w-8/0 flex-row items-center justify-start;
}
.value-price {
  color: #717171;
  font-size: 14px;
  font-family: var(--font-style-1) !important;
  @apply w-auto cursor-default pr-1 transition-all duration-0.2 ease-in;
}
.value-precio-change {
  @apply flex w-full flex-row items-center justify-start;
}
.price {
  color: #2d2a2a;
  font-size: 14px;
  font-family: var(--font-style-1) !important;
  @apply flex cursor-default flex-row items-center justify-start font-semibold transition-all duration-0.2 ease-in;
}
.btn-slider {
  @apply flex w-3/0 items-center justify-center;
}
.btn-items-left {
  background-color: #ededed;
  font-size: 12px;
  border-radius: 35px;
  padding: 10px 14px;
  letter-spacing: 0.3px;
  font-family: var(--font-style-1) !important;
  @apply flex cursor-pointer items-center justify-center text-center font-semibold uppercase transition-all duration-0.2 ease-in;
}
.btn-items-left:hover {
  background-color: #e5e5e5;
}
.content-items-categorias {
  @apply flex w-full flex-col items-center justify-start;
}
.content-items-categorias-text {
  @apply flex w-full flex-row;
}
.text-categorias {
  color: #333333;
  font-size: 14px;
  font-family: var(--font-style-1) !important;
  @apply mr-6 flex w-auto cursor-pointer flex-row font-semibold;
}
.separator-breadCrumbs {
  color: #8e8e8e;
  font-size: 14px;
  font-family: var(--font-style-1) !important;
  @apply ml-6 mr-6 w-auto cursor-pointer transition-all duration-0.2 ease-in;
}
.product-stock-text {
  color: #8e8e8e;
  font-size: 14px;
  font-family: var(--font-style-1) !important;
  @apply font-semibold;
}
.product-stock-active {
  color: #000;
  font-size: 15px;
  font-family: var(--font-style-1) !important;
  @apply font-semibold;
}
.text-categorias-select {
  color: #8e8e8e;
  font-size: 14px;
  font-family: var(--font-style-1) !important;
  @apply mr-6 flex w-full cursor-pointer flex-row font-normal transition-all duration-0.2 ease-in;
}
.top-content {
  font-size: 100%;
  @apply mb-20 flex w-full max-w-full flex-wrap items-center justify-between;
}
.categorys-list {
  @apply grid w-full grid-cols-1 items-center justify-start gap-4;
}
.subcategory-list {
  @apply grid w-full grid-cols-1 items-center justify-start gap-4 transition-all duration-0.2 ease-in;
}
.content-category-left {
  @apply flex w-full flex-col items-center justify-start;
}
.txt-Filter {
  color: var(--color_subtext);
  font-size: 15px;
  line-height: 1.3;
  font-family: var(--font-style-1) !important;
  @apply flex w-full cursor-pointer flex-row items-center justify-start pr-1 font-normal transition-all duration-0.2 ease-in;
}
.txt-Filter:hover {
  color: #eb7025;
}
.txt-categorys {
  color: var(--color_subtext);
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
.show-view-per-list {
  @apply w-auto items-center justify-center;
}
.show {
  @apply mt-4 w-full cursor-pointer;
}
.show-icon {
  fill: var(--color_text);
  @apply p-3;
}
.show-icon-active {
  fill: var(--color_subtext);
  background-color: transparent;
}
.show-icon:hover {
  fill: #000;
  background-color: #f8f8f8;
}
.show:focus .show-icon {
  fill: #000;
}
.items-end {
  @apply flex w-full flex-row items-center justify-start;
}
.tittle-banner-shop {
  @apply flex w-full flex-col items-start justify-start;
}
.btn-tittle-shop {
  color: var(--color_text);
  font-family: var(--font-style-1) !important;
  @apply items-start justify-start font-semibold uppercase;
}
.product-text {
  @apply flex w-full flex-col items-center justify-center;
}

.product-content-items {
  @apply items-center justify-center gap-4 text-center;
}
.producto-items-content {
  @apply w-full;
}
.content-item {
  @apply mb-40 flex w-full flex-row items-center justify-center;
}
.content-item-productos {
  @apply flex w-full flex-col items-center justify-center;
}
.content-products {
  /* border-bottom: 0.5px solid #f2f2f2; */
  @apply flex w-full flex-col items-center justify-center;
}
.content-products-empty {
  min-height: 200px;
  @apply flex w-full flex-col items-center justify-center text-center;
}
.txt-products-empty {
  font-size: 20px;
  color: var(--color_text);
  font-family: var(--font-style-1) !important;
  @apply mt-6 font-semibold;
}
.pagination-medium {
  margin-top: 50px;
  background: transparent;
}
.pagination {
  font-size: 18px;
  color: #222;
  background: transparent;
}
.product_pagination >>> .el-pagination.is-background .btn-next {
  color: #222;
  background-color: transparent;
}
.product_pagination >>> .el-pagination.is-background .btn-prev {
  color: #222;
  background-color: transparent;
}
.product_pagination >>> .el-pagination.is-background .el-pager li {
  color: #222;
  background-color: transparent;
}
.product_pagination >>> .el-pagination.is-background .btn-next:hover {
  color: var(--pagination_color);
}
.product_pagination >>> .el-pagination.is-background .btn-prev:hover {
  color: var(--pagination_color);
}
.product_pagination
  >>> .el-pagination.is-background
  .el-pager
  li:not(.disabled):hover {
  color: var(--pagination_color);
}
.product_pagination
  >>> .el-pagination.is-background
  .el-pager
  li:not(.disabled).active {
  background-color: var(--pagination_color);
  color: #fff;
}
.product-stock {
  cursor: default;
}

.product-list {
  @apply w-full;
}
/* .product-list:hover {
  @apply shadow-lg;
} */
@screen sm {
  .product-content-items {
    @apply grid w-full grid-cols-2;
  }
  .btn-tittle-shop {
    font-size: 16px;
    @apply mb-10;
  }
  .content-shop-items {
    @apply flex w-full flex-row items-start justify-start px-10;
  }
  .content-left {
    @apply hidden;
  }
  .content-right {
    @apply flex w-full flex-col items-center justify-center;
  }
  .top-content {
    @apply hidden;
  }
  .content-items-categorias-text {
    @apply items-center justify-center;
  }
  .text-categorias-select {
    @apply w-auto;
  }
  .content-banner-shop {
    @apply my-8 items-start justify-start pl-20;
  }
  .bannerProduct {
    @apply hidden;
  }
  .content-home {
    @apply flex w-full flex-col items-start justify-start;
  }
  .txt-content-home {
    font-family: var(--font-style-1) !important;
    color: var(--color_text);
    font-size: 16px;
    line-height: 1.1;
    @apply w-auto cursor-pointer py-20 font-semibold uppercase;
  }
  .txt-content-home:hover {
    color: #000;
  }
  .txt-color {
    color: var(--color_text);
    font-family: var(--font-style-1) !important;
  }
  .textSortingFilter {
    color: var(--color_text);
    font-family: var(--font-style-1) !important ;
    transition: all 0.25s ease;
    @apply ml-5 text-11 font-normal;
  }
}
@media (min-width: 440px) {
  .product-content-items {
    @apply grid grid-cols-2;
  }
}
@screen md {
  .btn-tittle-shop {
    font-size: 36px;
    @apply mb-0;
  }
  .content-shop-items {
    @apply w-full px-20;
  }
  .bannerProduct {
    border-color: var(--color_icon);
    @apply flex w-full items-center justify-items-center border-b bg-cover bg-center bg-no-repeat py-20;
  }
  .product-content-items {
    @apply grid grid-cols-3;
  }
}
@screen lg {
  .product-text {
    @apply w-full;
  }
  .product-content-items {
    @apply grid grid-cols-2 gap-8;
  }
  .content-items-categorias-text {
    @apply items-center justify-start;
  }
  .items-end {
    @apply flex pb-20;
  }
  .show-view-per-list {
    @apply grid w-auto grid-cols-2 items-center justify-center gap-0;
  }
  .btn-tittle-shop {
    font-size: 20px;
  }
  .top-content {
    border-bottom: 1px solid var(--color_icon);
    @apply flex pb-5 pt-0;
  }
  .content-left {
    width: 300px;
    top: 142px;
    @apply sticky mr-30 flex flex-col items-start justify-between;
  }
  .content-banner-shop {
    @apply hidden;
  }
  .content-banner-shop-r {
    @apply flex pb-40;
  }
  .content-shop-items {
    @apply mt-40 flex w-full flex-row items-start justify-start;
  }
  .hidd {
    @apply hidden;
  }
}
@screen mlg {
  .product-content {
    @apply mt-0;
  }
  .content-left {
    width: 400px;
  }
  .product-content-items {
    @apply grid grid-cols-3 gap-2;
  }
}
</style>
