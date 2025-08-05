<template>
  <div
    class="wrapper-productDetail"
    :style="[
      settingByTemplate10[0].detailsProduct,
      settingByTemplate10[0].settingGeneral,
      {
        '--font-style-1':
          settingByTemplate10[0]?.settingGeneral?.fount_1 ?? 'Roboto',
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
      <div class="banner-detail" id="BgProductlistF">
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
      <div class="product-content">
        <div class="flex w-full items-center justify-center">
          <productSlide
            class="h-full w-full"
            :photos="data.productosFotos"
            :photo="data.fotoCloudinary"
            :id-you-tube="idYouTube"
          />
        </div>
        <div class="right">
          <div class="content-items-right">
            <div class="content-name">
              <p class="text-name">{{ data.nombre }}</p>
            </div>
            <!-- <p v-if="data.productosInfo.marca" class="txt-subtext">
              {{ data.productosInfo.marca }}
            </p> -->
            <div class="content-networks">
              <a
                v-if="dataStore.redes.facebook != null"
                class="social-networks"
                target="_blank"
                rel="noreferrer noopener"
                :href="dataStore.redes.facebook"
              >
                <i>
                  <svg
                    class="facebook-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    height="18px"
                    width="18px"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="m15.997 3.985h2.191v-3.816c-.378-.052-1.678-.169-3.192-.169-3.159 0-5.323 1.987-5.323 5.639v3.361h-3.486v4.266h3.486v10.734h4.274v-10.733h3.345l.531-4.266h-3.877v-2.939c.001-1.233.333-2.077 2.051-2.077z"
                    />
                  </svg>
                </i>
              </a>
              <a
                v-if="dataStore.redes.twitter != null"
                class="social-networks"
                target="_blank"
                rel="noreferrer noopener"
                :href="dataStore.redes.twitter"
              >
                <svg
                  id="Capa_1"
                  class="twitter-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  version="1.1"
                  x="0px"
                  y="0px"
                  fill="currentColor"
                  height="18px"
                  width="18px"
                  viewBox="0 0 512 512"
                  style="enable-background: new 0 0 512 512"
                  xml:space="preserve"
                >
                  <g>
                    <g>
                      <path
                        d="M512,97.248c-19.04,8.352-39.328,13.888-60.48,16.576c21.76-12.992,38.368-33.408,46.176-58.016    c-20.288,12.096-42.688,20.64-66.56,25.408C411.872,60.704,384.416,48,354.464,48c-58.112,0-104.896,47.168-104.896,104.992    c0,8.32,0.704,16.32,2.432,23.936c-87.264-4.256-164.48-46.08-216.352-109.792c-9.056,15.712-14.368,33.696-14.368,53.056    c0,36.352,18.72,68.576,46.624,87.232c-16.864-0.32-33.408-5.216-47.424-12.928c0,0.32,0,0.736,0,1.152    c0,51.008,36.384,93.376,84.096,103.136c-8.544,2.336-17.856,3.456-27.52,3.456c-6.72,0-13.504-0.384-19.872-1.792    c13.6,41.568,52.192,72.128,98.08,73.12c-35.712,27.936-81.056,44.768-130.144,44.768c-8.608,0-16.864-0.384-25.12-1.44    C46.496,446.88,101.6,464,161.024,464c193.152,0,298.752-160,298.752-298.688c0-4.64-0.16-9.12-0.384-13.568    C480.224,136.96,497.728,118.496,512,97.248z"
                      />
                    </g>
                  </g>
                </svg>
              </a>
              <a
                v-if="dataStore.redes.instagram != null"
                class="social-networks"
                target="_blank"
                rel="noreferrer noopener"
                :href="dataStore.redes.instagram"
              >
                <svg
                  class="instagram-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  height="18px"
                  width="18px"
                  fill="currentColor"
                  viewBox="0 0 511 511.9"
                >
                  <path
                    d="m510.949219 150.5c-1.199219-27.199219-5.597657-45.898438-11.898438-62.101562-6.5-17.199219-16.5-32.597657-29.601562-45.398438-12.800781-13-28.300781-23.101562-45.300781-29.5-16.296876-6.300781-34.898438-10.699219-62.097657-11.898438-27.402343-1.300781-36.101562-1.601562-105.601562-1.601562s-78.199219.300781-105.5 1.5c-27.199219 1.199219-45.898438 5.601562-62.097657 11.898438-17.203124 6.5-32.601562 16.5-45.402343 29.601562-13 12.800781-23.097657 28.300781-29.5 45.300781-6.300781 16.300781-10.699219 34.898438-11.898438 62.097657-1.300781 27.402343-1.601562 36.101562-1.601562 105.601562s.300781 78.199219 1.5 105.5c1.199219 27.199219 5.601562 45.898438 11.902343 62.101562 6.5 17.199219 16.597657 32.597657 29.597657 45.398438 12.800781 13 28.300781 23.101562 45.300781 29.5 16.300781 6.300781 34.898438 10.699219 62.101562 11.898438 27.296876 1.203124 36 1.5 105.5 1.5s78.199219-.296876 105.5-1.5c27.199219-1.199219 45.898438-5.597657 62.097657-11.898438 34.402343-13.300781 61.601562-40.5 74.902343-74.898438 6.296876-16.300781 10.699219-34.902343 11.898438-62.101562 1.199219-27.300781 1.5-36 1.5-105.5s-.101562-78.199219-1.300781-105.5zm-46.097657 209c-1.101562 25-5.300781 38.5-8.800781 47.5-8.601562 22.300781-26.300781 40-48.601562 48.601562-9 3.5-22.597657 7.699219-47.5 8.796876-27 1.203124-35.097657 1.5-103.398438 1.5s-76.5-.296876-103.402343-1.5c-25-1.097657-38.5-5.296876-47.5-8.796876-11.097657-4.101562-21.199219-10.601562-29.398438-19.101562-8.5-8.300781-15-18.300781-19.101562-29.398438-3.5-9-7.699219-22.601562-8.796876-47.5-1.203124-27-1.5-35.101562-1.5-103.402343s.296876-76.5 1.5-103.398438c1.097657-25 5.296876-38.5 8.796876-47.5 4.101562-11.101562 10.601562-21.199219 19.203124-29.402343 8.296876-8.5 18.296876-15 29.398438-19.097657 9-3.5 22.601562-7.699219 47.5-8.800781 27-1.199219 35.101562-1.5 103.398438-1.5 68.402343 0 76.5.300781 103.402343 1.5 25 1.101562 38.5 5.300781 47.5 8.800781 11.097657 4.097657 21.199219 10.597657 29.398438 19.097657 8.5 8.300781 15 18.300781 19.101562 29.402343 3.5 9 7.699219 22.597657 8.800781 47.5 1.199219 27 1.5 35.097657 1.5 103.398438s-.300781 76.300781-1.5 103.300781zm0 0"
                  />
                  <path
                    d="m256.449219 124.5c-72.597657 0-131.5 58.898438-131.5 131.5s58.902343 131.5 131.5 131.5c72.601562 0 131.5-58.898438 131.5-131.5s-58.898438-131.5-131.5-131.5zm0 216.800781c-47.097657 0-85.300781-38.199219-85.300781-85.300781s38.203124-85.300781 85.300781-85.300781c47.101562 0 85.300781 38.199219 85.300781 85.300781s-38.199219 85.300781-85.300781 85.300781zm0 0"
                  />
                  <path
                    d="m423.851562 119.300781c0 16.953125-13.746093 30.699219-30.703124 30.699219-16.953126 0-30.699219-13.746094-30.699219-30.699219 0-16.957031 13.746093-30.699219 30.699219-30.699219 16.957031 0 30.703124 13.742188 30.703124 30.699219zm0 0"
                  />
                </svg>
              </a>
              <a
                v-if="dataStore.redes.youtube != null"
                class="social-networks"
                target="_blank"
                rel="noreferrer noopener"
                :href="dataStore.redes.youtube"
              >
                <svg
                  class="youtube-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  height="19px"
                  width="19px"
                  fill="currentColor"
                  viewBox="-21 -117 682.66672 682"
                >
                  <path
                    d="m626.8125 64.035156c-7.375-27.417968-28.992188-49.03125-56.40625-56.414062-50.082031-13.703125-250.414062-13.703125-250.414062-13.703125s-200.324219 0-250.40625 13.183593c-26.886719 7.375-49.03125 29.519532-56.40625 56.933594-13.179688 50.078125-13.179688 153.933594-13.179688 153.933594s0 104.378906 13.179688 153.933594c7.382812 27.414062 28.992187 49.027344 56.410156 56.410156 50.605468 13.707031 250.410156 13.707031 250.410156 13.707031s200.324219 0 250.40625-13.183593c27.417969-7.378907 49.03125-28.992188 56.414062-56.40625 13.175782-50.082032 13.175782-153.933594 13.175782-153.933594s.527344-104.382813-13.183594-154.460938zm-370.601562 249.878906v-191.890624l166.585937 95.945312zm0 0"
                  />
                </svg>
              </a>
            </div>
            <div class="content-price">
              <p
                v-if="
                  salesData.estado &&
                  salesData.unidades > 0 &&
                  salesData.precio > 0
                "
                class="text-stock mb-3"
                style="color: #92bb35"
              >
                {{ $t('productdetail_stock') }}
              </p>
              <p v-else class="text-stock mb-3" style="color: #ed2353">
                {{ $t('productdetail_Notstock') }}
              </p>
              <p
                v-if="spent && salesData.unidades == 0"
                class="text-stock mb-3"
                style="color: #ed2353"
              >
                {{ $t('productdetail_productoAgotado') }}
              </p>
              <p
                v-show="
                  data.productosInfo.tagPromocion == 1 &&
                  data.productosInfo.promocionValor &&
                  salesData.precio
                "
                class="text-promo"
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
              <div class="flex flex-row items-center justify-start">
                <p v-show="salesData.precio" class="text-price">
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
                  class="card-discont"
                >
                  {{ data.productosInfo.promocionValor }}% De Descuento
                </p>
              </div>
              <p
                v-if="data.envioGratis == 1"
                class="text-stock mt-5"
                style="color: #00a650"
              >
                <TruckIcon class="mr-5 text-16" />
                {{ $t('footer_tarifaPrecio') }}
              </p>
            </div>
            <PluginAddi
              :more-details="false"
              :status="dataStore.medioPagos.addi"
              :price="salesData"
              :data-store="dataStore"
            />
            <!-- Variantes de producto -->
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
            <div class="content-direction-btns">
              <div
                v-if="data.productosInfo.descripcionCorta"
                class="mb-5 flex flex-col items-start"
              >
                <div class="txt-tittle-quantity">
                  {{ $t('productdetail_informacion') }}
                </div>
                <p class="txt-subtext">
                  {{ data.productosInfo.descripcionCorta }}
                </p>
              </div>
              <div
                v-if="data.categoriaProducto > 0"
                class="mb-5 flex flex-col items-start"
              >
                <div class="txt-tittle-quantity">
                  {{ $t('productdetail_categoria') }}
                </div>
                <p class="txt-subtext">
                  {{ data.categoriaProducto2.nombreCategoriaProducto }}
                </p>
              </div>
              <div
                v-if="data.subcategoria > 0"
                class="mb-5 flex flex-col items-start"
              >
                <div class="txt-tittle-quantity">
                  {{ $t('home_subcategory') }}
                </div>
                <p class="txt-subtext">
                  {{ data.subcategoria2.nombreSubcategoria }}
                </p>
              </div>
              <div
                v-if="data.productosInfo.garantia"
                class="mb-5 flex flex-col items-start"
              >
                <div class="txt-tittle-quantity">
                  {{ $t('productdetail_garantia') }}
                </div>
                <p class="txt-subtext">
                  {{ data.productosInfo.garantia }}
                </p>
              </div>
              <p v-if="validateDimensions" class="txt-tittle-quantity">
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
                  class="flex flex-col items-start"
                >
                  <p class="txt-tittle-quantity">
                    {{ $t('productdetail_largo') }}:
                  </p>
                  <p class="txt-subtext">{{ data.productosInfo.largo }} cm</p>
                </div>
                <div
                  v-if="
                    data.productosInfo.ancho != 0 &&
                    data.productosInfo.ancho != null &&
                    data.productosInfo.ancho != 'null'
                  "
                  class="flex flex-col items-start"
                >
                  <p class="txt-tittle-quantity">
                    {{ $t('productdetail_ancho') }}:
                  </p>
                  <p class="txt-subtext">{{ data.productosInfo.ancho }} cm</p>
                </div>
                <div
                  v-if="
                    data.productosInfo.alto != 0 &&
                    data.productosInfo.alto != null &&
                    data.productosInfo.alto != 'null'
                  "
                  class="flex flex-col items-start"
                >
                  <p class="txt-tittle-quantity">
                    {{ $t('productdetail_alto') }}:
                  </p>
                  <p class="txt-subtext">{{ data.productosInfo.alto }} cm</p>
                </div>
                <div
                  v-if="
                    data.productosInfo.peso > 0 &&
                    data.productosInfo.peso != null &&
                    data.productosInfo.peso != 'null'
                  "
                  class="flex flex-col items-start"
                >
                  <p class="txt-tittle-quantity">
                    {{ $t('productdetail_Peso') }}:
                  </p>
                  <p class="txt-subtext">{{ data.productosInfo.peso }} Kg</p>
                </div>
              </div>
              <div
                v-if="userDropshipping.userName"
                class="my-8 flex w-full flex-row items-center"
              >
                <p class="text-variant" style="margin-right: 10px">
                  {{ $t('productdetail_dropshipping') }}
                </p>
                <p class="txt-subtext">
                  {{ userDropshipping.userName }}
                </p>
              </div>
              <div
                class="border-color fixed bottom-0 left-0 z-10 mt-0 flex w-full flex-row items-center justify-center gap-x-4 border-t px-6 pb-10 pt-10 md:sticky md:z-0 md:mt-15 md:justify-start md:border-b md:border-t-0 md:px-0 md:pb-20 md:pt-0"
                :style="`background-color: ${settingByTemplate10[0].detailsProduct['--background_color_1']};`"
              >
                <div
                  class="content-quantity-boxes"
                  :class="{ disabled: !salesData.estado }"
                >
                  <div class="txt-tittle-quantity hidden md:flex">
                    Cantidad:
                  </div>
                  <div class="box-quantity">
                    <p class="txt-subtext">{{ quantityValue }}</p>
                  </div>
                  <div class="box-quantity-btns">
                    <div class="btn-quantity btn1" @click="addQuantity()">
                      <FlechaUp-icon class="text-icon" />
                    </div>
                    <div class="btn-quantity btn2" @click="removeQuantity()">
                      <Flechadown-icon class="text-icon" />
                    </div>
                  </div>
                  <div
                    v-if="maxQuantityValue == quantityValue"
                    class="absolute -top-32 left-50 w-[130px] rounded-6 border border-yellow-500 bg-yellow-300 px-2 py-3 text-center"
                  >
                    <span class="text-14 text-black">
                      {{ $t('cart_ultimaUnidad') }}
                    </span>
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
          :setting-general="settingByTemplate10[0].settingGeneral"
          :setting-card-products="settingByTemplate10[0].cardProduct"
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
  name: 'Ko10ProductDetail',
  components: {
    PluginAddi: () => import('@/components/_commonComponent/addi.vue'),
    Skeleton: () => import('../_commonComponent/skeleton-detail.vue'),
    ProductSlide: () => import('../_commonComponent/zoom.vue'),
    SelectGroup: () => import('../_commonComponent/select-group.vue'),
    KoSuggestProduct: () =>
      import('../_commonComponent/suggestions-producto.vue'),
    OptionTab: () => import('../_commonComponent/opt-tab-left.vue'),
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
    settingByTemplate10: {
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
      idYouTube: '',
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
        title: '',
        description: '',
        quote: '',
      },
      sharingFacebook: '',
      userDropshipping: {
        userId: '',
        userName: '',
      },
      networks: [
        {
          network: 'facebook',
          icon: 'facebook-icon',
          color: '#1877f2',
        },
        {
          network: 'whatsapp',
          icon: 'whatsapp-icon',
          color: '#25d366',
        },
        {
          network: 'twitter',
          icon: 'twitter-icon',
          color: '#00acee',
        },
      ],
    }
  },
  head() {
    return this.generateHead()
  },
  computed: {
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
      if (value > this.maxQuantityValue) {
        this.quantityValue = this.maxQuantityValue
      }
    },
    settingByTemplate10() {
      this.setBg(
        this.settingByTemplate10[0]?.detailsProduct?.visible_bg ? 1 : 2,
      )
    },
    'dataStore.tienda'() {
      this.links[0].link = this.dataStore.redes.facebook
      this.links[1].link = this.dataStore.redes.twitter
      this.links[2].link = this.dataStore.redes.instagram
      this.links[3].link = this.dataStore.redes.youtube
      this.links[4].link = this.dataStore.redes.tiktok
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
    this.setBg(this.settingByTemplate10[0]?.detailsProduct?.visible_bg ? 1 : 2)

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
    setBg(value) {
      if (this.settingByTemplate10) {
        if (!this.mobileCheck()) {
          var imagen = document.getElementById('BgProductlistF')
          if (imagen && imagen.style) {
            if (value == 1) {
              if (this.settingByTemplate10[0].detailsProduct.url_img_bg) {
                imagen.style.backgroundImage = `url(${this.settingByTemplate10[0].detailsProduct.url_img_bg})`
              } else {
                imagen.style.backgroundImage = `url(https://res.cloudinary.com/brahyanr10/image/upload/v1614233821/Temp10/Productos/bg-beagrumb_gxvk1i.jpg)`
              }
            } else if (value == 2) {
              imagen.style.backgroundImage = ''
            }
          }
        }
      }
    },
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
          this.idYouTube = id[1]
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
.wrapper-productDetail {
  background: var(--background_color_1);
  @apply flex w-full items-center justify-center;
  padding-bottom: 40px;
}
.container-productDetail-loading {
  height: calc(100vh - 420px);
  max-width: 1400px;
  padding: 50px 30px 30px 30px;
  background: var(--background_color_1);
  @apply flex w-full flex-col items-center justify-center;
}
.container-productDetail {
  @apply flex h-full w-full flex-col items-center justify-center;
}
.product-content {
  @apply flex w-full;
}
.content-variant {
  @apply mb-8 flex w-auto flex-col items-start justify-center;
}
.content-price,
.right {
  @apply flex w-full flex-col items-start justify-start;
}
.content-category,
.content-name,
.content-addCart {
  @apply flex w-full flex-row items-center justify-start;
}
.quantity {
  @apply flex flex-row items-center justify-center;
}
.section-suggesProduct {
  background: var(--background_color_1);
  @apply mt-40 w-full;
}
.content-quantity-boxes {
  @apply flex items-center justify-start;
}
.txt-tittle-quantity {
  font-size: 16px;
  color: var(--color_subtext);
  min-width: 70px;
  @apply mr-10 w-auto font-bold;
}
.txt-subtext {
  font-size: 16px;
  color: var(--color_subtext);

  @apply w-auto;
}
.box-quantity {
  color: var(--color_subtext);
  background-color: transparent;
  border: 1px solid var(--border);
  @apply flex h-50 w-75 items-center justify-center text-center;
}
.box-quantity-btns {
  color: var(--color_subtext);
  background-color: transparent;
  border: 1px solid var(--border);
  @apply flex h-50 w-25 flex-col items-center justify-center text-center;
}
.btn-quantity {
  color: var(--color_subtext);
  background-color: transparent;
  border-color: var(--border);
  @apply flex h-25 w-25 items-center justify-center border-r border-t;
}
.material-design-icon > .material-design-icon__svg {
  height: 1em;
  width: 1em;
  fill: var(--color_icon);
  position: absolute;
  bottom: 0em;
}
.content-networks {
  @apply mb-30 flex w-auto flex-row items-start justify-start;
}

.social-networks {
  @apply mr-20 flex w-auto flex-row items-start justify-start;
}
.facebook-icon,
.twitter-icon,
.instagram-icon,
.youtube-icon {
  fill: var(--color_icon);
  @apply cursor-pointer transition-all duration-0.2 ease-in;
}
.facebook-icon:hover {
  color: #eb7025;
  fill: #eb7025;
  transform: scale(1.5);
  @apply transition-all duration-0.2 ease-in;
}
.twitter-icon:hover {
  color: #eb7025;
  fill: #eb7025;
  transform: scale(1.5);
  @apply transition-all duration-0.2 ease-in;
}
.instagram-icon:hover {
  color: #eb7025;
  fill: #eb7025;
  transform: scale(1.5);
  @apply transition-all duration-0.2 ease-in;
}
.youtube-icon:hover {
  color: #eb7025;
  fill: #eb7025;
  transform: scale(1.5);
  @apply transition-all duration-0.2 ease-in;
}
.card-discont {
  color: var(--color_text_btn);
  background-color: var(--color_background_btn);
  padding: 2px 10px;
  margin-left: 5px;
  margin-right: 5px;
  font-size: 16px;
}
@screen sm {
  .product-content {
    @apply mt-20 w-9/0 flex-col items-center justify-center;
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
    @apply mb-10;
  }
  .content-options {
    @apply flex;
  }
  .tab {
    @apply mt-40 flex w-9/0;
  }
  .content-cart {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #f4f4f4;
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
  .text-addCart {
    color: var(--color_text_btn);
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
    transition: all 0.15s ease-in;
    @apply flex h-54 w-full flex-row items-center justify-center;
  }
  .btn:hover {
    background-color: var(--hover_Bg_btn);
    color: var(--hover_text_btn);
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
    background: #f4f4f4;
  }
  .text-name {
    margin-top: var(--marginTopTitle);
    color: var(--color_text);
    font-size: var(--fontSizeTitle);
    font-weight: var(--fontWeighTitle);
    letter-spacing: 0px;
    line-height: 1;
    font-family: var(--font-style-1) !important;
    @apply uppercase;
  }
  .text-price {
    color: var(--color_price);
    font-size: var(--fontSizePrice);
    font-weight: var(--fontWeighPrice);
    line-height: 1;
    letter-spacing: -0.03em;
    font-family: var(--font-style-1) !important;
  }
  .text-promo {
    font-size: 15px;
    font-weight: bold;
    text-decoration: line-through;
    color: var(--color_subtext);
    font-family: var(--font-style-1) !important;
  }
  .text-stock {
    font-family: var(--font-style-1) !important;
    font-size: 14px;
    @apply font-semibold;
  }
  .text-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 34px;
    cursor: pointer;
  }
  .text-quantity_value {
    padding: 0 35px;
    border: none;
    font-size: 21px;
    @apply flex w-full items-center justify-center text-center font-semibold;
  }
  .text-addCart {
    font-family: var(--font-style-1) !important;
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
    font-weight: 600;
    transition: all 0.6s ease-in-out;
    font-family: var(--font-style-1) !important;
  }
  .text-option {
    color: var(--color_subtext);
    font-size: 16px;
    font-weight: 600;
    transition: all 0.6s ease-in-out;
    font-family: var(--font-style-1) !important;
  }
  .banner-detail {
    @apply hidden;
  }
  .section-suggesProduct {
    @apply w-9/0;
  }
  /* ------------------- DOWN ----------------------- */
}
@media (min-width: 425px) {
  .content-direction-btns {
    @apply flex flex-col;
  }
}
@media (min-width: 480px) {
  .content-cart {
    @apply mr-2 w-4/0;
  }
  .video {
    height: 250px;
  }
}
@screen md {
  .banner-detail {
    height: 220px;
    background-color: var(--background_color_2);
    @apply flex w-full items-center justify-items-center bg-cover bg-center bg-no-repeat;
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
    color: #eb7025;
    transition: all 0.25s ease;
  }
  .s2:hover {
    color: #eb7025;
    transition: all 0.25s ease;
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
  .tab {
    @apply w-9/5;
  }
  .product-content {
    @apply mt-30 grid w-9/5 grid-cols-2 items-start justify-start gap-x-4;
  }
  /* .right {
    @apply mt-40;
  } */
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
  .content-free-shipping {
    width: 100%;
  }
  .product-content {
    @apply gap-x-16;
  }
  .content-direction-btns {
    @apply flex flex-col;
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
@media (min-width: 1350px) {
  .video {
    height: 480px;
  }
}
@media (min-width: 1400px) {
  .video {
    height: 520px;
  }
  .product-content,
  .tab,
  .section-suggesProduct {
    max-width: 1400px;
  }
}
</style>
