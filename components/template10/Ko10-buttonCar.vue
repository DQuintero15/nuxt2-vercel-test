<template>
  <div
    class="w-100 h-50 flex flex-row justify-start items-center fixed bottom-30 left-30 z-50"
  >
    <div
      class="w-42 h-42 flex justify-center items-center cursor-pointer rounded-full text-[#222222] bg-white-white hover:text-[#eb7025] header-content-icon"
      @click="openOrder"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="19"
        height="19"
        fill="currentColor"
        class="icon-shop"
        viewBox="0 0 16 16"
      >
        <title>Cart</title>
        <path
          d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"
        />
      </svg>
    </div>
    <div class="relative -mt-30 -ml-15">
      <span
        class="rounded-full px-6 py-1 text-12 bg-[#222222] text-white-white"
      >
        {{ productsCart }}
      </span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Ko10ButtonCar',
  computed: {
    productsCart() {
      return this.$store.state.productsCart.length
    },
  },
  methods: {
    openOrder() {
      this.$store.commit('SET_OPEN_ORDER', true)
    },
  },
}
</script>
<style scoped>
.header-content-icon {
  -webkit-box-shadow: 0px 2px 6px 0px #7f7f7f;
  box-shadow: 0px 2px 6px 0px #7f7f7f;
}
.header-content-icon:hover {
  -webkit-box-shadow: 0px 2px 49px 0px #7f7f7f;
  box-shadow: 0px 2px 49px 0px #7f7f7f;
}
</style>
