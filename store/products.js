import axios from 'axios'
export const state = () => ({
  category_producto_header: '',
  subcategory_producto_header: '',
  search_product: '',
  tag_product: '',
  productsData: [],
})
export const mutations = {
  SET_SEARCH_PRODUCT(state, value) {
    state.search_product = value
  },
  SET_CATEGORY_PRODUCTO(state, value) {
    state.category_producto_header = value
  },
  SET_SUBCATEGORY_PRODUCTO(state, value) {
    state.subcategory_producto_header = value
  },
  SET_TAG_PRODUCT(state, value) {
    state.tag_product = value
  },
}
export const actions = {
  async GET_ALL_PRODUCTS({ rootState }, params) {
    try {
      const response = await axios({
        method: 'GET',
        url: `${rootState.urlAWSsettings}/api/v1/products/public/paged`,
        params: {
          active: 1,
          page: params.page,
          limit: params.limit,
          name: params.name || null,
          category: params.category || null,
          subcategory: params.subcategory || null,
          promotion: params.promotion || null,
          'max-price': params.maxPrice || null,
          'min-price': params.minPrice || null,
          freeShipping: params.freeShipping || null,
          tag: params.tag || null,
          variants: params.variants || null,
          storeId: params.id_tienda,
          alphabetic: params.alphabetic,
          favorite: params.favorite,
          'top-sales': params.topSales,
          price: params.price,
        },
        headers: {
          KOMERCIA_PUBLIC_ROUTES_KEY: rootState.routerKey,
        },
      })

      if (response?.data) {
        return { success: true, data: response.data.data }
      } else {
        return { success: false, data: null }
      }
    } catch (error) {
      console.error('Error fetching all products:', error.response)
      return { success: false, data: null }
    }
    // return { success: false, data: null }
  },
  async GET_DATA_PRODUCT({ rootState }, params) {
    // let temp = null
    try {
      const response = await axios({
        method: 'GET',
        url: `${rootState.urlAWSsettings}/api/v1/products/public/${params.slug}`,
        headers: {
          KOMERCIA_PUBLIC_ROUTES_KEY: rootState.routerKey,
        },
      })
      // temp = response
      if (response.data) {
        return { success: true, data: response.data }
      }
    } catch (error) {
      console.error('Error fetching data products:', error.response)
      return { success: false, data: null }
    }
    // finally {
    //   console.log(temp)
    // }
    // return { success: false, data: null }
  },
  async GET_DESCRIPTION_PRODUCTO({ rootState }, params) {
    try {
      const { data } = await axios({
        method: 'GET',
        url: `${rootState.urlAWSsettings}/api/v1/products/public/description/${params.slug}`,
        headers: {
          KOMERCIA_PUBLIC_ROUTES_KEY: rootState.routerKey,
        },
      })
      if (data) {
        return { success: true, data }
      }
    } catch (error) {
      console.error('Error fetching data products laravel:', error.response)
      return { success: false, data: null }
    }
    // finally {
    //   console.log(temp)
    // }
    // return { success: false, data: null }
  },
}

export const getters = {}
