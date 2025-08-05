<template>
  <div ref="mySwiper" v-swiper:mySwiper="swiperOption" class="w-full relative">
    <div class="swiper-wrapper w-full">
      <div
        v-for="(product, index) in products"
        :key="index"
        class="swiper-slide w-full"
      >
        <KoProductCard
          :product="product"
          :card-products="cardProducts"
          :setting-general="settingsGeneral"
          class="w-full"
        />
      </div>
    </div>
    <div v-if="products.length > 1" class="prev btnPrev">
      <FlechaLeft-icon class="btn-icon" />
    </div>
    <div v-if="products.length > 1" class="next btnNext">
      <FlechaRight-icon class="btn-icon" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductSlide14',
  components: {
    KoProductCard: () => import('../_cardProduct/ProductCard'),
  },
  props: { products: {}, settingsGeneral: Object, cardProducts: Object },
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
        spaceBetween: 26,
        grabCursor: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        breakpoints: {
          990: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          790: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          770: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          375: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
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
  methods: {
    changeSlide() {
      this.swiper.slidePrev(700, false)
    },
  },
}
</script>

<style scoped>
.btnPrev {
  position: absolute;
  z-index: 10;
  left: 0;
  border-radius: 25px;
  padding: 0px 22px;
  background: black;
  cursor: pointer;
}
.btnNext {
  position: absolute;
  z-index: 10;
  right: 0;
  border-radius: 25px;
  padding: 0px 22px;
  background: black;
  cursor: pointer;
}
.btn-icon {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 45px;
  color: white;
  bottom: 0.125em;
}
.btn-icon:hover {
  color: grey;
}
</style>
