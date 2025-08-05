<template>
  <div class="select">
    <select
      ref="format"
      name="format"
      style="border-color: var(--color_border, var(--border))"
      @change="updateValue"
    >
      <option disabled>{{ $t('productdetail_seleccionarOpcion') }}</option>
      <slot></slot>
    </select>
  </div>
</template>

<script>
export default {
  name: 'SelectGroupDetails',
  props: {
    index: {
      type: Number,
      required: true,
    },
    variantes: {
      type: Array,
      required: true,
    },
  },
  mounted() {
    this.saveOption()
  },
  methods: {
    updateValue() {
      this.$emit('input', this.$refs.format.value)
      if (this.$refs.format.value) {
        let variante = this.variantes[this.index].valores.filter((item) => {
          return item.option == this.$refs.format.value
        })
        this.$store.state.beforeCombination.splice(
          this.index,
          1,
          variante[0].option,
        )
      }
    },
    saveOption() {
      this.$store.state.beforeCombination.splice(
        this.index,
        1,
        this.variantes[this.index].valores[0].option,
      )
    },
  },
}
</script>

<style scoped>
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  appearance: none;
  outline: 0;
  box-shadow: none;
  border: 0 !important;
  background: transparent;
  background-image: none;
  color: var(--color_description);
  /* color: #777; */
  font-weight: 600;
}
select::-ms-expand {
  display: none;
}
.select {
  position: relative;
  display: flex;
  width: 15em;
  height: 40px;
  background: transparent;
  overflow: hidden;
  border: 2px solid;
  border-top-left-radius: var(--radius_btn);
  border-bottom-left-radius: var(--radius_btn);
  border-top-right-radius: var(--radius_btn);
  border-bottom-right-radius: var(--radius_btn);
}
select {
  flex: 1;
  padding: 0 0.5em 0 1em;
  cursor: pointer;
  font-size: 1em;
}
.select::after {
  content: url('data:image/svg+xml;charset=UTF-8, <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" fill="Dark Gray" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>');
  position: absolute;
  top: 0;
  right: 0;
  padding: 0.4em 1em;
  cursor: pointer;
  pointer-events: none;
  transition: 0.25s all ease;
}
.select:hover::after {
  content: url('data:image/svg+xml;charset=UTF-8, <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" fill="Red" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>');
}
option {
  color: var(--color_description);
  /* color: #333; */
}
option:disabled {
  background: white;
  color: #333;
  font-weight: bold;
}
</style>
