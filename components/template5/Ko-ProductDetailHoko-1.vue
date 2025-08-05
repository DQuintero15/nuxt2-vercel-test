<template>
  <div class="wrapper-productDetail" :style="settingByTemplate">
    <div v-if="loading" class="container-productDetail-loading" />
    <div
      v-else
      class="container-productDetail"
      :style="{
        '--font-style':
          settingByTemplate && settingByTemplate.tipo_letra
            ? settingByTemplate.tipo_letra
            : 'Roboto',
      }"
    >
      <div class="section">
        <div class="wrapper-left">
          <div v-swiper:mySwiper="swiperOption" ref="mySwiper" class="photos">
            <div class="swiper-wrapper" v-if="data.images">
              <div
                v-for="(foto, itemsfoto) in data.images"
                :key="itemsfoto"
                class="swiper-slide photos_selected"
              >
                <img
                  v-lazy="foto"
                  loading="lazy"
                  class="img-list"
                  alt="Product Img"
                  @click="selectedPhoto(foto)"
                />
              </div>
            </div>
          </div>

          <div class="wrapper-photo_main">
            <div v class="photo_main">
              <img
                v-lazy="this.selectPhotoUrl"
                loading="lazy"
                class="photo_main"
                alt="Product Zoom"
              />
            </div>
          </div>
          <div class="photos_responsive">
            <productSlide :photos="data.images" />
          </div>
        </div>
        <div class="wrapper-right">
          <div class="content-right">
            <p class="text-name">{{ data.name }}</p>
            <div class="wrapper-price">
              <p class="text-precio" v-show="data.price">
                {{ data.price | currency }}
              </p>
            </div>
            <div class="quantity">
              <p class="text-unidades" style="margin-right: 10px">
                {{ $t('productdetail_stock') }}:
              </p>
              <p class="text-unidades" v-if="!spent">
                {{ data.stock.amount }} Unidades
              </p>
              <p class="text-unidades" v-else>{{ $t('home_cardAgotado') }}</p>
            </div>
            <div>
              <div class="quantity">
                <p class="text-quantity">{{ $t('cart_cantidad') }}</p>
                <button class="quantity_remove" @click="removeQuantity()">
                  <menos-icon class="icon" />
                </button>
                <p class="quantity_value">{{ quantityValue }}</p>
                <button class="quantity_add" @click="addQuantity()">
                  <mas-icon class="icon" />
                </button>

                <div
                  class="container-alerta"
                  v-if="this.maxQuantityValue == this.quantityValue"
                >
                  <span class="alerta"> {{ $t('cart_ultimaUnidad') }}</span>
                </div>
              </div>
              <div
                v-if="data.stock.product.warranty"
                class="content_buy_action"
              >
                <p class="text-unidades">
                  {{ $t('productdetail_garantia') }}
                </p>
                <span class="text-garantia">{{
                  data.stock.product.warranty
                }}</span>
              </div>
              <div class="item-info-product">
                <div class="content-button">
                  <button
                    ref="colorBtn"
                    class="btn"
                    v-if="!spent"
                    @click="GoPayments"
                    id="AddToCartTag"
                  >
                    {{ $t('home_comprarAhora') }}
                  </button>

                  <button disabled class="btn-disabled" v-else-if="spent">
                    {{ $t('home_cardAgotado') }}
                  </button>
                </div>
                <div class="content-shared">
                  <p class="text-unidades" style="margin-right: 10px">
                    {{ $t('productdetail_compartir') }}
                  </p>
                  <a
                    :href="this.sharingFacebook"
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
      </div>
      <div class="section">
        <div class="features">
          <ko-description
            :data-store="dataStore"
            :data="data.stock.product"
            :price="salesData"
          />
        </div>
      </div>
      <div class="responsive-purchase">
        <div class="ko-input">
          <div class="quantity-resposive">
            <button class="quantity_remove" @click="removeQuantity()">
              <menos-icon class="icon" />
            </button>
            <p class="quantity_value">{{ quantityValue }}</p>
            <button class="quantity_add" @click="addQuantity()">
              <mas-icon class="icon" />
            </button>

            <div
              v-show="quantityValue == maxQuantityValue"
              class="container-alert"
            >
              <span class="alert">{{ $t('cart_ultimaUnidad') }}</span>
            </div>
          </div>
          <div style="width: 100%; margin-left: 10px">
            <button
              v-if="!spent"
              id="AddToCartTag"
              ref="color2"
              class="btn-responsive"
              @click="GoPayments"
            >
              <cartArrowDown class="card-icon-cart" />
              {{ $t('home_comprarAhora') }}
            </button>
            <div class="content_buy_action-responsive" v-else-if="spent">
              <p class="card-info-1-res">{{ $t('home_cardAgotado') }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import productSlide from './_productdetails/productSlideHoko.vue'
import koDescription from './_productdetails/descriptionProduct-hoko.vue'
import mobileCheck from '@/mixins/mobileCheck'
export default {
  name: 'Ko5ProductDetailHoko',
  components: {
    productSlide,
    koDescription,
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
  mixins: [mobileCheck],
  props: {
    dataStore: {
      type: Object,
      required: true,
    },
    // productsData: Array,
    whatsapp: {
      type: String,
      required: true,
    },
    // envios: Object,
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
.wrapper-productDetail {
  display: flex;
  width: 100%;
  background: #efefef;
  /* background: var(--background_color_2); */
  justify-content: center;
  align-items: center;
}
.container-productDetail-loading {
  height: calc(100vh - 420px);
  width: 100%;
  display: flex;
  max-width: 1300px;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 50px 30px 30px 30px;
  background: #efefef;
}
.container-productDetail {
  position: relative;
  display: flex;
  width: 100%;
  max-width: 1300px;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 50px 30px 30px 30px;
  /* height: calc(100vh - 400px); */
}
.section {
  width: 100%;
  display: flex;
  /* box-shadow: 10px 14px 28px #ededed, -10px -14px 28px #f1f1f1; */
}
.wrapper-left {
  flex: 2;
  width: 100%;
  display: flex;
  flex-direction: row;
  /* margin-right: 25px; */
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
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 10px;
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
  object-fit: cover;
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
.text-name {
  font-weight: bold;
  font-size: 25px;
  /* line-height: 24px; */
  color: #000000;
  /* color: var(--color_text); */
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
.text-unidades {
  font-size: 14px;
  font-weight: bold;
  /* color: var(--color_subtext); */
  color: rgba(21, 20, 57, 0.541);
  margin-top: 5px;
}
.text-garantia {
  font-size: 14px;
  font-weight: bold;
  /* color: var(--color_text); */
  color: #000000;
  margin-top: 5px;
  margin-left: 5px;
}
.item-info-product {
  margin-top: 10px;
}
.content-button {
  display: flex;
  flex-direction: row;
  margin-top: 15px;
}
.content-shared {
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
.whatsapp {
  fill: #27d367;
  width: 30px;
  cursor: pointer;
  margin-left: 20px;
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
.features {
  width: 100%;
  display: flex;
  /* border-top: 1px solid var(--color_border); */
  border-top: 1px solid rgba(127, 127, 139, 0.342);
}
.responsive-purchase {
  display: none;
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
.content_buy_action {
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
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
  .features {
    border-top: none;
  }
  .container-productDetail {
    padding: 0px;
    align-items: center;
    justify-content: center;
  }
  .section {
    flex-direction: column;
  }
  .wrapper-left {
    justify-content: center;
    align-items: center;
  }
  .wrapper-right {
    padding-bottom: 2px;
    border-left: 0px;
  }
  i.close {
    position: absolute;
    top: 10px;
    right: 10px;
  }
  .quantity {
    display: none;
  }
  .content-button {
    display: none;
  }
  .responsive-purchase {
    display: initial;
    position: fixed;
    bottom: 0;
    right: 0;
    width: 100%;
    box-shadow: 0 0 30px 50px rgba(96, 125, 139, 0.096);
    background: var(--background_color_1);
    z-index: 2;
  }
  .ko-input {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding: 8px 5px;
  }
  .quantity-resposive {
    display: flex;
    flex-direction: row;
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
  .content_buy_action-responsive {
    display: flex;
    width: 100%;
  }
  .card-info-1-res {
    display: flex;
    justify-content: center;
    align-items: center;
    /* background: #e71f77; */
    background: gray;
    border: solid 1px gray;
    padding: 8px 10px;
    border-radius: var(--radius_btn);
    color: white;
    font-size: 16px;
    width: 100%;
  }
  .btn-responsive {
    border-radius: var(--radius_btn);
    color: var(--color_text_btn);
    border: solid 1px var(--color_background_btn);
    background-color: var(--color_background_btn);
    padding: 8px 10px;
    width: 100%;
    font-size: 16px;
  }
  .card-icon-cart {
    font-size: 20px;
    color: var(--color_text_btn);
    margin-right: 4px;
    cursor: pointer;
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
}
@media (max-width: 600px) {
  .container-productDetail {
    padding: 0px;
  }
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
