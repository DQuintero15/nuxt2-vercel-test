<template>
  <div>
    <div v-if="!isFinished" class="mt-30 grid grid-flow-col gap-x-4">
      <div
        class="w-[60px] px-3 py-8 text-center"
        :style="`color: ${information.color_text_discount}; background-color: ${information.color_bg}; border-color: ${information.color_bg_discount}; border-radius: ${settingGeneral?.radius};`"
      >
        <p class="text-18 font-bold">
          {{ days }}
        </p>
        <span class="text-14">días</span>
      </div>
      <div
        class="w-[60px] px-3 py-8 text-center"
        :style="`color: ${information.color_text_discount}; background-color: ${information.color_bg}; border-color: ${information.color_bg_discount}; border-radius: ${settingGeneral?.radius};`"
      >
        <p class="text-18 font-bold">
          {{ hours }}
        </p>
        <span class="text-14">horas</span>
      </div>
      <div
        class="w-[60px] px-3 py-8 text-center"
        :style="`color: ${information.color_text_discount}; background-color: ${information.color_bg}; border-color: ${information.color_bg_discount}; border-radius: ${settingGeneral?.radius};`"
      >
        <p class="text-18 font-bold">
          {{ minutes }}
        </p>
        <span class="text-14">min</span>
      </div>
      <div
        class="w-[60px] px-3 py-8 text-center"
        :style="`color: ${information.color_text_discount}; background-color: ${information.color_bg}; border-color: ${information.color_bg_discount}; border-radius: ${settingGeneral?.radius};`"
      >
        <p class="text-18 font-bold">
          {{ seconds }}
        </p>
        <span class="text-14">seg</span>
      </div>
    </div>
    <div
      v-else
      class="mt-30 text-16 font-semibold xl:text-20"
      :style="`color: ${information.color_text_discount};`"
    >
      <p>Oferta finalizada</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'K0CountDown',
  props: {
    information: {
      type: Object,
      required: true,
    },
    settingGeneral: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      countdown: {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      },
      isFinished: false,
      swiperOption: {
        effect: 'fade',
        slidesPerView: '1',
        grabCursor: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
      },
      selectProduct: {},
    }
  },
  computed: {
    days() {
      return this.countdown.days
    },
    hours() {
      return this.countdown.hours
    },
    minutes() {
      return this.countdown.minutes
    },
    seconds() {
      return this.countdown.seconds
    },
  },
  watch: {
    'information.values'() {
      this.updateCountdown()
      setInterval(this.updateCountdown, 1000)
    },
  },
  mounted() {
    if (this.information) {
      this.updateCountdown()
      setInterval(this.updateCountdown, 1000)
    }
  },
  methods: {
    updateCountdown() {
      const now = new Date().getTime()
      const timeLeft = new Date(`${this.information.maximumTime}`) - now

      if (timeLeft <= 0) {
        this.isFinished = true
        return
      }

      this.countdown.days = Math.floor(timeLeft / (1000 * 60 * 60 * 24))
      this.countdown.hours = Math.floor(
        (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      )
      this.countdown.minutes = Math.floor(
        (timeLeft % (1000 * 60 * 60)) / (1000 * 60),
      )
      this.countdown.seconds = Math.floor((timeLeft % (1000 * 60)) / 1000)
    },
  },
}
</script>
