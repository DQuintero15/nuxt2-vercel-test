<template>
  <div
    class="w-full h-full flex justify-center items-center bg-no-repeat bg-bottom box-content bg-cover"
    :style="`background-color: ${
      information2['--background_color_1']
    }; background-image: url(${idCloudinaryBanner(
      information2.imgBg,
      'banner'
    )});`"
  >
    <!-- <img
      :src="idCloudinaryBanner(information2.imgBg, 'banner')"
      alt="banner template15"
      class="w-full h-full object-cover"
    /> -->
    <div
      class="w-full max-w-9/0 xl:max-w-full h-auto grid grid-cols-1 lg:grid-cols-2 gap-10 overflow-hidden"
      :style="{
        '--hover_text_btn': settingGeneral?.hover_text_btn,
        '--hover_bg_btn': settingGeneral?.hover_bg_btn,
      }"
    >
      <img
        :src="idCloudinaryBanner(information2.imgLeft, 'banner')"
        alt="information2 template15"
        class="w-full h-full object-cover hidden lg:flex"
      />
      <div class="w-full flex flex-col justify-center items-start">
        <img
          :src="idCloudinaryBanner(information2.icon, 'bannerRes', 400)"
          alt="banner template15"
          class="w-full object-cover max-w-[150px] md:max-w-[200px] lg:max-w-[200px] xl:max-w-[250px]"
        />
        <p
          class="w-full lg:max-w-[750px] text-22 md:text-25 lg:text-30 xl:text-40 leading-tight pt-30"
          :style="`color: ${information2.color_title}; font-weight: ${information2.fontWeighTitle};`"
        >
          {{ information2.title }}
        </p>
        <p
          class="max-w-[750px] text-14 md:text-18 leading-tight pt-30"
          :style="`color: ${information2.color_price}; font-weight: ${information2.fontWeighPrice};`"
        >
          {{ information2.text }}
        </p>
        <template v-if="isInternalUrl(information2.url_redirect)">
          <nuxt-link
            :to="information2.url_redirect"
            class="px-20 py-5 md:py-8 mt-25 md:mt-40 mb-20 xl:mb-0 text-12 md:text-14 xl:text-16 btnHover"
            :style="`color: ${information2.color_text_btn}; background-color: ${information2.color_bg_btn}; border-radius: ${settingGeneral?.radius};`"
          >
            {{ information2.text_btn }}
          </nuxt-link>
        </template>
        <template v-else>
          <a
            :href="information2.url_redirect"
            class="px-20 py-5 md:py-8 mt-25 md:mt-40 mb-20 xl:mb-0 text-12 md:text-14 xl:text-16 btnHover"
            :style="`color: ${information2.color_text_btn}; background-color: ${information2.color_bg_btn}; border-radius: ${settingGeneral?.radius};`"
            rel="noreferrer noopener"
          >
            {{ information2.text_btn }}
          </a>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import idCloudinaryBanner from '@/mixins/idCloudinary'
export default {
  name: 'Ko15Information2',
  mixins: [idCloudinaryBanner],
  props: {
    information2: {
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
  methods: {
    isInternalUrl(url) {
      return url.startsWith('/')
    },
  },
}
</script>

<style scoped>
.btnHover:hover {
  background-color: var(--hover_bg_btn) !important;
  color: var(--hover_text_btn) !important;
}
</style>
