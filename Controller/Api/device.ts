import express from 'express'
import { Controller } from '../run';
import { IDevice } from '~/interfaces';
import Axios from 'axios';

async function getState(device: IDevice){

    try {

        const state = (await Axios.get(device.getState)).data as boolean
        device.state = state
        return state
    } catch(e){

        console.log(e)
    }
}
async function turnOn(device: IDevice){

    try {

        const success = (await Axios.get(device.on)).data as boolean
        device.state = true;
    } catch(e){
        
        console.log("turnOn", e)
    }
    return device;
}
async function turnOff(device: IDevice){

    const success = (await Axios.get(device.off)).data as boolean
    device.state = false;
    return device;
}

export default function (ctrl: Controller){
    const api = express.Router()
    
    
    // i dont care about method here
    api.put('/', async (req, res) => {
        const {_id:id} = req.body
        if(id === undefined) {
            res.status(404).end()
            return;
        }
        const deviceIndex = ctrl.devices.findIndex(x => x._id === id);
        if(ctrl.devices[deviceIndex] === undefined){
            res.status(404).end()
            return ;
        }
        const { state } = req.body as IDevice
        let oldState = await getState(ctrl.devices[deviceIndex])
        if(state != oldState){
            if(state){
                ctrl.devices[deviceIndex] = await turnOn(ctrl.devices[deviceIndex])
            } else {
                ctrl.devices[deviceIndex] = await turnOff(ctrl.devices[deviceIndex])
            }
        } 
        //broadcast
        await ctrl.updateDeviceState() 
        res.status(202).json(ctrl.devices[deviceIndex]).end() // success will be worked on later
    })
    return api
}
