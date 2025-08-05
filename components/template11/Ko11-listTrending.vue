<template>
  <div
    v-if="listProducts.length > 0"
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
      <div ref="mySwiper" v-swiper:mySwiper="swiperOption">
        <div class="swiper-wrapper pb-10">
          <div
            v-for="product in listProducts"
            :key="product.id"
            class="swiper-slide h-full"
            style="margin-right: 40px; height: auto"
          >
            <KoProductCard
              :product="product"
              :setting-card-products="settingCardProduct"
              :setting-general="settingGeneral"
              class="gifyload h-full"
            />
          </div>
        </div>
        <div class="btn-products">
          <nuxt-link to="/productos" class="btn">
            <p>Ver todos los productos</p>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Ko11ListTrending',
  components: {
    KoProductCard: () => import('./_productcard/ProductCard'),
  },
  props: {
    dataStore: {
      type: Object,
      required: true,
    },
    settingKtrending: {
      type: Object,
      required: true,
    },
    settingGeneral: {
      type: Object,
      required: true,
    },
    settingCardProduct: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      listProducts: [],
      swiperOption: {
        direction: 'horizontal',
        // pagination: {
        //   el: '.swiper-pagination',
        // },
        setWrapperSize: true,
        paginationClickable: true,
        slidesPerView: 4,
        spaceBetween: 22,
        grabCursor: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        breakpoints: {
          1440: {
            slidesPerView: 4,
            spaceBetween: 22,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          425: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          375: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          320: {
            slidesPerView: 1,
            spaceBetween: 5,
          },
        },
        // navigation: {
        //   nextEl: '.next',
        //   prevEl: '.prev',
        // },
      },
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    },
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
          promotion: 1,
          // topSales: 1,
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
  @apply flex flex-col justify-center items-center w-full pb-20 pt-50;
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
