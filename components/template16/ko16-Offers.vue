<template>
  <div
    class="relative mt-20 w-full items-center justify-center md:mt-50"
    :style="[offers, `background-color: ${offers['--background_color_1']}`]"
  >
    <picture>
      <source
        media="(max-width: 1024px)"
        :srcset="idCloudinaryBanner(offers.img_res, 'bannerRes', 800)"
      />
      <source
        media="(min-width: 1025px)"
        :srcset="idCloudinaryBanner(offers.img, 'banner')"
      />
      <img
        v-lazy="idCloudinaryBanner(offers.img, 'banner')"
        alt="banner template16"
        class="w-full object-cover"
      />
    </picture>
    <div
      class="absolute top-0 flex h-full w-full max-w-9/0 flex-col items-end justify-center"
      style="z-index: 20"
    >
      <div
        class="flex h-full w-full max-w-lg flex-col items-end justify-center"
      >
        <div class="flex flex-1 flex-col items-start justify-center">
          <p
            v-if="offers?.title"
            class="mb-10 max-w-lg text-20 leading-tight md:max-w-xl md:text-25 lg:text-40 xl:text-45"
            :style="`color: ${offers.color_title}; font-weight: ${offers.fontWeighTitle};`"
          >
            {{ offers.title }}
          </p>
          <p
            v-if="offers?.text"
            class="max-w-md text-18 md:max-w-lg xl:text-28"
            :style="`color: ${offers.color_text}; font-weight: ${offers.fontWeighText};`"
          >
            {{ offers.text }}
          </p>

          <div
            v-if="offers?.values?.length > 0"
            class="flex w-full max-w-[300px] items-start justify-start"
          >
            <div ref="mySwiper" v-swiper:mySwiper="swiperOption">
              <div class="swiper-wrapper">
                <div
                  v-for="(item, index) in offers.values"
                  :key="index"
                  class="swiper-slide"
                >
                  <K0CountDown
                    :information="item"
                    :setting-general="settingGeneral"
                    class="h-full w-full"
                  />
                  <div
                    v-if="product[index]?.id && product.length > 0"
                    class="mt-40"
                  >
                    <KoProductCard
                      :product="product[index]"
                      :setting-card-products="cardProducts"
                      :setting-general="settingGeneral"
                      style="max-width: 300px"
                      :style="`border-radius: ${settingGeneral?.radius};`"
                    />
                  </div>
                </div>
              </div>
              <!-- <div class="swiper-pagination" slot="pagination"></div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import idCloudinary from '@/mixins/idCloudinary'

export default {
  name: 'Ko16Offers',
  components: {
    K0CountDown: () => import('./_offers/countdown.vue'),
    KoProductCard: () => import('./_cardProduct/ProductCard.vue'),
  },
  mixins: [idCloudinary],
  props: {
    cardProducts: {
      type: Object,
      required: true,
    },
    offers: {
      type: Object,
      required: true,
    },
    settingGeneral: {
      type: Object,
      required: true,
    },
    dataStore: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      product: [],
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 10,
        autoplay: {
          delay: 8000,
          disableOnInteraction: false,
        },
        // pagination: {
        //   el: '.swiper-pagination',
        // },
      },
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    },
  },
  mounted() {
    this.setProduct()
  },
  methods: {
    async setProduct() {
      if (this.offers?.values?.length > 0) {
        for (let i = 0; i < this.offers.values.length; i++) {
          if (this.offers.values[i].item !== null) {
            const response = await this.getProducts(this.offers.values[i])
            this.product.push(response)
          }
        }
      }
    },
    async getProducts(value) {
      const { success, data } = await this.$store.dispatch(
        'products/GET_ALL_PRODUCTS',
        {
          id_tienda: this.dataStore.id,
          limit: 1,
          page: 1,
          name: value.item,
        },
      )
      if (success && value.item !== null) {
        return data.publicProductList[0]
      }
    },
  },
}
</script>

<style scoped>
.swiper-wrapper,
.swiper-slide {
  max-width: 300px;
}
.pagination {
  font-size: 18px;
  color: #222;
  background: transparent;
}
.product_pagination >>> .el-pagination.is-background .btn-next {
  color: #222;
  background-color: transparent;
}
.product_pagination >>> .el-pagination.is-background .btn-prev {
  color: #222;
  background-color: transparent;
}
.product_pagination >>> .el-pagination.is-background .el-pager li {
  color: #222;
  background-color: transparent;
}
.product_pagination >>> .el-pagination.is-background .btn-next:hover {
  color: var(--color_pagination);
}
.product_pagination >>> .el-pagination.is-background .btn-prev:hover {
  color: var(--color_pagination);
}
.product_pagination
  >>> .el-pagination.is-background
  .el-pager
  li:not(.disabled):hover {
  color: var(--color_pagination);
}
.product_pagination
  >>> .el-pagination.is-background
  .el-pager
  li:not(.disabled).active {
  background-color: var(--color_pagination);
  color: #fff;
}
</style>
