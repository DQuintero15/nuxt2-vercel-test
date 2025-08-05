<template>
  <div v-swiper:mySwiper="swiperOption" ref="mySwiper">
    <div v-if="banner.values" class="swiper-wrapper">
      <a
        v-for="(item, index) in banner.values"
        :id="`slide${index + 1}`"
        :key="index"
        class="swiper-slide w-full flex justify-center items-center"
        :href="`${item.visbleBtn ? '' : item.url_redirect}`"
        :class="item.visbleBtn ? 'pointer-events-none' : 'cursor-pointer'"
        rel="noreferrer noopener"
      >
        <picture>
          <source
            media="(max-width: 799px)"
            :srcset="
              idCloudinaryBanner(item.url_img_background_res, 'bannerRes', 800)
            "
          />
          <source
            media="(min-width: 800px)"
            :srcset="idCloudinaryBanner(item.url_img_background, 'banner')"
          />
          <img
            v-lazy="idCloudinaryBanner(item.url_img_background, 'banner')"
            loading="lazy"
            class="w-full h-full object-cover object-center"
            alt="Banner_tienda_template10"
          />
        </picture>
        <div class="content absolute">
          <div class="content-items-top">
            <div
              class="empty-border-left fadeInLeft"
              :style="`background-color: ${item.color_border};`"
            ></div>
            <div class="content-text-top">
              <div class="txt-banner-top">
                <p
                  class="txt-1 fadeInLeft"
                  :style="`color: ${item.colorPretitle};`"
                >
                  {{ item.pretitle.replace(/&nbsp;/g, ' ') }}
                </p>
              </div>
              <div class="txt-banner-top">
                <p
                  class="txt-2 fadeInLeft"
                  :style="`color: ${item.colorPretitle};`"
                >
                  {{ item.date }}
                </p>
              </div>
            </div>
          </div>
          <div class="content-text-medium">
            <p class="txt-3 fadeInRight" :style="`color: ${item.colorTitle};`">
              {{ item.title.replace(/&nbsp;/g, ' ') }}
            </p>
          </div>
          <div class="content-text-bottom">
            <div class="txt-banner-bottom">
              <p class="txt-4 fadeInLeft" :style="`color: ${item.colorPrice};`">
                Desde
              </p>
            </div>
            <div class="txt-banner-bottom">
              <p
                class="txt-5 fadeInRight"
                :style="`color: ${item.colorPrice};`"
              >
                {{ item.price }}
              </p>
            </div>
          </div>
          <a
            v-if="item.visbleBtn"
            :href="item.url_redirect ? item.url_redirect : ''"
            class="cursor-pointer"
            rel="noreferrer noopener"
          >
            <div
              class="btn"
              :style="`border-color: ${item.color_border_btn}; color: ${item.color_text_btn};`"
            >
              <p>{{ $t('home_comprarAhora') }}</p>
            </div>
          </a>
        </div>
      </a>
    </div>
    <div v-if="banner.visible_pagination" class="swiper-pagination"></div>
  </div>
</template>
<script>
import idCloudinaryBanner from '@/mixins/idCloudinary'
export default {
  name: 'Ko10Carousel',
  mixins: [idCloudinaryBanner],
  props: {
    banner: {
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
        slidesPerView: 'auto',
        effect: 'fade',
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
  watch: {
    'settingKCarousel.values'() {
      this.autoplayBanner()
    },
  },
  mounted() {
    this.autoplayBanner()
  },
  methods: {
    autoplayBanner() {
      if (this.settingKCarousel && this.settingKCarousel.values.length == 1) {
        this.swiperOption.autoplay.delay = 900000000000000000
      } else {
        this.swiperOption.autoplay.delay = 6000
      }
    },
  },
}
</script>
<style scoped>
.carousel-content >>> .swiper-pagination-bullet-active {
  opacity: 1;
  background: #2c2930;
}
.swiper-pagination-bullet {
  width: 12px;
  height: 2px;
  display: inline-block;
  border-radius: 100%;
  background: white;
  opacity: 0.2;
}
picture {
  width: 100%;
}
.content {
  z-index: 20 !important;
  @apply flex flex-col justify-center items-start;
}
.txt-1,
.txt-2,
.txt-3,
.txt-4,
.txt-5 {
  font-family: var(--font-style-1) !important;
  @apply uppercase z-20;
}

.txt-1,
.txt-2,
.empty-border-left {
  -webkit-animation-duration: 3s;
  animation-duration: 3s;
}
.txt-3 {
  -webkit-animation-duration: 4s;
  animation-duration: 4s;
}
.txt-4,
.txt-5 {
  -webkit-animation-duration: 4s;
  animation-duration: 4s;
}
@keyframes fadeInLeft {
  0% {
    opacity: 0;
    transform: translateX(-50px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
@keyframes fadeInRight {
  0% {
    opacity: 0;
    transform: translateX(80px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
.fadeInLeft {
  -webkit-animation-name: fadeInLeft;
  animation-name: fadeInLeft;
}
.fadeInRight {
  -webkit-animation-name: fadeInRight;
  animation-name: fadeInRight;
}

@screen sm {
  .content {
    @apply w-8/5;
  }
  .empty-border-left {
    @apply h-22 w-1;
  }
  .content-items-top {
    @apply w-7/0 flex flex-row justify-start items-start ml-8;
  }
  .content-text-top {
    @apply w-7/0 flex flex-col justify-start items-start pl-10;
  }
  .content-text-medium {
    @apply w-7/0 flex justify-start items-start;
  }
  .content-text-bottom {
    @apply hidden;
  }
  .btn {
    font-size: 10px;
    font-family: var(--font-style-1) !important;
    border-radius: var(--radius_btn);
    @apply px-10 py-2 border font-semibold truncate;
  }
  .btn:hover {
    color: var(--hover_text_btn);
    border-color: var(--hover_Bg_btn);
    @apply border;
  }
  .txt-1,
  .txt-2 {
    font-size: 8px;
    @apply w-full truncate tracking-1;
  }
  .txt-3 {
    font-size: 20px;
    @apply w-full mt-5 mb-10 truncate font-semibold tracking-3;
  }
}
@media (min-width: 425px) {
  .empty-border-left {
    @apply h-26;
  }
  .content-items-top {
    @apply ml-10;
  }
  .txt-1,
  .txt-2 {
    font-size: 10px;
  }
  .txt-3 {
    font-size: 30px;
  }
  .btn {
    font-size: 12px;
    @apply px-12 py-2 border font-semibold truncate;
  }
}
@screen md {
  .empty-border-left {
    @apply h-33;
  }
  .content-items-top {
    @apply ml-15;
  }
  .content-text-top {
    @apply pl-15;
  }
  .txt-1,
  .txt-2 {
    font-size: 13px;
    @apply tracking-0;
  }
  .txt-3 {
    font-size: 50px;
    @apply tracking-6 pb-20;
  }
  .btn {
    font-size: 12px;
    @apply px-12 py-7 ml-5 border-2 font-semibold truncate;
  }
  .btn:hover {
    @apply border-2;
  }
}
@screen lg {
  .content {
    @apply w-7/5;
  }
  .content-items-top {
    @apply ml-0;
  }
  .content-text-bottom {
    @apply w-7/0 flex flex-row justify-start items-end mb-20;
  }
  .txt-3 {
    font-size: 50px;
    @apply mb-0 mt-20 h-auto;
  }
  .txt-4 {
    font-size: 10px;
    @apply pr-5 pb-2;
  }
  .txt-5 {
    font-size: 15px;
  }
  .btn {
    font-size: 12px;
    @apply px-35 py-8 ml-0;
  }
}
@screen mlg {
  .empty-border-left {
    @apply h-35;
  }
  .txt-3 {
    font-size: 70px;
  }
}
@media (min-width: 1400px) {
  .empty-border-left {
    @apply h-50;
  }
  .txt-1,
  .txt-2 {
    font-size: 15px;
  }
  .txt-3 {
    font-size: 90px;
  }
  .txt-4 {
    font-size: 12px;
    @apply pr-8 pb-5;
  }
  .txt-5 {
    font-size: 24px;
  }
  .btn {
    font-size: 16px;
    @apply px-51 py-12 border-2;
  }
  .btn:hover {
    @apply border-2;
  }
}
</style>
