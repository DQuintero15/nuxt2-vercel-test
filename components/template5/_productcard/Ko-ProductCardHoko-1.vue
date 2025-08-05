<template>
  <div class="wrapper-card">
    <div id="product-card" class="container-card">
      <div class="wrapper">
        <nuxt-link
          :to="{ path: `/productosHoko/` + product.id }"
          class="wrapper-image"
        >
          <client-only>
            <img
              v-lazy="product.images[0]"
              loading="lazy"
              class="product-image"
              :class="soldOut ? 'product-image-soldOut' : ''"
              alt="Product Img"
            />
          </client-only>
          <div class="image_overlay"></div>
        </nuxt-link>
        <div class="separador-stats"></div>
        <div class="stats">
          <div class="stats-container">
            <p v-if="soldOut" class="card-info-1">
              {{ $t('home_cardAgotado') }}
            </p>
            <div class="content-name-product">
              <p v-if="product.name >= 90" class="card-title">
                {{ `${product.name.slice(0, 90)}...` }}
              </p>
              <p v-else class="card-title">
                {{ `${product.name.slice(0, 90)}` }}
              </p>
            </div>
            <div v-if="product.price" class="content-text-price">
              <p class="text-price">
                {{ product.price | currency }}
              </p>
            </div>
            <div v-else class="content-price-empty"></div>
            <div class="wrapper-btn-icon">
              <nuxt-link
                class="view_details"
                :to="{ path: `/productosHoko/` + product.id }"
              >
                <p>{{ $t('home_cardvermas') }}</p>
              </nuxt-link>
              <div class="separador-btn"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="wrapper-movil">
        <nuxt-link
          :to="{ path: `/productosHoko/` + product.id }"
          class="wrapper-image"
        >
          <img
            v-lazy="product.images[0]"
            loading="lazy"
            class="product-image"
            alt="Product Img"
          />
        </nuxt-link>
        <div class="content-card-items">
          <nuxt-link
            :to="{ path: `/productosHoko/` + product.id }"
            class="content-name-product"
          >
            <p v-if="product.name >= 25" class="card-title">
              {{ `${product.name.slice(0, 25)}..` }}
            </p>
            <p v-else class="card-title">
              {{ `${product.name.slice(0, 30)}` }}
            </p>
          </nuxt-link>
          <div v-if="product.price" class="content-text-price">
            <nuxt-link :to="{ path: `/productosHoko/` + product.id }">
              <p class="text-price">
                {{ product.price | currency }}
              </p>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import idCloudinary from '@/mixins/idCloudinary'
export default {
  name: 'Ko5ProductCardHoko',
  filters: {
    currency(value) {
      if (value) {
        return `$${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`
      }
      return ''
    },
  },
  mixins: [idCloudinary],
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  computed: {
    soldOut() {
      if (this.product && this.product.stock_amount === 0) {
        return true
      } else {
        return false
      }
    },
  },
}
</script>

<style scoped>
.wrapper-card {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  /* background: var(--background_color_1); */
  background: white;
  box-sizing: border-box;
  border-radius: 5px;
  box-shadow: rgb(226, 226, 226) 0 1px 1px;
  border: 1px solid rgba(243, 243, 243, 0.637);
  height: 100%;
}
.container-card {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
  height: 100%;
}
.wrapper-image {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  width: 100%;
  height: 294px;
  min-height: 294px;
  max-height: 300px;
}
.product-image {
  width: 100%;
  object-fit: cover;
  overflow: hidden;
}
.notproduct-image {
  height: 294px;
  max-height: 294px;
  width: 300px;
}
.product-image-soldOut {
  filter: grayscale(100%);
}
.image_overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #6969692a;
  opacity: 0;
}
#product-card:hover .image_overlay {
  opacity: 0.7;
  -webkit-transition: all 200ms ease-out;
  -moz-transition: all 200ms ease-out;
  -o-transition: all 200ms ease-out;
  transition: all 200ms ease-out;
}
.separador-stats {
  height: 95px;
  width: 100%;
}
.stats-container {
  background: #fff;
  position: absolute;
  top: 288px;
  left: 0;
  width: 100%;
  height: 120px;
  padding: 20px 12px 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  -webkit-transition: all 200ms ease-out;
  -moz-transition: all 200ms ease-out;
  -o-transition: all 200ms ease-out;
  transition: all 200ms ease-out;
}
#product-card:hover .stats-container {
  top: 241px;
  -webkit-transition: all 200ms ease-out;
  -moz-transition: all 200ms ease-out;
  -o-transition: all 200ms ease-out;
  transition: all 200ms ease-out;
}
.card-info-1 {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #e71f77;
  padding: 1px 4px;
  border-radius: var(--radius_btn);
  color: white;
  font-size: 12px;
  top: -44px;
  right: 0px;
  z-index: 2;
}
.card-info-2 {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #35dd8d;
  padding: 1px 4px;
  border-radius: var(--radius_btn);
  color: black;
  font-size: 12px;
  font-weight: bold;
  top: -22px;
  right: 0px;
  z-index: 2;
}
.content-name-product {
  width: 100%;
  min-height: 36px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  text-align: center;
}
.card-title {
  font-size: 15px;
  font-weight: 500;
  /* color: var(--color_text); */
  color: rgb(63, 63, 63);
}
.content-text-price {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
}
.content-price {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  min-height: 29px;
  max-height: 29px;
}
.content-price-empty {
  width: 100%;
  margin-top: 5px;
  min-height: 29px;
  max-height: 29px;
}
.text-price {
  font-size: 20px;
  font-weight: 500;
  line-height: 1.4;
  /* color: var(--color_subtext); */
  color: rgb(70, 70, 70);
  text-align: center;
}
.separator-price {
  /* color: var(--color_text); */
  color: rgb(70, 70, 70);
  margin-left: 5px;
  margin-right: 5px;
}
.wrapper-btn-icon {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
#add_cart {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 19px;
  text-align: center;
  text-transform: uppercase;
  font-weight: 700;
  padding: 10px 0;
  width: 130px;
  opacity: 0;
  height: 41px;
  color: var(--color_text_btn);
  border-radius: var(--radius_btn);
  border: solid 2px var(--color_background_btn);
  background-color: var(--color_background_btn);
  -webkit-transition: all 200ms ease-out;
  -moz-transition: all 200ms ease-out;
  -o-transition: all 200ms ease-out;
  transition: all 200ms ease-out;
}
#add_cart:hover {
  border: solid 2px var(--btnhover);
  background-color: var(--btnhover);
  cursor: pointer;
}
#product-card:hover #add_cart {
  opacity: 1;
  width: 152px;
  font-size: 15px;
  -webkit-transition: all 200ms ease-out;
  -moz-transition: all 200ms ease-out;
  -o-transition: all 200ms ease-out;
  transition: all 200ms ease-out;
}
.view_details {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 19px;
  text-align: center;
  text-transform: uppercase;
  font-weight: 700;
  padding: 10px 0;
  width: 130px;
  opacity: 0;
  height: 41px;
  color: var(--color_background_btn);
  border-radius: var(--radius_btn);
  border: solid 2px var(--color_background_btn);
  background-color: transparent;
  -webkit-transition: all 200ms ease-out;
  -moz-transition: all 200ms ease-out;
  -o-transition: all 200ms ease-out;
  transition: all 200ms ease-out;
}
.view_details:hover {
  color: var(--btnhover);
  border: solid 2px var(--btnhover);

  cursor: pointer;
}
#product-card:hover .view_details {
  opacity: 1;
  width: 152px;
  font-size: 15px;
  -webkit-transition: all 200ms ease-out;
  -moz-transition: all 200ms ease-out;
  -o-transition: all 200ms ease-out;
  transition: all 200ms ease-out;
}
.separador-btn {
  width: 5px;
}
.wrapper {
  display: initial;
  width: 100%;
  height: 100%;
}
.wrapper-movil {
  display: none;
}
.card-icon-cart-movil:hover {
  color: var(--btnhover);
}
/*Comienzo de animacion*/
.overlay-top {
  top: 43px;
  left: 100%;
  right: 0;
  width: 0;
  height: 29px;
  padding: 5px;
  font-size: 13px;
  background: white;
  color: #35dd8d;
  @apply absolute overflow-hidden rounded-md shadow-md transition-all ease-in duration-300;
}
#product-card:hover .overlay-top {
  width: 67px;
  left: 75%;
}
.overlay-free {
  position: absolute;
  background-color: #35dd8d;
  color: white;
  overflow: hidden;
  transition: 0.5s ease;
  top: 0px;
  left: 100%;
  right: 0;
  width: 0;
  height: 35px;
  text-align: center;
  @apply rounded;
}
.txt-free {
  line-height: 12px;
  font-size: 13px;
  margin-top: 5px;
}
#product-card:hover .overlay-free {
  width: 125px;
  left: 55%;
  transition-delay: 700ms;
}
.overlay-polygon {
  position: absolute;
  top: 35px;
  left: 100%;
  right: 0;
  background-color: transparent;
  overflow: hidden;
  width: 0;
  height: 5%;
  fill: #35dd8d;
}
#product-card:hover .overlay-polygon {
  width: 5%;
  left: 90%;
  transition-delay: 950ms;
}
@media (max-width: 1270px) {
  .separador-stats {
    height: 105px;
  }
}
@media (max-width: 1249px) {
  .separador-stats {
    height: 98px;
  }
}
@media (max-width: 768px) {
  .wrapper {
    display: none;
  }
  .wrapper-movil {
    display: initial;
    width: 100%;
  }
  .content-card-items {
    width: 100%;
    height: 75px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 5px 10px;
    position: relative;
  }
  .card-title {
    font-size: 13px;
  }
  .content-text-price {
    margin-top: 0px;
  }
  .text-price {
    font-size: 15px;
  }
  .icon-cart {
    margin-left: 20px;
  }
  .card-info-1 {
    font-size: 10px;
    top: -43px;
  }
  .card-info-2 {
    font-size: 10px;
    top: -22px;
  }
  .notproduct-image-res {
    height: 357px;
    max-height: 357px;
    width: 100%;
  }
}
@media (max-width: 450px) {
  .notproduct-image-res {
    height: 175px;
    max-height: 170px;
  }
  .container-card {
    width: 100%;
    max-width: 200px;
  }
  .wrapper-image {
    min-height: 120px;
    height: 175px;
  }
}
</style>
