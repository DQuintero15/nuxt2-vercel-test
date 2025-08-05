<template>
  <div
    class="producto"
    :style="`background-color: ${cardBlog['--background_color_1']}`"
  >
    <nuxt-link
      :to="{ path: `/blog/` + article.slug, query: { idBlog: article.id } }"
      class="container relative max-w-full h-full pb-2"
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
      <div class="w-full h-full flex-col justify-between items-start">
        <div class="content-tittle-article">
          <span
            class="txt-article-tittle"
            :style="`color: ${cardBlog.color_title}; font-weight: ${cardBlog.fontWeighTitle};`"
          >
            {{ article.titulo }}
          </span>
        </div>
        <div class="mb-15 flex items-center">
          <svg
            :fill="cardBlog.color_icon"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            version="1.1"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            class="mr-5"
          >
            <path
              d="M9,10V12H7V10H9M13,10V12H11V10H13M17,10V12H15V10H17M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5A2,2 0 0,1 5,3H6V1H8V3H16V1H18V3H19M19,19V8H5V19H19M9,14V16H7V14H9M13,14V16H11V14H13M17,14V16H15V14H17Z"
            />
          </svg>
          <span
            class="txt-article-day"
            :style="`color: ${cardBlog.color_date}; font-weight: ${cardBlog.fontWeighDate};`"
          >
            {{ dayCreate }}
          </span>
          <span
            class="txt-article-month"
            :style="`color: ${cardBlog.color_date}; font-weight: ${cardBlog.fontWeighDate};`"
          >
            {{ nameMonth }}
          </span>
          <span
            class="txt-article-create"
            :style="`color: ${cardBlog.color_date}; font-weight: ${cardBlog.fontWeighDate};`"
          >
            {{ yearCreate }}
          </span>
        </div>
        <div class="content-abstract-article">
          <span
            class="txt-article-abstract"
            :style="`color: ${cardBlog.color_text}; font-weight: ${cardBlog.fontWeighText};`"
          >
            {{ article.resumen }}
          </span>
        </div>
        <button
          class="w-auto flex flex-col text-center text-14 leading-24 font-semibold py-10 px-10 border cursor-pointer transition-all ease-in duration-0.2"
          :style="`color: ${cardBlog.color_text_btn}; background-color: ${cardBlog.color_bg_btn}; border-color: ${cardBlog.color_text_btn}; border-radius: ${settingGeneral?.radius};`"
        >
          {{ cardBlog.text_btn }}
        </button>
      </div>
    </nuxt-link>
  </div>
</template>
<script>
import idCloudinary from '@/mixins/idCloudinary'
export default {
  name: 'Ko16BlogCard',
  mixins: [idCloudinary],
  props: {
    article: {
      type: Object,
      required: true,
    },
    cardBlog: {
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
  @apply w-full h-full flex flex-col justify-center items-center;
}
.content-imge {
  @apply w-full h-auto relative flex justify-start cursor-pointer overflow-hidden transition-all ease-in duration-0.2;
}
.images {
  @apply w-full object-cover overflow-hidden transition-all ease-in duration-0.5;
}
.container:hover .images {
  @apply relative overflow-hidden transition-all ease-in duration-0.5;
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
.empty {
  background: #cccccc;
  height: 100%;
  width: 100%;
}
.content-txt-article,
.content-tittle-article,
.content-abstract-article {
  @apply w-full flex flex-col justify-start items-start;
}
@screen sm {
  .images {
    height: 167px;
  }
  .empty {
    height: 167px;
  }
  .txt-article-tittle {
    font-size: 20px;
    letter-spacing: 0.2px;

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
    @apply mr-5;
  }
  .txt-article-abstract {
    font-size: 15px;
    @apply text-left mb-15;
  }
}
@screen md {
  .images {
    height: 224px;
  }
  .empty {
    height: 224px;
  }
}
</style>
