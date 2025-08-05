<template>
  <div
    class="wrapper-component flex w-full items-center justify-center pt-[150px]"
    :style="[
      settingByTemplate7[0].detailsProduct,
      settingByTemplate7[0].settingGeneral,
      settingByTemplate7[0].card,
      {
        '--font-style-1':
          settingByTemplate7[0].settingGeneral?.fount_1 ?? 'David libre',
      },
      {
        '--font-style-3':
          settingByTemplate7[0].settingGeneral?.fount_3 ?? 'Lora',
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
          <div v-swiper:mySwiper="swiperOption" ref="mySwiper" class="photos">
            <div class="swiper-wrapper">
              <div class="swiper-slide photos_selected">
                <img
                  :src="idCloudinary(data.fotoCloudinary, 150, 150)"
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
            <ProductSlide
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
              v-if="
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
              <div v-if="data.envioGratis == 1 && salesData.unidades > 0">
                <div class="transport-icon">
                  <TruckIcon class="mr-5 text-16" style="color: #00a650" />
                  <p>{{ $t('footer_tarifaPrecio') }}</p>
                </div>
              </div>
              <div
                v-if="spent && salesData.unidades == 0"
                class="content_card-info"
              >
                <div class="icon-card-info-sould">
                  <svg
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    enable-background="new 0 0 512 512"
                    height="50px"
                    viewBox="0 0 512 512"
                    width="50px"
                  >
                    <g>
                      <g>
                        <path
                          d="m256 116.457h-16c-13.255 0-24-10.745-24-24 0-13.255 10.745-24 24-24h16c13.255 0 24 10.745 24 24 0 13.255-10.745 24-24 24z"
                          fill="#cd3232"
                        />
                      </g>
                      <g>
                        <path
                          d="m464 460.457h-416c-17.673 0-32-14.327-32-32v-160c0-17.673 14.327-32 32-32h416c17.673 0 32 14.327 32 32v160c0 17.673-14.327 32-32 32z"
                          fill="#cd3232"
                        />
                      </g>
                      <g>
                        <path
                          d="m432 460.457h-384c-17.673 0-32-14.327-32-32v-160c0-17.673 14.327-32 32-32h384c17.673 0 32 14.327 32 32v160c0 17.673-14.327 32-32 32z"
                          fill="#ff4646"
                        />
                      </g>
                      <g>
                        <circle cx="96" cy="268.457" fill="#cd3232" r="16" />
                      </g>
                      <g>
                        <circle cx="384" cy="268.457" fill="#cd3232" r="16" />
                      </g>
                      <g>
                        <path
                          d="m384.008 277.371c-2.993 0-5.916-1.507-7.6-4.243l-119.614-194.373c-3.562-5.789-9.998-9.384-16.794-9.384s-13.232 3.596-16.794 9.384l-119.615 194.373c-2.58 4.193-8.071 5.498-12.263 2.92-4.192-2.58-5.5-8.07-2.92-12.263l119.615-194.373c6.783-11.022 19.036-17.869 31.977-17.869s25.194 6.847 31.977 17.869l119.614 194.374c2.58 4.192 1.272 9.683-2.92 12.263-1.456.895-3.069 1.322-4.663 1.322z"
                          fill="#463c4b"
                        />
                      </g>
                      <g>
                        <circle cx="240" cy="92.457" fill="#ff4646" r="24" />
                      </g>
                      <g>
                        <g>
                          <path
                            d="m72 416.457c-11.028 0-20-8.972-20-20v-8c0-2.209 1.791-4 4-4s4 1.791 4 4v8c0 6.617 5.383 12 12 12s12-5.383 12-12v-22.111c0-4.575-2.542-8.688-6.634-10.733l-14.311-7.155c-6.819-3.411-11.055-10.265-11.055-17.89v-22.111c0-11.028 8.972-20 20-20s20 8.972 20 20v8c0 2.209-1.791 4-4 4s-4-1.791-4-4v-8c0-6.617-5.383-12-12-12s-12 5.383-12 12v22.111c0 4.575 2.542 8.688 6.634 10.733l14.311 7.155c6.819 3.41 11.055 10.265 11.055 17.889v22.111c0 11.029-8.972 20.001-20 20.001z"
                            fill="#32283c"
                          />
                        </g>
                        <g>
                          <path
                            d="m128 416.457c-11.028 0-20-8.972-20-20v-80c0-11.028 8.972-20 20-20s20 8.972 20 20v80c0 11.028-8.972 20-20 20zm0-112c-6.617 0-12 5.383-12 12v80c0 6.617 5.383 12 12 12s12-5.383 12-12v-80c0-6.617-5.383-12-12-12z"
                            fill="#32283c"
                          />
                        </g>
                        <g>
                          <path
                            d="m304 416.457c-11.028 0-20-8.972-20-20v-80c0-11.028 8.972-20 20-20s20 8.972 20 20v80c0 11.028-8.972 20-20 20zm0-112c-6.617 0-12 5.383-12 12v80c0 6.617 5.383 12 12 12s12-5.383 12-12v-80c0-6.617-5.383-12-12-12z"
                            fill="#e6e6eb"
                          />
                        </g>
                        <g>
                          <path
                            d="m200 416.457h-16c-11.028 0-20-8.972-20-20v-96c0-2.209 1.791-4 4-4s4 1.791 4 4v96c0 6.617 5.383 12 12 12h16c2.209 0 4 1.791 4 4s-1.791 4-4 4z"
                            fill="#32283c"
                          />
                        </g>
                        <g>
                          <path
                            d="m232 416.457h-16c-2.209 0-4-1.791-4-4v-112c0-2.209 1.791-4 4-4h16c11.028 0 20 8.972 20 20v80c0 11.028-8.972 20-20 20zm-12-8h12c6.617 0 12-5.383 12-12v-80c0-6.617-5.383-12-12-12h-12z"
                            fill="#32283c"
                          />
                        </g>
                        <g>
                          <path
                            d="m360 416.457c-11.028 0-20-8.972-20-20v-96c0-2.209 1.791-4 4-4s4 1.791 4 4v96c0 6.617 5.383 12 12 12s12-5.383 12-12v-96c0-2.209 1.791-4 4-4s4 1.791 4 4v96c0 11.028-8.972 20-20 20z"
                            fill="#e6e6eb"
                          />
                        </g>
                        <path
                          d="m424 296.457h-32c-2.209 0-4 1.791-4 4s1.791 4 4 4h12v108c0 2.209 1.791 4 4 4s4-1.791 4-4v-108h12c2.209 0 4-1.791 4-4s-1.791-4-4-4z"
                          fill="#e6e6eb"
                        />
                      </g>
                    </g>
                  </svg>
                </div>
                <div class="text-card-info-sould">
                  {{ $t('productdetail_productoAgotado') }}
                </div>
              </div>
            </div>
            <div
              v-if="
                salesData.estado &&
                salesData.unidades > 0 &&
                salesData.precio > 0
              "
              class="content_stock"
            >
              <CheckIcon class="stock-text mr-5 text-green-600" />
              <p class="stock-text text-green-600">
                {{ $t('productdetail_stock') }}
              </p>
            </div>
            <div v-else class="content_stock">
              <window-close-icon class="stock-text mr-5 text-red-600" />
              <p class="stock-text text-red-600">
                {{ $t('productdetail_Notstock') }}
              </p>
            </div>
            <div
              v-if="data.conVariante === 1 && variantes"
              class="content-variant"
            >
              <div v-for="(variant, index) in variantes" :key="index">
                <label lang="es" for="variant name" class="text-variant">
                  {{ variant.nombre }}:
                </label>
                <SelectGroup :index="index" :variantes="variantes">
                  <option
                    v-for="item in variant.valores"
                    :key="item.option"
                    :value="item.option"
                  >
                    {{ item.option }}
                  </option>
                </SelectGroup>
              </div>
            </div>
            <div
              class="border-color max-md:bg-white-white fixed bottom-0 left-0 z-10 mt-0 flex w-full flex-row items-center justify-center border-t px-6 pb-10 pt-10 md:sticky md:z-0 md:mt-15 md:justify-start md:border-b md:border-t-0 md:px-0 md:pb-20 md:pt-0"
              :class="`bg-[${settingByTemplate7[0].detailsProduct['--background_color_1']}]`"
            >
              <div class="quantity">
                <button class="quantity_remove" @click="removeQuantity()">
                  <menos-icon class="icon" />
                </button>
                <p class="quantity_value">{{ quantityValue }}</p>
                <button class="quantity_add" @click="addQuantity()">
                  <mas-icon class="icon" />
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
              <div class="content-button">
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
                  class="btn"
                  @click="goToPayments"
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
                  {{ getBuyButtonLabel }}
                </button>
                <button v-else-if="spent" disabled class="btn">
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
                v-if="data.productosInfo.descripcionCorta"
                class="content_buy_action"
              >
                <p class="text-unidades">
                  {{ $t('productdetail_informacion') }}
                </p>
                <span class="text-garantia">
                  {{ data.productosInfo.descripcionCorta }}
                </span>
              </div>
              <div v-if="data.productosInfo.garantia" class="category_product">
                <p class="text-unidades">
                  {{ $t('productdetail_garantia') }}
                </p>
                <span class="text-garantia">
                  {{ data.productosInfo.garantia }}
                </span>
              </div>

              <div v-if="data.categoriaProducto > 0" class="category_product">
                <p class="category-beffore">
                  {{ $t('productdetail_categoria') }}:
                </p>
                <p class="category-text">
                  {{ data.categoriaProducto2.nombreCategoriaProducto }}
                </p>
              </div>
              <div v-if="data.subcategoria > 0" class="category_product">
                <p class="category-beffore">{{ $t('home_subcategory') }}:</p>
                <p class="category-text">
                  {{ data.subcategoria2.nombreSubcategoria }}
                </p>
              </div>

              <div v-if="userDropshipping.userName" class="category_product">
                <p class="category-beffore" style="margin-right: 10px">
                  {{ $t('productdetail_dropshipping') }}
                </p>
                <p class="category-text">
                  {{ userDropshipping.userName }}
                </p>
              </div>

              <p v-if="validateDimensions" class="category-beffore mt-10">
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
                  <p class="category-beffore">
                    {{ $t('productdetail_largo') }}:
                  </p>
                  <p class="category-text">{{ data.productosInfo.largo }} cm</p>
                </div>
                <div
                  v-if="
                    data.productosInfo.ancho != 0 &&
                    data.productosInfo.ancho != null &&
                    data.productosInfo.ancho != 'null'
                  "
                  class="mt-15 flex flex-row items-center"
                >
                  <p class="category-beffore">
                    {{ $t('productdetail_ancho') }}:
                  </p>
                  <p class="category-text">{{ data.productosInfo.ancho }} cm</p>
                </div>
                <div
                  v-if="
                    data.productosInfo.alto != 0 &&
                    data.productosInfo.alto != null &&
                    data.productosInfo.alto != 'null'
                  "
                  class="mt-15 flex flex-row items-center"
                >
                  <p class="category-beffore">
                    {{ $t('productdetail_alto') }}:
                  </p>
                  <p class="category-text">{{ data.productosInfo.alto }} cm</p>
                </div>
                <div
                  v-if="
                    data.productosInfo.peso > 0 &&
                    data.productosInfo.peso != null &&
                    data.productosInfo.peso != 'null'
                  "
                  class="mt-15 flex flex-row items-center"
                >
                  <p class="category-beffore">
                    {{ $t('productdetail_Peso') }}:
                  </p>
                  <p class="category-text">{{ data.productosInfo.peso }} Kg</p>
                </div>
              </div>
              <div class="content-shared">
                <p class="text-unidades" style="margin-right: 10px">
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
            </div>
          </div>
        </div>
      </div>
      <div class="features">
        <KoDescription
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
          :setting-general="settingByTemplate7[0].settingGeneral"
          :setting-card-products="settingByTemplate7[0].card"
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
  name: 'K07ProductDetail',
  components: {
    PluginAddi: () => import('@/components/_commonComponent/addi.vue'),
    SelectGroup: () => import('../_commonComponent/select-group.vue'),
    ProductSlide: () => import('../_commonComponent/zoom.vue'),
    Zoom: () => import('../_commonComponent/zoom-img.vue'),
    Skeleton: () => import('../_commonComponent/skeleton-detail.vue'),
    KoDescription: () => import('./_productdetails/K07description-product.vue'),
    KoSuggestProduct: () =>
      import('../_commonComponent/suggestions-producto.vue'),
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
    settingByTemplate7: {
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
      suggestedProducts: [],
      shippingProduct: '',
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
    // productsCart() {
    //   return this.$store.state.productsCart
    // },
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
    // productsCart() {
    //   if (this.dataStore.id === 7454) {
    //     for (const [
    //       index,
    //       productCart,
    //     ] of this.$store.state.productsCart.entries()) {
    //       if (this.data.id == productCart.id) {
    //         this.productIndexCart = index
    //         if (this.salesData?.unidades <= productCart.cantidad) {
    //           this.spent = true
    //         }
    //       }
    //     }
    //   }
    // },
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

      // if (this.dataStore.id != 1559) {
      this.$router.push('/productos')
      // }
      // else {
      //   for (const [
      //     index,
      //     productCart,
      //   ] of this.$store.state.productsCart.entries()) {
      //     if (this.data.id == productCart.id) {
      //       this.productIndexCart = index
      //     }
      //   }
      // }
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
.wrapper-component {
  background-color: var(--background_color_1);
}
.border-color {
  border-color: var(--color_border);
}
.wrapper-left {
  flex: 2;
  width: 100%;
  display: flex;
  flex-direction: row;
  padding-bottom: 10px;
}
.photos_responsive {
  display: none;
}
.photos {
  display: flex;
  margin-right: 30px;
  max-height: 430px;
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
  color: var(--hover_card);
}
.photos_selected {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  max-height: 100px;
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
  max-width: 650px;
  height: 450px;
  min-height: 450px;
  width: 100%;
  margin-right: 25px;
}
.photo_main {
  max-width: 645px;
  max-height: 430px;
  width: 100%;
  height: 430px;
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
  border-left: 1px solid var(--color_border);
}
.content-right {
  margin-left: 20px;
}
.text-name {
  color: var(--color_title);
  font-family: var(--font-style-1);
  @apply mb-20 text-34 font-normal leading-tight;
}
.text-marca {
  color: var(--color_description);
  @apply text-16 font-normal;
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
  font-weight: 600;
  font-size: 22px;
  line-height: 1.2;
  /* font-family: 'Lora' !important; */
  font-family: var(--font-style-3);
  margin-bottom: 20px;
  color: var(--color_price);
}
.content_stock {
  @apply flex w-full flex-row items-center justify-start;
}
.icon-stock {
  fill: var(--color_title);
  margin-right: 5px;
}

.stock-text {
  font-weight: 600;
  font-size: 14px;
  line-height: 1.2;
  font-family: var(--font-style-3);
  /* font-family: 'Lora' !important; */
  /* color: var(--color_title); */
}
.card-descuento {
  font-size: 12px;
  color: white;
  background: #35dd8d;
  border-radius: 3px;
  padding: 0px 5px;
  margin-top: 5px;
}
.content-text-desc {
  margin-top: 10px;
  margin-bottom: 10px;
}
.text-desc {
  text-decoration-color: currentcolor;
  text-decoration-style: solid;
  text-decoration-line: none;
  font-size: 14px;
  font-weight: normal;
  color: var(--color_title);
  line-height: 1.5;
  text-decoration: none;
}
.content-variant {
  margin-top: 15px;
  margin-bottom: 30px;
}
.text-variant {
  font-size: 14px;
  font-weight: bold;
  color: var(--color_title);
}
.text-unidades {
  font-weight: 600;
  font-size: 14px;
  /* font-family: 'Lora' !important; */
  font-family: var(--font-style-3);
  color: var(--color_title);
}
.text-garantia {
  font-size: 14px;
  font-weight: bold;
  color: var(--color_description);
  margin-left: 5px;
  /* font-family: 'Lora' !important; */
  font-family: var(--font-style-3);
}
.content_buy_action {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
}
.transport-icon {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  margin-bottom: 10px;
  color: #00a650;
  /* font-family: 'Lora' !important; */
  font-family: var(--font-style-3);
}
.content_card-info {
  margin-bottom: 10px;
  @apply flex w-full flex-row items-end justify-start;
}
.text-card-info-sould {
  color: #ed2353;
  margin-left: 8px;
  font-weight: bold;
  /* line-height: 1.2; */
  font-size: 16px;
  /* font-family: 'Lora' !important; */
  font-family: var(--font-style-3);
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
.card-info-2 {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #35dd8d;
  padding: 1px 4px;
  border-radius: 5px;
  color: #333;
  margin-right: 10px;
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 10px;
}
.item-info-product {
  margin-top: 10px;
}
.content-button {
  display: flex;
  flex-direction: row;
  margin-left: 15px;
}
.category_product {
  margin-top: 15px;
  @apply flex w-full flex-row items-center justify-start;
}
.category-beffore {
  font-weight: 600;
  line-height: 1.2;
  font-size: 14px;
  /* font-family: 'Lora' !important; */
  font-family: var(--font-style-3);
  color: var(--color_title);
}
.category-text {
  margin-left: 5px;
  font-weight: 400;
  line-height: 1.2;
  font-size: 14px;
  /* font-family: 'Lora' !important; */
  font-family: var(--font-style-3);
  color: var(--color_description);
}
.content-shared {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-top: 10px;
}
.btn-facebook {
  color: #1877f2;
  background-color: transparent;
  border-radius: 5px;
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
.content-float-info {
  z-index: 3;
  width: 100%;
  max-width: 385px;
  padding-top: 10px;
  flex-direction: column;
  display: none;
  background: #efefef !important;
  transition: all 2s ease-out;
  border-radius: 5px;
}
.whatsapp {
  fill: #27d367;
  width: 30px;
  cursor: pointer;
  margin-left: 20px;
}
.btn {
  font-family: var(--font-style-3);
  color: var(--color_text_btn);
  border-radius: var(--radius_btn);
  border: solid 2px var(--color_background_btn);
  background-color: var(--color_background_btn);
  padding: 12px 20px;
  font-size: 13px;
  line-height: 18px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  transition:
    color 0.25s ease,
    background-color 0.25s ease;
  @apply flex text-center;
}
.btn:hover {
  color: var(--hover_text);
  border: solid 2px var(--hover_card);
  background-color: var(--hover_card);
}
.quantity {
  display: flex;
  flex-direction: row;
  position: relative;
  box-sizing: border-box;
  max-width: 240px;
}
.text-quantity {
  font-size: 14px;
  font-weight: bold;
  /* color: var(--color_subtext); */
  color: var(--color_description);
  margin-right: 15px;
  align-self: center;
}
.quantity_remove {
  border: 1px solid var(--color_border);
  border-top-left-radius: var(--radius_btn);
  border-bottom-left-radius: var(--radius_btn);
  background: transparent;
  width: 30px;
  height: 42px;
}
.quantity_value {
  font-size: 14px;
  color: var(--color_title);
  border: 1px solid var(--color_border);
  width: 30px;
  height: 42px;
  border-style: solid none solid none;
  background: transparent;
  justify-content: center;
  display: flex;
  align-items: center;
}
.quantity_add {
  border: 1px solid var(--color_border);
  border-top-right-radius: var(--radius_btn);
  border-bottom-right-radius: var(--radius_btn);
  background: transparent;
  width: 30px;
  height: 42px;
}
.quantity_add:hover {
  background: var(--hover_card);
}
.quantity_remove:hover {
  background: var(--hover_card);
}
.icon {
  font-size: 16px;
  color: var(--color_price);
}
.quantity_add:hover .icon {
  color: var(--hover_text);
}
.quantity_remove:hover .icon {
  color: var(--hover_text);
}
.features {
  width: 100%;
  display: flex;
  /* border-top: 1px solid var(--color_border); */
  border-top: 1px solid var(--color_border);
}

@media (max-width: 1250px) {
  .photo_main {
    width: 600px;
  }
}
@media (max-width: 1185px) {
  .photo_main {
    width: 500px;
  }
}
@media (max-width: 1035px) {
  .photo_main {
    width: 450px;
  }
}
@media (max-width: 960px) {
  .photo_main {
    width: 400px;
  }
}
@media (max-width: 890px) {
  .photo_main {
    width: 350px;
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

  .features {
    border-top: none;
  }
}
@media (max-width: 600px) {
  /* .container-productDetail {
    padding: 0px;
  } */
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
