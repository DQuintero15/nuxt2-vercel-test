<template>
  <div
    class="content-section"
    :style="[
      section,
      settingGeneral,
      {
        '--font-style-1': settingGeneral?.fount_1 ?? 'Roboto',
      },
    ]"
  >
    <div class="content-wrapper">
      <div
        v-for="(item, index) in section.values"
        :key="index"
        class="w-full h-full"
      >
        <a
          :href="item.url_redirect ? item.url_redirect : ''"
          rel="noreferrer noopener"
        >
          <div class="wrapper-items">
            <img
              v-lazy="idCloudinaryBanner(item.url_img_background, 'banner')"
              class="img-item"
              alt="banner-1"
            />
            <div
              class="txt-content"
              :style="`justify-content: ${item.justingText}; align-items: ${item.alingText};`"
            >
              <p
                class="txt-tittle"
                :style="`color: ${item.colorPretitle}; margin-bottom:${item.marginbottomPretitle};`"
              >
                {{ item.pretitle }}
              </p>
              <p
                class="txt-subtittle"
                :style="`color: ${item.colorTitle}; margin-bottom:${item.marginbottomTitle};`"
              >
                {{ item.title }}
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
  name: 'Ko10Section',
  mixins: [idCloudinary],
  props: {
    section: {
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
.content-section {
  background: var(--background_color_1);
  padding-top: var(--margintop);
  padding-bottom: var(--marginBottom);
  @apply w-full flex flex-col justify-center items-center;
}
.content-wrapper {
  @apply justify-center items-center;
}
.wrapper-items {
  @apply w-full h-auto relative flex justify-start cursor-pointer overflow-hidden transition-all ease-in duration-0.2;
}
.img-item {
  @apply w-full object-cover overflow-hidden transition-all ease-in duration-0.2;
}
.wrapper-items:hover .img-item {
  @apply relative overflow-hidden transition-all ease-in duration-0.2;
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
.txt-content {
  @apply absolute w-full h-full flex flex-col justify-start items-start;
}

@screen sm {
  .content-wrapper {
    @apply w-9/0 grid grid-cols-1 gap-6;
  }
  .wrapper-left:hover .txt-tittle {
    color: var(--hover_text);
  }
  .wrapper-center:hover .txt-tittle {
    color: var(--hover_text);
  }
  .wrapper-right:hover .txt-tittle {
    color: var(--hover_text);
  }
  .txt-tittle {
    /* color: #222222; */
    font-size: 25px;
    font-family: var(--font-style-1) !important;
    @apply mt-50 mx-35 pb-10 font-semibold;
  }
  .txt-subtittle {
    /* color: #777777; */
    font-size: 12px;
    font-family: var(--font-style-1) !important;
    @apply mx-35;
  }
}
@screen md {
  .content-wrapper {
    @apply w-9/5 grid grid-cols-3 gap-6;
  }
}
@media (min-width: 1400px) {
  .content-wrapper {
    max-width: 1400px;
  }
}
</style>
