import { IAction } from "~/interfaces";
import Store from "./Store";
import { Server } from 'ws'


export default class ActionStore extends Store<IAction>{

    readSync(): IAction | undefined{

        return undefined
    }
    readAllSync(): IAction[]{

        return []
    }
    write(values: IAction[]): void{

        super.write(values, 'action');  
    } 
    append(value: IAction): void{

        super.append(value, 'action');
    }
    
}

export function validAction(obj: any){

    return (obj
    && obj.hasOwnProperty('name')
    && obj.hasOwnProperty('device')
    && obj.hasOwnProperty('method'))
    || false
}
