<template>
  <div class="content-tab" :style="settingByGeneral">
    <el-tabs class="w-full">
      <el-tab-pane
        v-if="contentDescription"
        :label="$t('productdetail_description')"
      >
        <div class="editor">
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
      </el-tab-pane>
      <el-tab-pane :label="$t('productdetail_opcionesPago')">
        <div class="item-content">
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
              >
                <img
                  src="https://res.cloudinary.com/komerciaacademico/image/upload/c_scale,w_500,q_auto:best,f_auto/v1606335270/Templates%20Modos%20de%20pago/Credibanco_lprsof.png"
                  alt="logo Credibanco"
                />
              </a>
            </li> -->
            <PluginAddi
              :more-details="true"
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
              >
                <img
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
              >
                <img
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
              >
                <img
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
                  src="https://res.cloudinary.com/komerciaacademico/image/upload/c_scale,w_500,q_auto:best,f_auto/v1606335739/Templates%20Modos%20de%20pago/wompi_jxuitu.png"
                  alt="wompi"
                  border="0"
                />
              </a>
            </li>
            <li v-if="mediospago.wepay4u == 1">
              <h4>WePay4U</h4>
              <p>
                {{ $t('text_pago_WePay4U') }}
              </p>
              <a
                href="https://wepay4u.com/"
                target="_blank"
                rel="noreferrer noopener"
              >
                <img
                  class="logo-pasarela-wompi"
                  src="https://res.cloudinary.com/komerciaacademico/image/upload/c_scale,w_500,q_auto:best,f_auto/v1639078440/wePay4u/powered_by_z7sgqp.png"
                  alt="wePay4u"
                  border="0"
                />
              </a>
            </li>
            <li v-if="mediospago.tu_compra == 1">
              <h4>Tucompra</h4>
              <p>
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
            </li>
            <li v-if="mediospago.flow == 1">
              <h4>Flow</h4>
              <p>
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
            </li>
          </ul>
        </div>
      </el-tab-pane>
      <el-tab-pane
        v-if="envios.envio_metodo"
        :label="$t('productdetail_opinionesEnvio')"
      >
        <div class="item-content">
          <div v-if="envios.envio_metodo === 'precio_ciudad'">
            <h4>{{ envios.envio_metodo.replace('_', ' por ') }}</h4>
            <p class="description-method">
              {{ $t('productdetail_opinionesEnvioMsg1') }}
            </p>
          </div>
          <div v-if="envios.envio_metodo === 'tarifa_plana'">
            <h4>
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
          <div v-if="envios.envio_metodo === 'precio'">
            <h4>{{ $t('productdetail_precioTotalCompra') }}</h4>
            <p class="description-method">
              {{ $t('productdetail_precioTotalCompraMsg') }}
            </p>
          </div>
          <div v-if="envios.envio_metodo === 'gratis'">
            <h4>{{ $t('productdetail_gratis') }}</h4>
            <p class="description-method">
              {{ $t('productdetail_gratisMsg') }}
            </p>
          </div>
          <h4 v-if="envios.envio_metodo === 'sinEnvio'">
            Pasas a recoger tu compra
          </h4>
          <p
            v-if="envios.envio_metodo === 'sintarifa'"
            class="description-method"
          >
            El costo del envío no esta definido, este costo lo asume el
            comprador
          </p>
        </div>
      </el-tab-pane>
    </el-tabs>
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
  mixins: [extensions, currency],
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
    settingByGeneral: { type: Object, default: null },
    price: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      contentDescription: '',
    }
  },
  computed: {
    mediospago() {
      return this.dataStore.medioPagos
    },
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
    },
  },
}
</script>
<style scoped>
.content-tab {
  border-bottom: 1px solid #ededed;
  @apply w-full flex flex-col justify-center items-center mt-24;
}

.item-content {
  @apply w-full flex flex-col justify-start items-start pb-16;
}

.content-tab >>> .el-tabs__item {
  font-family: var(--font-style-2);
  color: #303030;
}
.content-tab >>> .el-tabs__item.is-active {
  color: var(--hover_text);
}
.content-tab >>> .el-tabs__item:hover {
  color: var(--hover_text);
  cursor: pointer;
}
.content-tab >>> .el-tabs__active-bar {
  background-color: var(--hover_text);
}
h3 {
  color: #2c2930;
  font-size: 15px;
  font-weight: 600;
  text-transform: uppercase;
  align-self: flex-start;
  font-family: var(--font-style-2);
}
h4 {
  font-family: var(--font-style-2);
  color: #2c2930;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.42857143;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 5px;
}
li p {
  font-family: var(--font-style-2);
  color: #333;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.4;
  margin-bottom: 15px;
}
.description-method {
  font-family: var(--font-style-2);
  color: #333;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.4;
  margin-bottom: 15px;
}
img {
  @apply py-12 w-full max-w-[250px];
}
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
  font-family: var(--font-style-2);
}
.editor >>> .el-tiptap-editor__content h2 {
  font-size: 1.5em;
  font-family: var(--font-style-2);
}
.editor >>> .el-tiptap-editor__content h3 {
  font-size: 1.17em;
  font-family: var(--font-style-2);
}
.editor >>> .el-tiptap-editor__content h4 {
  font-size: 1.12em;
  font-family: var(--font-style-2);
}
.editor >>> .el-tiptap-editor__content h5 {
  font-size: 0.83em;
  font-family: var(--font-style-2);
}
.editor >>> .el-tiptap-editor__content p {
  font-family: var(--font-style-2);
}
.editor >>> .el-tiptap-editor__content span {
  font-family: var(--font-style-2);
}
.editor >>> .el-tiptap-editor__content blockquote {
  font-family: var(--font-style-2);
}
.editor >>> .el-tiptap-editor__content code {
  font-family: var(--font-style-2);
}
.editor >>> .el-tiptap-editor__content ul {
  font-family: var(--font-style-2);
}
.editor >>> .el-tiptap-editor__content ol {
  font-family: var(--font-style-2);
}
.editor >>> .el-tiptap-editor__content li {
  font-family: var(--font-style-2);
}
.editor >>> .el-tiptap-editor__content pre {
  font-family: var(--font-style-2);
}
.editor >>> .el-tiptap-editor__content strong {
  font-family: var(--font-style-2);
}
.editor >>> .el-tiptap-editor__content em {
  font-family: var(--font-style-2);
}
.editor >>> .el-tiptap-editor__content s {
  font-family: var(--font-style-2);
}
.editor >>> .el-tiptap-editor__content .image-view__body__image {
  cursor: none;
  pointer-events: none;
}
.editor >>> .el-popper.el-tiptap-image-popper {
  display: none;
}
</style>
