<template>
  <div class="w-full flex justify-start items-center">
    <div class="w-full flex flex-col justify-center items-start">
      <div class="w-full flex flex-row justify-start items-center">
        <ValidationProvider
          ref="validate"
          name="email"
          rules="required|email"
          class="w-full"
        >
          <template slot-scope="{ errors }">
            <input
              v-model="email"
              name="email"
              type="email"
              :placeholder="$t('newsletter_email')"
              class="px-20 py-8 w-full bg-transparent"
              :style="`background-color: ${settingByTemplate16[0].newsletter.color_input}; color: ${settingByTemplate16[0].newsletter.color_text_input};border-radius: ${settingByTemplate16[0].settingGeneral.radius};`"
            />
            <span
              v-show="errors[0] || register"
              :style="register ? 'color:green' : ''"
            >
              {{ errorsCheckbox || register }}
            </span>
          </template>
        </ValidationProvider>
        <button
          class="px-20 py-8 ml-10 border"
          :style="`background-color: ${settingByTemplate16[0].newsletter.color_bg_btn}; border-color: ${settingByTemplate16[0].newsletter.color_border_Btn};  border-radius: ${settingByTemplate16[0].settingGeneral.radius}`"
          :disabled="stateBtn ? false : true"
          @click="submitNewsletter"
        >
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              version="1.1"
              :fill="settingByTemplate16[0].newsletter.color_icon"
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
            >
              <path
                d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6M20 6L12 11L4 6H20M20 18H4V8L12 13L20 8V18Z"
              />
            </svg>
          </div>
        </button>
      </div>
      <div class="flex justify-center mt-6">
        <input id="checkbox" v-model="checked" type="checkbox" />
        <p
          class="ml-6 text-12"
          :style="`color: ${settingByTemplate16[0].newsletter.color_text};`"
        >
          {{ $t('newsletter_msg') }}
        </p>
      </div>
      <p v-if="stateCheckBox">
        Marcar checkbox para poder suscribirse al boletín informativo
      </p>
    </div>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
export default {
  name: 'Ko16Newsletter',
  components: {
    ValidationProvider,
    // eslint-disable-next-line vue/no-unused-components
    ValidationObserver,
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
.txt {
  color: var(--color_text);
  font-size: 14px;
}
.btn {
  color: var(--color_title);
  font-size: 18px;
  @apply pb-10;
}
</style>
