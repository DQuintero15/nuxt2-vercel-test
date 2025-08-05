<template>
  <div class="wrapper-contact" :style="settingK05Contact">
    <div
      class="contact"
      :style="{
        '--font-style': settingK05Contact?.tipo_letra ?? 'Roboto',
      }"
    >
      <div class="contact-content">
        <div>
          <p class="contact-text-title">{{ $t('contact_title') }}</p>
          <p class="contact-text-subtitle">
            {{ $t('contact_subtitle') }}
          </p>
        </div>
        <div class="wrapper-icon">
          <div class="contact-content-icon">
            <div
              v-for="(item2, index) in dataContact"
              :key="`${index}${item2.dato}`"
              class="text-icon"
            >
              <div v-if="item2.dato" :is="item2.icon" class="contact-icon" />
              <a v-if="item2.dato">{{ item2.dato }}</a>
            </div>
          </div>
          <div class="contact-content-icon">
            <div
              v-for="(item, index) in links"
              :key="`${index}${item.nombre}`"
              class="text-icon"
            >
              <div v-if="item.link" :is="item.icon" class="icon" />
              <a
                v-if="item.link"
                :href="item.link"
                target="_blank"
                rel="noreferrer noopener"
              >
                {{ item.nombre }}
              </a>
            </div>
          </div>
        </div>
        <div class="separator"></div>
        <div v-if="geolocalizacion.length">
          <p class="contact-text-sub">{{ $t('contact_vistaTienda') }}</p>
          <el-carousel
            :interval="5000"
            arrow="always"
            height="350px"
            class="wrapperCarousel"
          >
            <el-carousel-item
              v-for="(item, indexGeo) in geolocalizacion"
              :key="indexGeo"
            >
              <p class="contact-text-subtitle2">
                Sede {{ indexGeo + 1 }}: {{ item.nombreSede }}
              </p>
              <iframe
                :src="`https://maps.google.com/maps?q=${item.latitud},${item.longitud}&hl=es;z=14&amp;output=embed`"
                width="100%"
                height="250"
                frameborder="0"
                style="border: 0"
                allowfullscreen
              ></iframe>
              <div class="under-text">
                <p class="contact-text-subtitle3">
                  {{ $t('contact_horarioAtencion') }}
                  <br />
                  {{ item.horario }}
                </p>
                <a class="contact-text-subtitle4">
                  {{ $t('contact_comollegar') }}
                </a>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <div class="contact-content">
        <div class="contact-item-text">
          <p class="contact-text-title">{{ $t('contact_title2') }}</p>
          <p class="contact-text-subtitles">
            {{ $t('contact_subtitle2') }}
          </p>
        </div>
        <ValidationObserver
          ref="observer"
          tag="form"
          class="contact-content-rigth"
        >
          <p>{{ $t('contact_nombre') }}</p>
          <validation-provider name="nombre" rules="required">
            <template slot-scope="{ errors }">
              <input
                id="ContactName"
                v-model="nombre"
                name="nombre"
                type="text"
                class="input-text"
                :placeholder="$t('contact_nombrePlacer')"
              />
              <span v-show="errors[0]" class="text-error">{{ errors[0] }}</span>
            </template>
          </validation-provider>
          <P> {{ $t('contact_email') }}</P>
          <validation-provider name="email" rules="required|email">
            <template slot-scope="{ errors }">
              <input
                id="ContactEmail"
                v-model="email"
                name="email"
                type="email"
                class="input-text"
                :placeholder="$t('contact_emailPlacer')"
              />
              <span class="text-error" v-show="errors[0]">{{ errors[0] }}</span>
            </template>
          </validation-provider>
          <P> {{ $t('contact_mensale') }}</P>
          <validation-provider name="comentario" rules="required">
            <template slot-scope="{ errors }">
              <textarea
                v-model="comment"
                class="input-text-rectangule"
                name="comentario"
                :placeholder="$t('contact_mensalePlacer')"
              ></textarea>
              <span class="text-error" v-show="errors[0]">{{ errors[0] }}</span>
            </template>
          </validation-provider>
          <P> {{ $t('contact_telefono') }}</P>
          <div class="input-content">
            <validation-provider name="celular" rules="required|numeric">
              <template slot-scope="{ errors }">
                <input
                  id="ContactPhone"
                  v-model="numberPhone"
                  class="input-text"
                  name="celular"
                  type="number"
                  :placeholder="$t('contact_telefonoPlacer')"
                />
                <span v-show="errors[0]" class="text-error">
                  {{ errors[0] }}
                </span>
              </template>
            </validation-provider>
            <button
              class="btn"
              :class="!stateBtn ? ' cursor-not-allowed' : 'cursor-pointer'"
              :disabled="stateBtn ? false : true"
              @click="submitContact"
            >
              {{ stateBtn ? $t('contact_enviar') : $t('footer_pendiente') }}
            </button>
          </div>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
export default {
  name: 'Ko5Contact',
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  props: {
    dataStore: {
      type: Object,
      required: true,
    },
    settingK05Contact: {
      type: Object,
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
          icon: 'tiktok2-icon',
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
                message: 'Error al enviar el correo!',
                type: 'error',
              })
              this.stateBtn = true
            }
          }
        })
        .catch((e) => {
          this.stateBtn = true
          this.$message({
            message: 'Error al enviar el correo!',
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
  font-family: var(--font-style) !important;
}
.wrapperCarousel >>> .el-carousel__arrow {
  background-color: var(--color_background_btn);
  color: var(--color_text_btn);
  z-index: 3 !important;
}
.wrapper-contact {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  /* background: var(--background_color_2); */
  background: #efefef;
  box-sizing: border-box;
}
.contact {
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 1300px;
  align-items: center;
  justify-content: space-between;
  padding: 30px 30px;
}
.contact > div {
  flex: 1;
  max-width: 500px;
  width: 100%;
}
.contact > div:nth-child(2) {
  margin-left: 20px;
}
.contact-content {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-self: end;
}
.contact-item-text {
  width: 100%;
}
.contact-text-title {
  font-size: 35px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: -0.4px;
  /* color: var(--color_text); */
  color: #000000;
}
.contact-text-subtitle {
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: normal;
  /* color: var(--color_subtext); */
  color: rgba(21, 20, 57, 0.541);
  margin-top: 10px;
}
.contact-text-subtitles {
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: normal;
  /* color: var(--color_subtext); */
  color: rgba(21, 20, 57, 0.541);
  margin-top: 10px;
}
.contact-text-subtitle2 {
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: normal;
  color: rgba(21, 20, 57, 0.541);
  margin-top: 10px;
  margin-bottom: 10px;
}
.contact-text-subtitle3 {
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  /* color: var(--color_subtext); */
  color: rgba(21, 20, 57, 0.541);
  margin-top: 10px;
}
.contact-text-subtitle4 {
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  /* color: var(--color_text); */
  color: #000000;
  margin-top: 10px;
  text-align: right;
}
.-text {
  display: flex;
  flex-direction: column;
}
.contact-icon {
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.11;
  letter-spacing: normal;
  /* color: var(--color_icon); */
  color: #25dac5;
}
.text-icon {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  /* color: var(--color_icon); */
  color: #25dac5;
}
.text-icon a:hover {
  cursor: pointer;
  color: var(--btnhover);
}
.text-icon a {
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: normal;
  /* color: var(--color_text); */
  color: #000000;
  margin-top: 5px;
  margin-left: 7px;
}
.icon {
  font-size: 17px;
  height: 15px;
  width: 15px;
  fill: #25dac5;
}
.contact-text-sub {
  font-size: 22px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: normal;
  /* color: var(--color_text); */
  color: #000000;
  margin-top: 10px;
}
.contact-text-sub2 {
  font-size: 22px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: normal;
  /* color: var(--color_text); */
  color: #000000;
  margin-top: 10px;
}
.separator {
  margin-top: 15px;
  width: 100%;
  /* border: solid 1.5px var(--color_border); */
  border: solid 1.5px rgba(255, 255, 255, 1);
}
.text-icon {
  display: flex;
  flex-direction: row;
}
.contact-content-icon {
  margin-top: 10px;
}
.contact-content-rigth {
  border-radius: 10px;
  /* background-color: var(--background_color_1); */
  background-color: rgb(223, 223, 223);
  padding: 30px 30px 50px 30px;
  margin-top: 20px;
}
.contact-content-rigth p {
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.86;
  letter-spacing: 2px;
  /* color: var(--color_text); */
  color: #000000;
  margin: 10px;
  margin-left: 0px;
}
.under-text {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.under-text p:nth-child(1) {
  flex: 2;
}
.under-text p:nth-child(2) {
  flex: 1;
}
.input-content {
  display: flex;
  flex-direction: row;
}
.input-text {
  font-size: 14px;
  /* color: var(--color_border); */
  color: rgba(21, 20, 57, 0.541);
  border: solid 2px #afafaf;
  border-radius: var(--radius_btn);
  background-color: transparent;
  padding: 8px 14px;
  width: 100%;
}
.input-text::placeholder {
  /* color: var(--color_border); */
  color: rgba(21, 20, 57, 0.541);
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
  /* border: solid 2px var(--color_border); */
  border: solid 2px rgba(127, 127, 139, 0.342);
}
.input-text-rectangule {
  font-size: 14px;
  font-weight: 400;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: normal;
  /* color: var(--color_border); */
  color: rgba(21, 20, 57, 0.541);
  border: solid 2px #afafaf;
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
  /* color: var(--color_border); */
  color: rgba(21, 20, 57, 0.541);
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
.text-error {
  font-size: 12px;
  color: #cb2027;
  width: 100%;
  margin-left: 10px;
}
.btn {
  color: var(--color_text_btn);
  border-radius: var(--radius_btn);
  border: solid 2px var(--color_background_btn);
  background-color: var(--color_background_btn);
  padding: 8px 14px;
  font-size: 16px;
  width: 50%;
  height: 41px;
  font-weight: bold;
  cursor: pointer;
  margin-left: 20px;
  transition: all 200ms ease-in;
}
.btn:hover {
  color: white;
  border: solid 2px var(--btnhover);
  background-color: var(--btnhover);
}
.btn2 {
  color: black;
  border-radius: var(--radius_btn);
  border: solid 2px grey;
  background-color: grey;
  padding: 8px 14px;
  font-size: 16px;
  width: 50%;
  height: 41px;
  font-weight: bold;
  margin-left: 20px;
}

@media (max-width: 700px) {
  .contact {
    flex-direction: column;
  }
  .contact > div:nth-child(2) {
    margin-left: 0px;
  }
  .contact-content {
    align-self: normal;
  }
  .contact-text-subtitle {
    display: none;
  }
  .separator {
    display: none;
  }
  .wrapper-icon {
    display: flex;
    flex-direction: column-reverse;
  }
  .contact-text-sub {
    margin-top: 20px;
  }
  .input-content {
    flex-direction: column;
  }
  .btn {
    width: 100%;
    margin-left: 0px;
    margin-top: 10px;
  }
  .contact-content-rigth {
    padding: 20px 15px 20px 15px;
  }
}
</style>
