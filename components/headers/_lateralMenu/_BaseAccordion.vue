<template>
  <div class="wrapper">
    <div class="accordion" @click="toggleItem">
      <div class="accordion-items">
        <slot name="categorias"></slot>
        <mas-icon v-if="!show" class="icon" />
        <menos-icon v-if="show" class="icon" />
      </div>
    </div>
    <div v-show="show" class="content">
      <slot name="subcategorias"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'KoBseAccordion',
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
  /* padding: 5px 0px; */
  background: transparent;
  /* box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.08); */
}
.accordion {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 0.25s ease;
}
.accordion-items {
  transition: all 0.25s ease;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-right: 20px;
  /* border-bottom: 1px solid #2c2930; */
  /* padding-top: 3px; */
  /* border-top: 1px solid var(--color_border); */
}
.content {
  padding-left: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transition: all 0.25s ease;

  /* border-bottom: 1px solid rgba(129, 129, 129, 0.2); */
}
.icon {
  font-size: 15px;
  color: #2c2930;
}
.icon:hover {
  color: #000;
}
</style>
