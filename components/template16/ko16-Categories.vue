<template>
  <div
    class="w-full flex justify-center items-center py-25 lg:py-40 px-10"
    :style="`background-color: ${categories['--background_color_1']}`"
  >
    <div
      class="w-full max-w-[1700px] h-auto flex flex-col items-center justify-center overflow-hidden"
    >
      <p
        class="w-full text-center mb-25 text-25 md:text-30 lg:text-40"
        :style="`color: ${categories.color_title_1}; font-weight: ${categories.fontWeighTitle};`"
      >
        {{ categories.title }}
      </p>

      <div ref="mySwiper" v-swiper:mySwiper="swiperOption" class="w-full">
        <div class="swiper-wrapper w-full">
          <a
            v-for="(item, index) in categories.values"
            :id="`slide${index + 1}`"
            :key="index"
            :href="item.url_redirect"
            class="swiper-slide w-full"
            rel="noreferrer noopener"
          >
            <img
              :src="idCloudinary(item.img, 550, 550)"
              class="w-full h-full object-cover relative"
              :style="`border-radius: ${settingGeneral?.radius};`"
              width="405"
              height="405"
              alt="banner template15"
            />
            <div
              v-if="item?.title"
              class="absolute w-full h-full flex justify-center items-center top-0 z-10"
            >
              <p
                class="px-10 py-15 md:py-8 text-14 w-full max-w-[250px] text-center"
                :style="`color: ${item.color_title}; background-color: ${item.color_bg};  border-radius: ${settingGeneral?.radius};`"
              >
                {{ item.title }}
              </p>
            </div>
          </a>
        </div>
        <div
          v-if="categories.values.length > 1"
          class="swiper-button-prev"
        ></div>
        <div
          v-if="categories.values.length > 1"
          class="swiper-button-next"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import idCloudinary from '@/mixins/idCloudinary'
export default {
  name: 'Ko16Categories',
  mixins: [idCloudinary],
  props: {
    categories: {
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
        direction: 'horizontal',
        setWrapperSize: true,
        paginationClickable: true,
        slidesPerView: 5,
        spaceBetween: 35,
        grabCursor: true,
        breakpoints: {
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
          425: {
            slidesPerView: 1,
            spaceBetween: 15,
          },
          375: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          320: {
            slidesPerView: 1,
            spaceBetween: 5,
          },
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
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
.giftLoad,
.swiper-slide {
  max-width: 405px;
}
.swiper-button-prev,
.swiper-button-next {
  color: #ed6436;
}
</style>
