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
    <div v-if="loading" class="container-productDetail-loading"></div>
    <div v-else class="container-productDetail">
      <div class="banner-detail">
        <div class="crumb">
          <nuxt-link to="/productosHoko">
            <p class="txt-crumb s1">{{ $t('header_inicio') }}</p>
          </nuxt-link>
          <p class="separatorCrumb">/</p>
          <p v-if="data.name" class="txt-crumb s2">
            {{ data.name }}
          </p>
        </div>
      </div>
      <div class="empty"></div>
      <div class="product-content">
        <div class="left">
          <div class="wrapper-left">
            <div ref="mySwiper" v-swiper:mySwiper="swiperOption" class="photos">
              <div v-if="data.images" class="swiper-wrapper">
                <div
                  v-for="(foto, itemsfoto) in data.images"
                  :key="itemsfoto"
                  class="swiper-slide photos_selected"
                  @click="selectedPhoto(foto)"
                >
                  <img class="img-list" v-lazy="foto" alt="Product Img" />
                </div>
              </div>
              <!-- <div class="swiper-prev" v-if="data.images.length > 3">
                  <FlechaUp-icon class="icon-swiper" />
                </div>
                <div class="swiper-next" v-if="data.images.length > 3">
                  <Flechadown-icon class="icon-swiper" />
                </div> -->
            </div>
            <div class="wrapper-photo_main">
              <div class="photo_main">
                <img
                  v-lazy="selectPhotoUrl"
                  class="photo_main"
                  alt="Product Zoom"
                />
              </div>
            </div>
            <div class="photos_responsive">
              <ProductSlide :photos="data.images" />
            </div>
          </div>
        </div>
        <div
          class="right"
          :style="`margin-top:${settingByTemplate11[0].detailsProduct['--marginTopTitle']};`"
        >
          <div class="content-items-right">
            <div class="content-name">
              <p
                class="text-name"
                :style="`font-size:${settingByTemplate11[0].detailsProduct['--fontSizeTitle']}; font-weight:${settingByTemplate11[0].detailsProduct['--fontWeighTitle']};`"
              >
                {{ data.name }}
              </p>
            </div>
            <div class="content-price">
              <p
                v-show="data.price"
                class="text-price"
                :style="`font-size:${settingByTemplate11[0].detailsProduct['--fontSizePrice']}; font-weight:${settingByTemplate11[0].detailsProduct['--fontWeighPrice']};`"
              >
                {{ data.price | currency }}
              </p>
            </div>
            <div class="empty"></div>
            <div class="content-stock">
              <p class="stock-text-1">{{ $t('productdetail_stock') }}:</p>
              <p v-if="!spent" class="stock-text-2">
                {{ data.stock.amount }} Unidades
              </p>
              <p v-else class="stock-text-2">
                {{ $t('home_cardAgotado') }}
              </p>
            </div>
            <div class="empty"></div>

            <div class="w-full flex flex-row items-center">
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
            <div class="content-direction-btns mt-10">
              <div class="content-quantity-boxes">
                <div class="box-quantity">
                  <p class="txt-quantity">
                    {{ quantityValue }}
                  </p>
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
                  v-if="!spent"
                  id="AddToCartTag"
                  ref="colorBtn"
                  class="btn"
                  @click="GoPayments"
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
                  <p class="text-addCart">
                    {{ $t('home_comprarAhora') }}
                  </p>
                </button>
                <button v-else-if="spent" disabled class="btn-disabled">
                  <p class="text-addCart">
                    {{ $t('home_cardAgotado') }}
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="tab mb-20">
        <K011-optTabHoko
          :data-store="dataStore"
          :data="data.stock.product"
          :price="salesData"
        />
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import idCloudinary from '@/mixins/idCloudinary'
import mobileCheck from '@/mixins/mobileCheck'
export default {
  name: 'Ko11ProductDetailHoko',
  components: {
    K011OptTabHoko: () => import('./_productdetails/K011-OptTabHoko.vue'),
    ProductSlide: () => import('./_productdetails/productSlideHoko.vue'),
  },
  filters: {
    currency(value) {
      if (value) {
        return `$${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`
      }
      return ''
    },
    toLowerCase(value) {
      if (value) {
        return value.toLowerCase()
      }
      return ''
    },
  },
  mixins: [idCloudinary, mobileCheck],
  props: {
    dataStore: {
      type: Object,
      required: true,
    },
    whatsapp: {
      type: String,
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
      data: {},
      maxQuantityValue: 1,
      quantityValue: 1,
      loading: true,
      spent: false,
      selectPhotoUrl: '',
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
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    },
    dataHoko() {
      return this.$store.state.dataHoko
    },
  },
  watch: {
    quantityValue(value) {
      if (value > this.maxQuantityValue) {
        this.quantityValue = this.maxQuantityValue
      }
    },
  },
  mounted() {
    this.asyncauthToken()
  },
  methods: {
    redirectWP() {
      let baseUrlMovil = 'https://api.whatsapp.com/send?'
      let baseUrlPc = 'https://web.whatsapp.com/send?'
      let urlProduct = window.location.href
      let text = `Hola 😀, %0AQuiero compartir contigo éste  producto, seguro te va a encantar: ${this.data.name}%0A%0ALink de compra: ${urlProduct}%0A`

      if (this.mobileCheck()) {
        window.open(`${baseUrlMovil}text=${text}`, '_blank')
      } else {
        window.open(`${baseUrlPc}text=${text}`, '_blank')
      }
    },
    async asyncauthToken() {
      if (this.dataHoko.token) {
        this.getProductsHoko(this.$route.params.slug, this.dataHoko.token)
      }
    },
    async getProductsHoko(id, token) {
      let config = {
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*',
        },
      }
      await axios
        .get(`https://hoko.com.co/api/member/myproducts/${id}`, config)
        .then((response) => {
          this.loading = false
          this.data = response.data.product
          if (this.data) {
            this.selectedPhoto(this.data.images[0])
            this.maxQuantityValue = this.data.stock.amount
            if (this.data.stock.amount == 0 || this.maxQuantityValue <= 0) {
              this.spent = true
            }
            this.sharing.url = window.location.href
            this.sharing.quote = `Explora%20el%20producto%20${this.data.name}%2C%20te%20van%20a%20encantar.%0ALink%20del%20producto%3A%20${this.sharing.url}`
            this.sharingFacebook = `https://www.facebook.com/sharer/sharer.php?u=${this.sharing.url}&quote=${this.sharing.quote}`
          }
        })
    },
    changeSlide() {
      this.swiper.slidePrev(700, false)
    },
    GoPayments() {
      let objeto = {
        id: this.data.id,
        cantidad: this.quantityValue,
        combinacion: undefined,
      }
      let json = {
        products: [objeto],
        tienda: {
          id: this.dataStore.id,
        },
        canal: 'HOKO',
      }
      json = JSON.stringify(json)
      if (json) {
        if (this.layourUnicentro) {
          window.open(`https://checkout.komercia.co/?params=${json}`)
          // if (this.facebookPixel?.pixel_facebook != null) {
          //   window.fbq('track', 'InitiateCheckout')
          // }
          // this.$gtm.push({ event: 'InitiateCheckout' })
        } else {
          location.href = `https://checkout.komercia.co/?params=${json}`
          // if (this.facebookPixel?.pixel_facebook != null) {
          //   window.fbq('track', 'InitiateCheckout')
          // }
          // this.$gtm.push({ event: 'InitiateCheckout' })
        }
      }
    },
    addQuantity() {
      if (this.maxQuantityValue > this.quantityValue) {
        this.quantityValue++
      } else {
        console.log('Alerta de limite de sku')
      }
    },
    removeQuantity() {
      if (this.quantityValue >= 2) {
        this.quantityValue--
      }
    },
    selectedPhoto(photo) {
      this.selectPhotoUrl = photo
    },
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
  padding-bottom: 30px;
}
.photos_responsive {
  display: none;
}
.photos {
  display: flex;
  margin-right: 30px;
  max-width: 110px;
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
  color: var(--hover_text);
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
.wrapper-photo_main {
  position: relative;
  max-width: 650px;
  max-height: 600px;
  width: 100%;
  margin-right: 25px;
}
.photo_main {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  border-radius: 10px;
}
.wrapper-productDetail {
  background: var(--background_color_1);
  @apply w-full flex justify-center items-center;
}
.container-productDetail-loading {
  height: calc(100vh - 420px);
  max-width: 1200px;
  padding: 50px 30px 30px 30px;
  background: var(--background_color_1);
  @apply w-full flex flex-col justify-center items-center;
}
.container-productDetail {
  background: var(--background_color_1);
  @apply w-full h-full flex flex-col justify-center items-center;
}
.left {
  @apply w-full flex flex-col justify-center items-center;
}
.right {
  @apply w-full flex flex-col justify-start items-start;
}
.content-name,
.content-price,
.content-addCart {
  @apply w-full flex flex-row justify-start items-center;
}
.section-suggesProduct {
  @apply w-full my-40;
}
.content-quantity-boxes {
  @apply w-full flex flex-row justify-start items-center my-30;
}
.box-quantity {
  background-color: transparent;
  border: 1px solid var(--border);
  @apply w-75 h-50 flex text-center justify-center items-center;
}
.box-quantity-btns {
  background-color: var(--color_background_btn);
  border: 1px solid var(--color_background_btn);
  @apply w-25 h-50 flex flex-col text-center justify-center items-center;
}
.btn-quantity {
  background-color: var(--color_background_btn);
  border-color: var(--color_background_btn);
  @apply w-25 h-25 flex justify-center items-center border-t border-r;
}
.text-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 34px;
  cursor: pointer;
  color: var(--color_text_btn);
}
@screen sm {
  .wrapper-left {
    padding-bottom: 15px;
  }
  .product-content {
    @apply w-9/0 flex-col justify-center items-center mt-40;
  }
  .content-direction-btns {
    @apply w-full flex flex-col justify-start items-start;
  }
  .content-name,
  .content-price {
    @apply mb-30;
  }
  .tab {
    @apply w-9/0 flex mt-40;
  }
  .btn {
    color: var(--color_text_btn);
    background-color: var(--color_background_btn);
    transition: all 0.15s ease-in;
    @apply w-full h-54 flex flex-row justify-center items-center;
  }
  .btn-disabled {
    color: var(--color_text_btn);
    background-color: var(--color_background_btn);
    transition: all 0.15s ease-in;
    @apply w-full h-54 flex flex-row justify-center items-center;
  }
  .btn:hover .text-addCart {
    color: var(--hover_text_btn);
    background: var(--hover_Bg_btn);
    transition: all 0.15s ease-in;
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
  .text-addCart {
    font-family: var(--font-style-1) !important;
    color: var(--color_text_btn);
    font-size: 12px;
    @apply font-semibold whitespace-nowrap uppercase;
  }
  .minicart-icon {
    fill: var(--color_text_btn);
    color: var(--color_text_btn);
    @apply mr-10 mb-5;
  }
  .text-variant {
    color: var(--color_subtext);
    font-size: 16px;
    transition: all 0.6s ease-in-out;
    font-family: var(--font-style-1) !important;
    @apply font-semibold mr-10;
  }
  .banner-detail {
    @apply hidden;
  }
  .section-suggesProduct {
    @apply w-9/0;
  }
  .content-items-right {
    @apply w-full flex flex-col justify-center items-center mb-20;
  }
  .empty {
    background-color: var(--border);
    max-width: 1200px;
    @apply w-full h-1;
  }
  .content-stock {
    @apply w-full flex flex-row justify-start items-center my-26;
  }
  .stock-text-1 {
    color: var(--color_subtext);
    font-size: 15px;
    font-family: var(--font-style-1) !important;
    @apply font-normal text-left mr-20;
  }
  .stock-text-2 {
    color: var(--color_subtext);
    font-size: 15px;
    font-family: var(--font-style-1) !important;
    @apply font-normal text-left;
  }
}
@media (min-width: 425px) {
  .content-direction-btns {
    @apply flex flex-col;
  }
}
@screen md {
  .banner-detail {
    @apply w-full flex bg-cover bg-center bg-no-repeat justify-items-center items-center py-20;
  }
  .crumb {
    @apply w-full flex flex-row justify-center items-center;
  }
  .separatorCrumb {
    font-size: 9px;
    color: var(--breadCrumbs);
    font-family: var(--font-style-1) !important;
    @apply pr-6 leading-14 cursor-pointer transition-all ease-in duration-0.2;
  }
  .txt-crumb {
    font-size: 15px;
    color: var(--breadCrumbs);
    font-family: var(--font-style-1) !important;
    @apply pr-6 leading-14 cursor-pointer transition-all ease-in duration-0.2;
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
  .tab {
    @apply w-9/5;
  }
  .product-content {
    @apply w-9/5 grid grid-cols-2 gap-4 justify-start items-start;
  }
  .section-suggesProduct {
    @apply w-9/5;
  }
}
@screen lg {
  .tab {
    @apply flex;
  }
  .content-direction-btns {
    @apply flex flex-col;
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
    width: 100%;
    height: 375px;
    max-width: 400px;
    display: flex;
    box-sizing: border-box;
    overflow: hidden;
    margin-bottom: 10px;
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
