<template>
  <footer
    :style="[
      settingByTemplate6[0]?.setting6Footer,
      settingByTemplate6[0]?.setting6General,
      {
        '--font-style-1':
          settingByTemplate6[0]?.setting6General?.font ?? 'Poppins',
      },
    ]"
  >
    <div
      class="wrapper_footer"
      :style="{
        backgroundColor:
          settingByTemplate6[0].setting6Footer.bg_color || 'white',
      }"
    >
      <div class="header-content-logo">
        <nuxt-link
          to="/"
          class="wrapper-logo"
          :style="`max-width:${settingByTemplate6[0].setting6Footer['--with_logo']};`"
        >
          <img
            loading="lazy"
            :src="imageUrl"
            class="header-logo"
            alt="Logo Img"
            @error="setDefaultImage"
          />
        </nuxt-link>
      </div>
      <div class="content-items-iconos">
        <div
          v-for="(item, index) in links"
          v-show="item.link"
          :key="`${index}${item.icon}`"
        >
          <a
            v-if="item.link"
            :href="item.link"
            target="_blank "
            :style="`color:${settingByTemplate6[0].setting6Footer['--color_icon']}; fill:${settingByTemplate6[0].setting6Footer['--color_icon']};`"
          >
            <div :is="item.icon" class="icon" />
          </a>
        </div>
      </div>
      <button
        v-if="storePolicies"
        class="text-politics pb-10"
        :style="`color:${settingByTemplate6[0].setting6Footer['--color_text']} ;`"
        @click="OpenModalPolitics"
      >
        <p>{{ $t('footer_politicasyterminos') }}</p>
      </button>
      <div v-if="showModal && storePolicies" class="modal">
        <KoTermsConditions :store-policies="storePolicies" />
      </div>
      <div
        v-if="settingByTemplate6[0].setting6Footer.watermark"
        class="footer_resources w-full text-center text-sm font-normal text-gray-400"
      >
        <hr class="w-full border-t border-gray-200" />
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
    </div>
  </footer>
</template>

<script>
import { mapState } from 'vuex'
export default {
  components: {
    KoTermsConditions: () =>
      import('@/components/footers/ko-TermsAndConditions.vue'),
  },
  props: {
    dataStore: {
      type: Object,
      required: true,
    },
    settingByTemplate6: {
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
      links: [
        {
          nombre: 'Facebook',
          icon: 'facebook-icon',
          link: this.dataStore.redes.facebook,
        },
        {
          nombre: 'Twitter',
          icon: 'twitter-icon',
          link: this.dataStore.redes.twitter,
        },
        {
          nombre: 'Instagram',
          icon: 'instagram-icon',
          link: this.dataStore.redes.instagram,
        },
        {
          nombre: 'Youtube',
          icon: 'youtube-icon',
          link: this.dataStore.redes.youtube,
        },
        {
          nombre: 'Tiktok',
          icon: 'tiktok-icon',
          link: this.dataStore.redes.tiktok,
        },
      ],
      logo: true,
      fallbackImage: '',
    }
  },
  computed: {
    ...mapState(['storePolicies']),
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
    settingByTemplate6() {
      this.setLogo()
    },
    'dataStore.tienda'() {
      this.links[0].link = this.dataStore.redes.facebook
      this.links[1].link = this.dataStore.redes.twitter
      this.links[2].link = this.dataStore.redes.instagram
      this.links[3].link = this.dataStore.redes.youtube
      this.links[4].link = this.dataStore.redes.tiktok
    },
  },
  mounted() {
    if (this.settingByTemplate6[0]?.setting6Footer) {
      this.setLogo()
    }
  },
  methods: {
    OpenModalPolitics() {
      this.$store.state.modalpolitics05 = true
    },
    setLogo() {
      if (this.settingByTemplate6[0]?.setting6Footer) {
        let color = this.settingByTemplate6[0].setting6Footer.bg_color
        let colorArray = color.split(',')
        let colorInt = parseInt(colorArray[2])
        if (colorInt > 50) {
          this.logo = true
        } else {
          this.logo = false
        }
      }
    },
    setDefaultImage() {
      this.fallbackImage = require('@/assets/img/logo_nuevas_tiendas.png')
    },
  },
}
</script>

<style scoped>
* {
  font-family: var(--font-style-1) !important;
}
.wrapper_footer {
  padding: 40px 0 10px;
  @apply relative flex w-full flex-col items-center;
}
.header-content-logo {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px 0px;
}
.wrapper-logo {
  width: 100%;
}
.header-logo {
  object-fit: contain;
  object-position: left;
}
.text-title {
  padding: 15px 0 20px;
  text-align: center;
  font-weight: 400;
  max-width: 380px;
}

.text-secciones {
  font-size: 16px;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: normal;
  margin-right: 10px;
  /* text-align: center; */
}
.text-secciones:hover {
  color: var(--color_hover_text);
}
.text-politics {
  text-align: center;
  font-weight: 400;
}
.modal {
  padding-top: 200px;
  background-color: rgba(0, 0, 0, 0.4);
  @apply fixed left-0 top-0 z-10 h-full w-full overflow-auto;
}
.content-items-iconos {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 15px 0 20px;
}
.icon {
  margin-right: 10px;
  font-size: 28px;
}
.icon:hover {
  color: grey;
  fill: grey;
}
.madebyKomercia {
  margin-top: 20px;
  @apply mb-10 flex w-full flex-col items-center justify-center;
}
.txt-devBy {
  font-size: 14px;
  color: var(--color_text);
}
.logo2 {
  width: 100px;
  opacity: 0.5;
}
</style>
