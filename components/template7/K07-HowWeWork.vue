<template>
  <div
    class="hwwork-content"
    :style="[
      settingKHowwork,
      settingGeneral,
      {
        '--font-style-1': settingGeneral.fount_1 ?? 'David Libre',
      },
      {
        '--font-style-2': settingGeneral.fount_2 ?? 'Great Vibes',
      },
      {
        '--font-style-3': settingGeneral.fount_3 ?? 'Lora',
      },
    ]"
  >
    <div v-if="!settingKCarousel.visible" class="separador-blog"></div>
    <div class="hwwork-content-items">
      <div class="hwwork-items">
        <div class="tittle">
          <span class="tittle-text">{{ settingKHowwork.pre_title }}</span>
        </div>
        <div class="subtittle">
          <span class="subtittle-text">{{ settingKHowwork.title }}</span>
        </div>
        <div class="description">
          <span class="description-text">
            {{ settingKHowwork.description }}
          </span>
        </div>
      </div>
      <div ref="mySwiper" v-swiper:mySwiper="swiperOption" class="hwork-dates">
        <div id="hwork-imgaes" class="swiper-wrapper">
          <div
            id="hwork-text-1"
            class="swiper-slide"
            :style="settingKHowwork.values[0]"
          >
            <img
              v-lazy="idCloudinary(settingKHowwork.values[0].url_img, 400, 400)"
              alt="imageshwork-1"
              class="img-kohow"
            />
            <div class="hwork-tittle">
              <span class="tittle-h">
                {{ settingKHowwork.values[0].title_product }}
              </span>
            </div>
            <div class="hwork-description">
              <span class="description-h">
                {{ settingKHowwork.values[0].description_product }}
              </span>
            </div>
            <div class="hwork-seemore">
              <span class="seemore-h">{{ $t('home_cardvermas') }}</span>
            </div>
          </div>
          <div
            id="hwork-text-2"
            class="swiper-slide"
            :style="settingKHowwork.values[1]"
          >
            <img
              v-lazy="idCloudinary(settingKHowwork.values[1].url_img, 400, 400)"
              alt="imageshwork-2"
              class="img-kohow"
            />
            <div class="hwork-tittle">
              <span class="tittle-h">
                {{ settingKHowwork.values[1].title_product }}
              </span>
            </div>
            <div class="hwork-description">
              <span class="description-h">
                {{ settingKHowwork.values[1].description_product }}
              </span>
            </div>
            <div class="hwork-seemore">
              <span class="seemore-h">{{ $t('home_cardvermas') }}</span>
            </div>
          </div>
          <div
            id="hwork-text-3"
            class="swiper-slide"
            :style="settingKHowwork.values[2]"
          >
            <img
              v-lazy="idCloudinary(settingKHowwork.values[2].url_img, 400, 400)"
              alt="imageshwork-3"
              class="img-kohow"
            />
            <div class="hwork-tittle">
              <span class="tittle-h">
                {{ settingKHowwork.values[2].title_product }}
              </span>
            </div>
            <div class="hwork-description">
              <span class="description-h">
                {{ settingKHowwork.values[2].description_product }}
              </span>
            </div>
            <div class="hwork-seemore">
              <span class="seemore-h">{{ $t('home_cardvermas') }}</span>
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
  name: 'K07HowWeWork',
  mixins: [idCloudinary],
  props: {
    settingKHowwork: {
      type: Object,
      required: true,
    },
    settingGeneral: {
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
        spaceBetween: 20,
        breakpoints: {
          10000: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          2560: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1920: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 10,
          },

          425: {
            slidesPerView: 1,
            spaceBetween: 10,
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
}
</script>
<style scoped>
.hwork-seemore {
  @apply hidden;
}
.separador-blog {
  padding-top: 100px;
}
.hwork-tittle,
.hwork-description,
.hwork-seemore {
  @apply mt-16;
}
.hwork-seemore:hover .seemore-h {
  @apply cursor-pointer;
  color: #777;
}
.tittle-h {
  @apply font-semibold;
  font-family: var(--font-style-1) !important;
  line-height: 34px;
  font-size: 24px;
  color: #2d2a2a;
}
.description-h {
  font-family: var(--font-style-3) !important;
  font: inherit;
  font-size: 14px;
  color: #777;
}
.seemore-h {
  @apply uppercase font-semibold border-b-2 border-red-btnbannershop;
  font-family: var(--font-style-3) !important;
  font-size: 13px;
  line-height: 18px;
  color: #333;
}
#hwork-text-1 {
  @apply flex flex-col justify-center items-center text-center mt-16;
}
#hwork-text-2 {
  @apply flex flex-col justify-center items-center text-center mt-16;
}
#hwork-text-3 {
  @apply flex flex-col justify-center items-center text-center mt-16;
}
.hwork-description {
  @apply w-9/0;
}
.hwork-dates {
  @apply bg-hworkbg bg-no-repeat bg-auto w-full mt-64;
}
.hwwork-content {
  @apply w-full flex flex-col justify-center items-center py-30;
  background: var(--background_color_1);
}
.hwwork-content-items {
  @apply flex flex-col justify-center items-center text-center;
}
.hwwork-items {
  @apply grid grid-cols-1 gap-2 w-full;
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
  font-family: var(--font-style-1) !important;
  color: var(--color_title);
}
.description-text {
  font-family: var(--font-style-3) !important;
  color: var(--color_description);
}
.gify-slider-content {
  @apply flex overflow-hidden;
}
.img-kohow {
  max-width: 200px;
  max-height: 200px;
  object-fit: cover;
  object-position: center;
}
@screen sm {
  .hwwork-content-items {
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
  .hwwork-content-items {
    @apply w-9/5;
  }
  .subtittle {
    line-height: 46px;
    font-size: 36px;
  }
}
@screen mlg {
  .hwwork-content-items {
    @apply w-9/3;
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
  .hwwork-content-items {
    width: 1192px;
  }
}
@screen xml {
  .tittle {
    line-height: 34px;
    font-size: 24px;
  }
  .subtittle {
    line-height: 46px;
    font-size: 36px;
  }
  .description {
    line-height: 24px;
    font-size: 14px;
  }
}
</style>
