<template>
  <div
    class="content-section"
    :style="[
      settingKsection,
      settingGeneral,
      {
        '--font-style-1': settingGeneral?.fount_1 ?? 'Roboto',
      },
    ]"
  >
    <div class="content-wrapper">
      <div
        v-for="(item, index) in settingKsection.values"
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
              :alt="`imagen-${index}`"
            />
            <div
              class="txt-content"
              :style="`justify-content: ${item.justingText}; align-items: ${item.alingText};`"
            >
              <p
                class="txt-top"
                :style="`color: ${item.colorPretitle}; margin-bottom:${item.marginbottomPretitle};`"
              >
                {{ item.pretitle.replace(/&nbsp;/g, ' ') }}
              </p>
              <p
                class="txt-bottom"
                :style="`color: ${item.colorTitle}; margin-bottom:${item.marginbottomTitle};`"
              >
                {{ item.title.replace(/&nbsp;/g, ' ') }}
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
  name: 'Ko11Section',
  mixins: [idCloudinary],
  props: {
    settingKsection: {
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
  @apply w-full flex flex-col justify-center items-center py-40;
}
.content-wrapper {
  @apply justify-center items-center;
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

.txt-content {
  padding: 20px 20px 0 20px;
  @apply absolute w-full h-full flex flex-col;
}
@screen sm {
  .content-wrapper {
    @apply w-9/0 grid grid-cols-1 gap-6;
  }
  .txt-top {
    font-size: 13px;
    font-family: var(--font-style-1);
    @apply uppercase font-normal tracking-1;
  }
  .txt-bottom {
    font-size: 25px;
    font-family: var(--font-style-1);
    @apply font-bold uppercase;
  }
}
@screen md {
  .content-wrapper {
    @apply w-9/5 grid grid-cols-3 gap-6;
  }
  .txt-bottom {
    font-size: 20px;
  }
}
@screen lg {
  .txt-bottom {
    font-size: 25px;
  }
}
@media (min-width: 1400px) {
  .content-wrapper {
    max-width: 1200px;
  }
}
</style>
