<template>
  <div
    class="producto-blog"
    :style="{
      '--font-style': settingBlog?.tipo_letra ?? 'Roboto',
    }"
  >
    <div class="content-product">
      <div class="wrapper-card">
        <div class="container-blog">
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
                  v-lazy="idCloudinary(article.imagen_principal_url, 550, 550)"
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
                <p class="txt-month">
                  {{ yearUpdate }}
                </p>
              </div>
            </div>
          </nuxt-link>
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
          <div class="summary-article">
            <p class="subtext">
              {{ article.resumen }}
            </p>
          </div>
          <div class="content-autor">
            <p class="text-autor">
              <span class="flex-shrink-0 mx-1">
                <img
                  v-lazy="`${this.$store.state.urlKomercia}/users/user.jpg`"
                  class="h-30 w-30 rounded-full mr-4"
                  alt=""
                />
              </span>
              {{ article.autor }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import idCloudinary from '@/mixins/idCloudinary'
export default {
  name: 'KoProductCard5',
  mixins: [idCloudinary],
  props: {
    article: {
      type: Object,
      required: true,
    },
    settingBlog: {
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
* {
  font-family: var(--font-style) !important;
}
.producto-blog {
  @apply w-full relative justify-center items-center cursor-pointer;
}
.content-product {
  @apply w-full;
}
.container-blog {
  @apply relative shadow-2xl;
  max-width: 100%;
}
.content-card-blog {
  @apply w-full flex flex-col justify-center items-center;
}
.wrapper-card {
  width: 100%;
  position: relative;
  justify-content: center;
  align-items: center;
  background: white;
  box-sizing: border-box;
  border-radius: 5px;
  -webkit-box-shadow: 0px 10px 19px 7px rgba(107, 107, 107, 0.4);
  box-shadow: 0px 10px 19px 7px rgba(107, 107, 107, 0.4);
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
  color: #333333;
}
.txt-day {
  font-size: 24px;
  font-weight: 600;
}
.txt-month {
  padding-bottom: 1px;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 12px;
}
.content-tittle-article {
  @apply w-full flex items-center text-left;
  padding-top: 10px;
  padding-bottom: 10px;
}
.txt-tituloart {
  color: #2d2a2a;
  transition: all 0.25s ease;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.txt-tituloart:hover {
  color: var(--color_icon);
  transition: all 0.25s ease;
}
.text-autor {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  color: #a4a4a4;
  font-size: 14px;
}
.summary-article {
  @apply w-full flex justify-start items-center;
  padding-bottom: 10px;
}
.container-properitys {
  @apply w-full relative justify-center items-center p-6;
  cursor: default;
}
.subtext {
  color: #777777;
  font-size: 14px;
  cursor: text;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
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
  color: var(--color_icon);

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
  color: var(--color_icon);

  margin-left: 10px;
  margin-bottom: -5px;
  display: none;
}
.svg-points {
  fill: var(--color_icon);
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
@screen sm {
  .overlay-top {
    @apply absolute overflow-hidden shadow-2xl bg-white-white rounded-2 max-w-full max-h-full transition-all ease-in duration-300;
    top: 5%;
    left: 5%;
    right: 0;
    width: 15%;
    height: 29%;
  }
  .content-autor {
    @apply w-full flex justify-start items-center;
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
    @apply absolute overflow-hidden shadow-2xl bg-white-white rounded-2 max-w-full max-h-full transition-all ease-in duration-300;
    top: 5%;
    left: 5%;
    right: 0;
    width: 15%;
    height: 25%;
  }
}
@media (min-width: 500px) {
  .overlay-top {
    @apply absolute overflow-hidden shadow-2xl bg-white-white rounded-2 max-w-full max-h-full transition-all ease-in duration-300;
    top: 5%;
    left: 5%;
    right: 0;
    width: 12%;
    height: 21%;
  }
}
@media (min-width: 576px) {
  .overlay-top {
    @apply absolute overflow-hidden shadow-2xl bg-white-white rounded-2 max-w-full max-h-full transition-all ease-in duration-300;
    top: 5%;
    left: 5%;
    right: 0;
    width: 18%;
    height: 33%;
  }
}
@screen md {
  .overlay-top {
    @apply absolute overflow-hidden shadow-2xl bg-white-white rounded-2 max-w-full max-h-full transition-all ease-in duration-300;
    top: 5%;
    left: 5%;
    right: 0;
    width: 20%;
    height: 38%;
  }
}
@screen lg {
  .overlay-top {
    @apply absolute overflow-hidden shadow-2xl bg-white-white rounded-2 max-w-full max-h-full transition-all ease-in duration-300;
    top: 5%;
    left: 5%;
    right: 0;
    width: 15%;
    height: 28%;
  }
}
@screen mlg {
  .overlay-top {
    @apply absolute overflow-hidden shadow-2xl bg-white-white rounded-2 max-w-full max-h-full transition-all ease-in duration-300;
    top: 5%;
    left: 5%;
    right: 0;
    width: 15%;
    height: 25%;
  }

  .txt-tituloart {
    font-size: 24px;
  }
  .images {
    width: 100%;
    height: 270px;
    max-height: 270px;
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
