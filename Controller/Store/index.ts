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

            if(target.length === 0){

                target = store.readAllSync()
            }
            return target[property]
        },
        set: function(target, property, value, reciever){

            console.log(property, value)
            target[property] = value
            // @ts-ignore
            store.write(target, null)
            return true;
        }
    })
    
}


