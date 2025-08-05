<template>
  <div
    v-if="dataStore?.disenoModals[0]?.stateModal === 1 && !stateModalPwd"
    class="wrapper-security-modal"
    :style="{
      background:
        dataStore?.disenoModals[0]?.colorBg_1 || 'rgba(5, 5, 5, 0.897)',
    }"
  >
    <div
      class="content-security-modal"
      :style="{ background: dataStore?.disenoModals[0]?.colorBg_2 || 'White' }"
    >
      <img
        v-if="dataStore?.disenoModals[0]?.img"
        v-lazy="idCloudinary(dataStore.disenoModals[0].img, 550, 550)"
        alt="img-modal-block"
        :style="{
          width: dataStore?.disenoModals[0]?.width_img || '120px',
          marginBottom: dataStore?.disenoModals[0]?.marginBottomImg || '10px',
        }"
      />
      <p
        :style="{
          color: dataStore?.disenoModals[0]?.colorTitle || 'white',
          fontSize: dataStore?.disenoModals[0]?.fontSizeTitle || '20px',
          fontWeight: dataStore?.disenoModals[0]?.fontWeighTitle || 'bold',
          marginBottom: dataStore?.disenoModals[0]?.marginBottomTitle || '15px',
        }"
      >
        {{ dataStore.disenoModals[0].title }}
      </p>
      <p
        :style="{
          color: dataStore?.disenoModals[0]?.colorDescription || 'white',
          fontSize: dataStore?.disenoModals[0]?.fontSizeDescription || '16px',
          fontWeight: dataStore?.disenoModals[0]?.fontWeighDescription || '400',
          marginBottom:
            dataStore?.disenoModals[0]?.marginBottomDescription || '20px',
        }"
      >
        {{ dataStore.disenoModals[0].description }}
      </p>
      <div class="inputBox">
        <input
          id="password"
          v-model="pwd"
          name="password"
          type="password"
          class="input-text"
          :style="{
            color: dataStore?.disenoModals[0]?.colorBorder || 'black',
            border: `solid 2px ${
              dataStore?.disenoModals[0]?.colorBorder || 'black'
            }`,
          }"
          placeholder="Ingresar contraseña"
        />
        <div id="toggle" @click="switchVisibility">
          <i class="el-icon-view"></i>
        </div>
      </div>
      <p v-if="stateMgs" class="alert-modal">
        Contraseña incorrecta, intente de nuevo
      </p>
      <button
        class="btn-acceptModal mt-10"
        :style="{
          color: dataStore?.disenoModals[0]?.colorTextBtn || 'white',
          backgroundColor: dataStore?.disenoModals[0]?.colorBgBtn || 'black',
        }"
        @click="closedModal"
      >
        Ingresar
      </button>
    </div>
  </div>
</template>
<script>
import idCloudinary from '@/mixins/idCloudinary'
export default {
  name: 'ModalSecurity',
  mixins: [idCloudinary],
  props: {
    dataStore: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      pwd: null,
      stateMgs: false,
    }
  },
  computed: {
    stateModalPwd() {
      return this.$store.state.stateModalPwd
    },
  },
  beforeDestroy() {
    window.removeEventListener('message', this.addEventListenerTemplate)
  },
  mounted() {
    window.parent.postMessage('message', '*')
    window.addEventListener('message', this.addEventListenerTemplate)
  },
  methods: {
    async closedModal() {
      if (this.dataStore.disenoModals[0]?.password) {
        if (this.pwd) {
          const { success } = await this.$store.dispatch('GET_ACCESS_CODE', {
            id_tienda: this.dataStore.id,
            pwd: this.pwd,
          })
          if (success) {
            this.setCookies(this.pwd)
          } else {
            this.passwordStore()
          }
        }
      }
    },
    passwordStore() {
      if (this.dataStore.disenoModals[0].password == this.pwd) {
        this.$store.commit('SET_STATE_MODAL_PWD', true)
        this.setCookies(this.dataStore.disenoModals[0].password)
      } else {
        this.stateMgs = true
      }
    },
    addEventListenerTemplate(e) {
      if (
        e.origin.includes('https://panel.komercia.co') ||
        e.origin.includes('http://localhost:8080')
      ) {
        if (e && e.data && e.data.modalSecurity) {
          this.$store.commit('SET_STATE_MODAL_PWD', true)
        }
      }
    },
    switchVisibility() {
      const password = document.getElementById('password')
      if (password.type === 'password') {
        password.setAttribute('type', 'text')
      } else {
        password.setAttribute('type', 'password')
      }
    },
    setCookies(value) {
      var date = new Date()
      date.setTime(date.getTime() + 12 * 60 * 60 * 1000)
      var expires = date.toUTCString()
      document.cookie = `authPwd = ${value}; path=/; expires=${expires};`
    },
  },
}
</script>

<style scoped>
.wrapper-security-modal {
  top: 0;
  opacity: 1;
  z-index: 99999;
  width: 100%;
  height: calc(100vh);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background: rgba(5, 5, 5, 0.897); */
  transition: all 200ms ease-in;
}
.content-security-modal {
  padding: 30px 20px;
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background: white; */
  border-radius: 5px;
  -webkit-box-shadow: 0px 0px 47px 11px rgba(87, 87, 87, 0.4);
  box-shadow: 0px 0px 47px 11px rgba(87, 87, 87, 0.4);
}
.btn-acceptModal {
  width: 100%;
  max-width: 250px;
  border-radius: 5px;
  padding: 8px 14px;
  font-size: 14px;
  cursor: pointer;
  transition: all 200ms ease-in;
}
.input-text {
  font-size: 14px;
  border-radius: 5px;
  background-color: transparent;
  padding: 8px 14px;
  width: 100%;
}
.input-text::placeholder {
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
  border: solid 2px rgba(127, 127, 139, 0.342);
}
.inputBox {
  max-width: 250px;
  width: 100%;
  position: relative;
}
#toggle {
  position: absolute;
  top: 20%;
  right: 10px;
  cursor: pointer;
}
.alert-modal {
  font-size: 14px;
  color: red;
}
@media (max-width: 500px) {
  .content-security-modal {
    max-width: 350px;
  }
}
</style>
