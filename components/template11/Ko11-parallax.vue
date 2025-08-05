<template>
  <div
    class="w-full h-full max-h-[500px] flex flex-col justify-center items-center"
    :style="[
      settingKparallax,
      settingGeneral,
      {
        '--font-style-1': settingGeneral?.fount_1 ?? 'Roboto',
      },
    ]"
  >
    <a
      :class="settingKparallax.visbleBtn ? '' : 'cursorPointer'"
      :href="`${
        settingKparallax.visbleBtn ? '' : settingKparallax.url_redirect
      }`"
      rel="noreferrer noopener"
      class="content-bg"
      :style="`background-image: url(${idCloudinaryBanner(
        settingKparallax.url_img_background,
        'banner'
      )});`"
    >
      <div class="content-txt">
        <p class="txt-top">
          {{ settingKparallax.pretitle.replace(/&nbsp;/g, ' ') }}
        </p>
        <div class="separator"></div>
        <p class="txt-bottom">
          {{ settingKparallax.title.replace(/&nbsp;/g, ' ') }}
        </p>
        <div v-if="settingKparallax.visbleBtn" class="content-btn">
          <p class="btn">{{ $t('home_comprarAhora') }}</p>
        </div>
      </div>
    </a>
  </div>
</template>
<script>
import idCloudinaryBanner from '@/mixins/idCloudinary'
export default {
  name: 'Ko11Parallax',
  mixins: [idCloudinaryBanner],
  props: {
    settingKparallax: {
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
.content-bg {
  max-height: 500px;
  background-position: 50% 73.2661%;
  @apply w-full flex flex-col justify-center items-center bg-fixed bg-no-repeat bg-cover;
}
.content-txt {
  @apply w-full flex flex-col justify-center items-center;
}
.content-btn {
  @apply w-full flex flex-col justify-center items-center;
}
.cursorPointer {
  cursor: pointer;
}
@screen sm {
  .txt-top {
    color: var(--colorPretitle);
    font-size: 14px;
    font-family: var(--font-style-1);
    font-weight: var(--fontWeighPretitle);
    @apply tracking-1 text-center;
  }
  .txt-bottom {
    color: var(--colorTitle);
    font-size: 20px;
    font-family: var(--font-style-1);
    font-weight: var(--fontWeighTitle);
    @apply uppercase tracking-0 text-center mb-34;
  }
  .btn {
    color: var(--color_text_btn);
    background-color: var(--color_background_btn);
    font-size: 14px;
    border-radius: var(--radius_btn);
    @apply font-normal leading-21 uppercase px-15 py-10 cursor-pointer;
  }
  .btn:hover {
    color: var(--hover_text_btn);
    background-color: var(--hover_Bg_btn);
  }
  .separator {
    background: var(--color_border);
    @apply w-60 h-1 my-10 uppercase;
  }
  .content-txt {
    @apply px-10 py-50;
  }
}
@screen md {
  .txt-top {
    font-size: var(--fontSizePretitle);
  }
  .txt-bottom {
    font-size: 40px;
  }
  .btn {
    font-size: 14px;
    letter-spacing: 0.4px;
    @apply px-15 py-10;
  }
  .content-txt {
    padding: 121px;
  }
}
@screen lg {
  .txt-bottom {
    font-size: var(--fontSizeTitle);
  }
  .btn {
    font-size: 14px;
    margin-top: var(--marginTopBtn);
  }
  .content-txt {
    padding: 171px 10px;
  }
}
@media (min-width: 1200px) {
  .content-txt {
    padding: 236px;
  }
  .txt-bottom {
    font-size: var(--fontSizeTitle);
  }
}
</style>
