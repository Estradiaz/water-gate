import { IAction } from "~/interfaces";
import Axios from "axios";

let calledMinute = undefined as undefined | number
export function execAction(action: IAction){

    if(action.method === 'on'){
        
        return Axios.get(action.device.on)
    } else if(action.method === 'off') {
        
        return Axios.get(action.device.off)
    }
}