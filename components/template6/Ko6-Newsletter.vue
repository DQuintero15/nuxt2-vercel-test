<template>
  <div
    class="w-full flex justify-center items-center box-border"
    :style="{
      backgroundColor: newsletter?.bg_color || 'white',
    }"
  >
    <div
      class="w-full max-w-[1300px] grid grid-cols-1 md:grid-cols-2 gap-y-10 md:gap-y-0 justify-center items-center px-20 md:px-40 py-40 md:py-60 rounded-none md:rounded-12"
      :style="{
        backgroundColor: newsletter?.bg_color2 || '#101010',
      }"
    >
      <p
        class="text-30 font-bold"
        :style="{
          color: newsletter?.color_subTitle || 'white',
        }"
      >
        Suscríbase a nuestro boletín
      </p>
      <div class="w-full flex flex-col justify-end items-center">
        <div class="w-full flex flex-row justify-center items-center">
          <div class="w-full flex flex-row justify-center pb-10 relative">
            <ValidationProvider
              ref="validate"
              name="email"
              rules="required|email"
              class="w-full flex flex-col"
            >
              <template slot-scope="{ errors }">
                <input
                  v-model="email"
                  name="email"
                  class="w-full rounded-25 border-0 py-15 pl-20 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  type="email"
                  :placeholder="$t('newsletter_email')"
                  :style="{
                    color: newsletter?.text_color || 'rgb(2 6 23)',
                  }"
                />
                <span
                  v-show="errors[0] || register"
                  class="w-full text-12 ml-20 text-[#cb2027]"
                  :style="register ? 'color:green' : ''"
                >
                  {{ errorsCheckbox || register }}
                </span>
              </template>
            </ValidationProvider>
            <button
              class="absolute right-0 rounded-25 px-20 py-15 text-sm font-semibold shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              :style="{
                backgroundColor: newsletter?.bg_btn || 'hsla(22, 98%, 53%, 1)',
                color: newsletter?.text_bg || 'white',
              }"
              :disabled="stateBtn ? false : true"
              @click="submitNewsletter"
            >
              {{ stateBtn ? $t('newsletter_btn') : $t('footer_pendiente') }}
            </button>
          </div>
        </div>
        <div class="w-full flex flex-col justify-center">
          <div class="w-full flex flex-row justify-start items-center">
            <input id="checkboxNewsletter" v-model="checked" type="checkbox" />
            <label
              for="checkboxNewsletter"
              class="ml-5 text-12"
              :style="{
                color: newsletter?.text_color || 'white',
              }"
            >
              {{ $t('newsletter_msg') }}
            </label>
          </div>
          <p
            v-if="stateChecked"
            class="w-full text-12 ml-20 text-[#cb2027] mt-3"
          >
            Marcar checkbox para poder suscribirse al boletín informativo
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
export default {
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
  },
  data() {
    return {
      errorsCheckbox: 'El campo checkbox y email son obligatorios',
      email: null,
      register: '',
      checked: false,
      stateChecked: false,
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
        this.stateChecked = true
      }
    },
  },
}
</script>

<style scoped>
.input-text {
  font-size: 14px;
  color: var(--color_pretitle);
  border: solid 2px var(--color_border);
  border-radius: var(--radius_btn);
  background-color: transparent;
  padding: 12px 14px;
  width: 360px;
  height: 100%;
}
.input-text::placeholder {
  color: var(--color_pretitle);
  opacity: 0.7;
}
.input-text:focus,
.input-text:active {
  outline: 0;
  border: solid 2px var(--color_border);
}

.btn {
  color: var(--color_text_btn);
  background-color: var(--color_background_btn);
  border: 1px solid var(--color_border_btn);
  padding: 8px 14px;
  font-size: 14px;
  width: 220px;
  font-weight: bold;
  cursor: pointer;
  margin-left: 20px;
  cursor: pointer;
  max-height: 50px;
  transition: all 200ms ease-in;
  border-radius: var(--radius_btn);
}
.btn:hover {
  color: var(--hover_text_btn);
  background-color: var(--hover_text_btn);
  border: 1px solid var(--hover_Border_btn);
}
.text-checkbox {
  margin-left: 5px;
  font-size: 13px;
  color: var(--color_pretitle);
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
    width: 230px;
  }
  .btn {
    width: 100px;
    margin-left: 10px;
  }
}
</style>
