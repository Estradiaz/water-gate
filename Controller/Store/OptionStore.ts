
import { IOption as IAction } from "~/interfaces";
import Store from ".";
import { Server } from "ws";

export default class OptionStore extends Store<IAction>{

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