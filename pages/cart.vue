<template>
  <KCart :data-store="dataStore" />
</template>

<script>
export default {
  name: 'ContentCart',
  components: {
    KCart: () => import('../components/cart/Ko-Cart'),
  },
  layout: 'default',
  computed: {
    dataStore() {
      return this.$store.state.dataStore
    },
  },
}
</script>
