<template>
  <div class="w-full items-center justify-center" :style="settingKCarousel">
    <div
      ref="mySwiper"
      v-swiper:mySwiper="swiperOption"
      class="wrapper-banner w-full items-center justify-center"
    >
      <div class="swiper-wrapper z-auto w-full">
        <div
          v-for="(banner, index) in settingKCarousel.values"
          :key="index"
          class="swiper-slide z-10 flex w-full items-center justify-center"
          :class="banner && banner.url_redirect ? 'cursor-pointer' : ''"
        >
          <template v-if="isInternalUrl(banner.url_redirect)">
            <nuxt-link
              class="flex w-full items-center justify-center"
              :to="`${banner?.url_redirect ? banner.url_redirect : ''}`"
            >
              <picture>
                <source
                  media="(max-width: 799px)"
                  :srcset="
                    idCloudinaryBanner(
                      settingKCarousel.values[index].url_img_movil,
                      'bannerRes',
                      800
                    )
                  "
                />
                <source
                  media="(min-width: 800px)"
                  :srcset="
                    idCloudinaryBanner(
                      settingKCarousel.values[index].url_img_background,
                      'banner'
                    )
                  "
                />
                <img
                  v-if="settingKCarousel.values[index].url_img_background"
                  :src="
                    idCloudinaryBanner(
                      settingKCarousel.values[index].url_img_background,
                      'banner'
                    )
                  "
                  alt="banner template7"
                  class="w-full object-cover"
                />
              </picture>
              <KObanner
                class="absolute bottom-0"
                :banner="banner"
                :setting-k-carousel="settingKCarousel"
                :setting-general="settingGeneral"
              />
            </nuxt-link>
          </template>
          <template v-else>
            <a
              class="flex w-full items-center justify-center"
              :href="`${banner?.url_redirect ? banner.url_redirect : ''}`"
              rel="noreferrer noopener"
            >
              <picture>
                <source
                  media="(max-width: 799px)"
                  :srcset="
                    idCloudinaryBanner(
                      settingKCarousel.values[index].url_img_movil,
                      'bannerRes',
                      800
                    )
                  "
                />
                <source
                  media="(min-width: 800px)"
                  :srcset="
                    idCloudinaryBanner(
                      settingKCarousel.values[index].url_img_background,
                      'banner'
                    )
                  "
                />
                <img
                  :src="
                    idCloudinaryBanner(
                      settingKCarousel.values[index].url_img_background,
                      'banner'
                    )
                  "
                  alt="banner template7"
                  class="w-full object-cover"
                />
              </picture>
              <KObanner
                class="absolute bottom-0"
                :banner="banner"
                :setting-k-carousel="settingKCarousel"
                :setting-general="settingGeneral"
              />
            </a>
          </template>
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
import idCloudinary from '@/mixins/idCloudinary'
export default {
  name: 'K07Carousel',
  components: {
    KObanner: () =>
      import('@/components/template7/_carouselBanner/bannerCarousel07.vue'),
  },
  mixins: [idCloudinary],
  props: {
    settingKCarousel: {
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
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
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
  methods: {
    isInternalUrl(url) {
      return url.startsWith('/')
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
