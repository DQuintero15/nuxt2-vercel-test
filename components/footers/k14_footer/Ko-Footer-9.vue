<template>
  <footer
    ref="background"
    class="wrapper-footer flex w-full items-center justify-center pb-35 md:pb-20"
    :style="[
      settingByTemplate14[0].setting14Footer,
      settingByTemplate14[0].setting14General,
      {
        '--font-style-1':
          settingByTemplate14[0].setting14General?.fount_1 ?? 'Poppins',
      },
    ]"
  >
    <div class="content-footer">
      <div
        class="flex w-full max-w-7xl flex-col items-center justify-center pb-10 pt-50 md:pb-50"
      >
        <div class="content-items-sm">
          <div class="content-store-sm">
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
              <div class="footer-content-tienda">
                <div class="content-direction">
                  <p v-if="geolocalizacion.length" class="txt-direction txt">
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
            <div class="info-networks mb-20">
              <p class="btn">Síguenos</p>
              <KoSocialNet
                :footer-icon="settingByTemplate14[0].setting14Footer"
                :data-store="dataStore"
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
              <p v-if="geolocalizacion.length" class="txt-direction txt">
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
                :footer-icon="settingByTemplate14[0].setting14Footer"
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
        v-if="settingByTemplate14[0].setting14Footer.watermark"
        class="empty"
      ></div>
      <div
        v-if="settingByTemplate14[0].setting14Footer.watermark"
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
  </footer>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'KoFooter9',
  components: {
    KoSocialNet: () => import('@/components/template11/ko-socialnet.vue'),
    KoTermsConditions: () =>
      import('@/components/footers/ko-TermsAndConditions.vue'),
  },
  props: {
    dataStore: {
      type: Object,
      required: true,
    },
    settingByTemplate14: {
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
    settingByTemplate14() {
      if (
        this.settingByTemplate14 &&
        this.settingByTemplate14[0].setting14Footer
      ) {
        let color =
          this.settingByTemplate14[0].setting14Footer['--background_color_1']
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
      this.settingByTemplate14 &&
      this.settingByTemplate14[0].setting14Footer
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
}
.content-footer {
  background: var(--background_color_1);
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
    @apply w-full max-w-7xl;
  }
}
</style>
