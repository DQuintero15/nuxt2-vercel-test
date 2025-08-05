<template>
  <div
    class="flex w-full flex-col items-center justify-start pb-80"
    :style="[
      settingByTemplate7[0].productListFilter,
      settingByTemplate7[0].settingGeneral,
      {
        '--font-style-1':
          settingByTemplate7[0]?.settingGeneral?.fount_1 ?? 'David Libre',
      },
      {
        '--font-style-2':
          settingByTemplate7[0]?.settingGeneral?.fount_2 ?? 'Great Vibes',
      },
      {
        '--font-style-3':
          settingByTemplate7[0]?.settingGeneral?.fount_3 ?? 'Lora',
      },
      `background-color: ${settingByTemplate7[0].productListFilter['--background_color_1']}`,
    ]"
  >
    <div class="relative box-content flex h-full max-h-[420px] w-full">
      <picture v-if="settingByTemplate7[0].productListFilter.img_background">
        <source
          media="(max-width: 799px)"
          :srcset="
            idCloudinaryBanner(
              settingByTemplate7[0].productListFilter.url_img,
              'bannerRes',
              400
            )
          "
        />
        <source
          media="(min-width: 800px)"
          :srcset="
            idCloudinaryBanner(
              settingByTemplate7[0].productListFilter.url_img,
              'banner'
            )
          "
        />
        <img
          v-lazy="
            idCloudinaryBanner(
              settingByTemplate7[0].productListFilter.url_img,
              'banner'
            )
          "
          alt="imgFilterProduct"
          class="h-full w-full object-cover"
        />
      </picture>
      <div v-else class="h-full max-h-[420px] w-full"></div>
      <div class="absolute flex h-full w-full items-center justify-center">
        <p class="btn-tittle-shop">
          {{ settingByTemplate7[0].productListFilter.title }}
        </p>
      </div>
    </div>
    <div
      class="flex w-full max-w-[1300px] flex-col items-center justify-center px-10 md:px-0 lg:flex-row lg:items-start lg:justify-start"
    >
      <div
        class="sticky top-[128px] mr-24 w-full max-w-[270px] flex-col items-start justify-between sm:hidden lg:flex"
      >
        <div class="flex w-full flex-col items-center justify-start">
          <p class="txt-tittles cursor-pointer" @click="clearFilters">
            {{ $t('header_buscar_limpiar') }}
          </p>
        </div>
        <div class="flex w-full flex-col items-center justify-start">
          <p class="txt-tittles">
            {{ $t('header_buscar_producto') }}
          </p>
          <div class="itemLeft-range-slide">
            <input
              v-model="searchProduct"
              type="search"
              class="input-slide"
              :placeholder="$t('header_search')"
              @change="sendFilter"
              @keyup.enter="sendFilter"
            />
          </div>
        </div>
        <div
          v-if="categorias?.length > 0"
          class="flex w-full flex-col items-center justify-start"
        >
          <p class="txt-tittles">
            {{ $t('productdetail_categoria') }}
          </p>
          <div
            v-if="categorias.length > 7"
            class="btn-scroll"
            @click="scrollCategories(1)"
          >
            <FlechaUp-icon class="btn-scroll-icon" />
          </div>
          <div class="categorys-list" id="swiper-slide-categories">
            <p class="txt-categorys" @click="clearFilters">
              Todos los productos
            </p>
            <div v-for="(category, index) in categorias" :key="index">
              <p
                class="txt-categorys"
                :class="
                  category.nombreCategoriaProducto == filters.category
                    ? 'txt-categorys-active'
                    : ''
                "
                @click="sendCategory(category)"
              >
                {{ category.nombreCategoriaProducto }}
              </p>
            </div>
          </div>
          <div
            v-if="categorias.length > 7"
            class="btn-scroll"
            @click="scrollCategories(2)"
          >
            <Flechadown-icon class="btn-scroll-icon" />
          </div>
        </div>
        <div
          v-if="selectedSubcategories?.length"
          class="flex w-full flex-col items-center justify-start"
        >
          <p class="txt-tittles">
            {{ $t('home_subcategory') }}
          </p>

          <div
            v-if="selectedSubcategories.length > 7"
            class="btn-scroll"
            @click="scrollSubCategories(1)"
          >
            <FlechaUp-icon class="btn-scroll-icon" />
          </div>
          <div id="swiper-slide-Subcategories" class="categorys-list">
            <div
              v-for="(subcategory, index) in selectedSubcategories"
              :key="index"
            >
              <p
                class="txt-categorys"
                :class="
                  subcategory.id == filters.subcategory
                    ? 'txt-categorys-active'
                    : ''
                "
                @click="sendSubCategory(subcategory)"
              >
                {{ subcategory.nombreSubcategoria }}
              </p>
            </div>
          </div>
          <div
            v-if="selectedSubcategories.length > 7"
            class="btn-scroll"
            @click="scrollSubCategories(2)"
          >
            <Flechadown-icon class="btn-scroll-icon" />
          </div>
        </div>
        <div
          v-for="(itemsTags, index) in tags"
          v-show="tags?.length > 0"
          :key="index"
        >
          <div
            v-if="
              itemsTags &&
              itemsTags.status === 1 &&
              itemsTags.tagProperties.length > 0
            "
          >
            <div class="txt-tittles">
              {{ itemsTags.name }}
            </div>
            <div class="categorys-list">
              <button
                v-for="itemsProperties in itemsTags.tagProperties"
                v-show="itemsProperties.status === 1"
                :key="itemsProperties.id"
                class="txt-categorys"
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
          </div>
        </div>
        <div class="flex w-full flex-col items-center justify-start">
          <p class="txt-tittles">
            {{ $t('home_fprecio') }}
          </p>
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
        </div>
      </div>

      <div class="flex w-full flex-col">
        <div class="w-full border-b border-[#e8e8e8] pb-12">
          <div class="mt-20 flex w-full flex-row items-center justify-between">
            <div class="flex w-full flex-row items-center justify-start">
              <p class="text-categorias" @click="clearFilters">
                {{ $t('home_catalogo') }}
              </p>
              <div class="flex flex-row items-start justify-center">
                <p
                  v-if="nameCategory"
                  class="text-categorias"
                  @click="breadcrumbsClear(1)"
                >
                  <span class="pr-4 font-normal">/</span>{{ nameCategory }}
                </p>
                <p
                  v-if="nameSubCategory"
                  class="text-categorias"
                  @click="breadcrumbsClear(2)"
                >
                  <span class="pr-4 font-normal">/</span>{{ nameSubCategory }}
                </p>
                <p v-if="tagProduct" class="text-categorias">
                  <span class="pr-4 font-normal">/</span>{{ tagProduct }}
                </p>
              </div>
            </div>
            <div class="flex w-full flex-row items-center justify-end">
              <div class="mr-16">
                <el-dropdown @command="sendOrder" trigger="click">
                  <span
                    class="el-dropdown-link text-categorias items-center justify-center"
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
              <div
                class="hidden w-auto grid-cols-4 items-center justify-center gap-x-4 md:grid"
              >
                <IconFormatListBulleted
                  class="show-icon cursor-pointer text-24"
                  :class="indexShowList === 1 ? 'show-icon-active' : ''"
                  @click="showList(1, true)"
                />
                <IconViewGrid
                  class="show-icon cursor-pointer text-21"
                  :class="indexShowList === 2 ? 'show-icon-active' : ''"
                  @click="showList(2, false)"
                />
                <IconApps
                  class="show-icon cursor-pointer text-24"
                  :class="indexShowList === 3 ? 'show-icon-active' : ''"
                  @click="showList(3, false)"
                />
                <IconViewComfy
                  class="show-icon cursor-pointer text-25"
                  :class="indexShowList === 4 ? 'show-icon-active' : ''"
                  @click="showList(4, false)"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="mb-40 flex w-full flex-col items-center justify-center">
          <div
            class="grid w-full items-start justify-start gap-4 text-center"
            :class="`grid-cols-1 sm:grid-cols-2 md:grid-cols-${indexShowList}`"
          >
            <div
              v-for="product in listProducts"
              :key="product.id"
              class="content-products"
            >
              <KoProductCardFilter
                v-if="!showInList"
                :product="product"
                :setting-general="settingByTemplate7[0].settingGeneral"
                :setting-card-products="settingByTemplate7[0].card"
                class="product-nolist"
              />
              <KoProductCardFilerList v-if="showInList" :product="product" />
            </div>
          </div>
          <div v-if="listProducts.length === 0" class="content-products-empty">
            <div class="header-content-logo">
              <nuxt-link to="/productos" class="wrapper-logo">
                <img
                  loading="lazy"
                  :src="imageUrl"
                  class="header-logo"
                  alt="Logo Img"
                  @error="setDefaultImage"
                />
              </nuxt-link>
            </div>
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
</template>

<script>
import mobileCheck from '@/mixins/mobileCheck'
import filters from '@/mixins/filterProducts'
import idCloudinaryBanner from '@/mixins/idCloudinary'
export default {
  name: 'K07ProductListFilter',
  components: {
    KoProductCardFilter: () => import('./_productcard/ProductCard.vue'),
    KoProductCardFilerList: () =>
      import('./_productcard/ProductCardFilterList.vue'),
  },
  mixins: [mobileCheck, filters, idCloudinaryBanner],
  props: {
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
      showInList: false,
      indexShowList: 3,
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
  mounted() {
    const screenWidth = screen.width
    if (
      (this.indexShowList === 4 || this.indexShowList === 3) &&
      screenWidth < 768
    ) {
      this.indexShowList = 2
    }
  },
  methods: {
    showList(index, state) {
      this.indexShowList = index
      this.showInList = state
    },
    scrollCategories(value) {
      if (value == 1) {
        document.getElementById('swiper-slide-categories').scrollTop -= 300
      } else if (value == 2) {
        document.getElementById('swiper-slide-categories').scrollTop += 300
      }
    },
    scrollSubCategories(value) {
      if (value == 1) {
        document.getElementById('swiper-slide-Subcategories').scrollTop -= 300
      } else if (value == 2) {
        document.getElementById('swiper-slide-Subcategories').scrollTop += 300
      }
    },
    setDefaultImage() {
      this.fallbackImage = require('@/assets/img/logo_nuevas_tiendas.png')
    },
  },
}
</script>

<style scoped>
picture {
  width: 100%;
}
.btn-scroll {
  @apply flex w-full cursor-pointer items-center justify-center;
}
.btn-scroll-icon {
  color: var(--color_text);
  bottom: 0.125em;
  @apply flex w-full items-center justify-center text-20;
}
.btn-scroll-icon:hover {
  color: var(--hover_text);
}
.wrapperRadio >>> .el-radio.is-bordered.is-checked {
  border-color: var(--color_text);
}
.wrapperRadio >>> .el-radio__input.is-checked + .el-radio__label {
  color: var(--color_text) !important;
}
.wrapperRadio >>> .el-radio__input.is-checked .el-radio__inner {
  border-color: var(--color_text) !important;
  background: var(--color_text) !important;
}
.content-banner-shop {
  background: var(--background_color_1);
  @apply flex w-full items-center justify-center bg-cover bg-no-repeat;
}
.itemLeft-range-slide {
  @apply mb-20 flex w-full items-center justify-center;
}
.input-slide {
  @apply w-full cursor-pointer;
}
.txt-tittles {
  @apply flex w-full items-center justify-start py-20 text-16 font-semibold uppercase;
  color: var(--color_text);
  transition: all 0.25s ease;
  font-family: var(--font-style-1) !important;
}
.text-categorias {
  color: var(--color_text);
  font-family: var(--font-style-3) !important;
  @apply mr-6 flex cursor-pointer flex-row text-14 font-semibold;
}
[class*=' el-icon-'],
[class^='el-icon-'] {
  color: var(--hover_text);
}
.icon-price {
  color: var(--color_text);
  font-family: var(--font-style-3) !important;
}
.categorys-list {
  @apply grid max-h-[300px] w-full grid-cols-1 items-center justify-start gap-4 overflow-y-auto;
}

.categorys-list::-webkit-scrollbar {
  width: 3px;
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
.txt-categorys {
  @apply flex w-full cursor-pointer flex-row items-center justify-start pr-4 text-14;
  color: var(--color_subtext);
  font-family: var(--font-style-3) !important ;
  transition: all 0.25s ease;
}
.textSortingFilter {
  color: var(--color_subtext);
  font-family: var(--font-style-3) !important ;
  transition: all 0.25s ease;
  @apply ml-5 text-11 font-normal;
}
.show-icon:hover {
  color: var(--hover_text);
}
.show-icon-active {
  color: var(--hover_text);
}
.show:focus .show-icon {
  color: var(--color_text);
}
.txt-categorys-active {
  color: var(--hover_text);
}

.tittle-banner-shop {
  @apply flex w-full flex-wrap items-center justify-center;
}
.btn-tittle-shop {
  color: var(--color_title);
  font-family: var(--font-style-1) !important ;
  font-weight: 400;
}
.txt-categorys:hover {
  color: #050505;
}
.content-products {
  height: 100%;
  border-bottom: 0.5px solid #f2f2f2;
}
.content-products-empty {
  @apply flex min-h-[200px] w-full flex-col items-center justify-center text-center;
}
.txt-products-empty {
  color: #3f3f3f;
  font-family: var(--font-style-1) !important;
  @apply mt-6 text-20 font-semibold;
}
.pagination {
  color: #3f3f3f;
}
.product_pagination >>> .el-pagination.is-background .btn-next {
  color: #3f3f3f;
  background-color: transparent;
}
.product_pagination >>> .el-pagination.is-background .btn-prev {
  color: #3f3f3f;
  background-color: transparent;
}
.product_pagination >>> .el-pagination.is-background .el-pager li {
  color: #3f3f3f;
  background-color: transparent;
}
.product_pagination >>> .el-pagination.is-background .btn-next:hover {
  color: var(--hover_card);
}
.product_pagination >>> .el-pagination.is-background .btn-prev:hover {
  color: var(--hover_card);
}
.product_pagination
  >>> .el-pagination.is-background
  .el-pager
  li:not(.disabled):hover {
  color: var(--hover_card);
}
.product_pagination
  >>> .el-pagination.is-background
  .el-pager
  li:not(.disabled).active {
  background-color: var(--hover_card);
  color: white;
}
@screen sm {
  .btn-tittle-shop {
    @apply text-36;
  }
  .content-banner-shop {
    @apply pt-80;
  }
  .tittle-banner-shop {
    @apply my-6;
  }
}

@screen mlg {
  .btn-tittle-shop {
    @apply text-78;
  }
  .content-banner-shop {
    @apply mb-40 pb-70 pt-[150px];
  }
  .tittle-banner-shop {
    @apply my-6;
  }
}
@media (min-width: 1192px) {
  .content-shop-items {
    width: 1192px;
  }
}
</style>
