export default defineAppConfig({
  title: 'BEKA Group Alliance | Digital Experience Consultancy &amp; Implementation',
  description: 'BEKA Group Alliance | Digital Experience Consultancy &amp; Implementation',
  pages: {
    home: {
      path: '/',
      name: 'Home'
    },
    'not-found': {
      path: '/:pathMatch(.*)*',
      title: 'Page Not Found'
    }
  },
  repository: 'nuxt/ui',
  ui: {
    colors: {
      primary: 'green',
      neutral: 'slate'
    },
    prose: {
      li: {
        base: 'break-words'
      },
      a: {
        base: 'break-words'
      }
    }
  }
})
