<template>
  <div class="wrapper_Category">
    <div class="content_Category">
      <div
        v-if="categorias.length > 8"
        class="btn-scroll"
        @click="scrollLeft(1)"
      >
        <FlechaLeft-icon class="btn-scroll-icon" />
      </div>
      <div class="content-item-category" id="swiper-slide-categories">
        <div class="tags" :class="idCategory === '' ? 'tags-active-wapi' : ''">
          <button class="name-category" @click="clearFilters">
            {{ $t('home_todo') }}
          </button>
        </div>
        <div
          v-for="category in categorias"
          :key="category.id"
          class="tags"
          :class="category.id == categorySelect ? 'tags-active-wapi' : ''"
        >
          <div @click="setToQueryFilter('category', category)">
            <p
              class="name-category"
              :class="
                category.id == categorySelect ? 'name-category-active' : ''
              "
            >
              {{ category.nombreCategoriaProducto }}
            </p>
          </div>
        </div>
      </div>
      <div
        v-if="categorias.length > 8"
        class="btn-scroll"
        @click="scrollRight(1)"
      >
        <FlechaRight-icon class="btn-scroll-icon" />
      </div>
    </div>
    <div
      v-if="settingByTemplate.state_subcategorias == 1"
      class="content_Category"
    >
      <div
        v-if="selectedSubcategories.length > 8"
        class="btn-scroll"
        @click="scrollLeft(2)"
      >
        <FlechaLeft-icon class="btn-scroll-icon" />
      </div>
      <div id="swiper-slide-subcategories" class="content-item-category">
        <div
          v-for="(subcategory, index) in selectedSubcategories"
          :key="index"
          class="tags"
          :class="subcategory.id == subCategorySelect ? 'tags-active-wapi' : ''"
          @click="setToQueryFilter('subcategories', subcategory)"
        >
          <p
            class="name-category"
            :class="
              subcategory.id == subCategorySelect ? 'name-category-active' : ''
            "
          >
            {{ subcategory.nombreSubcategoria }}
          </p>
        </div>
      </div>
      <div
        v-if="selectedSubcategories.length > 8"
        class="btn-scroll"
        @click="scrollRight(2)"
      >
        <FlechaRight-icon class="btn-scroll-icon" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'KoCategoriesWa1',
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
        this.$store.commit('products/SET_SUBCATEGORY_PRODUCTO', null)
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
    scrollLeft(value) {
      if (value == 1) {
        document.getElementById('swiper-slide-categories').scrollLeft -= 300
      } else if (value == 2) {
        document.getElementById('swiper-slide-subcategories').scrollLeft -= 300
      }
    },
    scrollRight(value) {
      if (value == 1) {
        document.getElementById('swiper-slide-categories').scrollLeft += 300
      } else if (value == 2) {
        document.getElementById('swiper-slide-subcategories').scrollLeft += 300
      }
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
.wrapper_Category {
  z-index: 3;
  margin-bottom: 20px;
  margin-top: 16px;
  border-top: 1px solid rgba(213, 213, 213, 0.473);
  border-bottom: 1px solid rgba(213, 213, 213, 0.473);
  @apply shadow flex flex-col w-full justify-center items-center box-border sticky top-0 bg-white-white;
}
.content_Category {
  width: 100%;
  padding: 0px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.btn-scroll {
  display: flex;
  justify-content: center;
  align-items: center;
  top: 50%;
  min-height: 50px;
  padding: 0px 6px;
  background: #e4e4e4;
  cursor: pointer;
}
.btn-scroll-icon {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: black;
  bottom: 0.125em;
}
.btn-scroll-icon:hover {
  color: white;
}
.content-item-category {
  width: 100%;
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  overflow-y: hidden;
}
.content-item-category::-webkit-scrollbar {
  width: 0 !important;
  display: none;
}
.content-item-category::-webkit-scrollbar {
  background: transparent;
  height: 5px;
  border: 1px solid rgba(161, 161, 161, 0.589);
}
.content-item-category::-webkit-scrollbar-track {
  box-shadow: inset 0 0 10px white;
  border-radius: 10px;
}
.content-item-category::-webkit-scrollbar-thumb {
  background: #25d366;
  border-radius: 10px;
}
.content-item-category::-webkit-scrollbar-thumb:hover {
  background: grey;
}
.name-category {
  font-size: 12px;
  font-weight: 500;
  color: #4e4e4e;
  cursor: pointer;
  margin-top: 3px;
  text-align: center;
  font-weight: bold;
}
.name-category-active {
  color: #075e54;
}
.tags {
  display: flex;
  align-items: center;
  color: black;
  background-color: white;
  padding: 3px 12px;
  font-size: 12px;
  height: 50px;
  font-weight: 600;
  cursor: pointer;
  margin-right: 5px;
  transition: all 600ms ease-in;
  white-space: nowrap;
}
.tags-active-wapi {
  color: #075e54;
  border-bottom: solid 2px #25d366;
  font-weight: bold;
  box-shadow: 0 2px 5px rgba(155, 238, 205, 0.42);
}

@media (max-width: 770px) {
  .btn-scroll {
    display: none;
  }
  .content_Category {
    padding: 0 5px;
  }
}
</style>
