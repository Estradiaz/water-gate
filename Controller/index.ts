import { StoreProxy, ActionStore, DeviceStore, OptionStore } from "./Store";
import { Server } from "ws";


export default (runActions: Function, wsServer: Server) => new class Controller{

    private options
    private devices
    private actions

    private loopTimer: number | undefined
    loop(t: number){

        this.loopTimer = this.loopTimer || setInterval(() => this.loop(Date.now()), 1000) as any as number
        runActions(this, t)
    }
    stop(){

        this.loopTimer && clearInterval(this.loopTimer);
        this.loopTimer = undefined
    }
    constructor(wsServer: Server){
        this.options = StoreProxy(new OptionStore(wsServer))
        this.devices = StoreProxy(new DeviceStore(wsServer))
        this.actions = StoreProxy(new ActionStore(wsServer))
        this.loop(Date.now())
    }
}(wsServer)