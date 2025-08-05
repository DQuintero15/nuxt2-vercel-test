// Modulo para filtrar blogs
export default {
  data() {
    return {
      listBlogs: [],
      totalBlogs: 0,
      filters: {
        page: 1,
        limit: 12,
        title: null,
        // category: null,
      },
      query: {
        page: 1,
        title: null,
        // category: null,
      },
    }
  },
  watch: {
    $route() {
      this.getInformationFromQuery()
    },
  },
  mounted() {
    if (this.stateListBLogs) {
      this.getInformationFromQuery()
    }
  },
  methods: {
    // Realizar la petición para llamar los blogs
    async currentChange({ page, limit, title }) {
      const id_tienda = this.dataStore.id

      try {
        const { success, data } = await this.$store.dispatch('GET_ARTICLES', {
          id_tienda,
          page,
          limit,
          title,
        })

        if (success) {
          this.listBlogs = data.data
          this.filters.page = parseInt(data.page || 1)
          this.filters.limit = parseInt(data.limit)
          this.totalBlogs = data.count
        } else {
          this.listProducts = []
          this.filters.page = 1
          this.filters.limit = 12
          this.totalProducts = 0
        }
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    },
    // Asignar valores en las query's
    async setInformationFromQuery({ page, title }) {
      const query = {}

      if (page !== null && page !== undefined) query.page = page
      if (title !== null) query.title = title

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
      this.filters.title = query.title || null

      this.currentChange(this.filters)
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
      this.query.title = this.filters.title || null

      this.setInformationFromQuery(this.query)
    },
    // Cambios de paginado
    changePage(value) {
      this.filters.page = value
      this.updateFilters()
    },
    // Limpiar filtros en general
    clearFilters() {
      this.filters = {
        page: 1,
        limit: 12,
        title: null,
      }
      this.updateFilters()
    },
  },
}
