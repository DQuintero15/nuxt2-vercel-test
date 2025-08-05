<template>
  <div
    class="wrapper-productDetail"
    :style="[
      settingByTemplate9[0].detailsProduct,
      settingByTemplate9[0].setting9General,
      {
        '--font-style-2':
          settingByTemplate9[0]?.setting9General?.fount_2 ?? 'Roboto',
      },
    ]"
  >
    <div
      v-if="loading"
      class="flex w-full max-w-[1300px] flex-col items-center justify-start px-10 pb-20 pt-25 md:px-30 md:pb-30 md:pt-50"
    >
      <Skeleton />
    </div>
    <div v-else class="container-productDetail">
      <div class="crumb">
        <nuxt-link to="/">
          <p class="txt-crumb s1">{{ $t('header_inicio') }}</p>
        </nuxt-link>
        <p class="txt-crumb">/</p>
        <p class="txt-crumb s2">{{ data.nombre }}</p>
      </div>
      <div class="product-content">
        <div class="left">
          <div
            class="hidden grid-cols-1 items-center justify-center gap-4 md:grid"
          >
            <div class="flex w-full items-center justify-center">
              <img
                v-lazy="idCloudinaryQuality(data.fotoCloudinary, 850, 850)"
                class="h-auto w-auto overflow-hidden object-contain"
                alt="Product Img"
              />
            </div>
            <div
              v-for="(foto, itemsPhoto) in data.productosFotos"
              :key="itemsPhoto"
              class="flex w-full items-center justify-center"
            >
              <img
                v-lazy="idCloudinaryQuality(foto.fotoCloudinary, 850, 850)"
                class="h-auto w-auto overflow-hidden object-contain"
                alt="Product Img"
              />
            </div>
            <div class="flex w-full items-center justify-center">
              <iframe
                v-show="idYoutube"
                :src="`https://www.youtube.com/embed/${idYoutube}?rel=0&amp;controls=0&amp;showinfo=0`"
                frameborder="0"
                allowfullscreen
                class="video"
              ></iframe>
            </div>
          </div>
          <div
            class="mb-10 box-content flex max-h-[375px] w-full max-w-[400px] overflow-hidden md:hidden"
          >
            <ProductSlide
              :photos="data.productosFotos"
              :photo="data.fotoCloudinary"
              :id-you-tube="idYoutube"
            />
          </div>
        </div>
        <div class="right">
          <div class="content-items-right">
            <div class="content-category">
              <p v-if="data.productosInfo.marca" class="text-category">
                {{ data.productosInfo.marca }}
              </p>
            </div>
            <div class="content-name">
              <p class="text-name">{{ data.nombre }}</p>
            </div>
            <div class="content-price">
              <p
                v-show="
                  data.productosInfo.tagPromocion == 1 &&
                  data.productosInfo.promocionValor &&
                  salesData.precio
                "
                class="text-price-promo"
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
              <p
                v-show="
                  data.productosInfo.tagPromocion == 1 &&
                  data.productosInfo.promocionValor &&
                  salesData.precio
                "
                class="text-numero-promo"
              >
                {{ data.productosInfo.promocionValor }}% OFF
              </p>
              <p v-show="salesData.precio" class="text-price">
                {{
                  salesData.precio
                    | currency(
                      dataStore.tiendasInfo.paises.codigo,
                      dataStore.tiendasInfo.moneda
                    )
                }}
              </p>
              <p
                v-if="
                  salesData.estado &&
                  salesData.unidades > 0 &&
                  salesData.precio > 0
                "
                class="text-stock text-green-600"
              >
                {{ $t('productdetail_stock') }}
              </p>
              <p v-else class="text-stock text-red-600">
                {{ $t('productdetail_Notstock') }}
              </p>
            </div>
            <PluginAddi
              :more-details="false"
              :status="dataStore.medioPagos.addi"
              :price="salesData"
              :data-store="dataStore"
            />
            <div
              v-if="data.productosInfo.descripcionCorta"
              class="mb-10 flex flex-col items-start"
            >
              <p class="text-variant">{{ $t('productdetail_informacion') }}</p>
              <p class="text-option2">
                {{ data.productosInfo.descripcionCorta }}
              </p>
            </div>
            <div
              v-if="data.productosInfo.garantia"
              class="mb-10 flex flex-col items-start"
            >
              <p class="text-variant">{{ $t('productdetail_garantia') }}</p>
              <p class="text-option2">
                {{ data.productosInfo.garantia }}
              </p>
            </div>
            <div
              v-if="data.categoriaProducto > 0"
              class="mb-10 flex flex-col items-start"
            >
              <p class="text-variant">{{ $t('productdetail_categoria') }}</p>
              <p class="text-option2">
                {{ data.categoriaProducto2.nombreCategoriaProducto }}
              </p>
            </div>
            <div
              v-if="data?.subcategoria > 0 && dataStore?.id != 7454"
              class="mb-10 flex flex-col items-start"
            >
              <p class="text-variant">{{ $t('home_subcategory') }}</p>
              <p class="text-option2">
                {{ data.subcategoria2.nombreSubcategoria }}
              </p>
            </div>

            <p v-if="validateDimensions" class="text-variant mb-10">
              {{ $t('productdetail_dimensiones') }}
            </p>
            <div class="grid w-full grid-cols-1 gap-x-2 gap-y-0 sm:grid-cols-2">
              <div
                v-if="
                  data.productosInfo.largo != 0 &&
                  data.productosInfo.largo != null &&
                  data.productosInfo.largo != 'null'
                "
                class="mb-10 flex flex-col items-start"
              >
                <p class="text-variant">{{ $t('productdetail_largo') }}:</p>
                <p class="text-option2">{{ data.productosInfo.largo }} cm</p>
              </div>
              <div
                v-if="
                  data.productosInfo.ancho != 0 &&
                  data.productosInfo.ancho != null &&
                  data.productosInfo.ancho != 'null'
                "
                class="mb-10 flex flex-col items-start"
              >
                <p class="text-variant">{{ $t('productdetail_ancho') }}:</p>
                <p class="text-option2">{{ data.productosInfo.ancho }} cm</p>
              </div>
              <div
                v-if="
                  data.productosInfo.alto != 0 &&
                  data.productosInfo.alto != null &&
                  data.productosInfo.alto != 'null'
                "
                class="mb-10 flex flex-col items-start"
              >
                <p class="text-variant">{{ $t('productdetail_alto') }}:</p>
                <p class="text-option2">{{ data.productosInfo.alto }} cm</p>
              </div>
              <div
                v-if="
                  data.productosInfo.peso > 0 &&
                  data.productosInfo.peso != null &&
                  data.productosInfo.peso != 'null'
                "
                class="mb-10 flex flex-col items-start"
              >
                <p class="text-variant">{{ $t('productdetail_Peso') }}:</p>
                <p class="text-option2">{{ data.productosInfo.peso }} Kg</p>
              </div>
            </div>

            <!-- Variantes de prodcuto -->
            <div
              v-if="data.conVariante === 1 && variantes"
              class="content-variant"
            >
              <div v-for="(variant, index) in variantes" :key="index">
                <label for="variant name" class="text-variant">
                  {{ variant.nombre }}:
                </label>
                <SelectGroup :index="index" :variantes="variantes">
                  <option
                    v-for="item in variant.valores"
                    :key="item.option"
                    :value="item.option"
                  >
                    <p class="text-option">
                      {{ item.option }}
                    </p>
                  </option>
                </SelectGroup>
              </div>
            </div>
            <div
              v-if="userDropshipping.userName"
              class="my-8 flex w-full flex-row items-center"
            >
              <p class="text-variant" style="margin-right: 10px">
                {{ $t('productdetail_dropshipping') }}
              </p>
              <p class="text-option2">
                {{ userDropshipping.userName }}
              </p>
            </div>
            <div class="mb-10 flex flex-row items-center md:mb-20">
              <p class="text-variant" style="margin-right: 10px">
                {{ $t('productdetail_compartir') }}
              </p>
              <a
                :href="sharingFacebook"
                target="_blank"
                rel="noreferrer noopener"
                class="btn-facebook"
              >
                <facebook-icon class="wp-icon" />
              </a>
              <button class="btn-whatsapp" @click="redirectWP">
                <whatsapp-icon class="wp-icon" />
              </button>
            </div>
            <div
              class="border-color fixed bottom-0 left-0 z-10 mt-0 flex w-full flex-row items-center justify-center border-t px-6 pb-10 pt-10 md:sticky md:z-0 md:mt-15 md:justify-start md:border-b md:border-t-0 md:px-0 md:pb-20 md:pt-0"
              :style="`background-color: ${settingByTemplate9[0].detailsProduct['--background_color_1']};`"
            >
              <div class="content-cart mr-10">
                <div class="quantity">
                  <button class="quantity_remove" @click="removeQuantity">
                    <menos-icon class="text-icon" />
                  </button>
                  <p class="text-quantity_value">{{ quantityValue }}</p>
                  <button class="quantity_add" @click="addQuantity">
                    <mas-icon class="text-icon" />
                  </button>
                  <div
                    v-if="maxQuantityValue == quantityValue"
                    class="absolute -top-32 left-3 w-[130px] rounded-6 border border-yellow-500 bg-yellow-300 px-2 py-3 text-center"
                  >
                    <span class="text-14 text-black">
                      {{ $t('cart_ultimaUnidad') }}
                    </span>
                  </div>
                </div>
              </div>
              <div class="content-addCart">
                <button
                  v-if="shouldShowAddToCartButton"
                  class="btn"
                  @click="addToCart"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    class="mr-5"
                  >
                    <path
                      d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"
                    />
                  </svg>
                  {{ getAddToCartButtonLabel }}
                </button>
                <button
                  v-else-if="shouldShowBuyButton"
                  id="AddToCartTag"
                  class="btn"
                  @click="goToPayments"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    class="mr-5"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"
                    />
                  </svg>
                  {{ getBuyButtonLabel }}
                </button>
                <button v-else-if="spent" disabled class="btn-disabled">
                  {{ $t('home_cardAgotado') }}
                </button>
                <button
                  v-else-if="!salesData.estado || salesData.precio === 0"
                  disabled
                  class="btn"
                >
                  {{ $t('productdetail_btnANodisponible') }}
                </button>
              </div>
            </div>
            <div class="content-options">
              <OptionAcordion
                :data-store="dataStore"
                :data="data"
                :envio="envio"
                :setting-by-general="settingByTemplate9[0].setting9General"
                :price="salesData"
              />
            </div>
            <div class="tab">
              <OptionTab
                :data-store="dataStore"
                :data="data"
                :envio="envio"
                :setting-by-general="settingByTemplate9[0].setting9General"
                :price="salesData"
              />
            </div>
            <div
              v-if="envio && envio.titulo == 'Gratis'"
              class="content-free-shipping"
            >
              <svg
                class="transporte-icon mr-2"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                version="1.1"
                width="28px"
                height="28px"
                viewBox="0 0 24 24"
                fill="#2c2930"
              >
                <path
                  d="M18 18.5C18.83 18.5 19.5 17.83 19.5 17C19.5 16.17 18.83 15.5 18 15.5C17.17 15.5 16.5 16.17 16.5 17C16.5 17.83 17.17 18.5 18 18.5M19.5 9.5H17V12H21.46L19.5 9.5M6 18.5C6.83 18.5 7.5 17.83 7.5 17C7.5 16.17 6.83 15.5 6 15.5C5.17 15.5 4.5 16.17 4.5 17C4.5 17.83 5.17 18.5 6 18.5M20 8L23 12V17H21C21 18.66 19.66 20 18 20C16.34 20 15 18.66 15 17H9C9 18.66 7.66 20 6 20C4.34 20 3 18.66 3 17H1V6C1 4.89 1.89 4 3 4H17V8H20M3 6V15H3.76C4.31 14.39 5.11 14 6 14C6.89 14 7.69 14.39 8.24 15H15V6H3M5 10.5L6.5 9L8 10.5L11.5 7L13 8.5L8 13.5L5 10.5Z"
                />
              </svg>
              <p class="text-shipping">{{ $t('footer_tarifaPrecio') }}</p>
            </div>
          </div>
        </div>
      </div>
      <!-- Productos relacionados  -->
      <div class="section-suggesProduct">
        <KoSuggestProduct
          v-if="filterSuggestedProducts?.length > 0"
          :suggested-products="filterSuggestedProducts"
          :setting-general="settingByTemplate9[0].settingGeneral"
          :setting-card-products="settingByTemplate9[0].cardProduct"
        />
      </div>
    </div>
  </div>
</template>
<script>
import idCloudinary from '@/mixins/idCloudinary'
import currency from '@/mixins/formatCurrent'
import mobileCheck from '@/mixins/mobileCheck'
import { productHeadMixin } from '@/mixins/productHeadMixin'
export default {
  name: 'Ko9ProductDetail',
  components: {
    PluginAddi: () => import('@/components/_commonComponent/addi.vue'),
    Skeleton: () => import('../_commonComponent/skeleton-detail.vue'),
    ProductSlide: () => import('../_commonComponent/zoom.vue'),
    SelectGroup: () => import('../_commonComponent/select-group.vue'),
    KoSuggestProduct: () =>
      import('../_commonComponent/suggestions-producto.vue'),
    OptionAcordion: () => import('./_productdetails/OptAcordion'),
    OptionTab: () => import('./_productdetails/OptTab'),
  },
  filters: {
    toLowerCase(value) {
      if (value) {
        return value.toLowerCase()
      }
      return ''
    },
  },
  mixins: [idCloudinary, currency, mobileCheck, productHeadMixin],
  props: {
    dataStore: {
      type: Object,
      required: true,
    },
    whatsapp: {
      type: String,
      required: true,
    },
    envios: {
      type: Object,
      required: true,
    },
    facebookPixel: {
      type: Object,
      required: true,
    },
    settingByTemplate9: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      id: this.$route.params.slug,
      loading: true,
      data: {},
      selectPhotoUrl: '',
      idYoutube: '',
      existYouTube: false,
      maxQuantityValue: 1,
      quantityValue: 1,
      productIndexCart: null,
      productCart: {},
      salesData: null,
      spent: false,
      shippingProduct: '',
      suggestedProducts: [],
      envio: {
        titulo: '',
        desc: '',
      },
      swiperOption: {
        direction: 'vertical',
        slidesPerView: 4,
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
    validateDimensions() {
      return (
        (this.data.productosInfo.largo != 0 &&
          this.data.productosInfo.largo != null &&
          this.data.productosInfo.largo != 'null') ||
        (this.data.productosInfo.ancho != 0 &&
          this.data.productosInfo.ancho != null &&
          this.data.productosInfo.ancho != 'null') ||
        (this.data.productosInfo.alto != 0 &&
          this.data.productosInfo.alto != null &&
          this.data.productosInfo.alto != 'null') ||
        (this.data.productosInfo.peso > 0 &&
          this.data.productosInfo.peso != null &&
          this.data.productosInfo.peso != 'null')
      )
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
          slug: this.id,
        }
      )
      if (success && data.data) {
        this.loading = false
        this.data = data.data

        this.sendAnalyticsStore(data.data.id, 'VIEWED_PRODUCT')
        this.selectedPhoto(data.data.fotoCloudinary)
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
    selectedPhoto(photo) {
      this.selectPhotoUrl = photo
      this.existYouTube = false
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
          mutableProduct
        )
      } else {
        this.$store.state.productsCart.push(product)
      }
      this.$store.commit('UPDATE_CONTENT_CART')
      this.$router.push('/productos')
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
.border-color {
  border-color: var(--color_border);
}
.btn-facebook {
  color: #1877f2;
  border-radius: 5px;
  background-color: transparent;
  width: 10px;
  cursor: pointer;
  transition: all 200ms ease-in;
  text-decoration: none;
  display: flex;
  justify-content: center;
  text-align: center;
  border: 0px;
  margin-right: 20px;
}
.btn-facebook:hover {
  color: black;
}
.btn-whatsapp {
  color: #25d366;
  border-radius: 5px;
  background-color: transparent;
  width: 10px;
  cursor: pointer;
  transition: all 200ms ease-in;
  text-decoration: none;
  display: flex;
  justify-content: center;
  text-align: center;
  border: 0px;
}
.btn-whatsapp:hover {
  color: black;
}
.wp-icon {
  font-size: 27px;
  bottom: 3px;
}
.content-items-right {
  width: 100%;
}
.wrapper-productDetail {
  display: flex;
  width: 100%;
  background: var(--background_color_1);
  justify-content: center;
  align-items: center;
  padding-top: 20px;
}
.container-productDetail {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1460px;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
}
.crumb {
  @apply my-40 flex flex-row items-start justify-start;
}
.txt-crumb {
  font-family: Arial, sans-serif;
  font-size: 12px;
  color: var(--breadcrumbs);
  line-height: 14px;
  padding-right: 6px;
  cursor: pointer;
  transition: all 0.25s ease;
}
.s1:hover {
  background-color: #2c2930;
  color: #fff;
  transition: all 0.25s ease;
}
.s2:hover {
  background-color: #2c2930;
  color: #fff;
  transition: all 0.25s ease;
}
.product-content {
  @apply flex w-full;
}
.left {
  @apply flex flex-col items-center justify-center;
}

.content-variant {
  @apply mb-20 flex w-auto flex-col items-start justify-center;
}

.right {
  @apply flex flex-col items-start justify-start;
}
.content-category,
.content-name,
.content-addCart {
  @apply flex w-full flex-row items-center justify-start;
}
.content-price {
  align-items: center;
  @apply grid grid-flow-row grid-cols-2 grid-rows-2 gap-0;
}
.quantity {
  @apply flex flex-row items-center justify-center;
}
.section-suggesProduct {
  width: 100%;
  margin-top: 40px;
}

@screen sm {
  .product-content {
    @apply flex-col items-center justify-center;
  }
  .left {
    @apply w-9/0;
  }
  .video {
    width: 100%;
    height: 200px;
  }

  .right {
    @apply mt-4 w-9/0;
  }
  .content-name,
  .content-price {
    @apply mb-25;
  }
  .content-options {
    @apply flex;
  }
  .tab {
    @apply flex;
  }
  .tab {
    @apply hidden;
  }
  .content-cart {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: var(--color_quantity_bg);
    height: 54px;
    padding-bottom: 1px;
  }
  .content-free-shipping {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 54px;
    background: #f4f4f4;
    margin-top: 20px;
  }
  .content-options {
    @apply flex w-full flex-col items-center justify-start;
  }
  .crumb {
    @apply w-9/0;
  }
  .btn {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 54px;
    background-color: var(--color_background_btn);
    color: var(--color_text_btn);
    border-radius: var(--radius_btn);
    transition: all 0.15s ease-in;
  }
  .btn-disabled {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 54px;
    background-color: var(--color_background_btn);
    color: var(--color_text_bt);
    border-radius: var(--radius_btn);
    transition: all 0.15s ease-in;
  }
  .btn:hover {
    background-color: var(--hover_bg);
    color: var(--hover_text);
    transition: all 0.15s ease-in;
  }
  .quantity {
    @apply w-full;
  }
  .quantity_remove,
  .quantity_add {
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--color_quantity_bg);
  }
  .text-category {
    /* font-family: 'Roboto', Helvetica, Arial, sans-serif !important; */
    font-family: var(--font-style-2);
    color: var(--color_category);
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 4px;
    transition: all 0.6s ease-in-out;
  }
  .text-name {
    /* font-family: 'Roboto', Helvetica, Arial, sans-serif !important; */
    font-family: var(--font-style-2);
    color: var(--color_title);
    font-size: 36px;
    font-weight: 700;
    letter-spacing: 0px;
    line-height: 1;
    /* text-transform: capitalize; */
  }
  .text-price {
    /* font-family: 'Roboto', Helvetica, Arial, sans-serif !important; */
    font-family: var(--font-style-2);
    color: var(--color_price);
    font-size: 36px;
    font-weight: 600;
    line-height: 1;
    letter-spacing: -0.03em;
    /* text-transform: capitalize; */
  }
  .text-stock {
    /* font-family: 'Roboto', Helvetica, Arial, sans-serif !important; */
    font-family: var(--font-style-2);
    /* color: #92bb35; */
    font-size: 14px;
    font-weight: 600;
    /* line-height: 1.42857143;
    letter-spacing: -0.02em; */
    /* margin-left: 30px; */
    /* text-transform: capitalize; */
  }
  .text-price-promo {
    /* font-family: 'Roboto', Helvetica, Arial, sans-serif !important; */
    font-family: var(--font-style-2);
    color: var(--color_price);
    font-size: 18px;
    font-weight: 600;
    line-height: 1;
    letter-spacing: -0.03em;
    text-decoration: line-through;
  }
  .text-numero-promo {
    font-family: var(--font-style-2);
    font-size: 12px;
    color: #00a650;
    font-size: 14px;
    font-weight: 600;
    /* line-height: 1.42857143; */
    /* letter-spacing: -0.02em; */
    /* margin-left: 100px; */
    /* text-transform: capitalize; */
  }
  .text-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 34px;
    cursor: pointer;
    color: var(--color_quantity_num);
  }
  .text-quantity_value {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 100%;
    padding: 0 35px;
    border: none;
    font-size: 21px;
    font-weight: 700;
    color: var(--color_quantity_num);
  }
  .text-shipping {
    /* font-family: 'Roboto', Helvetica, Arial, sans-serif !important; */
    font-family: var(--font-style-2);
    color: var(--color_title);
    font-size: 14px;
    font-weight: 700;
    line-height: 1px;
    margin-left: 10px;
    /* text-transform: capitalize; */
  }
  .text-variant {
    /* font-family: 'Roboto', Helvetica, Arial, sans-serif !important; */
    font-family: var(--font-style-2);
    color: var(--color_title);
    font-size: 16px;
    font-weight: 700;
    transition: all 0.6s ease-in-out;
  }
  .text-option {
    /* font-family: 'Roboto', Helvetica, Arial, sans-serif !important; */
    font-family: var(--font-style-2);
    color: #303030;
    font-size: 16px;
    font-weight: 700;
    transition: all 0.6s ease-in-out;
  }
  .text-option2 {
    /* font-family: 'Roboto', Helvetica, Arial, sans-serif !important; */
    font-family: var(--font-style-2);
    color: #303030;
    font-size: 15px;
    font-weight: 500;
    transition: all 0.6s ease-in-out;
  }
  /* ------------------- DOWN ----------------------- */
}
@media (min-width: 450px) {
  .content-cart {
    @apply w-4/0;
  }
  .video {
    height: 250px;
  }
}
@screen md {
  .left {
    @apply w-9/5;
  }
  .right {
    @apply w-9/5;
  }
  .content-cart {
    width: 150px;
  }
  .content-addCart {
    width: 236px;
  }
  .video {
    height: 400px;
  }
}
@media (min-width: 850px) {
  .video {
    height: 480px;
  }
}
@screen lg {
  .product-content {
    @apply w-9/6 flex-row items-start justify-start;
  }
  .crumb {
    @apply w-9/6;
  }
  .video {
    height: 300px;
  }
  .left {
    @apply mr-50 w-full;
  }
  .content-options {
    @apply hidden;
  }
  .tab {
    @apply flex;
  }
  .content-free-shipping {
    width: 100%;
  }
  .right {
    width: 55%;
    position: sticky;
    top: 80px;
  }
}
@media (min-width: 1080px) {
  .content-options,
  .content-free-shipping {
    width: 100%;
  }
  .video {
    height: 320px;
  }
}
@media (min-width: 1135px) {
  .video {
    height: 380px;
  }
}
@media (min-width: 1250px) {
  .video {
    height: 420px;
  }
}
@screen mlg {
  .content-direction-btns {
    @apply flex flex-row;
  }
  .right {
    width: 50%;
  }
  .product-content {
    @apply w-full;
  }
}
@media (min-width: 1350px) {
  .video {
    height: 480px;
  }
}
@media (min-width: 1460px) {
  .video {
    height: 520px;
  }
  .right {
    width: 55%;
  }
  .product-content {
    @apply w-full;
  }
  .crumb {
    @apply w-full;
  }
}
@media (max-width: 450px) {
  .content-price {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
}
</style>
