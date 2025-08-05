<template>
  <div class="content-blog">
    <div class="bannerBlog">
      <div class="crumb">
        <nuxt-link to="/">
          <p class="txt-crumb s1">{{ $t('header_inicio') }}</p>
        </nuxt-link>
        <p class="separatorCrumb">/</p>
        <p class="txt-crumb s2">
          {{ $t('header_blog') }}
        </p>
      </div>
    </div>
    <div class="content-art-blog">
      <div class="banner-blog">
        <div class="tittle-banner-blog">
          <p class="txt-banner">Últimos blogs</p>
        </div>
        <input
          v-model="filters.title"
          type="search"
          :placeholder="$t('header_search')"
          @keyup.enter="updateFilters"
        />
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
                <KBlogCard
                  :article="article"
                  :setting-blog="settingByTemplate10[0].blog"
                  :setting-general="settingByTemplate10[0].settingGeneral"
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
  </div>
</template>
<script>
import { mapState } from 'vuex'
import filters from '@/mixins/filterBlogs'
export default {
  name: 'KoBlogIndex',
  components: {
    KBlogCard: () => import('./_card/k10-blog-card.vue'),
  },
  mixins: [filters],
  props: {
    dataStore: {
      type: Object,
      required: true,
    },
    settingByTemplate10: {
      type: Array,
      required: true,
    },
    logoStore: {
      type: Object,
      required: true,
    },
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
.content-blog {
  background: white;
  @apply flex w-full flex-col items-center justify-center;
}
.content-art-blog {
  @apply flex flex-col items-center justify-center;
}
.contenedor {
  @apply mt-30 flex w-full items-center justify-start;
}
.content-item-productos {
  @apply flex w-full flex-col items-center justify-center;
}
.grid-products {
  @apply mb-40 grid items-center justify-center gap-4;
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
  color: #222;
  font-family: 'Poppins' !important ;
  font-weight: 600;
}
.tittle-banner-blog {
  @apply flex w-full flex-col items-center justify-center;
}
.banner-blog {
  @apply z-10 flex w-full flex-row items-center justify-between pt-8;
  /* background-color: #efefef; */
}
#separator {
  margin-left: 20px;
}
.title {
  font-size: 25px;
  font-family: 'Poppins' !important ;
  font-weight: bold;
  color: #2c2930;
  margin-bottom: 20px;
}
.crumb {
  @apply flex w-full flex-row items-center justify-center;
}
.separatorCrumb {
  font-size: 9px;
  color: #222;
  font-family: 'Poppins', Helvetica, Arial, sans-serif !important;
  @apply cursor-pointer pr-6 leading-14 transition-all duration-0.2 ease-in;
}
.txt-crumb {
  font-size: 15px;
  color: #222;
  font-family: 'Poppins', Helvetica, Arial, sans-serif !important;
  @apply cursor-pointer pr-6 leading-14 transition-all duration-0.2 ease-in;
}
.s1:hover {
  color: #eb7025;
  transition: all 0.25s ease;
}
.s2:hover {
  color: #eb7025;
  transition: all 0.25s ease;
}
.input-text {
  @apply mt-8;
}

@screen sm {
  .bannerBlog {
    @apply hidden;
  }
  .content-art-blog {
    margin-top: 140px;
    @apply w-9/0;
  }
  .tittle-banner-blog {
    @apply flex items-start justify-between;
  }
  .grid-products {
    @apply w-full grid-cols-1 gap-8;
  }
  .content-products {
    @apply transition-all duration-0.2 ease-in;
  }
  .content-products:hover {
    @apply w-full transition-all duration-0.2 ease-in;
    -webkit-box-shadow: 0px 6px 15px 6px #bfbfbf;
    box-shadow: 0px 6px 15px 6px #bfbfbf;
  }
  .txt-banner {
    font-size: 30px;
  }
  #separator {
    margin-left: 10px;
  }
  .title {
    @apply hidden;
  }
  .crumb {
    @apply items-center justify-center;
  }
}
@screen md {
  .grid-products {
    @apply grid-cols-2 items-start justify-start;
  }
  .bannerBlog {
    @apply flex w-full items-center justify-items-center bg-cover bg-center bg-no-repeat py-30;
  }
  #separator {
    margin-left: 10px;
  }
}
@screen lg {
  .grid-products {
    @apply grid-cols-3 gap-4;
  }
}
@screen mlg {
  .content-art-blog {
    margin-top: 0px;
  }
  .grid-products {
    @apply w-full gap-8;
  }
  #separator {
    margin-left: 20px;
  }
}
@media (min-width: 1400px) {
  .content-art-blog {
    @apply w-full;
    max-width: 1400px;
  }
}
</style>
