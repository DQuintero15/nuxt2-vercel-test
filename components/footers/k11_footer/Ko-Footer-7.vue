<template>
  <footer
    v-if="settingByTemplate11"
    ref="background"
    class="wrapper-footer"
    :style="[
      settingByTemplate11[0].setting11Footer,
      settingByTemplate11[0].setting11General,
    ]"
  >
    <div
      class="content-footer"
      :style="[
        {
          '--font-style-1':
            settingByTemplate11[0]?.setting11General?.fount_1 ?? 'Roboto',
        },
      ]"
    >
      <KoNewsLetter
        v-if="settingByTemplate11[0].newsletter.visible"
        :newsletter="settingByTemplate11[0].newsletter"
        :setting11-general="settingByTemplate11[0].setting11General"
        :data-store="dataStore"
      />
      <div class="content-footer-items">
        <div class="content-items-sm">
          <div class="content-store-sm">
            <div class="info-store-sm">
              <button class="accordion btn">Información de la tienda</button>
              <div class="footer-content-tienda panel">
                <div class="content-direction">
                  <p v-if="geolocalizacion?.length" class="txt-direction txt">
                    {{ geolocalizacion[0].direccion }}
                  </p>
                </div>
                <div class="content-number">
                  <p
                    v-if="dataStore.tiendasInfo.telefono"
                    class="txt-number txt"
                  >
                    {{ dataStore.tiendasInfo.telefono }}
                  </p>
                </div>
                <div class="content-email">
                  <p
                    v-if="dataStore.tiendasInfo.emailTienda"
                    class="txt-email txt"
                  >
                    {{ dataStore.tiendasInfo.emailTienda }}
                  </p>
                </div>
              </div>
            </div>
            <div class="info-networks">
              <button class="accordion btn">Síguenos</button>
              <KoSocialNet
                :footer-icon="settingByTemplate11[0].setting11Footer"
                :data-store="dataStore"
                class="panel"
              />
            </div>
            <div class="info-legal-sm">
              <button
                v-if="storePolicies"
                class="btn-legal btn"
                @click="OpenModalPolitics"
              >
                {{ $t('footer_politicasyterminos') }}
              </button>
            </div>
          </div>
        </div>
        <div class="content-items-lg">
          <div class="info-btn-footer gap-2">
            <img
              loading="lazy"
              :src="imageUrl"
              class="img-logo"
              alt="Logo"
              @error="setDefaultImage"
            />
            <div class="content-direction">
              <p v-if="geolocalizacion?.length" class="txt-direction txt">
                {{ geolocalizacion[0].direccion }}
              </p>
            </div>
            <div class="content-number">
              <p v-if="dataStore.tiendasInfo.telefono" class="txt-number txt">
                {{ dataStore.tiendasInfo.telefono }}
              </p>
            </div>
            <div class="content-email">
              <p v-if="dataStore.tiendasInfo.emailTienda" class="txt-email txt">
                {{ dataStore.tiendasInfo.emailTienda }}
              </p>
            </div>
            <div class="info-networkss">
              <KoSocialNet
                :footer-icon="settingByTemplate11[0].setting11Footer"
                :data-store="dataStore"
              />
            </div>
          </div>
          <div class="info-btn-footer">
            <p class="btn">Enlaces</p>
            <div
              v-for="(item, index) in secciones"
              :key="`${index}${item.name}`"
            >
              <nuxt-link v-if="item.path" :to="item.path" class="btns">
                {{ $t(`${item.name}`) }}
              </nuxt-link>
              <nuxt-link
                v-else-if="item.href && stateListBLogs"
                :to="item.href"
                class="btns"
              >
                {{ $t(`${item.name}`) }}
              </nuxt-link>
            </div>
          </div>
          <div class="info-btn-footer">
            <p class="btn">Nuestra empresa</p>
            <button
              v-if="storePolicies"
              class="btn-legal btns"
              @click="OpenModalPolitics"
            >
              {{ $t('footer_politicasyterminos') }}
            </button>
          </div>
        </div>
      </div>
      <div
        v-if="settingByTemplate11[0].setting11Footer.watermark"
        class="empty"
      ></div>
      <div
        v-if="settingByTemplate11[0].setting11Footer.watermark"
        class="madebyKomercia"
      >
        <p class="txt-devBy">{{ $t('footer_desarrollado') }}</p>
        <a
          href="https://komercia.co/"
          target="_blank"
          rel="noreferrer noopener"
        >
          <img
            v-lazy="
              `https://res.cloudinary.com/komercia-components/image/upload/c_scale,w_500,q_auto:best,f_auto/v1582151044/assets/cnrizgaks15xpkxk22ex.png`
            "
            class="logo2"
            alt="Logo Img"
          />
        </a>
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
  name: 'Ko7Footer',
  components: {
    KoNewsLetter: () => import('@/components/template11/ko-newsletter.vue'),
    KoSocialNet: () => import('@/components/template11/ko-socialnet.vue'),
    KoTermsConditions: () =>
      import('@/components/footers/ko-TermsAndConditions.vue'),
  },
  props: {
    dataStore: {
      type: Object,
      required: true,
    },
    settingByTemplate11: {
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
    ...mapState(['stateListBLogs', 'geolocalizacion', 'storePolicies']),
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
    settingByTemplate11() {
      if (
        this.settingByTemplate11 &&
        this.settingByTemplate11[0].setting11Footer
      ) {
        let color =
          this.settingByTemplate11[0].setting11Footer['--background_color_1']
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
      this.settingByTemplate11 &&
      this.settingByTemplate11[0].setting11Footer
    ) {
      this.setLogo()
    }
    var acc = document.getElementsByClassName('accordion')
    var i
    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener('click', function () {
        this.classList.toggle('active')
        var panel = this.nextElementSibling
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null
        } else {
          panel.style.maxHeight = panel.scrollHeight + 10 + 'px'
        }
      })
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
.wrapper-footer {
  background: var(--background_color_1);
  @apply flex w-full items-center justify-center pb-50 md:pb-20;
}
.content-footer {
  background: var(--background_color_1);
  @apply flex w-full flex-col items-center justify-center;
}
.content-footer-items {
  max-width: 1200px;
  @apply flex w-full flex-col items-center justify-center;
}
.modal {
  padding-top: 200px;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
  @apply fixed left-0 top-0 z-10 h-full w-full overflow-auto;
}
.empty {
  background-color: var(--color_border);
  @apply flex h-1 w-full flex-col items-center justify-center;
}
@screen sm {
  .content-items-sm {
    @apply flex w-full flex-col items-center justify-center;
  }
  .content-store-sm {
    @apply flex w-9/0 flex-col items-start justify-center;
  }
  .content-direction,
  .content-number,
  .content-email {
    @apply flex w-full flex-col items-start justify-center;
  }
  .info-store-sm,
  .info-legal-sm,
  .info-networks {
    @apply flex w-full flex-col items-start justify-center;
  }

  .btn {
    color: var(--color_title);
    font-size: 18px;
    font-family: var(--font-style-1) !important;
    @apply pb-10;
  }
  .txt {
    color: var(--color_text);
    font-size: 14px;
    font-family: var(--font-style-1) !important;
  }
  .btns:hover {
    color: var(--hover_text);
  }
  .btn-legal {
    @apply flex w-full flex-col items-start justify-center text-left;
  }
  .accordion {
    transition: 0.4s;
    @apply mb-0 w-full cursor-pointer border-none text-left outline-none;
  }
  .accordion:after {
    content: '\276F';
    color: #fff;
    @apply float-right font-bold transition-all duration-0.2 ease-in;
  }
  .active:after {
    transform: rotate(90deg);
    @apply transition-all duration-0.2 ease-in;
  }
  .panel {
    transition: 0.4s ease-out;
    @apply mb-10 max-h-0 w-full items-center justify-start overflow-hidden;
  }
  .content-items-lg {
    @apply hidden;
  }
  .madebyKomercia {
    @apply flex w-full flex-col items-center justify-center pt-20;
  }
  .txt-devBy {
    font-size: 14px;
    color: var(--color_text);
  }
  .logo2 {
    width: 100px;
    opacity: 0.5;
  }
}
@screen lg {
  .content-items-sm {
    @apply hidden;
  }
  .content-items-lg {
    @apply grid w-9/0 grid-cols-3 items-start justify-center gap-4;
  }
  .img-logo {
    max-width: var(--with_logo);
    @apply w-full object-contain;
  }
  .content-image {
    @apply mb-20 flex w-full flex-col items-center justify-start;
  }
  .info-btn-footer {
    @apply flex w-full flex-col items-start justify-center;
  }
  .btns {
    color: var(--color_text);
    font-size: 14px;
    font-family: var(--font-style-1) !important;
  }
  .btns:hover {
    color: var(--hover_text);
  }
}
@media (min-width: 1200px) {
  .content-items-lg {
    max-width: 1200px;
    @apply w-8/0;
  }
  .content-footer-items {
    @apply pb-60 pt-40;
  }
}
</style>
