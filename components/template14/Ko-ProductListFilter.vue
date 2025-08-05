<template>
  <div
    v-if="settingByTemplate14"
    class="product-content flex w-full flex-col items-center justify-start pb-80"
    :style="[
      settingByTemplate14[0].settingsGeneral,
      settingByTemplate14[0].listProductsFilter,
    ]"
  >
    <div class="flex w-full flex-col items-center justify-center">
      <div class="relative box-content hidden w-full md:flex">
        <div v-if="settingByTemplate14[0].listProductsFilter.visible_img">
          <picture>
            <source
              media="(max-width: 799px)"
              :srcset="
                idCloudinaryBanner(
                  settingByTemplate14[0].listProductsFilter.img,
                  'bannerRes',
                  400
                )
              "
            />
            <source
              media="(min-width: 800px)"
              :srcset="
                idCloudinaryBanner(
                  settingByTemplate14[0].listProductsFilter.img,
                  'banner'
                )
              "
            />
            <img
              v-lazy="
                idCloudinaryBanner(
                  settingByTemplate14[0].listProductsFilter.img,
                  'banner'
                )
              "
              alt="banner template14"
              class="h-full object-cover"
            />
          </picture>
        </div>
        <div v-else class="h-[240px] w-full"></div>
        <div
          class="absolute flex h-full w-full flex-col items-center justify-center"
        >
          <p
            class="mb-10 text-30 font-bold"
            :style="`color: ${settingByTemplate14[0].listProductsFilter.color_title};`"
          >
            {{ settingByTemplate14[0].listProductsFilter.title }}
          </p>
          <div
            class="flex flex-row items-center justify-center"
            :style="`color: ${settingByTemplate14[0].listProductsFilter.color_breadCrumbs};`"
          >
            <nuxt-link to="/" class="text-14">
              {{ $t('header_inicio') }}
            </nuxt-link>
            <p class="px-10 text-14 font-bold">></p>
            <button class="text-14 font-bold" @click="clearFilters">
              {{ $t('header_productos') }}
            </button>
          </div>
        </div>
      </div>
      <div
        class="mt-40 flex h-full w-full max-w-7xl flex-row items-start justify-start px-10 md:px-5"
      >
        <div
          class="mr-0 flex h-full w-full flex-col items-center justify-center md:mr-20"
        >
          <div class="flex w-full flex-row items-start justify-between pb-25">
            <div class="flex w-full flex-col items-start justify-start">
              <button
                class="items-start justify-start font-semibold uppercase"
                :style="`color: ${settingByTemplate14[0].listProductsFilter['--color_subCategories']};`"
                @click="clearFilters"
              >
                {{ $t('header_productos') }}
              </button>
              <button
                v-if="nameCategory"
                :style="`color: ${settingByTemplate14[0].listProductsFilter['--color_subCategories']};`"
                @click="breadcrumbsClear(1)"
              >
                {{ nameCategory }}
              </button>
              <button
                v-if="nameSubCategory"
                :style="`color: ${settingByTemplate14[0].listProductsFilter['--color_subCategories']};`"
                @click="breadcrumbsClear(2)"
              >
                <span class="pr-4 font-normal">/</span>{{ nameSubCategory }}
              </button>
              <p
                v-if="tagProduct"
                :style="`color: ${settingByTemplate14[0].listProductsFilter['--color_subCategories']};`"
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
                    :style="`color: ${settingByTemplate14[0].listProductsFilter['--color_subCategories']};`"
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
                  :style="`color: ${settingByTemplate14[0].listProductsFilter['--color_icon']};`"
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
                <Ko14ProductCard
                  :product="product"
                  :setting-card-products="settingByTemplate14[0].cardProducts"
                  :setting-general="settingByTemplate14[0].settingsGeneral"
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
        <div
          class="content-left sticky mr-30 hidden w-full max-w-[250px] flex-col items-start justify-between transition-all duration-0.3 ease-in md:flex lg:max-w-[300px]"
          style="top: 140px"
        >
          <button
            class="my-5 flex w-full cursor-pointer items-center justify-between pb-10 text-16 font-semibold uppercase"
            :style="`color: ${settingByTemplate14[0].listProductsFilter['--color_subCategories']};`"
            @click="clearFilters"
          >
            {{ $t('header_buscar_limpiar') }}
            <close-icon class="color_icon" />
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
      </div>
    </div>
  </div>
</template>
<script>
import mobileCheck from '@/mixins/mobileCheck'
import filters from '@/mixins/filterProducts'
import idCloudinaryBanner from '@/mixins/idCloudinary'
export default {
  name: 'Ko14ProductListFilter',
  components: {
    Ko14ProductCard: () => import('./_cardProduct/ProductCard.vue'),
  },
  mixins: [mobileCheck, filters, idCloudinaryBanner],
  props: {
    settingByTemplate14: {
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
.product-content {
  background: var(--background_color_1);
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
.color_icon {
  color: var(--color_icon);
}
.txt-categorys:hover {
  color: #eb7025;
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
</style>
