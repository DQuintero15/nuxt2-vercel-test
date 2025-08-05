<template>
  <footer
    v-if="settingByTemplate7 && settingByTemplate7[0].setting7Footer"
    :style="[
      settingByTemplate7[0].setting7Footer,
      settingByTemplate7[0].setting7General,
      {
        '--font-style-1':
          settingByTemplate7[0]?.setting7General?.fount_1 ?? 'David libre',
      },
    ]"
  >
    <div
      ref="background"
      class="footer-container"
      :style="
        settingByTemplate7[0].setting7Footer.img_background
          ? `background-image: url(${settingByTemplate7[0].setting7Footer['--url_img']})`
          : 'background-image: none;'
      "
    >
      <div class="footer-content">
        <div class="footer-content-items">
          <div class="footer-content-logo">
            <img
              loading="lazy"
              :src="imageUrl"
              class="footer-logo"
              alt="logo_tienda"
              @error="setDefaultImage"
            />
          </div>
          <div class="footer-content-button">
            <div
              v-for="(item, index) in secciones"
              :key="`${index}${item.name}`"
            >
              <nuxt-link v-if="item.path" :to="item.path" class="btn">
                {{ $t(`${item.name}`) }}
              </nuxt-link>
              <nuxt-link
                v-else-if="item.href && stateListBLogs"
                :to="item.href"
                class="btn"
              >
                {{ $t(`${item.name}`) }}
              </nuxt-link>
            </div>
          </div>
          <KoSocialNet
            :data-store="dataStore"
            :setting-by-template="settingByTemplate7[0].setting7General"
          />
        </div>
        <div class="content-Pliticas-Terminos">
          <button v-if="storePolicies" class="btn" @click="OpenModalPolitics">
            {{ $t('footer_politicasyterminos') }}
          </button>
        </div>
        <div class="separator"></div>
        <div class="madebyKomercia">
          <p class="txt-devBy">{{ $t('footer_desarrollado') }}</p>
          <a
            href="https://komercia.co/"
            target="_blank"
            rel="noreferrer noopener"
          >
            <img
              v-if="logo"
              v-lazy="
                `https://res.cloudinary.com/komercia-components/image/upload/c_scale,w_500,q_auto:best,f_auto/v1575331333/components/files/majg1iax3sjgrtyvrs9x.png`
              "
              class="logo2"
              alt="Logo Img"
            />
            <img
              v-else
              v-lazy="
                `https://res.cloudinary.com/komercia-components/image/upload/c_scale,w_500,q_auto:best,f_auto/v1582151044/assets/cnrizgaks15xpkxk22ex.png`
              "
              class="logo2"
              alt="Logo Img"
            />
          </a>
        </div>
      </div>
      <div v-if="showModal && storePolicies" class="modal">
        <KoTermsConditions :store-policies="storePolicies" />
      </div>
    </div>
  </footer>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Ko4Footer',
  components: {
    KoSocialNet: () => import('@/components/template7/Ko-Social-Networks.vue'),
    KoTermsConditions: () =>
      import('@/components/footers/ko-TermsAndConditions.vue'),
  },
  props: {
    dataStore: {
      type: Object,
      required: true,
    },
    settingByTemplate7: {
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
      secciones: [
        {
          name: 'header_inicio',
          path: '/',
        },
        {
          name: 'header_productos',
          path: '/productos',
        },
        {
          name: 'header_contacto',
          path: '/contacto',
        },
        {
          name: 'footer_micompra',
          path: '/micompra',
        },
        {
          name: 'header_blog',
          href: '/blog',
        },
      ],
      logo: true,
      fallbackImage: '',
    }
  },
  computed: {
    ...mapState(['stateListBLogs', 'storePolicies']),
    ...mapState({
      showModal: (state) => state.modalpolitics05,
    }),
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
  watch: {
    settingByTemplate7f() {
      if (
        this.settingByTemplate7 &&
        this.settingByTemplate7[0].setting7Footer &&
        !this.settingByTemplate7[0].setting7Footer.img_background
      ) {
        let color = getComputedStyle(this.$refs.background).getPropertyValue(
          '--background_color_1'
        )
        let colorArray = color.split(',')
        let colorInt = parseInt(colorArray[2])
        if (colorInt > 50) {
          this.logo = true
        } else {
          this.logo = false
        }
      }
    },
  },
  mounted() {
    if (
      this.settingByTemplate7 &&
      this.settingByTemplate7[0].setting7Footer &&
      !this.settingByTemplate7[0].setting7Footer.img_background
    ) {
      this.setLogo()
    }
  },
  methods: {
    OpenModalPolitics() {
      this.$store.state.modalpolitics05 = true
    },
    setLogo() {
      let color = getComputedStyle(this.$refs.background).getPropertyValue(
        '--background_color_1'
      )
      let colorArray = color.split(',')
      let colorInt = parseInt(colorArray[2])
      if (colorInt > 50) {
        this.logo = true
      } else {
        this.logo = false
      }
    },
    setDefaultImage() {
      this.fallbackImage = require('@/assets/img/logo_nuevas_tiendas.png')
    },
  },
}
</script>

<style scoped>
.footer-container {
  background: var(--background_color_1);
  min-height: 322px;
  @apply flex flex-col items-center justify-center bg-auto bg-bottom bg-no-repeat pb-30 md:pb-0;
}
.footer-content {
  margin-bottom: 10px;
  @apply flex flex-col items-center justify-center;
}
.footer-content-items {
  @apply my-10 flex w-full flex-col items-center justify-center;
}
.footer-logo {
  object-fit: contain;
  width: 100%;
  max-width: var(--with_logo);
}
.footer-content-button {
  @apply mt-32 flex w-full flex-wrap items-center justify-center gap-4;
}
.btn {
  color: var(--color_text);
  transition: all 0.25s ease;
  @apply mx-8 font-semibold uppercase tracking-wider;
}
.btn:hover {
  @apply text-red-btnhoverHeader;
  transition: all 0.25s ease;
}
.btn {
  font-family: var(--font-style-1) !important ;
}
.logo2 {
  width: 100px;
  opacity: 0.5;
}
.separator {
  max-width: 400px;
  border: solid 1px #666;
  background: #666;
  @apply my-5 h-2 w-full opacity-50;
}
.madebyKomercia {
  @apply flex w-full flex-col items-center justify-center;
}
.txt-devBy {
  font-size: 14px;
  color: #666;
}
.modal {
  padding-top: 200px;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
  @apply fixed left-0 top-0 z-10 h-full w-full overflow-auto;
}
@screen sm {
  .footer-content {
    @apply flex w-full;
  }
  .btn {
    @apply text-sm;
  }
}
@media (max-width: 600px) {
  .separator {
    max-width: 300px;
  }
}
@screen md {
  .btn {
    font-size: 16px;
  }
}
@media (min-width: 1192px) {
  .footer-content {
    width: 1192px;
  }
}
</style>
