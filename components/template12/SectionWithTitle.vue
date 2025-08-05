<template>
  <div class="mt-8 section-with-title_container">
    <div class="pt-4 pb-4">
      <header class="text-center mb-20">
        <h2 class="font-semibold text-4xl uppercase text-gray-600">
          <small
            class="inline-block font-normal italic text-sm normal-case text-gray-400"
          >
            {{ subtitle }}
          </small>
          <br />
          {{ title }}
        </h2>
      </header>
      <div style="margin-top: -1.2rem"><slot></slot></div>
    </div>
    <hr class="h-20 bg-transparent border-transparent" />
    <hr class="border-transparent divider border-0" />
  </div>
</template>

<script>
import settingsProps from './mixins/ComponentProps'

export default {
  name: 'SectionWithTitle',
  mixins: [settingsProps],
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped>
.divider {
  background-image: url('~/assets/img/gradient-line.png');
  background-position: center;
  background-size: contain;
  height: 3px;
  width: 25%;
  margin: 0 auto;
}
</style>
