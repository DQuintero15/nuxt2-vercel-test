<template>
  <div
    class="w-full flex justify-center items-center py-25 lg:py-40 px-10"
    :style="`background-color: ${listBlogHome['--background_color_1']}`"
  >
    <div
      class="w-full max-w-[1200px] h-auto relative flex flex-col items-center justify-center overflow-hidden mt-20"
    >
      <p
        class="w-full text-center mb-15 text-25 md:text-28 lg:text-32"
        :style="`color: ${listBlogHome.color_title}; font-weight: ${listBlogHome.fontWeighTitle}; font-size: ${listBlogHome.fontSizeTitle};`"
      >
        {{ listBlogHome.title }}
      </p>
      <p
        class="w-full text-center mb-50 text-14"
        :style="`color: ${listBlogHome.color_text}; font-weight: ${listBlogHome.fontWeighText}; font-size: ${listBlogHome.fontSizeText};`"
      >
        {{ listBlogHome.text }}
      </p>
      <div
        ref="mySwiper"
        v-swiper:mySwiper="swiperOption"
        class="w-full h-full"
      >
        <div class="swiper-wrapper w-full h-full">
          <div
            v-for="article in listBlogs"
            :key="article.id"
            class="swiper-slide w-full h-full"
          >
            <KoBlogCard
              :article="article"
              :setting-general="settingGeneral"
              :card-blog="cardBlog"
              class="giftLoad w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Ko16ListBlogHome',
  components: {
    KoBlogCard: () => import('./_cardBlog/blog-card.vue'),
  },
  props: {
    listBlogHome: {
      type: Object,
      required: true,
    },
    settingGeneral: {
      type: Object,
      required: true,
    },
    dataStore: {
      type: Object,
      required: true,
    },
    cardBlog: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      listBlogs: [],
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 30,
        breakpoints: {
          1024: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
        },
      },
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    },
  },
  mounted() {
    this.getBlogs()
  },
  methods: {
    async getBlogs() {
      const { success, data } = await this.$store.dispatch('GET_ARTICLES', {
        id_tienda: this.dataStore.id,
        limit: 6,
        page: 1,
      })
      if (success) {
        this.listBlogs = data.data
      }
    },
  },
}
</script>
<style scoped>
.giftLoad,
.swiper-slide {
  height: 100%;
  max-width: 400px;
}
</style>
