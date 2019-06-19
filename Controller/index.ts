import { StoreProxy, ActionStore, DeviceStore, OptionStore } from "./Store";
import { Server } from "ws";
import { IOption, IDevice, IAction, IControllerFS, IStoreElement } from "~/interfaces";


export default (runActions: Function, wsServer: Server, fs: IControllerFS) => new class Controller{

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
        this.options = StoreProxy<IOption>(new OptionStore(wsServer, fs))
        this.devices = StoreProxy<IDevice>(new DeviceStore(wsServer, fs))
        this.actions = StoreProxy<IAction>(new ActionStore(wsServer, fs))
        this.loop(Date.now())
    }
}(wsServer)