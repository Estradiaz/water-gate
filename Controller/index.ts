import { StoreProxy, ActionStore, DeviceStore, OptionStore } from "./Store";
import { Server } from "ws";
import { IOption, IDevice, IAction } from "~/interfaces";


export default (runActions: Function, wsServer: Server) => new class Controller{

    options: IOption[]
    devices: IDevice[]
    actions: IAction[]

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
        this.options = StoreProxy<IOption>(new OptionStore(wsServer))
        this.devices = StoreProxy<IDevice>(new DeviceStore(wsServer))
        this.actions = StoreProxy<IAction>(new ActionStore(wsServer))
        this.loop(Date.now())
    }
}(wsServer)