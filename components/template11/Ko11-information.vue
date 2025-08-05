<template>
  <div
    class="content-section"
    :style="[
      settingKinformation,
      settingGeneral,
      {
        '--font-style-1': settingGeneral?.fount_1 ?? 'Roboto',
      },
    ]"
  >
    <div class="content-wrapper">
      <div
        v-for="(item, index) in settingKinformation.values"
        :key="index"
        class="w-full h-full"
      >
        <div
          class="wrapper-content-items"
          :style="`border-color: ${
            item.visibleBorder ? item.colorBorder : none
          }; background:${item.color_bg}; `"
        >
          <img
            v-lazy="idCloudinary(item.url_img_Top, 550, 550)"
            class="contentimg"
            :alt="`imgInfo${index}`"
          />
          <p
            class="text-title"
            :style="`color: ${item.colorTitle}; font-weight: ${item.fontWeighTitle};`"
          >
            {{ item.title }}
          </p>
          <p
            class="text-description"
            :style="`color: ${item.colorDescription}; font-weight: ${item.fontWeighPretitle};`"
          >
            {{ item.description }}
          </p>
          <template v-if="isInternalUrl(item.url_redirect)">
            <nuxt-link
              v-if="item.visbleBtn"
              :to="item.url_redirect ? item.url_redirect : ''"
              class="btn"
              :style="`color: ${item.colorBtn};`"
            >
              {{ item.textBtn }}
            </nuxt-link>
          </template>
          <template v-else>
            <a
              v-if="item.visbleBtn"
              :href="item.url_redirect ? item.url_redirect : ''"
              class="btn"
              :style="`color: ${item.colorBtn};`"
              rel="noreferrer noopener"
            >
              {{ item.textBtn }}
            </a>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import idCloudinary from '@/mixins/idCloudinary'
export default {
  name: 'Ko11Information',
  mixins: [idCloudinary],
  props: {
    settingKinformation: {
      type: Object,
      required: true,
    },
    settingGeneral: {
      type: Object,
      required: true,
    },
  },
  methods: {
    isInternalUrl(url) {
      return url.startsWith('/')
    },
  },
}
</script>
<style scoped>
.content-section {
  background: var(--background_color_1);
  @apply w-full flex flex-col justify-center items-center pt-60 pb-40;
}
.content-wrapper {
  @apply justify-center items-center;
}
.wrapper-content-items {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid;
  padding: 20px;
  max-width: 380px;
}
.contentimg {
  width: 60px;
  max-height: 60px;
  object-position: center;
  object-fit: cover;
}
.text-title {
  margin-top: 15px;
  font-size: 16px;
  line-height: 26px;
  font-weight: 500;
  letter-spacing: 0.3px;
  /* text-transform: capitalize; */
  text-align: center;
}
.text-description {
  padding: 0 10%;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: 0.4px;
  font-weight: 400;
  margin-top: 10px;
  text-align: center;
}
.btn {
  margin-top: 15px;
  font-size: 14px;
  line-height: 26px;
  letter-spacing: 0.3px;
  text-decoration: underline;
  text-transform: uppercase;
  cursor: pointer;
}
@media (max-width: 600px) {
  .wrapper-content-items {
    padding: 10px 15px;
  }
}
@screen sm {
  .content-wrapper {
    @apply w-9/0 grid grid-cols-1 gap-6;
  }
  .wrapper-content-items {
    max-width: 680px;
    width: 100%;
    height: 100%;
  }
}
@screen md {
  .content-wrapper {
    @apply w-9/5 grid grid-cols-3 gap-6;
  }
}
@media (min-width: 1200px) {
  .content-wrapper {
    max-width: 1200px;
    @apply w-full h-auto;
  }
}
</style>
