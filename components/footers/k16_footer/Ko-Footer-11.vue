<template>
  <footer
    :style="[
      settingByTemplate16[0].footer,
      settingByTemplate16[0].settingGeneral,
      {
        '--font-style-1':
          settingByTemplate16[0].settingGeneral?.font ?? 'Poppins',
      },
    ]"
  >
    <div
      ref="background"
      class="box-content flex h-full w-full items-center justify-center bg-cover bg-bottom bg-no-repeat pb-30 md:pb-0"
      :style="`background-color: ${settingByTemplate16[0].footer['--background_color_1']}`"
    >
      <div class="flex w-full flex-col items-center justify-center">
        <div
          class="flex w-full max-w-9/5 flex-col items-center justify-center pb-10 pt-40 md:max-w-8/5 md:pb-49"
        >
          <div class="content-items-sm">
            <div class="content-store-sm">
              <div class="mb-20 flex w-full justify-center">
                <KoSocialNet
                  :footer-icon="settingByTemplate16[0].footer"
                  :data-store="dataStore"
                />
              </div>
              <div class="info-store-sm mb-20">
                <p class="btn">Enlaces</p>
                <div class="flex w-full flex-wrap gap-x-4 gap-y-3">
                  <div
                    v-for="(item, index) in secciones"
                    :key="`${index}${item.name}`"
                  >
                    <nuxt-link
                      v-if="item.path"
                      :to="item.path"
                      class="txt-number txt"
                    >
                      {{ $t(`${item.name}`) }}
                    </nuxt-link>
                    <nuxt-link
                      v-else-if="item.href && stateListBLogs"
                      :to="item.href"
                      class="txt-number txt"
                    >
                      {{ $t(`${item.name}`) }}
                    </nuxt-link>
                  </div>
                </div>
              </div>
              <div class="info-store-sm mb-20">
                <p class="btn">Información de la tienda</p>
                <div class="content-direction">
                  <p v-if="geolocalizacion.length" class="txt">
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
              <KoNewsLetter
                :setting-by-template16="settingByTemplate16"
                :data-store="dataStore"
                class="mb-20"
              />
              <button
                v-if="storePolicies"
                class="txt-number txt w-full text-center"
                @click="OpenModalPolitics"
              >
                {{ $t('footer_politicasyterminos') }}
              </button>
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
              <p class="txt mb-20">
                Si tiene alguna pregunta, contáctenos en
                <span v-if="dataStore.tiendasInfo.emailTienda" class="ml-3">
                  {{ dataStore.tiendasInfo.emailTienda }}
                </span>
              </p>
              <div
                v-if="geolocalizacion.length"
                class="mb-5 flex w-full flex-row items-center gap-2"
              >
                <div class="w-full max-w-[20px]">
                  <svg
                    :fill="settingByTemplate16[0]?.footer['--color_icon']"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                  >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path
                      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                    />
                  </svg>
                </div>
                <p class="txt w-full">
                  {{ geolocalizacion[0].direccion }}
                </p>
              </div>
              <div
                v-if="dataStore.redes.whatsapp"
                class="mb-20 flex flex-row items-center gap-2"
              >
                <div class="w-full max-w-[20px]">
                  <svg
                    width="16px"
                    height="16px"
                    viewBox="0 0 20 20"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    class="ml-5"
                  >
                    <g
                      id="Page-1"
                      stroke="none"
                      stroke-width="1"
                      fill="none"
                      fill-rule="evenodd"
                    >
                      <g
                        id="Dribbble-Light-Preview"
                        transform="translate(-300.000000, -7599.000000)"
                        :fill="settingByTemplate16[0]?.footer['--color_icon']"
                      >
                        <g
                          id="icons"
                          transform="translate(56.000000, 160.000000)"
                        >
                          <path
                            d="M259.821,7453.12124 C259.58,7453.80344 258.622,7454.36761 257.858,7454.53266 C257.335,7454.64369 256.653,7454.73172 254.355,7453.77943 C251.774,7452.71011 248.19,7448.90097 248.19,7446.36621 C248.19,7445.07582 248.934,7443.57337 250.235,7443.57337 C250.861,7443.57337 250.999,7443.58538 251.205,7444.07952 C251.446,7444.6617 252.034,7446.09613 252.104,7446.24317 C252.393,7446.84635 251.81,7447.19946 251.387,7447.72462 C251.252,7447.88266 251.099,7448.05372 251.27,7448.3478 C251.44,7448.63589 252.028,7449.59418 252.892,7450.36341 C254.008,7451.35771 254.913,7451.6748 255.237,7451.80984 C255.478,7451.90987 255.766,7451.88687 255.942,7451.69881 C256.165,7451.45774 256.442,7451.05762 256.724,7450.6635 C256.923,7450.38141 257.176,7450.3464 257.441,7450.44643 C257.62,7450.50845 259.895,7451.56477 259.991,7451.73382 C260.062,7451.85686 260.062,7452.43903 259.821,7453.12124 M254.002,7439 L253.997,7439 L253.997,7439 C248.484,7439 244,7443.48535 244,7449 C244,7451.18666 244.705,7453.21526 245.904,7454.86076 L244.658,7458.57687 L248.501,7457.3485 C250.082,7458.39482 251.969,7459 254.002,7459 C259.515,7459 264,7454.51465 264,7449 C264,7443.48535 259.515,7439 254.002,7439"
                            id="whatsapp-[#128]"
                          ></path>
                        </g>
                      </g>
                    </g>
                  </svg>
                </div>
                <p class="txt w-full">
                  {{ dataStore.redes.whatsapp }}
                </p>
              </div>
              <div class="info-networkss">
                <KoSocialNet
                  :footer-icon="settingByTemplate16[0].footer"
                  :data-store="dataStore"
                />
              </div>
            </div>
            <div class="info-btn-footer">
              <p class="btn">Enlaces</p>
              <div
                v-for="(item, index) in secciones"
                :key="`${index}${item.name}`"
                class="mb-8"
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
              <p class="btn mb-10">
                {{ settingByTemplate16[0].newsletter.title }}
              </p>
              <KoNewsLetter
                :setting-by-template16="settingByTemplate16"
                :data-store="dataStore"
              />
              <p class="btn mt-25">Nuestra empresa</p>
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
        <div v-if="settingByTemplate16[0].footer.watermark" class="empty"></div>
        <div
          v-if="settingByTemplate16[0].footer.watermark"
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
        <div v-if="showModal">
          <div v-if="showModal && storePolicies" class="modal">
            <KoTermsConditions :store-policies="storePolicies" />
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'KoFooter11',
  components: {
    KoNewsLetter: () => import('@/components/template16/Ko16-Newsletter.vue'),
    KoSocialNet: () => import('@/components/template11/ko-socialnet.vue'),
    KoTermsConditions: () =>
      import('@/components/footers/ko-TermsAndConditions.vue'),
  },
  props: {
    dataStore: {
      type: Object,
      required: true,
    },
    settingByTemplate16: {
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
    settingByTemplate16() {
      if (this.settingByTemplate16 && this.settingByTemplate16[0].footer) {
        let color = this.settingByTemplate16[0].footer['--background_color_1']
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
    if (this.settingByTemplate16 && this.settingByTemplate16[0].footer) {
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
* {
  font-family: var(--font-style-1) !important;
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
    @apply pb-10;
  }
  .txt {
    color: var(--color_text);
    font-size: 14px;
  }
  .btns:hover {
    color: var(--hover_text);
  }
  .btn-legal {
    @apply flex w-full flex-col items-start justify-center text-left;
  }
  .content-items-lg {
    @apply hidden;
  }
  .madebyKomercia {
    @apply flex w-full flex-col items-center justify-center py-20;
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
  .info-btn-footer {
    @apply flex w-full flex-col items-start justify-center;
  }
  .btns {
    color: var(--color_text);
    font-size: 14px;
  }
  .btns:hover {
    color: var(--hover_text);
  }
}
@media (min-width: 1200px) {
  .content-items-lg {
    @apply w-full max-w-7xl;
  }
}
</style>
