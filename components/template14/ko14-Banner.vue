<template>
  <div
    class="w-full justify-center items-center"
    :style="`background-color: ${banner['--background_color_1']}`"
  >
    <div
      v-if="banner"
      ref="mySwiper"
      v-swiper:mySwiper="swiperOption"
      class="w-full max-w-7xl justify-center items-center wrapper-banner"
      :style="banner"
    >
      <div class="z-auto swiper-wrapper">
        <a
          v-for="(item, index) in banner.values"
          :id="`slide${index + 1}`"
          :key="index"
          :href="item.url_redirect"
          class="swiper-slide w-full flex justify-center items-center z-10"
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
              alt="banner template14"
              class="w-full object-cover max-w-[1280px]"
            />
          </picture>
          <div
            class="w-8/5 flex flex-col justify-center items-start absolute"
            style="z-index: 20"
          >
            <p
              v-if="item?.title"
              class="mb-5 md:mb-10"
              :style="`color: ${item.color_title}; font-size: ${item.fontSizeTitle}; font-weight: ${item.fontWeighTitle};`"
            >
              {{ item.title }}
            </p>
            <p
              v-if="item?.subTitle"
              :style="`color: ${item.color_subTitle}; font-size: ${item.fontSizeSubTitle}; font-weight: ${item.fontWeighSubTitle};`"
            >
              {{ item.subTitle }}
            </p>
            <div
              class="border h-2 w-50 my-18 md:my-25"
              :style="`border-color: ${item.color_border};`"
            ></div>
            <p
              v-if="item?.text"
              class="mb-15 md:mb-20 max-w-xs md:max-w-md"
              :style="`color: ${item.color_text}; font-size: ${item.fontSizeText}; font-weight: ${item.fontWeighText};`"
            >
              {{ item.text }}
            </p>
            <p
              v-if="item?.price"
              :style="`color: ${item.color_price}; font-size: ${item.fontSizePrice}; font-weight: ${item.fontWeighPrice};`"
            >
              {{ item.price }}
            </p>
          </div>
        </a>
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>
<script>
import idCloudinaryBanner from '@/mixins/idCloudinary'
export default {
  name: 'Ko14Banner',
  mixins: [idCloudinaryBanner],
  props: {
    banner: {
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
      checkMobile: false,
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
  background: black;
}
</style>
