<template>
  <div
    class="product-content"
    :style="[
      settingKGify,
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
    <div class="producto-items-content">
      <div class="product-text">
        <div class="product-tittle">
          <span class="tittle">{{ settingKGify.pre_title }}</span>
        </div>
        <div class="product-subtittle">
          <span class="subtittle">{{ settingKGify.title }}</span>
        </div>
        <div class="product-description">
          <span class="description">
            {{ settingKGify.description }}
          </span>
        </div>
      </div>
      <div v-swiper:mySwiper="swiperOption" ref="mySwiper">
        <div class="swiper-wrapper">
          <div
            v-for="product in listProducts"
            :key="product.id"
            class="swiper-slide"
          >
            <KoProductGifyCard
              :product="product"
              :setting-card-products="settingCardProducts"
              :setting-general="settingGeneral"
              class="h-full"
            />
          </div>
        </div>
        <div v-if="listProducts?.length === 0" class="content-products-empty">
          <p>{{ $t('home_msgCatalogo') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'K07Gify',
  components: {
    KoProductGifyCard: () => import('./_productcard/ProductCard'),
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
    settingKGify: {
      type: Object,
      required: true,
    },
    settingKCarousel: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      listProducts: [],
      swiperOption: {
        slidesPerView: 'auto',
        spaceBetween: 20,
        autoplay: {
          delay: 6000,
          disableOnInteraction: false,
        },
        breakpoints: {
          1024: {
            slidesPerView: 4,
            slidesPerGroup: 4,
            spaceBetween: 40,
          },
          768: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 30,
          },
          640: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 10,
          },
          320: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 10,
          },
        },
      },
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    },
  },
  mounted() {
    this.getProducts()
  },
  methods: {
    async getProducts() {
      const { success, data } = await this.$store.dispatch(
        'products/GET_ALL_PRODUCTS',
        {
          id_tienda: this.dataStore.id,
          limit: 10,
          page: 1,
          promotion: 1,
        }
      )
      if (success) {
        this.listProducts = data.publicProductList
      }
    },
  },
}
</script>

<style scoped>
.product-content {
  @apply flex flex-col justify-center items-center w-full py-60;
  background: var(--background_color_1);
}
.separador-blog {
  padding-top: 100px;
}
.product-text,
.product-tittle,
.product-subtittle,
.product-description,
.tittle,
.subtittle,
.description {
  @apply flex flex-col justify-center items-center text-center;
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
@screen sm {
  .producto-items-content {
    @apply w-9/5;
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
  .subtittle {
    line-height: 46px;
    font-size: 36px;
  }
}
@screen lg {
  .product-text {
    @apply w-full;
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
@screen xxl {
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
