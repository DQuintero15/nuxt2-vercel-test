<template>
  <!-- <el-tooltip
    class="item"
    effect="dark"
    content="Hacer clic para hacer zoom"
    placement="bottom-end"
  > -->

  <div
    class="w-full  relative "
    @mouseover="handleMouseOver"
    @mouseleave="handleMouseLeave"
  >
    <div class="flex h-full w-full items-center justify-center">
      <div class="cursor-pointer" @click.prevent="ShowModal(true)">
        <KoProductSlider
          :photos="photos"
          :photo="photo"
          :id-you-tube="idYouTube"
          :width-photo="550"
          :width-screen="400"
        />
      </div>
    </div>
    <div
      v-if="showModal"
      class="fixed left-0 top-0 z-[1000] flex h-full w-full items-center justify-center overflow-auto bg-[#000000de]"
    >
      <span
        class="absolute right-[35px] top-[20px] cursor-pointer text-[40px] font-bold text-white-white transition hover:text-gray-500 focus:text-gray-500"
        @click.prevent="ShowModal(false)"
      >
        &times;
      </span>

      <div class="max-h-[90%] max-w-[90%] md:max-h-[80%] md:max-w-[80%]">
        <KoProductSliderOption
          :photos="photos"
          :photo="photo"
          :id-you-tube="idYouTube"
          :width-photo="850"
          :width-screen="600"
        />
      </div>
    </div>

    <div
      v-if="isHovering && !isMobile"
      class="absolute bottom-6 right-6 z-10 rounded-md bg-black px-4 py-2 opacity-75 transition-opacity duration-300"
    >
      <p class="text-14 text-white-white">
        {{ $t('productdetail_click_zoom') }}
      </p>
    </div>

    <div
      v-if="isMobile"
      class="absolute bottom-8 right-6  z-10 rounded-md bg-black px-4 py-2 opacity-75 transition-opacity duration-300"
    >
      <p class="text-14 text-white-white">
        {{ $t('productdetail_click_zoom') }}
      </p>
    </div>
  </div>

  <!-- </el-tooltip> -->
</template>

<script>
export default {
  name: 'WrapperImgWapi',
  components: {
    KoProductSlider: () => import('./product-slide.vue'),
    KoProductSliderOption: () => import('./product-slide-option.vue'),
  },
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
  },

  data() {
    return {
      showModal: false,
      isHovering: false,
      isMobile: false,
    }
  },
  mounted() {
    this.isMobile = window.innerWidth <= 768
  },
  methods: {
    ShowModal(value) {
      this.showModal = value
    },
    handleMouseOver() {
      if (!this.isMobile) {
        this.isHovering = true
      }
    },
    handleMouseLeave() {
      if (!this.isMobile) {
        this.isHovering = false
      }
    },
  },
}
</script>

<style scoped>
.photos .responsive .swiper-pagination-bullet {
  background-color: rgba(255, 255, 255, 0.5);
}
.photos .responsive .swiper-pagination-bullet-active {
  background-color: #fff;
}

.youTube__action_back {
  background-color: var(--color_background_btn);
  color: var(--color_text_btn);
  border-style: none;
  outline: none;
}
</style>
