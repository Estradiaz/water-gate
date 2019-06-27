import { IPersistence, BroadcastStoreUpdateMsg, IAction, IControllerFS, IStoreElement } from "~/interfaces";
import { Server } from "ws";
import { ValidStore } from "~/Controller/Api/admin";
import fs from 'Controller/FS'


export default class Store<T extends IStoreElement> implements IPersistence<T>{

    private wsServer: Server
    private fs: IControllerFS
    constructor(wsServer: Server, fs: IControllerFS){
        this.wsServer = wsServer
        this.fs = fs
    }
    load: boolean = true
    broadCast(msg: BroadcastStoreUpdateMsg){

        this.wsServer.clients.forEach(client => {

            client.send(JSON.stringify(msg))
        })
    }
    readSync(): T | undefined{

        // return this.fs.readSync();
        return ;
    }
    readAllSync(store?: ValidStore): T[]{

        return this.fs.readAllSync(store) as T[];
    }
    write(values: T[], store: ValidStore): void{

        this.broadCast({
            type: 'write',
            //@ts-ignore
            store: store,
            //@ts-ignore
            data: values
        })
        this.fs.write(values, store)
    } 
    append(value: T, store: ValidStore): void{
        
        this.broadCast({
            type: 'append',
            //@ts-ignore
            store: store,
            //@ts-ignore
            data: value
        })
        this.fs.append(value, store)
    }
    delete(id: number, store: ValidStore){

        this.fs.delete({
            _id: id,
            name: store
        })
    }
}

