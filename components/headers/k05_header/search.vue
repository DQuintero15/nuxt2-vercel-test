<template>
  <el-drawer
    :visible.sync="openSearch"
    :before-close="closedSearch"
    direction="ttb"
    :with-header="false"
    :modal-append-to-body="false"
    class="width-drawer"
    size="200px"
  >
    <div class="order_content">
      <div class="close-container" @click="closedSearch">
        <div class="content-close">
          <div class="leftright"></div>
          <div class="rightleft"></div>
        </div>
      </div>
      <div class="products-search">
        <div class="search-input-content">
          <div class="form-search">
            <div class="cont-search-up">
              <p class="txt-search-up">{{ $t('home_buscar') }}</p>
            </div>
            <input
              v-model="query.name"
              type="search "
              :placeholder="$t('home_buscar')"
              class="input-search"
              @change="setToQueryFilter('search')"
              @keyup.enter="setToQueryFilter('search')"
            />
          </div>
        </div>
        <div class="cont-btn">
          <button class="content-btn" @click="setToQueryFilter('search')">
            <span class="btn-txt">{{ $t('home_buscar') }}</span>
          </button>
        </div>
      </div>
    </div>
  </el-drawer>
</template>

<script>
export default {
  name: 'KoSearchWa',
  data() {
    return {
      query: {
        page: 1,
        name: null,
      },
    }
  },
  computed: {
    openSearch() {
      return this.$store.state.openSearch
    },
    dataStore() {
      return this.$store.state.dataStore
    },
  },
  methods: {
    closedSearch() {
      this.$store.commit('SET_OPEN_SEARCH', false)
    },
    setToQueryFilter(type) {
      console.log(this.dataStore)
      if (type === 'search') {
        this.query.name = this.query.name || null
        this.getSearch(this.query.name)
      }
      this.$store.commit('SET_STATE_BANNER', false)
      this.setInformationFromQuery(this.query)
    },
    async setInformationFromQuery({ page, name }) {
      const query = {}

      if (page !== null && page !== undefined) query.page = page
      if (name !== null) query.name = name

      try {
        await this.$router.push({
          query,
        })
      } catch (error) {
        console.error('Error navigating:', error)
      }
    },
    async getInformationFromQuery() {
      const query = this.$route.query

      this.query.name = query.name || null
      if (this.query.name) {
        this.$store.commit('SET_STATE_BANNER', false)
      }
    },
    // clearFilters() {
    //   this.query = {
    //     page: 1,
    //     name: null,
    //   }
    //   this.$router.push({
    //     path: `/wa/${this.dataStore.id}`,
    //     query: '',
    //   })
    //   this.$store.commit('SET_OPEN_ORDER_MENU_LEFT', false)
    //   this.$store.commit('SET_STATE_BANNER', true)
    // },
    getSearch(value) {
      if (value) {
        if (this.facebookPixel?.pixel_facebook != null) {
          window.fbq('track', 'Search', { search_string: value })
        }
      }
    },
  },
}
</script>

<style scoped>
.order_content {
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  flex: none;
  overflow: auto;
  box-sizing: border-box;
  padding-bottom: 10px;
  overflow: hidden;
}

.products-search {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  width: 100%;
  height: 100%;
  max-width: 900px;
  z-index: 10;
}
input[type='search'] {
  border: none;
  width: 100%;
}
.search-input-content {
  @apply z-20 flex w-full flex-row items-center justify-start;
  font-size: 25px;
  color: #000;
  font-weight: 800;
}
.input-search {
  border-bottom: 1px solid black;
  @apply z-10 w-full items-center;
}
::-webkit-input-placeholder {
  @apply items-center text-left;
  font-size: 25px;
  font-weight: 800;
  color: #000;
  padding-left: 5px;
}
.form-search:focus .cont-search-up {
  display: flex;
}
.cont-search-up {
  @apply -mt-4;
  display: none;
}
.txt-search-up {
  font-size: 25px;
  font-weight: 800;
  margin-left: 10px;
  color: #2c2930;
}
.cont-btn {
  @apply flex h-full flex-col items-center justify-center;
}
.content-btn {
  display: flex;
  justify-content: center;
  align-content: center;
  max-height: 37px;
  border-radius: 5px;
  background-color: #2c2930;
}
.content-btn:hover {
  @apply shadow-lg;
  background-color: #edeaea;
}
.btn-txt {
  font-size: 16px;
  font-weight: 800;
  color: #edeaea;
}
.content-btn:hover .btn-txt {
  color: #2c2930;
}
.close-container {
  width: 100%;
  max-width: 900px;
  @apply relative flex h-50 items-center justify-end;
}
.leftright {
  background: #000;
  @apply absolute h-2 w-20 -rotate-45 transform rounded-2 transition-all duration-300 ease-in-out;
}
.rightleft {
  background: #000;
  @apply absolute h-2 w-20 rotate-45 transform rounded-2 transition-all duration-300 ease-in-out;
}
.content-close {
  @apply flex cursor-pointer items-center justify-center;
  width: 20px;
  height: 20px;
}
.content-close:hover .leftright {
  @apply rotate-0 transform;
}
.content-close:hover .rightleft {
  @apply rotate-0 transform;
}
@screen sm {
  .products-search {
    @apply flex w-full flex-col items-center justify-items-center;
  }
  .search-input-content {
    @apply w-8/0;
  }
  .cont-btn {
    margin-top: 10px;
    @apply h-auto w-8/0;
  }
  .content-btn {
    @apply w-full;
    height: 48px;
  }
  .content-close {
    margin-right: 20px;
    margin-top: 20px;
  }
}
@media (min-width: 480px) {
  .products-search {
    @apply flex flex-row;
  }
  .search-input-content {
    @apply w-auto;
  }
  .cont-btn {
    margin-top: 0px;
    @apply h-auto w-auto;
  }
  .content-btn {
    width: 80px;
    height: 48px;
  }
}
@media (min-width: 640px) {
  .content-btn {
    width: 180px;
  }
}
@screen md {
  .products-search {
    @apply -mt-6;
  }
  .search-input-content {
    @apply w-6/0;
  }
}
@screen xl {
  .search-input-content {
    @apply w-7/0;
  }
}
@screen xml {
  .search-input-content {
    @apply w-8/0;
  }
}
</style>
