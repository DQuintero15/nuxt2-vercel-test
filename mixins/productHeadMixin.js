// mixins/productHeadMixin.js
export const productHeadMixin = {
  computed: {
    productTitle() {
      return this.data?.nombre || ''
    },
    productDescription() {
      return this.data?.productosInfo?.descripcionCorta || ''
    },
    productImage() {
      return this.data?.fotoCloudinary || ''
    },
    productCurrency() {
      return this.dataStore.tiendasInfo.moneda || ''
    },
    productPrice() {
      return this.salesData?.precio || ''
    },
    productBrand() {
      return this.data?.productosInfo?.marca || ''
    },
    productAvailability() {
      return this.salesData?.unidades > 0 ? 'in stock' : 'out of stock'
    },
    productCondition() {
      return 'new'
    },
    productSalePriceAmount() {
      if (
        this.data?.productosInfo?.tagPromocion === 1 &&
        this.data?.productosInfo?.promocionValor
      ) {
        return Math.trunc(
          this.salesData.precio /
            (1 - this.data.productosInfo.promocionValor / 100)
        )
      }
      return ''
    },
  },
  methods: {
    generateHead() {
      return {
        title: `Vista del producto ${this.productTitle}`,
        meta: [
          {
            hid: 'product:catalog_id',
            property: 'product:catalog_id',
            content: this.data?.detalle?.id || '',
          },
          { hid: 'og:title', property: 'og:title', content: this.productTitle },
          {
            hid: 'og:url',
            property: 'og:url',
            content: this.sharing?.url || '',
          },
          {
            hid: 'og:description',
            property: 'og:description',
            content: this.productDescription,
          },
          { hid: 'og:image', property: 'og:image', content: this.productImage },
          {
            hid: 'og:price:amount',
            property: 'og:price:amount',
            content: this.productPrice,
          },
          {
            hid: 'og:price:currency',
            property: 'og:price:currency',
            content: this.productCurrency,
          },
          {
            hid: 'product:brand',
            property: 'product:brand',
            content: this.productBrand,
          },
          {
            hid: 'product:availability',
            property: 'product:availability',
            content: this.productAvailability,
          },
          {
            hid: 'product:condition',
            property: 'product:condition',
            content: this.productCondition,
          },
          {
            hid: 'product:price:amount',
            property: 'product:price:amount',
            content: this.productPrice,
          },
          {
            hid: 'product:price:currency',
            property: 'product:price:currency',
            content: this.productCurrency,
          },
          {
            hid: 'product:sale_price:amount',
            property: 'product:sale_price:amount',
            content: this.productSalePriceAmount,
          },
          {
            hid: 'product:sale_price:currency',
            property: 'product:sale_price:currency',
            content: this.productCurrency,
          },
        ],
      }
    },
  },
}
