<template>
  <nuxt-link
    :to="{ path: `/blog/` + article.slug, query: { idBlog: article.id } }"
    class="w-full h-full flex flex-col justify-center items-start wrapper_border"
    :style="`background-color: ${cardBlog['--background_color_1']}`"
  >
    <div class="relative rounded-5 wrapper-img">
      <img
        v-if="article.imagen_principal_url"
        v-lazy="idCloudinary(article.imagen_principal_url, 400, 400)"
        class="rounded-5 w-full effect-img max-h-[250px] max-w-[400px]"
        width="400"
        height="250"
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
    <p
      class="justify-start mb-10 mt-20"
      :style="`color: ${cardBlog.color_text}; font-size: ${cardBlog.fontSizeText}; font-weight: ${cardBlog.fontWeighText};`"
    >
      Autor: {{ article.autor }}
    </p>
    <p
      :style="`color: ${cardBlog.color_title}; font-size: ${cardBlog.fontSizeTitle}; font-weight: ${cardBlog.fontWeighTitle};`"
    >
      {{ article.titulo }}
    </p>
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
  name: 'Ko15BlogCard',
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
