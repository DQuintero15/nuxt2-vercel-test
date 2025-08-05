<template>
  <div
    class="wrapper-content"
    :style="[
      settingKblog,
      settingGeneral,
      {
        '--font-style-1': settingGeneral?.fount_1 ?? 'Roboto',
      },
    ]"
  >
    <div class="wrapper-items-content">
      <div class="product-text">
        <div class="product-tittle">
          <p class="tittle">{{ settingKblog.title }}</p>
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
            style="height: auto"
          >
            <KBlogCard :article="article" :setting-blog="settingKblog" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Ko11BlogHome',
  components: {
    KBlogCard: () => import('./blog_page/_card/k11-blog-card.vue'),
  },
  props: {
    dataStore: {
      type: Object,
      required: true,
    },
    settingKblog: {
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
        slidesPerView: '',
        spaceBetween: '',
        breakpoints: {
          1920: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1023: {
            slidesPerView: 2,
            spaceBetween: 30,
          },

          580: {
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
  background: #fff;
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
  @apply w-full flex flex-col justify-center items-center pt-40;
  padding-bottom: 64px;
  background-color: var(--background_color_1);
}
.wrapper-items-content {
  @apply flex flex-col justify-center items-center;
}

.product-text {
  margin-bottom: var(--marginbottomTitle);
  @apply w-full flex flex-col justify-center items-center text-center;
}
.product-tittle {
  @apply flex flex-col justify-center items-center;
}
.tittle {
  color: var(--color_title);
  font-weight: var(--fontWeight);
  font-family: var(--font-style-1);
  @apply flex flex-col justify-center items-center text-center;
}
@screen sm {
  .wrapper-items-content,
  .wrapper-items {
    @apply w-9/0;
  }
  .tittle {
    font-size: 20px;
  }
}
@screen md {
  .wrapper-items-content,
  .wrapper-items {
    @apply w-9/5;
  }
  .tittle {
    font-size: var(--fontSize);
  }
}
@media (min-width: 1200px) {
  .wrapper-items {
    max-width: 1200px;
    @apply w-full h-auto;
  }
}
@screen xml {
  .product-tittle {
    width: 100%;
  }
  .tittle {
    line-height: 34px;
    font-size: var(--fontSize);
  }
}
</style>
