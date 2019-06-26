import { IAction, IDevice } from "~/interfaces";
import Axios from "axios";

let calledMinute = undefined as undefined | number
export function execAction(action: IAction){
    if(action.method === 'off' || action.method === 'on'){
        let waitables: Promise<any>[] = []
        if(Array.isArray(action.device)){
            waitables = action.device.map(d => Axios.get(d[action.method]))
        } else {
            waitables = [Axios.get(action.device[action.method])]
        }
        return Promise.all(waitables);
    } else {

        return []
    }
}