<template>
  <footer
    ref="background"
    class="footer-container"
    :style="[
      settingByTemplate10[0].setting10Footer,
      settingByTemplate10[0].setting10General,
      {
        '--font-style-1':
          settingByTemplate10[0]?.setting10General?.fount_1 ?? 'Roboto',
      },
    ]"
  >
    <div class="footer-content">
      <div class="footer-content-items">
        <div class="footer-content-tienda">
          <div class="content-image">
            <img
              loading="lazy"
              :src="imageUrl"
              class="img-logo"
              alt="Logo"
              @error="setDefaultImage"
            />
          </div>
          <div v-if="geolocalizacion?.length" class="content-direction">
            <p class="txt-direction">
              {{ geolocalizacion[0].direccion }}
            </p>
          </div>
          <div class="content-number">
            <p class="txt-number">
              {{ dataStore.tiendasInfo.telefono }}
            </p>
          </div>
          <div class="content-email">
            <p class="txt-email">
              {{ dataStore.tiendasInfo.emailTienda }}
            </p>
          </div>
          <div class="content-Pliticas-Terminos">
            <button
              v-if="storePolicies"
              class="txt-pol-term"
              @click="OpenModalPolitics"
            >
              {{ $t('footer_politicasyterminos') }}
            </button>
          </div>
        </div>
        <div class="footer-content-itemsBtns">
          <div class="content-buttons">
            <div class="container-txt">
              <div class="content-txt-redes">
                <p class="txt-redes">Nuestras redes</p>
              </div>
              <div class="content-txt-btns">
                <p class="txt-btn">Enlaces</p>
              </div>
            </div>
            <div class="container-opt">
              <div class="footer-socialNetworks">
                <KoSocialNet
                  :data-store="dataStore"
                  :setting10-footer="settingByTemplate10[0].setting10Footer"
                  :setting10-general="settingByTemplate10[0].setting10General"
                />
              </div>
              <div class="footer-content-button">
                <div
                  v-for="(item, index) in secciones"
                  :key="`${index}${item.name}`"
                >
                  <nuxt-link v-if="item.path" :to="item.path" class="btn">
                    <p class="txt-btns">
                      {{ $t(`${item.name}`) }}
                    </p>
                  </nuxt-link>
                  <nuxt-link
                    v-else-if="item.href && stateListBLogs"
                    :to="item.href"
                    class="btn"
                  >
                    <p class="txt-btns">
                      {{ $t(`${item.name}`) }}
                    </p>
                  </nuxt-link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="footer-acordion-bttns">
          <div class="tabs">
            <div class="tab">
              <input type="checkbox" id="chck1" />
              <label class="tab-label" for="chck1">Nuestras redes</label>
              <div class="tab-content">
                <KoSocialNet
                  :data-store="dataStore"
                  :setting10-footer="settingByTemplate10[0].setting10Footer"
                  :setting10-general="settingByTemplate10[0].setting10General"
                />
              </div>
            </div>
            <div class="tab">
              <input type="checkbox" id="chck2" />
              <label class="tab-label" for="chck2">Enlaces</label>
              <div class="tab-content">
                <div
                  v-for="(item, index) in secciones"
                  :key="`${index}${item.name}`"
                >
                  <nuxt-link v-if="item.path" :to="item.path" class="btn pb-5">
                    <p class="txt-btns">
                      {{ $t(`${item.name}`) }}
                    </p>
                  </nuxt-link>
                  <nuxt-link
                    v-else-if="item.href && stateListBLogs"
                    :to="item.href"
                    class="btn pb-5"
                  >
                    <p class="txt-btns">
                      {{ $t(`${item.name}`) }}
                    </p>
                  </nuxt-link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="footer-content-newsLetters">
          <KoNewsLetter
            :setting-by-template10="settingByTemplate10"
            :data-store="dataStore"
          />
        </div>
      </div>
      <div class="footer-content-newsLetters-hid">
        <KoNewsLetter
          :setting-by-template10="settingByTemplate10"
          :data-store="dataStore"
        />
      </div>
      <div
        v-if="settingByTemplate10[0].setting10Footer.watermark"
        class="madebyKomercia"
      >
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
    <!-- <KoTermsConditions class="modal" id="myModal"></KoTermsConditions> -->
  </footer>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Ko6Footer',
  components: {
    KoNewsLetter: () => import('@/components/template10/Ko-Newsletter.vue'),
    KoSocialNet: () => import('@/components/template10/Ko-Social-Networks.vue'),
    KoTermsConditions: () =>
      import('@/components/footers/ko-TermsAndConditions.vue'),
  },
  props: {
    dataStore: {
      type: Object,
      required: true,
    },
    settingByTemplate10: {
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
      logo: null,
      fallbackImage: '',
    }
  },
  computed: {
    ...mapState(['stateListBLogs', 'storePolicies', 'geolocalizacion']),
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
    settingByTemplate10() {
      if (this.settingByTemplate10[0]?.setting10Footer) {
        let color =
          this.settingByTemplate10[0].setting10Footer['--background_color_1']
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
    if (this.settingByTemplate10[0]?.setting10Footer) {
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
  border-color: var(--color_border);
  @apply flex w-full flex-col items-center justify-center border-t pb-40 md:pb-20;
}
.footer-content {
  @apply flex w-full flex-col items-center justify-center;
}
.footer-content-items {
  @apply grid w-full grid-cols-3 items-center justify-center gap-2;
}
.footer-content-itemsBtns {
  @apply grid w-full grid-cols-2 gap-4;
}
.madebyKomercia {
  border-color: var(--color_border);
  @apply flex w-full flex-col items-center justify-center border-t-2 pt-10;
}
.txt-devBy {
  font-size: 14px;
  color: var(--color_text);
}
.logo2 {
  width: 100px;
  opacity: 0.5;
}
.txt-direction,
.txt-number,
.txt-email,
.btn {
  color: var(--color_text);
  font-family: var(--font-style-1) !important;
  @apply pb-20;
}
.txt-btns {
  font-family: var(--font-style-1) !important;
  font-size: 15px;
  @apply mb-5 w-auto transition-all duration-0.2 ease-in;
}
.txt-btns:hover {
  color: var(--hover_text);
  @apply transition-all duration-0.2 ease-in;
}
.content-Pliticas-Terminos {
  @apply flex w-auto flex-col items-center justify-start;
}
.txt-pol-term {
  color: var(--color_text);
  font-size: 15px;
  font-family: var(--font-style-1) !important;
  @apply text-left;
}
.txt-pol-term:hover {
  color: var(--hover_text);
}
.modal {
  padding-top: 200px;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
  @apply fixed left-0 top-0 z-10 h-full w-full overflow-auto;
}
input {
  position: absolute;
  opacity: 0;
  z-index: -1;
}
.tabs {
  width: 100%;
  background: transparent;
  overflow: hidden;
}
.tab {
  width: 100%;
  color: rgb(0, 0, 0);
  overflow: hidden;
}
.tab-label {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 1em 0;
  font-weight: bold;
  cursor: pointer;
}
.tab-label::after {
  text-align: center;
  transition: all 0.35s;
  content: '\02795';
  color: var(--color_icon);
}
.tab-content {
  max-height: 0;
  color: #000000;
  transition: all 0.35s;
}
.tab-close {
  display: flex;
  justify-content: flex-end;
  padding: 1em;
  font-size: 0.75em;
  cursor: pointer;
}
input:checked + .tab-label::after {
  transition: all 0.35s;
  content: '\2796';
  color: var(--color_icon);
}
input:checked ~ .tab-content {
  max-height: 100vh;
}
@screen sm {
  .img-logo {
    @apply w-full object-contain object-left;
  }
  .footer-content {
    @apply w-9/0;
  }
  .footer-content-items {
    @apply flex flex-col;
  }
  .footer-content-itemsBtns,
  .footer-content-newsLetters-hid {
    @apply hidden;
  }
  .footer-content-tienda {
    @apply mb-30 mt-20 flex w-full flex-col items-start justify-center;
  }
  .footer-acordion-bttns {
    @apply mb-20 flex w-full flex-col items-center justify-start;
  }
  .footer-content-newsLetters {
    @apply flex w-full flex-col items-center justify-start;
  }
  .txt-direction,
  .txt-number,
  .txt-email {
    font-size: 15px;
    @apply mb-10;
  }
  .content-image {
    max-width: var(--with_logo);
    @apply mb-20 flex w-full items-center justify-center;
  }
}
@media (min-width: 425px) {
  .content-image {
    @apply items-center justify-start;
  }
}
@screen md {
  .container-txt,
  .container-opt {
    @apply grid w-full grid-cols-2 items-start justify-start gap-4;
  }
  .container-txt {
    @apply mt-20;
  }
  .content-txt-redes,
  .content-txt-btns {
    color: var(--color_title);
    font-family: var(--font-style-1) !important;
    @apply mb-20;
  }
  .content-buttons {
    @apply flex w-full flex-col items-center justify-center;
  }
  .footer-content-items {
    @apply grid w-full grid-cols-2 items-center justify-center gap-4;
  }
  .footer-content-itemsBtns {
    @apply flex items-start justify-center;
  }
  .footer-content-newsLetters-hid {
    @apply flex w-full flex-col items-center justify-start;
  }
  .footer-acordion-bttns {
    @apply hidden;
  }
  .footer-content-newsLetters {
    @apply hidden;
  }
  .footer-content-button {
    @apply w-auto;
  }
  .txt-redes,
  .txt-btn {
    font-size: 15px;
    font-family: var(--font-style-1) !important;
    @apply font-semibold;
  }
  .txt-direction,
  .txt-number,
  .txt-email {
    @apply mb-0;
  }
}
@screen mlg {
  .footer-content-items {
    @apply grid grid-cols-3 gap-4;
  }
  .footer-content-newsLetters {
    @apply mt-40 flex;
  }
  .footer-content-newsLetters-hid {
    @apply hidden;
  }
  .footer-content-items {
    height: 433px;
    max-height: 433px;
  }
}
@media (min-width: 1400px) {
  .footer-content {
    width: 1400px;
  }
}
</style>
