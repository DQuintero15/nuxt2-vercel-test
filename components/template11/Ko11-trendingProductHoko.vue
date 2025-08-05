<template>
  <div
    class="product-content"
    :style="[
      settingKtrending,
      settingGeneral,
      {
        '--font-style-1': settingGeneral?.fount_1 ?? 'Roboto',
      },
    ]"
  >
    <div class="producto-items-content">
      <div class="product-text">
        <div class="product-tittle">
          <p class="tittle">{{ $t('home_productos_hoko') }}</p>
        </div>
      </div>
      <div v-swiper:mySwiper="swiperOption" ref="mySwiper">
        <div class="swiper-wrapper pb-10">
          <div
            v-for="product in producthoko.data"
            :key="product.id"
            class="swiper-slide"
            style="margin-right: 40px; height: auto"
          >
            <KoproductCard
              :product="product"
              :settingCardProduct="settingCardProduct"
              :settingGeneral="settingGeneral"
              class="gifyload"
            />
          </div>
        </div>
        <div
          v-if="producthoko.total == 0"
          class="w-full flex justify-center items-center text-center mb-20"
        >
          <p>{{ $t('home_msgCatalogo') }}</p>
        </div>
        <div class="btn-products">
          <nuxt-link to="/productosHoko">
            <p class="btn">Ver todos los productos</p>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import KoproductCard from './_productcard/ProductCardHoko.vue'
export default {
  name: 'Ko11TrendingProductHoko',
  components: {
    KoproductCard,
  },
  props: {
    dataStore: Object,
    settingKtrending: Object,
    settingGeneral: Object,
    settingCardProduct: Object,
  },
  mounted() {
    this.currentChange(1)
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: '',
        spaceBetween: '',
        autoplay: {
          delay: 400000000,
          disableOnInteraction: false,
        },
        breakpoints: {
          10000: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          425: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
        },
      },
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    },
    producthoko() {
      return this.$store.state.producthoko
    },
  },
  methods: {
    currentChange(page) {
      this.$store.dispatch('GET_PRODUCTSHOKO', page)
    },
  },
}
</script>

<style scoped>
/* .gifyload:hover {
  @apply shadow-lg;
} */
.btn-products {
  @apply w-full flex justify-center items-center;
}
.btn {
  margin-bottom: 10px;
  border: 1px solid var(--color_title);
  padding: 8px 15px;
  color: var(--color_title);
  font-size: 16px;
  font-family: var(--font-style-1);
  @apply mr-20 px-8 font-semibold leading-20 transition-all ease-in duration-0.2;
}
.btn:hover {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
  @apply transition-all ease-in duration-0.2;
}
.product-content {
  background: var(--background_color_1);
  @apply flex flex-col justify-center items-center w-full pb-40;
}
.product-text {
  @apply flex flex-col justify-center items-center w-full text-center;
}
.product-tittle,
.tittle {
  @apply flex flex-col justify-center items-center text-center;
}
@screen sm {
  .producto-items-content {
    @apply w-9/0;
  }
  .tittle {
    color: var(--color_title);
    font-size: 20px;
    font-family: var(--font-style-1);
    font-weight: var(--fontWeight);
    @apply tracking-0;
  }
  .product-text {
    margin-bottom: var(--marginbottomTitle);
  }
}
@screen md {
  .producto-items-content {
    @apply w-9/5;
  }
  .tittle {
    font-size: var(--fontSize);
  }
}
@screen lg {
  .product-text {
    @apply w-full;
  }
}
@media (min-width: 1200px) {
  .producto-items-content {
    width: 1200px;
  }
  .tittle {
    font-size: var(--fontSize);
    @apply pb-10 leading-50;
  }
}
</style>
