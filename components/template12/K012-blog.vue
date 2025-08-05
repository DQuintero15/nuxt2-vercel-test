<template>
  <div class="w-full min-h-screen flex justify-center items-start">
    <div
      class="w-full max-w-[1300px] flex flex-col justify-center items-center mt-20 mb-10"
    >
      <div
        class="w-full bg-[#EFEFEF] rounded-8 px-10 py-5 flex flex-row justify-start items-center my-20"
      >
        <nuxt-link to="/">
          <p class="text-18 text-gray-600 font-bold">
            {{ $t('header_inicio') }}
          </p>
        </nuxt-link>
        <p class="mx-10 text-18 text-gray-600">></p>
        <h1 class="text-18 text-gray-600">{{ $t('header_blog') }}</h1>
      </div>
      <K05Blog v-bind="componentsProps" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  components: {
    K05Blog: () => import('@/components/template5/blog/Ko-Blog.vue'),
  },
  computed: {
    ...mapState(['dataStore', 'settingBase']),
    componentsProps() {
      return {
        dataStore: this.dataStore,
        settingK05Blog: this.settingByTemplate?.settings ?? this.settingBase,
      }
    },
  },
}
</script>
