<template>
  <footer
    class="flex w-full items-center justify-center"
    :class="valueWa ? 'max-w-[900px]' : ''"
    style="background-color: rgb(24, 24, 24)"
  >
    <div
      v-if="dataStore.tiendasInfo.paises.pais"
      class="flex w-full max-w-[1200px] flex-row items-center justify-between px-20 py-2"
    >
      <div class="flex w-full flex-row items-center justify-start">
        <img
          v-if="selectOptionCountry"
          v-lazy="selectOptionCountry.img"
          width="30px"
          class="mr-5"
          alt="bandera país"
        />
        <button
          class="text-12 text-white-white"
          @click="stateIdStore = !stateIdStore"
        >
          {{ dataStore.tiendasInfo.paises.pais }}
        </button>
        <p v-if="!stateIdStore" class="mx-5 text-12 text-white-white">|</p>
        <p v-if="!stateIdStore" class="text-12 text-white-white">
          <strong v-if="dataStore.tiendasInfo.moneda == 'PEN'" class="mr-1">
            S/
          </strong>
          <strong v-else class="mr-1">$</strong>
          {{ dataStore.tiendasInfo.moneda }}
        </p>
        <div v-if="stateIdStore" class="flex flex-row justify-start">
          <p class="ml-10 text-12 text-white-white">
            <strong>ID</strong>:
            {{ dataStore.id }}
          </p>
          <p class="ml-5 text-12 text-white-white">
            <strong>TP</strong>: {{ template }}
          </p>
          <p class="ml-5 text-12 text-white-white">
            <strong>HK</strong>: {{ dataHoko.statehoko == 0 ? 'NO' : 'SI' }}
          </p>
        </div>
      </div>
      <KoLanguage />
    </div>
  </footer>
</template>

<script>
import KoLanguage from '../../k-select-language'
import { mapState } from 'vuex'
export default {
  name: 'KoFooterFlags',
  components: {
    KoLanguage,
  },
  props: {
    dataStore: {
      type: Object,
      required: true,
    },
    valueWa: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      stateIdStore: false,
      optionsCountry: [
        {
          id: 1,
          name: 'co',
          title: 'Colombia',
          currencySign: '$',
          simbolo: 'COP',
          img: 'https://res.cloudinary.com/komerciaacademico/image/upload/q_auto,f_auto/v1653417091/komerica/Banderas/Colombia_kz1t6d.png',
        },
        {
          id: 2,
          name: 'internacional',
          title: 'Internacional',
          currencySign: '$',
          simbolo: 'USD',
          img: 'https://res.cloudinary.com/komerciaacademico/image/upload/q_auto,f_auto/v1653417091/komerica/Banderas/Internacional_rzalry.png',
        },
        {
          id: 3,
          name: 'mx',
          title: 'México',
          currencySign: '$',
          simbolo: 'MXN',
          img: 'https://res.cloudinary.com/komerciaacademico/image/upload/q_auto,f_auto/v1653417091/komerica/Banderas/Mexico_dibihf.png',
        },
        {
          id: 6,
          name: 'ar',
          title: 'Argentina',
          currencySign: '$',
          simbolo: 'ARS',
          img: 'https://res.cloudinary.com/komerciaacademico/image/upload/q_auto,f_auto/v1653417092/komerica/Banderas/Argentina_twinoc.png',
        },
        {
          id: 7,
          name: 'cl',
          title: 'Chile',
          currencySign: '$',
          simbolo: 'CLP',
          img: 'https://res.cloudinary.com/komerciaacademico/image/upload/q_auto,f_auto/v1653417091/komerica/Banderas/Chile_rzygtf.png',
        },
        {
          id: 8,
          name: 'pr',
          title: 'Puerto Rico',
          currencySign: '$',
          simbolo: 'USD',
          img: 'https://res.cloudinary.com/komerciaacademico/image/upload/q_auto,f_auto/v1653417091/komerica/Banderas/Puerto_Rico_uorvfh.png',
        },
        {
          id: 9,
          name: 'pe',
          title: 'Perú',
          currencySign: 'S/',
          simbolo: '',
          img: 'https://res.cloudinary.com/komerciaacademico/image/upload/q_auto,f_auto/v1653417091/komerica/Banderas/Peru_v36g5q.png',
        },
        {
          id: 10,
          name: 'pan',
          title: 'Panamá',
          currencySign: '$',
          simbolo: 'USD',
          img: 'https://res.cloudinary.com/komerciaacademico/image/upload/q_auto,f_auto/v1653417091/komerica/Banderas/Panama_pdney2.png',
        },
      ],
    }
  },
  computed: {
    ...mapState(['template', 'dataHoko']),
    selectOptionCountry() {
      return this.optionsCountry.find(
        (country) => country.id === this.dataStore.tiendasInfo.paises.id,
      )
    },
  },
}
</script>
