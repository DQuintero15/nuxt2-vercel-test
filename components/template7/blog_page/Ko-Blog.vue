<template>
  <div
    class="wrapper_error"
    :style="[
      settingByTemplate7[0].settingK07Blog,
      settingByTemplate7[0].settingGeneral,
      {
        '--font-style-1':
          settingByTemplate7[0]?.settingGeneral?.fount_1 ?? 'David libre',
      },
      {
        '--font-style-2':
          settingByTemplate7[0]?.settingGeneral?.fount_2 ?? 'Great Vibes',
      },
      {
        '--font-style-3':
          settingByTemplate7[0]?.settingGeneral?.fount_3 ?? 'Lora',
      },
    ]"
  >
    <div class="wrapper-banner-blog">
      <div
        class="banner-blog"
        :style="`background-image: url(${idCloudinaryBanner(
          settingByTemplate7[0].settingK07Blog1['--url_img'],
          'banner'
        )});`"
      >
        <div class="tittle-banner-blog">
          <p class="txt-banner">{{ dataStore.nombre }}</p>
          <p class="txt-banner" id="separator">{{ $t('header_blog') }}</p>
          <div class="icon-blog">
            <svg
              class="svg-icon-blog"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="-3 0 511 511.99901"
            >
              <path
                d="m291.367188 73.578125h-98.34375c-102.238282 0-185.117188 82.878906-185.117188 185.117187 0 81.332032 52.453125 150.402344 125.375 175.253907 9.402344 3.203125 14.46875 13.5 11.050781 22.824219-4.800781 13.09375-13.28125 26.269531-20.058593 35.613281-3.914063 5.390625.425781 12.921875 7.042968 12.164062 51.769532-5.921875 78.121094-37.503906 87.933594-52.640625 3.277344-5.058594 8.902344-8.097656 14.933594-8.097656h57.183594c102.238281 0 185.117187-82.878906 185.117187-185.117188 0-102.238281-82.878906-185.117187-185.117187-185.117187zm0 0"
                fill="#e5e8ec"
              />
              <path
                d="m292.324219 73.589844-141.546875 141.546875c-3.878906 3.878906-6.535156 8.648437-7.84375 13.753906l-21.824219 81.5c-5.605469 20.9375.433594 43.464844 15.761719 58.792969 11.5 11.5 26.785156 17.832031 43.050781 17.832031 5.3125 0 10.605469-.695313 15.742187-2.070313l81.425782-21.804687c5.132812-1.304687 9.929687-3.964844 13.828125-7.863281l145.464843-145.464844c11.207032-.050781 21.734376-4.441406 29.664063-12.371094l.035156-.035156c-25.195312-71.828125-93.417969-123.410156-173.757812-123.816406zm0 0"
                fill="#dadadc"
              />
              <path
                d="m486.457031 58.375-38.777343-38.78125c-16.269532-16.265625-42.648438-16.265625-58.914063 0l-42.332031 42.332031 97.695312 97.691407 42.328125-42.328126c16.269531-16.269531 16.269531-42.644531 0-58.914062zm0 0"
                fill="#ff8892"
              />
              <path
                d="m466.449219 38.367188c16.269531 16.269531 16.269531 42.644531 0 58.914062l-42.328125 42.328125 20.007812 20.007813 42.328125-42.328126c16.269531-16.269531 16.269531-42.644531 0-58.914062zm0 0"
                fill="#ff5754"
              />
              <path
                d="m208.621094 297.433594-49.875-11.570313-8.644532 32.289063c-2.851562 10.648437.195313 22.011718 7.988282 29.808594 7.796875 7.796874 19.160156 10.84375 29.8125 7.992187l32.289062-8.648437zm0 0"
                fill="#43596b"
              />
              <path
                d="m220.191406 347.304688 49.5-13.253907 16.839844-48.238281-67.453125-67.453125-47.078125 18.003906-13.253906 49.5zm0 0"
                fill="#ffd2b0"
              />
              <path
                d="m269.695312 334.054688-3.398437-39.617188-45.449219-9.230469-9.234375-45.453125-39.613281-3.394531 174.433594-174.433594 97.695312 97.691407zm0 0"
                fill="#ffb44f"
              />
              <path
                d="m460.730469 143.019531-97.695313-97.695312c-4.777344-4.773438-12.519531-4.773438-17.296875 0l-15.902343 15.902343c-4.773438 4.777344-4.773438 12.519532 0 17.296876l97.695312 97.695312c4.777344 4.773438 12.519531 4.773438 17.296875 0l15.902344-15.902344c4.773437-4.777344 4.773437-12.519531 0-17.296875zm0 0"
                fill="#e5e8ec"
              />
              <path
                d="m130.957031 440.945312c5.320313 1.8125 8.386719 7.800782 6.425781 13.140626-4.582031 12.503906-12.910156 25.277343-19.089843 33.792968-3.589844 4.953125-3.902344 11.316406-.8125 16.609375 3 5.140625 8.867187 8.09375 14.78125 7.414063 55.632812-6.359375 83.835937-41.289063 93.378906-56.011719 1.898437-2.929687 5.128906-4.675781 8.640625-4.675781h57.183594c106.210937 0 192.621094-86.410156 192.621094-192.621094 0-31.082031-7.546876-61.78125-21.863282-89.167969l3.910156-3.90625c5.816407-5.816406 7.226563-14.386719 4.25-21.546875 0 0 21.46875-21.46875 21.480469-21.480468 18.949219-18.949219 18.929688-50.59375 0-69.523438 0 0-38.78125-38.78125-38.78125-38.78125-18.867187-18.867188-50.558593-18.964844-69.527343 0l-21.464844 21.464844c-2.378906-.992188-4.953125-1.515625-7.605469-1.515625-5.273437 0-10.226563 2.054687-13.953125 5.78125l-15.902344 15.902343c-3.292968 3.289063-5.269531 7.539063-5.691406 12.117188-9.074219-1.296875-18.273438-1.964844-27.472656-1.964844h-98.34375c-44.179688 0-87.347656 15.339844-121.550782 43.199219-3.214843 2.617187-3.695312 7.34375-1.082031 10.558594 2.617188 3.210937 7.34375 3.695312 10.558594 1.078125 31.535156-25.683594 71.339844-39.828125 112.074219-39.828125h98.34375c7.941406 0 15.882812.527343 23.726562 1.574219 0 0-148.378906 148.375-148.402344 148.398437-.921874.921875-1.601562 2.105469-1.9375 3.367187l-21.902343 81.789063c-3.53125 13.195313.273437 27.394531 9.933593 37.054687 9.59375 9.59375 23.957032 13.441407 37.058594 9.933594 0 0 81.761719-21.890625 81.789063-21.898437 1.242187-.335938 2.457031-1.035157 3.367187-1.941407l42.476563-42.476562c2.929687-2.929688 2.929687-7.679688 0-10.609375-2.929688-2.933594-7.679688-2.933594-10.609375 0l-31.074219 31.074219-2.019531-23.550782c-.28125-3.28125-2.757813-6.054687-5.984375-6.710937l-40.578125-8.242187-8.242188-40.582032c-.65625-3.222656-3.433594-5.699218-6.714844-5.980468l-23.546874-2.019532 141.128906-141.128906 87.082031 87.082031s-88.828125 88.828125-88.832031 88.832031c-2.859375 2.859376-2.902344 7.710938 0 10.613282 2.886718 2.886718 7.730468 2.882812 10.609375 0l89.875-89.875c7.207031 3.007812 16.042969 1.25 21.558593-4.265625l.832032-.832031c11.816406 24.164062 18.019531 50.925781 18.019531 78.003906 0 97.9375-79.679687 177.617187-177.613281 177.617187h-57.183594c-8.621094 0-16.558594 4.304688-21.234375 11.519531-8.382813 12.9375-33.207031 43.628907-82.53125 49.285157-.058594-.039063-.132813-.175781-.128906-.226563 0-.011718.015625-.042968.054687-.09375 6.734375-9.285156 15.851563-23.316406 21.03125-37.4375 4.820313-13.148437-2.515625-28.027344-15.675781-32.511718-71.949219-24.519532-120.292969-92.09375-120.292969-168.152344 0-43.488282 15.890625-85.339844 44.742188-117.84375 2.75-3.101563 2.46875-7.84375-.628906-10.59375-3.101563-2.75-7.84375-2.46875-10.59375.632812-31.289063 35.253906-48.523438 80.644532-48.523438 127.808594 0 82.480469 52.425781 155.761719 130.457031 182.351562zm263.207031-416.148437c13.171876-13.167969 35.148438-13.15625 48.304688 0 0 0 38.761719 38.761719 38.78125 38.78125 13.164062 13.164063 13.148438 35.152344 0 48.304687l-20.425781 20.421876-87.082031-87.082032s20.414062-20.417968 20.421874-20.425781zm-58.925781 41.632813s15.882813-15.882813 15.902344-15.902344c1.824219-1.824219 4.863281-1.824219 6.683594 0l97.695312 97.695312c1.84375 1.839844 1.84375 4.839844 0 6.683594l-15.902343 15.902344c-1.800782 1.800781-4.890626 1.796875-6.691407-.003906-.003906-.003907-97.589843-97.59375-97.6875-97.691407-1.824219-1.824219-1.824219-4.859375 0-6.683593zm-150.691406 282.519531c-7.523437 1.464843-15.609375-.953125-21.054687-6.394531-5.882813-5.882813-8.199219-14.53125-6.046876-22.566407l5.28125-19.730469 43.0625 43.058594c.003907 0-20.734374 5.535156-21.242187 5.632813zm29.042969-62.351563c.601562 2.953125 2.910156 5.257813 5.859375 5.859375l39.949219 8.113281 2.378906 27.753907-39.246094 10.511719-55.316406-55.320313 10.507812-39.246094 27.753906 2.378907zm0 0"
              />
              <path
                d="m261.253906 223.222656c-2.929687 2.929688-2.929687 7.683594 0 10.609375 0 0 7.136719 7.140625 7.144532 7.148438 2.898437 2.898437 7.71875 2.894531 10.609374 0 2.933594-2.929688 2.933594-7.683594 0-10.609375l-7.144531-7.148438c-2.929687-2.929687-7.679687-2.929687-10.609375 0zm0 0"
              />
              <path
                d="m352.667969 164.175781c1.921875.003907 3.851562-.707031 5.304687-2.160156 2.929688-2.929687 2.929688-7.679687 0-10.613281l-7.144531-7.144532c-2.929687-2.929687-7.679687-2.929687-10.613281 0-2.929688 2.929688-2.929688 7.679688 0 10.609376 0 0 7.144531 7.144531 7.148437 7.148437 1.429688 1.429687 3.363281 2.160156 5.304688 2.160156zm0 0"
              />
              <path
                d="m303.445312 197.953125c-4.132812-.277344-7.710937 2.847656-7.988281 6.984375-.277343 4.132812 2.851563 7.710938 6.984375 7.988281 7.363282.496094 14.664063-2.414062 19.863282-7.613281 5.328124-5.328125 8.105468-12.570312 7.613281-19.863281-.277344-4.136719-3.859375-7.261719-7.988281-6.984375-4.132813.277344-7.261719 3.855468-6.984376 7.988281.203126 2.976563-.984374 5.980469-3.25 8.25-2.265624 2.265625-5.273437 3.453125-8.25 3.25zm0 0"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
    <div class="contenedor">
      <div class="content-search-blog">
        <!-- <div class="text-search">
          <p class="title">Buscar Articulo</p>
        </div> -->
        <div class="empty-space"></div>
        <div class="content-tittle">
          <div class="input-animated">
            <input
              v-model="filters.title"
              type="search"
              class="input-text"
              :placeholder="$t('header_search')"
              @keyup.enter="updateFilters"
            />
            <span class="search-icon">
              <svg
                class="search-header"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                width="20px"
                height="20px"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
      <div class="content-item">
        <div class="content-item-productos">
          <div class="grid-products">
            <div v-for="article in listBlogs" :key="article.id" class="h-full">
              <KoBlogCard1
                :article="article"
                :setting-k07-blog="settingByTemplate7[0].settingK07Blog"
                :setting-general="settingByTemplate7[0].settingGeneral"
              />
            </div>
          </div>
          <div v-if="listBlogs?.length === 0" class="content-products-empty">
            <div class="header-content-logo">
              <nuxt-link to="/" class="wrapper-logo">
                <img
                  loading="lazy"
                  :src="imageUrl"
                  class="header-logo"
                  alt="Logo Img"
                  @error="setDefaultImage"
                />
              </nuxt-link>
            </div>
            <p class="txt-products-empty">{{ $t('home_msgCatalogo') }}</p>
          </div>
          <div v-if="totalBlogs > filters.limit" class="pagination-medium">
            <div class="product_pagination">
              <el-pagination
                background
                layout="prev, pager, next"
                class="pagination bg-transparent"
                :total="totalBlogs"
                :page-size="filters.limit"
                :current-page.sync="filters.page"
                @current-change="changePage"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import filters from '@/mixins/filterBlogs'
import idCloudinaryBanner from '@/mixins/idCloudinary'
export default {
  name: 'KoBlog',
  components: {
    KoBlogCard1: () => import('./_blog-card/Ko-card-blog.vue'),
  },
  mixins: [idCloudinaryBanner, filters],
  props: {
    dataStore: {
      type: Object,
      required: true,
    },
    settingByTemplate7: {
      type: Array,
      required: true,
    },
    logoStore: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      fallbackImage: '',
    }
  },
  computed: {
    ...mapState(['stateListBLogs']),
    imageUrl() {
      if (this.fallbackImage) {
        return this.fallbackImage
      }
      if (this.logoStore?.logoMigrated === 1) {
        return this.logoStore.logo
      } else {
        return `${this.$store.state.urlKomercia}/logos/${this.logoStore.identifier}`
      }
    },
  },
  methods: {
    setBg() {
      if (this.settingByTemplate7[0].settingK07Blog.url_img) {
        var imagen = document.getElementById('BgBannerBlog')
        imagen.style.backgroundImage = `url(${this.settingByTemplate7[0].settingK07Blog.url_img})`
      }
    },
    setDefaultImage() {
      this.fallbackImage = require('@/assets/img/logo_nuevas_tiendas.png')
    },
  },
}
</script>
<style scoped>
.wrapper_error {
  display: flex;
  flex-direction: column;
  width: 100%;
  background: var(--background_color_2);
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  margin-bottom: 40px;
}
.contenedor {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.content-item-productos {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.grid-products {
  @apply grid items-start justify-center gap-4;
  box-sizing: border-box;
}
.content-products-empty {
  width: 100%;
  min-height: calc(37vh);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.content-products-empty p {
  font-size: 18px;
  opacity: 0.6;
  font-weight: bold;
  color: var(--color_subtext);
}
.pagination-medium {
  margin-top: 10px;
  background: transparent;
}
.pagination {
  font-size: 18px;
  color: var(--color_text);
  background: transparent;
}
.product_pagination >>> .el-pagination.is-background .btn-next {
  color: var(--color_text);
  background-color: transparent;
}
.product_pagination >>> .el-pagination.is-background .btn-prev {
  color: var(--color_text);
  background-color: transparent;
}
.product_pagination >>> .el-pagination.is-background .el-pager li {
  color: var(--color_text);
  background-color: transparent;
}
.product_pagination >>> .el-pagination.is-background .btn-next:hover {
  color: var(--hover_text);
}
.product_pagination >>> .el-pagination.is-background .btn-prev:hover {
  color: var(--hover_text);
}
.product_pagination
  >>> .el-pagination.is-background
  .el-pager
  li:not(.disabled):hover {
  color: var(--hover_text);
}
.product_pagination
  >>> .el-pagination.is-background
  .el-pager
  li:not(.disabled).active {
  background-color: var(--color_icon);
  color: white;
}
.txt-banner {
  color: var(--color_title);
  font-family: var(--font-style-1) !important ;
  font-weight: 400;
}
.tittle-banner-blog {
  @apply my-48 flex w-full flex-row items-center justify-center;
}
.wrapper-banner-blog {
  width: 100%;
}
.banner-blog {
  @apply flex w-full flex-col items-center justify-center bg-cover bg-no-repeat;
  margin-bottom: 40px;
}
#separator {
  margin-left: 20px;
}
.content-tittle {
  width: auto;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  border-radius: 5px;
  background: white;
}
.title {
  font-size: 25px;
  font-family: var(--font-style-1) !important ;
  font-weight: bold;
  color: #3f3f3f;
  margin-bottom: 20px;
}
.content-search-blog {
  @apply flex flex-row  items-center;
  border-bottom: 1px solid gray;
  margin-bottom: 30px;
  height: 30px;
}
.input-animated {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  transform: translate(-0%, -50%);
  margin-bottom: -20px;
  border-radius: 50px;
  background: white;
  border: 2px solid #7f7f7f;

  /* -webkit-box-shadow: 0px 5px 12px 5px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 5px 12px 5px rgba(0, 0, 0, 0.2); */
}
.input-animated:hover > .input-text {
  width: 240px;
  /* padding: 0 15px; */
  color: #7f7f7f;
  font-size: 16px;
}
.input-text:focus {
  width: 240px;
  color: #7f7f7f;
  font-size: 16px;
}
.input-animated:hover > .search-icon {
  background: #fff;
  cursor: pointer;
  color: var(--hover_text);
}
.search-icon {
  color: #7f7f7f;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.4s;
  border-radius: 50%;
}
.input-text {
  border: none;
  background: none;
  outline: none;
  color: transparent;
  font-size: 0px;
  padding-left: 10px;
  transition: 0.4s;
  font-family: var(--font-style-3) !important ;
}
.input-text:focus {
  border: none;
}
::-webkit-input-placeholder {
  @apply items-center text-left;
  font-size: 16px;
  color: #7f7f7f;
  font-family: var(--font-style-3) !important ;
}
.empty-space {
  @apply mx-2;
}
@screen sm {
  .grid-products {
    @apply w-9/0 grid-cols-1;
  }
  .banner-blog {
    padding-top: 80px;
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
  .content-search-blog {
    @apply w-9/0 justify-center;
  }
  .input-text {
    width: 240px;
    color: #24272b;
    padding: 0 15px;
    font-size: 16px;
  }
  .title {
    @apply hidden;
  }
  .empty-space {
    @apply hidden;
  }
}
@media (min-width: 425px) {
  .icon-blog {
    width: 8%;
    margin-bottom: 40px;
  }
}
@media (min-width: 490px) {
  .icon-blog {
    width: 7%;
    margin-bottom: 40px;
  }
}
@media (min-width: 576px) {
  .grid-products {
    @apply w-9/5 grid-cols-2;
  }
  .tittle-banner-blog {
    @apply w-9/5;
  }
}
@media (min-width: 600px) {
  .icon-blog {
    width: 6%;
    margin-bottom: 40px;
  }
}
@screen md {
  .grid-products {
    @apply w-9/5 grid-cols-3;
  }
  .banner-blog {
    padding-top: 90px;
  }
  .txt-banner {
    font-size: 36px;
  }
  .icon-blog {
    width: 5%;
    margin-bottom: 40px;
  }
  #separator {
    margin-left: 10px;
  }
  .content-search-blog {
    @apply w-7/0 justify-center;
  }

  .title {
    @apply flex;
  }
  .empty-space {
    @apply flex;
  }
}
@media (min-width: 900px) {
  .icon-blog {
    width: 4%;
    margin-bottom: 40px;
  }
}
@screen lg {
  .grid-products {
    @apply w-9/5 grid-cols-3;
  }
  .icon-blog {
    width: 4%;
    margin-bottom: 40px;
  }
  .content-search-blog {
    @apply w-6/0;
  }
}
@media (min-width: 1100px) {
  .icon-blog {
    width: 3%;
    margin-bottom: 40px;
  }
}
@screen mlg {
  .grid-products {
    @apply w-9/3;
  }
  .banner-blog {
    padding-top: 120px;
  }
  .tittle-banner-blog {
    @apply my-48 flex w-9/3 flex-row items-center justify-center;
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
  .content-search-blog {
    @apply w-6/0;
  }
}
@media (min-width: 1192px) {
  .grid-products {
    width: 1192px;
  }
  .content-search-blog {
    width: 800px;
  }
}
@screen xl {
  .tittle-banner-blog {
    @apply w-8/3;
  }
}
@screen xml {
  .tittle-banner-blog {
    @apply w-6/3;
  }
}
@screen xxl {
  .tittle-banner-blog {
    @apply w-4/6;
  }
}
</style>
