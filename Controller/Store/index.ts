import { IPersistence, BroadcastStoreUpdateMsg } from "~/interfaces";
import ActionStore from "./ActionStore";
import DeviceStore from "./DeviceStore";
import OptionStore from "./OptionStore"
import { Server } from "ws";


export  default class Store<T> implements IPersistence<T>{

    private wsServer
    constructor(wsServer: Server){
        this.wsServer = wsServer
    }
    broadCast(msg: BroadcastStoreUpdateMsg<T>){

        this.wsServer.clients.forEach(client => {

            client.send(msg)
        })
    }
    readSync(): T | undefined{

        return undefined
    }
    readAllSync(): T[]{

        return []
    }
    write(values: T[]): void{

        this.broadCast({
            type: 'write',
            data: values
        })
    } 
    append(value: T): void{

        this.broadCast({
            type: 'append',
            data: value
        })
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