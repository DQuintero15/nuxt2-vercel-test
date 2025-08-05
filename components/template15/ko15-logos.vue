<template>
  <div
    class="w-full flex justify-center items-center py-35 lg:py-50 px-10"
    :style="`background-color: ${logos['--background_color_1']}`"
  >
    <div
      class="w-full max-w-7xl h-auto flex flex-col items-center justify-center overflow-hidden"
    >
      <p
        class="w-full text-center mb-25 text-25 md:text-30 lg:text-40"
        :style="`color: ${logos.color_title_1}; font-weight: ${logos.fontWeightTitle};`"
      >
        {{ logos.title }}
      </p>
      <div ref="mySwiper" v-swiper:mySwiper="swiperOption" class="w-full">
        <div class="swiper-wrapper w-full">
          <div
            v-for="(item, index) in logos.values"
            :key="index"
            class="swiper-slide w-full"
          >
            <template v-if="isInternalUrl(item.url_redirect)">
              <nuxt-link :to="item.url_redirect" class="w-full">
                <img
                  :src="idCloudinary(item.img, 550, 550)"
                  class="h-full w-full remove_bg max-w-[150px] max-h-[150px]"
                  width="150"
                  height="150"
                  :alt="`imágenes logos${index}`"
                />
              </nuxt-link>
            </template>
            <template v-else>
              <a
                :href="item.url_redirect"
                class="w-full"
                rel="noreferrer noopener"
              >
                <img
                  :src="idCloudinary(item.img, 550, 550)"
                  class="h-full w-full remove_bg max-w-[150px] max-h-[150px]"
                  width="150"
                  height="150"
                  :alt="`imágenes logos${index}`"
                />
              </a>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import idCloudinary from '@/mixins/idCloudinary'
export default {
  name: 'Ko15Logos',
  mixins: [idCloudinary],
  props: {
    logos: {
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
        slidesPerView: 'auto',
        loop: true,
        autoplay: {
          delay: 6000,
          disableOnInteraction: false,
        },
        spaceBetween: 0,
        breakpoints: {
          1920: {
            slidesPerView: 5,
            spaceBetween: 80,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 80,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 60,
          },
          320: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
        },
      },
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    },
  },
  methods: {
    isInternalUrl(url) {
      return url.startsWith('/')
    },
  },
}
</script>
<style scoped>
.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;
  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}
.remove_bg {
  filter: brightness(1.1);
  mix-blend-mode: multiply;
}
.swiper-wrapper {
  height: 100%;
  max-height: 200px;
}

@media (max-width: 600px) {
  .swiper-wrapper {
    max-height: 170px;
  }
}
@media (max-width: 500px) {
  .swiper-wrapper {
    max-height: 150px;
  }
}
@media (max-width: 430px) {
  .swiper-wrapper {
    max-height: 125px;
  }
}
</style>
