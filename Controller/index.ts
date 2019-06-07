import { StoreProxy, ActionStore, DeviceStore, OptionStore } from "./Store";

export default (runActions) => class Controller{

    private options = StoreProxy(new OptionStore())
    private devices = StoreProxy(new DeviceStore())
    private actions = StoreProxy(new ActionStore())

    private loopTimer: number | undefined
    loop(t: number){

        this.loopTimer = this.loopTimer || setInterval(this.loop, 1000, Date.now())
        runActions(t).bind(this)
    }
    stop(){

        clearInterval(this.loopTimer);
        this.loopTimer = undefined
    }
    constructor(){

        this.loop(Date.now())
    }
}