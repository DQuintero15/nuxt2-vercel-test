<template>
  <div
    class="wrapper_blog"
    :style="[
      settingByTemplate9[0].blog,
      settingByTemplate9[0].settingGeneral,
      {
        '--font-style-1':
          settingByTemplate9[0]?.settingGeneral?.fount_1 ?? 'Poppins',
      },
    ]"
  >
    <div class="banner-blog">
      <div class="crumb">
        <nuxt-link to="/">
          <p
            class="txt-crumb s1"
            :style="`color: ${settingByTemplate9[0].blog.breadcrumbs};`"
          >
            Home
          </p>
        </nuxt-link>
        <p
          class="txt-crumb"
          :style="`color: ${settingByTemplate9[0].blog.breadcrumbs};`"
        >
          /
        </p>
        <p
          class="txt-crumb s2"
          :style="`color: ${settingByTemplate9[0].blog.breadcrumbs};`"
        >
          Blog
        </p>
      </div>
      <div
        class="flex w-full flex-row items-center justify-between pr-15 md:pr-20"
      >
        <div class="tittle-banner-blog">
          <p class="txt-banner">{{ $t('header_blog') }}</p>
        </div>
        <div class="relative flex flex-row items-center justify-end">
          <div class="absolute -right-10">
            <search-icon
              class="color-icon ml-5 cursor-pointer text-25 text-gray-600"
            />
          </div>
          <input
            v-model="filters.title"
            type="search"
            class="block w-full min-w-[250px] border-0 border-b border-gray-900 bg-gray-50 py-1.5 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
            :placeholder="$t('header_search')"
            @keyup.enter="updateFilters"
          />
        </div>
      </div>
    </div>
    <div class="contenedor">
      <div class="content-item w-full">
        <div class="content-item-productos">
          <div class="grid-products">
            <div
              v-for="article in listBlogs"
              :key="article.id"
              class="content-products"
            >
              <KoBlogCard
                :article="article"
                :setting-blog="settingByTemplate9[0].blog"
                :setting-general="settingByTemplate9[0].settingGeneral"
                style="max-height: 560px"
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
export default {
  name: 'Ko9Blog',
  components: {
    KoBlogCard: () => import('./_card/blog-card.vue'),
  },
  mixins: [filters],
  props: {
    dataStore: {
      type: Object,
      required: true,
    },
    settingByTemplate9: {
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
    setDefaultImage() {
      this.fallbackImage = require('@/assets/img/logo_nuevas_tiendas.png')
    },
  },
}
</script>
<style scoped>
.wrapper_blog {
  display: flex;
  flex-direction: column;
  width: 100%;
  background: var(--background_color_1);
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  margin-bottom: 40px;
  padding-top: 20px;
}
.contenedor {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 40px;
}
.content-item-productos {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.grid-products {
  @apply grid items-center justify-center gap-4;
  box-sizing: border-box;
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
  color: var(--btnhover);
}
.product_pagination >>> .el-pagination.is-background .btn-prev:hover {
  color: var(--btnhover);
}
.product_pagination
  >>> .el-pagination.is-background
  .el-pager
  li:not(.disabled):hover {
  color: var(--btnhover);
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
  /* font-family: 'Poppins' !important ; */
  font-family: var(--font-style-1) !important ;
  font-weight: 700;
}
.tittle-banner-blog {
  @apply flex w-full flex-col items-center justify-center;
}
.banner-blog {
  padding-top: 20px;
  @apply flex w-full flex-col items-start justify-center pt-8;
  /* background-color: #efefef; */
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
  /* font-family: 'Poppins' !important ; */
  font-weight: bold;
  color: #2c2930;
  margin-bottom: 20px;
  font-family: var(--font-style-1) !important ;
}
.content-search-blog {
  border-bottom: 1px solid gray;
  margin-bottom: 30px;
  height: 30px;
  @apply flex flex-row  items-center;
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
  border: 2px solid #303030;

  /* -webkit-box-shadow: 0px 5px 12px 5px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 5px 12px 5px rgba(0, 0, 0, 0.2); */
}
.input-animated:hover > .input-text {
  width: 240px;
  padding: 0 15px;
  color: #303030;
  font-size: 16px;
}
.input-text:focus {
  width: 240px;
  padding: 0 15px;
  color: #303030;
  font-size: 16px;
}

.input-animated:hover > .search-icon {
  background: #fff;
  cursor: pointer;
  color: #000;
}
.search-icon {
  color: #303030;
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
  color: #303030;
  font-size: 0px;
  transition: 0.4s;
  width: 0px;
  /* font-family: 'Poppins' !important ; */
  font-family: var(--font-style-1) !important ;
}
.input-text:focus {
  border: none;
}
.empty-space {
  @apply mx-2;
}

.crumb {
  @apply mt-4 flex w-full flex-row items-start justify-start;
}
.txt-crumb {
  font-family: Arial, sans-serif;
  font-size: 12px;
  /* color: #b3b3b3; */
  line-height: 14px;
  padding: 2px 4px;
  cursor: pointer;
  transition: all 0.25s ease;
  font-family: var(--font-style-1) !important ;
}
.s1:hover {
  background-color: #2c2930;
  color: #fff;
  transition: all 0.25s ease;
}
.s2:hover {
  background-color: #2c2930;
  color: #fff;
  transition: all 0.25s ease;
}

@screen sm {
  .content-products {
    @apply w-full;
    -webkit-box-shadow: 0px 6px 15px 6px #bfbfbf;
    box-shadow: 0px 6px 15px 6px #bfbfbf;
  }
  .txt-banner {
    font-size: 36px;
  }
  #separator {
    margin-left: 10px;
  }
  .content-search-blog {
    @apply flex w-9/0 justify-center;
  }
  .input-text {
    width: 240px;
    color: #303030;
    padding: 0 15px;
    font-size: 16px;
  }
  .title {
    @apply hidden;
  }
  .empty-space {
    @apply hidden;
  }

  .crumb {
    @apply items-center justify-center;
  }
}
@screen md {
  .grid-products {
    @apply w-9/5 grid-cols-2;
  }
  .txt-banner {
    font-size: 36px;
  }
  #separator {
    margin-left: 10px;
  }
  .content-search-blog {
    @apply w-7/0 justify-center;
  }
  .input-text {
    width: 0px;
    padding: 0px;
  }
  .title {
    @apply flex;
  }
  .empty-space {
    @apply flex;
  }
}
@screen lg {
  .grid-products {
    @apply w-9/5 grid-cols-3;
  }
  /* .content-search-blog {
    @apply w-6/0;
  } */
}
@media (max-width: 768px) {
  .grid-products {
    @apply w-9/0 grid-cols-2;
  }
}
@media (max-width: 600px) {
  .grid-products {
    @apply w-9/0 grid-cols-1;
  }
}
@media (min-width: 1025px) {
  .content-search-blog {
    @apply hidden;
  }
  .crumb {
    @apply items-start justify-start;
    padding-left: 40px;
  }
  .tittle-banner-blog {
    @apply items-start justify-start;
    padding-left: 40px;
  }
}
@screen mlg {
  .grid-products {
    @apply w-9/6 gap-8;
  }
  .tittle-banner-blog {
    @apply flex w-auto flex-row items-center justify-center;
  }
  .txt-banner {
    font-size: 48px;
  }
  #separator {
    margin-left: 20px;
  }
  .content-search-blog {
    @apply w-6/0;
  }
}
</style>
