<template>
  <div
    class="w-full flex justify-center items-center py-35 lg:py-40 px-10"
    :style="`background-color: ${informationLogos['--background_color_1']}`"
  >
    <div
      class="w-full max-w-9/0 h-auto flex flex-col items-center justify-center overflow-hidden"
    >
      <img
        :src="idCloudinaryBanner(informationLogos.img, 'bannerRes', 400)"
        alt="banner template15"
        class="w-full object-cover max-w-[110px] lg:max-w-[130px]"
      />
      <p
        class="w-full text-center my-25 text-25 md:text-32 lg:text-35 xl:text-40"
        :style="`color: ${informationLogos.color_title_1}; font-weight: ${informationLogos.fontWeighTitle};`"
      >
        {{ informationLogos.title }}
      </p>
      <div
        class="max-w-7xl mlg:w-full grid grid-cols-1 lg:grid-cols-2 mlg:grid-cols-4 gap-5 md:gap-4 justify-center items-start mt-30"
      >
        <div
          v-for="(items, index) in informationLogos.values"
          :key="index"
          class="hidden w-full lg:flex flex-col items-center justify-center"
        >
          <img
            v-lazy="idCloudinary(items.icono, 150, 150)"
            width="70"
            height="70"
            class="object-contain object-center h-full w-full max-w-[70px] max-h-[70px]"
            :class="`contentImg${index}`"
            :alt="`imgInfo${index}`"
          />
          <p
            class="mt-20 mb-5 text-24"
            :style="`color: ${items.color_title}; font-weight: ${items.fontWeighTitle};`"
          >
            {{ items.title }}
          </p>
          <p
            class="text-center text-15"
            :style="`color: ${items.color_text}; font-weight: ${items.fontWeighText};`"
          >
            {{ items.text }}
          </p>
        </div>
        <div
          ref="mySwiper"
          v-swiper:mySwiper="swiperOption"
          class="max-w-[350px] flex lg:hidden items-center justify-start"
        >
          <div class="swiper-wrapper">
            <div
              v-for="(items, index) in informationLogos.values"
              :key="index"
              class="swiper-slide w-full flex flex-col items-center justify-center"
            >
              <img
                :src="idCloudinary(items.icono, 150, 150)"
                width="70"
                height="70"
                class="object-contain object-center h-full w-full max-w-[70px] max-h-[70px]"
                :class="`contentImg${index}`"
                :alt="`imgInfo${index}`"
              />
              <p
                class="text-center mt-20 mb-5 text-24"
                :style="`color: ${items.color_title}; font-weight: ${items.fontWeightTitle};`"
              >
                {{ items.title }}
              </p>
              <p
                class="text-center text-15"
                :style="`color: ${items.color_text}; font-weight: ${items.fontWeightText};`"
              >
                {{ items.text }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import idCloudinary from '@/mixins/idCloudinary'
export default {
  name: 'Ko15InformationLogos',
  mixins: [idCloudinary],
  props: {
    informationLogos: {
      type: Object,
      required: true,
    },
    settingGeneral: {
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
      swiperOption: {
        autoHeight: true,
        slidesPerView: '1',
        loop: true,
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
.swiper-pagination-fraction,
.swiper-pagination-custom,
.swiper-container-horizontal > .swiper-pagination-bullets {
  bottom: -14px;
  left: 0;
  width: 100%;
}
</style>
