import { IPersistence, BroadcastStoreUpdateMsg } from "~/interfaces";
import ActionStore from "./ActionStore";
import DeviceStore from "./DeviceStore";
import OptionStore from "./OptionStore"
import Store from "./Store";

export { 
    ActionStore,
    DeviceStore,
    OptionStore
}
export function StoreProxy<T>(store: Store<T>){

    return new Proxy([] as T[], {     
    
        get: function(target, property):T[]{

            if(target.length === 0){

                target = store.readAllSync()
            }
            return target[property]
        },
        set: function(target, property, value, reciever){

            target[property] = value
            // @ts-ignore
            store.write(value, null)
            return true;
        }
    })
    
}


