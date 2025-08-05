<template>
  <el-drawer
    :visible.sync="openSearch"
    :before-close="closedSearch"
    direction="ttb"
    :with-header="false"
    :modal-append-to-body="false"
    class="width-drawer"
    size="180px"
  >
    <div
      class="w-full h-full bg-white-white flex justify-center items-end box-border overflow-hidden"
      :style="[
        {
          '--font-style-1':
            settingByTemplate[0]?.setting9General?.fount_1 ?? 'Poppins',
        },
        {
          '--font-style-2':
            settingByTemplate[0]?.setting9General?.fount_2 ?? 'Roboto',
        },
      ]"
    >
      <div
        class="absolute right-20 top-20 w-30 h-30 cursor-pointer flex justify-center items-center group"
        @click="closedSearch"
      >
        <div
          class="h-4 w-30 absolute bg-black rounded-2 transform -rotate-45 transition-all ease-in duration-200 group-hover:rotate-0"
        ></div>
        <div
          class="h-4 w-30 absolute bg-black rounded-2 transform rotate-45 transition-all ease-in duration-200 group-hover:rotate-0"
        ></div>
      </div>
      <div
        class="w-full max-w-[1300px] flex flex-col md:flex-row justify-center items-center pt-20 pb-30 px-30"
      >
        <div
          class="w-full h-full flex flex-row justify-start items-center mr-10"
        >
          <input
            v-model="searchProduct"
            type="search"
            required
            class="w-full h-full text-20 md:text-35 border-none"
            :placeholder="$t('home_buscar')"
            @change="getSuggestedProducts"
            @keyup.enter="getSuggestedProducts"
          />
        </div>
        <button
          class="bg-[#2c2930] hover:bg-[#1c1a1f] px-10 py-5 text-center text-white-white text-20 md:text-35 w-full md:w-[145px] mt-10 md:mt-0"
          @click="getSuggestedProducts"
        >
          {{ $t('home_vamos') }}
        </button>
      </div>
    </div>
  </el-drawer>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'KoSearch09',
  props: {
    dataStore: {
      type: Object,
      required: true,
    },
    settingByTemplate: {
      type: Array,
      required: true,
    },
  },
  computed: {
    ...mapState(['openSearch']),
    ...mapState({
      facebookPixel: (state) => state.analytics_tagmanager,
    }),
    searchProduct: {
      get() {
        return this.$store.state.products.search_product
      },
      set(newValue) {
        this.$store.commit('products/SET_SEARCH_PRODUCT', newValue)
      },
    },
  },
  methods: {
    closedSearch() {
      this.$store.commit('SET_OPEN_SEARCH', false)
    },
    async getSuggestedProducts() {
      this.setInformationFromQuery({ page: 1, name: this.searchProduct })
      this.getSearch(this.searchProduct)
    },
    async setInformationFromQuery({ page, name }) {
      const query = {}
      if (page !== null && page !== undefined) query.page = page
      if (name !== null) this.searchProduct = name
      try {
        this.$router.push({
          path: '/productos',
          query: { name: this.searchProduct },
        })
        this.closedSearch()
      } catch (error) {
        console.error('Error navigating:', error)
      }
    },
    getSearch(value) {
      if (value) {
        if (this.facebookPixel?.pixel_facebook != null) {
          window.fbq('track', 'Search', { search_string: value })
        }
      }
    },
  },
}
</script>

<style scoped>
* {
  font-family: var(--font-style-1) !important;
}

::-webkit-input-placeholder {
  @apply text-left text-20 md:text-35 text-[#2c2930];
}
</style>
