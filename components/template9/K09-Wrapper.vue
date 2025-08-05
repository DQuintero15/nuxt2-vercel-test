<template>
  <div class="wrapper-content" :style="[wrapper, settingGeneral]">
    <div
      :style="[
        {
          '--font-style-1': settingGeneral?.fount_1 ?? 'Poppins',
        },
      ]"
    >
      <div class="wrapper-items-content">
        <div class="product-text">
          <div class="product-tittle">
            <span class="tittle">{{ wrapper.title }}</span>
          </div>
        </div>
      </div>
      <div class="wrapper-items">
        <div
          v-for="(imagen, index) in wrapper.values"
          :key="index"
          class="grid-imgs"
        >
          <div
            :class="imagen.url_redirect ? 'cursorPointer' : null"
            @click="openURL(index)"
          >
            <img
              v-lazy="idCloudinary(imagen.url_img, 850, 850)"
              class="img-wrapp"
              alt="wrapper-images"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import idCloudinary from '@/mixins/idCloudinary'
export default {
  name: 'K09Wrapper',
  mixins: [idCloudinary],
  props: {
    dataStore: {
      type: Object,
      required: true,
    },
    wrapper: {
      type: Object,
      required: true,
    },
    settingGeneral: {
      type: Object,
      required: true,
    },
  },
  methods: {
    openURL(index) {
      if (this.wrapper.values[index].url_redirect) {
        window.open(
          `${this.wrapper.values[index].url_redirect}`,
          '_blank',
          'noreferrer noopener'
        )
      }
    },
  },
}
</script>
<style scoped>
.img-wrapp {
  transition: all 150ms ease-in;
}
.cursorPointer {
  cursor: pointer;
}
.img-wrapp:hover {
  transition: all 150ms ease-in;
  position: relative;
  -webkit-transform: scale(0.9);
  transform: scale(0.95);
}
.wrapper-content {
  background: var(--background_color_1);
  @apply flex flex-col justify-center items-center w-full pb-20;
}
.wrapper-items-content {
  @apply flex flex-col justify-center items-center;
  width: 100%;
}
.wrapper-items {
  @apply justify-center items-center;
}
.product-text {
  @apply flex flex-col justify-center items-center w-full my-60;
}
.product-tittle {
  text-align: center;
  @apply flex flex-col justify-center items-center;
}
.tittle {
  @apply flex flex-col justify-center items-center;
  /* font-family: 'Poppins', Helvetica, Arial, sans-serif !important; */
  font-family: var(--font-style-1);
  color: var(--color_title);
  font-weight: 700;
}
@screen sm {
  .product-tittle {
    width: 100%;
  }
  .tittle {
    line-height: 1.1;
    letter-spacing: 0px;
    font-size: 30px;
  }
  .wrapper-items {
    @apply grid grid-cols-2 gap-2;
  }
  .img-wrapp {
    width: 100%;
  }
  .wrapper-items {
    width: 96vw;
  }
}
@media (min-width: 640px) {
  .wrapper-items {
    @apply grid grid-cols-3 gap-2;
  }
  .wrapper-items {
    width: 98vw;
  }
  .tittle {
    line-height: 34px;
    font-size: 36px;
  }
  .product-text {
    @apply my-0 pt-30 pb-50;
  }
}
@screen lg {
  .wrapper-items {
    @apply grid grid-cols-5 gap-2;
  }
  .img-wrapp {
    transition: all 150ms ease-in;
    width: 90vw;
  }
  .wrapper-items {
    width: 99vw;
  }
}
@screen xml {
  .product-tittle {
    width: 100%;
  }
}
</style>
