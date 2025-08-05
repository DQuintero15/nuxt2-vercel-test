<template>
  <nuxt-link :to="image.url_redirect" class="h-full w-full">
    <img
      :src="idCloudinary(image.img, 550, 550)"
      class="h-full w-full remove_bg max-w-[110px] max-h-[110px]"
      width="110"
      height="110"
      :alt="`Imágenes logos ${index}`"
    />
  </nuxt-link>
</template>

<script>
import idCloudinary from '@/mixins/idCloudinary'
export default {
  mixins: [idCloudinary],
  props: {
    image: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
}
</script>
