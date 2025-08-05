<template>
  <div
    v-if="listProducts.length > 0"
    class="w-full flex justify-center items-center py-40 mt-10 lg:mt-0 lg:py-40 px-10"
    :style="`background-color: ${listProductsHome['--background_color_1']}`"
  >
    <div
      class="w-full max-w-9/5 md:max-w-9/0 h-auto relative flex flex-col items-center justify-center overflow-hidden"
    >
      <p
        class="w-full text-center mb-25 text-25 md:text-30 lg:text-40"
        :style="`color: ${listProductsHome.color_title_1}; font-weight: ${listProductsHome.fontWeighTitle};`"
      >
        {{ listProductsHome.title }}
      </p>
      <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
        <div v-for="(product, index) in listProducts" :key="index">
          <KoProductCard
            :product="product"
            :setting-card-products="cardProducts"
            :setting-general="settingGeneral"
            class="w-full"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Ko15ProductListHome',
  components: {
    KoProductCard: () => import('./_cardProduct/ProductCard'),
  },
  props: {
    listProductsHome: {
      type: Object,
      required: true,
    },
    settingGeneral: {
      type: Object,
      required: true,
    },
    cardProducts: {
      type: Object,
      required: true,
    },
    dataStore: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      listProducts: [],
    }
  },
  mounted() {
    this.currentChange()
  },
  methods: {
    async currentChange() {
      const { success, data } = await this.$store.dispatch(
        'products/GET_ALL_PRODUCTS',
        {
          id_tienda: this.dataStore.id,
          limit: 8,
          page: 1,
          topSales: 1,
        }
      )
      if (success) {
        this.listProducts = data.publicProductList
      }
    },
  },
}
</script>
