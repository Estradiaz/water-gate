import { IDevice } from "~/interfaces";
import Store from "./Store";

export default class DeviceStore extends Store<IDevice>{
    readSync(): IDevice | undefined{
        return undefined
    }
    readAllSync(): IDevice[]{
        return super.readAllSync('device')
    }
    write(values: IDevice[]): void{
        super.write(values, 'device');
    } 
    append(value: IDevice): void{
        super.append(value, 'device');
    }
    delete(id: number){
        super.delete(id, 'device')
    }
    broadCast({data}){
        super.broadCast({
            data,
            store: 'device',
            type: "write"
        })
    }
}
export function validDevice(obj: any){
    return (obj 
    && obj.hasOwnProperty('name')
    && obj.hasOwnProperty('on')
    && obj.hasOwnProperty('off')
    && obj.hasOwnProperty('getState')
    && obj.hasOwnProperty('state'))
    || false
}
