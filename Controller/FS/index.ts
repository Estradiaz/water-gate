import {IControllerFS, IStoreElement, IAction, IDevice} from '~/interfaces'
import path from 'path'
import fs from 'fs'
import { ValidStore } from '../Api/admin';

export default class ControllerFS implements IControllerFS {
    append(element: IStoreElement, name: ValidStore){
        let elements = (this.readAllSync(name))
        elements.push(element)
        this.write(elements, name)
    }
    write(elements: IStoreElement[], name: ValidStore){
        fs.writeFile(path.join(__dirname, 'store', name), serialize(elements), err => {
            console.log("fs err", err)
        })
    }
    delete({_id: id, name }){
        let elements = (this.readAllSync(name)).filter(el => el._id !== id)
        this.write(elements, name)
    }
    readAllSync(name: string){
        try {
            const data = fs.readFileSync(path.join(__dirname, 'store', name), {encoding: 'binary'})
            console.log("readAllSync", name, data)
            return deserialize(data) as IAction[] | IDevice[] | IStoreElement[]
        } catch (e){
            console.log(e)
            return []
        }
    }
}

function serialize(data: any){

    return JSON.stringify(data)
}
function deserialize(data: any){

    return JSON.parse(data)
}