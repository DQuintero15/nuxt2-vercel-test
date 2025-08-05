<template>
  <div
    class="w-full max-w-8/5 md:max-w-7/7 lg:max-w-6/0 flex justify-start lg:justify-end items-center mt-55"
    :style="{
      '--hover_text_btn':
        settingByTemplate15[0]?.settingGeneral?.hover_text_btn,
      '--hover_bg_btn': settingByTemplate15[0]?.settingGeneral?.hover_bg_btn,
    }"
  >
    <div
      class="w-full max-w-[600px] grid grid-cols-1 md:grid-cols-2 gap-5 justify-center items-center"
    >
      <div class="flex flex-col justify-center items-start mr-20">
        <p
          class="text-24 font-bold mb-5"
          :style="`color: ${settingByTemplate15[0].newsletter.color_title};`"
        >
          {{ settingByTemplate15[0].newsletter.title }}
        </p>
        <p class="text-15">
          {{ settingByTemplate15[0].newsletter.subTitle }}
        </p>
      </div>
      <div
        class="w-full flex flex-col justify-center items-start border-t-2 md:border-t-0 md:border-l-2 pt-20 md:pt-0 md:pl-30"
        :style="`border-color: ${settingByTemplate15[0].newsletter.color_border};`"
      >
        <div class="w-full flex flex-row justify-center items-start">
          <ValidationProvider
            ref="validate"
            name="email"
            rules="required|email"
            class="px-20 py-8 w-full relative"
            :style="`background-color: ${settingByTemplate15[0].newsletter.color_input}; border-radius: ${settingByTemplate15[0].settingGeneral.radius};`"
          >
            <template slot-scope="{ errors }">
              <input
                v-model="email"
                name="email"
                type="email"
                :placeholder="$t('newsletter_email')"
                class="bg-transparent"
                :style="`color: ${settingByTemplate15[0].newsletter.color_text_input};`"
              />
              <span
                v-show="errors[0] || register"
                class="absolute text-11 left-0 w-full -top-22"
                style="max-width: 250px"
                :style="customStyle"
              >
                {{ errorsCheckbox || register }}
              </span>
            </template>
          </ValidationProvider>
          <button
            class="px-20 py-10 ml-10 btn"
            :style="`background-color: ${settingByTemplate15[0].newsletter.colorBg_Btn};  border-radius: ${settingByTemplate15[0].settingGeneral.radius}`"
            :disabled="stateBtn ? false : true"
            @click="submitNewsletter"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              version="1.1"
              fill="currentColor"
              :style="`color: ${settingByTemplate15[0].newsletter.color_icon};`"
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
            >
              <path
                d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6M20 6L12 11L4 6H20M20 18H4V8L12 13L20 8V18Z"
              />
            </svg>
          </button>
        </div>
        <div class="flex justify-center mt-6">
          <input id="checkbox" v-model="checked" type="checkbox" />
          <p
            class="ml-6 text-12"
            :style="`color: ${settingByTemplate15[0].newsletter.color_text};`"
          >
            {{ $t('newsletter_msg') }}
          </p>
        </div>
        <p v-if="stateCheckBox">
          Marcar checkbox para poder suscribirse al boletín informativo
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
export default {
  name: 'Ko14Newsletter',
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
    settingByTemplate15: {
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
      customStyle: {
        color: this.settingByTemplate15[0].newsletter.color_text,
      },
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
.btn:hover {
  color: var(--hover_text_btn);
  background-color: var(--hover_bg_btn);
}
</style>
