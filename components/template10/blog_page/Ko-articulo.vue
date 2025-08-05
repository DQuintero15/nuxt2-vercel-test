<template>
  <div class="wrapper-blog">
    <div class="bannerBlog">
      <div class="crumb">
        <nuxt-link to="/">
          <p class="txt-crumb s1">{{ $t('header_inicio') }}</p>
        </nuxt-link>
        <p class="separatorCrumb">/</p>
        <nuxt-link to="/blog">
          <p class="txt-crumb s2">
            {{ $t('header_blog') }}
          </p>
        </nuxt-link>
      </div>
    </div>

    <div v-if="dataArticle" class="container-article">
      <div class="content-blog">
        <nuxt-link to="/blog" class="content-back">
          <arrow-left-icon class="arrow-left" />
          <p>Regresar</p>
        </nuxt-link>
        <p class="title-blog">{{ dataArticle.titulo }}</p>

        <div class="content-date">
          <div class="flex-shrink-0">
            <img
              class="h-30 w-30 rounded-full"
              :src="`${this.$store.state.urlKomercia}/users/user.jpg`"
              alt=""
            />
          </div>
          <div class="w-full flex flex-col ml-10">
            <p class="text-16 font-bold text-[#3a4557bb]">
              {{ dataArticle.autor }}
            </p>
            <p class="text-14 text-[#3a4557bb]">
              <strong>Creado:</strong> {{ shippingCreated }}
            </p>
            <p class="text-14 text-[#3a4557bb]">
              <strong>Actualizado:</strong> {{ shippingUpdated }}
            </p>
          </div>
        </div>
        <div v-if="dataArticle.contenido" class="editor">
          <el-tiptap
            v-model="dataArticle.contenido"
            :extensions="extensions"
            :spellcheck="false"
            :readonly="true"
            :tooltip="false"
            :bubble="false"
            :showMenubar="false"
            :charCounterCount="false"
          />
        </div>
      </div>
    </div>
    <div v-else>
      <el-skeleton :rows="6" animated />
      <el-skeleton :rows="6" animated />
    </div>
  </div>
</template>

<script>
import extensions from '@/mixins/elemenTiptap.vue'
export default {
  mixins: [extensions],
  props: {
    dataStore: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      dataArticle: {},
      shippingCreated: '',
      shippingUpdated: '',
    }
  },
  mounted() {
    this.searchIdForSlug()
  },
  methods: {
    async searchIdForSlug() {
      let idBlog = this.$route.query.idBlog
      const { data } = await this.$store.dispatch('GET_DATA_ARTICLE', {
        idBlog: idBlog,
        idStore: this.dataStore.id,
      })
      if (data) {
        this.dataArticle = data.data

        this.shippingCreated = this.formatDate(this.dataArticle.created_at)
        this.shippingUpdated = this.formatDate(this.dataArticle.updated_at)
      }
    },
    formatDate(value) {
      const fecha = new Date(value)

      const diasSemana = [
        'Domingo',
        'Lunes',
        'Martes',
        'Miércoles',
        'Jueves',
        'Viernes',
        'Sábado',
      ]
      const meses = [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre',
      ]

      const dia = fecha.getUTCDate()
      const mes = fecha.getUTCMonth()
      const año = fecha.getUTCFullYear()
      const diaSemana = diasSemana[fecha.getUTCDay()]

      return `${diaSemana}, ${dia} de ${meses[mes]} de ${año}`
    },
  },
}
</script>
<style scoped>
.editor >>> .el-tiptap-editor__menu-bubble {
  display: none;
}
.editor >>> .el-tiptap-editor__content h1 {
  font-size: 2em;
}
.editor >>> .el-tiptap-editor__content h2 {
  font-size: 1.5em;
}
.editor >>> .el-tiptap-editor__content h3 {
  font-size: 1.17em;
}
.editor >>> .el-tiptap-editor__content h4 {
  font-size: 1.12em;
}
.editor >>> .el-tiptap-editor__content h5 {
  font-size: 0.83em;
}
.wrapper-blog {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  min-height: calc(64vh);
  background: #fff;
  @apply py-30;
}
.content-blog {
  @apply py-15 px-20;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: flex-start;
  box-sizing: content-box;
}
.content-back {
  width: 100%;
  display: flex;
  flex-direction: row;
}
.arrow-left {
  bottom: 2px;
  margin-right: 5px;
  cursor: pointer;
  color: black;
}
.content-back p {
  cursor: pointer;
  color: black;
}
.title-blog {
  font-size: 30px;
  font-weight: bold;
  color: black;
  margin-top: 20px;
}
.content-date {
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
}
.content-date-items {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-left: 10px;
}
.content-date-items p {
  font-size: 14px;
  color: #3a4557bb;
}
.content-date-items p:nth-child(1) {
  font-weight: bold;
}

/* ///////////// */
.editor {
  width: 100%;
  background: white;
  border-radius: 5px;
  padding: 15px;
  position: relative;
  margin-top: 5px;
}
.editor >>> .el-tiptap-editor > .el-tiptap-editor__content {
  border: 1px solid transparent;
  padding: 0px;
}
.editor__content {
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
  outline: none;
  padding-top: 10px;
}
.editor__content >>> * {
  caret-color: black;
  outline: none;
}
.editor__content >>> pre {
  padding: 0.7rem 1rem;
  border-radius: 5px;
  background: black;
  color: green;
  font-size: 0.8rem;
  overflow-x: auto;
}
.editor__content >>> pre code {
  display: block;
}
.editor__content >>> p code {
  padding: 0.2rem 0.4rem;
  border-radius: 5px;
  font-size: 0.8rem;
  font-weight: bold;
  background: rgba(0, 0, 0, 0.1);
  color: rgba(0, 0, 0, 0.8);
}
.editor__content >>> ul,
.editor__content >>> ol {
  padding-left: 1rem;
}
.editor__content >>> li > p,
.editor__content >>> li > ol,
.editor__content >>> li > ul {
  margin: 0;
}
.editor__content >>> ul {
  color: black;
  list-style-type: disc;
}
.editor__content >>> ol {
  color: black;
  list-style-type: decimal;
}
.editor__content >>> a {
  color: rgb(68, 68, 211);
}
.editor__content >>> h1 {
  font-weight: bold;
  font-size: 2em;
}
.editor__content >>> h2 {
  font-weight: bold;
  font-size: 1.5em;
}
.editor__content >>> h3 {
  font-weight: bold;
  font-size: 1.17em;
}
.editor__content >>> blockquote {
  border-left: 3px solid rgba(0, 0, 0, 0.1);
  color: rgba(0, 0, 0, 0.8);
  padding-left: 0.8rem;
  font-style: italic;
}
.editor__content >>> blockquote p {
  margin: 0;
}
.editor__content >>> img {
  /* width: 100%; */
  /* margin: 0; */
  max-width: 100%;
  border-radius: 3px;
}
.editor__content >>> img {
  /* width: 100%; */
  /* margin: 0; */
  max-width: 100%;
  border-radius: 3px;
}
.editor__content >>> table {
  border-collapse: collapse;
  table-layout: fixed;
  width: 100%;
  margin: 0;
  overflow: hidden;
}
.editor__content >>> table td,
.editor__content >>> table th {
  min-width: 1em;
  border: 2px solid grey;
  padding: 3px 5px;
  vertical-align: top;
  box-sizing: border-box;
  position: relative;
}
.editor__content >>> table td > *,
.editor__content >>> table th > * {
  margin-bottom: 0;
}
.editor__content >>> table th {
  font-weight: bold;
  text-align: left;
}
.editor__content >>> table .selectedCell:after {
  z-index: 2;
  position: absolute;
  content: '';
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(200, 200, 255, 0.4);
  pointer-events: none;
}
.editor__content >>> table .column-resize-handle {
  position: absolute;
  right: -2px;
  top: 0;
  bottom: 0;
  width: 4px;
  z-index: 20;
  background-color: #adf;
  pointer-events: none;
}
.txt-banner {
  color: #fff;
  font-family: 'David libre' !important ;
  font-weight: 400;
}
#separator {
  margin-left: 20px;
}
.container-article {
  @apply flex justify-center items-center rounded-md mt-12;
}
.container-article {
  @apply shadow-2xl;
}
.txt-banner {
  color: #2c2930;
  font-family: 'Poppins' !important ;
  font-weight: 400;
}
.tittle-banner-blog {
  @apply w-full flex flex-col justify-center items-center;
}
.banner-blog {
  @apply w-full flex flex-col justify-center items-center pt-8 z-10;
  /* background-color: #efefef; */
}
.crumb {
  @apply w-full flex flex-row justify-center items-center;
}
.separatorCrumb {
  font-size: 9px;
  color: #222;
  font-family: 'Roboto', sans-serif !important;
  @apply pr-6 leading-14 cursor-pointer transition-all ease-in duration-0.2;
}
.txt-crumb {
  font-size: 15px;
  color: #222;
  font-family: 'Roboto', sans-serif !important;
  @apply pr-6 leading-14 cursor-pointer transition-all ease-in duration-0.2;
}
.s1:hover {
  color: #000;
  transition: all 0.25s ease;
}
.s2:hover {
  color: #000;
  transition: all 0.25s ease;
}
@screen sm {
  .bannerBlog {
    @apply w-full flex bg-cover bg-center bg-no-repeat justify-items-center items-center py-20;
  }
  .container-article {
    @apply w-9/0;
  }
  .txt-banner {
    font-size: 36px;
  }
  .icon-blog {
    width: 10%;
    margin-bottom: 40px;
  }
  #separator {
    margin-left: 10px;
  }
  .wrapper-blog {
    margin-top: 140px;
  }
}
@screen md {
  .container-article {
    @apply w-9/5;
  }
  .txt-banner {
    font-size: 36px;
  }
}
@screen lg {
  .icon-blog {
    width: 4%;
    margin-bottom: 40px;
  }
}
@screen mlg {
  .container-article {
    @apply w-9/3;
  }
  .txt-banner {
    font-size: 78px;
  }
  .icon-blog {
    width: 5%;
    margin-bottom: 80px;
  }
  #separator {
    margin-left: 20px;
  }
  .wrapper-blog {
    margin-top: 0px;
  }
}
@screen xl {
  .container-article {
    @apply w-8/3;
  }
}
@screen xml {
  .container-article {
    @apply w-6/3;
  }
}
@screen xxl {
  .container-article {
    @apply w-4/6;
  }
}
</style>
