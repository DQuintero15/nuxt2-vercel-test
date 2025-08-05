<template>
  <!-- class="w-full h-full flex justify-center items-center bg-no-repeat bg-center box-content bg-cover relative" -->
  <!-- backgroundImage: `url(${idCloudinaryBanner(banner2.imgBg, 'banner')})`, -->
  <div
    class="w-full flex justify-center items-center"
    :style="{
      backgroundColor: banner2['--background_color_1'],
      '--hover_text_btn': settingGeneral?.hover_text_btn,
      '--hover_bg_btn': settingGeneral?.hover_bg_btn,
    }"
  >
    <picture>
      <source
        media="(max-width: 799px)"
        :srcset="idCloudinaryBanner(banner2.imgBg_res, 'bannerRes', 800)"
      />
      <source
        media="(min-width: 800px)"
        :srcset="idCloudinaryBanner(banner2.imgBg, 'banner')"
      />
      <img
        v-lazy="idCloudinaryBanner(banner2.imgBg, 'banner')"
        alt="banner template14"
        class="w-full object-cover"
      />
    </picture>
    <div
      class="w-full h-auto flex justify-center items-center overflow-hidden absolute"
    >
      <div
        class="w-full max-w-9/0 md:max-w-[600px] flex flex-col justify-center items-center text-center"
      >
        <p
          :style="{
            color: banner2.color_title,
            fontWeight: banner2.fontWeighTitle,
          }"
          class="text-30 md:text-50 pb-10"
        >
          {{ banner2.title }}
        </p>
        <p
          :style="{
            color: banner2.color_text,
            fontWeight: banner2.fontWeighText,
          }"
          class="text-14 md:text-20 pb-30"
        >
          {{ banner2.text }}
        </p>
        <div class="w-full grid grid-cols-2 gap-5">
          <template v-if="banner2.visible_btn_1">
            <template v-if="isInternalUrl(banner2.url_redirect_1)">
              <nuxt-link
                :to="banner2.url_redirect_1"
                :style="{
                  color: banner2.color_text_btn_1,
                  backgroundColor: banner2.color_bg_btn_1,
                  borderRadius: settingGeneral?.radius,
                }"
                class="px-20 py-5 md:py-8 text-12 md:text-14 xl:text-16 btnHover"
              >
                {{ banner2.text_btn_1 }}
              </nuxt-link>
            </template>
            <template v-else>
              <a
                :href="banner2.url_redirect_1"
                :style="{
                  color: banner2.color_text_btn_1,
                  backgroundColor: banner2.color_bg_btn_1,
                  borderRadius: settingGeneral?.radius,
                }"
                class="px-20 py-5 md:py-8 text-12 md:text-14 xl:text-16 btnHover"
              >
                {{ banner2.text_btn_1 }}
              </a>
            </template>
          </template>
          <template v-if="banner2.visible_btn_2">
            <template v-if="isInternalUrl(banner2.url_redirect_2)">
              <nuxt-link
                :to="banner2.url_redirect_2"
                :style="{
                  color: banner2.color_text_btn_2,
                  backgroundColor: banner2.color_bg_btn_2,
                  borderRadius: settingGeneral?.radius,
                }"
                class="px-20 py-5 md:py-8 text-12 md:text-14 xl:text-16 btnHover"
              >
                {{ banner2.text_btn_2 }}
              </nuxt-link>
            </template>
            <template v-else>
              <a
                :href="banner2.url_redirect_2"
                :style="{
                  color: banner2.color_text_btn_2,
                  backgroundColor: banner2.color_bg_btn_2,
                  borderRadius: settingGeneral?.radius,
                }"
                class="px-20 py-5 md:py-8 text-12 md:text-14 xl:text-16 btnHover"
              >
                {{ banner2.text_btn_2 }}
              </a>
            </template>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import idCloudinaryBanner from '@/mixins/idCloudinary'
export default {
  name: 'Ko15Banner2',
  mixins: [idCloudinaryBanner],
  props: {
    banner2: {
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
