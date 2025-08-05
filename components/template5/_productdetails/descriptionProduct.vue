<template>
  <div class="description">
    <div v-if="!activeClass && contentDescription" class="left">
      <h3 class="text-desc">
        {{ $t('productdetail_description') }}
      </h3>
      <div class="editor">
        <el-tiptap
          v-model="contentDescription"
          :readonly="true"
          :extensions="extensions"
          :spellcheck="false"
          :tooltip="true"
          :bubble="false"
          :showMenubar="false"
          :charCounterCount="false"
        />
      </div>
    </div>
    <div v-else class="left-empty"></div>
    <div class="right">
      <div class="payments section">
        <div class="content">
          <h3 class="title-section font-bold">
            {{ $t('productdetail_opcionesPago') }}
          </h3>
        </div>
        <p>
          {{ $t('productdetail_opcionesPagoMsg') }}
        </p>
        <ul style="list-style: none">
          <li v-if="mediospago.consignacion == 1">
            <h4 class="title-payment">
              {{ $t('productdetail_consignacionBancaria') }}
            </h4>
            <p class="text-payment">
              {{ $t('productdetail_consignacionBancariaMsg') }}
            </p>
          </li>
          <li v-if="mediospago.contraentrega == 1">
            <h4 class="title-payment">{{ $t('productdetail_PagoContra') }}</h4>
            <p class="text-payment">{{ $t('productdetail_PagoContraMsg') }}</p>
          </li>
          <li v-if="mediospago.convenir == 1">
            <h4 class="title-payment">
              {{ $t('productdetail_pagoConvenir') }}
            </h4>
            <p class="text-payment">
              {{ $t('productdetail_pagoConvenirMsg') }}
            </p>
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
                loading="lazy"
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
            <h4 class="title-payment">
              {{ $t('productdetail_Consignaciondaviplata') }}
            </h4>
            <p class="text-payment">
              {{ $t('productdetail_ConsignaciondaviplataMsg') }}
            </p>
            <img
              loading="lazy"
              class="logo-pasarela-daviplata"
              src="https://res.cloudinary.com/komerciaacademico/image/upload/c_scale,w_500,q_auto:best,f_auto/v1606333767/Templates%20Modos%20de%20pago/5c89c897e1917d9209a762af_davi_qn90y9.png"
              alt="logo daviPlata"
            />
          </li>
          <li v-if="mediospago.efecty == 1">
            <h4 class="title-payment">
              {{ $t('productdetail_ConsignacionEfecty') }}
            </h4>
            <p class="text-payment">
              {{ $t('productdetail_ConsignacionEfectyMsg') }}
            </p>
            <a
              href="https://www.efecty.com.co/web/"
              target="_blank"
              rel="noreferrer noopener"
              class="cursor_point"
            >
              <img
                loading="lazy"
                class="logo-pasarela-efecty"
                src="https://res.cloudinary.com/komerciaacademico/image/upload/c_scale,w_500,q_auto:best,f_auto/v1606333023/Templates%20Modos%20de%20pago/Efecty-png_q3fvog.png"
                alt="logo efecty"
              />
            </a>
          </li>
          <li v-if="mediospago.mercado_pago == 1">
            <h4 class="title-payment">
              {{ $t('productdetail_PasarelaMercado') }}
            </h4>
            <p class="text-payment">
              {{ $t('productdetail_PasarelaMercadoMsg') }}
            </p>
            <a
              href="https://www.mercadopago.com"
              target="_blank"
              rel="noreferrer noopener"
              class="cursor_point"
            >
              <img
                loading="lazy"
                class="logo-pasarela-daviplata"
                src="https://res.cloudinary.com/komerciaacademico/image/upload/c_scale,w_500,q_auto:best,f_auto/v1606331948/Templates%20Modos%20de%20pago/mercadopago_jyalpa.png"
                alt="logo mercadopago"
              />
            </a>
          </li>
          <li v-if="mediospago.nequi == 1">
            <h4 class="title-payment">
              {{ $t('productdetail_Consignacionnequi') }}
            </h4>
            <p class="text-payment">
              {{ $t('productdetail_ConsignacionnequiMsg') }}
            </p>
            <a
              href="https://www.nequi.com.co/"
              target="_blank"
              rel="noreferrer noopener"
              class="cursor_point"
            >
              <img
                loading="lazy"
                class="logo-pasarela-daviplata"
                src="https://res.cloudinary.com/komerciaacademico/image/upload/c_scale,w_500,q_auto:best,f_auto/v1606333553/Templates%20Modos%20de%20pago/Nequi_by_Bancolombia_hxhkhb.png"
                alt="logo nequi"
              />
            </a>
          </li>
          <li v-if="mediospago.payco == 1">
            <h4 class="title-payment">
              {{ $t('productdetail_PasarelaEpayco') }}
            </h4>
            <p class="text-payment">
              {{ $t('productdetail_PasarelaEpaycoMsg') }}
            </p>
            <img
              loading="lazy"
              class="logo-pasarela-payco"
              src="https://res.cloudinary.com/komercia-components/image/upload/c_scale,w_500,q_auto:best,f_auto/v1579296851/assets/pasarela-epayco.png"
              alt="Pasarela de pagos epayco"
            />
          </li>
          <li v-if="mediospago.payu == 1">
            <h4 class="title-payment">
              {{ $t('productdetail_PasarelaPayu') }}
            </h4>
            <p class="text-payment">
              {{ $t('productdetail_PasarelaPayuMsg') }}
            </p>
            <a
              href="https://www.payulatam.com/co/"
              target="_blank"
              rel="noreferrer noopener"
            >
              <img
                loading="lazy"
                class="logo-pasarela-payu"
                src="https://ecommerce.payulatam.com/logos/PayU_CO.png"
                alt="PayU"
                border="0"
              />
            </a>
          </li>
          <li v-if="mediospago.wompi == 1">
            <h4 class="title-payment">
              {{ $t('productdetail_Consignacionwompi') }}
            </h4>
            <p class="text-payment">
              {{ $t('productdetail_PasarelaPayuMsg') }}
            </p>
            <a
              href="https://wompi.co/"
              target="_blank"
              rel="noreferrer noopener"
            >
              <img
                loading="lazy"
                class="logo-pasarela-wompi"
                src="https://res.cloudinary.com/komerciaacademico/image/upload/c_scale,w_500,q_auto:best,f_auto/v1606335739/Templates%20Modos%20de%20pago/wompi_jxuitu.png"
                alt="wompi"
                border="0"
              />
            </a>
          </li>
          <li v-if="mediospago.wepay4u == 1">
            <h4 class="title-payment">WePay4U</h4>
            <p class="text-payment">
              {{ $t('text_pago_WePay4U') }}
            </p>
            <a
              href="https://wepay4u.com/"
              target="_blank"
              rel="noreferrer noopener"
            >
              <img
                loading="lazy"
                class="logo-pasarela-wompi"
                src="https://res.cloudinary.com/komerciaacademico/image/upload/v1639078440/wePay4u/powered_by_z7sgqp.png"
                alt="wePay4u"
                border="0"
              />
            </a>
          </li>
          <li v-if="mediospago.tu_compra == 1">
            <h4 class="title-payment">Tucompra</h4>
            <p class="text-payment">
              {{ $t('text_pago_Tucompra') }}
            </p>
            <a
              href="https://tucompra.com.co/"
              target="_blank"
              rel="noreferrer noopener"
            >
              <img
                loading="lazy"
                class="logo-pasarela-wompi"
                src="https://res.cloudinary.com/komerciaacademico/image/upload/v1645131256/komerica/tucompra_ss0oys.png"
                alt="tu_compra"
                border="0"
              />
            </a>
          </li>
          <li v-if="mediospago.flow == 1">
            <h4 class="title-payment">Flow</h4>
            <p class="text-payment">
              {{ $t('text_pago_flowInfo') }}
            </p>
            <a
              href="https://www.flow.cl/"
              target="_blank"
              rel="noreferrer noopener"
            >
              <img
                loading="lazy"
                class="logo-pasarela-wompi"
                src="https://res.cloudinary.com/komerciaacademico/image/upload/v1645131256/komerica/flow_jevnwy.png"
                alt="flow"
                border="0"
              />
            </a>
          </li>
        </ul>
      </div>
      <div class="line"></div>
      <div v-if="envios.envio_metodo" class="deliverys section">
        <div class="content">
          <h3 class="title-section font-bold">
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
          <p class="description-method">{{ $t('productdetail_gratisMsg') }}</p>
        </div>
        <div v-if="envios.envio_metodo === 'sinEnvio'" class="wrapper-method">
          <p class="description-method">Pasas a recoger tu compra</p>
        </div>
        <div v-if="envios.envio_metodo === 'sintarifa'" class="wrapper-method">
          <p class="description-method">
            El costo del envío no esta definido, este costo lo asume el
            comprador
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import extensions from '@/mixins/elemenTiptap.vue'
import currency from '@/mixins/formatCurrent'
export default {
  name: 'Ko5DescriptionProduct',
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
.description {
  display: flex;
  width: 100%;
  border-bottom: 1px solid rgba(127, 127, 139, 0.342);
}
.description div {
  /* color: var(--color_subtext); */
  color: rgba(21, 20, 57, 0.541);
  line-height: 1.5;
}
.left {
  flex: 2;
  width: 100%;
  display: flex;
  flex-direction: column;
  /* margin-right: 25px; */
  padding-bottom: 10px;
  /* overflow: hidden; */
}
.left-empty {
  flex: 2;
  width: 100%;
  display: flex;
  padding-bottom: 10px;
}
.right {
  flex: 1;
  display: flex;
  width: 100%;
  flex-direction: column;
  padding-bottom: 10px;
  /* border-left: 1px solid var(--color_border); */
  border-left: 1px solid rgba(127, 127, 139, 0.342);
}
.title-section {
  color: rgba(21, 20, 57, 0.541);
  /* color: var(--color_subtext); */
  font-size: 16px;
  text-transform: uppercase;
  align-self: flex-start;
}
.right img {
  max-width: 320px;
  width: 100%;
  margin-top: 15px;
}
.section {
  margin-left: 25px;
  box-sizing: border-box;
  margin-top: 20px;
}
.text-desc {
  color: rgba(21, 20, 57, 0.541);
  /* color: var(--color_subtext); */
  font-size: 15px;
  text-transform: uppercase;
  align-self: flex-start;
  margin-top: 20px;
}
.wrapper-comments {
  border-top: 1px solid rgba(127, 127, 139, 0.342);
  width: 100%;
}
.title-payment {
  margin-top: 15px;
  font-weight: bold;
  color: var(--color_description);
  /* color: var(--color_subtext); */
  margin-bottom: 5px;
  font-family: var(--font-style-3);
}
.text-payment {
  line-height: 1.4;
  font-size: 14px;
  font-family: var(--font-style-3);
}
.icon {
  width: 50px;
  vertical-align: middle;
  margin-bottom: 10px;
  align-self: flex-start;
}
.content {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.payments {
  margin-bottom: 20px;
}
.line {
  /* border-top: 1px solid var(--color_border); */
  border-top: 1px solid rgba(127, 127, 139, 0.342);
  width: 100%;
}
.deliverys {
  margin-top: 20px;
  margin-bottom: 20px;
}
.stage {
  display: flex;
  border-left: 0;
  flex: 1;
}
.logo-pasarela {
  width: 160px !important;
}
.logo-pasarela-daviplata {
  width: 120px !important;
}
.logo-pasarela-efecty {
  width: 100px !important;
}
.logo-pasarela-wompi {
  width: 220px !important;
}
.logo-pasarela-payu {
  width: 300px !important;
}
.logo-pasarela-payco {
  width: 280px !important;
}
.capitalize {
  /* text-transform: capitalize; */
  font-weight: 600 !important;
}
.description-method {
  line-height: 1.4;
  font-size: 14px;
}
.price {
  margin-top: 10px;
  font-size: 14px;
}
.medios-mercadopago {
  width: 100%;
  display: block;
  border-radius: 4px;
}
.wrapper-comments-responsive {
  display: none;
}
.line-comments {
  display: none;
}
.cursor_point {
  cursor: pointer;
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

@media (max-width: 810px) {
  .left {
    margin-right: 15px;
  }
}
@media (max-width: 768px) {
  .description {
    display: flex;
    width: 100%;
    flex-direction: column;
    margin-right: 0px;
    margin-left: 0px;
    margin-bottom: 20px;
  }
  .section {
    margin-left: 0px;
  }
  .left {
    margin-right: 15px;
    margin-right: 0px;
  }
  .left-empty {
    flex: 0;
    width: 100%;
    display: flex;
    padding-bottom: 10px;
  }
  .right {
    border-left: 0px;
  }
  .wrapper-comments-responsive {
    display: initial;
  }
  .wrapper-comments {
    display: none;
  }
  .line-comments {
    display: initial;
    border-top: 1px solid rgba(127, 127, 139, 0.342);
    width: 100%;
  }
}
@media (max-width: 725px) {
  .editor >>> .el-tiptap-editor > .el-tiptap-editor__content {
    padding: 0px 15px;
  }
  .description {
    margin-bottom: 0px;
  }
  .right {
    border-left: 0px;
  }
  .text-desc {
    padding-right: 15px;
    padding-left: 15px;
  }
  .payments {
    /* border-top: 1px solid var(--color_border); */
    border-top: 1px solid rgba(127, 127, 139, 0.342);
    margin-bottom: 10px;
    padding-right: 15px;
    padding-left: 15px;
  }
  .section {
    margin-left: 0px;
    margin-top: 0px;
    padding-top: 10px;
  }
  .deliverys {
    margin-top: 10px;
    margin-bottom: 10px;
    padding-right: 15px;
    padding-left: 15px;
  }
}
</style>
