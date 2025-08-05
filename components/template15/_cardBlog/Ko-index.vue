<template>
  <div
    class="flex w-full items-center justify-center px-10 py-15 md:px-0 lg:py-20"
    style="background-color: var(--background_color_1)"
    :style="[
      settingByTemplate15[0].listBlogHome,
      settingByTemplate15[0].settingGeneral,
      {
        '--font-style-1':
          settingByTemplate15[0]?.settingGeneral?.font ?? 'Poppins',
      },
    ]"
  >
    <div class="flex w-full max-w-7xl flex-col items-center justify-center">
      <div class="flex w-full flex-row items-center justify-between">
        <p
          class="text-left text-30 font-semibold"
          :style="`color: ${settingByTemplate15[0].listBlogHome.color_title_1}; font-weight: ${settingByTemplate15[0].listBlogHome.fontWeighTitle};`"
        >
          {{ settingByTemplate15[0].listBlogHome.title }}
        </p>
        <input
          v-model="filters.title"
          class="input-search"
          type="search"
          :placeholder="$t('header_search')"
          @keyup.enter="updateFilters"
        />
      </div>
      <div class="mt-30 flex w-full flex-col items-center justify-center">
        <div
          class="mb-40 box-border grid h-full w-full grid-cols-1 items-center justify-center gap-4 md:grid-cols-2 lg:grid-cols-3 mlg:gap-8"
        >
          <div
            v-for="article in listBlogs"
            :key="article.id"
            class="h-full w-full"
          >
            <KoBlogCard
              :article="article"
              :card-blog="settingByTemplate15[0].cardBlog"
              :setting-general="settingByTemplate15[0].settingGeneral"
              class="giftLoad h-full w-full"
            />
          </div>
        </div>
        <div
          v-if="listBlogs?.length === 0"
          class="flex h-full w-full flex-col items-center justify-center text-center"
        >
          <nuxt-link to="/" class="wrapper-logo">
            <img
              loading="lazy"
              :src="imageUrl"
              width="150"
              class="max-h-[150px] max-w-[150px]"
              alt="Logo Img"
              @error="setDefaultImage"
            />
          </nuxt-link>
          <p class="my-15 text-20 font-semibold text-gray-600">
            No se encontraron artículos relacionados
          </p>
        </div>
        <div v-if="totalBlogs > filters.limit" class="product_pagination mt-10">
          <el-pagination
            background
            layout="prev, pager, next"
            class="bg-transparent text-18 text-black"
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
  name: 'Ko15Blog',
  components: {
    KoBlogCard: () => import('./blogCard'),
  },
  mixins: [filters],
  props: {
    dataStore: {
      type: Object,
      required: true,
    },
    settingByTemplate15: {
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
* {
  font-family: var(--font-style-1) !important;
}
.giftLoad {
  max-width: 300px;
}
.input-search {
  box-shadow: inset 0px -48px 0px -43px black;
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
</style>
