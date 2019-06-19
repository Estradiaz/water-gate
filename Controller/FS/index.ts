import {IControllerFS, IStoreElement, IAction, IDevice} from '~/interfaces'
import path from 'path'
import fs from 'fs'

export default class ControllerFS implements IControllerFS {

    append(element: IAction | IDevice, name: string){

        let elements = (this.readAllSync(name)  as typeof element[]).push(element)
    }
    write(elements: IAction[] | IDevice[], name: string){

        fs.writeFile(path.join(__dirname, 'store', name), serialize(elements), err => {

            console.log(err)
        })
    }
    delete(element: {_id: string }){

    }
    readAllSync(name: string){

        const data = fs.readFileSync(path.join(__dirname, 'store', name), {encoding: 'binary'})
        return deserialize(data) as IAction[] | IDevice[] | IStoreElement[]
    }
}

function serialize(data: any){

    return JSON.stringify(data)
}
function deserialize(data: any){

    return JSON.parse(data)
}