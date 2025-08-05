<template>
  <div
    ref="mySwiper"
    v-swiper:mySwiper="swiperOption"
    :class="`w-full max-w-[${widthScreen}px]`"
  >
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        <img
          :src="idCloudinary(photo, widthPhoto, widthPhoto)"
          class="h-full w-full overflow-hidden object-cover"
          alt="Product img"
        />
      </div>
      <div v-for="itemPhoto in photos" :key="itemPhoto.id" class="swiper-slide">
        <img
          :src="idCloudinary(itemPhoto.fotoCloudinary, widthPhoto, widthPhoto)"
          class="h-full w-full overflow-hidden object-cover"
          alt="Product img"
        />
      </div>
      <div v-if="idYouTube && idYouTube !== ''" class="swiper-slide">
        <div class="grid w-9/9 min-w-[400px] items-start gap-1">
          <button class="youTube__action_back" @click="changeSlide()">
            <i class="material-icons"></i>
          </button>
          <iframe
            style="max-width: 375px; width: 100%"
            height="375"
            :src="`https://www.youtube.com/embed/${idYouTube}?rel=0&amp;controls=0&amp;showinfo=0`"
            frameborder="0"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
    <div class="swiper-pagination"></div>
    <div
      class="prev absolute left-0 top-4/0 z-10 cursor-pointer rounded-[25px] bg-black px-4"
    >
      <FlechaLeft-icon
        class="flex w-full items-center justify-center text-35 text-white-white hover:text-gray-400"
        style="bottom: 0em !important"
      />
    </div>
    <div
      class="next absolute right-0 top-4/0 z-10 cursor-pointer rounded-[25px] bg-black px-4"
    >
      <FlechaRight-icon
        class="flex w-full items-center justify-center text-35 text-white-white hover:text-gray-400"
        style="bottom: 0em !important"
      />
    </div>
  </div>
</template>

<script>
import idCloudinary from '@/mixins/idCloudinary'
export default {
  name: 'ProductSlideDetails',
  mixins: [idCloudinary],
  props: {
    photos: {
      type: Array,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    idYouTube: {
      type: String,
      default: null,
    },
    widthPhoto: {
      type: Number,
      default: null,
    },
    widthScreen: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 1,
        grabCursor: true,
        autoplay: {
          delay: 8000,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.swiper-pagination',
        },
        navigation: {
          nextEl: '.next',
          prevEl: '.prev',
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
    changeSlide() {
      this.swiper.slidePrev(500, false)
    },
  },
}
</script>

<style scoped>
.photos .swiper-pagination-bullet {
  background-color: rgba(255, 255, 255, 0.5);
}
.photos .swiper-pagination-bullet-active {
  background-color: #fff;
}

.youTube__action_back {
  background-color: var(--color_background_btn);
  color: var(--color_text_btn);
  border-style: none;
  outline: none;
}
</style>
