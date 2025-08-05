<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="modal-content">
    <div class="modal-header">
      <nuxt-link to="/termsandconditions" class="txt-Legal">
        {{ $t('footer_condicionesLegales') }}
      </nuxt-link>
      <span class="close" @click="closeModalPolitics">&times;</span>
    </div>
    <div class="content-items-modal">
      <button v-if="storePolicies.datos" class="content-modal accordion">
        {{ $t('footer_politicaTratamientos') }}
      </button>
      <div
        v-if="storePolicies.datos"
        class="panel"
        v-html="storePolicies.datos"
      ></div>
      <button v-if="storePolicies.garantia" class="content-modal accordion">
        {{ $t('footer_politicaGarantia') }}
      </button>

      <div
        v-if="storePolicies.garantia"
        class="panel"
        v-html="storePolicies.garantia"
      ></div>
      <button v-if="storePolicies.devolucion" class="content-modal accordion">
        {{ $t('footer_politicaDevoluciones') }}
      </button>
      <div
        v-if="storePolicies.devolucion"
        class="panel"
        v-html="storePolicies.devolucion"
      ></div>
      <button v-if="storePolicies.cambio" class="content-modal accordion">
        {{ $t('footer_politicaCambio') }}
      </button>
      <div
        v-if="storePolicies.cambio"
        class="panel"
        v-html="storePolicies.cambio"
      ></div>
      <button v-if="storePolicies.envios" class="content-modal accordion">
        {{ $t('footer_politicaEnvios') }}
      </button>
      <div
        v-if="storePolicies.envios"
        class="panel"
        v-html="storePolicies.envios"
      ></div>
      <button v-if="storePolicies.pagos" class="content-modal accordion">
        {{ $t('footer_politicaPagos') }}
      </button>
      <div
        v-if="storePolicies.pagos"
        class="panel"
        v-html="storePolicies.pagos"
      ></div>
    </div>
    <div
      class="flex w-full items-center justify-between px-10 py-4"
      style="background-color: #222"
    >
      <button @click="goRouter" class="txt-Legal">
        🔗 {{ $t('footer_irPagina') }}
      </button>
      <div class="flex flex-row justify-end">
        <p class="text-14 text-white-white">
          <span class="mr-3 font-bold">Actualizado:</span>
          {{ dayCreate }}/{{ nameMonth }}/{{ yearUpdate }}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'KoTermsAndConditions',
  props: {
    storePolicies: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      yearUpdate: '',
      monthCreate: '',
      dayCreate: '',
      nameMonth: '',
    }
  },
  mounted() {
    this.setUpdate()
    var acc = document.getElementsByClassName('accordion')
    var i
    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener('click', function () {
        this.classList.toggle('active')
        var panel = this.nextElementSibling
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null
          panel.style.marginTop = '0px'
          panel.style.marginBottom = '0px'
        } else {
          panel.style.maxHeight = panel.scrollHeight + 'px'
          panel.style.marginTop = '20px'
          panel.style.marginBottom = '20px'
        }
      })
    }
  },
  methods: {
    setUpdate() {
      if (this.storePolicies.updatedAt) {
        const months = [
          'Ene',
          'Feb',
          'Mar',
          'Abr',
          'May',
          'Jun',
          'Jul',
          'Ago',
          'Sep',
          'Oct',
          'Nov',
          'Dic',
        ]
        const fecha = new Date(this.storePolicies.updatedAt)

        this.yearUpdate = fecha.getUTCFullYear()
        this.monthCreate = fecha.getUTCMonth()
        this.dayCreate = fecha.getUTCDate()

        this.nameMonth = months[this.monthCreate]
      }
    },
    closeModalPolitics() {
      this.$store.state.modalpolitics05 = false
    },
    goRouter() {
      this.$router.push({
        path: '/termsandconditions',
      })
      this.closeModalPolitics()
    },
  },
}
</script>
<style scoped>
.accordion {
  color: #222;
  background-color: #eee;
  transition: 0.4s;
  font-family: 'Poppins', Helvetica, Arial, sans-serif !important;
  @apply mb-0 w-full cursor-pointer border border-none text-left outline-none;
}
.active,
.accordion:hover {
  background-color: #ccc;
}
.accordion:after {
  content: '\276F';
  color: #222;
  @apply float-right font-semibold transition-all duration-0.2 ease-in;
}
.active:after {
  transform: rotate(90deg);
  @apply transition-all duration-0.2 ease-in;
}
.panel {
  background-color: #fff;
  transition: 0.4s ease-out;
  @apply max-h-0 w-full items-center justify-start overflow-hidden px-40;
}

/* Modal Content */
.modal-content {
  max-height: 600px;
  background-color: #fefefe;
  border: 1px solid #888;
  box-shadow:
    0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
  -webkit-animation-name: animatetop;
  -webkit-animation-duration: 0.4s;
  animation-name: animatetop;
  animation-duration: 0.4s;
  @apply relative m-auto overflow-y-auto p-0;
}

.modal-content::-webkit-scrollbar {
  @apply w-5;
}
.modal-content::-webkit-scrollbar-thumb {
  background: #a3a3a3;
  border-radius: 4px;
}
.modal-content::-webkit-scrollbar-thumb:active {
  background-color: #777777;
}
.modal-content::-webkit-scrollbar-thumb:hover {
  background: #686868;
  box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.401);
}
/* Add Animation */
@-webkit-keyframes animatetop {
  from {
    top: -300px;
    opacity: 0;
  }
  to {
    top: 0;
    opacity: 1;
  }
}
@keyframes animatetop {
  from {
    top: -300px;
    opacity: 0;
  }
  to {
    top: 0;
    opacity: 1;
  }
}
/* The Close Button */
.close {
  color: #fff;
  font-size: 28px;
  @apply float-right font-semibold;
}
.close:hover,
.close:focus {
  color: #ccc;
  text-decoration: none;
  @apply cursor-pointer;
}

.modal-header {
  background-color: #222;
  color: white;
  @apply sticky top-0 flex w-full items-center justify-between px-20 py-10;
}

.content-items-modal {
  @apply flex w-full flex-col items-center justify-center;
}
.txt-Legal {
  font-size: 16px;
  color: #fff;
  font-family: 'Poppins', Helvetica, Arial, sans-serif !important;
  @apply font-semibold;
}
.content-modal {
  color: #222;
  font-size: 16px;
  border-bottom: 1px solid #ccc;
  font-family: 'Poppins', Helvetica, Arial, sans-serif !important;
  @apply sticky top-62 py-10 font-semibold;
}
@screen sm {
  .modal-content {
    @apply w-full;
  }
  .content-modal {
    font-size: 14px;
    @apply px-20;
  }
}
@screen md {
  .modal-content {
    @apply w-7/0;
  }
  .content-modal {
    font-size: 15px;
    @apply px-30;
  }
}
@media (min-width: 1400px) {
  .modal-content {
    @apply w-5/0;
  }
}
</style>
