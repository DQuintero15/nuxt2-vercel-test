<template>
  <div class="wrapper">
    <div class="accordion" @click="toggleItem">
      <div class="accordion-items">
        <slot name="categorias"></slot>
        <Flechadown-icon v-if="!show" class="icon" />
        <FlechaUp-icon v-if="show" class="icon" />
      </div>
    </div>
    <div v-show="show" class="content">
      <slot name="subcategorias"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AccordionList',
  data: function () {
    return {
      show: false,
    }
  },
  methods: {
    toggleItem: function () {
      this.show = !this.show
    },
  },
}
</script>
<style scoped>
.wrapper {
  width: 100%;
  padding: 5px 0px;
  background: transparent;
}
.accordion {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  margin: 0;
}
.accordion-items {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 3px;
}
.content {
  margin-top: 10px;
  padding-left: 2px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.icon {
  position: relative;
  font-size: 24px;
  color: var(--color_icon);
  top: -3px;
}
.icon:hover {
  color: var(--color_hover_text);
}
</style>
