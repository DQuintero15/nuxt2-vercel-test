<template>
  <div
    v-if="banner"
    class="mb-40"
    :style="{
      backgroundColor: banner?.bg_color || 'white',
    }"
  >
    <div
      class="mx-auto max-w-2xl px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8"
    >
      <div
        class="grid grid-cols-1 items-center gap-x-8 gap-y-16 lg:grid-cols-2"
      >
        <div>
          <div
            class="border-b pb-10"
            :style="{
              borderColor: banner?.color_border || '#e5e7eb',
            }"
          >
            <h2
              v-if="banner.subTitle"
              class="font-medium"
              :style="{
                color: banner?.color_subTitle || '#6b7280',
              }"
            >
              {{ banner.subTitle }}
            </h2>
            <p
              v-if="banner.title"
              class="mt-2 text-3xl font-bold tracking-tight sm:text-4xl"
              :style="{
                color: banner?.color_title_main || '#111827',
              }"
            >
              {{ banner.title }}
            </p>
          </div>
          <dl v-if="banner?.values?.length > 0" class="mt-20 space-y-10">
            <div v-for="(items, index) in banner.values" :key="index">
              <dt
                v-if="items?.title"
                class="text-sm font-bold"
                :style="{
                  color: banner?.color_title || '#111827',
                }"
              >
                {{ items.title }}
              </dt>
              <dd
                v-if="items?.description"
                class="mt-3 text-sm"
                :style="{
                  color: banner?.color_description || '#6b7280',
                }"
              >
                {{ items.description }}
              </dd>
            </div>
          </dl>
        </div>

        <div>
          <div class="max-h-[616px] max-w-[616px] overflow-hidden rounded-lg">
            <img
              :src="
                banner.img_main
                  ? idCloudinary(banner.img_main, 850, 850)
                  : 'https://res.cloudinary.com/komercia-components/image/upload/c_scale,q_auto:best,f_auto/v1598040886/sws8xa8z0oyu252nqxzv.webp'
              "
              alt="banner1"
              width="616"
              height="616"
              class="h-full w-full object-cover object-center"
            />
          </div>
          <div
            class="mt-4 grid grid-cols-2 gap-4 sm:mt-6 sm:gap-6 lg:mt-8 lg:gap-8"
          >
            <div class="max-h-[292px] max-w-[292px] overflow-hidden rounded-lg">
              <img
                :src="
                  banner.img_second_1
                    ? idCloudinary(banner.img_second_1, 550, 550)
                    : 'https://res.cloudinary.com/komercia-components/image/upload/c_scale,q_auto:best,f_auto/v1598040886/sws8xa8z0oyu252nqxzv.webp'
                "
                alt="banner2"
                width="292"
                height="292"
                class="h-full w-full object-cover object-center"
              />
            </div>
            <div class="max-h-[292px] max-w-[292px] overflow-hidden rounded-lg">
              <img
                :src="
                  banner.img_second_2
                    ? idCloudinary(banner.img_second_2, 550, 550)
                    : 'https://res.cloudinary.com/komercia-components/image/upload/c_scale,q_auto:best,f_auto/v1598040886/sws8xa8z0oyu252nqxzv.webp'
                "
                alt="banner3"
                width="292"
                height="292"
                class="h-full w-full object-cover object-center"
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
    banner: {
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
