<template>
  <div
    class="producto"
    :style="[
      settingK07Blog,
      settingGeneral,
      {
        '--font-style-1': settingGeneral?.fount_1 ?? 'David libre',
      },
      {
        '--font-style-3': settingGeneral?.fount_3 ?? 'Lora',
      },
    ]"
  >
    <div class="content-product">
      <div class="wrapper-card">
        <div class="container">
          <nuxt-link
            :to="{
              path: `/blog/` + article.slug,
              query: { idBlog: article.id },
            }"
            class="contet"
          >
            <div class="figure-img">
              <figure class="content-imge">
                <img
                  v-if="article.imagen_principal_url"
                  :src="idCloudinary(article.imagen_principal_url, 550, 550)"
                  class="images"
                  alt="right-banner"
                />
                <div v-else class="empty"></div>
              </figure>
            </div>
          </nuxt-link>
          <nuxt-link
            :to="{
              path: `/blog/` + article.slug,
              query: { idBlog: article.id },
            }"
            class="contet"
          >
            <div class="overlay-top">
              <div class="text-tittle">
                <p class="txt-day">
                  {{ dayCreate }}
                </p>
                <p class="txt-month">
                  {{ nameMonth }}
                </p>
              </div>
            </div>
          </nuxt-link>
          <div class="overlay-bottom">
            <div class="content-bottom-titulo">
              <div class="text-cart">
                <p class="txt-tituloart-bottom">{{ $t('header_blog') }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="container-properitys">
          <div class="content-tittle-article">
            <nuxt-link
              :to="{
                path: `/blog/` + article.slug,
                query: { idBlog: article.id },
              }"
              class="txt-tituloart"
            >
              {{ article.titulo }}
            </nuxt-link>
          </div>
          <div class="content-autor">
            <p class="text-autor">
              <span clas="txt-by">{{ $t('home_by') }}</span>
              <span class="flex-shrink-0 mx-1">
                <img
                  class="h-20 w-20 rounded-full"
                  :src="`${this.$store.state.urlKomercia}/users/user.jpg`"
                  alt=""
                />
              </span>
              {{ article.autor }}
            </p>
          </div>
          <div class="summary-article">
            <p v-if="article.resumen" class="subtext">
              {{ `${article.resumen.slice(0, 200)}...` }}
            </p>
          </div>
          <div class="read-more">
            <nuxt-link
              :to="{
                path: `/blog/` + article.slug,
                query: { idBlog: article.id },
              }"
              class="txt-read-more"
            >
              {{ $t('home_continuar_leyendo') }}
              <span class="points-text-read"
                ><svg
                  class="svg-points"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  version="1.1"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z"
                  />
                </svg>
              </span>
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
  name: 'Ko7BlogCard',
  mixins: [idCloudinary],
  props: {
    article: {
      type: Object,
      required: true,
    },
    settingGeneral: {
      type: Object,
      required: true,
    },
    settingK07Blog: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      yearUpdate: '',
      dayCreate: '',
      monthCreate: '',
      nameMonth: '',
    }
  },
  mounted() {
    if (this.article.updated_at) {
      const months = [
        'Ene',
        'Feb',
        'Mar',
        'Abr',
        'May',
        'Jun',
        'Jul',
        'Ago',
        'Sep',
        'Oct',
        'Nov',
        'Dic',
      ]
      const fecha = new Date(this.article.updated_at)

      this.yearUpdate = fecha.getUTCFullYear()
      this.monthCreate = fecha.getUTCMonth()
      this.dayCreate = fecha.getUTCDate()

      this.nameMonth = months[this.monthCreate]
    }
  },
}
</script>

<style scoped>
.producto {
  @apply h-full w-full relative justify-start items-center cursor-pointer;
}
.content-product {
  @apply h-full w-full;
}
.container {
  @apply relative shadow-2xl;
  max-width: 100%;
}
.content-card-blog {
  @apply w-full flex flex-col justify-center items-center;
}
.wrapper-card {
  background: var(--color_background_card);
  box-sizing: border-box;
  border-radius: 5px;
  -webkit-box-shadow: 0px 10px 19px 7px rgba(107, 107, 107, 0.4);
  box-shadow: 0px 10px 19px 7px rgba(107, 107, 107, 0.4);
  @apply w-full h-full relative justify-between items-center;
}
.wrapper-card:hover {
  transition: all 200ms ease-in;
  top: -3px;
  position: relative;
  -webkit-box-shadow: 0px 16px 17px 7px #6b6b6b;
  box-shadow: 0px 16px 26px 7px #6b6b6b;
}
.images {
  object-fit: cover;
  overflow: hidden;
}
.figure-img {
  @apply w-full;
}
.wrapper-image {
  @apply w-full;
}
.text-tittle {
  @apply absolute text-center transition-all ease-in duration-300 grid grid-cols-1 gap-0;
  font: inherit;
  font-size: 100%;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  text-align: center;
}
.figure-img figure img {
  -webkit-transform: scale(1);
  transform: scale(1);
  opacity: 1;
  -webkit-transition: 0.7 ease-in-out;
  transition: transform 0.7s ease, opacity 0.7s ease,
    -webkit-transform 0.7s ease;
}
.content-product:hover img {
  -webkit-transform: scale(1.3);
  transform: scale(1.03);
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.217) 30%,
    rgba(0, 0, 0, 0.374) 50%,
    rgb(0, 0, 0) 100%
  );
}
figure {
  @apply overflow-hidden m-0 p-0;
}
figure {
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.217) 30%,
    rgba(0, 0, 0, 0.374) 50%,
    rgb(0, 0, 0) 100%
  );
}
.figure-img figure:hover img {
  opacity: 0.5;
}
.content-imge {
  @apply w-full flex justify-center items-center;
}
.txt-day,
.txt-month {
  font-family: var(--font-style-3) !important;
  color: var(--color_text_date);
}
.txt-day {
  font-size: 24px;
  font-weight: 600;
}
.txt-month {
  padding-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  font-weight: 600;
  font-size: 12px;
}
.content-tittle-article {
  @apply w-full flex justify-center items-center;
  padding-top: 10px;
  padding-bottom: 10px;
  cursor: default;
}
.txt-tituloart {
  font-family: var(--font-style-1) !important;
  color: var(--color_text);
  transition: all 0.25s ease;
  cursor: pointer;
}
.txt-tituloart:hover {
  color: var(--hover_text);
  transition: all 0.25s ease;
}
.text-autor {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-family: var(--font-style-3) !important;
  color: var(--color_autor);
  font-size: 14px;
}
.summary-article {
  @apply w-full flex justify-center items-center text-center;
  padding-bottom: 10px;
}
.container-properitys {
  @apply w-full relative justify-center items-center p-6;
  cursor: default;
}
.subtext {
  font-family: var(--font-style-3) !important;
  color: var(--color_description);
  font-size: 14px;
  cursor: text;
}
.read-more {
  @apply w-full flex flex-row justify-center items-center text-center transition-all ease-in duration-200;
  cursor: default;
}
.txt-read-more {
  @apply transition-all ease-in duration-200;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  color: var(--color_text_btn);
  font-family: var(--font-style-3) !important;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}
.txt-read-more:hover {
  @apply transition-all ease-in duration-200;
  transform: translateX(-2px);
}
.points-text-read {
  @apply transition-all ease-in duration-200;
  position: relative;
  color: #ed2353;
  font-family: var(--font-style-3) !important;
  margin-left: 10px;
  margin-bottom: -5px;
  display: none;
}
.svg-points {
  fill: var(--color_text_btn);
  animation: bounce 1s infinite;
}
@keyframes bounce {
  0%,
  100% {
    transform: translateX(-25%);
    animationtimingfunction: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: translateX(0);
    animationtimingfunction: cubic-bezier(0, 0, 0.2, 1);
  }
}
.txt-read-more:hover .points-text-read {
  @apply flex transition-all ease-in duration-200;
}
.content-bottom-titulo {
  @apply absolute text-center transition-all ease-in duration-300 w-full;
  font: inherit;
  font-size: 100%;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  text-align: center;
}
.text-cart {
  @apply w-full;
}
.txt-tituloart-bottom {
  font-family: var(--font-style-3) !important;
  font-size: 16px;
  text-transform: uppercase;
  color: var(--color_bg_text);
}
.overlay-top {
  background: var(--color_bg_date);
}
.overlay-bottom {
  background: var(--color_bg_card);
}
@screen sm {
  .overlay-top {
    @apply absolute overflow-hidden shadow-2xl rounded-2 max-w-full max-h-full transition-all ease-in duration-300;
    top: 5%;
    left: 5%;
    right: 0;
    width: 15%;
    height: 26%;
  }
  .overlay-bottom {
    @apply absolute overflow-hidden transition-all ease-in duration-300;
    width: 80%;
    height: 25px;
    left: 10%;
    bottom: -5%;
    right: 0;
  }
  .content-autor {
    @apply w-full flex justify-center items-center;
    padding-bottom: 10px;
  }
  .txt-tituloart {
    font-size: 20px;
  }
  .txt-by {
    @apply hidden;
  }
}
@media (min-width: 425px) {
  .overlay-top {
    @apply absolute overflow-hidden shadow-2xl rounded-2 max-w-full max-h-full transition-all ease-in duration-300;
    top: 5%;
    left: 5%;
    right: 0;
    width: 15%;
    height: 22%;
  }
}
@media (min-width: 500px) {
  .overlay-top {
    @apply absolute overflow-hidden shadow-2xl rounded-2 max-w-full max-h-full transition-all ease-in duration-300;
    top: 5%;
    left: 5%;
    right: 0;
    width: 12%;
    height: 18%;
  }
  .overlay-bottom {
    @apply absolute overflow-hidden transition-all ease-in duration-300;
    width: 80%;
    height: 25px;
    left: 10%;
    bottom: -3%;
    right: 0;
  }
}
@media (min-width: 576px) {
  .overlay-top {
    @apply absolute overflow-hidden shadow-2xl rounded-2 max-w-full max-h-full transition-all ease-in duration-300;
    top: 5%;
    left: 5%;
    right: 0;
    width: 18%;
    height: 30%;
  }
  .overlay-bottom {
    @apply absolute overflow-hidden transition-all ease-in duration-300;
    width: 80%;
    height: 25px;
    left: 10%;
    bottom: -6%;
    right: 0;
  }
}
@screen md {
  .overlay-top {
    @apply absolute overflow-hidden shadow-2xl rounded-2 max-w-full max-h-full transition-all ease-in duration-300;
    top: 5%;
    left: 5%;
    right: 0;
    width: 20%;
    height: 35%;
  }
}
@screen lg {
  .overlay-top {
    @apply absolute overflow-hidden shadow-2xl rounded-2 max-w-full max-h-full transition-all ease-in duration-300;
    top: 5%;
    left: 5%;
    right: 0;
    width: 15%;
    height: 25%;
  }
  .overlay-bottom {
    @apply absolute right-0 bottom-0 overflow-hidden transition-all ease-in duration-300;
    width: 80%;
    height: 25px;
    left: 10%;
    bottom: -5%;
  }
}
@screen mlg {
  .overlay-top {
    @apply absolute overflow-hidden shadow-2xl rounded-2 max-w-full max-h-full transition-all ease-in duration-300;
    top: 5%;
    left: 5%;
    right: 0;
    width: 15%;
    height: 22%;
  }
  .overlay-bottom {
    @apply absolute right-0 bottom-0 overflow-hidden transition-all ease-in duration-300;
    width: 80%;
    height: 25px;
    left: 10%;
    bottom: -5%;
  }
  .txt-tituloart {
    font-size: 24px;
  }
  .images {
    width: 100%;
    height: 270px;
    max-height: 270px;
    /* height: 100%; */
    object-fit: cover;
    overflow: hidden;
  }
  .empty {
    background: #cccccc;
    height: 270px;
    max-height: 270px;
    width: 100%;
  }
}
</style>
