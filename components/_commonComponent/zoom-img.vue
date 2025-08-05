<template>
  <figure
    class="zoom"
    :style="setBackground(idCloudinaryQuality(photo, 850, 850))"
    @mousemove="zoom"
  >
    <img
      class="photo_main"
      :src="idCloudinaryQuality(photo, 850, 850)"
      alt="Product Img"
      @mouseover="activeZoom = !activeZoom"
    />
  </figure>
</template>

<script>
import idCloudinary from '@/mixins/idCloudinary'
export default {
  name: 'ZoomImgDetails',
  mixins: [idCloudinary],
  props: {
    photo: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      activeZoom: true,
    }
  },
  methods: {
    zoom(e) {
      const zoomer = e.currentTarget
      let offsetX, offsetY
      if (e.offsetY) {
        e.offsetY ? (offsetY = e.offsetY) : (offsetX = e.touches[0].pageY)
      }
      if (e.offsetX) {
        e.offsetX ? (offsetX = e.offsetX) : (offsetX = e.touches[0].pageX)
      }
      const x = (offsetX / zoomer.offsetWidth) * 80
      const y = (offsetY / zoomer.offsetHeight) * 80
      zoomer.style.backgroundPosition = `${x}% ${y}%`
    },
    setBackground(p) {
      return `background-image: url('${p}')`
    },
  },
}
</script>

<style scoped>
figure.zoom {
  max-width: 100%;
  max-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  position: relative;
  overflow: hidden;
  cursor: zoom-in;
  margin-bottom: 10px;
}
figure.zoom img {
  max-width: 100%;
  max-height: 576px;
  background-color: #fff;
  transition: opacity 0.3s;
}
.photo_main {
  object-fit: contain;
}
figure.zoom img:hover {
  opacity: 0;
}
</style>
