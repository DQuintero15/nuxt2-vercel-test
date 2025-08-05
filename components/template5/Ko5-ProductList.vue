<template>
  <div class="wrapper-productlist">
    <div class="container-productlist">
      <div class="content-items-categorias-text">
        <button class="text-categorias" @click="clearFilters">Catálogo</button>
        <button
          v-if="nameCategory"
          class="text-categorias-select"
          @click="breadcrumbsClear(1)"
        >
          <span class="font-normal pr-4">/</span>{{ nameCategory }}
        </button>
        <button
          v-if="nameSubCategory"
          class="text-categorias-select"
          @click="breadcrumbsClear(2)"
        >
          <span class="font-normal pr-4">/</span>{{ nameSubCategory }}
        </button>
      </div>
      <div class="content-item">
        <div class="wrapper-filter">
          <div class="content-sticky">
            <div
              v-for="category in categorias"
              :key="category.id"
              class="content-categoria"
            >
              <BaseAccordion>
                <template v-slot:categorias>
                  <p
                    class="text-categoria"
                    :class="
                      category.nombreCategoriaProducto == filters.category
                        ? 'txt-categorys-active'
                        : ''
                    "
                    @click="sendCategory(category)"
                  >
                    {{ category.nombreCategoriaProducto }}
                  </p>
                </template>
                <template v-slot:subcategorias>
                  <div
                    v-for="(subcategory, key) in selectedSubcategories"
                    v-show="selectedSubcategories?.length"
                    :key="key"
                  >
                    <p
                      v-if="subcategory.categoria == categoria.id"
                      class="text-subcategoria"
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
                </template>
              </BaseAccordion>
            </div>
          </div>
        </div>
        <div class="content-item-productos">
          <div class="grid-products">
            <div
              v-for="product in listProducts"
              :key="product.id"
              class="content-products"
            >
              <KoProductCard1 :product="product" />
            </div>
          </div>
          <div v-if="listProducts.length == 0" class="content-products-empty">
            <p>No se encontraron productos relacionados.</p>
          </div>
          <div
            v-if="totalProducts > filters.limit"
            class="mt-50 bg-transparent text-18 product_pagination"
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
  name: 'Ko5ProductList',
  components: {
    BaseAccordion: () => import('../headers/_lateralMenu/_AccordionList.vue'),
    KoProductCard1: () => import('./_productcard/Ko-ProductCard-1.vue'),
  },
  mixins: [mobileCheck, filters],
  props: {
    dataStore: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped>
.text-macrobrand {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 0px;
  margin-bottom: 30px;
}

.text-macrobrand > p {
  padding: 5px 20px;
  font-size: 20px;
  text-align: center;
  color: var(--color_text);
  font-weight: bold;
}
.wrapper-productlist {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--background_color_2);
  box-sizing: border-box;
  padding-top: 20px;
}
.container-productlist {
  width: 100%;
  max-width: 1300px;
  padding: 40px 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.content-sticky {
  width: 100%;
  position: sticky;
  top: 118px;
}
.content-item {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
}
.content-item > div:nth-child(1) {
  max-width: 300px;
  flex: 1;
}
.content-item > div:nth-child(2) {
  flex: 2;
}
.wrapper-filter {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  list-style: none;
}
/* categorias */
.content-categoria {
  width: 100%;
  padding-right: 20px;
}
.text-categoria {
  width: 100%;
  font-size: 16px;
  color: var(--color_text);
}
.text-subcategoria {
  width: 100%;
  font-size: 16px;
  color: var(--color_subtext);
  margin-bottom: 10px;
  margin-left: 5px;
  cursor: pointer;
}
.text-categoria-active {
  color: var(--color_hover_text);
}
.text-subcategoria-active {
  color: var(--color_hover_text);
}
.content-items-categorias-text {
  display: flex;
  flex-direction: row;
  margin-bottom: 15px;
  position: sticky;
  top: 88px;
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
  margin-right: 2px;
  margin-left: 5px;
  cursor: pointer;
  opacity: 0.6;
  display: flex;
}
.content-item-productos {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
}
.grid-products {
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, minmax(250px, 2fr));
  grid-column-gap: 25px;
  grid-row-gap: 30px;
  box-sizing: border-box;
}
.content-products-empty {
  width: 100%;
  min-height: calc(100vh - 461px);
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

/* //////paginacion//////// */
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
    grid-template-columns: repeat(3, minmax(240px, 2fr));
    grid-column-gap: 15px;
    grid-row-gap: 30px;
  }
}
@media (max-width: 1265px) {
  .grid-products {
    grid-template-columns: repeat(3, minmax(240px, 2fr));
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
    grid-row-gap: 30px;
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
  .content-items-categorias-text {
    padding: 20px 10px 10px 10px;
  }
  .content-item-productos {
    padding: 0px 15px;
  }
  .grid-products {
    grid-template-columns: repeat(2, minmax(10px, 2fr));
  }
  .wrapper-filter {
    padding-left: 10px;
  }
  .content-categoria {
    padding-right: 0px;
  }
}
@media (max-width: 700px) {
  .content-items-categorias {
    margin-left: 5px;
    margin-bottom: 0px;
  }
  .wrapper-filter {
    display: none;
  }
}
@media (max-width: 450px) {
  .grid-products {
    grid-template-columns: repeat(2, minmax(160px, 1fr));
  }
  .content-item-productos {
    padding: 5px;
  }
  .text-macrobrand > p {
    font-size: 16px;
  }
  .text-macrobrand {
    margin-bottom: 10px;
  }
}
</style>
