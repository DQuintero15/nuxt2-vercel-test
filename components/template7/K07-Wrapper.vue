<template>
  <div
    class="wrapper-content"
    :style="[
      settingKWrapper,
      settingGeneral,
      {
        '--font-style-2': settingGeneral?.fount_2 ?? 'Great Vibes',
      },
      {
        '--font-style-3': settingGeneral?.fount_3 ?? 'Lora',
      },
    ]"
  >
    <div class="wrapper-items-content">
      <div v-if="!settingKCarousel.visible" class="separador-blog"></div>
      <div class="wrapper-content-items">
        <div class="wrapper-items-text">
          <div class="tittle">
            <span class="tittle-text">{{ settingKWrapper.pre_title }}</span>
          </div>
          <div class="subtittle">
            <span class="subtittle-text">{{ settingKWrapper.title }}</span>
          </div>
          <div class="description">
            <span class="description-text">
              {{ settingKWrapper.description }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="wrapper-items">
      <div ref="mySwiper" v-swiper:mySwiper="swiperOption">
        <div class="swiper-wrapper">
          <div
            v-for="(imagen, index) in settingKWrapper.values"
            :key="index"
            :class="`swiper-slide wrapper-${index + 1}`"
          >
            <template v-if="isInternalUrl(imagen.url_redirect)">
              <nuxt-link
                :to="imagen.url_redirect"
                rel="noreferrer noopener"
                class="wrapper-ints"
              >
                <img
                  v-lazy="idCloudinary(imagen.url_img, 550, 550)"
                  class="img-wrapp"
                  alt="imágenes de Instagram"
                />
              </nuxt-link>
            </template>
            <template v-else>
              <a
                :href="imagen.url_redirect"
                rel="noreferrer noopener"
                class="wrapper-ints"
              >
                <img
                  v-lazy="idCloudinary(imagen.url_img, 550, 550)"
                  class="img-wrapp"
                  alt="imágenes de Instagram"
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
  name: 'K07Wrapper',
  mixins: [idCloudinary],
  props: {
    dataStore: {
      type: Object,
      required: true,
    },
    settingGeneral: {
      type: Object,
      required: true,
    },
    settingKWrapper: {
      type: Object,
      required: true,
    },
    settingKCarousel: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 'auto',
        spaceBetween: 0,
        breakpoints: {
          10000: {
            slidesPerView: 6,
            spaceBetween: 0,
          },
          1920: {
            slidesPerView: 6,
            spaceBetween: 0,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 0,
          },
          320: {
            slidesPerView: 2,
            spaceBetween: 0,
          },
        },

        // setWrapperSize: true,
        // paginationClickable: true,
        // grabCursor: true,
        // ...
      },
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    },
  },
  watch: {
    'dataStore.tienda'() {
      this.links[0].link = this.dataStore.redes.facebook
      this.links[1].link = this.dataStore.redes.twitter
      this.links[2].link = this.dataStore.redes.instagram
      this.links[3].link = this.dataStore.redes.youtube
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
.separador-blog {
  padding-top: 100px;
}
.swiper-wrapper {
  height: 300px;
  max-height: 300px;
}
.img-wrapp {
  transition: all 200ms ease-in;
}
.img-wrapp:hover {
  transition: all 200ms ease-in;
  position: relative;
  -webkit-transform: scale(1.3);
  transform: scale(1.03);
}
.wrapper-content {
  @apply flex flex-col justify-center items-center w-full py-20;
  background: var(--background_color_1);
}
.wrapper-items-content {
  @apply flex flex-col justify-center items-center;
}
.wrapper-content-items {
  @apply flex flex-col justify-center items-center w-full mb-64 text-center;
}
.wrapper-items-text {
  @apply w-full;
}
.tittle,
.subtittle,
.description {
  @apply flex flex-col justify-center items-center;
}
.tittle-text {
  font-family: var(--font-style-2) !important;
  color: var(--color_pre_title);
}
.subtittle-text {
  font-family: var(--font-style-3) !important;
  color: var(--color_title);
}
.description-text {
  font-family: var(--font-style-3) !important;
  color: var(--color_description);
}
.wrapper-items {
  @apply w-full;
}
.wrapper-1:hover {
  @apply bg-black bg-opacity-50 cursor-pointer;
}
.wrapper-2:hover {
  @apply bg-black bg-opacity-50 cursor-pointer;
}
.wrapper-3:hover {
  @apply bg-black bg-opacity-50 cursor-pointer;
}
.wrapper-4:hover {
  @apply bg-black bg-opacity-50 cursor-pointer;
}
.wrapper-5:hover {
  @apply bg-black bg-opacity-50 cursor-pointer;
}
.wrapper-6:hover {
  @apply bg-black bg-opacity-50 cursor-pointer;
}
@screen sm {
  .wrapper-items-content {
    @apply w-9/5;
  }
  .tittle {
    line-height: 34px;
    font-size: 24px;
  }
  .subtittle {
    line-height: 42px;
    font-size: 32px;
  }
  .description {
    line-height: 24px;
    font-size: 14px;
  }
}
@screen md {
  .subtittle {
    line-height: 46px;
    font-size: 36px;
  }
}
@screen mlg {
  .wrapper-items-content {
    @apply w-9/3;
  }
  .gify-text-content {
    @apply w-9/3;
  }
  .gify-slider-content {
    @apply w-6/3;
  }
  .tittle {
    line-height: 34px;
    font-size: 24px;
  }
  .subtittle {
    line-height: 48px;
    font-size: 35px;
  }
  .description {
    line-height: 24px;
    font-size: 14px;
  }
}
@media (min-width: 1192px) {
  .wrapper-items-content {
    width: 1192px;
  }
  .img-wrapp {
    width: 100%;
  }
}
@media (max-width: 1300px) {
  .swiper-wrapper {
    height: 100%;
    max-height: 205px;
  }
}
@media (max-width: 1280px) {
  .swiper-wrapper {
    max-height: 200px;
  }
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
