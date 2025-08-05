<template>
  <div
    class="wrapper-productlist"
    :style="[
      settingByTemplate,
      {
        '--font-style':
          settingByTemplate && settingByTemplate.tipo_letra
            ? settingByTemplate.tipo_letra
            : 'Roboto',
      },
    ]"
  >
    <div class="container-productlist">
      <div class="content-title" />
      <br />
      <div class="content-items-categorias">
        <div class="content-items-categorias-text">
          <p class="text-categorias">
            {{ $t('home_catalogo_hoko') }}
          </p>
        </div>
      </div>
      <div class="content-item">
        <div v-if="producthoko" class="content-item-productos">
          <div class="grid-products">
            <div
              v-for="product in producthoko.data"
              :key="product.id"
              class="content-products"
            >
              <KoProductCard1 :product="product" />
            </div>
          </div>
          <div v-if="producthoko.total == 0" class="content-products-empty">
            <p>{{ $t('home_msgCatalogo') }}</p>
          </div>
          <div class="pagination-medium">
            <div v-if="producthoko.total > 10" class="product_pagination">
              <el-pagination
                background
                layout="prev, pager, next"
                :hide-on-single-page="true"
                :page-count="producthoko.last_page"
                :current-page="currentPage"
                class="pagination"
                @current-change="currentChange"
              />
            </div>
          </div>
        </div>
        <!-- <div v-else class="content-products-empty">
          <p>{{ $t('home_msgCatalogo') }}</p>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import KoProductCard1 from './_productcard/Ko-ProductCardHoko-1.vue'
export default {
  name: 'Ko5ProductListHomeHoko',
  components: {
    KoProductCard1,
  },
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
      search: '',
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
  mounted() {
    if (this.previousPage) {
      this.currentPage = this.previousPage
    }
    this.currentChange(1)
  },
  methods: {
    currentChange(page) {
      this.$store.dispatch('GET_PRODUCTSHOKO', page)
      this.currentPage = page
    },
  },
}
</script>

<style scoped>
.wrapper-productlist {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: var(--background_color_2);
  box-sizing: border-box;
}
.container-productlist {
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 1300px;
  padding: 0px 20px;
  flex-direction: column;
}
.content-title {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.title {
  font-size: 38px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.24;
  letter-spacing: -0.4px;
  color: var(--color_text);
  margin-bottom: 10px;
  margin-top: 10px;
}
.content-item-top {
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
}
.content-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  margin-bottom: 40px;
}
.content-item > div:nth-child(1) {
  flex: 1;
}
.content-item > div:nth-child(2) {
  flex: 2;
}
.content-filtrar {
  display: flex;
  flex-direction: row;
}
.dropbtn {
  background: transparent;
  font-size: 16px;
  font-weight: bold;
  line-height: 1.4;
  color: var(--color_subtext);
  align-self: flex-end;
  cursor: pointer;
  margin-right: 2px;
}
.content-items-categorias {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  /* height: 40px; */
}
.content-items-categorias-text {
  display: flex;
  flex-direction: row;
}
.text-categorias {
  background: transparent;
  font-size: 18px;
  font-weight: bold;
  line-height: 1.4;
  color: var(--color_subtext);
  align-self: flex-start;
  margin-right: 2px;
  cursor: pointer;
  display: flex;
}
.text-categorias-select {
  background: transparent;
  font-size: 16px;
  font-weight: bold;
  line-height: 1.4;
  color: var(--color_subtext);
  align-self: flex-start;
  margin-top: 2px;
  margin-right: 2px;
  margin-left: 5px;
  cursor: pointer;
  opacity: 0.6;
  display: flex;
}
.dropdown-content {
  display: none;
  position: absolute;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0px 8px 20px 1px rgba(0, 0, 0, 0.2);
  z-index: 2;
}
.dropdown:hover .dropdown-content {
  display: block;
}
.content-item-catalogo {
  display: flex;
  align-self: baseline;
  padding-top: 10px;
  padding-bottom: 10px;
  max-width: 205px;
  width: 100%;
  border-radius: 10px;
  background-color: var(--background_color_2);
}
.a-container {
  width: 205px;
  display: block;
  position: relative;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  color: var(--color_subtext);
  background-color: var(--background_color_2);
  -webkit-transition: all 0.2s ease;
  -moz-transition: all 0.2s ease;
  -ms-transition: all 0.2s ease;
  -o-transition: all 0.2s ease;
  transition: all 0.2s ease;
  align-items: center;
  justify-content: center;
}
.item-categoria {
  cursor: pointer;
  padding: 0px 10px 0px 20px;
  background-color: var(--background_color_2);
}
.item-categoria-active {
  background: var(--color_background_hover);
  color: var(--color_hover_text);
}

.item-categoria:hover {
  background: var(--color_background_hover);
  color: var(--color_hover_text);
}
.content-item-subcategorie {
  background: var(--color_background_hover);
  padding-right: 10px;
  padding-left: 40px;
}
.item-subcategorie {
  font-size: 13px;
  cursor: pointer;
  user-select: none;
}
.item-subcategorie-active {
  background: var(--color_background_hover);
  color: var(--color_hover_text);
}
.item-subcategorie:hover {
  background: var(--color_background_hover);
  color: var(--color_hover_text);
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
.content-products-empty {
  width: 100%;
  min-height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.content-products-empty p {
  font-size: 18px;
  opacity: 0.6;
  font-weight: bold;
  color: var(--color_subtext);
}
.top-right {
  display: none;
}
.header-icon-menu {
  font-size: 30px;
  cursor: pointer;
  color: var(--color_subtext);
}
.header-icon-close {
  font-size: 30px;
  color: rgba(21, 20, 57, 0.808);
  margin-left: 22px;
}
.top-input-search {
  position: relative;
  display: grid;
  align-content: start;
  justify-content: flex-end;
}
.top-input-search input {
  width: 100%;
  padding: 10px 35px 10px 15px;
  box-sizing: border-box;
  font-size: 14px;
  color: var(--color_subtext);
  border: solid 2px #afafaf;
  border-radius: var(--radius_btn);
  background-color: transparent;
}
.top-input-search input::placeholder {
  color: var(--color_subtext);
  opacity: 0.7;
}
.top-input-search input:focus,
.top-input-search input:active {
  border-radius: var(--radius_btn);
  border: solid 2px var(--color_border_btn);
  outline: 0;
}
.top-input-search i.icon-search {
  position: absolute;
  top: 9px;
  right: 15px;
  z-index: 2;
  color: var(--color_subtext);
  font-weight: bold;
}
.top-input-search .response {
  justify-self: start;
  padding: 0 10px;
  height: 32px;
  line-height: 30px;
  font-size: 12px;
  color: var(--color_subtext);
  border: solid 2px #d8d8d8;
  border-radius: var(--radius_btn);
  background-color: transparent;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  white-space: nowrap;
  height: 28px;
  line-height: 26px;
}
.pagination-medium {
  margin-top: 10px;
  background: transparent;
}
.pagination {
  font-size: 18px;
  color: var(--color_text);
  background: transparent;
}
.product_pagination >>> .el-pagination.is-background .btn-next {
  color: var(--color_text);
  background-color: transparent;
}
.product_pagination >>> .el-pagination.is-background .btn-prev {
  color: var(--color_text);
  background-color: transparent;
}
.product_pagination >>> .el-pagination.is-background .el-pager li {
  color: var(--color_text);
  background-color: transparent;
}
.product_pagination >>> .el-pagination.is-background .btn-next:hover {
  color: var(--btnhover);
}
.product_pagination >>> .el-pagination.is-background .btn-prev:hover {
  color: var(--btnhover);
}
.product_pagination
  >>> .el-pagination.is-background
  .el-pager
  li:not(.disabled):hover {
  color: var(--btnhover);
}
.product_pagination
  >>> .el-pagination.is-background
  .el-pager
  li:not(.disabled).active {
  background-color: var(--color_icon);
  color: white;
}
@media (max-width: 1290px) {
  .grid-products {
    grid-template-columns: repeat(4, minmax(240px, 2fr));
    grid-column-gap: 15px;
    grid-row-gap: 30px;
  }
}
@media (max-width: 1265px) {
  .grid-products {
    grid-template-columns: repeat(4, minmax(240px, 2fr));
    grid-column-gap: 10px;
    grid-row-gap: 30px;
  }
}
@media (max-width: 1250px) {
  .grid-products {
    grid-template-columns: repeat(3, minmax(250px, 2fr));
    grid-column-gap: 25px;
    grid-row-gap: 30px;
  }
}
@media (max-width: 1060px) {
  .grid-products {
    grid-template-columns: repeat(3, minmax(250px, 2fr));
    grid-column-gap: 20px;
    grid-row-gap: 30px;
  }
}
@media (max-width: 1050px) {
  .grid-products {
    grid-template-columns: repeat(3, minmax(240px, 2fr));
    grid-column-gap: 20px;
    grid-row-gap: 30px;
  }
}
@media (max-width: 1020px) {
  .grid-products {
    grid-template-columns: repeat(3, minmax(240px, 2fr));
    grid-column-gap: 15px;
    grid-row-gap: 30px;
  }
}
@media (max-width: 1010px) {
  .grid-products {
    grid-template-columns: repeat(3, minmax(240px, 2fr));
    grid-column-gap: 10px;
  }
}
@media (max-width: 1000px) {
  .grid-products {
    grid-template-columns: repeat(2, minmax(250px, 2fr));
    grid-column-gap: 25px;
    grid-row-gap: 30px;
  }
}

@media (max-width: 790px) {
  .grid-products {
    grid-template-columns: repeat(2, minmax(250px, 2fr));
    grid-column-gap: 20px;
    grid-row-gap: 30px;
  }
}
@media (max-width: 780px) {
  .grid-products {
    grid-template-columns: repeat(2, minmax(250px, 2fr));
    grid-column-gap: 16px;
    grid-row-gap: 30px;
  }
}
@media (max-width: 775px) {
  .grid-products {
    grid-template-columns: repeat(2, minmax(250px, 2fr));
    grid-column-gap: 20px;
    grid-row-gap: 20px;
  }
}

@media (max-width: 770px) {
  .container-productlist {
    padding: 0px;
  }
  .content-item-productos {
    padding: 15px;
  }
  .title {
    font-size: 25px;
    margin-top: 20px;
  }
  .grid-products {
    grid-template-columns: repeat(2, minmax(10px, 2fr));
  }
  .dropbtn {
    margin-left: 5px;
  }
  .text-categorias {
    padding: 0 10px;
  }
  .content-title {
    padding: 0px 15px;
  }
}
@media (max-width: 700px) {
  .content-items-categorias {
    margin-left: 5px;
    margin-bottom: 0px;
  }
}

@media (max-width: 450px) {
  .grid-products {
    grid-template-columns: repeat(2, minmax(160px, 1fr));
  }
  .content-item-productos {
    padding: 5px;
  }
}
</style>
