<template>
  <div
    class="wrapper-content"
    :style="[
      blog,
      settingGeneral,
      {
        '--font-style-1': settingGeneral?.fount_1 ?? 'Poppins',
      },
    ]"
  >
    <div v-if="blog?.title" class="wrapper-items-content">
      <div class="product-text">
        <div class="product-tittle">
          <span class="tittle">{{ blog.title.replace(/&nbsp;/g, ' ') }}</span>
        </div>
      </div>
    </div>
    <div class="wrapper-items">
      <div v-swiper:mySwiper="swiperOption" ref="mySwiper">
        <div class="swiper-wrapper">
          <div
            v-for="(article, index) in listBlogs"
            :key="index"
            class="swiper-slide"
          >
            <KoBlogCard
              :article="article"
              :setting-blog="blog"
              :setting-general="settingGeneral"
              style="max-height: 560px"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Ko9Blog',
  components: {
    KoBlogCard: () => import('./blog_page/_card/blog-card.vue'),
  },
  props: {
    dataStore: {
      type: Object,
      required: true,
    },
    blog: {
      type: Object,
      required: true,
    },
    settingGeneral: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      listBlogs: [],
      swiperOption: {
        slidesPerView: 'auto',
        spaceBetween: 20,
        breakpoints: {
          1920: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
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
.swiper-slide {
  text-align: center;
  font-size: 18px;
  background-color: var(--background_color_1);
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}
.wrapper-content {
  background-color: var(--background_color_1);
  padding-bottom: 64px;
  @apply flex flex-col justify-center items-center w-full;
}
.wrapper-items-content {
  width: 93vw;
  @apply flex flex-col justify-center items-center;
}
.wrapper-items {
  width: 93vw;
}
.product-text {
  @apply flex flex-col justify-center items-center w-full my-60;
}
.product-tittle {
  @apply flex flex-col justify-center items-center;
}
.tittle {
  /* font-family: 'Poppins', Helvetica, Arial, sans-serif !important; */
  font-family: var(--font-style-1) !important;
  color: var(--color_title);
  font-weight: 700;
  @apply flex flex-col justify-center items-center;
}
@screen sm {
  .product-tittle {
    width: 75%;
  }
  .tittle {
    line-height: 34px;
    font-size: 30px;
  }
}
@screen xml {
  .product-tittle {
    width: 100%;
  }
  .tittle {
    line-height: 34px;
    font-size: 36px;
  }
}
</style>
