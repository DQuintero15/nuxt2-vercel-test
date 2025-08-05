<template>
  <div class="content-slide-categorys">
    <div class="content-categories">
      <div
        v-if="categorias.length > 5"
        class="btn-scroll mr-10"
        @click="scrollLeft(1)"
      >
        <FlechaLeft-icon class="btn-scroll-icon" />
      </div>
      <div id="swiper-slide-categories" class="itens-slide-categories">
        <div class="wrapper-img-text" @click="clearFilters">
          <img
            v-if="dataStore.id == 12664"
            src="https://res.cloudinary.com/komerciaacademico/image/upload/c_scale,w_80,q_auto:best,f_auto/v1649430112/Xiaomi_logo__2021_ejxsbk.png"
            class="product-image"
            alt="icon all"
          />
          <img
            v-else
            src="https://res.cloudinary.com/komerciaacademico/image/upload/c_scale,w_80,q_auto:best,f_auto/v1649430214/2549900_umsosz.png"
            class="product-image"
            alt="icon all"
          />
          <div class="tag">
            <p
              :style="`border-color: ${
                settingByTemplate &&
                settingByTemplate.color_primario &&
                idCategory == ''
                  ? settingByTemplate.color_primario
                  : '#25D366'
              };`"
              :class="idCategory == '' ? 'active-tag ' : 'disable-tag'"
              class="txt-category"
              @click="clearFilters"
            >
              {{ $t('home_todo') }}
            </p>
          </div>
        </div>
        <div
          v-for="category in categorias"
          :key="category.id"
          class="wrapper-img-text"
          @click="setToQueryFilter('category', category)"
        >
          <img
            v-lazy="
              category.imagenCloudinary == null
                ? 'https://res.cloudinary.com/komerciaacademico/image/upload/c_scale,w_80,q_auto:best,f_auto/v1649367838/2659360_s1ap5f.png'
                : idCloudinary(category.imagenCloudinary, 150, 150)
            "
            :class="
              category.imagenCloudinary == 'sin_foto.jpeg'
                ? 'notproduct-image-res'
                : ''
            "
            class="product-image"
            alt="icon category"
          />
          <div class="tag">
            <p
              :style="`border-color: ${
                settingByTemplate &&
                settingByTemplate.color_primario &&
                category.id == idCategory
                  ? settingByTemplate.color_primario
                  : '#25D366'
              };`"
              class="txt-category"
              :class="
                category.id == categorySelect ? 'active-tag' : 'disable-tag'
              "
            >
              {{ category.nombreCategoriaProducto }}
            </p>
          </div>
        </div>
      </div>
      <div
        v-if="categorias.length > 5"
        class="btn-scroll ml-10"
        @click="scrollRight(1)"
      >
        <FlechaRight-icon class="btn-scroll-icon" />
      </div>
    </div>
    <div
      v-if="
        settingByTemplate.state_subcategorias == 1 &&
        selectedSubcategories.length > 0
      "
      class="content-categories"
    >
      <div class="itens-slide-categories">
        <div
          v-for="(subcategory, index) in selectedSubcategories"
          :key="index"
          class="wrapper-img-text"
          @click="setToQueryFilter('subcategories', subcategory)"
        >
          <img
            v-lazy="
              subcategory.imagenCloudinary == null
                ? 'https://res.cloudinary.com/komerciaacademico/image/upload/c_scale,w_80,q_auto:best,f_auto/v1649367838/2659360_s1ap5f.png'
                : idCloudinary(subcategory.imagenCloudinary, 150, 150)
            "
            :class="
              subcategory.imagenCloudinary == 'sin_foto.jpeg'
                ? 'notproduct-image-res'
                : ''
            "
            class="product-image"
            alt="icon category"
          />
          <div class="tag">
            <p
              :style="`border-color: ${
                settingByTemplate &&
                settingByTemplate.color_primario &&
                subcategory.id == idSubCategory
                  ? settingByTemplate.color_primario
                  : '#25D366'
              };`"
              class="txt-category"
              :class="
                subcategory.id == subCategorySelect
                  ? 'active-tag'
                  : 'disable-tag'
              "
            >
              {{ subcategory.nombreSubcategoria }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import idCloudinary from '@/mixins/idCloudinary'
export default {
  name: 'CategorySlideWa',
  mixins: [idCloudinary],
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
    scrollLeft(value) {
      this.scrollSwiperSlide(value, -300)
    },
    scrollRight(value) {
      this.scrollSwiperSlide(value, 300)
    },
    scrollSwiperSlide(value, scrollAmount) {
      const elementId =
        value === 1 ? 'swiper-slide-categories' : 'swiper-slide-subcategories'
      document.getElementById(elementId).scrollLeft += scrollAmount
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
  @apply w-full flex flex-col justify-center items-center box-border sticky top-0 bg-white-white;
}
.notproduct-image-res {
  height: 100%;
  max-height: 70px;
  max-width: 70px;
  width: 100%;
}
.product-image {
  width: 100%;
  min-width: 70px;
  max-width: 70px;
  height: 70px;
  min-height: 70px;
  max-height: 70px;
  object-fit: cover;
  overflow: hidden;
}
.wrapper-img-text {
  /* width: 100%; */
  height: 105px;
  max-height: 105px;
  transition: all 600ms ease-in;
  white-space: nowrap;
  @apply flex flex-col items-center justify-start cursor-pointer mr-15;
}
.btn-scroll {
  top: 50%;
  @apply flex justify-center items-center cursor-pointer;
}
.btn-scroll-icon {
  font-size: 20px;
  color: black;
  bottom: 0.125em;
  @apply w-full flex justify-center items-center;
}
.btn-scroll-icon:hover {
  color: #25d366;
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
    @apply w-full flex justify-center items-center cursor-pointer px-5 border-b-4;
  }
  .disable-tag {
    @apply w-full flex justify-center items-center cursor-pointer rounded-full px-5;
  }
  .txt-category {
    font-size: 14px;
    color: #3d3d3d;
    font-family: 'Poppins', sans-serif !important;
    @apply w-full flex flex-col justify-center items-center font-medium;
  }
  .tag {
    color: black;
    margin-top: 5px;
    font-size: 12px;
    font-weight: 600;
  }
}
@media (min-width: 768px) {
  .txt-category {
    font-size: 16px;
  }
  .active-tag {
    /* background-color: #eaeaea; */
    /* @apply py-10; */
  }
}
@media (max-width: 420px) {
  .notproduct-image-res {
    max-height: 50px;
    max-width: 50px;
  }
  .product-image {
    min-width: 50px;
    max-width: 50px;
    height: 50px;
    min-height: 50px;
    max-height: 50px;
  }
  .wrapper-img-text {
    height: 85px;
    max-height: 85px;
  }
}
</style>
