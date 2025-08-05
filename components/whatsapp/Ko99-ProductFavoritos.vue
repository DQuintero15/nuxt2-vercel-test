<template>
  <div
    v-if="listProducts.length"
    class="relative w-full max-w-[900px] h-full flex flex-col bg-white-white justify-center items-center box-border transition duration-200 ease-in-out"
  >
    <div
      class="w-full flex justify-start items-center px-10 pb-20 md:px-20 md:pb-30"
    >
      <p class="text-[#4c4c4c] font-bold text-16 md:text-18">
        {{ $t('home_destacados') }}
      </p>
    </div>
    <div
      ref="mySwiper"
      v-swiper:mySwiper="swiperOption"
      class="max-w-9/5 w-full pb-10"
    >
      <div class="swiper-wrapper w-full">
        <div
          v-for="product in listProducts"
          :key="product.id"
          class="swiper-slide w-full"
          :class="
            settingByTemplate?.estilo_productos === 2 ? 'max-w-[269px]' : ''
          "
        >
          <component
            :is="indexList"
            :product="product"
            :data-store="dataStore"
            class="w-full h-full"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'KoProductFavoritosWa',
  components: {
    KoProductCard1: () => import('./product-card/Ko99-product-card-1.vue'),
    KoProductCard2: () => import('./product-card/ko99-product-card.vue'),
    KoProductCard3: () => import('./product-card/Ko99-product-card-3.vue'),
  },
  props: {
    dataStore: {
      type: Object,
      required: true,
    },
    settingByTemplate: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      listProducts: [],
      swiperOption: {
        direction: 'horizontal',
        setWrapperSize: true,
        paginationClickable: true,
        slidesPerView: 3,
        spaceBetween: 20,
        grabCursor: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        breakpoints: {
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
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
    indexList() {
      let componentTemplate = ''
      if (this.settingByTemplate?.estilo_productos) {
        switch (this.settingByTemplate.estilo_productos) {
          case 3:
            componentTemplate = 'KoProductCard1'
            break
          case 2:
            componentTemplate = 'KoProductCard2'
            break
          case 1:
            componentTemplate = 'KoProductCard3'
            break
        }
      } else {
        return (componentTemplate = 'KoProductCard2')
      }
      return componentTemplate
    },
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
.container-favorite::-webkit-scrollbar {
  @apply w-5;
}
.container-favorite::-webkit-scrollbar-thumb {
  margin-top: 5px;
  background: #a3a3a3;
  border-radius: 4px;
}
.container-favorite::-webkit-scrollbar-thumb:active {
  margin-top: 5px;
  background-color: #777777;
}
.container-favorite::-webkit-scrollbar-thumb:hover {
  margin-top: 5px;
  background: #686868;
  box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.401);
}
</style>
