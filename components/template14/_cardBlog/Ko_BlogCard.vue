<template>
  <nuxt-link
    :to="{ path: `/blog/` + article.slug, query: { idBlog: article.id } }"
    class="w-full h-full flex flex-col justify-between items-start wrapper_border"
    :style="`background-color: ${cardBlog['--background_color_1']}`"
  >
    <div class="relative h-full rounded-5 wrapper-img">
      <img
        v-if="article.imagen_principal_url"
        v-lazy="idCloudinary(article.imagen_principal_url, 850, 850)"
        class="rounded-5 w-full h-full effect-img object-cover max-h-[300px]"
        width="406"
        height="300"
        alt="right-banner"
      />
      <div v-else class="w-full h-full bg-slate-200"></div>
      <div
        class="absolute bottom-10 left-10 p-10 flex flex-col justify-center items-center rounded-5"
        :style="`background-color: ${cardBlog.color_bg_date}`"
      >
        <p class="text-15" :style="`color: ${cardBlog.color_date};`">
          {{ dayCreate }}
        </p>
        <p class="text-15 font-bold" :style="`color: ${cardBlog.color_date};`">
          {{ nameMonth }}
        </p>
      </div>
    </div>
    <div class="w-full flex-col flex">
      <p
        class="flex justify-start mb-10 mt-20 px-10"
        :style="`color: ${cardBlog.color_text}; font-size: ${cardBlog.fontSizeText}; font-weight: ${cardBlog.fontWeighText};`"
      >
        Autor: {{ article.autor }}
      </p>
      <p
        class="px-10 mb-10"
        :style="`color: ${cardBlog.color_title}; font-size: ${cardBlog.fontSizeTitle}; font-weight: ${cardBlog.fontWeighTitle};`"
      >
        {{ article.titulo }}
      </p>
    </div>
    <!-- <p
      class="text-justify"
      :style="`color: ${cardBlog.color_text}; font-size: ${cardBlog.fontSizeText}; font-weight: ${cardBlog.fontWeighText};`"
    >
      {{ this.article.resumen }}
    </p> -->
  </nuxt-link>
</template>
<script>
import idCloudinary from '@/mixins/idCloudinary'
export default {
  name: 'Ko14BlogCard',
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
.wrapper-img {
  @apply w-full h-auto relative flex justify-start cursor-pointer overflow-hidden;
  -webkit-transition: all 600ms ease 0s;
}
.wrapper_border:hover .effect-img {
  @apply relative overflow-hidden;
  -webkit-transition: all 600ms ease 0s;
  -webkit-transform: scale(1.1);
  transform: scale(1.1) rotate(3deg);
}
.effect-img {
  -webkit-transition: all 600ms ease 0s;
}
</style>
