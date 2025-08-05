<template>
  <div
    v-if="information"
    class="mb-20"
    :style="{
      backgroundColor: information?.bg_color || 'white',
    }"
  >
    <div
      class="mx-auto max-w-2xl px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8"
    >
      <div class="mx-auto max-w-3xl text-center">
        <h2
          v-if="information.title"
          class="text-3xl font-bold tracking-tight sm:text-4xl"
          :style="{
            color: information?.color_title || '#111827',
          }"
        >
          {{ information.title }}
        </h2>
        <p
          v-if="information.description"
          class="mt-10"
          :style="{
            color: information?.color_description || '#6b7280',
          }"
        >
          {{ information.description }}
        </p>
      </div>

      <div v-if="information?.values?.length > 0" class="mt-50 space-y-16">
        <div
          v-for="(items, index) in information.values"
          :key="index"
          class="flex flex-col-reverse lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-8"
        >
          <div
            :class="[
              index % 2 === 0
                ? 'lg:col-start-1'
                : 'lg:col-start-8 xl:col-start-9',
              'mt-6 lg:col-span-5 lg:row-start-1 lg:mt-0 xl:col-span-4',
            ]"
          >
            <h3
              v-if="items?.title"
              class="text-lg font-bold"
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
            :class="[
              index % 2 === 0
                ? 'lg:col-start-6 xl:col-start-5'
                : 'lg:col-start-1',
              'flex-auto lg:col-span-7 lg:row-start-1 xl:col-span-8',
            ]"
          >
            <div
              v-if="items?.img"
              class="w-full h-full max-w-[832px] max-h-[333px] overflow-hidden rounded-lg"
              :style="{
                backgroundColor: items?.bg_img || '#e5e7eb',
              }"
            >
              <img
                :src="idCloudinary(items.img, 850, 352)"
                :alt="items.title"
                width="832"
                height="333"
                class="object-cover object-center"
              />
            </div>
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
    information: {
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
<!-- <script>
export default {
  data() {
    return {
      features: [
        {
          name: 'Minimal and thoughtful',
          description:
            'Our laptop sleeve is compact and precisely fits 13" devices. The zipper allows you to access the interior with ease, and the front pouch provides a convenient place for your charger cable.',
          imageSrc:
            'https://tailwindui.com/img/ecommerce-images/product-feature-07-detail-01.jpg',
          imageAlt:
            'White canvas laptop sleeve with gray felt interior, silver zipper, and tan leather zipper pull.',
        },
        {
          name: 'Refined details',
          description:
            'We design every detail with the best materials and finishes. This laptop sleeve features durable canvas with double-stitched construction, a felt interior, and a high quality zipper that hold up to daily use.',
          imageSrc:
            'https://tailwindui.com/img/ecommerce-images/product-feature-07-detail-02.jpg',
          imageAlt: 'Detail of zipper pull with tan leather and silver rivet.',
        },
      ],
    }
  },
}
</script> -->
