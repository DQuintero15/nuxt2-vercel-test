<template>
  <el-drawer
    :visible.sync="openSearch"
    :before-close="handleClose"
    direction="btt"
    :with-header="false"
    :modal-append-to-body="false"
    class="width-drawer"
    size="80%"
  >
    <div
      class="box-border flex h-screen w-full flex-col items-center overflow-auto bg-white-white pb-10"
    >
      <div
        class="relative z-20 flex w-full flex-row items-center justify-center py-16 shadow-lg"
      >
        <input
          v-model="searchProduct"
          type="search"
          :placeholder="$t('header_buscar_producto')"
          class="input-search"
          @change="getSuggestedProducts"
          @keyup.enter="getSuggestedProducts"
        />
        <div
          class="group absolute right-10 top-3/0 flex h-50 w-50 cursor-pointer items-center justify-center"
          @click="handleClose"
        >
          <div
            class="absolute h-4 w-50 -rotate-45 transform rounded-2 bg-black transition-all duration-200 ease-in group-hover:rotate-0"
          ></div>
          <div
            class="absolute h-4 w-50 rotate-45 transform rounded-2 bg-black transition-all duration-200 ease-in group-hover:rotate-0"
          ></div>
        </div>
      </div>
      <div class="z-10 w-full max-w-[1300px] overflow-y-auto">
        <KProducts
          :data-store="dataStore"
          :search-products="ListProducts"
          :setting-card-products="settingCardProducts"
          :setting-general="settingGeneral"
        />
      </div>
    </div>
  </el-drawer>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'KoSearch7',
  components: {
    KProducts: () =>
      import('@/components/template7/Ko-ProductListSearchUp.vue'),
  },
  props: {
    dataStore: {
      type: Object,
      required: true,
    },
    settingGeneral: {
      type: Object,
      required: true,
    },
    settingCardProducts: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      ListProducts: [],
    }
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
  watch: {
    openSearch(value) {
      if (value === true) {
        this.getSuggestedProducts()
      }
    },
  },
  methods: {
    handleClose() {
      this.$store.commit('SET_OPEN_SEARCH', false)
      this.$router.push({ path: '', query: '' })
    },
    async getSuggestedProducts() {
      const { success, data } = await this.$store.dispatch(
        'products/GET_ALL_PRODUCTS',
        {
          id_tienda: this.dataStore.id,
          page: 1,
          limit: 15,
          name: this.searchProduct || '',
        }
      )
      if (success) {
        this.ListProducts = data.publicProductList
        this.setInformationFromQuery({ page: 1, name: this.searchProduct })
        this.getSearch(this.searchProduct)
      } else {
        this.ListProducts = []
      }
    },
    async setInformationFromQuery({ page, name }) {
      const query = {}
      if (page !== null && page !== undefined) query.page = page
      if (name !== null) query.name = name
      try {
        await this.$router.push({ path: '', query })
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
.input-search {
  @apply z-10 w-full max-w-[500px] items-center py-16 text-center text-5xl;
}
::-webkit-input-placeholder {
  @apply items-center text-center text-5xl text-gray-textHeader;
  font-family: 'Lora' !important;
}
input[type='search'] {
  border: none;
  width: 100%;
}
</style>
