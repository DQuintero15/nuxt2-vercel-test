<template>
  <div :style="settingBase ?? null">
    <KoMiCompra
      v-if="orden"
      :data-store="dataStore"
      :orden="orden"
      @update="setDataOrder"
    />
  </div>
</template>

<script>
import axios from 'axios'
import KoMiCompra from '@/components/whatsapp/Ko-miCompra-1.vue'

export default {
  name: 'MiCompraWa',
  components: {
    KoMiCompra,
  },
  data() {
    return {
      orden: {},
    }
  },
  computed: {
    dataStore() {
      return this.$store.state.dataStore
    },
    settingBase() {
      return this.$store.state.settingBase
    },
  },

  mounted() {
    if (this.$route.query && this.$route.query.orden) {
      this.asyncData()
    }
  },
  methods: {
    setDataOrder(value) {
      this.orden = value
    },
    asyncData() {
      if (this.$route.query.orden) {
        return axios
          .get(
            `${this.$store.state.urlKomercia}/api/orden/${this.dataStore.id}/${this.$route.query.orden}`,
            {
              headers: {
                'content-type': 'application/json',
                'Access-Control-Allow-Origin': '*',
              },
            },
          )
          .then((response) => {
            if (
              this.$route.query.orden == response.data.data.venta.id &&
              this.$route.query.usuario ==
                response.data.data.venta.usuario.identificacion
            ) {
              this.orden = response.data.data
              return this.orden
            } else {
              this.orden.message = 'No existe esta orden'
              return this.orden
            }
          })
          .catch(() => {
            this.orden.message = 'No existe esta orden'
            return this.orden
          })
      } else {
        return this.orden
      }
    },
  },
}
</script>
