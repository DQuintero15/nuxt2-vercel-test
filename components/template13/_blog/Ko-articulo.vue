<template>
  <div class="content-article">
    <div v-if="dataArticle" class="content-item-article">
      <p class="tittle-blog">{{ dataArticle.titulo }}</p>
      <div class="content-data-article">
        <svg
          fill="#3a3a3a"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            d="M9,10V12H7V10H9M13,10V12H11V10H13M17,10V12H15V10H17M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5A2,2 0 0,1 5,3H6V1H8V3H16V1H18V3H19M19,19V8H5V19H19M9,14V16H7V14H9M13,14V16H11V14H13M17,14V16H15V14H17Z"
          />
        </svg>
        <p class="txt-created">
          <strong>Creado:</strong> {{ shippingCreated }}
        </p>
      </div>
      <div class="content-data-article">
        <svg
          fill="#3a3a3a"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            d="M9,10V12H7V10H9M13,10V12H11V10H13M17,10V12H15V10H17M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5A2,2 0 0,1 5,3H6V1H8V3H16V1H18V3H19M19,19V8H5V19H19M9,14V16H7V14H9M13,14V16H11V14H13M17,14V16H15V14H17Z"
          />
        </svg>
        <p class="txt-created">
          <strong>Actualizado:</strong> {{ shippingUpdated }}
        </p>
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
.content-article {
  min-height: calc(58vh);
  @apply w-full h-full flex flex-col justify-start items-center mt-20;
}
.editor {
  width: 100%;
  background: white;
  border-radius: 5px;
  padding: 15px;
  position: relative;
  margin-top: 5px;
}
.editor >>> .editor__content {
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
  outline: none;
  padding-top: 10px;
}
.editor >>> .el-tiptap-editor > .el-tiptap-editor__content {
  border: 1px solid white;

  padding: 30px 0px;
}

.editor >>> .editor__content >>> * {
  caret-color: black;
  outline: none;
}
.editor >>> .editor__content >>> pre {
  padding: 0.7rem 1rem;
  border-radius: 5px;
  background: black;
  color: green;
  font-size: 0.8rem;
  overflow-x: auto;
}
.editor >>> .editor__content >>> pre code {
  display: block;
}
.editor >>> .editor__content >>> p code {
  padding: 0.2rem 0.4rem;
  border-radius: 5px;
  font-size: 0.8rem;
  font-weight: bold;
  background: rgba(0, 0, 0, 0.1);
  color: rgba(0, 0, 0, 0.8);
}
.editor >>> .editor__content >>> ul,
.editor >>> .editor__content >>> ol {
  padding-left: 1rem;
}
.editor >>> .editor__content >>> li > p,
.editor >>> .editor__content >>> li > ol,
.editor >>> .editor__content >>> li > ul {
  margin: 0;
}
.editor >>> .editor__content >>> ul {
  color: black;
  list-style-type: disc;
}
.editor >>> .editor__content >>> ol {
  color: black;
  list-style-type: decimal;
}
.editor >>> .editor__content >>> a {
  color: rgb(68, 68, 211);
}
.editor >>> .editor__content >>> h1 {
  font-weight: bold;
  font-size: 2em;
}
.editor >>> .editor__content >>> h2 {
  font-weight: bold;
  font-size: 1.5em;
}
.editor >>> .editor__content >>> h3 {
  font-weight: bold;
  font-size: 1.17em;
}
.editor >>> .editor__content >>> blockquote {
  border-left: 3px solid rgba(0, 0, 0, 0.1);
  color: rgba(0, 0, 0, 0.8);
  padding-left: 0.8rem;
  font-style: italic;
}
.editor >>> .editor__content >>> blockquote p {
  margin: 0;
}
.editor >>> .editor__content >>> img {
  /* width: 100%; */
  /* margin: 0; */
  max-width: 100%;
  border-radius: 3px;
}
.editor >>> .editor__content >>> img {
  /* width: 100%; */
  /* margin: 0; */
  max-width: 100%;
  border-radius: 3px;
}
.editor >>> .editor__content >>> table {
  border-collapse: collapse;
  table-layout: fixed;
  width: 100%;
  margin: 0;
  overflow: hidden;
}
.editor >>> .editor__content >>> table td,
.editor >>> .editor__content >>> table th {
  min-width: 1em;
  border: 2px solid grey;
  padding: 3px 5px;
  vertical-align: top;
  box-sizing: border-box;
  position: relative;
}
.editor >>> .editor__content >>> table td > *,
.editor >>> .editor__content >>> table th > * {
  margin-bottom: 0;
}
.editor >>> .editor__content >>> table th {
  font-weight: bold;
  text-align: left;
}
.editor >>> .editor__content >>> table .selectedCell:after {
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
.editor >>> .editor__content >>> table .column-resize-handle {
  position: absolute;
  right: -2px;
  top: 0;
  bottom: 0;
  width: 4px;
  z-index: 20;
  background-color: #adf;
  pointer-events: none;
}
@screen sm {
  .content-item-article {
    @apply w-9/0 flex flex-col justify-center items-start mb-20;
  }
  .tittle-blog {
    font-size: 18px;
    color: #191919;
    letter-spacing: 0.3px;
    @apply w-full font-medium my-20 leading-22;
  }
  .content-img {
    @apply w-full flex flex-col justify-start items-center mb-20;
  }
  .img-article {
    @apply w-full h-auto;
  }
  .content-data-article {
    @apply w-full flex flex-row justify-start items-center mb-20;
  }
  .txt-created {
    font-size: 13px;
    color: #000;
    @apply font-normal;
  }
  .editor {
    @apply w-full max-w-full flex flex-col justify-center items-center overflow-hidden;
  }
}
@screen md {
  .content-img {
    width: 400px;
    max-width: 400px;
  }
}
@media (min-width: 1200px) {
  .content-item-article {
    max-width: 1200px;
  }
}
</style>
