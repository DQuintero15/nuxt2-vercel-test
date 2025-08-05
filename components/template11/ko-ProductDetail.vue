<template>
  <div
    class="wrapper-productDetail"
    :style="[
      settingByTemplate11[0].detailsProduct,
      settingByTemplate11[0].settingGeneral,
      {
        '--font-style-1':
          settingByTemplate11[0]?.settingGeneral?.fount_1 ?? 'Roboto',
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
      <div class="banner-detail">
        <div class="crumb">
          <nuxt-link to="/productos">
            <p class="txt-crumb s1">{{ $t('header_inicio') }}</p>
          </nuxt-link>
          <p class="separatorCrumb">/</p>
          <p class="txt-crumb s2">
            {{ data.nombre }}
          </p>
        </div>
      </div>
      <div class="empty"></div>
      <div class="product-content">
        <div class="left">
          <div class="wrapper-left">
            <div class="photos">
              <div v-swiper:mySwiper="swiperOption" ref="mySwiper">
                <div class="swiper-wrapper h-full">
                  <div class="swiper-slide">
                    <div class="photos_selected">
                      <img
                        v-lazy="idCloudinary(data.fotoCloudinary, 150, 150)"
                        class="img-list"
                        alt="Product Img"
                        @click="selectedPhoto(data.fotoCloudinary)"
                      />
                    </div>
                  </div>
                  <div
                    v-for="(photo, indexPhoto) in data.productosFotos"
                    :key="indexPhoto"
                    class="swiper-slide h-full"
                  >
                    <div class="photos_selected">
                      <img
                        v-lazy="
                          idCloudinaryQuality(photo.fotoCloudinary, 850, 850)
                        "
                        class="img-list"
                        alt="Product Img"
                        @click="selectedPhoto(photo.fotoCloudinary)"
                      />
                    </div>
                  </div>
                  <div class="swiper-slide h-full">
                    <div class="photos_selected">
                      <img
                        v-if="idYoutube"
                        v-lazy="`https://img.youtube.com/vi/${idYoutube}/0.jpg`"
                        class="video"
                        alt="Product Img"
                        @mouseover="existYoutube = true"
                      />
                    </div>
                  </div>
                </div>
                <div v-if="data.productosFotos.length > 3" class="swiper-prev">
                  <FlechaUp-icon class="icon-swiper" />
                </div>
                <div v-if="data.productosFotos.length > 3" class="swiper-next">
                  <Flechadown-icon class="icon-swiper" />
                </div>
              </div>
            </div>
            <div class="wrapper-photo_main">
              <div
                v-if="activeZoom && !existYoutube"
                class="photo_main"
                @mouseover="activeZoom = !activeZoom"
              >
                <img
                  v-lazy="idCloudinaryQuality(selectPhotoUrl, 850, 850)"
                  class="photo_main"
                  alt="Product Zoom"
                />
              </div>
              <div
                v-if="!activeZoom && !existYoutube"
                class="photo_main"
                @mouseleave="activeZoom = !activeZoom"
              >
                <zoom :photo="selectPhotoUrl" />
              </div>
              <iframe
                v-show="existYoutube"
                :src="`https://www.youtube.com/embed/${idYoutube}?rel=0&amp;controls=0&amp;showinfo=0`"
                frameborder="0"
                allowfullscreen
                class="photo_main"
              ></iframe>
            </div>
            <ProductSlide
              class="photos_responsive box-border h-full w-full"
              :photos="data.productosFotos"
              :photo="data.fotoCloudinary"
              :id-you-tube="idYoutube"
            />
          </div>
        </div>
        <div
          class="right"
          :style="`margin-top:${settingByTemplate11[0].detailsProduct['--marginTopTitle']};`"
        >
          <div class="content-items-right">
            <div
              v-if="data.productosInfo.marca"
              class="flex w-full items-center justify-start"
            >
              <p class="stock-text-2">
                {{ data.productosInfo.marca }}
              </p>
            </div>
            <div class="content-name">
              <p
                class="text-name"
                :style="`font-size:${settingByTemplate11[0].detailsProduct['--fontSizeTitle']}; font-weight:${settingByTemplate11[0].detailsProduct['--fontWeighTitle']};`"
              >
                {{ data.nombre }}
              </p>
            </div>
            <div class="content-price">
              <p
                v-show="salesData.precio"
                class="text-price"
                :style="`font-size:${settingByTemplate11[0].detailsProduct['--fontSizePrice']}; font-weight:${settingByTemplate11[0].detailsProduct['--fontWeighPrice']};`"
              >
                {{
                  salesData.precio
                    | currency(
                      dataStore.tiendasInfo.paises.codigo,
                      dataStore.tiendasInfo.moneda
                    )
                }}
              </p>
              <div
                v-show="
                  data.productosInfo.tagPromocion == 1 &&
                  data.productosInfo.promocionValor &&
                  salesData.precio
                "
                class="flex flex-row items-center justify-center"
              >
                <p class="card-discont">
                  {{ data.productosInfo.promocionValor }}% De Descuento
                </p>
                <p class="text-promocion">
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
              </div>
            </div>
            <div
              v-if="dataStore.medioPagos.addi === 1"
              class="flex w-full justify-start"
            >
              <PluginAddi
                :more-details="false"
                :status="dataStore.medioPagos.addi"
                :price="salesData"
                :data-store="dataStore"
              />
            </div>
            <div class="empty"></div>
            <div class="content-stock">
              <p
                v-if="
                  salesData.estado &&
                  salesData.unidades > 0 &&
                  salesData.precio > 0
                "
                class="text-stock"
                style="color: #92bb35"
              >
                {{ $t('productdetail_stock') }}
              </p>
              <p v-else class="text-stock" style="color: #ed2353">
                {{ $t('productdetail_Notstock') }}
              </p>
              <p
                v-if="spent && salesData.unidades == 0"
                class="text-stock"
                style="color: #ed2353"
              >
                {{ $t('productdetail_productoAgotado') }}
              </p>
            </div>
            <div class="content-stock">
              <p
                v-if="data.envioGratis == 1"
                class="text-stock"
                style="color: #00a650"
              >
                <TruckIcon class="mr-5 text-16" />
                {{ $t('footer_tarifaPrecio') }}
              </p>
            </div>
            <div
              v-if="data.productosInfo.descripcionCorta"
              class="content-stock"
            >
              <p class="stock-text-1">{{ $t('productdetail_informacion') }}:</p>
              <p class="stock-text-2">
                {{ data.productosInfo.descripcionCorta }}
              </p>
            </div>
            <div v-if="data.productosInfo.garantia" class="content-stock">
              <p class="stock-text-1">{{ $t('productdetail_garantia') }}:</p>
              <p class="stock-text-2">
                {{ data.productosInfo.garantia }}
              </p>
            </div>
            <div v-if="data.categoriaProducto > 0" class="content-stock">
              <p class="stock-text-1">{{ $t('productdetail_categoria') }}:</p>
              <p class="stock-text-2">
                {{ data.categoriaProducto2.nombreCategoriaProducto }}
              </p>
            </div>
            <div v-if="data.subcategoria > 0" class="content-stock">
              <p class="stock-text-1">{{ $t('home_subcategory') }}:</p>
              <p class="stock-text-2">
                {{ data.subcategoria2.nombreSubcategoria }}
              </p>
            </div>
            <div
              v-if="validateDimensions"
              class="my-6 flex w-full items-center justify-start"
            >
              <p class="stock-text-1">
                {{ $t('productdetail_dimensiones') }}
              </p>
            </div>
            <div class="grid w-full grid-cols-1 gap-x-2 gap-y-0 sm:grid-cols-2">
              <div
                v-if="
                  data.productosInfo.largo != 0 &&
                  data.productosInfo.largo != null &&
                  data.productosInfo.largo != 'null'
                "
                class="content-stock"
              >
                <p class="stock-text-1">{{ $t('productdetail_largo') }}:</p>
                <p class="stock-text-2">{{ data.productosInfo.largo }} cm</p>
              </div>
              <div
                v-if="
                  data.productosInfo.ancho != 0 &&
                  data.productosInfo.ancho != null &&
                  data.productosInfo.ancho != 'null'
                "
                class="content-stock"
              >
                <p class="stock-text-1">{{ $t('productdetail_ancho') }}:</p>
                <p class="stock-text-2">{{ data.productosInfo.ancho }} cm</p>
              </div>
              <div
                v-if="
                  data.productosInfo.alto != 0 &&
                  data.productosInfo.alto != null &&
                  data.productosInfo.alto != 'null'
                "
                class="content-stock"
              >
                <p class="stock-text-1">{{ $t('productdetail_alto') }}:</p>
                <p class="stock-text-2">{{ data.productosInfo.alto }} cm</p>
              </div>
              <div
                v-if="
                  data.productosInfo.peso > 0 &&
                  data.productosInfo.peso != null &&
                  data.productosInfo.peso != 'null'
                "
                class="content-stock"
              >
                <p class="stock-text-1">{{ $t('productdetail_Peso') }}:</p>
                <p class="stock-text-2">{{ data.productosInfo.peso }} Kg</p>
              </div>
            </div>

            <div class="empty mb-10"></div>
            <div
              v-if="data.conVariante === 1 && variantes"
              class="content-variant"
            >
              <div
                v-for="(variant, index) in variantes"
                :key="index"
                class="content-items-variant"
              >
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
              <p class="stock-text-2">
                {{ userDropshipping.userName }}
              </p>
            </div>
            <div class="flex w-full flex-row items-center">
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
              <button class="btn-whatsapp" @click="redirectWP()">
                <whatsapp-icon class="wp-icon" />
              </button>
            </div>
            <div
              class="border-color fixed bottom-0 left-0 z-10 mt-0 flex w-full flex-row items-center justify-center gap-x-4 border-t px-6 pb-10 pt-10 md:sticky md:z-0 md:mt-15 md:justify-start md:border-b md:border-t-0 md:px-0 md:pb-20 md:pt-0"
              :style="`background-color: ${settingByTemplate11[0].detailsProduct['--background_color_1']};`"
            >
              <div
                class="content-quantity-boxes"
                :class="{ disabled: !salesData.estado }"
              >
                <div class="box-quantity">
                  <p class="txt-quantity">{{ quantityValue }}</p>
                </div>
                <div class="box-quantity-btns">
                  <div class="btn-quantity btn1" @click="addQuantity()">
                    <FlechaUp-icon class="text-icon" />
                  </div>
                  <div class="btn-quantity btn2" @click="removeQuantity()">
                    <Flechadown-icon class="text-icon" />
                  </div>
                </div>
              </div>
              <div class="content-addCart">
                <button
                  v-if="shouldShowAddToCartButton"
                  ref="colorBtn"
                  class="btn"
                  @click="addToCart"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    class="minicart-icon"
                    viewBox="0 0 16 16"
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
                  ref="colorBtn"
                  class="btn"
                  @click="goToPayments"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    class="minicart-icon"
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
                  class="btn-disabled"
                >
                  {{ $t('productdetail_btnANodisponible') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="tab">
        <OptionTab
          :data-store="dataStore"
          :data="data"
          :envio="envio"
          :price="salesData"
        />
      </div>
      <div class="section-suggesProduct">
        <KoSuggestProduct
          v-if="filterSuggestedProducts?.length > 0"
          :suggested-products="filterSuggestedProducts"
          :setting-general="settingByTemplate11[0].settingGeneral"
          :setting-card-products="settingByTemplate11[0].cardProduct"
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
  name: 'Ko11ProductDetail',
  components: {
    PluginAddi: () => import('@/components/_commonComponent/addi.vue'),
    Skeleton: () => import('../_commonComponent/skeleton-detail.vue'),
    ProductSlide: () => import('../_commonComponent/zoom.vue'),
    SelectGroup: () => import('../_commonComponent/select-group.vue'),
    KoSuggestProduct: () =>
      import('../_commonComponent/suggestions-producto.vue'),
    OptionTab: () => import('../_commonComponent/opt-tab-top.vue'),
    Zoom: () => import('../_commonComponent/zoom-img.vue'),
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
    settingByTemplate11: {
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
      activeZoom: true,
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
      console.log('Data Store', this.dataStore)
      if (this.dataStore.id === 400 || this.dataStore.id === "400") {
        return this.$t('productdetail_btnAgendar')
      }
      return this.$t('productdetail_btnComprar')
    },
    filterSuggestedProducts() {
      return this.suggestedProducts.filter(
        (product) => product.id !== this.data.id
      )
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
    'dataStore.tienda'() {
      this.links[0].link = this.dataStore.redes.facebook
      this.links[1].link = this.dataStore.redes.twitter
      this.links[2].link = this.dataStore.redes.instagram
      this.links[3].link = this.dataStore.redes.youtube
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
      this.existYoutube = false
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
.wrapper-left {
  flex: 2;
  width: 100%;
  display: flex;
  flex-direction: row;
  padding-bottom: 10px;
  align-items: flex-start;
}
.photos_responsive {
  display: none;
}
.photos {
  min-width: 110px;
  max-width: 110px;
  min-height: 442px;
  max-height: 442px;
  margin-right: 30px;
  @apply relative flex h-full w-full overflow-hidden;
}
.photos_selected {
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  max-height: 100px;
  max-width: 100px;
  min-height: 100px;
  min-width: 100px;
  @apply h-full w-full;
}
.img-list {
  vertical-align: top;
  @apply mb-10 h-full w-full cursor-pointer rounded-6 object-cover;
}
.swiper-prev {
  position: absolute;
  top: 0;
  left: 20px;
  z-index: 2;
}
.swiper-next {
  position: absolute;
  left: 20px;
  bottom: 0;
  z-index: 2;
  font-size: 25px;
}
.icon-swiper {
  color: var(--color_icon);
  font-size: 60px;
  cursor: pointer;
}
.icon-swiper:hover {
  color: var(--hover_text);
}
.video {
  width: 100px;
  height: 100px;
  min-height: 100px;
  border-radius: 5px;
  margin-bottom: 10px;
  object-fit: cover;
  object-position: center;
}
.wrapper-photo_main {
  position: relative;
  max-width: 442px;
  max-height: 442px;
  width: 100%;
  margin-right: 10px;
}
.photo_main {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  border-radius: 10px;
  max-height: 442px;
}
.wrapper-productDetail {
  background: var(--background_color_1);
  @apply flex w-full items-center justify-center;
}
.container-productDetail-loading {
  height: calc(100vh - 420px);
  max-width: 1200px;
  padding: 50px 30px 30px 30px;
  background: var(--background_color_1);
  @apply flex w-full flex-col items-center justify-center;
}
.container-productDetail {
  background: var(--background_color_1);
  @apply flex h-full w-full flex-col items-center justify-center;
}
.left {
  @apply flex w-full flex-col items-center justify-center;
}
.content-images {
  @apply grid w-full grid-cols-1 items-center justify-center gap-4;
}
.content-variant {
  @apply mt-30 flex w-full flex-col items-start justify-center;
}
.content-items-variant {
  margin-bottom: 8px;
  @apply flex w-full flex-col items-start justify-start;
}
.aditional-images,
.main-images,
.youtuve-video {
  @apply flex w-full items-center justify-center;
}
.right {
  @apply flex w-full flex-col items-start justify-start;
}
.content-category,
.content-name,
.content-price,
.content-addCart {
  @apply flex w-full flex-row items-center justify-start;
}
.quantity {
  @apply flex flex-row items-center justify-center;
}
.section-suggesProduct {
  @apply my-40 w-full;
}
.content-quantity-boxes {
  @apply flex flex-row items-center justify-start;
}
.box-quantity {
  background-color: transparent;
  border: 1px solid var(--border);
  @apply flex h-50 w-75 items-center justify-center text-center;
}
.box-quantity-btns {
  background-color: var(--color_background_btn);
  border: 1px solid var(--color_background_btn);
  @apply flex h-50 w-25 flex-col items-center justify-center text-center;
}
.btn-quantity {
  background-color: var(--color_background_btn);
  border-color: var(--color_background_btn);
  @apply flex h-25 w-25 items-center justify-center border-r border-t;
}

.card-discont {
  color: var(--color_text_btn);
  background-color: var(--color_background_btn);
  padding: 2px 10px;
  margin-left: 5px;
  margin-right: 5px;
  font-size: 16px;
}
.text-promocion {
  font-size: 14px;
  font-weight: bold;
  color: var(--color_subtext);
  text-decoration: line-through;
}
@screen sm {
  .product-content {
    @apply mt-40 w-9/0 flex-col items-center justify-center;
  }
  .content-direction-btns {
    @apply flex w-full flex-col items-start justify-start;
  }
  .video {
    width: 100%;
    height: 200px;
  }
  .content-name,
  .content-price {
    @apply mb-20;
  }
  .content-options {
    @apply flex;
  }
  .tab {
    @apply mt-40 flex w-9/0;
  }
  .content-options {
    @apply flex w-full flex-col items-center justify-start;
  }
  .btn {
    color: var(--color_text_btn);
    background-color: var(--color_background_btn);
    border-radius: var(--radius_btn);
    transition: all 0.15s ease-in;
    @apply flex h-54 w-full flex-row items-center justify-center;
  }
  .btn-disabled {
    color: var(--color_text_btn);
    background-color: var(--color_background_btn);
    border-radius: var(--radius_btn);
    transition: all 0.15s ease-in;
    @apply flex h-54 w-full flex-row items-center justify-center;
  }
  .btn:hover .text-addCart {
    background-color: var(--hover_Bg_btn);
    color: var(--hover_text_btn);
    transition: all 0.15s ease-in;
  }
  .quantity {
    @apply w-full;
  }
  .text-name {
    color: var(--color_text);
    /* font-size: 22px; */
    line-height: 1;
    font-family: var(--font-style-1) !important;
  }
  .text-price {
    color: var(--color_price);
    /* font-size: 20px; */
    line-height: 26px;
    letter-spacing: 0.3px;
    font-family: var(--font-style-1) !important;
  }
  .text-stock {
    font-size: 14px;
    font-family: var(--font-style-1) !important;
    @apply font-semibold;
  }
  .text-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 34px;
    cursor: pointer;
    color: var(--color_text_btn);
  }
  .text-quantity_value {
    padding: 0 35px;
    border: none;
    font-size: 21px;
    @apply flex w-full items-center justify-center text-center font-semibold;
  }
  .text-addCart {
    font-family: var(--font-style-1) !important;
    color: var(--color_text_btn);
    font-size: 12px;
    @apply whitespace-nowrap font-semibold uppercase;
  }
  .minicart-icon {
    fill: var(--color_text_btn);
    color: var(--color_text_btn);
    @apply mb-5 mr-10;
  }
  .text-variant {
    color: var(--color_subtext);
    font-size: 16px;
    transition: all 0.6s ease-in-out;
    font-family: var(--font-style-1) !important;
    @apply mr-10 font-semibold;
  }
  .text-option {
    color: var(--color_subtext);
    font-size: 16px;
    transition: all 0.6s ease-in-out;
    font-family: var(--font-style-1) !important;
    @apply font-semibold;
  }
  .banner-detail {
    @apply hidden;
  }
  .section-suggesProduct {
    @apply w-9/0;
  }
  .content-items-right {
    @apply flex w-full flex-col items-center justify-center;
  }
  .empty {
    background-color: var(--border);
    max-width: 1200px;
    @apply h-1 w-full;
  }
  .content-stock {
    @apply my-8 flex w-full flex-row items-center justify-start;
  }
  .stock-text-1 {
    color: var(--color_subtext);
    font-size: 16px;
    font-family: var(--font-style-1) !important;
    @apply mr-10 font-semibold;
  }
  .stock-text-2 {
    color: var(--color_subtext);
    font-size: 15px;
    font-family: var(--font-style-1) !important;
    @apply text-left font-normal;
  }
}
@media (min-width: 425px) {
  .content-direction-btns {
    @apply flex flex-col;
  }
}
@media (min-width: 480px) {
  .video {
    height: 250px;
  }
}
@screen md {
  .banner-detail {
    @apply flex w-full items-center justify-items-center bg-cover bg-center bg-no-repeat py-20;
  }
  .crumb {
    @apply flex w-full flex-row items-center justify-center;
  }
  .separatorCrumb {
    font-size: 9px;
    color: var(--breadCrumbs);
    font-family: var(--font-style-1) !important;
    @apply cursor-pointer pr-6 leading-14 transition-all duration-0.2 ease-in;
  }
  .txt-crumb {
    font-size: 15px;
    color: var(--breadCrumbs);
    font-family: var(--font-style-1) !important;
    @apply cursor-pointer pr-6 leading-14 transition-all duration-0.2 ease-in;
  }
  .s1:hover {
    color: var(--hover_text);
    transition: all 0.25s ease;
  }
  .s2:hover {
    color: var(--hover_text);
    transition: all 0.25s ease;
  }

  .content-addCart {
    width: 236px;
  }
  .video {
    height: 400px;
  }
  .tab {
    @apply w-9/5;
  }
  .product-content {
    @apply grid w-9/5 grid-cols-2 items-start justify-start gap-4;
  }
  .section-suggesProduct {
    @apply w-9/5;
  }
}
@media (min-width: 850px) {
  .video {
    height: 480px;
  }
}
@screen lg {
  .video {
    height: 300px;
  }
  .content-options {
    @apply hidden;
  }
  .tab {
    @apply flex;
  }
  .content-direction-btns {
    @apply flex flex-col;
  }
}
@media (min-width: 1080px) {
  .content-options {
    width: 100%;
  }
}
@media (max-width: 768px) {
  .photos {
    display: none;
  }
  .wrapper-photo_main {
    display: none;
  }
  .photos_responsive {
    /* width: 100%;
    height: 375px;
    max-width: 400px; */
    display: flex;
    /* box-sizing: border-box;
    overflow: hidden;
    margin-bottom: 10px; */
  }
}
@media (min-width: 1200px) {
  .product-content,
  .tab,
  .section-suggesProduct {
    max-width: 1200px;
  }
}
</style>
