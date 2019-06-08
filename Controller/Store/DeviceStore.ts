import { IDevice as IAction } from "~/interfaces";
import Store from "./Store";
import { Server } from "ws";

export default class DeviceStore extends Store<IAction>{

    readSync(): IAction | undefined{

        return undefined
    }
    readAllSync(): IAction[]{

        return []
    }
    write(values: IAction[]): void{

        super.write(values);
    } 
    append(value: IAction): void{

        super.append(value);
    }
    
}
export function validDevice(obj: any){
    return (obj 
    && obj.hasOwnProperty('name')
    && obj.hasOwnProperty('on')
    && obj.hasOwnProperty('off'))
    || false
}
