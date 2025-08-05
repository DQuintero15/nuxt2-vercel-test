<template>
  <div
    id="width"
    class="flex w-full flex-col items-center justify-center bg-slate-100"
  >
    <KoProductDetail class="w-full" />
    <KFooterWaLogo
      v-bind="componentsProps"
      class="w-full max-w-[900px] bg-white-white shadow-md"
    />
  </div>
</template>

<script>
export default {
  name: 'WapiMEDetail',
  components: {
    KoProductDetail: () =>
      import('@/components/whatsapp/Ko-ProductDetail-wa.vue'),
    KFooterWaLogo: () =>
      import('@/components/footers/footer_wa/ko-Footer-wa-logo.vue'),
  },
  layout: 'wa',
  computed: {
    dataStore() {
      return this.$store.state.dataStore
    },
    settingByTemplate() {
      return this.$store.state.settingByTemplate
    },
    componentsProps() {
      return {
        dataStore: this.dataStore,
        settingByTemplate:
          this.settingByTemplate &&
          this.settingByTemplate.tema &&
          this.settingByTemplate.estilo_categorias
            ? this.settingByTemplate
            : this.settingBaseWapi,
      }
    },
  },
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
      widthOutput.style.width = window.innerWidth + 'px'
      widthOutput.style.maxWidth = window.innerWidth + 'px'
    },
  },
}
</script>
