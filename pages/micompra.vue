<template>
  <KoMiCompra
    v-if="orden"
    :data-store="dataStore"
    :orden="orden"
    @update="setDataOrder"
  />
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import KoMiCompra from '../components/miCompra/Ko-miCompra-1'

export default {
  name: 'KoIndexMiCompra',
  components: {
    KoMiCompra,
  },
  asyncData({ route, store }) {
    if (route.query.orden) {
      return axios
        .get(
          `${store.state.urlKomercia}/api/orden/${store.state.dataStore.id}/${route.query.orden}`,
          {
            headers: {
              'content-type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          },
        )
        .then((response) => {
          if (
            route.query.orden == response.data.data.venta.id &&
            route.query.usuario ==
              response.data.data.venta.usuario.identificacion
          ) {
            const orden = response.data.data
            return { orden }
          } else {
            const orden = {}
            orden.message = 'No existe esta orden'
            return { orden }
          }
        })
        .catch(() => {
          const orden = {}
          orden.message = 'No existe esta orden'
          return { orden }
        })
    } else {
      const orden = {}
      return { orden }
    }
  },
  computed: {
    ...mapState(['template', 'dataStore']),
  },
  methods: {
    setDataOrder(value) {
      this.orden = value
    },
  },
}
</script>
