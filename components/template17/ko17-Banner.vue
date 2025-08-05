<template>
  <div class="flex w-full items-center justify-center">
    <!-- :style="`background-color: ${banner['--background_color_1']}`" -->
    <div
      v-if="banner"
      ref="mySwiper"
      v-swiper:mySwiper="swiperOption"
      class="wrapper-banner flex w-full max-w-5xl items-center justify-center"
    >
      <!-- :style="banner" -->
      <div class="swiper-wrapper z-auto">
        <a
          v-for="(item, index) in banner.values"
          :id="`slide${index + 1}`"
          :key="index"
          :href="item.url_redirect"
          class="swiper-slide z-10 flex w-full items-center justify-center"
          rel="noreferrer noopener"
        >
          <picture>
            <source
              media="(max-width: 799px)"
              :srcset="idCloudinaryBanner(item.img_res, 'bannerRes', 800)"
            />
            <source
              media="(min-width: 800px)"
              :srcset="idCloudinaryBanner(item.img, 'banner')"
            />
            <img
              v-lazy="idCloudinaryBanner(item.img, 'banner')"
              alt="banner template16"
              class="w-full object-cover"
            />
          </picture>
        </a>
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>
<script>
import idCloudinaryBanner from '@/mixins/idCloudinary'
export default {
  name: 'Ko17Banner',
  mixins: [idCloudinaryBanner],
  props: {
    // banner: {
    //   type: Object,
    //   required: true,
    // },
    // settingGeneral: {
    //   type: Object,
    //   required: true,
    // },
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
        autoplay: {
          delay: 6000,
          disableOnInteraction: false,
        },
      },
      banner: {
        values: [
          {
            url_redirect: '/',
            img_res:
              'https://res.cloudinary.com/komerciaacademico/image/upload/v1721394513/Template17/Captura_de_pantalla_2024-07-19_075201_bchplw.png',
            img: 'https://res.cloudinary.com/komerciaacademico/image/upload/v1721394513/Template17/Captura_de_pantalla_2024-07-19_075201_bchplw.png',
          },
          {
            url_redirect: '/',
            img_res:
              'https://res.cloudinary.com/komerciaacademico/image/upload/v1721394513/Template17/Captura_de_pantalla_2024-07-19_075201_bchplw.png',
            img: 'https://res.cloudinary.com/komerciaacademico/image/upload/v1721394513/Template17/Captura_de_pantalla_2024-07-19_075201_bchplw.png',
          },
        ],
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

<style scoped>
picture {
  width: 100%;
}
.wrapper-banner >>> .swiper-pagination-bullet-active {
  opacity: 1;
  background: #00bd05;

  /* background: var(--color_pagination); */
}
</style>
