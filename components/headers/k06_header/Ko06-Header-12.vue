<template>
  <!-- sticky top-0 -->
  <header
    class="z-10 flex max-h-[120px] w-full items-center justify-center px-10 md:max-h-10/0"
    :style="[
      settingByTemplate6[0].setting6Header,
      settingByTemplate6[0].setting6General,
      {
        '--font-style-1':
          settingByTemplate6[0]?.setting6General?.font ?? 'Poppins',
        backgroundColor: settingByTemplate6[0].setting6Header.bg_color,
        paddingTop: settingByTemplate6[0].setting6Header['--padding_logo'],
        paddingBottom: settingByTemplate6[0].setting6Header['--padding_logo'],
      },
    ]"
  >
    <div class="flex w-full max-w-7xl items-center justify-between">
      <div class="flex max-h-[120px] items-center justify-center md:max-h-10/0">
        <div
          class="flex w-full items-center justify-center"
          :style="`max-width:${settingByTemplate6[0].setting6Header['--with_logo']};`"
        >
          <img
            loading="lazy"
            :src="imageUrl"
            class="w-full object-contain object-left"
            alt="LogoStore"
            @error="setDefaultImage"
          />
        </div>
      </div>
      <div class="flex flex-row items-center">
        <!-- <button
          class="flex flex-row justify-center items-center cursor-pointer transition-all ease-in duration-0.3"
          @click="openOrder"
        >
          <i
            class="w-36 h-auto flex justify-center items-center relative cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              height="23"
              :fill="settingByTemplate6[0].setting6Header['--color_icon']"
              class="transition-all ease-in duration-0.2 icon-shop"
              viewBox="0 0 16 16"
            >
              <title>Cart</title>
              <path
                d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"
              />
            </svg>
          </i>
          <div
            class="w-auto h-15 flex justify-center items-center rounded-full -mt-20 -ml-8"
            :style="{
              backgroundColor:
                settingByTemplate6[0].setting6Header['--color_border'],
            }"
          >
            <span
              class="pt-1 px-4 text-white-white text-10 leading-12 tracking-0 font-semibold num-items"
              :style="{
                color:
                  settingByTemplate6[0].setting6Header['--background_color_1'],
              }"
            >
              {{ productsCart }}
            </span>
          </div>
        </button> -->
      </div>
    </div>
    <!-- <KoOrder :data-store="dataStore" /> -->
  </header>
</template>

<script>
export default {
  // components: {
  //   KoOrder: () => import('../_order1/order1.vue'),
  // },
  props: {
    dataStore: {
      type: Object,
      required: true,
    },
    settingByTemplate6: {
      type: Array,
      required: true,
    },
    logoStore: {
      type: Object,
      required: true,
    },
  },
  computed: {
    // productsCart() {
    //   return this.$store.state.productsCart.length
    // },
    imageUrl() {
      if (this.fallbackImage) {
        return this.fallbackImage
      }
      if (this.logoStore?.logoMigrated === 1) {
        return this.logoStore.logo
      } else {
        return `${this.$store.state.urlKomercia}/logos/${this.logoStore.identifier}`
      }
    },
  },
  methods: {
    setDefaultImage() {
      this.fallbackImage = require('@/assets/img/logo_nuevas_tiendas.png')
    },
    // openOrder() {
    //   this.$gtm.push({
    //     event: 'OpenCart',
    //     action: 'click',
    //   })
    //   this.showMenu = false
    //   this.$store.commit('SET_OPEN_ORDER', true)
    // },
  },
}
</script>

<style scoped>
* {
  font-family: var(--font-style-1) !important;
}
</style>
