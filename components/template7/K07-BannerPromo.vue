<template>
  <div
    class="promo-banner-content"
    :style="[
      settingKPromo,
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
    <div class="promo-banner-items">
      <div class="promo-banners" :style="settingKPromo.values[0]">
        <a
          :href="`${settingKPromo.values[0].url_redirect}`"
          rel="noreferrer noopener"
          class="content-1"
        >
          <figure class="promo-banner-images">
            <div class="content-1">
              <img
                id="images-1"
                v-lazy="
                  idCloudinaryBanner(settingKPromo.values[0].url_img, 'banner')
                "
                alt="left-banner"
                class="images"
              />
            </div>
            <div class="promo-banner-text" id="promo-banner-text-1">
              <p
                id="promo-banner-tittle-1"
                class="promo-banner-tittle"
                :style="`color: ${settingKPromo.values[0]['--color_text']};`"
              >
                {{ settingKPromo.values[0].tittle }}
              </p>
              <span
                id="promo-banner-subtittle-1"
                class="promo-banner-subtittle"
                :style="`color: ${settingKPromo.values[0]['--color_subtext']};`"
              >
                {{ settingKPromo.values[0].description }}
              </span>
              <div class="banner-content-buttons">
                <button class="content-bttns-shop">
                  {{ $t('productdetail_btnComprar') }}
                </button>
              </div>
            </div>
            <div class="banner-border-1"></div>
          </figure>
        </a>
      </div>
      <div class="banner-medium">
        <div class="promo-banner-2 content-2" :style="settingKPromo.values[1]">
          <a
            :href="`${settingKPromo.values[1].url_redirect}`"
            rel="noreferrer noopener"
          >
            <figure class="promo-banner-images">
              <div class="content-2">
                <img
                  id="images-2"
                  v-lazy="
                    idCloudinaryBanner(
                      settingKPromo.values[1].url_img,
                      'banner'
                    )
                  "
                  class="images"
                  alt="medium-top-banner"
                />
              </div>
              <div id="promo-banner-text-2" class="promo-banner-text">
                <p
                  id="promo-banner-tittle-2"
                  class="promo-banner-tittle"
                  :style="`color: ${settingKPromo.values[1]['--color_text']};`"
                >
                  {{ settingKPromo.values[1].tittle }}
                </p>
                <span
                  id="promo-banner-subtittle-medium"
                  class="promo-banner-subtittle"
                  :style="`color: ${settingKPromo.values[1]['--color_subtext']};`"
                >
                  {{ settingKPromo.values[1].description }}
                </span>
              </div>
            </figure>
          </a>
        </div>
        <div class="promo-banner-3 content-2" :style="settingKPromo.values[2]">
          <a
            :href="`${settingKPromo.values[2].url_redirect}`"
            rel="noreferrer noopener"
          >
            <figure class="promo-banner-images">
              <div class="content-2">
                <img
                  id="images-3"
                  v-lazy="
                    idCloudinaryBanner(
                      settingKPromo.values[2].url_img,
                      'banner'
                    )
                  "
                  class="images"
                  alt="medium-top-banner"
                />
              </div>
              <div id="promo-banner-text-3" class="promo-banner-text">
                <p
                  id="promo-banner-tittle-3"
                  class="promo-banner-tittle"
                  :style="`color: ${settingKPromo.values[2]['--color_text']};`"
                >
                  {{ settingKPromo.values[2].tittle }}
                </p>
                <span
                  id="promo-banner-subtittle-medium"
                  class="promo-banner-subtittle"
                  :style="`color: ${settingKPromo.values[2]['--color_subtext']};`"
                >
                  {{ settingKPromo.values[2].description }}
                </span>
              </div>
            </figure>
          </a>
        </div>
      </div>
      <div class="promo-banners" :style="settingKPromo.values[3]">
        <a
          :href="`${settingKPromo.values[3].url_redirect}`"
          rel="noreferrer noopener"
          class="content-4"
        >
          <figure class="promo-banner-images" id="promo-banner-images-4">
            <div class="content-4">
              <img
                id="images-4"
                :src="
                  idCloudinaryBanner(settingKPromo.values[3].url_img, 'banner')
                "
                class="images"
                alt="right-banner"
              />
            </div>
            <div id="promo-banner-text-4" class="promo-banner-text text4">
              <p
                id="promo-banner-tittle-4"
                class="promo-banner-tittle"
                :style="`color: ${settingKPromo.values[3]['--color_text']};`"
              >
                {{ settingKPromo.values[3].tittle }}
              </p>
              <span
                id="promo-banner-subtittle-4"
                class="promo-banner-subtittle"
                :style="`color: ${settingKPromo.values[3]['--color_subtext']};`"
              >
                {{ settingKPromo.values[3].description }}
              </span>
            </div>
            <div class="banner-border-2"></div>
          </figure>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import idCloudinary from '@/mixins/idCloudinary'
export default {
  name: 'K07BannerPromo',
  mixins: [idCloudinary],
  props: {
    settingKPromo: {
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
    dataStore: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {}
  },
}
</script>

<style scoped>
.images {
  width: 100%;
  object-fit: cover;
  overflow: hidden;
}
.promo-banner-content {
  background: var(--background_color_1);
  @apply w-full flex flex-col justify-center items-center pt-20 pb-20;
}
.separador-blog {
  padding-top: 100px;
}
.promo-banner-items {
  @apply flex flex-row justify-center items-start w-full h-full;
}
.banner-medium {
  @apply grid grid-rows-2 gap-5 mx-20;
}
figure {
  @apply overflow-hidden m-0 p-0;
}
.content-1 {
  max-width: 485px;
  max-height: 480px;
  @apply h-full w-full;
}
.content-2 {
  max-width: 384px;
  max-height: 230px;
  @apply h-full w-full;
}
.content-4 {
  max-width: 283px;
  max-height: 480px;
  @apply h-full w-full;
}
.promo-banner-items figure img {
  -webkit-transform: scale(1);
  transform: scale(1);
  -webkit-transition: 0.4s ease-in-out;
  transition: 0.4s ease-in-out;
}
.promo-banner-items figure:hover img {
  -webkit-transform: scale(1.3);
  transform: scale(1.1);
}
.promo-banner-images {
  @apply flex justify-center items-center;
}
.text4 {
  max-width: 170px;
}
.promo-banner-text {
  @apply absolute flex flex-col;
}
.promo-banner-tittle {
  font-family: var(--font-style-2) !important;
}
.promo-banner-subtittle {
  font-family: var(--font-style-3) !important ;
  font-style: italic;
}
.content-textbutton-shop {
  font-family: var(--font-style-3) !important;
}
.banner-content-buttons {
  @apply flex flex-row gap-3 justify-center items-center;
}
.content-bttns-shop {
  @apply mr-8 shadow-md justify-center items-center flex font-semibold uppercase tracking-wider text-12;
  border-radius: var(--radius_btn);
  background: var(--color_background_btn);
  color: var(--color_text_btn);
  font-family: var(--font-style-3) !important;
  padding: 10px 20px;
}
.content-bttns-shop:hover {
  cursor: pointer;
  background: var(--hover_text);
  transition: all 0.2s ease-out;
}
#promo-banner-text-1,
#promo-banner-text-4 {
  @apply flex justify-center items-center;
}
#promo-banner-text-2,
#promo-banner-text-3 {
  @apply flex justify-start items-start;
}
.promo-banner-subtittle {
  color: rgba(48, 48, 48, 0.7);
}
#promo-banner-tittle-1 {
  text-overflow: ellipsis;
}
#promo-banner-tittle-2,
#promo-banner-tittle-3,
#promo-banner-tittle-4 {
  text-overflow: ellipsis;
}
#promo-banner-subtittle-1,
#promo-banner-subtittle-2,
#promo-banner-subtittle-3,
#promo-banner-subtittle-4 {
  text-overflow: ellipsis;
}

.promo-banners,
.banner-medium,
.promo-banner-3 {
  @apply cursor-pointer;
}
@screen sm {
  .promo-banners {
    @apply hidden;
  }
  #promo-banner-tittle-2 {
    line-height: 42px;
    font-size: 32px;
    height: auto;
    max-hegiht: 90px;
  }
  #promo-banner-tittle-3 {
    line-height: 42px;
    font-size: 32px;
    height: auto;
    max-height: 90px;
  }
  #promo-banner-tittle-2,
  #promo-banner-tittle-3,
  #promo-banner-subtittle-medium {
    @apply leading-normal overflow-hidden flex justify-start items-center;
    width: 255px;
  }
  .banner-content-buttons {
    @apply hidden;
  }
}
@media (min-width: 375px) {
  #promo-banner-tittle-2 {
    /* height: 130px; */
    max-height: 130px;
  }
  #promo-banner-tittle-3 {
    /* height: 130px; */
    max-height: 130px;
  }
  #promo-banner-tittle-2,
  #promo-banner-tittle-3,
  #promo-banner-subtittle-medium {
    width: 285px;
  }
}
@media (min-width: 425px) {
  #promo-banner-tittle-2 {
    /* height: 150px; */
    max-height: 150px;
  }
  #promo-banner-tittle-3 {
    /* height: 150px; */
    max-height: 150px;
  }
  #promo-banner-tittle-2,
  #promo-banner-tittle-3,
  #promo-banner-subtittle-medium {
    width: 350px;
  }
}
@screen md {
  .promo-banners {
    @apply flex;
  }
  .promo-banner-items {
    @apply w-9/5;
  }
  .banner-border-1 {
    @apply absolute border-4 border-white-white border-opacity-50 z-auto;
    padding-top: 128px;
    padding-bottom: 128px;

    padding-left: 129px;
    padding-right: 130px;
  }
  .banner-border-2 {
    @apply absolute border-4 border-white-white border-opacity-50 z-auto;
    padding-top: 128px;
    padding-bottom: 128px;

    padding-left: 69px;
    padding-right: 70px;
  }
  #promo-banner-tittle-1 {
    line-height: 34px;
    font-size: 30px;
    max-height: 100px;
  }
  #promo-banner-tittle-2 {
    line-height: 34px;
    font-size: 24px;
    max-height: 100px;
  }
  #promo-banner-tittle-3 {
    line-height: 34px;
    font-size: 24px;
    max-height: 100px;
  }
  #promo-banner-tittle-4 {
    line-height: 34px;
    font-size: 24px;
    height: auto;
    max-height: 100px;
  }
  #promo-banner-subtittle-4 {
    width: 135px;
    height: auto;
    max-height: 80px;
    max-width: 135px;
  }
  .promo-banner-subtittle {
    @apply w-8/0 text-center;
  }
  .promo-banner-subtittle {
    line-height: 30px;
    font-size: 12px;
  }
  #promo-banner-subtittle-medium {
    @apply text-left;
  }
  #promo-banner-text-1 {
    @apply pb-10 leading-normal;
    width: 250px;
  }
  #promo-banner-text-4 {
    @apply pb-24 leading-normal;
  }
  #promo-banner-tittle-1,
  #promo-banner-tittle-4 {
    @apply flex justify-center items-start text-center;
  }
  #promo-banner-tittle-2,
  #promo-banner-tittle-3,
  #promo-banner-subtittle-medium {
    @apply leading-normal;
    width: 200px;
    max-width: 200px;
  }
  .promo-banner-subtittle {
    font-size: 14px;
  }
}
@media (min-width: 900px) {
  .banner-border-1 {
    @apply absolute border-4 border-white-white border-opacity-50 z-auto;
    padding-top: 160px;
    padding-left: 160px;
  }
  .banner-border-2 {
    @apply absolute border-4 border-white-white border-opacity-50 z-auto;
    padding-top: 160px;
    padding-left: 80px;
  }
}
@media (min-width: 970px) {
  .banner-border-1 {
    @apply absolute border-4 border-white-white border-opacity-50 z-auto;
    padding-top: 190px;
    /* padding-bottom: 140px; */

    padding-left: 190px;
    /* padding-right: 130px; */
  }
  .banner-border-2 {
    @apply absolute border-4 border-white-white border-opacity-50 z-auto;
    padding-top: 190px;
    /* padding-bottom: 128px; */

    padding-left: 100px;
    /* padding-right: 70px; */
  }
}
@screen lg {
  .promo-banner-items {
    @apply w-9/5;
  }
  .banner-border-1 {
    @apply absolute border-4 border-white-white border-opacity-50 z-auto;
    padding-top: 177px;
    padding-bottom: 176px;

    padding-left: 178px;
    padding-right: 179px;
  }
  .banner-border-2 {
    @apply absolute border-4 border-white-white border-opacity-50 z-auto;
    padding-top: 177px;
    padding-bottom: 176px;

    padding-left: 94px;
    padding-right: 95px;
  }
  #promo-banner-tittle-1 {
    line-height: 46px;
    font-size: 36px;
  }
  #promo-banner-tittle-2 {
    line-height: 34px;
    font-size: 24px;
    height: auto;
    max-height: 120px;
  }
  #promo-banner-tittle-3 {
    line-height: 34px;
    font-size: 24px;
  }
  #promo-banner-tittle-4 {
    line-height: 34px;
    font-size: 24px;
  }
  #promo-banner-subtittle-4 {
    width: 170px;
    max-width: 170px;
  }
  .promo-banner-subtittle {
    @apply w-full;
  }
  .promo-banner-subtittle {
    line-height: 58px;
    font-size: 14px;
  }
  #promo-banner-text-1 {
    @apply pb-96 leading-normal;
    width: 300px;
    max-width: 300px;
  }
  #promo-banner-text-4 {
    @apply pb-100 leading-normal;
  }
  #promo-banner-tittle-2,
  #promo-banner-tittle-3,
  #promo-banner-subtittle-medium {
    @apply leading-normal;
    width: 270px;
    max-width: 270px;
  }
  .banner-content-buttons {
    @apply flex;
  }
}
@media (min-width: 1120px) {
  .banner-border-1 {
    @apply absolute border-4 border-white-white border-opacity-50 z-auto;
    padding-top: 210px;
    padding-left: 210px;
  }
  .banner-border-2 {
    @apply absolute border-4 border-white-white border-opacity-50 z-auto;
    padding-top: 210px;
    padding-left: 110px;
  }
}
@media (min-width: 1180px) {
  .banner-border-1 {
    @apply absolute border-4 border-white-white border-opacity-50 z-auto;
    padding-top: 220px;
    padding-left: 220px;
  }
  .banner-border-2 {
    @apply absolute border-4 border-white-white border-opacity-50 z-auto;
    padding-top: 210px;
    padding-left: 110px;
  }
}
@media (min-width: 1192px) {
  .promo-banner-items {
    width: 1192px;
  }
  #promo-banner-tittle-1 {
    line-height: 58px;
    font-size: 48px;
  }
  #promo-banner-tittle-2 {
    line-height: 42px;
    font-size: 32px;
  }
  #promo-banner-tittle-3 {
    line-height: 42px;
    font-size: 32px;
  }
  #promo-banner-tittle-4 {
    line-height: 42px;
    font-size: 32px;
  }
  .promo-banner-subtittle {
    line-height: 58px;
    font-size: 85%;
  }
  .banner-border-1 {
    @apply absolute border-4 border-white-white border-opacity-50 z-auto;
    padding-top: 216px;
    padding-bottom: 216px;

    padding-left: 218px;
    padding-right: 219px;
  }
  .banner-border-2 {
    @apply absolute border-4 border-white-white border-opacity-50 z-auto;
    padding-top: 216px;
    padding-bottom: 216px;

    padding-left: 117px;
    padding-right: 118px;
  }
  #promo-banner-text-1 {
    @apply leading-normal overflow-hidden;
    width: 350px;
    /* height: 400px; */
  }
  #promo-banner-text-4 {
    @apply leading-normal;
    padding-bottom: 224px;
  }
  #promo-banner-tittle-2,
  #promo-banner-tittle-3,
  #promo-banner-subtittle-medium {
    @apply leading-normal;
    width: 350px;
    max-width: 350px;
    text-overflow: ellipsis;
    overflow-wrap: break-word;
    word-wrap: break-word;
    word-break: break-word;
  }
  #promo-banner-tittle-2,
  #promo-banner-tittle-3 {
    @apply overflow-hidden;
    height: auto;
    max-height: 175px;
  }
  #promo-banner-text-2,
  #promo-banner-text-3 {
    @apply overflow-hidden flex justify-center items-start;
    height: 200px;
    max-height: 200px;
  }
}
</style>
