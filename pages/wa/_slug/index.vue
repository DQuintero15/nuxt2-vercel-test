<template>
  <div
    id="width"
    class="flex w-full flex-col items-center justify-center bg-transparent"
  >
    <waTemplate />
    <div
      v-if="dataStore.estado === 0 || !expiredDate(dataStore.fechaExpiracion)"
      id="modalNotification"
      class="fixed top-0 flex h-screen w-full items-center justify-center"
      style="z-index: 9998"
    >
      <div
        class="absolute top-0 h-screen w-full backdrop-blur"
        style="background-color: rgba(0, 0, 0, 0.767)"
      ></div>
      <div
        class="z-100 flex w-full flex-col items-center justify-center rounded-10 bg-white-white px-30 py-20 shadow-md"
        style="max-width: 250px"
      >
        <koTiendaCerrada />
        <p
          class="mt-15 text-center text-base text-gray-500"
          style="max-width: 220px"
        >
          Disculpa, no podrá realizar compras por el momento,
        </p>
        <p
          v-if="expiredDate(dataStore.fechaExpiracion)"
          class="mt-15 text-17 font-bold"
          style="color: #ff314d"
        >
          ¿Deseas continuar?
        </p>
        <button
          v-if="expiredDate(dataStore.fechaExpiracion)"
          class="mt-15 w-full rounded-10 bg-black py-4 text-base text-white-white transition delay-75 ease-in-out hover:bg-slate-300 hover:text-black"
          @click="acceptClose()"
        >
          Aceptar
        </button>
      </div>
    </div>
    <div
      v-if="dataStore.redes.whatsapp == ''"
      class="wrapper-notificacion"
      style="z-index: 9999"
    >
      <div class="content-notificacion">
        <koTiendaCerrada />
        <p class="text-noti">
          Disculpa, no podrá realizar compras por el momento,
        </p>
        <p class="subtitle-noti">
          La tienda no tiene configurado un número de WhatsApp
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import expiredDate from '@/mixins/expiredDate'
export default {
  name: 'WapiME',
  components: {
    waTemplate: () => import('../../template99/index.vue'),
    koTiendaCerrada: () => import('@/assets/img/tiendaCerrada'),
  },
  mixins: [expiredDate],
  layout: 'wa',
  computed: {
    ...mapState(['dataStore']),
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  },
  mounted() {
    this.onResize()
    window.addEventListener('resize', this.onResize)
  },
  methods: {
    onResize() {
      const widthOutput = document.querySelector('#width')
      if (window.innerWidth > 1300) {
        widthOutput.style.width = '900px'
      } else {
        widthOutput.style.width = window.innerWidth + 'px'
      }
    },
    acceptClose() {
      document.getElementById('modalNotification').style.zIndex = '-2'
      document.getElementById('modalNotification').style.opacity = '0'
    },
  },
}
</script>
