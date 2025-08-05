<template>
  <div
    class="mb-[120px] mt-50 flex w-full flex-col items-center justify-center"
  >
    <div
      id="section"
      class="flex w-9/0 flex-col items-center justify-center text-center"
    >
      <div class="mb-40 flex flex-row items-center justify-between">
        <div class="flex w-full flex-col items-center justify-center">
          <div
            class="grid w-full grid-cols-2 items-start justify-start gap-4 text-center md:grid-cols-3 lg:grid-cols-4"
          >
            <div v-for="product in searchProducts" :key="product.id">
              <KoProductCard
                :product="product"
                :setting-card-products="settingCardProducts"
                :setting-general="settingGeneral"
                class="h-full"
              />
            </div>
          </div>
          <div
            v-if="searchProducts.length === 0"
            class="flex min-h-[200px] w-full flex-col items-center justify-center"
          >
            <nuxt-link to="/productos">
              <img
                loading="lazy"
                :src="imageUrl"
                class="header-logo"
                alt="Logo Img"
                @error="setDefaultImage"
              />
            </nuxt-link>
            <p class="txt-products-empty">{{ $t('home_msgCatalogo') }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Ko7ProductListSearch',
  components: {
    KoProductCard: () => import('./_productcard/ProductCard'),
  },
  props: {
    dataStore: {
      type: Object,
      required: true,
    },
    searchProducts: {
      type: Array,
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
    logoStore: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      fallbackImage: '',
    }
  },
  computed: {
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
  },
}
</script>

<style scoped>
.txt-products-empty {
  font-size: 20px;
  color: #3f3f3f;
  font-weight: 600;
  font-family: 'David Libre' !important;
  @apply mt-6;
}
.pagination {
  font-size: 18px;
  color: #3f3f3f;
  background: transparent;
}
.product_pagination >>> .el-pagination.is-background .btn-next {
  color: #3f3f3f;
  background-color: transparent;
}
.product_pagination >>> .el-pagination.is-background .btn-prev {
  color: #3f3f3f;
  background-color: transparent;
}
.product_pagination >>> .el-pagination.is-background .el-pager li {
  color: #3f3f3f;
  background-color: transparent;
}
.product_pagination >>> .el-pagination.is-background .btn-next:hover {
  color: var(--hover_card);
}
.product_pagination >>> .el-pagination.is-background .btn-prev:hover {
  color: var(--hover_card);
}
.product_pagination
  >>> .el-pagination.is-background
  .el-pager
  li:not(.disabled):hover {
  color: var(--hover_card);
}
.product_pagination
  >>> .el-pagination.is-background
  .el-pager
  li:not(.disabled).active {
  background-color: var(--hover_card);
  color: white;
}
</style>
