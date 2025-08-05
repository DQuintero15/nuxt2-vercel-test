<template>
  <div class="producto">
    <div class="container">
      <nuxt-link
        :to="{ path: `/productos/` + product.slug }"
        class="wrapper-image"
      >
        <client-only>
          <img
            v-if="!soldOut"
            v-lazy="idCloudinary(product.foto_cloudinary, 400, 400)"
            class="product-image"
            alt="Product Img"
          />
          <img
            v-if="soldOut"
            v-lazy="idCloudinary(product.foto_cloudinary, 400, 400)"
            class="product-image-soldOut"
            alt="Product Img"
          />
        </client-only>
        <div class="image_overlay"></div>
      </nuxt-link>

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
      <div
        v-if="!estadoCart && !soldOut && !spent"
        class="overlay-bottom"
        @click="addShoppingCart"
      >
        <div class="cart-shop-mobile">
          <div class="icon-cart">
            <cart-icon class="icon" />
          </div>
        </div>
        <div
          class="cart-Shop"
          @mouseover="hover = true"
          @mouseleave="hover = false"
        >
          <div v-if="!hover" class="text-cart">
            <p class="w-full">{{ $t('productdetail_añadiralcarrito') }}</p>
          </div>
          <div v-if="hover" class="icon-cart">
            <cart-icon class="icon" />
          </div>
        </div>
      </div>
      <div v-else class="overlay-bottom">
        <div class="cart-shop-mobile">
          <svg
            class="icon-show-mobile"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            version="1.1"
            width="60%"
            height="60%"
            viewBox="0 0 24 24"
          >
            <path
              d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7.14,4.5 2.78,7.5 1,12C3.39,18.08 10.25,21.06 16.33,18.67C19.38,17.47 21.8,15.06 23,12C21.22,7.5 16.86,4.5 12,4.5M7,22H9V24H7V22M11,22H13V24H11V22M15,22H17V24H15V22Z"
            />
          </svg>
        </div>
        <div class="cart-Shop">
          <div class="text-cart">
            <nuxt-link nuxt-link :to="{ path: `/productos/` + product.slug }">
              <p>{{ $t('home_cardvermas') }}</p>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <div class="datos-producto">
      <!-- <div class="categoria" v-if="product.categoria">
        {{ product.categoria }}
      </div> -->
      <div class="tittle">
        <p v-if="product.nombre.length >= 54" class="card-title">
          {{ `${product.nombre.slice(0, 54)}...` }}
        </p>
        <p v-else class="card-title">
          {{ `${product.nombre.slice(0, 54)}` }}
        </p>
      </div>
      <div class="precio">
        <div
          v-if="product.precio || (maxPrice && minPrice)"
          class="content-text-price"
        >
          <div v-if="estadoCart && equalsPrice">
            <p v-if="minPrice > 0" class="text-price">
              {{
                minPrice
                  | currency(
                    dataStore.tiendasInfo.paises.codigo,
                    dataStore.tiendasInfo.moneda
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
                    dataStore.tiendasInfo.moneda
                  )
              }}
            </div>
            <p v-if="maxPrice > 0" class="separator-price mx-4">-</p>
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
        <div v-else class="h-20"></div>
      </div>
      <!-- Envios gratis -->
      <div class="content_buy_action">
        <div v-if="product.envio_gratis == 1 && product.stock > 0">
          <div class="transport-icon">
            <svg
              class="transporte-icon mr-2"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              version="1.1"
              width="25px"
              height="25px"
              viewBox="0 0 24 24"
              fill="#00a650"
            >
              <path
                d="M18 18.5C18.83 18.5 19.5 17.83 19.5 17C19.5 16.17 18.83 15.5 18 15.5C17.17 15.5 16.5 16.17 16.5 17C16.5 17.83 17.17 18.5 18 18.5M19.5 9.5H17V12H21.46L19.5 9.5M6 18.5C6.83 18.5 7.5 17.83 7.5 17C7.5 16.17 6.83 15.5 6 15.5C5.17 15.5 4.5 16.17 4.5 17C4.5 17.83 5.17 18.5 6 18.5M20 8L23 12V17H21C21 18.66 19.66 20 18 20C16.34 20 15 18.66 15 17H9C9 18.66 7.66 20 6 20C4.34 20 3 18.66 3 17H1V6C1 4.89 1.89 4 3 4H17V8H20M3 6V15H3.76C4.31 14.39 5.11 14 6 14C6.89 14 7.69 14.39 8.24 15H15V6H3M5 10.5L6.5 9L8 10.5L11.5 7L13 8.5L8 13.5L5 10.5Z"
              />
            </svg>
            <p>{{ $t('footer_tarifaPrecio') }}</p>
          </div>
        </div>
        <!-- Producto agotado -->
        <div v-if="soldOut" class="content_card-info">
          <div class="icon-card-info-sould">
            <svg
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              enable-background="new 0 0 512 512"
              height="50px"
              viewBox="0 0 512 512"
              width="50px"
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
          <div class="text-card-info-sould">
            {{ $t('productdetail_productoAgotado') }}
          </div>
        </div>
      </div>
      <!-- Btn comprar -->
      <div class="content-button">
        <button
          v-if="
            !estadoCart &&
            !soldOut &&
            !spent &&
            (product.tipo_servicio == null || product.tipo_servicio == '0')
          "
          id="AddToCartTag"
          ref="colorBtn"
          class="btn"
          @click="addShoppingCart"
        >
          <i class="header-content-cart">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              class="minicart-icon-1"
              viewBox="0 0 16 16"
            >
              <path
                d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"
              />
            </svg>
          </i>
          <p class="txt-btn-product">
            {{ $t('productdetail_añadiralcarrito') }}
          </p>
        </button>
        <button
          v-else-if="soldOut"
          disabled
          class="btn-disabled"
          @click="addShoppingCart"
        >
          <i class="header-content-cart">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              class="minicart-icon-1"
              viewBox="0 0 16 16"
            >
              <path
                d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"
              />
            </svg>
          </i>
          <p class="txt-btn-product">{{ $t('home_cardAgotado') }}</p>
        </button>
        <nuxt-link
          v-else
          ref="colorBtn"
          class="btn"
          :to="{ path: `/productos/` + product.slug }"
        >
          <p class="txt-btn-product">{{ $t('home_cardvermas') }}</p>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import idCloudinary from '@/mixins/idCloudinary'
import currency from '@/mixins/formatCurrent'
export default {
  name: 'KoProductCardFilterList11',
  mixins: [idCloudinary, currency],
  props: {
    product: {
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
      this.product.variantes[0].variantes !== '[object Object]'
    ) {
      this.estadoCart = true
    }
  },
  methods: {
    getDataProduct() {
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
.container {
  @apply relative max-w-full;
}
.image {
  @apply w-full h-auto;
}
.icon {
  @apply text-2xl text-white-white;
}
.cart-Shop {
  @apply text-white-white absolute text-center transition-all ease-in duration-300 w-full;
  font: inherit;
  font-size: 100%;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  text-align: center;
}
.cart-Shop-mobile {
  @apply text-white-white absolute text-center transition-all ease-in duration-300 w-full;
  font: inherit;
  font-size: 100%;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  text-align: center;
  justify-column: center;
}
.icons-hover {
  @apply text-gray-textHeader absolute text-center transition-all ease-in duration-300 grid grid-cols-1 gap-0;
  font: inherit;
  font-size: 100%;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  text-align: center;
}
.icon-show-mobile {
  fill: white;
}
.card-title {
  color: var(--color_title);
  font-weight: var(--fontWeighTitle);
  font-size: var(--fontSizeTitle);
  font: inherit;
  font-family: var(--font-style-1) !important;
  @apply text-left;
}
.categoria {
  font-weight: var(--fontWeighTitle);
  color: var(--color_title);
  font: inherit;
  font-family: var(--font-style-1) !important;
  @apply font-semibold;
}
.text-price {
  font-weight: var(--fontWeighPretitle);
  font-size: var(--fontSizePretitle);
  color: var(--color_price);
  font-family: var(--font-style-1) !important;
  @apply pl-5 whitespace-nowrap;
}
.separator-price {
  font-family: var(--font-style-1) !important;
  font-size: var(--fontSizePretitle);
  color: var(--color_price);
  @apply mb-10;
}
.text-free {
  color: #fff;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  @apply absolute whitespace-nowrap;
}
.icon-overlay-free {
  color: #25db37;
}
.text-sould {
  color: white;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  @apply absolute whitespace-nowrap;
}
.content_buy_action {
  @apply flex flex-row justify-start items-center;
}
.transport-icon {
  color: #00a650;
  font-family: var(--font-style-1) !important;
  @apply w-full flex justify-center items-center font-semibold mb-10;
}
.content_card-info {
  @apply w-full flex flex-row justify-start items-end mb-10;
}
.text-card-info-sould {
  color: #ed2353;
  font-size: 16px;
  font-family: var(--font-style-1) !important;
  @apply ml-18 font-semibold;
}
.content-button {
  @apply flex flex-row pb-20;
}
.btn {
  color: #fff;
  fill: #fff;
  background-color: #222;
  font-size: 15px;
  transition: color 0.25s ease, background-color 0.25s ease,
    border-color 0.25s ease, box-shadow 0.25s ease, opacity 0.25s ease;
  font-family: var(--font-style-1) !important;
  @apply w-auto h-40 flex flex-row justify-center items-center tracking-1 cursor-pointer mt-2 px-15;
}
.btn:hover {
  color: #fff;
  fill: #fff;
  background-color: #eb7025;
  @apply shadow-md;
}

.txt-btn-product {
  font-size: 12px;
  font-family: var(--font-style-1) !important;
  @apply font-semibold ml-10 tracking-1 leading-1 uppercase whitespace-nowrap;
}
.btn-disabled {
  fill: #fff;
  color: #fff;
  background-color: gray;
  transition: color 0.25s ease, background-color 0.25s ease,
    border-color 0.25s ease, box-shadow 0.25s ease, opacity 0.25s ease;
  font-family: var(--font-style-1) !important;
  @apply h-40 flex flex-row justify-center items-center cursor-pointer tracking-1 leading-1 ml-10 font-semibold whitespace-nowrap mt-2 px-15;
}
.datos-producto {
  @apply w-full flex flex-col justify-center items-start my-6 ml-2 cursor-default;
}
.tittle {
  color: #3f3f3f;
  font-size: 100%;
  font: inherit;
  font-family: var(--font-style-1) !important;
}

@screen sm {
  .text-cart {
    @apply hidden;
  }
  .overlay-bottom {
    @apply hidden;
  }
  .overlay-top {
    @apply absolute overflow-hidden shadow-2xl bg-white-white rounded-md max-w-full max-h-full transition-all ease-in duration-300;
    top: 8%;
    left: 80%;
    right: 0;
    width: 20%;
    height: 20%;
  }
  .container:hover .overlay-top {
    width: 20%;
    left: 80%;
  }
  .overlay-free {
    @apply rounded;
    position: absolute;
    top: 0%;
    left: 45%;
    right: 0;
    background-color: #25db37;
    overflow: hidden;
    width: 50%;
    height: 10%;
    transition: 0.5s ease;
  }
  .container:hover .overlay-free {
    width: 50%;
    left: 45%;
    transition-delay: 700ms;
  }
  .text-free {
    font-size: 75%;
  }
  .overlay-polygon {
    position: absolute;
    top: 10%;
    left: 85%;
    right: 0;
    background-color: transparent;
    overflow: hidden;
    width: 5%;
    height: 5%;
    /* transition: 0.5s ease; */
  }
  .container:hover .overlay-polygon {
    width: 5%;
    left: 85%;
  }
  .overlay-sould {
    @apply flex justify-center items-center rounded-l-lg;
    position: absolute;
    top: 0%;
    left: 60%;
    right: 0;
    /* background-color: #008cba; */
    overflow: hidden;
    width: 35%;
    height: 20%;
    transition: 0.5s ease;
  }
  .container:hover .overlay-sould {
    width: 35%;
    left: 60%;
    transition-delay: 700ms;
  }
  .svg-sould-out {
    @apply w-40 h-40;
  }
  .cart-shop {
    @apply sr-only hidden;
  }
  .cart-shop-mobile {
    @apply not-sr-only block;
  }
  .icon-show-mobile {
    margin-top: 2.5px;
    @apply ml-auto mr-auto;
  }
  .producto {
    background: var(--background_color_1);
    @apply w-full flex flex-row justify-center items-center cursor-pointer;
  }
  .product-image {
    @apply w-full object-cover overflow-hidden;
  }
  .product-image-soldOut {
    filter: grayscale(100%);
    @apply w-full object-cover overflow-hidden;
  }
  .card-title {
    font-size: 18px;
  }
  .categoria {
    font-size: 13px;
    @apply mb-2;
  }
  .precio {
    font-size: 16px;
  }
  .text-price {
    font-size: 24px;
    @apply mt-10;
  }
  .separator-price {
    font-size: 20px;
  }
  .transport-icon {
    @apply hidden;
  }
  .content_card-info {
    @apply hidden;
  }
  .content-price {
    @apply flex flex-row justify-center items-center w-full;
  }
}

@media (min-width: 640px) {
  .producto {
    @apply justify-start items-start cursor-pointer pt-4 pb-8;
  }
  .product-image {
    @apply w-auto h-auto;
  }
  .text-price {
    @apply m-0 pl-0;
  }
  .datos-producto {
    @apply m-0;
  }
}
@screen md {
  .text-free {
    font-size: 100%;
  }
  .svg-sould-out {
    @apply w-60 h-60;
  }
  .icon {
    @apply mt-2;
  }
}
@media (min-width: 780px) {
  .transport-icon {
    @apply flex;
  }
  .content_card-info {
    @apply flex;
  }
}
@screen lg {
  .product-image,
  .product-image-soldOut {
    height: 420px;
    width: 90%;
  }
  .datos-producto {
    @apply mt-40;
  }
}
@screen mlg {
  .icon {
    @apply mt-0;
  }
  .text-cart {
    @apply block;
  }
  .overlay-top {
    @apply absolute w-0 overflow-hidden transition-all ease-in duration-300 shadow-2xl rounded-md bg-white-white;
    top: 6%;
    left: 80%;
    right: 0;
    height: 20%;
  }
  .container:hover .overlay-top {
    width: 15%;
    left: 65%;
  }
  .overlay-free {
    @apply rounded;
    position: absolute;
    top: 0%;
    left: 80%;
    right: 0;
    background-color: #25db37;
    overflow: hidden;
    width: 0;
    height: 10%;
    transition: 0.5s ease;
  }
  .container:hover .overlay-free {
    width: 44%;
    left: 35%;
    transition-delay: 700ms;
  }
  .text-free {
    font-size: 100%;
  }
  .overlay-polygon {
    position: absolute;
    top: 10%;
    left: 100%;
    right: 0;
    background-color: transparent;
    overflow: hidden;
    width: 0;
    height: 5%;
    /* transition: 0.5s ease; */
  }
  .container:hover .overlay-polygon {
    width: 5%;
    left: 70%;
    transition-delay: 950ms;
  }
  .overlay-sould {
    @apply flex justify-center items-center rounded-l-lg;
    position: absolute;
    top: 5%;
    left: 75%;
    right: 0;
    /* background-color: #008cba; */
    overflow: hidden;
    width: 0;
    height: 20%;
    transition: 0.5s ease;
  }
  .container:hover .overlay-sould {
    width: 35%;
    left: 50%;
    transition-delay: 700ms;
  }
  .svg-sould-out {
    width: 60px;
    height: 60px;
  }
  .cart-shop {
    @apply not-sr-only block;
  }
  .cart-shop-mobile {
    @apply sr-only hidden;
  }
  .text-price {
    @apply mb-10;
  }
  .separator-price {
    font-size: 20px;
  }
  .transport-icon {
    @apply mb-20;
  }
  .content-button {
    @apply w-full;
  }
  .tittle {
    @apply pb-2;
  }
  .btn,
  .btn-disabled {
    @apply w-auto;
  }
}
@media (min-width: 3000px) {
  .container {
    background-color: #f4f2f0;
    @apply justify-center items-center;
  }
  .wrapper-image {
    @apply flex justify-center items-center;
  }
}
</style>
