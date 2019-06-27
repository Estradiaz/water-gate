import { StoreProxy, ActionStore, DeviceStore, OptionStore } from "./Store";
import { Server } from "ws";
import { IOption, IDevice, IAction, IControllerFS, IStoreElement, IController } from "~/interfaces";
import Axios from "axios";

export type RunEvent = {t: number, dayOfWeek: number, hours: number, minutes: number}
export default (runActions: (ctrl: IController, runEvent: RunEvent)=> Promise<any>, wsServer: Server, fs: IControllerFS) => new class Controller implements IController{

    options: IOption[]
    devices: IDevice[]
    actions: IAction[]
    
    private lastMinute: number = -1
    private loopTimer: number | undefined
    updateDeviceState(){
        return Promise.all(
            this.devices.map(async (device) => {
                device.state = !!+(await Axios.get(device.getState)).data
                return device
            })
        )

    }
    async loop(t: number){
        let minutes = (new Date()).getMinutes();
        if(this.lastMinute === minutes) return;
        this.lastMinute = minutes
        this.loopTimer = this.loopTimer 
        || setInterval(() => this.loop(Date.now()), 6000) as any as number
        await this.onPreActions(this)
        await runActions(this, this.runEvent(t))
        await this.updateDeviceState()
        await this.onPostActions(this)
    }
    private runEvent(t: number): RunEvent{
        return {
            t,
            dayOfWeek: (new Date()).getDay(),
            hours: (new Date()).getHours(),
            minutes: (new Date()).getMinutes()
        };
    }

    onStartup(ctrl: Controller){}
    onPreActions(ctrl: Controller){}
    onPostActions(ctrl: Controller){}
    stop(){

        this.loopTimer && clearInterval(this.loopTimer);
        this.loopTimer = undefined
    }
    constructor(wsServer: Server){
        this.options = StoreProxy<IOption>(new OptionStore(wsServer, fs))
        this.devices = StoreProxy<IDevice>(new DeviceStore(wsServer, fs))
        this.actions = StoreProxy<IAction>(new ActionStore(wsServer, fs))
        this.onStartup(this)
        this.loop(Date.now())
    }
}(wsServer)