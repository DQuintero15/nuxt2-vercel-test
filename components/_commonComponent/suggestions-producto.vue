<template>
  <div
    class="box-border flex w-full flex-col items-center justify-center bg-transparent pb-10 pt-30"
  >
    <div
      class="flex w-full max-w-[1300px] items-center justify-start px-10 py-10 md:py-20"
    >
      <p class="color-title cursor-pointer text-18 font-bold">
        {{ $t('home_destacadosMsg') }}
      </p>
    </div>
    <KoSwiper
      :suggested-products="suggestedProducts"
      :setting-general="settingGeneral"
      :setting-card-products="settingCardProducts"
      :data-store="dataStore"
    />
  </div>
</template>

<script>
export default {
  name: 'KoSuggestionsProducto',
  components: {
    KoSwiper: () => import('./product-slider/product-swiper.vue'),
  },
  props: {
    suggestedProducts: {
      type: Array,
      required: true,
    },
    settingCardProducts: {
      type: Object,
      default: null,
    },
    settingGeneral: {
      type: Object,
      default: null,
    },
    settingByTemplate: {
      type: Object,
      default: null,
    },
    dataStore: {
      type: Object,
      default: null,
    },
  },
}
</script>

<style scoped>
.color-title {
  color: var(--color_title);
}
</style>
