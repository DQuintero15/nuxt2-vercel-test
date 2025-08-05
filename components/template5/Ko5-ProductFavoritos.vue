<template>
  <div
    v-if="listProducts.length"
    class="w-full flex justify-center items-center box-border pt-20 color-bg"
  >
    <div
      class="w-full max-w-[1300px] px-10 py-20 flex flex-col justify-center items-start"
    >
      <p class="bg-transparent text-18 font-bold p-10 color-title">
        {{ $t('home_destacados') }}
      </p>
      <KoSwiper :products="listProducts" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Ko5ProductFavoritos',
  components: {
    KoSwiper: () => import('./_product-favorite/product-slide.vue'),
  },
  props: {
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
    this.getProducts()
  },
  methods: {
    async getProducts() {
      const { success, data } = await this.$store.dispatch(
        'products/GET_ALL_PRODUCTS',
        {
          id_tienda: this.dataStore.id,
          limit: 10,
          page: 1,
          promotion: 1,
        }
      )
      if (success) {
        this.listProducts = data.publicProductList
      }
    },
  },
}
</script>

<style scoped>
.color-bg {
  background-color: var(--background_color_2);
}
.color-title {
  color: var(--color_subtext);
}
</style>
