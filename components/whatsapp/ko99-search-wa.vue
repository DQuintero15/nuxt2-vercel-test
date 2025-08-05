<template>
  <el-drawer
    :visible.sync="openSearch"
    :before-close="closedSearch"
    direction="ttb"
    :with-header="false"
    :modal-append-to-body="false"
    class="width-drawer"
    size="150px"
  >
    <div class="order_content">
      <div class="close-container" @click="closedSearch">
        <div class="content-close">
          <div
            class="leftright"
            :style="`background: ${
              settingByTemplate && settingByTemplate.color_primario
                ? settingByTemplate.color_primario
                : '#25D366'
            };`"
          ></div>
          <div
            class="rightleft"
            :style="`background: ${
              settingByTemplate && settingByTemplate.color_primario
                ? settingByTemplate.color_primario
                : '#25D366'
            };`"
          ></div>
        </div>
      </div>
      <div class="products-search">
        <div class="search-input-content">
          <div class="form-search">
            <div class="cont-search-up">
              <p class="txt-search-up">{{ $t('home_buscar') }}</p>
            </div>
            <input
              id="myInput"
              v-model="query.name"
              type="search "
              class="input-search"
              :placeholder="$t('home_buscar')"
              @change="setToQueryFilter('search')"
              @keyup.enter="setToQueryFilter('search')"
            />
          </div>
        </div>
        <div class="cont-btn">
          <button
            class="content-btn w-full text-center py-4"
            :style="`background: ${
              settingByTemplate && settingByTemplate.color_primario
                ? settingByTemplate.color_primario
                : '#25D366'
            };`"
            @click="closedSearch"
          >
            <span
              class="text-16 font-bold btn-txt"
              :style="`color:${
                settingByTemplate && settingByTemplate.color_secundario
                  ? settingByTemplate.color_secundario
                  : '#FFFFFF'
              };`"
            >
              {{ $t('home_vamos') }}
            </span>
          </button>
        </div>
      </div>
    </div>
  </el-drawer>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'KoSearchWa',
  props: {
    dataStore: {
      type: Object,
      required: true,
    },
    settingByTemplate: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      query: {
        page: 1,
        name: null,
      },
    }
  },
  computed: {
    ...mapState(['openSearch']),
  },
  methods: {
    closedSearch() {
      this.$store.commit('SET_OPEN_SEARCH', false)
    },
    setToQueryFilter(type) {
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
          path: `/wa/${this.dataStore.id}`,
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
    clearFilters() {
      this.query = {
        page: 1,
        name: null,
      }
      this.$router.push({
        path: `/wa/${this.dataStore.id}`,
        query: '',
      })
      this.$store.commit('SET_OPEN_ORDER_MENU_LEFT', false)
      this.$store.commit('SET_STATE_BANNER', true)
    },
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
  width: 100%;
  height: 100%;
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
  @apply w-full flex flex-row justify-start items-center z-20;
  font-size: 25px;
  color: #000;
  font-weight: 800;
}
.input-search {
  border-bottom: 1px solid black;
  @apply w-full items-center z-10;
}
::-webkit-input-placeholder {
  @apply text-left items-center;
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
  @apply h-full flex flex-col justify-center items-center;
}
.content-btn {
  max-height: 37px;
  border-radius: 5px;
}
.content-btn:hover {
  @apply shadow-lg;
  background-color: #edeaea;
}

.content-btn:hover .btn-txt {
  color: #2c2930;
}
.close-container {
  width: 100%;
  max-width: 900px;
  @apply relative h-50 flex justify-end items-center;
}
.leftright {
  @apply h-2 w-20 absolute rounded-2 transform -rotate-45 transition-all ease-in duration-200;
}
.rightleft {
  @apply h-2 w-20 absolute rounded-2 transform rotate-45 transition-all ease-in duration-200;
}
.content-close {
  @apply flex justify-center items-center cursor-pointer;
  width: 20px;
  height: 20px;
}
.content-close:hover .leftright {
  @apply transform rotate-0;
}
.content-close:hover .rightleft {
  @apply transform rotate-0;
}
@screen sm {
  .products-search {
    @apply w-full flex flex-col justify-items-center items-center;
  }
  .search-input-content {
    @apply w-8/0;
  }
  .cont-btn {
    margin-top: 10px;
    @apply w-8/0 h-auto;
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
    @apply w-auto h-auto;
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
