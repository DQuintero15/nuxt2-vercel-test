<template>
  <component :is="indexTemplate" v-bind="componentsProps" />
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'BlogPageIndex',
  components: {
    K05Blog: () => import('@/components/template5/blog/Ko-Blog.vue'),
    K07Blog: () => import('@/components/template7/blog_page/Ko-Blog.vue'),
    K09Blog: () => import('@/components/template9/blog_page/Ko-Blog.vue'),
    K10Blog: () => import('@/components/template10/blog_page/Ko-Blog.vue'),
    K11Blog: () => import('@/components/template11/blog_page/Ko-Blog.vue'),
    K12Blog: () => import('@/components/template12/K012-blog.vue'),
    K13Blog: () => import('@/components/template13/_blog/Ko-Blog.vue'),
    K14Blog: () => import('@/components/template14/_cardBlog/KoBlog.vue'),
    K15Blog: () => import('@/components/template15/_cardBlog/Ko-index.vue'),
    K16Blog: () => import('@/components/template16/_cardBlog/Ko-index.vue'),
  },
  layout: 'default',
  data() {
    return {
      componentMapping: {
        3: 'K05Blog',
        5: 'K05Blog',
        6: 'K05Blog',
        7: 'K07Blog',
        9: 'K09Blog',
        10: 'K10Blog',
        11: 'K11Blog',
        12: 'K12Blog',
        13: 'K13Blog',
        14: 'K14Blog',
        15: 'K15Blog',
        16: 'K16Blog',
      },
      templateMapping: {
        9: 'SET_CURRENTSETTING09',
        7: 'SET_CURRENTSETTING07',
        11: 'SET_CURRENTSETTING11',
        10: 'SET_CURRENTSETTING10',
        13: 'SET_CURRENTSETTING13',
        14: 'SET_CURRENTSETTING14',
        15: 'SET_CURRENTSETTING15',
        16: 'SET_CURRENTSETTING16',
      },
    }
  },
  computed: {
    ...mapState([
      'dataStore',
      'logoStore',
      'settingBase',
      'settingByTemplate',
      'settingByTemplate7',
      'settingByTemplate9',
      'settingByTemplate10',
      'settingByTemplate11',
      'settingByTemplate13',
      'settingByTemplate14',
      'settingByTemplate15',
      'settingByTemplate16',
      'template',
    ]),
    indexTemplate() {
      let productListComponent = ''
      // eslint-disable-next-line no-prototype-builtins
      if (this.componentMapping.hasOwnProperty(this.template)) {
        productListComponent = this.componentMapping[parseInt(this.template)]
      }
      return productListComponent
    },
    componentsProps() {
      return {
        dataStore: this.dataStore,
        logoStore: this.logoStore,
        settingK05Blog: this.settingByTemplate?.settings ?? this.settingBase,
        settingByTemplate7: this.settingByTemplate7
          ? [
              {
                settingGeneral: this.settingByTemplate7?.settingGeneral ?? null,
                settingK07Blog: this.settingByTemplate7?.blog1 ?? null,
                settingK07Blog1: this.settingByTemplate7?.blog ?? null,
              },
            ]
          : null,
        settingByTemplate9: this.settingByTemplate9
          ? [
              {
                blog: this.settingByTemplate9?.blog ?? null,
                settingGeneral: this.settingByTemplate9?.settingGeneral ?? null,
              },
            ]
          : null,
        settingByTemplate10: this.settingByTemplate10
          ? [
              {
                blog: this.settingByTemplate10?.blog ?? null,
                settingGeneral:
                  this.settingByTemplate10?.settingGeneral ?? null,
              },
            ]
          : null,
        settingByTemplate11: this.settingByTemplate11
          ? [
              {
                blog: this.settingByTemplate11?.blog ?? null,
                setting11General:
                  this.settingByTemplate11?.settingGeneral ?? null,
              },
            ]
          : null,
        settingByTemplate13: this.settingByTemplate13
          ? [
              {
                setting13General:
                  this.settingByTemplate13?.settingGeneral ?? null,
              },
            ]
          : null,
        settingByTemplate14: this.settingByTemplate14
          ? [
              {
                settingGeneral:
                  this.settingByTemplate14?.settingsGeneral ?? null,
                cardBlog: this.settingByTemplate14?.cardBlog ?? null,
              },
            ]
          : null,
        settingByTemplate15: this.settingByTemplate15
          ? [
              {
                settingGeneral:
                  this.settingByTemplate15?.settingGeneral ?? null,
                listBlogHome: this.settingByTemplate15?.listBlogHome ?? null,
                cardBlog: this.settingByTemplate15?.cardBlogs ?? null,
              },
            ]
          : null,
        settingByTemplate16: this.settingByTemplate16
          ? [
              {
                settingGeneral:
                  this.settingByTemplate16?.settingsGeneral ?? null,
                listBlogHome: this.settingByTemplate16?.listBlogHome ?? null,
                cardBlog: this.settingByTemplate16?.cardBlog ?? null,
              },
            ]
          : null,
      }
    },
  },
  beforeDestroy() {
    window.removeEventListener('message', this.addEventListenerTemplate)
  },
  mounted() {
    window.parent.postMessage('message', '*')
    window.addEventListener('message', this.addEventListenerTemplate)
  },
  methods: {
    addEventListenerTemplate(e) {
      if (
        e.origin.includes('https://panel.komercia.co') ||
        e.origin.includes('http://localhost:8080')
      ) {
        if (e && e.data && e.data.component) {
          const template = e.data.template
          // eslint-disable-next-line no-prototype-builtins
          if (this.templateMapping.hasOwnProperty(template)) {
            const commitAction = this.templateMapping[template]
            this.$store.commit(commitAction, e.data)
          }
        } else if (e && e.data && e.data.returnHome) {
          this.$router.push({
            path: '/',
          })
        }
      }
    },
  },
}
</script>
