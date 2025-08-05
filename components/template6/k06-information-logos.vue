<template>
  <div
    v-if="informationLogos"
    class="w-full flex justify-center items-center py-35 lg:py-50 px-10 mb-40"
    :style="{
      backgroundColor: informationLogos['--background_color_1'] || 'white',
    }"
  >
    <div
      class="w-full max-w-7xl h-auto flex flex-col items-center justify-center overflow-hidden"
    >
      <p
        v-if="informationLogos?.title"
        class="w-full text-center mb-25 text-25 md:text-30 lg:text-40"
        :style="{
          color: informationLogos.color_title_1 || '#111827',
          fontWeight: informationLogos.fontWeighTitle || '600',
        }"
      >
        {{ informationLogos.title }}
      </p>
      <div
        class="max-w-7xl mlg:w-full grid grid-cols-1 lg:grid-cols-2 mlg:grid-cols-4 gap-5 md:gap-4 justify-center items-start mt-30"
      >
        <div
          v-for="(items, index) in informationLogos.values"
          :key="index"
          class="hidden w-full lg:flex flex-col items-center justify-center"
        >
          <img
            v-lazy="idCloudinary(items.icono, 150, 150)"
            width="70"
            height="70"
            class="object-contain object-center h-full w-full max-w-[70px] max-h-[70px]"
            :class="`contentImg${index}`"
            :alt="`imgInfo${index}`"
          />
          <p
            class="mt-20 mb-5 text-24"
            :style="{
              color: items.color_title || '#6b7280',
              fontWeight: items.fontWeighTitle || '600',
            }"
          >
            {{ items.title }}
          </p>
          <p
            class="text-center text-15"
            :style="{
              color: items.color_text || '#111827',
              fontWeight: items.fontWeighText || '400',
            }"
          >
            {{ items.text }}
          </p>
        </div>
        <div
          ref="mySwiper"
          v-swiper:mySwiper="swiperOption"
          class="max-w-[350px] flex lg:hidden items-center justify-start"
        >
          <div class="swiper-wrapper">
            <div
              v-for="(items, index) in informationLogos.values"
              :key="index"
              class="swiper-slide w-full flex flex-col items-center justify-center"
            >
              <img
                :src="idCloudinary(items.icono, 150, 150)"
                width="70"
                height="70"
                class="object-contain object-center h-full w-full max-w-[70px] max-h-[70px]"
                :class="`contentImg${index}`"
                :alt="`imgInfo${index}`"
              />
              <p
                class="text-center mt-20 mb-5 text-24"
                :style="{
                  color: items.color_title || '#6b7280',
                  fontWeight: items.fontWeighTitle || '600',
                }"
              >
                {{ items.title }}
              </p>
              <p
                class="text-center text-15"
                :style="{
                  color: items.color_text || '#111827',
                  fontWeight: items.fontWeighText || '400',
                }"
              >
                {{ items.text }}
              </p>
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
  mixins: [idCloudinary],
  props: {
    informationLogos: {
      type: Object,
      required: true,
    },
    settingsGeneral: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      swiperOption: {
        autoHeight: true,
        slidesPerView: '1',
        loop: true,
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
