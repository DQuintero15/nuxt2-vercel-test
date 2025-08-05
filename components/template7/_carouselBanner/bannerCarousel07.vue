<template>
  <div
    class="wrapper-banner"
    :style="[
      settingKCarousel,
      banner,
      settingGeneral,
      {
        '--font-style-2': settingGeneral?.fount_2 ?? 'Great Vibes',
      },
      {
        '--font-style-3': settingGeneral?.fount_3 ?? 'Lora',
      },
    ]"
  >
    <div
      class="h-full w-full grid grid-cols-1 md:grid-cols-2 gap-6 justify-center items-center max-w-[1300px]"
    >
      <div class="w-full h-full flex justify-center items-center">
        <div
          class="w-full h-full max-w-[420px] flex flex-col justify-center items-center"
        >
          <div
            class="flex justify-center items-center text-center leading-tight"
          >
            <span class="banner-text-tittle">
              {{ banner.tittle }}
            </span>
          </div>
          <div class="flex justify-center items-center text-center break-all">
            <span class="banner-text-subtittle">
              {{ banner.description }}
            </span>
          </div>
        </div>
      </div>
      <div class="w-full h-full flex justify-center items-end">
        <div v-if="banner.url_img_right" class="banner-img">
          <img
            class="img-girl"
            :src="idCloudinaryBanner(banner.url_img_right, 'banner')"
            alt="banner-carousel"
          />
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
    banner: {
      type: Object,
      required: true,
    },
    settingKCarousel: {
      type: Object,
      required: true,
    },
    settingGeneral: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped>
.wrapper-banner {
  @apply w-full h-full flex flex-col justify-center items-center;
}
.banner {
  padding-top: 100px;
}

.banner-img {
  @apply flex w-full max-w-[570px] justify-center items-center;
}
.img-girl {
  @apply w-full h-full object-cover object-center;
}
.banner-text-tittle {
  font-size: 64px;
  color: var(--color_text);
  font-family: var(--font-style-2) !important;
}
.banner-text-subtittle {
  font-size: 18px;
  color: var(--color_subtext);
  font-family: var(--font-style-3) !important;
  font-style: italic;
}
@media (max-width: 1500px) {
  .banner-img {
    max-width: 520px;
  }
}
@media (max-width: 1400px) {
  .banner-img {
    max-width: 420px;
  }
}
@media (max-width: 1300px) {
  .banner-text-tittle {
    font-size: 54px;
  }
  .banner-text-subtittle {
    font-size: 15px;
  }
}
@media (max-width: 1200px) {
  .banner {
    padding-top: 60px;
  }
}
@media (max-width: 1120px) {
  .banner {
    padding-top: 40px;
  }
  .banner-img {
    max-width: 380px;
  }
}
@media (max-width: 1024px) {
  .banner {
    padding-top: 40px;
  }
  .banner-text-tittle {
    font-size: 45px;
  }
  .banner-text-subtittle {
    font-size: 14px;
  }
  .banner-img {
    max-width: 350px;
  }
}
@media (max-width: 950px) {
  .wrapper-banner {
    @apply hidden;
  }
}
</style>
