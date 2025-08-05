export const strict = false
import axios from 'axios'
import getCookie from '../utils/getCookie'
export const state = () => ({
  fullPathServer: '',
  template: '',
  productsCart: [],
  beforeCombination: [],
  cities: [],
  categorias: [],
  subcategorias: [],
  geolocalizacion: [],
  storePolicies: [],
  mediospago: {},
  envios: {
    valores: {
      envio_metodo: 'gratis',
      valor: 0,
    },
  },
  checkoutWhatsApp: [],
  storeEntities: [],
  openOrder: false,
  openOrderValienta: false,
  openMenuLateralRight: false,
  openMenuLateralLeft: false,
  openSearch: false,
  stateBanner: true,
  whatsapp: '',
  totalCart: 0,
  dataStore: '',
  logoStore: '',
  accessToken: '',
  urlKomercia: 'https://api2.komercia.co',
  urlKomerciaV3: 'https://api3.komercia.co',
  // urlNodeSettings: 'https://node.komercia.co',
  urlNodeSettings: 'https://editor.komercia.app',
  // urlTemplate: 'https://templates.komercia.co',
  // urlComponents: 'https://components.komercia.co',
  urlAWSsettings: 'https://api.komercia.app',
  routerKey: 'c6979297-txfg-4962-7sag-709c76a71755',
  configAxios: {
    headers: {
      'content-type': 'application/json',
      Authorization: '',
      'Access-Control-Allow-Origin': '*',
      Access: 'application/json',
    },
  },
  settingByTemplate: '',
  settingByTemplate6: '',
  settingByTemplate7: '',
  settingByTemplate9: '',
  settingByTemplate10: '',
  settingByTemplate11: '',
  settingByTemplate12: '',
  settingByTemplate13: '',
  settingByTemplate14: '',
  settingByTemplate15: '',
  settingByTemplate16: '',
  analytics_tagmanager: '',
  dataCookies: false,
  settingBase: {
    '--background_color_1': 'hsla(173, 0%, 100%, 1)',
    '--background_color_2': '#efefef',
    '--color_background_btn': '#000000',
    '--color_border': 'rgba(127, 127, 139, 0.342)',
    '--color_icon': '#25dac5',
    '--color_text': ' #000000',
    '--color_subtext': 'rgba(21, 20, 57, 0.541)',
    '--color_text_btn': '#ffffff',
  },
  previousPage: 1,
  layoutUnicentro: false,
  listDescuentos: [],
  stateListBLogs: false,
  tags: [],
  modalpolitics05: false,
  modalproductDetails: false,
  stateWapiME: true,
  settingBaseWapir: {
    color_icon: '#25d3652c',
    color_primario: '#25D366',
    color_secundario: 'white',
    descripcion: '',
    estilo_categorias: 1,
    estilo_productos: 1,
    logo_cuadrado: 1,
    mensaje_principal: '',
    pago_online: 1,
    tema: 1,
    watermark: 0,
  },
  dataHoko: {},
  producthoko: [],
  stateModalPwd: true,
  formOrdenWhatsAPP: false,
  tempInfo: '',
  storeError: false,
  // listArticulos: [],
  // token:
  //   'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjI3MmU0ZDc1NmM2NDFjMGM5N2VlMTQzYjc1OTg3NDg1MDI3YzVjYzhhZDNiNTdjMTM1ZjFhNDY2MGIzMTExODMwMWIxYTcxYTk0MGRjYTcyIn0.eyJhdWQiOiIyIiwianRpIjoiMjcyZTRkNzU2YzY0MWMwYzk3ZWUxNDNiNzU5ODc0ODUwMjdjNWNjOGFkM2I1N2MxMzVmMWE0NjYwYjMxMTE4MzAxYjFhNzFhOTQwZGNhNzIiLCJpYXQiOjE1OTA1MTMyNTMsIm5iZiI6MTU5MDUxMzI1MywiZXhwIjoxNTkzMTA1MjUzLCJzdWIiOiIzNDgwIiwic2NvcGVzIjpbXX0.qbFxfGqpayFbPSXy01sygMXWq4fLTqLXpjeksrdT-Pxo9k129iWxFi3XnJ6uYh7LE6frYUMJNiETa3CWA5CJ2ebQk2UGx310sZl5H0Io1oz5KicwJUpq2OgwNLkjg0d_VcvRJTO5aT2gmnwPJbMuz_Y3OHbgFO5zCb2u1SqDSepnxEFl83iR-BKiJ7vESeZlUcHT-xR1SQQClmj4PnLhCeV5MRYFS-ui-TmImheJe8SoQLs-ly9cRTk1u-GYrLskL3yI0z9aOKi6UNXUoe4y8Ji3p8odfJk5ZinX7koXWrPqiBqp15Q2oE763gCnGPQeWE-Tz7QLJJSGeVGHe5xKawjGLRIK57MNG5QttFT5nYpwh1zQZ3jqY2v5JFM2wrLzOUOcAtvR48bFxBe-ea3NkBuLo7V0mJGjpng1rdeCPBV2NwQQTPqmgSAUrFZvX81T5cLfyNmyUVRmJnojelLoiKaaU2ASEBOGt1GFmtw5tbgeXjrFBlPzoWUCRKZyq9qdJyeKbTZbaTD7rewvGZCh9iyjt_Mey3l5-2CJE_csIInAEkFc9i07HrSFuv8pmVrfy1LEDoJwoik5pv39WlIrXtD8bc5maJ-smX8JDeAMMfFhNmjtcbWt1qDaiJYApVDSGPNe5Rw6Uu_bOWyPkKQjXPwbcOSRJT_OihlnCfe1z6M',
  // configHttp: {
  //   headers: {
  //     'content-type': 'application/json',
  //     Authorization: `Bearer `,
  //     'Access-Control-Allow-Origin': '*',
  //   },
  // },
  // authData: '',
})
export const mutations = {
  SET_CURRENTSETTING5(state, value) {
    if (value && value.data) {
      state.settingByTemplate = value.data
    }
  },
  SET_CURRENTSETTING06: (state, value) =>
    setCurrentSetting(state, { ...value, template: '6' }),
  SET_CURRENTSETTING07: (state, value) =>
    setCurrentSetting(state, { ...value, template: '7' }),
  SET_CURRENTSETTING09: (state, value) =>
    setCurrentSetting(state, { ...value, template: '9' }),
  SET_CURRENTSETTING10: (state, value) =>
    setCurrentSetting(state, { ...value, template: '10' }),
  SET_CURRENTSETTING11: (state, value) =>
    setCurrentSetting(state, { ...value, template: '11' }),
  SET_CURRENTSETTING12(state, value) {
    if (value && value.data) {
      state.settingByTemplate12 = value.data
    }
  },
  SET_CURRENTSETTING13: (state, value) =>
    setCurrentSetting(state, { ...value, template: '13' }),
  SET_CURRENTSETTING14: (state, value) =>
    setCurrentSetting(state, { ...value, template: '14' }),
  SET_CURRENTSETTING15: (state, value) =>
    setCurrentSetting(state, { ...value, template: '15' }),
  SET_CURRENTSETTING16: (state, value) =>
    setCurrentSetting(state, { ...value, template: '16' }),
  SET_CURRENT_SETTING_MODAL(state, value) {
    if (value && value.data) {
      state.dataStore.disenoModals[0] = value.data
    }
  },
  SET_CURRENTSETTING99: (state, value) => {
    if (value && value.setting) {
      state.settingByTemplate = value.setting
    }
  },
  SET_PREVIOUS_PAGE(state, value) {
    state.previousPage = value
  },
  SET_STATE_BANNER(state, value) {
    state.stateBanner = value
  },
  DELETEITEMCART: (state, index) => {
    state.productsCart.splice(index, 1)
  },
  DELETE_ALL_ITEMS_CART: (state) => {
    state.productsCart = []
  },
  SET_OPEN_ORDER: (state, value) => {
    console.log(value)
    state.openOrder = value
  },
  SET_OPEN_SEARCH: (state, value) => {
    state.openSearch = value
  },
  SET_OPEN_ORDER_MENU_RIGHT: (state, value) => {
    state.openMenuLateralRight = value
  },
  SET_OPEN_ORDER_MENU_LEFT: (state, value) => {
    state.openMenuLateralLeft = value
  },
  SET_STATE_BLOGS(state, value) {
    state.stateListBLogs = value
  },
  SET_DATA(state) {
    state.tags = state.dataStore.tags.sort(function (prev, next) {
      return next.orden - prev.orden
    })
    state.categorias = state.categorias.sort(function (prev, next) {
      return next.orden - prev.orden
    })
    state.mediospago = state.dataStore.medioPagos
    if (state.dataStore?.mediosEnvios[0]?.valores) {
      state.envios.valores = JSON.parse(state.dataStore.mediosEnvios[0].valores)
    }
    state.whatsapp = state.dataStore.redes.whatsapp
  },
  SET_SHOPPING_CART(state, value) {
    state.productsCart = value || []
  },
  UPDATE_CONTENT_CART(state) {
    state.totalCart = 0
    localStorage.setItem(
      `ShoppingCart/${state.dataStore.id}`,
      JSON.stringify(state.productsCart)
    )
    state.productsCart.forEach((product) => {
      state.totalCart += product.precio * product.cantidad
    })
  },
  CALCULATE_TOTAL_CART(state) {
    state.totalCart = 0
    state.productsCart.forEach((product) => {
      state.totalCart += product.precio * product.cantidad
    })
  },
  SET_CITIES: (state, payload) => {
    state.cities = payload
  },
  SET_CATEGORIES: (state, payload) => {
    state.categorias = payload
  },
  SET_SUBCATEGORIES: (state, payload) => {
    state.subcategorias = payload
  },
  SET_STORE_GEOLOCALIZACION: (state, payload) => {
    state.geolocalizacion = payload
  },
  SET_STORE_POLICIES: (state, payload) => {
    state.storePolicies = payload
  },
  SET_CHECKOUT_WHATS_APP: (state, payload) => {
    state.checkoutWhatsApp = payload
  },
  SET_ENTITIES: (state, payload) => {
    state.storeEntities = payload
  },
  SET_SETTINGS_BY_TEMPLATE: (state, { templateNumber, value }) => {
    if (templateNumber === 5 || templateNumber === 99) {
      state.settingByTemplate = value
    } else {
      const statePropertyName = `settingByTemplate${templateNumber}`
      state[statePropertyName] = value
    }
  },
  SET_STATE_WAPIME: (state, value) => {
    state.stateWapiME = value
  },
  SET_ANALITICS_TAGMANAGER: (state, value) => {
    state.analytics_tagmanager = value
  },
  DATA: (state, response) => {
    state.dataStore = response.data
  },
  SET_SERVER_PATH(state, value) {
    state.fullPathServer = value
  },
  SET_TEMPLATE_STORE(state, value) {
    state.template = value
  },
  SET_DATA_HOKO(state, data) {
    state.dataHoko = data
  },
  SET_STATE_MODAL_PWD(state, data) {
    state.stateModalPwd = data
  },
  SET_STATE_FORM_MODAL_WHATS_APP(state, data) {
    state.formOrdenWhatsAPP = data
  },
  SET_INFO(state, data) {
    state.tempInfo = data
  },
  SET_LOGO_STORE(state, data) {
    state.logoStore = data
  },
  /////////
  // SET_LIST_ARTICLES(state, value) {
  //   state.listArticulos = value
  // },
  // SET_LAYOUTUNICENTRO(state, value) {
  //   state.layoutUnicentro = value
  // },
  // SET_ACCESSTOKEN(state, value) {
  //   state.accessToken = value
  // },
  // LOGOUT() {
  //   window.location.href = 'https://perfil.komercia.co/logout'
  // },
  // GET_USERDATA(state) {
  //   let headers = {
  //     'content-type': 'application/json',
  //     Authorization: `Bearer ${state.authData || ''}`,
  //     'Access-Control-Allow-Origin': '*',
  //     Accept: 'application/json',
  //   }
  //   axios({
  //     method: 'get',
  //     url: `${state.urlKomercia}/api/user`,
  //     headers,
  //   }).then((response) => {
  //     state.userData = response.data.data
  //   })
  // },
  // SET_TOKEN(state, value) {
  //   state.configHttp = {
  //     headers: {
  //       'content-type': 'application/json',
  //       Authorization: `Bearer ${value || process.env.TOKEN}`,
  //       'Access-Control-Allow-Origin': '*',
  //     },
  //   }
  // },
}
export const actions = {
  GET_COOKIES({ state }) {
    const cookies = getCookie('authCookies')
    if (cookies == 1) {
      state.dataCookies = true
    }
  },
  async GET_COOKIES_PWD({ state, commit, dispatch }) {
    const cookies = getCookie('authPwd')
    if (
      state.dataStore?.disenoModals[0] &&
      state.dataStore.disenoModals[0].stateModal == 1 &&
      state.dataStore.disenoModals[0].password
    ) {
      if (cookies) {
        const { success } = await dispatch('GET_ACCESS_CODE', {
          id_tienda: state.dataStore.id,
          pwd: cookies,
        })
        if (success) {
          commit('SET_STATE_MODAL_PWD', true)
        } else {
          if (cookies == state.dataStore.disenoModals[0].password) {
            commit('SET_STATE_MODAL_PWD', true)
          }
        }
      }
    }
  },
  async nuxtServerInit({ commit, dispatch, state }, { req }) {
    const { subdomain, id, template, idWapi, isDataTemplate } = await getIdData(
      state,
      req,
      commit
    )
    // let idWapi = ''
    // let id = {
    //   data: {
    //     data: {
    //       id: 14513,
    //       template: 13,
    //     },
    //   },
    // }

    if (idWapi) {
      await handleWapi(commit, dispatch, idWapi, isDataTemplate)
    } else {
      await handleKomercia(id, template, isDataTemplate, commit, dispatch)
    }
    if (!state.storeError) {
      await handleDataStore(state, commit)
    }

    const param = {
      url: req.headers.host,
      parts: req.headers.host.split('.'),
      subdomain,
      id,
      dataStore: state.dataStore ? state.dataStore : 'No se encontro la tienda',
    }
    commit('SET_INFO', param)
  },
  GET_SERVER_PATH({ commit }, value) {
    commit('SET_SERVER_PATH', value)
  },
  async GET_DATA_TIENDA_BY_ID({ state, commit, dispatch }, idTienda) {
    try {
      const { data } = await axios({
        method: 'GET',
        url: `${state.urlAWSsettings}/api/v1/stores/info/${idTienda}`,
        headers: {
          KOMERCIA_PUBLIC_ROUTES_KEY: state.routerKey,
        },
      })
      if (data) {
        await Promise.all([
          dispatch('GET_LOGO_STORE', data.data.id),
          dispatch('SET_INCREMENT_STORE_VIEW', data.data.id),
          dispatch('GET_ANALYTICS_TAGMANAGER', data.data.id),
          dispatch('GET_CATEGORIES', data.data.id),
          dispatch('GET_SUBCATEGORIES', data.data.id),
          dispatch('GET_GEOLOCALIZACION', data.data.id),
          dispatch('GET_STORE_POLICIES', data.data.id),
          dispatch('GET_WHATS_APP_CHECKOUT', data.data.id),
          dispatch('GET_ENTITIES', data.data.id),
          dispatch('GET_ARTICLES', {
            id_tienda: data.data.id,
            page: 1,
            limit: 1,
            vuex: true,
          }),
        ])
        commit('DATA', data)
        commit('SET_DATA')
      }
    } catch (err) {
      console.log('Data store', err?.response)
    }
  },
  GET_DATA({ commit }) {
    commit('SET_DATA')
  },
  async GET_LOGO_STORE({ commit, state }, idTienda) {
    try {
      const { data } = await axios({
        method: 'GET',
        url: `${state.urlAWSsettings}/api/v1/stores/logos/${idTienda}`,
        headers: {
          KOMERCIA_PUBLIC_ROUTES_KEY: state.routerKey,
        },
      })
      if (data) {
        commit('SET_LOGO_STORE', data.data)
      }
    } catch (err) {
      console.log('GET_LOGO_STORE', err?.response)
    }
  },

  async SET_INCREMENT_STORE_VIEW({ state }, idTienda) {
    try {
      await axios({
        method: 'POST',
        url: `${state.urlAWSsettings}/api/v1/templates/websites/views/${idTienda}`,
        headers: {
          KOMERCIA_PUBLIC_ROUTES_KEY: state.routerKey,
        },
      })
    } catch (err) {
      console.log(
        'Data increment store view',
        err?.response?.data,
        'status',
        err?.response?.status
      )
    }
  },
  async SEND_ANALYTICS_STORE({ state }, params) {
    try {
      await axios({
        method: 'POST',
        url: `${state.urlAWSsettings}/api/v1/stores/analytics`,
        headers: {
          KOMERCIA_PUBLIC_ROUTES_KEY: state.routerKey,
        },
        data: {
          storeId: params.storeId,
          event: params.event,
          productId: params.productId || null,
          categoryId: params.categoryId || null,
        },
      })
    } catch (err) {
      console.log(
        'SEND_ANALYTICS_STORE',
        err.response.data,
        'status',
        err.response.status
      )
    }
  },
  async SEND_ANALYTICS_PRODUCTO_PAY({ state }, params) {
    try {
      await axios({
        method: 'POST',
        url: `${state.urlAWSsettings}/api/v1/stores/analytics/clicked-pay-cart`,
        data: {
          storeId: params.storeId,
          ids: params.ids,
        },
        headers: {
          KOMERCIA_PUBLIC_ROUTES_KEY: state.routerKey,
        },
      })
    } catch (err) {
      console.log('Error SEND_ANALYTICS_STORE', err)
    }
  },
  async GET_CATEGORIES({ commit, state }, idTienda) {
    try {
      const { data } = await axios({
        method: 'GET',
        url: `${state.urlAWSsettings}/api/v1/stores/products-categories/${idTienda}`,
        headers: {
          KOMERCIA_PUBLIC_ROUTES_KEY: state.routerKey,
        },
      })
      if (data) {
        commit('SET_CATEGORIES', data.data)
        return { success: true, data: data }
      }
    } catch (err) {
      console.log('Data categories', err?.response)
    }
  },
  async GET_SUBCATEGORIES({ commit, state }, idTienda) {
    try {
      const { data } = await axios({
        method: 'GET',
        url: `${state.urlAWSsettings}/api/v1/stores/products-subcategories/${idTienda}`,
        headers: {
          KOMERCIA_PUBLIC_ROUTES_KEY: state.routerKey,
        },
      })
      if (data) {
        commit('SET_SUBCATEGORIES', data.data)
        return { success: true, data: data }
      }
    } catch (err) {
      console.log('Data subcategories', err?.response)
    }
  },
  async GET_GEOLOCALIZACION({ commit, state }, idTienda) {
    try {
      const { data } = await axios({
        method: 'GET',
        url: `${state.urlAWSsettings}/api/v1/stores/geolocations/${idTienda}`,
        headers: {
          KOMERCIA_PUBLIC_ROUTES_KEY: state.routerKey,
        },
      })
      if (data) {
        commit('SET_STORE_GEOLOCALIZACION', data.data)
        return { success: true, data: data }
      }
    } catch (err) {
      console.log('Data geolocalizacion', err?.response)
    }
  },
  async GET_STORE_POLICIES({ commit, state }, idTienda) {
    try {
      const { data } = await axios({
        method: 'GET',
        url: `${state.urlAWSsettings}/api/v1/stores/policies/${idTienda}`,
        headers: {
          KOMERCIA_PUBLIC_ROUTES_KEY: state.routerKey,
        },
      })
      if (data) {
        commit('SET_STORE_POLICIES', data.data)
        return { success: true, data: data }
      }
    } catch (err) {
      console.log('Data politicas', err?.response)
    }
  },
  async GET_WHATS_APP_CHECKOUT({ commit, state }, idTienda) {
    try {
      const { data } = await axios({
        method: 'GET',
        url: `${state.urlAWSsettings}/api/v1/stores/whatsapp-checkout/${idTienda}`,
        headers: {
          KOMERCIA_PUBLIC_ROUTES_KEY: state.routerKey,
        },
      })
      if (data) {
        commit('SET_CHECKOUT_WHATS_APP', data.data)
        return { success: true, data: data }
      }
    } catch (err) {
      console.log('Data whatsApp checkout', err?.response)
    }
  },
  async GET_ENTITIES({ commit, state }, idTienda) {
    try {
      const { data } = await axios({
        method: 'GET',
        url: `${state.urlAWSsettings}/api/v1/stores/entities/${idTienda}`,
        headers: {
          KOMERCIA_PUBLIC_ROUTES_KEY: state.routerKey,
        },
      })
      if (data) {
        commit('SET_ENTITIES', data.data)
        return { success: true, data: data }
      }
    } catch (err) {
      console.log('Data whatsApp checkout', err?.response)
    }
  },
  async GET_CITIES({ commit, state }) {
    try {
      const { data } = await axios({
        method: 'GET',
        url: `${state.urlAWSsettings}/api/v1/common/cities`,
        headers: {
          KOMERCIA_PUBLIC_ROUTES_KEY: state.routerKey,
        },
      })
      if (data) {
        commit('SET_CITIES', data.data)
        return { success: true, data: data }
      }
    } catch (err) {
      console.log('Data cities', err?.response)
    }
  },
  async GET_SETTINGS_BY_TEMPLATE(
    { commit, state },
    { idStore, templateStore }
  ) {
    try {
      const { data } = await axios({
        method: 'GET',
        url: `${state.urlAWSsettings}/api/v1/templates/store-template-settings?template=${templateStore}&storeId=${idStore}`,
        headers: {
          KOMERCIA_PUBLIC_ROUTES_KEY: state.routerKey,
        },
      })
      if (data) {
        commit(`SET_SETTINGS_BY_TEMPLATE`, {
          templateNumber: templateStore,
          value: data.data,
        })
      }
    } catch (err) {
      console.log('Data setting Laravel', err?.response)
    }
  },
  async GET_SETTINGS_BY_TEMPLATE_NODE(
    { commit, state },
    { idStore, templateStore }
  ) {
    try {
      const { data } = await axios({
        method: 'GET',
        url: `${state.urlNodeSettings}/template${templateStore}?id=${idStore}`,
      })
      if (data) {
        commit(`SET_SETTINGS_BY_TEMPLATE`, {
          templateNumber: templateStore,
          value: data.body,
        })
      }
    } catch (err) {
      console.log('Data setting NODE', err?.response)
    }
  },
  // async GET_SETTINGS_BY_TEMPLATE_AWS(
  //   { commit, state },
  //   { templateStore, subdominio }
  // ) {

  //   try {
  //     const { data } = await axios({
  //       method: 'GET',
  //       url: `${state.urlAWSsettings}/api/v1/templates/websites/template?criteria=${subdominio}`,
  //     })
  //     console.log(data)
  //     if (data) {
  //       commit(`SET_SETTINGS_BY_TEMPLATE`, {
  //         templateNumber: templateStore,
  //         value: data.data.webSiteTemplate,
  //       })
  //     }
  //   } catch (err) {
  //     console.log('Data setting NODE', err.response)
  //   }
  // },
  // async GET_SETTINGS_BY_TEMPLATE_WAPI({ commit, state }, idWapi) {
  //   let template = state.template ? state.template : 99
  //   try {
  //     const { data } = await axios({
  //       method: 'GET',
  //       url: `${state.urlKomercia}/api/template/${template}/settings/${idWapi}`,
  //     })
  //     if (data) {
  //       commit(`SET_SETTINGS_BY_TEMPLATE`, {
  //         templateNumber: template,
  //         value: data.data,
  //       })
  //     }
  //   } catch (err) {
  //     console.log('Data setting wapi', err.response)
  //   }
  // },
  async GET_ANALYTICS_TAGMANAGER({ commit, state }, id) {
    try {
      const { data } = await axios({
        method: 'GET',
        url: `${state.urlAWSsettings}/api/v1/stores/apis/${id}`,
        headers: {
          KOMERCIA_PUBLIC_ROUTES_KEY: state.routerKey,
        },
      })
      if (data) {
        commit('SET_ANALITICS_TAGMANAGER', data.data)
      }
    } catch (err) {
      console.log('Data integraciones', err?.response)
    }
  },
  async GET_DESCUENTOS({ state }) {
    try {
      const { data } = await axios({
        method: 'GET',
        url: `${state.urlAWSsettings}/api/v1/stores/discounts/${state.dataStore.id}`,
        headers: {
          KOMERCIA_PUBLIC_ROUTES_KEY: state.routerKey,
        },
      })
      if (data) {
        state.listDescuentos = data.data.sort(function (prev, next) {
          return prev.cantidad_productos - next.cantidad_productos
        })
      }
    } catch (err) {
      console.log('Data descuentos', err?.response)
    }
  },
  async GET_ARTICLES({ state, commit }, params) {
    try {
      const { data } = await axios({
        method: 'GET',
        url: `${state.urlAWSsettings}/api/v1/stores/blogs/${params.id_tienda}`,
        params: {
          page: params.page,
          limit: params.limit,
          title: params.title || null,
        },
        headers: {
          KOMERCIA_PUBLIC_ROUTES_KEY: state.routerKey,
        },
      })
      if (data) {
        if (data.data) {
          if (params?.vuex && data?.data?.data?.length > 0) {
            commit('SET_STATE_BLOGS', true)
          }
          return { success: true, data: data.data }
        } else {
          return { success: false, data }
        }
      }
    } catch (err) {
      console.log('Data blog tienda', err?.response)
      return { success: false, data: null }
    }
  },
  async GET_DATA_ARTICLE({ state }, params) {
    try {
      const { data } = await axios({
        method: 'GET',
        url: `${state.urlAWSsettings}/api/v1/stores/blogs/${params.idStore}/${params.idBlog}`,
        headers: {
          KOMERCIA_PUBLIC_ROUTES_KEY: state.routerKey,
        },
      })
      if (data) {
        return { success: true, data: data }
      }
    } catch (err) {
      console.log('Data articulo tienda', err?.response)
      return { success: false, data: null }
    }
  },
  // No esta con las rutas de Node - APROVACION
  async GET_DATA_HOKO({ dispatch, commit, state }, id) {
    try {
      const { data } = await axios({
        method: 'GET',
        url: `${state.urlKomercia}/api/hoko/${id}`,
      })
      if (data.data) {
        dispatch('GET_PRODUCTSHOKO', 1)
        commit('SET_DATA_HOKO', data.data)
      } else {
        console.log('No tiene Hoko registrado')
      }
    } catch (err) {
      console.log('Data hoko', err?.response)
    }
  },
  async GET_PRODUCTSHOKO({ state }, id) {
    if (state.dataHoko && state.dataHoko.token) {
      try {
        const { data } = await axios({
          method: 'GET',
          url: `https://hoko.com.co/api/member/myproducts?page=${id}`,
          headers: {
            'content-type': 'multipart/form-data',
            Authorization: `Bearer ${state.dataHoko.token}`,
            'Access-Control-Allow-Origin': '*',
          },
        })
        if (data) {
          state.producthoko = data
        }
      } catch (err) {
        console.log('Listado prodcutos Hoko', err?.response)
      }
    }
  },
  async GET_ACCESS_CODE({ state, commit }, params) {
    try {
      const { data } = await axios({
        method: 'GET',
        url: `${state.urlAWSsettings}/api/v1/stores/access-code/verify/${params.id_tienda}?code=${params.pwd}`,
        headers: {
          KOMERCIA_PUBLIC_ROUTES_KEY: state.routerKey,
        },
      })
      if (data && data.data && data.message === 'Access code is valid') {
        commit('SET_STATE_MODAL_PWD', true)
        return { success: true, data: data }
      } else {
        return { success: false, data: null }
      }
    } catch (err) {
      console.error('Ocurrió un error al realizar la solicitud:', err)
      return { success: false, data: null }
    }
  },
  async SEND_MAIL_CONTACT({ state }, params) {
    try {
      await axios({
        method: 'POST',
        url: `${state.urlAWSsettings}/api/v1/mails/custom-email`,
        data: {
          to: params.toEmail,
          templateId: 'd-57ff9dee8ab14e77bd0b8ce179b6e46e',
          storeId: params.storeId,
          dynamicTemplateData: {
            messsage: params.messsage,
            clientName: params.clientName,
            storeName: params.storeName,
            clientEmail: params.clientEmail,
            clientPhoneNumber: params.clientPhoneNumber,
          },
        },
        headers: {
          KOMERCIA_PUBLIC_ROUTES_KEY: state.routerKey,
        },
      })
      return { success: true }
    } catch (err) {
      console.error('Error al enviar el correo de contacto:', err)
      return { success: false }
    }
  },
  async SEND_NOTIFICATION_ORDER({ state }, params) {
    try {
      const { data } = await axios({
        method: 'POST',
        url: `${state.urlAWSsettings}/api/v1/hooks/public/notify-order-created`,
        data: {
          orderId: params.orderId,
          storeId: params.storeId,
          amount: params.amount,
          paymentMethod: params.paymentMethod,
        },
        headers: {
          KOMERCIA_PUBLIC_ROUTES_KEY: state.routerKey,
        },
      })
      if (data) {
        return { success: true, dataOrder: data }
      }
    } catch (err) {
      console.log('SEND_NOTIFICATION_ORDER', err?.response)
      return { success: false }
    }
  },
  async SEND_SUSCRIPTOR({ state }, params) {
    try {
      const { data } = await axios({
        method: 'POST',
        url: `${state.urlKomercia}/api/tienda/suscriptor`,
        data: {
          email: params.email,
          tienda: params.tienda,
        },
      })
      if (data) {
        return { success: true }
      }
    } catch (err) {
      console.error('ERROR SEND_SUSCRIPTOR', err)
      return { success: false }
    }
  },

  GET_SHOPPING_CART({ state, commit, dispatch }) {
    if (localStorage.getItem(`ShoppingCart/${state.dataStore.id}`)) {
      commit(
        'SET_SHOPPING_CART',
        JSON.parse(localStorage.getItem(`ShoppingCart/${state.dataStore.id}`))
      )
    }
    dispatch('VERIFY_PRODUCTS')
  },
  async VERIFY_PRODUCTS({ state, commit }) {
    if (state.productsCart?.length > 0) {
      let idProducts = state.productsCart.map((a) => a.id.toString())
      if (idProducts.length == 1) {
        idProducts = [idProducts]
      }
      const { data } = await axios({
        method: 'POST',
        url: `${state.urlKomercia}/api/ids/por/productos`,
        headers: state.configAxios.headers,
        data: {
          id_tienda: state.dataStore.id,
          ids: idProducts,
        },
      })
      if (data) {
        let productServer = data.data
        let merged = []
        for (let i = 0; i < productServer.length; i++) {
          merged.push({
            ...state.productsCart[i],
            ...productServer[i],
          })
        }
        const productsFinal = merged.map((product) => {
          if (
            product.con_variante &&
            product.variantes &&
            product.variantes[0]
          ) {
            let variantesConSplit =
              product.variantes[0].combinaciones[0].combinaciones
            variantesConSplit = variantesConSplit.toString().slice(1, -1)
            let arrayObtain = JSON.parse('[' + variantesConSplit + ']')
            let filterCombination = arrayObtain.filter((item) => {
              if (
                item.combinacion.toString() == product.combinacion.toString()
              ) {
                return item
              }
            })
            const newProduct = {
              cantidad: product.cantidad,
              combinacion: filterCombination[0].combinacion,
              envio_gratis: product.envio_gratis,
              foto_cloudinary: product.foto_cloudinary,
              id: product.id,
              limitQuantity: parseInt(filterCombination[0].unidades),
              nombre: product.nombre,
              precio: filterCombination[0].precio,
              promocion_valor: product.promocion_valor,
              tag_promocion: product.tag_promocion,
              activo: product.activo,
              stock_disponible: 1,
              dropshipping: product.dropshipping,
              con_variante: product.con_variante,
            }
            if (!filterCombination[0].estado) {
              newProduct.activo = 0
            }
            if (filterCombination[0].unidades == 0) {
              newProduct.activo = 0
            } else {
              if (newProduct.cantidad > newProduct.limitQuantity) {
                newProduct.stock_disponible = 0
              }
            }
            return newProduct
          } else {
            const newProduct = {
              cantidad: product.cantidad,
              // combinacion: filterCombination[0].combinacion,
              con_variante: 0,
              envio_gratis: product.envio_gratis,
              foto_cloudinary: product.foto_cloudinary,
              id: product.id,
              limitQuantity: product.informacion_producto[0].inventario,
              nombre: product.nombre,
              precio: product.precio,
              promocion_valor: product.promocion_valor,
              tag_promocion: product.tag_promocion,
              activo: product.activo,
              stock_disponible: 1,
              dropshipping: product.dropshipping,
            }
            if (newProduct.cantidad == 0) {
              newProduct.activo = 0
            } else {
              if (newProduct.cantidad > newProduct.limitQuantity) {
                newProduct.stock_disponible = 0
              } else if (newProduct.cantidad <= newProduct.limitQuantity) {
                newProduct.stock_disponible = 1
              }
            }
            return newProduct
          }
        })
        commit('SET_SHOPPING_CART', productsFinal)
        // commit('UPDATE_CONTENT_CART')
        return { success: true }
      }
    }
  },
  SEND_ADD_TO_CART({ state, getters }, value) {
    let eventFacebook = ''
    if (value === 1) {
      eventFacebook = 'AddToCart'
    } else if (value === 2) {
      eventFacebook = 'InitiateCheckout'
    }
    if (eventFacebook) {
      let array = []
      let content = []
      if (state.productsCart && state.productsCart.length > 0) {
        if (
          state.analytics_tagmanager &&
          state.analytics_tagmanager.pixel_facebook != null
        ) {
          state.productsCart.map((element) => {
            if (element) {
              array.push(`${element.id}`)
              let temp = {
                id: `${element.id}`,
                quantity: element.cantidad,
              }
              content.push(temp)
            }
          })
          if (array && content) {
            window.fbq('track', eventFacebook, {
              content_type: 'product',
              content_ids: array,
              contents: content,
              currency: state.dataStore.tiendasInfo.moneda,
              value: getters.total ? getters.total : 0,
              num_items: getters.cantidadProductos,
              description: 'Productos agregados al carrito',
            })
          }
          this.$gtm.push({ event: eventFacebook })
        } else {
          // console.log('no tiene pixel')
        }
      } else {
        // console.log('no tiene productos en el carrito')
      }
    }
  },
  // API EXTERNA VERIFICA MONTOS DE ADDI
  // eslint-disable-next-line no-empty-pattern
  async VERIFY_AMOUNTS_ADDI({}, params) {
    try {
      const { data } = await axios({
        method: 'GET',
        url: `https://channels-public-api.addi.com/allies/${params.slug}/config?requestedAmount=${params.amount} `,
      })
      if (data) {
        return { success: true, data: data }
      }
    } catch (err) {
      console.log('CREATE_ORDER_ADDI', err)
      return { success: false, location: null }
    }
  },
}
export const getters = {
  subtotalCart(state) {
    return state.totalCart
  },
  cantidadProductos(state) {
    return state.productsCart
      ? state.productsCart.reduce(
          (total, product) => total + parseInt(product.cantidad),
          0
        )
      : 0
  },

  listaDescuentosProductos(state, getters) {
    const activeDiscounts = state.listDescuentos
      .filter((element) => element.tipo === 0 && element.estado === 1)
      .filter(
        (element) => getters.cantidadProductos >= element.cantidad_productos
      )

    if (activeDiscounts.length > 0) {
      const resultDesc = activeDiscounts[0]
      const data = {
        cantidad: resultDesc.cantidad_productos,
        valor:
          resultDesc.opcion === 1
            ? resultDesc.valor_descuento
            : resultDesc.porcentaje_descuento,
        tipo: resultDesc.opcion,
      }
      return data
    } else {
      return ''
    }
  },
  listaDescuentosPrecio(state) {
    const activeDiscounts = state.listDescuentos.filter(
      (element) => element.tipo === 1 && element.estado === 1
    )

    let resultDesc = null

    activeDiscounts.forEach((element) => {
      const rangosByDisconunt = JSON.parse(element.rangos_precios)

      if (rangosByDisconunt) {
        rangosByDisconunt.some((rango) => {
          if (
            state.totalCart >= rango['inicial'] &&
            state.totalCart <= rango['final']
          ) {
            resultDesc = rango
            return true // Termina la iteración al encontrar un rango válido
          }
          return false
        })
      }
    })

    return resultDesc || ''
  },
  total(getters) {
    return getters.subtotalCart || 0
  },
  verifyProducts(state) {
    if (!state.productsCart) {
      return 0
    }

    const verifiedProducts = state.productsCart.filter(
      (product) => product.activo === 1 && product.stock_disponible === 1
    )

    if (verifiedProducts.length === state.productsCart.length) {
      return 1
    } else {
      return 0
    }
  },
  locationStore(state) {
    if (!state.dataStore) {
      return null
    }

    if (state.dataStore.template === 99) {
      return `https://wapi.me/wa/${state.dataStore.id}`
    }

    const suffix = state.dataStore.template !== 3 ? 'store' : 'co'

    if (state.dataStore.tiendasInfo.dominio) {
      return state.dataStore.tiendasInfo.dominio
    }

    return `https://${state.dataStore.subdominio}.komercia.${suffix}`
  },
  userDropshipping(state) {
    if (state.productsCart) {
      for (const product of state.productsCart) {
        if (product.dropshipping) {
          return product.dropshipping
        }
      }
    }
    return null
  },
}

function setCurrentSetting(state, { component, setting, template }) {
  if (component && setting) {
    // eslint-disable-next-line no-prototype-builtins
    if (state[`settingByTemplate${template}`].hasOwnProperty(component)) {
      state[`settingByTemplate${template}`][component] = setting
    }
  }
}

function obtenerInfoURL(url) {
  let nombreTienda = ''
  let esSubdominio = false
  let esDominio = false
  let idTienda = ''

  // Caso especial para mipueblitoeco.com
  const specialCasePattern = /^https:\/\/(www\.)?tienda\.mipueblitoeco\.com\/?$/
  if (specialCasePattern.test(url)) {
    return {
      nombreTienda: 'https://www.tienda.mipueblitoeco.com',
      esSubdominio: false,
      esDominio: true,
      idTienda: '',
    }
  }

  const subdominioMatch = url.match(
    /\/\/([^\/.:]+)\.(komercia\.store|komercia\.online)/
  )
  if (subdominioMatch) {
    nombreTienda = subdominioMatch[1]
    esSubdominio = true
  } else {
    const idTiendaMatch = url.match(/\/wa\/(\d+)\/?/)
    if (idTiendaMatch) {
      nombreTienda = 'Wapi'
      idTienda = idTiendaMatch[1]
      esSubdominio = false
      esDominio = false
    } else {
      const wapiMatch = url.match(/\/\/(?:www\.)?wapi\.me\/wa\/(\d+)\/?/)
      if (wapiMatch) {
        nombreTienda = 'Wapi'
        idTienda = wapiMatch[1]
        esSubdominio = false
        esDominio = false
      } else {
        const localhostWapiMatch = url.match(
          /\/\/(?:www\.)?localhost:3000\/wa\/(\d+)\/?/
        )
        if (localhostWapiMatch) {
          nombreTienda = 'Wapi'
          idTienda = localhostWapiMatch[1]
          esSubdominio = false
          esDominio = false
        } else {
          const subdominioParts = url.match(/\/\/([^\/.:]+)\.localhost:3000\/?/)
          if (subdominioParts) {
            nombreTienda = subdominioParts[1]
            esSubdominio = true
            esDominio = false
          } else {
            const domainParts = url.match(
              /\/\/(?:www\.)?([^\/.:]+)\.(com\.co?|store|...)/
            )
            if (domainParts && domainParts[1] !== 'www') {
              nombreTienda = domainParts[1]
              esDominio = true
            }
          }
        }
      }
    }
  }

  // Nueva validación para capturar el ID de wapi con parámetros adicionales en la URL
  const wapiWithParamsMatch = url.match(/(\/wa\/\d+)(\S*)/)
  if (wapiWithParamsMatch) {
    idTienda = wapiWithParamsMatch[1].split('/').pop()
  }

  return {
    nombreTienda,
    esSubdominio,
    esDominio,
    idTienda,
  }
}

async function getIdData(state, req, commit) {
  const protocol =
    req.headers['x-forwarded-proto'] ||
    (req.connection.encrypted ? 'https' : 'http')
  const currentURL = `${protocol}://${req.headers.host}${req.url}`
  const getURL = obtenerInfoURL(currentURL)
  // const getURL = obtenerInfoURL('https://wapi.me/wa/18265/')
  let id = 0
  let template = 0
  let idWapi = null
  let isDataTemplate = null
  let subdomain = getURL?.nombreTienda ?? null

  if (getURL?.idTienda) {
    idWapi = getURL.idTienda
    template = 99
  } else if (getURL?.esSubdominio && getURL?.nombreTienda) {
    try {
      const response = await axios.get(
        `${state.urlAWSsettings}/api/v1/templates/websites/template?criteria=${getURL.nombreTienda}`
      )

      id = response.data.data.id || response.data.data.storeId
      template =
        response.data.data.templateNumber || response.data.data.template

      if (
        template === 15 ||
        template === 6 ||
        response?.data?.data?.webSiteTemplate
      ) {
        isDataTemplate = true
        commit(`SET_SETTINGS_BY_TEMPLATE`, {
          templateNumber: template,
          value: response.data.data.webSiteTemplate,
        })
      }
    } catch (err) {
      console.log(
        `No se encontro la tienda ${getURL.nombreTienda} subdominio, ${err}`
      )
    }
  } else if (getURL?.esDominio && getURL?.nombreTienda) {
    try {
      const response = await axios.get(
        `${state.urlAWSsettings}/api/v1/templates/websites/template?criteria=${getURL?.nombreTienda}&isDomain=1`
      )
      id = response.data.data.id || response.data.data.storeId
      template =
        response.data.data.templateNumber || response.data.data.template
      if (template === 15 || template === 6) {
        commit(`SET_SETTINGS_BY_TEMPLATE`, {
          templateNumber: template,
          value: response.data.data.webSiteTemplate,
        })
      }
    } catch (err) {
      console.log(
        `No se encontro la tienda ${getURL.nombreTienda} dominio, ${err}`
      )
    }
  }
  if (
    (getURL.nombreTienda === '' &&
      template === 0 &&
      (id === 0 || idWapi === null)) ||
    getURL.nombreTienda === 'komercia' ||
    (template === 0 && (id === 0 || idWapi === null))
  ) {
    state.storeError = true
    id = 0
    template = 0
    idWapi = null
  } else {
    state.storeError = false
  }
  return { subdomain, id, template, idWapi, isDataTemplate }
}

async function handleWapi(commit, dispatch, idWapi, isDataTemplate) {
  commit('SET_TEMPLATE_STORE', 99)

  // await dispatch('GET_SETTINGS_BY_TEMPLATE_WAPI', idWapi)
  if (!isDataTemplate) {
    await dispatch('GET_SETTINGS_BY_TEMPLATE', {
      templateStore: 99,
      idStore: idWapi,
    })
  }
  await dispatch('GET_DATA_TIENDA_BY_ID', idWapi)

  commit('SET_STATE_WAPIME', true)
}

async function handleKomercia(id, template, isDataTemplate, commit, dispatch) {
  if (id) {
    commit('SET_TEMPLATE_STORE', template)
    await dispatch('GET_DATA_TIENDA_BY_ID', id)
    await dispatch('GET_DATA_HOKO', id)
    if (
      (template === 7 ||
        template === 9 ||
        template === 10 ||
        template === 11 ||
        template === 12 ||
        template === 13 ||
        template === 14 ||
        template === 16) &&
      !isDataTemplate
    ) {
      await dispatch('GET_SETTINGS_BY_TEMPLATE_NODE', {
        templateStore: template,
        idStore: id,
      })
    }
    // else if () {
    //   if (id && template) {
    //     await dispatch('GET_SETTINGS_BY_TEMPLATE_AWS', {
    //       templateStore: template,
    //       subdominio: state.dataStore.subdominio,
    //     })
    //   }
    // }
    else if ((template === 5 || template === 99) && !isDataTemplate) {
      await dispatch('GET_SETTINGS_BY_TEMPLATE', {
        templateStore: template,
        idStore: id,
      })
      await commit('SET_STATE_WAPIME', false)
    }
  }
}
async function handleDataStore(state, commit) {
  if (state?.dataStore?.disenoModals[0]?.stateModal === 1) {
    await commit('SET_STATE_MODAL_PWD', false)
  }
}
