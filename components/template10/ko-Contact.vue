<template>
  <div
    calss="content-contact"
    :style="[
      settingByTemplate10[0].contact,
      settingByTemplate10[0].setting10General,
      {
        '--font-style-1':
          settingByTemplate10[0]?.setting10General?.fount_1 ?? 'Roboto',
      },
    ]"
  >
    <div class="content-form-contact">
      <div class="banner-mapa">
        <el-carousel
          v-if="geolocalizacion?.length"
          :interval="5000"
          arrow="always"
          height="250px"
          style="width: 100%"
          class="wrapperCarousel"
          :setActiveItem="positionLocation"
          @change="changeLocation"
        >
          <el-carousel-item
            v-for="(item, inggeo) in geolocalizacion"
            :key="inggeo"
          >
            <iframe
              :src="`https://maps.google.com/maps?q=${item.latitud},${item.longitud}&hl=es;z=14&amp;output=embed`"
              width="100%"
              height="250"
              frameborder="0"
              style="border: 0"
              allowfullscreen
            ></iframe>
          </el-carousel-item>
        </el-carousel>
      </div>

      <div class="container-contact">
        <div class="content-grid">
          <div class="left">
            <div class="content-info">
              <p class="txt-info">Información</p>
            </div>
            <div v-if="geolocalizacion.length" class="content-locatioin">
              <svg
                class="icon-left"
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
              <p class="txt-left">
                Sede {{ positionLocation + 1 }}:
                {{ geolocalizacion[positionLocation].direccion }}
              </p>
            </div>
            <div class="empty"></div>
            <div class="content-email">
              <svg
                class="icon-left"
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
              <div class="email">
                <p class="txt-left">Envíenos un correo electrónico</p>
                <p class="txt-left">
                  {{ dataStore.tiendasInfo.emailTienda }}
                </p>
              </div>
            </div>
          </div>
          <div class="right">
            <div class="contact-content">
              <!-- <div class="contact-item-text">
              <p class="contact-text-title">{{ $t('contact_title2') }}</p>
              <p class="contact-text-subtitles">
                {{ $t('contact_subtitle2') }}
              </p>
            </div> -->
              <ValidationObserver
                ref="observer"
                tag="form"
                class="contact-content-rigth"
              >
                <div class="content-form">
                  <div class="content-contacus">
                    <p class="txt-contactus">{{ $t('home_contactenos') }}</p>
                  </div>
                  <div class="form-cont">
                    <p class="txt-input">{{ $t('home_nombre') }}</p>
                    <validation-provider
                      name="nombre"
                      rules="required"
                      class="validator"
                    >
                      <template slot-scope="{ errors }">
                        <input
                          id="ContactName"
                          v-model="nombre"
                          name="nombre"
                          type="text"
                          class="input-text"
                          :placeholder="$t('contact_nombrePlacer')"
                        />
                        <span class="text-error" v-show="errors[0]">{{
                          errors[0]
                        }}</span>
                      </template>
                    </validation-provider>
                  </div>
                  <div class="form-cont">
                    <p class="txt-input">{{ $t('home_email') }}</p>
                    <validation-provider
                      name="email"
                      rules="required|email"
                      class="validator"
                    >
                      <template slot-scope="{ errors }">
                        <input
                          id="ContactEmail"
                          v-model="email"
                          name="email"
                          type="email"
                          :placeholder="$t('contact_emailPlacer')"
                          class="input-text"
                        />
                        <span class="text-error" v-show="errors[0]">
                          {{ errors[0] }}
                        </span>
                      </template>
                    </validation-provider>
                  </div>
                  <div class="form-cont">
                    <p class="txt-input">{{ $t('home_mensaje') }}</p>
                    <validation-provider
                      name="comentario"
                      rules="required"
                      class="validator"
                    >
                      <template slot-scope="{ errors }">
                        <textarea
                          v-model="comment"
                          class="input-text-rectangule"
                          name="comentario"
                          :placeholder="$t('contact_mensalePlacer')"
                        ></textarea>
                        <span class="text-error" v-show="errors[0]">
                          {{ errors[0] }}
                        </span>
                      </template>
                    </validation-provider>
                  </div>
                  <div class="form-cont">
                    <p class="txt-input">{{ $t('home_telefono') }}</p>
                    <div class="input-content">
                      <validation-provider
                        name="celular"
                        rules="required|numeric"
                        class="validator"
                      >
                        <template slot-scope="{ errors }">
                          <input
                            id="ContactPhone"
                            v-model="numberPhone"
                            class="input-text"
                            name="celular"
                            type="number"
                            :placeholder="$t('contact_telefonoPlacer')"
                          />
                          <span class="text-error" v-show="errors[0]">
                            {{ errors[0] }}
                          </span>
                        </template>
                      </validation-provider>
                    </div>
                  </div>
                  <div class="content-bn">
                    <button
                      class="btn"
                      :class="
                        !stateBtn ? ' cursor-not-allowed' : 'cursor-pointer'
                      "
                      :disabled="stateBtn ? false : true"
                      @click="submitContact"
                    >
                      {{
                        stateBtn ? $t('contact_enviar') : $t('footer_pendiente')
                      }}
                    </button>
                  </div>
                </div>
              </ValidationObserver>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
export default {
  name: 'Ko10Contact',
  components: {
    ValidationObserver,
    ValidationProvider,
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
  },
  data() {
    return {
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
      positionLocation: 0,
      stateBtn: false,
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
      this.positionLocation = value
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
            message: 'Error al enviar los datos!',
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
.wrapperCarousel >>> .el-carousel__arrow {
  background-color: var(--color_background_btn);
  color: var(--color_text_btn);
}
.content-contact {
  @apply w-full flex flex-col justify-center items-center;
}
.content-form-contact {
  @apply w-full flex flex-col justify-center items-center;
  background: var(--background_color_1);
}
.container-contact {
  @apply w-full justify-center items-center;
}
.empty {
  background-color: var(--border);
  @apply w-full h-1 my-20;
}
@screen sm {
  .banner-mapa {
    /* margin-top: 30px; */
    @apply flex w-full;
  }
  .container-contact {
    margin-top: 140px;
    @apply flex flex-col;
  }
  .content-grid {
    @apply w-9/0 flex flex-col justify-start items-start mt-20;
  }
  .left {
    @apply w-full flex flex-col justify-start items-start;
  }
  .content-info {
    @apply w-full flex justify-start items-center mb-30;
  }
  .txt-info {
    color: var(--color_text);
    font-size: 14px;
    font-family: var(--font-style-1) !important;
    @apply uppercase font-semibold tracking-1;
  }
  .content-locatioin,
  .content-email {
    @apply w-full flex flex-row justify-start items-center;
  }
  .icon-left {
    fill: var(--color_subtext);
  }
  .txt-left {
    color: var(--color_subtext);
    font-size: 14px;
    @apply w-full flex justify-start items-center pl-20;
  }
  .email {
    @apply w-full flex flex-col justify-start items-center;
  }
  .right {
    @apply w-full flex flex-col justify-center items-center;
  }
  .contact-content {
    @apply w-full flex flex-col justify-start items-center my-40;
  }
  .contact-content-rigth {
    background-color: var(--background_color_2);
    border: 1px solid var(--border);
    @apply w-full flex flex-col justify-start items-start shadow-xl;
  }
  .content-form {
    @apply w-full flex flex-col justify-center items-start p-40;
  }
  .content-contacus {
    @apply w-full flex justify-start items-center mb-40;
  }
  .txt-contactus {
    color: var(--color_title_form);
    font-size: 18px;
    @apply w-full justify-center items-center uppercase font-semibold;
  }
  .validator {
    @apply w-full;
  }
  .text-error {
    color: red;
    font-size: 13px;
    @apply w-full;
  }
  input,
  .input-text {
    background-color: #fff;
    border: 1px solid #e5e5e5;
    font-size: 13px;
    color: #acaaa6;
    @apply w-full h-40 pl-10;
  }
  textarea,
  .input-text-rectangule {
    background-color: #fff;
    border: 1px solid #e5e5e5;
    font-size: 13px;
    color: #acaaa6;
    @apply w-full h-100 pl-10 pt-10;
  }
  .txt-input {
    color: var(--color_text_form);
    font-size: 13px;
    @apply w-full justify-center items-center;
  }
  .content-bn {
    @apply w-full flex justify-start items-center;
  }
  .btn {
    background-color: var(--color_background_btn);
    font-size: 14px;
    color: var(--color_text_btn);
    border-radius: var(--radius_btn);
    @apply w-auto h-35 mt-20 px-20;
  }
  .btn:hover {
    color: var(--hover_text_btn);
    background-color: var(--hover_Bg_btn);
  }
  .form-cont {
    @apply w-full flex flex-col justify-start items-center;
  }
  .input-content {
    @apply w-full flex flex-col justify-center items-start;
  }
}
@screen md {
  .banner-mapa {
    /* margin-top: 140px; */
    @apply w-full flex;
  }
  .container-contact {
    margin-top: 20px;
    @apply flex flex-row justify-center items-center;
  }
  .content-grid {
    @apply w-9/5 flex flex-row;
  }
  .left {
    @apply w-5/0 mr-20;
  }
  .contact-content {
    @apply mb-40 mt-0;
  }
  .form-cont {
    @apply flex-row mb-20;
  }
  .txt-input {
    @apply w-100;
  }
  .content-bn {
    @apply justify-end items-center;
  }
}
@screen mlg {
  .banner-mapa {
    margin-top: 0px;
  }
}
@screen lg {
  .left {
    width: 320px;
  }
}
@media (min-width: 1400px) {
  .container-contact {
    max-width: 1400px;
  }
}
</style>
