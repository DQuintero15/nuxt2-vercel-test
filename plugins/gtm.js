export default function ({ $gtm, store }) {
  const tagManager = store.state.analytics_tagmanager?.tag_manager

  if (tagManager) {
    $gtm.init(tagManager)
  }
}
