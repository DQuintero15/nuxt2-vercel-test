<template>
  <main
    class="w-full flex justify-start items-center bg-white-white pt-5 box-border"
  >
    <div class="w-full flex flex-col justify-center px-20 pb-30">
      <div class="w-full flex flex-row justify-start items-start mb-20">
        <button class="text-categorias" @click="clearFilters">
          {{ $t('home_catalogo') }}
        </button>
        <div class="flex flex-row justify-center items-start">
          <button
            v-if="nameCategory"
            class="text-categorias"
            @click="breadcrumbsClear(1)"
          >
            <span class="font-normal pr-4">/</span>{{ nameCategory }}
          </button>
          <button
            v-if="nameSubCategory"
            class="text-categorias"
            @click="breadcrumbsClear(2)"
          >
            <span class="font-normal pr-4">/</span>{{ nameSubCategory }}
          </button>
          <p v-if="tagProduct" class="text-categorias">
            <span class="font-normal pr-4">/</span>{{ tagProduct }}
          </p>
        </div>
      </div>
      <div>
        <div class="content-item-productos">
          <div div class="grid-products">
            <div
              v-for="product in listProducts"
              :key="product.id"
              class="content-products"
            >
              <KoProductCard :product="product" :data-store="dataStore" />
            </div>
          </div>
          <div v-if="listProducts.length === 0" class="content-products-empty">
            <p>{{ $t('home_msgCatalogo') }}</p>
          </div>
          <br />
          <div class="wrapper-pagination-web">
            <div v-if="totalProducts > filters.limit" class="pagination-medium">
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
          <div
            v-if="totalProducts > filters.limit"
            class="wrapper-pagination-responsive"
          >
            <div class="pagination-medium">
              <el-pagination
                small
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
    </div>
  </main>
</template>

<script>
import filters from '@/mixins/filterProducts'
export default {
  name: 'ProductGridWa1',
  components: {
    KoProductCard: () => import('../product-card/Ko99-product-card-1.vue'),
  },
  mixins: [filters],
  props: {
    settingByTemplate: {
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
}
</script>

<style scoped>
.text-categorias {
  background: transparent;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.4;
  cursor: pointer;
  color: #4c4c4c;
  display: flex;
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
  grid-template-columns: repeat(2, minmax(250px, 2fr));
  grid-gap: 15px;
  box-sizing: border-box;
}
.content-products {
  width: 100%;
  border-radius: 10px;
}
.content-products:hover,
.content-products:focus {
  box-shadow: -6px -6px 10px var(--background_color_2),
    6px 6px 10px rgba(0, 0, 0, 0.267);
}
.content-products-empty {
  width: 100%;
  min-height: 380px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0px 20px;
}
.content-products-empty p {
  font-size: 18px;
  opacity: 0.6;
  font-weight: bold;
  color: black;
}
.pagination-medium {
  margin-top: 10px;
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
.wrapper-pagination-web {
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
}
.wrapper-pagination-responsive {
  display: none;
}
@media (max-width: 770px) {
  .container {
    padding: 0px 0px 10px 0px;
  }
  .content-item-productos {
    padding: 0px;
  }
  .text-categorias {
    padding: 0 0px;
  }
}
@media (max-width: 700px) {
  .content-items-categorias {
    /* margin-left: 10px; */
    margin-bottom: 10px;
  }
  .grid-products {
    grid-gap: 20px;
  }
}
@media (max-width: 555px) {
  .grid-products {
    grid-template-columns: repeat(1, minmax(250px, 2fr));
  }
  .wrapper-pagination-web {
    display: none;
  }
  .wrapper-pagination-responsive {
    width: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
  }
}
@media (max-width: 450px) {
  .content-item-productos {
    padding: 0px 0px 20px;
  }
}
</style>
