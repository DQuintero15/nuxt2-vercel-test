export default async ({ store }) => {
  if (process.client) {
    const storeID = store?.state?.dataStore?.id

    if (storeID !== 1559) {
      return
    }

    window.chatwootSettings = {
      position: 'right',
      type: 'standard',
      launcherTitle: 'Chatea con nosotros',
    }

    const BASE_URL = 'https://chat.komercia.app'
    const script = document.createElement('script')
    script.src = `${BASE_URL}/packs/js/sdk.js`
    script.async = true

    script.onload = () => {
      window.chatwootSDK.run({
        websiteToken: '1vj8QUfnQFxiqSpQpuj9dxVP',
        baseUrl: BASE_URL,
      })
    }

    document.head.appendChild(script)
  }
}
