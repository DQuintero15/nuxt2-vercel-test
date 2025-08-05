<template>
  <div
    class="wrapper-productDetail"
    :style="[
      settingByTemplate9[0].detailsProduct,
      settingByTemplate9[0].setting9General,
    ]"
  >
    <div class="container-productDetail-loading" v-if="loading"></div>
    <div
      class="container-productDetail"
      v-else
      :style="[
        {
          '--font-style-2':
            this.settingByTemplate9 &&
            this.settingByTemplate9[0].setting9General &&
            this.settingByTemplate9[0].setting9General.fount_2
              ? this.settingByTemplate9[0].setting9General.fount_2
              : 'Roboto',
        },
      ]"
    >
      <div class="crumb">
        <nuxt-link to="/productosHoko">
          <p class="txt-crumb s1">{{ $t('header_inicio') }}</p>
        </nuxt-link>
        <p class="txt-crumb">/</p>
        <p class="txt-crumb s2">{{ data.name }}</p>
      </div>
      <div class="product-content">
        <div class="left">
          <div class="content-images">
            <div
              class="aditional-images"
              v-for="(foto, itemsfoto) in data.images"
              :key="itemsfoto"
            >
              <img class="img-list" v-lazy="foto" alt="Product Img" />
            </div>
          </div>
        </div>
        <div class="right">
          <div class="content-items-right">
            <!-- <div class="content-category">
              <p class="text-category">
                {{ data.detalle.categoria_producto.nombreCategoriaProducto }}
              </p>
            </div> -->
            <div class="content-name">
              <p class="text-name">{{ data.name }}</p>
            </div>
            <div class="content-price">
              <p class="text-price">
                {{ data.price | currency }}
              </p>
              <p class="text-stock" v-if="!spent">
                {{ $t('productdetail_stock') }}
              </p>
            </div>
            <!-- Variantes de prodcuto -->

            <div class="flex flex-row mb-20 items-center">
              <p class="text-variant" style="margin-right: 10px">
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
            <div class="content-direction-btns">
              <div class="content-cart">
                <div class="quantity">
                  <button class="quantity_remove" @click="removeQuantity()">
                    <menos-icon class="text-icon" />
                  </button>
                  <p class="text-quantity_value">{{ quantityValue }}</p>
                  <button class="quantity_add" @click="addQuantity()">
                    <mas-icon class="text-icon" />
                  </button>
                </div>
              </div>
              <div class="content-addCart">
                <button
                  ref="colorBtn"
                  class="btn"
                  v-if="!spent"
                  @click="GoPayments"
                  id="AddToCartTag"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="minicart-icon"
                    width="14"
                    height="16"
                    viewBox="0 0 14 16"
                  >
                    <path
                      d="M11,3V0H3V3H0V16H14V3H11ZM5,2H9V3H5V2Zm7,12H2V5H3V7H5V5H9V7h2V5h1v9Z"
                    ></path>
                  </svg>
                  <p class="text-addCart">
                    {{ $t('home_comprarAhora') }}
                  </p>
                </button>

                <button disabled class="btn-disabled" v-else-if="spent">
                  <p class="text-addCart">
                    {{ $t('home_cardAgotado') }}
                  </p>
                </button>
              </div>
            </div>
            <div class="responsive-purchase">
              <div class="ko-input">
                <div class="quantity-resposive">
                  <button class="quantity_remove_res" @click="removeQuantity()">
                    <menos-icon class="icon_res" />
                  </button>
                  <p class="quantity_value_res">{{ quantityValue }}</p>
                  <button class="quantity_add_res" @click="addQuantity()">
                    <mas-icon class="icon_res" />
                  </button>
                </div>
                <div style="width: 100%; margin-left: 10px">
                  <div class="content_buy_action-responsive" v-if="spent">
                    <p class="card-info-1-res">{{ $t('home_cardAgotado') }}</p>
                  </div>
                  <button
                    class="btn-responsive"
                    v-if="!spent"
                    @click="GoPayments"
                    id="AddToCartTag"
                  >
                    <cartArrowDown class="card-icon-cart" />
                    {{ $t('home_comprarAhora') }}
                  </button>
                </div>
              </div>
            </div>
            <div class="content-options">
              <OptionAcordion
                :dataStore="dataStore"
                :data="data.stock.product"
                :price="salesData"
              />
            </div>
            <div class="tab">
              <OptionTab
                :dataStore="dataStore"
                :data="data.stock.product"
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
import axios from 'axios'
import OptionAcordion from './_productdetails/OptAcordion-hoko'
import OptionTab from './_productdetails/OptTab-hoko'
export default {
  name: 'Ko9ProductDetailHoko',
  props: {
    dataStore: Object,
    // productsData: Array,
    whatsapp: String,
    // envios: Object,
    facebookPixel: Object,
    settingByTemplate9: Array,
  },
  components: {
    OptionAcordion,
    OptionTab,
  },
  mounted() {
    this.asyncauthToken()
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
    dataHoko() {
      return this.$store.state.dataHoko
    },
  },
  methods: {
    mobileCheck() {
      window.mobilecheck = function () {
        var check = false
        ;(function (a) {
          if (
            /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
              a
            ) ||
            /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
              a.substr(0, 4)
            )
          )
            check = true
        })(navigator.userAgent || navigator.vendor || window.opera)
        return check
      }
      return window.mobilecheck()
    },
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
  watch: {
    quantityValue(value) {
      if (value > this.maxQuantityValue) {
        this.quantityValue = this.maxQuantityValue
      }
    },
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
.container-productDetail-loading {
  height: calc(100vh - 420px);
  width: 100%;
  display: flex;
  max-width: 1460px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px 30px 30px 30px;
  background: var(--background_color_1);
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
  @apply flex flex-row justify-start items-start my-40;
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
  @apply w-full flex;
}
.left {
  @apply flex flex-col justify-center items-center;
}
.content-images {
  @apply w-full grid grid-cols-1 gap-4 justify-center items-center;
}
.img-list {
  object-fit: cover;
  overflow: hidden;
  width: auto;
  height: auto;
}
.aditional-images,
.main-images,
.youtuve-video {
  @apply w-full flex justify-center items-center;
}

.right {
  @apply flex flex-col justify-start items-start;
}
.content-category,
.content-name,
.content-addCart {
  @apply w-full flex flex-row justify-start items-center;
}
.content-price {
  align-items: center;
  @apply grid grid-flow-row grid-cols-2 grid-rows-2 gap-0;
}
.quantity {
  @apply flex flex-row justify-center items-center;
}
.section-suggesProduct {
  width: 100%;
  margin-top: 40px;
}
.responsive-purchase {
  display: none;
}
@screen sm {
  .product-content {
    @apply flex-col justify-center items-center;
  }
  .content-direction-btns {
    @apply w-full flex flex-col justify-start items-start;
  }
  .left {
    @apply w-9/0;
  }
  .video {
    width: 100%;
    height: 200px;
  }

  .right {
    @apply w-9/0 mt-4;
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
    @apply w-full flex flex-col justify-start items-center;
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
    transition: all 0.15s ease-in;
  }
  .btn:hover {
    background-color: #f4f4f4;
    transition: all 0.15s ease-in;
  }
  .btn:hover .text-addCart {
    color: #2c2930;
    transition: all 0.15s ease-in;
  }
  .btn:hover .minicart-icon {
    fill: #2c2930;
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
    color: #92bb35;
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
  .text-addCart {
    /* font-family: 'Roboto', Helvetica, Arial, sans-serif !important; */
    font-family: var(--font-style-2);
    color: var(--color_text_btn);
    font-size: 15px;
    font-weight: 900;
    line-height: 54px;
    letter-spacing: 1px;
    white-space: nowrap;
    /* text-transform: capitalize; */
  }
  .minicart-icon {
    fill: var(--color_text_btn);
    margin-right: 20px;
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
  /* ------------------- DOWN ----------------------- */
}
@media (min-width: 450px) {
  .content-direction-btns {
    @apply flex-row;
  }
  .content-cart {
    @apply w-4/0 mr-2;
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
    @apply w-9/6 flex-row justify-start items-start;
  }
  .crumb {
    @apply w-9/6;
  }
  .video {
    height: 300px;
  }
  .left {
    @apply w-full mr-50;
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
  /* .content-free-shipping {
    position: sticky;
    bottom: 20px;
  } */
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
  .content-direction-btns {
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
    color: rgba(21, 20, 57, 0.541);
    margin-right: 5px;
    align-self: center;
  }
  .quantity_remove_res {
    border: 1px rgba(127, 127, 139, 0.342);
    border-top-left-radius: var(--radius_btn);
    border-bottom-left-radius: var(--radius_btn);
    border-style: solid none solid solid;
    background: transparent;
    height: 44px;
    width: 3em;
  }
  .quantity_value_res {
    font-size: 1em;
    color: #000000;
    border: 1px rgba(127, 127, 139, 0.342);
    padding-left: 10px;
    padding-right: 10px;
    border-style: solid none solid none;
    background: transparent;
    height: 44px;
    width: 2.5em;
    justify-content: center;
    display: flex;
    align-items: center;
  }
  .quantity_add_res {
    border: 1px rgba(127, 127, 139, 0.342);
    border-top-right-radius: var(--radius_btn);
    border-bottom-right-radius: var(--radius_btn);
    border-style: solid solid solid none;
    background: transparent;
    height: 44px;
    width: 3em;
  }
  .icon_res {
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
  .features {
    border-top: none;
  }
}
</style>
