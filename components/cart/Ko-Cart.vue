<template>
  <div
    class="content-cart"
    :class="
      template == 7 ? 'margintopbytemplate07' : 'margintopbytemplategeneral'
    "
  >
    <div v-if="productsCart.length" class="conten-items-cart">
      <div class="cart-tittle">
        <cart-icon class="header-icon-cart" />
        <p class="txt-cart">{{ $t('home_tuCarrito') }}</p>
      </div>
      <div class="content-product-total">
        <div class="content-left">
          <div
            v-for="(product, index) in productsCart"
            :key="index"
            class="content-product-bag"
          >
            <div class="product">
              <div
                class="content-items-product content-items-product-resposive-img"
              >
                <img
                  v-lazy="idCloudinary(product.foto_cloudinary, 400, 400)"
                  class="product-photo"
                  :alt="product.nombre"
                />
              </div>
              <div class="content-items-product margin-items-product">
                <div class="product-items">
                  <div class="product-name">
                    <p class="text-name">{{ product.nombre | capitalize }}</p>
                    <div class="content_icon-sm" @click="deleteItemCart(index)">
                      <svg
                        class="icon-trash"
                        xmlns="http://www.w3.org/2000/svg"
                        height="24"
                        width="24"
                        viewBox="0 0 24 24"
                        fill="#222"
                      >
                        <title>Eliminar de carrito</title>
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path d="M0 0h24v24H0V0z" fill="none" />
                        <path
                          d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div v-if="product.combinacion" class="product-variant">
                    <p class="text-tittle">{{ $t('cart_variante') }}</p>
                    <el-tag
                      v-for="(item, items) in product.combinacion"
                      :key="items"
                      class="text-variant"
                      style="margin-top: 3px"
                    >
                      {{ item }}
                    </el-tag>
                  </div>
                  <div class="content-price">
                    <div>
                      <p class="text-tittle">{{ $t('cart_precio') }}</p>
                      <p class="text-result">
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
                  <div class="wrapper-tag">
                    <el-tag v-if="product.activo == 0" type="danger">
                      Producto agotado!
                    </el-tag>
                    <el-tag v-if="product.stock_disponible == 0" type="danger">
                      ¡No tiene las unidades disponibles!
                    </el-tag>
                  </div>
                  <div class="product-quiantity">
                    <div class="txt-tittle-quantity">
                      {{ $t('cart_cantidad') }}
                    </div>
                    <div class="quantity">
                      <button
                        class="quantity_remove"
                        @click="removeQuantity(product)"
                      >
                        <menos-icon class="icon-quantity" />
                      </button>
                      <!-- <p class="quantity_value">{{ product.cantidad }}</p> -->
                      <input
                        id="InputQuantityValue"
                        v-model="product.cantidad"
                        name="quantityValue"
                        class="quantity_value"
                        type="text"
                        placeholder=""
                        onkeypress="return (event.charCode>47 && event.charCode<58)"
                        @input="limitQuantity(product)"
                      />
                      <button
                        class="quantity_add"
                        @click="addQuantity(product)"
                      >
                        <mas-icon class="icon-quantity" />
                      </button>
                      <div
                        v-if="product.limitQuantity == product.cantidad"
                        class="container-alerta"
                      >
                        <span class="alerta">
                          {{ $t('cart_ultimaUnidad') }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="producto-price-total">
                  <p class="txt-total-product">{{ $t('footer_totalPagar') }}</p>
                  <p class="txt-price-product">
                    {{
                      (product.precio * product.cantidad)
                        | currency(
                          dataStore.tiendasInfo.paises.codigo,
                          dataStore.tiendasInfo.moneda
                        )
                    }}
                  </p>
                </div>
              </div>
              <div class="content-product-priceIcon">
                <div class="producto-price-total-md">
                  <p class="txt-price-product">
                    {{
                      (product.precio * product.cantidad)
                        | currency(
                          dataStore.tiendasInfo.paises.codigo,
                          dataStore.tiendasInfo.moneda
                        )
                    }}
                  </p>
                </div>
                <div class="content_icon-md" @click="deleteItemCart(index)">
                  <svg
                    class="icon-trash"
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    width="24"
                    viewBox="0 0 24 24"
                    fill="#222"
                  >
                    <title>Eliminar de carrito</title>
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path
                      d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="content-right">
          <div class="content-txt-summary">
            <p class="txt-summary">{{ $t('cart_resumen') }}</p>
          </div>
          <div class="content-cart-product">
            <div class="cart-summary-items">
              <p class="txt-cart-summary" style="font-weight: bold">
                {{ $t('cart_items') }}
              </p>
              <p class="txt_summary_price">
                {{ cantidadProductos }}
              </p>
            </div>
            <span v-if="discountDescuentos" class="cart-summary-items">
              <p class="txt-cart-summary" style="font-weight: bold">
                {{ $t('footer_descuento') }}
              </p>
              <p class="txt_summary_price">
                -
                {{
                  discountDescuentos
                    | currency(
                      dataStore.tiendasInfo.paises.codigo,
                      dataStore.tiendasInfo.moneda
                    )
                }}
              </p>
            </span>
            <div class="order_total">
              <div class="order_total_domicile">
                <p class="txt_summary_tittle" style="font-weight: bold">
                  {{ $t('footer_costoDomicilio') }}
                </p>
                <details
                  v-if="
                    rangosByCiudad.envio_metodo === 'precio_ciudad' &&
                    shippingCities.length > 0 &&
                    !getFreeShipping &&
                    !FreeShippingCart
                  "
                >
                  <summary class="txt-cart-summary">
                    {{ $t('footer_valorCiudad') }}
                  </summary>
                  <section>
                    <ol class="scroll_cart_summary_items_cities">
                      <li
                        v-for="(ciudad, index) in rangosByCiudad.rangos"
                        :key="ciudad.id"
                      >
                        <div v-if="ciudad.price > 0">
                          <b>
                            {{
                              shippingCities[index].nombre_ciu ===
                              'Sin especificar'
                                ? 'Resto del país'
                                : shippingCities[index].nombre_ciu
                            }}:
                          </b>
                          <p>
                            {{
                              ciudad.price
                                | currency(
                                  dataStore.tiendasInfo.paises.codigo,
                                  dataStore.tiendasInfo.moneda
                                )
                            }}
                          </p>
                        </div>
                      </li>
                    </ol>
                  </section>
                </details>
                <div
                  v-else-if="
                    rangosByCiudad.envio_metodo === 'tarifa_plana' &&
                    shipping > 0 &&
                    getFreeShipping &&
                    !FreeShippingCart
                  "
                  class="content-Plana"
                >
                  <div class="content-list">
                    <p class="txt_summary_tittle">
                      {{ $t('footer_tarifaPlana') }}
                    </p>
                  </div>
                  <div class="content-list">
                    <p class="txt_summary_price">
                      {{
                        rangosByCiudad.valor
                          | currency(
                            dataStore.tiendasInfo.paises.codigo,
                            dataStore.tiendasInfo.moneda
                          )
                      }}
                    </p>
                  </div>
                </div>
                <div
                  v-else-if="
                    rangosByCiudad.envio_metodo === 'precio' &&
                    getFreeShipping &&
                    !FreeShippingCart
                  "
                  style="width: 100%"
                >
                  <div v-if="shippingTarifaPrecio > 0" class="content-Plana">
                    <div class="content-list">
                      <p class="txt_summary_tittle">
                        {{ $t('footer_Porprecio') }}
                      </p>
                    </div>
                    <p class="txt_summary_price">
                      {{
                        shippingTarifaPrecio
                          | currency(
                            dataStore.tiendasInfo.paises.codigo,
                            dataStore.tiendasInfo.moneda
                          )
                      }}
                    </p>
                  </div>
                  <p
                    v-else-if="shippingTarifaPrecio >= 0"
                    class="txt_summary_price"
                  >
                    {{ $t('footer_tarifaPrecio') }}
                  </p>
                  <p v-else class="txt_summary_tittle">
                    {{ $t('footer_encioNoconfig') }}
                  </p>
                </div>
                <p
                  v-else-if="shipping && !getFreeShipping"
                  class="txt_summary_price"
                >
                  {{
                    shipping
                      | currency(
                        dataStore.tiendasInfo.paises.codigo,
                        dataStore.tiendasInfo.moneda
                      )
                  }}
                </p>
                <div
                  v-else-if="
                    rangosByCiudad.envio_metodo === 'gratis' &&
                    shippingCities.length <= 0 &&
                    !getFreeShipping &&
                    !FreeShippingCart
                  "
                  class="contet-free-delivery"
                >
                  <p class="txt_summary_tittle">
                    {{ $t('footer_encioGratis') }}
                  </p>
                  <!-- <p
                    class="txt_summary_price"
                    style="width: 100%; max-width: 180px"
                  >
                    {{
                      0
                        | currency(
                          dataStore.tiendasInfo.paises.codigo,
                          dataStore.tiendasInfo.moneda
                        )
                    }}
                  </p> -->
                </div>
                <div
                  v-else-if="
                    rangosByCiudad.envio_metodo === 'sintarifa' &&
                    shippingCities.length <= 0 &&
                    !getFreeShipping &&
                    !FreeShippingCart
                  "
                  class="contet-free-delivery"
                >
                  <p class="txt_summary_tittle">
                    {{ $t('footer_enviosPorPagar') }}
                  </p>
                  <p class="txt_summary_price">-</p>
                </div>
                <div
                  v-else-if="
                    rangosByCiudad.envio_metodo === 'sinEnvio' &&
                    shippingCities.length <= 0 &&
                    !getFreeShipping
                  "
                  class="contet-free-delivery"
                >
                  <p class="txt_summary_tittle">Pasas a recoger tu compra</p>
                </div>
                <div v-else-if="FreeShippingCart" class="contet-free-delivery">
                  <p class="txt_summary_tittle">
                    {{ $t('footer_tarifaPrecio') }}
                  </p>
                  <p class="txt_summary_price">$0</p>
                </div>
              </div>
            </div>
            <div class="cart-summary-items">
              <p class="txt-cart-summary" style="font-weight: bold">
                {{ $t('cart_subtotal') }}
              </p>
              <p class="txt_summary_price">
                {{
                  totalCart
                    | currency(
                      dataStore.tiendasInfo.paises.codigo,
                      dataStore.tiendasInfo.moneda
                    )
                }}
              </p>
            </div>
            <div class="line"></div>
            <div class="content-btn">
              <div class="content-totalPay">
                <p class="txt_summary_tittle txt-total">
                  {{ $t('cart_totalpagar') }}
                </p>
                <p class="txt_summary_price">
                  {{
                    (totalCart +
                      (shipping ? shipping : 0) +
                      (shippingTarifaPrecio &&
                      shippingTarifaPrecio != 'empty' &&
                      !FreeShippingCart
                        ? shippingTarifaPrecio
                        : 0) -
                      discountDescuentos)
                      | currency(
                        dataStore.tiendasInfo.paises.codigo,
                        dataStore.tiendasInfo.moneda
                      )
                  }}
                </p>
              </div>
              <p
                v-if="isQuotation() || (!countryStore && productsCart.length)"
                class="Quotation-message"
              >
                {{ $t('footer_contactoMgs') }}
              </p>
              <p v-if="dataStore.estado == 0" class="Quotation-message">
                {{ $t('footer_tiendaCerrada') }}
              </p>
              <!-- <p class="Quotation-message" v-if="!stateModalPwd">
                {{ $t('footer_tiendaPwd') }}
              </p> -->
              <!-- <p class="Quotation-message" v-if="verifyProducts == 0">
                {{ $t('cart_limitProductos') }}
              </p> -->
              <p
                v-if="!IsMinValorTotal() && productsCart.length"
                class="Quotation-message"
              >
                {{ $t('cart_minimovalorProductos1') }}
                {{
                  dataStore.tiendasInfo.valorCompraMinimo
                    | currency(
                      dataStore.tiendasInfo.paises.codigo,
                      dataStore.tiendasInfo.moneda
                    )
                }}
                {{ $t('cart_minimovalorProductos2') }}
              </p>
              <!-- && verifyProducts == 1 -->
              <button
                v-if="
                  productsCart.length &&
                  !isQuotation() &&
                  dataStore.estado == 1 &&
                  !estadoShippingTarifaPrecio &&
                  countryStore &&
                  IsMinValorTotal() &&
                  expiredDate(dataStore.fechaExpiracion)
                "
                ref="colorBtn"
                class="btn-buy-1"
                @click="GoPayments"
              >
                {{ $t('footer_finalizarCompra') }}
              </button>
              <nuxt-link :to="`${redirectCart}`" class="btn-buy-2">
                {{ $t('footer_seguirCompra') }}
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="contenedor-vacio">
      <div class="wrapper_photo">
        <img
          src="../../assets/img/icono_cesta.png"
          class="photo"
          alt="Product img"
        />
      </div>
      <p class="text-empty">{{ $t('footer_carritoVacio2') }}</p>
      <p class="text-empty2">
        {{ $t('footer_carritoVacio3') }}
      </p>
      <nuxt-link :to="`${redirectCart}`">
        <p ref="colorBtn" class="btn3">
          {{ $t('cart_agregarProductos') }}
        </p>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import idCloudinary from '@/mixins/idCloudinary'
import currency from '@/mixins/formatCurrent'
import expiredDate from '@/mixins/expiredDate'
// import { Empty } from 'element-ui'
export default {
  name: 'KoCartG',
  filters: {
    capitalize(value) {
      if (value) {
        value = value.toLowerCase()
        return value.replace(/^\w|\s\w/g, (l) => l.toUpperCase())
      }
    },
  },
  mixins: [idCloudinary, currency, expiredDate],
  props: {
    dataStore: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      // img: 'https://res.cloudinary.com/komerciaacademico/image/upload/v1583535445/komerciaAcademico/CARRITO_y2lbh6.png',
      // envioProducto: '',
      // layoutLogin: true,
      shippingCities: [],
      // rangosByCiudad: [],
      shippingTarifaPrecio: '',
      estadoShippingTarifaPrecio: false,
      FreeShippingCart: false,
      discountDescuentos: 0,
    }
  },
  computed: {
    // stateModalPwd() {
    //   return this.$store.state.stateModalPwd
    // },
    cities() {
      return this.$store.state.cities
    },
    verifyProducts() {
      return this.$store.getters.verifyProducts
    },
    cantidadProductos() {
      return this.$store.getters.cantidadProductos
    },
    template() {
      return this.$store.state.template
    },
    totalCart() {
      return this.$store.state.totalCart
    },
    redirectCart() {
      let resultURl
      if (
        this.template == 5 ||
        this.template == 6 ||
        this.template == 99 ||
        this.template == 12
      ) {
        resultURl = '/'
      } else {
        resultURl = '/productos'
      }
      return resultURl
    },
    getFreeShipping() {
      const freeMethods = ['tarifa_plana', 'precio']
      return freeMethods.includes(this.rangosByCiudad.envio_metodo)
    },
    rangosByCiudad() {
      return this.$store.state.envios.valores
    },
    shipping() {
      // if (this.FreeShippingCart || !this.$store.state?.envios?.estado) {

      if (this.FreeShippingCart) {
        return 0
      }

      switch (this.rangosByCiudad.envio_metodo) {
        case 'sinEnvio':
        case 'sintarifa':
        case 'gratis':
          return 0
        case 'tarifa_plana':
          return this.rangosByCiudad.valor
        case 'precio_ciudad':
          // eslint-disable-next-line no-case-declarations
          const result = this.rangosByCiudad.rangos.find((rango) => {
            return (
              this.totalCart >= rango.inicial && this.totalCart <= rango.final
            )
          })
          return result ? result.precio : 0
        default:
          return 0
      }
    },
    countryStore() {
      if (this.dataStore && this.dataStore.tiendasInfo.paises.pais) {
        const supportedCountries = ['Colombia', 'Chile', 'Perú', 'Panamá']
        return supportedCountries.includes(
          this.dataStore.tiendasInfo.paises.pais
        )
      }
      return false
    },
    productsCart() {
      return this.$store.state.productsCart
    },
    shippingDescuento() {
      return this.$store.getters.listaDescuentosProductos
    },
    shippingDescuento2() {
      return this.$store.getters.listaDescuentosPrecio
    },
    facebookPixel() {
      return this.$store.state.analytics_tagmanager
    },
  },
  watch: {
    rangosByCiudad() {
      this.filterCities()
    },
    // cities() {
    //   this.filterCities()
    // },
    productsCart() {
      if (this.productsCart) {
        this.productsFreeShippingCart()
      }
    },
    totalCart() {
      this.shippingPrecio()
      this.IsMinValorTotal()
      this.obtainDiscountValue()
    },
    shippingDescuento() {
      this.obtainDiscountValue()
    },
    shippingDescuento2() {
      this.obtainDiscountValue()
    },
  },
  async mounted() {
    this.getCities()
    this.$store.dispatch('GET_DESCUENTOS')
    if (this.$route.query?.clearCart != 'true') {
      this.$store.dispatch('GET_SHOPPING_CART')
    }
    this.$store.commit('CALCULATE_TOTAL_CART')
    if (this.rangosByCiudad.envio_metodo == 'precio') {
      this.shippingPrecio()
    }
    this.productsFreeShippingCart()
    this.IsMinValorTotal()
    this.obtainDiscountValue()
  },
  methods: {
    obtainDiscountValue() {
      let value1 = this.calculateDiscount(this.shippingDescuento)
      let value2 = this.calculateDiscount(this.shippingDescuento2)
      this.discountDescuentos = value1 + value2
    },
    calculateDiscount(discount) {
      if (!discount) {
        return 0
      }
      if (discount.tipo === 1) {
        return discount.valor || 0
      } else if (discount.tipo === 0) {
        return discount.valor
          ? Math.trunc((this.totalCart * discount.valor) / 100)
          : 0
      }
      return 0
    },
    shippingPrecio() {
      if (this.rangosByCiudad.envio_metodo === 'precio') {
        const result = this.rangosByCiudad.rangos.find(
          (rango) =>
            this.totalCart >= rango.inicial && this.totalCart <= rango.final
        )
        if (result) {
          this.shippingTarifaPrecio = result.precio
          this.estadoShippingTarifaPrecio = false
        } else {
          this.shippingTarifaPrecio = 'empty'
          this.estadoShippingTarifaPrecio = true
        }
      }
    },
    isQuotation() {
      return this.productsCart.some((product) => product.precio === 0)
    },
    limitQuantity(product) {
      product.cantidad = parseInt(product.cantidad)
      if (isNaN(product.cantidad) || product.cantidad <= 0) {
        product.cantidad = 1
      } else if (
        product.limitQuantity !== null &&
        product.cantidad > product.limitQuantity
      ) {
        product.cantidad = product.limitQuantity
      }
    },
    addQuantity(product) {
      if (product.limitQuantity > product.cantidad) {
        product.cantidad++
        this.$store.commit('UPDATE_CONTENT_CART')
        this.$store.commit('CALCULATE_TOTAL_CART')
        // this.$store.dispatch('VERIFY_PRODUCTS')
      }
    },
    removeQuantity(product) {
      if (product.cantidad >= 2) {
        product.cantidad--
        this.$store.commit('UPDATE_CONTENT_CART')
        this.$store.commit('CALCULATE_TOTAL_CART')
        // this.$store.dispatch('VERIFY_PRODUCTS')
      }
    },
    deleteItemCart(i) {
      this.$store.commit('DELETEITEMCART', i)
      this.$store.commit('UPDATE_CONTENT_CART')
      // this.$store.dispatch('VERIFY_PRODUCTS')
    },
    // removeCartItems() {
    //   this.remove = false
    //   location.reload(true)
    //   this.$store.commit('DELETE_ALL_ITEMS_CART')
    //   this.$store.commit('UPDATE_CONTENT_CART')
    //   this.$store.dispatch('VERIFY_PRODUCTS')
    // },
    // canChangeQuantity(product) {
    //   this.$store.commit('DELETE_ALL_ITEMS_CART')
    //   this.$store.commit('UPDATE_CONTENT_CART')
    //   this.$store.dispatch('VERIFY_PRODUCTS')
    //   return product.limitQuantity > product.cantidad
    // },
    // updateCartAndVerify() {
    //   this.$store.commit('UPDATE_CONTENT_CART')
    //   this.$store.commit('CALCULATE_TOTAL_CART')
    //   this.$store.dispatch('VERIFY_PRODUCTS')
    // },
    GoPayments() {
      if (this.$store.state.productsCart.length === 0) {
        return
      }
      const productsToPay = this.$store.state.productsCart
        .map((element) => {
          // DATOS IMPORTANTES A ENVIAR = ID - CANTIDAD - COMBINACION
          if (element.id) {
            const { id, cantidad, combinacion } = element
            return { id, cantidad, combinacion }
          }
          return null
        })
        .filter((product) => product !== null)

      if (productsToPay.length === 0) {
        return
      }

      const json = JSON.stringify({
        products: productsToPay,
        tienda: {
          id: this.dataStore.id,
        },
        canal: 'KOMERCIA',
      })
      this.$store.dispatch('SEND_ADD_TO_CART', 2)
      this.$store.commit('DELETE_ALL_ITEMS_CART')
      this.$store.commit('UPDATE_CONTENT_CART')

      if (this.layourUnicentro) {
        window.open(`https://checkout.komercia.co/?params=${json}`)
      } else {
        location.href = `https://checkout.komercia.co/?params=${json}`
      }
    },
    async sendAnalyticsStore(value, event) {
      await this.$store.dispatch('SEND_ANALYTICS_STORE', {
        storeId: this.dataStore.id,
        event: event,
        productId: value,
      })
    },
    async getCities() {
      if (this.rangosByCiudad.envio_metodo === 'precio_ciudad') {
        const { success } = await this.$store.dispatch('GET_CITIES')
        if (success) {
          this.filterCities()
        }
      }
    },
    filterCities() {
      if (
        this.rangosByCiudad.envio_metodo === 'precio_ciudad' &&
        this.cities.length > 0
      ) {
        this.rangosByCiudad.rangos.forEach((rango, index) => {
          this.cities.filter((city) => {
            if (city.id === this.rangosByCiudad.rangos[index].id) {
              this.shippingCities.push(city)
            }
          })
        })
      }
    },
    IsMinValorTotal() {
      if (
        !this.dataStore.tiendasInfo.valorCompraMinimo ||
        this.dataStore.tiendasInfo.valorCompraMinimo === 0
      ) {
        return true
      }

      const totalWithShipping =
        this.totalCart +
        (this.shipping ? this.shipping : 0) +
        (this.shippingTarifaPrecio && this.shippingTarifaPrecio !== 'empty'
          ? this.shippingTarifaPrecio
          : 0) -
        ((this.shippingDescuento &&
        this.shippingDescuento.valor &&
        this.shippingDescuento.tipo === 1
          ? this.shippingDescuento.valor
          : this.shippingDescuento &&
              this.shippingDescuento.valor &&
              this.shippingDescuento.tipo === 0
            ? Math.trunc((this.totalCart * this.shippingDescuento.valor) / 100)
            : 0) +
          (this.shippingDescuento2 && this.shippingDescuento2.precio
            ? this.shippingDescuento2.precio
            : 0))

      return totalWithShipping >= this.dataStore.tiendasInfo.valorCompraMinimo
    },
    productsFreeShippingCart() {
      if (this.productsCart) {
        let result = this.productsCart.filter((rango) => {
          if (rango.envio_gratis === 1) {
            return rango
          }
        })
        if (this.productsCart.length == result.length) {
          this.FreeShippingCart = true
          // this.rangosByCiudad.envio_metodo = 'gratis'
        } else {
          this.FreeShippingCart = false
          // this.rangosByCiudad.envio_metodo = this.rangosByCiudad.envio_metodo
        }
      }
    },
  },
}
</script>

<style scoped>
.content-cart {
  @apply flex w-full flex-col items-center justify-center pb-48;
}
.margintopbytemplate07 {
  @apply pt-100;
}
.margintopbytemplategeneral {
  @apply pt-30;
}
.conten-items-cart {
  @apply flex flex-col items-center justify-center;
}
.cart-tittle {
  @apply mb-15 mt-40 flex w-full flex-row items-center justify-center;
}
.header-icon-cart {
  font-size: 30px;
  margin-right: 5px;
  color: #222;
  bottom: 0.125em;
}
.txt-cart {
  color: #222;
  font-size: 30px;
  font-family: 'Poppins', Helvetica, Arial, sans-serif !important;
  @apply w-full text-left font-semibold;
}
.content-right {
  border-color: #efefef;
  @apply flex w-full flex-col items-center justify-start border p-20;
}
.content-left {
  @apply flex w-full flex-col items-start justify-center;
}
.quantity {
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  position: relative;
  box-sizing: border-box;
  max-width: 240px;
  background: #f4f4f4;
}
.text-quantity {
  font-size: 14px;
  font-weight: bold;
  color: #2c2930;
  margin-right: 15px;
  align-self: center;
}
.quantity_remove {
  border: 1px #f4f4f4;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-style: solid none solid solid;
  background: transparent;
  height: 41px;
  width: 55px;
}
.quantity_value {
  font-size: 1em;
  color: #2c2930;
  border: 1px #f4f4f4;
  padding-left: 10px;
  padding-right: 10px;
  border-style: solid none solid none;
  background: transparent;
  height: 41px;
  width: 55px;
  /* justify-content: center;
  display: flex;
  align-items: center; */
  text-align: center;
}
.quantity_add {
  border: 1px #f4f4f4;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  border-style: solid solid solid none;
  background: transparent;
  height: 41px;
  width: 55px;
}
.container-alerta {
  position: absolute;
  bottom: 4px;
  right: -133px;
  width: 130px;
  background-color: rgb(250, 232, 75);
  border: 1px solid rgb(230, 213, 66);
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: black;
}
.icon-quantity {
  color: #2c2930;
  @apply cursor-pointer;
}
.icon-quantity:hover {
  color: #eb7025;
  @apply cursor-pointer;
}
.alerta {
  text-align: center;
  padding: 5px 5px;
  /* text-transform: capitalize; */
}
.product-variant >>> .el-tag {
  border-color: #2c2930;
  background-color: #2c2930;
  color: #fff;
  display: inline-block;
  height: 28px;
  margin-left: 2px;
  padding: 0 2px;
  font-size: 12px;
  border-width: 1px;
  border-style: solid;
  border-radius: 5px;
  text-align: center;
  box-sizing: border-box;
  white-space: nowrap;
}
.wrapper-tag >>> .el-tag {
  border-color: rgb(223, 62, 62);
  background-color: rgb(223, 62, 62);
  color: #fff;
  display: inline-block;
  height: 28px;
  margin-left: 2px;
  padding: 0 2px;
  font-size: 12px;
  border-width: 1px;
  border-style: solid;
  border-radius: 5px;
  text-align: center;
  box-sizing: border-box;
  white-space: nowrap;
}
.text-name,
.text-variant,
.text-tittle,
.text-result,
.txt-price-product,
.txt-total-product,
.txt-summary,
.txt-cart-summary,
.txt_summary_price,
.txt_summary_tittle {
  color: #222;
  font-family: 'Poppins', Helvetica, Arial, sans-serif !important;
}
.product-photo {
  object-position: center;
  width: 100%;
  /* max-height: 200px; */
  /* max-width: 200px; */
  object-fit: cover;
  border-radius: 6px;
  @apply shadow-md;
}
.content-cart-product {
  @apply w-full flex-col items-center justify-center;
}
.cart-summary-items {
  @apply flex w-full flex-row items-center justify-between;
}
.content-txt-summary {
  @apply mb-30 flex w-full flex-col items-start justify-center;
}
.txt-summary {
  font-size: 20px;
  @apply font-semibold;
}
.order_total {
  @apply flex w-full flex-col items-center justify-start;
}
.order_total_domicile {
  @apply flex w-full flex-col items-start justify-start;
}
/* por-precio */
details {
  color: #333;
  font-size: 13px;
  align-self: flex-end;
  flex: 1;
  width: 100%;
}
details summary {
  outline: none;
  cursor: pointer;
  text-align: right;
  font-size: 14px;
  font-weight: bold;
}
details ol {
  display: flex;
  flex-direction: column;
  padding: 5px 0;
}
details ol li div {
  padding: 2px 4px;
  display: flex;
  justify-content: space-between;
}
details ol li:nth-child(even) {
  background-color: rgba(102, 102, 102, 0.1);
}
details[open] summary ~ * {
  animation: sweep 0.5s ease-in-out;
}
.scroll_cart_summary_items_cities {
  color: #2c2930;
  overflow-y: auto;
  max-height: 150px;
  display: flex;
  flex-direction: column;
  width: 100%;
}
.scroll_cart_summary_items_cities li {
  margin-right: 5px;
}
.scroll_cart_summary_items_cities::-webkit-scrollbar {
  background: transparent;
  width: 4px;
}
.scroll_cart_summary_items_cities::-webkit-scrollbar-track {
  box-shadow: inset 0 0 10px transparent;
  border-radius: 10px;
}
.scroll_cart_summary_items_cities::-webkit-scrollbar-thumb {
  background: black;
  border-radius: 10px;
}
/* Tarifa-Plana */
.content-Plana {
  @apply mb-20 flex w-full flex-row items-center justify-between;
}
.content-list {
  @apply flex flex-row items-end justify-between;
}
/* free-delivery */
.contet-free-delivery {
  @apply mb-20 flex w-full flex-row items-center justify-between;
}
/* btns */
.content-totalPay {
  @apply my-20 flex w-full flex-row items-center justify-between;
}
.txt-total {
  @apply font-semibold;
}
.content-btn {
  @apply flex w-full flex-col items-center justify-center;
}
.txt_summary_tittle {
  @apply flex w-full items-center justify-start;
}
.txt_summary_price {
  @apply flex w-auto items-end justify-end font-semibold;
}
.line {
  border-color: #666;
  @apply my-3 w-full border-t;
}
.icon-trash:hover {
  fill: #eb7025;
  @apply cursor-pointer;
}
.contenedor-vacio {
  display: flex;
  width: 100%;
  height: 100%;
  height: calc(100vh - 416px);
  max-width: 1300px;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  justify-content: center;
}
.wrapper_photo {
  position: relative;
  max-width: 600px;
  max-height: 600px;
}
.photo {
  /* width: 120px; */
  height: 120px;
  object-fit: cover;
  object-position: center;
  border-radius: 10px;
}
.btn3 {
  border-radius: 5px;
  color: black;
  border: solid 2px black;
  background-color: transparent;
  padding: 8px 12px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;
  transition: all 200ms ease-in;
}
.btn3:hover {
  color: grey;
  border: solid 2px grey;
}
.Quotation-message {
  color: #222;
  padding: 8px 12px;
  width: 100%;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;
  text-align: center;
}
.text-empty {
  color: #222;
  margin-top: 15px;
  font-weight: 700;
  font-size: 18px;
}
.text-empty2 {
  color: #222;
  margin-bottom: 15px;
  font-weight: 400;
  font-size: 16px;
  max-width: 400px;
  text-align: center;
}
@screen sm {
  .conten-items-cart {
    @apply w-9/0;
  }
  .content-product-total {
    @apply flex w-full flex-col items-center justify-center;
  }
  .content-product-bag {
    @apply flex w-full flex-col items-center justify-center;
  }
  .content-items-product {
    @apply py-20;
  }
  .product {
    border-color: #efefef;
    @apply mb-20 grid w-full grid-cols-2 items-start justify-center border;
  }
  .product-items {
    @apply grid w-full grid-cols-1 items-start justify-center gap-4;
  }
  .product-quiantity {
    @apply flex w-full flex-col items-start justify-center;
  }
  .product-name {
    @apply flex w-full flex-row items-center justify-between pr-10;
  }
  .content-box-items {
    @apply mt-10 flex w-full flex-row items-center justify-start;
  }
  .producto-price-total {
    @apply mt-30 flex w-full flex-col items-start justify-center;
  }
  .text-name {
    font-size: 16px;
    @apply font-semibold;
  }
  .txt-total-product {
    font-size: 16px;
  }
  .txt-price-product,
  .text-result {
    font-size: 16px;
    @apply font-semibold;
  }
  .content-product-priceIcon,
  .content_icon-md {
    @apply hidden;
  }
  .btn-buy-1 {
    background-color: #222;
    border-color: #222;
    color: #fff;
    @apply mb-10 mt-30 flex h-40 w-full items-center justify-center rounded-md border-2 font-semibold;
  }
  .btn-buy-1:hover {
    background-color: #eb7025;
    border-color: #eb7025;
  }
  .btn-buy-2 {
    border-color: #222;
    color: #222;
    @apply flex h-40 w-full items-center justify-center rounded-md border-2 font-semibold;
  }
  .btn-buy-2:hover {
    border-color: #eb7025;
    color: #eb7025;
  }
}
@screen md {
  .product {
    @apply grid grid-cols-3;
  }
  .content-items-product {
    @apply p-25;
  }
  .producto-price-total {
    @apply hidden;
  }
  .content-product-priceIcon {
    @apply flex w-full flex-row items-center justify-between p-25;
  }
  .content_icon-sm {
    @apply hidden;
  }
  .content_icon-md {
    @apply flex w-auto;
  }
  .text-name {
    font-size: 20px;
    @apply font-semibold;
  }
  .txt-price-product {
    font-size: 20px;
    @apply font-semibold;
  }
}
@screen lg {
  .content-left {
    @apply mr-40;
  }
  .content-right {
    top: 160px;
    @apply sticky mb-40 w-6/0;
  }
  .content-product-total {
    @apply flex w-full flex-row items-start justify-center;
  }
}
@screen mlg {
  .content-right {
    top: 120px;
    @apply w-5/0;
  }
}
@media (min-width: 1400px) {
  .conten-items-cart {
    max-width: 1400px;
    @apply w-full;
  }
}
@media (max-width: 500px) {
  .product {
    @apply grid grid-cols-1;
  }
  .content-items-product-resposive-img {
    justify-content: center;
    align-items: center;
    display: flex;
  }
  .margin-items-product {
    margin-left: 20px;
  }
}
</style>
