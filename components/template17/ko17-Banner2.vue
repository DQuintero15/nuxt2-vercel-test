<template>
  <div class="flex w-full items-center justify-center">
    <!-- :style="`background-color: ${banner['--background_color_1']}`" -->
    <div
      class="wrapper-banner flex w-full max-w-5xl items-center justify-center"
    >
      <a
        :href="banner.url_redirect"
        class="flex w-full items-center justify-center"
        rel="noreferrer noopener"
      >
        <picture>
          <source
            media="(max-width: 799px)"
            :srcset="idCloudinaryBanner(banner.img_res, 'bannerRes', 800)"
          />
          <source
            media="(min-width: 800px)"
            :srcset="idCloudinaryBanner(banner.img, 'banner')"
          />
          <img
            v-lazy="idCloudinaryBanner(banner.img, 'banner')"
            alt="banner template16"
            class="w-full object-cover"
          />
        </picture>
      </a>
    </div>
  </div>
</template>
<script>
import idCloudinaryBanner from '@/mixins/idCloudinary'
export default {
  name: 'Ko17Banner2',
  mixins: [idCloudinaryBanner],
  props: {
    // banner: {
    //   type: Object,
    //   required: true,
    // },
    // settingGeneral: {
    //   type: Object,
    //   required: true,
    // },
  },
  data() {
    return {
      banner: {
        url_redirect: '/',
        img_res:
          'https://res.cloudinary.com/komerciaacademico/image/upload/v1721394158/Template17/Captura_de_pantalla_2024-07-19_075213_mhyajy.png',
        img: 'https://res.cloudinary.com/komerciaacademico/image/upload/v1721394158/Template17/Captura_de_pantalla_2024-07-19_075213_mhyajy.png',
      },
    }
  },
}
</script>

<style scoped>
picture {
  width: 100%;
}
</style>
