<template>
  <div class="wrapper-card">
    <div class="container-card">
      <div class="wrapper-movil">
        <p v-if="soldOut" class="card-info-1">{{ $t('home_cardAgotado') }}</p>
        <p v-if="!getFreeShipping" class="card-info-2">
          {{ $t('home_cardGratis') }}
        </p>
        <nuxt-link
          :to="{
            path: `/wa/${dataStore.id}/productos/` + product.slug,
          }"
          class="wrapper-image"
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
        </nuxt-link>
        <div class="wrapper-text">
          <nuxt-link
            :to="{
              path: `/wa/${dataStore.id}/productos/` + product.slug,
            }"
            class="content-name-product-movil"
          >
            <p class="card-text-movil-title">
              {{
                product.nombre.slice(0, 42) +
                (product.nombre.length >= 42 ? '..' : '')
              }}
            </p>

            <p v-if="product.marca" class="card-text-movil">
              {{ product.marca }}
            </p>
            <div class="content-text-price-movil-cart">
              <div class="wrapper-price">
                <div v-if="estadoCart && equalsPrice" class="content-price">
                  <p v-if="minPrice > 0" class="card-price-2">
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
                  class="content-price"
                >
                  <p v-if="minPrice > 0" class="card-price-2">
                    {{
                      minPrice
                        | currency(
                          dataStore.tiendasInfo.paises.codigo,
                          dataStore.tiendasInfo.moneda
                        )
                    }}
                  </p>
                  <p v-if="maxPrice > 0" class="separator-price">-</p>
                  <p v-if="maxPrice > 0" class="card-price-2">
                    {{
                      maxPrice
                        | currency(
                          dataStore.tiendasInfo.paises.codigo,
                          dataStore.tiendasInfo.moneda
                        )
                    }}
                  </p>
                </div>
                <div v-else>
                  <p
                    v-if="product.precio > 0 || product.precio"
                    class="card-price-2"
                  >
                    {{
                      product.precio
                        | currency(
                          dataStore.tiendasInfo.paises.codigo,
                          dataStore.tiendasInfo.moneda
                        )
                    }}
                  </p>
                </div>
                <!-- </div> -->
                <!-- <p class="card-descuento">-50%</p> -->
              </div>
            </div>
          </nuxt-link>
          <div class="Content-btn-movil">
            <div
              v-if="!estadoCart && !soldOut && !spent"
              class="content-soldOut"
            >
              <div
                v-if="product.precio > 0"
                class="btn"
                :style="`background: ${
                  settingByTemplate && settingByTemplate.color_primario
                    ? settingByTemplate.color_primario
                    : '#25D366'
                }; color:${
                  settingByTemplate && settingByTemplate.color_secundario
                    ? settingByTemplate.color_secundario
                    : '#FFFFFF'
                };`"
                style="margin-right: 5px"
                @click="addShoppingCart"
              >
                <shopWa-icon class="wp-icon" />
              </div>
              <nuxt-link
                :to="{
                  path: `/wa/${dataStore.id}/productos/` + product.slug,
                }"
                class="btn"
                :style="`background: ${
                  settingByTemplate && settingByTemplate.color_primario
                    ? settingByTemplate.color_primario
                    : '#25D366'
                }; color:${
                  settingByTemplate && settingByTemplate.color_secundario
                    ? settingByTemplate.color_secundario
                    : '#FFFFFF'
                };`"
              >
                {{
                  dataStore.id == 13015
                    ? $t('productdetail_btnComprar')
                    : $t('home_cardvermas')
                }}
              </nuxt-link>
            </div>
            <nuxt-link
              v-else
              :to="{
                path: `/wa/${dataStore.id}/productos/` + product.slug,
              }"
              class="btn"
              :style="`background: ${
                settingByTemplate && settingByTemplate.color_primario
                  ? settingByTemplate.color_primario
                  : '#25D366'
              }; color:${
                settingByTemplate && settingByTemplate.color_secundario
                  ? settingByTemplate.color_secundario
                  : '#FFFFFF'
              };`"
            >
              {{
                dataStore.id == 13015
                  ? $t('productdetail_btnComprar')
                  : $t('home_cardvermas')
              }}
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import idCloudinary from '@/mixins/idCloudinary'
import currency from '@/mixins/formatCurrent'
import mobileCheck from '@/mixins/mobileCheck'
export default {
  name: 'KoWaProductCard1',
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
    settingByTemplate() {
      return (
        this.$store.state.settingByTemplate ??
        this.$store.state.settingBaseWapir
      )
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
.wrapper-card {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  border-radius: 0px;
  border-bottom: 1px solid rgba(213, 213, 213, 0.473);
  transition: all 200ms ease-in;
  background-color: #f8f9fb;
  padding-bottom: 4px;
}

.container-card {
  display: flex;
  align-items: flex-start;
  width: 100%;
  overflow: hidden;
}
.wrapper-movil {
  width: 100%;
  display: flex;
  flex-direction: row;
  position: relative;
}
.wrapper-image {
  width: 100%;
  height: 100%;
  max-width: 110px;
  border-radius: 4px;
  margin-right: 5px;
  border-radius: 6px;
}
.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: 6px;
}
.card-info-1 {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #e71f77;
  padding: 1px 2px;
  border-radius: var(--radius_btn);
  color: white;
  font-size: 10px;
  z-index: 2;
  position: absolute;
  top: 74px;
  left: 0px;
}
.card-info-2 {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #35dd8d;
  padding: 1px 2px;
  border-radius: var(--radius_btn);
  color: black;
  font-size: 10px;
  font-weight: bold;
  z-index: 2;
  position: absolute;
  top: 92px;
  left: 0px;
}
.wrapper-text {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.content-name-product-movil {
  display: flex;
  width: 100%;
  padding: 0px 10px;
  margin-top: 1px;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  /* height: 30px; */
}
.card-text-movil-title {
  font-size: 15px;
  font-weight: 500;
  line-height: 1;
  color: #0f2930;
  color: #445a64;
}
.card-text-movil {
  font-size: 13px;
  font-weight: 300;
  color: black;
  color: #0f2930;
}
.content-text-price-movil-cart {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
}
.wrapper-price {
  display: flex;
  flex-direction: row;
  align-self: flex-start;
  justify-content: center;
  align-items: center;
}
.content-price {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.card-price-1-movil {
  font-size: 14px;
  font-weight: bold;
  line-height: 1;
  color: #0f2930;
  text-decoration: line-through;
  text-align: center;
}
.card-price-2 {
  margin-top: 8px;
  font-size: 14px;
  font-weight: 700;
  line-height: 1;
  color: black;
  color: #0f2930;
  text-align: left;
}
.separator-price {
  margin-top: 8px;
  color: #4c4c4c;
  margin-left: 5px;
  margin-right: 5px;
  text-align: center;
}
.card-descuento {
  font-size: 12px;
  color: white;
  background: #fe5858;
  border-radius: 3px;
  padding: 0px 4px;
  display: flex;
  justify-content: center;
  align-self: flex-end;
  position: relative;
  top: -8px;
  margin-left: 5px;
}
.Content-btn-movil {
  /* width: 100%; */
  height: 40px;
  display: flex;
  align-self: flex-end;
  align-items: flex-start;
}
.content-soldOut {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.icon-shop {
  max-width: 20px;
  max-height: 20px;
}
.btn {
  display: flex;
  justify-content: center;
  text-align: center;
  text-decoration: none;
  align-items: center;
  border-radius: 4px;
  padding: 6px 10px;
  font-weight: 600;
  margin-right: 4px;
  font-size: 12px;
  box-sizing: border-box;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow:
    0 1px 3px rgb(84 81 81 / 12%),
    0 1px 2px rgb(82 82 82 / 24%);
  cursor: pointer;
}

.wp-icon {
  font-size: 20px;
  bottom: 3px;
}
@media (max-width: 330px) {
  .wrapper-image {
    max-width: 105px;
  }
  .card-text-movil-title {
    font-size: 15px;
  }
  .card-info-1 {
    top: 70px;
  }
  .card-info-2 {
    top: 88px;
  }
}
</style>
