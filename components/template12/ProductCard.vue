<template>
  <div
    v-if="product"
    class="relative w-full flex justify-start items-start flex-nowrap bg-transparent cursor-pointer mb-20 px-10 md:px-5 product_container"
    @mouseenter="() => (isHover = true)"
    @mouseleave="() => (isHover = false)"
  >
    <div
      class="w-full max-w-[80px] max-h-[80px] flex justify-center items-cente"
      :class="
        settingByTemplate12.responsiveImages ? 'img_visileRes' : 'img_normal'
      "
    >
      <img
        v-lazy="idCloudinary(product.foto_cloudinary, 150, 150)"
        role="presentation"
        class="w-full object-cover object-center"
        alt="Product Img"
        :class="{
          'product-image-soldOut': soldOut,
          img_rounded: settingByTemplate12.roundedImages,
          img_normal: !settingByTemplate12.roundedImages,
        }"
      />
    </div>
    <div class="w-full flex flex-col ml-15">
      <div class="product_header mb-1">
        <h3
          v-if="product.nombre"
          class="product_name font-semibold text-md"
          :style="`color:${settingByTemplate12.textColor};`"
        >
          {{ product.nombre }}
        </h3>
      </div>
      <div class="product_description">
        <p
          v-if="product.categoria"
          class="font-normal text-sm"
          :style="`color:${settingByTemplate12.descriptionColor};`"
        >
          {{ product.categoria }}
        </p>
        <p
          v-if="product.marca"
          class="font-normal text-xs"
          :style="`color:${settingByTemplate12.descriptionColor};`"
        >
          {{ product.marca }}
        </p>
      </div>
    </div>
    <div class="w-full flex justify-end">
      <span
        v-if="equalsPrice && minPrice > 0"
        class="font-semibold"
        :style="`color:${settingByTemplate12.priceColor};`"
      >
        {{
          minPrice
            | currency(
              dataStore.tiendasInfo.paises.codigo,
              dataStore.tiendasInfo.moneda
            )
        }}
      </span>
      <div v-else-if="!equalsPrice" class="flex flex-row items-center">
        <div
          v-if="minPrice > 0"
          class="font-semibold"
          :style="`color:${settingByTemplate12.priceColor};`"
        >
          {{
            minPrice
              | currency(
                dataStore.tiendasInfo.paises.codigo,
                dataStore.tiendasInfo.moneda
              )
          }}
        </div>
        <p
          v-if="maxPrice > 0"
          class="font-semibold px-5"
          :style="`color:${settingByTemplate12.priceColor};`"
        >
          -
        </p>
        <div
          v-if="maxPrice > 0"
          class="font-semibold"
          :style="`color:${settingByTemplate12.priceColor};`"
        >
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
        <span
          v-if="product.precio > 0 || product.precio"
          class="font-semibold"
          :style="`color:${settingByTemplate12.priceColor};`"
        >
          {{
            product.precio
              | currency(
                dataStore.tiendasInfo.paises.codigo,
                dataStore.tiendasInfo.moneda
              )
          }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import idCloudinary from '@/mixins/idCloudinary'
import currency from '@/mixins/formatCurrent'
export default {
  name: 'ProductCard',
  mixins: [idCloudinary, currency],
  props: {
    product: {
      type: Object,
      required: true,
    },
    dataStore: {
      type: Object,
      required: true,
    },
    settingByTemplate12: {
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
    ...mapState(['productsCart']),
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
      if (!this.soldOut) {
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
            this.$message({
              showClose: true,
              message: 'Se agregó el producto correctamente',
              type: 'success',
            })
            this.$store.dispatch('SEND_ADD_TO_CART', 1)
          }
        }
      } else {
        this.$message({
          showClose: true,
          message: 'Este producto esta agotado',
          type: 'warning',
        })
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
.product_container {
  transition: all 220ms ease-in-out;
}
.product_container:hover {
  transform: translateX(0.4rem);
}
.img_rounded {
  border-radius: 100%;
}
.img_normal {
  border-radius: 2px;
}
.product-image-soldOut {
  filter: grayscale(100%);
}
.img_visileRes {
  display: flex;
}
.product_name {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}
@media (max-width: 450px) {
  .wrapper-text {
    max-width: 160px;
    margin-right: 3px;
  }

  .img_visileRes {
    display: none;
  }
  .img_normal {
    display: flex;
  }
}
</style>
