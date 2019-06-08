import express from 'express';
import { Controller } from '../run';
import { IDevice } from '~/interfaces';

export default function (ctrl: Controller){

    const api = express();
    api.use(express.urlencoded({extended: true}));
    api.use(express.json())
    
    api.put('/device', (req, res) => {
    
        console.log(req.body, ctrl.devices, typeof ctrl.devices)
        const device: IDevice = req.body
        console.log(device, ctrl.devices.length)
        ctrl.devices.push(device)
        console.log(ctrl.devices.length)
        res.status(201).json(device)
    })

    api.get('/device', (req, res) => {

        console.log("get devices", ctrl.devices.length)
        res.status(200).json(ctrl.devices)
    })
    return api
}