<template>
  <div class="content-slide-categorys">
    <div class="content-categories">
      <div id="swiper-slide-categories" class="itens-slide-categories">
        <div
          class="tags"
          :class="idCategory == '' ? 'active-tag' : 'disable-tag'"
        >
          <p class="txt-category" @click="clearFilters">
            {{ $t('home_todo') }}
          </p>
        </div>
        <div
          v-for="category in categorias"
          :key="category.id"
          class="tags"
          :class="category.id == categorySelect ? 'active-tag' : 'disable-tag'"
          @click="setToQueryFilter('category', category)"
        >
          <p class="txt-category">
            {{ category.nombreCategoriaProducto }}
          </p>
        </div>
      </div>
    </div>
    <div
      v-if="
        settingByTemplate.state_subcategorias == 1 &&
        selectedSubcategories.length > 0
      "
      class="content-categories"
    >
      <div id="swiper-slide-categories" class="itens-slide-categories">
        <div
          v-for="(subcategory, index) in selectedSubcategories"
          :key="index"
          class="tags"
          :class="
            subcategory.id == subCategorySelect ? 'active-tag' : 'disable-tag'
          "
          @click="setToQueryFilter('subcategories', subcategory)"
        >
          <p class="txt-category">
            {{ subcategory.nombreSubcategoria }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'CategorySlideWa3',
  props: {
    dataStore: {
      type: Object,
      required: true,
    },
    settingByTemplate: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      idCategory: '',
      categorySelect: '',
      subCategorySelect: '',
      selectedSubcategories: [],
      query: {
        page: 1,
        category: null,
        subcategory: null,
      },
    }
  },
  computed: {
    ...mapState(['categorias', 'stateWapiME']),
    ...mapState({
      subcategories: (state) => state.subcategorias,
    }),
  },
  mounted() {
    this.getInformationFromQuery()
  },
  methods: {
    setToQueryFilter(type, value) {
      if (type === 'category') {
        this.sendAnalyticsStore(value.id)
        this.query.subcategory = null
        this.subCategorySelect = null
        this.query.category = value.nombreCategoriaProducto || null
        this.categorySelect = value.id
        this.idCategory = value.id
        this.selectedSubcategories = this.subcategories.filter(
          (item) => item.categoria === value.id
        )
        this.$store.commit(
          'products/SET_CATEGORY_PRODUCTO',
          value.nombreCategoriaProducto
        )
        this.$store.commit('SET_OPEN_ORDER_MENU_LEFT', false)
      } else if (type === 'subcategories') {
        this.categorias.filter((item) => {
          if (item.id === value.categoria) {
            this.query.category = item.nombreCategoriaProducto
          }
        })
        this.$store.commit(
          'products/SET_CATEGORY_PRODUCTO',
          this.query.category
        )
        this.$store.commit(
          'products/SET_SUBCATEGORY_PRODUCTO',
          value.nombreSubcategoria || null
        )
        this.query.subcategory = value.id || null
        this.subCategorySelect = value.id
        this.idCategory = value.id
        this.$store.commit('SET_OPEN_ORDER_MENU_LEFT', false)
      }
      this.$store.commit('SET_STATE_BANNER', false)
      this.setInformationFromQuery(this.query)
    },

    async setInformationFromQuery({ page, category, subcategory }) {
      const query = {}

      if (page !== null && page !== undefined) query.page = page
      if (category !== null) query.category = category
      if (subcategory !== null) query.subcategory = subcategory

      try {
        await this.$router.push({
          path: `${this.stateWapiME ? `/wa/${this.dataStore.id}` : '/'}`,
          query,
        })
      } catch (error) {
        console.error('Error navigating:', error)
      }
    },
    async getInformationFromQuery() {
      const query = this.$route.query

      this.query.category = query.category || null
      this.query.subcategory = query.subcategory || null

      if (this.query.category || this.query.subcategory) {
        this.setData(this.query)
      }
    },
    setData(value) {
      if (value.category) {
        this.categorias.filter((item) => {
          if (item.nombreCategoriaProducto === value.category) {
            this.categorySelect = item.id
            this.idCategory = item.id
          }
        })
        this.selectedSubcategories = this.subcategories.filter(
          (item) => item.categoria === this.idCategory
        )
      }

      this.subCategorySelect = value.subcategory ?? ''

      this.$store.commit('SET_STATE_BANNER', false)
    },
    clearFilters() {
      this.query = {
        page: 1,
        category: null,
        subcategory: null,
      }
      this.idCategory = ''
      this.categorySelect = ''
      this.subCategorySelect = ''
      this.selectedSubcategories = []
      this.$router.push({
        path: `${this.stateWapiME ? `/wa/${this.dataStore.id}` : '/'}`,
        query: '',
      })
      this.$store.commit('products/SET_CATEGORY_PRODUCTO', null)
      this.$store.commit('products/SET_SUBCATEGORY_PRODUCTO', null)
      this.$store.commit('SET_OPEN_ORDER_MENU_LEFT', false)
      this.$store.commit('SET_STATE_BANNER', true)
    },
    async sendAnalyticsStore(value) {
      await this.$store.dispatch('SEND_ANALYTICS_STORE', {
        storeId: this.dataStore.id,
        event: 'CLICKED_CATEGORY',
        categoryId: value,
      })
    },
  },
}
</script>
<style scoped>
.content-slide-categorys {
  z-index: 10;
  @apply w-full flex flex-col justify-center items-center bg-white-white py-5 box-border sticky top-0;
}
@screen sm {
  .content-categories {
    border-color: #d6d6d6;
    @apply w-9/5 flex flex-row justify-center items-center border-b pb-10 mb-10;
  }
  .itens-slide-categories {
    @apply w-full flex flex-row items-center overflow-x-auto overflow-y-hidden;
  }
  .itens-slide-categories::-webkit-scrollbar {
    background: transparent;
    @apply hidden;
  }
  .active-tag {
    max-height: 32px;
    background-color: #a1a1a1;
    @apply w-full flex justify-center items-center cursor-pointer mr-10 rounded-md p-10;
  }
  .disable-tag {
    max-height: 32px;
    background-color: #eaeaea;
    @apply w-full flex justify-center items-center cursor-pointer mr-10 rounded-md p-10;
  }
  .txt-category {
    font-size: 14px;
    color: #3d3d3d;
    font-family: 'Poppins', sans-serif !important;
    @apply w-full flex flex-col justify-center items-center font-medium;
  }
  .tags {
    display: flex;
    align-items: center;
    padding: 3px 12px;
    font-size: 12px;
    height: 50px;
    font-weight: 600;
    cursor: pointer;
    margin-right: 5px;
    transition: all 600ms ease-in;
    white-space: nowrap;
  }
}
@media (min-width: 768px) {
  .txt-category {
    font-size: 16px;
  }
  .active-tag {
    @apply py-4;
  }
}
</style>
