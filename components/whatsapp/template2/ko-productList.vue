<template>
  <main class="content-productoList">
    <div class="content-item-productList">
      <div class="content-items-product">
        <div class="content-categories">
          <div class="content-items-categorias-text">
            <button class="txt-catalogo" @click="clearFilters">
              {{ $t('home_catalogo') }}
            </button>
            <div class="flex flex-row items-start justify-center">
              <button
                v-if="nameCategory"
                class="txt-category"
                @click="breadcrumbsClear(1)"
              >
                <span class="px-4 font-normal">/</span>{{ nameCategory }}
              </button>
              <button
                v-if="nameSubCategory"
                class="txt-category"
                @click="breadcrumbsClear(2)"
              >
                <span class="px-4 font-normal">/</span>{{ nameSubCategory }}
              </button>
              <p v-if="tagProduct" class="txt-category">
                <span class="px-4 font-normal">/</span>{{ tagProduct }}
              </p>
            </div>
          </div>
          <div class="flex w-full flex-row items-center justify-end">
            <el-dropdown
              class="mt-2 flex w-full items-center justify-end"
              trigger="click"
              @command="sendOrder"
            >
              <span
                class="el-dropdown-link txt-color items-center justify-center"
              >
                Ordenar por:
                <span
                  v-if="sortingFilter?.label"
                  class="ml-5 text-11 font-normal text-black"
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
            <search-icon class="icon-s mx-5" @click="openSearch" />
            <menu-icon class="icon-s" @click="openMenuLateral" />
          </div>
        </div>
        <KoSearch
          :data-store="dataStore"
          :setting-by-template="settingByTemplate"
        />
        <KoMenu
          :logo-store="logoStore"
          :data-store="dataStore"
          :setting-by-template="settingByTemplate"
        />
        <div class="content-grid-product">
          <div
            v-for="product in listProducts"
            :key="product.id"
            class="card-product"
          >
            <KoProductCard2 :product="product" :data-store="dataStore" />
          </div>
        </div>
        <div v-if="listProducts.length === 0" class="content-products-empty">
          <p>{{ $t('home_msgCatalogo') }}</p>
        </div>
        <br />
        <div v-if="totalProducts > filters.limit" class="wrapper-pagination">
          <div class="pagination-medium">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="totalProducts"
              :page-size="filters.limit"
              :current-page.sync="previousPage"
              class="pagination bg-transparent"
              @current-change="changePage"
            />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import filters from '@/mixins/filterProducts'
export default {
  name: 'ProductGridWa2',
  components: {
    KoProductCard2: () => import('../product-card/ko99-product-card'),
    KoMenu: () =>
      import('../../headers/_lateralMenu/_lateralMenu/openMenuLeftWapi.vue'),
    KoSearch: () => import('../ko99-search-wa.vue'),
  },
  mixins: [filters],
  props: {
    settingByTemplate: {
      type: Object,
      required: true,
    },
    logoStore: {
      type: Object,
      required: true,
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
    openSearch() {
      this.$store.commit('SET_OPEN_SEARCH', true)
    },
  },
}
</script>
<style scoped>
.content-productoList {
  @apply flex w-full flex-col items-center justify-start;
}
.pagination-medium {
  margin-top: 20px;
  margin-bottom: 20px;
}
.pagination-medium >>> .el-pagination.is-background .btn-next {
  color: black;
  background-color: transparent;
}
.pagination-medium >>> .el-pagination.is-background .btn-prev {
  color: black;
  background-color: transparent;
}
.pagination-medium >>> .el-pagination.is-background .el-pager li {
  color: black;
  background-color: transparent;
}
.pagination-medium >>> .el-pagination.is-background .btn-next:hover {
  color: black;
}
.pagination-medium >>> .el-pagination.is-background .btn-prev:hover {
  color: black;
}
.pagination-medium
  >>> .el-pagination.is-background
  .el-pager
  li:not(.disabled):hover {
  color: black;
}
.pagination-medium
  >>> .el-pagination.is-background
  .el-pager
  li:not(.disabled).active {
  background-color: black;
  color: white;
}
.wrapper-pagination {
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
}
.content-items-categorias-text {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: row;
}
.icon-s {
  font-size: 25px;
  color: black;
  cursor: pointer;
}
.icon-s:hover {
  color: grey;
}
@screen sm {
  .content-item-productList {
    width: 95%;
    @apply flex flex-col items-center justify-center;
  }
  .content-categories {
    @apply mb-10 flex w-full flex-row items-center justify-between;
  }
  .txt-catalogo {
    color: #3d3d3d;
    font-size: 15px;
    font-family: 'Poppins', sans-serif !important;
    @apply cursor-pointer font-semibold;
  }
  .txt-category {
    color: #818181;
    font-size: 15px;
    font-family: 'Poppins', sans-serif !important;
    @apply font-semibold;
  }
  .content-items-product {
    @apply flex w-full flex-col items-center justify-center;
  }
  .content-grid-product {
    @apply grid w-full grid-cols-2 items-start justify-center gap-4;
  }
  .card-product {
    @apply flex w-full flex-col items-center justify-start;
  }
  .content-products-empty {
    padding: 0px 20px;
    min-height: 380px;
    @apply flex w-full items-center justify-center text-center;
  }
  .content-products-empty p {
    font-size: 18px;
    opacity: 0.6;
    font-weight: bold;
    color: black;
  }
}
@media (min-width: 768px) {
  .content-grid-product {
    @apply grid grid-cols-3 gap-6;
  }
}
</style>
