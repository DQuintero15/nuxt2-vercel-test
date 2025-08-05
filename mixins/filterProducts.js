// Modulo para filtrar productos
import { mapState } from 'vuex'
export default {
  data() {
    return {
      listProducts: [],
      totalProducts: 0,
      minPrice: 0,
      maxPrice: 0,
      productFreeShipping: 0,
      productVariantes: 0,
      productPromotion: 0,
      selectedSubcategories: [],
      stateShipping: false,
      sortingFilter: null,
      listOrderFilter: [
        {
          id: 1,
          value: 1,
          type: 'topSales',
          label: 'home_moreBuy',
        },
        {
          id: 2,
          value: 1,
          type: 'freeShipping',
          label: 'home_gratis',
        },
        {
          id: 3,
          value: 1,
          type: 'promotion',
          label: 'home_promotion',
        },
        {
          id: 4,
          value: 1,
          type: 'variants',
          label: 'home_conVariants',
        },
        {
          id: 5,
          value: 'ASC',
          type: 'alphabetic',
          label: 'home_alphabeticAsc',
        },
        {
          id: 6,
          value: 'DESC',
          type: 'alphabetic',
          label: 'home_alphabeticDesc',
        },
        {
          id: 7,
          value: 'ASC',
          type: 'price',
          label: 'home_priceAsc',
        },
        {
          id: 8,
          value: 'DESC',
          type: 'price',
          label: 'home_priceDesc',
        },
      ],
      filters: {
        page: 1,
        limit: 24,
        name: null,
        category: null,
        subcategory: null,
        promotion: null,
        minPrice: null,
        maxPrice: null,
        freeShipping: null,
        tag: null,
        variants: null,
        alphabetic: 'ASC',
        price: 'ASC',
        topSales: null,
      },
      query: {
        page: 1,
        name: null,
        category: null,
        subcategory: null,
        promotion: null,
        minPrice: null,
        maxPrice: null,
        freeShipping: null,
        tag: null,
        variants: null,
        alphabetic: null,
        price: null,
        topSales: null,
      },
    }
  },
  computed: {
    ...mapState(['dataStore', 'categorias']),
    ...mapState({
      subcategories: (state) => state.subcategorias,
      // facebookPixel: (state) => state.analytics_tagmanager,
    }),
    tags() {
      return this.dataStore.tags
    },
    nameCategory: {
      get() {
        return this.$store.state.products.category_producto_header
      },
      set(newValue) {
        this.$store.commit('products/SET_CATEGORY_PRODUCTO', newValue)
      },
    },
    nameSubCategory: {
      get() {
        return this.$store.state.products.subcategory_producto_header
      },
      set(newValue) {
        this.$store.commit('products/SET_SUBCATEGORY_PRODUCTO', newValue)
      },
    },
    searchProduct: {
      get() {
        return this.$store.state.products.search_product
      },
      set(newValue) {
        this.$store.commit('products/SET_SEARCH_PRODUCT', newValue)
      },
    },
    tagProduct: {
      get() {
        return this.$store.state.products.tag_product
      },
      set(newValue) {
        this.$store.commit('products/SET_TAG_PRODUCT', newValue)
      },
    },
    previousPage: {
      get() {
        return this.$store.state.previousPage
      },
      set(newValue) {
        this.$store.state.previousPage = newValue
      },
    },
  },
  watch: {
    $route() {
      this.getInformationFromQuery()
    },
  },
  mounted() {
    this.setOptionShipping()
    this.getInformationFromQuery()
  },
  methods: {
    // Realizar la petición para llamar a los products
    async currentChange({
      page,
      limit,
      name,
      category,
      subcategory,
      promotion,
      maxPrice,
      minPrice,
      freeShipping,
      tag,
      variants,
      alphabetic,
      price,
      topSales,
    }) {
      const id_tienda = this.dataStore.id

      try {
        const { success, data } = await this.$store.dispatch(
          'products/GET_ALL_PRODUCTS',
          {
            id_tienda,
            page,
            limit,
            name,
            category,
            subcategory,
            promotion,
            maxPrice,
            minPrice,
            freeShipping,
            tag,
            variants,
            alphabetic,
            price,
            topSales,
          },
        )

        if (success) {
          this.listProducts = data.publicProductList
          this.previousPage = parseInt(data.page)
          this.filters.limit = parseInt(data.limit)
          this.totalProducts = data.count
          this.minPrice = data.priceMinimum
          this.maxPrice = data.priceLimit
        } else {
          this.listProducts = []
          this.previousPage = 1
          this.filters.limit = 24
          this.totalProducts = 0
          this.minPrice = 0
          this.maxPrice = 0
        }
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    },
    // Asignar valores en las query's
    async setInformationFromQuery({
      page,
      name,
      category,
      subcategory,
      promotion,
      maxPrice,
      minPrice,
      freeShipping,
      tag,
      variants,
      alphabetic,
      price,
      topSales,
    }) {
      const query = {}

      if (page !== null && page !== undefined) query.page = page
      if (category !== null) query.category = category
      if (name !== null) query.name = name
      if (subcategory !== null) query.subcategory = subcategory
      if (promotion !== null) query.promotion = promotion
      if (maxPrice !== null) query.maxPrice = maxPrice
      if (minPrice !== null) query.minPrice = minPrice
      if (freeShipping !== null) query.freeShipping = freeShipping
      if (tag !== null) query.tag = tag
      if (variants !== null) query.variants = variants
      if (alphabetic !== null) query.alphabetic = alphabetic
      if (price !== null) query.price = price
      if (topSales !== null) query.topSales = topSales

      try {
        await this.$router.push({ path: '', query })
      } catch (error) {
        console.error('Error navigating:', error)
      }
    },
    // Tomar los valores de las query's
    getInformationFromQuery() {
      const query = this.$route.query

      this.filters.page = query.page || 1
      this.filters.name = query.name || null
      this.filters.category = query.category || null
      this.filters.subcategory = query.subcategory || null
      this.filters.promotion = query.promotion || null
      this.filters.maxPrice = query.maxPrice || null
      this.filters.minPrice = query.minPrice || null
      this.filters.freeShipping = query.freeShipping || null
      this.filters.tag = query.tag || null
      this.filters.variants = query.variants || null
      this.filters.alphabetic = query.alphabetic || null
      this.filters.price = query.price || null
      this.filters.topSales = query.topSales || null

      this.currentChange(this.filters)
      this.setData()
    },
    // Asignar valores para mostrarlos en la pantalla
    setData() {
      const query = this.$route.query

      const mapping = {
        category: (value) => (this.nameCategory = value || null),
        subcategory: (value) => {
          const tempResult = this.subcategories.filter(
            (item) => item.id === JSON.parse(value),
          )
          this.nameSubCategory = tempResult[0]?.nombreSubcategoria
        },
        promotion: () => {
          this.sortingFilter = {
            id: 3,
            value: true,
            type: 'promotion',
            label: 'home_promotion',
          }
        },
        freeShipping: () => {
          this.sortingFilter = {
            id: 2,
            value: true,
            type: 'freeShipping',
            label: 'home_gratis',
          }
        },
        alphabetic: (value) => {
          this.sortingFilter = {
            id: 5,
            value: 'ASC',
            type: 'alphabetic',
            label: 'home_alphabeticAsc',
          }
          if (value === 'DESC') {
            this.sortingFilter.id = 6
            this.sortingFilter.value = 'DESC'
            this.sortingFilter.type = 'alphabetic'
            this.sortingFilter.label = 'home_alphabeticDesc'
          }
        },
        price: (value) => {
          this.sortingFilter = {
            id: 7,
            value: 'ASC',
            type: 'price',
            label: 'home_priceAsc',
          }
          if (value === 'DESC') {
            this.sortingFilter.id = 8
            this.sortingFilter.value = 'DESC'
            this.sortingFilter.type = 'price'
            this.sortingFilter.label = 'home_priceDesc'
          }
        },
        topSales: () => {
          this.sortingFilter = {
            id: 1,
            value: true,
            type: 'topSales',
            label: 'home_moreBuy',
          }
        },
      }

      for (const key in query) {
        if (mapping[key]) {
          mapping[key](query[key])
        }
      }
    },
    // Actualizar listado de filters
    updateFilters() {
      this.filters.page = this.previousPage
      this.filters.name = this.searchProduct || null

      this.updateQuery()
      // this.currentChange(this.filters)
    },
    // Actualizar listado de query's
    updateQuery() {
      this.query.page = this.filters.page || 1
      this.query.name = this.filters.name || null
      this.query.category = this.filters.category || null
      this.query.subcategory = this.filters.subcategory || null
      this.query.promotion = this.filters.promotion || null
      this.query.minPrice = this.filters.minPrice || null
      this.query.maxPrice = this.filters.maxPrice || null
      this.query.freeShipping = this.filters.freeShipping || null
      this.query.tag = this.filters.tag || null
      this.query.variants = this.filters.variants || null
      this.query.alphabetic = this.filters.alphabetic || null
      this.query.price = this.filters.price || null
      this.query.topSales = this.filters.topSales || null

      this.setInformationFromQuery(this.query)
    },
    // Filtro de categoría
    sendCategory(value) {
      this.sendAnalyticsStore(value.id)
      this.selectedSubcategories = this.subcategories.filter(
        (item) => item.categoria === value.id,
      )
      this.filters.category = value.nombreCategoriaProducto
      this.nameCategory = value.nombreCategoriaProducto
      this.updateFilters()

      this.clearFiltersCategory(value.nombreCategoriaProducto)
    },
    // Filtro de subcategoría
    sendSubCategory(value) {
      // this.nameSubCategory = `${value.nombreSubcategoria}-${value.id}`
      this.nameSubCategory = value.nombreSubcategoria
      this.filters.subcategory = value.id
      this.updateFilters()
    },
    // Filtro de etiquetas
    sendTag(value) {
      // this.tagProduct = `${value.name}-${value.id}`
      this.tagProduct = value.name
      this.filters.tag = value.id
      this.updateFilters()
    },
    // Filtro para ordenar listado : Envió gratis, promoción, variantes, producto con mayor venta y por alfabeto ascendente o descendente
    sendOrder(value) {
      this.clearOrder()
      const filterMapping = {
        freeShipping: 'freeShipping',
        promotion: 'promotion',
        variants: 'variants',
        topSales: 'topSales',
        alphabetic: 'alphabetic',
        price: 'price',
      }
      const filterKey = filterMapping[value.type]
      this.filters[filterKey] = value.value || null
      this.sortingFilter = value
      this.updateFilters()
    },
    // Activar filtro por búsqueda y  por rango de precios
    sendFilter() {
      this.updateFilters()
    },
    // Cambios de paginado
    changePage(value) {
      this.previousPage = value
      this.updateFilters()
    },
    // limpiar filtros de ordenamiento de lista
    clearOrder() {
      this.filters.freeShipping = null
      this.filters.variants = null
      this.filters.alphabetic = null
      this.filters.price = null
      this.filters.topSales = null
      this.filters.promotion = null

      this.query.freeShipping = null
      this.query.variants = null
      this.query.alphabetic = null
      this.query.price = null
      this.query.topSales = null
      this.query.promotion = null
    },
    // Limpiar filtros en general
    clearFilters() {
      this.filters = {
        page: 1,
        limit: 24,
        name: null,
        category: null,
        subcategory: null,
        promotion: null,
        minPrice: null,
        maxPrice: null,
        freeShipping: null,
        tag: null,
        variants: null,
        alphabetic: null,
        price: null,
        topSales: null,
      }
      this.searchProduct = null
      this.sortingFilter = null
      this.selectedSubcategories = []
      this.nameCategory = ''
      this.nameSubCategory = ''
      this.tagProduct = ''
      this.previousPage = 1
      this.minPrice = 0
      this.maxPrice = 0
      this.productVariantes = 0
      this.productPromotion = 0
      this.productFreeShipping = 0
      this.$store.commit('SET_STATE_BANNER', true)
      this.updateFilters()
    },
    clearFiltersCategory(value) {
      this.filters = {
        page: 1,
        limit: 24,
        name: null,
        category: value,
        subcategory: null,
        promotion: null,
        minPrice: null,
        maxPrice: null,
        freeShipping: null,
        tag: null,
        variants: null,
        alphabetic: null,
        price: null,
        topSales: null,
      }
      this.searchProduct = null
      this.sortingFilter = null
      // this.selectedSubcategories = []
      this.nameCategory = value
      this.nameSubCategory = ''
      this.tagProduct = ''
      this.previousPage = 1
      this.minPrice = 0
      this.maxPrice = 0
      this.productVariantes = 0
      this.productPromotion = 0
      this.productFreeShipping = 0
      this.$store.commit('SET_STATE_BANNER', false)
      this.updateFilters()
    },
    // Identificar envió gratis
    setOptionShipping() {
      if (this.dataStore && this.dataStore.medios_envio) {
        const shipping = JSON.parse(this.dataStore.medios_envio.valores)
        switch (shipping.envio_metodo) {
          case 'gratis':
            this.stateShipping = true
            break
          default:
            this.stateShipping = false
            break
        }
      }
    },
    // Limpiar filtros pero de las migajas de pan
    breadcrumbsClear(type) {
      if (type === 1) {
        this.filters.subcategory = ''
        this.nameSubCategory = ''
        this.filters.tag = ''
        this.tagProduct = ''
        this.updateFilters()
      } else {
        this.filters.tag = ''
        this.tagProduct = ''
        this.updateFilters()
      }
    },

    async sendAnalyticsStore(value) {
      await this.$store.dispatch('SEND_ANALYTICS_STORE', {
        storeId: this.dataStore.id,
        event: 'CLICKED_CATEGORY',
        categoryId: value,
      })
    },
    // getSearch(value) {
    //   if (value) {
    //     if (this.facebookPixel?.pixel_facebook != null) {
    //       window.fbq('track', 'Search', { search_string: value })
    //     }
    //   }
    // },
  },
}
