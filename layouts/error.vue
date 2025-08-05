<template>
  <div class="nuxt-error">
    <component :is="errorPage" :error="error" />
  </div>
</template>
<script>
import error404 from '../components/Ko-error404'
import error500 from '../components/Ko-error500'

export default {
  name: 'NuxtError',
  components: {
    error404,
  },
  layout: 'default',
  props: {
    error: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    errorPage() {
      if (this.error.statusCode === 404) {
        return error404
      } else {
        return error500
      }
    },
  },
}
</script>
