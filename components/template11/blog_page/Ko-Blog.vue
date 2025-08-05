<template>
  <div
    class="content-blog"
    :style="[
      settingByTemplate11[0].blog,
      settingByTemplate11[0].setting11General,
      {
        '--font-style-1':
          settingByTemplate11[0]?.setting11General?.fount_1 ?? 'Roboto',
      },
    ]"
  >
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
                  :setting-blog="settingByTemplate11[0].blog"
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
              <p class="txt-products-empty">
                No se encontraron artículos relacionados
              </p>
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
  name: 'KoBlogPage',
  components: {
    KBlogCard: () => import('./_card/k11-blog-card.vue'),
  },
  mixins: [filters],
  props: {
    dataStore: {
      type: Object,
      required: true,
    },
    settingByTemplate11: {
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
.content-blog {
  background: var(--background_color_1);
  @apply flex w-full flex-col items-center justify-center;
}
.content-art-blog {
  @apply z-0 flex flex-col items-center justify-center;
}
.contenedor {
  @apply mt-30 flex w-full flex-col items-center justify-center;
}
.content-item-productos {
  @apply flex w-full flex-col items-center justify-center;
}
.grid-products {
  @apply mb-40 grid items-center justify-center gap-4;
  box-sizing: border-box;
}
.pagination-medium {
  background: transparent;
  @apply mt-10;
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
  font-family: var(--font-style-1) !important;
  @apply font-semibold;
}
.tittle-banner-blog {
  @apply flex w-full flex-col items-center justify-center;
}
.banner-blog {
  @apply z-10 flex w-full flex-row items-center justify-between pt-8;
}
.crumb {
  @apply flex w-full flex-row items-center justify-center;
}
.separatorCrumb {
  font-size: 9px;
  color: #222;
  font-family: var(--font-style-1) !important;
  @apply cursor-pointer pr-6 leading-14 transition-all duration-0.2 ease-in;
}
.txt-crumb {
  font-size: 15px;
  color: var(--color_title);
  font-family: var(--font-style-1) !important;
  @apply cursor-pointer pr-6 leading-14 transition-all duration-0.2 ease-in;
}
.s1:hover {
  color: var(--color_title);
  transition: all 0.25s ease;
}
.s2:hover {
  color: var(--color_title);
  transition: all 0.25s ease;
}
@screen sm {
  .bannerBlog {
    max-width: 1200px;
    @apply flex w-full items-center justify-items-center border-b bg-cover bg-center bg-no-repeat py-20;
  }
  .content-art-blog {
    @apply w-9/0;
  }
  .tittle-banner-blog {
    @apply mt-20 items-start justify-start;
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
  .crumb {
    @apply items-center justify-center;
  }
}
@screen md {
  .grid-products {
    @apply grid-cols-2 items-start justify-start;
  }
}
@screen lg {
  .grid-products {
    @apply grid-cols-3 gap-4;
  }
}
@media (min-width: 1025px) {
  .tittle-banner-blog {
    @apply items-start justify-start;
  }
}
@screen mlg {
  .content-art-blog {
  }
  .grid-products {
    @apply w-full gap-8;
  }
  .tittle-banner-blog {
    @apply flex w-auto flex-row items-center justify-center;
  }
}
@media (min-width: 1200px) {
  .content-art-blog {
    @apply w-full;
    max-width: 1200px;
  }
}
</style>
