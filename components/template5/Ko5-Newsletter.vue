<template>
  <div class="wrapper_newsletter">
    <div class="contenedor">
      <p class="subtext">{{ $t('newsletter_subtitle') }}</p>
      <p class="title">
        {{ $t('newsletter_title') }}
      </p>
      <div class="content-button">
        <ValidationProvider
          ref="validate"
          name="email"
          rules="required|email"
          class="content-input-error"
        >
          <template slot-scope="{ errors }">
            <input
              id="CorreoElectronicoNewslletter"
              v-model="email"
              name="email"
              class="input-text"
              type="email"
              :placeholder="$t('newsletter_email')"
            />
            <span
              v-show="errors[0] || register"
              class="text-error"
              :style="register ? 'color:green' : ''"
            >
              {{ errorsCheckbox || register }}
            </span>
          </template>
        </ValidationProvider>
        <button
          class="btn"
          :disabled="stateBtn ? false : true"
          @click="submitNewsletter"
        >
          {{ stateBtn ? $t('newsletter_btn') : $t('footer_pendiente') }}
        </button>
      </div>
      <div class="content-checkbox">
        <input id="checkboxNewsletter" v-model="checked" type="checkbox" />
        <label for="checkboxNewsletter" class="text-checkbox">
          {{ $t('newsletter_msg') }}
        </label>
      </div>
      <div class="content-checkbox">
        <p v-if="stateCheckBox" class="text-error" style="max-width: 340px">
          Marcar checkbox para poder suscribirse al boletín informativo
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
export default {
  name: 'Ko5Newsletter',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    ValidationObserver,
    ValidationProvider,
  },
  props: {
    dataStore: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      errorsCheckbox: 'El campo checkbox y email son obligatorios',
      email: null,
      register: '',
      checked: false,
      stateCheckBox: false,
      stateBtn: true,
    }
  },
  computed: {
    facebookPixel() {
      return this.$store.state.analytics_tagmanager
    },
  },
  destroyed() {
    this.email = ''
  },

  methods: {
    submitNewsletter() {
      if (this.checked) {
        this.$refs.validate
          .validate()
          .then(async (response) => {
            this.stateBtn = false
            if (response.valid) {
              const { success } = await this.$store.dispatch(
                'SEND_SUSCRIPTOR',
                {
                  email: this.email,
                  tienda: this.dataStore.id,
                }
              )
              if (success) {
                if (this.facebookPixel?.pixel_facebook != null) {
                  window.fbq('track', 'Lead', { value: this.email })
                }
                this.register = 'Tu correo ha sido registrado'
                this.$message({
                  message: 'Suscripción enviada!',
                  type: 'success',
                })
                this.email = ''
                this.stateBtn = true
              } else {
                this.$message({
                  message: 'Tu correo ya esta registrado!',
                  type: 'warning',
                })
                this.register = 'Tu correo ya esta registrado'
                this.stateBtn = true
              }
            }
          })
          .catch((e) => {
            console.log(e)
          })
      } else {
        this.stateCheckBox = true
      }
    },
  },
}
</script>

<style scoped>
.wrapper_newsletter {
  display: flex;
  width: 100%;
  background-color: var(--background_color_2);
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
}
.contenedor {
  width: 100%;
  max-width: 1300px;
  padding: 60px 20px 60px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.subtext {
  text-align: center;
  color: var(--color_subtext);
  font-size: 16px;
  font-weight: bold;
}
.title {
  font-size: 38px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.24;
  letter-spacing: -0.4px;
  color: var(--color_text);
  text-align: center;
  width: 600px;
  padding-bottom: 50px;
}
.content-button {
  display: flex;
  padding-bottom: 10px;
  flex-direction: row;
  justify-content: center;
  width: 100%;
}
.input-text {
  font-size: 14px;
  color: var(--color_subtext);
  border: solid 2px #afafaf;
  border-radius: var(--radius_btn);
  background-color: transparent;
  padding: 12px 14px;
  width: 360px;
  height: 100%;
}
.input-text::placeholder {
  color: var(--color_subtext);
  opacity: 0.7;
}
.input-text:focus,
.input-text:active {
  outline: 0;
  border: solid 2px var(--color_border);
}
.content-input-error {
  display: flex;
  flex-direction: column;
}
.text-error {
  font-size: 12px;
  color: #cb2027;
  width: 100%;
  margin-left: 10px;
}
.btn {
  color: var(--color_text_btn);
  /* border: solid 2px var(--color_border); */
  background-color: var(--color_background_btn);
  padding: 8px 14px;
  border-radius: var(--radius_btn);
  font-size: 14px;
  width: 220px;
  font-weight: bold;
  cursor: pointer;
  margin-left: 20px;
  cursor: pointer;
  max-height: 50px;
  transition: all 200ms ease-in;
}
.btn:hover {
  background-color: var(--btnhover);
  border: solid 2px var(--btnhover);
}
.content-checkbox {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.text-checkbox {
  margin-left: 5px;
  font-size: 13px;
  color: var(--color_subtext);
}
@media (max-width: 600px) {
  .title {
    width: 100%;
    max-width: 550px;
  }
}
@media (max-width: 500px) {
  .contenedor {
    padding: 40px 10px 30px 10px;
  }
  .title {
    font-size: 30px;
  }
  .subtext {
    font-size: 12px;
  }
  .input-text {
    width: 190px;
  }
  .btn {
    width: 100px;
    margin-left: 10px;
  }
}
</style>
