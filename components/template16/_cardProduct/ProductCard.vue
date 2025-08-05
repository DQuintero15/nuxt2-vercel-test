<template>
  <div
    id="product-card"
    class="wrapper_container relative flex h-full w-full cursor-pointer flex-col items-center justify-start"
    :style="[settingGeneral, settingCardProducts]"
  >
    <div
      class="container relative h-full max-w-full rounded-5 border shadow-sm"
    >
      <nuxt-link :to="{ path: `/productos/` + product.slug }">
        <img
          v-lazy="idCloudinary(product.foto_cloudinary, 400, 400)"
          width="294"
          height="294"
          loading="lazy"
          :class="!soldOut ? '' : 'grayscale'"
          class="max-h-[350px] w-full max-w-[300px] overflow-hidden rounded-t-5 object-cover"
          alt="Product Img"
        />
      </nuxt-link>
      <p
        v-if="soldOut"
        class="absolute bottom-54 right-10 rounded-4 bg-red-500 px-2 py-1 text-12 text-white-white"
      >
        {{ $t('home_cardAgotado') }}
      </p>
      <p
        v-if="!getFreeShipping"
        class="absolute bottom-30 right-10 rounded-4 bg-green-500 px-2 py-1 text-12 text-white-white"
      >
        {{ $t('home_cardGratis') }}
      </p>
      <div
        v-if="product.tag_promocion == 1 && product.promocion_valor"
        class="absolute left-10 right-auto top-10 rounded-4 bg-red-500 px-5 py-1 text-12 uppercase text-white-white"
      >
        <p class="block">{{ product.promocion_valor }}% OFF</p>
      </div>
    </div>
    <div
      class="box-border flex h-full w-full cursor-default flex-col items-center justify-between px-10 py-6"
    >
      <nuxt-link :to="{ path: `/productos/` + product.slug }">
        <div class="flex w-full items-center justify-center">
          <p
            class="card-title h-full max-h-[58px] min-h-[58px] pt-10 text-center transition-all duration-0.2 ease-out"
          >
            {{ product.nombre }}
          </p>
        </div>
      </nuxt-link>
      <div class="mt-10">
        <div v-if="estadoCart && equalsPrice">
          <p v-if="minPrice > 0" class="text-price">
            {{
              minPrice
                | currency(
                  dataStore.tiendasInfo.paises.codigo,
                  dataStore.tiendasInfo.moneda,
                )
            }}
          </p>
        </div>
        <div v-else-if="estadoCart && !equalsPrice" class="content-price">
          <div v-if="minPrice > 0" class="text-price">
            {{
              minPrice
                | currency(
                  dataStore.tiendasInfo.paises.codigo,
                  dataStore.tiendasInfo.moneda,
                )
            }}
          </div>
          <p v-if="maxPrice > 0" class="separator-price">-</p>
          <div v-if="maxPrice > 0" class="text-price">
            {{
              maxPrice
                | currency(
                  dataStore.tiendasInfo.paises.codigo,
                  dataStore.tiendasInfo.moneda,
                )
            }}
          </div>
        </div>
        <div v-else>
          <p v-if="product.precio > 0 || product.precio" class="text-price">
            {{
              product.precio
                | currency(
                  dataStore.tiendasInfo.paises.codigo,
                  dataStore.tiendasInfo.moneda,
                )
            }}
          </p>
        </div>
      </div>
    </div>
    <div
      class="wrapper_btn absolute right-20 top-15 z-10 flex flex-col items-center justify-center opacity-0 transition-all duration-0.3 ease-in"
    >
      <nuxt-link
        :to="{ path: `/productos/` + product.slug }"
        class="btn rounded-full px-12 py-8 shadow-lg"
        :style="`background-color:${settingCardProducts.color_btn};color:${settingCardProducts.color_icon};`"
      >
        <eye-outline-icon />
      </nuxt-link>
      <button
        v-if="
          product.precio > 0 &&
          !estadoCart &&
          !soldOut &&
          !spent &&
          (product.tipo_servicio == null || product.tipo_servicio == '0')
        "
        class="btn mt-10 rounded-full px-12 py-8 shadow-lg"
        :style="`background-color:${settingCardProducts.color_btn};color:${settingCardProducts.color_icon};`"
        @click="addShoppingCart"
      >
        <cart-icon />
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import idCloudinary from '@/mixins/idCloudinary'
import currency from '@/mixins/formatCurrent'
export default {
  name: 'Ko16ProductCard',
  mixins: [idCloudinary, currency],
  props: {
    product: {
      type: Object,
      required: true,
    },
    settingCardProducts: {
      type: Object,
      required: true,
    },
    settingGeneral: {
      type: Object,
      required: true,
    },
  },
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
      equalsPrice: false,
    }
  },
  computed: {
    ...mapState(['dataStore', 'productsCart']),
    getFreeShipping() {
      return !(
        this.product.envio_gratis === 1 ||
        this.rangosByCiudad.envio_metodo === 'gratis'
      )
    },
    rangosByCiudad() {
      return this.$store.state.envios.valores
    },
    soldOut() {
      if (this.product.con_variante) {
        const arrCombinations = this.product.variantes
        if (arrCombinations && arrCombinations.combinaciones.length) {
          const inventorySum = JSON.parse(
            arrCombinations.combinaciones[0].combinaciones,
          )
            .map((item) => parseInt(item.unidades) || 0)
            .reduce((acc, val) => acc + val, 0)
          return inventorySum === 0
        }
      }
      return !this.product.stock
    },
  },
  watch: {
    productsCart() {
      this.getDataProduct()
    },
  },
  mounted() {
    this.idSlug = this.product.id
    this.productPrice()
    if (
      this.product.con_variante &&
      this.product.variantes?.variantes !== '[object Object]'
    ) {
      this.estadoCart = true
    }
    if (this.product) {
      this.getDataProduct()
    }
  },
  methods: {
    getDataProduct() {
      if (this.product) {
        this.salesData = {
          precio: this.product.precio,
          unidades: this.product.stock,
          sku: this.product.sku,
          estado: true,
        }
        this.maxQuantityValue = this.product.stock
        this.productsCart.find((productCart, index) => {
          if (productCart.id == this.product.id) {
            this.productIndexCart = index
            this.productCart = productCart
            this.maxQuantityValue = this.product.stock - productCart.cantidad
          }
        })
        if (
          this.salesData.unidades == 0 ||
          this.maxQuantityValue <= 0 ||
          this.maxQuantityValue == 0
        ) {
          this.spent = true
        }
      }
    },
    addShoppingCart() {
      if (this.product) {
        this.productIndexCart = null
        this.getDataProduct()
        this.sendAnalyticsStore(this.product.id)
        if (this.product.id == this.idSlug) {
          let product = {
            id: this.product.id,
            precio: this.product.precio,
            cantidad: 1,
            foto_cloudinary: this.product.foto_cloudinary,
            nombre: this.product.nombre,
            combinacion: undefined,
            envio_gratis: this.product.envio_gratis,
            con_variante: this.product.con_variante,
          }
          if (this.salesData) {
            product.limitQuantity = this.product.stock
          } else {
            product.limitQuantity = this.product.stock
          }
          if (typeof this.productIndexCart === 'number') {
            const mutableProduct =
              this.$store.state.productsCart[this.productIndexCart]
            mutableProduct.cantidad += 1
            this.$store.state.productsCart.splice(
              this.productIndexCart,
              1,
              mutableProduct,
            )
          } else {
            this.$store.state.productsCart.push(product)
          }
          this.$store.commit('UPDATE_CONTENT_CART')
          // this.$router.push('/')
          this.$store.commit('SET_OPEN_ORDER', true)
          // this.$store.state.orderComponent = true
          this.$store.dispatch('SEND_ADD_TO_CART', 1)
        }
      }
    },
    productPrice() {
      if (this.product.con_variante) {
        const variants = this.product.variantes
        if (variants && variants.combinaciones.length > 0) {
          const prices = JSON.parse(variants.combinaciones[0].combinaciones)
            .filter((item) => item.precio && item.estado)
            .map((item) => item.precio)
          if (prices.length > 0) {
            this.productVariants = true
            const sortedPrices = prices.sort((a, b) => a - b)
            this.minPrice = sortedPrices[0]
            this.maxPrice = sortedPrices[sortedPrices.length - 1]
            this.equalsPrice = this.minPrice === this.maxPrice
            return
          }
        }
      }
      this.productVariants = false
      this.minPrice = this.product.precio || 0
      this.maxPrice = this.product.precio || 0
      this.equalsPrice = true
    },
    async sendAnalyticsStore(value) {
      await this.$store.dispatch('SEND_ANALYTICS_STORE', {
        storeId: this.dataStore.id,
        event: 'ADDED_PRODUCT_TO_CART',
        productId: value,
      })
    },
  },
}
</script>

<style scoped>
.wrapper_container {
  background-color: var(--background_color_1);
}
.card-title {
  color: var(--color_title);
  font-size: 16px;
  font-weight: var(--fontWeighTitle);
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.card-title:hover {
  color: var(--hover_text);
  @apply transition-all duration-0.2 ease-out;
}
.separator-price {
  font-size: 20px;
  color: var(--color_price) !important;
}
.text-price {
  color: var(--color_price) !important;
  font-weight: var(--fontWeighPrice);
  font-size: 20px;
  white-space: nowrap;
  text-align: left;
}
.text-free {
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.text-sould {
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.btn:hover {
  color: var(--hover_text_btn);
  background-color: var(--hover_Bg_btn);
  @apply transition-all duration-0.2 ease-in;
}
.icon-shop {
  fill: var(--color_text_btn);
  @apply mb-5 mr-5;
}
#product-card:hover .wrapper_btn {
  @apply opacity-100 transition-all duration-0.3 ease-in;
}
#product-card:hover .wrapper_blur {
  @apply opacity-100 transition-all duration-0.3 ease-in;
}
@screen sm {
  .overlay-top {
    @apply absolute overflow-hidden rounded-md bg-white-white shadow-md transition-all duration-300 ease-in;
    top: 10%;
    right: 0;
    width: 45px;
    height: 40px;
  }
  .overlay-free {
    @apply absolute rounded;
    position: absolute;
    top: 0%;
    right: 0;
    background-color: #222;
    overflow: hidden;
    width: 110px;
    height: 10%;
    transition: 0.5s ease;
  }
  .text-free {
    font-size: 75%;
  }
  .overlay-polygon {
    position: absolute;
    top: 10%;
    right: 15px;
    background-color: transparent;
    overflow: hidden;
    width: 5%;
    height: 5%;
  }
  .overlay-sould {
    @apply flex items-center justify-center rounded-l-lg;
    position: absolute;
    top: 0%;
    left: 60%;
    right: 0;
    overflow: hidden;
    width: 35%;
    height: 20%;
    transition: 0.5s ease;
  }
  .svg-sould-out {
    width: 40px;
    height: 40px;
  }
  .content-price {
    @apply flex w-full flex-row items-center justify-center;
  }
  .separator-price {
    @apply mx-1;
  }
}
@screen md {
  .text-free {
    font-size: 100%;
  }
  .svg-sould-out {
    width: 60px;
    height: 60px;
  }
  .separator-price {
    @apply mx-4;
  }
}
@screen mlg {
  .overlay-top {
    top: 35px;
    left: 100%;
    right: 0;
    width: 0;
    height: 40px;
  }
  .container:hover .overlay-top {
    width: 40px;
    left: 85%;
  }
  .overlay-free {
    top: 0px;
    left: 100%;
    right: 0;
    width: 0;
    height: 35px;
    transition: 0.5s ease;
  }
  .container:hover .overlay-free {
    width: 32%;
    left: 68%;
    transition-delay: 700ms;
  }
  .overlay-polygon {
    top: 35px;
    left: 100%;
    right: 0;
    width: 0;
    height: 5%;
  }
  .container:hover .overlay-polygon {
    width: 5%;
    left: 90%;
    transition-delay: 950ms;
  }
  .overlay-sould {
    top: 5%;
    left: 100%;
    right: 0;
    width: 0;
    height: 20%;
    transition: 0.5s ease;
  }
  .container:hover .overlay-sould {
    width: 35%;
    left: 65%;
    transition-delay: 700ms;
  }
  .svg-sould-out {
    width: 60px;
    height: 60px;
  }
}
@screen xml {
  .overlay-top {
    top: 35px;
    left: 100%;
    right: 0;
    width: 0;
    height: 40px;
  }
  .container:hover .overlay-top {
    width: 40px;
    left: 86%;
  }
}
@screen xxl {
  .overlay-top {
    top: 35px;
    left: 100%;
    right: 0;
    width: 0;
    height: 40px;
  }
  .container:hover .overlay-top {
    width: 40px;
    left: 88%;
  }
  .overlay-sould {
    top: 5%;
    left: 100%;
    right: 0;
    width: 0;
    height: 20%;
    transition: 0.5s ease;
  }
  .container:hover .overlay-sould {
    width: 30%;
    left: 75%;
    transition-delay: 700ms;
  }
}
@media (min-width: 3000px) {
  .overlay-top {
    top: 35px;
    left: 100%;
    right: 0;
    width: 0;
    height: 40px;
  }
  .container:hover .overlay-top {
    width: 40px;
    left: 89%;
  }
}
</style>
