<template>
  <div
    v-if="listProducts.length > 0"
    class="product-content"
    :style="[
      settingGeneral,
      productList,
      {
        '--font-style-1': settingGeneral?.fount_1 ?? 'Roboto',
      },
    ]"
  >
    <div class="producto-items-content">
      <div class="product-text">
        <div class="product-tittle">
          <p class="tittle">{{ productList.title }}</p>
          <template v-if="isInternalUrl(productList.url_redirect)">
            <nuxt-link
              v-if="productList.visibleBtn"
              :to="productList.url_redirect ? productList.url_redirect : ''"
            >
              <p class="txt-newProducts">{{ productList.displayName }}</p>
            </nuxt-link>
          </template>
          <template v-else>
            <a
              v-if="productList.visibleBtn"
              :href="productList.url_redirect ? productList.url_redirect : ''"
              rel="noreferrer noopener"
            >
              <p class="txt-newProducts">{{ productList.displayName }}</p>
            </a>
          </template>
        </div>
      </div>
      <div v-swiper:mySwiper="swiperOption" ref="mySwiper">
        <div class="swiper-wrapper">
          <div
            v-for="product in listProducts"
            :key="product.id"
            class="swiper-slide h-full"
          >
            <KoProductCard
              :product="product"
              :setting-general="settingGeneral"
              :setting-card-products="cardProduct"
              class="gifyload h-full"
            />
          </div>
        </div>
        <div v-if="listProducts.length == 0" class="content-products-empty">
          <p>{{ $t('home_msgCatalogo') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'KKo10FeaturedProducts',
  components: {
    KoProductCard: () => import('./_productcard/ProductCard'),
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
    cardProduct: {
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
      swiperOption: {
        slidesPerView: '',
        spaceBetween: '',
        direction: 'horizontal',
        setWrapperSize: true,
        paginationClickable: true,
        grabCursor: true,
        breakpoints: {
          1024: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          768: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 30,
          },
          640: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 10,
          },
          425: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          320: {
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
  },
  mounted() {
    this.currentChange()
  },
  methods: {
    isInternalUrl(url) {
      return url.startsWith('/')
    },
    async currentChange() {
      const { success, data } = await this.$store.dispatch(
        'products/GET_ALL_PRODUCTS',
        {
          id_tienda: this.dataStore.id,
          limit: 8,
          page: 1,
          favorite: 1,
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
  @apply w-full flex flex-col justify-center items-center py-60;
}
.product-text {
  @apply w-full flex flex-col justify-start items-start;
}
.product-tittle {
  @apply w-full flex flex-row justify-between items-center text-center;
}
.tittle {
  @apply w-auto flex flex-col text-center;
}
.txt-newProducts {
  color: var(--colorTextBTn);
  box-shadow: inset 0px -50px 0px -41px var(--color_border);
  @apply w-auto h-full flex flex-row text-center font-semibold px-10 cursor-pointer transition-all ease-in duration-0.2;
}
.txt-newProducts:hover {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
  @apply transition-all ease-in duration-0.2;
}
.tittle,
.txt-newProducts {
  font-family: var(--font-style-1) !important;
}
.gifyload:hover {
  @apply shadow-lg;
}
@screen sm {
  .producto-items-content {
    @apply w-9/0;
  }
  .tittle {
    color: var(--color_title);
    font-weight: var(--fontWeightTitle);
    font-size: var(--fontSizeTitle);
    @apply justify-center items-center mb-50;
  }
  .txt-newProducts {
    @apply justify-center items-center;
  }
  .product-text {
    margin-bottom: var(--marginbottomTitle);
  }
  .product-tittle {
    @apply w-full flex flex-col justify-center items-center text-center;
  }
}
@screen md {
  .producto-items-content {
    @apply w-9/5;
  }
  /* .product-text {
    @apply mb-0;
  } */
  .product-tittle {
    @apply flex flex-row justify-between mb-60;
  }
  .tittle {
    @apply mb-0;
  }
}
@screen lg {
  .product-text {
    @apply w-full;
  }
}
@media (min-width: 1400px) {
  .producto-items-content {
    width: 1400px;
  }
  .tittle {
    @apply leading-50 mb-0;
  }
  .txt-newProducts {
    font-size: 16px;
  }
}
</style>
