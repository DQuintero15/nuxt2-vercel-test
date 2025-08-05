<template>
  <div v-if="iframe" class="wrapper_content360">
    <div v-if="iframe?.iframe" class="contenedor">
      <iframe
        :src="iframe.iframe"
        width="100%"
        height="100%"
        frameborder="0"
        allowfullscreen="true"
      >
      </iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Ko5Component360',
  computed: {
    iframe() {
      return this.$store.state.settingByTemplate
    },
  },
}
</script>

<style scoped>
.wrapper_content360 {
  width: 100%;
  background: var(--background_color_2);
}
.contenedor {
  width: 100%;
  height: 450px;
  /* max-width: 1300px; */
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (max-width: 800px) {
  .contenedor {
    height: 350px;
  }
}
</style>
