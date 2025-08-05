<template>
  <div
    v-if="producthoko && producthoko.total > 0"
    class="wrapper-ProductFavoritos"
    :style="[
      productList,
      settingGeneral,
      {
        '--font-style-1':
          settingGeneral && settingGeneral.fount_1
            ? settingGeneral.fount_1
            : 'Poppins',
      },
      {
        '--font-style-2':
          settingGeneral && settingGeneral.fount_2
            ? settingGeneral.fount_2
            : 'Roboto',
      },
    ]"
  >
    <div class="product-text">
      <p class="tittle">
        {{ $t('home_productos_hoko') }}
      </p>
    </div>
    <KoSwipper
      :products="producthoko"
      :setting-general="settingGeneral"
      :product-list-card="productListCard"
    />
    <nuxt-link to="/productosHoko">
      <button class="btn-products">
        {{ $t('home_allproducts') }}
      </button>
    </nuxt-link>
  </div>
</template>

<script>
import KoSwipper from './_productofavorito/productSlidehoko.vue'
export default {
  name: 'Ko9SliderHoko',
  components: {
    KoSwipper,
  },
  props: {
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
  computed: {
    producthoko() {
      return this.$store.state.producthoko
    },
  },
  created() {
    this.$store.dispatch('GET_PRODUCTSHOKO', 1)
  },
}
</script>

<style scoped>
.wrapper-ProductFavoritos {
  display: flex;
  width: 100%;
  /* background-color: var(--background_color_2); */
  background: var(--background_color_1);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 30px 0;
}
.swiper-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 93vw;
}
.product-text {
  max-width: 470px;
  text-align: center;
  @apply w-full mb-30;
}
.tittle {
  /* font-family: 'Poppins', Helvetica, Arial, sans-serif !important; */
  font-family: var(--font-style-1);
  color: var(--color_title);
  font-weight: 700;
}
.btn-products {
  @apply px-5;
  margin-top: 80px;
  width: auto;
  height: 45px;
  border: 2px solid var(--color_background_btn);
  color: var(--color_text_btn);
  font-size: 15px;
  font-weight: 800;
  letter-spacing: 1px;
  transition: all 150ms ease-in;
  /* font-family: 'Roboto', Helvetica, Arial, sans-serif !important; */
  font-family: var(--font-style-2);
}
.btn-products:hover {
  color: #fff;
  background-color: #2c2930;
  transition: all 150ms ease-in;
}
@media (max-width: 1300px) {
  .swiper-container {
    padding: 20px 8px;
  }
  .wrapper-ProductFavoritos {
    padding: 30px 10px;
  }
}
@media (max-width: 770px) {
  .swiper-container {
    padding: 20px 8px;
  }
}
@media (max-width: 380px) {
  .swiper-container {
    padding: 20px 5px;
  }
}
@screen sm {
  .tittle {
    line-height: 34px;
    font-size: 30px;
  }
}
@screen xml {
  .tittle {
    line-height: 34px;
    font-size: 36px;
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
