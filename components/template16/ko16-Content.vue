<template>
  <div
    class="w-full flex flex-col justify-center items-center py-25 lg:py-40 px-10"
    :style="`background-color: ${content['--background_color_1']}`"
  >
    <div
      class="w-full max-w-[1200px] grid grid-cols-1 md:grid-cols-3 gap-y-5 md:gap-y-0 gap-x-5 md:gap-x-4 items-center justify-center"
    >
      <div
        v-for="(item, index) in content.values"
        :key="index"
        class="w-full h-full"
      >
        <a
          class="w-full"
          :href="item?.url_redirect ?? ''"
          rel="noreferrer noopener"
        >
          <div
            class="wrapper-items w-full h-auto relative flex justify-start cursor-pointer overflow-hidden"
          >
            <img
              v-lazy="idCloudinaryBanner(item.img, 'banner')"
              class="img-item w-full h-full max-w-full md:max-w-[377px] max-h-[230px] object-cover overflow-hidden object-center"
              :style="`border-radius: ${settingGeneral?.radius};`"
              alt="imagen-1"
            />
            <div
              class="absolute w-full h-full flex flex-col justify-center items-start pl-30 md:pl-20 lg:pl-30 pr-10"
            >
              <p
                class="text-18 lg:text-20 max-w-[180px] mb-15 leading-tight"
                :style="`color: ${item.color_title}; font-weight: ${item.fontWeighTitle};`"
              >
                {{ item.title.replace(/&nbsp;/g, ' ') }}
              </p>
              <p
                class="text-14"
                :style="`color: ${item.color_text}; font-weight: ${item.fontWeighText};`"
              >
                {{ item.subTitle.replace(/&nbsp;/g, ' ') }}
                <span
                  class="text-18 lg:text-20"
                  :style="`color: ${item.color_price}; font-weight: ${item.fontWeighPrice};`"
                >
                  {{ item.price.replace(/&nbsp;/g, ' ') }}
                </span>
              </p>
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
  name: 'Ko16Content',
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
  -webkit-transition: all 600ms ease 0s;
}

.img-item {
  -webkit-transition: all 600ms ease 0s;
}
.wrapper-items:hover .img-item {
  @apply relative overflow-hidden;
  -webkit-transition: all 600ms ease 0s;
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
