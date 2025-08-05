<template>
  <div v-swiper:mySwiper="swiperOption" ref="mySwiper" class="w-full flex">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(photo, index) in photos" :key="index">
        <img
          loading="lazy"
          :src="photo"
          class="photo w-full flex justify-center"
          alt="ProductHoko"
        />
      </div>
    </div>
    <div class="swiper-pagination" slot="pagination"></div>
  </div>
</template>

<script>
export default {
  ame: 'Ko5ProductSlideDetailsHoko',
  props: ['photos'],
  data() {
    return {
      swiperOption: {
        autoHeight: true,
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        grabCursor: true,
        slidesPerView: '1',
        direction: 'horizontal',
        pagination: {
          el: '.swiper-pagination',
        },
        // setWrapperSize: true,
        paginationClickable: true,
        grabCursor: true,
        // autoplay: {
        //   delay: 2500,
        //   disableOnInteraction: false,
        // },
      },
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    },
  },
}
</script>

<style scoped>
.swiper-wrapper {
}
.swiper-slide {
  width: 100%;
  max-width: 375px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  overflow: hidden;
}
.photo {
  width: 100%;
  object-fit: cover;
  overflow: hidden;
}
.photos .responsive .swiper-pagination-bullet {
  background-color: rgba(255, 255, 255, 0.5);
}
.photos .responsive .swiper-pagination-bullet-active {
  background-color: #fff;
}
.youtube {
  width: 99%;
  max-width: 400px;
  display: grid;
  justify-items: start;
  grid-gap: 5px;
}
.youtube__action_back {
  background-color: var(--color_background_btn);
  color: var(--color_text_btn);
  border-style: none;
  outline: none;
}
</style>
