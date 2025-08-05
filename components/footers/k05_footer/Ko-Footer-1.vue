<template>
  <footer
    ref="background"
    class="wrapper-footer z-[4] box-border flex w-full flex-col items-center justify-center pb-30 md:pb-20"
    :style="[
      settingByTemplate,
      {
        '--font-style':
          settingByTemplate && settingByTemplate.tipo_letra
            ? settingByTemplate.tipo_letra
            : 'Roboto',
      },
    ]"
  >
    <div class="contenedor">
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
            rel="noreferrer noopener"
          >
            <div :is="item.icon" class="icon" />
          </a>
        </div>
      </div>
      <div class="footer-item-secciones">
        <div v-for="(item, index) in secciones" :key="`${index}${item.name}`">
          <nuxt-link v-if="item.path" :to="item.path" class="text-secciones">
            {{ $t(`${item.name}`) }}
          </nuxt-link>
          <nuxt-link
            v-if="item.href && stateListBLogs > 0"
            :to="item.href"
            class="text-secciones"
          >
            {{ $t(`${item.name}`) }}
          </nuxt-link>
        </div>
      </div>
    </div>
    <div class="under-footer">
      <button
        v-if="storePolicies"
        class="contenedor-term-con"
        @click="OpenModalPolitics"
      >
        <p>{{ $t('footer_politicasyterminos') }}</p>
      </button>
      <div class="separator"></div>
      <p v-if="showLogo">
        {{ $t('footer_desarrollado') }}
      </p>
      <a
        v-if="showLogo"
        href="https://komercia.co/"
        target="_blank"
        rel="noreferrer noopener"
      >
        <img
          v-if="logo"
          v-lazy="
            `https://res.cloudinary.com/komercia-components/image/upload/c_scale,w_500,q_auto:best,f_auto/v1575331333/components/files/majg1iax3sjgrtyvrs9x.png`
          "
          width="120"
          loading="lazy"
          class="logo2"
          alt="Logo Img"
        />
        <img
          v-else
          v-lazy="
            `https://res.cloudinary.com/komercia-components/image/upload/c_scale,w_500,q_auto:best,f_auto/v1582151044/assets/cnrizgaks15xpkxk22ex.png`
          "
          width="120"
          loading="lazy"
          class="logo2"
          alt="Logo Img"
        />
      </a>
      <nuxt-link v-if="!showLogo" to="/" class="wrapper-logo-tablada">
        <img
          loading="lazy"
          :src="imageUrl"
          width="120"
          class="logo-tablada"
          alt="Logo Img"
          @error="setDefaultImage"
        />
      </nuxt-link>
    </div>
    <div v-if="showModal && storePolicies" class="modal">
      <KoTermsConditions :store-policies="storePolicies" />
    </div>
  </footer>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Ko5Footer',
  components: {
    KoTermsConditions: () =>
      import('@/components/footers/ko-TermsAndConditions.vue'),
  },
  props: {
    dataStore: {
      type: Object,
      required: true,
    },
    settingByTemplate: {
      type: Object,
      required: true,
    },
    logoStore: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showLogo: true,
      logo: true,
      secciones: [
        {
          name: 'footer_inicio',
          path: '/',
        },
        {
          name: 'footer_carrito',
          path: '/cart',
        },
        {
          name: 'footer_contacto',
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
    'dataStore.tienda'() {
      this.updateSocialLinks()
    },
    settingByTemplate(value) {
      if (value['--background_color_1']) {
        let color = value['--background_color_1']
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
      this.settingByTemplate &&
      this.settingByTemplate['--background_color_1']
    ) {
      this.setLogo()
    }
    const hideLogoIds = [5574, 5347, 6369]

    if (hideLogoIds.includes(this.dataStore.id)) {
      this.showLogo = false
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
    updateSocialLinks() {
      this.links.forEach((link, index) => {
        this.links[index].link = this.dataStore.redes[link.nombre.toLowerCase()]
      })
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
.contenedor {
  width: 100%;
  max-width: 1300px;
  padding: 40px 30px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.footer-item-secciones {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
}
.text-secciones {
  font-size: 16px;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: normal;
  color: var(--color_text);
  margin-right: 10px;
  /* text-align: center; */
}
.text-secciones:hover {
  color: var(--color_hover_text);
}
.content-items-iconos {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.icon {
  margin-right: 10px;
  font-size: 30px;
  color: var(--color_icon);
  fill: var(--color_icon);
}
.icon:hover {
  color: var(--btnhover);
  fill: var(--btnhover);
}
.text-top-bold {
  font-size: 18px;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: normal;
  color: var(--color_text);
  font-weight: bold;
}
.under-footer {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  max-width: 1300px;
}
.under-footer p {
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: normal;
  color: var(--color_text);
}
.contenedor-term-con {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
}
.contenedor-term-con p {
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: normal;
  color: var(--color_icon);
  cursor: pointer;
}
.separator {
  height: 1.1px;
  width: 100%;
  max-width: 400px;
  opacity: 0.5;
  border: solid 1px var(--color_icon);
  background: var(--color_icon);
  margin-bottom: 10px;
}
.logo2 {
  width: 100px;
  opacity: 0.7;
}
.modal {
  padding-top: 200px;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
  @apply fixed left-0 top-0 z-10 h-full w-full overflow-auto;
}
.wrapper-logo-tablada {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.logo-tablada {
  max-height: 74px;
  object-fit: contain;
  object-position: left;
}
@media (max-width: 768px) {
  .contenedor {
    padding: 60px 20px 10px;
  }
}
@media (max-width: 600px) {
  #modal-toggle:checked ~ .modal-backdrop {
    opacity: 0;
  }
  .contenedor {
    padding: 20px 10px 10px;
  }
  .modal-content {
    width: 100vw;
    height: 100%;
    top: 0;
    left: 0;
  }
  .separator {
    max-width: 300px;
  }
  .under-footer {
    margin-bottom: 28px;
  }
  .under-footer p {
    font-size: 16px;
    text-align: center;
  }
}
</style>
