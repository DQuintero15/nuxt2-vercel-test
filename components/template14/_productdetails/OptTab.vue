<template>
  <div
    class="content-opt-tab"
    :style="[
      template === 14 || template === 16
        ? settingByTemplate[0].settingsGeneral
        : settingByTemplate[0].settingGeneral,
      settingByTemplate[0].detailsProducts,
      {
        '--font-style-1':
          settingByTemplate[0][
            template === 14 || template === 16
              ? 'settingsGeneral'
              : 'settingGeneral'
          ][template === 14 ? 'fount_1' : 'font'] || 'Poppins',
      },
    ]"
  >
    <el-collapse v-model="activeNames">
      <el-collapse-item
        v-if="contentDescription"
        :title="$t('productdetail_description')"
        name="1"
        class="border-t"
        :style="`color: ${settingByTemplate[0].detailsProducts.color_text}; border-color:${settingByTemplate[0].detailsProducts.color_border}`"
      >
        <div class="editor">
          <el-tiptap
            v-model="contentDescription"
            :extensions="extensions"
            :spellcheck="false"
            :readonly="true"
            :tooltip="false"
            :bubble="false"
            :charCounterCount="false"
            :showMenubar="false"
          />
        </div>
      </el-collapse-item>
      <el-collapse-item
        :title="$t('productdetail_opcionesPago')"
        name="2"
        class="border-t"
        :style="`color: ${settingByTemplate[0].detailsProducts.color_text}; border-color:${settingByTemplate[0].detailsProducts.color_border}`"
      >
        <div
          class="grid w-full grid-cols-1 items-start justify-start gap-4 pb-4 md:grid-cols-2"
        >
          <div v-if="mediospago.consignacion == 1">
            <h4
              :style="`color: ${settingByTemplate[0].detailsProducts.color_text};`"
            >
              {{ $t('productdetail_consignacionBancaria') }}
            </h4>
            <p
              :style="`color: ${settingByTemplate[0].detailsProducts.color_subtext};`"
            >
              {{ $t('productdetail_consignacionBancariaMsg') }}
            </p>
          </div>
          <div v-if="mediospago.contraentrega == 1">
            <h4
              :style="`color: ${settingByTemplate[0].detailsProducts.color_text};`"
            >
              {{ $t('productdetail_PagoContra') }}
            </h4>
            <p
              :style="`color: ${settingByTemplate[0].detailsProducts.color_subtext};`"
            >
              {{ $t('productdetail_PagoContraMsg') }}
            </p>
          </div>
          <div v-if="mediospago.convenir == 1">
            <h4
              :style="`color: ${settingByTemplate[0].detailsProducts.color_text};`"
            >
              {{ $t('productdetail_pagoConvenir') }}
            </h4>
            <p
              :style="`color: ${settingByTemplate[0].detailsProducts.color_subtext};`"
            >
              {{ $t('productdetail_pagoConvenirMsg') }}
            </p>
          </div>

          <!-- <div v-if="mediospago.credibanco == 1">
            <h4
              :style="`color: ${settingByTemplate[0].detailsProducts.color_text};`"
            >
              {{ $t('productdetail_ConsignacionCredibanco') }}
            </h4>
            <p
              :style="`color: ${settingByTemplate[0].detailsProducts.color_subtext};`"
            >
              {{ $t('productdetail_ConsignacionCredibancoMsg') }}
            </p>
            <a
              href="https://www.credibanco.com/"
              target="_blank"
              rel="noreferrer noopener"
              class="cursor_point"
            >
              <img
                src="https://res.cloudinary.com/komerciaacademico/image/upload/c_scale,w_500,q_auto:best,f_auto/v1606335270/Templates%20Modos%20de%20pago/Credibanco_lprsof.png"
                alt="logo Credibanco"
              />
            </a>
          </div> -->
          <PluginAddi
            :more-details="true"
            :status="mediospago.addi"
            :price="price"
            :data-store="dataStore"
          />
          <div v-if="mediospago.daviplata == 1">
            <h4
              :style="`color: ${settingByTemplate[0].detailsProducts.color_text};`"
            >
              {{ $t('productdetail_Consignaciondaviplata') }}
            </h4>
            <p
              :style="`color: ${settingByTemplate[0].detailsProducts.color_subtext};`"
            >
              {{ $t('productdetail_ConsignaciondaviplataMsg') }}
            </p>
            <img
              src="https://res.cloudinary.com/komerciaacademico/image/upload/c_scale,w_500,q_auto:best,f_auto/v1606333767/Templates%20Modos%20de%20pago/5c89c897e1917d9209a762af_davi_qn90y9.png"
              alt="logo daviPlata"
            />
          </div>

          <div v-if="mediospago.efecty == 1">
            <h4
              :style="`color: ${settingByTemplate[0].detailsProducts.color_text};`"
            >
              {{ $t('productdetail_ConsignacionEfecty') }}
            </h4>
            <p
              :style="`color: ${settingByTemplate[0].detailsProducts.color_subtext};`"
            >
              {{ $t('productdetail_ConsignacionEfectyMsg') }}
            </p>
            <a
              href="https://www.efecty.com.co/web/"
              target="_blank"
              rel="noreferrer noopener"
              class="cursor_point"
            >
              <img
                src="https://res.cloudinary.com/komerciaacademico/image/upload/c_scale,w_500,q_auto:best,f_auto/v1606333023/Templates%20Modos%20de%20pago/Efecty-png_q3fvog.png"
                alt="logo efecty"
              />
            </a>
          </div>
          <div v-if="mediospago.mercado_pago == 1">
            <h4
              :style="`color: ${settingByTemplate[0].detailsProducts.color_text};`"
            >
              {{ $t('productdetail_PasarelaMercado') }}
            </h4>
            <p
              :style="`color: ${settingByTemplate[0].detailsProducts.color_subtext};`"
            >
              {{ $t('productdetail_PasarelaMercadoMsg') }}
            </p>
            <a
              href="https://www.mercadopago.com"
              target="_blank"
              rel="noreferrer noopener"
              class="cursor_point"
            >
              <img
                src="https://res.cloudinary.com/komerciaacademico/image/upload/c_scale,w_500,q_auto:best,f_auto/v1606331948/Templates%20Modos%20de%20pago/mercadopago_jyalpa.png"
                alt="logo mercadopago"
              />
            </a>
          </div>
          <div v-if="mediospago.nequi == 1">
            <h4
              :style="`color: ${settingByTemplate[0].detailsProducts.color_text};`"
            >
              {{ $t('productdetail_Consignacionnequi') }}
            </h4>
            <p
              :style="`color: ${settingByTemplate[0].detailsProducts.color_subtext};`"
            >
              {{ $t('productdetail_ConsignacionnequiMsg') }}
            </p>
            <a
              href="https://www.nequi.com.co/"
              target="_blank"
              rel="noreferrer noopener"
              class="cursor_point"
            >
              <img
                src="https://res.cloudinary.com/komerciaacademico/image/upload/c_scale,w_500,q_auto:best,f_auto/v1606333553/Templates%20Modos%20de%20pago/Nequi_by_Bancolombia_hxhkhb.png"
                alt="logo nequi"
              />
            </a>
          </div>
          <div v-if="mediospago.payco == 1">
            <h4
              :style="`color: ${settingByTemplate[0].detailsProducts.color_text};`"
            >
              {{ $t('productdetail_PasarelaEpayco') }}
            </h4>
            <p
              :style="`color: ${settingByTemplate[0].detailsProducts.color_subtext};`"
            >
              {{ $t('productdetail_PasarelaEpaycoMsg') }}
            </p>
            <img
              src="https://res.cloudinary.com/komercia-components/image/upload/c_scale,w_500,q_auto:best,f_auto/v1579296851/assets/pasarela-epayco.png"
              alt="Pasarela de pagos epayco"
            />
          </div>

          <div v-if="mediospago.payu == 1">
            <h4
              :style="`color: ${settingByTemplate[0].detailsProducts.color_text};`"
            >
              {{ $t('productdetail_PasarelaPayu') }}
            </h4>
            <p
              :style="`color: ${settingByTemplate[0].detailsProducts.color_subtext};`"
            >
              {{ $t('productdetail_PasarelaPayuMsg') }}
            </p>
            <a
              href="https://www.payulatam.com/co/"
              target="_blank"
              rel="noreferrer noopener"
            >
              <img
                src="https://ecommerce.payulatam.com/logos/PayU_CO.png"
                alt="PayU"
                border="0"
              />
            </a>
          </div>
          <div v-if="mediospago.wompi == 1">
            <h4
              :style="`color: ${settingByTemplate[0].detailsProducts.color_text};`"
            >
              {{ $t('productdetail_Consignacionwompi') }}
            </h4>
            <p
              :style="`color: ${settingByTemplate[0].detailsProducts.color_subtext};`"
            >
              {{ $t('productdetail_PasarelaPayuMsg') }}
            </p>
            <a
              href="https://wompi.co/"
              target="_blank"
              rel="noreferrer noopener"
            >
              <img
                src="https://res.cloudinary.com/komerciaacademico/image/upload/c_scale,w_500,q_auto:best,f_auto/v1606335739/Templates%20Modos%20de%20pago/wompi_jxuitu.png"
                alt="wompi"
                border="0"
              />
            </a>
          </div>
          <div v-if="mediospago.wepay4u == 1">
            <h4
              :style="`color: ${settingByTemplate[0].detailsProducts.color_text};`"
            >
              WePay4U
            </h4>
            <p
              :style="`color: ${settingByTemplate[0].detailsProducts.color_subtext};`"
            >
              {{ $t('text_pago_WePay4U') }}
            </p>
            <a
              href="https://wepay4u.com/"
              target="_blank"
              rel="noreferrer noopener"
            >
              <img
                src="https://res.cloudinary.com/komerciaacademico/image/upload/c_scale,w_500,q_auto:best,f_auto/v1639078440/wePay4u/powered_by_z7sgqp.png"
                alt="wePay4u"
                border="0"
              />
            </a>
          </div>
          <div v-if="mediospago.tu_compra == 1">
            <h4
              :style="`color: ${settingByTemplate[0].detailsProducts.color_text};`"
            >
              Tucompra
            </h4>
            <p
              :style="`color: ${settingByTemplate[0].detailsProducts.color_subtext};`"
            >
              {{ $t('text_pago_Tucompra') }}
            </p>
            <a
              href="https://tucompra.com.co/"
              target="_blank"
              rel="noreferrer noopener"
            >
              <img
                src="https://res.cloudinary.com/komerciaacademico/image/upload/c_scale,w_500,q_auto:best,f_auto/v1645131256/komerica/tucompra_ss0oys.png"
                alt="tu_compra"
                border="0"
              />
            </a>
          </div>
          <div v-if="mediospago.flow == 1">
            <h4
              :style="`color: ${settingByTemplate[0].detailsProducts.color_text};`"
            >
              Flow
            </h4>
            <p
              :style="`color: ${settingByTemplate[0].detailsProducts.color_subtext};`"
            >
              {{ $t('text_pago_flowInfo') }}
            </p>
            <a
              href="https://www.flow.cl/"
              target="_blank"
              rel="noreferrer noopener"
            >
              <img
                src="https://res.cloudinary.com/komerciaacademico/image/upload/c_scale,w_500,q_auto:best,f_auto/v1645131256/komerica/flow_jevnwy.png"
                alt="flow"
                border="0"
              />
            </a>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item
        v-if="envios.envio_metodo"
        :title="$t('productdetail_opinionesEnvio')"
        name="3"
        class="border-t"
        :style="`color: ${settingByTemplate[0].detailsProducts.color_text}; border-color:${settingByTemplate[0].detailsProducts.color_border}`"
      >
        <div class="flex w-full flex-col items-start justify-start pb-4">
          <div v-if="envios.envio_metodo === 'precio_ciudad'">
            <h4
              :style="`color: ${settingByTemplate[0].detailsProducts.color_text};`"
            >
              • {{ envios.envio_metodo.replace('_', ' por ') }}
            </h4>
            <p
              :style="`color: ${settingByTemplate[0].detailsProducts.color_subtext};`"
            >
              {{ $t('productdetail_opinionesEnvioMsg1') }}
            </p>
          </div>
          <div v-if="envios.envio_metodo === 'tarifa_plana'">
            <h4
              :style="`color: ${settingByTemplate[0].detailsProducts.color_text};`"
            >
              • {{ envios.envio_metodo.replace('_', ' ') }}
            </h4>
            <p
              :style="`color: ${settingByTemplate[0].detailsProducts.color_subtext};`"
            >
              {{ $t('productdetail_opinionesEnvioMsg2') }}
            </p>
            <p
              class="price"
              :style="`color: ${settingByTemplate[0].detailsProducts.color_subtext};`"
            >
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
          <div v-if="envios.envio_metodo === 'precio'">
            <h4
              :style="`color: ${settingByTemplate[0].detailsProducts.color_text};`"
            >
              • {{ $t('productdetail_precioTotalCompra') }}
            </h4>
            <p
              :style="`color: ${settingByTemplate[0].detailsProducts.color_subtext};`"
            >
              {{ $t('productdetail_precioTotalCompraMsg') }}
            </p>
          </div>
          <div v-if="envios.envio_metodo === 'gratis'">
            <h4
              :style="`color: ${settingByTemplate[0].detailsProducts.color_text};`"
            >
              • {{ $t('productdetail_gratis') }}
            </h4>
            <p
              :style="`color: ${settingByTemplate[0].detailsProducts.color_subtext};`"
            >
              {{ $t('productdetail_gratisMsg') }}
            </p>
          </div>
          <p
            v-if="envios.envio_metodo === 'sinEnvio'"
            :style="`color: ${settingByTemplate[0].detailsProducts.color_text};`"
          >
            Pasas a recoger tu compra
          </p>
          <p
            v-if="envios.envio_metodo === 'sintarifa'"
            :style="`color: ${settingByTemplate[0].detailsProducts.color_text};`"
          >
            El costo del envío no esta definido, este costo lo asume el
            comprador
          </p>
        </div>
      </el-collapse-item>
    </el-collapse>
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
      if (value) {
        value = value.toLowerCase()
        return value.replace(/^\w|\s\w/g, (l) => l.toUpperCase())
      }
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
    settingByTemplate: {
      type: Array,
      required: true,
    },
    price: {
      type: Object,
      required: true,
    },
    template: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      activeNames: ['1'],
      contentDescription: '',
    }
  },
  computed: {
    mediospago() {
      return this.dataStore.medioPagos
    },
    // activeClass() {
    //   return this.contentDescription == '' || this.contentDescription == null
    // },
    envios() {
      return this.$store.state.envios.valores
    },
  },
  mounted() {
    this.getDescriptionProduct()
  },
  methods: {
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
      this.contentDescription
        ? (this.activeNames = ['1'])
        : (this.activeNames = ['2'])
    },
  },
}
</script>
<style scoped>
.editor {
  width: 100%;
  color: transparent;
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
.content-opt-tab >>> .el-collapse {
  border-top: transparent;
  border-bottom: transparent;
  @apply w-full;
}
.content-opt-tab >>> .el-collapse-item__wrap {
  will-change: height;
  background-color: transparent;
  border-bottom: transparent;
}
.content-opt-tab >>> .el-collapse-item__header {
  font-size: 16px;
  font-family: var(--font-style-1) !important;
  color: currentColor;
  background-color: transparent;
  border-bottom: transparent;
  @apply font-semibold;
}
.content-opt-tab >>> .el-collapse-item__header.is-active {
  border-bottom: none;
}
.content-opt-tab >>> .el-collapse-item__arrow {
  color: currentColor;
}

h3 {
  color: currentColor;
  font-size: 15px;
  font-weight: 600;
  text-transform: uppercase;
  align-self: flex-start;
  font-family: var(--font-style-1) !important;
}
h4 {
  font-family: var(--font-style-1) !important;
  color: currentColor;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.42857143;
  @apply mb-5 flex w-full flex-col items-start justify-center;
}
li p {
  font-family: var(--font-style-1) !important;
  color: currentColor;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.4;
  margin-bottom: 15px;
}
.description-method,
.price {
  font-family: var(--font-style-1) !important;
  color: currentColor;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.4;
  margin-bottom: 15px;
}
img {
  @apply w-full max-w-[250px] py-12;
}
@screen sm {
  .content-opt-tab {
    @apply flex w-full flex-col items-center justify-center;
  }
}
@screen md {
  .content-opt-tab {
    @apply mt-0 flex flex-col items-start justify-start;
  }
}
</style>
