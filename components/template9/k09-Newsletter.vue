<template>
  <div
    class="wrapper_newsletter"
    :style="[
      newsletter,
      settingGeneral,
      {
        '--font-style-1': settingGeneral?.fount_1 ?? 'Poppins',
      },
      {
        '--font-style-2': settingGeneral?.fount_2 ?? 'Roboto',
      },
    ]"
  >
    <div class="wrapper-items-content">
      <div class="product-text">
        <div class="product-tittle">
          <span class="tittle">Obtenga las últimas</span>
          <span class="tittle">ofertas y más.</span>
        </div>
      </div>
    </div>
    <div class="wrapper-items">
      <div class="conten-input-check">
        <div class="content-input">
          <ValidationProvider
            ref="validate"
            name="email"
            rules="required|email"
            class="content-input-error"
          >
            <template slot-scope="{ errors }">
              <div class="input-icon">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    version="1.1"
                    width="100%"
                    height="100%"
                    viewBox="0 0 24 24"
                    color="#2c2930"
                    class="icon-msg"
                  >
                    <path
                      d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6M20 6L12 11L4 6H20M20 18H4V8L12 13L20 8V18Z"
                    />
                  </svg>
                </div>
                <input
                  id="CorreoElectronicoNewslletter"
                  v-model="email"
                  name="email"
                  class="input-text"
                  type="email"
                  :placeholder="$t('newsletter_email')"
                />
              </div>
              <span
                v-show="errors[0] || register"
                class="text-error"
                :style="register ? 'color:green' : ''"
              >
                {{ errorsCheckbox || register }}
              </span>
            </template>
          </ValidationProvider>
        </div>
        <div class="content-checkbox">
          <input id="checkbox" v-model="checked" type="checkbox" />
          <p class="text-checkbox">
            {{ $t('newsletter_msg') }}
          </p>
        </div>
        <p v-if="stateCheckBox" class="text-error">
          Marcar checkbox para poder suscribirse al boletín informativo
        </p>
      </div>

      <div class="content-button">
        <button
          class="content-bttns-shop"
          :disabled="stateBtn ? false : true"
          @click="submitNewsletter"
        >
          {{ stateBtn ? $t('newsletter_btn') : $t('footer_pendiente') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
export default {
  name: 'Ko9Newsletter1',
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
    newsletter: {
      type: Object,
      required: true,
    },
    settingGeneral: {
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
                this.register = 'Tu correo ya esta registrado!'
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
  background-color: var(--background_color_1);
  @apply flex w-full flex-col items-center justify-center;
}
.wrapper-items-content {
  @apply flex flex-col items-center justify-center;
}
.content-bttns-shop {
  font-family: var(--font-style-2);
  color: var(--color_text_btn);
  background-color: var(--color_background_btn);
  width: 100%;
  padding: 12px 20px;
  transition: all 0.2s ease-out;
  font-size: 16px;
  letter-spacing: 1px;
  font-weight: 800;
  white-space: nowrap;
  line-height: 18px;
  border-radius: var(--radius_btn);
  @apply mr-2 flex items-center justify-center shadow-md;
}
.content-bttns-shop:hover {
  color: var(--hover_border);
  background-color: var(--hover_bg);
  transition: all 0.2s ease-out;
}

.wrapper-items {
  @apply flex flex-col justify-center;
}
.conten-input-check {
  @apply flex w-full flex-col items-start justify-center;
}
.content-input {
  @apply flex w-full flex-row items-center justify-start;
}
.content-input-error {
  @apply flex w-full items-center justify-start;
}
.input-text {
  color: var(--color_title);
  border-bottom: 3px solid #e0e0e0;
  @apply flex items-center justify-start;
  /* font-family: 'Roboto', Helvetica, Arial, sans-serif !important; */
  font-family: var(--font-style-2);
  padding: 0 25px;
  width: 100%;
  height: 42px;
  font-size: 14px;
  transition: border-color 0.6s ease;
  background-color: transparent;
}
.input-text:focus {
  border-bottom: 3px solid #2c2930;
  transition: border-color 0.6s ease;
}
.input-text::placeholder {
  color: var(--color_subtext);
  opacity: 0.7;
}
.text-error {
  /* font-family: 'Roboto', Helvetica, Arial, sans-serif !important; */
  font-family: var(--font-style-2);
  font-size: 12px;
  color: #ed2353;
  width: auto;
}
.content-button {
  @apply flex w-auto items-start;
}
.content-input-error {
  @apply flex w-full flex-col items-center justify-start;
}
.content-checkbox {
  @apply ml-8 mt-2 flex w-full items-center justify-start;
}
.text-checkbox {
  /* font-family: 'Roboto', Helvetica, Arial, sans-serif !important; */
  font-family: var(--font-style-2);
  margin-left: 5px;
  font-size: 13px;
  color: var(--color_title);
}
#checkbox:focus {
  background-color: #2c2930;
}
.product-text {
  @apply my-60 flex w-full flex-col items-center justify-center;
}
.product-tittle {
  @apply flex flex-col items-center justify-center;
}
.tittle {
  color: var(--color_title);
  @apply flex flex-col items-center justify-center;
  /* font-family: 'Poppins', Helvetica, Arial, sans-serif !important; */
  font-family: var(--font-style-1);
  font-weight: 700;
}
.icon-msg {
  width: 20px;
  margin-top: -2px;
  margin-right: -20px;
  position: relative;
}
.input-icon {
  @apply flex w-full flex-row;
}
@screen sm {
  .wrapper-items {
    @apply mb-40 flex flex-col;
  }
  .content-checkbox {
    @apply ml-0;
  }
  .conten-input-check {
    @apply mb-4;
  }
  .content-bttns-shop {
    @apply w-full;
  }
  .content-button {
    @apply justify-center;
  }
  .product-tittle {
    width: 100%;
  }
  .tittle {
    line-height: 1.1;
    letter-spacing: 0px;
    font-size: 30px;
    text-align: center;
  }
  .img-wrapp {
    width: 100%;
  }
}
@screen md {
  .wrapper-items {
    @apply flex-row items-start;
  }
  .content-button {
    @apply justify-start;
  }
}
@screen mlg {
  .wrapper-items {
    @apply w-auto;
  }
  .tittle {
    line-height: 34px;
    font-size: 36px;
  }
}
@media (max-width: 770px) {
  .content-button {
    margin-top: 18px;
  }
}
@media (max-width: 500px) {
  .wrapper_newsletter {
    padding: 0 10px 0 10px;
  }
  .content-button {
    margin-top: 12px;
  }
}
</style>
