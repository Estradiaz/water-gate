import NuxtConfiguration from '@nuxt/config'

require('dotenv').config();
const config: NuxtConfiguration = {
    
    server: {
      host: process.env.WEBSERVER_HOST || 'localhost',
      port: process.env.WEBSERVER_PORT || 3000
    },
    modules: [
      '@nuxtjs/vuetify'
    ],
    vuetify: {},
}

export default config