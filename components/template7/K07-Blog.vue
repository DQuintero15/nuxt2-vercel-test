<template>
  <div
    class="wrapper-content"
    :style="[
      settingKBlog,
      settingGeneral,
      {
        '--font-style-2': settingGeneral?.fount_2 ?? 'Great Vibes',
      },
      {
        '--font-style-3': settingGeneral?.fount_3 ?? 'Lora',
      },
    ]"
  >
    <div v-if="!settingKCarousel.visible" class="separador-blog"></div>
    <div v-if="settingKBlog" class="wrapper-items-content">
      <div class="wrapper-content-items">
        <div class="wrapper-items-text">
          <div class="tittle">
            <span class="tittle-text">{{ settingKBlog.pre_title }}</span>
          </div>
          <div class="subtittle">
            <span class="subtittle-text">{{ settingKBlog.title }}</span>
          </div>
          <div class="description">
            <span class="description-text">
              {{ settingKBlog.description }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="wrapper-items">
      <div v-swiper:mySwiper="swiperOption" ref="mySwiper">
        <div class="swiper-wrapper">
          <div
            v-for="article in listBlogs"
            :key="article.id"
            class="swiper-slide"
          >
            <KBlog
              :article="article"
              :setting-k-blog="settingKBlog"
              :setting-general="settingGeneral"
            />
          </div>
        </div>
        <div v-if="listBlogs.length > 3" class="swiper-button-prev"></div>
        <div v-if="listBlogs.length > 3" class="swiper-button-next"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'K07Blog',
  components: {
    KBlog: () => import('./_blog/K07BlogCard.vue'),
  },
  props: {
    dataStore: {
      type: Object,
      required: true,
    },
    settingKBlog: {
      type: Object,
      required: true,
    },
    settingGeneral: {
      type: Object,
      required: true,
    },
    settingKCarousel: {
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
        autoplay: {
          delay: 4000,
          disableOnInteraction: false,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
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
.separador-blog {
  padding-top: 100px;
}
.wrapper-content {
  background: var(--background_color_1);
  @apply flex flex-col justify-center items-center w-full py-30;
}
.wrapper-items-content {
  @apply flex flex-col justify-center items-center;
}
.wrapper-content-items {
  @apply flex flex-col justify-center items-center w-full mb-48 text-center;
}
.wrapper-items-text {
  @apply w-full;
}
.tittle,
.subtittle,
.description {
  @apply flex flex-col justify-center items-center;
}
.tittle-text {
  font-family: var(--font-style-2) !important;
  color: var(--color_pre_title);
}
.subtittle-text {
  font-family: var(--font-style-3) !important;
  color: var(--color_title);
}
.description-text {
  font-family: var(--font-style-3) !important;
  color: var(--color_description);
}
.swiper-button-prev,
.swiper-button-next {
  color: var(--color_background_card) !important;
}
@screen sm {
  .wrapper-items-content {
    @apply w-9/5;
  }
  .tittle {
    line-height: 34px;
    font-size: 24px;
  }
  .subtittle {
    line-height: 42px;
    font-size: 32px;
  }
  .description {
    line-height: 24px;
    font-size: 14px;
  }
  .wrapper-items {
    @apply w-9/5;
  }
}
@screen md {
  .subtittle {
    line-height: 46px;
    font-size: 36px;
  }
}
@screen mlg {
  .wrapper-items-content {
    @apply w-9/3;
  }
  .gify-text-content {
    @apply w-9/3;
  }
  .gify-slider-content {
    @apply w-6/3;
  }
  .tittle {
    line-height: 34px;
    font-size: 24px;
  }
  .subtittle {
    line-height: 48px;
    font-size: 35px;
  }
  .description {
    line-height: 24px;
    font-size: 14px;
  }
  .wrapper-items {
    @apply w-9/3;
  }
}
@media (min-width: 1192px) {
  .wrapper-items-content {
    width: 1192px;
  }
  .wrapper-items {
    width: 1192px;
  }
}
</style>
