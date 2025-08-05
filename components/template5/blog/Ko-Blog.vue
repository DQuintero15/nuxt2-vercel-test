<template>
  <div :style="settingK05Blog">
    <div
      :style="{
        '--font-style': settingK05Blog?.tipo_letra ?? 'Roboto',
      }"
      class="relative bg-gray-50 px-4 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-28 lg:pt-24"
    >
      <div
        class="content-blog-list mx-auto max-w-7xl"
        style="min-height: calc(59vh)"
      >
        <div
          class="px:10 flex flex-row items-center justify-between pb-10 md:px-30"
        >
          <h2
            class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl"
          >
            Blog
          </h2>

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
        <div
          class="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3"
        >
          <div v-for="article in listBlogs" :key="article.id">
            <KoBlogCard1 :article="article" :setting-blog="settingK05Blog" />
          </div>
        </div>
        <div
          v-if="listBlogs?.length === 0"
          class="flex w-full flex-col items-center justify-center"
          style="min-height: calc(50vh)"
        >
          <div class="w-full max-w-[180px]">
            <nuxt-link to="/">
              <img
                loading="lazy"
                :src="imageUrl"
                alt="Logo Img"
                @error="setDefaultImage"
              />
            </nuxt-link>
          </div>
          <p class="color-text-empty text-18 font-bold opacity-60">
            No se encontraron artículos relacionados
          </p>
        </div>
        <div
          v-if="totalBlogs > filters.limit"
          class="mt-40 flex w-full items-center justify-center"
        >
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
</template>
<script>
import { mapState } from 'vuex'
import filters from '@/mixins/filterBlogs'
export default {
  name: 'KoBlogIndex5',
  components: {
    KoBlogCard1: () => import('./_blog-card/Ko-card-blog.vue'),
  },
  mixins: [filters],
  props: {
    dataStore: {
      type: Object,
      required: true,
    },
    settingK05Blog: {
      type: Object,
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
* {
  font-family: var(--font-style) !important;
}
.pagination {
  font-size: 18px;
  color: var(--color_text);
  background: transparent;
}
.pagination-medium >>> .el-pagination.is-background .btn-next {
  color: var(--color_text);
  background-color: transparent;
}
.pagination-medium >>> .el-pagination.is-background .btn-prev {
  color: var(--color_text);
  background-color: transparent;
}
.pagination-medium >>> .el-pagination.is-background .el-pager li {
  color: var(--color_text);
  background-color: transparent;
}
.pagination-medium >>> .el-pagination.is-background .btn-next:hover {
  color: var(--btnhover);
}
.pagination-medium >>> .el-pagination.is-background .btn-prev:hover {
  color: var(--btnhover);
}
.pagination-medium
  >>> .el-pagination.is-background
  .el-pager
  li:not(.disabled):hover {
  color: var(--btnhover);
}
.pagination-medium
  >>> .el-pagination.is-background
  .el-pager
  li:not(.disabled).active {
  background-color: var(--color_icon);
  color: white;
}

.color-icon:hover {
  color: var(--btnhover);
}
</style>
