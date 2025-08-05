<template>
  <div class="w-full hero-image_container">
    <div class="relative h-inherit flex items-center justify-center">
      <img
        :src="idCloudinaryBanner(imageSrc, 'banner')"
        alt="img banner"
        class="hero_image_bg h-inherit w-full"
      />
      <div
        class="hidden lg:flex justify-center h-inherit items-center flex-col text-gray-100 ease duration-300 content-text"
        :class="{
          'opacity-40 ': shouldChangeOpacity,
        }"
      >
        <h2
          class="uppercase text-5xl font-semibold m-0"
          :style="`color:${settingByTemplate12.bannerTitleColor} ;`"
        >
          {{ settingByTemplate12.bannerTitle }}
        </h2>
        <p
          class="mt-2 italic text-md normal-case text-gray-200"
          :style="`color:${settingByTemplate12.bannerDescriptionColor} ;`"
        >
          {{ settingByTemplate12.bannerDescription }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import idCloudinary from '../../mixins/idCloudinary'
import settingsProps from './mixins/ComponentProps'
export default {
  name: 'Ko12IHeroImage',
  mixins: [settingsProps, idCloudinary],
  data: () => ({
    shouldChangeOpacity: false,
  }),
  computed: {
    imageSrc() {
      return this.settingByTemplate12.desktopBanner
    },
    imageSrcResponsive() {
      return this.settingByTemplate12.responsiveBanner
    },
  },
  async mounted() {
    window.addEventListener('scroll', await this.handleTextOpacity)
  },
  async beforeDestroy() {
    window.removeEventListener('scroll', await this.handleTextOpacity)
  },
  methods: {
    async handleTextOpacity() {
      await (this.shouldChangeOpacity = !!(window.scrollY >= 110))
    },
  },
}
</script>

<style scoped>
.hero-image_container {
  height: 51.178vh;
  overflow: hidden;
  padding: 0px;
  margin: 0px;
}
.hero_image_bg {
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 1;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  -webkit-animation: ZoominOut 30s ease;
  animation: ZoominOut 10s ease;
  animation-delay: 120ms;
  animation-fill-mode: forwards;
  filter: brightness(0.7);
}
.content-text {
  z-index: 3;
  height: 51.178vh;
}
/* Zoom in Keyframes */
@-webkit-keyframes ZoominOut {
  0% {
    transform: scale(1.4);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes ZoominOut {
  0% {
    transform: scale(1.4);
  }
  100% {
    transform: scale(1);
  }
}
@media screen and (min-width: 920px) {
  .hero-image_container {
    height: 51.178vh;
  }
}
@media (max-width: 800px) {
  .content-text {
    height: 511px;
  }
  .hero-image_container {
    height: 511px;
  }
}
@media (max-width: 650px) {
  .content-text {
    height: 430px;
  }
  .hero-image_container {
    height: 430px;
  }
}
@media (max-width: 550px) {
  .content-text {
    height: 480px;
  }
  .hero-image_container {
    height: 380px;
  }
}
@media (max-width: 500px) {
  .content-text {
    height: 300px;
  }
  .hero-image_container {
    height: 300px;
  }
}
@media (max-width: 450px) {
  .content-text {
    height: 270px;
  }
  .hero-image_container {
    height: 270px;
  }
}
@media (max-width: 400px) {
  .content-text {
    height: 250px;
  }
  .hero-image_container {
    height: 250px;
  }
}
@media (max-width: 350px) {
  .content-text {
    height: 220px;
  }
  .hero-image_container {
    height: 220px;
  }
}
@media (max-width: 350px) {
  .content-text {
    height: 211px;
  }
  .hero-image_container {
    height: 211px;
  }
}
</style>
