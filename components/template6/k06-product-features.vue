<template>
  <div
    v-if="productFeatures"
    class="mb-40"
    :style="{
      backgroundColor: productFeatures?.bg_color || 'white',
    }"
  >
    <div
      class="mx-auto max-w-2xl px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8"
    >
      <div class="max-w-3xl">
        <h2
          v-if="productFeatures?.subTitle"
          class="font-medium"
          :style="{
            color: productFeatures?.color_subTitle || '#6b7280',
          }"
        >
          {{ productFeatures.subTitle }}
        </h2>
        <p
          v-if="productFeatures?.title"
          class="mt-2 text-3xl font-bold tracking-tight sm:text-4xl"
          :style="{
            color: productFeatures?.color_title || '#111827',
          }"
        >
          {{ productFeatures.title }}
        </p>
        <p
          v-if="productFeatures?.description"
          class="mt-4"
          :style="{
            color: productFeatures?.color_description || '#6b7280',
          }"
        >
          {{ productFeatures.description }}
        </p>
      </div>

      <div
        v-if="productFeatures?.values?.length > 0"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8 items-start gap-x-6 gap-y-16 mt-30 md:mt-50"
      >
        <div
          v-for="(items, index) in productFeatures.values"
          :key="index"
          class="flex flex-col-reverse"
        >
          <div class="mt-6">
            <h3
              v-if="items?.title"
              class="text-sm font-bold"
              :style="{
                color: items?.color_title || '#111827',
              }"
            >
              {{ items.title }}
            </h3>
            <p
              v-if="items?.description"
              class="mt-10 text-sm"
              :style="{
                color: items?.color_description || '#6b7280',
              }"
            >
              {{ items.description }}
            </p>
          </div>
          <div
            v-if="items?.img"
            class="w-full h-full max-w-[280px] max-h-[280px] overflow-hidden rounded-lg"
            :style="{
              backgroundColor: items?.bg_img || '#e5e7eb',
            }"
          >
            <img
              :src="idCloudinary(items.img, 550, 550)"
              :alt="items.title"
              width="280"
              height="280"
              class="object-cover object-center w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import idCloudinary from '@/mixins/idCloudinary'
export default {
  mixins: [idCloudinary],
  props: {
    productFeatures: {
      type: Object,
      required: true,
    },
    settingsGeneral: {
      type: Object,
      required: true,
    },
  },
}
</script>
