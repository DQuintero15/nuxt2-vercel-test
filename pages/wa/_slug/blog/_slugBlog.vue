<template>
  <div id="width" class="flex w-full flex-col items-center justify-center">
    <KArticleWapi />
  </div>
</template>

<script>
export default {
  components: {
    KArticleWapi: () =>
      import('@/components/whatsapp/blog_page/Ko-articulo.vue'),
  },
  layout: 'wa',
  mounted() {
    this.onResize()
    window.addEventListener('resize', this.onResize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    onResize() {
      const widthOutput = document.querySelector('#width')
      if (window.innerWidth > 1300) {
        widthOutput.style.width = '900px'
      } else {
        widthOutput.style.width = window.innerWidth + 'px'
      }
    },
  },
}
</script>
