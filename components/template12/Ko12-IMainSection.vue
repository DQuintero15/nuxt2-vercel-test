<template>
  <main
    class="w-full flex justify-center items-center"
    :style="`background:${settingByTemplate12.backgroundColor};`"
  >
    <div
      v-if="listProducts?.length > 0"
      class="pt-20 w-full max-w-[940px] px-0 md:px-10"
    >
      <div
        v-for="category in categorias"
        v-show="categorias"
        :key="category.id"
        class="pt-4 pb-4"
      >
        <template
          v-if="
            getProductsCategories(category.nombreCategoriaProducto).length >
              0 ||
            getProductosSinSubcategories(category.nombreCategoriaProducto)
              .length > 0
          "
        >
          <h2
            class="text-center font-semibold mb-20 text-2xl md:text-4xl uppercase"
            :style="`color:${settingByTemplate12.titleColor};`"
          >
            {{ category.nombreCategoriaProducto }}
          </h2>
          <div
            v-for="subcategories in getSubcategorias(category.id)"
            :key="subcategories.id"
          >
            <template v-if="getProductos(subcategories.id).length > 0">
              <div class="w-full m-auto pt-30 px-10 pb-20">
                <h3
                  class="text-22 font-semibold uppercase mb-20"
                  :style="`color:${settingByTemplate12.titleColor};`"
                >
                  {{ subcategories.nombreSubcategoria }}
                </h3>
              </div>
              <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
                <div
                  v-for="producto in getProductos(subcategories.id)"
                  :key="producto.id"
                  @click="OpenModalProductDetails(producto)"
                >
                  <ProductCard
                    :product="producto"
                    :data-store="dataStore"
                    :setting-by-template12="settingByTemplate12"
                  />
                </div>
              </div>
            </template>
          </div>
          <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
            <div
              v-for="producto in getProductosSinSubcategories(
                category.nombreCategoriaProducto
              )"
              :key="producto.id"
              @click="OpenModalProductDetails(producto)"
            >
              <ProductCard
                :product="producto"
                :data-store="dataStore"
                :setting-by-template12="settingByTemplate12"
              />
            </div>
          </div>
        </template>
      </div>
      <div class="w-full py-10"></div>
      <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
        <div
          v-for="producto in getProductosSinCategory"
          :key="producto.id"
          @click="OpenModalProductDetails(producto)"
        >
          <ProductCard
            :product="producto"
            :data-store="dataStore"
            :setting-by-template12="settingByTemplate12"
          />
        </div>
      </div>
      <div v-if="showModal" class="modal">
        <K012-productDetail
          :data-store="dataStore"
          :temp-data="tempData"
          :setting-by-template12="settingByTemplate12"
        />
      </div>
      <hr class="h-20 bg-transparent border-transparent" />
      <hr class="border-transparent divider border-0" />
    </div>
    <div v-else class="pt-20 w-full max-w-[940px]">
      <div v-for="(content, index) in 2" :key="index" class="w-full mb-20">
        <div class="w-full flex flex-col justify-center items-center p-4">
          <div class="w-full max-w-[200px]">
            <div class="w-full h-35 bg-gray-200 animate-pulse mb-20"></div>
          </div>
        </div>
        <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-5">
          <div v-for="(items, index2) in 10" :key="index2" class="w-full">
            <div class="w-full h-70 bg-gray-200 animate-pulse mt-8 pb-3"></div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
// import settingsProps from './mixins/ComponentProps'
import filterProducts from '@/mixins/filterProducts'
export default {
  name: 'Ko12IMainSection',
  components: {
    ProductCard: () => import('./ProductCard'),
    K012ProductDetail: () => import('./K012-ProductDetail.vue'),
  },
  mixins: [filterProducts],
  props: {
    settingByTemplate12: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      listProducts: [],
      section: {
        title: 'MEAT & FIRST DISHES',
        subtitle: 'Slow cook meals and fresh fishes',
      },
      tempData: {},
    }
  },
  computed: {
    showModal() {
      return this.$store.state.modalproductDetails
    },
    getProductosSinCategory() {
      return this.listProducts.filter(
        (producto) => producto.categoria === 'Sin categoría'
      )
    },
  },
  mounted() {
    this.currentChange()
    this.sendAnalyticsStore()
  },
  methods: {
    OpenModalProductDetails(value) {
      this.tempData = value
      this.$store.state.modalproductDetails = true
    },
    getSubcategorias(categoryId) {
      return this.subcategories.filter(
        (subcategoria) => subcategoria.categoria === categoryId
      )
    },
    getProductos(subcategoriesId) {
      return this.listProducts.filter(
        (producto) => producto.subcategoria === subcategoriesId
      )
    },
    getProductosSinSubcategories(categoryId) {
      return this.listProducts.filter(
        (producto) =>
          producto.categoria === categoryId && !producto.subcategoria
      )
    },

    getProductsCategories(categoryName) {
      return this.listProducts.filter(
        (producto) => producto.categoria === categoryName
      )
    },
    async currentChange() {
      const { success, data } = await this.$store.dispatch(
        'products/GET_ALL_PRODUCTS',
        {
          id_tienda: this.dataStore.id,
          limit: 50,
          page: 1,
          topSales: 1,
        }
      )
      if (success) {
        this.listProducts = data.publicProductList
      }
    },
    async sendAnalyticsStore() {
      await this.$store.dispatch('SEND_ANALYTICS_STORE', {
        storeId: this.dataStore.id,
        event: 'VISITED_PRODUCTS_PAGE',
      })
    },
  },
}
</script>

<style scoped>
.divider {
  background-image: url('~/assets/img/gradient-line.png');
  background-position: center;
  background-size: contain;
  height: 3px;
  width: 25%;
  margin: 0 auto;
}
.modal {
  padding-top: 200px;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
  @apply w-full h-full fixed z-10 left-0 top-0 overflow-auto;
}

@media (max-width: 500px) {
  .modal {
    padding-top: 80px;
  }
}
</style>
