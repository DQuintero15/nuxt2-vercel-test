<template>
  <div
    ref="mySwiper"
    v-swiper:mySwiper="swiperOption"
    :style="[
      {
        '--font-style-1': settingGeneral?.fount_1 ?? 'Roboto',
      },
    ]"
  >
    <div class="swiper-wrapper z-auto">
      <a
        v-for="(item, index) in settingKbanner.values"
        :id="`slide${index + 1}`"
        :key="index"
        class="swiper-slide w-full flex justify-center items-center z-10"
        :class="item.visbleBtn ? 'pointer-events-none' : 'cursorPointer'"
        :href="`${item.visbleBtn ? '' : item.url_redirect}`"
        rel="noreferrer noopener"
      >
        <picture>
          <source
            media="(max-width: 799px)"
            :srcset="
              idCloudinaryBanner(item.url_img_background_res, 'bannerRes', 800)
            "
          />
          <source
            media="(min-width: 800px)"
            :srcset="idCloudinaryBanner(item.url_img_background, 'banner')"
          />
          <img
            v-lazy="idCloudinaryBanner(item.url_img_background, 'banner')"
            loading="lazy"
            class="w-full h-full object-cover object-center"
            alt="Banner_tienda_template11"
          />
        </picture>
        <CarouselContent
          class="absolute"
          :banner="item"
          :setting-general="settingGeneral"
        />
      </a>
    </div>
  </div>
</template>
<script>
import idCloudinaryBanner from '@/mixins/idCloudinary'

export default {
  name: 'Ko11Carousel',
  components: {
    CarouselContent: () => import('./_carouselBanner/banner-carousel.vue'),
  },
  mixins: [idCloudinaryBanner],
  props: {
    settingKbanner: {
      type: Object,
      required: true,
    },
    settingGeneral: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      swiperOption: {
        autoHeight: true,
        effect: 'fade',
        slidesPerView: 'auto',
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        autoplay: {
          delay: 6000,
          disableOnInteraction: false,
        },
      },
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    },
  },
  watch: {
    'settingKCarousel.values'() {
      this.autoplayBanner()
    },
  },
  mounted() {
    this.autoplayBanner()
  },
  methods: {
    autoplayBanner() {
      if (this.settingKCarousel && this.settingKCarousel.values.length == 1) {
        this.swiperOption.autoplay.delay = 900000000000000000
      } else {
        this.swiperOption.autoplay.delay = 6000
      }
    },
  },
}
</script>
<style scoped>
picture {
  width: 100%;
}
</style>
