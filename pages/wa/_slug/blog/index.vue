<template>
  <div id="width" class="w-full flex flex-col justify-center items-center">
    <KBlogWapi />
  </div>
</template>

<script>
export default {
  name: 'IndexBlogWa',
  components: {
    KBlogWapi: () => import('@/components/whatsapp/blog_page/Ko-Blog.vue'),
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
