<template>
  <div
    class="content-opt-tab"
    :style="[
      settingByTemplate10[0].detailsProduct,
      settingByTemplate10[0].settingGeneral,
      {
        '--font-style-1':
          settingByTemplate10[0]?.settingGeneral?.fount_1 ?? 'Roboto',
      },
    ]"
  >
    <div class="head-content">
      <div
        v-if="contentDescription"
        class="tab"
        :class="selectTag == 1 ? 'show-select-active' : ''"
        @click="sendIndexTag(1)"
      >
        <p class="tittle">{{ $t('productdetail_description') }}</p>
      </div>
      <div
        class="tab"
        :class="selectTag == 2 ? 'show-select-active' : ''"
        @click="sendIndexTag(2)"
      >
        <p class="tittle">{{ $t('productdetail_opcionesPago') }}</p>
      </div>
      <div
        class="tab"
        :class="selectTag == 3 ? 'show-select-active' : ''"
        @click="sendIndexTag(3)"
      >
        <p class="tittle">{{ $t('productdetail_opinionesEnvio') }}</p>
      </div>
    </div>

    <div class="content-tab">
      <div v-if="selectTag === 1 && contentDescription" class="editor">
        <el-tiptap
          v-model="contentDescription"
          :extensions="extensions"
          :spellcheck="false"
          :readonly="true"
          :tooltip="false"
          :bubble="false"
          :showMenubar="false"
          :charCounterCount="false"
        />
      </div>
      <div v-if="selectTag === 2" class="item-content opcpago">
        <ul>
          <li v-if="mediospago.consignacion == 1">
            <h4>{{ $t('productdetail_consignacionBancaria') }}</h4>
            <p>{{ $t('productdetail_consignacionBancariaMsg') }}</p>
          </li>
          <li v-if="mediospago.contraentrega == 1">
            <h4>{{ $t('productdetail_PagoContra') }}</h4>
            <p>{{ $t('productdetail_PagoContraMsg') }}</p>
          </li>
          <li v-if="mediospago.convenir == 1">
            <h4>{{ $t('productdetail_pagoConvenir') }}</h4>
            <p>{{ $t('productdetail_pagoConvenirMsg') }}</p>
          </li>
          <!-- <li v-if="mediospago.credibanco == 1">
            <h4>{{ $t('productdetail_ConsignacionCredibanco') }}</h4>
            <p>
              {{ $t('productdetail_ConsignacionCredibancoMsg') }}
            </p>
            <a
              href="https://www.credibanco.com/"
              target="_blank"
              rel="noreferrer noopener"
              class="cursor_point"
            >
              <img
                class="logo-pasarela"
                src="https://res.cloudinary.com/komerciaacademico/image/upload/c_scale,w_500,q_auto:best,f_auto/v1606335270/Templates%20Modos%20de%20pago/Credibanco_lprsof.png"
                alt="logo Credibanco"
              />
            </a>
          </li> -->
          <PluginAddi
            :more-details="false"
            :status="mediospago.addi"
            :price="price"
            :data-store="dataStore"
          />
          <li v-if="mediospago.daviplata == 1">
            <h4>{{ $t('productdetail_Consignaciondaviplata') }}</h4>
            <p>
              {{ $t('productdetail_ConsignaciondaviplataMsg') }}
            </p>
            <img
              class="logo-pasarela-daviplata"
              src="https://res.cloudinary.com/komerciaacademico/image/upload/c_scale,w_500,q_auto:best,f_auto/v1606333767/Templates%20Modos%20de%20pago/5c89c897e1917d9209a762af_davi_qn90y9.png"
              alt="logo daviPlata"
            />
          </li>
          <li v-if="mediospago.efecty == 1">
            <h4>{{ $t('productdetail_ConsignacionEfecty') }}</h4>
            <p>{{ $t('productdetail_ConsignacionEfectyMsg') }}</p>
            <a
              href="https://www.efecty.com.co/web/"
              target="_blank"
              rel="noreferrer noopener"
              class="cursor_point"
            >
              <img
                class="logo-pasarela-efecty"
                src="https://res.cloudinary.com/komerciaacademico/image/upload/c_scale,w_500,q_auto:best,f_auto/v1606333023/Templates%20Modos%20de%20pago/Efecty-png_q3fvog.png"
                alt="logo efecty"
              />
            </a>
          </li>
          <li v-if="mediospago.mercado_pago == 1">
            <h4>{{ $t('productdetail_PasarelaMercado') }}</h4>
            <p>
              {{ $t('productdetail_PasarelaMercadoMsg') }}
            </p>
            <a
              href="https://www.mercadopago.com"
              target="_blank"
              rel="noreferrer noopener"
              class="cursor_point"
            >
              <img
                class="logo-pasarela-daviplata"
                src="https://res.cloudinary.com/komerciaacademico/image/upload/c_scale,w_500,q_auto:best,f_auto/v1606331948/Templates%20Modos%20de%20pago/mercadopago_jyalpa.png"
                alt="logo mercadopago"
              />
            </a>
          </li>
          <li v-if="mediospago.nequi == 1">
            <h4>{{ $t('productdetail_Consignacionnequi') }}</h4>
            <p>
              {{ $t('productdetail_ConsignacionnequiMsg') }}
            </p>
            <a
              href="https://www.nequi.com.co/"
              target="_blank"
              rel="noreferrer noopener"
              class="cursor_point"
            >
              <img
                class="logo-pasarela-daviplata"
                src="https://res.cloudinary.com/komerciaacademico/image/upload/c_scale,w_500,q_auto:best,f_auto/v1606333553/Templates%20Modos%20de%20pago/Nequi_by_Bancolombia_hxhkhb.png"
                alt="logo nequi"
              />
            </a>
          </li>
          <li v-if="mediospago.payco == 1">
            <h4>{{ $t('productdetail_PasarelaEpayco') }}</h4>
            <p>
              {{ $t('productdetail_PasarelaEpaycoMsg') }}
            </p>
            <img
              class="logo-pasarela-payco"
              src="https://res.cloudinary.com/komercia-components/image/upload/c_scale,w_500,q_auto:best,f_auto/v1579296851/assets/pasarela-epayco.png"
              alt="Pasarela de pagos epayco"
            />
          </li>
          <li v-if="mediospago.payu == 1">
            <h4>{{ $t('productdetail_PasarelaPayu') }}</h4>
            <p>
              {{ $t('productdetail_PasarelaPayuMsg') }}
            </p>
            <a
              href="https://www.payulatam.com/co/"
              target="_blank"
              rel="noreferrer noopener"
            >
              <img
                class="logo-pasarela-payu"
                src="https://ecommerce.payulatam.com/logos/PayU_CO.png"
                alt="PayU"
                border="0"
              />
            </a>
          </li>
          <li v-if="mediospago.wompi == 1">
            <h4>{{ $t('productdetail_Consignacionwompi') }}</h4>
            <p>
              {{ $t('productdetail_PasarelaPayuMsg') }}
            </p>
            <a
              href="https://wompi.co/"
              target="_blank"
              rel="noreferrer noopener"
            >
              <img
                class="logo-pasarela-wompi"
                src="https://res.cloudinary.com/komerciaacademico/image/upload/c_scale,w_500,q_auto:best,f_auto/v1606335739/Templates%20Modos%20de%20pago/wompi_jxuitu.png"
                alt="wompi"
                border="0"
              />
            </a>
          </li>
        </ul>
      </div>
      <div
        v-if="selectTag === 3 && envios.envio_metodo"
        class="item-content opcenvio"
      >
        <div class="deliverys section">
          <div class="content">
            <h3 class="title-section">
              {{ $t('productdetail_opinionesEnvio') }}
            </h3>
          </div>
          <div
            v-if="envios.envio_metodo === 'precio_ciudad'"
            class="wrapper-method"
          >
            <h4 class="capitalize">
              • {{ envios.envio_metodo.replace('_', ' por ') }}
            </h4>
            <p class="description-method">
              {{ $t('productdetail_opinionesEnvioMsg1') }}
            </p>
          </div>
          <div
            v-if="envios.envio_metodo === 'tarifa_plana'"
            class="wrapper-method"
          >
            <h4 class="capitalize">
              {{ envios.envio_metodo.replace('_', ' ') }}
            </h4>
            <p class="description-method">
              {{ $t('productdetail_opinionesEnvioMsg2') }}
            </p>
            <p class="price">
              {{ $t('cart_precio') }}
              {{
                envios.valor
                  | currency(
                    dataStore.tiendasInfo.paises.codigo,
                    dataStore.tiendasInfo.moneda
                  )
              }}
            </p>
          </div>
          <div v-if="envios.envio_metodo === 'precio'" class="wrapper-method">
            <h4>{{ $t('productdetail_precioTotalCompra') }}</h4>
            <p class="description-method">
              {{ $t('productdetail_precioTotalCompraMsg') }}
            </p>
          </div>
          <div v-if="envios.envio_metodo === 'gratis'" class="wrapper-method">
            <h4>{{ $t('productdetail_gratis') }}</h4>
            <p class="description-method">
              {{ $t('productdetail_gratisMsg') }}
            </p>
          </div>
          <div v-if="envios.envio_metodo === 'sinEnvio'" class="wrapper-method">
            <p class="description-method">Pasas a recoger tu compra</p>
          </div>
          <div
            v-if="envios.envio_metodo === 'sintarifa'"
            class="wrapper-method"
          >
            <p class="description-method">
              El costo del envío no esta definido, este costo lo asume el
              comprador
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import extensions from '@/mixins/elemenTiptap.vue'
import currency from '@/mixins/formatCurrent'
export default {
  components: {
    PluginAddi: () => import('@/components/_commonComponent/addi.vue'),
  },
  filters: {
    capitalize(value) {
      if (!value) {
        return value
      }
      return value
        .toLowerCase()
        .replace(/(?:^|\s)\w/g, (match) => match.toUpperCase())
    },
  },
  mixins: [currency, extensions],
  props: {
    dataStore: {
      type: Object,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
    envio: {
      type: Object,
      required: true,
    },
    settingByTemplate10: {
      type: Array,
      required: true,
    },
    price: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      selectTag: 1,
      contentDescription: '',
    }
  },
  computed: {
    mediospago() {
      return this.dataStore.medioPagos
    },
    activeClass() {
      return this.contentDescription == '' || this.contentDescription == null
    },
    envios() {
      return this.$store.state.envios.valores
    },
  },
  mounted() {
    this.getDescriptionProduct()
  },
  methods: {
    sendIndexTag(value) {
      this.selectTag = value
    },
    async getDescriptionProduct() {
      const { success, data } = await this.$store.dispatch(
        'products/GET_DESCRIPTION_PRODUCTO',
        {
          slug: this.data.slug,
        }
      )
      if (success) {
        this.contentDescription = data?.data ?? ''
      }
      this.sendIndexTag(this.contentDescription ? 1 : 2)
    },
  },
}
</script>
<style scoped>
.editor {
  width: 100%;
}
.editor >>> .el-tiptap-editor > .el-tiptap-editor__content {
  border: none;
  padding: 0px 5px;
  background-color: transparent;
}
.editor >>> .el-tiptap-editor__menu-bubble {
  display: none;
}
.editor >>> .el-tiptap-editor__content h1 {
  font-size: 2em;
  font-family: var(--font-style-1);
}
.editor >>> .el-tiptap-editor__content h2 {
  font-size: 1.5em;
  font-family: var(--font-style-1);
}
.editor >>> .el-tiptap-editor__content h3 {
  font-size: 1.17em;
  font-family: var(--font-style-1);
}
.editor >>> .el-tiptap-editor__content h4 {
  font-size: 1.12em;
  font-family: var(--font-style-1);
}
.editor >>> .el-tiptap-editor__content h5 {
  font-size: 0.83em;
  font-family: var(--font-style-1);
}
.editor >>> .el-tiptap-editor__content p {
  font-family: var(--font-style-1);
}
.editor >>> .el-tiptap-editor__content span {
  font-family: var(--font-style-1);
}
.editor >>> .el-tiptap-editor__content blockquote {
  font-family: var(--font-style-1);
}
.editor >>> .el-tiptap-editor__content code {
  font-family: var(--font-style-1);
}
.editor >>> .el-tiptap-editor__content ul {
  font-family: var(--font-style-1);
}
.editor >>> .el-tiptap-editor__content ol {
  font-family: var(--font-style-1);
}
.editor >>> .el-tiptap-editor__content li {
  font-family: var(--font-style-1);
}
.editor >>> .el-tiptap-editor__content pre {
  font-family: var(--font-style-1);
}
.editor >>> .el-tiptap-editor__content strong {
  font-family: var(--font-style-1);
}
.editor >>> .el-tiptap-editor__content em {
  font-family: var(--font-style-1);
}
.editor >>> .el-tiptap-editor__content s {
  font-family: var(--font-style-1);
}
.editor >>> .el-tiptap-editor__content .image-view__body__image {
  cursor: none;
  pointer-events: none;
}
.editor >>> .el-popper.el-tiptap-image-popper {
  display: none;
}
.tab {
  @apply flex w-auto cursor-pointer flex-col items-center justify-center px-4;
}

.item-content {
  @apply flex w-full flex-col items-start justify-start pb-4;
}
.content_product_description {
  color: var(--color_subtext);
  font-size: 14px;
  font-weight: 400;
  line-height: 1.42857143;
  font-family: var(--font-style-1) !important;
  @apply flex w-full flex-col items-start justify-center;
}
.content_product_description {
  color: var(--color_subtext);
  font-size: 14px;
  font-weight: 400;
  line-height: 1.42857143;
  font-family: var(--font-style-1) !important;
  @apply flex w-full flex-col items-start justify-center;
}
h3 {
  color: var(--color_subtext);
  font-size: 15px;
  font-weight: 600;
  text-transform: uppercase;
  align-self: flex-start;
  font-family: var(--font-style-1) !important;
}
h4 {
  font-family: var(--font-style-1) !important;
  color: var(--color_subtext);
  font-size: 15px;
  font-weight: 600;
  line-height: 1.42857143;
  @apply mb-5 flex w-full flex-col items-start justify-center;
}
li p {
  font-family: var(--font-style-1) !important;
  color: var(--color_subtext);
  font-size: 14px;
  font-weight: 400;
  line-height: 1.4;
  margin-bottom: 15px;
}
.description-method,
.price {
  font-family: var(--font-style-1) !important;
  color: var(--color_subtext);

  font-size: 14px;
  font-weight: 400;
  line-height: 1.4;
  margin-bottom: 15px;
}
img {
  max-width: 300px;
  width: 30%;
  margin-top: 15px;
}
@screen sm {
  .content-opt-tab {
    @apply flex w-full flex-col items-center justify-center;
  }
  .content-tab {
    border-color: var(--border);
    @apply mt-6 flex w-full flex-col items-center justify-center;
  }
  .head-content {
    @apply mb-40 grid w-full grid-cols-1 items-center justify-center gap-2;
  }
  .tittle {
    color: var(--color_subtext);
    font-size: 14px;
    background-color: transparent;
    font-family: var(--font-style-1) !important;
    @apply flex h-40 w-full items-center justify-center font-semibold uppercase transition-all duration-0.2 ease-in;
  }
  .show-select-active {
    background-color: var(--color_gb_tabs);
  }
  .show-select-active .tittle {
    color: var(--color_text_tabs);
  }
}
@media (min-width: 425px) {
  .head-content {
    @apply mb-40 grid grid-cols-3;
  }
  .tittle {
    font-size: 12px;
    @apply text-center;
  }
}
@screen md {
  .content-opt-tab {
    @apply mt-0 flex flex-row items-start justify-start border;
  }
  .head-content {
    @apply mb-0 flex w-full flex-row items-start justify-start;
    border-bottom: 1px solid transparent;
  }
  .head-content {
    @apply mb-0 flex w-6/0 flex-col items-start justify-start gap-0;
  }
  .tab {
    @apply flex w-full items-center justify-start;
  }
  .tittle {
    font-size: 14px;
    @apply h-50 w-full items-center justify-start pl-20 text-center;
  }
  .content-tab {
    border-color: var(--border);
    @apply mt-0 flex w-full flex-row items-start justify-start border transition-all duration-0.2 ease-in;
  }
  .show-select-active {
    background-color: var(--color_gb_tabs);
    @apply w-full border-l-4;
  }
  .show-select-active .tittle {
    color: var(--color_text_tabs);
  }
  .content-tab {
    @apply p-40;
  }
}
@screen lg {
  .head-content {
    width: 400px;
  }
}
</style>
