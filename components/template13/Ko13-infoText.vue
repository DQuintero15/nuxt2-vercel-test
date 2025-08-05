<template>
  <div
    v-if="infoText"
    class="w-full flex flex-col justify-center items-center content-section"
    :style="[infoText, settingGeneral]"
  >
    <div
      class="w-full max-w-[1300px] flex justify-center items-center px-10 md:px-20"
    >
      <p class="setting_text" :style="`text-align: ${infoText.justingText};`">
        {{ infoText.text }}
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Ko13InfoTexto',
  props: {
    settingGeneral: {
      type: Object,
      required: true,
    },
    infoText: {
      type: Object,
      required: true,
    },
  },
}
</script>
<style scoped>
.content-section {
  background-color: var(--background_color_1);
  padding-top: var(--padding);
  padding-bottom: var(--padding);
}
.setting_text {
  font-size: var(--fontSizeTitle);
  font-weight: var(--fontWeighTitle);
  color: var(--colorText);
}
</style>
