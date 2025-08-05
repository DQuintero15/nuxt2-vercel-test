<template>
  <div
    class="content-blog"
    :style="[
      settingByTemplate13[0].setting13General,
      {
        '--font-style-1':
          settingByTemplate13[0]?.setting13General?.fount_1 ?? 'Poppins',
      },
    ]"
  >
    <div class="content-art-blog">
      <div class="banner-blog">
        <div class="tittle-banner-blog">
          <p class="txt-banner">Últimos blogs</p>
        </div>
        <input
          v-model="filters.title"
          class="input-search"
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
                <KBlogCard :article="article" class="h-full" />
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
  name: 'Ko13Blog',
  components: {
    KBlogCard: () => import('./blogcard.vue'),
  },
  mixins: [filters],
  props: {
    dataStore: {
      type: Object,
      required: true,
    },
    settingByTemplate13: {
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
  background: #ffffff;
  @apply mt-20 flex w-full flex-col items-center justify-center;
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
  color: black;
  background: transparent;
}
.product_pagination >>> .el-pagination.is-background .btn-next {
  color: black;
  background-color: transparent;
}
.product_pagination >>> .el-pagination.is-background .btn-prev {
  color: black;
  background-color: transparent;
}
.product_pagination >>> .el-pagination.is-background .el-pager li {
  color: black;
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
  background-color: black;
  color: white;
}
.txt-banner {
  color: black;
  font-family: var(--font-style-1) !important;
  @apply font-semibold;
}
.banner-blog {
  @apply flex w-full flex-row items-center justify-between;
}
.tittle-banner-blog {
  @apply flex w-full items-center justify-start;
}
.input-search {
  box-shadow: inset 0px -48px 0px -43px black;
}
.content-products-empty {
  @apply flex h-full w-full flex-col items-center justify-center text-center;
}
@screen sm {
  .content-art-blog {
    @apply w-9/0;
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
@screen mlg {
  .grid-products {
    @apply w-full gap-8;
  }
}
@media (min-width: 1200px) {
  .content-art-blog {
    max-width: 1300px;
    @apply w-full;
  }
}
</style>
