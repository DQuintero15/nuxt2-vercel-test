<template>
  <div
    v-if="information"
    class="w-full flex justify-center items-center py-30 lg:py-40 px-10"
    style="background-color: var(--background_color_1)"
    :style="[information, settingGeneral]"
  >
    <div
      class="max-w-7xl mlg:w-full grid grid-cols-1 lg:grid-cols-2 mlg:grid-cols-4 gap-5 md:gap-4 items-center justify-center"
    >
      <a
        v-for="(items, index) in information.values"
        :key="index"
        :href="items.url_redirect ? items.url_redirect : ''"
        class="hidden w-full lg:flex flex-row items-center justify-start"
        :class="items.url_redirect ? 'cursor-pointer' : ''"
      >
        <img
          v-lazy="idCloudinary(items.img, 150, 150)"
          width="40"
          height="40"
          class="object-contain object-center max-w-[40px] max-h-[40px]"
          :class="`contentImg${index}`"
          :alt="`imgInfo${index}`"
        />
        <div
          class="h-35 border-l-2 border-l-black ml-20 pr-20 leading-25"
          :style="`border-color: ${items.color_border};`"
        ></div>
        <div class="w-full">
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
      </a>
      <div
        ref="mySwiper"
        v-swiper:mySwiper="swiperOption"
        class="max-w-[350px] flex lg:hidden items-center justify-start"
      >
        <div class="swiper-wrapper">
          <a
            v-for="(items, index) in information.values"
            :key="index"
            :href="items.url_redirect ? items.url_redirect : ''"
            class="swiper-slide w-full flex flex-row items-center justify-start"
            :class="items.url_redirect ? 'cursor-pointer' : ''"
          >
            <img
              v-lazy="idCloudinary(items.img, 150, 150)"
              width="40"
              height="40"
              class="object-contain object-center max-w-[40px] max-h-[40px]"
              :class="`contentImg${index}`"
              :alt="`imgInfo${index}`"
            />
            <div
              class="h-35 border-l-2 border-l-black ml-20 pr-20 leading-25"
              :style="`border-color: ${items.color_border};`"
            ></div>
            <div class="w-full">
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
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import idCloudinary from '@/mixins/idCloudinary'
export default {
  name: 'Ko14Information',
  mixins: [idCloudinary],
  props: {
    information: {
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
