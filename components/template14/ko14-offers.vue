<template>
  <div
    class="content-section w-full flex flex-col justify-center items-center py-20 px-10"
    :style="[offers, settingGeneral]"
  >
    <div
      class="md:w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-4 items-center justify-center"
    >
      <div
        v-for="(item, index) in offers.values"
        :key="index"
        class="w-full h-full"
      >
        <a
          class="w-full"
          :href="item?.url_redirect ?? ''"
          rel="noreferrer noopener"
        >
          <div class="wrapper-items">
            <img
              v-lazy="idCloudinaryBanner(item.img, 'banner')"
              class="img-item"
              alt="imagen-1"
            />
            <div
              class="absolute w-full h-full flex flex-col justify-center items-start pl-40 pr-10"
            >
              <p
                :style="`color: ${item.color_title}; font-size: ${item.fontSizeTitle}; font-weight: ${item.fontWeighTitle};`"
              >
                {{ item.title.replace(/&nbsp;/g, ' ') }}
              </p>
              <p
                :style="`color: ${item.color_text}; font-size: ${item.fontSizeText}; font-weight: ${item.fontWeighText};`"
              >
                {{ item.subTitle.replace(/&nbsp;/g, ' ') }}
              </p>
              <div
                class="border h-2 mt-5 md:mt-10 border-hover"
                :style="`border-color: ${item?.color_border};`"
              ></div>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
import idCloudinary from '@/mixins/idCloudinary'
export default {
  name: 'Ko15Offers',
  mixins: [idCloudinary],
  props: {
    offers: {
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
.content-section {
  background: var(--background_color_1);
}

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

.wrapper-items:hover .border-hover {
  @apply w-100;
  -webkit-transition: all 600ms ease 0s;
}
.border-hover {
  @apply w-50;
  -webkit-transition: all 600ms ease 0s;
}
</style>
