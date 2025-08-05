<template>
  <div class="producto" :style="[productListCard, settingGeneral]">
    <div
      class="container"
      :style="[
        {
          '--font-style-2':
            this.settingGeneral && this.settingGeneral.fount_2
              ? this.settingGeneral.fount_2
              : 'Roboto',
        },
      ]"
    >
      <nuxt-link :to="{ path: `/productosHoko/` + product.id }">
        <client-only>
          <img
            v-lazy="product.images[0]"
            class="product-image"
            alt="Product Img"
            :class="soldOut ? 'product-image-soldOut' : ''"
          />
        </client-only>
        <div class="image_overlay"></div>
      </nuxt-link>

      <nuxt-link :to="{ path: `/productosHoko/` + product.id }">
        <div class="overlay-bottom">
          <div class="cart-Shop">
            <div class="text-cart">
              <p class="w-full txt-add">
                {{ $t('home_vistarapida') }}
              </p>
            </div>
          </div>
        </div>
      </nuxt-link>
    </div>
    <div
      class="datos-producto"
      :style="[
        {
          '--font-style-2':
            this.settingGeneral && this.settingGeneral.fount_2
              ? this.settingGeneral.fount_2
              : 'Roboto',
        },
      ]"
    >
      <!-- <div class="categoria" v-if="this.product.model_type">
        {{ this.product.model_type }}
      </div> -->
      <nuxt-link :to="{ path: `/productosHoko/` + product.id }">
        <div class="tittle tittle-xml">
          <p class="card-title" v-if="this.product.name.length >= 90">
            {{ `${this.product.name.slice(0, 90)}...` }}
          </p>
          <p class="card-title" v-else>
            {{ `${this.product.name.slice(0, 90)}` }}
          </p>
        </div>
        <div class="tittle tittle-lg">
          <p class="card-title" v-if="this.product.name.length >= 54">
            {{ `${this.product.name.slice(0, 54)}...` }}
          </p>
          <p class="card-title" v-else>
            {{ `${this.product.name.slice(0, 54)}` }}
          </p>
        </div>
        <div class="tittle tittle-sm">
          <p class="card-title" v-if="this.product.name.length >= 30">
            {{ `${this.product.name.slice(0, 30)}...` }}
          </p>
          <p class="card-title" v-else>
            {{ `${this.product.name.slice(0, 30)}` }}
          </p>
        </div>
      </nuxt-link>
      <div class="precio">
        <div class="content-text-price" v-if="this.product.price">
          <p class="text-price">
            {{ this.product.price | currency }}
          </p>
        </div>
        <div v-else class="h-27"></div>
      </div>
    </div>
  </div>
</template>

<script>
import idCloudinary from '../../../mixins/idCloudinary'
export default {
  name: 'Ko9ProductCardHoKo',
  mixins: [idCloudinary],
  props: { product: Object, settingGeneral: Object, productListCard: Object },

  data() {
    return {
      hover: false,
      estadoCart: false,
      minPrice: '',
      maxPrice: '',
      idSlug: '',
      maxQuantityValue: 0,
      productIndexCart: null,
      productCart: {},
      salesData: null,
      spent: false,
      active: true,
    }
  },
  computed: {
    dataStore() {
      return this.$store.state.dataStore
    },
    soldOut() {
      if (this.product && this.product.stock_amount === 0) {
        return true
      } else {
        return false
      }
    },
  },

  filters: {
    currency(value) {
      if (value) {
        return `$${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`
      }
      return ''
    },
  },
}
</script>

<style scoped>
.product-image {
  width: 100%;
  object-fit: contain;
  overflow: hidden;
  min-height: 444px;
  max-height: 444px;
}
.producto {
  height: 100%;
  background: var(--background_color_card);
  @apply w-full flex flex-col justify-center items-center cursor-pointer;
}
.datos-producto {
  @apply w-full flex flex-col justify-center items-start my-24 cursor-default;
}
.container {
  @apply relative max-w-full;
}
.cart-Shop {
  font: inherit;
  font-size: 100%;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  text-align: center;
  @apply absolute text-center transition-all ease-in duration-300 w-full;
}
.tittle {
  /* font-family: 'Roboto', Helvetica, Arial, sans-serif !important; */
  font-family: var(--font-style-2);
  font: inherit;
  font-size: 100%;
  min-height: 49px;
  max-height: 49px;
}
.tittle-xml {
  display: initial;
}
.tittle-lg {
  display: none;
}
.tittle-sm {
  display: none;
}
.categoria {
  /* font-family: 'Roboto', Helvetica, Arial, sans-serif !important; */
  font-family: var(--font-style-2) !important;
  color: var(--color_category);
  font: inherit;
  font-weight: 600;
}
.card-title {
  /* font-family: 'Roboto', Helvetica, Arial, sans-serif !important; */
  font-family: var(--font-style-2) !important;
  color: var(--color_text_card);
  font: inherit;
  font-weight: 800;
  text-align: left;
}
.producto:hover .text-price {
  color: #333333;
}
.text-price {
  /* font-family: 'Roboto', Helvetica, Arial, sans-serif !important; */
  font-family: var(--font-style-2) !important;
  font-size: 16px;
  color: var(--color_price_card);
  white-space: nowrap;
  font-weight: 600;
  line-height: 1.1;
  text-align: left;
}
.overlay-bottom {
  background-color: var(--color_background_btn);
}
.overlay-bottom:hover {
  background-color: #3d3d3d;
}
.txt-add {
  color: var(--color_text_btn);
  font-size: 15px;
  letter-spacing: 1px;
  /* text-transform: capitalize; */
  font-weight: 800;
  transition: all 200ms ease-in;
}
.overlay-bottom:hover .txt-add {
  color: white;
  transition: all 200ms ease-in;
}
.product-image-soldOut {
  filter: grayscale(100%);
}
@screen sm {
  .categoria {
    @apply mb-3;
    font-size: 13px;
  }
  .card-title {
    font-size: 16px;
  }
  .precio {
    font-size: 16px;
  }
  .overlay-bottom {
    @apply absolute right-0 overflow-hidden transition-all ease-in duration-100;
    width: 110px;
    height: 0px;
    left: 10px;
    bottom: 10px;
  }
  .producto:hover .overlay-bottom {
    height: 30px;
  }
  .content-price {
    @apply flex flex-row justify-center items-center w-full;
  }
}
@screen md {
  .overlay-bottom {
    @apply absolute right-0 overflow-hidden transition-all ease-in duration-100;
    width: 110px;
    height: 0px;
    left: 10px;
    bottom: 10px;
  }
  .producto:hover .overlay-bottom {
    height: 40px;
  }
}
@screen mlg {
  .text-cart {
    @apply block;
  }
}
@media (max-width: 1125px) {
  .tittle-xml {
    display: none;
  }
  .tittle-lg {
    display: initial;
  }
  .tittle-sm {
    display: none;
  }
}
@media (max-width: 1366px) {
  .product-image {
    min-height: 360px;
    max-height: 360px;
  }
}
@media (max-width: 1280px) {
  .product-image {
    min-height: 320px;
    max-height: 320px;
  }
}
@media (max-width: 1024px) {
  .product-image {
    min-height: 320px;
    max-height: 320px;
  }
}
@media (max-width: 400px) {
  .tittle-xml {
    display: none;
  }
  .tittle-lg {
    display: none;
  }
  .tittle-sm {
    display: initial;
  }
  .product-image {
    min-height: 220px;
    max-height: 220px;
  }
}
</style>
