<template>
  <div class="w-full flex justify-center items-center">
    <div
      class="w-full max-w-[1300px] flex flex-col justify-center items-center my-30"
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
        <h1 class="text-18 text-gray-600">{{ $t('header_contacto') }}</h1>
      </div>
      <K05Contact v-bind="componentsProps" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  components: {
    K05Contact: () => import('@/components/template5/Ko5-Contact.vue'),
  },
  computed: {
    ...mapState(['dataStore', 'settingBase']),
    componentsProps() {
      return {
        dataStore: this.dataStore,
        settingK05Contact: this.settingByTemplate?.settings ?? this.settingBase,
      }
    },
  },
}
</script>
