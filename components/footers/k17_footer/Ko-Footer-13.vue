<template>
  <!-- :style="[
      settingByTemplate16[0].footer,
      settingByTemplate16[0].settingGeneral,
      {
        '--font-style-1':
          settingByTemplate16[0].settingGeneral?.font ?? 'Poppins',
      },
    ]" -->
  <footer
    ref="background"
    class="flex w-full items-center justify-center bg-transparent pb-30 md:pb-0"
    :style="[
      {
        '--font-style-1': 'Poppins',
      },
    ]"
  >
    <!-- :style="`background-color: ${settingByTemplate16[0].footer['--background_color_1']}`" -->
    <div
      class="flex w-full max-w-5xl flex-col items-center justify-center bg-[#00A896]"
    >
      <!-- v-if="settingByTemplate16[0].footer.watermark" -->

      <div class="flex w-full flex-col items-center justify-center py-20">
        <!-- <p class="mb-5 text-[14px] font-normal text-[#00544B]">
          {{ $t('footer_desarrollado') }}
        </p> -->
        <a
          href="https://komercia.co/"
          target="_blank"
          rel="noreferrer noopener"
        >
          <!-- `https://res.cloudinary.com/komercia-components/image/upload/c_scale,w_500,q_auto:best,f_auto/v1582151044/assets/cnrizgaks15xpkxk22ex.png` -->
          <img
            v-lazy="
              `https://res.cloudinary.com/komercia-components/image/upload/c_scale,w_500,q_auto:best,f_auto/v1575331333/components/files/majg1iax3sjgrtyvrs9x.png`
            "
            class="w-full max-w-[100px] opacity-[0.5]"
            alt="Logo Img"
          />
        </a>
      </div>
    </div>
  </footer>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'KoFooter13',
  components: {},
  props: {
    dataStore: {
      type: Object,
      required: true,
    },
    // settingByTemplate16: {
    //   type: Array,
    //   required: true,
    // },
  },
  data() {
    return {}
  },
  computed: {
    ...mapState(['stateListBLogs', 'storePolicies', 'geolocalizacion']),
    ...mapState({
      showModal: (state) => state.modalpolitics05,
    }),
  },
  watch: {
    // settingByTemplate16() {
    //   if (this.settingByTemplate16 && this.settingByTemplate16[0].footer) {
    //     let color = this.settingByTemplate16[0].footer['--background_color_1']
    //     let colorArray = color.split(',')
    //     let colorInt = parseInt(colorArray[2])
    //     if (colorInt > 50) {
    //       this.logo = true
    //     } else {
    //       this.logo = false
    //     }
    //   }
    // },
  },
  mounted() {
    // if (this.settingByTemplate16 && this.settingByTemplate16[0].footer) {
    //   this.setLogo()
    // }
    // var acc = document.getElementsByClassName('accordion')
    // var i
    // for (i = 0; i < acc.length; i++) {
    //   acc[i].addEventListener('click', function () {
    //     this.classList.toggle('active')
    //     var panel = this.nextElementSibling
    //     if (panel.style.maxHeight) {
    //       panel.style.maxHeight = null
    //     } else {
    //       panel.style.maxHeight = panel.scrollHeight + 10 + 'px'
    //     }
    //   })
    // }
  },
  methods: {
    OpenModalPolitics() {
      this.$store.state.modalpolitics05 = true
    },
    setLogo() {
      let color = getComputedStyle(this.$refs.background).getPropertyValue(
        '--background_color_1',
      )
      let colorArray = color.split(',')
      let colorInt = parseInt(colorArray[2])
      if (colorInt > 50) {
        this.logo = true
      } else {
        this.logo = false
      }
    },
  },
}
</script>

<style scoped>
* {
  font-family: var(--font-style-1) !important;
}
</style>
