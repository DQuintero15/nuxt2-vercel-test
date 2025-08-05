<template>
  <div class="content-tab">
    <div class="head-content">
      <div
        v-if="contentDescription"
        class="tab"
        :class="selecttag == 1 ? 'show-select-active' : ''"
        @click="selectTag1"
      >
        <p class="tittle">{{ $t('productdetail_description') }}</p>
      </div>
      <div
        class="tab"
        :class="selecttag == 2 ? 'show-select-active' : ''"
        @click="selectTag2"
      >
        <p class="tittle">{{ $t('productdetail_opcionesPago') }}</p>
      </div>
    </div>
    <div class="content-tab">
      <div v-if="focusbtn1 && contentDescription" class="editor">
        <el-tiptap
          v-model="contentDescription"
          :extensions="extensions"
          :spellcheck="false"
          :readonly="true"
          :charCounterCount="false"
          :tooltip="false"
          :showMenubar="false"
          :bubble="false"
        />
      </div>
      <div v-if="focusbtn2" class="item-content opcpago">
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
                src="https://res.cloudinary.com/komerciaacademico/image/upload/v1639078440/wePay4u/powered_by_z7sgqp.png"
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
                class="logo-pasarela-wompi"
                src="https://res.cloudinary.com/komerciaacademico/image/upload/v1645131256/komerica/tucompra_ss0oys.png"
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
                class="logo-pasarela-wompi"
                src="https://res.cloudinary.com/komerciaacademico/image/upload/v1645131256/komerica/flow_jevnwy.png"
                alt="flow"
                border="0"
              />
            </a>
          </li>
        </ul>
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
      if (value) {
        value = value.toLowerCase()
        return value.replace(/^\w|\s\w/g, (l) => l.toUpperCase())
      }
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
    price: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      medioEnvio: '',
      envioproducto: '',
      selecttag: 1,
      focusbtn1: true,
      focusbtn2: false,
      focusbtn3: false,
      contentDescription: this.data?.info?.descripcion,
    }
  },
  computed: {
    mediospago() {
      return this.dataStore.medioPagos
    },
    activeClass() {
      return !this.data?.description || this.data?.description == null
    },
    envios() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties, vue/no-mutating-props
      this.data.medioEnvio = JSON.parse(this.dataStore.medios_envio.valores)
      return this.data.medioEnvio
    },
  },
  mounted() {
    this.contentDescription ? this.selectTag1() : this.selectTag2()
  },
  methods: {
    selectTag1() {
      this.selecttag = 1
      this.focusbtn1 = true
      this.focusbtn2 = false
      this.focusbtn3 = false
    },
    selectTag2() {
      this.selecttag = 2
      this.focusbtn1 = false
      this.focusbtn2 = true
      this.focusbtn3 = false
    },
    selectTag3() {
      this.selecttag = 3
      this.focusbtn1 = false
      this.focusbtn2 = false
      this.focusbtn3 = true
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
.content-tab {
  border-bottom: 1px solid #ededed;
  @apply w-full flex flex-col justify-center items-center mt-24;
}
.head-content {
  border-bottom: 1px solid #ededed;
  @apply w-full flex flex-row justify-start items-start;
}
.tab {
  @apply w-auto flex flex-col justify-center items-center px-16 cursor-pointer;
}
.show-select-active {
  background-color: #fff;
  border: 1px solid #000;
  border-bottom: 2px solid #000;
}
.tittle {
  font-family: 'Roboto', Helvetica, Arial, sans-serif !important;
  color: #000;
  height: 40px;
  font-size: 15px;
  font-weight: 800;
  /* line-height: 30px; */
  /* text-transform: capitalize; */
  letter-spacing: 1px;
  @apply flex justify-center items-center;
}
.item-content {
  @apply w-full flex flex-col justify-start items-start pb-16;
}

.content_product_description {
  font-family: 'Roboto', Helvetica, Arial, sans-serif !important;
  color: #333333;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.42857143;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}
h3 {
  color: #2c2930;
  font-size: 15px;
  font-weight: 600;
  text-transform: uppercase;
  align-self: flex-start;
  font-family: 'Roboto', Helvetica, Arial, sans-serif !important;
}
h4 {
  font-family: 'Roboto', Helvetica, Arial, sans-serif !important;
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
  font-family: 'Roboto', Helvetica, Arial, sans-serif !important;
  color: #333;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.4;
  margin-bottom: 15px;
}
.description-method {
  font-family: 'Roboto', Helvetica, Arial, sans-serif !important;
  color: #333;
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
</style>
