export default {
  methods: {
    // Imágenes de producto
    idCloudinary(url, width, height) {
      let fitImage = url.split('/upload/')
      let fitImage2 = url.split('/')
      if (fitImage2[2] == 'res.cloudinary.com') {
        return `https://res.cloudinary.com/${fitImage2[3]}/image/upload/dpr_auto,f_auto,fl_lossy,q_auto/c_crop,g_custom/h_${height},w_${width},b_auto,c_pad/${fitImage[1]}`
      } else {
        return url
      }
    },
    idCloudinaryQuality(url, width, height) {
      let fitImage = url.split('/upload/')
      let fitImage2 = url.split('/')
      if (fitImage2[2] == 'res.cloudinary.com') {
        return `https://res.cloudinary.com/${fitImage2[3]}/image/upload/dpr_auto,f_auto,fl_lossy,q_90/c_crop,g_custom/h_${height},w_${width},b_auto,c_pad/${fitImage[1]}`
      } else {
        return url
      }
    },
    idCloudinarys(url, width, height) {
      let fitImage = url.split('/upload/')
      let fitImage2 = url.split('/')
      if (fitImage2[2] == 'res.cloudinary.com') {
        return `https://res.cloudinary.com/${fitImage2[3]}/image/upload/dpr_auto,q_auto:best,c_crop,g_custom/c_scale,h_${height},w_${width}/${fitImage[1]}`
      } else {
        return url
      }
    },
    idCloudinaryBanner(url, type, width) {
      if (!url || typeof url !== 'string') {
        console.error('La URL proporcionada es inválida:', url)
        return null // Devuelve un valor predeterminado o maneja el error
      }
      let fitImage = url.split('/upload/')
      let fitImage2 = url.split('/')
      let fitImage3
      if (fitImage && fitImage.length > 1) {
        fitImage3 = fitImage[1].split('.')
      }
      if (fitImage2[2] == 'res.cloudinary.com') {
        if (type == 'banner') {
          return `https://res.cloudinary.com/${fitImage2[3]}/image/upload/dpr_auto,q_auto:best,c_crop,g_custom/${fitImage3[0]}.webp`
        } else if (type == 'bannerRes') {
          return `https://res.cloudinary.com/${fitImage2[3]}/image/upload/dpr_auto,q_auto:best,c_crop,g_custom/c_scale,w_${width}/${fitImage3[0]}.webp`
        }
      } else {
        return url
      }
    },
  },
}
