<template>
  <div class="w-full flex justify-center items-center py-25 lg:py-40">
    <div class="w-full h-auto grid grid-cols-1 md:grid-cols-2 overflow-hidden">
      <div
        class="w-full h-full py-20 flex flex-col justify-center items-center px-10"
        :style="`background-color: ${information['--background_color_1']}`"
      >
        <img
          :src="idCloudinaryBanner(information.icon, 'bannerRes', 400)"
          alt="banner template15"
          class="w-full object-cover max-w-[150px] md:max-w-[200px] lg:max-w-[220px] xl:max-w-[250px] mt-25 md:mt-20"
        />
        <p
          class="max-w-[800px] text-center text-16 md:text-18 lg:text-20 xl:text-40 leading-tight pt-30"
          :style="`color: ${information.color_text}; font-weight: ${information.fontWeighText};`"
        >
          {{ information.text }}
        </p>
        <template v-if="isInternalUrl(information.url_redirect)">
          <nuxt-link
            v-if="information.visible_btn"
            :to="information.url_redirect"
            class="px-20 py-5 md:py-8 mt-25 md:mt-20 lg:mt-40 mb-20 lg:mb-0 text-12 md:text-14 xl:text-16"
            :style="`color: ${information.color_text_btn}; background-color: ${information.color_bg_btn}; border-radius: ${settingGeneral?.radius};`"
          >
            {{ information.text_btn }}
          </nuxt-link>
        </template>
        <template v-else>
          <a
            v-if="information.visible_btn"
            :href="information.url_redirect"
            class="px-20 py-5 md:py-8 mt-25 md:mt-20 lg:mt-40 mb-20 lg:mb-0 text-12 md:text-14 xl:text-16"
            :style="`color: ${information.color_text_btn}; background-color: ${information.color_bg_btn}; border-radius: ${settingGeneral?.radius};`"
            rel="noreferrer noopener"
          >
            {{ information.text_btn }}
          </a>
        </template>
      </div>
      <div :style="`background-color: ${information['--background_color_2']}`">
        <img
          :src="idCloudinaryBanner(information.img, 'banner')"
          alt="banner template15"
          class="w-full h-full object-cover"
        />
      </div>
    </div>
  </div>
</template>

<script>
import idCloudinaryBanner from '@/mixins/idCloudinary'
export default {
  name: 'Ko15Information',
  mixins: [idCloudinaryBanner],
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
  methods: {
    isInternalUrl(url) {
      return url.startsWith('/')
    },
  },
}
</script>
