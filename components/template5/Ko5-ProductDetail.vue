<template>
  <div
    class="flex w-full items-center justify-center bg-[#efefef]"
    :style="[
      settingByTemplate,
      {
        '--font-style': settingByTemplate?.tipo_letra ?? 'Roboto',
      },
    ]"
  >
    <div
      v-if="loading"
      class="flex w-full max-w-[1300px] flex-col items-center justify-start px-10 pb-20 pt-25 md:px-30 md:pb-30 md:pt-50"
    >
      <Skeleton />
    </div>
    <div
      v-else
      class="relative flex w-full max-w-[1300px] flex-col justify-between px-10 pb-20 pt-25 md:justify-center md:px-30 md:pb-30 md:pt-50"
    >
      <div class="flex w-full flex-col md:flex-row">
        <div class="wrapper-left">
          <div ref="mySwiper" v-swiper:mySwiper="swiperOption" class="photos">
            <div class="swiper-wrapper">
              <div class="swiper-slide photos_selected">
                <img
                  :src="idCloudinary(data.fotoCloudinary, 150, 150)"
                  loading="lazy"
                  class="img-list"
                  alt="Product Img"
                  @click="selectedPhoto(data.fotoCloudinary)"
                />
              </div>
              <div
                v-for="(photo, indexPhoto) in data.productosFotos"
                :key="indexPhoto"
                class="swiper-slide photos_selected"
              >
                <img
                  :src="idCloudinary(photo.fotoCloudinary, 150, 150)"
                  loading="lazy"
                  class="img-list"
                  alt="Product Img"
                  @click="selectedPhoto(photo.fotoCloudinary)"
                />
              </div>
              <div class="swiper-slide photos_selected">
                <img
                  v-if="idYoutube"
                  :src="`https://img.youtube.com/vi/${idYoutube}/0.jpg`"
                  class="video"
                  alt="Product Img"
                  @mouseover="existYoutube = true"
                />
              </div>
            </div>
            <div v-if="data.productosFotos.length > 3" class="swiper-prev">
              <FlechaUp-icon class="icon-swiper" />
            </div>
            <div v-if="data.productosFotos.length > 3" class="swiper-next">
              <Flechadown-icon class="icon-swiper" />
            </div>
          </div>

          <div class="wrapper-photo_main">
            <div
              v-if="activeZoom"
              v-show="!existYoutube"
              class="photo_main"
              @mouseover="activeZoom = !activeZoom"
            >
              <img
                v-lazy="idCloudinaryQuality(selectPhotoUrl, 850, 850)"
                loading="lazy"
                class="photo_main"
                alt="Product Zoom"
              />
            </div>
            <div
              v-if="!activeZoom"
              v-show="!existYoutube"
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
            <p class="text-name">{{ data.nombre }}</p>
            <p v-if="data.productosInfo.marca" class="text-marca">
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
                v-if="envio.titulo == 'Envío gratis'"
                class="content_buy_action"
              >
                <p class="card-info-2">
                  <svg
                    class="transporte-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    version="1.1"
                    width="25px"
                    height="25px"
                    viewBox="0 0 24 24"
                    fill="#333"
                  >
                    <path
                      d="M18 18.5C18.83 18.5 19.5 17.83 19.5 17C19.5 16.17 18.83 15.5 18 15.5C17.17 15.5 16.5 16.17 16.5 17C16.5 17.83 17.17 18.5 18 18.5M19.5 9.5H17V12H21.46L19.5 9.5M6 18.5C6.83 18.5 7.5 17.83 7.5 17C7.5 16.17 6.83 15.5 6 15.5C5.17 15.5 4.5 16.17 4.5 17C4.5 17.83 5.17 18.5 6 18.5M20 8L23 12V17H21C21 18.66 19.66 20 18 20C16.34 20 15 18.66 15 17H9C9 18.66 7.66 20 6 20C4.34 20 3 18.66 3 17H1V6C1 4.89 1.89 4 3 4H17V8H20M3 6V15H3.76C4.31 14.39 5.11 14 6 14C6.89 14 7.69 14.39 8.24 15H15V6H3M5 10.5L6.5 9L8 10.5L11.5 7L13 8.5L8 13.5L5 10.5Z"
                    />
                  </svg>
                  {{ $t('home_cardGratis') }}
                </p>
              </div>
              <div class="content_card-info">
                <p v-if="spent" class="card-info-1">
                  {{ $t('home_cardAgotado') }}
                </p>
              </div>
            </div>
            <div
              v-if="data.productosInfo.descripcionCorta"
              style="margin-bottom: 5px"
            >
              <p class="text-marca">
                <strong>{{ data.productosInfo.descripcionCorta }}</strong>
              </p>
            </div>
            <div v-if="data.conVariante > 0">
              <div v-for="(variant, index) in variantes" :key="index">
                <label lang="es" for="variant name" class="text-variant">
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

            <div class="sticky flex w-full flex-col items-start justify-start">
              <div class="quantity">
                <p class="text-quantity hidden md:flex">
                  {{ $t('cart_cantidad') }}
                </p>
                <button class="quantity_remove" @click="removeQuantity">
                  <menos-icon class="icon" />
                </button>
                <p class="quantity_value">{{ quantityValue }}</p>
                <button class="quantity_add" @click="addQuantity">
                  <mas-icon class="icon" />
                </button>
                <div
                  v-if="maxQuantityValue == quantityValue"
                  class="container-alerta"
                >
                  <span class="alerta"> {{ $t('cart_ultimaUnidad') }}</span>
                </div>
              </div>
              <div class="content-button">
                <button
                  v-if="shouldShowAddToCartButton"
                  class="btn"
                  @click="addToCart"
                >
                  {{ getAddToCartButtonLabel }}
                </button>
                <button
                  v-else-if="shouldShowBuyButton"
                  class="btn"
                  @click="goToPayments"
                >
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
            <div class="item-info-product">
              <div
                v-if="
                  salesData.estado &&
                  salesData.unidades > 0 &&
                  salesData.precio > 0
                "
                class="content_buy_action"
              >
                <p class="text-14 font-bold text-green-600">
                  {{ $t('productdetail_stock') }}
                </p>
              </div>
              <div v-else class="content_buy_action">
                <p class="text-14 font-bold text-red-600">
                  {{ $t('productdetail_Notstock') }}
                </p>
              </div>
              <div
                v-if="data.productosInfo.garantia"
                class="content_buy_action"
              >
                <p class="text-unidades">
                  {{ $t('productdetail_garantia') }}
                </p>
                <span class="text-garantia">
                  {{ data.productosInfo.garantia }}
                </span>
              </div>
              <div
                v-if="userDropshipping.userName"
                class="my-10 flex w-full flex-row items-center"
              >
                <p class="text-variant" style="margin-right: 10px">
                  {{ $t('productdetail_dropshipping') }}
                </p>
                <p class="text-garantia">
                  {{ userDropshipping.userName }}
                </p>
              </div>
              <div
                v-if="data.categoriaProducto > 0"
                class="mt-15 flex flex-row items-center"
              >
                <p class="text-unidades">
                  {{ $t('productdetail_categoria') }}:
                </p>
                <p class="text-garantia">
                  {{ data.categoriaProducto2.nombreCategoriaProducto }}
                </p>
              </div>
              <div
                v-if="data.subcategoria > 0"
                class="mt-15 flex flex-row items-center"
              >
                <p class="text-unidades">{{ $t('home_subcategory') }}:</p>
                <p class="text-garantia">
                  {{ data.subcategoria2.nombreSubcategoria }}
                </p>
              </div>
              <p v-if="validateDimensions" class="text-unidades mt-10">
                <strong>{{ $t('productdetail_dimensiones') }}</strong>
              </p>
              <div
                class="grid w-full grid-cols-1 gap-x-2 gap-y-0 sm:grid-cols-2"
              >
                <div
                  v-if="
                    data.productosInfo.largo != 0 &&
                    data.productosInfo.largo != null &&
                    data.productosInfo.largo != 'null'
                  "
                  class="mt-15 flex flex-row items-center"
                >
                  <p class="text-unidades">{{ $t('productdetail_largo') }}:</p>
                  <p class="text-garantia">{{ data.productosInfo.largo }} cm</p>
                </div>
                <div
                  v-if="
                    data.productosInfo.ancho != 0 &&
                    data.productosInfo.ancho != null &&
                    data.productosInfo.ancho != 'null'
                  "
                  class="mt-15 flex flex-row items-center"
                >
                  <p class="text-unidades">{{ $t('productdetail_ancho') }}:</p>
                  <p class="text-garantia">{{ data.productosInfo.ancho }} cm</p>
                </div>
                <div
                  v-if="
                    data.productosInfo.alto != 0 &&
                    data.productosInfo.alto != null &&
                    data.productosInfo.alto != 'null'
                  "
                  class="mt-15 flex flex-row items-center"
                >
                  <p class="text-unidades">{{ $t('productdetail_alto') }}:</p>
                  <p class="text-garantia">{{ data.productosInfo.alto }} cm</p>
                </div>
                <div
                  v-if="
                    data.productosInfo.peso > 0 &&
                    data.productosInfo.peso != null &&
                    data.productosInfo.peso != 'null'
                  "
                  class="mt-15 flex flex-row items-center"
                >
                  <p class="text-unidades">{{ $t('productdetail_Peso') }}:</p>
                  <p class="text-garantia">{{ data.productosInfo.peso }} Kg</p>
                </div>
              </div>
              <div class="mt-15 flex flex-row items-center">
                <p class="text-unidades">
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
            </div>
          </div>
        </div>
      </div>
      <div class="border-[rgba(127, 127, 139, 0.342)] flex w-full border-t">
        <ko-description
          :data-store="dataStore"
          :data="data"
          :envio="envio"
          :price="salesData"
        />
      </div>
      <div class="w-full" style="z-index: 1 !important">
        <KoSuggestProduct
          v-if="filterSuggestedProducts?.length > 0"
          :suggested-products="filterSuggestedProducts"
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
  name: 'Ko5ProductDetail',
  components: {
    PluginAddi: () => import('@/components/_commonComponent/addi.vue'),
    Skeleton: () => import('../_commonComponent/skeleton-detail.vue'),
    SelectGroup: () => import('../_commonComponent/select-group.vue'),
    ProductSlide: () => import('../_commonComponent/zoom.vue'),
    KoDescription: () => import('./_productdetails/descriptionProduct.vue'),
    KoSuggestProduct: () =>
      import('../_commonComponent/suggestions-producto.vue'),
    Zoom: () => import('../_commonComponent/zoom-img.vue'),
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
      default: null,
    },
    settingByTemplate: {
      type: Object,
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
      suggestedProducts: [],
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
        (product) => product.id !== this.data.id,
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
    async getDataProduct() {
      const { success, data } = await this.$store.dispatch(
        'products/GET_DATA_PRODUCT',
        {
          slug: this.id,
        },
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
          mutableProduct,
        )
      } else {
        this.$store.state.productsCart.push(product)
      }
      this.$store.commit('UPDATE_CONTENT_CART')
      this.$router.push('/')
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
    async getSuggestedProducts() {
      const { success, data } = await this.$store.dispatch(
        'products/GET_ALL_PRODUCTS',
        {
          id_tienda: this.dataStore.id,
          page: 1,
          limit: 12,
          category: this.data.categoriaProducto2.nombreCategoriaProducto,
          // subcategory: this.data.subcategoria,
        },
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
* {
  font-family: var(--font-style) !important;
}
.wrapper-left {
  flex: 2;
  padding-bottom: 10px;
  /* margin-right: 25px; */
  @apply flex w-full flex-row;
}
.photos_responsive {
  display: none;
}
.photos {
  display: flex;
  margin-right: 30px;
  max-height: 550px;
  position: relative;
}
.swiper-wrapper {
  width: 100%;
  position: relative;
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
  color: var(--btnhover);
}
.photos_selected {
  max-height: 100px;
  @apply flex w-full flex-col justify-items-stretch;
}
.img-list {
  cursor: pointer;
  vertical-align: top;
  height: 100px;
  width: 100px;
  object-fit: contain;
  border-radius: 6px;
  margin-bottom: 10px;
}
.video {
  width: 100px;
  height: 100px;
  border-radius: 5px;
  margin-bottom: 10px;
  object-fit: cover;
  object-position: center;
}
.wrapper-photo_main {
  position: relative;
  max-width: 550px;
  height: 550px;
  min-height: 550px;
  width: 100%;
  margin-right: 25px;
}
.photo_main {
  max-width: 550px;
  max-height: 550px;
  width: 100%;
  height: 550px;
  object-fit: contain;
  object-position: center;
  border-radius: 10px;
}
.wrapper-right {
  flex: 1;
  display: flex;
  width: 100%;
  flex-direction: column;
  padding-bottom: 10px;
  /* border-left: 1px solid var(--color_border); */
  border-left: 1px solid rgba(127, 127, 139, 0.342);
}
.content-right {
  margin-left: 20px;
  position: sticky;
  top: 88px;
}
i.close {
  color: black;
  align-self: flex-end;
  cursor: pointer;
}
.text-name {
  font-weight: bold;
  font-size: 25px;
  color: #000000;
  /* color: var(--color_text); */
}
.text-marca {
  font-size: 16px;
  font-stretch: semi-condensed;
  font-style: normal;
  /* color: var(--color_subtext); */
  color: rgba(21, 20, 57, 0.541);
}
.text-promocion {
  font-size: 14px;
  font-weight: bold;
  color: rgba(55, 4, 4, 0.61);
  text-decoration: line-through;
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
  font-size: 14px;
  font-weight: bold;
  /* color: var(--color_subtext); */
  color: rgba(21, 20, 57, 0.541);
}
.text-unidades {
  font-size: 14px;
  font-weight: bold;
  /* color: var(--color_subtext); */
  color: rgba(21, 20, 57, 0.541);
  margin-right: 10px;
  /* margin-top: 5px; */
}
.text-garantia {
  font-size: 14px;
  font-weight: bold;
  /* color: var(--color_text); */
  color: #000000;
  /* margin-top: 5px; */
  /* margin-left: 5px; */
}
.content_buy_action {
  display: flex;
  flex-direction: row;
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
  font-weight: bold;
  min-height: 24px;
  max-height: 24px;
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
  min-height: 24px;
  max-height: 24px;
}
.transporte-icon {
  fill: black;
  width: 22px;
  height: 22px;
  margin-right: 5px;
}
.item-info-product {
  margin-top: 10px;
}
.content-button {
  display: flex;
  flex-direction: row;
  margin-top: 15px;
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
  bottom: 2px;
}
.btn {
  border-radius: var(--radius_btn);
  color: white;
  border: solid 2px black;
  background-color: black;
  padding: 6px 14px;
  width: 238px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 200ms ease-in;
}
.btn:hover {
  color: white;
  border: solid 2px var(--btnhover);
  background-color: var(--btnhover);
}
.btn-disabled {
  border-radius: var(--radius_btn);
  color: white;
  border: solid 2px gray;
  background-color: gray;
  padding: 6px 14px;
  width: 238px;
  font-size: 16px;
  font-weight: bold;
}
.quantity {
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  position: relative;
  box-sizing: border-box;
  max-width: 240px;
  /* margin-bottom: 25px; */
}
.text-quantity {
  font-size: 14px;
  font-weight: bold;
  /* color: var(--color_subtext); */
  color: rgba(21, 20, 57, 0.541);
  margin-right: 15px;
  align-self: center;
}
.quantity_remove {
  /* border: 2px var(--color_border); */
  border: 2px rgba(127, 127, 139, 0.342);
  border-top-left-radius: var(--radius_btn);
  border-bottom-left-radius: var(--radius_btn);
  border-style: solid none solid solid;
  background: transparent;
  height: 41px;
  width: 55px;
}
.quantity_value {
  font-size: 1em;
  /* color: var(--color_text); */
  color: #000000;
  /* border: 2px var(--color_border); */
  border: 2px rgba(127, 127, 139, 0.342);
  padding-left: 10px;
  padding-right: 10px;
  border-style: solid none solid none;
  background: transparent;
  height: 41px;
  width: 55px;
  justify-content: center;
  display: flex;
  align-items: center;
}
.quantity_add {
  /* border: 2px var(--color_border); */
  border: 2px rgba(127, 127, 139, 0.342);
  border-top-right-radius: var(--radius_btn);
  border-bottom-right-radius: var(--radius_btn);
  border-style: solid solid solid none;
  background: transparent;
  height: 41px;
  width: 55px;
}
.icon {
  font-size: 16px;
  /* color: var(--color_border); */
  color: rgba(127, 127, 139, 0.342);
  transition: all 200ms ease-in;
}
.icon:hover {
  /* color: var(--color_text); */
  color: #000000;
}
.container-alerta {
  position: absolute;
  bottom: -32px;
  left: 95px;
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
.alerta {
  text-align: center;
  padding: 5px 5px;
  /* text-transform: capitalize; */
}
@media (max-width: 1100px) {
  .photos {
    margin-right: 20px;
  }
}
@media (max-width: 1100px) {
  .photos {
    margin-right: 20px;
    max-height: 450px;
  }
  .wrapper-photo_main {
    max-width: 450px;
    height: 450px;
    min-height: 450px;
  }
  .photo_main {
    max-width: 450px;
    max-height: 450px;
    height: 450px;
  }
}
@media (max-width: 810px) {
  .photos {
    margin-right: 10px;
  }
  .wrapper-left {
    margin-right: 15px;
  }
}
@media (max-width: 768px) {
  .wrapper-left {
    flex: 1;
  }
  .photos {
    margin-right: 10px;
  }
  .photos {
    display: none;
  }
  .wrapper-photo_main {
    display: none;
  }
  .photos_responsive {
    width: 100%;
    height: 375px;
    max-width: 400px;
    display: flex;
    box-sizing: border-box;
    overflow: hidden;
    margin-bottom: 10px;
  }
}
@media (max-width: 725px) {
  .wrapper-left {
    justify-content: center;
    align-items: center;
  }
  .wrapper-right {
    padding-bottom: 2px;
    border-left: 0px;
  }

  .content_card-info {
    display: none;
  }
  .text-quantity {
    font-size: 14px;
    font-weight: bold;
    /* color: var(--color_subtext); */
    color: rgba(21, 20, 57, 0.541);
    margin-right: 5px;
    align-self: center;
  }
  .quantity_remove {
    /* border: 1px var(--color_border); */
    border: 1px rgba(127, 127, 139, 0.342);
    border-top-left-radius: var(--radius_btn);
    border-bottom-left-radius: var(--radius_btn);
    border-style: solid none solid solid;
    background: transparent;
    height: 38px;
    width: 3em;
  }
  .quantity_value {
    font-size: 1em;
    /* color: var(--color_text); */
    color: #000000;
    /* border: 1px var(--color_border); */
    border: 1px rgba(127, 127, 139, 0.342);
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
    /* border: 1px var(--color_border); */
    border: 1px rgba(127, 127, 139, 0.342);
    border-top-right-radius: var(--radius_btn);
    border-bottom-right-radius: var(--radius_btn);
    border-style: solid solid solid none;
    background: transparent;
    height: 38px;
    width: 3em;
  }
  .icon {
    font-size: 16px;
  }
  .container-alert {
    position: absolute;
    top: -55px;
    left: 45px;
    width: 80px;
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
  .features {
    border-top: none;
  }
}
@media (max-width: 600px) {
  .wrapper-left {
    padding-bottom: 0px;
  }
  .wrapper-right {
    margin-bottom: 15px;
  }
  .content-right {
    margin-left: 15px;
    margin-right: 15px;
  }
  .text-name {
    font-weight: 500;
    font-size: 20px;
  }
}
</style>
