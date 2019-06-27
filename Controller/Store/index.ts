import ActionStore from "./ActionStore";
import DeviceStore from "./DeviceStore";
import OptionStore from "./OptionStore"
import Store from "./Store";
import { IStoreElement } from "~/interfaces";

export { 
    ActionStore,
    DeviceStore,
    OptionStore
}
export function StoreProxy<T extends IStoreElement>(store: Store<T>){

    return new Proxy([] as T[], {     
    
        get: function(target, property):T[]{
            if(store.load && target.length === 0){
                store.load = false
                // will this call setter??
                target.push(...store.readAllSync())
            } 
            if(property == 'constructor')
            //@ts-ignore
            store.broadCast({data: target})
            return target[property]
        },
        set: function(target, property, value, reciever){
            target[property] = value
            // @ts-ignore
            store.write(target, null)
            return true;
        }
    })
    
}


