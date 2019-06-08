import express, {Request, Response} from 'express';
import { Controller } from '../run';
import { validAction } from '../Store/ActionStore';
import { validOption } from '../Store/OptionStore';
import { validDevice } from '../Store/DeviceStore';

export type ValidStore = 'action' | 'device' | 'option'
const validStores: ValidStore[] = [
    'action',
    'device',
    'option'
]
function validBody(req: Request){

    if(req.params.store === "action") {

        return validAction(req.body)
    }
    else if(req.params.store === "option") {

        return validOption(req.body)
    }
    else if(req.params.store === "device") {

        return validDevice(req.body)
    }
    else {
        return false
    }
}

export default function (ctrl: Controller){

    const api = express();
    api.use(express.urlencoded({extended: true}));
    api.use(express.json())
    
    api.delete('/:store', (req, res) => {

        console.log(req.params.store, req.body)
        if(!validStores.includes(req.params.store)){

            console.log('store invalid delete', req.params.store)
            res.status(404).send()
            return ;
        }
        if(!validBody(req)){

            console.log('body invalid delete', req.body)
            res.status(404).send()
            return ;
        }

        const device = req.body
        let index = ctrl[req.params.store + 's'].findIndex(_device => {
            
            return _device.name === device.name 
            // && _device.off === device.off
            // && _device.on === device.on
        })
        console.log(device, index)
        if(index === -1){

            res.status(409).send()
        } else {

            ctrl[req.params.store + 's'].splice(index, 1)
            res.status(200).json(ctrl[req.params.store + 's'])
        }
    })
    api.put('/:store', (req, res) => {
    
        if(!validStores.includes(req.params.store)){

            console.log('store invalid delete', req.params.store)
            res.status(404).send()
            return ;
        }
        if(!validBody(req)){

            console.log('body invalid put', req.body)
            res.status(404).send()
            return ;
        }
        const device = req.body
        let index = ctrl[req.params.store + 's'].findIndex(_device => {

            return _device.name === device.name 
            // && _device.off === device.off
            // && _device.on === device.on
        })
        if(index === -1){

            ctrl[req.params.store + 's'].push(device)
        } else {

            ctrl[req.params.store + 's'][index] = device
        }
        res.status(200).json(device)
    })

    api.get('/:store', (req, res) => {

        const store = req.params.store
        if(validStores.includes(store)){

            res.status(200).json(ctrl[req.params.store + 's'])
        } else {

            res.status(404).send();
            return;
        }
    })
    return api
}