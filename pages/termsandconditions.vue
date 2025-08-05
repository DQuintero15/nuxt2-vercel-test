<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="flex w-full items-center justify-center bg-gray-200">
    <div class="mx-20 flex w-full flex-col items-center justify-center lg:mx-0">
      <div
        class="my-15 flex w-full max-w-[900px] flex-row items-center justify-start px-20 md:px-0"
      >
        <nuxt-link to="/" class="text-14">
          {{ $t('header_inicio') }}
        </nuxt-link>
        <p class="px-10 text-14 font-bold">&gt;</p>
        <p class="text-14 font-bold">
          {{ $t('footer_politicasyterminos') }}
        </p>
      </div>

      <div
        class="mb-[50px] flex w-full max-w-[900px] flex-col items-center justify-center bg-white-white pb-[20px] pt-[30px] shadow-md"
      >
        <h1 class="mb-30 text-20 font-bold">
          {{ $t('footer_condicionesLegales') }}
        </h1>
        <div
          v-if="storePolicies?.datos"
          class="mb-15 w-full max-w-[900px] px-20 md:px-30"
        >
          <p class="mb-10 text-17 font-bold">
            {{ $t('footer_politicaTratamientos') }}
          </p>
          <div v-html="storePolicies.datos"></div>
        </div>

        <div
          v-if="storePolicies?.garantia"
          class="mb-15 w-full max-w-[900px] px-20 md:px-30"
        >
          <p class="mb-10 text-17 font-bold">
            {{ $t('footer_politicaGarantia') }}
          </p>
          <div v-html="storePolicies.garantia"></div>
        </div>

        <div
          v-if="storePolicies?.devolucion"
          class="mb-15 w-full max-w-[900px] px-20 md:px-30"
        >
          <p class="mb-10 text-17 font-bold">
            {{ $t('footer_politicaDevoluciones') }}
          </p>
          <div v-html="storePolicies.devolucion"></div>
        </div>

        <div
          v-if="storePolicies?.cambio"
          class="mb-15 w-full max-w-[900px] px-20 md:px-30"
        >
          <p class="mb-10 text-17 font-bold">
            {{ $t('footer_politicaCambio') }}
          </p>
          <div v-html="storePolicies.cambio"></div>
        </div>

        <div
          v-if="storePolicies?.envios"
          class="mb-15 w-full max-w-[900px] px-30"
        >
          <p class="mb-10 text-17 font-bold">
            {{ $t('footer_politicaEnvios') }}
          </p>
          <div v-html="storePolicies.envios"></div>
        </div>

        <div
          v-if="storePolicies?.pagos"
          class="mb-15 w-full max-w-[900px] px-30"
        >
          <p class="mb-10 text-16 font-bold">
            {{ $t('footer_politicaPagos') }}
          </p>
          <div v-html="storePolicies.pagos"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'TermsAndConditions',
  layout: 'default',
  computed: {
    ...mapState(['storePolicies']),
  },
}
</script>
