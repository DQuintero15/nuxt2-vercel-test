<template>
  <div
    class="w-full flex justify-center items-center"
    :style="[
      settingByTemplate14[0].settingsGeneral,
      {
        '--font-style-1':
          settingByTemplate14[0]?.settingsGeneral?.fount_1 ?? 'Poppins',
      },
    ]"
  >
    <div
      class="w-full h-auto relative flex flex-col items-center justify-center overflow-hidden"
      :style="`background-color: ${settingByTemplate14[0].contact['--background_color_1']}`"
    >
      <div class="w-full relative box-content hidden md:flex">
        <div v-if="settingByTemplate14[0].contact.visible_img">
          <picture>
            <source
              media="(max-width: 799px)"
              :srcset="
                idCloudinaryBanner(
                  settingByTemplate14[0].contact.img,
                  'bannerRes',
                  400
                )
              "
            />
            <source
              media="(min-width: 800px)"
              :srcset="
                idCloudinaryBanner(settingByTemplate14[0].contact.img, 'banner')
              "
            />
            <img
              v-lazy="
                idCloudinaryBanner(settingByTemplate14[0].contact.img, 'banner')
              "
              alt="banner template14"
              class="object-cover h-full"
            />
          </picture>
        </div>
        <div v-else class="w-full h-[240px]"></div>
        <div
          class="w-full h-full absolute flex flex-col justify-center items-center"
        >
          <p
            class="font-bold text-30 mb-10"
            :style="`color: ${settingByTemplate14[0].contact.color_title};`"
          >
            {{ $t('header_contacto') }}
          </p>
          <div
            class="flex flex-row items-center justify-center"
            :style="`color: ${settingByTemplate14[0].contact.color_breadCrumbs};`"
          >
            <nuxt-link to="/" class="text-14">
              {{ $t('header_inicio') }}
            </nuxt-link>
            <p class="px-10 text-14 font-bold">></p>
            <p class="text-14 font-bold">
              {{ $t('header_contacto') }}
            </p>
          </div>
        </div>
      </div>
      <div class="w-full grid grid-cols-1 md:grid-cols-2 justify-start">
        <div class="w-full">
          <!-- <p class="contact-text-sub">{{ $t('contact_vistaTienda') }}</p> -->
          <el-carousel
            v-if="geolocalizacion.length"
            :interval="5000"
            arrow="always"
            height="600px"
            :set-active-item="positionLocationStore"
            @change="changeLocation"
          >
            <el-carousel-item
              v-for="(item, indexGeo) in geolocalizacion"
              :key="indexGeo"
            >
              <iframe
                :src="`https://maps.google.com/maps?q=${item.latitud},${item.longitud}&hl=es;z=14&amp;output=embed`"
                width="100%"
                height="600"
                frameborder="0"
                style="border: 0"
                allowfullscreen
              ></iframe>
              <!-- <div class="under-text">
                <p class="contact-text-subtitle3">
                  {{ $t('contact_horarioAtencion') }}
                  <br />
                  {{ item.horario }}
                </p>
                <a class="contact-text-subtitle4">
                  {{ $t('contact_comollegar') }}</a
                >
              </div> -->
            </el-carousel-item>
          </el-carousel>
        </div>
        <div
          class="w-full max-w-[500px] flex flex-col justify-center items-start px-40 py-20 md:py-0"
          :style="`color: ${settingByTemplate14[0].contact.color_text};`"
        >
          <p class="text-25 font-bold mb-15">
            {{ $t('contact_title') }}
          </p>
          <p class="text-14 mb-20">
            {{ $t('contact_subtitle') }}
          </p>
          <div class="pl-10">
            <div
              v-if="geolocalizacion.length"
              class="mb-15 flex flex-row gap-2 items-center"
            >
              <div class="w-full max-w-[50px]">
                <svg
                  :fill="settingByTemplate14[0].contact.color_icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="40px"
                  height="40px"
                  viewBox="0 0 24 24"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path
                    d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                  />
                </svg>
              </div>
              <div class="w-full">
                <p class="text-14 font-bold">
                  {{ $t('footer_formDireccion') }}
                </p>
                <p class="text-14">
                  <span class="font-bold">
                    Sede {{ positionLocationStore + 1 }}:
                  </span>
                  {{ geolocalizacion[positionLocationStore].direccion }}
                </p>
              </div>
            </div>
            <div
              v-if="dataStore.tiendasInfo.telefono"
              class="mb-15 flex flex-row gap-2 items-center"
            >
              <div class="w-full max-w-[50px]">
                <svg
                  :fill="settingByTemplate14[0].contact.color_icon"
                  width="45px"
                  height="45px"
                  viewBox="0 0 32 32"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  class="ml-5"
                >
                  <path
                    d="M0 10.375c0 0.938 0.344 1.969 0.781 3.063s1 2.125 1.438 2.906c1.188 2.063 2.719 4.094 4.469 5.781s3.813 3.094 6.125 3.938c1.344 0.531 2.688 1.125 4.188 1.125 0.75 0 1.813-0.281 2.781-0.688 0.938-0.406 1.781-1.031 2.094-1.781 0.125-0.281 0.281-0.656 0.375-1.094 0.094-0.406 0.156-0.813 0.156-1.094 0-0.156 0-0.313-0.031-0.344-0.094-0.188-0.313-0.344-0.563-0.5-0.563-0.281-0.656-0.375-1.5-0.875-0.875-0.5-1.781-1.063-2.563-1.469-0.375-0.219-0.625-0.313-0.719-0.313-0.5 0-1.125 0.688-1.656 1.438-0.563 0.75-1.188 1.438-1.625 1.438-0.219 0-0.438-0.094-0.688-0.25s-0.5-0.281-0.656-0.375c-2.75-1.563-4.594-3.406-6.156-6.125-0.188-0.313-0.625-0.969-0.625-1.313 0-0.406 0.563-0.875 1.125-1.375 0.531-0.469 1.094-1.031 1.094-1.719 0-0.094-0.063-0.375-0.188-0.781-0.281-0.813-0.656-1.75-0.969-2.656-0.156-0.438-0.281-0.75-0.313-0.906-0.063-0.094-0.094-0.219-0.125-0.375s-0.094-0.281-0.125-0.406c-0.094-0.281-0.25-0.5-0.406-0.625-0.156-0.063-0.531-0.156-0.906-0.188-0.375 0-0.813-0.031-1-0.031-0.094 0-0.219 0-0.344 0.031h-0.406c-1 0.438-1.719 1.313-2.25 2.344-0.5 1.031-0.813 2.188-0.813 3.219z"
                  ></path>
                </svg>
              </div>
              <div class="w-full">
                <p class="text-14 font-bold">{{ $t('mcompra_telefono') }}</p>
                <p class="text-14">
                  {{ dataStore.tiendasInfo.telefono }}
                </p>
              </div>
            </div>
            <div
              v-if="dataStore.redes.whatsapp"
              class="mb-15 flex flex-row gap-2 items-center"
            >
              <div class="w-full max-w-[50px]">
                <svg
                  width="30px"
                  height="30px"
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
                      :fill="settingByTemplate14[0].contact.color_icon"
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
              <div class="w-full">
                <p class="text-14 font-bold">WhatsApp</p>
                <p class="text-14">
                  {{ dataStore.redes.whatsapp }}
                </p>
              </div>
            </div>
            <div
              v-if="dataStore.tiendasInfo.emailTienda"
              class="mb-15 flex flex-row gap-2 items-center"
            >
              <div class="w-full max-w-[50px]">
                <svg
                  :fill="settingByTemplate14[0].contact.color_icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="40px"
                  height="40px"
                  viewBox="0 0 24 24"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path
                    d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
                  />
                </svg>
              </div>
              <div class="w-full">
                <p class="text-14 font-bold">Email</p>
                <p class="text-14">
                  {{ dataStore.tiendasInfo.emailTienda }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="w-full flex items-center justify-center"
        :style="`background-color: ${settingByTemplate14[0].contact['--background_color_2']}`"
      >
        <div
          class="w-full max-w-7xl flex flex-col my-40 md:my-80 px-40 py-35 justify-center"
          :style="`background-color: ${settingByTemplate14[0].contact.color_bg_form};`"
        >
          <p
            class="text-25 font-bold mb-25 text-center"
            :style="`color: ${settingByTemplate14[0].contact.color_title_form};`"
          >
            {{ $t('home_contactenos') }}
          </p>
          <ValidationObserver
            ref="observer"
            tag="form"
            class="w-full flex flex-col"
          >
            <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
              <div class="w-full flex flex-col">
                <p
                  class="text-14"
                  :style="`color: ${settingByTemplate14[0].contact.color_title_form};`"
                >
                  {{ $t('contact_nombre') }}
                </p>
                <validation-provider name="nombre" rules="required">
                  <template slot-scope="{ errors }">
                    <input
                      id="ContactName"
                      v-model="nombre"
                      name="nombre"
                      type="text"
                      class="input-text"
                      :style="`color: ${settingByTemplate14[0].contact.color_title_form}; border-color:${settingByTemplate14[0].contact.color_border_input};`"
                      :placeholder="$t('contact_nombrePlacer')"
                    />
                    <span class="text-12 text-red-500 ml-5" v-show="errors[0]">
                      {{ errors[0] }}
                    </span>
                  </template>
                </validation-provider>
              </div>
              <div class="w-full flex flex-col">
                <P
                  class="text-14"
                  :style="`color: ${settingByTemplate14[0].contact.color_title_form};`"
                >
                  {{ $t('contact_email') }}
                </P>
                <validation-provider name="email" rules="required|email">
                  <template slot-scope="{ errors }">
                    <input
                      id="ContactEmail"
                      v-model="email"
                      name="email"
                      type="email"
                      class="input-text"
                      :style="`color: ${settingByTemplate14[0].contact.color_title_form}; border-color:${settingByTemplate14[0].contact.color_border_input};`"
                      :placeholder="$t('contact_emailPlacer')"
                    />
                    <span class="text-12 text-red-500 ml-5" v-show="errors[0]">
                      {{ errors[0] }}
                    </span>
                  </template>
                </validation-provider>
              </div>
            </div>
            <div class="w-full flex flex-col mb-10">
              <P
                class="text-14"
                :style="`color: ${settingByTemplate14[0].contact.color_title_form};`"
              >
                {{ $t('contact_mensale') }}
              </P>
              <validation-provider name="comentario" rules="required">
                <template slot-scope="{ errors }">
                  <textarea
                    v-model="comment"
                    name="comentario"
                    class="input-text-rectangule"
                    :style="`color: ${settingByTemplate14[0].contact.color_title_form}; border-color:${settingByTemplate14[0].contact.color_border_input};`"
                    :placeholder="$t('contact_mensalePlacer')"
                  ></textarea>
                  <span class="text-12 text-red-500 ml-5" v-show="errors[0]">
                    {{ errors[0] }}
                  </span>
                </template>
              </validation-provider>
            </div>
            <div class="w-full flex flex-col mb-10">
              <P
                class="text-14"
                :style="`color: ${settingByTemplate14[0].contact.color_title_form};`"
              >
                {{ $t('contact_telefono') }}
              </P>
              <div class="input-content">
                <validation-provider name="celular" rules="required|numeric">
                  <template slot-scope="{ errors }">
                    <input
                      id="ContactPhone"
                      v-model="numberPhone"
                      name="celular"
                      type="number"
                      class="input-text"
                      :style="`color: ${settingByTemplate14[0].contact.color_title_form}; border-color:${settingByTemplate14[0].contact.color_border_input};`"
                      :placeholder="$t('contact_telefonoPlacer')"
                    />
                    <span class="text-12 text-red-500 ml-5" v-show="errors[0]">
                      {{ errors[0] }}
                    </span>
                  </template>
                </validation-provider>
              </div>
              <div class="w-full flex items-center justify-center mt-20">
                <button
                  class="px-20 py-10 btn"
                  :style="`color: ${settingByTemplate14[0].contact.color_text_btn_form}; background-color: ${settingByTemplate14[0].contact.color_btn_form}; border-radius: ${settingByTemplate14[0].settingsGeneral.radius}`"
                  :class="!stateBtn ? ' cursor-not-allowed' : 'cursor-pointer'"
                  :disabled="stateBtn ? false : true"
                  @click="submitContact"
                >
                  {{ stateBtn ? $t('contact_enviar') : $t('footer_pendiente') }}
                </button>
              </div>
            </div>
          </ValidationObserver>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import idCloudinaryBanner from '@/mixins/idCloudinary'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
export default {
  name: 'Ko15Contact',
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  mixins: [idCloudinaryBanner],
  props: {
    dataStore: {
      type: Object,
      required: true,
    },
    settingByTemplate14: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      positionLocationStore: 0,
      nombre: '',
      email: '',
      numberPhone: '',
      comment: '',
      messageFull: '',
      message: {
        text: '',
        open: false,
      },
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
      dataContact: [
        {
          dato: this.dataStore.tiendasInfo.telefono,
          icon: 'phone-icon',
        },
        {
          dato: this.dataStore.redes.whatsapp,
          icon: 'whatsapp-icon',
        },
        {
          dato: this.dataStore.tiendasInfo.emailTienda,
          icon: 'email-icon',
        },
      ],
      stateBtn: true,
    }
  },
  computed: {
    ...mapState(['geolocalizacion']),
    ...mapState({
      facebookPixel: (state) => state.analytics_tagmanager,
    }),
  },
  watch: {
    'dataStore.tienda'() {
      this.links[0].link = this.dataStore.redes.facebook
      this.links[1].link = this.dataStore.redes.twitter
      this.links[2].link = this.dataStore.redes.instagram
      this.links[3].link = this.dataStore.redes.youtube
      this.links[4].link = this.dataStore.redes.tiktok
      this.dataContact[0].dato = this.dataStore.tiendasInfo.telefono
      this.dataContact[1].dato = this.dataStore.redes.whatsapp
      this.dataContact[2].dato = this.dataStore.tiendasInfo.emailTienda
    },
  },
  destroyed() {
    this.nombre = ''
    this.email = ''
    this.numberPhone = ''
    this.comment = ''
  },
  methods: {
    changeLocation(value) {
      this.positionLocationStore = value
    },
    submitContact() {
      this.$refs.observer
        .validate()
        .then(async (response) => {
          this.stateBtn = false
          if (response) {
            const { success } = await this.$store.dispatch(
              'SEND_MAIL_CONTACT',
              {
                storeId: this.dataStore.id,
                toEmail: this.dataStore.tiendasInfo.emailTienda,
                messsage: this.comment,
                clientName: this.nombre,
                storeName: this.dataStore.nombre,
                clientEmail: this.email,
                clientPhoneNumber: this.numberPhone,
              }
            )
            if (success) {
              if (this.facebookPixel?.pixel_facebook != null) {
                window.fbq('track', 'Contact', {
                  name: this.nombre,
                  description: this.email,
                })
              }
              this.$message({
                message: 'Correo enviado correctamente!',
                type: 'success',
              })
              this.deleteInputs()
              this.stateBtn = true
            } else {
              this.$message({
                message: 'Error al enviar el correo, problema en el API!',
                type: 'error',
              })
              this.stateBtn = true
            }
          }
        })
        .catch((e) => {
          this.stateBtn = true
          this.$message({
            message: 'Error al enviar el correo, problema en el API!',
            type: 'error',
          })
        })
    },
    deleteInputs() {
      this.nombre = ''
      this.email = ''
      this.numberPhone = ''
      this.comment = ''
    },
  },
}
</script>

<style scoped>
* {
  font-family: var(--font-style-1) !important;
}
.btn:hover {
  color: var(--hover_text_btn) !important;
  background-color: var(--hover_Bg_btn) !important;
}
.input-text {
  font-family: var(--font-style-1) !important ;
  font-size: 14px;
  border: solid 1px;
  border-radius: var(--radius_btn);
  background-color: transparent;
  padding: 8px 14px;
  width: 100%;
}
.input-text::placeholder {
  font-family: var(--font-style-1) !important ;
  color: var(--color_text);
  opacity: 0.7;
}
.input-text:-internal-autofill-selected {
  -webkit-appearance: menulist-button;
  background-color: transparent !important;
  background-image: none !important;
  color: -internal-light-dark-color(black, white) !important;
}
.input-text:focus,
.input-text:active {
  outline: 0;
}
.input-text-rectangule {
  font-family: var(--font-style-1) !important ;
  font-size: 14px;
  font-weight: 400;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: normal;
  border: solid 1px;
  border-radius: var(--radius_btn);
  background-color: transparent;
  padding: 4px 14px;
  width: 100%;
  resize: none;
  overflow-y: auto;
  max-height: 80px;
  min-height: 80px;
}
.input-text-rectangule::placeholder {
  font-family: var(--font-style-1) !important ;
  opacity: 0.7;
}
.input-text-rectangule:focus,
.input-text-rectangule:active {
  outline: 0;
  border: solid 2px rgba(127, 127, 139, 0.342);
}
.input-text-rectangule::-webkit-scrollbar {
  background: transparent;
  width: 5px;
}
.input-text-rectangule::-webkit-scrollbar-track {
  box-shadow: inset 0 0 10px transparent;
  border-radius: 5px;
}
.input-text-rectangule::-webkit-scrollbar-thumb {
  background: rgb(59, 59, 59);
}
.input-text-rectangule::-webkit-scrollbar-thumb:hover {
  background: rgb(138, 138, 138);
}
</style>
