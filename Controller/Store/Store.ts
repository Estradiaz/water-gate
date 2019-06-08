import { IPersistence, BroadcastStoreUpdateMsg } from "~/interfaces";
import { Server } from "ws";

export default class Store<T> implements IPersistence<T>{

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

