import Vue from 'vue'
import VueFbCustomerChat from 'vue-fb-customer-chat'

export default ({ store }) => {
  const chatFacebook = store.state.analytics_tagmanager?.facebook_chat

  if (chatFacebook) {
    Vue.use(VueFbCustomerChat, {
      page_id: chatFacebook,
      locale: 'es_CO',
    })
  }
}
