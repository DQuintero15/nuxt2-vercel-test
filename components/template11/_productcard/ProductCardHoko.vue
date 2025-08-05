<template>
  <div
    class="producto"
    :style="[
      settingKcardProduct,
      settingGeneral,
      {
        '--font-style-1':
          this.settingGeneral && this.settingGeneral.fount_1
            ? this.settingGeneral.fount_1
            : 'Roboto',
      },
    ]"
  >
    <div class="container">
      <nuxt-link :to="{ path: `/productosHoko/` + product.id }">
        <client-only>
          <img
            v-lazy="product.images[0]"
            class="product-image"
            :class="soldOut ? 'product-image-soldOut' : ''"
            alt="Product Img"
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
    <div class="datos-producto">
      <nuxt-link :to="{ path: `/productosHoko/` + product.id }">
        <div class="tittle tittle-xml">
          <p class="card-title" v-if="product.name >= 90">
            {{ `${product.name.slice(0, 90)}...` }}
          </p>
          <p class="card-title" v-else>
            {{ `${product.name.slice(0, 90)}` }}
          </p>
        </div>
        <div class="tittle tittle-lg">
          <p class="card-title" v-if="product.name >= 54">
            {{ `${product.name.slice(0, 54)}...` }}
          </p>
          <p class="card-title" v-else>
            {{ `${product.name.slice(0, 54)}` }}
          </p>
        </div>
        <div class="tittle tittle-sm">
          <p class="card-title" v-if="product.name >= 30">
            {{ `${product.name.slice(0, 30)}...` }}
          </p>
          <p class="card-title" v-else>
            {{ `${product.name.slice(0, 30)}` }}
          </p>
        </div>
      </nuxt-link>
      <div class="precio">
        <div class="content-text-price" v-if="product.price">
          <p class="text-price">
            {{ product.price | currency }}
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
  mixins: [idCloudinary],
  name: 'Ko-ProductCard-1-Ho',
  props: {
    product: Object,
    settingGeneral: Object,
    settingKcardProduct: Object,
  },
  computed: {
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
  object-fit: cover;
  overflow: hidden;
  min-height: 373px;
  max-height: 373px;
}
.producto {
  background: var(--background_color_1);
  @apply w-full flex flex-col justify-center items-center cursor-pointer;
}
.datos-producto {
  @apply w-full flex flex-col justify-center items-center my-24 cursor-default;
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
  font-family: var(--font-style-1);
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
.card-title {
  /* font-family: 'Roboto', Helvetica, Arial, sans-serif !important; */
  font-family: var(--font-style-1) !important;
  color: var(--color_title);
  font: inherit;
  font-weight: var(--fontWeighTitle);
  text-align: left;
  font-size: var(--fontSizeTitle);
}
.producto:hover .text-price {
  color: #333333;
}
.text-price {
  /* font-family: 'Roboto', Helvetica, Arial, sans-serif !important; */
  font-family: var(--font-style-1) !important;
  font-size: var(--fontSizePretitle);
  color: var(--color_price);
  white-space: nowrap;
  font-weight: var(--fontWeighPretitle);
  line-height: 1.1;
  text-align: left;
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
.overlay-bottom {
  background-color: black;
}
.overlay-bottom:hover {
  background-color: #3d3d3d;
}
.txt-add {
  color: white;
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
  .card-title {
    font-size: 16px;
  }
  .precio {
    font-size: 16px;
  }
  .overlay-bottom,
  .overlay-bottom-promo {
    @apply absolute overflow-hidden transition-all ease-in duration-100;
    width: 100%;
    height: 0px;
    bottom: 15px;
  }
  .producto:hover .overlay-bottom,
  .producto:hover .overlay-bottom-promo {
    height: 30px;
  }
}
@screen md {
  .overlay-bottom,
  .overlay-bottom-promo {
    @apply absolute overflow-hidden transition-all ease-in duration-100;
    width: 100%;
    height: 0px;
    bottom: 15px;
  }
  .producto:hover .overlay-bottom,
  .producto:hover .overlay-bottom-promo {
    height: 40px;
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
}
</style>
