<template>
  <div class="content-productCard">
    <div class="content-items-productCard">
      <nuxt-link
        id="product-card"
        class="content-img-prodcut relative"
        :to="{
          path: `/wa/${dataStore.id}/productos/` + product.slug,
        }"
      >
        <img
          v-lazy="
            product?.foto_cloudinary == 'sin_foto.jpeg'
              ? 'https://res.cloudinary.com/komerciaacademico/image/upload/v1637945917/komerica/sws8xa8z0oyu252nqxzv_cgwcdb.png'
              : idCloudinary(product.foto_cloudinary, 550, 550)
          "
          width="265"
          height="265"
          loading="lazy"
          class="product-image"
          :class="!soldOut ? '' : 'grayscale'"
          alt="Product Img"
        />
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
        <p v-if="soldOut" class="card_info card_soldOut">
          {{ $t('home_cardAgotado') }}
        </p>
        <p v-if="!getFreeShipping" class="card_info card_freeShipping">
          {{ $t('home_cardGratis') }}
        </p>
        <div
          v-if="product.tag_promocion == 1 && product.promocion_valor"
          class="card-descuento"
        >
          <p>{{ product.promocion_valor }}% OFF</p>
        </div>
      </nuxt-link>
      <nuxt-link
        class="content-description-product"
        :to="{
          path: `/wa/${dataStore.id}/productos/` + product.slug,
        }"
      >
        <p class="txt-name-product pb-auto min-h-[48px]">
          {{ product.nombre }}
        </p>

        <div class="content-price-product">
          <div v-if="estadoCart && equalsPrice" class="item-price-product">
            <p v-if="minPrice > 0" class="txt-product-price">
              {{
                minPrice
                  | currency(
                    dataStore.tiendasInfo.paises.codigo,
                    dataStore.tiendasInfo.moneda
                  )
              }}
            </p>
          </div>
          <div
            v-else-if="estadoCart && !equalsPrice"
            class="item-price-product"
          >
            <p class="txt-product-price">
              {{
                minPrice
                  | currency(
                    dataStore.tiendasInfo.paises.codigo,
                    dataStore.tiendasInfo.moneda
                  )
              }}
            </p>
            <p
              v-if="
                dataStore?.id === 18265 &&
                product?.tag_promocion == 1 &&
                product?.promocion_valor
              "
              class="ml-5 text-sm text-red-500 line-through"
            >
              {{
                Math.trunc(minPrice / (1 - product.promocion_valor / 100))
                  | currency(
                    dataStore.tiendasInfo.paises.codigo,
                    dataStore.tiendasInfo.moneda
                  )
              }}
            </p>
            <p
              v-if="maxPrice > 0 && dataStore?.id !== 18265"
              class="separator-price"
            >
              -
            </p>
            <p
              v-if="maxPrice > 0 && dataStore?.id !== 18265"
              class="txt-product-price"
            >
              {{
                maxPrice
                  | currency(
                    dataStore.tiendasInfo.paises.codigo,
                    dataStore.tiendasInfo.moneda
                  )
              }}
            </p>
          </div>
          <div v-else class="item-price-product min-h-[28px]">
            <p v-if="product.precio > 0" class="txt-product-price">
              {{
                product.precio
                  | currency(
                    dataStore.tiendasInfo.paises.codigo,
                    dataStore.tiendasInfo.moneda
                  )
              }}
            </p>
            <p
              v-if="
                dataStore?.id === 18265 &&
                product?.tag_promocion == 1 &&
                product?.promocion_valor
              "
              class="ml-5 text-sm text-red-500 line-through"
            >
              {{
                Math.trunc(minPrice / (1 - product.promocion_valor / 100))
                  | currency(
                    dataStore.tiendasInfo.paises.codigo,
                    dataStore.tiendasInfo.moneda
                  )
              }}
            </p>
          </div>
        </div>
      </nuxt-link>
      <div v-if="!estadoCart && !soldOut && !spent" class="content-buttons">
        <div
          v-if="product.precio > 0"
          class="button-left"
          @click="addShoppingCart"
        >
          <svg
            class="svg-img"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
        </div>
        <nuxt-link
          class="button-right"
          :style="`background: ${
            settingByTemplate && settingByTemplate.color_primario
              ? settingByTemplate.color_primario
              : '#25D366'
          };`"
          :to="{
            path: `/wa/${dataStore.id}/productos/` + product.slug,
          }"
        >
          <p
            class="txt-btn-right"
            :style="`color:${settingByTemplate.color_secundario};`"
          >
            {{
              dataStore.id == 13015
                ? $t('productdetail_btnComprar')
                : $t('home_cardvermas')
            }}
          </p>
        </nuxt-link>
      </div>
      <nuxt-link
        v-else
        class="button-right"
        :style="`background: ${
          settingByTemplate && settingByTemplate.color_primario
            ? settingByTemplate.color_primario
            : '#25D366'
        };`"
        :to="{
          path: `/wa/${dataStore.id}/productos/` + product.slug,
        }"
      >
        <p
          class="txt-btn-right"
          :style="`color:${settingByTemplate.color_secundario};`"
        >
          {{
            dataStore.id == 13015
              ? $t('productdetail_btnComprar')
              : $t('home_cardvermas')
          }}
        </p>
      </nuxt-link>
    </div>
  </div>
</template>
<script>
import idCloudinary from '@/mixins/idCloudinary'
import currency from '@/mixins/formatCurrent'
import mobileCheck from '@/mixins/mobileCheck'
export default {
  name: 'ProductCardWa2',
  mixins: [idCloudinary, currency, mobileCheck],
  props: {
    product: {
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
    settingByTemplate() {
      return (
        this.$store.state.settingByTemplate ||
        this.$store.state.settingBaseWapir
      )
    },
    productsCarts() {
      return this.$store.state.productsCart
    },
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
      if (this.product?.con_variante) {
        const arrCombinations = this.product.variantes
        if (arrCombinations?.combinaciones?.length) {
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
    productsCarts() {
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
      this.productsCarts.find((productCart, index) => {
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
          this.$message({
            showClose: true,
            message: 'Se agregó el producto correctamente',
            type: 'success',
          })
          this.$store.dispatch('SEND_ADD_TO_CART', 1)
        }
      }
    },
    productPrice() {
      if (this.product?.con_variante) {
        const variants = this.product.variantes

        if (variants?.combinaciones?.length > 0) {
          let parsedCombinations = []
          try {
            parsedCombinations = JSON.parse(
              variants.combinaciones[0].combinaciones
            )
          } catch (e) {
            console.error('Error al parsear combinaciones:', e)
          }

          if (Array.isArray(parsedCombinations)) {
            const prices = parsedCombinations
              .filter((item) => item.precio && item.estado)
              .map((item) => item.precio)
            if (prices?.length > 0) {
              this.productVariants = true
              const sortedPrices = prices.sort((a, b) => a - b)
              this.minPrice = sortedPrices[0]
              this.maxPrice = sortedPrices[sortedPrices.length - 1]
              this.equalsPrice = this.minPrice === this.maxPrice
              return
            }
          }
        }
      }

      this.productVariants = false
      this.minPrice = this.product.precio || 0
      this.maxPrice = this.product.precio || 0
      this.equalsPrice = true
    },
    redirectWP() {
      let baseUrlMovil = 'https://api.whatsapp.com/send?phone='
      let baseUrlPc = 'https://web.whatsapp.com/send?phone=57'
      let urlProduct
      if (this.dataStore.tiendasInfo.dominio) {
        urlProduct = `${this.dataStore.tiendasInfo.dominio}wa/${this.product.slug}`
      } else {
        urlProduct = `http://${this.dataStore.subdominio}.komercia.store/wa/${this.product.slug}`
      }
      let text = `text=Hola 😀, %0AEstoy en tu tienda y me interesa el producto: ${this.product.nombre}%0A%0ALink de compra: ${urlProduct}%0A`
      if (this.dataStore.redes.whatsapp.length > 10) {
        let phone_number_whatsapp = this.dataStore.redes.whatsapp
        if (phone_number_whatsapp.charAt(0) === '+') {
          phone_number_whatsapp = phone_number_whatsapp.slice(1)
        }
        if (this.mobileCheck()) {
          window.open(
            `${baseUrlMovil}${phone_number_whatsapp}&${text}`,
            '_blank'
          )
        } else {
          window.open(`${baseUrlPc}${phone_number_whatsapp}&${text}`, '_blank')
        }
      } else {
        if (this.mobileCheck()) {
          window.open(
            `${baseUrlMovil}${this.dataStore.redes.whatsapp}&${text}`,
            '_blank'
          )
        } else {
          window.open(
            `${baseUrlPc}${this.dataStore.redes.whatsapp}&${text}`,
            '_blank'
          )
        }
      }
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
.card_info {
  @apply absolute flex items-center justify-center text-10 font-bold;
}
.card_soldOut {
  background: #e71f77;
  padding: 1px 2px;
  border-radius: 4px;
  color: white;
  bottom: 30px;
  right: 10px;
}
.card_freeShipping {
  background: #35dd8d;
  padding: 1px 2px;
  border-radius: 4px;
  color: black;
  bottom: 10px;
  right: 10px;
}
.overlay-top {
  top: 50px;
  left: 100%;
  right: 0;
  width: 0;
  height: 29px;
  padding: 5px;
  font-size: 13px;
  background: white;
  color: #25d366;
  @apply absolute overflow-hidden rounded-md shadow-md transition-all duration-300 ease-in;
}
#product-card:hover .overlay-top {
  width: 67px;
  left: 72%;
}
.overlay-free {
  position: absolute;
  background-color: #25d366;
  color: white;
  overflow: hidden;
  transition: 0.5s ease;
  top: 5px;
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
  left: 50%;
  transition-delay: 700ms;
}
.overlay-polygon {
  position: absolute;
  top: 40px;
  left: 100%;
  right: 0;
  background-color: transparent;
  overflow: hidden;
  width: 0;
  height: 5%;
  fill: #25d366;
}
#product-card:hover .overlay-polygon {
  width: 5%;
  left: 90%;
  transition-delay: 950ms;
}
.card-descuento {
  display: none;
}
.content-productCard {
  @apply flex h-full w-full flex-col items-center justify-start;
}

@screen sm {
  .content-items-productCard {
    max-width: 350px;
    @apply flex w-full flex-col items-center justify-center;
  }
  .content-img-prodcut {
    max-height: 175px;
    max-width: 175px;
    background-color: #f9f9f9;
    @apply flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-9 border;
  }
  .product-image {
    @apply h-full w-full object-cover object-center;
  }
  .product-image-soldOut {
    filter: grayscale(100%);
  }
  .content-description-product {
    @apply my-10 grid w-full grid-cols-1 items-center justify-center gap-1;
  }
  .txt-name-product {
    color: #3d3d3d;
    font-size: 14px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    font-family: 'Poppins', sans-serif !important;
    @apply w-full text-left font-medium;
  }
  .content-price-product {
    @apply flex w-auto flex-col items-center justify-center;
  }
  .item-price-product {
    @apply flex w-full flex-row items-center justify-start gap-1;
  }
  .txt-product-price {
    color: #3d3d3d;
    font-size: 14px;
    font-family: 'Poppins', sans-serif !important;
    @apply flex w-auto flex-col items-start justify-center font-bold;
  }
  .content-buttons {
    @apply flex w-full flex-row items-center justify-between;
  }
  .button-left {
    max-height: 34px;
    background-color: #ececec;
    @apply mr-5 flex w-auto cursor-pointer flex-col items-center justify-center rounded-5 p-8;
  }
  .svg-img {
    color: black;
    @apply h-auto w-21;
  }
  .button-right {
    max-height: 34px;
    @apply flex w-full cursor-pointer flex-col items-center justify-center rounded-7 px-12 py-8;
  }
  .txt-btn-right {
    font-size: 14px;
    font-family: 'Poppins', sans-serif !important;
    @apply flex w-full flex-col items-center justify-center font-semibold;
  }
}

@media (min-width: 500px) {
  .content-img-prodcut {
    max-height: 267px;
    max-width: 267px;
  }
}
@media (min-width: 600px) {
  .item-price-product {
    @apply flex flex-row items-center justify-start;
  }
  .txt-name-product {
    font-size: 16px;
  }
  .txt-product-price {
    font-size: 16px;
    font-weight: bold;
  }
  .button-left {
    @apply mr-10 p-5;
  }
  .svg-img {
    @apply h-auto w-32;
  }
  .button-right {
    @apply py-8;
  }
  .txt-btn-right {
    font-size: 16px;
  }
}
@media (max-width: 768px) {
  .card-descuento {
    display: initial;
    position: absolute;
    left: 5px;
    bottom: 10px;
    font-size: 12px;
    color: white;
    background: #35dd8d;
    border-radius: 3px;
    padding: 0px 5px;
    margin-top: 3px;
  }
}
</style>
