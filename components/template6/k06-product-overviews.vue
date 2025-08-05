<template>
  <div
    v-if="data && !loading"
    class="mb-40"
    :style="{
      backgroundColor: productOverviews?.bg_color || 'white',
    }"
  >
    <div class="pb-16 pt-6 sm:pb-24">
      <div class="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div class="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
          <div class="lg:col-span-5 lg:col-start-8">
            <div class="flex flex-col justify-start">
              <p
                v-if="data?.productosInfo?.marca"
                class="text-15 font-medium leading-6"
                :style="{
                  color:
                    productOverviews?.color_subText || 'hsla(240, 2%, 54%, 1)',
                }"
              >
                {{ data.productosInfo.marca }}
              </p>
              <h1
                v-if="data?.nombre"
                class="text-25"
                :style="{
                  color:
                    productOverviews?.color_title ||
                    'hsla(220.9090909090909, 39%, 11%, 1)',
                  fontWeight: productOverviews?.fontWeighTitle || '600',
                }"
              >
                {{ data.nombre }}
              </h1>
              <div
                class="mb-20 flex w-full flex-row items-center justify-start"
              >
                <p
                  v-if="salesData?.precio"
                  class="text-30 font-semibold"
                  :style="{
                    color:
                      productOverviews?.color_price ||
                      'hsla(21.95744680851064, 98%, 53%, 1)',
                    fontWeight: productOverviews?.fontWeighPrice || '600',
                  }"
                >
                  {{
                    salesData.precio
                      | currency(
                        dataStore.tiendasInfo.paises.codigo,
                        dataStore.tiendasInfo.moneda,
                      )
                  }}
                </p>
                <div
                  v-if="
                    data.productosInfo?.tagPromocion == 1 &&
                    data.productosInfo?.promocionValor &&
                    salesData?.precio
                  "
                  class="flex w-full flex-row items-center justify-start"
                >
                  <p
                    class="mx-5 rounded-4 bg-red-500 px-3 py-5 text-14 text-white-white"
                  >
                    {{ data.productosInfo.promocionValor }}% De Descuento
                  </p>
                  <p
                    class="text-25 font-semibold line-through"
                    :style="{
                      color:
                        productOverviews?.color_priceDescount ||
                        'hsla(21.95744680851064, 98%, 53%, 1)',
                      fontWeight:
                        productOverviews?.fontWeighPriceDescount || '500',
                    }"
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
                </div>
              </div>
            </div>
          </div>

          <div
            class="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0"
          >
            <div
              class="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8"
            >
              <img
                :src="data.fotoCloudinary"
                :alt="`imagenDetailTemplate6${data.nombre}`"
                class="rounded-lg lg:col-span-2 lg:row-span-2"
              />
              <img
                v-for="(image, indexPhoto) in data.productosFotos"
                :key="indexPhoto"
                :src="image.fotoCloudinary"
                :alt="`imagenDetailTemplate6${indexPhoto}`"
                class="hidden lg:block"
              />
            </div>
          </div>

          <div class="mt-8 lg:col-span-5">
            <div
              class="mb-10 flex flex-wrap items-center justify-start gap-x-2 gap-y-1"
            >
              <p
                v-if="
                  salesData?.estado &&
                  salesData?.unidades > 0 &&
                  salesData?.precio > 0
                "
                class="text-14 font-bold text-green-500"
              >
                {{ $t('productdetail_stock') }}
              </p>

              <p v-else class="text-14 font-bold text-red-500">
                {{ $t('productdetail_Notstock') }}
              </p>

              <p
                v-if="spent && salesData.unidades == 0"
                class="ml-5 text-14 font-bold text-red-500"
              >
                {{ $t('productdetail_productoAgotado') }}
              </p>

              <p
                v-if="data?.envioGratis == 1 || envio?.titulo == 'Envío gratis'"
                class="text-14 font-bold text-green-500"
              >
                {{ $t('home_cardGratis') }}
              </p>
            </div>
            <div
              v-if="data?.productosInfo?.descripcionCorta"
              class="mb-10 w-full"
            >
              <p
                class="text-15"
                :style="`color:${productOverviews.color_subtext};`"
              >
                {{ data.productosInfo.descripcionCorta }}
              </p>
            </div>
            <div
              v-if="data?.categoriaProducto > 0"
              class="mb-10 flex flex-row items-start justify-start"
            >
              <p
                class="mr-10 text-16 font-bold"
                :style="`color:${productOverviews.color_text};`"
              >
                {{ $t('productdetail_categoria') }}:
              </p>
              <p
                class="text-14"
                :style="`color:${productOverviews.color_subtext};`"
              >
                {{ data.categoriaProducto2.nombreCategoriaProducto }}
              </p>
            </div>
            <div
              v-if="data?.subcategoria > 0"
              class="mb-10 flex flex-row items-start justify-start"
            >
              <p
                class="mr-10 text-16 font-bold"
                :style="`color:${productOverviews.color_text};`"
              >
                {{ $t('home_subcategory') }}:
              </p>
              <p
                class="text-14"
                :style="`color:${productOverviews.color_subtext};`"
              >
                {{ data.subcategoria2.nombreSubcategoria }}
              </p>
            </div>
            <div
              v-if="
                (data?.productosInfo?.largo != 0 &&
                  data?.productosInfo?.largo != null) ||
                (data?.productosInfo?.largo != 0 &&
                  data?.productosInfo?.largo != null) ||
                (data?.productosInfo?.alto != 0 &&
                  data?.productosInfo?.alto != null) ||
                (data?.productosInfo?.peso > 0 &&
                  data?.productosInfo?.peso != null)
              "
              class="mb-10 flex items-center justify-start"
            >
              <p
                class="mr-10 text-16 font-bold"
                :style="`color:${productOverviews.color_text};`"
              >
                {{ $t('productdetail_dimensiones') }}
              </p>
            </div>
            <div class="grid w-full grid-cols-1 gap-x-2 gap-y-0 sm:grid-cols-2">
              <div
                v-if="
                  data?.productosInfo?.largo != 0 &&
                  data?.productosInfo?.largo != null
                "
                class="mb-10 flex flex-row items-center justify-start"
              >
                <p
                  class="mr-10 text-16 font-bold"
                  :style="`color:${productOverviews.color_text};`"
                >
                  {{ $t('productdetail_largo') }}:
                </p>
                <p
                  class="text-14"
                  :style="`color:${productOverviews.color_subtext};`"
                >
                  {{ data.productosInfo.largo }} cm
                </p>
              </div>
              <div
                v-if="
                  data?.productosInfo?.ancho != 0 &&
                  data?.productosInfo?.ancho != null
                "
                class="mb-10 flex flex-row items-center justify-start"
              >
                <p
                  class="mr-10 text-16 font-bold"
                  :style="`color:${productOverviews.color_text};`"
                >
                  {{ $t('productdetail_ancho') }}:
                </p>
                <p
                  class="text-14"
                  :style="`color:${productOverviews.color_subtext};`"
                >
                  {{ data.productosInfo.ancho }} cm
                </p>
              </div>
              <div
                v-if="
                  data?.productosInfo?.alto != 0 &&
                  data?.productosInfo?.alto != null
                "
                class="mb-10 flex flex-row items-center justify-start"
              >
                <p
                  class="mr-10 text-16 font-bold"
                  :style="`color:${productOverviews.color_text};`"
                >
                  {{ $t('productdetail_alto') }}:
                </p>
                <p
                  class="text-14"
                  :style="`color:${productOverviews.color_subtext};`"
                >
                  {{ data.productosInfo.alto }} cm
                </p>
              </div>
              <div
                v-if="
                  data?.productosInfo?.peso != 0 &&
                  data?.productosInfo?.peso != null
                "
                class="mb-10 flex flex-row items-center justify-start"
              >
                <p
                  class="mr-10 text-16 font-bold"
                  :style="`color:${productOverviews.color_text};`"
                >
                  {{ $t('productdetail_Peso') }}:
                </p>
                <p
                  class="text-14"
                  :style="`color:${productOverviews.color_subtext};`"
                >
                  {{ data.productosInfo.peso }} cm
                </p>
              </div>
            </div>
            <div
              v-if="data?.productosInfo?.garantia"
              class="mb-10 flex flex-row items-start justify-start"
            >
              <p
                class="mr-10 text-16 font-bold"
                :style="`color:${productOverviews.color_text};`"
              >
                {{ $t('productdetail_garantia') }}
              </p>
              <p
                class="text-14"
                :style="`color:${productOverviews.color_subtext};`"
              >
                {{ data.productosInfo.garantia }}
              </p>
            </div>
            <div
              v-if="userDropshipping.userName"
              class="mb-30 flex w-full flex-row items-center"
            >
              <p
                class="mr-10 text-16 font-bold"
                :style="`color:${productOverviews.color_text};`"
              >
                {{ $t('productdetail_dropshipping') }}
              </p>
              <p
                class="text-14"
                :style="`color:${productOverviews.color_subtext};`"
              >
                {{ userDropshipping.userName }}
              </p>
            </div>

            <div
              v-if="data.conVariante === 1 && variantes"
              class="w-full"
              :class="userDropshipping.userName ? 'mb-10' : 'mb-20'"
            >
              <div
                v-for="(variant, index) in variantes"
                :key="index"
                class="flex flex-col items-start justify-center"
              >
                <label
                  for="variant name"
                  class="text-16 font-bold"
                  :style="`color:${productOverviews.color_text};`"
                >
                  {{ variant.nombre }}:
                </label>
                <SelectGroup
                  :index="index"
                  :variantes="variantes"
                  :details-products="productOverviews"
                  :setting-general="settingsGeneral"
                  :template="6"
                >
                  <option
                    v-for="item in variant.valores"
                    :key="item.option"
                    :value="item.option"
                  >
                    <p
                      class="text-14"
                      :style="`color:${productOverviews.color_subtext};`"
                    >
                      {{ item.option }}
                    </p>
                  </option>
                </SelectGroup>
              </div>
            </div>

            <div
              class="fixed bottom-0 left-0 z-10 mb-0 flex w-full flex-row items-center justify-start border-t bg-gray-100 px-6 py-10 transition delay-150 ease-in-out md:relative md:z-0 md:mb-20 md:border-t-0 md:bg-transparent md:px-0 md:py-0"
            >
              <div
                class="mr-20 flex flex-row items-center justify-center border-2"
                :class="{ disabled: !salesData?.estado }"
                :style="`border-color:${productOverviews.color_border}; border-radius: ${settingsGeneral['--radius']};`"
              >
                <button
                  class="bg-transparent px-15 text-center text-14"
                  @click="removeQuantity()"
                >
                  <menos-icon
                    class="icon"
                    :style="`color:${productOverviews.color_icon};`"
                  />
                </button>
                <input
                  v-model="quantityValue"
                  name="quantityValue"
                  class="max-w-[68px] bg-transparent px-10 py-11 text-center text-14 font-bold"
                  type="text"
                  onkeypress="return (event.charCode>47 && event.charCode<58)"
                />
                <button
                  class="bg-transparent px-15 text-center text-14"
                  @click="addQuantity()"
                >
                  <mas-icon
                    class="icon"
                    :style="`color:${productOverviews.color_icon};`"
                  />
                </button>
                <!-- Anuncio ult unidad -->
                <div
                  v-if="maxQuantityValue == quantityValue"
                  class="absolute -bottom-35 w-full max-w-[120px] rounded-4 bg-yellow-300 px-5 py-3 text-center"
                >
                  <span class="text-14 text-black">
                    {{ $t('cart_ultimaUnidad') }}
                  </span>
                </div>
              </div>
              <button
                v-if="shouldShowAddToCartButton"
                class="flex w-full items-center justify-center rounded-5 px-10 py-11"
                :style="`background-color: ${productOverviews.color_btn}; color: ${productOverviews.color_text_btn}; border-radius: ${settingsGeneral['--radius']};`"
                @click="goToPayments"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="mx-5"
                  width="18"
                  height="18"
                  :fill="productOverviews.color_text_btn"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"
                  />
                </svg>
                {{ getBuyButtonLabel }}
              </button>
              <button
                v-else-if="spent"
                disabled
                class="flex w-full items-center justify-center rounded-5 px-10 py-11"
                :style="`background-color: ${productOverviews.color_btn}; color: ${productOverviews.color_text_btn}; border-radius: ${settingsGeneral['--radius']};`"
              >
                {{ $t('home_cardAgotado') }}
              </button>
              <button
                v-else-if="!salesData?.estado || salesData?.precio === 0"
                disabled
                class="flex w-full items-center justify-center rounded-5 px-10 py-11"
                :style="`background-color: ${productOverviews.color_btn}; color: ${productOverviews.color_text_btn}; border-radius: ${settingsGeneral['--radius']};`"
              >
                {{ $t('productdetail_btnANodisponible') }}
              </button>
            </div>

            <div class="mt-10 w-full">
              <OptionTab
                class="w-full"
                :data-store="dataStore"
                :data="data"
                :envio="envio"
                :settings-general="settingsGeneral"
                :product-overviews="productOverviews"
                :price="salesData"
              />
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
import mobileCheck from '@/mixins/mobileCheck'
import { productHeadMixin } from '@/mixins/productHeadMixin'

export default {
  components: {
    OptionTab: () => import('./_product-details/OptTab.vue'),
    SelectGroup: () => import('../_commonComponent/select-group-v2.vue'),
  },
  filters: {
    toLowerCase(value) {
      return value ? value.toLowerCase() : ''
    },
  },
  mixins: [idCloudinary, currency, mobileCheck, productHeadMixin],
  props: {
    dataStore: {
      type: Object,
      required: true,
    },
    settingsGeneral: {
      type: Object,
      required: true,
    },
    productOverviews: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
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
      envio: {
        titulo: '',
        desc: '',
      },
      activeZoom: true,
      swiperOption: {
        direction: 'vertical',
        slidesPerView: 5,
        spaceBetween: 10,
        mousewheel: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-next',
          prevEl: '.swiper-prev',
        },
        breakpoints: {
          1100: {
            slidesPerView: 4,
            spaceBetween: 17,
          },
        },
      },
      sharing: {
        url: '',
        quote: '',
      },
      sharingFacebook: '',
      userDropshipping: {
        userId: '',
        userName: '',
      },
    }
  },
  head() {
    return this.generateHead()
  },
  computed: {
    ...mapState(['envios']),

    whatsapp() {
      return this.dataStore.redes.whatsapp
    },
    facebookPixel() {
      return this.$store.state.analytics_tagmanager
    },
    swiper() {
      return this.$refs.mySwiper.swiper
    },
    beforeCombination() {
      return this.$store.state.beforeCombination
    },
    // eslint-disable-next-line vue/return-in-computed-property
    variantes() {
      if (this.data.conVariante === 1) {
        return JSON.parse(this.data.productosVariantes[0].variantes)
      }
    },
    shouldShowAddToCartButton() {
      return !this.spent && this.salesData.estado && this.salesData.precio > 0
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
      this.quantityValue =
        value > this.maxQuantityValue
          ? this.maxQuantityValue
          : this.quantityValue
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
    async getDataProduct() {
      const { success, data } = await this.$store.dispatch(
        'products/GET_DATA_PRODUCT',
        {
          slug: this.productOverviews.slug,
        },
      )
      if (success && data.data) {
        this.loading = false
        this.data = data.data

        this.sendAnalyticsStore(data.data.id, 'VIEWED_PRODUCT')
        this.videoYouTube(data.data.productosInfo.video)
        this.setOptionShipping()
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
      }
    },
    removeQuantity() {
      if (this.data.cantidad >= 2) {
        this.quantityValue--
        this.data.cantidad = this.quantityValue
      }
    },
    videoYouTube(url) {
      let myregexp =
        /(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=|\/sandalsResorts#\w\/\w\/.*\/))([^\/&]{10,12})/
      let id = ''
      if (url && url !== '' && url !== 'null') {
        this.existYoutube = true
        id = url.match(myregexp)
        if (id) {
          this.idYoutube = id[1]
        }
      }
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
        location.href = `https://checkout.komercia.co/?params=${json}`
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
