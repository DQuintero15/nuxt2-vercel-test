<template>
  <div
    class="wrapper_newsletter"
    :style="[
      settingByTemplate10[0].setting10Footer,
      settingByTemplate10[0].setting10General,
      {
        '--font-style-1':
          settingByTemplate10[0]?.setting10General?.fount_1 ?? 'Roboto',
      },
    ]"
  >
    <div class="wrapper-items-content">
      <div class="product-tittle">
        <span class="tittle txt-1">Inscríbase al boletín</span>
        <span class="tittle txt-2">
          Manténgase actualizado sobre todo lo que es nuevo agregar digno de
          mención
        </span>
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
                    class="icon-msg"
                  >
                    <path
                      d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6M20 6L12 11L4 6H20M20 18H4V8L12 13L20 8V18Z"
                    />
                  </svg>
                </div>
                <input
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
        <p v-if="stateCheckBox" class="text-error mt-2">
          Marcar checkbox para poder suscribirse al boletín informativo
        </p>
      </div>
      <div class="content-button">
        <button
          class="content-bttns-shop"
          :disabled="stateBtn ? false : true"
          @click="submitNewsletter"
        >
          <span class="content-textbutton-shop">
            {{ stateBtn ? $t('newsletter_btn') : $t('footer_pendiente') }}
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
export default {
  name: 'Ko10Newsletter',
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
    settingByTemplate10: {
      type: Array,
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
                  message: 'Tu correo ya esta registrado',
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
  background-color: var(--background_color_1);
  @apply w-full flex flex-col justify-center items-start;
}
.wrapper-items-content {
  @apply flex flex-col justify-center items-center;
}
.content-bttns-shop {
  background-color: transparent;
  padding: 12px 20px;
  border-bottom: 2px solid var(--color_border);
  @apply flex justify-center items-center uppercase transition-all ease-out duration-0.2;
}
.content-bttns-shop:hover {
  border-bottom: 2px solid #eb7025;
  @apply transition-all ease-in duration-0.2;
}
.content-textbutton-shop {
  color: var(--colorTextBTn);
  font-size: 14px;
  font-family: var(--font-style-1) !important;
  @apply tracking-1 leading-16 font-semibold whitespace-nowrap;
}
.content-bttns-shop:hover .content-textbutton-shop {
  color: var(--hover_text);
  @apply transition-all ease-in duration-0.2;
}
.conten-input-check {
  @apply w-full flex flex-col justify-center items-center;
}
.content-input {
  @apply w-full flex flex-row justify-start items-center;
}
.content-input-error {
  @apply w-full flex justify-start items-center;
}
.input-text {
  padding: 0 25px;
  font-size: 14px;
  border-bottom: 2px solid var(--color_border);
  transition: border-color 0.2s ease;
  background-color: transparent;
  font-family: var(--font-style-1) !important;
  @apply w-9/5 h-42 flex justify-start items-center;
}
.input-text {
  color: var(--color_text);
}
.input-text:hover {
  border-bottom: 2px solid var(--hover_text);
  transition: border-color 0.2s ease;
}
.input-text:focus {
  border-bottom: 2px solid var(--hover_text);
  transition: border-color 0.6s ease;
}
.input-text::placeholder {
  color: var(--color_subtext);
  opacity: 0.7;
}
.text-error {
  font-size: 12px;
  color: #ed2353;
  width: auto;
  font-family: var(--font-style-1) !important;
}
.content-button {
  @apply w-auto flex items-start;
}
.content-input-error {
  @apply w-full flex flex-col justify-start items-center;
}
.content-checkbox {
  @apply w-full flex justify-start items-center ml-8 mt-2;
}
.text-checkbox {
  margin-left: 5px;
  font-size: 13px;
  color: var(--color_text);
  font-family: var(--font-style-1) !important;
}
#checkbox:focus {
  background-color: #2c2930;
}
.product-tittle {
  @apply flex flex-col justify-center items-start;
}
.tittle {
  @apply flex flex-col justify-center items-center;
}
.txt-1 {
  color: var(--color_title);
  font-size: 16px;
  @apply mb-50 font-semibold;
}
.txt-2 {
  color: var(--color_text);
  font-size: 15px;
}
.icon-msg {
  fill: var(--color_icon);
  @apply w-20 -mt-2 -mr-20 relative;
}
.input-icon {
  @apply w-full flex flex-row;
}
@screen sm {
  .wrapper-items-content {
    @apply w-9/5 mb-20;
  }
  .wrapper-items {
    @apply w-9/5 flex flex-col justify-center items-start mb-12;
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
  }
  .txt-1 {
    font-size: 16px;
    font-family: var(--font-style-1) !important;
    @apply mb-30;
  }
  .txt-2 {
    font-size: 15px;
    line-height: 1.55;
    font-family: var(--font-style-1) !important;
    @apply mb-10 font-light;
  }
  .wrapper_newsletter {
    @apply mb-40;
  }
}
@media (min-width: 425px) {
  .wrapper-items {
    @apply flex flex-row;
  }
}
@screen mlg {
  .wrapper-items-content {
    @apply w-9/5;
  }
  .wrapper-items {
    @apply w-auto;
  }
  .wrapper_newsletter {
    @apply mb-0;
  }
  .txt-1 {
    font-size: 16px;
    @apply mb-20;
  }
  .txt-2 {
    font-size: 15px;
    @apply mb-10;
  }
}
@media (min-width: 1400px) {
  .txt-1 {
    @apply mb-30;
  }
}
</style>
