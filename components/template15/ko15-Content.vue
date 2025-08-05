<template>
  <div
    class="content-section w-full flex flex-col justify-center items-center py-25 lg:py-40 px-10"
    :style="`background-color: ${content['--background_color_1']}`"
  >
    <div
      class="max-w-9/0 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-4 items-center justify-center"
      :style="{
        '--hover_text_btn': settingGeneral?.hover_text_btn,
        '--hover_bg_btn': settingGeneral?.hover_bg_btn,
      }"
    >
      <a
        v-for="(item, index) in content.values"
        :key="index"
        class="w-full h-full"
        :style="`border-radius: ${settingGeneral?.radius};`"
        :href="item?.url_redirect ?? ''"
        rel="noreferrer noopener"
      >
        <div
          class="wrapper-items"
          :style="`border-radius: ${settingGeneral?.radius};`"
        >
          <img
            v-lazy="idCloudinaryBanner(item.img, 'banner')"
            class="img-item group:"
            :style="`border-radius: ${settingGeneral?.radius};`"
            alt="imagen-1"
          />
          <div
            class="absolute w-full h-full flex flex-col justify-center items-start pl-30 md:pl-20 lg:pl-30 pr-10"
          >
            <p
              class="text-16 md:text-12 lg:text-15 xl:text-16 mb-10"
              :style="`color: ${item.color_text}; font-weight: ${item.fontWeighText};`"
            >
              {{ item.subTitle.replace(/&nbsp;/g, ' ') }}
            </p>
            <p
              class="text-32 md:text-18 lg:text-25 xl:text-32 max-w-[290px] leading-tight"
              :style="`color: ${item.color_title}; font-weight: ${item.fontWeighTitle};`"
            >
              {{ item.title.replace(/&nbsp;/g, ' ') }}
            </p>
            <p
              v-if="item.visible_btn"
              class="px-20 py-5 md:py-8 mt-20 md:mt-15 lg:mt-30 text-12 md:text-14 xl:text-16 btnHover"
              :style="`color: ${item.color_text_btn}; background-color: ${item.color_bg_btn}; border-radius: ${settingGeneral?.radius};`"
            >
              {{ item.text_btn }}
            </p>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>
<script>
import idCloudinary from '@/mixins/idCloudinary'
export default {
  name: 'Ko15Content',
  mixins: [idCloudinary],
  props: {
    content: {
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
}
</script>
<style scoped>
.wrapper-items {
  @apply w-full h-auto relative flex justify-start cursor-pointer overflow-hidden;
  -webkit-transition: all 600ms ease 0s;
}

.img-item {
  @apply w-full object-cover overflow-hidden;
  -webkit-transition: all 600ms ease 0s;
}
.wrapper-items:hover .img-item {
  @apply relative overflow-hidden;
  -webkit-transition: all 600ms ease 0s;
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
.btnHover:hover {
  background-color: var(--hover_bg_btn) !important;
  color: var(--hover_text_btn) !important;
}
</style>
