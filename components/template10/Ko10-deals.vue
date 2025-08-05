<template>
  <div
    class="content-deal"
    :style="[
      offers,
      settingGeneral,
      {
        '--font-style-1': settingGeneral?.fount_1 ?? 'Roboto',
      },
    ]"
  >
    <div class="content-grid">
      <div class="grid-left">
        <div class="bg-left"></div>
        <div class="content-image-left">
          <img
            v-lazy="idCloudinaryBanner(offers.url_img_right, 'banner')"
            class="img-left"
            alt="img-left"
          />
        </div>
      </div>
      <div
        class="grid-right"
        :style="`background-image: url(${idCloudinaryBanner(
          offers.url_img_left,
          'banner'
        )});`"
      >
        <div class="grid-item-tittle">
          <p class="txt-tittle">{{ offers.title }}</p>
        </div>
        <div class="grid-item-border"></div>
        <div class="grid-item-subtittle">
          <p class="txt-subtittle">{{ offers.subtitle }}</p>
        </div>
        <div class="grid-item-price">
          <p class="txt-price-1">
            {{ offers.Price }}
            <span class="txt-price-2">{{ offers.Offerts }}</span>
          </p>
        </div>
        <div v-if="offers.visibleBtn" class="grid-item-button">
          <template v-if="isInternalUrl(offers.url_redirect)">
            <nuxt-link
              class="btn"
              :to="offers.url_redirect ? offers.url_redirect : ''"
            >
              {{ offers.displayName }}
            </nuxt-link>
          </template>
          <template v-else>
            <a
              class="btn"
              :href="offers.url_redirect ? offers.url_redirect : ''"
              rel="noreferrer noopener"
            >
              {{ offers.displayName }}
            </a>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import idCloudinaryBanner from '@/mixins/idCloudinary'
export default {
  name: 'Ko10Deals',
  mixins: [idCloudinaryBanner],
  props: {
    offers: {
      type: Object,
      required: true,
    },
    settingGeneral: {
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
.content-deal {
  background: var(--background_color_1);
  @apply w-full flex flex-col justify-items-center items-center;
}
.content-grid {
  @apply justify-center items-center;
}
.grid-left,
.grid-right {
  @apply w-full h-full flex flex-col justify-center items-center;
}
.content-image-left {
  @apply w-full h-auto relative flex justify-start cursor-pointer overflow-hidden transition-all ease-in duration-0.2;
}
.img-left {
  @apply w-full h-auto object-cover overflow-hidden transition-all ease-in duration-0.5;
}
.img-left:hover {
  @apply relative overflow-hidden transition-all ease-in duration-0.5;
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
.grid-right {
  @apply bg-no-repeat  bg-center;
}
.grid-item-tittle,
.grid-item-price,
.grid-item-button {
  @apply w-full flex flex-col justify-center items-center text-center;
}
.txt-tittle,
.txt-subtittle,
.txt-price-1,
.txt-price-2 {
  font-family: var(--font-style-1) !important;
  @apply text-center;
}
@screen sm {
  .content-grid {
    @apply w-9/0 grid grid-cols-1 gap-4;
  }
  .txt-tittle {
    font-size: var(--fontSizeTitle);
    color: var(--color_title);
    font-weight: var(--fontWeightTitle);
    @apply my-30;
  }
  .grid-item-border {
    background-color: var(--color_border);
    @apply w-60 h-2 mb-30;
  }
  .txt-subtittle {
    font-size: 15px;
    color: var(--color_subtitle);
    @apply mb-30;
  }
  .txt-price-1 {
    font-size: 28px;
    color: var(--color_price);
    @apply font-semibold leading-1;
  }
  .txt-price-2 {
    font-size: 18px;
    color: var(--color_offerts);
    @apply font-medium leading-1 line-through;
  }
  .grid-item-price {
    @apply mb-60;
  }
  .btn {
    height: 58px;
    border-radius: var(--radius_btn);
    border-color: var(--colorBorderBTn);
    color: var(--colorTextBTn);
    font-size: 16px;
    @apply flex justify-center items-center w-auto px-60 border font-semibold;
  }
  .btn:hover {
    background-color: var(--hover_Bg_btn);
    border-color: var(--hover_Bg_btn);
    color: var(--hover_text_btn);
  }
  .grid-right {
    @apply px-10 pb-20;
  }
  .content-deal {
    @apply py-20;
  }
}
@screen md {
  .content-grid {
    @apply w-9/5;
  }
  .txt-subtittle {
    @apply mb-60;
  }
  .grid-item-price {
    @apply mb-80;
  }
  .grid-right {
    @apply px-20 pb-0;
  }
  .content-deal {
    @apply py-40;
  }
}
@screen lg {
  .content-grid {
    @apply grid grid-cols-2;
  }
  .btn {
    @apply w-auto px-40 border;
  }
}
@media (min-width: 1400px) {
  .content-grid {
    max-width: 1400px;
    @apply w-full grid grid-cols-2;
  }
}
</style>
