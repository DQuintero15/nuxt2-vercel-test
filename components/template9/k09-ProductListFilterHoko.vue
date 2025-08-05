<template>
  <div
    class="product-content"
    :style="[
      settingByTemplate9[0].settingGeneral,
      settingByTemplate9[0].productListFilter,
    ]"
  >
    <div
      class="content-banner-shop"
      :style="[
        {
          '--font-style-1':
            settingByTemplate9[0]?.settingGeneral?.fount_1 ?? 'Poppins',
        },
        {
          '--font-style-2':
            settingByTemplate9[0]?.settingGeneral?.fount_2 ?? 'Roboto',
        },
      ]"
    >
      <div class="crumb">
        <nuxt-link to="/">
          <p
            class="txt-crumb s1"
            :style="`color: ${settingByTemplate9[0].productListFilter.breadcrumbs};`"
          >
            {{ $t('header_inicio') }}
          </p>
        </nuxt-link>
        <p
          class="txt-crumb"
          :style="`color: ${settingByTemplate9[0].productListFilter.breadcrumbs};`"
        >
          /
        </p>
        <p
          class="txt-crumb s2"
          :style="`color: ${settingByTemplate9[0].productListFilter.breadcrumbs};`"
        >
          {{ $t('header_productos') }}
        </p>
      </div>
    </div>
    <div
      class="content-shop-items"
      :style="[
        {
          '--font-style-1':
            this.settingByTemplate9[0]?.settingGeneral?.fount_1 ?? 'Poppins',
        },
        {
          '--font-style-2':
            this.settingByTemplate9[0]?.settingGeneral?.fount_2 ?? 'Roboto',
        },
      ]"
    >
      <div class="content-right">
        <div class="content-banner-shop-r">
          <div class="crumb">
            <nuxt-link to="/">
              <p
                class="txt-crumb s1"
                :style="`color: ${settingByTemplate9[0].productListFilter.breadcrumbs};`"
              >
                {{ $t('header_inicio') }}
              </p>
            </nuxt-link>
            <p
              class="txt-crumb"
              :style="`color: ${settingByTemplate9[0].productListFilter.breadcrumbs};`"
            >
              /
            </p>
            <p
              class="txt-crumb s2"
              :style="`color: ${settingByTemplate9[0].productListFilter.breadcrumbs};`"
            >
              {{ $t('header_productos') }}
            </p>
          </div>
        </div>

        <div class="producto-items-content" id="section">
          <div class="content-item">
            <div class="content-item-productos">
              <div class="product-conten-items" id="grid-selection">
                <div
                  v-for="product in producthoko.data"
                  :key="product.id"
                  class="content-products"
                >
                  <KoProdcutCardFilter
                    :settingGeneral="settingByTemplate9[0].settingGeneral"
                    :productListCard="settingByTemplate9[0].cardProduct"
                    :product="product"
                    class="product-nolist"
                  />
                </div>
              </div>
              <div v-if="producthoko.total == 0" class="content-products-empty">
                <p class="txt-products-empty">{{ $t('home_msgCatalogo') }}</p>
              </div>
              <div class="pagination-medium">
                <div class="product_pagination" v-if="producthoko.total > 10">
                  <el-pagination
                    background
                    layout="prev, pager, next"
                    :hide-on-single-page="true"
                    :page-count="producthoko.last_page"
                    @current-change="currentChange"
                    :current-page="currentPage"
                    class="pagination"
                  ></el-pagination>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import KoProdcutCardFilter from './_productcard/ProductCardHoko.vue'
import KoProdcutCardFilerList from './_productcard/ProductCardFilterList'
export default {
  components: {
    KoProdcutCardFilter,
    KoProdcutCardFilerList,
  },
  props: {
    dataStore: Object,
    settingByTemplate9: Array,
  },
  name: 'Ko-ProductList-Filter-hoko',
  mounted() {
    if (this.previousPage) {
      this.currentPage = this.previousPage
    }
    this.currentChange(1)
  },
  data() {
    return {
      currentPage: 1,
    }
  },
  computed: {
    previousPage() {
      return this.$store.state.previousPage
    },
    producthoko() {
      return this.$store.state.producthoko
    },
  },
  methods: {
    currentChange(page) {
      this.$store.dispatch('GET_PRODUCTSHOKO', page)
      this.currentPage = page
    },
  },
  watch: {
    currentPage() {
      this.$store.commit('SET_PREVIOUS_PAGE', this.currentPage)
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
    previousPage() {
      if (this.previousPage) {
        this.currentPage = this.previousPage
      }
    },
  },
}
</script>

<style scoped>
.product-content {
  background: var(--background_color_1);
  padding-top: 20px;
  @apply flex flex-col justify-center items-center w-full pb-40;
}
.content-banner-shop {
  @apply w-full flex flex-col;
}
.content-banner-shop-r {
  @apply w-full flex flex-col justify-start items-start;
}
.itemLeft-range-slide {
  @apply w-full flex justify-center items-center;
  margin-bottom: 20px;
}
.content-input-slide {
  @apply w-full flex flex-col justify-center items-center;
}
.input-slide {
  @apply w-full cursor-pointer border-none;
  height: 30px;
  /* border-bottom: 2px solid #2c2930; */
}
.txt-tittles {
  color: var(--color_text);
  @apply w-full flex justify-start items-center;
  font-weight: 600;
  font-size: 20px;
  letter-spacing: 0px;
  transition: all 0.25s ease;
  /* font-family: 'Poppins', Helvetica, Arial, sans-serif !important; */
  font-family: var(--font-style-1);
  cursor: pointer;
}
.item-tittle {
  @apply w-full flex justify-start items-center;
}
.empty {
  @apply w-full;
  margin-bottom: 30px;
  border-bottom: 1px solid;
  border-color: var(--color_icon);
}
.content-items-categorias {
  @apply w-full flex flex-row justify-between items-center;
}
.content-items-categorias-text {
  @apply w-full flex flex-row;
}
.top-content {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 20px;
  max-width: 100%;
  width: 100%;
  font-size: 100%;
}
.categorys-list {
  @apply w-full grid grid-cols-1 gap-4 justify-start items-center;
  overflow: auto;
  max-height: 300px;
}
.subcategory-list {
  @apply w-full grid grid-cols-1 gap-4 justify-start items-center;
  overflow: auto;
  max-height: 300px;
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
.container::-webkit-scrollbar-track {
  background: #323232;
  border-radius: 4px;
}
.subcategory-list::-webkit-scrollbar {
  width: 3px;
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
.content-category-left {
  @apply w-full flex flex-col justify-start items-center;
}
.txt-categorys {
  color: var(--color_subtext);
  @apply w-full flex flex-row justify-start items-center pr-1;
  font-size: 15px;
  line-height: 1.3;
  font-weight: 400;
  /* font-family: 'Roboto', Helvetica, Arial, sans-serif !important ; */
  font-family: var(--font-style-2);
  transition: all 0.25s ease;
  cursor: pointer;
}
.txt-categorys-active {
  color: #000;
  @apply w-full flex flex-row justify-start items-center pr-1;
  font-size: 14px;
  transition: all 0.25s ease;
  cursor: pointer;
  font-weight: bold;
}
.show-view-per-list {
  @apply w-auto justify-center items-center;
}
.show {
  @apply w-full cursor-pointer mt-16;
}
.show-icon {
  fill: var(--color_icon);
  @apply p-12;
}
.show-icon-active {
  fill: var(--color_text);
  /* background-color: #f8f8f8; */
}
.show-icon:hover {
  fill: #000;
  background-color: #f8f8f8;
}
.show:focus .show-icon {
  fill: #000;
}
.items-end {
  @apply w-full flex flex-row justify-start items-center;
}
.tittle-banner-shop {
  @apply w-full flex;
}
.btn-tittle-shop {
  color: var(--color_text);
  /* font-family: 'Poppins', sans-serif; */
  font-family: var(--font-style-1);
  font-weight: 700;
  letter-spacing: 1px;
  line-height: 1.1;
}
.txt-categorys:hover {
  color: #050505;
}
.product-text {
  @apply flex flex-col justify-center items-center w-full;
}
.product-tittle,
.product-subtittle,
.product-description {
  @apply justify-center items-center text-center gap-4;
}

.product-conten-items {
  @apply gap-4;
}
.producto-items-content {
  @apply w-full;
}
.content-item {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-bottom: 40px;
}
.content-item-productos {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.grid-products {
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, minmax(250px, 2fr));
  grid-column-gap: 25px;
  grid-row-gap: 30px;
  box-sizing: border-box;
}
.content-products {
  border-bottom: 0.5px solid var(--color_icon);
  width: 100%;
  justify-content: flex-start;
  align-items: flex-start;
}
.content-products-empty {
  width: 100%;
  min-height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.txt-products-empty {
  @apply mt-6;
  font-size: 20px;
  color: #3f3f3f;
  font-weight: 600;
  /* font-family: 'David Libre' !important; */
  font-family: var(--font-style-2);
}
.pagination-medium {
  margin-top: 50px;
  background: transparent;
}
.pagination {
  font-size: 18px;
  color: var(--pagination_color);
  background: transparent;
}
.product_pagination >>> .el-pagination.is-background .btn-next {
  color: var(--pagination_color);
  background-color: transparent;
}
.product_pagination >>> .el-pagination.is-background .btn-prev {
  color: var(--pagination_color);
  background-color: transparent;
}
.product_pagination >>> .el-pagination.is-background .el-pager li {
  color: var(--pagination_color);
  background-color: transparent;
}
.product_pagination >>> .el-pagination.is-background .btn-next:hover {
  color: var(--color_icon);
}
.product_pagination >>> .el-pagination.is-background .btn-prev:hover {
  color: var(--color_icon);
}
.product_pagination
  >>> .el-pagination.is-background
  .el-pager
  li:not(.disabled):hover {
  color: var(--color_icon);
}
.product_pagination
  >>> .el-pagination.is-background
  .el-pager
  li:not(.disabled).active {
  background-color: var(--color_icon);
  color: white;
}
.crumb {
  @apply w-full flex flex-row justify-start items-start;
}
.txt-crumb {
  font-family: Arial, sans-serif;
  font-size: 12px;
  line-height: 14px;
  padding-right: 6px;
  cursor: pointer;
  transition: all 0.25s ease;
}
.s1:hover {
  background-color: #2c2930;
  color: #fff;
  transition: all 0.25s ease;
}
.s2:hover {
  background-color: #2c2930;
  color: #fff;
  transition: all 0.25s ease;
}
.accordion {
  cursor: pointer;
  margin-bottom: 0px;
  width: 100%;
  font-size: 20px;
  border: none;
  text-align: left;
  outline: none;
  transition: 0.4s;
  margin-bottom: 0px;
}
.accordion:after {
  content: '\002B';
  color: var(--color_icon);
  font-weight: bold;
  float: right;
  /* margin-left: 5px; */
}
.active:after {
  content: '\2212';
}
.panel {
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 0 18px;
  background-color: transparent;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s ease-out;
}
.content-left {
  position: sticky;
  top: 130px;
  transition: all 0.25s ease;
}
@screen sm {
  .product-conten-items {
    @apply w-full grid grid-cols-2;
  }
  .btn-tittle-shop {
    font-size: 36px;
  }
  .content-shop-items {
    @apply w-9/5 flex flex-row justify-start items-start;
  }
  .content-left {
    display: none;
  }
  .content-right {
    @apply w-full;
  }
  .top-content {
    @apply hidden;
  }
  .content-items-categorias-text {
    @apply justify-center items-center;
  }
  .content-banner-shop {
    @apply justify-start items-start my-32;
    padding-left: 20px;
  }
  .tittle-banner-shop {
    @apply justify-start items-start;
    padding-top: 6px;
  }
  .content-banner-shop-r {
    @apply hidden;
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
}
@screen lg {
  .product-text {
    @apply w-full;
  }
  .product-conten-items {
    @apply grid grid-cols-3;
  }
  .content-items-categorias-text {
    @apply justify-start items-center;
  }
  .items-end {
    @apply flex;
  }
  .show-number-items {
    @apply w-full flex justify-end items-center;
  }
  .show-view-per-list {
    @apply w-auto grid grid-cols-2 gap-0 justify-center items-center;
  }
  .btn-tittle-shop {
    font-size: 48px;
  }
  .top-content {
    display: flex;
    border-bottom: 1px solid var(--color_icon);
    padding-top: 0px;
    padding-bottom: 5px;
  }
  .content-left {
    @apply mr-70 flex flex-col justify-between items-start;
    width: 15vw;
  }
  .content-banner-shop {
    @apply hidden;
  }
  .content-banner-shop-r {
    @apply flex;
  }
  .content-shop-items {
    @apply flex flex-row justify-start items-start mt-40;
    width: 95vw;
  }
}
@media (min-width: 3000px) {
  .content-shop-items {
    width: 98vw;
  }
  .content-left {
    width: 10vw;
  }
}
</style>
