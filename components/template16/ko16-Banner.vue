<template>
  <div
    class="w-full justify-center items-center"
    :style="`background-color: ${banner['--background_color_1']}`"
  >
    <div
      v-if="banner"
      ref="mySwiper"
      v-swiper:mySwiper="swiperOption"
      class="w-full justify-center items-center wrapper-banner"
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
              alt="banner template16"
              class="w-full object-cover"
            />
          </picture>
          <div
            class="w-full max-w-8/5 lg:max-w-9/0 xl:max-w-7xl flex flex-col justify-center items-start absolute"
            style="z-index: 20"
          >
            <div class="flex-1 flex flex-col justify-center items-start">
              <p
                v-if="item?.title"
                class="mb-5 md:mb-10 max-w-lg md:max-w-2xl text-15 md:text-25 lg:text-40 xl:text-45"
                :style="`color: ${item.color_title}; font-weight: ${item.fontWeighTitle};`"
              >
                {{ item.title }}
              </p>
              <p
                v-if="item?.text"
                class="mt-10 md:mt-25 max-w-md md:max-w-lg text-12 md:text-14 xl:text-18"
                :style="`color: ${item.color_text}; font-weight: ${item.fontWeighText};`"
              >
                {{ item.text }}
              </p>
              <p
                v-if="item.visible_btn"
                class="px-20 py-5 md:py-8 mt-16 md:mt-40 border text-12 md:text-14 xl:text-16"
                :style="`color: ${item.color_text_btn}; background-color: ${item.color_bg_btn}; border-color: ${item.color_border_btn}; border-radius: ${settingGeneral?.radius};`"
              >
                {{ item.textBtn }}
              </p>
            </div>
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
  name: 'Ko16Banner',
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
  background: var(--color_pagination);
}
</style>
