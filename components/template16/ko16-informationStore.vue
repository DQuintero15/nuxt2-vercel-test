<template>
  <div
    class="w-full flex justify-center items-center py-30 lg:py-40 px-10"
    style="background-color: var(--background_color_1)"
  >
    <div
      class="max-w-[1200px] mlg:w-full grid grid-cols-1 lg:grid-cols-2 mlg:grid-cols-4 gap-5 md:gap-4 items-start justify-center"
    >
      <div
        v-for="(items, index) in informationStore.values"
        :key="index"
        class="hidden w-full h-full lg:flex flex-row items-center justify-start"
      >
        <img
          v-lazy="items.icono"
          width="40"
          height="40"
          class="object-contain object-center max-w-[40px] max-h-[40px]"
          :class="`contentImg${index}`"
          :alt="`imgInfo${index}`"
        />
        <div class="w-full ml-10">
          <p
            class="mb-5"
            :style="`color: ${items.color_title}; font-size: ${items.fontSizeTitle}; font-weight: ${items.fontWeighTitle};`"
          >
            {{ items.title }}
          </p>
          <p
            :style="`color: ${items.color_text}; font-size: ${items.fontSizeText}; font-weight: ${items.fontWeighText};`"
          >
            {{ items.text }}
          </p>
        </div>
      </div>
      <div
        ref="mySwiper"
        v-swiper:mySwiper="swiperOption"
        class="max-w-[350px] flex lg:hidden items-center justify-start"
      >
        <div class="swiper-wrapper">
          <div
            v-for="(items, index) in informationStore.values"
            :key="index"
            class="swiper-slide w-full h-full flex flex-row items-center justify-start"
          >
            <img
              v-lazy="items.icono"
              width="40"
              height="40"
              class="object-contain object-center max-w-[40px] max-h-[40px]"
              :class="`contentImg${index}`"
              :alt="`imgInfo${index}`"
            />
            <div class="w-full ml-10">
              <p
                class="mb-5"
                :style="`color: ${items.color_title}; font-size: ${items.fontSizeTitle}; font-weight: ${items.fontWeighTitle};`"
              >
                {{ items.title }}
              </p>
              <p
                :style="`color: ${items.color_text}; font-size: ${items.fontSizeText}; font-weight: ${items.fontWeighText};`"
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
  name: 'Ko16InformationStore',
  mixins: [idCloudinary],
  props: {
    informationStore: {
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
        // loop: true,
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
