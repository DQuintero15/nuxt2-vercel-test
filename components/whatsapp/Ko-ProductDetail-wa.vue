<template>
  <div class="flex h-full w-full items-start justify-center overflow-y-auto">
    <div
      v-if="loading"
      class="flex w-full max-w-[900px] flex-col items-center justify-start bg-white-white px-10 pb-20 pt-25 shadow-md md:px-30 md:pb-30 md:pt-50"
    >
      <Skeleton />
    </div>
    <div
      v-else
      class="relative flex h-full min-h-screen w-full max-w-[900px] flex-col items-center justify-start bg-white-white px-10 pb-40 pt-30 shadow-md md:px-30 md:pb-10"
    >
      <nuxt-link
        :to="stateWapiME ? `/wa/${dataStore.id}/` : `/`"
        class="flex w-full flex-row items-center justify-start p-10"
        :style="`color: ${
          settingByTemplate && settingByTemplate.color_primario
            ? settingByTemplate.color_primario
            : '#25D366'
        };`"
      >
        <arrow-left-icon class="icon-back" />
        <p>{{ $t('productdetail_Back') }}</p>
      </nuxt-link>
      <div class="section">
        <div class="wrapper-left">
          <div class="photos_responsive">
            <productSlide
              :photos="data.productosFotos"
              :photo="data.fotoCloudinary"
              :id-you-tube="idYoutube"
            />
          </div>
        </div>
        <div class="wrapper-right">
          <div class="content-right">
            <div class="flex">
              <p
                v-if="salesData.unidades > 0 && dataStore.id != 18265"
                class="card-info-2"
              >
                {{ $t('productdetail_stock') }}
              </p>
              <p
                v-if="salesData.unidades > 0 && dataStore.id == 18265"
                class="card-info-2"
              >
                {{ $t('productdetail_flavorstock') }}
              </p>

              <p
                v-if="spent && salesData.unidades == 0 && dataStore.id != 18265"
                class="card-info-1"
              >
                {{ $t('productdetail_productoAgotado') }}
                "😥"
              </p>
              <p
                v-if="spent && salesData.unidades == 0 && dataStore.id == 18265"
                class="card-info-1"
              >
                {{ $t('productdetail_productoAgotadoTasty') }}😥
              </p>
            </div>

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
                        (1 - data.productosInfo.promocionValor / 100)
                    )
                  : 0)
                  | currency(
                    dataStore.tiendasInfo.paises.codigo,
                    dataStore.tiendasInfo.moneda
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
                      dataStore.tiendasInfo.moneda
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

            <div class="flex">
              <p v-if="data.envioGratis == 1" class="card-info-2">
                {{ $t('home_cardGratis') }}
              </p>
            </div>

            <div
              v-if="data.conVariante === 1 && variantes"
              class="container-variants"
              :style="{
                '--border': '#8d8d8d',
              }"
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
            <div
              v-if="data.productosInfo.condicion"
              class="my-8 flex w-full flex-row items-center"
            >
              <p class="text-marca mr-10 font-bold">
                {{ $t('productdetail_condicion') }}:
              </p>
              <p class="text-marca">
                {{
                  data.productosInfo.condicion == 1
                    ? $t('productdetail_condicionNuevo')
                    : $t('productdetail_condicionUsado')
                }}
              </p>
            </div>
            <div
              v-if="data.categoriaProducto > 0"
              class="my-8 flex w-full flex-row items-center"
            >
              <p class="text-marca mr-10 font-bold">
                {{ $t('productdetail_categoria') }}:
              </p>
              <p class="text-marca">
                {{ data.categoriaProducto2.nombreCategoriaProducto }}
              </p>
            </div>
            <div
              v-if="data.subcategoria > 0"
              class="my-8 flex w-full flex-row items-center"
            >
              <p class="text-marca mr-10 font-bold">
                {{ $t('home_subcategory') }}:
              </p>
              <p class="text-marca">
                {{ data.subcategoria2.nombreSubcategoria }}
              </p>
            </div>
            <div
              v-if="data.productosInfo.garantia"
              class="my-8 flex w-full flex-row items-center"
            >
              <p class="text-marca mr-10 font-bold">
                {{ $t('productdetail_garantia') }}:
              </p>
              <p class="text-marca">
                {{ data.productosInfo.garantia }}
              </p>
            </div>
            <div
              v-if="data.productosInfo.descripcionCorta"
              class="my-8 flex w-full flex-col items-start"
            >
              <p class="text-marca font-bold">
                {{ $t('productdetail_informacion') }}:
              </p>
              <p class="text-marca">
                {{ data.productosInfo.descripcionCorta }}
              </p>
            </div>
            <p
              v-if="
                (data.productosInfo.largo != 0 &&
                  data.productosInfo.largo != null) ||
                (data.productosInfo.largo != 0 &&
                  data.productosInfo.largo != null) ||
                (data.productosInfo.alto != 0 &&
                  data.productosInfo.alto != null) ||
                (data.productosInfo.peso > 0 && data.productosInfo.peso != null)
              "
              class="text-marca font-bold"
            >
              <strong>{{ $t('productdetail_dimensiones') }}</strong>
            </p>
            <div class="grid w-full grid-cols-1 gap-x-2 gap-y-0 sm:grid-cols-2">
              <div
                v-if="
                  data.productosInfo.largo != 0 &&
                  data.productosInfo.largo != null
                "
                class="my-8 flex w-full flex-row items-center"
              >
                <p class="text-marca mr-10 font-bold">
                  {{ $t('productdetail_largo') }}:
                </p>
                <p class="text-marca">{{ data.productosInfo.largo }} cm</p>
              </div>
              <div
                v-if="
                  data.productosInfo.ancho != 0 &&
                  data.productosInfo.ancho != null
                "
                class="my-8 flex w-full flex-row items-center"
              >
                <p class="text-marca mr-10 font-bold">
                  {{ $t('productdetail_ancho') }}:
                </p>
                <p class="text-marca">{{ data.productosInfo.ancho }} cm</p>
              </div>
              <div
                v-if="
                  data.productosInfo.alto != 0 &&
                  data.productosInfo.alto != null
                "
                class="my-8 flex w-full flex-row items-center"
              >
                <p class="text-marca mr-10 font-bold">
                  {{ $t('productdetail_alto') }}:
                </p>
                <p class="text-marca">{{ data.productosInfo.alto }} cm</p>
              </div>
              <div
                v-if="
                  data.productosInfo.peso > 0 && data.productosInfo.peso != null
                "
                class="my-8 flex w-full flex-row items-center"
              >
                <p class="text-marca mr-10 font-bold">
                  {{ $t('productdetail_Peso') }}:
                </p>
                <p class="text-marca">{{ data.productosInfo.peso }} Kg</p>
              </div>
            </div>

            <div
              v-if="userDropshipping.userName"
              class="my-8 flex w-full flex-row items-center"
            >
              <p class="text-marca" style="margin-right: 10px">
                <strong>{{ $t('productdetail_dropshipping') }}</strong>
              </p>
              <p class="text-marca">
                {{ userDropshipping.userName }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="contentDescription"
        class="mt-20 flex w-full flex-col px-15 md:px-0"
      >
        <h3 class="text-marca mb-5 font-bold">
          {{ $t('productdetail_description') }}
        </h3>
        <div class="editor my-10 text-14 text-[#0f2930]">
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
      </div>
      <div v-if="filterSuggestedProducts?.length > 0" class="w-full py-40">
        <KoSuggestProduct
          :suggested-products="filterSuggestedProducts"
          :setting-by-template="settingByTemplate"
          :data-store="dataStore"
        />
      </div>
      <div class="responsive-purchase">
        <div class="ko-input">
          <div v-if="!spent && salesData.estado" class="quantity-resposive">
            <button class="quantity_remove" @click="removeQuantity">
              <menos-icon class="icon" />
            </button>
            <input
              id="InputQuantityValue"
              v-model="quantityValue"
              name="quantityValue"
              class="quantity_value"
              type="text"
              placeholder=""
              onkeypress="return (event.charCode>47 && event.charCode<58)"
            />
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
            v-if="data.productosInfo.dealerWhatsapp === '1'"
            class="btn-responsive flex items-center justify-center"
            :style="`background: ${
              settingByTemplate?.color_primario
                ? settingByTemplate.color_primario
                : '#25D366'
            }; color:${
              settingByTemplate?.color_secundario
                ? settingByTemplate.color_secundario
                : '#FFFFFF'
            };`"
            @click="addShoppingCartWhatsApp"
          >
            <span>
              <whatsapp-icon class="wp-icon2" />
              {{
                dataStore.id === 400
                  ? $t('productdetail_btnAgendar')
                  : $t('productdetail_btnComprar')
              }}
            </span>
          </button>
          <button
            v-else-if="
              !spent &&
              salesData.precio > 0 &&
              salesData.estado &&
              (data.productosInfo.dealerWhatsapp === '0' ||
                data.productosInfo.dealerWhatsapp === null ||
                data.productosInfo.dealerWhatsapp === '')
            "
            class="btn-responsive"
            :style="`background: ${
              settingByTemplate?.color_primario
                ? settingByTemplate.color_primario
                : '#25D366'
            }; color:${
              settingByTemplate?.color_secundario
                ? settingByTemplate.color_secundario
                : '#FFFFFF'
            };`"
            @click="addShoppingCart"
          >
            <span>
              {{
                dataStore.id === 400
                  ? $t('productdetail_btnAgendar')
                  : $t('productdetail_btnComprar')
              }}
            </span>
          </button>
          <button
            v-else-if="
              salesData.precio == 0 &&
              !spent &&
              (data.productosInfo.dealerWhatsapp === '0' ||
                data.productosInfo.dealerWhatsapp === null ||
                data.productosInfo.dealerWhatsapp === '')
            "
            class="btn-responsive"
            :style="`background: ${
              settingByTemplate?.color_primario
                ? settingByTemplate.color_primario
                : '#25D366'
            }; color:${
              settingByTemplate?.color_secundario
                ? settingByTemplate.color_secundario
                : '#FFFFFF'
            };`"
            @click="WPQuotation()"
          >
            <span>
              {{ $t('productdetail_cotizar') }}
            </span>
          </button>
          <button
            v-else-if="
              !salesData.estado &&
              (data.productosInfo.dealerWhatsapp === '0' ||
                data.productosInfo.dealerWhatsapp === null ||
                data.productosInfo.dealerWhatsapp === '')
            "
            disabled
            class="btn-responsive"
            :style="`background: ${
              settingByTemplate?.color_primario
                ? settingByTemplate.color_primario
                : '#25D366'
            }; color:${
              settingByTemplate?.color_secundario
                ? settingByTemplate.color_secundario
                : '#FFFFFF'
            };`"
          >
            <span>
              {{ $t('productdetail_btnANodisponible') }}
            </span>
          </button>
          <div
            v-else-if="
              spent &&
              (data.productosInfo.dealerWhatsapp === '0' ||
                data.productosInfo.dealerWhatsapp === null ||
                data.productosInfo.dealerWhatsapp === '') &&
              dataStore.id != 18265
            "
            class="wrapper-btn"
          >
            <p class="card-info-1-res">
              😥 {{ $t('productdetail_productoAgotado') }}
            </p>
          </div>
          <div
            v-else-if="
              spent &&
              (data.productosInfo.dealerWhatsapp === '0' ||
                data.productosInfo.dealerWhatsapp === null ||
                data.productosInfo.dealerWhatsapp === '') &&
              dataStore.id == 18265
            "
            class="wrapper-btn"
          >
            <p class="card-info-1-res">
              😥 {{ $t('productdetail_productoAgotadoTasty') }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <KoOrderWa
      :data-store="dataStore"
      :state-order-wapi="true"
      :quick-sale="quickSale"
    />
  </div>
</template>

<script>
import axios from 'axios'
import { mapState, Store } from 'vuex'
import currency from '@/mixins/formatCurrent'
import mobileCheck from '@/mixins/mobileCheck'
import extensions from '@/mixins/elemenTiptap.vue'
import { productHeadMixin } from '@/mixins/productHeadMixin'
export default {
  name: 'KoProductDetailWa',
  components: {
    PluginAddi: () => import('@/components/_commonComponent/addi.vue'),
    Skeleton: () => import('../_commonComponent/skeleton-detail.vue'),
    selectGroup: () => import('../_commonComponent/select-group.vue'),
    // productSlide: () => import('../_commonComponent/product-slide.vue'),
    productSlide: () => import('../_commonComponent/zoom.vue'),

    KoOrderWa: () => import('../headers/_order1/order1.vue'),
    KoSuggestProduct: () =>
      import('../_commonComponent/suggestions-producto.vue'),
  },
  filters: {
    toLowerCase(value) {
      if (value) {
        return value.toLowerCase()
      }
      return ''
    },
  },
  mixins: [currency, extensions, mobileCheck, productHeadMixin],
  data() {
    return {
      id: this.$route.params.slugProduct,
      contentDescription: '',
      loading: true,
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
      suggestedProducts: [],
      envio: {
        titulo: '',
        desc: '',
      },
      quickSale: {
        state: false,
        dataSeller: {
          name: '',
          phone: '',
        },
      },
      activeZoom: true,
      userDropshipping: {
        userId: '',
        userName: '',
      },
      sharing: {
        url: '',
        quote: '',
      },
    }
  },
  head() {
    return this.generateHead()
  },
  computed: {
    ...mapState(['dataStore', 'stateWapiME', 'beforeCombination', 'envios']),
    FacebookPixel() {
      return this.$store.state.analytics_tagmanager
    },
    settingByTemplate() {
      return (
        this.$store.state.settingByTemplate ||
        this.$store.state.settingBaseWapir
      )
    },
    rangosByCiudad() {
      return this.envios
    },
    shippingPrecio() {
      if (
        this.rangosByCiudad?.envio_metodo === 'precio' &&
        this.salesData.precio
      ) {
        const tempTotal = this.salesData.precio * this.quantityValue
        const result = this.rangosByCiudad.rangos.find(
          (rango) => tempTotal >= rango.inicial && tempTotal <= rango.final
        )

        return result ? result.precio : 0
      }

      return 0
    },
    // eslint-disable-next-line vue/return-in-computed-property
    variantes() {
      if (this.data.conVariante === 1) {
        return JSON.parse(this.data.productosVariantes[0].variantes)
      }
    },
    filterSuggestedProducts() {
      return this.suggestedProducts.filter(
        (product) => product.id !== this.data.id
      )
    },
  },
  watch: {
    envios() {
      this.setOptionShipping()
    },
    quantityValue(value) {
      this.quantityValue = parseInt(value)
      if (value > this.maxQuantityValue) {
        this.quantityValue = this.maxQuantityValue
      } else if (value <= 0 || value === '') {
        this.quantityValue = 1
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
            this.data.combinaciones[0][0].combinaciones
          )
          const result = combinaciones.find(
            (combinacion) =>
              JSON.stringify(combinacion.combinacion) == combinationSelected
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

    const { userId, userName } = this.$route.query

    if (userId && userName) {
      this.userDropshipping.userId = userId
      this.userDropshipping.userName = userName
    }
  },
  methods: {
    async getDataProduct() {
      const { success, data } = await this.$store.dispatch(
        'products/GET_DATA_PRODUCT',
        {
          slug: this.id,
        }
      )
      if (success && data.data) {
        this.loading = false
        this.data = data.data
        this.getDescriptionProduct(data.data.slug)
        this.sendAnalyticsStore(data.data.id, 'VIEWED_PRODUCT')
        this.videoYouTube(data.data.productosInfo.video)
        this.setOptionShipping()
        this.getSuggestedProducts()

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
        this.sharing.url = window.location.href
        this.sharing.quote = `Explora%20el%20producto%20${data.data.nombre}%2C%20te%20van%20a%20encantar.%0ALink%20del%20producto%3A%20${this.sharing.url}`
        this.sharingFacebook = `https://www.facebook.com/sharer/sharer.php?u=${this.sharing.url}&quote=${this.sharing.quote}`
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
        }
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
    videoYouTube(url) {
      let myregexp =
        /(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=|\/sandalsResorts#\w\/\w\/.*\/))([^\/&]{10,12})/
      let id = ''
      if (url && url !== '' && url !== 'null') {
        this.validVideo = true
        id = url.match(myregexp)
        if (id) {
          this.idYoutube = id[1]
        }
      }
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
      }
    },
    removeQuantity() {
      if (this.data.cantidad >= 2) {
        this.quantityValue--
        this.data.cantidad = this.quantityValue
      }
    },
    addShoppingCart() {
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
          mutableProduct
        )
      } else {
        this.$store.state.productsCart.push(product)
      }
      this.$store.commit('UPDATE_CONTENT_CART')
      if (this.dataStore.id != 7454) {
        if (this.stateWapiME) {
          this.$router.push(`/wa/${this.dataStore.id}`)
        } else {
          this.$router.push(`/`)
        }
      }

      // this.$store.commit('SET_OPEN_ORDER', true) = true
      // this.$store.state.orderComponent = true
      this.$store.dispatch('SEND_ADD_TO_CART', 1)
      this.$store.commit('SET_OPEN_ORDER', true)
    },
    redirectWP() {
      const baseUrl = this.mobileCheck()
        ? 'https://api.whatsapp.com/send?phone='
        : 'https://web.whatsapp.com/send?phone='
      const phonePrefix =
        this.dataStore.tienda.whatsapp.charAt(0) === '+'
          ? this.dataStore.tienda.whatsapp.slice(1)
          : `57${this.dataStore.tienda.whatsapp}`
      const urlProduct = window.location.href
      const text = `Hola 😀, %0AEstoy en tu tienda ${this.dataStore.nombre} y me interesa el producto: ${this.data.nombre}%0A%0ALink de compra: ${urlProduct}%0A`

      const whatsAppUrl = `${baseUrl}${phonePrefix}&text=${text}`
      window.open(whatsAppUrl, '_blank')
    },
    removeItemsCart() {
      this.$store.commit('DELETE_ALL_ITEMS_CART')
      this.$store.commit('UPDATE_CONTENT_CART')
      this.$store.commit('SET_OPEN_ORDER', false)
      this.$store.commit('SET_STATE_FORM_MODAL_WHATS_APP', false)
      return true
    },
    addShoppingCartWhatsApp() {
      if (this.removeItemsCart()) {
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
            mutableProduct
          )
        } else {
          this.$store.state.productsCart.push(product)
        }
        this.quickSale.state = true
        this.quickSale.dataSeller.name = this.salesData.combinacion[0]
        this.quickSale.dataSeller.phone = this.salesData.sku
        this.$store.commit('UPDATE_CONTENT_CART')
        this.$store.dispatch('SEND_ADD_TO_CART', 1)
        this.$store.commit('SET_OPEN_ORDER', true)
        this.$store.commit('SET_STATE_FORM_MODAL_WHATS_APP', true)
      }
    },
    async setOrderWa() {
      let resultShipping
      if (this.rangosByCiudad && this.rangosByCiudad.envio_metodo == 'gratis') {
        resultShipping = 0
      } else if (
        this.rangosByCiudad &&
        this.rangosByCiudad.envio_metodo == 'tarifa_plana'
      ) {
        resultShipping = this.rangosByCiudad.valor
      } else if (
        this.rangosByCiudad &&
        this.rangosByCiudad.envio_metodo == 'precio_ciudad'
      ) {
        resultShipping = 0
      } else if (
        this.rangosByCiudad &&
        this.rangosByCiudad.envio_metodo == 'precio'
      ) {
        resultShipping = this.shippingPrecio
      } else if (
        this.rangosByCiudad &&
        this.rangosByCiudad.envio_metodo == 'sintarifa'
      ) {
        resultShipping = 0
      } else {
        resultShipping = 0
      }
      let tempTotal =
        this.salesData.precio * this.quantityValue + resultShipping
      const params = {
        canal: 1,
        comentario: `Compra realizada al vendedor ${this.sellers.name} con telefono (${this.sellers.prefix})${this.sellers.phone}`,
        costo_envio: resultShipping,
        descuento: 0,
        direccion_entrega: {
          type: 0,
          value: null,
        },
        metodo_pago: 7,
        productos: [
          {
            cantidad: this.quantityValue,
            envio_gratis: this.data.envioGratis,
            foto_cloudinary: this.data.fotoCloudinary,
            id: this.data.id,
            limitQuantity: this.salesData.unidades,
            nombre: this.data.nombre,
            precio: this.salesData.precio,
          },
        ],
        tienda: this.dataStore.id,
        tipo: 0,
        total: tempTotal,
        usuario: 30866,
      }

      try {
        const { data } = await axios({
          method: 'POST',
          url: `${this.$store.state.urlAWSsettings}/api/v1/orders`,
          // url: `${this.$store.state.urlKomercia}/api/usuario/orden`,
          data: params,
        })
        if (data) {
          this.numberOrder = data.id
          await this.$store.dispatch('SEND_NOTIFICATION_ORDER', {
            orderId: data.id,
            storeId: data.tienda,
            amount: data.total,
            paymentMethod: '7',
          })

          const idArray = this.productsCart.map((item) => item.id)
          this.$store.dispatch('SEND_ANALYTICS_PRODUCTO_PAY', {
            storeId: data.tienda,
            ids: idArray,
          })
        }
      } catch (err) {
        this.$message({
          message: 'Error al enviar los datos!',
          type: 'error',
        })
      }
    },
    WPQuotation() {
      let baseUrlMovil = 'https://api.whatsapp.com/send?phone='
      let baseUrlPc = 'https://web.whatsapp.com/send?phone='
      let urlProduct = window.location.href
      let text = `Hola%20%F0%9F%98%80%2C%0AEstoy%20en%20tu%20tienda%20%2A${this.dataStore.nombre}%2A%20y%20quiero%20cotizar%20este%20producto%3A%0A%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%0A%2A${this.data.nombre}%2A%0A%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%0ALink%3A%20${urlProduct}`

      if (this.dataStore.tiendasInfo.telefono.charAt(0) == '+') {
        let phone_number_whatsapp = this.dataStore.tiendasInfo.telefono.slice(1)
        if (this.mobileCheck()) {
          window.open(
            `${baseUrlMovil}${phone_number_whatsapp}&text=${text}`,
            '_blank'
          )
        } else {
          window.open(
            `${baseUrlPc}${phone_number_whatsapp}&text=${text}`,
            '_blank'
          )
        }
      } else {
        if (this.mobileCheck()) {
          window.open(
            `${baseUrlMovil}57${this.dataStore.tiendasInfo.telefono}&text=${text}`,
            '_blank'
          )
        } else {
          window.open(
            `${baseUrlPc}57${this.dataStore.tiendasInfo.telefono}&text=${text}`,
            '_blank'
          )
        }
      }
    },
    async getSuggestedProducts() {
      const { success, data } = await this.$store.dispatch(
        'products/GET_ALL_PRODUCTS',
        {
          id_tienda: this.dataStore.id,
          page: 1,
          limit: 12,
          category: this.data.categoriaProducto2.nombreCategoriaProducto,
          // subcategory: this.data.subcategoria,
        }
      )
      if (success) {
        this.suggestedProducts = data.publicProductList
      }
    },
  },
  jsonld() {
    return {
      '@context': 'https://schema.org',
      '@type': 'Product',
      productID: this.data?.id || '',
      name: (this.data?.nombre || '').slice(0, 149),
      description: (
        this.data?.productosInfo?.descripcionCorta ||
        `Producto de la tienda ${this.dataStore.nombre}`
      ).slice(0, 9998),
      url: this.sharing?.url || '',
      image: this.data?.fotoCloudinary || '',
      brand: this.data?.productosInfo?.marca || '',
      sku: this.salesData?.unidades || '',
      offers: [
        {
          '@type': 'Offer',
          price: this.salesData?.precio || '',
          priceCurrency: this.dataStore.tiendasInfo?.moneda || '',
          itemCondition: 'https://schema.org/NewCondition',
          availability:
            this.salesData?.unidades > 0
              ? 'https://schema.org/InStock'
              : 'https://schema.org/OutOfStock',
        },
      ],
      additionalProperty: [
        {
          '@type': 'PropertyValue',
          propertyID: 'item_group_id',
          value:
            this.categoriaProducto > 0
              ? `FB${this.data.categoriaProducto}_${this.data.categoriaProducto2.nombreCategoriaProducto}`
              : '',
          status: 'active',
        },
      ],
    }
  },
}
</script>

<style scoped>
.wrapper-item-skeleton {
  max-width: 900px;
  min-height: calc(100vh - 205px);
  padding: 30px 30px 10px;
  background-color: #fafaf8;
  @apply relative flex w-full flex-row items-start justify-between;
}
.section {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.wrapper-left {
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-right: 15px;
  padding-bottom: 10px;
  position: relative;
}
.icon-back {
  font-weight: normal;
  font-size: 18px;
  bottom: 3px;
  cursor: pointer;
  margin-right: 5px;
}
.photos_responsive {
  width: 100%;
  max-height: 375px;
  display: flex;
  box-sizing: border-box;
  overflow: hidden;
  margin-top: 5px;
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
  font-size: 16px;
  line-height: 20px;
  color: #535353;
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
  margin-top: 5px;
}
.wrapper-price {
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: flex-start;
}
.wrapper-price > p:nth-child(2) {
  margin-left: 5px;
}
.text-precio {
  font-size: 20px;
  font-weight: 700;
  color: #0f2930;
}
.card-descuento {
  font-size: 12px;
  color: white;
  background: #35dd8d;
  border-radius: 3px;
  padding: 0px 5px;
  margin-top: 3px;
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
  margin-top: 15px;
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
  margin-top: 15px;
}
.responsive-purchase {
  position: fixed;
  bottom: 0px;
  width: 100%;
  max-width: 900px;
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: center;
}
.ko-input {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 12px 10px;
  position: relative;
  background-color: #fafaf8;
  box-shadow:
    0px 2px 2px rgba(52, 58, 67, 0.1),
    0px 2px 5px rgba(52, 58, 67, 0.08),
    0px 5px 15px rgba(52, 58, 67, 0.08);
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
  width: 50px;
  /* justify-content: center;
  display: flex;
  align-items: center; */
  text-align: center;
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
.wp-icon2 {
  font-size: 20px !important;
  margin-right: 4px;
  margin-bottom: -2px;
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
  font-family: 'Poppins', sans-serif !important;
}
.editor >>> .el-tiptap-editor__content h2 {
  font-size: 1.5em;
  font-family: 'Poppins', sans-serif !important;
}
.editor >>> .el-tiptap-editor__content h3 {
  font-size: 1.17em;
  font-family: 'Poppins', sans-serif !important;
}
.editor >>> .el-tiptap-editor__content h4 {
  font-size: 1.12em;
  font-family: 'Poppins', sans-serif !important;
}
.editor >>> .el-tiptap-editor__content h5 {
  font-size: 0.83em;
  font-family: 'Poppins', sans-serif !important;
}
.editor >>> .el-tiptap-editor__content p {
  font-family: 'Poppins', sans-serif !important;
}
.editor >>> .el-tiptap-editor__content span {
  font-family: 'Poppins', sans-serif !important;
}
.editor >>> .el-tiptap-editor__content blockquote {
  font-family: 'Poppins', sans-serif !important;
}
.editor >>> .el-tiptap-editor__content code {
  font-family: 'Poppins', sans-serif !important;
}
.editor >>> .el-tiptap-editor__content ul {
  font-family: 'Poppins', sans-serif !important;
}
.editor >>> .el-tiptap-editor__content ol {
  font-family: 'Poppins', sans-serif !important;
}
.editor >>> .el-tiptap-editor__content li {
  font-family: 'Poppins', sans-serif !important;
}
.editor >>> .el-tiptap-editor__content pre {
  font-family: 'Poppins', sans-serif !important;
}
.editor >>> .el-tiptap-editor__content strong {
  font-family: 'Poppins', sans-serif !important;
}
.editor >>> .el-tiptap-editor__content em {
  font-family: 'Poppins', sans-serif !important;
}
.editor >>> .el-tiptap-editor__content s {
  font-family: 'Poppins', sans-serif !important;
}
.editor >>> .el-tiptap-editor__content .image-view__body__image {
  cursor: none;
  pointer-events: none;
}
.editor >>> .el-popper.el-tiptap-image-popper {
  display: none;
}
@media (max-width: 685px) {
  .section {
    flex-direction: column;
    justify-content: center;
  }
  .wrapper-left {
    justify-content: center;
    padding-bottom: 0px;
    margin-right: 0px;
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
}
@media (max-width: 500px) {
  .photos_responsive {
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 0 15px;
  }
  .wrapper-item-skeleton {
    @apply relative flex w-full flex-col items-start justify-between;
  }
}
</style>
