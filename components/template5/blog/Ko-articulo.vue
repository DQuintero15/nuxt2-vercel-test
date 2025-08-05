<template>
  <div
    class="w-full min-h-screen flex flex-col justify-start items-center bg-white-white"
  >
    <div v-if="dataArticle" class="container-article">
      <div class="content-blog">
        <nav class="flex mt-20 mb-5 sm:mb-10" aria-label="Breadcrumb">
          <ol class="flex items-start space-x-4">
            <li>
              <nuxt-link to="/" class="text-gray-400 hover:text-gray-500">
                <svg
                  class="flex-shrink-0 h-20 w-20"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
                  />
                </svg>
                <span class="sr-only">Home</span>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/blog" class="flex items-center">
                <svg
                  class="flex-shrink-0 h-20 w-20 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                <p
                  class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  listado de artículos
                </p>
              </nuxt-link>
            </li>
          </ol>
        </nav>
        <div>
          <p class="size_title my-10 text-start">
            {{ dataArticle.titulo }}
          </p>
        </div>
        <div class="flex justify-between items-center">
          <div class="content-date">
            <div class="flex-shrink-0">
              <a href="#">
                <img
                  class="h-60 w-60 rounded-full"
                  v-lazy="`${this.$store.state.urlKomercia}/users/user.jpg`"
                  alt="logoStore"
                />
              </a>
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
          <div class="flex icons">
            <a
              :href="sharingFacebook"
              target="_blank"
              rel="noreferrer noopener"
              style="max-height: 25px"
            >
              <facebook-icon class="wp-icon" />
            </a>
            <a
              :href="sharingTwitter"
              target="_blank"
              rel="noreferrer noopener"
              style="max-height: 25px"
            >
              <twitter-icon class="wp-icon marginIcon" />
            </a>
            <a
              :href="sharingLinkedin"
              target="_blank"
              rel="noreferrer noopener"
              style="max-height: 25px"
            >
              <linkedin-icon class="wp-icon marginIcon" />
            </a>
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
  name: 'KoBlogArticle5',
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
      sharing: {
        url: '',
        quote: '',
        quoteTwitter: '',
      },
      sharingFacebook: '',
      sharingTwitter: '',
      sharingLinkedin: '',
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
        this.getDataArticle()
        this.shippingCreated = this.formatDate(this.dataArticle.created_at)
        this.shippingUpdated = this.formatDate(this.dataArticle.updated_at)
      }
    },
    getDataArticle() {
      this.sharing.url = window.location.href
      this.sharing.quote = `${this.dataArticle.titulo}%0A%0A${this.dataArticle.resumen}`
      this.sharing.quoteTwitter = `${this.dataArticle.titulo}%20by%20${this.dataArticle.autor}%0A`
      this.sharingFacebook = `https://www.facebook.com/sharer/sharer.php?u=${this.sharing.url}&quote=${this.sharing.quote}`
      this.sharingTwitter = `https://twitter.com/intent/tweet?text=${this.sharing.quoteTwitter}%0A${this.sharing.url}`
      this.sharingLinkedin = `https://www.linkedin.com/shareArticle?mini=true&url=${this.sharing.url}`
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
.size_title {
  font-size: 48px;
  font-weight: bold;
  color: black;
  line-height: 48px;
}

.container-article {
  @apply flex justify-center items-center;
}
.content-blog {
  @apply p-4;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: flex-start;
  box-sizing: content-box;
}
.content-date {
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
  margin-top: 10px;
}

.editor >>> .el-tiptap-editor > .el-tiptap-editor__content {
  border: none;
  padding: 10px 5px;
}
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
.wp-icon {
  font-size: 25px;
  bottom: 2px;
  color: #757575;
  cursor: pointer;
}
.wp-icon:hover {
  color: #494949;
}
.marginIcon {
  margin-left: 8px;
}
@screen sm {
  .container-article {
    width: 95%;
  }
  .icon-blog {
    width: 10%;
    margin-bottom: 40px;
  }
}
@media (max-width: 425px) {
  .icon-blog {
    width: 8%;
    margin-bottom: 40px;
  }
  .size_title {
    font-size: 25px;
  }
}
@media (max-width: 490px) {
  .icon-blog {
    width: 7%;
    margin-bottom: 40px;
  }
}
@media (max-width: 576px) {
  .grid-products {
    @apply w-9/5 grid-cols-2;
  }
}
@media (max-width: 600px) {
  .icon-blog {
    width: 6%;
    margin-bottom: 40px;
  }
  .size_title {
    font-size: 28px;
    line-height: 35px;
  }
}
@screen md {
  .container-article {
    @apply w-9/5;
  }
  .icon-blog {
    width: 5%;
    margin-bottom: 40px;
  }
}
@media (max-width: 900px) {
  .icon-blog {
    width: 4%;
    margin-bottom: 40px;
  }
}
@screen lg {
  .icon-blog {
    width: 4%;
    margin-bottom: 40px;
  }
}
@media (max-width: 1100px) {
  .icon-blog {
    width: 3%;
    margin-bottom: 40px;
  }
}
@screen mlg {
  .container-article {
    @apply w-7/8;
  }
  .icon-blog {
    width: 5%;
    margin-bottom: 80px;
  }
}
@screen xl {
  .container-article {
    @apply w-4/8;
  }
}
</style>
