<template>
  <div
    class="wrapper-item-advertising"
    :style="[settingKAdvertising, settingGeneral]"
  >
    <div v-if="!settingKAdvertising.visible" class="separador-blog"></div>
    <div
      id="BgAdvertising"
      class="advertising-content-background"
      :style="[
        {
          '--font-style-2': settingGeneral?.fount_2 ?? 'Great Vibes',
        },
        {
          '--font-style-3': settingGeneral?.fount_3 ?? 'Lora',
        },
      ]"
    >
      <div class="advertising-items">
        <div class="advertising-border">
          <div class="wrapper-img">
            <img
              v-lazy="
                idCloudinaryBanner(settingKAdvertising.ur_img_card, 'banner')
              "
              class="max-w-auto"
              alt="icon"
            />
          </div>
          <div class="advertising-text">
            <span class="tittle">{{ settingKAdvertising.title }}</span>
            <div class="subtittles-items">
              <span class="subtittle">
                {{ settingKAdvertising.description }}
              </span>
            </div>
          </div>
          <div class="content-bttns-shop">
            <template v-if="dataStore.id === 7454">
              <nuxt-link
                to="/productos/kit-de-inicio-macrame-basico-6-proyectos-284968"
                rel="noreferrer noopener"
                target="_blank"
              >
                <span class="content-textbutton-shop">
                  {{ $t('productdetail_btnComprar') }}
                </span>
              </nuxt-link>
            </template>
            <template
              v-else-if="isInternalUrl(settingKAdvertising.url_redirect)"
            >
              <nuxt-link
                :to="`${settingKAdvertising.url_redirect}`"
                rel="noreferrer noopener"
                target="_blank"
              >
                <span class="content-textbutton-shop">
                  {{ $t('productdetail_btnComprar') }}
                </span>
              </nuxt-link>
            </template>
            <template v-else>
              <a
                :href="`${settingKAdvertising.url_redirect}`"
                rel="noreferrer noopener"
                target="_blank"
              >
                <span class="content-textbutton-shop">
                  {{ $t('productdetail_btnComprar') }}
                </span>
              </a>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import idCloudinaryBanner from '@/mixins/idCloudinary'
import mobileCheck from '@/mixins/mobileCheck'
import { data } from 'autoprefixer'
export default {
  name: 'K07Advertising',
  mixins: [idCloudinaryBanner, mobileCheck],
  props: {
    settingGeneral: {
      type: Object,
      required: true,
    },
    settingKAdvertising: {
      type: Object,
      required: true,
    },
    dataStore: {
      type: Object,
      required: true,
    },
  },
  watch: {
    settingKAdvertising() {
      if (
        this.settingKAdvertising &&
        this.settingKAdvertising['--url_img_background']
      ) {
        this.setBg()
      }
    },
  },
  mounted() {
    if (
      this.settingKAdvertising &&
      this.settingKAdvertising['--url_img_background']
    ) {
      this.setBg()
    }
  },
  methods: {
    isInternalUrl(url) {
      return url.startsWith('/')
    },
    setBg() {
      if (this.settingKAdvertising) {
        if (!this.mobileCheck()) {
          if (this.settingKAdvertising['--url_img_background']) {
            var imagen = document.getElementById('BgAdvertising')
            imagen.style.backgroundImage = `url(${this.idCloudinaryBanner(
              this.settingKAdvertising['--url_img_background'],
              'banner',
            )})`
          }
        }
      }
    },
  },
}
</script>
<style scoped>
.wrapper-item-advertising {
  background: var(--background_color_1);
  padding: 40px 0;
  @apply flex w-full flex-col items-center justify-center;
}
.separador-blog {
  padding-top: 100px;
}
.advertising-content-background {
  @apply z-auto flex items-center justify-center bg-cover;
  padding-top: 66px;
  padding-bottom: 66px;
}
.wrapper-img {
  max-width: 160px;
  max-height: 80px;
}
.advertising-items {
  background: var(--background_color_1_card);
  width: 596px;
  height: 449px;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
  @apply z-auto flex items-center justify-center shadow-2xl;
}
.advertising-border {
  border-color: var(--color_border);
  @apply z-auto flex h-full w-full flex-col items-center justify-center border border-opacity-50;
}
.content-bttns-shop {
  background: var(--color_background_btn_card);
  border-radius: var(--radius_btn);
  padding: 10px 20px;
  @apply mt-20;
}
.content-bttns-shop:hover {
  background: var(--hover_card);
  transition: all 0.2s ease-out;
}
.content-textbutton-shop {
  color: var(--color_text_btn_card);
  font-size: 13px;
  line-height: 18px;
  font-family: var(--font-style-3) !important;
  @apply font-semibold uppercase;
}
.advertising-text {
  margin-top: 15px;
  text-align: center;
  padding: 2px;
  @apply flex w-full flex-col items-center justify-center;
}
.tittle {
  @apply py-4;
  font-family: var(--font-style-2) !important;
  color: var(--color_text_card);
}
.subtittle {
  font-family: var(--font-style-3) !important;
  color: var(--color_subtext_card);
  @apply text-center;
}
.subtittles-items {
  @apply flex w-full flex-col items-center justify-center pb-4;
}
@screen sm {
  .advertising-content-background {
    @apply h-full w-9/0;
  }
  .advertising-items {
    @apply w-8/5;
  }
  .tittle {
    line-height: 44px;
    font-size: 34px;
  }
  .subtittle {
    line-height: 24px;
    font-size: 14px;
  }
}
@screen md {
  .advertising-content-background {
    @apply h-full w-9/5;
  }
  .advertising-items {
    @apply w-8/5;
  }
  .tittle {
    line-height: 50px;
    font-size: 40px;
  }
  .subtittle {
    line-height: 24px;
    font-size: 18px;
  }
}
@screen lg {
  .advertising-content-background {
    @apply h-full w-9/7;
  }
  .advertising-items {
    @apply w-6/5;
  }
  .tittle {
    line-height: 60px;
    font-size: 50px;
  }
  .subtittle {
    line-height: 36px;
    font-size: 26px;
  }
}
@screen mlg {
  .advertising-content-background {
    @apply h-full w-9/3;
  }
  .advertising-items {
    @apply w-5/0;
  }
}
@media (min-width: 1192px) {
  .advertising-content-background {
    width: 1192px;
  }
}
</style>
