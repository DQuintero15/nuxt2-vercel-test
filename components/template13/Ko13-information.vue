<template>
  <div
    v-if="information"
    class="content-section"
    :style="[information, settingGeneral]"
  >
    <div
      class="content-wrapper"
      :style="[
        {
          '--font-style-1': settingGeneral?.fount_1 ?? 'Roboto',
        },
      ]"
    >
      <div
        v-for="(item, index) in information.values"
        :key="index"
        class="wrapper-content-items"
      >
        <img
          v-lazy="idCloudinary(item.url_img, 150, 150)"
          alt="imgInfo1"
          class="contentImg"
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
</template>
<script>
import idCloudinary from '@/mixins/idCloudinary'
export default {
  name: 'Ko13Information',
  mixins: [idCloudinary],
  props: {
    information: {
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
  background-color: var(--background_color_1);
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
  /* border: 1px solid; */
  padding: 20px;
  max-width: 380px;
}
.contentImg {
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
  .content-section {
    @apply pt-30 pb-20;
  }
}
@screen sm {
  .content-wrapper {
    @apply w-full grid grid-cols-1 gap-6 px-10;
  }
  .wrapper-content-items {
    max-width: 680px;
    width: 100%;
    height: 100%;
  }
}
@screen md {
  .content-wrapper {
    @apply w-full grid grid-cols-3 gap-6 px-10;
  }
}
@media (min-width: 1200px) {
  .content-wrapper {
    max-width: 1300px;
    @apply w-full h-auto px-20;
  }
}
</style>
