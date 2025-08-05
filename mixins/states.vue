<script>
export default {
  name: 'StateInformation',
  computed: {
    shippingState() {
      return [
        {
          id: 1,
          state: this.$t('mcompra_pendiente'),
          color: '#FFA801',
        },
        {
          id: 2,
          state: this.$t('mcompra_enEmpaque'),
          color: '#FFA801',
        },
        {
          id: 3,
          state: this.$t('mcompra_enTransito'),
          color: '#4429AE',
        },
        {
          id: 4,
          state: this.$t('mcompra_devuelto'),
          color: '#0000FF',
        },
        {
          id: 5,
          state: this.$t('mcompra_entregado'),
          color: '#30C490',
        },
        {
          id: 6,
          state: this.$t('mcompra_cancelada'),
          color: '#EB4D4B',
        },
      ]
    },
    channelBuy() {
      return [
        {
          name: 'WhatsApp',
          color: '#128C7E',
        },
        {
          name: 'Instagram',
          color: '#C13584',
        },
        {
          name: 'Facebook',
          color: '#3b5998',
        },
        {
          name: 'Punto físico',
          color: '#f14b5a',
        },
        {
          name: 'Checkout',
          color: '#4429b4',
        },
        {
          name: 'Shopify',
          color: '#95bf47',
        },
        {
          name: 'Checkout - Hoko',
          color: '#0059f7',
        },
        {
          name: 'Hoko',
          color: '#0059f7',
        },
      ]
    },
    payments() {
      return [
        {
          id: '1',
          tag: 'payco',
          title: 'mcompra_pTarjetaCredito',
          description: 'Pago realizado por ePayco',
        },
        {
          id: '2',
          tag: 'payco',
          title: 'mcompra_pPase1',
          description: 'Paga con tu cuenta bancaria o tarjeta débito',
        },
        {
          id: '3',
          tag: 'payco',
          title: 'mcompra_pPagoEfectivo',
          description: 'Mas de 14.000 puntos en todo el país',
        },
        {
          id: '4',
          tag: 'consignacion',
          title: 'mcompra_pConsigancionBancaria',
          description: 'Transferencia o consignación a nuestra cuenta bancaria',
        },
        {
          id: '5',
          tag: 'efecty',
          title: 'mcompra_pGiroEfecty',
          description: 'Transferencia o consignación a nuestra cuenta',
        },
        {
          id: '6',
          tag: 'tienda',
          title: 'mcompra_pRecogerTienda',
          description:
            'Si estas cerca a nuestro negocio, acércate a realizar el pago y recoger tu producto. Escribe abajo en los comentarios cuando vendrías a nuestra tienda para tener tu compra lista.',
        },
        {
          id: '7',
          tag: 'convenir',
          title: 'mcompra_pPagoConvenir',
          description:
            'Al finalizar tu compra, te contactaremos o puedes comunicarte con nosotros por algunos de nuestros medios de comunicación para que organicemos la forma de pago de tu compra. ',
        },
        {
          id: '8',
          tag: 'payco',
          title: 'mcompra_pSafetyPat',
          description: 'Banca y efectivo internacional',
        },
        {
          id: '9',
          tag: 'contraentrega',
          title: 'mcompra_pContraEntrega',
          description: 'Pagas en el momento que recibas tu compra',
        },
        {
          id: '10',
          tag: 'mercadopago',
          title: 'mcompra_pmercadoPago',
          description: 'Tu cliente ha seleccionado mercadoPago para pagar',
        },
        {
          id: '11',
          tag: 'payu',
          title: 'mcompra_pTarjetaCreditoM',
          description: 'Paga con tu tarjeta hasta en 24 cuotas',
        },
        {
          id: '12',
          tag: 'payu',
          title: 'mcompra_pEfectivo',
          description: 'Tu cliente ha seleccionado PayU para pagar',
        },
        {
          id: '13',
          tag: 'payu',
          title: 'mcompra_pPayuCuentaAhorros',
          description: 'Tu cliente ha seleccionado PayU para pagar',
        },
        {
          id: '14',
          tag: 'mercadopago',
          title: 'mcompra_pPMercadoCuentaAhorros',
          description: 'Tu cliente ha seleccionado Mercado Pago para pagar',
        },
        {
          id: '15',
          tag: 'Daviplata',
          title: 'mcompra_pDaviplata',
          description: 'Tu cliente ha seleccionado Daviplata para pagar',
        },
        {
          id: '16',
          tag: 'Nequi',
          title: 'mcompra_pNequi',
          description: 'Tu cliente ha seleccionado Nequi para pagar',
        },
      ]
    },
    statusUpdate() {
      return [
        {
          id: '0',
          color: '#FFA801',
          title: 'mcompra_sinPagar',
          ref: 'Sin pagar',
        },
        {
          id: '1',
          color: '#30c490',
          title: 'mcompra_pagada',
          ref: 'Pagada',
        },
        {
          id: '2',
          color: '',
          title: '',
          ref: '',
        },
        {
          id: '3',
          color: '#EB4D4B',
          title: 'mcompra_cancelada',
          ref: 'Cancelada',
        },
        {
          id: '4',
          color: '#0000FF',
          title: 'mcompra_despachada',
          ref: 'Despachada',
        },
        {
          id: '5',
          color: '',
          title: '',
          ref: '',
        },
        {
          id: '6',
          color: '#4429AE',
          title: 'mcompra_entregado',
          ref: 'Entregado',
        },
        {
          id: '10',
          color: '#EB4D4B',
          title: 'mcompra_rechazado',
          ref: 'Rechazada',
        },
      ]
    },
    saleStateHoko() {
      return [
        {
          id: 1,
          state: 'Creada',
          color: '#30C46F',
          type: 'success',
        },
        {
          id: 2,
          state: 'En proceso',
          color: '#4B9DEB',
          type: 'info',
        },
        {
          id: 3,
          state: 'Despachada',
          color: '#30C46F',
          type: 'success',
        },
        {
          id: 4,
          state: 'Finalizada',
          color: '#30C46F',
          type: 'success',
        },
        {
          id: 5,
          state: 'Cancelada',
          color: '#EB4D4B',
          type: 'danger',
        },
        {
          id: 6,
          state: 'En Novedad',
          color: '#EBC44B',
          type: 'warning',
        },
        {
          id: 7,
          state: 'Error',
          color: '#EB4D4B',
          type: 'danger',
        },
      ]
    },
  },
}
</script>
