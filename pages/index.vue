<template>
  <component :is="indexTemplate" class="flex-auto" />
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'PageIndex',
  components: {
    KoTemplate5: () => import('./template5/index'),
    KoTemplate6: () => import('./template6/index'),
    KoTemplate7: () => import('./template7/index'),
    KoTemplate8: () => import('./template8/index'),
    KoTemplate9: () => import('./template9/index'),
    KoTemplate10: () => import('./template10/index'),
    KoTemplate11: () => import('./template11/index'),
    KoTemplate12: () => import('./template12/index'),
    KoTemplate13: () => import('./template13/index'),
    KoTemplate14: () => import('./template14/index'),
    KoTemplate15: () => import('./template15/index'),
    KoTemplate16: () => import('./template16/index'),
    KoTemplate17: () => import('./template17/index'),
    KoTemplateWhatsApp: () => import('./template99/index'),
  },
  data() {
    return {
      componentMapping: {
        5: 'KoTemplate5',
        6: 'KoTemplate6',
        7: 'KoTemplate7',
        9: 'KoTemplate9',
        10: 'KoTemplate10',
        11: 'KoTemplate11',
        12: 'KoTemplate12',
        13: 'KoTemplate13',
        14: 'KoTemplate14',
        15: 'KoTemplate15',
        16: 'KoTemplate16',
        17: 'KoTemplate17',
        99: 'KoTemplateWhatsApp',
      },
    }
  },
  computed: {
    ...mapState(['template']),
    indexTemplate() {
      let productListComponent = ''
      // eslint-disable-next-line no-prototype-builtins
      if (this.componentMapping.hasOwnProperty(this.template)) {
        productListComponent = this.componentMapping[parseInt(this.template)]
      }
      return productListComponent
    },
  },
}
</script>
