export const productJsonldMixin = {
  computed: {
    productJsonld() {
      return {
        '@context': 'https://schema.org',
        '@type': 'Product',
        productID: this.data?.id || '',
        name: (this.data?.nombre || '').slice(0, 149),
        description: (
          this.data?.productosInfo?.descripcionCorta ||
          `Producto de la tienda ${this.dataStore.nombre}`
        ).slice(0, 9998),
        url: this.sharing?.url || '',
        image: this.data?.fotoCloudinary || '',
        brand: this.data?.productosInfo?.marca || '',
        sku: this.salesData?.unidades || '',
        offers: [
          {
            '@type': 'Offer',
            price: this.salesData?.precio || '',
            priceCurrency: this.dataStore.tiendasInfo?.moneda || '',
            itemCondition: 'https://schema.org/NewCondition',
            availability:
              this.salesData?.unidades > 0
                ? 'https://schema.org/InStock'
                : 'https://schema.org/OutOfStock',
          },
        ],
        additionalProperty: [
          {
            '@type': 'PropertyValue',
            propertyID: 'item_group_id',
            value:
              this.categoriaProducto > 0
                ? `FB${this.data.categoriaProducto}_${this.data.categoriaProducto2.nombreCategoriaProducto}`
                : '',
            status: 'active',
          },
        ],
      }
    },
  },
}
