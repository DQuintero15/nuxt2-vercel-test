<template>
  <div
    class="producto"
    :style="[
      settingBlog,
      settingGeneral,
      {
        '--font-style-1': settingGeneral?.fount_1 ?? 'Roboto',
      },
    ]"
  >
    <nuxt-link
      :to="{ path: `/blog/` + article.slug, query: { idBlog: article.id } }"
      class="container"
      @mouseover="hover = true"
      @mouseleave="hover = false"
    >
      <div class="figure-img">
        <div class="content-imge">
          <img
            v-if="article.imagen_principal_url"
            v-lazy="idCloudinary(article.imagen_principal_url, 550, 550)"
            class="images"
            alt="right-banner"
          />

          <div v-else class="empty"></div>
        </div>
      </div>
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
      <div class="content-txt-article">
        <div class="content-tittle-article">
          <span class="txt-article-tittle">
            {{ article.titulo }}
          </span>
        </div>
        <div class="content-date-article">
          <span class="txt-article-day">{{ dayCreate }}</span>
          <span class="txt-article-month">{{ nameMonth }}</span>
          <span class="txt-article-create">{{ yearCreate }}</span>
        </div>
        <div class="content-border-article"></div>
        <div class="content-abstract-article">
          <span class="txt-article-abstract">
            {{ article.resumen }}
          </span>
        </div>
        <div class="content-button-article">
          <button class="btn">+ {{ $t('home_leerMas') }}</button>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>
<script>
import idCloudinary from '@/mixins/idCloudinary'
export default {
  name: 'KoBlogCard',
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
  @apply w-full flex flex-col justify-center items-center;
  /* background-color: var(--background_color_1); */
}
.container {
  background: var(--CardBg);
  @apply relative;
}
.content-imge {
  @apply w-full h-auto relative flex justify-start cursor-pointer overflow-hidden transition-all ease-in duration-0.2;
}
.images {
  @apply w-full object-cover overflow-hidden transition-all ease-in duration-0.5;
}
.container:hover .images {
  @apply relative overflow-hidden transition-all ease-in duration-0.5;
  -webkit-transform: rotate(2deg) scale(1.1);
  transform: rotate(2deg) scale(1.1);
}
.empty {
  background: #cccccc;
  height: 100%;
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
  font-family: var(--font-style-1);
  @apply absolute text-center transition-all ease-in duration-300 grid grid-cols-1 gap-0;
}
.txt-day,
.txt-month {
  font-family: var(--font-style-1);
  color: var(--ColorBg_Date2);
  font-weight: 600;
}
.txt-day {
  font-weight: 600;
}
.txt-month {
  text-transform: uppercase;
  letter-spacing: 0.3px;
  font-weight: 600;
}
.content-txt-article,
.content-tittle-article,
.content-abstract-article {
  @apply w-full flex flex-col justify-start items-start;
}
.content-date-aticle {
  @apply w-full flex flex-row justify-start items-start;
}
.txt-article-day,
.txt-article-month {
  color: var(--ColorText_Date);
  font-family: var(--font-style-1);
}
.txt-article-create {
  color: var(--ColorText_Date);
  font-family: var(--font-style-1);
}
.txt-article-abstract {
  color: var(--CardDescription);
  font-family: var(--font-style-1);
}
.content-button-article {
  @apply h-50;
}
.btn {
  color: var(--colorTextBTn);
  box-shadow: inset 0px -50px 0px -41px var(--color_border);
  font-family: var(--font-style-1);
  @apply w-auto flex flex-col text-center font-semibold px-10 cursor-pointer transition-all ease-in duration-0.2;
}
.btn:hover {
  /* background-color: #eb7025; */
  box-shadow: inset 0px -50px 0px 0px rgba(235, 112, 37);
  color: #fff;
  @apply p-10;
}
@screen sm {
  .container {
    @apply max-w-full;
  }
  .images {
    height: 167px;
  }
  .empty {
    height: 167px;
  }
  .txt-day {
    font-size: 15px;
  }
  .txt-month {
    font-size: 10px;
  }
  .overlay-top {
    background-color: var(--ColorBg_Date);
    @apply absolute overflow-hidden shadow-md rounded-2 max-w-full max-h-full transition-all ease-in duration-300;
    top: 10px;
    left: 10px;
    right: 0;
    width: 40px;
    height: 45px;
  }
  .txt-article-tittle {
    font-size: 20px;
    color: var(--CardTitle);
    letter-spacing: 0.2px;
    font-family: var(--font-style-1);
    @apply w-full flex justify-start items-start font-semibold mt-20 mb-15 cursor-pointer text-left  transition-all ease-in duration-0.5;
  }
  .txt-article-tittle:hover {
    /* color: #eb7025; */
    @apply transition-all ease-in duration-0.2;
  }
  .txt-article-day,
  .txt-article-month,
  .txt-article-create {
    font-size: 12px;
    letter-spacing: 0.36px;
  }
  .content-date-article {
    @apply mb-15;
  }
  .content-border-article {
    background-color: var(--Card_border);
    @apply w-60 h-1 mb-15;
  }
  .txt-article-abstract {
    font-size: 15px;
    @apply text-left mb-15;
  }
  .btn {
    font-size: 14px;
    @apply leading-24;
  }
}
@media (min-width: 425px) {
  .images {
    height: 272px;
  }
  .empty {
    height: 272px;
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
  .images {
    height: 350px;
  }
  .empty {
    height: 350px;
  }
}
@screen lg {
  .overlay-top {
    top: 10px;
    left: 10px;
    right: 0;
    width: 50px;
    height: 55px;
  }
}
@screen mlg {
  .txt-day {
    font-size: 20px;
  }
}
@media (min-width: 1400px) {
  .images {
    height: 298px;
  }
  .empty {
    height: 298px;
  }
}
</style>
