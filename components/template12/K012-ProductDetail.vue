<template>
  <div
    class="modal-content"
    :style="[
      {
        '--font-style-1': settingByTemplate12?.fontFamily ?? 'Poppins',
      },
    ]"
  >
    <div class="modal-header">
      <p class="txt-Legal">{{ $t('productdetail_name') }}</p>
      <span class="close" @click="closeModalpolitics">&times;</span>
    </div>
    <div v-if="tempData">
      <div v-if="!loading" v-loading="loading" class="container-productDetail">
        <div class="section">
          <div class="wrapper-left">
            <productSlide
              :photos="data.productosFotos"
              :photo="data.fotoCloudinary"
              :id-you-tube="idYoutube"
            />
          </div>
          <div class="wrapper-right">
            <div class="content-right">
              <p class="text-name">{{ data.nombre }}</p>
              <p class="text-marca">
                <strong>{{ data.productosInfo.marca }}</strong>
              </p>
              <p
                v-show="
                  data.productosInfo.tagPromocion == 1 &&
                  data.productosInfo.promocionValor &&
                  salesData.precio
                "
                class="text-promocion"
              >
                {{
                  (data.productosInfo.tagPromocion == 1 &&
                  data.productosInfo.promocionValor
                    ? Math.trunc(
                        salesData.precio /
                          (1 - data.productosInfo.promocionValor / 100),
                      )
                    : 0)
                    | currency(
                      dataStore.tiendasInfo.paises.codigo,
                      dataStore.tiendasInfo.moneda,
                    )
                }}
              </p>
              <div
                class="wrapper-price"
                :class="
                  data.productosInfo.tagPromocion == 1
                    ? ''
                    : 'wrapper-price_space'
                "
              >
                <p v-show="salesData.precio" class="text-precio">
                  {{
                    salesData.precio
                      | currency(
                        dataStore.tiendasInfo.paises.codigo,
                        dataStore.tiendasInfo.moneda,
                      )
                  }}
                </p>
                <p
                  v-show="
                    data.productosInfo.tagPromocion == 1 &&
                    data.productosInfo.promocionValor &&
                    salesData.precio
                  "
                  class="card-descuento"
                >
                  {{ data.productosInfo.promocionValor }}% OFF
                </p>
              </div>
              <PluginAddi
                :more-details="false"
                :status="dataStore.medioPagos.addi"
                :price="salesData"
                :data-store="dataStore"
              />
              <div class="content_buy_action">
                <div
                  v-if="data.envioGratis == 1 || envio.titulo == 'Envío gratis'"
                >
                  <p class="card-info-2">{{ $t('home_cardGratis') }}</p>
                </div>
                <div v-else class="content_card-info">
                  <p class="card-info-1">
                    {{ $t('home_cardAgotado') }}
                  </p>
                </div>
              </div>
              <div
                v-if="data.productosInfo.descripcionCorta"
                style="margin-top: 10px; margin-bottom: 5px"
              >
                <p class="text-marca">
                  <strong>{{ data.productosInfo.descripcionCorta }}</strong>
                </p>
              </div>
              <div
                v-if="data.conVariante === 1 && variantes"
                class="container-variants"
              >
                <div v-for="(variant, index) in variantes" :key="index">
                  <label for="variant name" class="text-variant-type">
                    {{ variant.nombre }}:
                  </label>
                  <selectGroup :index="index" :variantes="variantes">
                    <option
                      v-for="item in variant.valores"
                      :key="item.option"
                      :value="item.option"
                    >
                      {{ item.option }}
                    </option>
                  </selectGroup>
                </div>
              </div>
              <!-- <div class="content-btn-whatsapp" v-if="dataStore.redes.whatsapp">
              <button class="btn-whatsapp" @click="redirectWP()">
                <whatsapp-icon class="wp-icon" />{{
                  $t('productdetail_solicitarInfo')
                }}
              </button>
            </div> -->
            </div>
          </div>
        </div>
        <div v-if="contentDescription" class="content-description">
          <div class="wrapper-description">
            <h3 class="text-variant">
              {{ $t('productdetail_description') }}
            </h3>
            <div class="editor content-text-desc">
              <el-tiptap
                v-model="contentDescription"
                :extensions="extensions"
                :spellcheck="false"
                :readonly="true"
                :tooltip="false"
                :bubble="false"
                :showMenubar="false"
                :charCounterCount="false"
              />
            </div>
            <!-- <div class="content-text-desc" v-html="data.info.descripcion"></div> -->
          </div>
        </div>
        <div class="responsive-purchase">
          <div class="ko-input">
            <div v-if="!spent && salesData.estado" class="quantity-resposive">
              <button class="quantity_remove" @click="removeQuantity">
                <menos-icon class="icon" />
              </button>
              <p class="quantity_value">
                {{ quantityValue }}
              </p>
              <button class="quantity_add" @click="addQuantity">
                <mas-icon class="icon" />
              </button>

              <div
                v-show="quantityValue == maxQuantityValue"
                class="container-alert"
              >
                <span class="alert">{{ $t('cart_ultimaUnidad') }}</span>
              </div>
            </div>
            <button
              v-if="shouldShowAddToCartButton"
              ref="color2"
              class="btn-responsive"
              @click="addToCart"
            >
              <span>
                {{ getAddToCartButtonLabel }}
              </span>
            </button>
            <button
              v-else-if="salesData.precio == 0 && !spent"
              ref="color2"
              class="btn-responsive"
              @click="WPQuotation()"
            >
              <span>
                {{ $t('productdetail_cotizar') }}
              </span>
            </button>
            <button
              v-else-if="shouldShowBuyButton"
              id="AddToCartTag"
              ref="color2"
              class="btn-responsive"
              @click="goToPayments"
            >
              {{ getBuyButtonLabel }}
            </button>
            <div v-else-if="spent" class="wrapper-btn">
              <p class="card-info-1-res">
                😥 {{ $t('productdetail_productoAgotado') }}
              </p>
            </div>
            <button
              v-else-if="!salesData.estado || salesData.precio === 0"
              class="btn-responsive"
              disabled
            >
              <span>
                {{ $t('productdetail_btnANodisponible') }}
              </span>
            </button>
          </div>
        </div>
      </div>
      <div v-else class="flex w-full flex-col items-center justify-center">
        <div class="spinner">
          <div class="dot1"></div>
          <div class="dot2"></div>
        </div>
        <p class="text-2xl font-semibold text-black">Cargando producto..</p>
      </div>
    </div>
  </div>
</template>
<script>
import extensions from '@/mixins/elemenTiptap.vue'
import currency from '@/mixins/formatCurrent'
import mobileCheck from '@/mixins/mobileCheck'
export default {
  name: 'Ko12ProductDetail',
  components: {
    PluginAddi: () => import('@/components/_commonComponent/addi.vue'),
    selectGroup: () => import('../_commonComponent/select-group.vue'),
    ProductSlide: () => import('../_commonComponent/zoom.vue'),
  },
  filters: {
    toLowerCase(value) {
      if (value) {
        return value.toLowerCase()
      }
      return ''
    },
  },
  mixins: [extensions, currency, mobileCheck],
  props: {
    dataStore: {
      type: Object,
      required: true,
    },
    tempData: {
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
      loading: true,
      contentDescription: '',
      data: {},
      selectPhotoUrl: '',
      idYoutube: '',
      existYoutube: false,
      maxQuantityValue: 1,
      quantityValue: 1,
      productIndexCart: null,
      warranty: '',
      productCart: {},
      salesData: null,
      spent: false,
      shippingProduct: '',
      envio: {
        titulo: '',
        desc: '',
      },
      activeZoom: true,
      userDropshipping: {
        userId: '',
        userName: '',
      },
    }
  },
  computed: {
    beforeCombination() {
      return this.$store.state.beforeCombination
    },
    envios() {
      return this.dataStore.envios
    },
    whatsapp() {
      return this.dataStore.redes.whatsapp
    },
    // eslint-disable-next-line vue/return-in-computed-property
    variantes() {
      if (this.data.conVariante === 1) {
        return JSON.parse(this.data.productosVariantes[0].variantes)
      }
    },
    shouldShowAddToCartButton() {
      return (
        !this.spent &&
        this.salesData.estado &&
        this.salesData.precio > 0 &&
        (this.data.productosInfo.tipoServicio == null ||
          this.data.productosInfo.tipoServicio == '0')
      )
    },
    shouldShowBuyButton() {
      return !this.spent && this.data.productosInfo.tipoServicio == '1'
    },
    getAddToCartButtonLabel() {
      return this.$t('productdetail_añadiralcarrito')
    },
    getBuyButtonLabel() {
      return this.$t('productdetail_btnComprar')
    },
  },
  watch: {
    envios() {
      this.setOptionShipping()
    },
    quantityValue(value) {
      if (value > this.maxQuantityValue) {
        this.quantityValue = this.maxQuantityValue
      }
    },
    beforeCombination(value) {
      const combinationSelected = JSON.stringify(value)
      if (this.data.combinaciones) {
        if (
          this.data.combinaciones[0][0].combinaciones !== '[object Object]' &&
          this.data.conVariante > 0
        ) {
          const combinaciones = JSON.parse(
            this.data.combinaciones[0][0].combinaciones,
          )
          const result = combinaciones.find(
            (combinacion) =>
              JSON.stringify(combinacion.combinacion) == combinationSelected,
          )
          this.productCart = []
          this.productIndexCart = null
          for (const [
            index,
            productCart,
          ] of this.$store.state.productsCart.entries()) {
            if (
              this.data.id == productCart.id &&
              JSON.stringify(productCart.combinacion) ==
                JSON.stringify(result.combinacion)
            ) {
              this.productIndexCart = index
              this.productCart = productCart
            }
          }
          if (result) {
            this.spent = false
            this.maxQuantityValue = parseInt(result.unidades)
            if (result.unidades == 0) {
              this.spent = true
            }
            if (this.productCart.cantidad) {
              this.maxQuantityValue =
                parseInt(result.unidades) - this.productCart.cantidad
              if (this.maxQuantityValue <= 0) {
                this.spent = true
              }
            }
            this.salesData = result
            if (typeof this.salesData.unidades === 'string') {
              this.salesData.unidades = parseInt(this.salesData.unidades)
            }
            this.quantityValue = 1
          }
        }
      }
    },
  },
  mounted() {
    this.getDataProduct()
    this.$store.state.beforeCombination = []
    if (this.envios?.valores) {
      this.setOptionShipping()
    }
    if (
      this.$route.query &&
      this.$route.query.userId &&
      this.$route.query.userName
    ) {
      this.userDropshipping.userId = this.$route.query.userId
      this.userDropshipping.userName = this.$route.query.userName
    }
  },
  methods: {
    closeModalpolitics() {
      this.$store.state.modalproductDetails = false
    },
    async getDataProduct() {
      const { success, data } = await this.$store.dispatch(
        'products/GET_DATA_PRODUCT',
        {
          slug: this.tempData.slug,
        },
      )
      if (success && data.data) {
        this.loading = false
        this.data = data.data

        this.getDescriptionProduct(data.data.slug)
        this.sendAnalyticsStore(data.data.id, 'VIEWED_PRODUCT')
        this.selectedPhoto(data.data.fotoCloudinary)
        // this.videoYouTube(data.data.productosInfo.video)
        if (this.envios?.valores) {
          this.setOptionShipping()
        }
        // this.getSuggestedProducts()

        this.salesData = {
          precio: data.data.precio,
          unidades: data.data.productosInfo.inventario,
          sku: data.data.productosInfo.sku,
          estado: true,
        }
        this.maxQuantityValue = data.data.productosInfo.inventario
        for (const [
          index,
          productCart,
        ] of this.$store.state.productsCart.entries()) {
          if (data.data.id == productCart.id) {
            this.productIndexCart = index
            this.productCart = productCart
            this.maxQuantityValue =
              data.data.productosInfo.inventario - productCart.cantidad
          }
        }
        if (this.salesData.unidades == 0 || this.maxQuantityValue <= 0) {
          this.spent = true
        }
        if (this.facebookPixel?.pixel_facebook != null) {
          window.fbq('track', 'ViewContent', {
            content_type: 'product',
            content_ids: [`${data.data.id}`],
            contents: [
              {
                id: `${data.data.id}`,
                quantity: this.quantityValue,
              },
            ],
            value: data.data.precio ? this.salesData.precio : 0,
            currency: this.dataStore.tiendasInfo.moneda,
            content_name: data.data.nombre,
            content_category: 'otro',
          })
        }
      }
    },
    async getDescriptionProduct(idProduct) {
      const { success, data } = await this.$store.dispatch(
        'products/GET_DESCRIPTION_PRODUCTO',
        {
          slug: idProduct,
        },
      )
      if (success) {
        this.contentDescription = data?.data
      }
    },
    async sendAnalyticsStore(value, event) {
      await this.$store.dispatch('SEND_ANALYTICS_STORE', {
        storeId: this.dataStore.id,
        event: event,
        productId: value,
      })
    },
    setOptionShipping() {
      if (this.data.envioGratis == 1) {
        this.envio = {
          titulo: 'Envío gratis',
          desc: 'Disfruta de este obsequio por parte de la tienda.',
        }
      } else {
        this.data.shippingProduct = this.envios.valores
        switch (this.data.shippingProduct.envio_metodo) {
          case 'gratis':
            this.envio = {
              titulo: 'Envío gratis',
              desc: 'Disfruta de este obsequio por parte de la tienda.',
            }
            break
          case 'sinEnvio':
            this.envio = {
              titulo: 'Sin envio',
              desc: 'Tienes que acercarte a la tienda a recoger tu pedido.',
            }
            break
          case 'tarifa_plana':
            this.envio = {
              titulo: 'Tarifa plana',
              desc: `Compra todo lo que quieras en nuestra tienda, el valor del envio siempre sera el mismo: Valor envio $${this.data.shippingProduct.valor}`,
            }
            break
          case 'precio':
            this.envio = {
              titulo: 'Tarifa por precio',
              desc: 'Según la suma del costo de tus productos te cobraran el envio',
            }
            break
          case 'precio_ciudad':
            this.envio = {
              titulo: 'Tarifa por ciudad',
              desc: 'Según la ciudad te cobraran el envio',
            }
            break
          case 'peso':
            this.envio = {
              titulo: 'Tarifa por peso',
              desc: '',
            }
            break
          default:
        }
      }
    },
    quantity(productCart) {
      this.quantityValue = productCart.cantidad
    },
    addQuantity() {
      if (this.maxQuantityValue > this.quantityValue) {
        this.quantityValue++
        this.data.cantidad = this.quantityValue
      } else {
        // Alerta de limite de sku
      }
    },
    removeQuantity() {
      if (this.data.cantidad >= 2) {
        this.quantityValue--
        this.data.cantidad = this.quantityValue
      }
    },
    selectedPhoto(photo) {
      this.selectPhotoUrl = photo
      this.existYoutube = false
    },
    addToCart() {
      if (!this.data.cantidad) {
        this.data.cantidad = this.quantityValue
      }
      this.sendAnalyticsStore(this.data.id, 'ADDED_PRODUCT_TO_CART')
      const product = {
        id: this.data.id,
        precio: this.salesData.precio,
        cantidad: this.data.cantidad,
        foto_cloudinary: this.data.fotoCloudinary,
        nombre: this.data.nombre,
        combinacion: this.salesData.combinacion,
        envio_gratis: this.data.envioGratis,
        promocion_valor: this.data.productosInfo.promocionValor,
        tag_promocion: this.data.productosInfo.tagPromocion,
        dropshipping: this.userDropshipping.userId,
        con_variante: this.data.conVariante,
      }
      if (this.salesData) {
        product.limitQuantity = this.salesData.unidades
      } else {
        product.limitQuantity = this.data.productosInfo.inventario
      }
      if (typeof this.productIndexCart === 'number') {
        const mutableProduct =
          this.$store.state.productsCart[this.productIndexCart]
        mutableProduct.cantidad += this.data.cantidad
        this.$store.state.productsCart.splice(
          this.productIndexCart,
          1,
          mutableProduct,
        )
      } else {
        this.$store.state.productsCart.push(product)
      }
      this.$store.commit('UPDATE_CONTENT_CART')
      this.$store.state.modalproductDetails = false
      this.$store.commit('SET_OPEN_ORDER', true)
      // this.$store.state.orderComponent = true
      this.$store.dispatch('SEND_ADD_TO_CART', 1)
    },
    goToPayments() {
      let objeto = {
        id: this.data.id,
        cantidad: this.quantityValue,
        combinacion:
          this.salesData && this.salesData.combinacion
            ? this.salesData.combinacion
            : undefined,
        dropshipping: this.userDropshipping.userId,
      }
      let json = {
        products: [objeto],
        tienda: {
          id: this.dataStore.id,
        },
        canal: 'KOMERCIA',
      }
      json = JSON.stringify(json)
      if (json) {
        this.$store.dispatch('SEND_ADD_TO_CART', 2)
        if (this.layourUnicentro) {
          window.open(`https://checkout.komercia.co/?params=${json}`)
        } else {
          location.href = `https://checkout.komercia.co/?params=${json}`
        }
      }
    },
    redirectWP() {
      let baseUrlMovil = 'https://api.whatsapp.com/send?'
      let baseUrlPc = 'https://web.whatsapp.com/send?'
      let urlProduct = window.location.href
      let text = `Hola 😀, %0AQuiero compartir contigo éste  producto, seguro te va a encantar: ${this.data.nombre}%0A%0ALink de compra: ${urlProduct}%0A`
      if (this.mobileCheck()) {
        window.open(`${baseUrlMovil}text=${text}`, '_blank')
      } else {
        window.open(`${baseUrlPc}text=${text}`, '_blank')
      }
    },
    WPQuotation() {
      let baseUrlMovil = 'https://api.whatsapp.com/send?phone='
      let baseUrlPc = 'https://web.whatsapp.com/send?phone='
      let urlProduct = window.location.href
      let text = `Hola%20%F0%9F%98%80%2C%0AEstoy%20en%20tu%20tienda%20%2A${this.dataStore.nombre}%2A%20y%20quiero%20cotizar%20este%20producto%3A%0A%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%0A%2A${this.data.nombre}%2A%0A%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%0ALink%3A%20${urlProduct}`
      if (this.dataStore.redes.whatsapp.charAt(0) == '+') {
        let phone_number_whatsapp = this.dataStore.redes.whatsapp.slice(1)
        if (this.mobileCheck()) {
          window.open(
            `${baseUrlMovil}${phone_number_whatsapp}&text=${text}`,
            '_blank',
          )
        } else {
          window.open(
            `${baseUrlPc}${phone_number_whatsapp}&text=${text}`,
            '_blank',
          )
        }
      } else {
        if (this.mobileCheck()) {
          window.open(
            `${baseUrlMovil}57${this.dataStore.redes.whatsapp}&text=${text}`,
            '_blank',
          )
        } else {
          window.open(
            `${baseUrlPc}57${this.dataStore.redes.whatsapp}&text=${text}`,
            '_blank',
          )
        }
      }
    },
  },
}
</script>
<style scoped>
* {
  font-family: var(--font-style-1) !important;
}
.container-productDetail {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px 30px 0px 30px;
  position: relative;
}
.section {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.wrapper-description {
  width: 100%;
  margin-top: 20px;
}
.wrapper-left {
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-right: 15px;
  padding-bottom: 10px;
}
.wrapper-right {
  flex: 1;
  display: flex;
  width: 100%;
  flex-direction: column;
  padding-bottom: 10px;
}
.content-right {
  margin-left: 20px;
}
.text-name {
  font-weight: 600;
  font-size: 17px;
  line-height: 20px;
  color: #445a64;
  color: #0f2930;
}
.text-marca {
  font-size: 16px;
  font-stretch: semi-condensed;
  font-style: normal;
  color: rgba(21, 20, 57, 0.541);
}
.text-promocion {
  font-size: 14px;
  font-weight: bold;
  color: rgba(55, 4, 4, 0.61);
  text-decoration: line-through;
  margin-top: 10px;
}
.wrapper-price_space {
  margin-top: 10px;
}
.wrapper-price {
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: flex-start;
  margin-bottom: 12px;
}
.wrapper-price > p:nth-child(2) {
  margin-left: 5px;
}
.text-precio {
  font-size: 30px;
  font-weight: bold;
  /* color: var(--color_text); */
  color: #000000;
  line-height: 24px;
}
.card-descuento {
  font-size: 12px;
  color: #00a650;
  /* font-weight: bold; */
  border-radius: 3px;
}
.text-variant {
  font-weight: 600;
  font-size: 15px;
  color: #0f2930;
}
.content-text-desc {
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 14px;
  color: #0f2930;
}
.text-desc {
  text-decoration-color: currentcolor;
  text-decoration-style: solid;
  text-decoration-line: none;
  font-size: 14px;
  font-weight: normal;
  color: rgba(21, 20, 57, 0.541);
  line-height: 1.5;
  text-decoration: none;
}
.content_buy_action {
  display: flex;
  flex-direction: row;
}
.card-info-2 {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #35dd8d;
  padding: 1px 4px;
  border-radius: 5px;
  color: black;
  margin-right: 10px;
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 10px;
}
.content_card-info {
  display: initial;
}
.card-info-1 {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #e71f77;
  padding: 1px 4px;
  border-radius: 5px;
  color: white;
  font-size: 12px;
  margin-bottom: 10px;
}
.content-description {
  width: 100%;
  margin-bottom: 20px;
  display: flex;
}
.responsive-purchase {
  position: sticky;
  bottom: 0px;
  width: 100%;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
}
.ko-input {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0px;
  background-color: #fafaf8;
}
.quantity-resposive {
  display: flex;
  flex-direction: row;
}
.quantity_remove {
  border: 1px black;
  border-top-left-radius: var(--radius_btn);
  border-bottom-left-radius: var(--radius_btn);
  border-style: solid none solid solid;
  background: transparent;
  height: 38px;
  width: 3em;
  cursor: pointer;
}
.quantity_value {
  font-size: 1em;
  color: #000000;
  border: 1px black;
  padding-left: 10px;
  padding-right: 10px;
  border-style: solid none solid none;
  background: transparent;
  height: 38px;
  width: 2.5em;
  justify-content: center;
  display: flex;
  align-items: center;
}
.quantity_add {
  border: 1px black;
  border-top-right-radius: var(--radius_btn);
  border-bottom-right-radius: var(--radius_btn);
  border-style: solid solid solid none;
  background: transparent;
  height: 38px;
  width: 3em;
  cursor: pointer;
}
.btn-responsive {
  border-radius: var(--radius_btn);
  border: none;
  box-shadow:
    0px 0px 2px rgba(52, 58, 67, 0.1),
    0px 2px 5px rgba(52, 58, 67, 0.08),
    0px 5px 15px rgba(52, 58, 67, 0.08);
  padding: 6px 10px;
  width: 100%;
  height: 100%;
  font-size: 14px;
  margin-left: 15px;
  cursor: pointer;
  transition: all 200ms ease-in;
  background: #222;
  color: #fff;
}
.btn-responsive span {
  font-size: 16px;
  font-weight: 600;
}
.icon {
  font-size: 16px;
  color: black;
  transition: all 200ms ease-in;
}
.icon:hover {
  color: #128c7e;
}
.wrapper-btn {
  padding: 5px 0px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.card-info-1-res {
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(207, 207, 207);
  padding: 6px 10px;
  border-radius: var(--radius_btn);
  color: #4c4c4c;
  font-size: 14px;
  font-weight: 600;
  width: 100%;
  height: 36px;
}
.container-alert {
  position: absolute;
  top: -33px;
  left: 5px;
  width: 120px;
  background-color: rgb(250, 232, 75);
  border: 1px solid rgb(230, 213, 66);
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: black;
}
.alert {
  text-align: center;
  padding: 5px 5px;
  /* text-transform: capitalize; */
}
.container-variants {
  margin-top: 15px;
}
.text-variant-type {
  font-size: 14px;
  color: #0f2930;
}
.editor {
  width: 100%;
  color: transparent;
}
.editor >>> .el-tiptap-editor > .el-tiptap-editor__content {
  border: none;
  padding: 0px 5px;
  background-color: transparent;
}
.editor >>> .el-tiptap-editor__menu-bubble {
  display: none;
}
.editor >>> .el-tiptap-editor__content h1 {
  font-size: 2em;
  font-family: var(--font-style-1);
}
.editor >>> .el-tiptap-editor__content h2 {
  font-size: 1.5em;
  font-family: var(--font-style-1);
}
.editor >>> .el-tiptap-editor__content h3 {
  font-size: 1.17em;
  font-family: var(--font-style-1);
}
.editor >>> .el-tiptap-editor__content h4 {
  font-size: 1.12em;
  font-family: var(--font-style-1);
}
.editor >>> .el-tiptap-editor__content h5 {
  font-size: 0.83em;
  font-family: var(--font-style-1);
}
.editor >>> .el-tiptap-editor__content p {
  font-family: var(--font-style-1);
}
.editor >>> .el-tiptap-editor__content span {
  font-family: var(--font-style-1);
}
.editor >>> .el-tiptap-editor__content blockquote {
  font-family: var(--font-style-1);
}
.editor >>> .el-tiptap-editor__content code {
  font-family: var(--font-style-1);
}
.editor >>> .el-tiptap-editor__content ul {
  font-family: var(--font-style-1);
}
.editor >>> .el-tiptap-editor__content ol {
  font-family: var(--font-style-1);
}
.editor >>> .el-tiptap-editor__content li {
  font-family: var(--font-style-1);
}
.editor >>> .el-tiptap-editor__content pre {
  font-family: var(--font-style-1);
}
.editor >>> .el-tiptap-editor__content strong {
  font-family: var(--font-style-1);
}
.editor >>> .el-tiptap-editor__content em {
  font-family: var(--font-style-1);
}
.editor >>> .el-tiptap-editor__content s {
  font-family: var(--font-style-1);
}
.editor >>> .el-tiptap-editor__content .image-view__body__image {
  cursor: none;
  pointer-events: none;
}
.editor >>> .el-popper.el-tiptap-image-popper {
  display: none;
}

@media (max-width: 685px) {
  .container-productDetail {
    padding: 0px;
  }
  .section {
    flex-direction: column;
    justify-content: center;
  }

  .wrapper-right {
    padding-bottom: 0px;
    justify-content: center;
    align-items: center;
  }
  .content-right {
    width: 100%;
    padding: 5px 15px;
    margin-left: 0px;
  }
  .text-name {
    margin-top: 10px;
    font-weight: 500;
    font-size: 18px;
    color: #445a64;
  }
  .content-description {
    padding: 0 15px;
    padding-bottom: 20px;
  }
}
@media (max-width: 500px) {
  .ko-input {
    padding: 12px 10px;
  }
}
/* Modal Content */
.modal-content {
  max-height: 600px;
  background-color: #fefefe;
  border: 1px solid #888;
  box-shadow:
    0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
  -webkit-animation-name: animatetop;
  -webkit-animation-duration: 0.4s;
  animation-name: animatetop;
  animation-duration: 0.4s;
  overflow-y: auto;
  @apply relative m-auto rounded-8 p-0;
}
.modal-content::-webkit-scrollbar {
  @apply w-10;
}
.modal-content::-webkit-scrollbar-thumb {
  background: #a3a3a3;
  border-radius: 4px;
}
.modal-content::-webkit-scrollbar-thumb:active {
  background-color: #777777;
}
.modal-content::-webkit-scrollbar-thumb:hover {
  background: #686868;
  box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.401);
}
/* Add Animation */
@-webkit-keyframes animatetop {
  from {
    top: -300px;
    opacity: 0;
  }
  to {
    top: 0;
    opacity: 1;
  }
}
@keyframes animatetop {
  from {
    top: -300px;
    opacity: 0;
  }
  to {
    top: 0;
    opacity: 1;
  }
}
/* The Close Button */
.close {
  color: #fff;
  font-size: 28px;
  @apply float-right font-semibold;
}
.close:hover,
.close:focus {
  color: #ccc;
  text-decoration: none;
  @apply cursor-pointer;
}
.modal-header {
  z-index: 2;
  background-color: #222;
  color: white;
  @apply sticky top-0 flex w-full items-center justify-between px-20 py-10;
}
.txt-Legal {
  font-size: 16px;
  color: #fff;
  font-family: 'Poppins', Helvetica, Arial, sans-serif !important;
  @apply font-semibold;
}
@screen sm {
  .modal-content {
    @apply w-full;
  }
}
@screen md {
  .modal-content {
    @apply w-7/0;
  }
}
@media (min-width: 1400px) {
  .modal-content {
    @apply w-5/0;
  }
}
/* cargando */
.card {
  max-height: 460px;
  min-height: 460px;
}
.spinner {
  margin: 50px auto;
  width: 40px;
  height: 40px;
  position: relative;
  text-align: center;
  -webkit-animation: sk-rotate 2s infinite linear;
  animation: sk-rotate 2s infinite linear;
}
.dot1,
.dot2 {
  width: 60%;
  height: 60%;
  display: inline-block;
  position: absolute;
  top: 0;
  background-color: #4429b4;
  border-radius: 100%;
  -webkit-animation: sk-bounce 2s infinite ease-in-out;
  animation: sk-bounce 2s infinite ease-in-out;
}
.dot2 {
  top: auto;
  bottom: 0;
  -webkit-animation-delay: -1s;
  animation-delay: -1s;
}
@-webkit-keyframes sk-rotate {
  100% {
    -webkit-transform: rotate(360deg);
  }
}
@keyframes sk-rotate {
  100% {
    transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
  }
}
@-webkit-keyframes sk-bounce {
  0%,
  100% {
    -webkit-transform: scale(0);
  }
  50% {
    -webkit-transform: scale(1);
  }
}
@keyframes sk-bounce {
  0%,
  100% {
    transform: scale(0);
    -webkit-transform: scale(0);
  }
  50% {
    transform: scale(1);
    -webkit-transform: scale(1);
  }
}
</style>
