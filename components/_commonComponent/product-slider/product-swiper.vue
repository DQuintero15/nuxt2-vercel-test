<template>
  <div
    ref="mySwiper"
    v-swiper:mySwiper="swiperOption"
    class="w-full max-w-[1300px]"
  >
    <div class="swiper-wrapper w-full">
      <div
        v-for="(product, index) in suggestedProducts"
        :key="index"
        class="swiper-slide w-full"
      >
        <component
          :is="indexTemplate"
          :product="product"
          :setting-general="settingGeneral"
          :setting-card-products="settingCardProducts"
          :data-store="dataStore"
          class="h-full"
        />
      </div>
    </div>
    <div
      v-if="suggestedProducts.length > 4"
      class="prev absolute left-0 top-4/0 z-10 cursor-pointer rounded-[25px] bg-black px-4"
    >
      <FlechaLeft-icon
        class="flex w-full items-center justify-center text-35 text-white-white hover:text-gray-400"
        style="bottom: 0.1em"
      />
    </div>
    <div
      v-if="suggestedProducts.length > 4"
      class="next absolute right-0 top-4/0 z-10 cursor-pointer rounded-[25px] bg-black px-4"
    >
      <FlechaRight-icon
        class="flex w-full items-center justify-center text-35 text-white-white hover:text-gray-400"
        style="bottom: 0.1em"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'KoSwiperSuggestionsProduct',
  components: {
    KoProductCard05: () =>
      import('@/components/template5/_productcard/Ko-ProductCard-1.vue'),
    KoProductCard07: () =>
      import('@/components/template7/_productcard/ProductCard.vue'),
    KoProductCard09: () =>
      import('@/components/template9/_productcard/ProductCard.vue'),
    KoProductCard10: () =>
      import('@/components/template10/_productcard/ProductCard.vue'),
    KoProductCard11: () =>
      import('@/components/template11/_productcard/ProductCard.vue'),
    KoProductCard13: () =>
      import('@/components/template13/_productcard/Ko13-product-card.vue'),
    KoProductCard14: () =>
      import('@/components/template14/_cardProduct/ProductCard.vue'),
    KoProductCard15: () =>
      import('@/components/template15/_cardProduct/ProductCard.vue'),
    KoProductCard16: () =>
      import('@/components/template16/_cardProduct/ProductCard.vue'),
    KoProductCard99: () =>
      import('../../whatsapp/product-card/ko99-product-card.vue'),
  },
  props: {
    suggestedProducts: {
      type: Array,
      required: true,
    },
    settingCardProducts: {
      type: Object,
      default: null,
    },
    settingGeneral: {
      type: Object,
      default: null,
    },
    settingByTemplate: {
      type: Object,
      default: null,
    },
    dataStore: {
      type: Object,
      default: null,
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
      componentMapping: {
        5: 'KoProductCard05',
        7: 'KoProductCard07',
        9: 'KoProductCard09',
        10: 'KoProductCard10',
        11: 'KoProductCard11',
        13: 'KoProductCard13',
        14: 'KoProductCard14',
        15: 'KoProductCard15',
        16: 'KoProductCard16',
        99: 'KoProductCard99',
      },
    }
  },
  computed: {
    ...mapState(['template']),
    swiper() {
      return this.$refs.mySwiper.swiper
    },
    indexTemplate() {
      let productListComponent = ''
      // eslint-disable-next-line no-prototype-builtins
      if (this.componentMapping.hasOwnProperty(this.template)) {
        productListComponent = this.componentMapping[parseInt(this.template)]
      }
      return productListComponent
    },
  },
}
</script>
