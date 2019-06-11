import { IPersistence, BroadcastStoreUpdateMsg, IAction } from "~/interfaces";
import { Server } from "ws";
import { ValidStore } from "../Api";


export default class Store<T> implements IPersistence<T>{

    private wsServer
    constructor(wsServer: Server){
        this.wsServer = wsServer
    }
    broadCast(msg: BroadcastStoreUpdateMsg){

        this.wsServer.clients.forEach(client => {

            client.send(JSON.stringify(msg))
        })
    }
    readSync(): T | undefined{

        return undefined
    }
    readAllSync(): T[]{

        return []
    }
    write(values: T[], store: ValidStore): void{

        this.broadCast({
            type: 'write',
            //@ts-ignore
            store: store,
            //@ts-ignore
            data: values
        })
    } 
    append(value: T, store: ValidStore): void{
        
        this.broadCast({
            type: 'append',
            //@ts-ignore
            store: store,
            //@ts-ignore
            data: value
        })
    } 
}

