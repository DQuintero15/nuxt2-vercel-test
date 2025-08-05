<template>
  <div class="content-blog">
    <div class="bannerBlog">
      <div class="crumb">
        <nuxt-link
          :to="{
            path: stateWapiME ? `/wa/${dataStore.id}/` : `/`,
          }"
        >
          <p class="txt-crumb s1">{{ $t('header_inicio') }}</p>
        </nuxt-link>
        <p class="separatorCrumb">/</p>
        <p class="txt-crumb s2">
          {{ $t('header_blog') }}
        </p>
      </div>
    </div>
    <div class="wrapper-art-blog">
      <div class="content-art-blog">
        <div class="w-full flex flex-row justify-between items-center">
          <p class="text-left font-semibold text-black text-30">
            Últimos blogs
          </p>
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
                  <KoBlogCard :article="article" :dataStore="dataStore" />
                </div>
              </div>
              <div
                v-if="totalBlogs > filters.limit"
                class="mt-10 product_pagination"
              >
                <el-pagination
                  background
                  layout="prev, pager, next"
                  class="text-18 text-black bg-transparent"
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
  name: 'KoBlogWa',
  components: {
    KoBlogCard: () => import('./Ko-blog-card.vue'),
  },
  mixins: [filters],
  computed: {
    ...mapState(['dataStore', 'stateWapiME', 'stateListBLogs']),
  },
}
</script>
<style scoped>
.content-blog {
  /* background: white; */
  height: calc(100vh);
  @apply w-full flex flex-col justify-start items-center;
}
.wrapper-art-blog {
  overflow-y: auto;
  height: calc(100vh - 55px);
  max-width: 900px;
  box-shadow: 0 1px 3px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  background-color: #fff;
  @apply w-full flex justify-center items-start;
}
.content-art-blog {
  @apply flex flex-col justify-start items-center z-0;
}
.contenedor {
  @apply w-full flex flex-col justify-center items-center mt-30;
}
.content-item-productos {
  @apply w-full flex flex-col justify-center items-center;
}
.grid-products {
  @apply grid gap-4 justify-center items-center mb-40;
  box-sizing: border-box;
}
.pagination-medium {
  background: transparent;
  @apply mt-10;
}
.pagination {
  font-size: 18px;
  color: #222444;
  background: transparent;
}
.product_pagination >>> .el-pagination.is-background .btn-next {
  color: #222444;
  background-color: transparent;
}
.product_pagination >>> .el-pagination.is-background .btn-prev {
  color: #222444;
  background-color: transparent;
}
.product_pagination >>> .el-pagination.is-background .el-pager li {
  color: #222444;
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
  background-color: green;
  color: white;
}
.txt-banner {
  color: #222;

  @apply font-semibold;
}
.tittle-banner-blog {
  @apply w-full flex flex-col justify-center items-center;
}
.banner-blog {
  @apply w-full flex flex-col justify-center items-start pt-8 z-10;
}
.crumb {
  @apply w-full flex flex-row justify-center items-center;
}
.separatorCrumb {
  font-size: 9px;
  color: #222;
  @apply pr-6 leading-14 cursor-pointer transition-all ease-in duration-0.2;
}
.txt-crumb {
  font-size: 15px;
  color: #222;

  @apply pr-6 leading-14 cursor-pointer transition-all ease-in duration-0.2;
}
.s1:hover {
  color: #222;
  transition: all 0.25s ease;
}
.s2:hover {
  color: #222;
  transition: all 0.25s ease;
}
@screen sm {
  .bannerBlog {
    box-shadow: 0 1px 3px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    background-color: #fff;
    max-width: 900px;
    @apply w-full flex justify-center items-center py-20 border-b;
  }
  .content-art-blog {
    @apply w-9/0;
  }
  .tittle-banner-blog {
    @apply justify-start items-start mt-20;
  }
  .grid-products {
    @apply w-full grid-cols-1 gap-8;
  }
  .content-products {
    background-color: #f9f9f9;
    @apply h-full transition-all ease-in duration-0.2 rounded-9 border;
  }
  .content-products:hover {
    @apply w-full transition-all ease-in duration-0.2;
    -webkit-box-shadow: 0px 6px 15px 6px #bfbfbf;
    box-shadow: 0px 6px 15px 6px #bfbfbf;
  }
  .txt-banner {
    font-size: 30px;
  }
  .crumb {
    @apply justify-center items-center;
  }
}
@screen md {
  .grid-products {
    @apply grid-cols-2 justify-start items-start;
  }
}
@screen lg {
  .grid-products {
    @apply grid-cols-2 gap-4;
  }
}
@media (min-width: 1025px) {
  .tittle-banner-blog {
    @apply justify-start items-start;
  }
}
@screen mlg {
  .grid-products {
    @apply w-full gap-8;
  }
  .tittle-banner-blog {
    @apply w-auto flex flex-row justify-center items-center;
  }
}
</style>
