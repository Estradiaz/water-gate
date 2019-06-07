import NuxtConfiguration from '@nuxt/config'

const config: NuxtConfiguration = {
    
    plugins: [
        {
            src: '@/plugins/serverReady/index.ts',
            mode: 'server'
        }
    ]
}


export default config