<template>
  <div
    class="wrapper-card"
    :style="[
      settingGeneral,
      settingCardProducts,
      {
        '--font-style-1': settingGeneral.fount_1 ?? 'Poppins',
      },
    ]"
  >
    <div id="product-card" class="container-card">
      <div class="wrapper">
        <nuxt-link
          :to="{ path: `/productos/` + product.slug }"
          class="wrapper-image"
        >
          <img
            v-lazy="
              product.foto_cloudinary === 'sin_foto.jpeg'
                ? 'https://res.cloudinary.com/komerciaacademico/image/upload/v1637945917/komerica/sws8xa8z0oyu252nqxzv_cgwcdb.png'
                : idCloudinary(product.foto_cloudinary, 550, 550)
            "
            :class="[
              'product-image',
              soldOut ? 'product-image-soldOut' : '',
              product.foto_cloudinary === 'sin_foto.jpeg'
                ? 'notproduct-image'
                : '',
            ]"
            alt="Product Img"
          />
          <div class="image_overlay"></div>
        </nuxt-link>
        <div v-if="product.tag_promocion == 1 && product.promocion_valor">
          <div class="overlay-top">
            <div>
              <p>{{ product.promocion_valor }}% OFF</p>
            </div>
          </div>
          <div class="overlay-free">
            <p class="txt-free">{{ $t('home_pdescuento') }}</p>
          </div>
          <div class="overlay-polygon">
            <svg
              class="icon-overlay-free"
              width="12px"
              height="12px"
              viewBox="0 0 255 255"
            >
              <polygon points="0,0 127.5,127.5 255,0" />
            </svg>
          </div>
        </div>
        <div class="separador-stats"></div>
        <div class="stats">
          <div class="stats-container">
            <p v-if="soldOut" class="card-info-1">
              {{ $t('home_cardAgotado') }}
            </p>
            <p v-if="!getFreeShipping" class="card-info-2">
              {{ $t('home_cardGratis') }}
            </p>
            <div class="content-name-product">
              <p class="card-title">
                {{ product.nombre }}
              </p>
            </div>
            <div
              v-if="product.precio || (minPrice && maxPrice)"
              class="content-text-price"
            >
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
                <p
                  v-if="product.precio > 0 || product.precio"
                  class="text-price"
                >
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
            <div v-else class="content-price-empty"></div>
            <div class="wrapper-btn-icon">
              <nuxt-link
                class="view_details"
                :to="{ path: `/productos/` + product.slug }"
              >
                <p>{{ $t('home_cardvermas') }}</p>
              </nuxt-link>
              <div class="separador-btn"></div>
              <div
                v-if="
                  product.precio > 0 &&
                  !estadoCart &&
                  !soldOut &&
                  !spent &&
                  (product.tipo_servicio == null ||
                    product.tipo_servicio == '0')
                "
                id="add_cart"
                @click="addShoppingCart"
              >
                <p style="height: 23px">
                  <cartArrowDown /> {{ $t('home_cardAgregar') }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="wrapper-movil">
        <nuxt-link
          :to="{ path: `/productos/` + product.slug }"
          class="wrapper-image"
        >
          <img
            v-lazy="
              product.foto_cloudinary === 'sin_foto.jpeg'
                ? 'https://res.cloudinary.com/komerciaacademico/image/upload/v1637945917/komerica/sws8xa8z0oyu252nqxzv_cgwcdb.png'
                : idCloudinary(product.foto_cloudinary, 550, 550)
            "
            :class="[
              'product-image',
              soldOut ? 'product-image-soldOut' : '',
              product.foto_cloudinary === 'sin_foto.jpeg'
                ? 'notproduct-image'
                : '',
            ]"
            alt="Product Img"
          />
          <div class="image_overlay"></div>
        </nuxt-link>

        <div class="content-card-items">
          <p v-if="soldOut" class="card-info-1">{{ $t('home_cardAgotado') }}</p>
          <p v-if="!getFreeShipping" class="card-info-2">
            {{ $t('home_cardGratis') }}
          </p>
          <nuxt-link
            :to="{ path: `/productos/` + product.slug }"
            class="content-name-product"
          >
            <p class="card-title">
              {{ product.nombre }}
            </p>
          </nuxt-link>
          <div
            v-if="product.precio || (minPrice && maxPrice)"
            class="content-text-price"
          >
            <nuxt-link :to="{ path: `/productos/` + product.slug }">
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
                <p
                  v-if="product.precio > 0 || product.precio"
                  class="text-price"
                >
                  {{
                    product.precio
                      | currency(
                        dataStore.tiendasInfo.paises.codigo,
                        dataStore.tiendasInfo.moneda,
                      )
                  }}
                </p>
              </div>
            </nuxt-link>
            <div
              v-if="
                !estadoCart &&
                !soldOut &&
                !spent &&
                (product.tipo_servicio == null || product.tipo_servicio == '0')
              "
            >
              <cartArrowDown class="icon-cart" @click="addShoppingCart" />
            </div>
          </div>
          <div v-else class="separator-movil">
            <div
              v-if="
                !estadoCart &&
                !soldOut &&
                !spent &&
                (product.tipo_servicio == null || product.tipo_servicio == '0')
              "
            >
              <cartArrowDown @click="addShoppingCart" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import idCloudinary from '@/mixins/idCloudinary'
import currency from '@/mixins/formatCurrent'

export default {
  name: 'Ko13ProductCard',
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
            precio: this.salesData.precio,
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
.wrapper-card {
  background: var(--background_color_1);
  border-radius: 5px;
  @apply box-border flex w-full items-start justify-center shadow;
}
.container-card {
  border-radius: 5px;
  @apply relative flex w-full flex-col items-center overflow-hidden;
}
.wrapper-image {
  @apply relative flex max-h-[300px] min-h-[250px] w-full max-w-[200px] items-center justify-center overflow-hidden md:max-w-full;
}
.product-image {
  @apply w-full overflow-hidden object-cover;
}
.notproduct-image {
  height: 294px;
  max-height: 294px;
  width: 300px;
}
.product-image-soldOut {
  filter: grayscale(100%);
  @apply w-full overflow-hidden object-cover;
}
.image_overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #6969692a;
  opacity: 0;
}
#product-card:hover .image_overlay {
  opacity: 0.7;
  -webkit-transition: all 200ms ease-out;
  -moz-transition: all 200ms ease-out;
  -o-transition: all 200ms ease-out;
  transition: all 200ms ease-out;
}
.separador-stats {
  height: 95px;
  width: 100%;
}
.stats-container {
  background: var(--background_color_1);
  position: absolute;
  top: 288px;
  left: 0;
  width: 100%;
  height: 120px;
  padding: 20px 12px 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  -webkit-transition: all 200ms ease-out;
  -moz-transition: all 200ms ease-out;
  -o-transition: all 200ms ease-out;
  transition: all 200ms ease-out;
}
#product-card:hover .stats-container {
  top: 241px;
  -webkit-transition: all 200ms ease-out;
  -moz-transition: all 200ms ease-out;
  -o-transition: all 200ms ease-out;
  transition: all 200ms ease-out;
}
.card-info-1 {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #e71f77;
  padding: 1px 4px;
  border-radius: var(--radius_btn);
  color: white;
  font-size: 12px;
  top: -44px;
  right: 0px;
  z-index: 2;
}
.card-info-2 {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #35dd8d;
  padding: 1px 4px;
  border-radius: var(--radius_btn);
  color: black;
  font-size: 12px;
  font-weight: bold;
  top: -22px;
  right: 0px;
  z-index: 2;
}
.content-name-product {
  width: 100%;
  min-height: 36px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  text-align: center;
}
.card-title {
  font-size: var(--fontSizeTitle);
  font-weight: var(--fontWeighTitle);
  color: var(--color_title);
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.content-text-price {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
}
.content-price {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  min-height: 29px;
  max-height: 29px;
}
.content-price-empty {
  width: 100%;
  margin-top: 5px;
  min-height: 29px;
  max-height: 29px;
}
.text-price {
  font-size: 20px;
  font-weight: var(--fontWeighPrice);
  line-height: 1.4;
  color: var(--color_price);
  text-align: center;
}
.separator-price {
  color: var(--color_price);
  margin-left: 5px;
  margin-right: 5px;
}
.wrapper-btn-icon {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
#add_cart {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 19px;
  text-align: center;
  text-transform: uppercase;
  font-weight: 700;
  padding: 10px 0;
  width: 130px;
  opacity: 0;
  height: 41px;
  color: var(--color_text_card);
  border-radius: var(--radius_btn);
  border: solid 2px var(--color_border_btn);
  background-color: var(--color_background_btn);
  -webkit-transition: all 200ms ease-out;
  -moz-transition: all 200ms ease-out;
  -o-transition: all 200ms ease-out;
  transition: all 200ms ease-out;
}
#add_cart:hover {
  color: var(--hover_text_btn);
  border: solid 2px var(--hover_Border_btn);
  background-color: var(--hover_Bg_btn);
  cursor: pointer;
}
#product-card:hover #add_cart {
  opacity: 1;
  width: 152px;
  font-size: 15px;
  -webkit-transition: all 200ms ease-out;
  -moz-transition: all 200ms ease-out;
  -o-transition: all 200ms ease-out;
  transition: all 200ms ease-out;
}
.view_details {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 19px;
  text-align: center;
  text-transform: uppercase;
  font-weight: 700;
  padding: 10px 0;
  width: 130px;
  opacity: 0;
  height: 41px;
  color: var(--color_border_btn);
  border-radius: var(--radius_btn);
  border: solid 2px var(--color_border_btn);
  background-color: transparent;
  -webkit-transition: all 200ms ease-out;
  -moz-transition: all 200ms ease-out;
  -o-transition: all 200ms ease-out;
  transition: all 200ms ease-out;
}
.view_details:hover {
  color: var(--hover_Border_btn);
  border: solid 2px var(--hover_Border_btn);
  cursor: pointer;
}
#product-card:hover .view_details {
  opacity: 1;
  width: 152px;
  font-size: 15px;
  -webkit-transition: all 200ms ease-out;
  -moz-transition: all 200ms ease-out;
  -o-transition: all 200ms ease-out;
  transition: all 200ms ease-out;
}
.separador-btn {
  width: 5px;
}
.wrapper {
  display: initial;
  width: 100%;
}
.wrapper-movil {
  display: none;
}
.card-icon-cart-movil:hover {
  color: var(--hover_text_btn);
}
/*Comienzo de animacion*/
.overlay-top {
  top: 43px;
  left: 100%;
  right: 0;
  width: 0;
  height: 29px;
  padding: 5px;
  font-size: 13px;
  background: white;
  color: #35dd8d;
  @apply absolute overflow-hidden rounded-md shadow-md transition-all duration-300 ease-in;
}
#product-card:hover .overlay-top {
  width: 67px;
  left: 75%;
}
.overlay-free {
  position: absolute;
  background-color: #35dd8d;
  color: white;
  overflow: hidden;
  transition: 0.5s ease;
  top: 0px;
  left: 100%;
  right: 0;
  width: 0;
  height: 35px;
  text-align: center;
  @apply rounded;
}
.txt-free {
  line-height: 12px;
  font-size: 13px;
  margin-top: 5px;
}
#product-card:hover .overlay-free {
  width: 125px;
  left: 55%;
  transition-delay: 700ms;
}
.overlay-polygon {
  position: absolute;
  top: 35px;
  left: 100%;
  right: 0;
  background-color: transparent;
  overflow: hidden;
  width: 0;
  height: 5%;
  fill: #35dd8d;
}
#product-card:hover .overlay-polygon {
  width: 5%;
  left: 90%;
  transition-delay: 950ms;
}
@media (max-width: 1270px) {
  .separador-stats {
    height: 105px;
  }
}
@media (max-width: 1249px) {
  .separador-stats {
    height: 98px;
  }
}
@media (max-width: 768px) {
  .wrapper {
    display: none;
  }
  .wrapper-movil {
    display: initial;
    width: 100%;
  }
  .content-card-items {
    width: 100%;
    height: 75px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 5px 10px;
    position: relative;
  }
  .card-title {
    font-size: 13px;
  }
  .content-text-price {
    margin-top: 0px;
  }
  .text-price {
    font-size: 15px;
  }
  .icon-cart {
    margin-left: 20px;
  }
  .card-info-1 {
    font-size: 10px;
    top: -43px;
  }
  .card-info-2 {
    font-size: 10px;
    top: -22px;
  }
  .notproduct-image-res {
    height: 357px;
    max-height: 357px;
    width: 100%;
  }
}
@media (max-width: 450px) {
  .notproduct-image-res {
    height: 170px;
    max-height: 170px;
  }
  .container-card {
    width: 100%;
    max-width: 200px;
  }
  .wrapper-image {
    min-height: 170px;
  }
}
</style>
