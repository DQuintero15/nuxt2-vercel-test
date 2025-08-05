<template>
  <client-only>
    <footer
      :class="cantidadProductos > 0 ? 'content-footer' : 'content-footer-none'"
    >
      <footer class="content-items-footer">
        <div v-if="cantidadProductos > 0" class="item-footer">
          <p class="text-items-cart">
            {{ $t('footer_title') }}
            <span class="text-items-cart ml-2">({{ cantidadProductos }})</span>
          </p>
        </div>
        <button
          v-if="cantidadProductos > 0"
          :style="`background: ${
            settingByTemplate && settingByTemplate.color_primario
              ? settingByTemplate.color_primario
              : '#25D366'
          }; color:${
            settingByTemplate && settingByTemplate.color_secundario
              ? settingByTemplate.color_secundario
              : '#FFFFFF'
          };`"
          class="button-footer"
          @click="openOrder"
        >
          <p class="text-items-button">{{ $t('footer_title2') }}</p>
        </button>

        <p v-else class="button-footer-out">
          {{ $t('footer_carritoVacio2') }}
        </p>

        <div v-if="cantidadProductos > 0" class="item-footer">
          <p class="text-items-cart">
            {{
              totalCart
                | currency(
                  dataStore.tiendasInfo.paises.codigo,
                  dataStore.tiendasInfo.moneda,
                )
            }}
          </p>
        </div>
      </footer>
    </footer>
  </client-only>
</template>
<script>
import currency from '@/mixins/formatCurrent'
export default {
  name: 'KoFooterWhatsApp',
  mixins: [currency],
  props: {
    dataStore: {
      type: Object,
      required: true,
    },
    settingByTemplate: {
      type: Object,
      required: true,
    },
  },
  computed: {
    cantidadProductos() {
      return this.$store.getters.cantidadProductos
    },
    totalCart() {
      return this.$store.state.totalCart
    },
  },
  methods: {
    openOrder() {
      this.$store.commit('SET_OPEN_ORDER', true)
    },
  },
}
</script>
<style scoped>
.content-footer {
  background-color: #3d3d3d;
  position: sticky;
  z-index: 999;
  bottom: 0;
  max-width: 900px;
  height: 60px;
  @apply flex w-full flex-col items-center justify-center;
}
.content-footer-none {
  display: none;
}
@screen sm {
  .content-items-footer {
    @apply flex w-full flex-row items-center justify-center py-20;
  }
  .item-footer {
    flex: 1;
    @apply flex w-full flex-row items-center justify-center;
  }
  .text-items-cart {
    font-size: 12px;
    color: #fff;
    font-family: 'Poppins', sans-serif !important;
    @apply flex w-auto flex-row items-center justify-center font-semibold;
  }
  .button-footer {
    height: 37px;
    width: 130px;
    @apply flex flex-col items-center justify-center rounded-md py-7;
  }
  .button-footer-out {
    width: 161px;
    color: #fff;
    @apply text-center;
  }
  .text-items-button {
    font-size: 14px;
    font-family: 'Poppins', sans-serif !important;
    @apply w-auto font-semibold;
  }
}
@screen md {
  .content-items-footer {
    @apply py-20;
  }
  .text-items-cart {
    font-size: 18px;
  }
  .button-footer {
    height: 40px;
    @apply w-auto px-30 py-8;
  }
  .button-footer-out {
    width: 280px;
    height: 40px;
    @apply py-10;
  }
  .text-items-button {
    font-size: 16px;
  }
}
@media (max-width: 600px) {
  .button-footer {
    height: 40px;
  }
  .button-footer-out {
    height: 40px;
  }
}
@media (max-width: 400px) {
  .button-footer {
    height: 37px;
  }
  .button-footer-out {
    height: 37px;
  }
}
</style>
