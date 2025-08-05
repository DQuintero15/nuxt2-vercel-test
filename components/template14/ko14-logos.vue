<template>
  <div
    class="w-full flex justify-center items-center py-40 px-10"
    :style="`background-color: ${logos['--background_color_1']}`"
  >
    <div class="w-full max-w-7xl flex flex-col justify-center items-center">
      <!-- <div
        class="w-full pb-30 border-t"
        :style="`border-color: ${logos.color_border};`"
      /> -->
      <div class="w-full flex justify-center items-center">
        <div v-swiper:mySwiper="swiperOption" ref="mySwiper">
          <div class="swiper-wrapper">
            <div
              v-for="(imagen, index) in logos.values"
              :key="index"
              class="swiper-slide cursor-pointer h-full w-full"
            >
              <template v-if="isInternalUrl(imagen.url_redirect)">
                <InternalLink
                  :to="imagen.url_redirect"
                  :image="imagen"
                  :index="index"
                />
              </template>
              <template v-else>
                <ExternalLink
                  :href="imagen.url_redirect"
                  :image="imagen"
                  :index="index"
                />
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Ko14Logos',
  components: {
    InternalLink: () => import('./_link/internal-link-logos.vue'),
    ExternalLink: () => import('./_link/external-link-logos.vue'),
  },
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
            slidesPerView: 6,
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
