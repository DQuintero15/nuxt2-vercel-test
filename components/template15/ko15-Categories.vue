<template>
  <div
    class="flex w-full items-center justify-center px-10 py-25 lg:py-40"
    :style="`background-color: ${categories['--background_color_1']}`"
  >
    <div
      class="flex h-auto w-full max-w-9/5 flex-col items-center justify-center overflow-hidden md:max-w-9/0"
      :style="{ '--hover_text': settingGeneral?.hover_text }"
    >
      <p
        class="mb-25 w-full text-center text-25 md:text-30 lg:text-40"
        :style="`color: ${categories.color_title_1}; font-weight: ${categories.fontWeighTitle};`"
      >
        {{ categories.title }}
      </p>
      <div ref="mySwiper" v-swiper:mySwiper="swiperOption" class="w-full">
        <div v-if="dataStore?.id === 18376" class="swiper-wrapper w-full">
          <a
            v-for="(item, index) in categories.values"
            :id="`slide${index + 1}`"
            :key="index"
            :href="index === 0 ? 'https://wa.link/labm4i' : item.url_redirect"
            class="swiper-slide wrapper-categories w-full"
            rel="noreferrer noopener"
          >
            <img
              :src="idCloudinary(item.img, 550, 550)"
              alt="banner template15"
              class="h-full w-full object-cover"
              :style="`border-radius: ${settingGeneral?.radius};`"
            />
            <div
              class="textHover mt-10 text-center text-16 md:text-20 lg:text-22"
              :style="`color: ${item.color_title}; font-weight: ${item.fontWeighTitle};`"
            >
              <p>{{ item.title }}</p>
            </div>
          </a>
        </div>
        <div v-else class="swiper-wrapper w-full">
          <a
            v-for="(item, index) in categories.values"
            :id="`slide${index + 1}`"
            :key="index"
            :href="item.url_redirect"
            class="swiper-slide wrapper-categories w-full"
            rel="noreferrer noopener"
          >
            <img
              :src="idCloudinary(item.img, 550, 550)"
              alt="banner template15"
              class="h-full w-full object-cover"
              :style="`border-radius: ${settingGeneral?.radius};`"
            />
            <div
              class="textHover mt-10 text-center text-16 md:text-20 lg:text-22"
              :style="`color: ${item.color_title}; font-weight: ${item.fontWeighTitle};`"
            >
              <p>{{ item.title }}</p>
            </div>
          </a>
          <!--  -->
        </div>
        <div
          v-if="categories.values.length > 4"
          class="swiper-button-prev"
        ></div>
        <div
          v-if="categories.values.length > 4"
          class="swiper-button-next"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import idCloudinary from '@/mixins/idCloudinary'
export default {
  name: 'Ko15Categories',
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
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        breakpoints: {
          1440: {
            slidesPerView: 5,
            spaceBetween: 35,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 15,
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
  max-width: 324px;
}
.swiper-button-prev,
.swiper-button-next {
  color: #ed6436;
}
.wrapper-categories:hover .textHover {
  color: var(--hover_text) !important;
}
</style>
