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