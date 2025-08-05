import Vue from 'vue'

Vue.mixin({
  methods: {
    getIdCloudinary(url) {
      const segments = url.split('/')
      const id = segments.slice(-4).join('/')
      return id
    },
    currency(value) {
      if (value) {
        return `$ ${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`
      }
      return 'Producto sin precio'
    },
  },
})
