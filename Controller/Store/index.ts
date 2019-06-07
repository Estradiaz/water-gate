import { IPersistence } from "~/interfaces";
import ActionStore from "./ActionStore";
import DeviceStore from "./DeviceStore";
import OptionStore from "./OptionStore"

export default class Store<T> implements IPersistence<T>{

    readSync(): T | undefined{

        return undefined
    }
    readAllSync(): T[]{

        return []
    }
    write(values: T[]): void{

        
    } 
    append(value: T): void{

        
    } 
    
}

export function StoreProxy<T>(store: Store<T>){

    var privateVar: T[] = []
    return {
        [name]: {
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
}

export 
{ 
    ActionStore,
    DeviceStore,
    OptionStore
}