<template>
  <div
    class="product-content"
    :style="[
      settingByTemplate10[0].settingGeneral,
      settingByTemplate10[0].productListFilter,
      {
        '--font-style-1':
          settingByTemplate10[0]?.settingGeneral?.fount_1 ?? 'Roboto',
      },
    ]"
  >
    <div id="BgProductlistF10" class="bannerProduct">
      <div class="crumb">
        <nuxt-link to="/">
          <p class="txt-crumb s1">{{ $t('header_inicio') }}</p>
        </nuxt-link>
        <p class="separatorCrumb">/</p>
        <p class="txt-crumb s2" @click="clearFilters">
          {{ $t('header_productos') }}
        </p>
      </div>
    </div>
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
              v-show="categorias?.length > 0"
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
                      <span
                        class="rounded-list"
                        :class="
                          category.nombreCategoriaProducto == filters.category
                            ? 'txt-rounded-list-active'
                            : ''
                        "
                      ></span>
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
                      <span
                        class="rounded-list"
                        :class="
                          subcategory.id == filters.subcategory
                            ? 'txt-rounded-list-active'
                            : ''
                        "
                      ></span>
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
          <div class="flex w-full flex-row items-center justify-between">
            <div class="flex w-full items-center justify-start">
              <p class="txt-content-home" @click="clearFilters">
                {{ $t('home_catalogo') }}
              </p>
              <p
                v-if="nameCategory"
                class="txt-color ml-4"
                @click="breadcrumbsClear(1)"
              >
                <span class="pr-4 font-normal">/</span>{{ nameCategory }}
              </p>
              <p
                v-if="nameSubCategory"
                class="txt-color"
                @click="breadcrumbsClear(2)"
              >
                <span class="pr-4 font-normal">/</span>{{ nameSubCategory }}
              </p>
              <p v-if="tagProduct" class="txt-color">
                <span class="pr-4 font-normal">/</span>{{ tagProduct }}
              </p>
            </div>
            <div class="flex w-full items-center justify-end gap-x-2">
              <svg
                class="show-icon hidden cursor-pointer p-12 md:flex"
                :class="indexShowList === 3 ? 'show-icon-active' : ''"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="40px"
                height="40px"
                viewBox="0 0 12 12"
                @click="showList(3, false)"
              >
                <path d="M5,0H0v5h5V0z"></path>
                <path d="M12,0H7v5h5V0z"></path>
                <path d="M5,7H0v5h5V7z"></path>
                <path d="M12,7H7v5h5V7z"></path>
              </svg>
              <svg
                class="show-icon hidden cursor-pointer p-12 md:flex"
                :class="indexShowList === 1 ? 'show-icon-active' : ''"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="40px"
                height="40px"
                viewBox="0 0 12 12"
                @click="showList(1, true)"
              >
                <path d="M5,0H0v5h5V0z"></path>
                <rect x="7" y="0" width="5" height="2"></rect>
                <rect x="7" y="3" width="5" height="2"></rect>
                <rect x="7" y="7" width="5" height="2"></rect>
                <rect x="7" y="10" width="5" height="2"></rect>
                <path d="M5,7H0v5h5V7z"></path>
              </svg>
              <el-dropdown @command="sendOrder" trigger="click">
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
          </div>
          <div class="flex h-full w-full flex-col items-center justify-center">
            <div
              class="grid w-full items-start justify-start gap-4 text-center"
              :class="`grid-cols-1 sm:grid-cols-2 md:grid-cols-${indexShowList}`"
            >
              <div
                v-for="product in listProducts"
                :key="product.id"
                class="content-products h-full w-full"
              >
                <KoProductCardFilter
                  v-if="!showInList"
                  :product="product"
                  :setting-card-products="settingByTemplate10[0].cardProduct"
                  :setting-general="settingByTemplate10[0].settingGeneral"
                  class="product-list h-full w-full"
                />
                <KoProductCardFilerList
                  v-if="showInList"
                  :product="product"
                  :setting-card-products="settingByTemplate10[0].cardProduct"
                  :setting-general="settingByTemplate10[0].settingGeneral"
                  class="product-list"
                />
              </div>
            </div>
            <div
              v-if="listProducts.length === 0"
              class="content-products-empty"
            >
              <div class="header-content-logo">
                <nuxt-link to="/productos" class="wrapper-logo">
                  <img
                    loading="lazy"
                    :src="imageUrl"
                    class="header-logo"
                    alt="Logo Img"
                    @click="clearFilters"
                    @error="setDefaultImage"
                  />
                </nuxt-link>
              </div>
              <p class="txt-products-empty">{{ $t('home_msgCatalogo') }}</p>
            </div>
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
</template>

<script>
import mobileCheck from '@/mixins/mobileCheck'
import filters from '@/mixins/filterProducts'
export default {
  name: 'Ko10ProductListFilter',
  components: {
    KoProductCardFilter: () => import('./_productcard/ProductCard.vue'),
    KoProductCardFilerList: () =>
      import('./_productcard/ProductCardFilterList.vue'),
  },
  mixins: [mobileCheck, filters],
  props: {
    settingByTemplate10: {
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
      showInList: false,
      indexShowList: 3,
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
    settingByTemplate10() {
      this.setBg()
    },
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
  mounted() {
    this.setBg()
  },
  methods: {
    setBg() {
      if (this.settingByTemplate10) {
        if (!this.mobileCheck()) {
          var imagen = document.getElementById('BgProductlistF10')
          if (this.settingByTemplate10[0]?.productListFilter?.visible_bg) {
            if (this.settingByTemplate10[0].productListFilter.url_img_bg) {
              imagen.style.backgroundImage = `url(${this.settingByTemplate10[0].productListFilter.url_img_bg})`
            } else {
              imagen.style.backgroundImage = `url(https://res.cloudinary.com/brahyanr10/image/upload/v1614233821/Temp10/Productos/bg-beagrumb_gxvk1i.jpg)`
            }
          } else {
            imagen.style.backgroundImage = ''
          }
        }
      }
    },
    showList(index, state) {
      this.indexShowList = index
      this.showInList = state
    },
    setDefaultImage() {
      this.fallbackImage = require('@/assets/img/logo_nuevas_tiendas.png')
    },
  },
}
</script>

<style scoped>
.container-product-max-w {
  max-width: 1400px;
  @apply flex w-full flex-col items-center justify-center;
}
.product-content {
  background: var(--background_color_1);
  @apply flex w-full flex-col items-center justify-start pb-80;
}
.content-left >>> .el-collapse {
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  @apply w-full;
}
.content-left >>> .el-collapse-item__wrap {
  will-change: height;
  background-color: transparent;
  border-bottom: 1px solid var(--border);
  margin-left: 10px;
}
.content-left >>> .el-collapse-item__header {
  font-size: 16px;
  font-family: var(--font-style-1) !important;
  color: var(--color_text);
  background-color: transparent;
  border-bottom: 1px solid var(--border);
  text-transform: uppercase;
  @apply font-semibold;
}
.content-left >>> .el-collapse-item__header.is-active {
  border-bottom: none;
}
.content-left >>> .el-collapse-item__arrow {
  color: var(--color_icon);
}
.input-slide {
  font-family: var(--font-style-1) !important;
  @apply h-30 w-full cursor-pointer border-none;
  background: transparent;
  /* border-bottom: 2px solid #2c2930; */
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
#statecate {
  color: #333;
  font-size: 14px;
  font-family: var(--font-style-1) !important;
  @apply w-full cursor-pointer font-semibold;
}
#statesubcate {
  color: #333;
  font-size: 14px;
  font-family: var(--font-style-1) !important;
  @apply ml-6 w-full cursor-pointer font-semibold transition-all duration-0.2 ease-in;
}
.categorys-list {
  max-height: 300px;
  @apply grid w-full grid-cols-1 items-center justify-start gap-4 overflow-auto;
}
.subcategory-list {
  max-height: 300px;
  @apply grid w-full grid-cols-1 items-center justify-start gap-4 overflow-auto;
}
.categorys-list::-webkit-scrollbar {
  @apply w-3;
}
.categorys-list::-webkit-scrollbar-thumb {
  background: #a3a3a3;
  border-radius: 4px;
}
.categorys-list::-webkit-scrollbar-thumb:active {
  background-color: #777777;
}
.categorys-list::-webkit-scrollbar-thumb:hover {
  background: #686868;
  box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.401);
}
.container::-webkit-scrollbar-track {
  background: #323232;
  border-radius: 4px;
}
.subcategory-list::-webkit-scrollbar {
  @apply w-3;
}
.subcategory-list::-webkit-scrollbar-thumb {
  background: #a3a3a3;
  border-radius: 4px;
}
.subcategory-list::-webkit-scrollbar-thumb:active {
  background-color: #777777;
}
.subcategory-list::-webkit-scrollbar-thumb:hover {
  background: #686868;
  box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.401);
}
.container::-webkit-scrollbar-track {
  background: #323232;
  border-radius: 4px;
}
.container::-webkit-scrollbar-track:hover,
.container::-webkit-scrollbar-track:active {
  background: #b52727;
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
  color: var(--color_icon);
  font-size: 14px;
  @apply flex w-full cursor-pointer flex-row items-center justify-start pr-1 font-semibold transition-all duration-0.2 ease-in;
}
.txt-categorys:hover .rounded-list {
  background-color: var(--color_icon);
  @apply transition-all duration-0.2 ease-in;
}
.rounded-list {
  background-color: #e5e5e5;
  @apply mr-10 h-10 w-10 rounded-full transition-all duration-0.2 ease-in;
}
.txt-rounded-list-active {
  background-color: var(--color_icon);
  @apply transition-all duration-0.2 ease-in;
}
.product-stock {
  color: #333;
  font-size: 14px;
  font-family: var(--font-style-1) !important;
  @apply mr-6 cursor-pointer font-semibold transition-all duration-0.2 ease-in;
}

.show-icon {
  fill: var(--color_icon);
}
.show-icon-active {
  fill: var(--hover_text);
  background-color: var(--background_color_1);
}
.show-icon:hover {
  fill: var(--hover_text);
  background-color: var(--background_color_1);
}
.show:focus .show-icon {
  fill: var(--hover_text);
}
.items-end {
  @apply flex w-full flex-row items-center justify-start;
}
.tittle-banner-shop {
  @apply flex w-full items-start justify-start;
}
.btn-tittle-shop {
  color: var(--color_text);
  font-family: var(--font-style-1) !important;
  @apply items-start justify-start font-semibold uppercase;
}
.product-text {
  @apply flex w-full flex-col items-center justify-center;
}

.product-conten-items {
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
  /* border-bottom: 0.5px solid var(--border); */
  @apply flex h-full w-full flex-col items-center justify-center;
}
.content-products-empty {
  min-height: 200px;
  @apply flex w-full flex-col items-center justify-center text-center;
}
.txt-products-empty {
  font-size: 20px;
  color: #3f3f3f;
  font-family: var(--font-style-1) !important;
  @apply mt-6 font-semibold;
}
.pagination-medium {
  margin-top: 50px;
  background: transparent;
}
.pagination {
  font-size: 18px;
  color: var(--pagination_Color);
  background: transparent;
}
.product_pagination >>> .el-pagination.is-background .btn-next {
  color: var(--pagination_Color);
  background-color: transparent;
}
.product_pagination >>> .el-pagination.is-background .btn-prev {
  color: var(--pagination_Color);
  background-color: transparent;
}
.product_pagination >>> .el-pagination.is-background .el-pager li {
  color: var(--pagination_Color);
  background-color: transparent;
}
.product_pagination >>> .el-pagination.is-background .btn-next:hover {
  color: var(--pagination_Color);
}
.product_pagination >>> .el-pagination.is-background .btn-prev:hover {
  color: var(--pagination_Color);
}
.product_pagination
  >>> .el-pagination.is-background
  .el-pager
  li:not(.disabled):hover {
  color: var(--pagination_Color);
}
.product_pagination
  >>> .el-pagination.is-background
  .el-pager
  li:not(.disabled).active {
  background-color: var(--pagination_Color);
  color: #fff;
}
.show-number-items,
.product-stock {
  cursor: default;
}
.crumb {
  @apply flex w-full flex-row items-center justify-center;
}
.separatorCrumb {
  font-size: 9px;
  color: var(--breadCrumbs);
  font-family: var(--font-style-1) !important;
  @apply cursor-pointer pr-6 leading-14 transition-all duration-0.2 ease-in;
}
.txt-crumb {
  font-size: 15px;
  color: var(--breadCrumbs);
  font-family: var(--font-style-1) !important;
  @apply cursor-pointer pr-6 leading-14 transition-all duration-0.2 ease-in;
}
.s1:hover {
  color: #eb7025;
  transition: all 0.25s ease;
}
.s2:hover {
  color: #eb7025;
  transition: all 0.25s ease;
}
.product-list {
  @apply h-full w-full;
}
.product-list:hover {
  @apply shadow-lg;
}
.content-left {
  position: sticky;
  top: 15px;
  transition: all 0.25s ease;
}

@screen sm {
  .content-shop-items {
    @apply flex w-9/0 flex-row items-start justify-start;
  }
  .content-left {
    @apply hidden;
  }

  .bannerProduct {
    @apply hidden;
  }
  .product-content {
    margin-top: 20px;
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
  .txt-content-home:hover {
    color: #eb7025;
  }
}
@media (min-width: 440px) {
  .product-conten-items {
    @apply grid grid-cols-2;
  }
}
@screen md {
  .content-shop-items {
    @apply w-9/3;
  }
  .bannerProduct {
    height: 220px;
    background-color: var(--background_color_2);
    @apply flex w-full items-center justify-items-center bg-cover bg-center bg-no-repeat;
  }
}
@screen lg {
  .product-text {
    @apply w-full;
  }
  .product-conten-items {
    @apply grid grid-cols-3 gap-10;
  }

  .items-end {
    @apply flex pb-20;
  }
  .show-number-items {
    @apply flex w-full items-center justify-end;
  }

  .btn-tittle-shop {
    font-size: 20px;
  }

  .content-left {
    width: 400px;
    @apply mr-10 flex flex-col items-start justify-between;
  }
  .content-banner-shop {
    @apply hidden;
  }

  .content-shop-items {
    @apply mt-40 flex w-9/5 flex-row items-start justify-start;
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
}
@media (max-width: 440px) {
  .btn-tittle-shop {
    font-size: 22px;
  }
}
</style>
