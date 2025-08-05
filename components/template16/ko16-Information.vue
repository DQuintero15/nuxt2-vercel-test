<template>
  <div
    v-if="information"
    class="w-full flex justify-center items-center py-30 lg:py-40 px-10"
    style="background-color: var(--background_color_1)"
  >
    <div
      class="max-w-[1700px] mlg:w-full grid grid-cols-1 lg:grid-cols-2 gap-5 items-center justify-center"
    >
      <div
        v-for="(item, index) in information.values"
        :key="index"
        class="relative"
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
          class="w-full h-full max-w-9/0 flex flex-col justify-center items-start absolute top-0 mx-20 md:mx-40 lg:mx-60 z-20"
        >
          <div class="flex-1 flex flex-col justify-center items-start">
            <p
              v-if="item?.title"
              class="mb-10 max-w-sm text-22 md:text-30 leading-tight"
              :style="`color: ${item.color_title}; font-weight: ${item.fontWeighTitle}; `"
            >
              {{ item.title }}
            </p>
            <p
              v-if="item?.text"
              class="max-w-sm text-18 md:text-22"
              :style="`color: ${item.color_text}; font-weight: ${item.fontWeighText}; `"
            >
              {{ item.text }}
            </p>
            <template v-if="isInternalUrl(item.url_redirect)">
              <nuxt-link
                v-if="item.visible_btn"
                :to="item.url_redirect ? item.url_redirect : ''"
                class="px-20 py-20 mt-16 md:mt-40 border text-14 xl:text-16"
                :style="`color: ${item.color_text_btn}; background-color: ${item.color_bg_btn}; border-color: ${item.color_border_btn}; border-radius: ${settingGeneral?.radius};`"
              >
                {{ item.text_btn }}
                <span :style="`color: ${item.color_price_btn};`">
                  {{ item.text_price_btn }}
                </span>
              </nuxt-link>
            </template>
            <template v-else>
              <a
                v-if="item.visible_btn"
                :href="item.url_redirect ? item.url_redirect : ''"
                class="px-20 py-20 mt-16 md:mt-40 border text-12 md:text-14 xl:text-16"
                :style="`color: ${item.color_text_btn}; background-color: ${item.color_bg_btn}; border-color: ${item.color_border_btn}; border-radius: ${settingGeneral?.radius};`"
                rel="noreferrer noopener"
              >
                {{ item.text_btn }}
                <span :style="`color: ${item.color_price_btn};`">
                  {{ item.text_price_btn }}
                </span>
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
  name: 'Ko16Information',
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
  methods: {
    isInternalUrl(url) {
      return url.startsWith('/')
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
