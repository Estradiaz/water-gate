import { IPersistence, BroadcastStoreUpdateMsg } from "~/interfaces";
import ActionStore from "./ActionStore";
import DeviceStore from "./DeviceStore";
import OptionStore from "./OptionStore"
import Store from "./Store";
import { Server } from "ws";


export function StoreProxy<T>(store: Store<T>){

    var privateVar: T[] = []
    return {
        get(): T[]{

            if(privateVar.length === 0){
        
                privateVar = store.readAllSync()
            }
            return privateVar
        },
        set(values: T[]){

            store.write(values)
        }
    }
}

export { 
    ActionStore,
    DeviceStore,
    OptionStore
}