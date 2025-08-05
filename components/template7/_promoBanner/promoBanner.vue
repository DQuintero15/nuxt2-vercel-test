<template>
  <div class="content-wrapp">
    <div class="content-wrapp-left">
      <figure class="promo-banner-images">
        <img
          class="images"
          :src="idCloudinaryBanner(ban.backgroundBanner1, 'banner')"
          alt=""
        />
      </figure>
    </div>
    <div class="content-wrapp-medium border">
      <div class="images">
        <figure class="promo-banner-images">
          <img
            class="images"
            :src="idCloudinaryBanner(ban.backgroundBanner2, 'banner')"
            alt=""
          />
        </figure>
      </div>
      <div class="images">
        <figure class="promo-banner-images">
          <img
            class="images"
            :src="idCloudinaryBanner(ban.backgroundBanner3, 'banner')"
            alt=""
          />
        </figure>
      </div>
    </div>
    <div class="content-wrapp-right">
      <figure class="promo-banner-images">
        <img
          class="images"
          :src="idCloudinaryBanner(ban.backgroundBanner4, 'banner')"
          alt=""
        />
      </figure>
    </div>
  </div>
</template>
<script>
import idCloudinary from '@/mixins/idCloudinary'
export default {
  mixins: [idCloudinary],
  props: {
    ban: {
      type: Array,
      required: true,
    },
  },
}
</script>
<style scoped>
.content-banner {
  @apply w-full flex flex-row justify-center items-center;
}
.content-wrapp {
  @apply w-full grid grid-cols-3 gap-4 justify-center items-center;
}
.content-wrapp-left,
.content-wrapp-right {
  @apply w-full flex flex-row justify-center items-center;
}
.content-wrapp-medium {
  @apply w-full grid grid-cols-1 gap-4 justify-center items-center;
}
.images {
  @apply w-full h-full;
}
</style>
