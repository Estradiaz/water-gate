import express, { Request } from 'express';
import { Controller } from '../run';
import { validAction } from '../Store/ActionStore';
import { validOption } from '../Store/OptionStore';
import { validDevice } from '../Store/DeviceStore';
import { IStoreElement } from '~/interfaces';

export type ValidStore = 'action' | 'device' | 'option'
const validStores: ValidStore[] = [
    'action',
    'device',
    'option'
]
function validBody(req: Request) {

    if (req.params.store === "action") {

        return validAction(req.body)
    }
    else if (req.params.store === "option") {

        return validOption(req.body)
    }
    else if (req.params.store === "device") {

        return validDevice(req.body)
    }
    else {
        return false
    }
}

export default function (ctrl: Controller) {

    const api = express.Router();
    
    

    api.delete('/:store', (req, res) => {

        if (!validStores.includes(req.params.store)) {

            res.status(404).send()
            return;
        }
        if (!validBody(req)) {

            res.status(404).send()
            return;
        }

        const device: IStoreElement = req.body
        let index = ctrl[req.params.store + 's'].findIndex(_device => {

            return _device._id === device._id
            // && _device.off === device.off
            // && _device.on === device.on
        })
        if (index === -1) {

            res.status(409).send()
        } else {

            ctrl[req.params.store + 's'].splice(index, 1)
            res.status(200).json(ctrl[req.params.store + 's'])
        }
    })
    api.put('/:store', (req, res) => {

        if (!validStores.includes(req.params.store)) {

            res.status(404).send()
            return;
        }
        if (!validBody(req)) {

            res.status(404).send()
            return;
        }
        const device: IStoreElement = req.body
        
        while (-1 < ctrl[req.params.store + 's'].findIndex(_device => {

            return _device.name == device.name
            // && _device.off === device.off
            // && _device.on === device.on
        })) {

            device.name += '+'
        }
        let index = ctrl[req.params.store + 's'].findIndex(_device => {

            return _device._id === device._id
            // && _device.off === device.off
            // && _device.on === device.on
        })
        if (index === -1) {

            device._id = Date.now() + "";
            ctrl[req.params.store + 's'].push(device)
        } else {

            ctrl[req.params.store + 's'][index] = device
        }
        res.status(200).json(device)
    })

    api.get('/:store', (req, res) => {

        const store = req.params.store
        if (validStores.includes(store)) {

            res.status(200).json(ctrl[req.params.store + 's'])
        } else {

            res.status(404).send();
            return;
        }
    })
    return api
}