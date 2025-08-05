<template>
  <div
    class="producto"
    :style="[
      settingBlog,
      settingGeneral,
      {
        '--font-style-1': settingGeneral?.fount_1 ?? 'Poppins',
      },
    ]"
  >
    <div
      class="container"
      @mouseover="hover = true"
      @mouseleave="hover = false"
    >
      <nuxt-link
        :to="{ path: `/blog/` + article.slug, query: { idBlog: article.id } }"
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
        :to="{ path: `/blog/` + article.slug, query: { idBlog: article.id } }"
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
      <nuxt-link
        :to="{ path: `/blog/` + article.slug, query: { idBlog: article.id } }"
        class="contet-bottom"
      >
        <div class="overlay-bottom z-20">
          <div class="content-bottom-titulo">
            <div class="text-cart">
              <p class="w-full txt-tituloart">
                {{ article.titulo }}
              </p>
            </div>
          </div>
        </div>
        <div class="overlay-bottom-autor z-20">
          <div class="content-bottom-autor">
            <div class="text-cart-read">
              <p class="txt-read">{{ $t('home_leerMas') }}</p>
            </div>
          </div>
        </div>
        <div class="overlay-bottom-shadow"></div>
      </nuxt-link>
    </div>
  </div>
</template>
<script>
import idCloudinary from '@/mixins/idCloudinary'
export default {
  name: 'Ko9BlogCard',
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
    settingGeneral: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      dayCreate: '',
      monthCreate: '',
      yearCreate: '',
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

      this.yearCreate = fecha.getUTCFullYear()
      this.monthCreate = fecha.getUTCMonth()
      this.dayCreate = fecha.getUTCDate()

      this.nameMonth = months[this.monthCreate]
    }
  },
}
</script>
<style scoped>
.producto {
  max-height: 560px;
  background-color: #f8f8f8;
  @apply w-full flex flex-col justify-center items-center cursor-pointer;
}
.container {
  @apply relative;
}
.images {
  width: 100%;
  height: 100%;
  max-height: 560px;
  object-fit: cover;
  overflow: hidden;
}
.empty {
  background: #cccccc;
  height: 100%;
  max-height: 560px;
  width: 100%;
}
.text-tittle {
  font: inherit;
  font-size: 100%;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  text-align: center;
  @apply absolute text-center transition-all ease-in duration-300 grid grid-cols-1 gap-0;
}
.content-bottom-titulo {
  font: inherit;
  font-size: 100%;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  text-align: center;
  @apply absolute text-center transition-all ease-in duration-300 w-full;
}
.content-bottom-autor {
  font: inherit;
  font-size: 100%;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  text-align: center;
  @apply absolute text-center transition-all ease-in duration-300 w-full;
}
.content-imge {
  @apply flex justify-center items-center;
}
.txt-day,
.txt-month {
  /* font-family: 'Poppins', Helvetica, Arial, sans-serif !important; */
  font-family: var(--font-style-1);
  color: var(--color_text_date);
  font-weight: 600;
}
.txt-tituloart,
.txt-autorart {
  /* font-family: 'Poppins', Helvetica, Arial, sans-serif !important; */
  font-family: var(--font-style-1);
  color: var(--color_title_card);
  font-weight: 600;
  /* text-transform: capitalize; */
}
.text-cart-read {
  @apply text-left;
  width: 90px;
}
.txt-read {
  /* font-family: 'Poppins', Helvetica, Arial, sans-serif !important; */
  font-family: var(--font-style-1);
  color: var(--color_title_card);
  font-weight: 600;
}
.txt-read:hover {
  width: auto;
  border-bottom: 2px solid #2c2930;
  z-index: 20;
}
.txt-day {
  /* font-size: 24px; */
  font-weight: 600;
}
.txt-month {
  /* padding-bottom: 8px; */
  text-transform: uppercase;
  letter-spacing: 0.3px;
  font-weight: 600;
  /* font-size: 12px; */
}
.overlay-bottom-shadow {
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 30%,
    rgba(0, 0, 0, 0) 50%,
    rgb(0, 0, 0) 100%
  );
  opacity: 0.5;
  bottom: 0px;
  left: 0px;
  right: 0px;
  width: 100%;
  height: 100%;
  z-index: 10;
  @apply absolute overflow-hidden max-w-full max-h-full;
}
.container:hover .overlay-bottom-shadow {
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 30%,
    rgba(0, 0, 0, 0.904) 90%,
    rgb(0, 0, 0) 100%
  );
}
@screen sm {
  .container {
    max-width: 100%;
  }
  .txt-day {
    font-size: 15px;
  }
  .txt-month {
    font-size: 10px;
  }
  .overlay-top {
    background-color: var(--color_bg_date);
    @apply absolute overflow-hidden shadow-md rounded-2 max-w-full max-h-full transition-all ease-in duration-300;
    top: 10px;
    left: 10px;
    right: 0;
    width: 40px;
    height: 45px;
  }
  .text-cart {
    @apply w-8/5 text-left;
    margin-left: 20px;
  }
  .text-cart-read {
    margin-left: 20px;
  }
  .txt-tituloart {
    font-size: 22px;
    margin-bottom: 20px;
  }
  .txt-read {
    font-size: 13px;
  }
  .overlay-bottom {
    @apply absolute overflow-hidden max-w-full max-h-full transition-all ease-in duration-200;
    bottom: 45px;
    left: 0;
    right: 0;
    width: 100%;
    height: 180px;
  }
  .overlay-bottom-autor {
    @apply absolute overflow-hidden max-w-full max-h-full transition-all ease-in duration-200 justify-start items-start;
    bottom: 40px;
    left: 0%;
    right: 0;
    width: 100%;
    height: 40px;
  }
}

@media (max-width: 580px) {
  .images {
    height: 100%;
    max-height: 300px;
  }
  .empty {
    height: 100%;
    max-height: 300px;
  }
}
@media (min-width: 581px) {
  .text-cart {
    @apply w-8/5;
  }
  .txt-tituloart {
    font-size: 18px;
  }
}
@screen md {
  .txt-day {
    font-size: 22px;
  }
  .txt-month {
    font-size: 14px;
  }
  .overlay-top {
    top: 10px;
    left: 10px;
    right: 0;
    width: 60px;
    height: 65px;
  }
  .text-cart {
    @apply w-8/5;
    margin-left: 30px;
  }
  .text-cart-read {
    margin-left: 30px;
  }
  .txt-tituloart {
    font-size: 30px;
  }
  .txt-read {
    font-size: 16px;
  }
  .overlay-bottom {
    bottom: 60px;
    left: 0;
    right: 0;
    width: 100%;
    height: 300px;
  }
  .overlay-bottom-autor {
    bottom: 60px;
    left: 0%;
    right: 0;
    width: 100%;
    height: 40px;
  }
  .images {
    height: 560px;
  }
  .empty {
    height: 3560px;
  }
}
@screen lg {
  .overlay-top {
    top: 10px;
    left: 10px;
    right: 0;
    width: 60px;
    height: 65px;
  }
  .overlay-bottom {
    bottom: 20px;
    left: 0;
    right: 0;
    width: 100%;
    height: 200px;
  }
  .container:hover .overlay-bottom {
    bottom: 90px;
  }
  .overlay-bottom-autor {
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 0px;
  }
  .container:hover .overlay-bottom-autor {
    bottom: 65px;
    height: 40px;
  }
}
@media (min-width: 1025px) {
  .txt-tituloart {
    font-size: 25px;
  }
}
@screen mlg {
  .txt-day {
    font-size: 25px;
  }
  .txt-tituloart {
    font-size: 36px;
    letter-spacing: -1px;
    line-height: 1;
  }
  .overlay-top {
    top: 10px;
    left: 10px;
    right: 0;
    width: 70px;
    height: 75px;
  }
  .overlay-bottom {
    bottom: 10px;
    left: 0;
    right: 0;
    width: 100%;
    height: 250px;
  }
  .container:hover .overlay-bottom {
    bottom: 50px;
  }
}
</style>
