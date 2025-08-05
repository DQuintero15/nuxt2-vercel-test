<template>
  <div
    class="wrapper-content"
    :style="[
      settingGeneral,
      blog,
      {
        '--font-style-1': settingGeneral?.fount_1 ?? 'Roboto',
      },
    ]"
  >
    <div class="wrapper-items-content">
      <div class="product-text">
        <div class="product-tittle">
          <p class="tittle">{{ blog.title }}</p>
        </div>
        <div class="product-subtittle">
          <p class="subtittle">
            {{ blog.description }}
          </p>
        </div>
      </div>
    </div>
    <div class="wrapper-items">
      <div v-swiper:mySwiper="swiperOption" ref="mySwiper">
        <div class="swiper-wrapper">
          <div
            v-for="article in listBlogs"
            :key="article.id"
            :class="`swiper-slide`"
          >
            <KBlogCard
              :article="article"
              :setting-blog="blog"
              :setting-general="settingGeneral"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Ko10Blog',
  components: {
    KBlogCard: () => import('./blog_page/_card/k10-blog-card.vue'),
  },
  props: {
    blog: {
      type: Object,
      required: true,
    },
    dataStore: {
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
          768: {
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
  background: var(--background_color_1);
  /* Center slide text vertically */
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
  @apply w-full flex flex-col justify-center items-center py-40;
  background-color: var(--background_color_1);
}
.wrapper-items-content {
  @apply flex flex-col justify-center items-center;
}
.product-text {
  @apply w-full flex flex-col justify-center items-center mb-30 text-center;
}
.product-tittle {
  @apply flex flex-col justify-center items-center;
}
.tittle {
  @apply flex flex-col justify-center items-center;
  font-family: var(--font-style-1) !important;
  font-size: var(--font-size);
  font-weight: var(--font-weight);
}
.subtittle {
  font-size: var(--font-size-d);
}
@screen sm {
  .wrapper-items-content,
  .wrapper-items {
    @apply w-9/0;
  }
  .tittle {
    /* line-height: 34px; */
    /* font-size: 30px; */
    color: var(--color_title);
    margin-bottom: var(--marginbottomTitle);
  }
  .subtittle {
    color: var(--color_description);
    /* font-size: 15px; */
    font-weight: var(--font-weight-d);
    margin-bottom: var(--marginbottomDescription);
  }
}
@screen md {
  .wrapper-items-content,
  .wrapper-items {
    @apply w-9/5;
  }
}
@media (min-width: 1400px) {
  .wrapper-items {
    max-width: 1400px;
    @apply w-full h-auto;
  }
}
@screen xml {
  .product-tittle {
    width: 100%;
  }
  .tittle {
    /* line-height: 34px; */
    /* font-size: 36px; */
  }
}
</style>
