<template>
  <div
    class="product-content"
    :style="[
      settingKProductList,
      settingGeneral,
      {
        '--font-style-1': settingGeneral?.fount_1 ?? 'David Libre',
      },
      {
        '--font-style-2': settingGeneral?.fount_2 ?? 'Great Vibes',
      },
      {
        '--font-style-3': settingGeneral?.fount_3 ?? 'Lora',
      },
    ]"
  >
    <div v-if="!settingKCarousel.visible" class="separador-blog"></div>
    <div id="section" class="producto-items-content">
      <div class="product-text">
        <div class="product-tittle">
          <span class="tittle">{{ settingKProductList.pre_title }}</span>
        </div>
        <div class="product-subtittle">
          <span class="subtittle">{{ settingKProductList.title }}</span>
        </div>
        <div class="product-description">
          <span class="description">
            {{ settingKProductList.description }}
          </span>
        </div>
      </div>
      <div class="content-item">
        <div class="content-item-productos">
          <div class="product-conten-items">
            <div
              v-for="product in listProducts"
              :key="product.id"
              class="h-full"
            >
              <KoProductCard
                :product="product"
                :setting-card-products="settingCardProducts"
                :setting-general="settingGeneral"
              />
            </div>
          </div>
          <div v-if="listProducts?.length === 0" class="content-products-empty">
            <div class="header-content-logo">
              <nuxt-link to="/productos" class="wrapper-logo">
                <img
                  loading="lazy"
                  :src="imageUrl"
                  class="header-logo"
                  alt="Logo Img"
                  @error="setDefaultImage"
                />
              </nuxt-link>
            </div>
            <p class="txt-products-empty">{{ $t('home_msgCatalogo') }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'K07ProductListHome',
  components: {
    KoProductCard: () => import('./_productcard/ProductCard.vue'),
  },
  props: {
    dataStore: {
      type: Object,
      required: true,
    },
    settingKProductList: {
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
    settingKCarousel: {
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
      listProducts: [],
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
        return `${this.$store.state.urlKomercia}/logos/${this.logoStore?.identifier}`
      }
    },
  },
  mounted() {
    this.currentChange()
  },
  methods: {
    async currentChange() {
      const { success, data } = await this.$store.dispatch(
        'products/GET_ALL_PRODUCTS',
        {
          id_tienda: this.dataStore.id,
          limit: 8,
          page: 1,
        }
      )
      if (success) {
        this.listProducts = data.publicProductList
      }
    },
    setDefaultImage() {
      this.fallbackImage = require('@/assets/img/logo_nuevas_tiendas.png')
    },
  },
}
</script>

<style scoped>
.product-content {
  background: var(--background_color_1);
  @apply flex w-full flex-col items-center justify-center py-50;
}
.separador-blog {
  padding-top: 100px;
}
.product-text {
  @apply flex w-full flex-col items-center justify-center;
}
.product-conten-items {
  @apply mt-30 flex flex-col items-start justify-start;
}
.product-tittle,
.product-subtittle,
.product-description,
.tittle,
.subtittle,
.description,
.producto-items-content {
  @apply flex flex-col items-center justify-center text-center;
}

.tittle {
  font-family: var(--font-style-2) !important;
  color: var(--color_pre_title);
}
.subtittle {
  font-family: var(--font-style-1) !important;
  color: var(--color_title);
}
.description {
  font-family: var(--font-style-3) !important ;
  color: var(--color_description);
}
.product-conten-items {
  @apply gap-4;
}
.content-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  margin-bottom: 40px;
}
.content-item-productos {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.content-products-empty {
  width: 100%;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.txt-products-empty {
  @apply mt-6;
  font-size: 20px;
  color: #3f3f3f;
  font-weight: 600;
  font-family: 'David Libre' !important;
}
@screen sm {
  .producto-items-content {
    @apply w-9/5;
  }
  .product-conten-items {
    @apply grid grid-cols-2;
  }
  .tittle {
    line-height: 34px;
    font-size: 24px;
  }
  .subtittle {
    line-height: 42px;
    font-size: 32px;
  }
  .description {
    line-height: 24px;
    font-size: 14px;
  }
}
@screen md {
  .product-conten-items {
    @apply grid grid-cols-3;
  }
  .subtittle {
    line-height: 46px;
    font-size: 36px;
  }
}
@screen lg {
  .product-text {
    @apply w-full;
  }
  .product-conten-items {
    @apply grid grid-cols-4;
  }
}
@screen mlg {
  .producto-items-content {
    @apply w-9/3;
  }
}
@media (min-width: 1192px) {
  .producto-items-content {
    width: 1192px;
  }
}
@screen xml {
  .tittle {
    line-height: 34px;
    font-size: 24px;
  }
  .subtittle {
    line-height: 46px;
    font-size: 36px;
  }
  .description {
    line-height: 24px;
    font-size: 14px;
  }
}
</style>
