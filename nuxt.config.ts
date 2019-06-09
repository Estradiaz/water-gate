import NuxtConfiguration from '@nuxt/config'

const config: NuxtConfiguration = {
    
    plugins: [
        {
            src: '@/plugins/serverReady/index.ts',
            mode: 'server'
        }
    ],
    serverMiddleware: [
    ]
}

export default config