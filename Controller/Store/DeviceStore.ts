import { IDevice as IAction } from "~/interfaces";
import Store from ".";

export default class DeviceStore extends Store<IAction>{

    readSync(): IAction | undefined{

        return undefined
    }
    readAllSync(): IAction[]{

        return []
    }
    write(values: IAction[]): void{

        
    } 
    append(value: IAction): void{

        
    } 
    
}