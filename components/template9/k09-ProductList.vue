<template>
  <div
    v-if="listProducts.length > 0"
    class="product-content"
    :style="[productList, settingGeneral]"
  >
    <div
      class="producto-items-content"
      :style="[
        {
          '--font-style-1': settingGeneral.fount_1 ?? 'Poppins',
        },
        {
          '--font-style-2': settingGeneral.fount_2 ?? 'Roboto',
        },
      ]"
    >
      <div class="product-text">
        <span class="tittle">
          {{ productList.title.replace(/&nbsp;/g, ' ') }}
        </span>
      </div>
      <div class="mb-40 flex w-full flex-row items-center justify-center">
        <div class="flex w-full flex-col items-center justify-center">
          <div class="product-content-items">
            <div
              v-for="product in listProducts"
              :key="product.id"
              class="h-full"
            >
              <KoProductCard
                :product="product"
                :setting-card-products="productListCard"
                :setting-general="settingGeneral"
              />
            </div>
          </div>
          <nuxt-link to="/productos" class="btn-products">
            {{ $t('home_allproducts') }}
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Ko09ProductList',
  components: {
    KoProductCard: () => import('./_productcard/ProductCard.vue'),
  },
  props: {
    dataStore: {
      type: Object,
      required: true,
    },
    productList: {
      type: Object,
      required: true,
    },
    settingGeneral: {
      type: Object,
      required: true,
    },
    productListCard: {
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
    var el = document.querySelector('.tittle')
    el.innerHTML = el.innerHTML.replace(/&nbsp;/g, ' ')
  },
  methods: {
    async currentChange() {
      const { success, data } = await this.$store.dispatch(
        'products/GET_ALL_PRODUCTS',
        {
          id_tienda: this.dataStore.id,
          limit: 8,
          page: 1,
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
.product-content {
  background: var(--background_color_1);
  @apply flex w-full flex-col items-center justify-center pt-70;
}
.producto-items-content {
  @apply flex w-full flex-col items-center justify-center text-center;
}
.product-content-items {
  @apply flex h-full flex-col items-start justify-start;
}
.product-text {
  max-width: 470px;
  @apply mb-30 w-full text-center;
}
.tittle {
  /* font-family: 'Poppins', Helvetica, Arial, sans-serif !important; */
  font-family: var(--font-style-1);
  color: var(--color_title);
  font-weight: 700;
}
.btn-products {
  border: 2px solid var(--color_background_btn);
  color: var(--color_text_btn);
  letter-spacing: 1px;
  transition: all 150ms ease-in;
  font-family: var(--font-style-2);
  border-radius: var(--radius_btn);
  @apply mt-60 px-8 py-5 text-15 font-extrabold;
}
.btn-products:hover {
  color: #fff;
  background-color: #2c2930;
  transition: all 150ms ease-in;
}
@screen sm {
  .product-content-items {
    @apply grid grid-cols-2 gap-4;
    width: 95%;
  }
  .tittle {
    line-height: 34px;
    font-size: 30px;
  }
}
@media (min-width: 500px) {
  .product-content-items {
    @apply grid w-9/0 grid-cols-2;
  }
}
@screen lg {
  .product-content-items {
    @apply grid grid-cols-3;
  }
}
@media (min-width: 1000px) {
  .product-content-items {
    width: 95%;
  }
}
@media (min-width: 1160px) {
  .product-content-items {
    width: 95vw;
    @apply grid grid-cols-4;
  }
}
@screen xml {
  .tittle {
    line-height: 34px;
    font-size: 36px;
  }
}
@screen xxl {
  .product-content-items {
    @apply gap-10;
  }
}
@media (max-width: 460px) {
  .product-text {
    width: 90%;
    /* height: auto; */
    /* word-wrap: break-word; */
    /* overflow: hidden; */
  }
}
</style>
