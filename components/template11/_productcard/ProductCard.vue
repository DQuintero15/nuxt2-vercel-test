<template>
  <div
    class="producto"
    :style="[
      settingCardProducts,
      settingGeneral,
      {
        '--font-style-1': settingGeneral?.fount_1 ?? 'Roboto',
      },
    ]"
  >
    <div class="container">
      <nuxt-link
        :to="{ path: `/productos/` + product.slug }"
        class="wrapper-image"
      >
        <img
          v-lazy="idCloudinary(product.foto_cloudinary, 400, 400)"
          class="product-image"
          :class="{ 'product-image-soldOut': soldOut }"
          alt="Product Img"
        />

        <div class="image_overlay"></div>
      </nuxt-link>
      <div v-if="!getFreeShipping && !soldOut" class="overlay-top">
        <div class="icons-hover">
          <div class="transport-icon">
            <svg
              v-if="!getFreeShipping && !soldOut"
              class="transporte-icon"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              version="1.1"
              width="25px"
              height="25px"
              viewBox="0 0 24 24"
              fill="#333"
            >
              <path
                d="M18 18.5C18.83 18.5 19.5 17.83 19.5 17C19.5 16.17 18.83 15.5 18 15.5C17.17 15.5 16.5 16.17 16.5 17C16.5 17.83 17.17 18.5 18 18.5M19.5 9.5H17V12H21.46L19.5 9.5M6 18.5C6.83 18.5 7.5 17.83 7.5 17C7.5 16.17 6.83 15.5 6 15.5C5.17 15.5 4.5 16.17 4.5 17C4.5 17.83 5.17 18.5 6 18.5M20 8L23 12V17H21C21 18.66 19.66 20 18 20C16.34 20 15 18.66 15 17H9C9 18.66 7.66 20 6 20C4.34 20 3 18.66 3 17H1V6C1 4.89 1.89 4 3 4H17V8H20M3 6V15H3.76C4.31 14.39 5.11 14 6 14C6.89 14 7.69 14.39 8.24 15H15V6H3M5 10.5L6.5 9L8 10.5L11.5 7L13 8.5L8 13.5L5 10.5Z"
              />
            </svg>
          </div>
        </div>
      </div>
      <div v-if="!getFreeShipping && !soldOut" class="overlay-free">
        <div class="text-free">
          <p class="txt-free">{{ $t('home_cardGratis') }}</p>
        </div>
      </div>
      <div
        v-if="product.tag_promocion == 1 && product.promocion_valor"
        class="cart-Shop-pro"
      >
        <div class="text-cart">
          <p class="w-full txt-add">{{ product.promocion_valor }}% OFF</p>
        </div>
      </div>
      <div v-if="!getFreeShipping && !soldOut" class="overlay-polygon">
        <svg
          class="icon-overlay-free"
          width="12px"
          height="12px"
          viewBox="0 0 255 255"
        >
          <polygon class="fill-current" points="0,0 127.5,127.5 255,0" />
        </svg>
      </div>
      <div v-if="soldOut" class="overlay-sould">
        <div class="text-sould">
          <svg
            id="Layer_1"
            class="svg-sould-out"
            xmlns="http://www.w3.org/2000/svg"
            enable-background="new 0 0 512 512"
            viewBox="0 0 512 512"
          >
            <g>
              <g>
                <path
                  d="m256 116.457h-16c-13.255 0-24-10.745-24-24 0-13.255 10.745-24 24-24h16c13.255 0 24 10.745 24 24 0 13.255-10.745 24-24 24z"
                  fill="#cd3232"
                />
              </g>
              <g>
                <path
                  d="m464 460.457h-416c-17.673 0-32-14.327-32-32v-160c0-17.673 14.327-32 32-32h416c17.673 0 32 14.327 32 32v160c0 17.673-14.327 32-32 32z"
                  fill="#cd3232"
                />
              </g>
              <g>
                <path
                  d="m432 460.457h-384c-17.673 0-32-14.327-32-32v-160c0-17.673 14.327-32 32-32h384c17.673 0 32 14.327 32 32v160c0 17.673-14.327 32-32 32z"
                  fill="#ff4646"
                />
              </g>
              <g><circle cx="96" cy="268.457" fill="#cd3232" r="16" /></g>
              <g><circle cx="384" cy="268.457" fill="#cd3232" r="16" /></g>
              <g>
                <path
                  d="m384.008 277.371c-2.993 0-5.916-1.507-7.6-4.243l-119.614-194.373c-3.562-5.789-9.998-9.384-16.794-9.384s-13.232 3.596-16.794 9.384l-119.615 194.373c-2.58 4.193-8.071 5.498-12.263 2.92-4.192-2.58-5.5-8.07-2.92-12.263l119.615-194.373c6.783-11.022 19.036-17.869 31.977-17.869s25.194 6.847 31.977 17.869l119.614 194.374c2.58 4.192 1.272 9.683-2.92 12.263-1.456.895-3.069 1.322-4.663 1.322z"
                  fill="#463c4b"
                />
              </g>
              <g><circle cx="240" cy="92.457" fill="#ff4646" r="24" /></g>
              <g>
                <g>
                  <path
                    d="m72 416.457c-11.028 0-20-8.972-20-20v-8c0-2.209 1.791-4 4-4s4 1.791 4 4v8c0 6.617 5.383 12 12 12s12-5.383 12-12v-22.111c0-4.575-2.542-8.688-6.634-10.733l-14.311-7.155c-6.819-3.411-11.055-10.265-11.055-17.89v-22.111c0-11.028 8.972-20 20-20s20 8.972 20 20v8c0 2.209-1.791 4-4 4s-4-1.791-4-4v-8c0-6.617-5.383-12-12-12s-12 5.383-12 12v22.111c0 4.575 2.542 8.688 6.634 10.733l14.311 7.155c6.819 3.41 11.055 10.265 11.055 17.889v22.111c0 11.029-8.972 20.001-20 20.001z"
                    fill="#32283c"
                  />
                </g>
                <g>
                  <path
                    d="m128 416.457c-11.028 0-20-8.972-20-20v-80c0-11.028 8.972-20 20-20s20 8.972 20 20v80c0 11.028-8.972 20-20 20zm0-112c-6.617 0-12 5.383-12 12v80c0 6.617 5.383 12 12 12s12-5.383 12-12v-80c0-6.617-5.383-12-12-12z"
                    fill="#32283c"
                  />
                </g>
                <g>
                  <path
                    d="m304 416.457c-11.028 0-20-8.972-20-20v-80c0-11.028 8.972-20 20-20s20 8.972 20 20v80c0 11.028-8.972 20-20 20zm0-112c-6.617 0-12 5.383-12 12v80c0 6.617 5.383 12 12 12s12-5.383 12-12v-80c0-6.617-5.383-12-12-12z"
                    fill="#e6e6eb"
                  />
                </g>
                <g>
                  <path
                    d="m200 416.457h-16c-11.028 0-20-8.972-20-20v-96c0-2.209 1.791-4 4-4s4 1.791 4 4v96c0 6.617 5.383 12 12 12h16c2.209 0 4 1.791 4 4s-1.791 4-4 4z"
                    fill="#32283c"
                  />
                </g>
                <g>
                  <path
                    d="m232 416.457h-16c-2.209 0-4-1.791-4-4v-112c0-2.209 1.791-4 4-4h16c11.028 0 20 8.972 20 20v80c0 11.028-8.972 20-20 20zm-12-8h12c6.617 0 12-5.383 12-12v-80c0-6.617-5.383-12-12-12h-12z"
                    fill="#32283c"
                  />
                </g>
                <g>
                  <path
                    d="m360 416.457c-11.028 0-20-8.972-20-20v-96c0-2.209 1.791-4 4-4s4 1.791 4 4v96c0 6.617 5.383 12 12 12s12-5.383 12-12v-96c0-2.209 1.791-4 4-4s4 1.791 4 4v96c0 11.028-8.972 20-20 20z"
                    fill="#e6e6eb"
                  />
                </g>
                <path
                  d="m424 296.457h-32c-2.209 0-4 1.791-4 4s1.791 4 4 4h12v108c0 2.209 1.791 4 4 4s4-1.791 4-4v-108h12c2.209 0 4-1.791 4-4s-1.791-4-4-4z"
                  fill="#e6e6eb"
                />
              </g>
            </g>
          </svg>
        </div>
      </div>
      <nuxt-link :to="{ path: `/productos/` + product.slug }">
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
      <nuxt-link :to="{ path: `/productos/` + product.slug }">
        <p class="card-title">
          {{ product.nombre }}
        </p>
      </nuxt-link>

      <div
        v-if="product.tag_promocion == 1 && product.promocion_valor"
        class="precio"
      >
        <div
          v-if="product.precio || (maxPrice && minPrice)"
          class="content-text-price"
        >
          <div v-if="estadoCart && !equalsPrice" class="wrapper-price">
            <div class="content-price">
              <div
                v-if="product.precio > 0 || product.precio"
                class="text-price-promo"
              >
                {{
                  (product.tag_promocion == 1 && product.promocion_valor
                    ? Math.trunc(minPrice / (1 - product.promocion_valor / 100))
                    : 0)
                    | currency(
                      dataStore.tiendasInfo.paises.codigo,
                      dataStore.tiendasInfo.moneda
                    )
                }}
              </div>
              <p class="separator-price">-</p>
              <div
                v-if="product.precio > 0 || product.precio"
                class="text-price-promo"
              >
                {{
                  (product.tag_promocion == 1 && product.promocion_valor
                    ? Math.trunc(maxPrice / (1 - product.promocion_valor / 100))
                    : 0)
                    | currency(
                      dataStore.tiendasInfo.paises.codigo,
                      dataStore.tiendasInfo.moneda
                    )
                }}
              </div>
            </div>
            <div class="content-price">
              <div v-if="minPrice > 0" class="text-price">
                {{
                  minPrice
                    | currency(
                      dataStore.tiendasInfo.paises.codigo,
                      dataStore.tiendasInfo.moneda
                    )
                }}
              </div>
              <p v-if="maxPrice > 0" lass="separator-price">-</p>
              <div v-if="maxPrice > 0" class="text-price">
                {{
                  maxPrice
                    | currency(
                      dataStore.tiendasInfo.paises.codigo,
                      dataStore.tiendasInfo.moneda
                    )
                }}
              </div>
            </div>
          </div>
          <div v-else class="text-center">
            <p
              v-if="product.precio > 0 || product.precio"
              class="text-price-promo"
            >
              {{
                (product.tag_promocion == 1 && product.promocion_valor
                  ? Math.trunc(
                      product.precio / (1 - product.promocion_valor / 100)
                    )
                  : 0)
                  | currency(
                    dataStore.tiendasInfo.paises.codigo,
                    dataStore.tiendasInfo.moneda
                  )
              }}
            </p>
            <p v-if="product.precio > 0 || product.precio" class="text-price">
              {{
                product.precio
                  | currency(
                    dataStore.tiendasInfo.paises.codigo,
                    dataStore.tiendasInfo.moneda
                  )
              }}
            </p>
          </div>
        </div>
        <div v-else class="h-27"></div>
      </div>
      <div v-else class="precio">
        <div
          v-if="product.precio || (maxPrice && minPrice)"
          class="content-text-price"
        >
          <div v-if="estadoCart && equalsPrice" class="content-price">
            <div v-if="minPrice > 0" class="text-price">
              {{
                minPrice
                  | currency(
                    dataStore.tiendasInfo.paises.codigo,
                    dataStore.tiendasInfo.moneda
                  )
              }}
            </div>
          </div>
          <div v-else-if="estadoCart && !equalsPrice" class="content-price">
            <div v-if="minPrice > 0" class="text-price">
              {{
                minPrice
                  | currency(
                    dataStore.tiendasInfo.paises.codigo,
                    dataStore.tiendasInfo.moneda
                  )
              }}
            </div>
            <p v-if="maxPrice > 0" class="separator-price">-</p>
            <div v-if="maxPrice > 0" class="text-price">
              {{
                maxPrice
                  | currency(
                    dataStore.tiendasInfo.paises.codigo,
                    dataStore.tiendasInfo.moneda
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
                    dataStore.tiendasInfo.moneda
                  )
              }}
            </p>
          </div>
        </div>
        <div v-else class="h-27"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import idCloudinary from '@/mixins/idCloudinary'
import currency from '@/mixins/formatCurrent'
export default {
  name: 'Ko11ProductCard',
  mixins: [idCloudinary, currency],
  props: {
    product: {
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
            arrCombinations.combinaciones[0].combinaciones
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
      this.product.variantes.variantes !== '[object Object]'
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
              mutableProduct
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
      this.equalsPrice = false
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
.product-image {
  @apply w-full object-cover overflow-hidden;
}
.product-image-soldOut {
  filter: grayscale(100%);
  @apply w-full object-cover overflow-hidden;
}
.producto {
  background: var(--background_color_1);
  @apply w-full h-full flex flex-col justify-center items-center cursor-pointer;
}
.datos-producto {
  @apply w-full flex flex-col justify-center items-center my-24 cursor-default;
}
.container {
  @apply relative max-w-full h-full;
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
.icons-hover {
  font: inherit;
  font-size: 100%;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  text-align: center;
  @apply absolute text-center transition-all ease-in duration-300 grid grid-cols-1 gap-0;
}

.card-title {
  /* font-family: 'Roboto', Helvetica, Arial, sans-serif !important; */
  font-family: var(--font-style-1) !important;
  color: var(--color_title);
  font: inherit;
  font-weight: var(--fontWeighTitle);
  text-align: center;
  font-size: var(--fontSizeTitle);
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.producto:hover .text-price {
  color: #333333;
}
.separator-price {
  /* font-family: 'Roboto', Helvetica, Arial, sans-serif !important; */
  font-family: var(--font-style-1) !important;
  font-size: var(--fontSizePretitle);
  color: var(--color_price);
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
.text-price-promo {
  font-family: var(--font-style-1) !important;
  text-decoration: line-through;
  color: var(--color_price);
  font-weight: 400;
  font-size: 13px;
}
.text-free {
  color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  white-space: nowrap;
}
.icon-overlay-free {
  color: #3d3d3d;
}
.text-sould {
  color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  white-space: nowrap;
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
.txt-free {
  font-size: 15px;
  font-weight: 600;
}
.cart-Shop-pro {
  position: absolute;
  top: 5px;
  left: 5px;
  padding: 1px 5px;
  color: #fff;
  text-transform: uppercase;
  font-size: 12px;
  background: red;
  right: auto;
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
  .overlay-top {
    top: 10%;
    right: 0;
    width: 45px;
    height: 40px;
    @apply absolute overflow-hidden rounded-md bg-white-white shadow-md transition-all ease-in duration-300;
  }
  .overlay-free {
    background-color: #3d3d3d;
    @apply rounded;
    position: absolute;
    top: 0%;
    right: 0;
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
    @apply flex justify-center items-center rounded-l-lg;
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
  .wrapper-price {
    @apply flex flex-col justify-center items-center w-full;
  }
  .content-price {
    @apply flex flex-row justify-center items-center w-full;
  }
  .separator-price {
    font-size: var(--fontSizePretitle);
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
@screen mlg {
  .text-cart {
    @apply block;
  }
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
