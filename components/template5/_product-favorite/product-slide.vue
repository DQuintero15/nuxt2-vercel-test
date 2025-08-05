<template>
  <div
    ref="mySwiper"
    v-swiper:mySwiper="swiperOption"
    class="w-full max-w-[1300px]"
  >
    <div class="swiper-wrapper w-full">
      <div
        v-for="(product, index) in products"
        :key="index"
        class="swiper-slide w-full"
      >
        <KoProductCard1 :product="product" class="h-full" />
      </div>
    </div>
    <div
      v-if="products.length > 4"
      class="absolute z-10 top-4/0 left-0 rounded-[25px] px-4 bg-black cursor-pointer prev"
    >
      <FlechaLeft-icon
        class="w-full flex justify-center items-center text-35 text-white-white hover:text-gray-400"
        style="bottom: 0.1em"
      />
    </div>
    <div
      v-if="products.length > 4"
      class="absolute z-10 top-4/0 right-0 rounded-[25px] px-4 bg-black cursor-pointer next"
    >
      <FlechaRight-icon
        class="w-full flex justify-center items-center text-35 text-white-white hover:text-gray-400"
        style="bottom: 0.1em"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Ko5ProductSlideFavorite',
  components: {
    KoProductCard1: () => import('../_productcard/Ko-ProductCard-1.vue'),
  },
  props: {
    products: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      swiperOption: {
        direction: 'horizontal',
        pagination: {
          el: '.swiper-pagination',
        },
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
        navigation: {
          nextEl: '.next',
          prevEl: '.prev',
        },
      },
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    },
  },
}
</script>
