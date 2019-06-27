import { Nuxt, Builder} from 'nuxt'
import config from '../../nuxt.config'
export default async function(){
    const nuxt = new Nuxt(config);
    await (new Builder(nuxt)).build()
    return nuxt
}